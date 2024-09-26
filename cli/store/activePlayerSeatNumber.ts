import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface ActivePlayerSeatNumberInterface {
  activePlayerSeatNumber: number
}

const initialState: ActivePlayerSeatNumberInterface = {
  activePlayerSeatNumber: 0
};

export const activePlayerSeatNumberSlice = createSlice({
  name: 'activePlayerSeatNumber',
  initialState,
  reducers: {
    updateActivePlayerSeatNumber: (state, action: PayloadAction<number>) => {
      state.activePlayerSeatNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateActivePlayerSeatNumber } = activePlayerSeatNumberSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActivePlayerSeatNumber = (state: RootState) => state.activePlayerSeatNumber.activePlayerSeatNumber

export default activePlayerSeatNumberSlice.reducer;