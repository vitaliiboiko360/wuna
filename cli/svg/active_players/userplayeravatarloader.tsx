import React, { useState, useEffect, useRef } from 'react';
import { USER_PLACE } from '../svg_userplaceholder.tsx';

import { useAppSelector } from '../../store/hooks.ts';

import { selectBottomUserAvatarId } from '../../store/bottomUser.ts';
import { selectLeftUserAvatarId } from '../../store/leftUser.ts';
import { selectTopUserAvatarId } from '../../store/topUser.ts';
import { selectRightUserAvatarId } from '../../store/rightUser.ts';

import { getRandomUserBackgrounColor } from './userbgcolors.ts';

export default function UserPlayerAvatarLoader(props) {
  const position = props.position;
  let avatarId = 0;
  switch (position) {
    case USER_PLACE.BOTTOM_USER:
      avatarId = useAppSelector(selectBottomUserAvatarId);
      break;
    case USER_PLACE.LEFT_USER:
      avatarId = useAppSelector(selectLeftUserAvatarId);
      break;
    case USER_PLACE.TOP_USER:
      avatarId = useAppSelector(selectTopUserAvatarId);
      break;
    case USER_PLACE.RIGHT_USER:
      avatarId = useAppSelector(selectRightUserAvatarId);
      break;
    default:
      break;
  }
  const svgUrl = `/data/avatar${avatarId}.svg`;

  const onLoad = (event) => {
    let objectElement = (event.currentTarget as HTMLObjectElement);
    objectElement
      ?.contentDocument
      ?.querySelectorAll('rect')
      .forEach((rect) => {
        if (rect.hasAttribute('fill') && rect.getAttribute('fill') === '#B190B6') {
          rect.setAttribute('fill', getRandomUserBackgrounColor());
        }
      });
    const svgElement = objectElement
      ?.contentDocument
      ?.querySelector('svg');
    svgElement?.setAttribute('width', '120');
    svgElement?.setAttribute('height', '120');
    svgElement?.setAttribute('clip-path', 'url(#clipForRect)');
  };

  return (
    <>{avatarId > 0
      ?
      <foreignObject
        width={120}
        height={120}>
        <object
          xmlns="http://www.w3.org/1999/xhtml"
          type="image/svg+xml"
          data={svgUrl}
          onLoad={onLoad}
        />
      </foreignObject >
      :
      <image />
    }
    </>
  );
}