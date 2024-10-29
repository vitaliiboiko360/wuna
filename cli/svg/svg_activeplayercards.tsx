import React, { Fragment, useContext, useEffect, useState } from 'react';

import {
  getCard,
  isCardPlayable,
  isCardSameColor,
  getCardColor,
} from './svg_getcard';
import getOnClickForCard from './active_players/getonlickforcards.ts';

import { WebSocketContext } from '../websocketprovider.tsx';
import { useAppSelector, useAppDispatch } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { selectActiveMoveWildCardColor } from '../store/activeMove.ts';
import { USER_1 } from '../websocketconsumer.tsx';
import { WILD } from '../../src/Cards.ts';
import { useSvgContext } from './svg_container';

function sendSkipMoveToServer(websocket, seatNumber) {
  let arrayToSend: Uint8Array = new Uint8Array(3);
  arrayToSend[0] = seatNumber;
  arrayToSend[1] = 0;
  arrayToSend[2] = 33;
  websocket.send(arrayToSend);
}

export default function SvgActivePlayerCards(props) {
  const refSvg = useSvgContext();
  const webSocket = useContext(WebSocketContext);
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  const activeWildCardColorToPlay = useAppSelector(
    selectActiveMoveWildCardColor
  );

  let playableCardCounter = 0;

  useEffect(() => {
    if (playableCardCounter == 0 && props.isOurTurn) {
      console.log(
        '\tUSE EFFECT ACTIVEPLAYERCARDS props.isOurTurn =',
        props.isOurTurn,
        ' playableCardCounter=',
        playableCardCounter
      );
    }
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.isOurTurn) {
      setTimeout(
        () => sendSkipMoveToServer(webSocket, activePlayerSeatNumber),
        200
      );
    }
  }, [props.isOurTurn]);

  if (activePlayerSeatNumber == 0) {
    console.log(`activePlayerSeatNumber == 0`);
    return <></>;
  }

  //console.log(`props.cardsArray.length=${props.cardArray.length}`);
  let onClick: Function | undefined = undefined;
  return (
    <>
      {(props.cardArray.length
        ? props.cardArray //.with(0, WILD.Wild).with(1, WILD.Draw4)
        : props.cardArray
      ).map((card, index) => {
        let transformString = '';
        const isPlayable =
          props.isOurTurn &&
          (isCardPlayable(card, props.activeCard) ||
            isCardSameColor(card, activeWildCardColorToPlay));
        if (isPlayable) {
          playableCardCounter++;
          transformString = `translate(${index * 15 - 10},${-40})`;
        } else
          transformString = `translate(${
            index * 15 - 10 * playableCardCounter
          })`; // 20px -> step to the right on X axe

        if (typeof onClick === 'undefined' && props.isOurTurn && !isPlayable) {
          onClick = () =>
            setTimeout(
              () => sendSkipMoveToServer(webSocket, activePlayerSeatNumber),
              1500
            );
        }
        return (
          <Fragment key={index}>
            <g
              transform={transformString}
              onClick={
                isPlayable
                  ? getOnClickForCard(
                      refSvg.current,
                      card,
                      webSocket,
                      activePlayerSeatNumber,
                      dispatch,
                      props.setPlayCardInfo
                    )
                  : onClick
              }
            >
              {getCard(card)}
            </g>
          </Fragment>
        );
      })}
    </>
  );
}
