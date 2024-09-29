import React, { useState } from 'react';

import UserPlayerAvatarLoader from './active_players/userplayeravatarloader';

export const USERPLACEHOLDER_DIMS = { width: 120, height: 120 };

// clipPath={`url(#${clipForRect})`}

const UserPlayerAvatar = React.forwardRef((props, ref) => {
  const transformString = `translate(${props.xPosition},${props.yPosition})`;
  const patternId = `avatarPattern${props.position}`;
  const [isAvatarLoaded, setAvatarLoaded] = useState(false);

  const rectForClip = `rectForClip${props.position}`;
  const clipForRect = `clipForRect${props.position}`;

  return (<>
    <g transform={transformString}>
      {/* <defs>
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
      </defs> */}
      <defs>
        <clipPath id={clipForRect}>
          <rect {...USERPLACEHOLDER_DIMS} rx="7" ry="7" />
        </clipPath>
      </defs>

      <use href={`#${clipForRect}`} strokeWidth="2" stroke="lightgray" />
      <rect
        ref={ref}
        fill={'ghostwhite'}
        {...USERPLACEHOLDER_DIMS}
        rx="7" ry="7" stroke="lightgray" strokeWidth="2" />
      <g clipPath={`url(#${clipForRect})`} >
        {<UserPlayerAvatarLoader
          setAvatarLoaded={setAvatarLoaded}
          position={props.position} />}
      </g>
    </g>
  </>);
});

export default UserPlayerAvatar;