import {useAppSelector} from "@/store/hooks";
import {UserRoomType} from "../../types";
import {logoutUser} from "@/api/user";
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface SidebarComponentInterface {
	selectRoomHandler: (room: UserRoomType) => void
}

export default function SidebarComponent ({
	selectRoomHandler
}: SidebarComponentInterface) {
	const {joinedRooms} = useAppSelector(state => state.joinedRoomsStoreSlice)
	const router = useRouter()
	async function logoutHandler() {
		try {
			await logoutUser()
		} catch (err) {
			console.log('произошла ошибка')
		}
	}
	return (
		<div>
			{
				joinedRooms && joinedRooms?.map((room, index) => (
					<div onClick={() => selectRoomHandler(room)} style={{ padding: 15, border: '1px solid #040c1a', cursor: 'pointer'}} key={room?.id}>
						<span style={{color: 'white'}}>{room?.name}</span>
					</div>
				))
			}
			<Link onClick={logoutHandler} href={'/login'}>Выйти</Link>
		</div>
	)
}
