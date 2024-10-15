import React from 'react';

import css from './rootcontainer.scss';

export function RootContainer(props) {
  console.log(`css= ${css}`);
  return <div>{props.children}</div>;
}
