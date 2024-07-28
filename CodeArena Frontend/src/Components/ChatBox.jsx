import React, { useState, useEffect } from 'react'
import '../Styles/ChatBox.scss'
import { RxCross2 } from "react-icons/rx";

import {io} from 'socket.io-client'

const ChatBox = ({ setOpenChat }) => {

    const [message, setMessage] = useState('')
    const [roomId, setRoomId] = useState('')

    useEffect(()=> {

        const socket = io('http://localhost:8000')
        socket.on('connection', (socket)=> {
            console.log(socket.id)
        })

        socket.on('other-connected', (data)=> {
            console.log(data)
        })

        socket.on('other-disconnected', (e) => {
            console.log(e)
        })

        socket.on('liveConnected', (e)=> {
            console.log(e)
        })

        socket.on('receiveMessage', (e) => {
            console.log(e)
        })

        const joinRoom = () => {
            socket.emit('joinRoom', roomId)
            console.log(111)
        }

        return () => {
            socket.disconnect()
        }

    },[])

    return (
        <div className='ChatBox'>
            <button onClick={() => setOpenChat(false)}><RxCross2 /></button>
            <div className="roomInput">
                <input type="text" placeholder='Enter Room id' onChange={(e) => setRoomId(e.target.value)} />
                <button onClick={()=> joinRoom()}>Join</button>
            </div>
            <div className="chats">

            </div>
            <div className="sendMessage">
                <input type="text" placeholder='Enter Message' onChange={(e) => setMessage(e.target.value)} />
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatBox