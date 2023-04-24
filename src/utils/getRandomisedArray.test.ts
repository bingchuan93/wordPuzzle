import { getRandomisedArray } from './getRandomisedArray';

describe('getRandomisedArray can return alternate array if', () => {
	test('randomised always randomise to max number', () => {
		const array = [1, 2, 3, 4, 5, 6, 7];
		const expectedValue = [7, 6, 5, 4, 3, 2, 1];
		const mockValue = 0.999;
		jest.spyOn(Math, 'random').mockReturnValue(mockValue);
		expect(getRandomisedArray(array)).toEqual(expectedValue);
		jest.spyOn(Math, 'random').mockRestore();
	});
});
