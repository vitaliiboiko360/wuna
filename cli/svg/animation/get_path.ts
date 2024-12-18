import { USER_1 } from '../../websocketconsumer';
import { USER_INFO } from '../svg_userplaceholder';

import { SVG_ATTRIBUTES } from '../svg_container';

import round from 'lodash.round';

export default function getPath(
  svgElement,
  userPosition: number,
  x: number,
  y: number,
  xStart: number,
  yStart: number
): string {
  let path = '';

  if (userPosition == 0) {
    console.log('getPath called with userPosition=', userPosition);
    return '';
  }

  if (userPosition == USER_1) {
    const userCardX = xStart ?? 400;
    const userCardY = yStart ?? 430;
    const getMidPoint = (start, end) => end + (start - end) / 2;
    const midPointX = getMidPoint(userCardX, x);
    const midPointY = getMidPoint(userCardY, y);
    return `M${userCardX},${userCardY} C${userCardX},${userCardY} ${midPointX},${midPointY} ${x},${y}`;
  }

  const userIndex = userPosition - 1;
  const userId = USER_INFO[userIndex].userCardGroupSelector;
  let userCardGroup = svgElement.querySelector('#' + userId);
  if (userCardGroup == null) {
    console.log('\t:::::\tcannot get usercard userId==', userId);
    return `M400,300 L${x},${y}`;
  }

  let bBox = userCardGroup.getBBox();
  const height = Math.floor(bBox.height);
  const width = Math.floor(bBox.width);
  // console.log('bBox of userCardGroup pos', userPosition, ' ', (bBox));
  let point = new DOMPoint(bBox.x + bBox.width / 2, bBox.y + bBox.height / 2);

  const viewportToViewboxRatio =
    svgElement.height.baseVal.value / SVG_ATTRIBUTES.height;

  const normalize = (value: number) => round(value / viewportToViewboxRatio, 2);

  let matrix = userCardGroup.getCTM();
  let localCoordinates = point.matrixTransform(matrix);
  let startX = normalize(localCoordinates.x);
  let startY = normalize(localCoordinates.y);

  switch (userPosition) {
    case 2:
      path = `M${startX},${startY - height} C${startX},${
        startY - height
      } 300,260 ${x},${y}`;
      break;
    case 3:
      path = `M${startX + width},${startY} C${
        startX + width
      },${startY} 380,230 ${x},${y}`;
      break;
    case 4:
      path = `M${startX},${startY + height} C${startX},${
        startY + height
      } 530,260 ${x},${y}`;
      break;
    default:
      return `M400,300 L${x},${y}`;
  }

  return path;
}
