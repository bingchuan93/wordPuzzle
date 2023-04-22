import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromAS, saveToAS } from './asHandlers';

const AS_TEST_KEY = 'AS_TEST_KEY';

describe('asHandlers function can store and retrieve', () => {
	afterEach(async () => {
		await AsyncStorage.removeItem(AS_TEST_KEY);
	});

	test('number data', async () => {
		await saveToAS(AS_TEST_KEY, 123);
		const result = await getFromAS(AS_TEST_KEY);
		expect(result).toEqual({ success: true, result: 123 });
	});

	test('if previous data was cleared', async () => {
		const result = await getFromAS(AS_TEST_KEY);
		expect(result.result).not.toEqual(123);
	});

	test('float data', async () => {
		const testData = 1.123;
		await saveToAS(AS_TEST_KEY, testData);
		const result = await getFromAS(AS_TEST_KEY);
		expect(result).toEqual({ success: true, result: testData });
	});

	test('string data', async () => {
		const testData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnoprstuvwxya !@#$%^&*()_+{}[]\\|;\':"<>,./?';
		await saveToAS(AS_TEST_KEY, testData);
		const result = await getFromAS(AS_TEST_KEY);
		expect(result).toEqual({ success: true, result: testData });
	});

	test('boolean data', async () => {
		const testData = false;
		await saveToAS(AS_TEST_KEY, testData);
		const result = await getFromAS(AS_TEST_KEY);
		expect(result).toEqual({ success: true, result: testData });
	});

	test('json data', async () => {
		const testData = {
			string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnoprstuvwxya !@#$%^&*()_+{}[]\\|;\':"<>,./?',
			number: 123,
			float: 1.123,
			boolean: false,
		};
		await saveToAS(AS_TEST_KEY, testData);
		const result = await getFromAS(AS_TEST_KEY);
		expect(result).toEqual({ success: true, result: testData });
	});
});
