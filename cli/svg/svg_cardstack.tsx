import React from 'react';
import { getCard } from './svg_getcard';

// const CARD_STACK_G_ATTRIBUTES = { x: 200, y: 200 };
// const xRotate = CARD_STACK_G_ATTRIBUTES.x + 47; // add half of card's height
// const yRotate = CARD_STACK_G_ATTRIBUTES.y + 31; // add half of card's width
const blackBackCardId = 0;

export function SvgCardStack(props) {
  return (
    <>
      <g>
        <g transform={`matrix(0.6,0.8,-0.905,0.3,276,150)`}>
          {getCard(blackBackCardId)}
        </g>
        <g transform={`matrix(0.6,0.8,-0.905,0.3,277,145)`}>
          {getCard(blackBackCardId)}
        </g>
        <g transform={`matrix(0.6,0.8,-0.905,0.3,278,140)`}>
          {getCard(blackBackCardId)}
        </g>
        <g transform={`matrix(0.6,0.8,-0.905,0.3,279,135)`}>
          {getCard(blackBackCardId)}
        </g>
        <g transform={`matrix(0.6,0.8,-0.905,0.3,280,130)`}>
          {getCard(blackBackCardId)}
        </g>
      </g>
    </>
  );
}
