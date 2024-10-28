import React from 'react';

export const SVG_GAMERESULTS_DIMENSTIONS = {
  width: 700,
  height: 700,
  viewBox: '0 0 700 700',
};

export default function SvgGameResultsContainer(props) {
  return <svg {...SVG_GAMERESULTS_DIMENSTIONS}>{props.children}</svg>;
}
