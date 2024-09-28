import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { USER_PLACE } from '../svg_userplaceholder';

import { useAppSelector } from '../../store/hooks.ts';

import { selectBottomUserAvatarId } from '../../store/bottomUser.ts';
import { selectLeftUserAvatarId } from '../../store/leftUser.ts';
import { selectTopUserAvatarId } from '../../store/topUser.ts';
import { selectRightUserAvatarId } from '../../store/rightUser.ts';


const addObjectToDocument = (svgUrl, funcRunOnObjectElement) => {
  let objectElement = document.createElement('object');
  objectElement.setAttribute('type', 'image/svg+xml');
  objectElement.setAttribute('data', svgUrl);
  document.body.appendChild(objectElement);
  funcRunOnObjectElement(objectElement);
};

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

  const [objectElement, setObjectElement] = useState(undefined);

  const refObject = useRef();

  useEffect(() => {
    if (avatarId)
      props.setAvatarLoaded(true);

    refObject
      .current?.querySelectorAll('rect')
      .forEach((element) => {
        console.log(element);
        if (element.hasAttribute('fill')) {
          console.log(element.fill);
          console.log('fill')
        }
      });
  }, [avatarId]);

  const svgUrl = `/data/avatar${avatarId}.svg`;

  if (avatarId && !objectElement) {
    addObjectToDocument(svgUrl, setObjectElement);
  }

  return (
    <>{avatarId > 0
      ?
      <image xlinkHref={false
        ?
        svgUrl
        :
        svgUrl} />
      :
      <image />
    }
    </>
  );
}