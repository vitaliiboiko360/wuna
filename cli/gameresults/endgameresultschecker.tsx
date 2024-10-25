import React from 'react';

import { useAppSelector } from '../store/hooks.ts';
import { selectGameResults } from '../store/gameResults.ts';
import EndGameResultsOutput from './gameresultsoutput.tsx';

export default function EndGameResultsChecker(props) {
  // console.log(`\t:::\tprops.svgGameField= ${props.svgGameField}`);
  const gameResults = useAppSelector(selectGameResults);
  return (
    <>
      {gameResults.isReady && (
        <EndGameResultsOutput gameResults={gameResults} />
      )}
    </>
  );
}
