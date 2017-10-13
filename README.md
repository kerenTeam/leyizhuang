## 简单概述
这是带登录和设置功能的mui模板项目，主要为了演示登录流程及设置界面div窗口切换效果；

## 核心功能
1. 启动App后校验登录状态，若已登录，直接跳转应用首页；否则，显示登录页面；
2. 支持本地注册；
3. 支持设置手势密码，登录时可使用手势密码代替账号、密码；
4. 支持评分、分享、拨打客服电话

"launchwebview": {
			"bottom": "0px",
			"background": "#fff",
			"subNViews": [
				{
					"id": "tabBar1",
					"styles": {
						"bottom": "0px",
						"left": "0",
						"height": "50px",
						"width": "26%",
						"backgroundColor": "#fff"
					},
					"tags": [
						{
							"tag": "font",
							"id": "tabBar11",
							"text": "\uf015",
							"position": {
								"top": "4px",
								"left": "0",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"fontSrc": "_www/fonts/fontawesome-webfont.ttf",
								"align": "center",
								"size": "24px"
							}
						}, {
							"tag": "font",
							"id": "tabBar12",
							"text": "首页",
							"position": {
								"top": "23px",
								"left": "0",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"align": "center",
								"size": "10px"
							}
						}
					]
				}, {
					"id": "tabBar2",
					"styles": {
						"bottom": "0px",
						"left": "25%",
						"height": "50px",
						"width": "26%",
						"backgroundColor": "#fff"
					},
					"tags": [
						{
							"tag": "font",
							"id": "tabBar21",
							"text": "\uf0c9",
							"position": {
								"top": "4px",
								"left": "-20px",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"fontSrc": "_www/fonts/fontawesome-webfont.ttf",
								"align": "center",
								"size": "24px"
							}
						}, {
							"tag": "font",
							"id": "tabBar22",
							"text": "商品",
							"position": {
								"top": "23px",
								"left": "-20px",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"align": "center",
								"size": "10px"
							}
						}
					]
				}, {
					"id": "tabBar3",
					"styles": {
						"bottom": "0px",
						"left": "50%",
						"height": "50px",
						"width": "26%",
						"backgroundColor": "#fff"
					},
					"tags": [
						{
							"tag": "font",
							"id": "tabBar31",
							"text": "\uf217",
							"position": {
								"top": "4px",
								"left": "20px",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"fontSrc": "_www/fonts/fontawesome-webfont.ttf",
								"align": "center",
								"size": "24px"
							}
						}, {
							"tag": "font",
							"id": "tabBar32",
							"text": "下料清单",
							"position": {
								"top": "24px",
								"left": "20px",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"align": "center",
								"size": "10px"
							}
						}
					]
				}, {
					"id": "tabBar4",
					"styles": {
						"bottom": "0px",
						"left": "75%",
						"height": "50px",
						"width": "26%",
						"backgroundColor": "#fff"
					},
					"tags": [
						{
							"tag": "font",
							"id": "tabBar41",
							"text": "\uf007",
							"position": {
								"top": "4px",
								"left": "0",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"fontSrc": "_www/fonts/fontawesome-webfont.ttf",
								"align": "center",
								"size": "24px"
							}
						}, {
							"tag": "font",
							"id": "tabBar42",
							"text": "我的",
							"position": {
								"top": "24px",
								"left": "0",
								"width": "100%",
								"height": "24px"
							},
							"textStyles": {
								"align": "center",
								"size": "10px"
							}
						}
					]
				}, {
					"id": "tabBar5",
					"styles": {
						"bottom": "50px",
						"left": "0",
						"height": "1px",
						"width": "100%",
						"backgroundColor": "#ccc"
					},
					"tags": [
						{
							"tag": "rect",
							"id": "tabBorder",
							"position": {
								"top": "0",
								"left": "0",
								"width": "100%",
								"height": "1px"
							},
							"rectStyles": {
								"color": "#ccc"
							}
						}
					]
				}
			]
		},