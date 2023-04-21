import { AppDispatch } from '../../redux';

export type ModalBaseProps = { dispatch: AppDispatch };

export enum CUSTOM_MODAL_TYPES {
	USER_FORM = 'USER_FORM',
}

export type customModalComponents = {
	[Property in keyof typeof CUSTOM_MODAL_TYPES]: (props: ModalBaseProps) => JSX.Element;
};
