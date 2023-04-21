import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/homePage';
import Game from './pages/game';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root(): JSX.Element {
	return (
		<Stack.Navigator initialRouteName="HomePage">
			<Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Welcome' }} />
			<Stack.Screen name="Game" component={Game} options={{ gestureEnabled: true, headerBackVisible: false }} />
		</Stack.Navigator>
	);
}

export default Root;
