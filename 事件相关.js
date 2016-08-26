addEventListener()    触发    dispatch  $ trigger()
removeEventListener() 
attachEvent()
detachEvent()

event 
type  事件类型
target   目标事件
e.stopPropagation()	阻止事件的传递    不仅是冒泡，也包括捕获
e.preventDefault()   阻止默认行为

IE中
window.event
type 
srcElement 
e.cancelBubble();
e.returnValue = false;

事件代理
1、可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件就非常棒
2、可以实现当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适
