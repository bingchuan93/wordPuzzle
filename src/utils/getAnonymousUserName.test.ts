import AsyncStorage from '@react-native-async-storage/async-storage';
import { AS_KEYS, DEFAULT_USERNAME } from '../constants';
import { getFromAS, saveToAS } from './asHandlers';
import { getAnonymousUserName } from './getAnonymousUserName';

let startingIdx: number | null = null;
beforeAll(async () => {
	const result = await getFromAS<number>(AS_KEYS.ANONYMOUS_IDX);
	expect(result.success).toBe(true);
	if (result.result !== null) {
		expect(result.result).toBeInstanceOf(Number);
		startingIdx = result.result as number;
	}
});

afterAll(async () => {
	if (startingIdx !== null) {
		await saveToAS(AS_KEYS.ANONYMOUS_IDX, startingIdx);
		const result = await getFromAS<number>(AS_KEYS.ANONYMOUS_IDX);
		expect(result).toEqual({ succes: true, result: startingIdx });
	} else {
		await AsyncStorage.removeItem(AS_KEYS.ANONYMOUS_IDX);
	}
});

describe('getAnonymouseUserName can get', () => {
	test('next anonymous name', async () => {
		const currentIdx = 1000;
		await saveToAS(AS_KEYS.ANONYMOUS_IDX, currentIdx);
		const name = await getAnonymousUserName();
		expect(name).toBe(`${DEFAULT_USERNAME} ${currentIdx}`);
	});

	test('starting anonymouse name', async () => {
		await AsyncStorage.removeItem(AS_KEYS.ANONYMOUS_IDX);
		const name = await getAnonymousUserName();
		expect(name).toBe(`${DEFAULT_USERNAME} 0`);
	});
});
