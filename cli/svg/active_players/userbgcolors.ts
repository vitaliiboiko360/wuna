
export const USER_BACKGROUND_COLORS = [
  '#9095b6',
  '#b190b6',
  '#b6b190',
  '#95b690',
];

let uniqueIds = new Set();
export function getRandomUserBackgrounColor() {
  const getRandColor = () => { return USER_BACKGROUND_COLORS[Math.floor(Math.random() * USER_BACKGROUND_COLORS.length)] };
  let retValue = getRandColor();
  let deadLockLimit = 10;
  while (uniqueIds.has(retValue)) {
    retValue = getRandColor();
    if (uniqueIds.size > USER_BACKGROUND_COLORS.length - 1 || deadLockLimit-- < 0) {
      uniqueIds.clear();
      break;
    }
  }
  uniqueIds.add(retValue)
  return retValue;
}