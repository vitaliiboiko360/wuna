import React from 'react';

export const USERPLACEHOLDER_DIMS = { width: 80, height: 80 };

const UserPlayerAvatar = React.forwardRef((props, ref) => {
  const transformString = `translate(${props.xPosition},${props.yPosition})`;
  return (<>
    <g transform={transformString}>
      <rect
        ref={ref}
        width={USERPLACEHOLDER_DIMS.width}
        height={USERPLACEHOLDER_DIMS.height}
        rx="7" ry="7" fill="ghostwhite" stroke="lightgray" strokeWidth="2" />
    </g>
  </>);
});

export default UserPlayerAvatar;