import AsyncStorage from '@react-native-async-storage/async-storage';
import { AS_KEYS } from '../constants';
import { HighScoreRecord } from '../type';
import { getFromAS, saveToAS } from './asHandlers';
import { getAllHighScore } from './getAllHighScore';
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

describe('getAllHighScore can get the correct high scores if', () => {
	test('AsyncStorage is empty', async () => {
		await AsyncStorage.removeItem(AS_KEYS.USER_HIGH_SCORE);

		const currentHighScores = await getAllHighScore();
		expect(currentHighScores).toBeUndefined();
	});
	test('AsyncStorage has 1 high score', async () => {
		const testName = 'John';
		const testScore = 123;
		const currentHighScore: HighScoreRecord = {};

		currentHighScore[testName] = testScore;
		await saveHighScore(testName, testScore);

		await saveToAS(AS_KEYS.USER_HIGH_SCORE, currentHighScore);
		const allHighScores = await getAllHighScore();
		expect(allHighScores).toEqual(currentHighScore);
	});
	test('AsyncStorage has 2 high scores', async () => {
		const currentHighScores = await getAllHighScore();
		expect(currentHighScores).not.toBeUndefined();

		(currentHighScores as HighScoreRecord)['Mary'] = 321;
		await saveHighScore('Mary', 321);

		const newHighScores = await getAllHighScore();
		expect(newHighScores).toEqual(currentHighScores);
	});
});
