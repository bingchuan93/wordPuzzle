import { HStack, Modal } from 'native-base';

type Props = {
	title?: string;
	content: JSX.Element;
	footerButtons: JSX.Element[];
};

function ModalBase({ title, content, footerButtons }: Props): JSX.Element {
	return (
		<Modal.Content maxWidth="400px">
			<Modal.CloseButton />
			{title && <Modal.Header borderBottomWidth={0}>{title}</Modal.Header>}
			<Modal.Body>{content}</Modal.Body>
			<Modal.Footer borderTopWidth={0}>
				<HStack flex="1">{footerButtons}</HStack>
			</Modal.Footer>
		</Modal.Content>
	);
}

export default ModalBase;
