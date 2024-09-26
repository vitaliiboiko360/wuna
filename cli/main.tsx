import React from 'react';

import GameField from './game_field';
import WebSocketContextProvider from './websocketprovider';
import WebSocketConsumer from './websocketconsumer';
import QueryProvider from './queryprovider';

export default function Main() {
  return (
    <QueryProvider>
      <WebSocketContextProvider>
        <WebSocketConsumer />
        <GameField />
      </WebSocketContextProvider>
    </QueryProvider>
  );
}