创建对象：
1.工厂模式
	用函数来封装以特定接口创建对象的细节,可以创建多个相似对象
	function createPerson (name, age, job) {
		var obj = new Object();
		obj.name = name;
		obj.age = age;
		obj.job = job;
		obj.sayname = function () {
			alert(this.name);
		}
		return obj;
	}
var person1 = createPerson("wuxi","20","IT");
var person2 = createPerson("xiaoming","12","student");

2.构造函数模式（new核心）
	function Person (name, age, job) {
		this.name = name;
		this.age = age;
		this.job =job;
		this.sayname =function (){
			alert(this.name);
			//return this后可以链式调用
		};
	}
var person1 = new Person("wuxi","20","IT");
var person2 = new Person("xiaoming","12","student");
没有显式地创建对象；没有return语句；直接将属性和方法赋给了this对象
Person("wuxi","20","IT")当做普通函数调用，就被添加到了window中；
var  o =new Object(); Person.call(o,"wuxi","20","IT");o.sayname();在另外一个对象的作用域中调用
构造函数中的new出来的不同的实例中的方法是不同的函数；
*补充：安全模式   防止忘记写new来创建对象
	function Person (name) {
		if(this instanceof Person) {  //判断this是否是Person的一个实例
			this.name = name;
		} else {
			retrun new Person(name);
		}
	}
	var person1 = Person("wuxi");

3.原型模式:让所有对象共享它所包含的属性和方法
	函数都有一个prototype属性，指向函数的原型对象-->Object的原型-->null
 	Person.prototype.constructor = Person;constructor默认属性，重写prototype会覆盖；
	实例和构造函数没有直接关系，都是通过prototype指针找到函数原型；
	实例属性还是原型属性的判别：hasOwnProperty
	*可以通过对象实例访问保存在原型中的值，但是不能通过对象实例重写原型中的值
	*原型中所有属性被实例共享，包含引用类型值的属性来说，会造成问题；
		原因：如果直接修改是没问题的，但是如果是有操作的方法就会早问直接在原型中修改
	*原型的写法得在构造函数的外面
	*不能通过对象字面量创建原型方法，这样会重写原型链
	function Person () {
	}
	Person.prototype = {
		friend : ["a","b"]
	};
	var p3 = new Person();
	var p2 = new Person();
	//p1.friend=["c","d"] //没问题
	p3.friend.push["e"];  //等价于  Person.prototype.friend.push["e"] 


4.组合模式
  //构造函数用于定义实例属性
  //原型模式用于定义共享属性和方法
  function Person (name ,age ,job) {
  	this.name = name;
  	this.age = age;
  	this.job = job;
  	this.friend = ["a","b"];
  	var recond =[{name : "xi"}];
  	this.getRecond = function () {
  		alert(recond);
  	}
  	this.sayname();
  }
  Person.prototype = {
  		constructor: Person,
  		sayname : function () {
  			alert(this.name);
  		}
  	}
  var person1 = new Person("wuxi","20","IT");

  定义在构造函数内部的方法,会在它的每一个实例上都克隆这个方法;定义在构造函数的prototype属性上
的方法会让它的所有示例都共享这个方法,但是不会在每个实例的内部重新定义这个方法. 如果我们的应用
需要创建很多新的对象,并且这些对象还有许多的方法,为了节省内存,我们建议把这些方法都定义在构造函数
的prototype属性上









