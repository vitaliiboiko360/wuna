
import React, { forwardRef } from 'react';

import { USER_PLACE } from './svg_userplaceholder.tsx';

import { useAppSelector } from '../store/hooks.ts';
import { selectLeftUserCardsNumber } from '../store/leftUser.ts';
import { selectTopUserCardsNumber } from '../store/topUser.ts';
import { selectRightUserCardsNumber } from '../store/rightUser.ts';

import { getBlankBacksideCard } from './svg_getcard.tsx';

const UserCards = forwardRef((props, refToGroup) => {
  let userCardsNumber;
  if (props.position == USER_PLACE.LEFT_USER) {
    userCardsNumber = useAppSelector(selectLeftUserCardsNumber);
  }
  if (props.position == USER_PLACE.TOP_USER) {
    userCardsNumber = useAppSelector(selectTopUserCardsNumber);
  }
  if (props.position == USER_PLACE.RIGHT_USER) {
    userCardsNumber = useAppSelector(selectRightUserCardsNumber);
  }
  // console.log(`props.postion=${props.position} userCardsNumber=`, userCardsNumber);

  let cardElements = Array.apply(null, { length: userCardsNumber })
    .map(Number.call, Number)
    .map((index) => {
      if (isNaN(index))
        return;

      let transformString = '';
      if (props.position == USER_PLACE.LEFT_USER
        || props.position == USER_PLACE.RIGHT_USER
      ) {
        transformString = `translate(${index * 10})`;
      } else if (props.position == USER_PLACE.TOP_USER
        || props.position == USER_PLACE.BOTTOM_USER
      ) {
        transformString = `translate(${index * 10})`;
      }

      return (<g key={index + ((props.position >= 0 ? props.position + 1 : 1) * 25)} transform={transformString}>
        {getCard(blackBackCardId)}
      </g>);
    })
  return (<>
    {cardElements}
  </>);
});

export default UserCards;