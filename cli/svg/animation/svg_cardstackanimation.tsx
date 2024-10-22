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
import { shallowEqual } from 'react-redux';
import round from 'lodash.round';

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48;

export function SvgCardStackAnimation(props) {
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);
  const activeMoveInfo = useAppSelector(
    selectActiveMoveLastMoveInfo,
    shallowEqual
  );
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
      console.log(`\t;;;;;\tNo userHand ret Default=${defaultValue}`);
      return defaultValue;
    }
    const boundingBox = userHand.getBBox();

    const xCenter = boundingBox.height / 2;
    const yCenter = boundingBox.width / 2;

    let point = new DOMPoint(boundingBox.x + xCenter, boundingBox.y + yCenter);
    let ctm = userHand.getCTM();

    let svgCorrectCoordinates = point.matrixTransform(ctm);
    return {
      x: round(svgCorrectCoordinates.x, 2),
      y: round(svgCorrectCoordinates.y, 2),
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
    let { x, y, height, width } = props.parentGroup.getBBox();
    let point = new DOMPoint(x + width / 2, y + height / 2);
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
    ): { controlX: number; controlY: number } => {
      return Math.random() > 0.5
        ? { controlX: a + c, controlY: b - d }
        : { controlX: a - c, controlY: b + c };
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

    const { controlX, controlY } = add(
      halfX + startX,
      halfY + startY,
      deltaX,
      deltaY
    );

    const k = refSvg.current.height.baseVal.value / 650;

    const nrmlz = (numValue: number) => {
      return round(numValue / k, 2);
    };

    pathToDraw = `M ${nrmlz(startX)},${nrmlz(startY)} C${nrmlz(
      controlX
    )},${nrmlz(controlY)} ${nrmlz(controlX)},${nrmlz(controlY)} ${nrmlz(
      endPosition.x
    )},${nrmlz(endPosition.y)}`;

    pathToDebug = (
      <>
        <path
          ref={refToDebug}
          d={pathToDraw}
          fill="none"
          stroke="red"
          strokeWidth="0.1em"
        />
      </>
    );
    console.log(`\t :: DRAW a8n pathToDraw= ${pathToDraw}`);
  }

  //   console.log(`>RENDER< parentGroup=${props.parentGroup.}`);
  const refToDebug2 = useRef();
  useEffect(() => {
    pathToDraw && console.log(refToDebug2.current);
  });

  return (
    <>
      {createPortal(
        <AnimatePath
          userSeat={lastPlayerId}
          numberToDraw={activeMoveInfo.lastDrewCardNumber}
          pathToDraw={pathToDraw}
        />,
        refSvg.current
      )}
      ,
      {pathToDraw &&
        createPortal(
          <path
            ref={refToDebug2}
            d={pathToDraw}
            fill="none"
            stroke="red"
            strokeWidth="0.1em"
          />,
          refSvg.current
        )}
    </>
  );
}
