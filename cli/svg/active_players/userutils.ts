
export const USER_BACKGROUND_COLORS = [
  '#9095b6',
  '#b190b6',
  '#b6b190',
  '#95b690',
  '#9e90b6',
  '#b69095',
  '#90b6b1',
  '#b69e90',
  '#b690a8',
  '#b69e90',
  '#a8b690',
  '#90b69e',
];

let uniqueColorIds = new Set();
export function getRandomUserBackgrounColor() {
  const getRandColor = () => { return USER_BACKGROUND_COLORS[Math.floor(Math.random() * USER_BACKGROUND_COLORS.length)] };
  let retValue = getRandColor();
  let deadLockLimit = 10;
  while (uniqueColorIds.has(retValue)) {
    retValue = getRandColor();
    if (uniqueColorIds.size > USER_BACKGROUND_COLORS.length - 1 || deadLockLimit-- < 0) {
      uniqueColorIds.clear();
      break;
    }
  }
  uniqueColorIds.add(retValue);
  return retValue;
}

const AVATAR_IDS = [1, 2, 3, 4, 5, 6, 9, 10, 15];
let uniqueAvatarIds = new Set();
export function getRandAvatarId() {
  const getRandId = () => { return AVATAR_IDS[Math.floor(Math.random() * AVATAR_IDS.length)] };
  let retValue = getRandId();
  let deadLockLimit = 10;
  while (uniqueAvatarIds.has(retValue)) {
    retValue = getRandId();
    if (uniqueAvatarIds.size > AVATAR_IDS.length - 1 || deadLockLimit-- < 0) {
      uniqueAvatarIds.clear();
      break;
    }
  }
  uniqueAvatarIds.add(retValue)
  return retValue;
}