import {AxiosResponse} from "axios";
import baseServer from '../base'
import { UserRoomType } from '../../types';

export const getAllMessages: (room_id: number) => Promise<AxiosResponse<any[]>> = async (room_id) => {
	const res = await baseServer.post(`/messages?room_id=${room_id}`);
	return res;
};
//
// export const createMessage: (body: any) => Promise<AxiosResponse<any>> = async(body: any) => {
// 	const res = await baseServer.post('/messages', body)
// 	return res
// }
