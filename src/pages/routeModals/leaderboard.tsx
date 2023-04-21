import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Center, Input, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HighScoreRecord, RootStackParamList } from '../../type';
import { getAllHighScore } from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Leaderboard'>;

function Leaderboard({ navigation }: Props): JSX.Element {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [highScores, setHighScore] = useState<HighScoreRecord | null>(null);
	const insets = useSafeAreaInsets();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const highScores = await getAllHighScore();
		console.log(highScores);
		if (highScores) {
			setHighScore(highScores);
		}
		setIsLoading(false);
	};

	const handleClose = () => navigation.goBack();

	return (
		<Box flex="1" flexDirection="column" justifyContent="space-between" px="4">
			<Center flex="1">
				{/* <Input mx="2" placeholder="Enter Name" w="100%" value={name} onChangeText={(text) => setName(text)} /> */}
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

export default Leaderboard;
