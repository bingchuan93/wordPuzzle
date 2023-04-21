import { useState } from 'react';
import { Modal as NBModal, Text, Button } from 'native-base';

function Modal() {
	const [showModal, setShowModal] = useState<boolean>(true);
	return (
		<NBModal isOpen={showModal} onClose={() => setShowModal(false)}>
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
								setShowModal(false);
							}}
						>
							Cancel
						</Button>
						<Button
							onPress={() => {
								setShowModal(false);
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
