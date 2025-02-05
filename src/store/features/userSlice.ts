import {createSlice} from "@reduxjs/toolkit";

interface User {
	login: string,
	mail: string,
	image_icon: string,
	role: string,
	id: undefined | number
	token: string
}

const initialState = {
	user: {} as User | null,
	isLoading: false,
	isError: false
}

export const userSlice = createSlice({
	name: 'createSlice',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.user = action.payload
			state.isLoading = false
		},
		clearUser: (state) => {
			state.isLoading = true
			state.user = null
			state.isLoading = false
		}
	}
})
export const { updateUser, clearUser} = userSlice.actions
export default userSlice.reducer
