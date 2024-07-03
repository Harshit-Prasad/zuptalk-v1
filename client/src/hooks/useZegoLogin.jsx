import { useEffect, useState } from 'react';
import { useZegoExpressEngine } from '../context/ZegoExpressEngine';

export default function useZegoLogin({ roomID, token, userID, userName }) {
    const { zg } = useZegoExpressEngine()
    const [isLoginSuccess, setIsLoginSuccess] = useState(false)

    useEffect(() => {

        if (token) {
            (async () => {
                const result = await zg.loginRoom(roomID, token, { userID, userName }, { userUpdate: true });

                setIsLoginSuccess(result)
            })();
        }

    }, [token]);

    return { isLoginSuccess }
}
