import React from 'react';

const SVG_DIMENSTIONS = {
  width: 700,
  height: 700,
  viewBox: '0 0 700 700',
};

export default function SvgGameResultsContainer(props) {
  return <svg {...SVG_DIMENSTIONS}>{props.children}</svg>;
}
