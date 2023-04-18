import React from 'react';
import { Button, SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../type';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;

function HomePage({ navigation }: Props): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<View>
				<Text>HomePage.ts</Text>
				<Button
					title="Jump"
					onPress={() => {
						navigation.push('Game');
					}}
				/>
			</View>
		</SafeAreaView>
	);
}

export default HomePage;
