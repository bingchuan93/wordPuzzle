export type RootStackParamList = {
	HomePage: undefined;
	Game: {
		categoryId: string;
	};
	// Modals
	Leaderboard: undefined;
};

export type PromiseReturnType = {
	success: boolean;
};

export type AsyncStorageReturnType<T> = PromiseReturnType & { result?: T };

export type HighScoreRecord = { [key: string]: number };
