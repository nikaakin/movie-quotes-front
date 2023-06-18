import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  isSearchBarOn: boolean;
};

const initialState: InitialStateType = {
  isSearchBarOn: false,
};

export const isSearchBarOnSlice = createSlice({
  initialState,
  name: 'isSearchBarOn',
  reducers: {
    setIsSearchBarOn: (state, action) => {
      state.isSearchBarOn = action.payload;
    },
  },
});

export const { setIsSearchBarOn } = isSearchBarOnSlice.actions;
export const isSearchBarOnReducer = isSearchBarOnSlice.reducer;
