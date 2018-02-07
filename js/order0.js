//再来一单
function comeOnAgain(orderNo,cusId){
	plus.nativeUI.showWaiting();
	mui.plusReady(function(){
		var identityT = JSON.parse(plus.storage.getItem("$identityType")).identityType;
		var userId = plus.storage.getItem('$userId');
		var oldToken = plus.storage.getItem('oldToken');
		mui.ajax(serverUrl + '/app/materialList/again/add',{
			data:{'userId':userId,'identityType':identityT,'orderNumber':orderNo},
			dataType:'json',
			type:'post',
			timeout:10000,
			headers:{"Authorization":oldToken},
			success:function(data,type,xhr){
				console.log('再来一单',data);
				if(data.code == 0){
					mui.toast(data.message || '操作成功');
					var timeY0 = setTimeout(function(){
						mui.fire(plus.webview.getWebviewById('cart.html'),'refresh');
						openview({
							view:'../../cart.html',
							id:'cart',
							extrasobj:{page:1,cusid:cusId}
						})
					},500)
				}else{
					mui.toast(data.message || '操作失败');
					plus.nativeUI.closeWaiting();
				}
			},
			error:function(xhr,type,errorThrown){
				console.error('再来一单，响应失败  !');
				mui.toast('当前网络不好，请重试');
				plus.nativeUI.closeWaiting();
			}
		});
	})
}

//申请退货
function openReturns(orderNo,cusId){
	openview({
		view:'myOrderReturns.html',
		id:'myOrderReturns',
		extrasobj:{
			orderNo:orderNo,
			cusId:cusId
		}
	})
}

//打开订单物流
function goOrderWL(orderNo){
	openview({
		view:'myOrderWL.html',
		id:'myOrderWL',
		extrasobj:{
			orderNo:orderNo
		}
	})
}

//取消订单
function cancelOF(pageType,cancelParentId){
	mui.plusReady(function(){
		var identityT = JSON.parse(plus.storage.getItem("$identityType")).identityType;
		var userId = plus.storage.getItem('$userId');
		var oldToken = plus.storage.getItem('oldToken');

		mui.ajax(serverUrl + '/app/cancelOrder/cancelReasons',{//获取取消原因
			data:{'userId':userId,'identityType':identityT},
			dataType:'json',
			type:'post',
			timeout:10000,
			headers:{"Authorization":oldToken},
			success:function(data,type,xhr){
				console.log('取消原因',data);
				if(data.code == 0){
					document.getElementById('cancelDiv0').innerHTML = template('cancelDiv0S',{list:data.content});
				}
			},
			error:function(xhr,type,errorThrown){
				console.error('取消原因，响应失败  !');
			}
		});
		$('.operating1').click(function(){//点取消
			$('#cancelOrder').css('display','none');
			resetChoose();
		})
		$('.cancelDiv').click(function(){//点遮罩
			$('#cancelOrder').css('display','none');
			resetChoose();
		})
		$('.cancelMin').click(function(){
			event.stopPropagation();
		})
		function resetChoose(){//重置勾选
			$(".reasonInfo[type='radio']:checked").attr("checked",false);
		}
		window.cancelFun = function(orderNumber,that){
			var isCance = confirm(
					'1、订单一旦取消后，无法恢复。\n'+
					'2、订单取消后，已支付的金额将会在一个工作日内原路退还。\n'+
					'3、限时促销等购买优惠可能一并取消。\n'+
					'4、因商品已分拣等原因可能会导致订单取消失败。'
				);
			isCance && $('#cancelOrder').css('display','table');
			//点确定
			document.getElementsByClassName('operating3')[0].onclick = function(){
				var reasonInfo = $(".reasonInfo[type='radio']:checked").val();
				var remarksInfo = $('#remarksInfo').val();

				if(!reasonInfo){
					alert('请选择原因');
				}else{
					var dataObj = {
						'userId':userId,'identityType':identityT,
						'orderNumber':orderNumber,
						'reasonInfo':reasonInfo,'remarksInfo':remarksInfo
					};
					console.log(dataObj);
					mui.ajax(serverUrl + '/app/returnOrder/cancel/order',{//获取取消原因
						data:dataObj,
						dataType:'json',
						type:'post',
						timeout:10000,
						headers:{"Authorization":oldToken},
						success:function(data,type,xhr){
							console.log('取消订单',data);
							if(data.code == 0){
								mui.toast(data.message || '取消订单成功');
								mui.fire(plus.webview.getWebviewById('center.html'),'OrderNumR');
								
								$('#cancelOrder').css('display','none');
								resetChoose();
								if(pageType == 'detail'){
									location.reload();
									mui.fire(plus.webview.getWebviewById('myOrderList'),'cancelrefresh2',{cancelParentId:cancelParentId});
								}else{
									$(that).parentsUntil('.orderList').find('.stateSpan').html('已取消');
									$(that).parentsUntil('.orderList').find('.stateSpan2').css('display','none');
								    $(that).parent().find('span').each(function(index,ele){
//							    	 		if($(ele).html() != '取消订单'){
							    	 			$(ele).css('display','none');
//							    	 		}
								    })
								}
							}else{
								mui.toast(data.message);
							}
						},
						error:function(xhr,type,errorThrown){
							console.error('取消订单，响应失败  !');
						}
					});
				}
			}
		}
	});
}
