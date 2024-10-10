import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getBlankBacksideCard } from '../svg_getcard.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
} from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
import { useSvgContext } from '../svg_container.tsx';
import { USER_INFO } from '../svg_userplaceholder.tsx';

export function SvgCardStackAnimation(props) {
  const refTopCard = useRef();
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
    let inverse = ctm.inverse();
    // console.log(`\tinverse =${inverse}`);
    const stringToOutput = `a: ${ctm.a}  b:${ctm.b}\nc:${ctm.c}  d:${ctm.d}\ne:${ctm.e}  f:${ctm.f}`;
    console.log(stringToOutput);
    console.log(
      `a: ${inverse.a}  b:${inverse.b}\nc:${inverse.c}  d:${inverse.d}\ne:${inverse.e}  f:${inverse.f}`
    );
    console.log(userHand.getBBox());
    const { x, y } = userHand?.getBoundingClientRect() || defaultValue;
    return { x: ctm.e, y: ctm.f };
  };

  if (props.parentGroup && !lastPlayerCardId && lastPlayerId) {
    // console.log(JSON.stringify(props.parentGroup.getBoundingClientRect()));
    const { e, f } = props.parentGroup.getScreenCTM();
    const endPosition = getUserCardHandPosition(lastPlayerId, refSvg.current);
    pathToDraw = (
      <>
        <path
          d={`M ${e},${f} L ${endPosition.x},${endPosition.y}`}
          fill='none'
          stroke='red'
          strokeWidth='0.1em'
        />
      </>
    );
  }

  //   console.log(`>RENDER< parentGroup=${props.parentGroup.}`);

  //   useEffect(() => {
  //     console.log(`>USEFFECT< parentGroup=${props.parentGroup}`);
  //   });

  return (
    <>
      <g ref={refTopCard} transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
        {getBlankBacksideCard()}
      </g>
      {createPortal(<>{pathToDraw}</>, refSvg.current)}
    </>
  );
}
