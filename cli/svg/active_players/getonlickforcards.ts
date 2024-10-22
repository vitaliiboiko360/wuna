import type { AppDispatch } from '../../store/store.ts';
import { removeActiveCard } from '../../store/activeCards.ts';
import {
  updateActiveMove,
  updateActiveMoveLastPlayerCard,
} from '../../store/activeMove.ts';
import { USER_1 } from '../../websocketconsumer.tsx';
import { isWildCard } from '../../../src/Cards.ts';
import { SVG_ATTRIBUTES } from '../svg_container.tsx';
import round from 'lodash.round';
export default function getOnClickForCard(
  svgElement,
  idOfCard: number,
  webSocket: WebSocket,
  userId: number,
  dispatch: AppDispatch,
  updatePlayCardInfo
) {
  return function (event: Event) {
    let isWild = false;
    if (webSocket.readyState == WebSocket.OPEN) {
      let arrayToSend: Uint8Array = new Uint8Array(3);
      arrayToSend[0] = userId;
      arrayToSend[1] = idOfCard;
      if (isWildCard(idOfCard)) {
        arrayToSend[2] = Math.floor(Math.random() * 3) + 1;
      }
      if (isWildCard(idOfCard)) {
        isWild = true;
      } else webSocket.send(arrayToSend);
    }
    dispatch(removeActiveCard(idOfCard));
    dispatch(updateActiveMoveLastPlayerCard(idOfCard));
    dispatch(updateActiveMove(idOfCard, USER_1));
    const { x, y } = (event.currentTarget as SVGGraphicsElement)?.getBBox();
    let ctm = (event.currentTarget as SVGGraphicsElement)?.getCTM();
    let point = new DOMPoint(x, y);
    let svgCoordinates = point.matrixTransform(ctm);
    const viewportToViewboxRatio =
      svgElement.height.baseVal.value / SVG_ATTRIBUTES.height;

    const normalize = (value: number) =>
      round(value / viewportToViewboxRatio, 2);
    updatePlayCardInfo({
      x: normalize(svgCoordinates.x),
      y: normalize(svgCoordinates.y),
      isWildCard: isWild,
    });
    // console.log(`x=${x}\ty=${y}`);
  };
}
