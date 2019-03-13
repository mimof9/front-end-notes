// Array
var arr = [1, 2, 3, 4, 5];
// 注意concat和push的两个区别
arr.concat(item...); // 可变参数 如果是数组会分别添加进去 返回新数组是原来的浅拷贝
arr.join(separator);	// 数组转字符串 用参数分割 默认逗号 返回一个字符串
arr.pop();	// 删除原数组最后一个元素 返回这个元素 空数组返回undefined
arr.shift();	// 同上 第一个元素
arr.push(item...); // 可变参数 如果是数组会把数组作为一个元素添加进去 改变原数组，返回新数组长度
arr.unshift(item...);	// 同上 第一个元素
arr.reverse();	// 反转原数组 返回原数组(这个返回没意义)
arr.slice(start, end);	// 数组切片 [start, end) -1表示倒数第一个 返回切片的浅拷贝 不改变u按数组
arr.splice(start, deleteCount, item..);	// 起始位置 删除元素个数 添加的可变参数 改变原数组 返回被删除元素组成的数组
arr.sort(comparefn);	// 参数是比较函数 默认是转成字符串排序(也就是字典序)
arr.sort(function(a, b) {	// 正常的数字排序
	return a - b;
});
arr.sort(function(a, b) {	// 如果数组中不只有数字，包含任何简单值（没有对象）
	if (a === b) {
		return 0;
	}
	if (typeof a === typeof b) {	// 同类型使用<运算符比较
		return a < b ? -1 : 1;
	}
	return typeof a < typeof b ? -1 : 1; // 不同类 比较它们的typeof 字符串
});

// Function
var fn = function() {};
fn.apply(thisArg, argArray);	// 调用原方法，this改为第一个参数，参数以数组形式传递
fn.call(thisArg, argItem...);	// 调用原方法，this改为第一个参数，参数一个一个传递

// Number
// 注意不会改变原数字
123 .toString(16);	// 返回字符串 不改变原数字(如果是变量的话) 参数是字符串用几进制表示2~36才行
123 .toFixed(2);	// 参数保留几位小数 默认0 最多20	返回数字
123 .toExponential(2);	// 转科学计数法 参数保留几位小数 0~20 返回数字
123 .toPrecision(2);	// 参数控制精度 返回十进制形式字符串 0~21  

// Object
var obj = {};
obj.hasOwnProperty('attrname');	// 判断对象自身是否有参数指定的属性名，不检查原型链

// RegExp
var re = /^[abc]{2,3}$/;
re.exec('bbb');	//	exec 会返回捕获分组
re.test('bbb');	// 只返回true/false 表示是否匹配

// String
// 注意 字符串和数字一样 方法都不会改变字符串本身
var str = "i like javascript";
str.charAt(3);	// 返回字符串指定位置的字符(js没有字符，所以返回含有一个字符的字符串) 不合法""
str.charCodeAt(3);	// 返回字符串自定位置的字符的整数码位 不合法返回NaN
String.fromCharCode(67, 97, 116);	// Cat 根据字符编码返回对应字符
str.indexOf("v", 5);	// 从索引5开始查找'v'出现的第一个位置 找不到返回-1
str.lastIndexOf("v", 5);	// 同上 变为索引5开始往前找
str.search(re);	// 同上 不过参数是正则表达式，并且不接收其实位置参数
// str.concat('a', "abc");	// 用+更方便
str.localeCompare("abc");	// 字符串比较大小 返回 -1 0 1
str.match(re);	// 注意和re.exec(str) 方法比较 返回值根据正则表达式是否有g选项而不同
str.replace('like', 'love');	// 字符串替换 不改变原字符串 返回一个新的字符串
str.slice(1, 5);	// 字符串切片 [1, 5)	不改变原字符串 返回一个新的字符串
str.split(" ", 3);	// 用空格分割字符串，最多分割3段 str.splite('');	空字符串表示每一个字符都分割 不传参代表不分割
str.toLowerCase();	// 返回一个新的字符串 变小写
str.toUpperCase();	// 变大写




