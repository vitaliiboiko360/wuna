import React, { useRef, useEffect, useState } from 'react';
import { getBlankBacksideCard } from './svg_getcard';
import { useAppSelector } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { SvgCardStackAnimation } from './animation/svg_cardstackanimation.tsx';

// const CARD_STACK_G_ATTRIBUTES = { x: 200, y: 200 };
// const xRotate = CARD_STACK_G_ATTRIBUTES.x + 47; // add half of card's height
// const yRotate = CARD_STACK_G_ATTRIBUTES.y + 31; // add half of card's width

export function SvgCardStack(props) {
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  const refToGroup = useRef();
  const [parentGroup, setParentGroup] = useState();
  useEffect(() => {
    if (refToGroup.current) setParentGroup(refToGroup.current);
  });
  return (
    <>
      {activePlayerSeatNumber ? (
        <g transform='scale(0.9)'>
          <g transform='translate(-10,85)'>
            <g transform='rotate(-15)'>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,275,150)`}>
                {getBlankBacksideCard()}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,276,146)`}>
                {getBlankBacksideCard()}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,277,142)`}>
                {getBlankBacksideCard()}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,278,138)`}>
                {getBlankBacksideCard()}
              </g>
              <g transform={`matrix(0.5,0.8,-0.905,0.2,279,134)`}>
                {getBlankBacksideCard()}
              </g>
              <g
                ref={refToGroup}
                transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}
              >
                {getBlankBacksideCard()}
              </g>
              {<SvgCardStackAnimation parentGroup={parentGroup} />}
            </g>
          </g>
        </g>
      ) : (
        <></>
      )}
    </>
  );
}
