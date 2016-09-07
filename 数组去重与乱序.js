1.遍历新数组中每一个与原数组项比较，存在相等值跳过；不存在就推入新数组中
function unique (arr) {
	var newArr = [];
	for (var i=0;i<arr.length;i++) {
		for (var j=0;j<newArr.length;j++) {
			if (newArr[j] === arr[i]) {
				break;
			}
		}
		if (j == newArr.length){
			newArr.push(arr[i])
		}
	}
	return newArr;
} 
2.通过indexOf来判断是否存在相等项
function unique (arr) {
	var newArr = [];
	for(var i=0;i<arr.length;i++) {
		(newArr.indexOf(arr[i])==-1)&&newArr.push(arr[i]);
	}
	return newArr;
}
3.通过filter简化
function unique (arr) {
	var newArr = arr.filter(function(item ,index ,array) {
		return array.indexOf(item) ==index
	})
	return newArr;
}
4.ES6去重
  Set类似数组，成员唯一  add,delete,has,size等方法
  function unique (arr) {
  	var newArr = Array.from(new Set(arr));
  	return newArr;
  }
