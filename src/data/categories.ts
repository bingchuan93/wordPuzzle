/**
 * Data
 */

export const GameCategories: GameCategoryData[] = [
	{
		id: '1',
		name: 'Occupation',
		difficultyLevel: 1,
	},
	{
		id: '2',
		name: 'Country',
		difficultyLevel: 2,
	},
	{
		id: '3',
		name: 'Animal',
		difficultyLevel: 3,
	},
	// {
	// 	id: '4',
	// 	name: 'Testing',
	// 	difficultyLevel: 1,
	// },
];

/**
 * Types
 */

export type GameCategoryData = {
	id: string;
	name: string;
	difficultyLevel: number;
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
