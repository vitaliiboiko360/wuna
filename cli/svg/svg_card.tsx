import React, { forwardRef, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { getCard } from './svg_getcard';

import { selectActiveMoveCard, selectActiveMoveLastPlayerCard, selectActiveMoveLastPlayer } from '../store/activeMove.ts';
import getPath from './animation/get_path.ts';
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

import { IDPATH, PATHDATA, xCenter, yCenter } from './svg_cardsstack.tsx';

import { isValidCard, USER_1, USER_2, USER_3, USER_4 } from '../websocketconsumer.tsx';

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useSvgContext } from './svg_container';

import { usePlayCardInfoContext } from './svg_playcardprovider.tsx';

import { getGaussianRandom as getRandom } from './animation/get_random.ts';

gsap.registerPlugin(MotionPathPlugin);

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48 + 20; // we need to take up the whole thing (card stack) 
const deltaFromCenter = 25;
const deltaAngle = 25;

const Card = (props) => {
  const refSvg = useSvgContext();
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);
  const refCard = useRef(null);
  const playCardInfo = usePlayCardInfoContext();

  if (lastPlayerCardId == 0 && lastPlayerId != USER_1) {
    console.log('lastPlayerCardId= ', lastPlayerCardId);
    return;
  }

  if (!isValidCard(lastPlayerCardId)) {
    console.log('!isValidCard(lastPlayerCardId== ', lastPlayerCardId, ' )==false');
    return;
  }

  if (!refSvg.current) {
    console.log('!!!REF isnt ready');
    return;
  }

  const element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  const r = Math.floor(Math.random() * deltaFromCenter) + 1;
  const alpha = Math.random() * (2 * Math.PI);
  const x = xCenter + (Math.cos(alpha) * r) - CARD_HALF_WIDTH;
  const y = yCenter + (Math.sin(alpha) * r) - CARD_HALF_HEIGHT;
  // console.log(`r=${r}\talpha=${alpha}\tx=${x}\ty=${y}`);

  const randomAngle = getRandom(-deltaAngle, deltaAngle);

  element.setAttribute('transform', `translate(${xCenter - x},${yCenter - y})`);

  refCard.current = element;
  element.innerHTML = renderToString(getCard(lastPlayerCardId));

  refSvg?.current.append(element);

  const run = (element, playerId) => {
    if (playerId == 0) {
      console.log('Animation but lastPlayerId=', playerId);
      return;
    }
    const userXStart = playCardInfo.x;
    const userYStart = playCardInfo.y;

    gsap.to(element, {
      motionPath: {
        path: getPath(playerId, refSvg.current, x, y, userXStart, userYStart),
        alignOrigin: [0.5, 0.5]
      },
      duration: 1.5,
      rotation: 360 + randomAngle,
      ease: "slow",
      repeat: 0,
      transformOrigin: "50% 50%"
    });
  };
  run(element, lastPlayerId);
  return (<></>);
};

export default Card;