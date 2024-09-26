import React, { forwardRef, useEffect, useRef } from 'react';

//import { useAppSelector } from '../store/hooks.ts';

import { USERPLACEHOLDER_DIMS } from './svg_userplayeravatar.tsx';

import { useAppSelector } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';

const UserNameHolder = forwardRef((props, refAvatarBox) => {

  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);

  const ref = useRef(null);
  useEffect(() => {
    // if (!refAvatarBox.current) {
    //   console.log('NO REF for user caption comp');
    //   return;
    // }
    // const { x, y, width, height } = refAvatarBox.current.getBBox();

    const tranfromString = `translate(${props.xPosition + (USERPLACEHOLDER_DIMS.width / 2)},${props.yPosition + USERPLACEHOLDER_DIMS.height + 13})`;
    ref.current.setAttribute('transform', tranfromString);
  });
  const textString =
    (activePlayerSeatNumber >= 5 && activePlayerSeatNumber <= 8 && props.position == 0)
      ? `player #${props.position + 1}`
      : '';
  return (<>
    <g ref={ref}>
      <text textAnchor="middle">{textString}</text>
    </g>
  </>);
});

export default UserNameHolder;
