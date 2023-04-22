import { AS_KEYS } from '../constants';
import { HighScoreRecord } from '../type';
import { getFromAS } from './asHandlers';

export const getUserHighScore = async (username: string): Promise<number> => {
	const highScoreRes = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	if (highScoreRes.success && highScoreRes.result) {
		return highScoreRes.result[username] || 0;
	}
	return 0;
};
