import React, { useRef, useEffect } from 'react';
import { getBlankBacksideCard } from '../svg_getcard.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
} from '../../store/activeMove.ts';

export function SvgCardStackAnimation(props) {
  const refTopCard = useRef();
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);

  let pathToDraw;
  if (!lastPlayerCardId && lastPlayerId) {
    pathToDraw = (
      <>
        <path d='' fill='none' stroke='red' />
      </>
    );
  }

  return (
    <>
      <g ref={refTopCard} transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
        {getBlankBacksideCard()}
      </g>
      {pathToDraw}
    </>
  );
}
