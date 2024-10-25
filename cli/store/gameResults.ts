import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

interface gameResults {
  isReady: boolean;
  firstPlace: number[];
  secondPlace: number[];
  thirdPlace: number[];
  fourthPlace: number[];
}

const initialState: gameResults = {
  isReady: false,
  firstPlace: [],
  secondPlace: [],
  thirdPlace: [],
  fourthPlace: [],
};

export const gameResults = createSlice({
  name: 'gameResults',
  initialState,
  reducers: {
    updateGameResults: {
      reducer: (state, action: { payload: gameResults }) => {
        state.isReady = action.payload.isReady;
        state.firstPlace = action.payload.firstPlace;
        state.secondPlace = action.payload.secondPlace;
        state.thirdPlace = action.payload.thirdPlace;
        state.fourthPlace = action.payload.fourthPlace;
      },
      prepare: (gameResultsArray: Uint8Array) => {
        const isValid = gameResultsArray.length > 0;

        let ret: gameResults = {
          isReady: isValid,
          firstPlace: [],
          secondPlace: [],
          thirdPlace: [],
          fourthPlace: [],
        };

        let place = 0;
        for (let i = 0; i < gameResultsArray.length; i++) {
          let value = gameResultsArray[i];

          if (value == 0) {
            place++;
            continue;
          }

          switch (place) {
            case 0:
              ret.firstPlace.push(value);
              break;
            case 1:
              ret.secondPlace.push(value);
              break;
            case 2:
              ret.thirdPlace.push(value);
              break;
            case 3:
              ret.fourthPlace.push(value);
              break;
            default:
          }
        }

        return {
          payload: ret,
        };
      },
    },
    default: (state) => {
      return state;
    },
  },
});

export const { updateGameResults } = gameResults.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGameResults = (state: RootState) => state.gameResults;

export default gameResults.reducer;
