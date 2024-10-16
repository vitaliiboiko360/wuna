import React from 'react';
import * as css from './layout.scss';

const paths = [
  'data/bg/172144-846731218_large.mp4',
  'data/bg/180075-863401737_moon_house.mp4',
  'data/bg/201290-915375225_milton_resort.mp4',
];
export function BackgroundLoader(props) {
  return (
    <>
      <video className={css.videoBackground} autoPlay loop muted>
        <source src={paths[1]} type="video/mp4"></source>
      </video>
    </>
  );
}
