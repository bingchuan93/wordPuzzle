import React, { useEffect } from 'react';
import { Alert, BackHandler, SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

function Game({ navigation }: Props): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	useFocusEffect(() => {
		const sub = BackHandler.addEventListener('hardwareBackPress', preventNativeHardwareBackPress);
		return () => sub.remove();
	});

	const preventNativeHardwareBackPress = () => {
		return true;
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<View>
				<Text>Game.ts</Text>
			</View>
		</SafeAreaView>
	);
}

export default Game;
