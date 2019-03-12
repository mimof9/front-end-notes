// 在对象字面量中，如果属性名是一个合法的JavaScript标识符且不是保留字，可以省略引号。
// "first-name" 引号是必须的，first_name引号可以省略

// 对象字面量的非法属性名不能用.获取，可以使用["string"]获取值，如果属性名是变量，那么只能使用[]
// 当属性要用表达式确定的时候 也只能用[], Math[this<0 ? 'ceil' : "floor"](this) 这里this指向的是数值

var obj = {
	name1: "val1",
	name2: "val2"
}
// || 运算符可以填充默认值：
var attr1 = obj.name1 || "unknown";
// && 运算符可以避免undefined导致的TypeError异常
if(obj && obj.name1)

// 删除对象的属性可能会让原型链中的属性透显出来
delete obj.name1;