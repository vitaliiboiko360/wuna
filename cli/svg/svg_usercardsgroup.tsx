import React, { useRef, useEffect, useState } from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import UserCards from './svg_usercards.tsx';

function getTransformString(position: number) {
  let retString = '';
  if (position == USER_PLACE.LEFT_USER) {
    retString = `matrix(0,-1,1,0,105,370)`;
  }
  if (position == USER_PLACE.TOP_USER) {
    retString = `matrix(1,0,0,1,390,100)`;
  }
  if (position == USER_PLACE.RIGHT_USER) {
    retString = `matrix(0,1,-1,0,680,250)`;
  }
  if (position == USER_PLACE.BOTTOM_USER) {
    // for guest edit and enable this string
    //retString = `matrix(${-1},0,0,${1},${x - 20},${y + (width / 2)})`;
  }
  return retString;
}

const UserCardsGroup = React.forwardRef((props, refAvatarBox) => {
  if (props.position == USER_PLACE.BOTTOM_USER) {
    return <></>;
  }

  let refToGroup = useRef(null);

  return (
    <>
      <g
        id={props.id}
        ref={refToGroup}
        transform={getTransformString(props.position)}
      >
        <UserCards refToGroup={refToGroup} position={props.position} />
      </g>
    </>
  );
});

export default UserCardsGroup;
