import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface ModalState {
	isOpen: boolean;
	props: {
		title?: string;
		message?: string;
		beforeCloseModalCallback?: Function;
		closeText?: string;
		actionCallback?: Function;
		actionText?: string;
	};
}

const initialState: ModalState = {
	isOpen: false,
	props: {},
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		open: (state, action: PayloadAction<ModalState['props']>) => {
			state.props = action.payload;
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
		},
	},
});

export const { open, close } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
