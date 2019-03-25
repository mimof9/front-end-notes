"use strict";

require("@babel/polyfill");

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

for (var _i = 0; _i < 5; _i++) {
  console.log(_i);
}

console.log(i);
var j = 1;
j = (_readOnlyError("j"), 2);
[1, 2, 3].map(function (item) {
  return item * item;
});
var x = 1,
    z = 3,
    w = 4,
    y = 2;
Math.max.apply(Math, [1, 2, 3]);
