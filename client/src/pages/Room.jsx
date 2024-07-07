import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';
import useZegoLogin from '../hooks/useZegoLogin'
import useGetAuthToken from '../hooks/useGetAuthToken';
import useSetupStream from '../hooks/useSetupStream';
import useSetupEventHandlers from '../hooks/useSetupEventHandlers';

export default function Room() {
    const params = useParams();
    const location = useLocation();
    const socket = useSocket();
    const remoteAudioStreamRef = useRef()

    const { userId, userName } = location.state;

    const { token } = useGetAuthToken(userId);

    const { isLoginSuccess } = useZegoLogin({
        roomID: params.id,
        userID: userId,
        userName: userName,
        token: token
    });

    useSetupStream({ isLoginSuccess, userId });

    useSetupEventHandlers({ remoteAudioStreamRef });

    const [localUserId, setLocalUserId] = useState('');
    const [remoteUserId, setRemoteUserId] = useState('');

    const handleConnect = useCallback(() => {
        socket.emit('user-joined', { roomId: params?.id })
    }, [socket, params?.id])

    const handleUserConnected = useCallback(({ id }) => {
        socket.emit('user-connected');
        setLocalUserId(id);
        console.log(id);
    }, []);

    const handleRemoteUserJoined = useCallback(({ id }) => {
        setRemoteUserId(id);
        socket.emit('local-user-joined', { id: localUserId, roomId: params.id })
    }, [localUserId, params.id]);

    const handleLocalUserJoined = useCallback(({ id }) => {
        setRemoteUserId(id);
    }, []);

    useEffect(() => {
        socket.on('connect', handleConnect);
        socket.on('user-connected', handleUserConnected);
        socket.on('remote-user-joined', handleRemoteUserJoined);
        socket.on('local-user-joined', handleLocalUserJoined);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('user-connected', handleUserConnected);
            socket.off('remote-user-joined', handleRemoteUserJoined);
            socket.off('local-user-joined', handleLocalUserJoined);
        }
    }, [
        handleConnect,
        handleUserConnected,
        handleRemoteUserJoined,
        handleLocalUserJoined,
    ]);

    return (
        <>
            <div>
                <h1>Room: {params.id}</h1>
                <h2>Local User: {localUserId}</h2>
                <h2>Remote User: {remoteUserId}</h2>
            </div>
            <div>
                <audio autoPlay ref={remoteAudioStreamRef} id='remote-stream'></audio>
            </div>
        </>
    )
}
