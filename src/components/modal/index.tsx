import { Modal as NBModal, Text, Button, HStack } from 'native-base';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { close, selectModal } from '../../redux/modal';

function Modal() {
	const { isOpen, props } = useAppSelector(selectModal);
	const {
		title = 'Test',
		message = 'asdkajsdklfjweiojf asjdflkadsjflkasdjfo aosidjfodijf',
		beforeCloseModalCallback,
		closeText = 'Close',
		actionModalCallback,
		actionText,
	} = props;
	const dispatch = useAppDispatch();

	const handleClose = () => {
		if (beforeCloseModalCallback) {
			beforeCloseModalCallback();
		}
		dispatch(close());
	};

	const handleAction = () => {
		if (actionModalCallback) {
			actionModalCallback();
		}
		dispatch(close());
	};

	const hasGap = useMemo(() => {
		return closeText && actionText;
	}, [closeText, actionText]);

	return (
		<NBModal isOpen={isOpen} onClose={() => dispatch(close())}>
			<NBModal.Content maxWidth="400px">
				<NBModal.CloseButton />
				{title && <NBModal.Header borderBottomWidth={0}>{title}</NBModal.Header>}
				<NBModal.Body>
					<Text>{message}</Text>
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
							<Button bg="primary.500" _pressed={{ bg: 'primary.700' }} onPress={handleAction} flex="1">
								{actionText}
							</Button>
						)}
					</HStack>
				</NBModal.Footer>
			</NBModal.Content>
		</NBModal>
	);
}

export default Modal;
