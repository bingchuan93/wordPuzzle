export const getRandomisedNumber = (maxNumber: number) => {
	const ts = new Date().getTime();
	return ts % maxNumber;
};
