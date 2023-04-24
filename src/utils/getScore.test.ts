import { WordData } from '../data/words';
import { LetterDisplay } from '../pages/game';
import { getScore } from './getScore';

describe('getScore can get score value if', () => {
	const oneWordQuestion: WordData = {
		categoryId: '1',
		id: '123',
		word: 'WaNd',
	};
	const twoWordQuestion: WordData = {
		categoryId: '1',
		id: '124',
		word: 'WaNd LoTs',
	};
	const threeWordQuestion: WordData = {
		categoryId: '1',
		id: '125',
		word: 'WaNd LoTs RuIn',
	};
	const letterDisplays: { [key: string]: LetterDisplay } = {};
	const letters: string[] = ['W', 'A', 'N', 'D', 'L', 'O', 'T', 'S', 'R', 'U', 'I', 'N'];

	letters.forEach((letter, idx) => {
		letterDisplays[letter] = {
			letter,
			selectionIdx: idx,
		};
	});
	const firstWordAnswer = [letterDisplays['W'], letterDisplays['A'], letterDisplays['N'], letterDisplays['D']];
	const secondWordAnswer = [letterDisplays['L'], letterDisplays['O'], letterDisplays['T'], letterDisplays['S']];
	const thirdWordAnswer = [letterDisplays['R'], letterDisplays['U'], letterDisplays['I'], letterDisplays['N']];
	const oneWordAnswer: LetterDisplay[][] = [firstWordAnswer];
	const twoWordAnswer: LetterDisplay[][] = [firstWordAnswer, secondWordAnswer];
	const threeWordAnswer: LetterDisplay[][] = [firstWordAnswer, secondWordAnswer, thirdWordAnswer];

	test.each([
		// Correct Answers
		{
			testDesp: 'question has 1 word and user answers correctly',
			question: oneWordQuestion,
			answer: oneWordAnswer,
			noOfSkips: 0,
			expectedScore: 4,
		},
		{
			testDesp: 'question has 2 word and user answers correctly',
			question: twoWordQuestion,
			answer: twoWordAnswer,
			noOfSkips: 0,
			expectedScore: 12,
		},
		{
			testDesp: 'question has 3 word and user answers correctly',
			question: threeWordQuestion,
			answer: threeWordAnswer,
			noOfSkips: 0,
			expectedScore: 24,
		},
		// Correct Answer with skips
		{
			testDesp: 'question has 1 word and user answered correctly but skipped 1 time',
			question: oneWordQuestion,
			answer: oneWordAnswer,
			noOfSkips: 1,
			expectedScore: 3,
		},
		{
			testDesp: 'question has 1 word and user answered correctly but skipped 2 time',
			question: oneWordQuestion,
			answer: oneWordAnswer,
			noOfSkips: 2,
			expectedScore: 2,
		},
		{
			testDesp: 'question has 2 words and user answered correctly but skipped 1 time',
			question: twoWordQuestion,
			answer: twoWordAnswer,
			noOfSkips: 1,
			expectedScore: 11,
		},
		{
			testDesp: 'question has 2 words and user answered correctly but skipped 2 time',
			question: twoWordQuestion,
			answer: twoWordAnswer,
			noOfSkips: 2,
			expectedScore: 10,
		},
		// Wrong Answer
		{
			testDesp: 'question has 1 word and user answer first and second letter wrongly',
			question: oneWordQuestion,
			answer: [[letterDisplays['A'], letterDisplays['W'], letterDisplays['N'], letterDisplays['D']]],
			noOfSkips: 0,
			expectedScore: 0,
		},
		{
			testDesp: 'question has 1 word and user answer third and fourth letter wrongly',
			question: oneWordQuestion,
			answer: [[letterDisplays['W'], letterDisplays['A'], letterDisplays['D'], letterDisplays['A']]],
			noOfSkips: 0,
			expectedScore: 0,
		},
		{
			testDesp: 'question has 2 words and user answer first word’s third and fourth letter wrongly',
			question: twoWordQuestion,
			answer: [
				[letterDisplays['W'], letterDisplays['A'], letterDisplays['D'], letterDisplays['A']],
				secondWordAnswer,
			],
			noOfSkips: 0,
			expectedScore: 0,
		},
		{
			testDesp: 'question has 2 words and user answer the second word’s first and second letter wrongly',
			question: twoWordQuestion,
			answer: [
				firstWordAnswer,
				[letterDisplays['O'], letterDisplays['L'], letterDisplays['T'], letterDisplays['S']],
			],
			noOfSkips: 0,
			expectedScore: 0,
		},
	])('$testDesp', ({ question, answer, noOfSkips, expectedScore }) => {
		expect(getScore({ questionDisplay: answer, question, noOfSkips })).toBe(expectedScore);
	});
});
