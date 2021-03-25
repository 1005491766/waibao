import GameConfig from "./GameConfig";
import User_csjc from "./User/User";
import { ui } from "./ui/layaMaxUI";
import LoadingView_csjc from "./View/LoadingView/LoadingView";
import WXAPI_csjc from "./PlatformApi//WXAPI";
import EventMgr_csjc from "./Event/EventMgr";
import { EventDef_csjc } from "./Event/EventDef";
import OPPOAPI_csjc from "./PlatformApi//OPPOAPI";
import QQMiniGameAPI_csjc from "./PlatformApi//QQMiniGameAPI";
import TTAPI from "./PlatformApi/TTAPI";
import ALD_csjc from "./ALD";
import TmAPI from "./TmAPI/TmAPI";
// import TmAppConfig from "./TmAPI/TmAppConfig";
// import TmIpBlockConfig from "./TmAPI/TmIpBlockConfig";
import CachedWXBannerAd_csjc from "./PlatformApi//CachedWXBannerAd";
import VIVOAPI_csjc from "./PlatformApi/VIVOAPI";
import GdIpManager_csjc from "./CommomAPI/GdIPManager";
import GameSwitch_csjc from "./CommomAPI/GameSwitch/GameSwitch";
import { AdDataMgr } from "./QpAPI/AdDataMgr";
import QpGameSwitch from "./QpAPI/QpGameSwitch";
import TmAbTestMgr_csjc from "./TmAPI/TmABTestMgr";

class Main {

	protected _loadingUI: ui.View.LoadingUI = null;
	protected _loadingView: LoadingView_csjc = null;
	//预加载列表
	private readonly _preLoadRes: Array<any> = new Array<any>();

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		// if (true == AppConfig.onTTMiniGame) {
		// 	Laya.Browser.onMiniGame = false;
		// }

		// if (!Laya.Browser.onMiniGame
		// 	&& !Laya.Browser.onQGMiniGame
		// 	&& !Laya.Browser.onQQMiniGame
		// 	&& !AppConfig.onTTMiniGame)//如果不是小游戏，资源服务器设置为本地测试地址
		// {
		// 	AppConfig.ResServer = AppConfig.LocalTestReServer;
		// }

		if (Laya.Browser.onMiniGame) {
			CachedWXBannerAd_csjc.preloadBanner_csjc();
		}
		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		Laya.loader.maxLoader = 50;
		this.initLoadingView()
		//加载重要配置，这些配置必须在游戏启动前加载完成
		// var firstConfigs =
		// 	[
		// 		{ url: AppConfig.ResServer + "/json/appswitch.json", type: Laya.Loader.JSON }
		// 	]
		// var self = this;
		// Laya.loader.load(firstConfigs, Laya.Handler.create(this, () => {
		// 	self.loadRes();//加载资源
		// }))
		//下面的代码用于控制当前的appconfig是来自本地测试版,还是在线服务器版
		let testConfig = false;		//如果想让appConfig为本地版本,想办法让testConfig = true就行了
		if (!Laya.Browser.onMiniGame
			&& !Laya.Browser.onQGMiniGame
			&& !Laya.Browser.onQQMiniGame)//默认在模拟器环境下，appConfig设置为本地测试版
		{
			// testConfig = true;
		}

		if (testConfig) {
			// TmAppConfig.UpdateLocalConfig(null);
			GameSwitch_csjc.UpdateLocalConfig_csjc(null);
		}
		else {
			// TmAppConfig.UpdateConfig(null);
			GameSwitch_csjc.UpdateOnlineConfig_csjc(null);
		}

