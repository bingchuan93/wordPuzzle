import React from 'react';
import { View } from 'react-native';
import Modal from './components/modal';
import Navigator from './navigator';

function Root(): JSX.Element {
	return (
		<View style={{ flex: 1 }}>
			<Navigator />
			<Modal />
		</View>
	);
}

export default Root;
