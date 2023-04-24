import { getRandomisedNumber } from './getRandomisedNumber';
import _ from 'lodash';

export const getRandomisedArray = (array: any[]) => {
	const clonedArray = [...array];
	const newArray = [];
	let isArraySame = true;

	let j = 0;
	while (isArraySame) {
		j++;
		for (let i = clonedArray.length; i > 0; i--) {
			const randomIdx = getRandomisedNumber(i);
			newArray.push(clonedArray[randomIdx]);
			clonedArray.splice(randomIdx, 1);
		}
		isArraySame = _.isEqual(clonedArray, newArray);
	}

	if (j > 1) {
		console.log('TWICE');
	}

	return newArray;
};