		this.loadRes();//加载资源		
		// GdIpManager_csjc.UpdateIpState_csjc();
		EventMgr_csjc.regOnceEvent_csjc(EventDef_csjc.App_CloseFirstLoadingView_csjc, this, this.closeloadingUI);
	}

	private initLoadingView() {
		this._loadingUI = new ui.View.LoadingUI();
		Laya.stage.addChild(this._loadingUI);
		this._loadingUI.width = Laya.stage.width;
		this._loadingUI.height = Laya.stage.height;
		this._loadingView = this._loadingUI.getComponent(LoadingView_csjc)
		this._loadingView.setProcess_csjc(0);
	}


	// private postResToOpenDataContext(onComplate: Function) {
	// 	if (Laya.Browser.onMiniGame) {
	// 		console.log("开始透传资源数据到开放域");
	// 		Laya.loader.load(
	// 			[
	// 				"openRes/Rank.atlas",
	// 			]
	// 			, Laya.Handler.create(null, function () {
	// 				Laya.MiniAdpter.sendAtlasToOpenDataContext("openRes/Rank.atlas");
	// 				console.log("透传资源数据到开放域  完毕！！！");
	// 				if (onComplate) {
	// 					onComplate();
	// 				}
	// 			}));
	// 	}
	// 	else {
	// 		if (onComplate) {
	// 			onComplate();
	// 		}
	// 	}
	// }

	private preLoad() {
		//这里添加你需要预加载的资源
		//this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });
	}

	loadRes(): void {
		this.preLoad();
		var resource: Array<any> = this._preLoadRes;
		var self = this;
		if (Laya.Browser.onMiniGame) {
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["wx"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if (resource.length > 0) {
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.setProcess_csjc(res / 2 + 0.5);
						}));
					}
					else {
						self.onLoadResComplate();//预加载完成
					}
				},
				fail: (res) => {
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => {
				self._loadingView.setProcess_csjc(res / 2);
			});
		}
		else if (Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["qg"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if (resource.length > 0) {
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.setProcess_csjc(res / 2 + 0.5);
						}));
					}
					else {
						self.onLoadResComplate();//预加载完成
					}
				},
				fail: (res) => {
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => {
				// 加载进度百分比
				var progress = res["progress"];
				// 下载数据
				var totalBytesWritten = res["totalBytesWritten"];
				// 总长度
				var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
				self._loadingView.setProcess_csjc(progress / 2);
			});
		}
		else if (Laya.Browser.onQQMiniGame) {
			//开始加载分包
			var loadSubResTask: any = Laya.Browser.window["qq"].loadSubpackage({
				name: 'subRes',
				success: (res) => {

					// 分包加载成功,开始预加载资源
					if (resource.length > 0) {
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.onLoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self._loadingView.setProcess_csjc(res / 2 + 0.5);
						}));
					}
					else {
						self.onLoadResComplate();//预加载完成
					}
				},
				fail: (res) => {
					this.loadRes();//加载失败，重新加载
				}
			});
			loadSubResTask.onProgressUpdate(res => {
				self._loadingView.setProcess_csjc(res / 2);
			});
		}
		else {//字节跳动没有分包
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.onLoadResComplate();
				}), Laya.Handler.create(this, (res) => {
					self._loadingView.setProcess_csjc(res);
				}));
			}
			else {
				self.onLoadResComplate();
			}
		}
	}

	onLoadResComplate() {
		var self = this;
		this._loadingView.setProcess_csjc(1);
		if (Laya.Browser.onMiniGame) {
			// TmAPI.Init();
			// TmAPI.Login((res) => {
			// 	if (res.login_city != "") {
			// 		User_csjc.city_csjc = res.login_city;
			// 	}
			// 	User_csjc.code_csjc = res.wx_code;
			// 	User_csjc.token_csjc = res.pid;
			// 	User_csjc.openId_csjc = res.open_id;
			// 	ALD_csjc.aldSendOpenId_csjc(User_csjc.openId_csjc);
			// 	TmIpBlockConfig.UpdateConfig();
			// 	GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			// 	}));
			// });
			WXAPI_csjc.wxLogin_csjc(function (code) {
				User_csjc.code_csjc = code;
				AdDataMgr.Instance.InitMatix(() => {
					TmAPI.NoLoginInit(User_csjc.openId_csjc);
					// TmAbTestMgr_csjc.Instance_csjc.InitAbTest_csjc();
				});
				QpGameSwitch.getCustomKey();
				QpGameSwitch.UpdateIpCity();
				User_csjc.initiUser_csjc(null);
				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () { }));
				// HttpUnit.login(
				// (res)=> 
				// {
				// 	if(res.code == 1)
				// 	{
				// 		console.log("登陆成功！！！");
				// 		User.token = res.data.token;
				// 		User.openId = res.data.openid;
				// 		ALD.aldSendOpenId(User.openId);
				// 		HttpUnit.getGameData((res)=>{
				// 			console.log("获取用户数据成功！！！");
				// 			if(1 == res.code)
				// 			{
				// 				User.initiUser(res.data);
				// 			}
				// 			else
				// 			{
				// 				User.initiUser(null);
				// 			}
				// 			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 			}));
				// 		},(res)=>{
				// 			console.log("获取用户数据失败！！！");
				// 			User.token = "";
				// 			User.openId = "";
				// 			User.initiUser(null);
				// 			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 			}));
				// 		})
				// 	}
				// 	else
				// 	{
				// 		console.log("登陆失败！！！" + res);
				// 		User.initiUser(null);
				// 		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 		}));
				// 	}
				// },
				// (res) => 
				// {
				// 	console.log("登陆失败！！！" + res);
				// 	User_csjc.initiUser_csjc(null);
				// 	GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 	}));
				// })
			}, null)
		}
		else if (Laya.Browser.onQGMiniGame) //oppo小游戏
		{
			OPPOAPI_csjc.initAdService_csjc(() => {

			}, () => {

			}, () => {

			});

			OPPOAPI_csjc.Login_csjc(function (token) {
				User_csjc.code_csjc = token;
				User_csjc.initiUser_csjc(null);
				//#region  暂时没有登录服务器,直接过
				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				}));
				//#endregion
				// HttpUnit.login(
				// 	(res) => {
				// 		if (res.code == 1) {
				// 			console.log("登陆成功！！！");
				// 			User.token = res.data.token;
				// 			User.openId = res.data.openid;
				// 			HttpUnit.getGameData((res) => {
				// 				console.log("获取用户数据成功！！！");
				// 				if (1 == res.code) {
				// 					User.initiUser(res.data);
				// 					console.log("获取用户数据--------------------Start");
				// 					for (var key in res.data) {
				// 						console.log(key, res.data[key]);
				// 					}
				// 					console.log("获取用户数据--------------------End");
				// 				}
				// 				else {
				// 					User.initiUser(null);
				// 				}
				// 				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 				}));
				// 			}, (res) => {
				// 				console.log("获取用户数据失败！！！");
				// 				User.token = "";
				// 				User.openId = "";
				// 				User.initiUser(null);
				// 				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 				}));
				// 			})
				// 		}
				// 		else {
				// 			console.log("登陆失败！！！", res);
				// 			User.initiUser(null);
				// 			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 			}));
				// 		}
				// 	},
				// 	(res) => {
				// 		console.log("登陆失败！！！", res);
				// 		User.initiUser(null);
				// 		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				// 		}));
				// 	})
			}, (res) => {
				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

				}));
			})
		}
		else if (Laya.Browser.onVVMiniGame) //oppo小游戏
		{
			VIVOAPI_csjc.VIVOLogin_csjc();
		}
		else if (Laya.Browser.onQQMiniGame)  //qq小游戏
		{
			// QQMiniGameAPI.Login(function (code) {
			// User.code = code
			// 	HttpUnit.login(
			// 		(res) => {
			// 			if (res.code == 1) {
			// 				console.log("登陆成功！！！");
			// 				User.token = res.data.token;
			// 				User.openId = res.data.openid;
			// 				ALD.aldSendOpenId(User.openId);
			// 				HttpUnit.getGameData((res) => {
			// 					console.log("获取用户数据成功！！！");
			// 					if (1 == res.code) {
			// 						User.initiUser(res.data);
			// 					}
			// 					else {
			// 						User.initiUser(null);
			// 					}
			// 					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			// 					}));
			// 				}, (res) => {
			// 					console.log("获取用户数据失败！！！");
			// 					User.token = "";
			// 					User.openId = "";
			// 					User.initiUser(null);
			// 					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			// 					}));
			// 				})
			// 			}
			// 			else {
			// 				console.log("登陆失败！！！" + res);
			// 				User.initiUser(null);
			// 				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			// 				}));
			// 			}
			// 		},
			// 		(res) => {
			// 			console.log("登陆失败！！！" + res);
			// 			User.initiUser(null);
			// 			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			// 			}));
			// 		})
			// }, null);
		}
		// else if (AppConfig.onTTMiniGame)//头条，字节跳动
		// {
		// TTAPI.ttLogin(function (code) {
		// 	User.code = code
		// 	HttpUnit.login(
		// 		(res) => {
		// 			if (res.code == 1) {
		// 				console.log("登陆成功！！！");
		// 				User.token = res.data.token;
		// 				User.openId = res.data.openid;
		// 				HttpUnit.getGameData((res) => {
		// 					console.log("获取用户数据成功！！！");
		// 					if (1 == res.code) {
		// 						User.initiUser(res.data);
		// 					}
		// 					else {
		// 						User.initiUser(null);
		// 					}
		// 					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

		// 					}));
		// 				}, (res) => {
		// 					console.log("获取用户数据失败！！！");
		// 					User.token = "";
		// 					User.openId = "";
		// 					User.initiUser(null);
		// 					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

		// 					}));
		// 				})
		// 			}
		// 			else {
		// 				console.log("登陆失败！！！" + res);
		// 				User.initiUser(null);
		// 				GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

		// 				}));
		// 			}
		// 		},
		// 		(res) => {
		// 			console.log("登陆失败！！！" + res);
		// 			User.initiUser(null);
		// 			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

		// 			}));
		// 		})
		// }, null);
		// }
		else {
			// TmAPI.Init();
			// TmAPI.Login((res) => {
			// 	console.log("登陆成功！！！");
			// 	User.code = res.wx_code;
			// 	User.token = res.pid;
			// 	User.openId = res.open_id;
			// 	// ALD.aldSendOpenId(User.openId);
			// 	GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			// 	}));
			// });
			User_csjc.initiUser_csjc(null);
			// TmIpBlockConfig.UpdateLocalConfig();
			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

			}));
		}
	}

	protected closeloadingUI() {
		if (this._loadingUI && !this._loadingUI.destroyed) {
			this._loadingUI.destroy();
		}
	}
}
//激活启动类
new Main();
