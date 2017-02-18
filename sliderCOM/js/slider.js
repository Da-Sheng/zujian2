/*
 *options:
 * oDiv
 * imgs
 * hrefs
 * 
 * */
function Slider(options){
	if(!options){
		throw new Error("请传入参数");
	}else if(!options.oDiv){
		throw new Error("请给options传入一个属性叫oDiv且包含一个div对象")
	}else if(!Array.isArray(options.imgs)){
		throw new Error("请传入链接数组");
	}
	this.oDiv=options.oDiv;
	this.imgs=options.imgs;
	this.hrefs=options.hrefs;
	this.height=options.height;
	this.width=$.getScreenWidHei().width;

	this.index=0;
	this.saveIndex=true;
	this.timer=null;
	
	this.init();
}

Slider.prototype.init=function(){
	var oLink=document.createElement("link");
	oLink.type="text/css";
	oLink.rel="stylesheet";
	oLink.href="css/slider.css";
	document.getElementsByTagName("head")[0].appendChild(oLink);
	//创建图片
	this.creatUl();
	//创建导航点
	this.creatA();
	//创建翻页
	this.creatDiv();

	
	//获取标签
	this.wrapper=document.querySelector("#banner");
	this.ul1=this.oDiv.querySelector("#innerBanner_img");
	this.ul2=this.oDiv.querySelector("#innerBanner_point");
	this.lis=this.ul1.getElementsByTagName("li");
	this.btns=this.ul2.getElementsByTagName("li");
	this.oPage=this.oDiv.querySelector("#bannerUpDown");
	this.oPageDiv=this.oDiv.querySelector("#bannerUpDown01").getElementsByTagName("div");
	this.pageUp=this.oPageDiv[0];
	this.pageDown=this.oPageDiv[1];
	
	//轮播
	this.autoPlay();
	//轮播控制
	this.sliderContorl();
	//切换按钮
	this.changeBtns();
	//显示翻页标签
	this.showPage();
	//点击翻页修改页数
	this.pageOnclick();
	
}
//创建幻灯片基础图
Slider.prototype.creatUl=function(){
	var oUl=document.createElement("ul");
	this.oUl=oUl;
	$.addClassName(oUl,"posRea");
	oUl.setAttribute("id","innerBanner_img");
	var oLi=null,oA=null;
	for(var i=0;i<this.imgs.length;i++){
		oLi=document.createElement("li");
		oA=document.createElement("a");
		oLi.style.opacity=0;
		oA.height=this.height;
		oA.style.backgroundImage="url("+this.imgs[i]+")";
		$.addClassName(oLi,"posAbs");
		oLi.appendChild(oA);
		oUl.appendChild(oLi);
	}
	$.addClassName(this.oUl.firstChild,"changeOpacity");
	this.oDiv.appendChild(oUl);
}
//创建导航点及总链接块

Slider.prototype.creatA=function(){
	var oA=document.createElement("a");
	$.addClassName(oA,"clearfix");
	oA.setAttribute("id","bannerUpDown");
	oA.setAttribute("target","_blank");
	var oUl=document.createElement("ul");
	$.addClassName(oUl,"left");
	oUl.setAttribute("id","innerBanner_point");
	var oLi=null;
	for(var i=0;i<this.hrefs.length;i++){
		oLi=document.createElement("li");
		oUl.appendChild(oLi);
	}
	oA.appendChild(oUl);
	this.oDiv.appendChild(oA);
}
//创建翻页块
Slider.prototype.creatDiv=function(){
	var aoDiv=document.createElement("div");
	$.addClassName(aoDiv,"posAbs");
	aoDiv.setAttribute("id","bannerUpDown01");
	var twoDiv=null;
	oneDiv=document.createElement("div");
	twoDiv=document.createElement("div");
	aoDiv.appendChild(oneDiv);
	aoDiv.appendChild(twoDiv);
	this.oDiv.appendChild(aoDiv);
}
//轮播
Slider.prototype.autoplay=function(){
	this.show(this.index);
	this.timer=setTimeout(this.autoplay.bind(this),3000);
	this.index++;
	this.index>this.imgs.length-1 && (this.index=0);
}
//绑定当前可视界面
Slider.prototype.show=function(a){
	for(var i=0;i<this.imgs.length;i++){
		this.btns[i].classList.remove('changeOpacity2');
	}	
	for(var i=0;i<this.lis.length;i++){
		this.lis[i].classList.remove('changeOpacity');
	}
	$.addClassName(this.lis[a],"changeOpacity");
	$.addClassName(this.btns[a],"changeOpacity2");
	this.oPage.href=this.hrefs[a];
}
////初始可视
//Slider.prototype.setFirst=function(){
//	$.addClassName(this.lis[0],"changeOpacity");
//	$.addClassName(this.btns[0],"changeOpacity2");
//	console.log(this.lis[0]);
//	console.log(this.btns[0]);
//}
//切换按钮功能
Slider.prototype.changeBtns=function(){
	var that=this;
	for(i=0;i<this.btns.length;i++){
		this.btns[i].index=i;
		this.btns[i].onmouseover=function(){
			that.index=this.index;
			that.show(that.index);
			clearTimeout(that.timer2);
		}
	}
}

//轮播
Slider.prototype.autoPlay=function(){
	this.show(this.index);
	this.index++;
	this.saveIndex=true;
	this.index>=6&&(this.index=0);
	this.timer=setTimeout(this.autoPlay.bind(this),3500);
}
//控制鼠标移动暂停和播放
//Slider.prototype.sliderContorl=function(){
//	this.oPage.onmouseover=function(e){
//		clearTimeout(this.timer);
//		clearTimeout(this.timer2);
//	}.bind(this);
//	this.oPage.onmouseout=function(){
//		this.timer2=setTimeout(this.autoPlay.bind(this),2000);
//	}.bind(this);
//}
Slider.prototype.sliderContorl=function(){
	this.oPage.addEventListener("mouseover",this.clearTim.bind(this),false);
	this.oPage.addEventListener("mouseout",this.addTim.bind(this),false);
}
Slider.prototype.clearTim=function(){
	clearTimeout(this.timer);
	clearTimeout(this.timer2);
}
Slider.prototype.addTim=function(){
	this.timer2=setTimeout(this.autoPlay.bind(this),2000);
}
//翻页
Slider.prototype.pageImg=function(x){
	if(this.saveIndex){
		this.index--;
		this.saveIndex=false;
	}
	this.index+=x;
	if(this.index>5){
		this.index=0;
		this.saveIndex=0;
	}else if(this.index<0){
		this.index=5;
		this.saveIndex=5;
	}
	this.show(this.index);
}


//点击改变页数
Slider.prototype.pageOnclick=function(){
	this.pageUp.onclick=function(){
		this.pageImg(-1);
	}.bind(this);
	this.pageDown.onclick=function(){
		this.pageImg(1);
	}.bind(this);
}

//显示上下页标签
Slider.prototype.showPage=function(){
	this.oPage.onmouseover=function(){
	this.pageUp.className="changeDivOpacity";
	this.pageDown.className="changeDivOpacity";
	}.bind(this);
	this.oPage.onmouseout=function(){
		this.pageUp.className="";
		this.pageDown.className="";
	}.bind(this);
}
