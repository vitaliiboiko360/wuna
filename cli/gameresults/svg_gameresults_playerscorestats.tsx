import React from 'react';

export default function PlayerScoreStats(props) {
  const { playerScoreCardArray } = props;
  return (
    <>
      <g transfrom={`matrix(1,0,0,1,20,20)`}>
        <rect x="0" y="0" height="50" width="0" fill="#a45c9d"></rect>
      </g>
    </>
  );
}
