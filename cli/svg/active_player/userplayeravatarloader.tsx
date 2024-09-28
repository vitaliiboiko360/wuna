import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { USER_PLACE } from '../svg_userplaceholder';

import { useAppSelector } from '../../store/hooks.ts';

import { selectBottomUserAvatarId } from '../../store/bottomUser.ts';
import { selectLeftUserAvatarId } from '../../store/leftUser.ts'
import { selectTopUserAvatarId } from '../../store/topUser.ts'
import { selectRightUserAvatarId } from '../../store/rightUser.ts'

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

  const refObject = useRef();

  useEffect(() => {
    if (avatarId > 0)
      props.setAvatarLoaded(true);

    refObject
      .current?.querySelector('rect')
      .forEach((element) => {
        if (element.hasAttribute('fill')) {
          console.log(element.fill);
          console.log('fill')
        }
      });
  }, [avatarId]);

  const key = `avatar${avatarId}.svg`;
  const { data, isSuccess } = useQuery({
    queryKey: [key],
    queryFn: () => {
      if (!avatarId)
        throw Error('avatarId is not ready');
      return fetch(`/data/${key}`)
        .then((response) => response.url);
    },
  });

  if (isSuccess) {
    const svgObject = document.createElement('object');
    svgObject.type = "image/svg+xml";
    svgObject.data = data ?? '';

    svgObject.width = '120';
    svgObject.height = '120';
    for (const child of svgObject.childNodes) {
      console.log(child);
    }
    // console.log(svgObject.data)
  }


  return (
    <><object ref={refObject} data={'/data' + key} type="image/svg+xml"></object>
      {avatarId > 0
        ?
        <image xlinkHref={isSuccess
          ?
          data
          :
          '/data/' + key} />
        :
        <image />
      }
    </>
  );
}