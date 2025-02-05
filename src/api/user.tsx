import {AxiosResponse} from "axios";
import baseServer from '../base'

export const createUser: (body: any) => Promise<AxiosResponse<any[]>> = async (body) => {
	return await baseServer.post(`/auth/register`, body);
};

export const loginUser: (body: any) => Promise<AxiosResponse<any>> = async(body) => {
	return await baseServer.post('/auth/login', body)
}

export const logoutUser: () => Promise<AxiosResponse<any>> = async() => {
	return await baseServer.get('/auth/logout')
}

export const getUser: (id: number) => Promise<AxiosResponse<any>> = async(id: number) => {
	return await baseServer.get(`/user/${id}`)
}

