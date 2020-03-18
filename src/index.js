import "./index.scss";

function test() {
  var root = document.getElementsByClassName("root")[0];
  var p = document.createElement("p");
  var text = document.createTextNode("hello world");
  p.appendChild(text);
  root.appendChild(p);
}

test();