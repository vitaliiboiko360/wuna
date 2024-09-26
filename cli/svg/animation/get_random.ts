
export function getNormalRandomBoxMullerTransform(min, max) {
  let u = 0;
  let v = 0;

  // Changing our range from [0,1) to (0,1)
  while (u === 0) {
    u = Math.random();
  }
  while (v === 0) {
    v = Math.random();
  }


  let retNumber = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  // Translate to 0 -> 1
  retNumber = retNumber / 10.0 + 0.5;

  if (retNumber > 1 || retNumber < 0) {
    // resample between 0 and 1 if out of range
    retNumber = getNormalRandomBoxMullerTransform(min, max);
  }
  else {
    // Stretch to fill range
    retNumber *= max - min;

    // offset to min
    retNumber += min;
  }
  return retNumber;
}

function gaussianRand() {
  let rand = 0;

  for (let i = 0; i < 3; i++) {
    rand += Math.random();
  }

  return rand / 3;
}

export function getGaussianRandom(min, max) {
  return Math.floor(min + gaussianRand() * (max - min + 1));
}