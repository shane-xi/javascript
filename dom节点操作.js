html5 classList API
	<li class = "a b c"></li>li>
element.classList; 返回类名  以数组形式["a","b","c"]
增删改查
element.classList.add('d','e');
element.classList.remove('a','b');
element.classList.contains('')   返回布尔值
element.classList.toggle('a')   存在消掉，不存在补上

getElementById
getElementsByClassName
getElementsByTagName
querySelector 返回第一个元素
querySelectorAll  返回NodeList
节点的增删改查
firstElementChild,lastElementChild,previousElementSibling,nextElementSibling
document.createDocumentFragment()
document.createElement()
document.createTextNode()
parent.appendChild(child)
insertBefore(newElement,targetElement)
insertAfter没有:通过他的父节点，判断目标节点是否是最后一个节点
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}else {
		parent.insertBefore(newElement,targetElement.nextSibling)
	}
}
getAttribute
setAttribute
removeAttribute
hasChildnodes


JQ
清空节点  empty()

css3  transition 过渡
	  transform  变换
	  animation  动画

