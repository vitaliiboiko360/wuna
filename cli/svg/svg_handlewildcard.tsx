import React, { useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { useSvgContext } from './svg_container';
import gsap from 'gsap';

const COLOR_ATTRIBUTES = [
  { fill: '#ff5555', stroke: '#d74a49' },
  { fill: '#00aa00', stroke: '#12900b' },
  { fill: '#ffaa00', stroke: '#d7900e' },
  { fill: '#5555ff', stroke: '#4b49d6' },
];

const enum COLOR_INDEX {
  RED = 0,
  GREEN,
  BLUE,
  YELLOW,
}
const COLORS = ['#ff5555', '#00aa00', '#ffaa00', '#5555ff'];

type ElementType = Element | SVGElement | null | undefined;

const GROUP_POSITION = {
  x: 305,
  y: 190,
};

const LEFT_TOP_ATTRIBUTES = {
  x: 0,
  y: 0,
  ...COLOR_ATTRIBUTES[0],
};

const LEFT_BOTTOM_ATTRIBUTES = {
  x: 0,
  y: 105,
  ...COLOR_ATTRIBUTES[3],
};

const RIGHT_TOP_ATTRIBUTES = {
  x: 105,
  y: 0,
  ...COLOR_ATTRIBUTES[1],
};

const RIGHT_BOTTOM_ATTRIBUTES = {
  x: 105,
  y: 105,
  ...COLOR_ATTRIBUTES[2],
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

  const updateColorOnWildCard = function (
    wildCardElement: SVGElement,
    hexColorToChangeTo: string
  ) {
    console.log(this);
    let currentElement: ElementType = wildCardElement.children.item(0);
    let traverseArray: ElementType[] = [];
    while (currentElement) {
      if (currentElement.children.length) {
        traverseArray.push(currentElement.children.item(0));
      }
      if (
        currentElement.tagName == 'rect' ||
        currentElement.tagName == 'RECT'
      ) {
        if (
          currentElement.style.fill == '#000000' ||
          currentElement.style.fill == 'rgb(0, 0, 0)'
        ) {
          currentElement.style.fill = hexColorToChangeTo;
        }
        console.log(currentElement);
      }

      currentElement =
        currentElement.nextElementSibling ?? traverseArray.shift();
    }
  };

  const onClick = (event) => {
    console.log(this);
    let colorToChangeTo = '';
    [refRect1, refRect2, refRect3, refRect4].forEach((ref) => {
      if (!ref.current.isSameNode(event.currentTarget)) {
        ref.current.remove();
      } else {
        colorToChangeTo = ref.current.fill;
      }
    });
    const wildCard = refGroup.current.previousElementSibling;
    if (wildCard) {
      updateColorOnWildCard(wildCard, colorToChangeTo);
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
