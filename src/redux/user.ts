import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface UserState {
	username: string;
	highScore: number;
}

const initialState: UserState = {
	username: 'Anonymous',
	highScore: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState['username']>) => {
			state.username = action.payload;
		},
		setScore: (state, action: PayloadAction<UserState['highScore']>) => {
			if (action.payload > state.highScore) {
				state.highScore = action.payload;
			}
		},
	},
});

export const { setUser, setScore } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
