import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Box, Button } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { StyleSheet } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;

function HomePage({ navigation }: Props): JSX.Element {
	const [categories, setCategories] = useState([]);

	// const useEffect(() => {

	// },[])

	return (
		<View style={styles.container}>
			<Box
				p="2"
				mt="10"
				bg="bg.500"
				_text={{
					fontSize: '4xl',
					fontWeight: 'medium',
					color: 'text.500',
					letterSpacing: 'lg',
					textAlign: 'center'
				}}
				shadow={2}
			>
				Word Puzzle
			</Box>
			<Button
				onPress={() => {
					navigation.push('Game');
				}}
			>
				Jump
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	}
});

export default HomePage;
