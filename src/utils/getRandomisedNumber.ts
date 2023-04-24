export const getRandomisedNumber = (maxNumber: number) => {
	// const ts = new Date().getTime();
	// return ts % maxNumber;
	return Math.floor(Math.random() * maxNumber);
};
