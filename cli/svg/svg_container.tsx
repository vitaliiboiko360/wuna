import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

export const SVG_ATTRIBUTES = {
  viewBox: '0 0 800 650',
  width: 800,
  height: 650,
};

export const SvgContext = createContext();

const Svg = (props) => {
  const refSvg = useRef();
  useEffect(() => {
    props.setRef(refSvg);
    props.setSvgGameField(refSvg.current);
  });
  return (
    <svg ref={refSvg} viewBox={SVG_ATTRIBUTES.viewBox}>
      {props.children}
    </svg>
  );
};

export default function SvgContainer(props) {
  const [ref, setRef] = useState();
  return (
    <SvgContext.Provider value={ref}>
      <Svg {...props} setRef={setRef}>
        {props.children}
      </Svg>
    </SvgContext.Provider>
  );
}

export const useSvgContext = () => useContext(SvgContext);
