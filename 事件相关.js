addEventListener()
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
