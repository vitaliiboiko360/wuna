import React from 'react';

import PlayerScoreStats from './svg_gameresults_playerscorestats';

export const enum PLACE {
  FIRST = 0,
  SECOND,
  THIRD,
  FORTH,
}

export const SCORELINE_ATTRIBUTES = {
  height: 75,
  width: 400,
  rx: 5,
  ry: 5,
};

export default function SvgPlayerScoreLine(props) {
  const { playerScoreCardArray, place } = props;
  return (
    <g
      transform={`matrix(1,0,0,1,150,${
        100 + place * (SCORELINE_ATTRIBUTES.height + 25)
      })`}
    >
      <rect {...SCORELINE_ATTRIBUTES}>
        {<PlayerScoreStats playerScoreCardArray={playerScoreCardArray} />}
      </rect>
    </g>
  );
}
