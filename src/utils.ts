import { Alert, AlertButton } from 'react-native';

export const getRandomisedNumber = (maxNumber: number) => {
	const ts = new Date().getTime();
	return ts % maxNumber;
};

export const getRandomisedArray = (array: any[]) => {
	const clonedArray = [...array];
	const newArray = [];

	for (let i = clonedArray.length; i > 0; i--) {
		const randomIdx = getRandomisedNumber(i);
		newArray.push(clonedArray[randomIdx]);
		clonedArray.splice(randomIdx, 1);
	}

	return newArray;
};

export const actionWithConfirmation = ({
	alertTitle = '',
	alertMessage,
	confirmationText = 'Okay',
	confirmationAction,
	cancellationText = 'Cancel',
	cancellationAction = () => {},
}: {
	alertTitle?: string;
	alertMessage: string;
	confirmationText?: string;
	confirmationAction: AlertButton['onPress'];
	cancellationText?: string;
	cancellationAction?: AlertButton['onPress'];
}) => {
	Alert.alert(alertTitle, alertMessage, [
		{ text: confirmationText, style: 'destructive', onPress: confirmationAction },
		{ text: cancellationText, style: 'default', onPress: cancellationAction },
	]);
};
