import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { useFocusEffect } from '@react-navigation/native';
import { getRandomisedWordByCategory, WordData } from '../data/words';
import { getCategory } from '../data/categories';
import { Box, Button, HStack, VStack, Text, CloseIcon, Center } from 'native-base';
import { getRandomisedArray, getScore, saveHighScore } from '../utils';
import _ from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { open } from '../redux/modal';
import { selectUser, setHighScore } from '../redux/user';
import { FailReason } from '../utils/getScore';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;
export type LetterDisplay = {
	selectionIdx: number;
	letter: string;
};
type LetterSelection = {
	letter: string;
	isSelected: boolean;
};

function Game({ navigation, route }: Props): JSX.Element {
	const { categoryId } = route.params;
	const [playedQuestionIds, setPlayedQuestionIds] = useState<string[]>([]);
	const [question, setQuestion] = useState<WordData | null>(null);
	const [questionDisplay, setQuestionDisplay] = useState<LetterDisplay[][]>([]);
	const [letterSelection, setLetterSelection] = useState<LetterSelection[]>([]);
	const [noOfSkips, setNoOfSkips] = useState<number>(0);
	const [totalScore, setTotalScore] = useState<number>(0);
	const [hasMoreWords, setHasMoreWords] = useState<boolean>(true);
	const insets = useSafeAreaInsets();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (categoryId) {
			initData();
			initGame([]);
		}
	}, []);

	const isCompleted = useMemo<boolean>(() => {
		const lastWordIdx = questionDisplay.length - 1;
		const lastLetterIdx = lastWordIdx !== -1 ? questionDisplay[lastWordIdx].length - 1 : -1;
		return lastLetterIdx !== -1 ? questionDisplay[lastWordIdx][lastLetterIdx].selectionIdx !== -1 : false;
	}, [questionDisplay]);

	const initData = () => {
		const category = getCategory(categoryId);
		if (category) {
			navigation.setOptions({ title: category.name });
		}
	};

	const initGame = (playedQuestionIds: string[], skippedQuestion?: WordData | null) => {
		const { word: randomWord, hasMore } = getRandomisedWordByCategory(
			categoryId,
			playedQuestionIds,
			skippedQuestion,
		);
		randomWord.word = randomWord.word.toLocaleUpperCase();
		setQuestion(randomWord);
		setHasMoreWords(hasMore);
		const { word } = randomWord;
		const letterSelection = [];
		const questionDisplay = [];
		let wordDisplay = [];
		for (let i = 0; i < word.length; i++) {
			if (word[i] !== ' ') {
				letterSelection.push({ letter: word[i], isSelected: false });
				wordDisplay.push({
					selectionIdx: -1,
					letter: '',
				});
			} else {
				questionDisplay.push(wordDisplay);
				wordDisplay = [];
			}
		}
		questionDisplay.push(wordDisplay);
		setQuestionDisplay(questionDisplay);
		setLetterSelection(getRandomisedArray(letterSelection));
	};

	useFocusEffect(() => {
		const sub = BackHandler.addEventListener('hardwareBackPress', preventNativeHardwareBackPress);
		return () => sub.remove();
	});

	const preventNativeHardwareBackPress = () => {
		return true;
	};

	const handleLetterSelect = ({ idx, letter, isSelected }: { idx: number; letter: string; isSelected: boolean }) => {
		if (!isSelected) {
			const clonedQuestionDisplay: LetterDisplay[][] = _.cloneDeep(questionDisplay);
			clonedQuestionDisplay.some((wordDisplay) => {
				return wordDisplay.some((letterDisplay) => {
					if (letterDisplay.selectionIdx === -1) {
						letterDisplay.letter = letter;
						letterDisplay.selectionIdx = idx;
						return true;
					}
					return false;
				});
			});

			const clonedLetterSelection: LetterSelection[] = _.cloneDeep(letterSelection);
			clonedLetterSelection[idx].isSelected = true;
			setQuestionDisplay(clonedQuestionDisplay);
			setLetterSelection(clonedLetterSelection);
		} else {
			const clonedQuestionDisplay: LetterDisplay[][] = _.cloneDeep(questionDisplay);
			clonedQuestionDisplay.some((wordDisplay) => {
				return wordDisplay.some((letterDisplay) => {
					if (letterDisplay.selectionIdx === idx) {
						resetLetterDisplay(letterDisplay);
						return true;
					}
				});
			});
			setQuestionDisplay(clonedQuestionDisplay);

			const clonedLetterSelection: LetterSelection[] = _.cloneDeep(letterSelection);
			resetLetterSelection(clonedLetterSelection[idx]);
			setLetterSelection(clonedLetterSelection);
		}
	};

	const handleLetterDeselect = ({
		selectionIdx,
		letterDisplayIdx,
		wordDisplayIdx,
	}: {
		selectionIdx: number;
		letterDisplayIdx: number;
		wordDisplayIdx: number;
	}) => {
		const clonedQuestionDisplay: LetterDisplay[][] = _.cloneDeep(questionDisplay);
		resetLetterDisplay(clonedQuestionDisplay[wordDisplayIdx][letterDisplayIdx]);
		setQuestionDisplay(clonedQuestionDisplay);

		const clonedLetterSelection: LetterSelection[] = _.cloneDeep(letterSelection);
		resetLetterSelection(clonedLetterSelection[selectionIdx]);
		setLetterSelection(clonedLetterSelection);
	};

	const resetLetterDisplay = (letterDisplay: LetterDisplay) => {
		letterDisplay.letter = '';
		letterDisplay.selectionIdx = -1;
	};

	const resetLetterSelection = (letterSelection: LetterSelection) => {
		letterSelection.isSelected = false;
	};

	const handleExitGame = () => {
		dispatch(
			open({
				title: 'Quit Game',
				message:
					"Your current game's progress will not be saved. Your previous score will be taken instead. Are you sure?",
				closeText: 'Quit',
				beforeCloseModalCallback: () => navigation.goBack(),
				actionText: 'Stay',
			}),
		);
	};

	const handleSkipGame = () => {
		if (hasMoreWords) {
			dispatch(
				open({
					title: 'Skip Current Game',
					message: 'You will received -1 point if you skip this game. Are you sure?',
					closeText: 'Skip',
					beforeCloseModalCallback: () => {
						initGame(playedQuestionIds, question);
						setNoOfSkips(noOfSkips + 1);
					},
					actionText: 'Resume',
				}),
			);
		} else {
			dispatch(
				open({
					title: 'Last Question',
					message: 'This is the only question left! You cannot skip anymore.',
					closeText: 'Close',
				}),
			);
		}
	};

	const handleCompleteGame = async () => {
		let answer = '';
		questionDisplay.map((wordDisplay, idx) => {
			if (idx != 0) {
				answer += ' ';
			}
			wordDisplay.forEach((letterDisplay) => (answer += letterDisplay.letter));
		});
		const { score, failReason } = getScore({ questionDisplay, question: question as WordData, noOfSkips });
		setNoOfSkips(0);
		if (score === 0) {
			dispatch(
				open({
					title: 'Oh no!',
					message: `${
						failReason === FailReason.TOO_MANY_SKIP
							? 'You skipped too many times!'
							: "You've got the wrong answer"
					}. Your higest score is ${totalScore}`,
					actionText: 'Return to main page',
					actionCallback: () => navigation.goBack(),
					beforeCloseModalCallback: () => navigation.goBack(),
				}),
			);
		} else {
			const newTotalScore = totalScore + score;
			const clonedQuestionIds = [...playedQuestionIds];
			clonedQuestionIds.push((question as WordData).id);
			setPlayedQuestionIds(clonedQuestionIds);

			await saveHighScore(user.username, newTotalScore);
			setTotalScore(newTotalScore);
			dispatch(setHighScore(newTotalScore));

			if (hasMoreWords) {
				dispatch(
					open({
						title: 'Congratulations!',
						message: `You got it! You gained ${score} points.You current score is ${newTotalScore}. Would you like to continue?`,
						actionText: 'Continue',
						actionCallback: () => initGame(clonedQuestionIds),
						closeText: 'Exit',
						beforeCloseModalCallback: () => navigation.goBack(),
					}),
				);
			} else {
				dispatch(
					open({
						title: 'Congratulations!',
						message: `You got it! You total score is ${newTotalScore}. Try a harder category or beat your current score!`,
						actionText: "Let's Go!",
						actionCallback: () => navigation.goBack(),
					}),
				);
			}
		}
	};

	return (
		<Box pt="64px" pb={insets.bottom + 4} style={{ flex: 1, justifyContent: 'space-between' }}>
			<Box>
				<Center mb="64px">
					<Text>
						Score: <Text bold>{totalScore}</Text>
					</Text>
				</Center>
				<VStack alignItems="center">
					{questionDisplay.map((wordDisplay, wordDisplayIdx) => {
						return (
							<HStack key={wordDisplayIdx} justifyContent="center" mb="5" flexWrap="wrap">
								{wordDisplay.map((letterDisplay, letterDisplayIdx) => {
									return (
										<LetterDisplay
											key={letterDisplayIdx}
											{...letterDisplay}
											idx={letterDisplayIdx}
											onPress={({ selectionIdx, letterDisplayIdx }) =>
												handleLetterDeselect({ selectionIdx, letterDisplayIdx, wordDisplayIdx })
											}
										/>
									);
								})}
							</HStack>
						);
					})}
				</VStack>
			</Box>
			<Box alignItems="center" w="100%" px="4">
				{question && question.hint && (
					<Text mb="5" mt="1" fontSize="sm" color="text.100">
						Hint: {question.hint}
					</Text>
				)}
				<HStack mt="5" mb="10" justifyContent="center" flexWrap="wrap">
					{letterSelection.map((selection, selectionIdx) => {
						return (
							<LetterSelection
								key={selectionIdx}
								{...selection}
								idx={selectionIdx}
								onPress={handleLetterSelect}
							/>
						);
					})}
				</HStack>
				<HStack w="100%">
					<Button bg="danger.500" _text={{ color: 'white' }} onPress={handleExitGame}>
						<CloseIcon color="white" />
					</Button>
					<Button
						bg={`${isCompleted ? 'success' : 'primary'}.500`}
						rounded="xs"
						shadow={3}
						_text={{
							color: 'white',
						}}
						_pressed={{ bg: `${isCompleted ? 'success' : 'primary'}.700` }}
						ml="4"
						flex="1"
						onPress={() => {
							if (isCompleted) {
								handleCompleteGame();
							} else {
								handleSkipGame();
							}
						}}
					>
						{isCompleted ? 'Submit' : 'Skip'}
					</Button>
				</HStack>
			</Box>
		</Box>
	);
}

function LetterDisplay({
	letter,
	selectionIdx,
	idx,
	onPress,
}: LetterDisplay & {
	idx: number;
	onPress: (params: { selectionIdx: number; letterDisplayIdx: number }) => void;
}): JSX.Element {
	return (
		<Button
			w="10"
			h="10"
			mt="3"
			ml={idx === 0 ? '0' : '3'}
			alignItems="center"
			disabled={selectionIdx === -1}
			onPress={() => onPress({ selectionIdx, letterDisplayIdx: idx })}
			variant={selectionIdx === -1 ? 'outline' : undefined}
		>
			{letter}
		</Button>
	);
}

function LetterSelection({
	letter,
	isSelected,
	idx,
	onPress,
}: LetterSelection & {
	idx: number;
	onPress: (params: { idx: number; letter: string; isSelected: boolean }) => void;
}): JSX.Element {
	return (
		<Button
			w="10"
			h="10"
			mt="3"
			ml={idx === 0 ? '0' : '3'}
			variant={isSelected ? 'outline' : undefined}
			_pressed={{ bg: isSelected ? 'white' : 'unset' }}
			onPress={() => {
				onPress({ idx, letter, isSelected });
			}}
		>
			{letter}
		</Button>
	);
}
export default Game;
