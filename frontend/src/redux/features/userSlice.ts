import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "@/types/types";

const initialState: UserInterface = {
	id: "",
	name: "",
	email: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserInterface>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
	},
});

export const { setUser,setName } = userSlice.actions;

export default userSlice.reducer;
