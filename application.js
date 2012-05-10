(function(){
"use strict"
	var removeTab = function(text){
		var reg=/^(\t+)\S+.*/gmi,match,dTcount=99999;
		while(match = reg.exec(text)){
			dTcount > match[1].length && (dTcount = match[1].length);
		}
		return text.replace(new RegExp("^\\t{"+dTcount+"}","gmi"),"");
	},
	createElement = function(type,attrs,childs){
		var element = document.createElement(type), key;
		if(attrs){
			for(key in attrs){
				if(attrs.hasOwnProperty(key)){
					if(key === "id" || key === "innerHTML" || key === "value" || key === "src" || key === "className"){
						element[key] = attrs[key];
					}else{
						element.setAttribute(key, attrs[key]);
					}
				}
			}
		}
		if(childs){
			if(!(childs instanceof  Array)){
				childs = [childs];
			}
			childs.forEach(function(el){
				element.appendChild(el);
			});
		}
		return element;
	},
	showCode=function(slide){
		[{className :"html", selector :".demo"},
		{className :"css",	selector :"style"},
		{className :"js", selector :"script"}].forEach(function(vars){
			var el = slide.querySelector(vars.selector);
			if(el){
				slide.appendChild(createElement("div",{
					"className" : "code " + vars.className
				},createElement("textarea",{
					"innerHTML":removeTab(el.innerHTML),
					"readonly":"readonly",
					"wrap":"off"
				})));
			}
		});
	};

	window.addEventListener("load",function(){
		var slides = document.querySelectorAll(".slide"),
		section = document.querySelector(".slides"),
		next = document.querySelector("nav .next"),
		prev = document.querySelector("nav .prev"),
		position = 0,
		init=function(){
			var i;
			goTo(0);
			next.addEventListener("click",function(){goTo(position+1);});
			prev.addEventListener("click",function(){goTo(position-1);});
			for(i=0;i<slides.length;i++){
				showCode(slides[i]);
			}
		},
		goTo = function(index){
			index < 0 && (index = 0);
			index >= slides.length && (index=slides.length-1);
			section.style.webkitTransform  = "translate3d("+index*-1024+"px,0px,0px)";
			position = index;
		};

		init();
	});
})();