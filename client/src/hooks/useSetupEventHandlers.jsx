import React, { useEffect } from 'react'
import { useZegoExpressEngine } from '../context/ZegoExpressEngine'

export default function useSetupEventHandlers({ remoteAudioStreamRef }) {

  const { zg } = useZegoExpressEngine();

  useEffect(() => {

    zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {

      console.log('>>> roomStateUpdate <<<');

      console.log(state);

      if (state == 'DISCONNECTED') {

      }

      if (state == 'CONNECTING') {

      }

      if (state == 'CONNECTED') {

      }
    });

    zg.on('roomUserUpdate', (roomID, updateType, userList) => {
      console.log('>>> roomUserUpdate <<<');

      console.log(userList)
    });

    zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
      console.log('>>> roomStreamUpdate <<<');

      console.log(roomID, updateType, streamList, extendedData);

      // if (remoteAudioStreamRef?.current) {
      //   const remoteStream = await zg.startPlayingStream(streamID);
      //   remoteAudioStreamRef.current.srcObject = remoteStream;
      // }
    });

  }, [zg, remoteAudioStreamRef?.current])

  return {}
}
