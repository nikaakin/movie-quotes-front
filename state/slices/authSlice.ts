import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  isSignedIn: boolean;
  id: number | null;
  username: string;
  email: string;
  google_id: number | null;
  created_at: string;
  updated_at: string;
};

const initialState: InitialStateType = {
  isSignedIn: true,
  id: null,
  username: '',
  email: '',
  google_id: null,
  created_at: '',
  updated_at: '',
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
