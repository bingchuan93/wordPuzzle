import { HStack, Modal } from 'native-base';

type Props = {
	title?: string;
	showCross?: boolean;
	content: JSX.Element;
	footerButtons: JSX.Element[];
	isOpen: boolean;
	onClose: () => void;
};

function ModalBase({ title, showCross = true, content, footerButtons, isOpen, onClose }: Props): JSX.Element {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Content maxWidth="400px">
				{showCross && <Modal.CloseButton />}
				{title && <Modal.Header borderBottomWidth={0}>{title}</Modal.Header>}
				<Modal.Body>{content}</Modal.Body>
				<Modal.Footer borderTopWidth={0}>
					<HStack flex="1">{footerButtons}</HStack>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
}

export default ModalBase;
