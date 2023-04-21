import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './type';

import HomePage from './pages/homePage';
import Game from './pages/game';
import Leaderboard from './pages/routeModals/leaderboard';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Root(): JSX.Element {
	return (
		<Stack.Navigator initialRouteName="HomePage">
			<Stack.Group>
				<Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Welcome' }} />
				<Stack.Screen
					name="Game"
					component={Game}
					options={{ gestureEnabled: true, headerBackVisible: false }}
				/>
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Leaderboard" component={Leaderboard} options={{ title: 'Leaderboard' }} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

export default Root;
