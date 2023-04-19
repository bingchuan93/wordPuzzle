const wordsByCategory = [
	{
		categoryId: 1,
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
			{ name: 'Egypt' }
		]
	},
	{
		categoryId: 2,
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
			{ name: 'Gardener' }
		]
	},
	{
		categoryId: 3,
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
			{ name: 'Shark' }
		]
	}
];

let wordId = 0;
export const getWords = () => {
	const words = wordsByCategory.flatMap((categoryWords) => {
		return categoryWords.words.map((word) => ({
			categoryId: categoryWords.categoryId,
			id: `${categoryWords.categoryId}${wordId++}`,
			word: word.name
		}));
	});
	wordId = 0;
	return words;
};
