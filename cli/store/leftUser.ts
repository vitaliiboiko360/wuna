import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

import { initialState } from './userInterface.ts';

export const leftUserSlice = createSlice({
  name: 'leftUser',
  initialState,
  reducers: {
    updateLeftUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = action.payload;
    },
    updateLeftUserCardsNumberNewAdded: (
      state,
      action: PayloadAction<number>
    ) => {
      state.newCardsAddedNumber = action.payload;
    },
    incrementLeftUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber++;
      state.newCardsAddedNumber = 1;
    },
    decrementLeftUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber--;
      state.newCardsAddedNumber = -1;
    },
    incrementLeftUserCardsByNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = state.cardsNumber + action.payload;
      state.newCardsAddedNumber = action.payload;
    },
    updateLeftUserAvatarId: (state, action: PayloadAction<number>) => {
      state.avatarId = action.payload;
    },
    updateLeftUserSeatNumber: (state, action: PayloadAction<number>) => {
      state.seatNumber = action.payload;
    },
    default: (state) => {
      return state;
    },
  },
});

export const {
  updateLeftUserCardsNumber,
  updateLeftUserCardsNumberNewAdded,
  incrementLeftUserCardsNumber,
  decrementLeftUserCardsNumber,
  updateLeftUserAvatarId,
  updateLeftUserSeatNumber,
  incrementLeftUserCardsByNumber,
} = leftUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLeftUserCardsNumber = (state: RootState) =>
  state.leftUser.cardsNumber;
export const selectLeftUserCardsNumberNewAdded = (state: RootState) =>
  state.bottomUser.newCardsAddedNumber;
export const selectLeftUserAvatarId = (state: RootState) =>
  state.leftUser.avatarId;
export const selectLeftUserSeatNumber = (state: RootState) =>
  state.leftUser.seatNumber;

export default leftUserSlice.reducer;
