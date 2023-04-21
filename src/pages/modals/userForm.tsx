import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Center, Input, Text } from 'native-base';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../type';

type Props = NativeStackScreenProps<RootStackParamList, 'UserForm'>;

function UserForm({ navigation }: Props): JSX.Element {
	const [name, setName] = useState<string>('');
	const insets = useSafeAreaInsets();

	const handleClose = () => navigation.goBack();

	return (
		<Box flex="1" flexDirection="column" justifyContent="space-between" px="4">
			<Center flex="1">
				<Input mx="2" placeholder="Enter Name" w="100%" value={name} onChangeText={(text) => setName(text)} />
			</Center>
			<Box w="100%" flexDirection="row" pb={insets.bottom}>
				<Button bg="danger.300" _pressed={{ background: 'danger.500' }} flex="1" onPress={handleClose}>
					Close
				</Button>
				<Button flex="1" ml="2">
					Change
				</Button>
			</Box>
		</Box>
	);
}

export default UserForm;
