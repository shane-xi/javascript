//回调函数与事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境
//将某个函数指针以值的形式进行传递，同时该函数必须在特定的环境中执行，就得绑定函数
//（或者用一个匿名函数闭包）  setTimeout中使用

function bindd (fun , context) {
	return function () {
		return fun.apply(context,arguments);
	}
}

[].slice.call(arguments)
Array.prototype.slice.call(arguments);

