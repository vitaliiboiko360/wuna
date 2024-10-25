import React from 'react';

import GameField from './game_field';
import WebSocketContextProvider from './websocketprovider';
import WebSocketConsumer from './websocketconsumer';
import QueryProvider from './queryprovider';
import { BackgroundLoader } from './layout/backgroundloader';
import { RootContainer } from './layout/rootcontainer';
import EndGameResultsChecker from './gameresults/endgameresultschecker';

export default function Main() {
  return (
    <QueryProvider>
      <WebSocketContextProvider>
        <WebSocketConsumer />
        <RootContainer>
          <BackgroundLoader />
          <GameField />
          <EndGameResultsChecker />
        </RootContainer>
      </WebSocketContextProvider>
    </QueryProvider>
  );
}
