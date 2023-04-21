import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux';

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
				300: '#E7774B',
				500: '#DE541E',
				700: '#C54B1B',
			},
			warning: {
				500: '#F4E76Eƒ',
			},
			bg: {
				500: '#E0D8DE',
			},
			success: {
				500: '#23CE6B',
				700: '#1EAE5A',
			},
		},
	});

	return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<ReduxProvider store={store}>
					<NavigationContainer>
						<Root />
					</NavigationContainer>
				</ReduxProvider>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}

export default App;
