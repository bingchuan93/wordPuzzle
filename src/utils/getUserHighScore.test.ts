import AsyncStorage from '@react-native-async-storage/async-storage';
import { AS_KEYS } from '../constants';
import { HighScoreRecord } from '../type';
import { getFromAS, saveToAS } from './asHandlers';
import { getUserHighScore } from './getUserHighScore';
import { saveHighScore } from './saveHighScore';

let startingHighscores: HighScoreRecord | undefined = undefined;
beforeAll(async () => {
	const result = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	expect(result.success).toBe(true);
	if (result.result) {
		startingHighscores = result.result as HighScoreRecord;
	}
});

afterAll(async () => {
	if (startingHighscores) {
		await saveToAS(AS_KEYS.USER_HIGH_SCORE, startingHighscores);
		const result = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
		expect(result).toEqual({ succes: true, result: startingHighscores });
	} else {
		await AsyncStorage.removeItem(AS_KEYS.USER_HIGH_SCORE);
	}
});

describe('getUserHighScore return correct user’s high score if', () => {
	test('username exists in AsyncStorage', async () => {
		const testName = 'Sandy';
		const testScore = 100;
		await saveHighScore(testName, testScore);

		const testNameHighScore = await getUserHighScore(testName);
		expect(testNameHighScore).toBe(testScore);
	});

	test('username doesn’t exists in AsyncStorage', async () => {
		const testName = 'Brandy';
		const testNameHighScore = await getUserHighScore(testName);

		expect(testNameHighScore).toBe(0);
	});

	test('AsyncStorage is empty', async () => {
		const testName = 'Sandy';
		await AsyncStorage.removeItem(AS_KEYS.USER_HIGH_SCORE);

		const testNameHighScore = await getUserHighScore(testName);

		expect(testNameHighScore).toBe(0);
	});
});
