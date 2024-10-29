import React from 'react';

import SvgGameResultsBackground from './svg_gameresults_background';
import SvgUsersScoreTableWrapper from './svg_gameresults_usersscorewrapper';
import SvgGameResultsSharedDefs from './svg_gameresults_shareddefs';

export const SVG_GAMERESULTS_DIMENSTIONS = {
  width: '75vh',
  height: '75vh',
  viewBox: '0 0 700 700',
};

export default function SvgGameResultsContainer(props) {
  return (
    <svg {...SVG_GAMERESULTS_DIMENSTIONS}>
      {<SvgGameResultsSharedDefs />}
      {<SvgGameResultsBackground />}
      {<SvgUsersScoreTableWrapper />}
      {props.children}
    </svg>
  );
}
