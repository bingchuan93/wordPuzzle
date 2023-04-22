import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageReturnType } from '../type';

export const getFromAS = async <T>(key: string): Promise<AsyncStorageReturnType<T>> => {
	return new Promise((resolve) => {
		AsyncStorage.getItem(key, (error, result) => {
			if (error) {
				resolve({ success: false });
			}
			try {
				resolve({ success: true, result: JSON.parse(result as string) });
			} catch (e) {
				resolve({ success: true });
			}
		});
	});
};

export const saveToAS = async (key: string, data: any): Promise<AsyncStorageReturnType<undefined>> => {
	return new Promise((resolve) => {
		AsyncStorage.setItem(key, JSON.stringify(data), (error) => resolve({ success: error ? false : true }));
	});
};

export const clearAS = async (key: string): Promise<AsyncStorageReturnType<undefined>> => {
	return new Promise((resolve) => {
		AsyncStorage.removeItem(key, (error) => {
			resolve({ success: error ? false : true });
		});
	});
};
