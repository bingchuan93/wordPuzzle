import { CheckCircleIcon, HStack, WarningIcon } from 'native-base';
import { useMemo } from 'react';

type Props = {
	level: number;
};

const DifficultyTheme: { [key: number]: string } = {
	1: 'success.500',
	2: 'warning.500',
	3: 'danger.700',
};

const getDifficultyTheme = (level: number) => {
	return DifficultyTheme[level] ?? DifficultyTheme[3];
};

function DifficultyLevel({ level }: Props): JSX.Element {
	const theme = useMemo(() => getDifficultyTheme(level), [level]);

	const renderDifficultyLevel = (): JSX.Element[] => {
		const icons = [];
		for (let i = 0; i < level; i++) {
			icons.push(<WarningIcon key={i} color={theme} />);
		}

		return icons;
	};

	return <HStack>{level === 1 ? <CheckCircleIcon color={theme} /> : renderDifficultyLevel()}</HStack>;
}

export default DifficultyLevel;
