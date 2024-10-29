import React from 'react';

import {
  SCORELINE_ATTRIBUTES,
  TOP_OFFSET,
  LEFT_OFFSET,
} from './svg_gameresults_playerscoreline';

const FILTER_ID = 'blur-back-table-wrapper';

const SCORETABLE_ATTRIBUTES = {
  height: SCORELINE_ATTRIBUTES.height * 4 + 60,
  width: SCORELINE_ATTRIBUTES.width + 20,
  fill: '#e6cada',
};

export default function SvgUsersScoreTableWrapper(props) {
  return (
    <>
      <defs>
        <filter id={FILTER_ID} filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
        </filter>
      </defs>
      <rect
        filter={`url(#${FILTER_ID})`}
        transform={`matrix(1,0,0,1,${LEFT_OFFSET - 10},${TOP_OFFSET - 10})`}
        {...SCORETABLE_ATTRIBUTES}
      ></rect>
    </>
  );
}
