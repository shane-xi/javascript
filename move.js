function startMove(obj,json,fn){
		//1.清除定时器	
        clearInterval(obj.timer);
        //2.
        obj.timer=setInterval(function(){
            var flag=true;//假设所有都到达目标值
        	for(var attr in json){            
        	var icur=0;
	        if (attr=="opacity") {
	            icur=Math.round(parseFloat(getStyle(obj,attr))*100);
	        }
	        else{
	            icur=parseInt(getStyle(obj,attr));
	        }

        //3.算速度
           var speed=(json[attr]-icur)/8;
               speed=speed>0?Math.ceil(speed):Math.floor(speed);  
		//4.检测停止                    
            if(icur!=json[attr]){
                flag=false;
                if(attr=="opacity"){
                   obj.style.filter="Alpha(opacity="+(icur+speed)+")";
                   obj.style.opacity=(icur+speed)/100;   
                    }
                else{
                obj.style[attr]=icur+speed+"px";
              }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
      }
        }
      },30)
    }

        //获取行内元素
    function getStyle(obj,attr){
        //针对IE浏览器
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }
        //针对Firefox浏览器
        else{
            return getComputedStyle(obj,false)[attr];
        }
    } 