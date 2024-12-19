import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface accountState {
	balance: number;
}

const initialState: accountState = {
	balance: 0,
};

const authSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setBalance(state, action: PayloadAction<number>) {
			state.balance = action.payload;
		},
	},
});

export const { setBalance } = authSlice.actions;
export default authSlice.reducer;
