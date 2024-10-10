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

interval1 = setInterval(() => {
  angle1 = (angle1 + 0.1) % 2;
  text1.textContent = `${angle1}`;
  const transformString = `matrix(${Math.cos(Math.PI * angle1)},${Math.sin(
    Math.PI * angle1
  )},${-Math.sin(Math.PI * angle1)},${Math.cos(Math.PI * angle1)},0,0)`;
  control1.setAttribute('transform', transformString);
}, 1200);

setInterval((_) => clearInterval(interval1), 100000);

function getOriginalPt(x, y, element) {
  var matrix = element.matrix.invert(),
    x1 = x * matrix.a + y * matrix.b + matrix.e,
    y1 = x * matrix.c + y * matrix.d + matrix.f;
  return { x: x1, y: y1 };
}

clearInterval(interval1);
index = 0;
angles = [5, 4, 3, 2, 1, 0, 360, 359, 358, 357];
angle1 = 0;
interval1 = setInterval(() => {
  let gradAngle = angles[index++ % angles.length];
  angle1 = gradAngle / 180;
  // text1.textContent = `${angle1 * 180 < 0.0001 ? 0 : angle1 * 180}`;
  text1.textContent = `${gradAngle}`;
  let a = Math.cos(Math.PI * angle1);
  let b = Math.sin(Math.PI * angle1);
  let c = -Math.sin(Math.PI * angle1);
  let d = Math.cos(Math.PI * angle1);
  let e = Math.pow(Math.sin(Math.PI * angle1) + 1, 2);
  let f = Math.pow(Math.cos(Math.PI * angle1) + 1, 2);
  const transformString = `matrix(${a},${b},${c},${d},${e},${f})`;
  control1.setAttribute('transform', transformString);

  let ctm = control1.getScreenCTM();
  let inverse = ctm.inverse();

  const stringToOutput = `a: ${inverse.a}  b:${inverse.b}\nc:${inverse.c}  d:${inverse.d}\ne:${inverse.e}  f:${inverse.f}`;
  text1_1.textContent = `a: ${a}  b: ${b}`;
  text1_2.textContent = `c: ${c}  d: ${d}`;
  text1_3.textContent = `e: ${e}  f: ${f}`;

  text2_1.textContent = `a: ${ctm.a}  b: ${ctm.b}`;
  text2_2.textContent = `c: ${ctm.c}  d: ${ctm.d}`;
  text2_3.textContent = `e: ${ctm.e}  f: ${ctm.f}`;
  text3_1.textContent = `a: ${inverse.a}  b: ${inverse.b}`;
  text3_2.textContent = `c: ${inverse.c}  d: ${inverse.d}`;
  text3_3.textContent = `e: ${inverse.e}  f: ${inverse.f}`;
}, 5500);

index = 5;
angles = [5, 4, 3, 2, 1, 0, 360, 359, 358, 357];
angle1 = 0;

clearInterval(interval1);
interval1 = setInterval(() => {
  angle1 = gradAngle / 180;
  //text1.textContent = `${angle1 * 180 < 0.0001 ? 0 : angle1 * 180}`;
  text1.textContent = `${gradAngle}`;
  let a = Math.cos(Math.PI * angle1);
  let b = Math.sin(Math.PI * angle1);
  let c = -Math.sin(Math.PI * angle1);
  let d = Math.cos(Math.PI * angle1);
  // cx·(1-cos(α))+cy·sin(α), cy·(1-cos(α))-cx·sin(α))
  let e =
    20 * (1 - Math.cos(Math.PI * angle1)) + 20 * Math.sin(Math.PI * angle1);
  let f =
    20 * (1 - Math.cos(Math.PI * angle1)) - 20 * Math.sin(Math.PI * angle1);
  const transformString = `matrix(${a},${b},${c},${d},${e},${f})`;
  control1.setAttribute('transform', transformString);

  let ctm = control1.getScreenCTM();

  text1_1.textContent = `a: ${a}  b: ${b}`;
  text1_2.textContent = `c: ${c}  d: ${d}`;
  text1_3.textContent = `e: ${e}  f: ${f}`;

  text2_1.textContent = `a: ${ctm.a}  b: ${ctm.b}`;
  text2_2.textContent = `c: ${ctm.c}  d: ${ctm.d}`;
  text2_3.textContent = `e: ${ctm.e}  f: ${ctm.f}`;

  let inverse = ctm.inverse();

  text3_1.textContent = `a: ${inverse.a}  b: ${inverse.b}`;
  text3_2.textContent = `c: ${inverse.c}  d: ${inverse.d}`;
  text3_3.textContent = `e: ${inverse.e}  f: ${inverse.f}`;

  gradAngle = (gradAngle + 15) % 360;
}, 1500);

clearInterval(interval1);
interval1 = setInterval(() => {
  angle1 = gradAngle / 180;
  //text1.textContent = `${angle1 * 180 < 0.0001 ? 0 : angle1 * 180}`;
  text1.textContent = `${gradAngle}`;
  let a = Math.cos(Math.PI * angle1);
  let b = Math.sin(Math.PI * angle1);
  let c = -Math.sin(Math.PI * angle1);
  let d = Math.cos(Math.PI * angle1);
  // cx·(1-cos(α))+cy·sin(α), cy·(1-cos(α))-cx·sin(α))
  let { x, y, width, height } = control1.getBBox();
  let deltaX = x + width / 2;
  let deltaY = y + height / 2;
  let e =
    deltaX * (1 - Math.cos(Math.PI * angle1)) +
    deltaY * Math.sin(Math.PI * angle1);
  let f =
    deltaY * (1 - Math.cos(Math.PI * angle1)) -
    deltaX * Math.sin(Math.PI * angle1);
  const transformString = `matrix(${a},${b},${c},${d},${e},${f})`;
  control1.setAttribute('transform', transformString);

  // y = − 0.04x2 + 0.5x + 0.1
  let index = gradAngle / 15;
  let deltaXForPoint = index * 6; // increase by 6px at a time
  let xPoint = deltaX + deltaXForPoint;
  let yPoint =
    deltaY + (-0.04 * Math.pow(deltaXForPoint, 2) + 0.7 * deltaXForPoint + 0.1);
  const transfromString2 = `matrix(1,0,0,1,${xPoint},${yPoint})`;
  control2.setAttribute('transform', transfromString2);

  gradAngle = (gradAngle + 15) % 360;
}, 1500);
