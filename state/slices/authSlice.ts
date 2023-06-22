import { MovieType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  isSignedIn: boolean;
  id: string | null;
  username: string;
  email: string;
  google_id: string | null;
  image: string;
  movies: MovieType[];
};

const initialState: InitialStateType = {
  isSignedIn: false,
  id: null,
  username: '',
  email: '',
  google_id: null,
  image: '',
  movies: [],
};

export const authSlice = createSlice({
  initialState,
  name: 'currentModal',
  reducers: {
    signIn: (state, payload) =>
      (state = { ...state, ...payload.payload, isSignedIn: true }),
    logOut: (state) => (state = { ...initialState, isSignedIn: false }),
  },
});

export const { signIn, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
