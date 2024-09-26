import React, { createContext, useState, useContext } from 'react';

export type PlayCardInfo = { x: number, y: number };

const initialValue: PlayCardInfo = { x: 0, y: 0 };
export const PlayCardInfoContext = createContext(initialValue);

export default function PlayCardInfoProvider(props) {
  const [playCardInfo, setPlayCardInfo] = useState(initialValue);
  return (
    <PlayCardInfoContext.Provider
      value={playCardInfo}>
      {props.children[0]},
      {React.cloneElement(props.children[1], { setPlayCardInfo: setPlayCardInfo })}
    </PlayCardInfoContext.Provider>
  );
}

export const usePlayCardInfoContext = () => useContext(PlayCardInfoContext);