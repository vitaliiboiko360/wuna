import React from 'react';
import { getCard } from './svg_getcard';
import { useAppSelector } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';

// const CARD_STACK_G_ATTRIBUTES = { x: 200, y: 200 };
// const xRotate = CARD_STACK_G_ATTRIBUTES.x + 47; // add half of card's height
// const yRotate = CARD_STACK_G_ATTRIBUTES.y + 31; // add half of card's width
const blackBackCardId = 0;

export function SvgCardStack(props) {
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  return (
    <>
      {activePlayerSeatNumber ? (
        <g transform='scale(0.9)'>
          <g transform='translate(-10,85)'>
            <g transform='rotate(-15)'>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,275,150)`}>
                {getCard(blackBackCardId)}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,276,146)`}>
                {getCard(blackBackCardId)}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,277,142)`}>
                {getCard(blackBackCardId)}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,278,138)`}>
                {getCard(blackBackCardId)}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,279,134)`}>
                {getCard(blackBackCardId)}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
                {getCard(blackBackCardId)}
              </g>
            </g>
          </g>
        </g>
      ) : (
        <></>
      )}
    </>
  );
}
