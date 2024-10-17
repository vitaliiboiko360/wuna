import React, { useEffect, useRef } from 'react';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { useAppSelector } from '../store/hooks.ts';
import * as css from './rootcontainer.scss';

export function RootContainer(props) {
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  const refDivSvg = useRef();
  useEffect(() => {
    if (activePlayerSeatNumber != 0) {
      refDivSvg.current?.classList.replace(
        css.svgContainerEmpty,
        css.svgContainer
      );
    }
  }, [activePlayerSeatNumber]);

  return (
    <>
      <div className={css.rootContainer}>
        <div className={css.bgContainer}>{props.children[0]}</div>
        <div ref={refDivSvg} className={css.svgContainerEmpty}>
          {props.children[1]}
        </div>
      </div>
    </>
  );
}