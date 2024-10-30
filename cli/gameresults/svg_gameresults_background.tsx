import React from 'react';

import { FILTER_BLUR_ID } from './svg_gameresults_shareddefs';

const GAME_RESULTS_BACKGROUND = {
  filter: `url(#${FILTER_BLUR_ID})`,
  cx: 0,
  cy: 0,
  rx: '7%',
  ry: '8%',
  width: '100%',
  height: '100%',
  // fill: '#d6cae6',
  fill: '#7f86b3f2',
};

export default function SvgGameResultsBackground(props) {
  return <rect {...GAME_RESULTS_BACKGROUND}></rect>;
}
