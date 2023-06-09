import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_USERNAME } from '../constants';
import type { RootState } from './index';

interface UserState {
	username: string;
	highScore: number;
}

const initialState: UserState = {
	username: DEFAULT_USERNAME,
	highScore: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeUser: (state, action: PayloadAction<UserState>) => {
			state.username = action.payload.username;
			state.highScore = action.payload.highScore;
		},
		setHighScore: (state, action: PayloadAction<UserState['highScore']>) => {
			if (action.payload > state.highScore) {
				state.highScore = action.payload;
			}
		},
	},
});

export const { setHighScore, changeUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
