import { AS_KEYS } from '../constants';
import { HighScoreRecord } from '../type';
import { getFromAS } from './asHandlers';

export const getAllHighScore = async (): Promise<HighScoreRecord | undefined> => {
	const highScoreRes = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	if (highScoreRes.success && highScoreRes.result) {
		return highScoreRes.result;
	}
};
