import React, { useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { useSvgContext } from './svg_container';
import gsap from 'gsap';

const DIMS = {
  width: 100,
  height: 100,
};

const COLORS = [{ fill: 'green' }];

const LEFT_TOP_POSITIONS = {
  x: 0,
  y: 0,
};

const LEFT_BOTTOM_POSITIONS = {
  x: 0,
  y: 120,
};

const RIGHT_TOP_POSITIONS = {
  x: 120,
  y: 0,
};

const RIGHT_BOTTOM_POSITIONS = {
  x: 120,
  y: 120,
};

const RECT_ATTRIBUTES = {
  rx: 7,
  ry: 7,
};

export function HandleWildCard(props) {
  const refSvg = useSvgContext();

  const refRect1 = useRef();
  const refRect2 = useRef();
  const refRect3 = useRef();
  const refRect4 = useRef();

  const refGroup = useRef();

  useEffect(() => {
    gsap.set(refGroup.current, { rotation: -180, transformOrigin: '50% 50%' });
    gsap.to(refGroup.current, {
      rotation: 180,
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
          <g ref={refGroup} transform='translate(290,175)'>
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
