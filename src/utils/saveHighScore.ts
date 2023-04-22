import { AS_KEYS } from '../constants';
import { HighScoreRecord } from '../type';
import { getFromAS, saveToAS } from './asHandlers';
import { getAnonymousUserName } from './getAnonymousUserName';

export const saveHighScore = async (username: string, incomingHighScore: number): Promise<boolean> => {
	const highScoreRes = await getFromAS<HighScoreRecord>(AS_KEYS.USER_HIGH_SCORE);
	let name = username || (await getAnonymousUserName());
	let highScore: HighScoreRecord = {};
	if (highScoreRes.success && highScoreRes.result) {
		highScore = highScoreRes.result;
		if (highScore && ((highScore[name] && highScore[name] < incomingHighScore) || !highScore[name])) {
			highScore[name] = incomingHighScore;
		}
	} else {
		highScore[name] = incomingHighScore;
	}
	const result = await saveToAS(AS_KEYS.USER_HIGH_SCORE, highScore);
	return result.success;
};
