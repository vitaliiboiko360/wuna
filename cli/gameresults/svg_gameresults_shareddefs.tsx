import React from 'react';

export const FILTER_BLUR_ID = 'filter-blur';

export default function SvgGameResultsSharedDefs(props) {
  return (
    <>
      <defs>
        <filter id={FILTER_BLUR_ID} filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
        </filter>
      </defs>
    </>
  );
}
