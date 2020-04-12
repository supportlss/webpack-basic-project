function test(type) {
  var root = document.getElementsByClassName("root")[0];
  var p = document.createElement("p");
  var text = document.createTextNode(`${type} world`);
  p.appendChild(text);
  root.appendChild(p);
}

export default test;
