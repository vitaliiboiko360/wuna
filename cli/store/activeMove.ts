import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { isReverseCard } from '../svg/svg_getcard.tsx';
import { isWildCard } from '../../src/Cards.ts';

interface ActiveMoveInterface {
  card: number;
  lastPlayer: number;
  lastPlayerCard: number;
  lastDrewCardNumber: number;
  directionClockwize: boolean;
  wildCardColor: number;
}

const initialState: ActiveMoveInterface = {
  card: 0,
  lastPlayer: 0,
  lastPlayerCard: 0,
  lastDrewCardNumber: 0,
  directionClockwize: true,
  wildCardColor: 0,
};

interface PlayerIdAndCardInfo {
  lastPlayer: number;
  lastPlayerCard: number;
  lastDrewCardNumber: number;
}

export const activeMoveSlice = createSlice({
  name: 'activeMove',
  initialState,
  reducers: {
    updateActiveMove: {
      reducer: (
        state,
        action: { payload: { card: number; lastPlayer: number } }
      ) => {
        if (isReverseCard(action.payload.card)) {
          state.directionClockwize = !state.directionClockwize;
        }
        state.card = action.payload.card;
        state.lastPlayer = action.payload.lastPlayer;
        if (!isWildCard(action.payload.card)) {
          state.wildCardColor = 0;
        }
      },
      prepare: (card: number, lastPlayer: number) => {
        return {
          payload: {
            card: card,
            lastPlayer: lastPlayer,
          },
        };
      },
    },
    updateActiveMoveLastPlayerCardMoveInfo: {
      reducer: (state, action: { payload: PlayerIdAndCardInfo }) => {
        state.lastPlayer = action.payload.lastPlayer;
        state.lastPlayerCard = action.payload.lastPlayerCard;
        state.lastDrewCardNumber = action.payload.lastDrewCardNumber;
      },
      prepare: (
        player: number,
        card: number,
        drew: number
      ): { payload: PlayerIdAndCardInfo } => {
        return {
          payload: {
            lastPlayer: player,
            lastPlayerCard: card,
            lastDrewCardNumber: drew,
          },
        };
      },
    },
    updateActiveMoveCard: (state, action: PayloadAction<number>) => {
      state.card = action.payload;
      if (isReverseCard(action.payload)) {
        state.directionClockwize = !state.directionClockwize;
      }
    },
    updateActiveMoveLastPlayer: (state, action: PayloadAction<number>) => {
      state.lastPlayer = action.payload;
    },
    updateActiveMoveLastPlayerCard: (state, action: PayloadAction<number>) => {
      state.lastPlayerCard = action.payload;
    },
    updateActiveMoveWildCardColor: (state, action: PayloadAction<number>) => {
      state.wildCardColor = action.payload;
    },
    default: (state) => {
      return state;
    },
  },
});

export const {
  updateActiveMove,
  updateActiveMoveCard,
  updateActiveMoveLastPlayerCardMoveInfo,
  updateActiveMoveLastPlayer,
  updateActiveMoveLastPlayerCard,
  updateActiveMoveWildCardColor,
} = activeMoveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectActiveMoveCard = (state: RootState) => state.activeMove.card;
export const selectActiveMoveLastPlayer = (state: RootState) =>
  state.activeMove.lastPlayer;
export const selectActiveMoveLastPlayerCard = (state: RootState) =>
  state.activeMove.lastPlayerCard;
export const selectActiveMoveLastDrewCardNumber = (state: RootState) =>
  state.activeMove.lastDrewCardNumber;
export const selectActiveMoveDirection = (state: RootState) =>
  state.activeMove.directionClockwize;
export const selectActiveMoveWildCardColor = (state: RootState) =>
  state.activeMove.wildCardColor;
export const selectActiveMoveLastMoveInfo = (
  state: RootState
): PlayerIdAndCardInfo => {
  return {
    lastPlayer: state.activeMove.lastPlayer,
    lastPlayerCard: state.activeMove.lastPlayerCard,
    lastDrewCardNumber: state.activeMove.lastDrewCardNumber,
  };
};

export default activeMoveSlice.reducer;
