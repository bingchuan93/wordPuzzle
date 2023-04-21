import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Box, Button, VStack, Text } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { StyleSheet } from 'react-native';
import { GameCategoryData, getCategories } from '../data/categories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { open } from '../redux/modal';
import { selectUser } from '../redux/user';
import { DEFAULT_USERNAME } from '../constants';
import UserForm from '../components/modal/custom/userForm';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;

function HomePage({ navigation }: Props): JSX.Element {
	const [categories, setCategories] = useState<GameCategoryData[] | null>([]);
	const [isChangingUser, setIsChangingUser] = useState<boolean>(true);
	const inset = useSafeAreaInsets();
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const categories = getCategories();
		if (categories) {
			setCategories(categories);
		}
	}, []);

	const handleChangeUser = () => {
		setIsChangingUser(true);
	};

	return (
		<>
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
					<Box w="100%" flexDirection="row" justifyContent="space-between" alignItems="center" mb="6">
						<Box flexDirection="row" alignItems="center">
							<Text fontSize="md" color="text.500">
								Hi, {user.username || DEFAULT_USERNAME}
							</Text>
							<Button
								variant="outline"
								size="xs"
								py="1"
								px="2"
								ml="2"
								_text={{ color: 'text.500' }}
								onPress={handleChangeUser}
							>
								Edit
							</Button>
						</Box>
						<Text fontSize="2xs" color="text.100">
							Best Score: <Text bold>{user.highScore}</Text>
						</Text>
					</Box>
					<View style={styles.contentContainer}>
						<Text fontSize="sm" color="text.100" mb="6">
							Select a category
						</Text>
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
			<UserForm isOpen={isChangingUser} onClose={() => setIsChangingUser(false)} />
		</>
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
