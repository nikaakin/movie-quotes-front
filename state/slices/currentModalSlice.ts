import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  currentModal:
    | 'login'
    | 'register'
    | 'forgot-password'
    | 'register-notification'
    | 'forgot-password-notification'
    | null;
};

const initialState: InitialStateType = {
  currentModal: null,
};

export const currentModalSlice = createSlice({
  initialState,
  name: 'currentModal',
  reducers: {
    setCurrentModal: (state, action) => {
      state.currentModal = action.payload;
    },
  },
});

export const { setCurrentModal } = currentModalSlice.actions;
export const currentModalReducer = currentModalSlice.reducer;
