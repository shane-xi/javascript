1.判断方法
	value instancsof Array
	Array.isArray(value)
2.转换方法
	value.toString() [1,2,3]->> "1,2,3"
	value.valueOf()	 		->> [1,2,3]
	value.join()==value.join(",")	[1,2,3] ->> "1,2,3"
	value.join("")		    [1,2,3] ->> "123"  不改变原数组
如果数组中某一项是undefined 或者 null,返回结果仍以空字符串表示
3.栈方法
  value.push(arg) 返回数组长度    新增在数组尾部
  value.pop()   返回末尾的数      删除的也是数组尾部
4.队列方法
	value.shift()   返回第一个数  数组长度也减1
	value.unshift()  返回数组长度 数组前端推入一个项
5.重排序
 	value.reserve() 反序
 	value.sort( functionForCompare) 升序排列  数组项先转换成字符串，再比较，所以  10<5
 	所以应该传入compare比较函数	
 	function compare (value1,value2) {
 		if (value1<value2) {
 			return -1;
 		} else if (value1 == value2 ){
 			return 0;
 		}
 		else {
 			return 1;
 		}
 	}
 	value.sort(compare) 这样就会以升序方式排列，compare函数自定义排列方式
 他们的返回值都是排序过后的数组，原数组也被修改了
6.操作方法
   value2 = value.concat(value1);
   连接数组，即把参数添加到原数组副本的末尾，不改变原数组
   value2 = value1.slice(a,b)  [a,b) 左闭右开区间
   截取原数组的部分区间到新的数组中，返回的也是新的数组
7.增删改数组  splice()
	splice(a,b) 从a开始删除b个：[1,2,3,4,5].splice(0,2) ->>[1,2]，返回截取的
	数组，原数组也改变
	splice(a,0,b) 在a数后插入b   
	splice(a,b,c) 从a开始删除b数，然后插入c
	始终都会返回一个新数组
8.位置操作符
	indexOf(a,b)  从头开始找a的第一个位置，找不到返回-1   从位置b开始搜索
	lastIndexOf()  从末尾开始
9.迭代方法
  every(functionFor) 该函数对数组中每一项返回true
  some(functionFor)		该函数对数组中某一项返回true
  filter() 返回一个数组，使数组中的每一项都满足该函数返回true 
  map()  返回的数组的每一项都是在原始数组中的对应项上运行传入函数的结果
  forEach()  对每一项运行传入的函数，没有返回值
10，归并方法
 reduce(function(prev,cur,index,Array){return prev+cur;})和reduceRight()  

补充：字符串方法
stringValue.trim() 去除左右空格
stringValue.toLowerCase()转化为小写
stringValue.toUpperCase()转化为大写
spilt()  以指定分割符将字符串分割成多个子字符串，并把结果放到一个数组中



function test(){
	var args = [].slice.call(arguments);
	return args;
	args.reduce(function(prev,next){
		return prev+next;
	})
}
test(1,2)