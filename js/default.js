var serverUrl = 'http://119.23.149.7:9999';
var oCms = 'http://120.78.73.217:8090';

//解决input输入时被键盘挡住
$("input").focus(function(){
 //在输入框获取焦点后，窗口改变的话，执行事件
   $("html,body").animate({scrollTop: $(this).offset().top-100}, 300);
});
