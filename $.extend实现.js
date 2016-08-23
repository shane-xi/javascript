jQuery.extend = jQuery.fn.extend =function() {
	/*
		target: 被扩展的对象 （第一个参数）
		length: 参数的数量
		deep: 是否深度克隆（默认：false）
		i：指向的是第一个扩展对象，默认是第二个参数
	*/
	var target = arguments[0],
		length = arguments.length,
		deep = false,
		i = 1;
	/*
		target作为第一个参数，如果第一个参数是Boolean类型的值，则把target复制给deep
		deep表示是否深度克隆，当为true时，进行深度克隆，否则只进行第一层扩展
		然后把第二个参数复制给target
	*/
	if (typeof(target) === 'boolean') {
		deep = target;
		target = arguments[i]||{};
		i++;
	}
	// target既不是对象也不是函数，则把target设置设置成空对象
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}


}