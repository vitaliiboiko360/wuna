import React from 'react';
import * as css from './gameresults.scss';

import { gsap } from 'gsap';

export default function EndGameResultsOutput(props) {
  const { gameResults } = props;
  const { firstPlace, secondPlace, thirdPlace, fourthPlace } = gameResults;
  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={'player-line'}>{firstPlace.join(' ')}</div>
        <div className={'player-line'}>{secondPlace.join(' ')}</div>
        <div className={'player-line'}>{thirdPlace.join(' ')}</div>
        <div className={'player-line'}>{fourthPlace.join(' ')}</div>
      </div>
    </div>
  );
}
