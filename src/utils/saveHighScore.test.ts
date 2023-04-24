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
	await AsyncStorage.removeItem(AS_KEYS.USER_HIGH_SCORE);
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

describe('saveHighScore saves score correct when', () => {
	const testName = 'Richard';
	const testScore = 154;
	const highTestScore = 155;
	const lowTestScore = 154;
	test('Username doesn’t exist and incoming score is passed', async () => {
		await saveHighScore(testName, testScore);

		const testUserHighScore = await getUserHighScore(testName);

		expect(testUserHighScore).toBe(testScore);
	});

	test('Username exists and incoming score is higher than current score', async () => {
		await saveHighScore(testName, highTestScore);

		const testUserHighScore = await getUserHighScore(testName);

		expect(testUserHighScore).toBe(highTestScore);
	});

	test('Username exists and incoming score is lower than current score', async () => {
		await saveHighScore(testName, lowTestScore);

		const testUserHighScore = await getUserHighScore(testName);

		expect(testUserHighScore).toBe(highTestScore);
	});

	test('Username exists and incoming score is the same as current score', async () => {
		await saveHighScore(testName, highTestScore);

		const testUserHighScore = await getUserHighScore(testName);

		expect(testUserHighScore).toBe(highTestScore);
	});
});
