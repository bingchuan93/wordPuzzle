import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import modalReducer from './modal';
import userReducer from './user';

const persistConfig = {
	key: 'user',
	storage: AsyncStorage,
};

const rootReducers = combineReducers({
	modal: modalReducer,
	user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
