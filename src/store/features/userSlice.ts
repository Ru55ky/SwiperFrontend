import {createSlice} from "@reduxjs/toolkit";
import {getUser} from "@/api/user";

const initialState = {
	user: {
		login: '',
		mail: '',
		image_icon: '',
		role: '',
		id: undefined
	},
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
		clearUser: (state, action) => {
			state.isLoading = true
			state.user = action.payload
			state.isLoading = false
		}
	}
})
export const { updateUser, clearUser} = userSlice.actions
export default userSlice.reducer
