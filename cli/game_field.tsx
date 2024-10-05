import React from 'react';

import SvgContainer from './svg/svg_container';
import SvgEllipseTable from './svg/svg_ellipse_table';
import SvgUserPlaceHolder, {
  USER_INFO,
  USER_PLACE,
} from './svg/svg_userplaceholder';
import SvgCardPile from './svg/svg_cardpile';
import SvgActivePlayerCardHolder from './svg/svg_activeplayercardholder';
import PlayCardInfoProvider from './svg/svg_playcardprovider';
import { SvgCardStack } from './svg/svg_cardstack';

export default function GameField(props) {
  return (
    <SvgContainer>
      <SvgEllipseTable />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.LEFT_USER]} />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.TOP_USER]} />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.RIGHT_USER]} />
      <SvgUserPlaceHolder {...USER_INFO[USER_PLACE.BOTTOM_USER]} />
      <SvgCardStack />
      <PlayCardInfoProvider>
        <SvgCardPile />
        <SvgActivePlayerCardHolder />
      </PlayCardInfoProvider>
    </SvgContainer>
  );
}
