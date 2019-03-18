# 前端读书笔记

```
// 定义对象 构造函数定义实例属性(一般是属性) 原型对象定义共享属性(一般是方法)
// 定义父对象
function Parent(name) {
	this.name = name;
	console.log('Parent');
}
Parent.prototype.sayName = function() {
	console.log(this.name);
}

// 继承 借用父构造函数复用父实例属性 原型对象复用父原型属性 想要理解 必须理解Object.create()和new
// 定义子对象
function Son(name, age) {
	Parent.call(this, name); // 复用父实例属性
	this.age = age;
	console.log('Son');
}
// 两步构造子原型对象
var sonPrototype = Object.create(Parent.prototype); // 提取出父原型属性 构造函数为空函数
sonPrototype.constructor = Son; // 构造函数改为子构造函数 复用父实例属性
Son.prototype = sonPrototype; // 将上面构造好的子原型对象赋给子原型

// 创建子对象
var s = new Son('mm', 18);

// 解析Object.create(o) 以o为原型创建对象(o作为新对象原型链上一级 且o没有实例属性)
function create(o) {
	function F() {}
	F.prototype = o;
	return new F();
}
// 解析new操作符
function myNew(Func) {
	var o = new Object(); // 创建一个新对象
	Func.apply(o); // 以新对象为环境执行构造函数
	o.__proto__ = Func.prototype; // 新对象[[Prototype]]指向构造函数的原型对象
	return o;
}
```

## JavaScript语言精粹
- 薄而有深度
- 有很多实践被ES5标准采用
- 会涉及到一些标准方法的实现思路，比如数组的reduce方法
- 关于闭包的运用，借助闭包实现模块化的思路等都很棒
- 作者整理的标准类型上的小巧方法集可以快速记忆

## JavaScript高级程序设计
- 平实严谨有内容
- 简介中的背景介绍值得看，除了背景，更重要的是给出语言地图，ECMAScript指定了哪些内容，JavaScript包括哪些内容，浏览器的DOM和BOM和它们是怎么样的关系。有些人可能不关心，但是，对于我这个强迫症来说，这点很重要
- 第2章 <script>标签在html中该怎么放？需要重点看
- 第3章和第5章 讲的是基本类型的方法和引用类型的方法，比语言精粹中的小巧方法集详细。基础好可跳过
- 第4章 作用域和垃圾清除 需要重点看
- 第6章 主要讲了两个部分，创建对象和如何实现继承，需要细细品味 极其精彩，代码放在extends.js和createObject.js
- 第7章 讲函数 最重要的概念是作用域链[[Scope]] 加上JS的GC，返回函数为什么能实现闭包通过作用域链一目了然。后面讲了如何实现块级作用域，私有变量，模块等 都是建立在作用域链上的。
- 第8章 BOM window和框架 top parent self 要好好理解 然后是location获取search 最后是navigator来检测浏览器。做大致了解即可。
- 第9章 客户端检测 讲了能力检测 怪癖/Bug检测 用户代理检测(检测渲染引擎 浏览器等) 原则是确定浏览器是否具有某能力比用得什么代理更加有用。
- 第10章 DOM 讲了基本的使用JS操作DOM的方法 document element节点如何操作节点属性和文本是重点 还讲了动态脚本和样式的两种实现方法 基础好可跳过。
