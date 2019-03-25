"use strict";

require("@babel/polyfill");

[1, 2, 3].map(function (item) {
  for (var i = 0; i < 3; i++) {
    var j = 1;
    console.log("".concat(item, "..."));
  }
});
console.log(Array.from([1, 2, 3], function (x) {
  return x + x;
}));
