import { getRandomisedNumber } from './getRandomisedNumber';

export const getRandomisedArray = (array: any[]) => {
	const clonedArray = [...array];
	const newArray = [];

	for (let i = clonedArray.length; i > 0; i--) {
		const randomIdx = getRandomisedNumber(i);
		newArray.push(clonedArray[randomIdx]);
		clonedArray.splice(randomIdx, 1);
	}

	return newArray;
};
