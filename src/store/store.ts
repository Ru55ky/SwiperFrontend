import {combineReducers, configureStore} from '@reduxjs/toolkit';
import currentRoomSlice from "@/store/features/currentRoomSlice";
import userSlice from "@/store/features/userSlice";
import joinedRoomsStoreSlice from "@/store/features/joinedRoomsStoreSlice";
import syncCookiesMiddleware from "@/api/syncCookiesMiddleware";

const rootReducer = combineReducers({
	currentRoomSlice,
	joinedRoomsStoreSlice,
	userSlice,
})

export const setupStore = (preloadedState) => {
		return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(syncCookiesMiddleware),
	},
	);
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
