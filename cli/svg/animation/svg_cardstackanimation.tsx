import React, { useRef, useEffect } from 'react';
import { getBlankBacksideCard } from '../svg_getcard.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import {
  selectActiveMoveLastPlayerCard,
  selectActiveMoveLastPlayer,
} from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
import { useSvgContext } from '../svg_container.tsx';
import { USER_INFO } from '../svg_userplaceholder.tsx';

export function SvgCardStackAnimation(props) {
  const refTopCard = useRef();
  const lastPlayerCardId = useAppSelector(selectActiveMoveLastPlayerCard);
  const lastPlayerId = useAppSelector(selectActiveMoveLastPlayer);
  const refSvg = useSvgContext();

  let pathToDraw;
  //   console.log(
  //     `>>props.parentGroup=${props.parentGroup}\n !lastPlayerCardId=${lastPlayerCardId} lastPlayerId=${lastPlayerId}`
  //   );

  const getUserCardHandPosition = (playerId, svgDoc) => {
    const userHand = svgDoc?.querySelector(`#${USER_INFO[playerId - 1].id}`);
    const { x, y } = userHand?.getBoundingClientRect() || { x: 400, y: 325 };
    return { x: x, y: y };
  };

  if (props.parentGroup && !lastPlayerCardId && lastPlayerId) {
    // console.log(JSON.stringify(props.parentGroup.getBoundingClientRect()));
    const { x, y } = props.parentGroup.getBoundingClientRect();
    const endPosition = getUserCardHandPosition(lastPlayerId, refSvg.current);
    pathToDraw = (
      <>
        <path
          d={`M ${x},${y} L ${endPosition.x},${endPosition.y}`}
          fill='none'
          stroke='red'
          strokeWidth='0.1em'
        />
      </>
    );
  }

  //   console.log(`>RENDER< parentGroup=${props.parentGroup.}`);

  //   useEffect(() => {
  //     console.log(`>USEFFECT< parentGroup=${props.parentGroup}`);
  //   });

  return (
    <>
      <g ref={refTopCard} transform={`matrix(0.5,0.8,-0.905,0.2,280,130)`}>
        {getBlankBacksideCard()}
      </g>
      {pathToDraw}
    </>
  );
}
