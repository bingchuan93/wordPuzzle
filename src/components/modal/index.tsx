import { Modal as NBModal, Text, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/modal';

function Modal() {
	const isOpen = useSelector((state) => state.modal.isOpen);
	const dispatch = useDispatch();

	return (
		<NBModal isOpen={isOpen} onClose={() => dispatch(close())}>
			<NBModal.Content maxWidth="400px">
				<NBModal.CloseButton />
				<NBModal.Header>Contact Us</NBModal.Header>
				<NBModal.Body>
					<Text>Test</Text>
				</NBModal.Body>
				<NBModal.Footer>
					<Button.Group space={2}>
						<Button
							variant="ghost"
							colorScheme="blueGray"
							onPress={() => {
								dispatch(close());
							}}
						>
							Cancel
						</Button>
						<Button
							onPress={() => {
								dispatch(close());
							}}
						>
							Save
						</Button>
					</Button.Group>
				</NBModal.Footer>
			</NBModal.Content>
		</NBModal>
	);
}

export default Modal;
