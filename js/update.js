var wgtVer=null;
var wgtUrl = '';
var newVer = '';
var typeNow = null;
function plusReady(){
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        wgtVer=inf.version;
        console.log("当前应用版本："+wgtVer);
    });
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener('plusready',plusReady,false);
}
if(/android/i.test(navigator.userAgent)){
	typeNow = 1;
}else{
	typeNow = 2;
}

// android检测更新（和ios公用）
function checkUpdate(hide,ios){
	!hide && plus.nativeUI.showWaiting('正在检查更新...',{width:'130px',height:'110px'});
	var oldtoken = plus.storage.getItem('oldToken');
	mui.ajax(oCms + '/index.php/ApiCms/appVersion',{
		data:{type:typeNow},
		dataType:'json',
		type:'post',
		timeout:10000,
		headers:{"token":oldtoken},
		success:function(data,type,xhr){
			console.log('检测更新'+JSON.stringify(data));
			if(ios){
				wgtUrl = data.app.appPath;//下载地址 ios
				newVer = data.app.appversion;//远程版本号（ios
			}else{
				wgtUrl=  data.app.appPath;//下载地址 android
				newVer = data.app.appversion;//远程版本号（android
			}
			if(newVer > wgtVer){//升级
				console.error('开始下载');
                downWgt(hide,wgtUrl,ios);  // 下载升级包
            }else{
            		plus.nativeUI.closeWaiting();
                !hide && plus.nativeUI.alert("当前版本为最新版本！");
            }
		},
		error:function(xhr,type,errorThrown){
			console.error('操作响应失败');
		}
	});
}
// 下载wgt文件

function downWgt(hide,downurl,ios){
	!hide && plus.nativeUI.showWaiting('正在下载...',{width:'130px',height:'110px'});
    if(downurl.indexOf('http') == -1){
    		downurl = oCms+"/"+downurl;
    }
    console.log('下载地址' +downurl);
    plus.downloader.createDownload(downurl, {filename:"_doc/update/"}, function(d,status){
    		console.log('下载状态',status);
        if ( status == 200 ) {
            console.log("下载wgt成功："+d.filename);
            if(!hide){
	            	/*plus.nativeUI.confirm("下载完成，是否马上升级！",function(e){
	            		var sure = (e.index == 0) ? "确定" : "取消";
	            		if (sure == '确定') {
	            			installWgt(d.filename,hide); // 安装wgt包
	            		}
	            	})*/
				installWgt(d.filename,hide); // 安装wgt包
            }else{
            		installWgt(d.filename,hide,ios); // 安装wgt包
            }


        } else {
            console.log("下载wgt失败！");
            !hide && plus.nativeUI.alert("下载文件失败！");
        }
    }).start();
}
// 安装应用资源
function installWgt(path,hide,ios){
    !hide && plus.nativeUI.showWaiting('正在安装...',{width:'130px',height:'110px'});
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        if(hide){//静默更新
	        	if(path.indexOf('apk')>-1){
	        		plus.nativeUI.alert("软件更新包已通过wifi预加载下载成功， 请安装新版软件！",function(){
		            plus.runtime.quit();
		        });
	        }else{
	    			plus.nativeUI.alert("软件已通过wifi预加载优化完成， 重启完成操作！",function(){
	            		plus.runtime.restart();
		        });
	        }
        }else{
        		plus.nativeUI.alert("更新完成， 重启完成升级！",function(){
	            plus.runtime.restart();
	        });
        }

    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        if(!hide){
	        	if (e.message.indexOf('不匹配')>-1) {
	        		plus.nativeUI.alert("更新完成， 重启完成升级！",function(){
		            plus.runtime.restart();
		        });
	        	} else{
	        		plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
	        	}
        }
        //!hide && plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
    });
}
/*
 * 差异化升级流程：
 * 1.启动app后在plusReady里面首先获取app版本
 * 2.检查服务器版本
 * 3.服务器版本大于本地app版本下载升级包，提示安装和升级
 * 4.服务器版本小于等于本地版本时，不做任何操作
 * 5.重启即可玩升级
 */