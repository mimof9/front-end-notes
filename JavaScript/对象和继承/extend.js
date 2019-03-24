// JS中实现继承的几种方式
// 伪类方式 像基于类的语言那样去继承 主要原理是构造器函数+函数的prototype对象 还有new运算符
var inherits = function(Parent) {
	this.prototype = new Parent();
	return this;
}
// 看起来没那么怪异，但是有两个大问题
// 1.没有私有环境(所有属性都是公开的) 
// 2.无法访问super的方法

// 原型方式 差异化继承 Object.create() 直接创建一个和obj对象类似的对象 然后指出差异即可 除去了类的概念
// Object.create() 主要设置了 son._proto__ = obj
var son = Object.create(obj)
son.name = '名字'
son.func1 = function(){
	console.log('方法1')
}
// 这样的方式只要不覆盖 还是能访问到obj原有的方法 但是 无法提供私有环境

// 函数化方式 原理是闭包 使用闭包创建对象实现私有化
// 继承只需要再定义一个闭包 然后调用想要继承的对象的闭包 然后修改即可
// 调用父类方法比较有技巧性 给Object.prototype添加一个superior('methodname')方法用来获取之前的方法
var parent = function(spec) {
	var that = {};

	that.get_name = function() {
		return spec.name;
	};
	that.says = function() {
		return spec.saying || '';
	};

	return that;
};

var myParent = parent({name: '我是父亲'});
myParent.get_name();	// "我是父亲"
myParent.says();	// ""

// 继承
var son = function(spec) {
	spec.saying = spec.saying || "son default message";	// 给spec添加了属性
	var that = parent(spec);	// 调用parent方法去构造对象
	that.get_name = function() {	//覆盖parent方法
		return spec.name + "被覆盖的方法";
	}
	return that;
}

var mySon = son({name: '我是孩子'});
mySon.get_name();	// "我是孩子被覆盖的方法"
mySon.says();	// "son default message"

// 可调用parent方法的继承
Object.prototype['superior'] = function(name) {
	var that = this,	// 使用方法调用模式 this指向的是调用对象
		method = that[name];
	return function() {
		return method.apply(that, arguments);
	};
};

var coolSon = function(spec) {
	var that = parent(spec),	// 继承parent
		super_get_name = that.superior('get_name');	// 获取parent的方法
	that.get_name = function(n) {
		return 'like ' + super_get_name() + ' baby';	// 调用parent方法
	};
	return that;
}

var myCoolSon = coolSon({name: '可访问父亲的孩子'});
myCoolSon.get_name();
// 有私有环境且可以访问super方法