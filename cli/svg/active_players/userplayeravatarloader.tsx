import React, { useState, useEffect, useRef } from 'react';
import { USER_PLACE } from '../svg_userplaceholder.tsx';

import { useAppSelector } from '../../store/hooks.ts';

import { selectBottomUserAvatarId } from '../../store/bottomUser.ts';
import { selectLeftUserAvatarId } from '../../store/leftUser.ts';
import { selectTopUserAvatarId } from '../../store/topUser.ts';
import { selectRightUserAvatarId } from '../../store/rightUser.ts';

import { getRandomUserBackgrounColor } from './userbgcolors.ts';

export default function UserPlayerAvatarLoader(props) {
  const position = props.position;
  let avatarId = 0;
  switch (position) {
    case USER_PLACE.BOTTOM_USER:
      avatarId = useAppSelector(selectBottomUserAvatarId);
      break;
    case USER_PLACE.LEFT_USER:
      avatarId = useAppSelector(selectLeftUserAvatarId);
      break;
    case USER_PLACE.TOP_USER:
      avatarId = useAppSelector(selectTopUserAvatarId);
      break;
    case USER_PLACE.RIGHT_USER:
      avatarId = useAppSelector(selectRightUserAvatarId);
      break;
    default:
      break;
  }

  const [objectElement, setObjectElement] = useState(undefined);

  const svgUrl = `/data/avatar${avatarId}.svg`;

  const addObjectToDocument = (svgUrl, funcRunOnObjectElement) => {
    let objectElement = document.createElement('object');
    objectElement.setAttribute('type', 'image/svg+xml');
    objectElement.setAttribute('data', svgUrl);
    objectElement.setAttribute('display', 'none');
    objectElement.addEventListener('load', (event) => {
      funcRunOnObjectElement((event.currentTarget as HTMLObjectElement).contentDocument);
    });
    document.body.appendChild(objectElement);
  };

  const refObjectElement = useRef();

  useEffect(() => {
    if (avatarId)
      props.setAvatarLoaded(true);

    if (!objectElement && !avatarId)
      return;

    if (avatarId && !objectElement) {
      // addObjectToDocument(svgUrl, setObjectElement);
    }

    // let elements = Array
    //   .from(document.body.childNodes)
    //   .map((node) => {
    //     if (node.nodeType == Node.ELEMENT_NODE) {
    //       return node as HTMLElement;
    //     }
    //   });

    // Array
    //   .from(elements)
    //   .forEach((element) => {
    //     if (element && element.tagName !== 'OBJECT') {
    //       console.log(`skiping ${element.tagName}`);
    //       return;
    //     }
    //     let objectElement = element as HTMLObjectElement;
    //     objectElement
    //       ?.contentDocument
    //       ?.querySelectorAll('rect')
    //       .forEach((rect) => {
    //         console.log(rect);
    //       });
    //   });

    // console.log(objectElement?.contentDocument ?? 'no object ready');
    objectElement
      ?.querySelectorAll('rect')
      .forEach((rect) => {
        if (rect.hasAttribute('fill') && rect.getAttribute('fill') === '#B190B6') {
          rect.setAttribute('fill', getRandomUserBackgrounColor());
          console.log(rect.getAttribute('fill'));
        }
      });
  }, [avatarId, objectElement]);

  const onLoad = (event) => {
    setObjectElement((event.currentTarget as SVGForeignObjectElement));
  }

  return (
    <>{avatarId > 0
      ?
      <foreignObject
        x={0}
        y={0}
        width={120}
        height={120}
        onLoad={(event) => {
          console.log((event.currentTarget as Node).nodeType);
          onLoad(event);
        }}>
        <div xmlns="http://www.w3.org/1999/xhtml">
          <object
            ref={refObjectElement}
            type="image/svg+xml"
            data={svgUrl}
            onLoad={(event) => {
              console.log((event.currentTarget as Node).nodeType);
            }}
          />
        </div>
      </foreignObject >
      :
      <image />
    }
    </>
  );
}