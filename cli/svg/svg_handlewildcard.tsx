import React, { useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { useWebSocketContext } from '../websocketprovider.tsx';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { updateActiveMoveWildCardColor } from '../store/activeMove.ts';
import { useSvgContext } from './svg_container';
import gsap from 'gsap';
import { USER_1 } from '../websocketconsumer';

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
export const COLORS = ['#000', '#ff5555', '#00aa00', '#5555ff', '#ffaa00'];

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
};

export function updateColorOnWildCard(
  wildCardElement: SVGElement,
  hexColorToChangeTo: string,
  onEndFunction: Function = () => {}
) {
  let currentElement: Element | null = wildCardElement.children.item(0);
  let traverseArray: ElementType[] = [];
  while (currentElement) {
    if (currentElement.children.length) {
      traverseArray.push(currentElement.children.item(0));
    }
    if (currentElement.tagName == 'rect' || currentElement.tagName == 'RECT') {
      if (
        currentElement.style.fill === '#000000' ||
        currentElement.style.fill === 'rgb(0, 0, 0)'
      ) {
        currentElement.style.fill = hexColorToChangeTo;
        typeof onEndFunction === 'function' && onEndFunction();
      }
    }

    currentElement =
      (currentElement.nextElementSibling as SVGElement) ??
      traverseArray.shift();
  }
}

export function HandleWildCard(props) {
  const refSvg = useSvgContext();
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);

  const wsContext = useWebSocketContext();

  const refRect1 = useRef();
  const refRect2 = useRef();
  const refRect3 = useRef();
  const refRect4 = useRef();

  const refGroup = useRef();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.lastPlayerId !== USER_1) {
      return;
    }
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

  const onClick = (event) => {
    let colorToChangeTo = '';
    let lastButtonToRemove;
    [refRect1, refRect2, refRect3, refRect4].forEach((ref) => {
      if (!ref.current.isSameNode(event.currentTarget)) {
        ref.current.remove();
      } else {
        colorToChangeTo = ref.current.getAttribute('fill');
        lastButtonToRemove = ref.current;
      }
    });
    const wildCard = refGroup.current.previousElementSibling;
    if (wildCard) {
      updateColorOnWildCard(wildCard, colorToChangeTo, () => {
        gsap.to(lastButtonToRemove, {
          opacity: 0,
          duration: 0.3,
          ease: 'power4.in',
          onComplete: () => {
            lastButtonToRemove.remove();
            const colorId = COLORS.indexOf(colorToChangeTo);
            // dispatch(updateActiveMoveWildCardColor(colorId));
            let arrayToSend: Uint8Array = new Uint8Array(3);
            console.log(
              `activePlayerSeatNumber=${activePlayerSeatNumber} props.lastCardId=${props.lastPlayerCardId} colorId=${colorId}`
            );
            arrayToSend[0] = activePlayerSeatNumber;
            arrayToSend[1] = props.lastPlayerCardId;
            arrayToSend[2] = colorId;
            wsContext.send(arrayToSend);
          },
        });
      });
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
