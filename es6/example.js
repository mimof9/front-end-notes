import "@babel/polyfill"

[1, 2, 3].map(item => {
	for (let i=0; i<3; i++) {
		let j = 1;
		console.log(`${item}...`);
	}
});
console.log(Array.from([1, 2, 3], x => x + x));