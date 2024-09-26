import WebSocket from 'ws';

let webSocketId: number = 0;

export declare interface AppWebSocketInterface extends WebSocket {
  id: number
}

export let wsArray: AppWebSocketInterface[] = [];

import { cleanupPlayerId, dispatchClientMessage } from './GameManager';

function initializeWebSocket(webSocket: AppWebSocketInterface) {
  webSocket.on('error', (error) => {
    console.log(`ERROR = ${error}`);
  });

  webSocket.on('close', () => {
    console.log('CLOSE connection... ID=', webSocket.id);
    let index = wsArray.indexOf(webSocket);
    if (index != -1) {
      wsArray.splice(index, 1);
    }
    cleanupPlayerId(webSocket.id);
  });

  webSocket.on('message', function message(data, isBinary) {
    if (isBinary) {
      dispatchClientMessage(data as Uint8Array, webSocket);
    }
  });
}

export default function registerPlayerConnection(ws: WebSocket) {
  let webSocket: AppWebSocketInterface = (ws) as AppWebSocketInterface;
  webSocket.id = webSocketId++;
  wsArray.push(webSocket);
  initializeWebSocket(webSocket);
}
