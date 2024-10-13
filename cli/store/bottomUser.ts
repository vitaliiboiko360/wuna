import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

import { initialState } from './userInterface.ts';

export const bottomUserSlice = createSlice({
  name: 'bottomUser',
  initialState,
  reducers: {
    updateBottomUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = action.payload;
    },
    updateBottomUserCardsNumberNewAdded: (
      state,
      action: PayloadAction<number>
    ) => {
      state.newCardsAddedNumber = action.payload;
    },
    incrementBottomUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber++;
      state.newCardsAddedNumber = 1;
    },
    incrementBottomUserCardsByNumber: (
      state,
      action: PayloadAction<number>
    ) => {
      state.cardsNumber = action.payload;
      state.newCardsAddedNumber = action.payload;
    },
    updateBottomUserAvatarId: (state, action: PayloadAction<number>) => {
      state.avatarId = action.payload;
    },
    updateBottomUserSeatNumber: (state, action: PayloadAction<number>) => {
      state.seatNumber = action.payload;
    },
    default: (state) => {
      return state;
    },
  },
});

export const {
  updateBottomUserCardsNumber,
  updateBottomUserCardsNumberNewAdded,
  incrementBottomUserCardsNumber,
  incrementBottomUserCardsByNumber,
  updateBottomUserAvatarId,
  updateBottomUserSeatNumber,
} = bottomUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBottomUserCardsNumber = (state: RootState) =>
  state.bottomUser.cardsNumber;
export const selectBottomUserCardsNumberNewAdded = (state: RootState) =>
  state.bottomUser.newCardsAddedNumber;
export const selectBottomUserAvatarId = (state: RootState) =>
  state.bottomUser.avatarId;
export const selectBottomUserSeatNumber = (state: RootState) =>
  state.bottomUser.seatNumber;

export default bottomUserSlice.reducer;
