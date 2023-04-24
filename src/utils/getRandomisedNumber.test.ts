import { getRandomisedNumber } from './getRandomisedNumber';

describe('getRandomisedNumber can return numbers with range if', () => {
	test.each([
		{
			testDesp: 'random number randomised to 0',
			mockValue: 0,
			maxNumber: 7,
			expectedValue: 0,
		},
		{
			testDesp: 'random number randomised to 0.999',
			mockValue: 0.999,
			maxNumber: 7,
			expectedValue: 6,
		},
	])('$testDesp', ({ mockValue, maxNumber, expectedValue }) => {
		jest.spyOn(Math, 'random').mockReturnValue(mockValue);
		expect(getRandomisedNumber(maxNumber)).toBe(expectedValue);
		jest.spyOn(Math, 'random').mockRestore();
	});
});
