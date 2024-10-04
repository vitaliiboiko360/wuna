import React, { createContext, useContext } from 'react';

const ws = new WebSocket(`wss://${location.host}/wss`);
ws.binaryType = 'arraybuffer';

export const WebSocketContext = createContext(null);

export default function WebSocketContextProvider(props) {
  return (
    <WebSocketContext.Provider value={ws}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocketContext = () => useContext(WebSocketContext);
