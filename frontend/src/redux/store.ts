import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import accountReducer from "./features/accountSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		account: accountReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
