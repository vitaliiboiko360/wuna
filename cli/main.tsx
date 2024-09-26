import React from 'react';

import GameField from './game_field';
import WebSocketContextProvider from './websocketprovider';
import WebSocketConsumer from './websocketconsumer';

export default function Main() {
  return (
    <WebSocketContextProvider>
      <WebSocketConsumer />
      <GameField />
    </WebSocketContextProvider>
  );
}