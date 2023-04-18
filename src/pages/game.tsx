import React, { useEffect } from 'react';
import { Alert, SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;

function Game({ navigation }: Props): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
			Alert.alert('', 'Are you sure you want to leave the current game?', [
				{ text: 'Stay', style: 'cancel', onPress: () => {} },
				{
					text: 'Leave',
					style: 'destructive',
					onPress: () => navigation.dispatch(e.data.action)
				}
			]);
		});
	}, [navigation]);

	return (
		<SafeAreaView style={backgroundStyle}>
			<View>
				<Text>Game.ts</Text>
			</View>
		</SafeAreaView>
	);
}

export default Game;
