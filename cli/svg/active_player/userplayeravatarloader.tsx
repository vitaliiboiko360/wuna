import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { USER_PLACE } from '../svg_userplaceholder';

import { useAppSelector } from '../../store/hooks';

import { selectBottomUserAvatarId } from '../../store/bottomUser';
import { selectLeftUserAvatarId } from '../../store/leftUser'
import { selectTopUserAvatarId } from '../../store/topUser'
import { selectRightUserAvatarId } from '../../store/rightUser'

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

  const { data, isSuccess } = useQuery({
    queryKey: [`avatar${avatarId}`],
    queryFn: () => {
      if (!avatarId)
        return Promise.resolve('');
      return fetch(`/avatar/${avatarId}`)
        .then((response) => response.text());
    },
  });


  return (
    <>{isSuccess ? data : ''}</>
  );
}