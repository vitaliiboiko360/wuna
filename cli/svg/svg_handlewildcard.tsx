import React, { useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { useSvgContext } from './svg_container';
import gsap from 'gsap';

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

const LEFT_TOP_ATTRIBUTES = {
  x: 0,
  y: 0,
  ...COLORS[0],
};

const LEFT_BOTTOM_ATTRIBUTES = {
  x: 0,
  y: 105,
  ...COLORS[3],
};

const RIGHT_TOP_ATTRIBUTES = {
  x: 105,
  y: 0,
  ...COLORS[1],
};

const RIGHT_BOTTOM_ATTRIBUTES = {
  x: 105,
  y: 105,
  ...COLORS[2],
};

const RECT_ATTRIBUTES = {
  rx: 7,
  ry: 7,
  width: 85,
  height: 85,
  strokeWidth: '0.2em',
  onClick: onclick,
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

  let onClick = (event) => {
    [refRect1, refRect2, refRect3, refRect4].forEach((ref) => {
      if (!ref.current.isSameNode(event.currentTarget)) {
        ref.current.remove();
      }
    });
    const wildCard = refGroup.current.previousElementSibling;
    console.log(`wildCard=${wildCard}`);
    console.log(`wildCard=${wildCard.children}`);
    if (!wildCard) {
      console.log(`wildCard=${wildCard}`);
      return;
    }

    let currentElement = wildCard.children.item(0);
    let traverseArray: Element[] = [];
    while (currentElement) {
      if (currentElement.children.length) {
        traverseArray.push(currentElement.children.item(0));
      }
      if (
        currentElement.tagName == 'path' ||
        currentElement.tagName == 'PATH'
      ) {
        console.log(currentElement.style.fill);
      }
      currentElement =
        currentElement.nextElementSibling ?? traverseArray.shift();
    }
  };

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
              {...LEFT_TOP_ATTRIBUTES}
              {...RECT_ATTRIBUTES}
              onClick={onClick}
            />
            <rect
              ref={refRect2}
              {...LEFT_BOTTOM_ATTRIBUTES}
              {...RECT_ATTRIBUTES}
              onClick={onClick}
            />
            <rect
              ref={refRect3}
              {...RIGHT_TOP_ATTRIBUTES}
              {...RECT_ATTRIBUTES}
              onClick={onClick}
            />
            <rect
              ref={refRect4}
              {...RIGHT_BOTTOM_ATTRIBUTES}
              {...RECT_ATTRIBUTES}
              onClick={onClick}
            />
          </g>
        </>,
        refSvg.current
      )}
    </>
  );
}
