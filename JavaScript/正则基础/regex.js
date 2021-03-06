// 非捕获分组 捕获分组
// 非捕获分组参与匹配但是不会保存到最终的分组结果中去
(?:...) // 非捕获
()	// 捕获

// 正则表达式标识
i // 忽略大小写
g // 匹配所有符合条件的，不只匹配第一个
m // 多行 能匹配行结束符
// 正则对象的属性
re = /^abc$/gi;
re.global;	//g是否开启 true
re.ignoreCase; //i是否开器 true
re.multiline; //m是否开器 false
re.source;	//源码文本 /^abc$/gi
re.lastIndex;	//下一次exec匹配开始的索引 0

// 常用的这些就不记录了 记住大写相当于取反或者用[^...]取反
// \d表示数字 === [0-9] \D表示不是数字 === [^0-9]
// \s表示空白符 === [\f\n\r\t\u000B\u0020\u00A0\u2028\u2029]

// 分组的引用
\1; // 表示对分组1的引用 可以再次匹配一个一模一样的分组1

// 贪婪匹配 非贪婪匹配
// 如果表达式因子后面只有一个量词 则是贪婪匹配 匹配尽可能多的字符
// 如果量词后跟着? 则非贪婪匹配 只匹配最少的字符