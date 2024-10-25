import { configureStore } from '@reduxjs/toolkit';
import activeCardsReducer from './activeCards.ts';
import leftUserReducer from './leftUser.ts';
import topUserReducer from './topUser.ts';
import rightUserReducer from './rightUser.ts';
import bottomUserReducer from './bottomUser.ts';
import activeMoveReducer from './activeMove.ts';
import playerSeatRequestedReducer from './playerSeatRequested.ts';
import activePlayerSeatNumberReducer from './activePlayerSeatNumber.ts';
import { gameResults } from './gameResults.ts';

export const store = configureStore({
  reducer: {
    activeCards: activeCardsReducer,
    leftUser: leftUserReducer,
    topUser: topUserReducer,
    rightUser: rightUserReducer,
    bottomUser: bottomUserReducer,
    activeMove: activeMoveReducer,
    playerSeatRequested: playerSeatRequestedReducer,
    activePlayerSeatNumber: activePlayerSeatNumberReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
