import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  currentModal:
    | 'login'
    | 'register'
    | 'forgot-password'
    | 'reset-password'
    | 'account-activated'
    | 'password-changed'
    | 'link-expired'
    | 'register-notification'
    | 'edit-notification'
    | 'forgot-password-notification'
    | 'confirmation-notification'
    | 'add-movie'
    | 'add-quote'
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
