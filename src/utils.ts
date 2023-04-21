import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, AlertButton } from 'react-native';
import { AS_KEYS } from './constants';
import { WordData } from './data/words';
import { LetterDisplay } from './pages/game';
import { AsyncStorageReturnType, HighScoreRecord, PromiseReturnType } from './type';

export const getRandomisedNumber = (maxNumber: number) => {
	const ts = new Date().getTime();
	return ts % maxNumber;
};

export const getRandomisedArray = (array: any[]) => {
	const clonedArray = [...array];
	const newArray = [];

	for (let i = clonedArray.length; i > 0; i--) {
		const randomIdx = getRandomisedNumber(i);
		newArray.push(clonedArray[randomIdx]);
		clonedArray.splice(randomIdx, 1);
	}

	return newArray;
};

export const actionWithConfirmation = ({
	alertTitle = '',
	alertMessage,
	confirmationText = 'Okay',
	confirmationAction,
	cancellationText = 'Cancel',
	cancellationAction = () => {},
}: {
	alertTitle?: string;
	alertMessage: string;
	confirmationText?: string;
	confirmationAction: AlertButton['onPress'];
	cancellationText?: string;
	cancellationAction?: AlertButton['onPress'];
}) => {
	Alert.alert(alertTitle, alertMessage, [
		{ text: confirmationText, style: 'destructive', onPress: confirmationAction },
		{ text: cancellationText, style: 'default', onPress: cancellationAction },
	]);
};

const WordComplexityScoreTier: { [key: number]: number } = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0.1,
	7: 0.1,
	8: 0.1,
	9: 0.2,
	10: 0.2,
	11: 0.2,
	12: 0.3,
	13: 0.3,
	14: 0.4,
	15: 0.45,
	16: 0.5,
	17: 0.55,
	18: 0.6,
};
export const getScore = ({
	questionDisplay,
	question,
}: {
	questionDisplay: LetterDisplay[][];
	question: WordData;
}): number => {
	let noOfWordsModifier = 1;
	let wordComplexityModifier = 1;
	let wordIdx = 0;
	let wordOffsetIdx = 0;
	let score = 0;
	for (let i = 0; i < question.word.length; i++) {
		if (question.word[i] === ' ') {
			noOfWordsModifier += 0.5;
			wordComplexityModifier +=
				WordComplexityScoreTier[questionDisplay[wordIdx].length as number] ?? WordComplexityScoreTier[18];
			wordOffsetIdx = i + 1;
			wordIdx++;
		} else if (
			questionDisplay[wordIdx][i - wordOffsetIdx].letter.toLocaleLowerCase() ===
			question.word[i].toLocaleLowerCase()
		) {
			score++;
		} else {
			score = 0;
			break;
		}
	}
	if (score === 0) {
		return score;
	}
	wordComplexityModifier +=
		WordComplexityScoreTier[questionDisplay[wordIdx].length as number] ?? WordComplexityScoreTier[18];

	return Math.floor(score * noOfWordsModifier * wordComplexityModifier);
};

export const getFromAS = async <T>(key: string): Promise<AsyncStorageReturnType<T>> => {
	return new Promise((resolve) => {
		AsyncStorage.getItem(key, (error, result) => {
			if (error) {
				resolve({ success: false });
			}
			try {
				resolve({ success: true, result: result ? JSON.parse(result) : {} });
			} catch (e) {
				resolve({ success: true });
			}
		});
	});
};

export const saveToAS = async (key: string, data: any): Promise<AsyncStorageReturnType<undefined>> => {
	return new Promise((resolve) => {
		AsyncStorage.setItem(key, JSON.stringify(data), (error) => resolve({ success: error ? false : true }));
	});
};

export const saveHighScore = async (username: string, incomingHighScore: number): Promise<boolean> => {
	const highScoreRes = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	let highScore: HighScoreRecord = {};
	if (highScoreRes.success && highScoreRes.result) {
		highScore = highScoreRes.result;
		if (highScore && highScore[username] && highScore[username] < incomingHighScore) {
			highScore[username] = incomingHighScore;
		}
	} else {
		highScore[username] = incomingHighScore;
	}
	const result = await saveToAS(AS_KEYS.USER_HIGH_SCORE, highScore);
	return result.success;
};

export const getAllHighScore = async (): Promise<HighScoreRecord | undefined> => {
	const highScoreRes = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	if (highScoreRes.success && highScoreRes.result) {
		return highScoreRes.result;
	}
};

export const getUserHighScore = async (username: string): Promise<number> => {
	const highScoreRes = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	if (highScoreRes.success && highScoreRes.result) {
		return highScoreRes.result[username] || 0;
	}
	return 0;
};
