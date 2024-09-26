let angle1 = 0;
let gradAngle = 0;
let interval1 = 0;

let control2 = document.getElementById('control2');

let control1 = document.getElementById('card1');
let text1 = document.getElementById('textDisplay1');

let control0 = document.getElementById('controlTransform0');
let text0 = document.getElementById('textDisplay0');

let text1_1 = document.getElementById('textDisplay_0_1');
let text1_2 = document.getElementById('textDisplay_0_2');
let text1_3 = document.getElementById('textDisplay_0_3');
let text2_1 = document.getElementById('textDisplay_1_1');
let text2_2 = document.getElementById('textDisplay_1_2');
let text2_3 = document.getElementById('textDisplay_1_3');
let text3_1 = document.getElementById('textDisplay_2_1');
let text3_2 = document.getElementById('textDisplay_2_2');
let text3_3 = document.getElementById('textDisplay_2_3');
gradAngle = 0;
interval1 = setInterval(() => {

  angle1 = (gradAngle / 180);
  //text1.textContent = `${angle1 * 180 < 0.0001 ? 0 : angle1 * 180}`;
  text1.textContent = `${gradAngle}`;
  let a = Math.cos(Math.PI * angle1);
  let b = Math.sin(Math.PI * angle1);
  let c = -Math.sin(Math.PI * angle1);
  let d = Math.cos(Math.PI * angle1);
  // cx·(1-cos(α))+cy·sin(α), cy·(1-cos(α))-cx·sin(α))
  let { x, y, width, height } = control1.getBBox();
  let deltaX = (x + (width / 2));
  let deltaY = (y + (height / 2));


  // y = − 0.04x2 + 0.5x + 0.1
  let index = gradAngle / 15;
  let deltaXForPoint = index * 6; // increase by 6px at a time
  let xPoint = deltaX + deltaXForPoint;
  let yPoint = deltaY + ((-0.004 * Math.pow(deltaXForPoint, 2)) + (0.7 * deltaXForPoint) + 0.1);
  const transfromString2 = `matrix(1,0,0,1,${xPoint},${yPoint})`;
  control2.setAttribute('transform', transfromString2);

  let e = deltaXForPoint + (deltaX * (1 - Math.cos(Math.PI * angle1))) + (deltaY * Math.sin(Math.PI * angle1));
  let f = ((-0.004 * Math.pow(deltaXForPoint, 2)) + (0.7 * deltaXForPoint) + 0.1) + (deltaY * (1 - Math.cos(Math.PI * angle1))) - (deltaX * Math.sin(Math.PI * angle1));
  const transformString = `matrix(${a},${b},${c},${d},${e},${f})`;
  control1.setAttribute('transform', transformString);

  gradAngle = (gradAngle + 15) % 360;
}, 150);

clearInterval(interval1);
gradAngle = 0;
interval1 = setInterval(() => {

  angle1 = (gradAngle / 180);
  //text1.textContent = `${angle1 * 180 < 0.0001 ? 0 : angle1 * 180}`;
  text1.textContent = `${gradAngle}`;
  let a = Math.cos(Math.PI * angle1);
  let b = Math.sin(Math.PI * angle1);
  let c = -Math.sin(Math.PI * angle1);
  let d = Math.cos(Math.PI * angle1);
  // cx·(1-cos(α))+cy·sin(α), cy·(1-cos(α))-cx·sin(α))
  let { x, y, width, height } = control1.getBBox();
  let deltaX = (x + (width / 2));
  let deltaY = (y + (height / 2));


  // y = − 0.04x2 + 0.5x + 0.1
  let index = gradAngle / 15;
  let deltaXForPoint = index * 6; // increase by 6px at a time
  let xPoint = deltaX + deltaXForPoint;
  let yPoint = deltaY + ((-0.004 * Math.pow(deltaXForPoint, 2)) + (0.7 * deltaXForPoint) + 0.1);
  const transfromString2 = `matrix(1,0,0,1,${xPoint},${yPoint})`;
  control2.setAttribute('transform', transfromString2);

  let e = 5 * deltaXForPoint + (deltaX * (1 - Math.cos(Math.PI * angle1))) + (deltaY * Math.sin(Math.PI * angle1));
  let f = 5 * ((-0.004 * Math.pow(deltaXForPoint, 2)) + (0.7 * deltaXForPoint) + 0.1) + (deltaY * (1 - Math.cos(Math.PI * angle1))) - (deltaX * Math.sin(Math.PI * angle1));
  const transformString = `matrix(${a},${b},${c},${d},${e},${f})`;
  control1.setAttribute('transform', transformString);

  gradAngle = (gradAngle + 15) % 360;
}, 150);
