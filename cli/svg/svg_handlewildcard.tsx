import React from 'react';

import { useSvgContext } from './svg_container';

export function HandleWildCard(props) {

  const refSvg = useSvgContext();

  return (
    <>
      <g transform='translate(300,300)'>
        <rect ></rect>
      </g>
    </>
  );
}