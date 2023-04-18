import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/homePage';
import Game from './pages/game';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="HomePage">
				<Stack.Screen name="HomePage" component={HomePage} />
				<Stack.Screen name="Game" component={Game} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
