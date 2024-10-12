import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
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
    // point.matrixTransform(ctm);
    let svgCorrectCoordinates = point.matrixTransform(ctm);
    // let ctm = userHand.getScreenCTM();
    // toElement.getScreenCTM().inverse().multiply(ctm);
    // let inverse = ctm.inverse();
    // console.log(`\tinverse =${inverse}`);
    // const stringToOutput = `a: ${ctm.a}  b:${ctm.b}\nc:${ctm.c}  d:${ctm.d}\ne:${ctm.e}  f:${ctm.f}`;
    // console.log(stringToOutput);
    // console.log(
    //   `a: ${inverse.a}  b:${inverse.b}\nc:${inverse.c}  d:${inverse.d}\ne:${inverse.e}  f:${inverse.f}`
    // );
    console.log(`\tsvgCorrectCoordinates.x=${svgCorrectCoordinates.x}`);
    console.log(`\tsvgCorrectCoordinates.y=${svgCorrectCoordinates.y}`);
    // const { x, y } = userHand?.getBoundingClientRect() || defaultValue;
    return {
      x: svgCorrectCoordinates.x,
      y: svgCorrectCoordinates.y,
    };
  };

  let refToDebug = useRef();
  let pathToDebug;
  if (props.parentGroup && !lastPlayerCardId && lastPlayerId) {
    console.log(`\t :: DRAW a8n lastPlayerCardId= ${lastPlayerCardId}`);
    let point = new DOMPoint(0, 0);
    let ctm = props.parentGroup.getCTM();
    let svgCorrectCoordinates = point.matrixTransform(ctm);

    let point2 = new DOMPoint(CARD_HALF_WIDTH, CARD_HALF_HEIGHT);
    let svgCorrectCoordinates2 = point2.matrixTransform(ctm);
    const startX = svgCorrectCoordinates2.x;
    const startY = svgCorrectCoordinates2.y;
    console.log(`\t\t svgCorrectCoordinates2.x=${svgCorrectCoordinates2.x}`);
    console.log(`\t\t svgCorrectCoordinates2.y=${svgCorrectCoordinates2.y}`);
    const endPosition = getUserCardHandPosition(lastPlayerId, refSvg.current);
    pathToDebug = (
      <>
        <path
          ref={refToDebug}
          d={`M ${startX},${startY} L ${endPosition.x},${endPosition.y}`}
          fill='none'
          stroke='red'
          strokeWidth='0.1em'
        />
      </>
    );
    pathToDraw = `M ${startX},${startY} L ${endPosition.x},${endPosition.y}`;
    console.log(`\t :: DRAW a8n pathToDraw= ${pathToDraw}`);
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
