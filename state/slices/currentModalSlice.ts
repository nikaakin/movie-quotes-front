import { createSlice } from '@reduxjs/toolkit';
import { currentModalType } from './type';

type InitialStateType = {
  currentModal: currentModalType;
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
