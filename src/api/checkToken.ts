import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUser} from "@/api/user";
import {useAppSelector} from "@/store/hooks";

export const checkToken  = createAsyncThunk(
	'/user',
	async(_, {dispatch, rejectWithValue}) => {
		try {
			// const token = localStorage.getItem('token')
			// if(!token) {
			// 	// throw new Error('Токен отсутсвует')
			// 	console.log('Токен отсутствует')
			// }
			const {user} = useAppSelector((state => state.userSlice))
			const response = await getUser(user.id)
			console.log('Я ТОКЕН', response.data)
			return response.data.user
		} catch (err: any) {
			if(err.response && err.response.status === 401) {
				// dispatch(clearUser())
				console.log('Я CATCH!!!!!')
				localStorage.removeItem('token')
			}
			return rejectWithValue(err.message)
		}

	}
)
