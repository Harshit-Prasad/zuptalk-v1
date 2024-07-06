import React, { useEffect } from 'react'
import { useZegoExpressEngine } from '../context/ZegoExpressEngine'

export default function useSetupEventHandlers({ remoteAudioStreamRef }) {

  const { zg } = useZegoExpressEngine();
  // const [currentUserId, setCurrentUserId] = useState('');
  // const [currentUserName, setCurrentUserName] = useState('')

  useEffect(() => {

    zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {

      console.log('>>> roomStateUpdate <<<', state);

      if (state == 'DISCONNECTED') {

      }

      if (state == 'CONNECTING') {

      }

      if (state == 'CONNECTED') {

      }
    });

    zg.on('roomUserUpdate', (roomID, updateType, userList) => {
      console.log('>>> roomUserUpdate <<<', userList);
    });

    zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      console.log('>>> roomStreamUpdate <<<', remoteAudioStreamRef);

      const [stream] = streamList;

      const remoteStream = await zg.startPlayingStream(stream.streamID);
      remoteAudioStreamRef.current.srcObject = remoteStream;
    });

    zg.on('getPublishingStreamQuality', (...args) => {
      console.log('getPublishingStreamQuality', args);
    })

  }, [])

  return {}
}
