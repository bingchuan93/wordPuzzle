import { AS_KEYS, DEFAULT_USERNAME } from '../constants';
import { getFromAS, saveToAS } from './asHandlers';

export const getAnonymousUserName = async (): Promise<string> => {
	const res = await getFromAS<number>(AS_KEYS.ANONYMOUS_IDX);
	let idx = 0;
	if (res && res.success && res.result) {
		idx = res.result;
	}
	await saveToAS(AS_KEYS.ANONYMOUS_IDX, idx + 1);
	return `${DEFAULT_USERNAME} ${idx}`;
};
