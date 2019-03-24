// 函数对象的原型对象 Function.prototype.__proto__ === Object.prototype

// 函数调用的四种模式, 本质是this不同，表象上看是调用的代码不同
// 方法调用模式： this绑定到方法所属对象 obj.func()
// 函数调用模式： this被绑定到全局变量 func()
// 构造器调用模式： this绑定到新对象上 new func()
// apply/call调用模式： this被绑定到第一个参数 自定义this

// 隐藏的arguments参数实现可变参数 需要注意内外的两个sum不冲突 函数智慧看到内部的那个sum变量
// arguments不是数组，是一个array-like对象，有length属性 但没有数组方法 这是一个设计错误
var sum = function() {
	var i, sum = 0;
	for(i=0; i<arguments.length; i++){
		sum += arguments[i];
	}
	return sum;
}

// 函数返回值 如果没指定返回值 返回undefined 如果是new func() 返回this(指定了返回值但不是对象 也返回this)

// 异常也会终止函数的执行 js只能有一个catch块
var add = function(a, b) {
	if(a !== "number" || b !== "number") {
		throw {
			name: "TypeError",
			message: "add needs numbers"
		};
	}
	return a + b;
}
// throw 抛出的异常要有name, message
try {
	add("seven");
} catch(e) {
	console.log(e.name + ": " + e.message);
}

// 可以对基本类型进行扩充 比如对Number String进行扩充（他们是函数）直接添加属性方法即可
// 然后该原型链上的后代都能用这个方法

// 作用域 控制着变量的可见性和生命周期（减少了命名冲突，提供了自动内存管理）
// var只有函数作用域 es6才出现了let const这样的块级作用域

// 闭包Closure
// 1. 根据作用域的概念 内部函数可以访问外部函数的变量和参数(除了this和arguments 但是可以把它们保存为变量进行访问)
// 2. 内部函数拥有比它的外部函数更长的生命周期
// 3. 内部函数访问的是外部函数变量本身而不是副本
// 两个例子
// eg.1 解决思路是使用let实现块级作用域 或者构造一个辅助函数立即执行将var变量绑定到参数
var p = function() {
	var funcs = [];
	for(var i=1; i<3; i++) {
		funcs.push(function() {
			console.log(i);
		})
	}
	return funcs
}

var funcs = p();
funcs[0]();	// 3
funcs[1](); // 3

// eg.2 需要理解到 p()每次返回的函数没有关系
var p = function() {
	var i = 1;
	return function() {
		console.log(i++);
	}
}
var s1 = p();
var s2 = p();
s1();	// 1
s1();	// 2
s2();	// 1

// 模块 是一个提供接口却隐藏状态与实现的函数或对象
// 可以使用函数和闭包来构造模块：一般形式为：一个定义了私有变量和函数的函数，return可以访问这些的特权函数
// 当然es6之后提供了模块
var p = function() {
	var i = 1;

	return {
		func: function() {
			console.log(i);
		}
	}
}
var c = p();
// 这样除了c 就没有访问i的方法了
c.func();

// 级联 链式调用
// 链式调用原理很简单，return this即可(前提是方法原本不需要返回值，只修改状态)

// 柯里化 局部套用 把多参数函数转化为一系列单参数函数并进行调用的技术
function add(a, b) {
	console.log(a+b);
}
add(1, 2);

Function.prototype['curry'] = function() {
	var slice = Array.prototype.slice, 
		args = slice.apply(arguments),	// 用arguments去调用slice方法 不用传第二个参数
		that = this;
	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	}
}
add.curry(1)(2);


// 可以记忆的函数
var fibonacci = function() {
	var memo = [0, 1];
	var fib = function(n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	}
	return fib;
}();

for(let i=0; i<=10; i++) {
	console.log(i + ': ' + fibonacci(i));
}

// 这个函数创建一个带记忆功能的函数
// memo是备忘录 formula递归公式 n是递归公式参数
var memoizer = function(memo, formula) {
	var recur = function(n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
}

var fibonacci = memoizer([0, 1], function(recur, n){
	return recur(n-1) + recur(n-2);
})

for(let i=0; i<=10; i++) {
	console.log(i + ': ' + fibonacci(i));
}