"use client"
import React, {useEffect, useState} from "react";
import {getAllMessages} from "@/api/messages";
import {io} from "socket.io-client";
import {useAppSelector} from "@/store/hooks";
import {router} from "next/client";
import { useRouter } from 'next/navigation';
import {MessageType} from "../../types/messageType";

export default function ChatComponent () {
	const socket = io('http://localhost:3001');

	const [message, setMessage] = useState('')
	const {user} = useAppSelector(state => state.userSlice)
	const {currentRoom} = useAppSelector(state => state.currentRoomSlice)
	const router = useRouter()
	const [allMessages, setAllMessages] = useState<MessageType[]>([])

	const sendMessage =  (event: any) => {
		event.preventDefault()
		// try {
			// if (currentRoom && currentUser) {
			socket.emit('send_message', {
				message: message,
				user_id: user?.id,
				room_id: currentRoom.id,
			});
			setMessage('')
		// } catch (err) {
		// 	console.log('ОШИБКА')
		// }
		// finally {
			// await getAllMessagesHandler()
		// }
	};

	useEffect(() => {
		getAllMessagesHandler()
	}, [currentRoom]);

	useEffect(() => {
		if(!socket) return;
		console.log('я тут', socket)
		socket.on('new_message', (message: MessageType) => {
			console.log('MESSAGE', message)
			 setAllMessages([...allMessages, {
				username: message.username,
				message: message.message,
				user_id: message?.user_id,
				room_id: currentRoom.id,
				id: undefined,
				created_at: '',
				image_icon: null
			}]);
		})
		console.log('я тут2', socket, allMessages)
		return () => {
			socket.off('new_message');
		}
	}, [currentRoom, socket])


	// useEffect(() => {
	// 	if(!user?.id) {
	// 		router.push('/login')
	// 	}
	// 	if(currentRoom && currentRoom.user_id !== 0) {
	// 		getMessagesHandler()
	// 	}
	// }, [currentRoom]);

	async function getAllMessagesHandler() {
		try {
			const response = await getAllMessages(currentRoom.id)

			if(response) {
				setAllMessages(response.data)
			}

		} catch(err) {
			console.log('при получении сообщений произошла ошибка')
		}
	}

	return (
		<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 600, margin: '0 auto', height: 'auto'}}>
			<div style={{width: 600, minHeight: '70vh', maxHeight: '100vh'}}></div>
			<div>
				{allMessages && allMessages.map(message => (
					<div key={message.id}>
						{message.message}
					</div>
				))}
			</div>
			<div style={{padding: 20, border: '1px solid black', borderRadius: 6}}>
				<input value={message} onChange={event => setMessage(event.target.value)}
				style={{border: '1px solid black', borderRadius: 8, width: 400}}/>
				<button onClick={sendMessage} style={{padding: 10, border: '1px solid black', borderRadius: 8}}>Отправить</button>
			</div>
		</div>
	)
}
