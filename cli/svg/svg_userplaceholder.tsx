import React, { useEffect } from 'react';

import UserCardsGroup from './svg_usercardsgroup.tsx';
import UserClickAvatar from './svg_userclickavatar.tsx';
import UserName from './svg_userplacename.tsx';

export default function SvgUserPlaceHolder(props) {
  const {
    xPosition,
    yPosition,
    position,
    userCardGroupSelector,
    userAvatarSelector,
  } = props;
  let ref = React.useRef(null);
  return (
    <>
      <UserClickAvatar
        xPosition={xPosition}
        yPosition={yPosition}
        position={position}
        id={userAvatarSelector}
        ref={ref}
      />
      <UserName
        xPosition={xPosition}
        yPosition={yPosition}
        position={position}
        refAvatarBox={ref}
      />
      <UserCardsGroup
        position={position}
        id={userCardGroupSelector}
        refAvatarBox={ref}
      />
    </>
  );
}

export const enum USER_PLACE {
  BOTTOM_USER = 0,
  LEFT_USER,
  TOP_USER,
  RIGHT_USER,
}

export const USER_INFO = [
  {
    position: USER_PLACE.BOTTOM_USER,
    xPosition: 330,
    yPosition: 485,
    userCardGroupSelector: 'ucgbo',
    userAvatarSelector: 'uabo',
  },
  {
    position: USER_PLACE.LEFT_USER,
    xPosition: 5,
    yPosition: 250,
    userCardGroupSelector: 'ucgle',
    userAvatarSelector: 'uale',
  },
  {
    position: USER_PLACE.TOP_USER,
    xPosition: 400,
    yPosition: 5,
    userCardGroupSelector: 'ucgto',
    userAvatarSelector: 'uato',
  },
  {
    position: USER_PLACE.RIGHT_USER,
    xPosition: 670,
    yPosition: 270,
    userCardGroupSelector: 'ucgri',
    userAvatarSelector: 'uari',
  },
];
