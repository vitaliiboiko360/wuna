import React, { Children, useState, useEffect, useRef } from 'react';
import { selectActivePlayerSeatNumber } from '../store/activePlayerSeatNumber.ts';
import { useAppSelector } from '../store/hooks.ts';
import * as css from './layout.scss';

export function RootContainer(props) {
  const [svgGameField, setSvgGameField] = useState();
  const activePlayerSeatNumber = useAppSelector(selectActivePlayerSeatNumber);
  const refDivSvg = useRef();
  useEffect(() => {
    if (activePlayerSeatNumber != 0) {
      refDivSvg.current?.classList.replace(
        css.svgContainerEmpty,
        css.svgContainerFull
      );
    }
  }, [activePlayerSeatNumber]);

  const arrayChildren = Children.toArray(props.children);

  return (
    <>
      <div className={css.rootContainer}>
        <div className={css.bgContainer}>{arrayChildren[0]}</div>
        <div ref={refDivSvg} className={css.svgContainerEmpty}>
          <div className={css.divSvgContainerWrap}>
            {React.cloneElement(arrayChildren[1], {
              setSvgGameField: setSvgGameField,
            })}
          </div>
        </div>
        {arrayChildren[2] &&
          React.cloneElement(arrayChildren[2], {
            svgGameField: svgGameField,
          })}
        {arrayChildren.slice(3)}
      </div>
    </>
  );
}
