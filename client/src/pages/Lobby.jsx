import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lobby() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('')

    function handleRoomEnter(e) {
        e.preventDefault();

        navigate(`/room/${roomId}`)
    }

    function input(e) {
        setRoomId(e.target.value)
    }

    return (
        <div className='h-dvh w-full flex justify-center items-center'>

            <div>
                <form onSubmit={handleRoomEnter} className='flex gap-2 flex-col justify-center items-center'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="input">RoomId</label>
                        <input onChange={input} className="border border-solid border-black focus-visible:outline-none px-2 py-1" type="text" id='input' />
                    </div>

                    <button className='btn' type='submit'>
                        Enter
                    </button>
                </form>
            </div>

        </div>
    )
}
