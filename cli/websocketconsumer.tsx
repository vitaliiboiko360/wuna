import React, { useContext, useCallback, useEffect } from 'react';

import { WebSocketContext } from './websocketprovider.tsx';
import { useAppDispatch, AppDispatch } from './store/hooks.ts';
import { insertActiveCardsByArray, updateActiveCardsByArray } from './store/activeCards.ts';
import { updateBottomUserAvatarId, updateBottomUserCardsNumber } from './store/bottomUser.ts';
import { updateLeftUserCardsNumber, decrementLeftUserCardsNumber, incrementLeftUserCardsByNumber, updateLeftUserAvatarId } from './store/leftUser.ts';
import { updateTopUserCardsNumber, decrementTopUserCardsNumber, incrementTopUserCardsByNumber, updateTopUserAvatarId } from './store/topUser.ts';
import { updateRightUserCardsNumber, decrementRightUserCardsNumber, incrementRightUserCardsByNumber, updateRightUserAvatarId } from './store/rightUser.ts';
import { updateActiveMove, updateActiveMoveCard, updateActiveMoveLastPlayer, updateActiveMoveLastPlayerCard, updateActiveMoveWildCardColor } from './store/activeMove.ts';
import { updateActivePlayerSeatNumber } from './store/activePlayerSeatNumber.ts';

import { COLOR_OFFSETS, COLOR, isReverseCard } from './svg/svg_getcard.tsx';

import { isWildCard } from '../src/Cards.ts';

export function isValidCard(idOfCard: number) {
  const NUMBER_OF_VALUES = 13;
  const BLACK_NUMBER_OF_VALUES = 1;

  if (idOfCard >= COLOR_OFFSETS.YELLOW_OFFSET
    && idOfCard <= COLOR_OFFSETS.YELLOW_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.BLUE_OFFSET
    && idOfCard <= COLOR_OFFSETS.BLUE_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.GREEN_OFFSET
    && idOfCard <= COLOR_OFFSETS.GREEN_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.RED_OFFSET
    && idOfCard <= COLOR_OFFSETS.RED_OFFSET + NUMBER_OF_VALUES) {
    return true;
  }
  if (idOfCard >= COLOR_OFFSETS.BLACK_OFFSET
    && idOfCard <= COLOR_OFFSETS.BLACK_OFFSET + BLACK_NUMBER_OF_VALUES) {
    return true;
  }
  return false;
}

function isValidUserCommand(inputNumber: number) {
  if (inputNumber >= 0 && inputNumber <= 8) {
    return true;
  }
}

enum COMMAND {
  ALLGAMESATE = 0,
  BOTTOM_USER_MOVE = 1,
  LEFT_USER_MOVE = 2,
  TOP_USER_MOVE = 3,
  RIGHT_USER_MOVE = 4,
  BOTTOM_USER_CARD_COUNT = 5,
  LEFT_USER_CARD_COUNT = 6,
  TOP_USER_CARD_COUNT = 7,
  RIGHT_USER_CARD_COUNT = 8,
}

const enum commands {
  GUEST = 0,
  USER_1,
  USER_2,
  USER_3,
  USER_4,
  SEAT_1,
  SEAT_2,
  SEAT_3,
  SEAT_4,
};

export const USER_1 = 1;
export const USER_2 = 2;
export const USER_3 = 3;
export const USER_4 = 5;

enum USER {
  BOTTOM = 1,
  LEFT,
  TOP,
  RIGHT
}

function getCommand(inputNumber: number) {
  if (inputNumber in COMMAND) {
    return inputNumber;
  }
  return -1;
}

let staticCounter = 0;

function processGuestMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  if (inputArray.length < 6) {
    console.log('inputArray length=', inputArray.length);
    return;
  }
  let topCard = inputArray[1];
  if (isValidCard(topCard)) {
    dispatch(updateActiveMoveCard(topCard));
  }
  dispatch(updateBottomUserCardsNumber(inputArray[2]));
  dispatch(updateLeftUserCardsNumber(inputArray[3]));
  dispatch(updateTopUserCardsNumber(inputArray[4]));
  dispatch(updateRightUserCardsNumber(inputArray[5]));
}

