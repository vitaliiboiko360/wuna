import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { isReverseCard } from '../svg/svg_getcard.tsx';
import { isWildCard } from '../../src/Cards.ts';

interface ActiveMoveInterface {
  card: number,
  lastPlayer: number,
  lastPlayerCard: number,
  directionClockwize: boolean,
  wildCardColor: number
}

const initialState: ActiveMoveInterface = {
  card: 0,
  lastPlayer: 0,
  lastPlayerCard: 0,
  directionClockwize: true,
  wildCardColor: 0
};

interface PlayerIdAndCard {
  lastPlayer: number,
  lastPlayerCard: number,
}

export const activeMoveSlice = createSlice({
  name: 'activeMove',
  initialState,
  reducers: {
    updateActiveMove: {
      reducer: (state, action: { payload: { card: number, lastPlayer: number } }) => {
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
            lastPlayer: lastPlayer
          }
        }
      }
    },
    updateActiveMoveLastPlayerAndCard: {
      reducer: (state, action: {payload: PlayerIdAndCard}) => {
        state.lastPlayer = action.payload.lastPlayer;
        state.lastPlayerCard = action.payload.lastPlayerCard;
      },
      prepare: (player: number, card: number):  {payload: PlayerIdAndCard}=>{
        return {payload: {
          lastPlayer: player,
          lastPlayerCard: card,
        }}
      }
    } ,
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
    }
  }
});

export const { updateActiveMove, updateActiveMoveCard, updateActiveMoveLastPlayerAndCard, updateActiveMoveLastPlayer, updateActiveMoveLastPlayerCard, updateActiveMoveWildCardColor } = activeMoveSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectActiveMoveCard = (state: RootState) => state.activeMove.card;
export const selectActiveMoveLastPlayer = (state: RootState) => state.activeMove.lastPlayer;
export const selectActiveMoveLastPlayerCard = (state: RootState) => state.activeMove.lastPlayerCard;
export const selectActiveMoveDirection = (state: RootState) => state.activeMove.directionClockwize;
export const selectActiveMoveWildCardColor = (state: RootState) => state.activeMove.wildCardColor;

export default activeMoveSlice.reducer;