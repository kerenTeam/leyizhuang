//懒加载方法
window.lazyLoad = function(init,limit){
	var limit = limit || 100;
	var loadPics = mui('.loadPics');
	var H = window.innerHeight || 1000;//可视窗口高度(避免第一次不加载)
	window.onscroll = function(){
		if(H == 0){H = window.innerHeight;}
		if(loadPics.length){
		    var S = document.documentElement.scrollTop||document.body.scrollTop;   //滚动条滚过高度
		    [].forEach.call(loadPics,function(img,index){
	         	if(!img.getAttribute('data-src')){return}
		        //console.error( H + S - limit +'===='+ getTop(img) +'====='+loadPics.length)
	         	if(H + S - limit > getTop(img)){
	             	img.src=img.getAttribute("data-src");
	             	img.removeAttribute("data-src");
             		img.style.backgroundImage = 'url()';
	             	if(img.classList.contains('loadPics')){//减少每次滚动时遍历个数
	             		img.classList.remove('loadPics');
	             		loadPics = mui('.loadPics');
	             	}
	         	}
	        })
		}
	}
	window.onscroll();
	function getTop(e){//获取元素距离顶部高度方法
	    var T = e.offsetTop;
	    while(e = e.offsetParent ){
	        T += e.offsetTop
		}
	    return T
	}
}