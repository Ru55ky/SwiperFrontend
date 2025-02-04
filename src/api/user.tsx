import {AxiosResponse} from "axios";
import baseServer from '../base'

export const createUser: (body: any) => Promise<AxiosResponse<any[]>> = async (body) => {
	const res = await baseServer.post(`/auth/register`, body);
	return res;
};

export const loginUser: (body: any) => Promise<AxiosResponse<any>> = async(body) => {
	const res = await baseServer.post('/auth/login', body)
	return res
}

export const logoutUser: () => Promise<AxiosResponse<any>> = async() => {
	const res = await baseServer.get('/auth/logout')
	return res
}

export const getUser: () => Promise<AxiosResponse<any>> = async() => {
	const res = await baseServer.get('/user/')
	return res
}

