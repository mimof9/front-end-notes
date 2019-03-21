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
	* 事件流：捕获流->事件处理程序/监听器->冒泡流
	* 事件处理程序会自动获得event和this event代表事件 this指向促发事件的元素
	* 如何添加事件处理程序
		+ HTML事件处理程序： onclick属性
		+ DOM0级事件处理程序： 元素节点.onclick/*也可以用[]来访问*/ = function() {} 冒泡阶段
		+ DOM2级事件处理程序： 元素节点.addEventListener('onclick', function(){}, false) true为捕获阶段 false为冒泡阶段 removeEventListener('onclick', handler, false); 匿名处理函数删除不掉
		+ IE8之前的事件处理程序：元素节点.attachEvent('click', function(){}) 冒泡阶段
	* 事件对象event
	* 事件类型
		+ load unload
		+ 焦点事件 focus blur focusin focusout
		+ 鼠标事件 鼠标位置 clientX/Y pageX/Y screenX/Y
		+ 键盘事件 keydown keypress/textInput keyup 通过event.keyCode/charCode获取按下的键
		+ 另外要清楚 删除节点，插入节点这种事件也可以监听
		+ HTML5事件 contentmenu事件实现自定义右键菜单 DOMContentLoaded精确到DOM树加载完成 readystatechange+readyState(window, script, css才有)模拟DOMContentLoaded
		+ 设备事件 横竖屏 重力感应方向 不是特别重要 当然如果开发移动端游戏很重要
		+ 触摸和手势事件 touchstart touchmove touchend 属性 touches[] targetTouchs[] changeTouches[]
			- 1.touches：当前位于屏幕上的所有手指的一个列表。
			- 2.targetTouches：位于当前DOM元素上的手指的一个列表。
			- 3.changedTouches：触发当前事件的手指的一个列表。
	* 内存和性能 大量是事件处理程序会占用大量内存 可以采用事件委托来减少事件处理程序的数量 并且在一个事件不需要后或者对应的元素被删除后 手工删除事件处理函数
- 第14章 讲表单对于表单 我个人兴致不高 不过后面的富文本倒是很有意思 尝试了一下发现使用img点击去调用execCommand方法才行 使用div的话 会自动清空编辑区的选择
- 第15章 Canvas绘图 这个很有意思 之前python的海归绘图就很喜欢 Canvas比起它强大得多 代码放在canvas2d 关于3d绘图webgl还是需要更专业的书籍
- 第16章 HTML5一些新API 拖放事件(dataTransfer)。 媒体元素，音视频 自定义播放器很简单，因为这两个元素定义了很多属性以及方法来对此提供支持。 ajax之后前进后退基本废了，h5的状态管理可以在不重新加载页面的情况下改变URL。
- 第17章 调试和错误处理 毕竟是经典，调试技巧都比较老了，看一下错误类型还有实现服务器日志的思路即可。
- 第18，19章都是讲的XML 我跳过了
- 第20章 JSON ES5规定了原生JSON对象 序列化JSON.stringify(jsobj, replacer, 4) 反序列化JSON.parse(jsonstr, reviver) 第二个参数都是函数 两个参数为key, value。 另外要理解序列化的顺序
	* 调用toJSON()返回对象 没有该方法 直接返回原对象
	* 过滤	参数2
	* 序列化
	* 格式化 参数3
- 第21章 Ajax 非常重要，XHR对象的使用流程(异步onreadystate事件) 如何指定请求头和相应类型
	* FormData 使用Ajax序列化表单数据的XHR2级规范(可以自己实现)
	* timeout和ontimeout 指定超时，原理也很简单
	* 指定响应类型 overrideMimeType()
	* 还提出了监控进度的事件 loadstart progress load/error/abort loadend
	- 再接着就是跨域资源共享 理解其基本思想: Origin 请求头和 Access-Control-Allow-Origin匹配
		- XDR
		- XHR 原生支持 使用绝对URL就是跨域请求 相对URL就是同域请求
		- Preflighted Requests
		- withCredentials发送带cookie HTTP认证 客户端SSL证明的请求
		- 图像ping
		- JSONP 原理
	- Comet 长轮询 流
		- 服务器发送事件 SSE 服务器向客户端推送数据的单向连接
		- Web Sockets	服务器和客户端的全双工通信
	- 安全
		- 未被授权系统有权访问某个资源的情况 称为CSRF跨站请求伪造
		