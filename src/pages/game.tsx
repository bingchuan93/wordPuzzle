import React, { useEffect, useMemo, useState } from 'react';
import { BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

import { useFocusEffect } from '@react-navigation/native';
import { getRandomisedWordByCategory, WordData } from '../data/words';
import { GameCategoryData, getCategory } from '../data/categories';
import { Box, Button, HStack, VStack, Text, CloseIcon } from 'native-base';
import { actionWithConfirmation, getRandomisedArray, getScore } from '../utils';
import _ from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

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
	const [question, setQuestion] = useState<WordData | null>(null);
	const [category, setCategory] = useState<GameCategoryData | null>(null);
	const [questionDisplay, setQuestionDisplay] = useState<LetterDisplay[][]>([]);
	const [letterSelection, setLetterSelection] = useState<LetterSelection[]>([]);
	const insets = useSafeAreaInsets();

	useEffect(() => {
		if (categoryId) {
			initData();
			initGame();
		}
	}, []);

	const isCompleted = useMemo<boolean>(() => {
		const lastWordIdx = questionDisplay.length - 1;
		const lastLetterIdx = lastWordIdx !== -1 ? questionDisplay[lastWordIdx].length - 1 : -1;
		return lastLetterIdx !== -1 ? questionDisplay[lastWordIdx][lastLetterIdx].selectionIdx !== -1 : false;
	}, [questionDisplay]);

	console.log('BCWEE', { isCompleted });

	const initData = () => {
		const category = getCategory(categoryId);
		if (category) {
			setCategory(category);
			navigation.setOptions({ title: category.name });
		}
	};

	const initGame = () => {
		const randomWord = getRandomisedWordByCategory(categoryId);
		randomWord.word = randomWord.word.toLocaleUpperCase();
		setQuestion(randomWord);
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

	const handleLetterSelect = ({ idx, letter }: { idx: number; letter: string }) => {
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

	console.log('BCWEe', question);
	return (
		<Box pt="128px" pb={`${insets.bottom}px`} style={{ flex: 1, justifyContent: 'space-between' }}>
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
			<Box alignItems="center" w="100%" px="4">
				{question && (
					<Text mb="5" mt="1" fontSize="sm" color="text.100">
						Hint: {question.hint} {question.word}
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
					<Button
						bg="danger.500"
						_text={{ color: 'white' }}
						onPress={() => {
							navigation.goBack();
						}}
					>
						<CloseIcon color="white" />
					</Button>
					<Button
						bg="primary.500"
						rounded="xs"
						shadow={3}
						_text={{
							color: 'white',
						}}
						_pressed={{ bg: 'primary.700' }}
						ml="4"
						flex="1"
						onPress={() => {
							if (isCompleted) {
								let answer = '';
								questionDisplay.map((wordDisplay, idx) => {
									if (idx != 0) {
										answer += ' ';
									}
									wordDisplay.forEach((letterDisplay) => (answer += letterDisplay.letter));
								});
								console.log(answer);
								const score = getScore({ questionDisplay, question });
								Alert.alert(`${score}`);
							} else {
								actionWithConfirmation({
									alertMessage: 'Are you sure you want to skip?',
									confirmationText: 'Skip',
									confirmationAction: () => {
										initGame();
									},
								});
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
}: LetterSelection & { idx: number; onPress: (params: { idx: number; letter: string }) => void }): JSX.Element {
	return (
		<Button
			w="10"
			h="10"
			mt="3"
			ml={idx === 0 ? '0' : '3'}
			disabled={isSelected}
			variant={isSelected ? 'outline' : undefined}
			onPress={() => {
				onPress({ idx, letter });
			}}
		>
			{letter}
		</Button>
	);
}
export default Game;
