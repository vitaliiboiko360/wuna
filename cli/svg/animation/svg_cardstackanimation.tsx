import React, { useRef } from 'react';
import { getBlankBacksideCard } from '../svg_getcard.tsx';
export function SvgCardStackAnimation(props) {
  const refTopCard = useRef();
  return (
    <>
      <g ref={refTopCard} transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
        {getBlankBacksideCard()}
      </g>
    </>
  );
}
