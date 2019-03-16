// 对象的属性需要深入理解
// 1.ES5有一种用来描述对象属性的属性，叫做内部属性(不能直接访问) 文档中一般用[[]]表示
// 内部属性的作用就是来描述一个属性是否可以删除，更改，枚举等。
// 2.属性分为两种：数据属性，访问器属性
// 								描述属性是否更改	枚举，for in的时候
// 数据属性 有四个内部属性来描述 [[Configurable]] [[Enumerable]] [[Writable]] [[Value]]
// 访问器属性 [[Configurable]] [[Enumerable]] [[Getter]] [[Setter]]
// getter setter 最大的用处是进行属性监听 比如说设置一个值的同时，可以在setter函数中设置另一个值

obj = {
	name: 'mimo', // 数据属性
	_age: 18
}
// 修改obj对象的name属性的描述属性
Object.defineProperty(obj, 'name', {
	'enumerable': false,
	'writable': true
})
// 添加访问器属性 同时定义这个访问器属性的描述属性
Object.defineProperty(obj, 'age', {
	get: function() {
		return this._age
	},
	set: function(val) {
		this._age = val
		if (val <= 18) {
			this.name = 'small mimo'
		}
	}
})
// 获取属性的描述属性
var nameDesc = Object.getOwnPropertyDescriptor(obj, 'name')

// 了解清楚了对象的属性已经描述属性的内部属性，再来看如何创建对象
// 1. 用Object函数或对象字面量 直接在返回的对象上定义属性
var obj = new Object();
var obj = {};
// 上面对象的原型对象都是Object 可以封装它们的创建过程

// 2. 写一个函数作为构造函数 用this定义属性 然后new创建对象
// 3. 写一个空函数作为构造函数 然后用函数的prototype属性(原型对象)定义属性 最后用new创建对象
// 4. 混合2，3. 构造函数中定义实例属性 原型对象定义共享属性
// 5. 4就可以了 但是看起来有些松散 封装一下就是动态原型模式 代码如下
function Person(name) {
	// 定义实例属性
	this.name = name;
	// 定义共享属性 第一次创建Person对象时 才会调用 且只调用一次 
	if (typeof this.sayName !== 'function') {
		Person.prototype.sayName = function() {
			console.log(this.name)
		}
	}
}
