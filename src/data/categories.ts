/**
 * Data
 */

export const GameCategories: GameCategoryData[] = [
	{
		id: '1',
		name: 'Country',
	},
	{
		id: '2',
		name: 'Occupation',
	},
	{
		id: '3',
		name: 'Animal',
	},
	{
		id: '4',
		name: 'Testing',
	},
];

/**
 * Types
 */

export type GameCategoryData = {
	id: string;
	name: string;
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
