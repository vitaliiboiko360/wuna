import React from 'react';
import * as css from './layout/endgameresults.scss';
import { useAppSelector } from './store/hooks.ts';
import { gsap } from 'gsap';

export default function EndGameResultsChecker(props) {
  return (
    <>
      <div className={css.outerDiv}></div>
    </>
  );
}
