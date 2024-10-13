import React, { useRef, useEffect } from 'react';

import { getBlankBacksideCard } from '../svg_getcard.tsx';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

export const AnimatePath = (props) => {
  const refToCardGroup = useRef();
  const { pathToDraw, numberToDraw } = props;
  props.pathToDraw &&
    console.log(`\t\t CHECK input props pathToDraw= ${pathToDraw}`);

  useEffect(() => {
    if (refToCardGroup.current) {
      console.log(`\t ::: refToGroup.current=${refToCardGroup.current}`);
      if (pathToDraw) {
        console.log(`\t\t::: ANIME PATH path= ${pathToDraw}`);
        gsap.set(Array.from(refToCardGroup.current.children), {
          transform: '',
        });
        gsap.to(Array.from(refToCardGroup.current.children), {
          motionPath: {
            path: pathToDraw,
            // align: pathToDraw,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          // transformOrigin: '50% 50%',
          stagger: 0.1,
          rotation: 195,
          duration: 0.7 * numberToDraw,
          ease: 'power3.out',
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
