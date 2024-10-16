import React from 'react';

import * as css from './rootcontainer.scss';

export function RootContainer(props) {
  return <div className={css.rootContainer}>{props.children}</div>;
}
