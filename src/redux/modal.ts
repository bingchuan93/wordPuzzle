import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CUSTOM_MODAL_TYPES } from '../components/modal/types';
import type { RootState } from './index';

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
	customCompoentType?: CUSTOM_MODAL_TYPES;
}

const initialState: ModalState = {
	isOpen: false,
	props: {},
	customCompoentType: undefined,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		open: (state, action: PayloadAction<ModalState['props']>) => {
			state.customCompoentType = undefined;
			state.props = action.payload;
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
		},
		openCustomComponent: (state, action: PayloadAction<ModalState['customCompoentType']>) => {
			state.isOpen = true;
			state.customCompoentType = action.payload;
		},
	},
});

export const { open, close, openCustomComponent } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
