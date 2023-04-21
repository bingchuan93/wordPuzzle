import { Button, Input, Text } from 'native-base';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { changeUser } from '../../../redux/user';
import { getUserHighScore } from '../../../utils';
import ModalBase from '../base';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const UserForm = ({ isOpen, onClose }: Props): JSX.Element => {
	const [name, setName] = useState<string>('');
	const [isChangingUser, setIsChangingUser] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const resetForm = () => {
		setIsChangingUser(false);
		setName('');
	};

	const handleChange = async () => {
		setIsChangingUser(true);
		const highScore = await getUserHighScore(name);
		dispatch(changeUser({ username: name, highScore }));
		onClose();
	};

	const handleClose = () => {
		onClose();
		resetForm();
	};

	return (
		<ModalBase
			title="User Profile"
			showCross={false}
			isOpen={isOpen}
			onClose={handleClose}
			content={
				<>
					<Input placeholder="Enter Name" w="100%" value={name} onChangeText={(text) => setName(text)} />
					<Text mt="1" textAlign="center" fontSize="2xs" color="text.100">
						Changing names will also change your high score
					</Text>
				</>
			}
			footerButtons={[
				<Button bg="danger.300" _pressed={{ background: 'danger.500' }} flex="1" onPress={handleClose}>
					Close
				</Button>,
				<Button flex="1" ml="2" onPress={handleChange} isLoading={isChangingUser}>
					Change
				</Button>,
			]}
		/>
	);
};

export default UserForm;
