import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Root from './root';

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
					<Root />
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}

export default App;