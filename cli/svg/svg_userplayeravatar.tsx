import React, { useState } from 'react';

import UserPlayerAvatarLoader from './active_players/userplayeravatarloader';

export const USERPLACEHOLDER_DIMS = { width: 120, height: 120 };

const UserPlayerAvatar = React.forwardRef((props, ref) => {
  const transformString = `translate(${props.xPosition},${props.yPosition})`;
  const patternId = `avatarPattern${props.position}`;
  const [isAvatarLoaded, setAvatarLoaded] = useState(false);
  return (<>
    <g transform={transformString}>
      <defs>
        <pattern
          id={patternId}
          {...USERPLACEHOLDER_DIMS}
          patternTransform='scale(0.1171875)' // 0.1171875
        >
          <rect
            {...USERPLACEHOLDER_DIMS}
            rx="7" ry="7"
          ></rect>
          {<UserPlayerAvatarLoader
            setAvatarLoaded={setAvatarLoaded}
            position={props.position} />}
        </pattern>
      </defs>

      <rect
        ref={ref}
        fill={isAvatarLoaded ? `url(#${patternId})` : 'ghostwhite'}
        {...USERPLACEHOLDER_DIMS}
        rx="7" ry="7" stroke="lightgray" strokeWidth="2" />
    </g>
  </>);
});

export default UserPlayerAvatar;