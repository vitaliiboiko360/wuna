import React from 'react';
import { USER_PLACE } from './svg_userplaceholder';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

function UserPlayerAvatarLoader(props) {
  const position = props.position;
  switch (position) {
    case USER_PLACE.BOTTOM_USER:
      break;
    default:
      break;
  }
  return (
    <></>
  );
}

const UserPlayerAvatar = React.forwardRef((props, ref) => {
  const transformString = `translate(${props.xPosition},${props.yPosition})`;
  return (<>
    <g transform={transformString}>
      {<UserPlayerAvatarLoader position={props.position} />}
      <rect
        ref={ref}
        width={USERPLACEHOLDER_DIMS.width}
        height={USERPLACEHOLDER_DIMS.height}
        rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" />
    </g>
  </>);
});

export default UserPlayerAvatar;