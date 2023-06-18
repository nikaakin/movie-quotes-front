import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer, currentModalReducer } from './slices';
import { isSearchBarOnReducer } from './slices/isSearchBarSlice';

export const store = configureStore({
  reducer: {
    currentModal: currentModalReducer,
    user: authReducer,
    isSearchBarOn: isSearchBarOnReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
