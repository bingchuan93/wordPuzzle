import React from 'react';
import { NativeBaseProvider, Box, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/homePage';
import Game from './pages/game';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
	const theme = extendTheme({
		colors: {
			text: {
				500: '#384343'
			},
			primary: {
				500: '#51BBFE'
			},
			danger: {
				500: '#DE541E'
			},
			warning: {
				500: '#F4E76Eƒ'
			},
			bg: {
				500: '#E0D8DE'
			}
		}
	});
	return (
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
	);
}

export default App;
