(function(window){
	var $=IGEEK={}
//	添加class
	IGEEK.addClassName=function(obj,className){
		if(obj.className==''){
			//如果没有class则直接添加一个class名
			obj.className=className;
		}
		else{
				//有class的话则原来的class加上添加的class
				obj.className=obj.className+" "+className;
			}
	}
//	鼠标拖拽事件
	IGEEK.drag=function(aBlock){
		aBlock.onmousedown=function(event){
		var e=event||window.event;
		e.preventDefault();
		disX=e.clientX-this.offsetLeft;
		disY=e.clientY-this.offsetTop;
		document.onmousemove=function(event){
			var e=event||window.event;
			e.preventDefault();
			var x=e.clientX;
			var y=e.clientY;
			aBlock.style.left=x-disX+'px';
			aBlock.style.top=y-disY+'px';		
		}
	}
		document.onmouseup=function(){
			document.onmousemove=null;
		}
	}
//	滚轮滚动事件
	IGEEK.mouseWheelHandle=function(obj,handle){
		var info = navigator.userAgent;
	    var down = null;//用来记录滚轮的上下,down=true表示向下
	    if(info.indexOf("Firefox") !=-1){
	        obj.addEventListener("DOMMouseScroll",function(event){
	            var e = event ||window.event;
	                if(e.detail>0){
	                    //不做具体的事情
	                    down = true;
	                }else{
	                    down = false;            
	                }
	                //调用外部传递的事件处理程序;
	                handle(down,e);
	                //apply 可以让每一个函数都有一个自带的方法叫做apply,
	                //这个方法可以切换函数的运行环境,如果函数需要传递参数,以数组的形式传递
	                handle.apply(obj,[down,e]);
	        },false);
	
	    }else{
	
	        obj.onmousewheel = function(event){
	            var e = event || window.event;
	            if(e.wheelDelta >0){
	                down =false;
	            }else{
	                down = true;
	            }
	            handle(down,e);
	            handle.apply(obj,[down,e]);
	            //call 每个函数也都有一个call方法,他的功能和apply一样,
	            //都可以实现切换一个函数的调用者(运行环境);
	            //call和apply唯一的区别在于:函数有参数的时候,传递方式不一样,call
	            //依次传递参数,参数用逗号隔开即可
	            handle.call(obj,down,e);
	        }
	    }
	}
	//name是否存在obj父类的原型
	//如果name存在实例中返回false，在原型中返回true
	IGEEK.hasPrototypeProperty=function(obj,name){
		return !obj.hasOwnProperty(name)&&(name in obj);
	}
	//获取窗口相对屏幕位置
	IGEEK.getLeftPos=function(){
		return (typeof window.screenLeft == "number")?window.screenLeft:window.screenX;
	}
	IGEEK.getTopPos=function(){
		return (typeof window.screenTop == "number")?window.screenTop:window.screenY;
	}
	//寄生组合继承
	IGEEK.inheritPrototype=function(subType,superType){
				var prototype=Object(superType.prototype);
				prototype.constructor=subType;
				subType.prototype=prototype;
			}
	//检测插件（ie无效）
	IGEEK.hasPlugin=function(name){
		var name=name.toLowerCase();
		for(var i=0;i<navigator.plugins.length;i++){
			if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
				return true;
			}
		}
		return false;
	}
	//识别呈现引擎
	IGEEK.myClient=function(){
		var engine={
			//呈现引擎
				ie:0,
				gecko:0,
				webkit:0,
				khtml:0,
				opera:0,
				//具体版本号
				ver:null
		};
		//呈现引擎,平台和设备
		return {
			engine:engine
		};
	}
	//获取dom里的id匹配元素（格式为字符串）
	IGEEK.getElementYo=function(id){
		if(document.getElementById){
			return document.getElementById(id);
		}else if(document.all){  //ie5以下不支持
			return document.all[id];
		}else{
			throw new Error("No way to retrieve element!");
		}
	}
	
	//NodeList转数组
	IGEEK.convertToArray=function(nodes){
		var arrayL = null;
		try {
			arrayL = Array.prototype.call(nodes,0)
		} catch(ex){
			arrayL=new Array;
			for(var i=0;i<nodes.length;i++){
				arrayL.push(nodes[i]);
			}
		}
		return arrayL;
	}
	//根据id取得DOM2级样式
	IGEEK.getDomStyle=function(id,whichStyle){
		var myId = document.getElementById(id);
		var computedStyle = document.defaultView.getComputedStyle(myId,null);
		return computedStyle[whichStyle];
	}
	//获取屏幕窗口大小,返回一个对象，这个对象包含属性width,height
	IGEEK.getScreenWidHei=function(){
		var obj=new Object();
		var pageWidth=window.innerWidth;
		var pageHeight=window.innerHeight;
		if(typeof pageWidth != "number"){
			if (document.compatMode == "CSS1Compat"){
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
			}else {
				pageWidth = document.body.clientWidth;
				pageHeight = document.body.clientHeight;
			}
		}
		obj.width=pageWidth;
		obj.height=pageHeight;
		return obj;
	}
	//取消冒泡事件流（未测试）
	IGEEK.canelEventBubble=function(obj1,eventStr,func,obj2){
		var handler=func;
		obj1.addEventListener(eventStr,handler,false);
		obj2.removeEventListener(eventStr,handler,false);
	}
	window.$=$;
})(window);