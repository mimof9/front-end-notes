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
- 第10章 DOM 讲了基本的使用JS操作DOM的方法 document element节点如何操作节点属性和文本是重点 还讲了动态脚本和样式的两种实现方法 基础好可跳过。 这一章有个必须理解的概念，通过childNodes attribute等返回的这类集合属性，在访问它们的时候才去查询DOM树，因此会动态更新，然而也会带来性能问题。
- 第11章 DOM扩展 主要理解选择器APIquerySelector/All 和H5规定的很多规范 getElementByClassName innerHTML outerHtml已经这这类方法的性能问题 还有一个问题就是DOM中的空白文本节点，元素遍历提供了nodelist来获取忽略它们的对象
- 第12章 DOM2和DOM3 xmlns命令空间的概念不知道有什么用 但是DOM2样式操作属于必会的内容 内联style属性用元素节点的style对象操作(样式表的计算属性用window.getComputedStyle()获取 只读) style标签样式和link标签引入的样式用document.styleSheet[0].cssRule[0].style操作 元素大小offset client scroll这三个代表的偏移位置和大小 DOM2提供了遍历文档的 document.createTreeWalker和一个简单版 关于范围的选择 我个人的看法是没必要掌握 大可以构建更好的HTML然后操作元素节点来做。
- 第13章 事件 也是重中之重 
	+ 事件流：捕获流->事件处理程序/监听器->冒泡流
	+ 事件处理程序会自动获得event和this event代表事件 this指向出发事件的元素
	+ HTML事件处理程序： onclick属性
	+ DOM0级事件处理程序： 元素节点.onclick = function() {} 冒泡阶段
	+ DOM2级事件处理程序： 元素节点.addEventListener('onclick', function(){}, false) true为捕获阶段 false为冒泡阶段 removeEventListener('onclick', handler, false); 匿名处理函数删除不掉
	+ IE8之前的事件处理程序：元素节点.attachEvent('click', function(){}) 冒泡阶段