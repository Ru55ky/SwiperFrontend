import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit";
import {UserRoomType} from "../../../types";

// type initialStateType = {
// 	currentRoom: UserRoomType
// 	isLoading: boolean,
// 	error: string | Error
// }

const initialState = {
	currentRoom: {
		id: 0,
		name: '',
		description: '',
		created_user_id: 0,
		created_at: '',
		user_id: 0,
		room_id: 0
	},
	isLoading: false,
	error: '',
}

export const currentRoomSlice = createSlice({
	name: 'currentRoom',
	initialState,
	reducers: {
		updateCurrentRoom: (state, action: PayloadAction<UserRoomType>) => {
			state.currentRoom = action.payload;
		},
	}
})

export const {updateCurrentRoom} = currentRoomSlice.actions
export default currentRoomSlice.reducer
