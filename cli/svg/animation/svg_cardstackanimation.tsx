import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { getBlankBacksideCard } from '../svg_getcard.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
} from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
import { useSvgContext } from '../svg_container.tsx';
import { USER_INFO } from '../svg_userplaceholder.tsx';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

const AnimatePath = (props) => {
  const refToCardGroup = useRef();
  const { pathToDraw } = props;
  props.pathToDraw &&
    console.log(`\t\t CHECK input props pathToDraw= ${pathToDraw}`);

  useEffect(() => {
    if (refToCardGroup.current) {
      console.log(`\t ::: refToGroup.current=${refToCardGroup.current}`);
      if (pathToDraw) {
        console.log(`\t\t::: ANIME PATH path= ${pathToDraw}`);
        gsap.to(refToCardGroup.current, {
          motionPath: {
            path: pathToDraw,
            // align: pathToDraw,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          transformOrigin: '50% 50%',
          rotation: 15,
          duration: 1,
          ease: 'power1.inOut',
        });
      }
    }
  }, [pathToDraw]);

  return (
    <>
      {pathToDraw && (
        <>
          <g
            ref={refToCardGroup}
            transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}
          >
            {getBlankBacksideCard()}
          </g>
          <g transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
            {getBlankBacksideCard()}
          </g>
        </>
      )}
    </>
  );
};

export function SvgCardStackAnimation(props) {
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);
  const refSvg = useSvgContext();

  let pathToDraw;
  //   console.log(
  //     `>>props.parentGroup=${props.parentGroup}\n !lastPlayerCardId=${lastPlayerCardId} lastPlayerId=${lastPlayerId}`
  //   );

  const getUserCardHandPosition = (playerId, svgDoc) => {
    const defaultValue = { x: 400, y: 325 };
    const userHand = svgDoc?.querySelector(`#${USER_INFO[playerId - 1].id}`);
    if (!userHand) return defaultValue;
    userHand;
    let ctm = userHand.getScreenCTM();
    // let inverse = ctm.inverse();
    // console.log(`\tinverse =${inverse}`);
    // const stringToOutput = `a: ${ctm.a}  b:${ctm.b}\nc:${ctm.c}  d:${ctm.d}\ne:${ctm.e}  f:${ctm.f}`;
    // console.log(stringToOutput);
    // console.log(
    //   `a: ${inverse.a}  b:${inverse.b}\nc:${inverse.c}  d:${inverse.d}\ne:${inverse.e}  f:${inverse.f}`
    // );
    // console.log(userHand.getBBox());
    // const { x, y } = userHand?.getBoundingClientRect() || defaultValue;
    return { x: parseInt(ctm.e), y: parseInt(ctm.f) };
  };
  let refToDebug = useRef();
  let pathToDebug;
  if (props.parentGroup && !lastPlayerCardId && lastPlayerId) {
    console.log(`\t :: DRAW a8n lastPlayerCardId= ${lastPlayerCardId}`);
    const { e, f } = props.parentGroup.getScreenCTM();
    const endPosition = getUserCardHandPosition(lastPlayerId, refSvg.current);
    pathToDebug = (
      <>
        <path
          ref={refToDebug}
          d={`M ${e},${f} L ${endPosition.x},${endPosition.y}`}
          fill='none'
          stroke='red'
          strokeWidth='0.1em'
        />
      </>
    );
    let eNorm = parseInt(e);
    let fNorm = parseInt(f);
    pathToDraw = `M ${e},${f} L ${endPosition.x},${endPosition.y}`;
    console.log(`\t :: DRAW a8n pathToDraw= ${pathToDraw}`);
  }

  //   console.log(`>RENDER< parentGroup=${props.parentGroup.}`);

  //   useEffect(() => {
  //     console.log(`>USEFFECT< parentGroup=${props.parentGroup}`);
  //   });

  return (
    <>
      {createPortal(<AnimatePath pathToDraw={pathToDraw} />, refSvg.current)},
      {createPortal(
        <path d={pathToDraw} fill='none' stroke='red' strokeWidth='0.1em' />,
        refSvg.current
      )}
    </>
  );
}
