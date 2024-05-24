import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { useSocket } from '../context/SocketProvider';
import { webRTC, WebRTC } from '../services/webRTC';

export default function Room() {
    const params = useParams();
    const socket = useSocket();

    const [localUserId, setLocalUserId] = useState('');
    const [remoteUserId, setRemoteUserId] = useState('');
    const [webRTCPeer, setWebRTCPeer] = useState(webRTC);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null)
    const [callingRemoteUser, setCallingRemoteUser] = useState(false);
    const [remoteUserCalling, setRemoteUserCalling] = useState(false)

    const handleConnect = useCallback(() => {
        socket.emit('user-joined', { roomId: params?.id })
    }, [socket, params?.id])

    const handleUserConnected = useCallback(({ id }) => {
        socket.emit('user-connected');
        setLocalUserId(id);
    }, []);

    const handleRemoteUserJoined = useCallback(({ id }) => {
        setRemoteUserId(id);
        socket.emit('local-user-joined', { id: localUserId, roomId: params.id })
    }, [localUserId, params.id]);

    const handleLocalUserJoined = useCallback(({ id }) => {
        setRemoteUserId(id);
    }, []);

    const handleRemoteUserCalling = useCallback(async ({ offer }) => {
        await webRTCPeer.peer.setRemoteDescription(offer);

        console.log(offer);

        setRemoteUserCalling(true);
    }, [webRTCPeer])

    const handleCallAnswered = useCallback(async ({ answer }) => {
        await webRTCPeer.peer.setRemoteDescription(answer);

        console.log(answer);
    }, [webRTCPeer]);

    const handleIncomingTracks = useCallback((e) => {
        const [stream] = e.streams;
        console.log(e);
        setRemoteStream(stream);
    }, []);

    const handleICECandidate = useCallback((e) => {
        if (e.candidate) {
            socket.emit('incoming-ice-candidate', { to: remoteUserId, from: localUserId, ic: e.candidate })
        }
    }, [localUserId, remoteUserId])

    const handleAddICECandidate = useCallback(
        ({ ic }) => {
            console.log(ic);
            if (ic) {
                webRTCPeer.peer.addIceCandidate(ic);
            }
        },
        [webRTCPeer]
    );



    useEffect(() => {
        socket.on('connect', handleConnect);
        socket.on('user-connected', handleUserConnected);
        socket.on('remote-user-joined', handleRemoteUserJoined);
        socket.on('local-user-joined', handleLocalUserJoined);
        socket.on('remote-user-calling', handleRemoteUserCalling);
        socket.on('call-answered', handleCallAnswered);
        socket.on('add-ice-candidate', handleAddICECandidate);

        webRTCPeer.peer.addEventListener('track', handleIncomingTracks)
        webRTCPeer.peer.addEventListener('icecandidate', handleICECandidate)

        return () => {
            socket.off('connect', handleConnect);
            socket.off('user-connected', handleUserConnected);
            socket.off('remote-user-joined', handleRemoteUserJoined);
            socket.off('local-user-joined', handleLocalUserJoined);
            socket.off('remote-user-calling', handleRemoteUserCalling);
            socket.off('call-answered', handleCallAnswered);
            socket.on('add-ice-candidate', handleAddICECandidate);

            webRTCPeer.peer.removeEventListener('track', handleIncomingTracks)
            webRTCPeer.peer.removeEventListener('icecandidate', handleICECandidate)

        }
    }, [webRTCPeer,
        handleConnect,
        handleUserConnected,
        handleRemoteUserJoined,
        handleLocalUserJoined,
        handleRemoteUserCalling,
        handleCallAnswered,
        handleAddICECandidate,
        handleICECandidate]);


    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        setLocalStream(stream)

        for (const track of stream.getTracks()) {
            webRTCPeer.peer.addTrack(track, stream);
        }

        const offer = await webRTCPeer.getOffer();

        socket.emit("call-remote-user", { from: localUserId, to: remoteUserId, offer: offer });

        setCallingRemoteUser(true);

    }, [localUserId, remoteUserId, webRTCPeer]);

    const handleAnswerUser = useCallback(async () => {
        setRemoteUserCalling(false)

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        setLocalStream(stream);
        for (const track of stream.getTracks()) {
            webRTCPeer.peer.addTrack(track, stream);
        }

        const answer = await webRTCPeer.getAnswer();

        socket.emit('call-answered', { from: localUserId, to: remoteUserId, answer: answer })
    }, [webRTCPeer, localUserId, remoteUserId])

    return (
        <div className='col gap-4'>
            <div className='col gap-2'>
                <div>Room: {params.id}</div>
                <div>Local id: {localUserId}</div>
                <div>Remote id: {remoteUserId}</div>
            </div>

            <div className='row gap-2'>
                {
                    remoteUserId && !remoteUserCalling &&
                    <button disabled={callingRemoteUser} className='btn' onClick={handleCallUser} >
                        Call
                    </button>
                }
                {
                    remoteUserCalling &&
                    <button disabled={!remoteUserCalling} className='btn' onClick={handleAnswerUser} >
                        Answer
                    </button>
                }
            </div>

            <div className='row gap-8'>
                <div>
                    {
                        localStream &&
                        <ReactPlayer playing playsinline url={localStream} width={320} height={180} muted={true} />
                    }
                </div>
                <div>
                    {
                        remoteStream &&
                        <ReactPlayer playing playsinline url={remoteStream} width={320} height={180} muted={true} />
                    }
                </div>
            </div>

        </div>
    )
}
