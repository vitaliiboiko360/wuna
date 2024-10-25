import React from 'react';
import * as css from './endgameresults.scss';

import { gsap } from 'gsap';

export default function EndGameResultsOutput(props) {
  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={'player-line'}></div>
        <div className={'player-line'}></div>
        <div className={'player-line'}></div>
        <div className={'player-line'}></div>
      </div>
    </div>
  );
}
