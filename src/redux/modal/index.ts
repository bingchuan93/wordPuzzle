import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState} from ''

export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		isOpen: false,
		props: {},
	},
	reducers: {
		open: (state, action) => {
			state.props = action.payload.props;
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
			// state.props = this.initialState.props;
		},
	},
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
