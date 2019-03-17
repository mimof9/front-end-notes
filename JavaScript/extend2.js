// 继承
// 首先说明一个误区 原型链不等于继承 两者没有关系
// 原型链只是js查找对象属性的机制 而继承的核心思想是要实现代码复用

// 原型链
// 构造函数
function Parent(name) {
	this.name = name
}
// 原型对象
Parent.prototype.sayName = function() {
	console.log(this.name);
} 
// 实例对象
var objP = new Parent();
// 理清楚三者关系
Parent.prototype.constructor === Parent; // 构造函数和原型对象互相引用
objP.__proto__ === Parent.prototype; // 实例对象的[[Prototype]]内部属性引用原型对象

// 接下来看复用代码的手段
// 1. 使用原型链复用代码
function Son(age) {
	this.age = age
}
Son.prototype = new Parent(); // 子原型改为父实例
// 缺点：父实例属性变为了子原型属性，这些属性变成了共享属性

// 2. 借用父构造函数复用代码
function Son(name, age) {
	Parent.call(this, name); // 子构造函数中调用父构造函数
	this.age = age;
}
// 缺点：只能继承父实例属性，无法继承父原型属性

// 3. 组合继承 组合1. 2.
function Son(name, age) {
	Parent.call(this, name);
	this.age = age;
}
Son.prototype = new Parent();	// 原型链继承
Son.prototype.constructor = Son; // 原型指向的构造函数改为Son, 实例会屏蔽所有原型对象上的实例属性，看起来问题就解决了
// 缺点：调用了两次父构造函数 并且子原型中存在多余的共享属性

// 4. 寄生组合式继承
// 组合继承的缺点是因为继承了实例属性 那么如何让它只继承父原原型属性呢？
function nolyPrototype(Parent) {
	function F(){}
	F.prototype = Parent.prototype; // 这样写不行 因为原型是对象 下面的修改会改变父原型 需要父原型的副本
	F.prototype.constructor = F; // 这样new F() 就只继承了父原型属性
	return new F();
}

function Son(name, age) {
	Parent.call(this, name);
	this.age = age;
}
Son.prototype = nolyPrototype(Parent);
Son.prototype.constructor = Son;

// Object.create() 以o为原型创建对象 下面是实现
function create(o) {
	function F() {}
	F.prototype = o;
	return new F();
}
// new 操作符具体做了如下
function myNew(Func) {
	var o = new Object();
	Func.apply(o);				//执行的是传入的构造函数
	o.__proto__ = Func.prototype;
	return o;
}

// 所以寄生组合式继承可以像下面这样写 这样写才是对的
function inherit(Son, Parent) {
	let tmp = create(Parent.prototype);
	tmp.constructor = Son;
	Son.prototype = tmp;
}
function Son(name, age) {
	Parent.call(this, name);
	this.age = age;
}
inherit(Son, Parent);

// ES5 之后 寄生组合式继承应该这样写
function Son(name, age) {
	Parent.call(this, name);
	this.age = age;
}
var parentprototype = Object.create(Parent.prototype);
parentprototype.constructor = Son;
Son.prototype = parentprototype;

// ES6之后 直接class 不过也是语法糖 暂且不说