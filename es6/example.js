import "@babel/polyfill"

for(let i=0; i<5; i++){
    console.log(i);
}
console.log(i);

const j = 1;
j = 2;

[1, 2, 3].map(item => item * item);

let [x, [z, w], y] = [1, [3, 4], 2];

Math.max(...[1, 2, 3]);