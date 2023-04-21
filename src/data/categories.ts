/**
 * Data
 */

export const GameCategories: GameCategoryData[] = [
	{
		id: '1',
		name: 'Country',
		difficulty: 'Medium',
	},
	{
		id: '2',
		name: 'Occupation',
		difficulty: 'Easy',
	},
	{
		id: '3',
		name: 'Animal',
		difficulty: 'Hard',
	},
	{
		id: '4',
		name: 'Testing',
		difficulty: 'Simple',
	},
];

/**
 * Types
 */

export type GameCategoryData = {
	id: string;
	name: string;
	difficulty: string;
};

/**
 * Utils
 */

export const getCategories = (): GameCategoryData[] => {
	return GameCategories;
};

export const getCategory = (categoryId: string): GameCategoryData | undefined => {
	return GameCategories.find((category) => category.id === categoryId);
};
