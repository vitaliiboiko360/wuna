import React from 'react';
import { getCard } from './svg_getcard';

import {
  selectActiveMoveCard,
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
  selectActiveMoveWildCardColor,
} from '../store/activeMove.ts';
import getPath from './animation/get_path.ts';
import { useAppSelector } from '../store/hooks.ts';

import { renderToString } from 'react-dom/server';

import { IDPATH, PATHDATA, xCenter, yCenter } from './svg_cardpile.tsx';

import {
  isValidCard,
  USER_1,
  USER_2,
  USER_3,
  USER_4,
} from '../websocketconsumer.tsx';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useSvgContext } from './svg_container';

import { usePlayCardInfoContext } from './svg_playcardprovider.tsx';

import { getGaussianRandom as getRandom } from './animation/get_random.ts';

import {
  COLORS,
  HandleWildCard,
  updateColorOnWildCard,
} from './svg_handlewildcard.tsx';
import { isWildCard } from '../../src/Cards.ts';

import round from 'lodash.round';

gsap.registerPlugin(MotionPathPlugin);

const CARD_HALF_WIDTH = 32;
const CARD_HALF_HEIGHT = 48 + 30; // we need to take up the whole thing (card stack)
const deltaFromCenter = 25;
const deltaAngle = 25;

const Card = (props) => {
  const refSvg = useSvgContext();
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const cardOnTop = useAppSelector(selectActiveMoveCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);
  const activeWildCardColorToPlay = useAppSelector(
    selectActiveMoveWildCardColor
  );

  const playCardInfo = usePlayCardInfoContext();

  if (
    lastPlayerCardId == 0 &&
    lastPlayerId != USER_1 &&
    !(playCardInfo.x && playCardInfo.y)
  ) {
    // console.log('SKIP CARD RENDER lastPlayerCardId= ', lastPlayerCardId);
    return;
  }

  if (!isValidCard(lastPlayerCardId)) {
    // console.log(
    //   'SKIP CARD RENDER !isValidCard(lastPlayerCardId== ',
    //   lastPlayerCardId,
    //   ' )==false'
    // );
    return;
  }

  if (!refSvg.current) {
    console.log('SKIP CARD RENDER no ref');
    return;
  }

  const runAnimationOnCard = (playerId) => {
    if (playerId == 0 || lastPlayerCardId != cardOnTop) {
      console.log(
        `\n\tlastPlayerCardId (${lastPlayerCardId}) != cardOnTop (${cardOnTop})\n\nSKIP CARD RENDER Animation but lastPlayerId=`,
        playerId
      );
      return;
    }

    const element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const r = Math.floor(Math.random() * deltaFromCenter) + 1;
    const alpha = Math.random() * (2 * Math.PI);
    const x = round(xCenter + Math.cos(alpha) * r - CARD_HALF_WIDTH, 2);
    const y = round(yCenter + Math.sin(alpha) * r - CARD_HALF_HEIGHT, 2);
    // console.log(`r=${r}\talpha=${alpha}\tx=${x}\ty=${y}`);

    const randomAngle = getRandom(-deltaAngle, deltaAngle);

    element.setAttribute(
      'transform',
      `translate(${xCenter - x},${yCenter - y})`
    );

    element.innerHTML = renderToString(getCard(lastPlayerCardId));

    const userXStart = playCardInfo.x;
    const userYStart = playCardInfo.y;

    const path = getPath(
      refSvg.current,
      playerId,
      x,
      y,
      userXStart,
      userYStart
    );

    let pathToMeasure = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    pathToMeasure.setAttribute('d', path);
    let totalLength = pathToMeasure.getTotalLength();

    const onComplete =
      playerId == USER_1
        ? () => {
            pathToMeasure.remove();
          }
        : () => {
            pathToMeasure.remove();
            updateColorOnWildCard(element, COLORS[activeWildCardColorToPlay]);
          };

    // console.log(`CARD PATH=${path}`);
    refSvg.current?.append(element);
    gsap.to(element, {
      motionPath: {
        path: path,
        alignOrigin: [0.5, 0.5],
      },
      duration: (totalLength / 100) * 0.4,
      rotation: 360 + randomAngle,
      ease: 'slow',
      repeat: 0,
      // startAt: { x: 0, y: 0 },
      transformOrigin: '50% 50%',
      onComplete: onComplete,
    });
    return element;
  };

  const playedCardElement = runAnimationOnCard(lastPlayerId);

  if (
    playCardInfo.isWildCard &&
    isWildCard(lastPlayerCardId) &&
    lastPlayerId == USER_1
  ) {
    return (
      <HandleWildCard
        lastPlayerId={lastPlayerId}
        lastPlayerCardId={lastPlayerCardId}
      />
    );
  }

  return <></>;
};

export default Card;
