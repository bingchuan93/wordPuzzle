import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './type';

import HomePage from './pages/homePage';
import Game from './pages/game';
import UserForm from './pages/modals/userForm';

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
				<Stack.Screen name="UserForm" component={UserForm} options={{ title: 'User Profile' }} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

export default Root;
