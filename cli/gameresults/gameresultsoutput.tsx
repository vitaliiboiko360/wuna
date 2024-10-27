import React from 'react';
import * as css from './gameresults.scss';

import SvgGameResultsContainer from './svg_gameresults_container';

import { gsap } from 'gsap';

export default function EndGameResultsOutput(props) {
  const { gameResults } = props;
  const { firstPlace, secondPlace, thirdPlace, fourthPlace } = gameResults;
  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <SvgGameResultsContainer>
          <div className={'player-line'}>{firstPlace.join(' ')}</div>
          <div className={'player-line'}>{secondPlace.join(' ')}</div>
          <div className={'player-line'}>{thirdPlace.join(' ')}</div>
          <div className={'player-line'}>{fourthPlace.join(' ')}</div>
        </SvgGameResultsContainer>
      </div>
    </div>
  );
}
