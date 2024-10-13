import React, { useRef, useEffect } from 'react';

import { getBlankBacksideCard } from '../svg_getcard.tsx';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

export const AnimatePath = (props) => {
  const refToCardGroup = useRef();
  const { pathToDraw } = props;
  props.pathToDraw &&
    console.log(`\t\t CHECK input props pathToDraw= ${pathToDraw}`);

  useEffect(() => {
    if (refToCardGroup.current) {
      console.log(`\t ::: refToGroup.current=${refToCardGroup.current}`);
      if (pathToDraw) {
        console.log(`\t\t::: ANIME PATH path= ${pathToDraw}`);
        gsap.set(refToCardGroup.current, { transform: '' });
        gsap.to(refToCardGroup.current, {
          motionPath: {
            path: pathToDraw,
            // align: pathToDraw,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          // transformOrigin: '50% 50%',
          rotation: 195,
          duration: 1.1,
          ease: 'power3.in',
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
