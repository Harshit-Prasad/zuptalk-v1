import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetAuthToken(userId) {

    const [token, setToken] = useState(null)

    useEffect(() => {

        (async () => {
            try {
                const url = `${import.meta.env.VITE_SERVER_URL}/api/zego-auth-token`;
                const data = { userId }

                const response = await axios.post(url, data)

                if (response.data?.error) {
                    throw 'Something went wrong!'
                } else {
                    setToken(t)
                }
            } catch (error) {
                console.log(error.message);
            }
        })()

    }, [userId])

    return { token }
}
