var name = 'mimof'
function add(x, y) {
	return x+y;
}

console.log('import会执行加载的模块');

// 一个模块只能有一个默认输出 因此import后面不用加大括号
export default {
	name,
	add
};