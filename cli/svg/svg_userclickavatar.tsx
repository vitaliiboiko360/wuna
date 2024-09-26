import React, { useRef, useContext, useEffect, useCallback } from 'react';

import { WebSocketContext } from '../websocketprovider.tsx';

import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { selectPlayerSeatRequested, updatePlayerSeatRequested } from '../store/playerSeatRequested.ts';

import UserPlayerAvatar from './svg_userplayeravatar.tsx';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

const UserClickAvatar = React.forwardRef((props, ref) => {
  const refRect = useRef(null);

  const webSocket = useContext(WebSocketContext);
  const playerSeatNumberRequested = useAppSelector(selectPlayerSeatRequested);
  const dispatch = useAppDispatch();

  const seatNumber = props.position + 1;

  let onClick;
  onClick = useCallback((event) => {
    if (playerSeatNumberRequested != 0) {
      return;
    }
    dispatch(updatePlayerSeatRequested(seatNumber));
    let arrayToSend: Uint8Array = new Uint8Array(1);
    arrayToSend[0] = seatNumber;
    webSocket.send(arrayToSend);

  }, [playerSeatNumberRequested]);

  useEffect(() => {

    const nodeForRef = refRect.current;

    if (!refRect.current)
      return;

    if (playerSeatNumberRequested == 0)
      nodeForRef.addEventListener('click', onClick);
    else
      nodeForRef.removeEventListener('click', onClick);

    return () => nodeForRef.removeEventListener('click', onClick);
  }, [onClick]);

  return (<>
    <UserPlayerAvatar
      ref={(node) => {
        refRect.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      img={''}
      {...props}
    /></>);
});

export default UserClickAvatar;