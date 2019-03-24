// export var name = 'mimof';
// export function add(x, y) {
// 	return x+y;
// }

var name = 'mimof'
function add(x, y) {
	return x+y;
}

console.log('import会执行加载的模块');

export {
	name,
	add
};