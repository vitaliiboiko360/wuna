import React, { useState } from 'react';

import UserPlayerAvatarLoader from './active_players/userplayeravatarloader';

export const USERPLACEHOLDER_DIMS = { width: 120, height: 120 };

const UserPlayerAvatar = React.forwardRef((props, ref) => {
  const { position, xPosition, yPosition, id } = props;
  const transformString = `translate(${xPosition},${yPosition})`;
  const [isAvatarLoaded, setAvatarLoaded] = useState(false);
  const clipForRect = `clipForRect${position}`;

  return (
    <>
      <g id={id} transform={transformString}>
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
          rx="7"
          ry="7"
          strokeWidth="2"
          stroke="lightgray"
        />
        <g clipPath={`url(#${clipForRect})`}>
          {
            <UserPlayerAvatarLoader
              setAvatarLoaded={setAvatarLoaded}
              position={position}
            />
          }
        </g>
      </g>
    </>
  );
});

export default UserPlayerAvatar;
