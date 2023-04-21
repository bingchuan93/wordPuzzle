import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Box, Button, Center, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { StyleSheet } from 'react-native';
import { GameCategoryData, getCategories } from '../data/categories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch } from '../redux/hooks';
import { open } from '../redux/modal';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;

function HomePage({ navigation }: Props): JSX.Element {
	const [categories, setCategories] = useState<GameCategoryData[] | null>([]);
	const inset = useSafeAreaInsets();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const categories = getCategories();
		if (categories) {
			setCategories(categories);
		}
	}, []);

	return (
		<View style={styles.container}>
			<View>
				<Box
					p="2"
					mt="10"
					mb="10"
					bg="bg.500"
					_text={{
						fontSize: '4xl',
						fontWeight: 'medium',
						color: 'text.500',
						letterSpacing: 'lg',
						textAlign: 'center',
					}}
					shadow={2}
				>
					Word Puzzle
				</Box>
				<View style={styles.contentContainer}>
					<Box mb="6">Choose a category to start</Box>
					{categories && categories.length ? (
						<VStack space={4} alignItems="center">
							{categories.map((category) => {
								return (
									<Button
										key={category.id}
										w="64"
										h="50"
										bg="primary.500"
										rounded="xs"
										shadow={3}
										_text={{
											color: 'white',
										}}
										_pressed={{ bg: 'primary.700' }}
										onPress={() => {
											navigation.navigate('Game', { categoryId: category.id });
										}}
									>
										{category.name}
									</Button>
								);
							})}
						</VStack>
					) : (
						<View>
							<Box>No Categories Found</Box>
						</View>
					)}
				</View>
			</View>
			<Button
				style={{ marginBottom: inset.bottom }}
				onPress={() => {
					dispatch(open({ props: {} }));
					// BCWEE navigate to leader board modal
					// navigation.push('Game');
				}}
			>
				Leaders Board
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		flex: 1,
	},
	contentContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export default HomePage;
