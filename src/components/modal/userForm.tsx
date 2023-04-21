import { Button, Input, Text } from 'native-base';
import { useState } from 'react';
import { close } from '../../redux/modal';
import { setUser } from '../../redux/user';
import ModalBase from './base';
import { ModalBaseProps } from './types';

function UserForm({ dispatch }: ModalBaseProps): JSX.Element {
	const [name, setName] = useState<string>('');

	const handleClose = () => dispatch(close());

	const handleChange = () => {
		dispatch(setUser(name));
		dispatch(close());
	};

	return (
		<ModalBase
			title="User Profile"
			content={
				<>
					<Input placeholder="Enter Name" w="100%" value={name} onChangeText={(text) => setName(text)} />
					<Text mt="1" textAlign="center" fontSize="2xs" color="text.100">
						Changing names will also change your highscore
					</Text>
				</>
			}
			footerButtons={[
				<Button bg="danger.300" _pressed={{ background: 'danger.500' }} flex="1" onPress={handleClose}>
					Close
				</Button>,
				<Button flex="1" ml="2" onPress={handleChange}>
					Change
				</Button>,
			]}
		/>
	);
}

export default UserForm;
