var serverUrl = 'http://app.leyizhuang.com.cn';//远程
//var serverUrl = 'http://119.23.149.7:9999';//本地
mui.plusReady(function(){
	if(plus.storage.getItem('SURL')){
		serverUrl = plus.storage.getItem('SURL');
	}
	console.log('当前IP'+serverUrl)
})


var oCms = 'http://120.77.14.185:6789';
//var oCms = 'http://120.78.73.217:8090';//old

//解决input输入时被键盘挡住
$("input").focus(function(){
 //在输入框获取焦点后，窗口改变的话，执行事件
   $("html,body").animate({scrollTop: $(this).offset().top-100}, 300);
});

/*
 * 顾   客 : 6
 * 装饰公司(项目经理) : 2 (10000010001)
 * 导   购 : 0
 * 配 送 员 : 1
 * 工   人 : 3
 */

