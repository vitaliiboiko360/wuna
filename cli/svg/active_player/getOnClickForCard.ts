import type { AppDispatch } from '../../store/store.ts';
import { removeActiveCard } from '../../store/activeCards.ts';
import { updateActiveMove, updateActiveMoveLastPlayerCard } from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
import { isWildCard } from '../../../src/Cards.ts';
export default function getOnClickForCard(idOfCard: number, webSocket: WebSocket, userId: number, dispatch: AppDispatch, updatePlayCardInfo) {
  return function (event: Event) {
    if (webSocket.readyState == WebSocket.OPEN) {
      let arrayToSend: Uint8Array = new Uint8Array(3);
      arrayToSend[0] = userId;
      arrayToSend[1] = idOfCard;
      if (isWildCard(idOfCard)) {
        arrayToSend[2] = Math.floor(Math.random() * 3) + 1;
      }
      webSocket.send(arrayToSend);
    }
    dispatch(removeActiveCard(idOfCard));
    dispatch(updateActiveMoveLastPlayerCard(idOfCard))
    dispatch(updateActiveMove(idOfCard, USER_1));
    const { x, y } = event.currentTarget?.getBoundingClientRect();
    updatePlayCardInfo({ x: x, y: y });
    // console.log(`x=${x}\ty=${y}`);
  };
}