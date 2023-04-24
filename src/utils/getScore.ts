import { WordData } from '../data/words';
import { LetterDisplay } from '../pages/game';

export enum FailReason {
	WRONG_ANSWER = 'WRONG_ANSWER',
	TOO_MANY_SKIP = 'TOO_MANY_SKIP',
}

const WordComplexityScoreTier: { [key: number]: number } = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0.1,
	7: 0.1,
	8: 0.1,
	9: 0.2,
	10: 0.2,
	11: 0.2,
	12: 0.3,
	13: 0.3,
	14: 0.4,
	15: 0.45,
	16: 0.5,
	17: 0.55,
	18: 0.6,
};
export const getScore = ({
	questionDisplay,
	question,
	noOfSkips,
}: {
	questionDisplay: LetterDisplay[][];
	question: WordData;
	noOfSkips: number;
}): { score: number; failReason?: FailReason } => {
	let noOfWordsModifier = 1;
	let wordComplexityModifier = 1;
	let wordIdx = 0;
	let wordOffsetIdx = 0;
	let score = 0;
	for (let i = 0; i < question.word.length; i++) {
		if (question.word[i] === ' ') {
			noOfWordsModifier += 0.5;
			wordComplexityModifier +=
				WordComplexityScoreTier[questionDisplay[wordIdx].length as number] ?? WordComplexityScoreTier[18];
			wordOffsetIdx = i + 1;
			wordIdx++;
		} else if (
			questionDisplay[wordIdx][i - wordOffsetIdx].letter.toLocaleLowerCase() ===
			question.word[i].toLocaleLowerCase()
		) {
			score++;
		} else {
			score = 0;
			break;
		}
	}
	if (score === 0) {
		return { score, failReason: FailReason.WRONG_ANSWER };
	}
	wordComplexityModifier +=
		WordComplexityScoreTier[questionDisplay[wordIdx].length as number] ?? WordComplexityScoreTier[18];

	const finalScore = Math.max(Math.floor(score * noOfWordsModifier * wordComplexityModifier - noOfSkips), 0);
	return { score: finalScore, failReason: finalScore === 0 ? FailReason.TOO_MANY_SKIP : undefined };
};
