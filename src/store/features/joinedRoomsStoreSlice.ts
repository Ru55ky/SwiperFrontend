import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit";
import {UserRoomType} from "../../../types";
import {getUserRoomsApi} from "@/api/getUserRooms";

type initialStateType = {
	joinedRooms: UserRoomType[]
	// isLoading: boolean
	// error: string
}

const initialState: initialStateType = {
	joinedRooms: [],
	// isLoading: false,
	// error: ''
}

export const joinedRoomStoreSlice = createSlice({
	name: 'joinedRooms',
	initialState,
	reducers: {
		// fetchingRooms(state) {
		// 	state.isLoading = true
		// },
		updateRooms: (state, action: PayloadAction<UserRoomType[]>) => {
			state.joinedRooms = action.payload;
		},
	}
})

export const {updateRooms} = joinedRoomStoreSlice.actions
export default joinedRoomStoreSlice.reducer
