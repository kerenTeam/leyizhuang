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

//banner跳转
window.bannerGo = function(url, name, route) {
	var route = route || 'one';
	if(url.indexOf('http')>-1 || url.indexOf('HTTP')>-1){//远程
		if(route == 'one'){//层级
			var bannerTplHtml = 'bannerTpl.html';
		}else{
			var bannerTplHtml = '../bannerTpl.html';
		}
		if(url.indexOf('pro')>-1){//高级功能的h5
			localStorage.Burlname=url;
			openview({
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name,
					type:'pro'
				}
			})
		}else{
			openview({//用于普通页面 (如微信公众号)
				view: bannerTplHtml,
				id: "bannerTpl",
				extrasobj: {
					bannerUrl: url,
					bannerName: name
				}
			})
		}
	}else if(url.indexOf('&')>-1 ){//本地
		var localId = url.split('&')[1],
			localUrl = url.split('&')[0],
			localUId = url.split('&')[2] || -1;
		if (url.indexOf('tickets')>-1) {/*充话费*/
			if(plus.storage.getItem('myToken')){
				 openview({
					view: localUrl,
					create: true,
					extrasobj: {
						storeId:localId,//商铺主页
						goodcatId:localId,//特色馆分类
						goodsId:localId,//商品主页
						activityId:localId,//活动主页
						storeCouponId:localId,//优惠主页
						newsId:localId,//帖子详情： 帖子id
						userId:localUId,//帖子详情： 帖子userId
						Bcity:localId//优惠卷
					}
				})
			}else{//没登陆直接打开登录页面
				mui.toast('请登录');
				openview({
					view:'login.html'
				});
			}
		}else{
			openview({
				view: localUrl,
				create: true,
				extrasobj: {
					storeId:localId,//商铺主页
					goodcatId:localId,//特色馆分类
					goodsId:localId,//商品主页
					activityId:localId,//活动主页
					storeCouponId:localId,//优惠主页
					newsId:localId,//帖子详情： 帖子id
					userId:localUId,//帖子详情： 帖子userId
					shopId:localUId,//爱购商品详情
					Bcity:localId//优惠卷

				}
			})
		}

	}


}

/*自定义分享*/
var shares=null;
mui.plusReady(function(){
	plus.share.getServices(function(s){
		shares={};
		for(var i in s){
			//console.error('成功')
			var t=s[i];
			shares[t.id]=t;
		}
	}, function(e){
		outSet('获取分享服务列表失败：'+e.message);
	});
})

function showSfun1(msg,fun1,fun0){
	if(!document.getElementById('shareWrap10')){
		var pathStr = '';
		if(msg.myIsIndex){
			pathStr = '../';
		}
		if(!/android/i.test(navigator.userAgent)){
			msg.thumbs = msg.pictures = [''];
		}
		var shareWrap10 = document.createElement('div');
		shareWrap10.id = 'shareWrap10';
		shareWrap10.innerHTML = '<div class="shareWrap1"></div>'+
		'<div class="Scontent1">'+
			'<h3 class="h3">分享</h3>'+
			'<div class="mui-row">'+
				'<div class="mui-col-sm-3 mui-col-xs-3 shareBtn">'+
					'<img src="'+pathStr+'img/share/weixing.png" class="aClick2"/>'+
					'<br />微信好友'+
				'</div>'+
				'<div class="mui-col-sm-3 mui-col-xs-3 shareBtn">'+
					'<img src="'+pathStr+'img/share/pengyouquan.png" class="aClick2"/>'+
					'<br />朋友圈'+
				'</div>'+
				'<div class="mui-col-sm-3 mui-col-xs-3 shareBtn">'+
					'<img src="'+pathStr+'img/share/QQ.png" class="aClick2"/>'+
					'<br />QQ(空间)'+
				'</div>'+
				'<div class="mui-col-sm-3 mui-col-xs-3 shareBtn">'+
					'<img src="'+pathStr+'img/share/weibo.png" class="aClick2"/>'+
					'<br />新浪微博'+
				'</div>'+

			'</div>'+
			'<h3 id="cancelS1" class="h4 fineT aClick2">取消</h3>'+
		'</div>';
		document.body.appendChild(shareWrap10);
	}

	function hideSfun1(){
		document.getElementsByClassName('shareWrap1')[0].style.zIndex = '-1';
		document.getElementsByClassName('shareWrap1')[0].style.opacity = '0';
		document.getElementsByClassName('Scontent1')[0].style.opacity = '0';
		document.getElementsByClassName('Scontent1')[0].style.bottom = '-500px';
	}
	document.getElementById('cancelS1').onclick = function(){
		hideSfun1();
	}
	document.getElementsByClassName('shareWrap1')[0].onclick = function(){
		hideSfun1();
	}
	document.getElementsByClassName('shareWrap1')[0].style.zIndex = '999';
	document.getElementsByClassName('shareWrap1')[0].style.opacity = '1';
	document.getElementsByClassName('Scontent1')[0].style.opacity = '1';
	document.getElementsByClassName('Scontent1')[0].style.bottom = '0px';
	function shareAction(sb) {
		if(!sb||!sb.s){
			mui.toast('无效的分享服务！');
			return;
		}
		msg.extra = {scene:sb.x}//区分微信 还是朋友圈 有效
		if(sb.s.authenticated){
			shareMessage(msg, sb.s);
			hideSfun1();
		}else{
			sb.s.authorize(function(){//新浪微博止步于此
				shareMessage(msg,sb.s);
			}, function(e){
				mui.toast('授权失败');
				hideSfun1();
			});
		}
	}
	function shareMessage(msg, s){
		s.send(msg, function(){
			mui.toast('分享成功');
			if(fun1){fun1()};
		}, function(e){//alert('分享到"'+s.description+'"失败: '+JSON.stringify(e))
			mui.toast('分享失败');
			if(fun0){fun0()};
		});
	}
	// 分享链接
	function shareHref(index){
		var shareBts=[];
		if(!shares.weixin){mui.toast('请重试')};
		var ss=shares['weixin'];
		ss&&(shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}),
		shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}));
		ss=shares['qq'];
		ss&&shareBts.push({title:'QQ',s:ss});
		ss=shares['sinaweibo'];
		ss&&shareBts.push({title:'新浪微博',s:ss});
		shareAction(shareBts[index]);/*调用分享*/
	}
	var shareBtns = document.getElementsByClassName('shareBtn');
	[].forEach.call(shareBtns,function(ele,index){
		ele.onclick = function(){
			shareHref(index);
		}
	})
}

	//示例
	//var msg = {
	//	title:'分享测试',
	//	content:'分享测试内容',
	//	href:'http://hiji.hifete.com',
	//	thumbs:['https://b-ssl.duitang.com/uploads/item/201709/08/20170908120614_mN5TE.thumb.224_0.jpeg'],
	//	pictures:['https://b-ssl.duitang.com/uploads/item/201709/08/20170908120614_mN5TE.thumb.224_0.jpeg']
	//
	//};
	//showSfun1(msg,function(){},function(){});
//分享结束