import React from 'react';

import { useSvgContext } from './svg_container';

const DIMS = {
  'width': 100,
  'height': 100,
};

const LEFT_TOP_POSITIONS = {
  'x': 0,
  'y': 0,
}

const LEFT_BOTTOM_POSITIONS = {
  'x': 0,
  'y': 120,
}

const RIGHT_TOP_POSITIONS = {
  'x': 120,
  'y': 0,
}

const RIGHT_BOTTOM_POSITIONS = {
  'x': 120,
  'y': 120,
}

const RECT_ATTRIBUTES = {
  fill: 'green',
  rx: 7,
  ry: 7,
};

export function HandleWildCard(props) {

  const refSvg = useSvgContext();

  return (
    <>
      <g transform='translate(290,175)'>
        <rect {...DIMS} {...LEFT_TOP_POSITIONS} {...RECT_ATTRIBUTES} />
        <rect {...DIMS} {...LEFT_BOTTOM_POSITIONS} {...RECT_ATTRIBUTES} />
        <rect {...DIMS} {...RIGHT_TOP_POSITIONS} {...RECT_ATTRIBUTES} />
        <rect {...DIMS} {...RIGHT_BOTTOM_POSITIONS} {...RECT_ATTRIBUTES} />
      </g>
    </>
  );
}