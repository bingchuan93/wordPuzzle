/**
 * Data
 */

import { getRandomisedNumber } from '../utils';

const wordsByCategory: WordRawData[] = [
	{
		categoryId: '1',
		words: [
			{ name: 'Teacher' },
			{ name: 'Nurse' },
			{ name: 'Chef' },
			{ name: 'Actor' },
			{ name: 'Writer' },
			{ name: 'Artist' },
			{ name: 'Pilot' },
			{ name: 'Developer' },
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
		categoryId: '2',
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
		categoryId: '3',
		words: [
			{ name: 'Killer whale', hint: 'Swims in the sea' },
			{ name: 'Giant panda' },
			{ name: 'Flying squirrel' },
			{ name: 'Honey badger' },
			{ name: 'Blue whale', hint: 'Swims in the sea' },
			{ name: 'African elephant' },
			{ name: 'Hammerhead shark', hint: 'Swims in the sea' },
			{ name: 'Mountain goat' },
			{ name: 'Arctic fox' },
			{ name: 'Green turtle', hint: 'Lives very long' },
			{ name: 'Giraffe', hint: 'Has a long neck' },
			{ name: 'Gorilla', hint: 'Climbs a tree' },
			{ name: 'Chimpanzee', hint: 'Swims in the sea' },
			{ name: 'Polar bear' },
			{ name: 'Penguin' },
			{ name: 'Kangaroo' },
			{ name: 'Koala', hint: 'Climbs a tree' },
			{ name: 'Dolphin', hint: 'Swims in the sea' },
			{ name: 'Whale', hint: 'Swims in the sea' },
			{ name: 'Shark', hint: 'Swims in the sea' },
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
	hint?: string;
};

export type WordRawData = {
	categoryId: string;
	words: { name: string; hint?: string }[];
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

export const getRandomisedWordByCategory = (
	categoryId: string,
	playedWordIds: string[],
	skippedQuestion?: WordData | null,
): { word: WordData; hasMore: boolean } => {
	const allWords = getAllWords();
	const wordsByCategory = allWords.filter((word) => word.categoryId === categoryId);
	const unplayedWords = wordsByCategory.filter((word) => !playedWordIds.includes(word.id));
	const removedSkippedWords = unplayedWords.filter((word) => word.id !== skippedQuestion?.id);
	const randomIdx = getRandomisedNumber(removedSkippedWords.length);

	return { word: removedSkippedWords[randomIdx], hasMore: unplayedWords.length > 1 };
};
