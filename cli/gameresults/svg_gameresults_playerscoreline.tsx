import React from 'react';

import PlayerScoreStats from './svg_gameresults_playerscorestats';
import SvgAvatartCopier from './svg_gameresults_avatarcopier';

export const enum PLACE {
  FIRST = 0,
  SECOND,
  THIRD,
  FORTH,
}

export const TOP_OFFSET = 80;
export const LEFT_OFFSET = 105;

export const SCORELINE_ATTRIBUTES = {
  height: 120,
  width: 490,
  rx: 5,
  ry: 5,
  // fill: '#f02',
  fill: '#6c4c571f',
};

export default function SvgPlayerScoreLine(props) {
  const { playerScoreCardArray, place } = props;
  return (
    <g
      transform={`matrix(1,0,0,1,105,${
        80 + place * (SCORELINE_ATTRIBUTES.height + 10)
      })`}
    >
      {<SvgAvatartCopier playerId={playerScoreCardArray.at(0)} />}
      <rect {...SCORELINE_ATTRIBUTES}>
        {<PlayerScoreStats playerScoreCardArray={playerScoreCardArray} />}
      </rect>
    </g>
  );
}