function insertToActiveCards(inputArray: Uint8Array, dispatch: AppDispatch) {
  let cardArray = inputArray.slice(1);
  let arrayToInsert: number[] = [];
  for (let i = 0; i < cardArray.length; ++i) {
    if (isValidCard(cardArray[i]))
      arrayToInsert.push(cardArray[i]);
  }
  console.log('we dispatched insert array,', arrayToInsert.join(' '));
  dispatch(insertActiveCardsByArray(arrayToInsert));
}

function processPlayerMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  let userSeat = inputArray[0];
  let move = inputArray[1];


  if (userSeat != USER_1) {
    if (move == 0) {
      let numberOfDrawedCards = inputArray[2];
      dispatch(updateActiveMoveLastPlayer(userSeat));
      dispatch(updateActiveMoveLastPlayerCard(move));
      switch (userSeat) {
        case USER_2:
          dispatch(incrementLeftUserCardsByNumber(numberOfDrawedCards));
          break;
        case USER_3:
          dispatch(incrementTopUserCardsByNumber(numberOfDrawedCards));
          break;
        case USER_4:
          dispatch(incrementRightUserCardsByNumber(numberOfDrawedCards));
          break;
        default:
      }
      return;
    }
    if (isWildCard(move)) {
      let colorToPlay = inputArray[2];
      dispatch(updateActiveMoveWildCardColor(colorToPlay));
    }

    dispatch(updateActiveMoveLastPlayerCard(move));
    dispatch(updateActiveMove(move, userSeat));
    switch (userSeat) {
      case USER_2:
        dispatch(decrementLeftUserCardsNumber());
        break;
      case USER_3:
        dispatch(decrementTopUserCardsNumber());
        break;
      case USER_4:
        dispatch(decrementRightUserCardsNumber());
        break;
      default:
    }
    return;
  }

  return insertToActiveCards(inputArray, dispatch);
}

const AVATAR_IDS = [1, 2, 3, 4, 5, 6, 9, 10, 15];
let uniqueIds = new Set();
const getRandAvatarId = () => {
  const getRandId = () => { return AVATAR_IDS[Math.floor(Math.random() * AVATAR_IDS.length)] };
  let retValue = getRandId();
  let deadLockLimit = 10;
  while (uniqueIds.has(retValue)) {
    retValue = getRandId();
    if (uniqueIds.size > AVATAR_IDS.length - 1 || deadLockLimit-- < 0) {
      uniqueIds.clear();
      break;
    }
  }
  uniqueIds.add(retValue)
  return retValue;
};

function processSeatRequestMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  console.log('SEAT REQ srv responded with=', inputArray[0]);
  dispatch(updateActivePlayerSeatNumber(inputArray[0]));
  dispatch(updateBottomUserAvatarId(getRandAvatarId()));
  dispatch(updateLeftUserAvatarId(getRandAvatarId()));
  dispatch(updateTopUserAvatarId(getRandAvatarId()));
  dispatch(updateRightUserAvatarId(getRandAvatarId()));
}

function readMessage(inputArray: Uint8Array, dispatch: AppDispatch) {
  if (inputArray[0] >= 1 && inputArray[0] <= 4) {
    return processPlayerMessage(inputArray, dispatch);
  }

  if (inputArray[0] == 0) {
    return processGuestMessage(inputArray, dispatch);
  }

  if (inputArray[0] >= 5 && inputArray[0] <= 8) {
    return processSeatRequestMessage(inputArray, dispatch);
  }
}

export default function WebSocketConsumer(props) {
  const webSocket = useContext(WebSocketContext);
  const dispatch = useAppDispatch();

  const onMessage = useCallback((event) => {
    let arBuf = new Uint8Array(event.data);
    console.log('RECV: buf= ', arBuf.join(' '));
    readMessage(arBuf, dispatch);
  }, [dispatch]);

  useEffect(() => {
    webSocket
      .addEventListener("message", onMessage);

    return () => {
      webSocket
        .removeEventListener("message", onMessage);
    }
  }, []);

  return (<></>);
}