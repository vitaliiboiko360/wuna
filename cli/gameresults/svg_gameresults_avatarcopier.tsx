import React, { useRef, useEffect } from 'react';

import { USER_INFO } from '../svg/svg_userplaceholder';
import { USER_1, USER_4 } from '../websocketconsumer';

export default function SvgAvatartCopier(props) {
  const { playerId } = props;
  const refOuterGroup = useRef();
  useEffect(() => {
    if (playerId < USER_1 || playerId > USER_4 || !refOuterGroup.current)
      return;
    const avatarElement = document.getElementById(
      USER_INFO[playerId - 1].userAvatarSelector
    );
    let copiedNode = avatarElement?.cloneNode(true) as Element;
    copiedNode?.setAttribute('transform', '');
    const originalId = copiedNode?.getAttribute('id');
    copiedNode?.setAttribute('id', `game-results-${originalId}`);
    copiedNode?.setAttribute('transform', '');
    refOuterGroup.current.append(copiedNode);
  });
  return (
    <>
      <g ref={refOuterGroup}></g>
    </>
  );
}
