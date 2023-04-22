import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Spinner, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HighScoreArray, RootStackParamList } from '../../type';
import { getAllHighScore } from '../../utils';
import _ from 'lodash';
import { LEADERBOARD_TOP_THREE_THEME } from '../../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Leaderboard'>;

function Leaderboard({ navigation }: Props): JSX.Element {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [highScores, setHighScore] = useState<HighScoreArray>([]);
	const insets = useSafeAreaInsets();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const highScores = await getAllHighScore();
		if (highScores) {
			const highScoreArray: HighScoreArray = Object.keys(highScores).map((key) => {
				return { name: key, score: highScores[key] };
			});
			const sortedHighScores = _.orderBy(highScoreArray, ['score'], ['desc']);
			setHighScore(sortedHighScores);
		}
		setIsLoading(false);
	};

	const handleClose = () => navigation.goBack();

	return (
		<Box flex="1" flexDirection="column" justifyContent="space-between" px="4" mb={insets.bottom}>
			{isLoading && <Spinner color="warning.500" />}
			{!isLoading && highScores.length && (
				<ScrollView>
					<VStack pt="4">
						{highScores.map((highScore, idx) => {
							const colorTheme =
								LEADERBOARD_TOP_THREE_THEME.length < idx + 1
									? { bg: 'white', text: 'text.500', outline: 'bg.500' }
									: LEADERBOARD_TOP_THREE_THEME[idx];
							return (
								<Box
									outlineColor={colorTheme.outline ?? 'transparent'}
									bg={colorTheme.bg}
									px="6"
									py="4"
									rounded="sm"
									shadow="1"
									mb="4"
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
									color={colorTheme.text}
								>
									<Text>{highScore.name}</Text>
									<Text>{highScore.score}</Text>
								</Box>
							);
						})}
					</VStack>
				</ScrollView>
			)}
			<Button onPress={handleClose}>Back</Button>
		</Box>
	);
}

export default Leaderboard;
