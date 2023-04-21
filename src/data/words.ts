/**
 * Data
 */

import { getRandomisedNumber } from '../utils';

const wordsByCategory = [
	{
		categoryId: '1',
		words: [
			{ name: 'United States' },
			{ name: 'China' },
			{ name: 'India' },
			{ name: 'Brazil' },
			{ name: 'Russia' },
			{ name: 'Japan' },
			{ name: 'Mexico' },
			{ name: 'Indonesia' },
			{ name: 'Turkey' },
			{ name: 'Germany' },
			{ name: 'United Kingdom' },
			{ name: 'France' },
			{ name: 'Italy' },
			{ name: 'South Africa' },
			{ name: 'Nigeria' },
			{ name: 'Canada' },
			{ name: 'Argentina' },
			{ name: 'Spain' },
			{ name: 'Australia' },
			{ name: 'Egypt' },
		],
	},
	{
		categoryId: '2',
		words: [
			{ name: 'Teacher' },
			{ name: 'Nurse' },
			{ name: 'Chef' },
			{ name: 'Actor' },
			{ name: 'Writer' },
			{ name: 'Artist' },
			{ name: 'Pilot' },
			{ name: 'Chef' },
			{ name: 'Singer' },
			{ name: 'Baker' },
			{ name: 'Athlete' },
			{ name: 'Mechanic' },
			{ name: 'Engineer' },
			{ name: 'Carpenter' },
			{ name: 'Barber' },
			{ name: 'Plumber' },
			{ name: 'Designer' },
			{ name: 'Gardener' },
		],
	},
	{
		categoryId: '3',
		words: [
			{ name: 'Killer whale' },
			{ name: 'Giant panda' },
			{ name: 'Flying squirrel' },
			{ name: 'Honey badger' },
			{ name: 'Blue whale' },
			{ name: 'African elephant' },
			{ name: 'Hammerhead shark' },
			{ name: 'Mountain goat' },
			{ name: 'Arctic fox' },
			{ name: 'Green turtle' },
			{ name: 'Giraffe' },
			{ name: 'Gorilla' },
			{ name: 'Chimpanzee' },
			{ name: 'Polar bear' },
			{ name: 'Penguin' },
			{ name: 'Kangaroo' },
			{ name: 'Koala' },
			{ name: 'Dolphin' },
			{ name: 'Whale' },
			{ name: 'Shark' },
		],
	},
	{ categoryId: '4', words: [{ name: 'abcd', hint: 'Simple' }] },
];

/**
 * Types
 */

export type WordData = {
	categoryId: string;
	id: string;
	word: string;
	hint: string;
};

/**
 * Utils
 */

let wordId = 0;
export const getAllWords = (): WordData[] => {
	const words = wordsByCategory.flatMap((categoryWords) => {
		return categoryWords.words.map((word) => ({
			categoryId: categoryWords.categoryId,
			id: `${categoryWords.categoryId}${wordId++}`,
			word: word.name,
			hint: word.hint,
		}));
	});
	wordId = 0;
	return words;
};

export const getRandomisedWordByCategory = (categoryId: string, playedWordIds: string[]): WordData => {
	const allWords = getAllWords();
	const wordsByCategory = allWords.filter(
		(word) => word.categoryId === categoryId && !playedWordIds.includes(word.id),
	);
	const randomIdx = getRandomisedNumber(wordsByCategory.length);

	return wordsByCategory[randomIdx];
};
