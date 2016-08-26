浅复制与深复制关系到变量的类型
对象，数组这样的引用类型
因为JavaScript存储对象都是存地址的，所以浅复制会导致 obj 和 obj1 指向同一块内存地址。
而深复制一般都是开辟一块新的内存地址，将原对象的各个属性逐个复制出去
深复制--->实现原理，先新建一个空对象，内存中新开辟一块地址，把被复制对象的所有可枚举的(注意可枚举的对象)属性方法一一复制过来，注意要用递归来复制子对象里面的所有属性和方法，直到子子.....属性为基本数据类型。
总结，深复制理解两点，1,新开辟内存地址，2,递归来刨根复制。

深复制的方法：
1. var cloneObj = JSON.parse(JSON.stringify(obj));
坏处:抛弃了原对象的constructor，克隆的都会变成object;正则表达式无法复制

2.主要处理的是object对象，非object对象直接赋值
var toString = Object.prototype.toString;
toString.call(变量名)  获取变量类型
Object.prototype.DeepClone = function () {
	var obj,i;
	var toString = Object.prototype.toString;
	obj = {};
	for(attr in this) {
		if(this.hasOwnProperty(attr)){//首先复制的是对象上的属性而不是其原型上的
			if(typeof(this[attr] === "object")){
				if (toString.call(this[attr]) === '[object Array]'){//判断是不是数组
					obj[attr] = []; 					//创建一个新的数组深复制里面的属性
					for(i=0;i<this[attr].length;i++){
						obj[attr].push(this[attr][i].DeepClone())
					}
				} else if(toString.call(this[attr]) === '[object Object]'){
					obj[attr] = this[attr].DeepCopy();//是对象，直接深复制
				} else if (this[attr] === null) {
					obj[attr] = null;
				}
			} else {
				obj[attr] = this[attr];
			}
		}
	}
}

3. 更好的方法 http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/
   暂时没有理解博主的思想，收藏留后继续研读