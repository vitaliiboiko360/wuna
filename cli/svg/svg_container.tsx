import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export const SVG_DIMENSIONS = { width: 800, height: 650 };

export const SvgContext = createContext();

const Svg = (props) => {
  const refSvg = useRef();
  useEffect(() => {
    props.setRef(refSvg)
  });
  return (
    <svg
      ref={refSvg}
      {...SVG_DIMENSIONS}
    >
      {props.children}
    </svg>);
};

export default function SvgContainer(props) {
  const [ref, setRef] = useState();
  return (
    <SvgContext.Provider value={ref}>
      <Svg setRef={setRef}>
        {props.children}
      </Svg>
    </SvgContext.Provider>
  );
}

export const useSvgContext = () => useContext(SvgContext);