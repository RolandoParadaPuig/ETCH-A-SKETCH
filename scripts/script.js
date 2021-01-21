let container = document.querySelector("#container");
let buttonAdd = document.querySelector("#btnAdd");
let buttonNew = document.querySelector("#btnNew");
let form = document.querySelector("#inputDimention");
let resetColor = document.querySelector("#resetColor");
let containerH;
let containerW;
let child;
let childStyle;
let userW;
let userH;

/* atempt to use a color palet from codepen.io */
const getSpectrumWrapper = () => document.querySelector(".spectrum-wrapper");

const spectrumRanges = [
  { from: [255, 0, 0], to: [255, 255, 0] },
  { from: [255, 255, 0], to: [0, 255, 0] },
  { from: [0, 255, 0], to: [0, 255, 255] },
  { from: [0, 255, 255], to: [0, 0, 255] },
  { from: [0, 0, 255], to: [255, 0, 255] },
  { from: [255, 0, 255], to: [255, 0, 0] },
];

const findColorValue = (from, to, leftRatio) => {
  return Math.round(from + (to - from) * leftRatio);
};

const findRgbFromMousePosition = (event) => {
  const wrapper = getSpectrumWrapper();
  const { clientX } = event;
  const { left, width } = wrapper.getBoundingClientRect();
  const leftDistance = Math.min(Math.max(clientX - left, 0), width - 1);
  const totalRanges = spectrumRanges.length;
  const rangeWidth = width / totalRanges;
  const includedRange = Math.floor(leftDistance / rangeWidth);
  const leftRatio = ((leftDistance % rangeWidth) / rangeWidth).toFixed(2);
  const { from, to } = spectrumRanges[includedRange];
  return {
    r: findColorValue(from[0], to[0], leftRatio),
    g: findColorValue(from[1], to[1], leftRatio),
    b: findColorValue(from[2], to[2], leftRatio),
  };
};

const rgbToHex = (r, g, b) => {
  const toHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = `0${hex}`;
    }
    return hex;
  };
  const red = toHex(r);
  const green = toHex(g);
  const blue = toHex(b);
  return `#${red}${green}${blue}`;
};
let color;
getSpectrumWrapper().addEventListener("click", (e) => {
  const { r, g, b } = findRgbFromMousePosition(e);
  const hexValue = rgbToHex(r, g, b);
  document.querySelector(".red").innerText = r;
  document.querySelector(".green").innerText = g;
  document.querySelector(".blue").innerText = b;
  document.querySelector(".hex").innerText = hexValue;
  color = hexValue;
  return hexValue;
});
/* codepen.io palet end */

buttonAdd.onclick = function () {
  container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);
  userW = document.querySelector("#width").value;
  userH = document.querySelector("#height").value;
  container.style.height = userH + "px";
  container.style.width = userW + "px";
  let childH = userH / 16;
  let childW = userW / 16;

  for (i = 0; i < 256; i++) {
    child = document.createElement("div");
    child.className = "child";
    container.appendChild(child);
    child.style["height"] = childH + "px";
    child.style["width"] = childW + "px";
    childStyle = document.getElementsByClassName("child");
    childStyle[i].onclick = function () {
      this.style.backgroundColor = color;
    };
  }

  buttonAdd.style.display = "none";
  buttonNew.style.display = "block";
  resetColor.style.display = "block";
  form.style.display = "none";
};
buttonNew.onclick = function () {
  document.body.removeChild(container);
  buttonAdd.style.display = "block";
  buttonNew.style.display = "none";
  form.style.display = "block";
};
resetColor.onclick = function () {
  for (let i = 0; i < 256; i++) {
    childStyle[i].style.backgroundColor = "black";
  }
};
