import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lobby() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('')

    function handleRoomEnter(e) {
        e.preventDefault();

        navigate(`/room/${roomId}`, {
            state: {
                userId,
                userName
            }
        })
    }

    function inputRoomId(e) {
        setRoomId(e.target.value)
    }

    function inputUserId(e) {
        setUserId(e.target.value)
    }

    function inputUserName(e) {
        setUserName(e.target.value)
    }

    return (
        <div className='h-dvh w-full flex justify-center items-center'>

            <div>
                <form onSubmit={handleRoomEnter} className='flex gap-2 flex-col justify-center items-center'>
                    <div className='flex items-center justify-between gap-2'>
                        <label htmlFor="input">RoomId</label>
                        <input onChange={inputRoomId} className="border border-solid border-black focus-visible:outline-none px-2 py-1" type="text" id='input' />
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <label htmlFor="input">User Name</label>
                        <input onChange={inputUserId} className="border border-solid border-black focus-visible:outline-none px-2 py-1" type="text" id='input' />
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <label htmlFor="input">User Id</label>
                        <input onChange={inputUserName} className="border border-solid border-black focus-visible:outline-none px-2 py-1" type="text" id='input' />
                    </div>

                    <button className='btn' type='submit'>
                        Enter
                    </button>
                </form>
            </div>

        </div>
    )
}
