import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

import { initialState } from './userInterface.ts';

export const rightUserSlice = createSlice({
  name: 'rightUser',
  initialState,
  reducers: {
    updateRightUserCardsNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = action.payload;
    },
    incrementRightUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber++;
    },
    decrementRightUserCardsNumber: (state, action: PayloadAction<void>) => {
      state.cardsNumber--;
    },
    incrementRightUserCardsByNumber: (state, action: PayloadAction<number>) => {
      state.cardsNumber = state.cardsNumber + action.payload;
    },
    updateRightUserAvatarId: (state, action: PayloadAction<number>) => {
      state.avatarId = action.payload;
    },
    updateRightUserSeatNumber: (state, action: PayloadAction<number>) => {
      state.seatNumber = action.payload;
    },
    default: (state) => {
      return state;
    }
  }
});

export const { updateRightUserCardsNumber, incrementRightUserCardsNumber, decrementRightUserCardsNumber, incrementRightUserCardsByNumber, updateRightUserAvatarId, updateRightUserSeatNumber } = rightUserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRightUserCardsNumber = (state: RootState) => state.rightUser.cardsNumber;
export const selectRightUserAvatarId = (state: RootState) => state.rightUser.avatarId;
export const selectRightUserSeatNumber = (state: RootState) => state.rightUser.seatNumber;

export default rightUserSlice.reducer;