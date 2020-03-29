function test(type) {
  var root = document.getElementsByClassName("root")[0];
  var p = document.createElement("p");
  var text = document.createTextNode(`${type} world`);
  var da = document.createComment("who are you ?");
  text.appendChild(da);
  p.appendChild(text);
  root.appendChild(p);
}

export default test;
