import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Box, Button, VStack, Text, ShareIcon, Center, HStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';
import { StyleSheet } from 'react-native';
import { GameCategoryData, getCategories } from '../data/categories';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector } from '../redux/hooks';
import { selectUser } from '../redux/user';
import { DEFAULT_USERNAME } from '../constants';
import UserForm, { UserFormMode } from '../components/modal/custom/userForm';
import Share from 'react-native-share';
import DifficultyLevel from '../components/difficultyLevel';

type Props = NativeStackScreenProps<RootStackParamList, 'HomePage'>;

function HomePage({ navigation }: Props): JSX.Element {
	const [categories, setCategories] = useState<GameCategoryData[] | null>([]);
	const [isChangingUser, setIsChangingUser] = useState<boolean>(false);
	const [userChangeMode, setUserChangeMode] = useState<UserFormMode>(UserFormMode.CHANGE);
	const inset = useSafeAreaInsets();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		if (user.username === '') {
			setUserChangeMode(UserFormMode.NEW);
			setIsChangingUser(true);
		}
		const categories = getCategories();
		if (categories) {
			setCategories(categories);
		}
	}, []);

	useEffect(() => {
		setUserChangeMode(user.username === '' ? UserFormMode.NEW : UserFormMode.CHANGE);
	}, [user]);

	const handleChangeUser = () => {
		setIsChangingUser(true);
	};

	const handleShare = () => {
		Share.open({
			title: 'Word Puzzle',
			message: `I have achieved a highscore of ${user.highScore}! Can you beat me?`,
		})
			.then((res) => {})
			.catch((err) => {});
	};

	return (
		<>
			<View style={[styles.container, { marginBottom: inset.bottom }]}>
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
							Best Score:{' '}
							<Text fontSize="sm" bold>
								{user.highScore}
							</Text>
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
											w="300px"
											h="50"
											bg="primary.500"
											rounded="xs"
											shadow={3}
											_text={{
												color: 'white',
											}}
											color="white"
											_pressed={{ bg: 'primary.700' }}
											onPress={() => navigation.navigate('Game', { categoryId: category.id })}
										>
											<HStack w="270px" justifyContent="space-between" alignItems="center">
												<Text color="white" isTruncated>
													{category.name}
												</Text>
												<DifficultyLevel level={category.difficultyLevel} />
											</HStack>
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
				<Box w="100%" mb="4" flexDirection="row">
					<Button flex="1" onPress={() => navigation.push('Leaderboard')}>
						Leaders Board
					</Button>
					<Button ml="2" bg="text.100" onPress={handleShare}>
						<ShareIcon color="white" />
					</Button>
				</Box>
			</View>
			<UserForm isOpen={isChangingUser} onClose={() => setIsChangingUser(false)} mode={userChangeMode} />
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
