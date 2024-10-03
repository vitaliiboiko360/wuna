import React, { useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { useSvgContext } from './svg_container';
import gsap from 'gsap';

const DIMS = {
  width: 85,
  height: 85,
};

const COLORS = [
  { fill: '#ff5555', stroke: '#d74a49' },
  { fill: '#5555ff', stroke: '#4b49d6' },
  { fill: '#ffaa00', stroke: '#d7900e' },
  { fill: '#00aa00', stroke: '#12900b' },
];

const GROUP_POSITION = {
  x: 305,
  y: 190,
};

const LEFT_TOP_POSITIONS = {
  x: 0,
  y: 0,
  ...COLORS[0],
};

const LEFT_BOTTOM_POSITIONS = {
  x: 0,
  y: 105,
  ...COLORS[3],
};

const RIGHT_TOP_POSITIONS = {
  x: 105,
  y: 0,
  ...COLORS[1],
};

const RIGHT_BOTTOM_POSITIONS = {
  x: 105,
  y: 105,
  ...COLORS[2],
};

const RECT_ATTRIBUTES = {
  rx: 7,
  ry: 7,
  strokeWidth: '0.2em',
};

export function HandleWildCard(props) {
  const refSvg = useSvgContext();

  const refRect1 = useRef();
  const refRect2 = useRef();
  const refRect3 = useRef();
  const refRect4 = useRef();

  const refGroup = useRef();

  useEffect(() => {
    // gsap.set(refGroup.current, { rotation: -180, transformOrigin: '50% 50%' });
    const randomAngle = Math.floor(Math.random() * 90);
    gsap.to(refGroup.current, {
      rotation: 360 - randomAngle,
      duration: 0.6,
      transformOrigin: '50% 50%',
    });
    const animateObject = {
      rotation: 360,
      duration: 1.4,
      transformOrigin: '50% 50%',
    };
    gsap.to(refRect1.current, animateObject);
    gsap.to(refRect2.current, animateObject);
    gsap.to(refRect3.current, animateObject);
    gsap.to(refRect4.current, animateObject);
  });

  return (
    <>
      {createPortal(
        <>
          <g
            ref={refGroup}
            transform={`translate(${GROUP_POSITION.x}, ${GROUP_POSITION.y})`}
          >
            <rect
              ref={refRect1}
              {...DIMS}
              {...LEFT_TOP_POSITIONS}
              {...RECT_ATTRIBUTES}
            />
            <rect
              ref={refRect2}
              {...DIMS}
              {...LEFT_BOTTOM_POSITIONS}
              {...RECT_ATTRIBUTES}
            />
            <rect
              ref={refRect3}
              {...DIMS}
              {...RIGHT_TOP_POSITIONS}
              {...RECT_ATTRIBUTES}
            />
            <rect
              ref={refRect4}
              {...DIMS}
              {...RIGHT_BOTTOM_POSITIONS}
              {...RECT_ATTRIBUTES}
            />
          </g>
        </>,
        refSvg.current
      )}
    </>
  );
}
