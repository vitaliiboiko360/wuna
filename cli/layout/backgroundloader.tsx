import React from 'react';
import * as css from './layout.scss';

const paths = [
  'data/bg/172144-846731218_large.mp4',
  'data/bg/180075-863401737_moon_house.mp4',
  'data/bg/201290-915375225_milton_resort.mp4',
  'data/bg/186611-878455887_wasted_fire.mp4',
  'data/bg/205921_large.mp4',
  'data/bg/165986-833909364_large.mp4',
  'data/bg/180075-863401737_moon_house.mp4',
  'data/bg/172144-846731218_large.mp4',
  'data/bg/201242-914943518_unreal_hideout.mp4',
  'data/bg/210707_frontyard_fireplace.mp4',
  'data/bg/201290-915375225_milton_resort.mp4',
];
export function BackgroundLoader(props) {
  return (
    <>
      <video className={css.videoBackground} autoPlay loop muted playsInline>
        <source
          src={paths[Math.floor(Math.random() * paths.length)]}
          type="video/mp4"
        ></source>
      </video>
    </>
  );
}
