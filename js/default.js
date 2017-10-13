mui.plusReady(function(){
		if(plus.storage.getItem("$identityType")){
			var identityT = JSON.parse(plus.storage.getItem("$identityType")).identityType;
		}else{
			var identityT = 6;
		}
	//var userId = plus.storage.getItem('$userId'); 
		var userId = 49; 
})