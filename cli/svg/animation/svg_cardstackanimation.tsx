import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
} from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
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
    const userHand = svgDoc?.querySelector(`#${USER_INFO[playerId - 1].id}`);
    if (!userHand) return defaultValue;
    userHand;
    let ctm = userHand.getScreenCTM();
    // let inverse = ctm.inverse();
    // console.log(`\tinverse =${inverse}`);
    // const stringToOutput = `a: ${ctm.a}  b:${ctm.b}\nc:${ctm.c}  d:${ctm.d}\ne:${ctm.e}  f:${ctm.f}`;
    // console.log(stringToOutput);
    // console.log(
    //   `a: ${inverse.a}  b:${inverse.b}\nc:${inverse.c}  d:${inverse.d}\ne:${inverse.e}  f:${inverse.f}`
    // );
    // console.log(userHand.getBBox());
    // const { x, y } = userHand?.getBoundingClientRect() || defaultValue;
    return { x: parseInt(ctm.e), y: parseInt(ctm.f) };
  };
  let refToDebug = useRef();
  let pathToDebug;
  if (props.parentGroup && !lastPlayerCardId && lastPlayerId) {
    console.log(`\t :: DRAW a8n lastPlayerCardId= ${lastPlayerCardId}`);
    const { e, f } = props.parentGroup.getScreenCTM();
    const endPosition = getUserCardHandPosition(lastPlayerId, refSvg.current);
    pathToDebug = (
      <>
        <path
          ref={refToDebug}
          d={`M ${e},${f} L ${endPosition.x},${endPosition.y}`}
          fill='none'
          stroke='red'
          strokeWidth='0.1em'
        />
      </>
    );
    let eNorm = parseInt(e);
    let fNorm = parseInt(f);
    pathToDraw = `M ${e},${f} L ${endPosition.x},${endPosition.y}`;
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
