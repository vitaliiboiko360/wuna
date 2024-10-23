import React, { forwardRef, useEffect, useRef } from 'react';

import { USERPLACEHOLDER_DIMS } from './svg_userplayeravatar.tsx';

import { useAppSelector } from '../store/hooks.ts';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { USER_2 } from '../websocketconsumer.tsx';

const UserNameHolder = forwardRef((props, refAvatarBox) => {
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);

  const { xPosition, yPosition, position } = props;

  const getTransformString = () => {
    if (position == USER_2) {
      return `translate(${xPosition + USERPLACEHOLDER_DIMS.width + 5},${
        yPosition + USERPLACEHOLDER_DIMS.height * 0.6
      })`;
    }

    return `translate(${xPosition + 5},${
      yPosition + USERPLACEHOLDER_DIMS.height
    })`;
  };

  const ref = useRef(null);
  useEffect(() => {
    const tranfromString = getTransformString();
    ref.current.setAttribute('transform', tranfromString);
  });
  const textString = `player #${position + 1}`;
  // (activePlayerSeatNumber >= 5 && activePlayerSeatNumber <= 8 && props.position == 0)
  //   ? `player #${props.position + 1}`
  //   : '';
  return (
    <>
      <g ref={ref} filter={'url(#editing-goldstamp)'}>
        <foreignObject
          height="50"
          width="100"
          style={{
            display: 'inline-block',
            color: '#aa9ac2',
            fontSize: '1.1rem',
            fontWeight: 600,
            fontFamily: 'Arial Black',
            // dominantBaseline: 'central',
            // textAnchor: 'middle',
          }}
        >
          <p
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ display: 'inline-block', margin: 0 }}
          >
            {textString}
          </p>
        </foreignObject>
      </g>
    </>
  );
});

export default UserNameHolder;
