import React from 'react';
import { NativeBaseProvider, extendTheme, View } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/homePage';
import Game from './pages/game';
import { RootStackParamList } from './type';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
	const theme = extendTheme({
		colors: {
			text: {
				100: '#5D6F6F',
				300: '#4A5959',
				500: '#384343',
			},
			revText: {
				500: '#384343',
			},
			primary: {
				300: '#86B4EA',
				500: '#5899E2',
				700: '#408ADD',
			},
			danger: {
				500: '#DE541E',
			},
			warning: {
				500: '#F4E76Eƒ',
			},
			bg: {
				500: '#E0D8DE',
			},
		},
	});

	return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="HomePage">
						<Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Welcome' }} />
						<Stack.Screen
							name="Game"
							component={Game}
							options={{ gestureEnabled: true, headerBackVisible: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}

export default App;
