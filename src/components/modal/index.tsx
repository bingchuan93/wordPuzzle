import { Modal as NBModal, Text, Button, HStack } from 'native-base';
import { useMemo } from 'react';
import { AppDispatch } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { close, selectModal } from '../../redux/modal';
import { customModalComponents, CUSTOM_MODAL_TYPES } from './types';
import UserForm from './userForm';

const CUSTOM_MODAL_COMPONENTS: customModalComponents = {
	[CUSTOM_MODAL_TYPES.USER_FORM]: UserForm,
};

function Modal() {
	const { isOpen, props, customCompoentType } = useAppSelector(selectModal);
	const { title, message, beforeCloseModalCallback, closeText, actionCallback, actionText } = props;
	const dispatch = useAppDispatch();

	const handleClose = () => {
		if (beforeCloseModalCallback) {
			beforeCloseModalCallback();
		}
		dispatch(close());
	};

	const handleAction = () => {
		if (actionCallback) {
			actionCallback();
		}
		dispatch(close());
	};

	const hasGap = useMemo(() => {
		return closeText && actionText;
	}, [closeText, actionText]);

	const CustomModal = customCompoentType ? CUSTOM_MODAL_COMPONENTS[customCompoentType] : undefined;

	return (
		<NBModal isOpen={isOpen} onClose={handleClose}>
			{CustomModal && <CustomModal dispatch={dispatch} />}
			{!customCompoentType && (
				<NBModal.Content maxWidth="400px">
					<NBModal.CloseButton />
					{title && <NBModal.Header borderBottomWidth={0}>{title}</NBModal.Header>}
					<NBModal.Body>
						<Text textAlign="center">{message}</Text>
					</NBModal.Body>
					<NBModal.Footer borderTopWidth={0}>
						<HStack flex="1">
							{closeText && (
								<Button
									bg="danger.500"
									_pressed={{ bg: 'danger.700' }}
									onPress={handleClose}
									flex="1"
									mr={hasGap ? '4' : '0'}
								>
									{closeText}
								</Button>
							)}
							{actionText && (
								<Button
									bg="primary.500"
									_pressed={{ bg: 'primary.700' }}
									onPress={handleAction}
									flex="1"
								>
									{actionText}
								</Button>
							)}
						</HStack>
					</NBModal.Footer>
				</NBModal.Content>
			)}
		</NBModal>
	);
}

export default Modal;
