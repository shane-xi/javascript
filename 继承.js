1.类式继承：子类的原型指向 父类的实例   Sub.prototype = new Super();
								Super 上的this公有属性会到实例上也就是 sub.prototype中
    							  var instance = new Sub();
问题：  i.包含引用类型值的原型（来自父类构造函数）会被所有实例共享，如果你通过 instace.prototype
		形式的修改就会被所有共享
	   ii.创建子类实例时，不能向父类的构造函数中传递不影响到所有对象实例；（不能传参数）
2.构造函数继承： 在子类的构造函数的内部调用父类的构造函数
	 function Super() {
	 	this.color = ["red","blue"];
	 }	   
	 function sub() {
	 	Super.call(this); //执行构造函数
	 }
var instace = new Sub();  
问题： 没有复用性，父类原型中的属性，子类不可见

3.组合模式：使用原型链实现对原型属性和方法的继承；构造函数实现对实例属性的继承
	function Super (name) {
		this.color = ["red","blue"];
		this.name = name
	}
	Super.prototype.sayName = {
		console.log(this.name);
	}
	function Sub () {
		Super.call(this,name); //继承属性
		this.age = age;
	}
	Sub.prototype = new Super();//继承共享方法
问题：父类的构造函数会被调用两次；子类原型会包含父类的全部实例属性

4.原型式继承
	var old = {}
   function object(o) {
   		function F() {}
   		F.prototype = o ;
   		return new F();
   }
   var instance = object(old);  instance 是 F的一个实例，F原型指向o;
Object.create()方法，是类式继承的一个封装，过渡对象就相当于类式继承的子类；
5.寄生式继承
	var old = {}
	function createNew(obj) {
		var o = object(obj);
		o.newMethod = function () {}
		return o;
	}
6.寄生式组合继承 ：让子类的原型指向父类的原型，这样子类的原型中就不会包含父类全部
			实例属性
			function inheritPrototype (Sub,Super) {
				var p = object(Super.prototype);//构建父类原型副本
				p.constructor = sub; //让p中的constructor指向sub
				sub.prototype = p;// 子类的原型指向父类的原型；保证各自构造函数与原型间的
									//关系不受影响，且子类的原型继承了父类的原型
			}
7.多继承
 	function extend (target, source) {
 		for (var property in source) {
 			target[property] = source[property];
 		}
 		return target;
 	}
 	if (typeOf source[property] == object ) {
 		var arg =null;
 		source[property].forEach(item ,i) {
 			
 		}
 	}
 	//多继承事件绑定到原生对象上
 	Object.prototype.mix = function () {
 		var i,
 			arg,
 			len = arguments.length;
 		for (;i<len;i++) {
 			arg = arguments[i];
 			for (var property in arg) {
 				this[property] = arg[property];
 			}
 		}	
 	}
 8.多态 ：  判断参数来决定执行的逻辑




