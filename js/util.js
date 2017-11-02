var util = {
	options: {
		ACTIVE_COLOR: "#F05945",
		NORMAL_COLOR: "#8E8E90",
		subpages:['page/goodList.html','cart.html','center.html']
//		subpages: ["html/tab-webview-subpage-chat.html", "html/tab-webview-subpage-contact.html"]
	},
	/**
	 *  简单封装了绘制原生view控件的方法
	 *  绘制内容支持font（文本，字体图标）,图片img , 矩形区域rect
	 */
	drawNative: function(id, styles, tags) {
		var view = new plus.nativeObj.View(id, styles, tags);
		return view;
	},
	/**
	 * 初始化首个tab窗口 和 创建子webview窗口 
	 */
	initSubpage: function(aniShow) {
		var subpage_style = {
				top: 0,
				bottom: 51
			},
			subpages = util.options.subpages,
			self = plus.webview.currentWebview(),
			temp = {};
			
		//兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
		if(mui.os.android) {
			if(plus.navigator.isImmersedStatusbar()) {
				subpage_style.top += plus.navigator.getStatusbarHeight();
			}
			if(self.getTitleNView()) {
				subpage_style.top += 40;
			}
			
		}

		// 初始化第一个tab项为首次显示
		temp[self.id] = "true";
		mui.extend(aniShow, temp);
		// 初始化绘制首个tab按钮
		util.toggleNview(0);

		for(var i = 0, len = subpages.length; i < len; i++) {

			if(!plus.webview.getWebviewById(subpages[i])) {
				var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
				//初始化隐藏
				sub.hide();
				// append到当前父webview
				self.append(sub);
			}
		}
	},
	/**	
	 * 点击切换tab窗口 
	 */
	changeSubpage: function(targetPage, activePage, aniShow) {
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetPage]) {
			plus.webview.show(targetPage);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetPage] = "true";
			mui.extend(aniShow, temp);
			plus.webview.show(targetPage, "fade-in", 300);
		}
		//隐藏当前 除了第一个父窗口
		if(activePage !== plus.webview.getLaunchWebview()) {
			plus.webview.hide(activePage);
		}
	},
	/**
	 * 点击重绘底部tab （view控件）
	 */
	toggleNview: function(currIndex) {
		currIndex = currIndex * 2;
		// 重绘当前tag 包括icon和text，所以执行两个重绘操作
		util.updateSubNView(currIndex, util.options.ACTIVE_COLOR);
		util.updateSubNView(currIndex + 1, util.options.ACTIVE_COLOR);
		// 重绘兄弟tag 反之排除当前点击的icon和text
		for(var i = 0; i < 8; i++) {
			if(i !== currIndex && i !== currIndex + 1) {
				util.updateSubNView(i, util.options.NORMAL_COLOR);
			}
		}
	},
	/*
	 * 改变颜色
	 */
	changeColor: function(obj, color) {
		obj.color = color;
		return obj;
	},
	/*
	 * 利用 plus.nativeObj.View 提供的 drawText 方法更新 view 控件
	 */
	updateSubNView: function(currIndex, color) {
		var self = plus.webview.currentWebview(),
			nviewEvent = plus.nativeObj.View.getViewById("tabBar"), // 获取nview控件对象
			nviewObj = self.getStyle().subNViews[0], // 获取nview对象的属性
			currTag = nviewObj.tags[currIndex]; // 获取当前需重绘的tag

		nviewEvent.drawText(currTag.text, currTag.position, util.changeColor(currTag.textStyles, color), currTag.id);
	}
};


//var util = {
//	options: {
//		active_color:'#007aff',
//		normal_color:'#000',
//		subpages:['page/goodList.html','cart.html','center.html']
//	},
//	/**
//	 *  简单封装了绘制原生view控件的方法
//	 *  绘制内容支持font（文本，字体图标）,图片img , 矩形区域rect
//	 */
//	drawNative: function(id, styles, tags) {
//		var view = new plus.nativeObj.View(id, styles, tags);
//		return view;
//	},
//	/**
//	 * 初始化首个tab窗口 和 创建子webview窗口
//	 */
//	initSubpage: function() {
//		var subpage_style = {
//				top: '0px',
//				bottom: '51px'
//			},
//			subpages = util.options.subpages,
//			self = plus.webview.currentWebview(),
//			temp = {};
//			// 初始化第一个tab项为首次显示
//			temp[self.id] = "true";
//			mui.extend(aniShow, temp);
//			// 初始化绘制首个tab按钮
//			util.toggleNview(self.getStyle().subNViews[0], 0);
//
//		for(var i = 0, len = subpages.length; i < len; i++) {
//
//			if(!plus.webview.getWebviewById(subpages[i])) {
//				var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
//				//初始化隐藏
//				sub.hide();
//				// append到当前父webview
//				self.append(sub);
//			}
//		}
//	},
//	/**
//	 * 点击切换tab窗口
//	 */
//	changeSubpage: function(targetPage, activePage) {
//		//若为iOS平台或非首次显示，则直接显示
//		if(mui.os.ios || aniShow[targetPage]) {
//			plus.webview.show(targetPage);
//		} else {
//			//否则，使用fade-in动画，且保存变量
//			var temp = {};
//			temp[targetPage] = "true";
//			mui.extend(aniShow, temp);
//			plus.webview.show(targetPage, "fade-in", 300);
//		}
//		//隐藏当前 除了第一个父窗口
//		if(activePage !== plus.webview.getLaunchWebview()){
//			plus.webview.hide(activePage);
//		}
//	},
//	/**
//	 * 点击重绘底部tab （view控件）
//	 */
//	toggleNview: function(currObj, currIndex) {
//		var self = plus.webview.currentWebview();
//		// 重绘当前nview
//		self.updateSubNViews([{
//			id: currObj.id,
//			tags: [{
//				tag: 'font', //currObj.tag
//				id: currObj.id + 1,
//				position: currObj.tags[0].position,
//				text: currObj.tags[0].text,
//				textStyles: util.changeColor(currObj.tags[0].textStyles, util.options.active_color)
//			}, {
//				tag: 'font',
//				id: currObj.id + 2,
//				position: currObj.tags[1].position,
//				text: currObj.tags[1].text,
//				textStyles: util.changeColor(currObj.tags[1].textStyles, util.options.active_color)
//			}]
//		}])
//
//		// 重绘兄弟nview
//		for(var i = 0; i < 4; i++) {
//			var viewObj = self.getStyle().subNViews[i];
//
//			if(i !== currIndex) {
//				util.updateSubNView(viewObj);
//			}
//		}
//	},
//	/*
//	 * 改变颜色
//	 */
//	changeColor: function(obj, color) {
//		obj.color = color;
//		return obj
//	},
//	/*
//	 * 利用 webview 提供的 updateSubNViews 方法更新 view 控件
//	 */
//	updateSubNView: function(obj) {
//		var self = plus.webview.currentWebview();
//		self.updateSubNViews([{
//			id: obj.id,
//			tags: [{
//				tag: 'font', //此处直接赋值因为已知需要更新的tag 类型，不是固定值，请注意
//				id: obj.id + 1,
//				position: obj.tags[0].position,
//				text: obj.tags[0].text,
//				textStyles: util.changeColor(obj.tags[0].textStyles, util.options.normal_color)
//			}, {
//				tag: 'font',
//				id: obj.id + 2,
//				position: obj.tags[1].position,
//				text: obj.tags[1].text,
//				textStyles: util.changeColor(obj.tags[1].textStyles, util.options.normal_color)
//			}]
//		}]);
//	}
//};