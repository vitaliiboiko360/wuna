import React from 'react';
import * as css from './layout.scss';
export function BackgroundLoader(props) {
  return (
    <>
      <div className={css.flexVideoContainer}>
        <video autoPlay loop muted>
          <source
            src="data/bg/180075-863401737_moon_house.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </>
  );
}
