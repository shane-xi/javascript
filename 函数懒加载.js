var LazyLoad = (function () {
	function extend(target,source){
		var obj ={};
		var i,j;
		for (var name in target) {
			if(target.hasOwnProperty(name)) {
				obj[name] = target[name];
			}
		}
		for (var name2 in source) {
			if (target.hasOwnProperty(name)){
				obj[name2] = source[name2];
			}
		}
		return obj;
	}
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

	var defaultConfig = {
		'fireEvent' : 'scroll'
	};

	function LazyLoad (options) {
		this.init(options);
	}
	lazyLoad.prototype.init = function (options) {
		this.config = extend(defaultConfig,options||{});
		if (this.config.fireEvent === 'scroll') {
            this.bindLazyEvent();
        }
	}
	var arr = document.images;
	lazyLoad.prototype.loadImg = function () {
		var len = arr.length;
		var self = this;
		for (var i=0;i<len;i++) {
			if (!arr[i].isLoad) {//判断图片是否已经加载
				if(arr[i].getBoundingClientRect().top<document.documentElement.clientHeight) {
					arr[i].isLoad = true;
					var dataSrc = arr[i].dataset.src;
					if(arr[i].dataset){ //是否支持dataset
		                self.preLoadImg(arr[i],dataSrc);    
		            }else{
		                self.preLoadImg(arr[i],arr[i].getAttribute("data-src"));
		            }
				}
			}
		}
	};
	lazyLoad.prototype.preLoadImg = function(obj,url){
		var img = new Image();
		img.src = url;
		img.onload = function () {
			obj.src = img.src;
		}
		// 如果图片已经存在于浏览器缓存，直接调用回调函数
        if (img.complete) {
        	obj.src = img.src
        }
	};
	lazyLoad.prototype.bindLazyEvent = function () {
		var self = this;
		if (this.config.container) {
			this.config.container.addEventListener('scroll' , function(){
				throttle(self.loadImg,50,1000/16).call(self);
			})
		} else {
			window.addEventListener('scroll',function(){
				throttle(self.loadImg,50,1000/16).call(self);
			})
		}
	};
	return LazyLoad;
})()