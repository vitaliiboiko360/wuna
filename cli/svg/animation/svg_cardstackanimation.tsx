import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
  selectActiveMoveLastMoveInfo,
} from '../../store/activeMove.ts';
import { USER_2, USER_3, USER_4 } from '../../websocketconsumer.tsx';
import { useSvgContext } from '../svg_container.tsx';
import { USER_INFO } from '../svg_userplaceholder.tsx';
import { AnimatePath } from './svg_cardstackanimationpath.tsx';

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48;

export function SvgCardStackAnimation(props) {
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);
  const activeMoveInfo = useAppSelector(selectActiveMoveLastMoveInfo);
  const refSvg = useSvgContext();

  let pathToDraw;
  //   console.log(
  //     `>>props.parentGroup=${props.parentGroup}\n !lastPlayerCardId=${lastPlayerCardId} lastPlayerId=${lastPlayerId}`
  //   );

  const getUserCardHandPosition = (playerId, svgDoc) => {
    const defaultValue = { x: 400, y: 325 };
    const userIndex = playerId - 1;
    const userHand = svgDoc?.querySelector(`#${USER_INFO[userIndex].id}`);
    if (!userHand) {
      return defaultValue;
    }
    const boundingBox = userHand.getBBox();

    const xCenter = boundingBox.height / 2;
    const yCenter = boundingBox.width / 2;

    let point = new DOMPoint(xCenter, yCenter);
    let ctm = userHand.getCTM();

    let svgCorrectCoordinates = point.matrixTransform(ctm);
    return {
      x: svgCorrectCoordinates.x,
      y: svgCorrectCoordinates.y,
    };
  };

  let refToDebug = useRef();
  let pathToDebug;
  if (
    props.parentGroup &&
    lastPlayerCardId == 0 &&
    lastPlayerId != 0 &&
    activeMoveInfo.lastDrewCardNumber > 0
  ) {
    // console.log(`\t :: DRAW a8n lastPlayerCardId= ${lastPlayerCardId}`);
    let point = new DOMPoint(CARD_HALF_WIDTH, CARD_HALF_HEIGHT);
    let ctm = props.parentGroup.getCTM();
    let svgCorrectCoordinates = point.matrixTransform(ctm);

    const startX = svgCorrectCoordinates.x;
    const startY = svgCorrectCoordinates.y;

    const endPosition = getUserCardHandPosition(lastPlayerId, refSvg.current);

    const sub = (a: number, b: number): number => {
      return a > b ? -(a - b) : b - a;
    };

    const add = (
      a: number,
      b: number,
      c: number,
      d: number
    ): { x: number; y: number } => {
      return Math.random() > 0.5
        ? { x: a + c, y: b - d }
        : { x: a - c, y: b + c };
    };

    const X = sub(startX, endPosition.x);
    const Y = sub(startY, endPosition.y);
    let halfWayThere = Math.sqrt(X ** 2 + Y ** 2) / 2;

    const alpha = Math.tan(Math.PI / 12);
    const deltaH = alpha * halfWayThere;

    const halfX = X / 2;
    const halfY = Y / 2;

    const coeffX = halfX / halfWayThere;
    const coeffY = halfY / halfWayThere;

    const deltaX = deltaH * coeffY;
    const deltaY = deltaH * coeffX;

    const { x, y } = add(halfX + startX, halfY + startY, deltaX, deltaY);

    pathToDebug = (
      <>
        <path
          ref={refToDebug}
          d={`M ${startX},${startY} C${x},${y} ${x},${y} ${endPosition.x},${endPosition.y}`}
          fill='none'
          stroke='red'
          strokeWidth='0.1em'
        />
      </>
    );
    pathToDraw = `M ${startX},${startY} C${x},${y} ${x},${y} ${endPosition.x},${endPosition.y}`;
    // console.log(`\t :: DRAW a8n pathToDraw= ${pathToDraw}`);
  }

  //   console.log(`>RENDER< parentGroup=${props.parentGroup.}`);

  //   useEffect(() => {
  //     console.log(`>USEFFECT< parentGroup=${props.parentGroup}`);
  //   });

  return (
    <>
      {createPortal(<AnimatePath pathToDraw={pathToDraw} />, refSvg.current)},
      {createPortal(
        <path d={pathToDraw} fill='none' stroke='red' strokeWidth='0.1em' />,
        refSvg.current
      )}
    </>
  );
}
