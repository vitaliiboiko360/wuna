import React from 'react';
import * as css from './gameresults.scss';

import SvgGameResultsContainer from './svg_gameresults_container';

import { gsap } from 'gsap';
import SvgPlayerScoreLine, { PLACE } from './svg_gameresults_playerscoreline';

export default function EndGameResultsOutput(props) {
  const { gameResults } = props;
  const { firstPlace, secondPlace, thirdPlace, fourthPlace } = gameResults;
  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <SvgGameResultsContainer>
          <SvgPlayerScoreLine
            place={PLACE.FIRST}
            playerScoreCardArray={firstPlace}
          />
          <SvgPlayerScoreLine
            place={PLACE.SECOND}
            playerScoreCardArray={secondPlace}
          />
          <SvgPlayerScoreLine
            place={PLACE.THIRD}
            playerScoreCardArray={thirdPlace}
          />
          <SvgPlayerScoreLine
            place={PLACE.FORTH}
            playerScoreCardArray={fourthPlace}
          />
          <foreignObject x="100" y="600" height="100" width="500">
            <div xmlns="http://www.w3.org/1999/xhtml" className={'player-line'}>
              {firstPlace.join(' ')}
            </div>
            <div xmlns="http://www.w3.org/1999/xhtml" className={'player-line'}>
              {secondPlace.join(' ')}
            </div>
            <div xmlns="http://www.w3.org/1999/xhtml" className={'player-line'}>
              {thirdPlace.join(' ')}
            </div>
            <div xmlns="http://www.w3.org/1999/xhtml" className={'player-line'}>
              {fourthPlace.join(' ')}
            </div>
          </foreignObject>
        </SvgGameResultsContainer>
      </div>
    </div>
  );
}
