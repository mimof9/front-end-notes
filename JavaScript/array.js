// JS没有真实的数组数据结构
// JS的Array是类数组 是对象
var arr = ['abc', 'bcd', 'cde'];	// 基本像下面这样
var arr_obj = {0: 'abc', 1: 'bcd', 2: 'cde'};
// 但是要注意 数组的原型是Array.prototype 因此还有其他很多又有的属性和方法

// length属性
arr[2]; // []运算符把表达式转换成字符串：如果有表达式toString方法就调用
arr[2 .toString] === arr['2'];
// 数字>=length属性 设置时，length更新，添加 获取时，undefined
// 手动更新length >当前length时 不会分配更多空间 <length时 会删除多余的属性

// 可以用对象的delete方法
delete arr[1]; // 但是不会动态其后属性序号 arr[2]依旧能访问
// 使用splice(start, deletenum)

// 判断一个对象是否数组
typeof arr === 'object'	// 因此  用typeof起不了作用
Object.prototype.toString.apply(arr) === '[object Array]' // 每个对象都有toString方法
// 现在有Array.isArray(arr)方法
// 如果浏览器不支持Array.isArray()方法 Polyfill如下 Polyfill是浏览器端的shim(仅使用旧的API在旧环境中支持新API)
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.apply(arg) === '[object Array]'; 
	};
}

// 实现reduce方法
Array.prototype['myreduce'] = function(f, value) {
	for(let i=0; i<this.length; i++) {
		value = f(this[i], value);	// value充当了备忘录
	}
	return value;
};

var sum = [1, 2, 3, 4, 5].myreduce(function(a, b) {
	return a+b;
}, 0);
// 注意 Object.create()返回的是对象
var a = Object.create([1, 2, 3, 4, 5]); // 虽然有数组的各种各样的属性方法
Array.isArray(a); // 但是 false 因为是一个对象