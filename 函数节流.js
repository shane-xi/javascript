假想一下，你在电梯中，门快要关了，突然有人准备上来。电梯并没有改变楼层，而是再次打开梯门。电梯延迟了改变楼层的功能，但是优化了资源。
目的： 使某些代码不可以在没有间断的情况下连续重复执行，特别是会造成重排的
//让一个函数无法在短时间内连续调用，比如ajax提交文本信息验证时；
//缩放，滚动屏幕时
function throttle (method,delay) {
	var timer = null;//通过闭包构造私有作用域存放定时器变量
	return function () {
		var context =this,args =arguments;//
		clearTimeout(timer);
		timer = setTimeout(function () {
			method.apply(context,args);
		},delay);
	}
}
window.onresize = throttle(resizeDiv,300)
function resizeDiv() {
	var div = document.getElementById('wuxi');
	div.style.height = document.documentElement.offsetWidth/2 + 'px';
}


不能控制请求执行的频率，如果不停下来就一直不执行处理函数，可能会造成突变，
比如拖拽函数，懒图片的懒加载，我希望在下滑过程中图片不断的被加载出来，而不是只有当我停止下滑时候，
图片才被加载出来。又或者下滑时候的数据的 ajax 请求加载也是同理。

改进版   控制一个时间，一定在这个时间后执行一次
function throttle (method , delay , mustRun) {
	var timer = null ;
	var startTime =  new Date();  //Date.now(),+new Date()显示毫秒数
	return function() {
		var context =this,args =arguments;
		var currentTime  = new Date();
		var remaing = currentTime - startTime;//持续时间
		clearTimeout(timer);
		//如果到了规定触发时间间隔，触发method
		if(remaing >=mustRun){
			method.apply(context,args);
			startTime = currentTime;
		} else { //没有到达触发时间，重新设置定时器
			timer = setTimeout(function () {
				method.apply(context,args);
			},delay);
		}
	};
}
window.onresize = throttle(resizeDiv,1000,5000);


requestAniamtionFrame()
接受一个函数作为参数，在浏览器重绘之前调用这个函数
rAF 常用于 web 动画的制作，用于准确控制页面的帧刷新渲染，让动画效果更加流畅，
当然它的作用不仅仅局限于动画制作，我们可以利用它的特性将它视为一个定时器。（当然它不是定时器）
throttle(func,xx,1000/6) == requestAniamtionFrame(func)

总结：1.防抖动是 把多个连续的调用合并成一个
	 2.节流  只允许一个函数在 X 毫秒内执行一次，只有当上一次函数执行后过了你规定的时间间隔，才能进行下一次该函数的调用
	 3.RAF 是规定16.7ms触发一次handler，降低了可控性，但是提高了性能和精度	










