import React, { useEffect } from 'react'
import { useZegoExpressEngine } from '../context/ZegoExpressEngine'

export default function useSetupStream({ isLoginSuccess, userId: streamId }) {

    const { zg } = useZegoExpressEngine()

    useEffect(() => {

        if (isLoginSuccess) {
            (async () => {
                option = {
                    camera: {
                        video: false,
                        audio: true
                    }
                }
                const localStream = await zg.createZegoStream(option);

                localStream.playAudio()

                zg.startPublishingStream(streamId, localStream)

            })();
        }

    }, [isLoginSuccess])

    return;
}
