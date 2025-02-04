"use client"
import {useAppDispatch} from "@/store/hooks";
import {getUserRoomsApi} from "@/api/getUserRooms";
import {updateRooms} from "@/store/features/joinedRoomsStoreSlice";
import {useEffect} from "react";
import SidebarComponent from "@/sidebar/sidebarComponent";
import {UserRoomType} from "../../types";

import {updateCurrentRoom} from "@/store/features/currentRoomSlice";

export default function Sidebar () {
	const dispatch = useAppDispatch()
	// const navigate = useNavigate()

	async function getUserJoinedRoomsHandler(): Promise<void> {
		try {
			const res = await getUserRoomsApi()

			if(res) {
				dispatch(updateRooms(res?.data))
				console.log('RES', res, res.data)
			}

		} catch (err) {
			console.log('err', err)
		}
	}

	function selectRoomHandler(room: UserRoomType) {

		return dispatch(updateCurrentRoom(room))
		// navigate(`/rooms/${room.id}`)
		// window.location.replace(`/rooms/${room.id}`)
	}

	useEffect(() => {
		getUserJoinedRoomsHandler()
	}, []);

	return (
		<div style={{display: 'flex', flexDirection: 'column', gap: 1, width: 400, height: '100vh', background: '#0c224b', padding: 5}}>
			<SidebarComponent
				selectRoomHandler={selectRoomHandler}
			/>
		</div>
	)
}
