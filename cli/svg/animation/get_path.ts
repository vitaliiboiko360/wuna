
import { USER_INFO } from '../svg_userplaceholder'

export default function getPath(userPosition: number, svgElement, x: number, y: number, xStart: number, yStart: number): string {
  let path = '';

  if (userPosition == 0) {
    console.log('getPath called with userPosition=', userPosition);
    return '';
  }

  if (userPosition == 1) {
    const userCardX = xStart ?? 400;
    const userCardY = yStart ?? 430;
    const getMidPoint = (start, end) => end + ((start - end) / 2);
    const midPointX = getMidPoint(userCardX, x);
    const midPointY = getMidPoint(userCardY, y);
    return `M${userCardX},${userCardY} C${userCardX},${userCardY} ${midPointX},${midPointY} ${x},${y}`;
  }

  const userIndex = userPosition - 1;
  const userId = USER_INFO[userIndex].id;
  let userCardGroup = svgElement.querySelector('#' + userId);
  if (userCardGroup == null) {
    console.log('cannot get usercard userId==', userId);
    return `M400,300 L${x},${y}`;
  }

  let bBox = userCardGroup.getBBox();
  // console.log('bBox of userCardGroup pos', userPosition, ' ', (bBox));
  let point = new DOMPoint(bBox.x, bBox.y);

  let matrix = userCardGroup.getScreenCTM();
  let localCoordinates = point.matrixTransform(matrix);
  let startX = localCoordinates.x;
  let startY = localCoordinates.y;

  switch (userPosition) {
    case 2:
      path = `M${startX},${startY - bBox.height} C${startX},${startY - bBox.height} 300,260 ${x},${y}`;
      break;
    case 3:
      path = `M${startX + bBox.width},${startY} C${startX + bBox.width},${startY} 380,230 ${x},${y}`;
      break;
    case 4:
      path = `M${startX},${startY + bBox.height} C${startX},${startY + bBox.height} 530,260 ${x},${y}`;
      break;
    default:
      return `M400,300 L${x},${y}`;
  }

  return path;
}