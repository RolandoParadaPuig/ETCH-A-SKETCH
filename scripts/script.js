let container = document.querySelector("#container");
let buttonAdd = document.querySelector("#btnAdd");
let buttonNew = document.querySelector("#btnNew");
let form = document.querySelector("#inputDimention");
let containerH;
let containerW;
let child;
let childStyle;
let userW;
let userH;

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
  }

  buttonAdd.style.display = "none";
  buttonNew.style.display = "block";
  form.style.display = "none";
};
childStyle = document.getElementsByClassName("child");
childStyle[0].onclick = function () {
  this.style.backgroundColor = "red";
};
buttonNew.onclick = function () {
  document.body.removeChild(container);
  buttonAdd.style.display = "block";
  buttonNew.style.display = "none";
  form.style.display = "block";
};
