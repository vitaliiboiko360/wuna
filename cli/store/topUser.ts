import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

import { initialState } from './userInterface.ts';

export const topUserSlice = createSlice({
  name: 'topUser',
  initialState,
  reducers: {
    updateTopUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = action.payload;
    },
    incrementTopUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber++;
    },
    decrementTopUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber--;
    },
    incrementTopUserCardsByNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = state.cardsNumber + action.payload;
    },
    updateTopUserAvatarId: (state, action: PayloadAction<number>) => {
      state.avatarId = action.payload;
    },
    updateTopUserSeatNumber: (state, action: PayloadAction<number>) => {
      state.seatNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateTopUserCardsNumber, incrementTopUserCardsNumber, decrementTopUserCardsNumber, incrementTopUserCardsByNumber, updateTopUserAvatarId, updateTopUserSeatNumber } = topUserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTopUserCardsNumber = (state: RootState) => state.topUser.cardsNumber;
export const selectTopUserAvatarId = (state: RootState) => state.topUser.avatarId;
export const selectTopUserSeatNumber = (state: RootState) => state.topUser.seatNumber;

export default topUserSlice.reducer;