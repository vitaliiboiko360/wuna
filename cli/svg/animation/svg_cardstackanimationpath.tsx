import React, { useRef, useEffect } from 'react';

import { getBlankBacksideCard } from '../svg_getcard.tsx';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

export const AnimatePath = (props) => {
  const refToCardGroup = useRef();
  const { pathToDraw, numberToDraw, userSeat } = props;
  props.pathToDraw &&
    console.log(`\t\t CHECK input props pathToDraw= ${pathToDraw}`);

  useEffect(() => {
    if (refToCardGroup.current) {
      console.log(`\t ::: refToGroup.current=${refToCardGroup.current}`);
      let pathToMeasure = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      pathToMeasure.setAttribute('d', pathToDraw);
      let totalLength = pathToMeasure.getTotalLength();
      if (pathToDraw) {
        console.log(
          `\t\t::: ANIME PATH path= ${pathToDraw}\t totalLength= ${totalLength}`
        );
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
          transformOrigin: '50% 50%',
          stagger: 0.15 * numberToDraw,
          rotation: 90 * (userSeat + 1),
          duration: 0.4 * (totalLength / 100),
          ease: 'power3.out',
        });
      }
    }
  }, [pathToDraw]);

  return (
    <>
      {pathToDraw && (
        <>
          <g key={`card-stack-anim-top-0`} ref={refToCardGroup}>
            {Array.from({ length: numberToDraw }).map((_, index) => {
              return (
                <React.Fragment key={`card-stack-drew-animation-key-${index}`}>
                  <g transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
                    {getBlankBacksideCard()}
                  </g>
                </React.Fragment>
              );
            })}
          </g>
          <g
            key={`card-stack-anim-top-1`}
            transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}
          >
            {getBlankBacksideCard()}
          </g>
        </>
      )}
    </>
  );
};
