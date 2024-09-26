import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface PlayerSeatRequestedInterface {
  playerSeatRequested: number
}

const initialState: PlayerSeatRequestedInterface = {
  playerSeatRequested: 0
};

export const playerSeatRequestedSlice = createSlice({
  name: 'playerSeatRequested',
  initialState,
  reducers: {
    updatePlayerSeatRequested: (state, action: PayloadAction<number>) => {
      state.playerSeatRequested = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updatePlayerSeatRequested } = playerSeatRequestedSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPlayerSeatRequested = (state: RootState) => state.playerSeatRequested.playerSeatRequested

export default playerSeatRequestedSlice.reducer;