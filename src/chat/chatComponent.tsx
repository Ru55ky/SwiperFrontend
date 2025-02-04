"use client"
import React, {useEffect, useState} from "react";
import {getAllMessages} from "@/api/messages";
import {io} from "socket.io-client";
import {useAppSelector} from "@/store/hooks";
import {router} from "next/client";
import { useRouter } from 'next/navigation';

export default function ChatComponent () {
	const socket = io('http://localhost:3001')
	const [message, setMessage] = useState('')
	const {user} = useAppSelector(state => state.userSlice)
	const {currentRoom} = useAppSelector(state => state.currentRoomSlice)
	const router = useRouter()

	const sendMessage = async (event: any) => {
		event.preventDefault()
		try {
			// if (currentRoom && currentUser) {
			socket.emit('send_message', {
				// message: data.message,
				// userId: currentUser.id,
				// roomId: currentRoom.id,
				message: message,
				user_id: 1,
				room_id: 1,
			});
			setMessage('')
		} catch (err) {
			console.log('ОШИБКА')
		}
	};

	async function getMessagesHandler() {
		try {
			await getAllMessages(currentRoom.id)
		} catch (err) {
			console.log('при получении сообщение произошла ошибка', err)
		}
	}

	useEffect(() => {
		if(!user?.id) {
			router.push('/login')
		}
		if(currentRoom && currentRoom.user_id !== 0) {
			getMessagesHandler()
		}
	}, [currentRoom]);
	console.log('SS', user)
	return (
		<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 600, margin: '0 auto', height: 'auto'}}>
			<div style={{width: 600, minHeight: '70vh', maxHeight: '100vh'}}></div>
			<div style={{padding: 20, border: '1px solid black', borderRadius: 6}}>
				<input value={message} onChange={event => setMessage(event.target.value)}
				style={{border: '1px solid black', borderRadius: 8, width: 400}}/>
				<button onClick={sendMessage} style={{padding: 10, border: '1px solid black', borderRadius: 8}}>Отправить</button>
			</div>
		</div>
	)
}
