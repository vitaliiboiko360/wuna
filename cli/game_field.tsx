import React from 'react';

import SvgContainer from './svg/svg_container';
import SvgEllipseTable from './svg/svg_ellipse_table';
import SvgUserPlaceHolder, { USER_INFO, USER_PLACE } from './svg/svg_userplaceholder';
import SvgCardStack from './svg/svg_cardsstack';
import SvgActivePlayerCardHolder from './svg/svg_activeplayercardholder';
import PlayCardInfoProvider from './svg/svg_playcardprovider';

export default function GameField(props) {
  return (
    <SvgContainer>
      <SvgEllipseTable />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.LEFT_USER]} />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.TOP_USER]} />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.RIGHT_USER]} />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.BOTTOM_USER]} />
      <PlayCardInfoProvider>
        <SvgCardStack />
        <SvgActivePlayerCardHolder />
      </PlayCardInfoProvider>
    </SvgContainer>
  );
}