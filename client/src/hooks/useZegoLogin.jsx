import { useEffect, useState } from 'react';
import { useZegoExpressEngine } from '../context/ZegoExpressEngine';

export default function useZegoLogin({ roomID, token, userID, userName }) {
    const { zg } = useZegoExpressEngine()
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(roomID);

    useEffect(() => {

        if (token && roomID && userID && userName) {
            (async () => {
                const result = await zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true });

                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                console.log(result);

                setIsLoginSuccess(result)
            })();
        }

    }, [roomID, token, userID, userName]);

    return { isLoginSuccess }
}
