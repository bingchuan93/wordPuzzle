import { Button, Input, Text } from 'native-base';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { open } from '../../../redux/modal';
import { changeUser } from '../../../redux/user';
import { getUserHighScore } from '../../../utils';
import ModalBase from '../base';

export enum UserFormMode {
	CHANGE = 'CHANGE',
	NEW = 'NEW',
}

type Props = {
	isOpen: boolean;
	onClose: () => void;
	mode: UserFormMode;
};

const UserForm = ({ isOpen, onClose, mode }: Props): JSX.Element => {
	const [name, setName] = useState<string>('');
	const [isChangingUser, setIsChangingUser] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const resetForm = () => {
		setIsChangingUser(false);
		setName('');
	};

	const handleChange = async () => {
		setIsChangingUser(true);
		if (name === '') {
			dispatch(
				open({
					title: 'No User Name',
					message: 'Anonymous players will not have accumulated high score, are you sure?',
					actionText: 'No',
					closeText: 'Yes',
					beforeCloseModalCallback: async () => {
						dispatch(changeUser({ username: name, highScore: 0 }));
						resetForm();
						onClose();
					},
				}),
			);
		} else {
			doChangeUser();
		}
	};

	const doChangeUser = async () => {
		const highScore = await getUserHighScore(name);
		dispatch(changeUser({ username: name, highScore }));
		resetForm();
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
					<Input
						isRequired={true}
						placeholder="Enter Name"
						w="100%"
						value={name}
						onChangeText={(text) => setName(text)}
					/>
					{mode === UserFormMode.CHANGE && (
						<Text mt="1" textAlign="center" fontSize="2xs" color="text.100">
							Changing names will also change your high score
						</Text>
					)}
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
