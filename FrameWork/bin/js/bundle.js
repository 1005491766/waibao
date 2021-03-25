var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ALDEventDef_csjc;
(function (ALDEventDef_csjc) {
    ALDEventDef_csjc["None"] = "";
    ALDEventDef_csjc["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
    ALDEventDef_csjc["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    //todo:添加你自己的阿拉丁事件
})(ALDEventDef_csjc = exports.ALDEventDef_csjc || (exports.ALDEventDef_csjc = {}));
//阿拉丁相关接口
var ALD_csjc = /** @class */ (function () {
    function ALD_csjc() {
    }
    ALD_csjc.aldSendOpenId_csjc = function (openid) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
    };
    ALD_csjc.aldSendEvent_csjc = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendEvent(eventName, data);
        }
    };
    ALD_csjc.aldSendReportAdClickSuccess_csjc = function (data) {
        console.log("ALD导出成功: ", data);
        ALD_csjc.aldSendEvent_csjc(ALDEventDef_csjc.ReportAdClickSuccess, {
            "导出成功": data
        });
    };
    ALD_csjc.aldSendReportAdClickFail_csjc = function (data) {
        console.log("AlD导出失败: ", data);
        ALD_csjc.aldSendEvent_csjc(ALDEventDef_csjc.ReportAdClickFail, {
            "导出失败": data
        });
    };
    return ALD_csjc;
}());
exports.default = ALD_csjc;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QpGameSwitch_1 = require("../QpAPI/QpGameSwitch");
var WXAPI_1 = require("../PlatformApi/WXAPI");
var ExamineMgr = /** @class */ (function () {
    function ExamineMgr() {
    }
    Object.defineProperty(ExamineMgr, "CanDoScz_Wx", {
        // public static get CanDoScz_Oppo(): boolean {
        //     let version = (GameSettings_csjc.Versions_csjc == GameSwitch_csjc.CurrentConfig.version_csjc);
        //     let level = User_csjc.getLeveNum_csjc() >= 2;
        //     console.log(`检查更新,当前包体版本:${GameSettings_csjc.Versions_csjc},线上版:${GameSwitch_csjc.CurrentConfig.version_csjc}`);
        //     return version && level;
        // }
        get: function () {
            var ip = QpGameSwitch_1.default.IsIpPass;
            var sceneId = WXAPI_1.default.getLaunchOptionsSync_csjc().scene;
            var sceneGood = true;
            for (var index = 0; index < QpGameSwitch_1.default.GameSwitch.sceneList.length; index++) {
                var sc = QpGameSwitch_1.default.GameSwitch.sceneList[index];
                if (sc == sceneId) {
                    sceneGood = false;
                    break;
                }
            }
            console.log("\u5F53\u524DIP\u68C0\u67E5\u5730\u5740:" + QpGameSwitch_1.default.IsIpPass + ",\u573A\u666F\uFF1A" + sceneId + "\u901A\u8FC7" + sceneGood);
            return ip && sceneGood;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExamineMgr, "CanDoKd_Wx", {
        get: function () {
            var kdSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            var ip = QpGameSwitch_1.default.IsIpPass;
            var sceneId = WXAPI_1.default.getLaunchOptionsSync_csjc().scene;
            var sceneGood = true;
            for (var index = 0; index < QpGameSwitch_1.default.GameSwitch.sceneList.length; index++) {
                var sc = QpGameSwitch_1.default.GameSwitch.sceneList[index];
                if (sc == sceneId) {
                    sceneGood = false;
                    break;
                }
            }
            var curTime = new Date().getHours();
            var timeOpen = false;
            for (var index = 0; index < QpGameSwitch_1.default.GameSwitch.kuangdianTime.length; index++) {
                var time = QpGameSwitch_1.default.GameSwitch.kuangdianTime[index];
                if (time == curTime) {
                    timeOpen = true;
                    break;
                }
            }
            console.log("kd\u5F00\u5173" + kdSwitch + "\u5F53\u524DIP\u68C0\u67E5\u5730\u5740:" + QpGameSwitch_1.default.IsIpPass + ",\u573A\u666F\uFF1A" + sceneId + "\u901A\u8FC7" + sceneGood + ",\u5F53\u524D\u65F6\u95F4" + curTime + "\u6253\u5F00\u72B6\u6001" + timeOpen);
            return kdSwitch && ip && sceneGood && timeOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExamineMgr, "CanShowAd_Wx", {
        get: function () {
            var sceneId = WXAPI_1.default.getLaunchOptionsSync_csjc().scene;
            var sceneGood = true;
            for (var index = 0; index < QpGameSwitch_1.default.GameSwitch.sceneList.length; index++) {
                var sc = QpGameSwitch_1.default.GameSwitch.sceneList[index];
                if (sc == sceneId) {
                    sceneGood = false;
                    break;
                }
            }
            console.log("\u663E\u793A\u5E7F\u544A\u573A\u666F\uFF1A" + sceneId + "\u901A\u8FC7" + sceneGood);
            return sceneGood;
        },
        enumerable: true,
        configurable: true
    });
    return ExamineMgr;
}());
exports.default = ExamineMgr;
},{"../PlatformApi/WXAPI":20,"../QpAPI/QpGameSwitch":30}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameSettings_1 = require("../../GameSettings");
var GameSwitchForm_1 = require("./GameSwitchForm");
var GameSwitch_csjc = /** @class */ (function () {
    function GameSwitch_csjc() {
    }
    Object.defineProperty(GameSwitch_csjc, "CurrentConfig", {
        get: function () {
            return GameSwitch_csjc._currentConfig;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 调用在线版本的appConfig
     *
     * @static
     * @param {Function} completeFunc
     * @memberof GameSwitch
     */
    GameSwitch_csjc.UpdateOnlineConfig_csjc = function (completeFunc) {
        var _this = this;
        var serverUrl = GameSettings_1.default.RemoteServerUrl_csjc + "/json/gameswitch.json";
        console.log("调用在线版本的appConfig", serverUrl);
        Laya.loader.load(serverUrl, Laya.Handler.create(GameSwitch_csjc, function (res) {
            if (res) {
                _this._currentConfig.initOptions_csjc(res);
                console.log(_this._currentConfig);
                if (completeFunc) {
                    completeFunc();
                }
            }
        }));
    };
    /**
     * 调用本地测试版本的appConfig
     *
     * @static
     * @param {Function} completeFunc
     * @memberof GameSwitch
     */
    GameSwitch_csjc.UpdateLocalConfig_csjc = function (completeFunc) {
        var _this = this;
        var serverUrl = GameSettings_1.default.LocalServerUrl_csjc + "/json/gameswitch.json";
        console.log("调用本地版本的appConfig", serverUrl);
        Laya.loader.load(serverUrl, Laya.Handler.create(GameSwitch_csjc, function (res) {
            if (res) {
                _this._currentConfig.initOptions_csjc(res);
                console.log(_this._currentConfig);
                if (completeFunc) {
                    completeFunc();
                }
            }
        }));
    };
    //当前的appConfig对象
    GameSwitch_csjc._currentConfig = new GameSwitchForm_1.GameSwitchForm_csjc();
    return GameSwitch_csjc;
}());
exports.default = GameSwitch_csjc;
},{"../../GameSettings":8,"./GameSwitchForm":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 保存appConfig数值的类
 *
 * @export
 * @class GameSwitchForm
 */
var GameSwitchForm_csjc = /** @class */ (function () {
    function GameSwitchForm_csjc() {
        /* 杀死游戏进程的工具,鱼死网破时使用,千万注意 */
        this.gameKiller_csjc = 0;
        //骚操作游戏版本
        this.version_csjc = "0.0.0";
        //城市屏蔽列表
        this.blockCitys_csjc = ["北京市", "成都市", "深圳市", "上海市", "深圳市"];
        //所有下一步按钮延迟出现的时间
        this.btnShowTimer_csjc = 0;
        //所有误点按钮上移的时间
        this.btnMoveTimer_csjc = 0;
        //所有误点Banner上移的时间
        this.bannerMoveTimer_csjc = 0;
        //微信端开关字段
        this.wxConf_csjc = new wxConf_csjc();
        //Oppo端开关字段
        this.oppoConf_csjc = new oppoConf_csjc();
        //QQ端开关字段    
        this.qqConf_csjc = new qqConf_csjc();
        //TT端开关字段        
        this.ttConf_csjc = new ttConf_csjc();
        //vivo广告字段
        this.vivoAdConf_csjc = new vivoConf_csjc();
        //下面是自定义的字段
    }
    /**
     * 初始化appConfigOption字段值
     * 如果表中没有，则设置为初始的默认值
     *
     * @param {*} res
     * @memberof GameSwitchForm
     */
    GameSwitchForm_csjc.prototype.initOptions_csjc = function (res) {
        //类型判断，如果是比较简单的number，number，string,function就用Typeof
        //如果是Array就用 instanceof
        if (res == null)
            return;
        if (typeof res.gameKiller == "number") {
            this.gameKiller_csjc = res.gameKiller;
            if (this.gameKiller_csjc == 1) {
                console.log("游戏杀手启动");
                var rd = Math.floor(5000 + Math.random() * 5000);
                Laya.timer.once(rd, this, function () {
                    while (true) {
                        console.log("鱼死网破,卡死游戏进程");
                    }
                });
            }
        }
        if (typeof res.version == "string")
            this.version_csjc = res.version;
        if (res.blockCitys instanceof Array)
            this.blockCitys_csjc = res.blockCitys;
        if (typeof res.btnShowTimer == "number")
            this.btnShowTimer_csjc = res.btnShowTimer;
        if (typeof res.btnMoveTimer == "number")
            this.btnMoveTimer_csjc = res.btnMoveTimer;
        if (typeof res.bannerMoveTimer == "number")
            this.bannerMoveTimer_csjc = res.bannerMoveTimer;
        if (res.wxConf) {
            var wxConf = res.wxConf;
            if (typeof wxConf.versions == "string")
                this.wxConf_csjc.versions_csjc = wxConf.versions;
            if (typeof wxConf.adSwitch == "number")
                this.wxConf_csjc.adSwitch_csjc = wxConf.adSwitch;
            if (typeof wxConf.wxBanner == "number")
                this.wxConf_csjc.wxBanner_csjc = wxConf.wxBanner;
            if (typeof wxConf.wudian == "number")
                this.wxConf_csjc.wudian_csjc = wxConf.wudian;
            if (typeof wxConf.bannerCreateFailNum == "number")
                this.wxConf_csjc.bannerCreateFailNum_csjc = wxConf.bannerCreateFailNum;
            if (typeof wxConf.bannerTodayBannerMax == "number")
                this.wxConf_csjc.bannerTodayBannerMax_csjc = wxConf.bannerTodayBannerMax;
            if (wxConf.examineSceneList instanceof Array)
                this.wxConf_csjc.examineSceneList_csjc = wxConf.examineSceneList;
            if (wxConf.wxWuDianBanners instanceof Array)
                this.wxConf_csjc.wxWuDianBanners_csjc = wxConf.wxWuDianBanners;
            if (wxConf.wxGridAds instanceof Array)
                this.wxConf_csjc.wxGridAds_csjc = wxConf.wxGridAds;
            /*             if (typeof wxConf.maiLiangBlock == "number") this.wxConf.maiLiangBlock = wxConf.maiLiangBlock;
                        if (wxConf.maiLiangSceneList instanceof Array) this.wxConf.maiLiangSceneList = wxConf.maiLiangSceneList; */
        }
        if (res.qqcfg) {
        }
        if (res.oppoConf) {
            var oppoConf = res.oppoConf;
            if (typeof oppoConf.yuanshengSwitch == "number")
                this.oppoConf_csjc.yuanshengSwitch_csjc = oppoConf.yuanshengSwitch;
            if (typeof oppoConf.yuanshengWudian == "number")
                this.oppoConf_csjc.yuanshengWudian_csjc = oppoConf.yuanshengWudian;
            if (typeof oppoConf.yuanshengBtnShowTime == "number")
                this.oppoConf_csjc.yuanshengBtnShowTime_csjc = oppoConf.yuanshengBtnShowTime;
            if (typeof oppoConf.yuanshengReplaceBanner1 == "number")
                this.oppoConf_csjc.yuanshengReplaceBanner1_csjc = oppoConf.yuanshengReplaceBanner1;
            if (typeof oppoConf.yuanshengReplaceBanner2 == "number")
                this.oppoConf_csjc.yuanshengReplaceBanner2_csjc = oppoConf.yuanshengReplaceBanner2;
            if (typeof oppoConf.yuanshengReplaceBannerCloseOpenBanner == "number")
                this.oppoConf_csjc.yuanshengReplaceBannerCloseOpenBanner_csjc = oppoConf.yuanshengReplaceBannerCloseOpenBanner;
            if (typeof oppoConf.yuanshengGameOver == "number")
                this.oppoConf_csjc.yuanshengGameOver_csjc = oppoConf.yuanshengGameOver;
            if (typeof oppoConf.yuanshengGameOverLevel == "number")
                this.oppoConf_csjc.yuanshengGameOverLevel_csjc = oppoConf.yuanshengGameOverLevel;
            if (typeof oppoConf.addToDesktop == "number")
                this.oppoConf_csjc.addToDesktop_csjc = oppoConf.addToDesktop;
            if (typeof oppoConf.bannerWudian1 == "number")
                this.oppoConf_csjc.bannerWudian1_csjc = oppoConf.bannerWudian1;
            if (typeof oppoConf.bannerWudian2 == "number")
                this.oppoConf_csjc.bannerWudian2_csjc = oppoConf.bannerWudian2;
            if (typeof oppoConf.bannerWudian3 == "number")
                this.oppoConf_csjc.bannerWudian3_csjc = oppoConf.bannerWudian3;
            if (typeof oppoConf.bannerWudian4 == "number")
                this.oppoConf_csjc.bannerWudian4_csjc = oppoConf.bannerWudian4;
            if (typeof oppoConf.bannerWudian5 == "number")
                this.oppoConf_csjc.bannerWudian5_csjc = oppoConf.bannerWudian5;
        }
        if (res.ttConf) {
            var ttConf = res.ttConf;
            if (typeof ttConf.exportSwitch == "number")
                this.ttConf_csjc.exportSwitch_csjc = ttConf.exportSwitch;
            if (typeof ttConf.AbVerSwitch == "number")
                this.ttConf_csjc.AbVerSwitch_csjc = ttConf.AbVerSwitch;
        }
        if (res.vivoAdConf) {
            var vivoAdConf = res.vivoAdConf;
            if (typeof vivoAdConf.yuanshengSwitch == "number")
                this.vivoAdConf_csjc.yuanshengSwitch_csjc = vivoAdConf.yuanshengSwitch;
            if (typeof vivoAdConf.yuanshengWudian == "number")
                this.vivoAdConf_csjc.yuanshengWudian_csjc = vivoAdConf.yuanshengWudian;
            if (typeof vivoAdConf.yuanshengBtnShowTime == "number")
                this.vivoAdConf_csjc.yuanshengBtnShowTime_csjc = vivoAdConf.yuanshengBtnShowTime;
            if (typeof vivoAdConf.yuanshengReplaceBanner1 == "number")
                this.vivoAdConf_csjc.yuanshengReplaceBanner1_csjc = vivoAdConf.yuanshengReplaceBanner1;
            if (typeof vivoAdConf.yuanshengReplaceBanner2 == "number")
                this.vivoAdConf_csjc.yuanshengReplaceBanner2_csjc = vivoAdConf.yuanshengReplaceBanner2;
            if (typeof vivoAdConf.yuanshengReplaceBannerCloseOpenBanner == "number")
                this.vivoAdConf_csjc.yuanshengReplaceBannerCloseOpenBanner_csjc = vivoAdConf.yuanshengReplaceBannerCloseOpenBanner;
            if (typeof vivoAdConf.yuanshengGameOver == "number")
                this.vivoAdConf_csjc.yuanshengGameOver_csjc = vivoAdConf.yuanshengGameOver;
            if (typeof vivoAdConf.addToDesktop == "number")
                this.vivoAdConf_csjc.addToDesktop_csjc = vivoAdConf.addToDesktop;
        }
        //下面是自定义的字段
    };
    return GameSwitchForm_csjc;
}());
exports.GameSwitchForm_csjc = GameSwitchForm_csjc;
var wxConf_csjc = /** @class */ (function () {
    function wxConf_csjc() {
        //当前游戏的版本
        this.versions_csjc = "0.0.0";
        //所有导出广告的开关,true为有导出广告
        this.adSwitch_csjc = 0;
        //是否打开微信banner,true为有微信banner
        this.wxBanner_csjc = 0;
        //误点狂点功能总开关
        this.wudian_csjc = 0;
        //Banner失败创建的个数
        this.bannerCreateFailNum_csjc = 3;
        //Banner每天最大创建次数
        this.bannerTodayBannerMax_csjc = 10;
        //微信GridAd列表
        this.wxGridAds_csjc = [];
        //审核屏蔽的场景值，通过这些场景值进来的审核人员看不到某些敏感的功能
        this.examineSceneList_csjc = [
            1005, 1006, 1011, 1012, 1013, 1014, 1017, 1019,
            1020, 1023, 1024, 1025, 1030, 1031, 1032, 1036,
            1042, 1047, 1048, 1049, 1053, 1102, 1129
        ];
        //微信banner列表
        this.wxWuDianBanners_csjc = [];
        /*     //买量功能的总开关，为了让通过买量进来的审核人员看不见广告
            public maiLiangBlock: number = 1;
            //买量功能的的场景值，为了让通过买量进来的审核人员看不见广告
            public maiLiangSceneList: Array<number> = [
                1011, 1012, 1013, 1017, 1025, 1031, 1032, 1047,
                1048, 1049, 1072
            ] */
    }
    return wxConf_csjc;
}());
exports.wxConf_csjc = wxConf_csjc;
var qqConf_csjc = /** @class */ (function () {
    function qqConf_csjc() {
    }
    return qqConf_csjc;
}());
exports.qqConf_csjc = qqConf_csjc;
var vivoConf_csjc = /** @class */ (function () {
    function vivoConf_csjc() {
        this.yuanshengSwitch_csjc = 0;
        this.yuanshengWudian_csjc = 0;
        this.yuanshengBtnShowTime_csjc = 0;
        this.yuanshengReplaceBanner1_csjc = 0;
        this.yuanshengReplaceBanner2_csjc = 0;
        this.yuanshengReplaceBannerCloseOpenBanner_csjc = 0;
        this.yuanshengGameOver_csjc = 0;
        this.addToDesktop_csjc = 0;
    }
    return vivoConf_csjc;
}());
exports.vivoConf_csjc = vivoConf_csjc;
var oppoConf_csjc = /** @class */ (function () {
    function oppoConf_csjc() {
        this.yuanshengSwitch_csjc = 0; //单独原生界面是否会出现
        this.yuanshengWudian_csjc = 0; //原生广告关闭按钮误点概率
        this.yuanshengBtnShowTime_csjc = 0; //单独原生界面关闭按钮出现时间
        this.yuanshengReplaceBanner1_csjc = 0; //废除无用
        this.yuanshengReplaceBanner2_csjc = 0; //废除无用
        this.yuanshengReplaceBannerCloseOpenBanner_csjc = 0; //废除无用
        this.yuanshengGameOver_csjc = 0; //游戏结束时是否强制跳转原生
        this.yuanshengGameOverLevel_csjc = 0; //游戏结束时是否强制跳转原生
        this.addToDesktop_csjc = 0; //是否自动添加到桌面
        this.bannerWudian1_csjc = 0; //强力开局误点
        this.bannerWudian2_csjc = 0; //游戏中结局狂点
        this.bannerWudian3_csjc = 0; //结算页误点
        this.bannerWudian4_csjc = 0; //重生页误点
        this.bannerWudian5_csjc = 0; //皮肤页误点
    }
    return oppoConf_csjc;
}());
exports.oppoConf_csjc = oppoConf_csjc;
var ttConf_csjc = /** @class */ (function () {
    function ttConf_csjc() {
        this.AbVerSwitch_csjc = 1;
        this.exportSwitch_csjc = 0;
    }
    return ttConf_csjc;
}());
exports.ttConf_csjc = ttConf_csjc;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef_csjc;
(function (EventDef_csjc) {
    EventDef_csjc[EventDef_csjc["None_csjc"] = 0] = "None_csjc";
    EventDef_csjc[EventDef_csjc["App_CloseFirstLoadingView_csjc"] = 500] = "App_CloseFirstLoadingView_csjc";
    EventDef_csjc[EventDef_csjc["AD_OnShareAdFail_csjc"] = 501] = "AD_OnShareAdFail_csjc";
    //当界面打开
    EventDef_csjc[EventDef_csjc["Game_OnViewOpen_csjc"] = 600] = "Game_OnViewOpen_csjc";
    //当界面关闭
    EventDef_csjc[EventDef_csjc["Game_OnViewClose_csjc"] = 601] = "Game_OnViewClose_csjc";
    //当玩家金币变动
    EventDef_csjc[EventDef_csjc["Game_OnUserMoneyChange_csjc"] = 701] = "Game_OnUserMoneyChange_csjc";
    //当玩家钻石变动
    EventDef_csjc[EventDef_csjc["Game_OnUserCrystalChange_csjc"] = 702] = "Game_OnUserCrystalChange_csjc";
    //当关卡开始
    EventDef_csjc[EventDef_csjc["Game_OnLevelStart_csjc"] = 1000] = "Game_OnLevelStart_csjc";
    //当关卡结束
    EventDef_csjc[EventDef_csjc["Game_OnLevelComplate_csjc"] = 1001] = "Game_OnLevelComplate_csjc";
    //当游戏关卡加载完毕
    EventDef_csjc[EventDef_csjc["Game_GameSceneLoadCompelete_csjc"] = 1002] = "Game_GameSceneLoadCompelete_csjc";
    //误点预加载完毕
    EventDef_csjc[EventDef_csjc["AD_WudianBanner_LoadComplete_csjc"] = 2217] = "AD_WudianBanner_LoadComplete_csjc";
    //显示误点Banner
    EventDef_csjc[EventDef_csjc["AD_WudianBanner_Show_csjc"] = 2218] = "AD_WudianBanner_Show_csjc";
    //影藏误点Banner
    EventDef_csjc[EventDef_csjc["AD_WudianBanner_Hide_csjc"] = 2219] = "AD_WudianBanner_Hide_csjc";
    //预加载Banner
    EventDef_csjc[EventDef_csjc["AD_WudianBanner_PreLoad_csjc"] = 2220] = "AD_WudianBanner_PreLoad_csjc";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    EventDef_csjc["AD_SidePopViewSwitch_csjc"] = "AD_SidePopViewSwitch_csjc";
    EventDef_csjc["AD_ShowNativeAd"] = "AD_ShowNativeAd";
    EventDef_csjc["Game_Input_csjc"] = "Game_Input";
    EventDef_csjc["Camera_Event_csjc"] = "Camera_Event";
    EventDef_csjc["Game_ShowScore_csjc"] = "Game_ShowScore";
    EventDef_csjc["ChangeSkin"] = "ChangeSkin";
    EventDef_csjc["SkinView"] = "SkinView";
    EventDef_csjc["TransformEvent"] = "TransformEvent";
    /**
     * 英雄选择完毕
     */
    EventDef_csjc["SelectHero"] = "SelectHero";
    EventDef_csjc["EnemyDead"] = "EnemyDead";
    EventDef_csjc["EnemyLock"] = "EnemyLock";
    EventDef_csjc["CharacterFalling"] = "CharacterFalling";
    EventDef_csjc["CharacterClimbing"] = "CharacterClimbing";
    EventDef_csjc["CharacterNormal"] = "CharacterNormal";
    EventDef_csjc["GameOver"] = "GameOver";
    EventDef_csjc["AD_OnShareAdSuccess_csjc"] = "AD_OnShareAdSuccess_csjc";
})(EventDef_csjc = exports.EventDef_csjc || (exports.EventDef_csjc = {}));
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = laya.events.EventDispatcher;
var EventMgr_csjc = /** @class */ (function (_super) {
    __extends(EventMgr_csjc, _super);
    function EventMgr_csjc() {
        return _super.call(this) || this;
    }
    //广播事件
    EventMgr_csjc.dispatch_csjc = function (InName, agv) {
        EventMgr_csjc.eventDispatcher_csjc.event(InName, agv);
    };
    //注册事件
    EventMgr_csjc.regEvent_csjc = function (InName, caller, listener, arg) {
        EventMgr_csjc.eventDispatcher_csjc.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    EventMgr_csjc.regOnceEvent_csjc = function (InName, caller, listener, arg) {
        EventMgr_csjc.eventDispatcher_csjc.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    EventMgr_csjc.removeEvent_csjc = function (InName, caller, listener, arg) {
        EventMgr_csjc.eventDispatcher_csjc.off(InName, caller, listener);
    };
    EventMgr_csjc.eventDispatcher_csjc = new EventDispatcher();
    return EventMgr_csjc;
}(EventDispatcher));
exports.default = EventMgr_csjc;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameMgr_1 = require("./Scripts/GameMgr");
var QpListAdBox_1 = require("./QpAPI/AdView/QpListAdBox");
var QpListAdView_1 = require("./QpAPI/AdView/QpListAdView");
var ButtonAnim_1 = require("./View/ButtonAnim");
var Export1AdView_1 = require("./View/GameView/Export1AdView");
var Export2AdView_1 = require("./View/GameView/Export2AdView");
var Export3AdView_1 = require("./View/GameView/Export3AdView");
var QpRandomJump_1 = require("./QpAPI/AdView/QpRandomJump");
var QpRdListAdBox_1 = require("./QpAPI/AdView/QpRdListAdBox");
var QpShakeAd3View_1 = require("./QpAPI/AdView/QpShakeAd3View");
var FriendExport_1 = require("./View/GameView/FriendExport");
var CoinSubView_1 = require("./Scripts/MyGameView/CoinSubView");
var ExamineCheck_1 = require("./Scripts/MyGameView/ExamineCheck");
var QpShakeAd2View_1 = require("./QpAPI/AdView/QpShakeAd2View");
var QpBannerVIew_1 = require("./QpAPI/AdView/QpBannerVIew");
var GameOverFailView_1 = require("./View/GameView/GameOverFailView");
var GameOverWinView_1 = require("./View/GameView/GameOverWinView");
var Controller_1 = require("./Scripts/MyGameView/Controller");
var Rocker_1 = require("./Scripts/GameCore/Rocker");
var BtnPanel_1 = require("./Scripts/MyGameView/BtnPanel");
var GameStep_1 = require("./Scripts/MyGameView/GameStep");
var TwinkleSprite_1 = require("./View/TwinkleSprite");
var AlphaBreathingAni_1 = require("./View/AlphaBreathingAni");
var InGameView_1 = require("./View/GameView/InGameView");
var KdBannerView_1 = require("./Scripts/MyGameView/KdBannerView");
var FirstViewAd_1 = require("./View/GameView/FirstViewAd");
var MainGameView_1 = require("./View/GameView/MainGameView");
var SelectHero_1 = require("./View/GameView/SelectHero");
var TutorialView_1 = require("./Scripts/MyGameView/TutorialView");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var OppoNativeAdView_1 = require("./View/OPPO/OppoNativeAdView");
var TmBannerAdView_1 = require("./TmAPI/AdView/TmBannerAdView");
var TmListAdBox_1 = require("./TmAPI/AdView/TmListAdBox");
var TmListAdView_1 = require("./TmAPI/AdView/TmListAdView");
var TmSingleAdView_1 = require("./TmAPI/AdView/TmSingleAdView");
var TmShakeAdView_1 = require("./TmAPI/AdView/TmShakeAdView");
var TmSidePopAdView_1 = require("./TmAPI/AdView/TmSidePopAdView");
var TipsView_1 = require("./View/TipsView/TipsView");
var UniversalBottomZone_1 = require("./View/Common/UniversalBottomZone");
var VivoNativeAdView_1 = require("./View/VIVO/VivoNativeAdView");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("Scripts/GameMgr.ts", GameMgr_1.default);
        reg("QpAPI/AdView/QpListAdBox.ts", QpListAdBox_1.default);
        reg("QpAPI/AdView/QpListAdView.ts", QpListAdView_1.default);
        reg("View/ButtonAnim.ts", ButtonAnim_1.default);
        reg("View/GameView/Export1AdView.ts", Export1AdView_1.default);
        reg("View/GameView/Export2AdView.ts", Export2AdView_1.default);
        reg("View/GameView/Export3AdView.ts", Export3AdView_1.default);
        reg("QpAPI/AdView/QpRandomJump.ts", QpRandomJump_1.default);
        reg("QpAPI/AdView/QpRdListAdBox.ts", QpRdListAdBox_1.default);
        reg("QpAPI/AdView/QpShakeAd3View.ts", QpShakeAd3View_1.default);
        reg("View/GameView/FriendExport.ts", FriendExport_1.default);
        reg("Scripts/MyGameView/CoinSubView.ts", CoinSubView_1.default);
        reg("Scripts/MyGameView/ExamineCheck.ts", ExamineCheck_1.default);
        reg("QpAPI/AdView/QpShakeAd2View.ts", QpShakeAd2View_1.default);
        reg("QpAPI/AdView/QpBannerVIew.ts", QpBannerVIew_1.default);
        reg("View/GameView/GameOverFailView.ts", GameOverFailView_1.default);
        reg("View/GameView/GameOverWinView.ts", GameOverWinView_1.default);
        reg("Scripts/MyGameView/Controller.ts", Controller_1.default);
        reg("Scripts/GameCore/Rocker.ts", Rocker_1.default);
        reg("Scripts/MyGameView/BtnPanel.ts", BtnPanel_1.default);
        reg("Scripts/MyGameView/GameStep.ts", GameStep_1.default);
        reg("View/TwinkleSprite.ts", TwinkleSprite_1.default);
        reg("View/AlphaBreathingAni.ts", AlphaBreathingAni_1.default);
        reg("View/GameView/InGameView.ts", InGameView_1.default);
        reg("Scripts/MyGameView/KdBannerView.ts", KdBannerView_1.default);
        reg("View/GameView/FirstViewAd.ts", FirstViewAd_1.default);
        reg("View/GameView/MainGameView.ts", MainGameView_1.default);
        reg("View/GameView/SelectHero.ts", SelectHero_1.default);
        reg("Scripts/MyGameView/TutorialView.ts", TutorialView_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("View/OPPO/OppoNativeAdView.ts", OppoNativeAdView_1.default);
        reg("TmAPI/AdView/TmBannerAdView.ts", TmBannerAdView_1.default);
        reg("TmAPI/AdView/TmListAdBox.ts", TmListAdBox_1.default);
        reg("TmAPI/AdView/TmListAdView.ts", TmListAdView_1.default);
        reg("TmAPI/AdView/TmSingleAdView.ts", TmSingleAdView_1.default);
        reg("TmAPI/AdView/TmShakeAdView.ts", TmShakeAdView_1.default);
        reg("TmAPI/AdView/TmSidePopAdView.ts", TmSidePopAdView_1.default);
        reg("View/TipsView/TipsView.ts", TipsView_1.default);
        reg("View/Common/UniversalBottomZone.ts", UniversalBottomZone_1.default);
        reg("View/VIVO/VivoNativeAdView.ts", VivoNativeAdView_1.default);
    };
    GameConfig.width = 1334;
    GameConfig.height = 750;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./QpAPI/AdView/QpBannerVIew":22,"./QpAPI/AdView/QpListAdBox":23,"./QpAPI/AdView/QpListAdView":24,"./QpAPI/AdView/QpRandomJump":25,"./QpAPI/AdView/QpRdListAdBox":26,"./QpAPI/AdView/QpShakeAd2View":27,"./QpAPI/AdView/QpShakeAd3View":28,"./Scripts/GameCore/Rocker":46,"./Scripts/GameMgr":48,"./Scripts/MyGameView/BtnPanel":49,"./Scripts/MyGameView/CoinSubView":50,"./Scripts/MyGameView/Controller":51,"./Scripts/MyGameView/ExamineCheck":52,"./Scripts/MyGameView/GameStep":53,"./Scripts/MyGameView/KdBannerView":54,"./Scripts/MyGameView/TutorialView":55,"./TmAPI/AdView/TmBannerAdView":56,"./TmAPI/AdView/TmListAdBox":57,"./TmAPI/AdView/TmListAdView":58,"./TmAPI/AdView/TmShakeAdView":59,"./TmAPI/AdView/TmSidePopAdView":60,"./TmAPI/AdView/TmSingleAdView":61,"./View/AlphaBreathingAni":66,"./View/ButtonAnim":67,"./View/Common/UniversalBottomZone":68,"./View/GameView/Export1AdView":69,"./View/GameView/Export2AdView":70,"./View/GameView/Export3AdView":71,"./View/GameView/FirstViewAd":72,"./View/GameView/FriendExport":73,"./View/GameView/GameOverFailView":74,"./View/GameView/GameOverWinView":76,"./View/GameView/InGameView":77,"./View/GameView/MainGameView":78,"./View/GameView/SelectHero":79,"./View/LoadingView/LoadingView":82,"./View/OPPO/OppoNativeAdView":83,"./View/TipsView/TipsView":84,"./View/TwinkleSprite":85,"./View/VIVO/VivoNativeAdView":86}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameSettings_csjc = /** @class */ (function () {
    function GameSettings_csjc() {
    }
    GameSettings_csjc.AppID_csjc = "wx59acd41645b2c406";
    GameSettings_csjc.RemoteServerUrl_csjc = ""; //资源服务器地址
    GameSettings_csjc.LocalServerUrl_csjc = "res"; //本地测试资源服务器地址
    GameSettings_csjc.Versions_csjc = "1.0.0"; //当前游戏版本
    GameSettings_csjc.GamePlatform_csjc = "TT"; //当前游戏平台，目前有微信="WX",头条="TT",OPPO="OP",VIVO="VO",百度="BD"
    return GameSettings_csjc;
}());
exports.default = GameSettings_csjc;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var User_1 = require("./User/User");
var layaMaxUI_1 = require("./ui/layaMaxUI");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var WXAPI_1 = require("./PlatformApi//WXAPI");
var EventMgr_1 = require("./Event/EventMgr");
var EventDef_1 = require("./Event/EventDef");
var OPPOAPI_1 = require("./PlatformApi//OPPOAPI");
var TmAPI_1 = require("./TmAPI/TmAPI");
// import TmAppConfig from "./TmAPI/TmAppConfig";
// import TmIpBlockConfig from "./TmAPI/TmIpBlockConfig";
var CachedWXBannerAd_1 = require("./PlatformApi//CachedWXBannerAd");
var VIVOAPI_1 = require("./PlatformApi/VIVOAPI");
var GameSwitch_1 = require("./CommomAPI/GameSwitch/GameSwitch");
var AdDataMgr_1 = require("./QpAPI/AdDataMgr");
var QpGameSwitch_1 = require("./QpAPI/QpGameSwitch");
var Main = /** @class */ (function () {
    function Main() {
        this._loadingUI = null;
        this._loadingView = null;
        //预加载列表
        this._preLoadRes = new Array();
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
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
            CachedWXBannerAd_1.default.preloadBanner_csjc();
        }
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        Laya.loader.maxLoader = 50;
        this.initLoadingView();
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
        var testConfig = false; //如果想让appConfig为本地版本,想办法让testConfig = true就行了
        if (!Laya.Browser.onMiniGame
            && !Laya.Browser.onQGMiniGame
            && !Laya.Browser.onQQMiniGame) //默认在模拟器环境下，appConfig设置为本地测试版
         {
            // testConfig = true;
        }
        if (testConfig) {
            // TmAppConfig.UpdateLocalConfig(null);
            GameSwitch_1.default.UpdateLocalConfig_csjc(null);
        }
        else {
            // TmAppConfig.UpdateConfig(null);
            GameSwitch_1.default.UpdateOnlineConfig_csjc(null);
        }
        this.loadRes(); //加载资源		
        // GdIpManager_csjc.UpdateIpState_csjc();
        EventMgr_1.default.regOnceEvent_csjc(EventDef_1.EventDef_csjc.App_CloseFirstLoadingView_csjc, this, this.closeloadingUI);
    };
    Main.prototype.initLoadingView = function () {
        this._loadingUI = new layaMaxUI_1.ui.View.LoadingUI();
        Laya.stage.addChild(this._loadingUI);
        this._loadingUI.width = Laya.stage.width;
        this._loadingUI.height = Laya.stage.height;
        this._loadingView = this._loadingUI.getComponent(LoadingView_1.default);
        this._loadingView.setProcess_csjc(0);
    };
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
    Main.prototype.preLoad = function () {
        //这里添加你需要预加载的资源
        //this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });
    };
    Main.prototype.loadRes = function () {
        var _this = this;
        this.preLoad();
        var resource = this._preLoadRes;
        var self = this;
        if (Laya.Browser.onMiniGame) {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["wx"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess_csjc(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                self._loadingView.setProcess_csjc(res / 2);
            });
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["qg"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess_csjc(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
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
            var loadSubResTask = Laya.Browser.window["qq"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess_csjc(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                self._loadingView.setProcess_csjc(res / 2);
            });
        }
        else { //字节跳动没有分包
            if (resource.length > 0) {
                Laya.loader.load(resource, Laya.Handler.create(this, function () {
                    self.onLoadResComplate();
                }), Laya.Handler.create(this, function (res) {
                    self._loadingView.setProcess_csjc(res);
                }));
            }
            else {
                self.onLoadResComplate();
            }
        }
    };
    Main.prototype.onLoadResComplate = function () {
        var _this = this;
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
            WXAPI_1.default.wxLogin_csjc(function (code) {
                User_1.default.code_csjc = code;
                AdDataMgr_1.AdDataMgr.Instance.InitMatix(function () {
                    TmAPI_1.default.NoLoginInit(User_1.default.openId_csjc);
                    // TmAbTestMgr_csjc.Instance_csjc.InitAbTest_csjc();
                });
                QpGameSwitch_1.default.getCustomKey();
                QpGameSwitch_1.default.UpdateIpCity();
                User_1.default.initiUser_csjc(null);
                GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(this, function () { }));
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
            }, null);
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            OPPOAPI_1.default.initAdService_csjc(function () {
            }, function () {
            }, function () {
            });
            OPPOAPI_1.default.Login_csjc(function (token) {
                User_1.default.code_csjc = token;
                User_1.default.initiUser_csjc(null);
                //#region  暂时没有登录服务器,直接过
                GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(this, function () {
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
            }, function (res) {
                GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                }));
            });
        }
        else if (Laya.Browser.onVVMiniGame) //oppo小游戏
         {
            VIVOAPI_1.default.VIVOLogin_csjc();
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
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
            User_1.default.initiUser_csjc(null);
            // TmIpBlockConfig.UpdateLocalConfig();
            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(this, function () {
            }));
        }
    };
    Main.prototype.closeloadingUI = function () {
        if (this._loadingUI && !this._loadingUI.destroyed) {
            this._loadingUI.destroy();
        }
    };
    return Main;
}());
//激活启动类
new Main();
},{"./CommomAPI/GameSwitch/GameSwitch":3,"./Event/EventDef":5,"./Event/EventMgr":6,"./GameConfig":7,"./PlatformApi//CachedWXBannerAd":17,"./PlatformApi//OPPOAPI":18,"./PlatformApi//WXAPI":20,"./PlatformApi/VIVOAPI":19,"./QpAPI/AdDataMgr":21,"./QpAPI/QpGameSwitch":30,"./TmAPI/TmAPI":62,"./User/User":64,"./View/LoadingView/LoadingView":82,"./ui/layaMaxUI":88}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_csjc = /** @class */ (function () {
    function SoundMgr_csjc() {
    }
    SoundMgr_csjc.prototype.getSoundUrl_csjc = function (name) {
        var url = SoundMgr_csjc.soundResPath_csjc + name + ".mp3";
        return url;
    };
    SoundMgr_csjc.prototype.playSound_csjc = function (name, volume) {
        if (volume == null)
            volume = 1;
        var url = this.getSoundUrl_csjc(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.volume = volume;
                sound.src = SoundMgr_csjc.soundResPath_csjc + name + ".mp3";
                sound.onEnded(function () {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                });
            }
            sound.play();
        }
        else {
            var res = Laya.SoundManager.playSound(url, 1);
            if (res != null)
                res.volume = 1;
        }
    };
    SoundMgr_csjc.prototype.playBGM_csjc = function (name) {
        var url = this.getSoundUrl_csjc(name);
        if (Laya.Browser.onMiniGame) {
            if (!this.bgm_csjc) {
                this.bgm_csjc = wx.createInnerAudioContext();
            }
            this.bgm_csjc.pause();
            this.bgm_csjc.src = url;
            this.bgm_csjc.loop = true;
            this.bgm_csjc.play();
        }
        else {
            Laya.SoundManager.playMusic(url, 0);
        }
    };
    SoundMgr_csjc.prototype.stopBGM_csjc = function () {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm_csjc) {
                this.bgm_csjc.stop();
                this.bgm_csjc.destroy();
                this.bgm_csjc = null;
            }
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    SoundMgr_csjc.prototype.setBGMVolume_csjc = function (volume) {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm_csjc) {
                this.bgm_csjc.volume = volume;
            }
        }
        else {
            Laya.SoundManager.setMusicVolume(volume);
        }
    };
    SoundMgr_csjc.soundResPath_csjc = "subRes/sound/";
    SoundMgr_csjc.instance_csjc = new SoundMgr_csjc();
    return SoundMgr_csjc;
}());
exports.default = SoundMgr_csjc;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageReq_csjc = /** @class */ (function () {
    function StorageReq_csjc() {
        this.key = null;
        this.data = {};
        this.success = null;
        this.fail = null;
        this.complete = null;
    }
    return StorageReq_csjc;
}());
exports.StorageReq_csjc = StorageReq_csjc;
//数据本地持久化保存
var StorageMgr_csjc = /** @class */ (function () {
    function StorageMgr_csjc() {
    }
    StorageMgr_csjc.setStorage_csjc = function (req) {
        var dataStr = JSON.stringify(req.data);
        if (!Laya.Browser.onMiniGame) {
            localStorage.setItem(req.key, dataStr);
            return;
        }
        wx.setStorage({
            key: req.key,
            data: dataStr,
            success: req.success,
            fail: req.fail,
            complete: req.complete
        });
    };
    StorageMgr_csjc.getStorage_csjc = function (key) {
        var value = null;
        try {
            if (!Laya.Browser.onMiniGame) {
                value = localStorage.getItem(key);
            }
            else {
                value = wx.getStorageSync(key);
            }
        }
        catch (e) {
        }
        return value;
    };
    return StorageMgr_csjc;
}());
exports.default = StorageMgr_csjc;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewDef_csjc;
(function (ViewDef_csjc) {
    ViewDef_csjc["None"] = "";
    ViewDef_csjc["TipsView"] = "View/TipsView.json";
    ViewDef_csjc["MainGameView"] = "View/Game/MainGameView.json";
    ViewDef_csjc["InGameView"] = "View/Game/InGameView.json";
    ViewDef_csjc["SelectHero"] = "View/Game/SelectHero.json";
    ViewDef_csjc["GameOverView"] = "View/Game/GameOverView.json";
    ViewDef_csjc["Export1AdView"] = "View/Game/Export1AdView.json";
    ViewDef_csjc["Export2AdView"] = "View/Game/Export2AdView.json";
    ViewDef_csjc["Export3AdView"] = "View/Game/Export3AdView.json";
    ViewDef_csjc["GameOverWinView"] = "View/Game/GameOverWinView.json";
    ViewDef_csjc["GameOverFailView"] = "View/Game/GameOverFailView.json";
    ViewDef_csjc["TestAdvisementView"] = "View/TestAdvisementView.json";
    //todo:添加你的界面
    ViewDef_csjc["SignInView"] = "View/Game/SignInView.json";
    ViewDef_csjc["ReviveView"] = "View/Game/ReviveView.json";
    ViewDef_csjc["GetSkinView"] = "View/Game/GetSkinView.json";
    ViewDef_csjc["SuperStartView"] = "View/Game/SuperStartView.json";
    ViewDef_csjc["OppoNativeAd"] = "View/OPPO/OppoNativeAdView.json";
    ViewDef_csjc["HExport1AdView"] = "View/Game/HExport1AdView.json";
    ViewDef_csjc["HExport2AdView"] = "View/Game/HExport2AdView.json";
    ViewDef_csjc["FriendExportView"] = "View/Game/FriendExportView.json";
    ViewDef_csjc["TutorialView"] = "View/Game/TutorialView.json";
    ViewDef_csjc["KdBannerView"] = "View/Game/KdBannerView.json";
})(ViewDef_csjc = exports.ViewDef_csjc || (exports.ViewDef_csjc = {}));
//界面管理器
var ViewMgr_csjc = /** @class */ (function () {
    function ViewMgr_csjc() {
        this._views_csjc = {};
    }
    ViewMgr_csjc.prototype.openView_csjc = function (viewType, data, oncomplate) {
        if (this._views_csjc[viewType]) {
            var view = this._views_csjc[viewType];
            var coms = view._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
            return;
        }
        var viewUrl = String(viewType);
        var self = this;
        Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner) {
            Laya.stage.addChild(owner);
            var view = owner;
            self._views_csjc[viewType] = view;
            var coms = owner._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        element._viewDef = viewType;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
        }));
    };
    ViewMgr_csjc.prototype.closeView_csjc = function (viewType) {
        var view = this._views_csjc[viewType];
        if (view) {
            var owner = view;
            var coms = owner._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this._views_csjc[viewType] = null;
        }
    };
    ViewMgr_csjc.prototype.showView_csjc = function (viewType) {
        var view = this._views_csjc[viewType];
        if (view) {
            var coms = view._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.show();
                        break;
                    }
                }
            }
        }
    };
    ViewMgr_csjc.prototype.hideView_csjc = function (viewType) {
        var view = this._views_csjc[viewType];
        if (view) {
            var coms = view._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.hide();
                        break;
                    }
                }
            }
        }
    };
    ViewMgr_csjc.prototype.getView_csjc = function (viewType) {
        return this._views_csjc[viewType];
    };
    ViewMgr_csjc.prototype.showTips_csjc = function (msg) {
        this.openView_csjc(ViewDef_csjc.TipsView, msg);
    };
    ViewMgr_csjc.instance_csjc = new ViewMgr_csjc();
    return ViewMgr_csjc;
}());
exports.default = ViewMgr_csjc;
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("./aes.js");
var AesTools_csjc = /** @class */ (function () {
    function AesTools_csjc() {
    }
    //加密
    AesTools_csjc.encrypt_csjc = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools_csjc.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools_csjc.IV); //向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    //解密
    AesTools_csjc.decrypt_csjc = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools_csjc.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools_csjc.IV); //向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    AesTools_csjc.KEY = 'b#63fFJ6AvkK3YT*';
    AesTools_csjc.IV = 'J$f4DU%sNL73M&Go';
    return AesTools_csjc;
}());
exports.default = AesTools_csjc;
},{"./aes.js":16}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
var requestData_csjc = /** @class */ (function () {
    function requestData_csjc() {
        this.meth = "post";
        this.header = null;
        this.url = "";
        this.onSuccess = null;
        this.onFail = null;
        this.data = {};
    }
    return requestData_csjc;
}());
exports.requestData_csjc = requestData_csjc;
var HttpUnit_csjc = /** @class */ (function () {
    function HttpUnit_csjc() {
    }
    HttpUnit_csjc.request = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = NetConfig_1.default.serverUrl_csjc + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "http Success");
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "http fail");
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, HttpUnit_csjc, completeFunc);
        xhr.once(Laya.Event.ERROR, HttpUnit_csjc, errorFunc);
        // let dataStr:string = JSON.stringify(req.data);
        if (Laya.Browser.onMiniGame /* || AppConfig.onTTMiniGame */) {
            req.data.code = User_1.default.code_csjc;
        }
        else if (Laya.Browser.onQGMiniGame) //OPPO小游戏
         {
            req.data.oppotoken = User_1.default.code_csjc;
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            req.data.code = User_1.default.code_csjc;
        }
        else {
            // req.data.code = User_csjc.code_csjc;
        }
        var time = "time=" + String(Date.now());
        if (req.header == null) {
            req.header =
                [
                    "Content-Type", "application/json",
                    "state", NetConfig_1.default.state_csjc,
                    "gameid", NetConfig_1.default.gameid_csjc,
                    "sign", AesTools_1.default.encrypt_csjc(time),
                ];
        }
        if (User_1.default.token_csjc) {
            req.header.push("token");
            req.header.push(User_1.default.token_csjc);
        }
        xhr.send(req.url, /* JSON.stringify( */ req.data /* ) */, req.meth, "json", req.header);
    };
    //todo:这里添加你们和服务器相互的接口
    HttpUnit_csjc.login_csjc = function (onSuccess, onFail) {
        var req = new requestData_csjc();
        req.url = NetConfig_1.default.login_csjc;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    };
    HttpUnit_csjc.saveGameData_csjc = function (gameData, onSuccess, onFail) {
        var req = new requestData_csjc();
        req.url = NetConfig_1.default.saveGameData_csjc;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    };
    HttpUnit_csjc.getGameData_csjc = function (onSuccess, onFail) {
        var req = new requestData_csjc();
        req.url = NetConfig_1.default.getUser_csjc;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    HttpUnit_csjc.GetIpBlock_csjc = function (onSuccess, onFail) {
        if (-1 != NetConfig_1.default.gameid_csjc) {
            var req = new requestData_csjc();
            req.url = NetConfig_1.default.ipBlock;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit_csjc.request(req);
        }
    };
    HttpUnit_csjc.reportExport_csjc = function (appid, game_name, onSuccess, onFail) {
        var req = new requestData_csjc();
        req.url = NetConfig_1.default.reportExport;
        req.data.wbappid = appid;
        req.data.game_name = game_name;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    };
    HttpUnit_csjc.reportImport_csjc = function (appid, channel, onSuccess, onFail) {
        var req = new requestData_csjc();
        req.url = NetConfig_1.default.reportImport;
        req.data.wbappid = appid;
        req.data.channel = channel;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    };
    HttpUnit_csjc.getuserip_csjc = function (onSuccess, onFail) {
        var req = new requestData_csjc();
        req.url = NetConfig_1.default.getuserip;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    };
    return HttpUnit_csjc;
}());
exports.default = HttpUnit_csjc;
},{"../User/User":64,"./AesTools":13,"./NetConfig":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_csjc = /** @class */ (function () {
    function NetConfig_csjc() {
    }
    NetConfig_csjc.state_csjc = 0;
    NetConfig_csjc.gameid_csjc = -1;
    NetConfig_csjc.serverUrl_csjc = "";
    NetConfig_csjc.login_csjc = "";
    NetConfig_csjc.saveGameData_csjc = "";
    NetConfig_csjc.getUser_csjc = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    NetConfig_csjc.ipBlock = "";
    NetConfig_csjc.reportExport = "/api/share/getwaibuad";
    NetConfig_csjc.reportImport = "/api/share/getzjadml";
    NetConfig_csjc.getuserip = "/api/share/getuserip";
    return NetConfig_csjc;
}());
exports.default = NetConfig_csjc;
},{}],16:[function(require,module,exports){
var CryptoJS = CryptoJS || function (u, p) {
  var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
  r = l.WordArray = t.extend({
    init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length }, toString: function (a) { return (a || v).stringify(this) }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4) for (var k = 0; k < a; k++)c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4)c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e); this.sigBytes += a; return this }, clamp: function () {
      var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
        32 - 8 * (c % 4); a.length = u.ceil(c / 4)
    }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], e = 0; e < a; e += 4)c.push(4294967296 * u.random() | 0); return new r.init(c, a) }
  }), w = d.enc = {}, v = w.Hex = {
    stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) { var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255; e.push((k >>> 4).toString(16)); e.push((k & 15).toString(16)) } return e.join("") }, parse: function (a) {
      for (var c = a.length, e = [], j = 0; j < c; j += 2)e[j >>> 3] |= parseInt(a.substr(j,
        2), 16) << 24 - 4 * (j % 8); return new r.init(e, c / 2)
    }
  }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++)e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join("") }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++)e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c) } }, x = w.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(b.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))) } },
  q = l.BufferedBlockAlgorithm = t.extend({
    reset: function () { this._data = new r.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) { for (var q = 0; q < a; q += k)this._doProcessBlock(e, q); q = e.splice(0, a); c.sigBytes -= j } return new r.init(q, j) }, clone: function () {
      var a = t.clone.call(this);
      a._data = this._data.clone(); return a
    }, _minBufferSize: 0
  }); l.Hasher = q.extend({
    cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b) } }, _createHmacHelper: function (a) {
      return function (b, e) {
        return (new n.HMAC.init(a,
          e)).finalize(b)
      }
    }
  }); var n = d.algo = {}; return d
}(Math);
(function () {
  var u = CryptoJS, p = u.lib.WordArray; u.enc.Base64 = {
    stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3)for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++)d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64)) for (; d.length % 4;)d.push(l); return d.join("") }, parse: function (d) {
      var l = d.length, s = this._map, t = s.charAt(64); t && (t = d.indexOf(t), -1 != t && (l = t)); for (var t = [], r = 0, w = 0; w <
        l; w++)if (w % 4) { var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4); t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4); r++ } return p.create(t, r)
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  }
})();
(function (u) {
  function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n } function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n } function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n } function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n } for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++)b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0; r = r.MD5 = v.extend({
    _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]) },
    _doProcessBlock: function (q, n) {
      for (var a = 0; 16 > a; a++) { var c = n + a, e = q[c]; q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360 } var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]),
        f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f,
          m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m,
            E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]); a[0] = a[0] + f | 0; a[1] = a[1] + m | 0; a[2] = a[2] + g | 0; a[3] = a[3] + h | 0
    }, _doFinalize: function () {
      var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes; n[c >>> 5] |= 128 << 24 - c % 32; var e = u.floor(a /
        4294967296); n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360; n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360; b.sigBytes = 4 * (n.length + 1); this._process(); b = this._hash; n = b.words; for (a = 0; 4 > a; a++)c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360; return b
    }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b }
  }); t.MD5 = v._createHelper(r); t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
  var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) { n && s.update(n); var n = s.update(d).finalize(r); s.reset(); for (var a = 1; a < p; a++)n = s.finalize(n), s.reset(); b.concat(n) } b.sigBytes = 4 * q; return b } }); u.EvpKDF = function (d, l, p) {
    return s.create(p).compute(d,
      l)
  }
})();
CryptoJS.lib.Cipher || function (u) {
  var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
    cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a) }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a) }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset() }, reset: function () { t.reset.call(this); this._doReset() }, process: function (e) { this._append(e); return this._process() },
    finalize: function (e) { e && this._append(e); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d) }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d) } } }
  }); d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var b = p.mode = {}, x = function (e, a, b) {
    var c = this._iv; c ? this._iv = u : c = this._prevBlock; for (var d = 0; d < b; d++)e[a + d] ^=
      c[d]
  }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a) }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a) }, init: function (e, a) { this._cipher = e; this._iv = a } })).extend(); q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c) } }); q.Decryptor = q.extend({
    processBlock: function (e, a) {
      var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c); b.decryptBlock(e, a); x.call(this,
        e, a, c); this._prevBlock = d
    }
  }); b = b.CBC = q; q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4)l.push(d); c = s.create(l, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; d.BlockCipher = v.extend({
    cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
      v.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1; this._mode = c.call(a,
        this, b && b.words)
    }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
  }); var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), b = (p.format = {}).OpenSSL = {
    stringify: function (a) {
      var b = a.ciphertext; a = a.salt; return (a ? s.create([1398893684,
        1701076831]).concat(a).concat(b) : b).toString(r)
    }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = s.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return n.create({ ciphertext: a, salt: c }) }
  }, a = d.SerializableCipher = l.extend({
    cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }) },
    decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
  }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }) } }, c = d.PasswordBasedCipher = a.extend({
    cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
      l = this.cfg.extend(l); d = l.kdf.execute(d,
        b.keySize, b.ivSize); l.iv = d.iv; b = a.encrypt.call(this, b, c, d.key, l); b.mixIn(d); return b
    }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l) }
  })
}();
(function () {
  for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++)a[c] = 128 > c ? c << 1 : c << 1 ^ 283; for (var e = 0, j = 0, c = 0; 256 > c; c++) { var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99; l[e] = k; s[k] = e; var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k; t[e] = y << 24 | y >>> 8; r[e] = y << 16 | y >>> 16; w[e] = y << 8 | y >>> 24; v[e] = y; y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e; b[k] = y << 24 | y >>> 8; x[k] = y << 16 | y >>> 16; q[k] = y << 8 | y >>> 24; n[k] = y; e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1 } var H = [0, 1, 2, 4, 8,
    16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
      _doReset: function () {
        for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)if (j < d) e[j] = c[j]; else { var k = e[j - 1]; j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24); e[j] = e[j - d] ^ k } c = this._invKeySchedule = []; for (d = 0; d < a; d++)j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
          8 & 255]] ^ n[l[k & 255]]
      }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l) }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
        for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++)var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
          d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t; q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++]; s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++]; t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++]; n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++]; a[b] = q; a[b + 1] = s; a[b + 2] = t; a[b + 3] = n
      }, keySize: 8
    }); u.AES = p._createHelper(d)
})();

module.exports = CryptoJS;
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CachedWXBannerAd_csjc = /** @class */ (function () {
    function CachedWXBannerAd_csjc() {
    }
    Object.defineProperty(CachedWXBannerAd_csjc, "GetBannerId_csjc", {
        get: function () {
            if (this._wxBannerIds_csjc.length == 0)
                return "";
            var index = this._bannerIndex_csjc;
            if (this._bannerIndex_csjc > this._wxBannerIds_csjc.length - 1) {
                this._bannerIndex_csjc = 0;
                index = this._bannerIndex_csjc;
            }
            this._bannerIndex_csjc++;
            return this._wxBannerIds_csjc[index];
        },
        enumerable: true,
        configurable: true
    });
    CachedWXBannerAd_csjc.preloadBanner_csjc = function () {
        var bannerTodayBannerMax = 10;
        var preLoadBanners = new Array();
        for (var i = 0; i < this._wxBannerIds_csjc.length; ++i) {
            preLoadBanners.push(this._wxBannerIds_csjc[i]);
        }
        if (preLoadBanners.length > bannerTodayBannerMax) {
            var delNum = preLoadBanners.length - bannerTodayBannerMax;
            for (var i = 0; i < delNum; ++i) {
                preLoadBanners.splice(Math.floor(Math.random() * preLoadBanners.length), 1);
            }
        }
        console.log("开始预创建微信Bannaer", preLoadBanners);
        console.log("Bannaer 最大数限制 ：", bannerTodayBannerMax);
        var counter = 0;
        Laya.timer.loop(2000, CachedWXBannerAd_csjc._preLoopObj_csjc, function () {
            if (counter >= preLoadBanners.length) {
                Laya.timer.clearAll(CachedWXBannerAd_csjc._preLoopObj_csjc);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = CachedWXBannerAd_csjc._bannerCache_csjc[bannerid];
            if (null == banner) {
                banner = CachedWXBannerAd_csjc.create_csjc(bannerid);
                if (null != banner) {
                    CachedWXBannerAd_csjc._bannerCache_csjc[bannerid] = banner;
                    console.log("预创建微信Bannaer", bannerid, "完成");
                }
            }
            ++counter;
        });
    };
    CachedWXBannerAd_csjc.getBanner_csjc = function (bannerid) {
        if (null == bannerid || "" == bannerid)
            return null;
        var banner = CachedWXBannerAd_csjc._bannerCache_csjc[bannerid];
        if (null == banner) {
            banner = CachedWXBannerAd_csjc.create_csjc(bannerid);
            if (null != banner) {
                CachedWXBannerAd_csjc._bannerCache_csjc[bannerid] = banner;
            }
        }
        return banner;
    };
    CachedWXBannerAd_csjc.create_csjc = function (bannerid) {
        if (Laya.Browser.onMiniGame) {
            if (this._sysInfo == null) {
                this._sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            }
            var sw = this._sysInfo.screenWidth;
            var sh = this._sysInfo.screenHeight;
            var dpr = Laya.stage.height / sh;
            var banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerid,
                adIntervals: 30,
                style: {
                    left: (sw - 300) / 2,
                    top: sh - 115,
                    width: 300,
                }
            });
            if (banner) {
                banner.onLoad(function (res) {
                    console.log("CachedWXBanner 广告 加载完成", bannerid);
                });
                banner.onError(function (err) {
                    console.log("CachedWXBanner 广告 加载失败", bannerid);
                });
                banner.onResize(function (res) {
                    console.log(banner.style.realWidth, banner.style.realHeight);
                });
            }
            return banner;
        }
        else {
            return null;
        }
    };
    CachedWXBannerAd_csjc.show_csjc = function (style) {
        if (CachedWXBannerAd_csjc._curBanner_csjc != null) {
            if (style == -1) {
                CachedWXBannerAd_csjc._curBanner_csjc.style.left = 35;
            }
            else if (style == 1) {
                CachedWXBannerAd_csjc._curBanner_csjc.style.left = this._sysInfo.screenWidth - 300;
            }
            else {
                CachedWXBannerAd_csjc._curBanner_csjc.style.left = (this._sysInfo.screenWidth - 300) / 2;
            }
            CachedWXBannerAd_csjc._curBanner_csjc.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ", this._curBannerId_csjc);
        }
        else {
            this._curBannerId_csjc = this.GetBannerId_csjc;
            var banner = CachedWXBannerAd_csjc.getBanner_csjc(this._curBannerId_csjc);
            if (banner) {
                CachedWXBannerAd_csjc._curBanner_csjc = banner;
                // var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                // var sw = sysInfo.screenWidth;
                // var sh = sysInfo.screenHeight;
                // CachedWXBannerAd_csjc._curBanner_csjc.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
                if (style == -1) {
                    CachedWXBannerAd_csjc._curBanner_csjc.style.left = 35;
                }
                else if (style == 1) {
                    CachedWXBannerAd_csjc._curBanner_csjc.style.left = this._sysInfo.screenWidth - 300;
                }
                else {
                    CachedWXBannerAd_csjc._curBanner_csjc.style.left = (this._sysInfo.screenWidth - 300) / 2;
                }
                CachedWXBannerAd_csjc._curBanner_csjc.show();
                console.log("CachedWXBanner 广告显示 bannerid ： ", this._curBannerId_csjc);
            }
            else {
                console.log("CachedWXBanner 不存在 bannerid ： ", this._curBannerId_csjc);
            }
        }
    };
    CachedWXBannerAd_csjc.hide_csjc = function (destroy) {
        if (destroy === void 0) { destroy = true; }
        Laya.timer.clearAll(CachedWXBannerAd_csjc);
        if (null != CachedWXBannerAd_csjc._curBanner_csjc) {
            var rd = Math.random() > Math.max(0.5, (this._bannerDestoryTime / 15));
            if (rd && destroy) {
                CachedWXBannerAd_csjc._curBanner_csjc.destroy();
                var banner = this.create_csjc(this._curBannerId_csjc);
                if (null != banner) {
                    CachedWXBannerAd_csjc._bannerCache_csjc[this._curBannerId_csjc] = banner;
                    console.log("开始隐藏销毁重新创建微信Bannaer", this._curBannerId_csjc);
                }
                this._bannerDestoryTime++;
            }
            else {
                CachedWXBannerAd_csjc._curBanner_csjc.hide();
                console.log("CachedWXBanner 广告单纯隐藏 bannerid ： ", this._curBannerId_csjc);
            }
            CachedWXBannerAd_csjc._curBanner_csjc = null;
        }
    };
    CachedWXBannerAd_csjc.changeShow_csjc = function (style, destroy) {
        if (destroy === void 0) { destroy = true; }
        if (null != CachedWXBannerAd_csjc._curBanner_csjc) {
            CachedWXBannerAd_csjc._curBanner_csjc.hide(destroy);
            CachedWXBannerAd_csjc._curBanner_csjc = null;
        }
        CachedWXBannerAd_csjc.show_csjc(style);
    };
    // public static changeShow_csjc(style: number, destroy: boolean = true) {
    //     console.log("CachedWXBanner 广告切换");
    //     this.hide_csjc(destroy);
    //     this._curBannerId_csjc = this.GetBannerId_csjc;
    //     console.log(1111111111111111111111);
    //     console.log(this._curBannerId_csjc);
    //     console.log(this.getBanner_csjc(this._curBanner_csjc));
    //     var banner = CachedWXBannerAd_csjc.getBanner_csjc(this._curBannerId_csjc);
    //     CachedWXBannerAd_csjc._curBanner_csjc = banner;
    //     CachedWXBannerAd_csjc.show_csjc(style);
    //     this.preloadNext();
    //     console.log(2222222222222);
    //     console.log(this._curBannerId_csjc);
    //     console.log(this.getBanner_csjc(this._curBanner_csjc));
    // }
    CachedWXBannerAd_csjc.clear_csjc = function () {
        Laya.timer.clearAll(CachedWXBannerAd_csjc);
        for (var key in CachedWXBannerAd_csjc._bannerCache_csjc) {
            var banner = CachedWXBannerAd_csjc._bannerCache_csjc[key];
            if (null != banner) {
                banner.destroy();
            }
            CachedWXBannerAd_csjc._bannerCache_csjc[key] = null;
        }
    };
    CachedWXBannerAd_csjc._bannerCache_csjc = {};
    CachedWXBannerAd_csjc._curBanner_csjc = null;
    CachedWXBannerAd_csjc._preLoopObj_csjc = {};
    CachedWXBannerAd_csjc._wxBannerIds_csjc = [
        "adunit-b56f2105151c8af4",
        "adunit-da778e192859eeb2",
        "adunit-02f4a57b7c1a334a"
        // ,
        // "adunit-2f8440701664c50a",
        // "adunit-184455f3f8e74277",
    ];
    CachedWXBannerAd_csjc._curBannerId_csjc = "";
    CachedWXBannerAd_csjc._bannerIndex_csjc = 0;
    CachedWXBannerAd_csjc._bannerDestoryTime = 0;
    return CachedWXBannerAd_csjc;
}());
exports.default = CachedWXBannerAd_csjc;
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var OPPOAPI_csjc = /** @class */ (function () {
    function OPPOAPI_csjc() {
    }
    Object.defineProperty(OPPOAPI_csjc, "GetNativeAd_csjc", {
        get: function () {
            OPPOAPI_csjc.nativeIndex++;
            if (OPPOAPI_csjc.nativeIndex > OPPOAPI_csjc.nativeAdList_csjc.length - 1) {
                OPPOAPI_csjc.nativeIndex = 0;
            }
            console.log("拿取原生返回Id： ", OPPOAPI_csjc.nativeAdList_csjc[OPPOAPI_csjc.nativeIndex]);
            return OPPOAPI_csjc.nativeAdList_csjc[OPPOAPI_csjc.nativeIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OPPOAPI_csjc, "BannerInstance_csjc", {
        get: function () {
            return OPPOAPI_csjc._banner_csjc;
        },
        enumerable: true,
        configurable: true
    });
    OPPOAPI_csjc.Login_csjc = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].login({
                success: function (res) {
                    var token = res.data.token;
                    onSuccess(token);
                    console.log("OPPO 登陆成功,获取到 token : " + token);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                },
                fail: function (res) {
                    console.log("OPPO 登陆失败", res);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                }
            });
        }
    };
    OPPOAPI_csjc.initAdService_csjc = function (onSuccess, onFail, onComplete) {
        Laya.Browser.window["qg"].initAdService({
            appId: OPPOAPI_csjc.appId_csjc,
            isDebug: false,
            success: function (res) {
                console.log("oppo initAdService success");
                if (onSuccess) {
                    onSuccess(res);
                }
            },
            fail: function (res) {
                console.log("oppo initAdService fail: ", res.code, res.msg);
                if (onFail) {
                    onFail(res);
                }
            },
            complete: function (res) {
                console.log("oppo initAdService complete");
                if (onComplete) {
                    onComplete(res);
                }
            }
        });
    };
    OPPOAPI_csjc.showRewardedVideoAd_csjc = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPOAPI_csjc.adUnitId_csjc,
            });
            videoAd.onLoad(function () {
                console.log("oppo 视频广告加载完成");
                videoAd.show();
            });
            videoAd.onVideoStart(function () {
                console.log("oppo 视频广告开始播放");
            });
            videoAd.onClose(function (res) {
                if (res.isEnded) {
                    console.log("oppo 视频广告观看 完成");
                    onAdClose(true);
                }
                else {
                    console.log("oppo 视频广告观看 未完成");
                    onAdClose(false);
                }
                videoAd.destroy();
            });
            videoAd.onError(function (err) {
                console.log("oppo 视频广告获取失败", err);
                for (var key in err) {
                    console.log(key, err[key]);
                }
                videoAd.destroy();
                onFailed();
            });
            videoAd.load();
        }
        else {
            onAdClose(true);
        }
    };
    OPPOAPI_csjc.navigateToMiniProgram_csjc = function (pkgName, gameName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            HttpUnit_1.default.reportExport_csjc(pkgName, gameName, function (result) {
                if (1 == result.code) {
                    console.log("OPPO 导出上报成功");
                }
                else {
                    console.log("OPPO 导出上报失败", result.msg);
                }
            }, function (result) {
                console.log("OPPO 导出上报失败");
                for (var key in result) {
                    console.log(key, result[key]);
                }
            });
            var time = Date.now();
            while (Date.now() - time <= 500) {
            }
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: OPPOAPI_csjc.appId_csjc
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
            });
        }
    };
    // public static showInterstitialAd_csjc(onAdClose: Function, onFailed: Function) {
    //     if (Laya.Browser.onQGMiniGame) {
    //         var insertAd = qg.createInsertAd({
    //             posId: OPPOAPI_csjc.insAdUnitId_csjc
    //         })
    //         insertAd.load();
    //         insertAd.onLoad(() => {
    //             console.log("插屏广告加载完成");
    //             insertAd.show();
    //         })
    //         insertAd.onShow(() => {
    //             console.log("插屏广告显示成功");
    //         })
    //         insertAd.onError((err) => {
    //             console.log("插屏广告拉取失败", err);
    //             for (var key in err) {
    //                 console.log(key, err[key]);
    //             }
    //             insertAd.destroy();
    //             if (onFailed) {
    //                 onFailed();
    //             }
    //         })
    //     }
    //     else {
    //         onAdClose();
    //     }
    // }
    OPPOAPI_csjc.showBannaerAd_csjc = function () {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO显示Banner");
            if (OPPOAPI_csjc._banner_csjc) {
                OPPOAPI_csjc._banner_csjc.show();
                return;
            }
            var bannerAd = qg.createBannerAd({
                posId: OPPOAPI_csjc.bannerAdUnitId_csjc
            });
            bannerAd.onError(function (err) {
                console.log("Banner广告拉取失败", err);
                for (var key in err) {
                    console.log(key, err[key]);
                }
            });
            bannerAd.show();
            OPPOAPI_csjc._banner_csjc = bannerAd;
        }
    };
    OPPOAPI_csjc.hideBannerAd_csjc = function () {
        if (OPPOAPI_csjc._banner_csjc) {
            OPPOAPI_csjc._banner_csjc.hide();
        }
    };
    OPPOAPI_csjc.getLaunchOptionsSync_csjc = function () {
        var obj = { query: "", referrerInfo: { package: "", extraData: { appid: "" } } };
        if (Laya.Browser.onQGMiniGame) {
            var options = Laya.Browser.window["qg"].getLaunchOptionsSync();
            if (null != options && options != "") {
                obj = options;
            }
            else {
                console.log("没有启动设置！！！");
            }
            return obj;
        }
        return obj;
    };
    OPPOAPI_csjc.share_csjc = function (complate, titel, imageUrl) {
        complate(false);
    };
    OPPOAPI_csjc.createDesktopIcon_csjc = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut({
                            success: function () {
                                if (onSuccess) {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail) {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！", err);
                                for (var key in err) {
                                    console.log(key, err);
                                }
                            },
                            complete: function () {
                            }
                        });
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onFail) {
                            onFail();
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    OPPOAPI_csjc.hasDesktopIcon_csjc = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        console.log("桌面图标不存在！！！！");
                        if (onSuccess) {
                            onSuccess(false);
                        }
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onSuccess) {
                            onSuccess(true);
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    OPPOAPI_csjc.appId_csjc = "30263446";
    OPPOAPI_csjc.adUnitId_csjc = "258312";
    OPPOAPI_csjc.bannerAdUnitId_csjc = "258306";
    // public static readonly insAdUnitId_csjc = "";
    // public static readonly openScreenAdUnitId_csjc = "176944";
    OPPOAPI_csjc.nativeAdId_csjc = "258308";
    OPPOAPI_csjc.nativeAdList_csjc = [
        "258308",
        "258309",
        "258310",
    ];
    OPPOAPI_csjc.nativeIndex = 0;
    OPPOAPI_csjc._banner_csjc = null;
    return OPPOAPI_csjc;
}());
exports.default = OPPOAPI_csjc;
},{"../Net/HttpUnit":14}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../User/User");
var GameConfig_1 = require("../GameConfig");
var SoundMgr_1 = require("../Mgr/SoundMgr");
var GameSettings_1 = require("../GameSettings");
var VIVOAPI_csjc = /** @class */ (function () {
    function VIVOAPI_csjc() {
    }
    Object.defineProperty(VIVOAPI_csjc, "BannerInstance_csjc", {
        get: function () {
            return VIVOAPI_csjc._banner_csjc;
        },
        enumerable: true,
        configurable: true
    });
    VIVOAPI_csjc.Login_csjc = function (onSuccess, onFail) {
        console.log("vivo 开始登陆");
        if (Laya.Browser.window["qg"].getSystemInfoSync().platformVersionCode >= 1053) {
            Laya.Browser.window["qg"].login().then(function (res) {
                console.log("开始登陆成功 >= 1053");
                if (res.data.token) {
                    // 使用token进行服务端对接
                    var token = res.data.token;
                    onSuccess(token, true);
                    console.log("vivo 登陆成功,获取到 token : " + token);
                }
            }, function (err) {
                console.log('登录失败' + JSON.stringify(err));
                VIVOAPI_csjc.showDialog_csjc();
            });
        }
        else {
            Laya.Browser.window["qg"].authorize({
                type: "token",
                success: function (data) {
                    // 使用token进行服务端对接
                    Laya.Browser.window["qg"].getProfile({
                        token: data.accessToken,
                        success: function (data) {
                            console.log('openid获取成功', data.openid);
                            onSuccess(data.openid, false);
                        },
                        fail: function (data, code) {
                            VIVOAPI_csjc.showDialog_csjc();
                            console.log("获取openid失败 : " + code);
                        }
                    });
                },
                fail: function (data, code) {
                    console.log('登录失败' + code);
                    VIVOAPI_csjc.showDialog_csjc();
                }
            });
        }
    };
    //提示弹窗
    VIVOAPI_csjc.showDialog_csjc = function () {
        Laya.Browser.window["qg"].showDialog({
            title: '提示',
            message: '登录失败，点击确定按钮重试',
            buttons: [
                {
                    text: '确定',
                    color: '#33dd44'
                }
            ],
            success: function (data) {
                console.log('handling callback');
                VIVOAPI_csjc.VIVOLogin_csjc();
            },
            cancel: function () {
                console.log('handling cancel');
            },
            fail: function (data, code) {
                console.log("handling fail, code = " + code);
            }
        });
    };
    //vivo登录
    VIVOAPI_csjc.VIVOLogin_csjc = function () {
        var _this = this;
        VIVOAPI_csjc.Login_csjc(function (code, type) {
            if (type) {
                console.log("登陆token1111:", code);
                User_1.default.code_csjc = code;
            }
            else {
                User_1.default.openId_csjc = code;
            }
            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(this, function () {
            }));
        }, function () {
            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
            }));
        });
    };
    //创建视频广告
    VIVOAPI_csjc.createRewardedVideoAd_csjc = function () {
        if (Laya.Browser.onVVMiniGame) {
            VIVOAPI_csjc.rewardedAd_csjc = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: VIVOAPI_csjc.adUnitId_csjc,
                style: {}
            });
            VIVOAPI_csjc.rewardedAd_csjc.onError(function (err) {
                switch (err.errCode) {
                    case -3:
                        console.log("激励广告加载失败---调用太频繁", JSON.stringify(err));
                        break;
                    case -4:
                        console.log("激励广告加载失败--- 一分钟内不能重复加载", JSON.stringify(err));
                        break;
                    case 30008:
                        // 当前启动来源不支持激励视频广告，请选择其他激励策略
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("激励广告展示失败");
                        console.log(JSON.stringify(err));
                        break;
                }
            });
        }
    };
    //显示视频广告
    VIVOAPI_csjc.showRewardedVideoAd_csjc = function (onAdClose, onFailed) {
        if (Laya.Browser.onVVMiniGame) {
            SoundMgr_1.default.instance_csjc.stopBGM_csjc();
            console.log("---------------------------------- VIVOAPI.rewardedAd:", VIVOAPI_csjc.rewardedAd_csjc + ",VIVOAPI.rewardedAdNum:", VIVOAPI_csjc.rewardedAdNum_csjc);
            // if (VIVOAPI.rewardedAd == null) {
            //     onFailed();
            //     return;
            // }
            if (VIVOAPI_csjc.rewardedAdNum_csjc == 0) {
                VIVOAPI_csjc.createRewardedVideoAd_csjc();
            }
            else {
                // 第一次creat后广告可以在onload里面直接show
                // 后续的加载必须要load才能触发onload接着才能show出广告
                var adLoad = VIVOAPI_csjc.rewardedAd_csjc.load(); //第一次调用 可能会报-3  广告能正常展示就可以忽略
                // 捕捉load失败的错误
                adLoad && adLoad.catch(function (err) {
                    console.log("激励广告load失败" + JSON.stringify(err));
                    onFailed();
                });
            }
            VIVOAPI_csjc.rewardedAdNum_csjc = 1;
            console.log("近来showRewardedVideoAd");
            VIVOAPI_csjc.rewardedAd_csjc.onLoad(function () {
                var adshow = VIVOAPI_csjc.rewardedAd_csjc.show();
                // 捕捉show失败的错误
                adshow && adshow.then(function () {
                    console.log("激励广告展示成功");
                }).catch(function (err) {
                    console.log("激励广告展示失败" + JSON.stringify(err));
                    onFailed();
                });
            });
            VIVOAPI_csjc.rewardedAd_csjc.onClose(function (res) {
                if (res && res.isEnded) {
                    console.log("正常播放结束，可以下发游戏奖励");
                    onAdClose(true);
                }
                else {
                    console.log("播放中途退出，不下发游戏奖励");
                    onAdClose(false);
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    VIVOAPI_csjc.showBannerAd_csjc = function () {
        var self = VIVOAPI_csjc;
        if (Laya.Browser.onVVMiniGame) {
            console.log('===========bannerAd showBanerAd');
            var systemInfo = Laya.Browser.window["qg"].getSystemInfoSync();
            var sw = systemInfo.screenWidth;
            var sh = systemInfo.screenHeight;
            VIVOAPI_csjc.mBannerAd_csjc = qg.createBannerAd({
                posId: VIVOAPI_csjc.bannerAdUnitId_csjc,
                style: {}
            });
            var adshow = VIVOAPI_csjc.mBannerAd_csjc.show();
            // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adshow && adshow.then(function () {
                console.log("banner广告展示成功");
            }).catch(function (err) {
                switch (err.code) {
                    case 30003:
                        console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                        break;
                    case 30009:
                        console.log("10秒内调用广告次数超过1次，10秒后再调用");
                        // setTimeout(() => {
                        //     show()
                        // }, 10000);
                        break;
                    case 30002:
                        console.log("加载广告失败，重新加载广告");
                        // setTimeout(() => {
                        //     retryShow()
                        // }, 10000);             
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("banner广告展示失败");
                        console.log(JSON.stringify(err));
                        break;
                }
            });
            VIVOAPI_csjc.mBannerAd_csjc.onError(function (err) {
                console.log('Banner广告加载失败111:' + JSON.stringify(err));
            });
        }
    };
    VIVOAPI_csjc.hideBannerAd_csjc = function () {
        if (VIVOAPI_csjc.mBannerAd_csjc) {
            console.log('===========bannerAd 隐藏');
            VIVOAPI_csjc.mBannerAd_csjc.hide();
            VIVOAPI_csjc.mBannerAd_csjc.destroy();
            // this.mBannerAd = null;
        }
        else {
            console.log('===========bannerAd 为空');
        }
    };
    VIVOAPI_csjc.navigateToMiniProgram_csjc = function (pkgName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onVVMiniGame) {
            console.log("vivo 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: GameSettings_1.default.AppID_csjc
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    VIVOAPI_csjc.preLoadInterstitialAd_csjc = function () {
        if (Laya.Browser.onVVMiniGame) {
            VIVOAPI_csjc._insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                posId: VIVOAPI_csjc.insAdUnitId_csjc
            });
        }
    };
    VIVOAPI_csjc.showInterstitialAd_csjc = function (onAdClose, onFailed) {
        var _this = this;
        if (Laya.Browser.onVVMiniGame) {
            if (VIVOAPI_csjc._insertAd == null)
                return;
            VIVOAPI_csjc._insertAd.onLoad(function () {
                console.log("插屏广告加载完成");
            });
            VIVOAPI_csjc._insertAd.onClose(function () {
                _this._insertAd = null;
                if (onAdClose)
                    onAdClose();
            });
            VIVOAPI_csjc._insertAd.onError(function (err) {
                console.log("插屏广告拉取失败", JSON.stringify(err));
                if (onFailed) {
                    onFailed();
                }
            });
            VIVOAPI_csjc._insertAd.show().then(function () {
                console.log('插屏广告展示完成');
            }).catch(function (err) {
                console.log('插屏广告展示失败', JSON.stringify(err));
            });
        }
        else {
            if (onAdClose)
                onAdClose();
        }
    };
    VIVOAPI_csjc.getLaunchOptionsSync_csjc = function () {
        return {};
    };
    VIVOAPI_csjc.share_csjc = function (complate) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].share({
                success: function () {
                    if (complate != null) {
                        complate(true);
                    }
                    Laya.Browser.window["qg"].showToast({
                        message: "分享成功"
                    });
                },
                fail: function (erromsg, errocode) {
                    // Laya.Browser.window["qg"].showToast({
                    //     message: "分享失败：" + errocode + ': ' + erromsg
                    // })
                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    });
                },
                cancel: function () {
                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    });
                },
                complete: function () {
                }
            });
        }
    };
    VIVOAPI_csjc.createDesktopIcon_csjc = function (onSuccess, onFail) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut({
                            success: function () {
                                if (onSuccess) {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail) {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！", err);
                                for (var key in err) {
                                    console.log(key, err);
                                }
                            },
                            complete: function () {
                            }
                        });
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onFail) {
                            onFail();
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    VIVOAPI_csjc.hasDesktopIcon_csjc = function (onSuccess, onFail) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        console.log("桌面图标不存在！！！！");
                        if (onSuccess) {
                            onSuccess(false);
                        }
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onSuccess) {
                            onSuccess(true);
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    VIVOAPI_csjc.adUnitId_csjc = "a8a44fd39bcd4e80a52e39be99074ac1"; //视频广告
    VIVOAPI_csjc.bannerAdUnitId_csjc = "bc2f7435abde42aeb30186460ff3c57b"; //banner广告
    VIVOAPI_csjc.nativeAdId_csjc = "caa8404ca6e7413795c43ed17189faff"; //原生广告
    VIVOAPI_csjc.insAdUnitId_csjc = "6ab8564f134e45508dc6a2be9b2d544f"; //插屏广告
    VIVOAPI_csjc.rewardedAd_csjc = null;
    VIVOAPI_csjc.rewardedAdNum_csjc = 0;
    VIVOAPI_csjc._banner_csjc = null;
    VIVOAPI_csjc.nativeAdList_csjc = [];
    VIVOAPI_csjc.nativeIndex_csjc = 0;
    VIVOAPI_csjc.mBannerAd_csjc = null;
    VIVOAPI_csjc._insertAd = null;
    return VIVOAPI_csjc;
}());
exports.default = VIVOAPI_csjc;
},{"../GameConfig":7,"../GameSettings":8,"../Mgr/SoundMgr":10,"../User/User":64}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_csjc = /** @class */ (function () {
    function WXAPI_csjc() {
    }
    WXAPI_csjc.wxLogin_csjc = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.login({
                success: function (res) {
                    if (res.code) {
                        var code = res.code;
                        onSuccess(code);
                        console.log("登陆成功,获取到code : " + code);
                    }
                }
            });
        }
    };
    WXAPI_csjc.onRewardedVideoAdLoad_csjc = function () {
        console.log('激励视频 广告加载完成');
    };
    WXAPI_csjc.onRewardedVideoAdError_csjc = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (WXAPI_csjc._onRewardedVideoAdFailed_csjc) {
            WXAPI_csjc._onRewardedVideoAdFailed_csjc();
        }
    };
    WXAPI_csjc.onRewardedVideoAdClose_csjc = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (WXAPI_csjc._onRewardedVideoAdClose_csjc) {
                WXAPI_csjc._onRewardedVideoAdClose_csjc(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (WXAPI_csjc._onRewardedVideoAdClose_csjc) {
                WXAPI_csjc._onRewardedVideoAdClose_csjc(false);
            }
        }
    };
    WXAPI_csjc.regRewardedVideoAdEvent_csjc = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(WXAPI_csjc.onRewardedVideoAdLoad_csjc);
        rewardedVideoAd.onError(WXAPI_csjc.onRewardedVideoAdError_csjc);
        rewardedVideoAd.onClose(WXAPI_csjc.onRewardedVideoAdClose_csjc);
        WXAPI_csjc._isRegRewardedVideoAdEvent_csjc = true;
    };
    WXAPI_csjc.showRewardedVideoAd_csjc = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            WXAPI_csjc._onRewardedVideoAdClose_csjc = onAdClose;
            WXAPI_csjc._onRewardedVideoAdFailed_csjc = onFailed;
            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                adUnitId: WXAPI_csjc.adUnitId_csjc,
            });
            if (!WXAPI_csjc._isRegRewardedVideoAdEvent_csjc) {
                WXAPI_csjc.regRewardedVideoAdEvent_csjc(rewardedVideoAd);
            }
            rewardedVideoAd.load().then(function () {
                var promise = rewardedVideoAd.show();
                promise.then(function () { return console.log('激励视频 广告显示成功'); });
                promise.catch(function (err) {
                    rewardedVideoAd.load()
                        .then(function () { return rewardedVideoAd.show(); })
                        .catch(function (err) {
                        console.log('激励视频 广告显示失败');
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
            }).catch(function (err) {
                console.log('激励视频 广告加载失败');
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    //----------------------------------------------------------------
    //-------------------------小游戏跳转---------------------------
    WXAPI_csjc.navigateToMiniProgram_csjc = function (appId, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["wx"].navigateToMiniProgram({
                appId: appId,
                path: path,
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    WXAPI_csjc.share_csjc = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            WXAPI_csjc._onShow_csjc = function () {
                Laya.Browser.window["wx"].offShow(WXAPI_csjc._onShow_csjc);
                WXAPI_csjc._onShow_csjc = null;
                var c = Date.now() - _this._lastShareTime_csjc;
                if (complate) {
                    if (Date.now() - _this._lastShareTime_csjc > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["wx"].onShow(WXAPI_csjc._onShow_csjc);
            WXAPI_csjc._lastShareTime_csjc = Date.now();
            Laya.Browser.window["wx"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    WXAPI_csjc.showInterstitialAd_csjc = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WXAPI_csjc.insAdUnitId_csjc,
            });
            interstitialAd.onLoad(function () {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch(function (err) {
                    console.log('插屏广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            });
            interstitialAd.onError(function (err) {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            });
            interstitialAd.onClose(function () {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            });
        }
        else {
            onAdClose();
        }
    };
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof WXAPI
     */
    WXAPI_csjc.getLaunchOptionsSync_csjc = function () {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onMiniGame) {
            var obj_1 = Laya.Browser.window["wx"].getLaunchOptionsSync();
            console.log("场景值 " + obj_1.scene);
            var str = JSON.stringify(obj_1.query);
            // console.log("Query参数 " + str);
            var key = obj_1.query["key"];
            // console.log("Query参数：key " + key);
            // console.log("ShareTicket " + obj.shareTicket);
            // console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
            // console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
            return obj_1;
        }
        var obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
        return obj;
    };
    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     *
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof WXAPI
     */
    WXAPI_csjc.SetShareMenu_csjc = function (titel, imageUrl, success, fail, complate) {
        if (Laya.Browser.onMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["wx"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["wx"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                };
            });
        }
    };
    //检测更新
    WXAPI_csjc.checkUpdate_csjc = function () {
        if (Laya.Browser.onMiniGame) {
            var updateManager = Laya.Browser.window["wx"].getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log("是否需要更新 : ", res.hasUpdate);
            });
            updateManager.onUpdateReady(function () {
                Laya.Browser.window["wx"].showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启小游戏？',
                    success: function (res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function () {
                console.log("新版本下载失败!!!");
            });
        }
    };
    WXAPI_csjc.adUnitId_csjc = "adunit-d03608b9c917e381";
    WXAPI_csjc.bannerAdUnitId_csjc = "adunit-184455f3f8e74277";
    WXAPI_csjc.insAdUnitId_csjc = "";
    WXAPI_csjc.nativeadId_csjc = "adunit-eeceae41aefd1185";
    //-------------------------激励视频---------------------------------
    WXAPI_csjc._isRegRewardedVideoAdEvent_csjc = false;
    WXAPI_csjc._onRewardedVideoAdFailed_csjc = null;
    WXAPI_csjc._onRewardedVideoAdClose_csjc = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    WXAPI_csjc._onShow_csjc = null;
    WXAPI_csjc._lastShareTime_csjc = 0;
    return WXAPI_csjc;
}());
exports.default = WXAPI_csjc;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("./HttpUnit");
var GameSettings_1 = require("../GameSettings");
var User_1 = require("../User/User");
var WXAPI_1 = require("../PlatformApi/WXAPI");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var EventMgr_2 = require("../Event/EventMgr");
/** 组件样式 */
var ComponentStyle;
(function (ComponentStyle) {
    ComponentStyle[ComponentStyle["ce_la_lan"] = 1] = "ce_la_lan";
    ComponentStyle[ComponentStyle["h_slider"] = 2] = "h_slider";
    ComponentStyle[ComponentStyle["banner"] = 3] = "banner";
    ComponentStyle[ComponentStyle["big_export_ui"] = 4] = "big_export_ui";
    ComponentStyle[ComponentStyle["over_ui"] = 5] = "over_ui";
    ComponentStyle[ComponentStyle["wei_tui_chu"] = 6] = "wei_tui_chu";
})(ComponentStyle = exports.ComponentStyle || (exports.ComponentStyle = {}));
/** APP操作记录 */
var APPItemRecord = /** @class */ (function () {
    function APPItemRecord() {
        /** 展示次数 */
        this.displayCount = 0;
        /** 点击次数 */
        this.clickCount = 0;
        /** 导出次数 */
        this.exportCount = 0;
        /** 是否成功导出 1已导出 */
        this.isExport = 0;
    }
    return APPItemRecord;
}());
exports.APPItemRecord = APPItemRecord;
/** APP信息 */
var APPItem = /** @class */ (function () {
    function APPItem() {
        /**动图序列帧 */
        this.gifList = [];
        /** 插屏图片列表 */
        this.screenList = [];
        /** banner图片列表 */
        this.bannerList = [];
        /** 权重 */
        this.weight = 1;
        // /** icon图片列表 */
        this.iconFilletList = [];
        /** 展示次数 */
        this.displayCount = 0;
        /**使用的图片资源，length为1表示静图，>1表示使用gift */
        this.useImgList = [];
    }
    return APPItem;
}());
exports.APPItem = APPItem;
var AdDataMgr = /** @class */ (function () {
    function AdDataMgr() {
        this.mAppId = ''; //产品的appid
        this.mOpenId = ''; //用户的openid
        this.mProductId = 0; //产品id
        this.mServerRootUrl = '"https://qp.qingpukj.com:8055/'; //游戏服务器接口url根路径
        this._canUsedStyle = []; // 可开启的导出组件类型 (ComponentStyle)
        this._products = []; // 全产品信息 
        this._isCheck = false; // 是否已过审
        this._loaded = false; //数据加载成功
        this.shareCount = 0;
        /** style导出次数 */
        this._materiaList = [];
        /** 导出产品记录 */
        this._exportProductList = [];
        /** 上报数据 */
        this._url_matrixReport = "reportGame/matrixReport";
        /** 记录 */
        this._recording = false;
        this.iconList = [];
        this.screenList = [];
        this.bannerList = [];
        this.iconNames = [];
        this.screenNames = [];
    }
    Object.defineProperty(AdDataMgr, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new AdDataMgr();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    AdDataMgr.prototype.InitMatix = function (callback, serverRootUrl) {
        if (serverRootUrl === void 0) { serverRootUrl = "https://qp.qingpukj.com:8055/"; }
        this.mAppId = GameSettings_1.default.AppID_csjc;
        this.mServerRootUrl = serverRootUrl;
        this.Init(callback || null);
    };
    AdDataMgr.prototype.Init = function (callback, shareUser) {
        if (shareUser === void 0) { shareUser = ''; }
        var self = this;
        this.LoadInfo(shareUser, function (res) {
            setInterval(function () {
                self.UpdateRecord();
            }, 30000);
            callback && callback(res);
        });
    };
    /** 加载配置 */
    AdDataMgr.prototype.LoadInfo = function (shareUser, callback) {
        var _this = this;
        var self = this;
        var option = WXAPI_1.default.getLaunchOptionsSync_csjc();
        var sceneCode = option.scene;
        var sceneAppId = '';
        if (option.referrerInfo && option.referrerInfo.appId)
            sceneAppId = option.referrerInfo.appId;
        var url = self.mServerRootUrl + 'business/product/game/getProductInfo';
        var paramsObj = {};
        paramsObj.appId = GameSettings_1.default.AppID_csjc;
        paramsObj.code = User_1.default.code_csjc;
        paramsObj.sceneCode = sceneCode;
        paramsObj.sceneAppId = sceneAppId;
        paramsObj.shareUser = shareUser;
        var paramsMsg = AdDataMgr.Instance.GetParamsMsgForObj(paramsObj);
        HttpUnit_1.HttpTools.Post(url, paramsMsg, this, function (data) {
            console.log("[Matrix]读取服务矩阵数据：", data);
            if (data && data.code == 0) {
                self._canUsedStyle = [];
                var canUseStringStyle = data.styleAssembly.split(",");
                for (var i = 0; i < canUseStringStyle.length; ++i) {
                    self._canUsedStyle.push(Number(canUseStringStyle[i]));
                }
                self.mProductId = data.productId;
                self._isCheck = (Number(data.isCheck) == 1); //1通过，2不通过 (string类型)
                self._products = [];
                if (!data.productExportList) {
                    self._loaded = false;
                    return;
                }
                for (var i = 0; i < data.productExportList.length; i++) {
                    var app = data.productExportList[i];
                    var productInfo = new APPItem();
                    productInfo.screenList = app.screenList;
                    productInfo.gifList = app.gifList;
                    productInfo.gameName = app.gameName;
                    productInfo.bannerList = app.bannerList;
                    productInfo.appId = app.appId;
                    productInfo.advertPath = app.advertPath;
                    productInfo.weight = app.weight;
                    productInfo.iconFilletList = app.iconFilletList;
                    productInfo.advertId = app.advertId;
                    productInfo.displayCount = 0;
                    self._products.push(productInfo);
                }
                if (User_1.default.openId_csjc == "") {
                    _this.mOpenId = data.openId;
                    User_1.default.openId_csjc = _this.mOpenId;
                }
                console.error("矩阵列表", _this._products);
                self._loaded = true;
            }
            _this.loadAllLink();
            callback && callback(data);
        }, function (data) {
            if (true /* PlatformManager.Instance.CurrentAgent.ContentName == "Default" */) {
                self._products = [];
                for (var i = 0; i < 10; i++) {
                    var data1 = {
                        advertId: 233,
                        advertPath: "?wxgamecid=CCBgAAoXkpQAM2KVNXRf9BKQ",
                        appId: "wxc5d17fdf515fbbc2",
                        bannerList: ["https://hn.g58mall.com/gameDevopsImgs/20200915/20200915104328_he7v.jpg"],
                        displayCount: 0,
                        gameName: "香肠大决斗",
                        gifList: [],
                        iconFilletList: ["https://hn.g58mall.com/gameDevopsImgs/20201022/20201022162732_utao.jpg", "https://hn.g58mall.com/gameDevopsImgs/20201022/20201022162744_58vd.png"],
                        screenList: ["https://hn.g58mall.com/gameDevopsImgs/20200915/20200915104244_kepk.jpg", "https://hn.g58mall.com/gameDevopsImgs/20200917/20200917160524_hxbi.png"],
                        useImgList: [],
                        weight: 10
                    };
                    self._products.push(data1);
                }
                self._loaded = true;
                _this.loadAllLink();
            }
            callback && callback(data);
        });
    };
    /** 应用跳转 */
    AdDataMgr.prototype.NavigateTo = function (style, data, _success, _fail) {
        AdDataMgr.Instance.AddClickRecord(style, data);
        WXAPI_1.default.navigateToMiniProgram_csjc(data.appId, data.advertPath, function (res) {
            AdDataMgr.Instance.AddOpenRecord(style, data, true);
            AdDataMgr.Instance.UpdateRecord();
            EventMgr_2.default.dispatch_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdSuccess_csjc, style);
            if (_success)
                _success(res);
        }, function (res) {
            console.log(res.errMsg);
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdFail_csjc);
            if (_fail)
                _fail(res);
        }, function (res) { });
    };
    /** 获取通用组件数据
    * style： 控件类型
    * count： 生成数量
    * return：没有数据时返回空数组
    */
    // public GetDataByStyleAndCount(style: ComponentStyle, count: number): Array<APPItem> {
    //     let result: APPItem[] = [];
    //     if (!this._products || this._products.length == 0) return result;
    //     if (!this.CanUseStyle(style)) return result;
    //     if (!this._loaded) return result;
    //     let libs: APPItem[] = [];
    //     for (let i = 0; i < this._products.length; i++) {
    //         libs[i] = this._products[i];
    //     }
    //     let usedImgsArray: Array<string> = [];
    //     let useGifAdIdsArray: Array<string> = [];
    //     let loopCount = 0;
    //     while (result.length < count && libs.length > 0 && loopCount < count * 50) {
    //         ++loopCount;
    //         let index = AdDataMgr.Instance.GetRandomByWeight(libs);
    //         let randData = JSON.parse(JSON.stringify(libs[index]));
    //         let isCanUseGif = (useGifAdIdsArray.indexOf(randData.appId) == -1);
    //         let useImgUrls = AdDataMgr.Instance.GetUseImgUrl(style, randData, isCanUseGif, usedImgsArray);
    //         if (useImgUrls.length > 0) {
    //             randData.useImgList = useImgUrls;
    //             result.push(randData);
    //             if (useImgUrls.length == 1) {
    //                 usedImgsArray.push(useImgUrls[0]);
    //             }
    //             else {
    //                 useGifAdIdsArray.push(randData.appId);
    //             }
    //         }
    //         else {
    //             libs.splice(index, 1);
    //         }
    //     }
    //     result = this.RepetitionArr(result);
    //     return result;
    // }
    /** 获取通用组件数据
    * style： 控件类型
    * count： 生成数量
    * return：没有数据时返回空数组
    */
    AdDataMgr.prototype.GetDataByStyleAndCount = function (style, count) {
        // cc.error('style ===>', style, count);
        var result = [];
        if (!this._products || this._products.length == 0)
            return result;
        // if (!this.canUseStyle(style)) return result;
        if (!this._loaded)
            return result;
        var arr = [4];
        if (this.screenList.length < count || this.iconList.length < count)
            this.loadAllLink();
        if (style == 3) {
            result = this.bannerList.splice(0, count);
        }
        else if (arr.indexOf(style) > -1) {
            result = this.screenList.splice(0, count);
        }
        else {
            result = this.iconList.splice(0, count);
        }
        this.AddShowRecord(style);
        // cc.error('res ==', result);
        return result;
    };
    AdDataMgr.prototype.loadAllLink = function () {
        this.iconList = [];
        this.screenList = [];
        // this.iconNames = [];
        // this.screenNames = [];
        for (var i = 0; i < this._products.length; i++) {
            var appItem = this._products[i];
            appItem.iconFilletList.sort(function (a, b) { return Math.random() - 0.5; });
            appItem.screenList.sort(function (a, b) { return Math.random() - 0.5; });
        }
        for (var i = 0; i < 4; i++) {
            var _iconList1 = [];
            var _iconList2 = [];
            var _screenList1 = [];
            var _screenList2 = [];
            for (var j = 0; j < this._products.length; j++) {
                var appItem = JSON.parse(JSON.stringify(this._products[j]));
                if (appItem.iconFilletList[i]) {
                    appItem = JSON.parse(JSON.stringify(this._products[j]));
                    appItem.useImgList = [appItem.iconFilletList[i]];
                    j > this._products.length / 2 ? _iconList1.push(appItem) : _iconList2.push(appItem);
                    // this.iconNames.push({gameName: appItem.gameName, useImgList: appItem.useImgList});
                }
                if (appItem.screenList[i]) {
                    appItem = JSON.parse(JSON.stringify(this._products[j]));
                    appItem.useImgList = [appItem.screenList[i]];
                    j > this._products.length / 2 ? _screenList1.push(appItem) : _screenList2.push(appItem);
                    // this.screenNames.push({gameName: appItem.gameName, useImgList: appItem.useImgList});
                }
                if (appItem.bannerList[i]) {
                    appItem = JSON.parse(JSON.stringify(this._products[j]));
                    appItem.useImgList = [appItem.bannerList[i]];
                    this.bannerList.push(appItem);
                }
            }
            _iconList1.sort(function (a, b) { return Math.random() - 0.5; });
            _iconList2.sort(function (a, b) { return Math.random() - 0.5; });
            _screenList1.sort(function (a, b) { return Math.random() - 0.5; });
            _screenList2.sort(function (a, b) { return Math.random() - 0.5; });
            this.bannerList.sort(function (a, b) { return Math.random() - 0.5; });
            this.iconList = this.iconList.concat(_iconList1, _iconList2);
            this.screenList = this.iconList.concat(_screenList1, _screenList2);
        }
        // console.log('this.iconList ==>', this.iconList);
        // console.log('this.screenList ==>', this.screenList);
        // console.log('this.iconNames ==>', this.iconNames);
        // console.log('this.screenNames ==>', this.screenNames);
    };
    AdDataMgr.prototype.RepetitionArr = function (list) {
        var data = {};
        for (var index = 0; index < list.length; index++) {
            var app = list[index];
            var array = data[app.appId];
            if (!array) {
                array = [];
            }
            array.push(app);
            data[app.appId] = array;
        }
        var apps = [];
        for (var index = 0; index < 5; index++) {
            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    var element = data[key];
                    var appitem = element[index];
                    if (appitem) {
                        apps.push(element[index]);
                    }
                }
            }
        }
        return apps;
    };
    // 获取广告在特定位置的图片路径集合
    AdDataMgr.prototype.GetUseImgUrl = function (style, data, isCanUseGif, ginoreUrls) {
        if (!data) {
            return [];
        }
        var giftList = [];
        if (this.GetIsCanUseGifByStyle(style) && isCanUseGif && data.gifList && data.gifList.length > 0) {
            giftList = data.gifList;
        }
        var iconsArray = [];
        switch (style) {
            case ComponentStyle.ce_la_lan:
                iconsArray = data.screenList;
                break;
            case ComponentStyle.big_export_ui:
                iconsArray = data.screenList;
                break;
            case ComponentStyle.banner:
                iconsArray = data.bannerList;
                break;
            case ComponentStyle.h_slider:
                iconsArray = data.iconFilletList;
                break;
            case ComponentStyle.over_ui:
                iconsArray = data.iconFilletList;
                break;
        }
        var targetNum = 0.5;
        if (giftList.length == 0) {
            targetNum = 1.1;
        }
        var randValue = Math.random();
        if (randValue > targetNum) {
            return giftList;
        }
        if (iconsArray.length == 0) {
            return [];
        }
        var canUseImgArray = [];
        for (var i = 0; i < iconsArray.length; ++i) {
            if (ginoreUrls.indexOf(iconsArray[i]) == -1) {
                canUseImgArray.push(iconsArray[i]);
            }
        }
        if (canUseImgArray.length == 0) {
            return [];
        }
        var randIndex = Math.floor(Math.random() * canUseImgArray.length);
        return [canUseImgArray[randIndex]];
    };
    /** 根据权重随机 */
    AdDataMgr.prototype.GetRandomByWeight = function (arr) {
        var total = 0;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i].weight;
        }
        var r = Math.floor(Math.random() * total);
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) {
                r -= arr[i - 1].weight;
            }
            if (r < arr[i].weight) {
                index = i;
                break;
            }
        }
        return index;
    };
    AdDataMgr.prototype.GetIsCanUseGifByStyle = function (style) {
        return (style == ComponentStyle.ce_la_lan || style == ComponentStyle.big_export_ui || style == ComponentStyle.h_slider);
    };
    AdDataMgr.prototype.GetParamsMsgForObj = function (paramsObj) {
        var res = [];
        for (var key in paramsObj) {
            res.push(key + '=' + paramsObj[key]);
        }
        return res.join('&');
    };
    /** 保存展示次数 */
    AdDataMgr.prototype.AddShowRecord = function (style) {
        var isHased = false;
        for (var i = 0; i < this._materiaList.length; i++) {
            var ml = this._materiaList[i];
            if (style == Number(ml.locationCode)) {
                this._materiaList[i].displayCount++;
                isHased = true;
            }
        }
        if (!isHased) {
            var ml = new APPItemRecord();
            ml.locationCode = "" + style;
            ml.displayCount = 1;
            ml.clickCount = 0;
            ml.isExport = 0;
            ml.exportCount = 0;
            ml.exportProductId = "";
            this._materiaList.push(ml);
        }
    };
    /** 保存点击次数 */
    AdDataMgr.prototype.AddClickRecord = function (style, data) {
        var isHased = false;
        for (var i = 0; i < this._exportProductList.length; i++) {
            var epl = this._exportProductList[i];
            if (data.advertId == Number(epl.productId)) {
                this._exportProductList[i].clickCount++;
                isHased = true;
            }
        }
        if (!isHased) {
            var epl = {
                productId: "" + data.advertId,
                clickCount: 1
            };
            this._exportProductList.push(epl);
        }
        for (var i = 0; i < this._materiaList.length; i++) {
            var ml = this._materiaList[i];
            if (style == Number(ml.locationCode)) {
                this._materiaList[i].clickCount++;
            }
        }
    };
    /** 保存导出数据 */
    AdDataMgr.prototype.AddOpenRecord = function (style, data, success) {
        for (var i = 0; i < this._materiaList.length; i++) {
            var ml = this._materiaList[i];
            if (style == Number(ml.locationCode)) {
                if (success) {
                    this._materiaList[i].exportCount++;
                    this._materiaList[i].exportProductId = data.advertId + "";
                    this._materiaList[i].isExport = 1;
                    break;
                }
            }
        }
    };
    /** 上报数据 */
    AdDataMgr.prototype.UpdateRecord = function () {
        var _this = this;
        if (this._recording) {
            console.log('[Matrix]数据上报中');
            return;
        }
        if ((this._exportProductList.length <= 0 && !this.CheckMateria())) {
            console.log('[Matrix]数据无变更，不需要上报');
            return;
        }
        this._recording = true;
        var params = {
            openId: User_1.default.openId_csjc,
            productId: this.mProductId,
            materiaList: this._materiaList,
            exportProductList: this._exportProductList,
            shareCount: this.shareCount
        };
        if (params.materiaList.length == 0 && params.exportProductList.length == 0 && params.shareCount == 0) {
            return;
        }
        console.log("[Matrix]上传数据到服务器 params:\n", JSON.stringify(params));
        var url = this.mServerRootUrl + 'reportGame/matrixReport';
        HttpUnit_1.HttpTools.PostJson(url, params, this, function (data) {
            console.log("[Matrix]上传数据到服务器结果：", JSON.stringify(data));
            if (data != -1 && data.code == 200) {
                _this.clearRecord();
            }
            _this._recording = false;
        }, null);
    };
    /** 检测数据变动 */
    AdDataMgr.prototype.CheckMateria = function () {
        if (this._materiaList.length <= 0)
            return false;
        for (var i = 0; i < this._materiaList.length; i++) {
            if (this._materiaList[i].clickCount != 0 ||
                this._materiaList[i].displayCount != 0 ||
                this._materiaList[i].exportCount != 0 ||
                this._materiaList[i].isExport != 0) {
                return true;
            }
        }
        return false;
    };
    /** 清除导出数据 */
    AdDataMgr.prototype.clearRecord = function () {
        for (var i = 0; i < this._materiaList.length; i++) {
            this._materiaList[i].clickCount = 0;
            this._materiaList[i].displayCount = 0;
            this._materiaList[i].exportCount = 0;
            this._materiaList[i].isExport = 0;
        }
        this._exportProductList = [];
        // for (let i = 0; i < this._exportProductList.length; i++) {
        //     this._exportProductList[i].clickCount = 0;
        // }
        this.shareCount = 0;
    };
    /** 是否已过审 */
    AdDataMgr.prototype.GetIsPassed = function () {
        return this._isCheck;
    };
    /** 是否启用该类型 */
    AdDataMgr.prototype.CanUseStyle = function (style) {
        return this._canUsedStyle.indexOf(style) > -1;
    };
    return AdDataMgr;
}());
exports.AdDataMgr = AdDataMgr;
},{"../Event/EventDef":5,"../Event/EventMgr":6,"../GameSettings":8,"../PlatformApi/WXAPI":20,"../User/User":64,"./HttpUnit":29}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../PlatformApi/WXAPI");
var AdDataMgr_1 = require("../AdDataMgr");
var CachedWXBannerAd_1 = require("../../PlatformApi/CachedWXBannerAd");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var TmBannerAdView = /** @class */ (function (_super) {
    __extends(TmBannerAdView, _super);
    function TmBannerAdView() {
        var _this = _super.call(this) || this;
        /** @prop {name:RefreshTime, tips:"刷新速度,单位为毫秒", type:Number, default:6000}*/
        _this.RefreshTime = 6000;
        _this._data = null;
        _this._wxBanner = null;
        return _this;
    }
    TmBannerAdView.prototype.onAwake = function () {
        this._showSp = this.owner.getChildByName("Display");
        if (this._showSp == null) {
            this._showSp = this.owner;
        }
    };
    TmBannerAdView.prototype.onDisable = function () {
        this.clearBannerWx();
    };
    TmBannerAdView.prototype.onStart = function () {
        if (ExamineMgr_1.default.CanShowAd_Wx) {
            this.refreshAd();
        }
        else {
            this._showSp.visible = false;
        }
    };
    TmBannerAdView.prototype.refreshAd = function () {
        /* if (Laya.Browser.onMiniGame || Laya.Browser.onQQMiniGame) {
            console.log("Banner组件显示BannerWx");
            CachedWXBannerAd_csjc.changeShow_csjc();
            // this.refreshBannerWx();
        }
        else */ {
            console.log("Banner组件显示BannerAd");
            this.refreshBannerAd();
            Laya.timer.loop(this.RefreshTime, this, this.refreshBannerAd);
        }
    };
    TmBannerAdView.prototype.refreshBannerAd = function () {
        this._data = AdDataMgr_1.AdDataMgr.Instance.GetDataByStyleAndCount(AdDataMgr_1.ComponentStyle.banner, 1)[0];
        if (this._data) {
            console.log(this._data);
            this._showSp.loadImage(this._data.bannerList[Math.floor(Math.random() * this._data.bannerList.length)]);
        }
    };
    TmBannerAdView.prototype.onClick = function () {
        if (this._data) {
            console.log("跳转游戏： " + this._data.gameName);
            if (Laya.Browser.onMiniGame) {
                AdDataMgr_1.AdDataMgr.Instance.NavigateTo(AdDataMgr_1.ComponentStyle.banner, this._data);
            }
            else {
                console.log("跳转完成");
            }
        }
    };
    TmBannerAdView.prototype.refreshBannerWx = function () {
        var _this = this;
        Laya.timer.clear(this, this.refreshBannerAd);
        if (!Laya.Browser.onMiniGame || !this.owner.visible)
            return;
        this.clearBannerWx();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._showSp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        this._wxBanner = Laya.Browser.window["wx"].createBannerAd({
            adUnitId: WXAPI_1.default.bannerAdUnitId_csjc,
            adIntervals: 30,
            style: {
                left: left,
                top: top,
                width: width,
            }
        });
        self._wxBanner.onLoad(function (res) {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        });
        this._wxBanner.onError(function (err) {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            _this.refreshBannerAd();
            _this.clearBannerWx();
        });
        this._wxBanner.onResize(function (res) {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight);
        });
        self._wxBanner.show();
    };
    TmBannerAdView.prototype.clearBannerWx = function () {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
        CachedWXBannerAd_1.default.hide_csjc();
        Laya.timer.clear(this, this.refreshBannerAd);
    };
    TmBannerAdView.prototype.onViewShow = function () {
    };
    TmBannerAdView.prototype.onViewHide = function () {
        this.clearBannerWx();
    };
    return TmBannerAdView;
}(Laya.Script));
exports.default = TmBannerAdView;
},{"../../CommomAPI/ExamineMgr":2,"../../PlatformApi/CachedWXBannerAd":17,"../../PlatformApi/WXAPI":20,"../AdDataMgr":21}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdDataMgr_1 = require("../AdDataMgr");
var QpListAdBox = /** @class */ (function (_super) {
    __extends(QpListAdBox, _super);
    function QpListAdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        // protected _originW: number = 200;
        // protected _originH: number = 200;
        _this._fontSize = 25;
        _this._positionId = 0;
        _this._creativeId = 0;
        _this._appId = "";
        return _this;
    }
    QpListAdBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        // this._originW = this._displaySp.width;
        // this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitleText");
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    };
    // onEnable(): void {
    //     this._displaySp.on(Laya.Event.CLICK, this, this.Clicked);
    // }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onClick);
    // }
    QpListAdBox.prototype.setData = function (data, parent, index) {
        if (data) {
            this._data = data;
            this._displaySp.loadImage(this._data.useImgList[Math.floor(Math.random() * this._data.useImgList.length)], Laya.Handler.create(this, function () {
                // if (!this._displaySp.destroyed) {
                //     this._displaySp.width = this._originW;
                //     this._displaySp.height = this._originH;
                // }
            }));
            // var str = String(data.show_config.title);
            // var num = str.length;
            // num = Math.max(5,num);
            // var fontSize = Math.floor((5 / num) * this._fontSize);
            // this._disText.fontSize = fontSize;
            this._disText.text = this._data.gameName;
        }
        this._parentAdView = parent;
    };
    QpListAdBox.prototype.onMouseDown = function () {
        this.NavigateTo();
    };
    QpListAdBox.prototype.NavigateTo = function () {
        if (this._data) {
            console.log("跳转游戏： " + this._data.gameName);
            if (Laya.Browser.onMiniGame) {
                AdDataMgr_1.AdDataMgr.Instance.NavigateTo(AdDataMgr_1.ComponentStyle.h_slider, this._data);
            }
            else {
                console.log("跳转完成");
            }
        }
    };
    return QpListAdBox;
}(Laya.Script));
exports.default = QpListAdBox;
},{"../AdDataMgr":21}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QpListAdBox_1 = require("./QpListAdBox");
var AdDataMgr_1 = require("../AdDataMgr");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
/**
 * 用于显示滚动广告列表的类
 *
 * @export
 * @class ListAdView
 * @extends {Laya.Script}
 */
var ListAdView = /** @class */ (function (_super) {
    __extends(ListAdView, _super);
    function ListAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:AdStyle, tips:"广告位类型", type:Option, default:"Slider",option:"Slider,Export"}*/
        _this.AdStyle = "Slider";
        /** @prop {name:ScrollDirection,tips:"滚动方向,水平或竖直",type:Option,option:"Horizontal,Vertical",default:"Horizontal"}*/
        _this.ScrollDirection = "Horizontal";
        /** @prop {name:ScrollSpeed, tips:"滚动速度", type:Number, default:100}*/
        _this.ScrollSpeed = 100;
        /** @prop {name:ListCount, tips:"数量", type:Number, default:20}*/
        _this.ListCount = 20;
        _this._scrollForward = true;
        return _this;
    }
    ListAdView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._list = this.owner.getChildByName("List");
        this._list.elasticEnabled = true;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        if (this.ScrollDirection == "Horizontal") {
            this._list.hScrollBarSkin = "";
        }
        else {
            this._list.vScrollBarSkin = "";
        }
        this.owner.on("AdRefresh", this, this.RefreshAdList);
    };
    ListAdView.prototype.onEnable = function () {
        if (ExamineMgr_1.default.CanShowAd_Wx) {
            this.RefreshAdList();
        }
        else {
            this._ownerSp.visible = false;
        }
    };
    ListAdView.prototype.onUpdate = function () {
        var scrollValue = this.ScrollSpeed * Laya.timer.delta / 1000;
        this._list.scrollBar.value += scrollValue;
        if (this._list.scrollBar.value >= this._list.scrollBar.max) {
            this._list.scrollBar.value = 0;
        }
        else if (this._list.scrollBar.value < 0) {
            this._list.scrollBar.value = this._list.scrollBar.max;
        }
    };
    ListAdView.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var listAdBox = cell.getComponent(QpListAdBox_1.default);
        listAdBox.setData(data, this.owner, index);
    };
    ListAdView.prototype.RefreshAdList = function () {
        var style = AdDataMgr_1.ComponentStyle.h_slider;
        switch (this.AdStyle) {
            case "Slider":
                style = AdDataMgr_1.ComponentStyle.h_slider;
                break;
            case "Banner":
                style = AdDataMgr_1.ComponentStyle.banner;
                break;
            case "Export":
                style = AdDataMgr_1.ComponentStyle.big_export_ui;
                break;
        }
        var data = AdDataMgr_1.AdDataMgr.Instance.GetDataByStyleAndCount(style, 30);
        if (data.length > 0 && data.length < this.ListCount) {
            var resetCount = this.ListCount - data.length;
            var dataTemp = data.concat();
            for (var index = 0; index < resetCount; index++) {
                var element = data[index];
                dataTemp.push(element);
            }
            this._list.array = dataTemp;
        }
        else {
            this._list.array = data;
        }
    };
    return ListAdView;
}(Laya.Script));
exports.default = ListAdView;
},{"../../CommomAPI/ExamineMgr":2,"../AdDataMgr":21,"./QpListAdBox":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdDataMgr_1 = require("../AdDataMgr");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var QpGameSwitch_1 = require("../QpGameSwitch");
var QpRandomJump = /** @class */ (function (_super) {
    __extends(QpRandomJump, _super);
    function QpRandomJump() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickTimer = 500;
        return _this;
    }
    QpRandomJump.prototype.onUpdate = function () {
        if (this._clickTimer > 0) {
            this._clickTimer -= Laya.timer.delta;
        }
    };
    QpRandomJump.prototype.onClick = function () {
        if (Laya.Browser.onMiniGame) {
            console.log("\u81EA\u52A8\u8DF3\u529F\u80FD\u5C4F\u853D" + ExamineMgr_1.default.CanDoScz_Wx + ",\u5F00\u5173" + (QpGameSwitch_1.default.GameSwitch.popAd == 1));
            if (ExamineMgr_1.default.CanDoScz_Wx && QpGameSwitch_1.default.GameSwitch.popAd == 1 && QpGameSwitch_1.default.GameSwitch.indexAd) {
                if (this._clickTimer > 0)
                    return;
                this._clickTimer = 3000;
                var arr = AdDataMgr_1.AdDataMgr.Instance.GetDataByStyleAndCount(AdDataMgr_1.ComponentStyle.h_slider, 10);
                if (arr.length > 0) {
                    var game = arr[Math.floor(Math.random() * arr.length)];
                    if (game) {
                        AdDataMgr_1.AdDataMgr.Instance.NavigateTo(AdDataMgr_1.ComponentStyle.h_slider, game);
                    }
                }
            }
        }
    };
    return QpRandomJump;
}(Laya.Script));
exports.default = QpRandomJump;
},{"../../CommomAPI/ExamineMgr":2,"../AdDataMgr":21,"../QpGameSwitch":30}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QpListAdBox_1 = require("./QpListAdBox");
var QpRdListAdBox = /** @class */ (function (_super) {
    __extends(QpRdListAdBox, _super);
    function QpRdListAdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:RdName, tips:"广告位类型", type:String, default:""}*/
        _this.RdName = "";
        /** @prop {name:RdCount, tips:"广告位类型", type:Number, default:"0"}*/
        _this.RdCount = 0;
        return _this;
    }
    QpRdListAdBox.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._rdSp = this.owner.getChildByName("RdSp");
    };
    // onEnable(): void {
    //     this._displaySp.on(Laya.Event.CLICK, this, this.Clicked);
    // }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onClick);
    // }
    QpRdListAdBox.prototype.setData = function (data, parent, index) {
        if (data) {
            this._data = data;
            this._displaySp.loadImage(this._data.useImgList[Math.floor(Math.random() * this._data.useImgList.length)], Laya.Handler.create(this, function () {
                // if (!this._displaySp.destroyed) {
                //     this._displaySp.width = this._originW;
                //     this._displaySp.height = this._originH;
                // }
            }));
            // var str = String(data.show_config.title);
            // var num = str.length;
            // num = Math.max(5,num);
            // var fontSize = Math.floor((5 / num) * this._fontSize);
            // this._disText.fontSize = fontSize;
            this._disText.text = this._data.gameName;
            if (this.RdName != null && this.RdCount > 0 && this._rdSp != null) {
                var i = index % this.RdCount;
                var resname = this.RdName + i + ".png";
                this._rdSp.skin = resname;
            }
        }
        this._parentAdView = parent;
    };
    return QpRdListAdBox;
}(QpListAdBox_1.default));
exports.default = QpRdListAdBox;
},{"./QpListAdBox":23}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QpListAdBox_1 = require("./QpListAdBox");
var AdDataMgr_1 = require("../AdDataMgr");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var QpShakeAd2View = /** @class */ (function (_super) {
    __extends(QpShakeAd2View, _super);
    function QpShakeAd2View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:AdStyle, tips:"广告位类型", type:Option, default:"Slider",option:"Slider,Export,Banner"}*/
        _this.AdStyle = "Slider";
        /** @prop {name:ShakeRestTime, tips:"闪动休息", type:Number, default:1000}*/
        _this.ShakeRestTime = 1500;
        /** @prop {name:ShakeTime, tips:"闪动速度", type:Number, default:300}*/
        _this.ShakeTime = 300;
        /** @prop {name:ShakeNeedCount, tips:"闪动次数", type:Number, default:4}*/
        _this.ShakeNeedCount = 4;
        /** @prop {name:ChaneAdTime, tips:"更换广告速度", type:Number, default:6000}*/
        _this.ChaneAdTime = 6000;
        /** @prop {name:RotaAngel, tips:"晃动角度", type:Number, default:10}*/
        _this.RotaAngel = 10;
        /** @prop {name:Scale, tips:"晃动缩放", type:Number, default:0.1}*/
        _this.Scale = 0.1;
        _this._shakeTimer = 0;
        return _this;
        // onClick() {
        //     if (Laya.Browser.onMiniGame) {
        //         let arr = AdDataMgr.Instance.GetDataByStyleAndCount(ComponentStyle.h_slider, 10);
        //         if (arr.length > 0) {
        //             let game = arr[Math.floor(Math.random() * arr.length)];
        //             if (game) {
        //                 AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, game);
        //             }
        //         }
        //     }
        // }
    }
    QpShakeAd2View.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._cells = this._list.cells;
    };
    QpShakeAd2View.prototype.onEnable = function () {
        if (ExamineMgr_1.default.CanShowAd_Wx) {
            this.RefreshAdList();
        }
        else {
            this._ownerSp.visible = false;
        }
    };
    QpShakeAd2View.prototype.onUpdate = function () {
        if (this._shakeTimer <= this.ChaneAdTime) {
            this._shakeTimer += Laya.timer.delta;
        }
        else {
            this._shakeTimer = 0;
            this.RefreshAdList();
            return;
        }
        // if (this.ShakeTime * this.ShakeNeedTime)
        //     for (let index = 0; index < this._cells.length; index++) {
        //         const box = this._cells[index];
        //         let period = curTime / this.ShakeTime;
        //         let aniPeriod = Math.sin(period * 3.14 * 2);
        //         box.rotation = aniPeriod * this.RotaAngel;
        //         box.scaleX = 1 - (aniPeriod * this.Scale);
        //         box.scaleY = box.scaleX;
        //     }
        if (this._shakeTimer > this.ShakeRestTime && this._shakeTimer <= (this.ShakeRestTime + (this.ShakeTime * this.ShakeNeedCount))) {
            var period = ((this._shakeTimer - this.ShakeRestTime) % this.ShakeTime) / this.ShakeTime;
            var aniPeriod = Math.sin(period * 3.14 * 2);
            for (var index = 0; index < this._cells.length; index++) {
                var box = this._cells[index];
                box.rotation = aniPeriod * this.RotaAngel;
                box.scaleX = 1 - (aniPeriod * this.Scale);
                box.scaleY = box.scaleX;
            }
        }
        else {
            for (var index = 0; index < this._cells.length; index++) {
                var box = this._cells[index];
                box.rotation = 0;
                box.scaleX = 1;
                box.scaleY = 1;
            }
        }
    };
    QpShakeAd2View.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(QpListAdBox_1.default);
        loopAdBox.setData(data, this.owner, index);
    };
    QpShakeAd2View.prototype.RefreshAdList = function () {
        var style = AdDataMgr_1.ComponentStyle.h_slider;
        switch (this.AdStyle) {
            case "Slider":
                style = AdDataMgr_1.ComponentStyle.h_slider;
                break;
            case "Banner":
                style = AdDataMgr_1.ComponentStyle.banner;
                break;
            case "Export":
                style = AdDataMgr_1.ComponentStyle.big_export_ui;
                break;
        }
        var data = AdDataMgr_1.AdDataMgr.Instance.GetDataByStyleAndCount(style, this._cells.length);
        this._list.array = data;
    };
    return QpShakeAd2View;
}(Laya.Script));
exports.default = QpShakeAd2View;
},{"../../CommomAPI/ExamineMgr":2,"../AdDataMgr":21,"./QpListAdBox":23}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QpShakeAd2View_1 = require("./QpShakeAd2View");
var QpListAdBox_1 = require("./QpListAdBox");
var QpShakeAd3View = /** @class */ (function (_super) {
    __extends(QpShakeAd3View, _super);
    function QpShakeAd3View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:AdStyle, tips:"广告位类型", type:Option, default:"Slider",option:"Slider,Export,Banner"}*/
        _this.AdStyle = "Slider";
        /** @prop {name:ShakeRestTime, tips:"闪动休息", type:Number, default:1000}*/
        _this.ShakeRestTime = 1500;
        /** @prop {name:ShakeTime, tips:"闪动速度", type:Number, default:300}*/
        _this.ShakeTime = 300;
        /** @prop {name:ShakeNeedCount, tips:"闪动次数", type:Number, default:4}*/
        _this.ShakeNeedCount = 4;
        /** @prop {name:ChaneAdTime, tips:"更换广告速度", type:Number, default:6000}*/
        _this.ChaneAdTime = 6000;
        /** @prop {name:RotaAngel, tips:"晃动角度", type:Number, default:10}*/
        _this.RotaAngel = 10;
        /** @prop {name:Scale, tips:"晃动缩放", type:Number, default:0.1}*/
        _this.Scale = 0.1;
        return _this;
    }
    QpShakeAd3View.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._list2 = this.owner.getChildByName("List2");
        this._list2.renderHandler = Laya.Handler.create(this, this.onList2Render, null, false);
    };
    QpShakeAd3View.prototype.onList2Render = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(QpListAdBox_1.default);
        loopAdBox.setData(data, this.owner, index);
    };
    QpShakeAd3View.prototype.RefreshAdList = function () {
        _super.prototype.RefreshAdList.call(this);
        this._list2.array = this._list.array.concat();
    };
    return QpShakeAd3View;
}(QpShakeAd2View_1.default));
exports.default = QpShakeAd3View;
},{"./QpListAdBox":23,"./QpShakeAd2View":27}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpTools = /** @class */ (function () {
    function HttpTools() {
    }
    HttpTools.Requset = function (url, data, caller, completed, error, method, responseType, headers) {
        var _this = this;
        if (responseType === void 0) { responseType = "json"; }
        if (headers === void 0) { headers = null; }
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, null, function (data) {
            if (data.code != 200 && data.code != 0) {
                _this.Error(xhr, data);
                error && error.call(data);
                return;
            }
            completed && completed.call(caller, data);
        });
        xhr.once(Laya.Event.ERROR, caller, error);
        xhr.once(Laya.Event.ERROR, HttpTools, this.Error);
        xhr.send(url, data, method, responseType, headers);
    };
    HttpTools.Post = function (url, data, caller, completed, error, responseType, headers) {
        if (responseType === void 0) { responseType = "json"; }
        if (headers === void 0) { headers = null; }
        this.Requset(url, data, caller, completed, error, "post", responseType, headers);
    };
    HttpTools.Get = function (url, data, caller, completed, error, responseType, headers) {
        if (responseType === void 0) { responseType = "json"; }
        if (headers === void 0) { headers = null; }
        this.Requset(url, data, caller, completed, error, "get", responseType, headers);
    };
    HttpTools.PostJson = function (url, data, caller, completed, error) {
        this.Post(url, data, caller, completed, error, "json");
    };
    HttpTools.Error = function (xhr, message) {
        console.log("Requset Error, Url:" + xhr.url + ", Error Message:" + JSON.stringify(message));
    };
    HttpTools.JsonToKeyValue = function (param) {
        var res = [];
        for (var key in param) {
            res.push(key + '=' + param[key]);
        }
        return res.join('&');
    };
    return HttpTools;
}());
exports.HttpTools = HttpTools;
},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameSettings_1 = require("../GameSettings");
var sdkcustom = /** @class */ (function () {
    function sdkcustom() {
        this.wudianSwitch = 1; //所有误点狂点的总开关
        this.export = 1; //大导出页面
        this.endExport = 1; //胜利失败后，额外的导出页面
        this.btnShowTimer = 2; //所有下一步按钮延迟出现的时间
        this.btnMoveTimer = 2.5; //所有误点按钮上移的时间
        this.bannerMoveTimer = 1.5; //所有误点Banner上移的时间
        this.bannerKuangdian1 = 0; //开局的狂点
        this.bannerKuangdian2 = 0; //结束狂点
        this.bannerWudian = 0; //所有界面的误点
        this.cityList = []; //屏蔽审核的城市列表
        this.indexPanel = 0; //好友热玩功能
        this.popAd = 0; //自动弹导出
        this.sceneList = [1005, 1006, 1007, 1008, 1011, 1012, 1013, 1014, 1017, 1020, 1023, 1024, 1025,
            1030, 1031, 1032, 1036, 1042, 1044, 1047, 1048, 1049, 1053, 1102]; //屏蔽场景值
        this.kuangdianTime = [11, 12, 13, 14, 18, 19, 20];
        this.startVideo = 0;
        this.indexAd = 1;
    }
    return sdkcustom;
}());
exports.sdkcustom = sdkcustom;
var QpGameSwitch = /** @class */ (function () {
    function QpGameSwitch() {
    }
    QpGameSwitch.getCustomKey = function (success) {
        var _this = this;
        this.httpRequest("https://qp.qingpukj.com:8055/business/product/game/getAttribute", "appid=" + GameSettings_1.default.AppID_csjc, "application/x-www-form-urlencoded", function (res) {
            var key = JSON.parse(res.msg);
            if (key) {
                if (key.wudianSwitch)
                    _this.customkey.wudianSwitch = key.wudianSwitch;
                if (key.export)
                    _this.customkey.export = key.export;
                if (key.endExport)
                    _this.customkey.endExport = key.endExport;
                if (key.btnShowTimer)
                    _this.customkey.btnShowTimer = key.btnShowTimer;
                if (key.btnMoveTimer)
                    _this.customkey.btnMoveTimer = key.btnMoveTimer;
                if (key.bannerMoveTimer)
                    _this.customkey.bannerMoveTimer = key.bannerMoveTimer;
                if (key.bannerKuangdian1)
                    _this.customkey.bannerKuangdian1 = key.bannerKuangdian1;
                if (key.bannerKuangdian2)
                    _this.customkey.bannerKuangdian2 = key.bannerKuangdian2;
                if (key.bannerWudian)
                    _this.customkey.bannerWudian = key.bannerWudian;
                if (key.indexPanel)
                    _this.customkey.indexPanel = key.indexPanel;
                if (key.popAd)
                    _this.customkey.popAd = key.popAd;
                if (key.cityList)
                    _this.customkey.cityList = JSON.parse(key.cityList);
                if (key.sceneList)
                    _this.customkey.sceneList = JSON.parse(key.sceneList);
                if (key.kuangdianTime)
                    _this.customkey.kuangdianTime = JSON.parse(key.kuangdianTime);
                if (key.startVideo)
                    _this.customkey.startVideo = key.startVideo;
                if (key.indexAd)
                    _this.customkey.indexAd = key.indexAd;
            }
            if (success)
                success();
        });
    };
    Object.defineProperty(QpGameSwitch, "IsIpPass", {
        get: function () {
            if (this._city == null) {
                // console.log("不通过,当前地址为空");
            }
            else {
                for (var index = 0; index < this.customkey.cityList.length; index++) {
                    var city = this.customkey.cityList[index];
                    if (this._city.search(city) > -1) {
                        // console.log("不通过,当前地址为:", this._city, "city:", city);
                        return false;
                    }
                }
                // console.log("通过,当前地址为:", this._city);
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    QpGameSwitch.UpdateIpCity = function (success) {
        var _this = this;
        this.httpRequest("https://qp.qingpukj.com:8055/business/product/game/getIPArea", "appid=" + GameSettings_1.default.AppID_csjc, "application/x-www-form-urlencoded", function (res) {
            console.log("IP", res);
            if (res && res.area) {
                _this._city = res.area;
            }
            if (success)
                success();
        });
    };
    Object.defineProperty(QpGameSwitch, "GameSwitch", {
        get: function () {
            return this.customkey;
        },
        enumerable: true,
        configurable: true
    });
    QpGameSwitch.httpRequest = function (url, data, content_type, complete, method) {
        if (method === void 0) { method = 'POST'; }
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window['wx'].request({
                url: url,
                data: data,
                method: method,
                header: {
                    'content-type': content_type // 默认值
                },
                success: function (res) {
                    if (complete)
                        complete(res.data);
                    console.log("连接成功", res);
                }, fail: function (res) {
                    if (complete)
                        complete(null);
                    console.log("连接错误", res);
                }
            });
        }
    };
    QpGameSwitch.customkey = new sdkcustom();
    return QpGameSwitch;
}());
exports.default = QpGameSwitch;
},{"../GameSettings":8}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera2UI = /** @class */ (function () {
    function Camera2UI() {
    }
    /**[SixGod]
     * 世界坐标转屏幕坐标
     * @param {Laya.Camera} camera   参照相机
     * @param {Laya.Vector3} point   需要转换的点
     */
    Camera2UI.WorldToScreen2 = function (camera, point) {
        var pointA = this.InverseTransformPoint(camera.transform, point);
        var distance = pointA.z;
        var out = new Laya.Vector3();
        camera.viewport.project(point, camera.projectionViewMatrix, out);
        var value = new Laya.Vector3(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY, distance);
        return value;
    };
    /**[SixGod]
     * 世界坐标转相对坐标
     * @param {Laya.Transform} origin   camera.transform
     * @param {Laya.Vector3} point      需要转换的点
     */
    Camera2UI.InverseTransformPoint = function (origin, point) {
        var xx = new Laya.Vector3();
        origin.getRight(xx);
        var yy = new Laya.Vector3();
        origin.getUp(yy);
        var zz = new Laya.Vector3();
        origin.getForward(zz);
        var zz1 = new Laya.Vector3(-zz.x, -zz.y, -zz.z);
        var x = this.ProjectDistance(point, origin.position, xx);
        var y = this.ProjectDistance(point, origin.position, yy);
        var z = this.ProjectDistance(point, origin.position, zz1);
        var value = new Laya.Vector3(x, y, z);
        return value;
    };
    /**[SixGod]
     * 向量投影长度, 向量CA 在向量 CB 上的投影长度
     * @param {Laya.Vector3} A
     * @param {Laya.Vector3} C
     * @param {Laya.Vector3} B
     */
    Camera2UI.ProjectDistance = function (A, C, B) {
        var CA = new Laya.Vector3();
        Laya.Vector3.subtract(A, C, CA);
        var angle = this.Angle2(CA, B) * Math.PI / 180;
        var distance = Laya.Vector3.distance(A, C);
        distance *= Math.cos(angle);
        return distance;
    };
    /**[SixGod]
     * 向量夹角
     * @param {Laya.Vector3} ma 向量A
     * @param {Laya.Vector3} mb 向量B
     */
    Camera2UI.Angle2 = function (ma, mb) {
        var v1 = (ma.x * mb.x) + (ma.y * mb.y) + (ma.z * mb.z);
        var ma_val = Math.sqrt(ma.x * ma.x + ma.y * ma.y + ma.z * ma.z);
        var mb_val = Math.sqrt(mb.x * mb.x + mb.y * mb.y + mb.z * mb.z);
        var cosM = v1 / (ma_val * mb_val);
        if (cosM < -1)
            cosM = -1;
        if (cosM > 1)
            cosM = 1;
        var angleAMB = Math.acos(cosM) * 180 / Math.PI;
        return angleAMB;
    };
    return Camera2UI;
}());
exports.default = Camera2UI;
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("./Enums");
var GameSetting_1 = require("./GameSetting");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
/**
 * 控制摄像机移动的类,使用时调用InitCamera()方法初始化，传入的参数为玩家组件的引用，以及在地面和空中摄像机的初始偏移
 * 此类使用消息中心解耦合，如果需要触发摄像机事件，需要使用消息中心dispatch(EventDef.Camera_Event)事件
 *
 * @export
 * @class CameraCtr
 * @extends {Laya.Script}
 */
var CameraCtr = /** @class */ (function (_super) {
    __extends(CameraCtr, _super);
    // private _speedEffect: Laya.Sprite3D;
    /**构造函数
     * Creates an instance of CameraCtr.
     * @memberof CameraCtr
     */
    function CameraCtr() {
        var _this = _super.call(this) || this;
        //在地面时摄像机离玩家的距离
        _this._goundOffset = GameSetting_1.CameraSetting.GoundOffset;
        //摄像机视角
        _this._fieldOfView = GameSetting_1.CameraSetting.FieldOfView;
        //当前摄像机离玩家的距离
        _this._currentOffset = new Laya.Vector3();
        //摄像机相对于玩家的角度
        _this._currentrotate = new Laya.Point();
        //摄像机X轴旋转角度
        _this._angleX = -60;
        //摄像机Y轴旋转角度
        _this._angleY = -90;
        //摄像机目标左右偏移
        // private _targetOffset: number = 0;
        //摄像机当前左右偏移
        // private _cameraOffset: number = 0;
        //摄像机固定跟随点
        // private _fixedFollowPos: Laya.Vector3;
        //当前摄像机向前看的值
        _this._curViewForward = 0;
        //摄像机应当向前看的值
        _this._needViewForward = GameSetting_1.CameraSetting.FrontBackOffset;
        //摄像机抖动
        _this._shakeTime = 0;
        //摄像机高度
        _this._height = 0;
        //摄像机转换目标时的速度
        _this._changeMoveSpeed = 0;
        //摄像机转换目标一共需要走的距离
        _this._changeTotlaDistance = 0;
        //摄像机转换目标当前走的距离
        _this._changeCurrentDistance = 0;
        return _this;
    }
    Object.defineProperty(CameraCtr.prototype, "Sprite3D", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化，注册摄像机事件
     *
     * @memberof CameraCtr
     */
    CameraCtr.prototype.onAwake = function () {
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.Camera_Event_csjc, this, this.ChangeCameraState);
    };
    /**
     * 脚本被删除时自动反注册事件
     *
     * @memberof CameraCtr
     */
    CameraCtr.prototype.onDestroy = function () {
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.Camera_Event_csjc, this, this.ChangeCameraState);
    };
    /**
     * 摄像机位置移动在LateUpdate中运行
     *
     * @memberof CameraCtr
     */
    CameraCtr.prototype.onLateUpdate = function () {
        if (this._cameraState == Enums_1.CameraState.ChangeingFollowObj) {
            if (this._changeCurrentDistance > this._changeTotlaDistance) {
                this._cameraState = Enums_1.CameraState.Normal;
                return;
            }
            this._changeCurrentDistance += (Laya.timer.delta / 1000) * this._changeMoveSpeed;
            var finalOffset = new Laya.Vector3();
            var progress = this._changeCurrentDistance / this._changeTotlaDistance;
            Laya.Vector3.lerp(this._preFollowObj.transform.position, this._followObjSp3D.transform.position, progress, finalOffset);
            Laya.Vector3.add(finalOffset, this._followObjSp3D.transform.position, this.Sprite3D.transform.position);
            this.Sprite3D.transform.position = this.Sprite3D.transform.position;
            return;
        }
        if (this._followObjSp3D == null)
            return;
        var deltaTime = Laya.timer.delta / 1000;
        // let finalOffser = this.GetOffsetByAngel();
        var finalOffser = this.RotateCamera();
        /* 下面的代码是按照摄像机和玩家的偏移_currentOffset求出摄像机的位置 */
        var offset_x = new Laya.Vector3();
        this._followObjSp3D.transform.getRight(offset_x);
        Laya.Vector3.scale(offset_x, finalOffser.x, offset_x);
        var offset_y = new Laya.Vector3();
        this._followObjSp3D.transform.getUp(offset_y);
        Laya.Vector3.scale(offset_y, finalOffser.y, offset_y);
        var offset_z = new Laya.Vector3();
        this._followObjSp3D.transform.getForward(offset_z);
        Laya.Vector3.scale(offset_z, finalOffser.z, offset_z);
        var offset = new Laya.Vector3();
        Laya.Vector3.add(offset_x, offset_y, offset);
        Laya.Vector3.add(offset, offset_z, offset);
        // let scale = Math.min(this._height / 5, 1);
        // Laya.Vector3.scale(offset, 1 + scale, offset);
        offset.y += this._height;
        // offset.x -= Math.max(0, this._height - 1.5) * 3;        
        offset.x -= this._height;
        offset.z -= this._height;
        /* 改良前的方法 */
        var finalPos = new Laya.Vector3();
        var followPos = new Laya.Vector3();
        /* 左右平移平滑函数 */
        /* if (this._cameraState == CameraState.Fixed) {
            // if (this._fixedFollowPos != null) {
            //     followPos =
            // }
            followPos = this._fixedFollowPos;
        }
        else  */
        if (this._cameraState == Enums_1.CameraState.RotatedAround) {
            followPos = this._followObjSp3D.transform.position;
            if (this._curViewForward > 0) {
                this._curViewForward -= (deltaTime) * GameSetting_1.CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward < 0) {
                    this._curViewForward = 0;
                }
            }
            else if (this._curViewForward < 0) {
                this._curViewForward += (deltaTime) * GameSetting_1.CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward > 0) {
                    this._curViewForward = 0;
                }
            }
        }
        else {
            if (this._curViewForward < this._needViewForward) {
                this._curViewForward += (deltaTime) * GameSetting_1.CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward > this._needViewForward) {
                    this._curViewForward = this._needViewForward;
                }
            }
            else if (this._curViewForward > this._needViewForward) {
                this._curViewForward -= (deltaTime) * GameSetting_1.CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward < this._needViewForward) {
                    this._curViewForward = this._needViewForward;
                }
            }
            /* if (this._posObj.CurrentPosOnRoad != null) {
                let distance = (deltaTime) * CameraSetting.LeftRightMoveSpd;
                if (this._cameraOffset > this._targetOffset) {
                    this._cameraOffset -= distance;
                    if (this._cameraOffset <= this._targetOffset) {
                        this._cameraOffset = this._targetOffset;
                    }
                }
                else if (this._cameraOffset < this._targetOffset) {
                    this._cameraOffset += distance;
                    if (this._cameraOffset >= this._targetOffset) {
                        this._cameraOffset = this._targetOffset;
                    }
                }
                followPos = this.GetPosByOffset(this._posObjSp3D.transform, this._posObj.CurrentPosOnRoad.PosWithOutOffset, this._cameraOffset);
            }
            else  */ {
                followPos = this._followObjSp3D.transform.position;
            }
        }
        Laya.Vector3.add(offset, followPos, finalPos);
        this._cameraParent.transform.position = finalPos;
        var dir = new Laya.Vector3();
        this._followObjSp3D.transform.getForward(dir);
        Laya.Vector3.normalize(dir, dir);
        Laya.Vector3.scale(dir, this._curViewForward * -1, dir);
        Laya.Vector3.add(dir, followPos, dir);
        this._cameraParent.transform.lookAt(dir, Laya.Vector3._Up, false);
        if (this._camera != null) {
            this._camera.fieldOfView = this._fieldOfView;
            if (this._shakeTime > 0) {
                var shakeFrequency = this._shakeTime * 2 * Math.PI * GameSetting_1.CameraSetting.ShakeFrequency;
                // let pos = new Laya.Vector3(Math.sin(shakeFrequency) * 0.1, Math.cos(shakeFrequency) * 0.1, Math.cos(shakeFrequency) * 0.1);
                var pos = new Laya.Vector3(Math.sin(shakeFrequency) * GameSetting_1.CameraSetting.ShakeStrength, 0, 0);
                this._cameraParent.transform.getRight(pos);
                Laya.Vector3.scale(pos, Math.sin(shakeFrequency) * GameSetting_1.CameraSetting.ShakeStrength, pos);
                Laya.Vector3.add(pos, this._camera.transform.position, pos);
                this._camera.transform.position = pos;
                this._shakeTime -= Laya.timer.delta / 1000;
            }
        }
    };
    /**
     * 按照角度得到摄像机偏移，用于旋转摄像机
     *
     * @returns {Laya.Vector3}
     * @memberof CameraCtr
     */
    CameraCtr.prototype.GetOffsetByAngel = function () {
        var result;
        var dis = Laya.Vector3.distance(this._currentOffset, Laya.Vector3._ZERO.clone());
        //当摄像机状态为非旋转状态时
        if (this._cameraState != Enums_1.CameraState.RotatedAround) {
            //当摄像机状态为非旋转状态且当前角度不为0时，先将角度转为0
            if (this._angleY > 180) {
                this._angleY += Laya.timer.delta / 1000 * 360;
            }
            else if (this._angleY > 0 && this._angleY < 180) {
                this._angleY -= Laya.timer.delta / 1000 * 360;
            }
            //当摄像机状态为非旋转状态且当前角度为0时
            if (this._angleY < 0 || this._angleY >= 360) {
                this._angleY = 0;
            }
            result = this.RotateAroundYByAngle(dis, this._currentOffset, this._angleY);
        }
        else {
            this._angleY += Laya.timer.delta / 1000 * 30;
            if (this._angleY > 360) {
                this._angleY = this._angleY - 360;
            }
            result = this.RotateAroundYByAngle(dis, this._currentOffset, this._angleY);
        }
        return result;
    };
    CameraCtr.prototype.RotateCamera = function () {
        var result;
        var dis = Laya.Vector3.distance(this._currentOffset, Laya.Vector3._ZERO.clone());
        result = this.RotateAroundByAngle(dis, this._currentOffset, this._angleX, this._angleY);
        return result;
    };
    /**
     * 按照世界坐标的Y轴旋转
     *
     * @param {Laya.Vector3} vector
     * @param {number} angelY
     * @returns {Laya.Vector3}
     * @memberof CameraCtr
     */
    CameraCtr.prototype.RotateAroundYByAngle = function (radius, vector, angelY) {
        //角度为0的时候不需要旋转直接返回原位移，可以节约性能
        if (angelY == 0) {
            return vector;
        }
        var result = new Laya.Vector3();
        var rad = (angelY / 180) * Math.PI;
        result.x = Math.sin(rad) * radius;
        result.y = vector.y;
        result.z = Math.cos(rad) * radius;
        return result;
    };
    /**
     * 按照世界坐标的X轴旋转
     *
     * @param {Laya.Vector3} vector
     * @param {number} angelX
     * @returns {Laya.Vector3}
     * @memberof CameraCtr
     */
    CameraCtr.prototype.RotateAroundXByAngle = function (radius, vector, angelX) {
        //角度为0的时候不需要旋转直接返回原位移，可以节约性能
        if (angelX == 0) {
            return vector;
        }
        var result = new Laya.Vector3();
        var rad = (angelX / 180) * Math.PI;
        result.x = vector.x;
        result.y = Math.sin(rad) * radius;
        result.z = Math.cos(rad) * radius;
        return result;
    };
    CameraCtr.prototype.RotateAroundByAngle = function (radius, vector, angelX, angelY) {
        var result = vector.clone();
        var radx = (angelX / 180) * Math.PI;
        var rady = (angelY / 180) * Math.PI;
        // console.log(radx);
        result.x = Math.sin(radx) * Math.cos(rady) * radius;
        result.y = Math.cos(radx) * radius;
        result.z = Math.sin(radx) * Math.sin(rady) * radius;
        return result;
    };
    /**
     * 设置摄像机动画状态的方法
     *
     * @param {*} args
     * @memberof CameraCtr
     */
    CameraCtr.prototype.ChangeCameraState = function (args) {
        // let transformOffset: Laya.Vector3;//摄像机与角色的transform偏移
        // let rotate: Laya.Vector3;//摄像机的旋转
        var fieldOfView; //摄像机角度，用来表现加速减速的效果
        // let cameraState = args.CameraState as CameraState;
        var speedState = args.SpeedState;
        var cameraOffSet = args.CameraOffset;
        var cameraRotate = args.CameraRotate;
        var cameraRotateX = args.CameraRotateX;
        var cameraRotateY = args.CameraRotateY;
        var cameraViewForward = args.CameraViewForward;
        // let roadOffset = args.RoadOffset as number;
        var shakeTime = args.ShakeTime;
        var height = args.Height;
        if (shakeTime) {
            this._shakeTime = Math.max(0, shakeTime);
        }
        if (height) {
            this._height = Math.max(0, height);
        }
        // if (roadOffset) {
        //     this._targetOffset = roadOffset * CameraSetting.LeftRightRate;
        //     // if (this._cameraState == CameraState.GroundRun && cameraState == CameraState.Ground) {
        //     //     this._cameraOffset = offset;
        //     // }
        //     // else {
        //     //     this._targetOffset = offset * 0.6;
        //     // }
        // }
        /* 切换摄像机跟随状态 */
        // if (cameraState) {
        //     this._cameraState = cameraState;
        //     /*             switch (cameraState) {
        //                     case CameraState.RotatedAround:
        //                         break;
        //                     case CameraState.Normal:
        //                         this
        //                         break;
        //                 }
        //                 // if (this._cameraState == CameraState.Fixed) {
        //                 //     this._fixedFollowPos = this._player.transform.position.clone();
        //                 // }
        //      */
        // }
        if (cameraOffSet) {
            var dis = Laya.Vector3.distance(this._currentOffset, cameraOffSet);
            var time = dis;
            if (dis > 0.1) {
                Laya.Tween.to(this._currentOffset, { x: cameraOffSet.x, y: cameraOffSet.y, z: cameraOffSet.z }, Math.min(1000, time * 1000), Laya.Ease.linearNone, null, 0, true);
            }
        }
        if (cameraRotateX) {
            this._angleX += cameraRotateX;
            if (this._angleX > -10) {
                this._angleX = -10;
            }
            else if (this._angleX < -120) {
                this._angleX = -120;
            }
        }
        if (cameraRotate) {
            // this._angleX = cameraRotate.x;
            // this._angleY = cameraRotate.y;
            var dis = Math.pow(cameraRotate.x - this._angleX, 2) + Math.pow(cameraRotate.y - this._angleY, 2);
            if (dis > 1) {
                Laya.Tween.to(this, { _angleX: cameraRotate.x, _angleY: cameraRotate.y }, 1000, Laya.Ease.linearNone, null, 0, true);
            }
        }
        if (cameraRotateY) {
            this._angleY += cameraRotateY;
        }
        if (cameraViewForward != null) {
            this._needViewForward = cameraViewForward;
        }
        /* 摄像机加速减速效果，加速时会扩大加大fieldOfView，减速时则相反 */
        if (speedState) {
            switch (speedState) {
                case Enums_1.SpeedState.SpeedUp:
                    // this._speedEffect.active = true;
                    fieldOfView = 70;
                    break;
                case Enums_1.SpeedState.SpeedDown:
                    // this._speedEffect.active = false;
                    fieldOfView = 55;
                    break;
                case Enums_1.SpeedState.Normal:
                    // this._speedEffect.active = false;
                    fieldOfView = 60;
                    break;
            }
            if (this._speedState != speedState && fieldOfView && this._fieldOfView != fieldOfView) {
                // 等测试完毕之后使用这个方法
                this._speedState = speedState;
                var time = ((Math.abs(Math.abs(this._fieldOfView) - Math.abs(fieldOfView))) / 45) * 1000;
                Laya.Tween.to(this, { _fieldOfView: fieldOfView }, time, Laya.Ease.linearNone, null, 0, true);
            }
        }
        // if (rotate && this._rotate != rotate) {
        //     Laya.Tween.to(this._rotate, { x: rotate.x, y: rotate.y, z: rotate.z }, 300, Laya.Ease.circOut, null, 0, true);
        // }
    };
    /**
     * 初始化摄像机
     *
     * @param {Laya.Sprite3D} playerCtr 玩家控制器的引用
     * @param {Laya.Vector3} goundOffset 玩家在地面时，摄像机位移
     * @param {Laya.Vector3} skyOffset 玩家在空中时，摄像机位移
     * @param {number} [fieldOfView = 60] 正常情况下的视角
     * @memberof CameraCtr
     */
    CameraCtr.prototype.InitCamera = function (posObj) {
        this._cameraParent = this.owner;
        this._camera = this.owner;
        if (this._followObjSp3D != null && this._cameraState == Enums_1.CameraState.ChangeFollowObj) {
            this._cameraState = Enums_1.CameraState.ChangeingFollowObj;
            this._preFollowObj = this._followObjSp3D;
            this._followObjSp3D = posObj;
            this._changeTotlaDistance = Laya.Vector3.distance(this._preFollowObj.transform.position, this._followObjSp3D.transform.position);
            this._changeMoveSpeed = this._changeTotlaDistance / GameSetting_1.CameraSetting.ChangeObjTime;
            this._changeCurrentDistance = 0;
        }
        else {
            this._followObjSp3D = posObj;
        }
        // this._camera = this._cameraParent.getChildByName("Main Camera") as Laya.Camera;
        // this._speedEffect = this._cameraParent.getChildByName("shexian") as Laya.Sprite3D;
        this._currentOffset = this._goundOffset.clone();
        this._cameraParent.transform.position = this._followObjSp3D.transform.position.clone();
        this._cameraState = Enums_1.CameraState.Normal;
    };
    return CameraCtr;
}(Laya.Script3D));
exports.default = CameraCtr;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"./Enums":38,"./GameSetting":45}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSMSystem_1 = require("../Fsm/FSMSystem");
var TRexState_1 = require("../FsmStates/TRexState");
var SceneMgr_1 = require("../SceneMgr");
var KingkingState_1 = require("../FsmStates/KingkingState");
var Enums_1 = require("../Enums");
var CharacterCtr = /** @class */ (function (_super) {
    __extends(CharacterCtr, _super);
    function CharacterCtr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fireSound = "subRes/sound/Fire.mp3";
        return _this;
    }
    Object.defineProperty(CharacterCtr.prototype, "FollowObj", {
        get: function () { return this._followObj; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterCtr.prototype, "StateId", {
        get: function () { return this._fsm.CurrentStateID; },
        enumerable: true,
        configurable: true
    });
    CharacterCtr.prototype.onAwake = function () {
        this._tRex = this.owner.getChildByName("TRex");
        this._kingkong = this.owner.getChildByName("Kingkong");
        // this._pter = this.owner.getChildByName("PteroShort") as Laya.Sprite3D;
        this.MakeFsm();
    };
    CharacterCtr.prototype.onUpdate = function () {
        this._fsm.CurrentState.Act();
    };
    CharacterCtr.prototype.MakeFsm = function () {
        this._fsm = new FSMSystem_1.default(this);
        // this._fsm.AddState(this._kingkong.addComponent(KingkingState));
        // this._fsm.AddState(this._tRex.addComponent(TRexState));
        // this._kingkong.active=false
        if (SceneMgr_1.default.Instance.PlayerKind == Enums_1.PlayerType.TRex) {
            this._fsm.AddState(this._tRex.addComponent(TRexState_1.default));
            this._kingkong.active = false;
            this._playerKind = Enums_1.PlayerType.TRex;
        }
        else {
            this._fsm.AddState(this._kingkong.addComponent(KingkingState_1.default));
            this._tRex.active = false;
            this._playerKind = Enums_1.PlayerType.Kingkong;
        }
    };
    CharacterCtr.prototype.PerformTransition = function (trs) {
        this._fsm.PerformTransition(trs);
    };
    CharacterCtr.prototype.Input = function (point) {
        // console.log("---------------------------输入",point)
        this._fsm.CurrentState.Reason(point);
    };
    CharacterCtr.prototype.SetFollowObj = function (obj) {
        this._followObj = obj;
        SceneMgr_1.default.Instance.CameraCtr.InitCamera(this._followObj);
    };
    CharacterCtr.prototype.FireSound = function (volume) {
        if (Laya.Browser.onMiniGame) {
            if (!this._vsound1) {
                this._vsound1 = wx.createInnerAudioContext();
            }
            if (this._curUrl == this._fireSound) {
                if (this._vsound1.paused) {
                    this._vsound1.play();
                }
                this._vsound1.volume = volume;
            }
            else {
                this._curUrl = this._fireSound;
                this._vsound1.stop();
                this._vsound1.src = this._fireSound;
                this._vsound1.loop = true;
                this._vsound1.play();
            }
        }
    };
    CharacterCtr.prototype.StopSound = function () {
        if (Laya.Browser.onMiniGame) {
            if (this._vsound1) {
                this._vsound1.stop();
            }
        }
    };
    return CharacterCtr;
}(Laya.Script3D));
exports.default = CharacterCtr;
},{"../Enums":38,"../Fsm/FSMSystem":42,"../FsmStates/KingkingState":40,"../FsmStates/TRexState":41,"../SceneMgr":47}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../Enums");
var SceneMgr_1 = require("../SceneMgr");
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var DestructibleObj = /** @class */ (function (_super) {
    __extends(DestructibleObj, _super);
    function DestructibleObj() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isbreak = false;
        _this._timer = -1;
        return _this;
    }
    Object.defineProperty(DestructibleObj.prototype, "Sprite3D", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DestructibleObj.prototype, "isBreak", {
        get: function () { return this._isbreak; },
        enumerable: true,
        configurable: true
    });
    DestructibleObj.prototype.onAwake = function () {
        this._physicsComponent = this.owner.getComponent(Laya.PhysicsComponent);
        if (this._physicsComponent != null) {
            this._physicsComponent.collisionGroup = Enums_1.CollisionGroup.Obstacle;
            this._physicsComponent.canCollideWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Character;
        }
    };
    DestructibleObj.prototype.onUpdate = function () {
        if (this._timer > 50) {
            if (this.Sprite3D.active) {
                this.Sprite3D.active = false;
            }
        }
        else if (this._timer >= 0) {
            this._timer += Laya.timer.delta;
        }
    };
    DestructibleObj.prototype.onTriggerEnter = function (res) {
        SoundMgr_1.default.instance_csjc.playSound_csjc("Broken");
        console.log("-----------------物体名字查看", this.owner.name);
        var replace = SceneMgr_1.default.Instance.ReplaceObj.getChildByName(this.owner.name + "Replace");
        var ani = replace.getComponent(Laya.Animator);
        ani.play(null, 0, 0);
        replace.transform.worldMatrix = this.Sprite3D.transform.worldMatrix;
        if (this._timer < 0) {
            this._timer = 0;
        }
        this._isbreak = true;
        // this._physicsComponent.enabled = false;
    };
    return DestructibleObj;
}(Laya.Script3D));
exports.default = DestructibleObj;
},{"../../../Mgr/SoundMgr":10,"../Enums":38,"../SceneMgr":47}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneMgr_1 = require("../SceneMgr");
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var DestructibleObj_1 = require("./DestructibleObj");
var DestructibleObjBuilds = /** @class */ (function (_super) {
    __extends(DestructibleObjBuilds, _super);
    function DestructibleObjBuilds() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DestructibleObjBuilds.prototype.onTriggerEnter = function (res) {
        // this.keyList.indexOf(e.keyCode) < 0
        console.log("-----------------物体名字查看", res.owner.name);
        if (res.owner.name.indexOf("Kingkong") > 0)
            return;
        SoundMgr_1.default.instance_csjc.playSound_csjc("Broken");
        var replace = SceneMgr_1.default.Instance.ReplaceObj.getChildByName(this.owner.name + "Replace");
        var ani = replace.getComponent(Laya.Animator);
        ani.play(null, 0, 0);
        replace.transform.worldMatrix = this.Sprite3D.transform.worldMatrix;
        if (this._timer < 0) {
            this._timer = 0;
        }
        this._isbreak = true;
        // this._physicsComponent.enabled = false;
    };
    return DestructibleObjBuilds;
}(DestructibleObj_1.default));
exports.default = DestructibleObjBuilds;
},{"../../../Mgr/SoundMgr":10,"../SceneMgr":47,"./DestructibleObj":34}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneMgr_1 = require("../SceneMgr");
var Enums_1 = require("../Enums");
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timer = 0;
        _this._die = false;
        return _this;
    }
    Object.defineProperty(Enemy.prototype, "EnemySprite3D", {
        get: function () { return this.Sprite3D; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "Alive", {
        get: function () { return !this._die; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "Sprite3D", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "Player", {
        get: function () { return SceneMgr_1.default.Instance.Player.FollowObj; },
        enumerable: true,
        configurable: true
    });
    Enemy.prototype.onAwake = function () {
        this._eff = this.owner.getChildAt(1);
        this._physicsComponent = this.owner.getComponent(Laya.PhysicsComponent);
        this._physicsComponent.collisionGroup = Enums_1.CollisionGroup.Obstacle;
        this._physicsComponent.canCollideWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Ground | Enums_1.CollisionGroup.Character;
    };
    Enemy.prototype.onUpdate = function () {
        if (this._die || SceneMgr_1.default.Instance.Player == null)
            return;
        var dis = Laya.Vector3.distance(this.Sprite3D.transform.position, this.Player.transform.position);
        var inPlane = Math.abs(this.Sprite3D.transform.position.y - this.Player.transform.position.y) <= 1;
        // if (dis <= 0.5 && inPlane) {
        //     // this._animator.play("Idle_Crazy_Robot");
        //     this.Attack();
        // }
        // else 
        if (dis < 7 && inPlane) {
            this.ChaseMethod();
        }
        else if (dis < 15 && inPlane) {
            if (this._eff.active) {
                this._eff.active = false;
            }
        }
        else {
        }
    };
    Enemy.prototype.ChaseMethod = function () {
        if (this._timer <= 0) {
            this.EnemyTrun();
            // this.EnemyMove();
        }
        else {
            this._timer -= Laya.timer.delta;
        }
    };
    // Attack() {
    //     this._timer = 1000;
    //     this.EnemyTrun();
    // }
    Enemy.prototype.EnemyTrun = function () {
        var dir = new Laya.Vector3();
        Laya.Vector3.subtract(this.Sprite3D.transform.position, this.Player.transform.position, dir);
        Laya.Vector3.add(this.Sprite3D.transform.position, dir, dir);
        this.Sprite3D.transform.lookAt(dir, Laya.Vector3._Up);
    };
    // EnemyMove() {
    //     let dir = new Laya.Vector3();
    //     Laya.Vector3.subtract(this.Player.transform.position, this.Sprite3D.transform.position, dir);
    //     Laya.Vector3.normalize(dir, dir);
    //     Laya.Vector3.scale(dir, Laya.timer.delta / 1000 * 2, dir);
    //     Laya.Vector3.add(dir, this.Sprite3D.transform.position, dir);
    //     this.Sprite3D.transform.position = dir;
    // }
    Enemy.prototype.onCollisionEnter = function (collision) {
        var _this = this;
        if (this._die)
            return;
        /* if (collision.other.owner.name.search("Attack") > -1 || collision.other.owner.name.search("-Car") > -1 || collision.other.owner.name.search("-Robot") > -1)  */ {
            SoundMgr_1.default.instance_csjc.playSound_csjc("Broken");
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.EnemyDead);
            this._die = true;
            this._physicsComponent.enabled = false;
            this._eff.active = false;
            Laya.timer.frameOnce(20, this, function () {
                _this.owner.active = false;
            });
        }
    };
    return Enemy;
}(Laya.Script3D));
exports.default = Enemy;
},{"../../../Event/EventDef":5,"../../../Event/EventMgr":6,"../../../Mgr/SoundMgr":10,"../Enums":38,"../SceneMgr":47}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var MyAnimatorEvent = /** @class */ (function (_super) {
    __extends(MyAnimatorEvent, _super);
    function MyAnimatorEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyAnimatorEvent.prototype.SetCharacter = function (ctr) {
        this._baseState = ctr;
    };
    MyAnimatorEvent.prototype.Attack1 = function () {
        SoundMgr_1.default.instance_csjc.playSound_csjc("Attack1");
    };
    MyAnimatorEvent.prototype.Attack2 = function () {
        SoundMgr_1.default.instance_csjc.playSound_csjc("Attack2");
    };
    MyAnimatorEvent.prototype.Walk = function () {
        if (this._baseState.CurrentAni == "Walk") {
            SoundMgr_1.default.instance_csjc.playSound_csjc("Step");
        }
    };
    return MyAnimatorEvent;
}(Laya.Script3D));
exports.default = MyAnimatorEvent;
},{"../../../Mgr/SoundMgr":10}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 摄像机的跟随状态枚举
 *
 * @enum {number}
 */
var CameraState;
(function (CameraState) {
    CameraState[CameraState["Normal"] = 1] = "Normal";
    CameraState[CameraState["RotatedAround"] = 2] = "RotatedAround";
    CameraState[CameraState["ChangeFollowObj"] = 3] = "ChangeFollowObj";
    CameraState[CameraState["ChangeingFollowObj"] = 4] = "ChangeingFollowObj";
})(CameraState = exports.CameraState || (exports.CameraState = {}));
/**
 * 角色加速状态枚举
 *
 * @export
 * @enum {number}
 */
var SpeedState;
(function (SpeedState) {
    SpeedState[SpeedState["Normal"] = 1] = "Normal";
    SpeedState[SpeedState["SpeedUp"] = 2] = "SpeedUp";
    SpeedState[SpeedState["SpeedDown"] = 3] = "SpeedDown";
    SpeedState[SpeedState["SpeedBackward"] = 4] = "SpeedBackward";
})(SpeedState = exports.SpeedState || (exports.SpeedState = {}));
var CharacterState;
(function (CharacterState) {
    CharacterState["Idle"] = "Idle";
    CharacterState["Paused"] = "Paused";
    CharacterState["GroundMoving"] = "GroundMoving";
    CharacterState["EndSpeed"] = "EndSpeed";
    CharacterState["EndKick"] = "EndKick";
    CharacterState["EndRoll"] = "EndRoll";
    CharacterState["GameOver"] = "GameOver";
})(CharacterState = exports.CharacterState || (exports.CharacterState = {}));
/**
 * 碰撞组别
 *
 * @export
 * @enum {number}
 */
var CollisionGroup;
(function (CollisionGroup) {
    CollisionGroup[CollisionGroup["All"] = -1] = "All";
    CollisionGroup[CollisionGroup["None"] = 0] = "None";
    CollisionGroup[CollisionGroup["Character"] = Math.pow(2, 0)] = "Character";
    CollisionGroup[CollisionGroup["Obstacle"] = Math.pow(2, 1)] = "Obstacle";
    CollisionGroup[CollisionGroup["Ground"] = Math.pow(2, 3)] = "Ground";
})(CollisionGroup = exports.CollisionGroup || (exports.CollisionGroup = {}));
var SkinState;
(function (SkinState) {
    SkinState[SkinState["NotOwned"] = 0] = "NotOwned";
    SkinState[SkinState["Owned"] = 1] = "Owned";
    SkinState[SkinState["Seleced"] = 2] = "Seleced";
})(SkinState = exports.SkinState || (exports.SkinState = {}));
var GameState;
(function (GameState) {
    GameState[GameState["GameLoad"] = 0] = "GameLoad";
    GameState[GameState["Prepare"] = 1] = "Prepare";
    GameState[GameState["Gameing"] = 2] = "Gameing";
    GameState[GameState["GameOver"] = 3] = "GameOver";
})(GameState = exports.GameState || (exports.GameState = {}));
var InputType;
(function (InputType) {
    InputType[InputType["RockerAxis"] = 0] = "RockerAxis";
    InputType[InputType["CameraAxis"] = 1] = "CameraAxis";
    InputType[InputType["Jump"] = 2] = "Jump";
    InputType[InputType["Transform"] = 3] = "Transform";
    InputType[InputType["Attack"] = 4] = "Attack";
    InputType[InputType["UP"] = 5] = "UP";
    InputType[InputType["Down"] = 6] = "Down";
    InputType[InputType["Fire"] = 7] = "Fire";
    InputType[InputType["FireBall"] = 8] = "FireBall";
    InputType[InputType["ThrowStone"] = 9] = "ThrowStone";
})(InputType = exports.InputType || (exports.InputType = {}));
var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["TRex"] = 0] = "TRex";
    PlayerType[PlayerType["Kingkong"] = 1] = "Kingkong";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FsmState_1 = require("../Fsm/FsmState");
var Enums_1 = require("../Enums");
var BaseState = /** @class */ (function (_super) {
    __extends(BaseState, _super);
    function BaseState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rockerInputTimer = 0;
        _this._jumpInputTimer = 0;
        _this._fireInputTimer = 0;
        _this._fireBallInputTimer = 0;
        _this._transformInputTimer = 0;
        _this._attackInputTimer = 0;
        _this._upTimer = 0;
        _this._downTimer = 0;
        _this._throwstoneTimer = 0;
        _this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        _this.hitResults = [];
        _this.forwardV3 = new Laya.Vector3();
        _this._cameraAxis = new Laya.Point();
        return _this;
    }
    Object.defineProperty(BaseState.prototype, "Animator", {
        get: function () { return this._animator; },
        set: function (v) { this._animator = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "CurrentAni", {
        get: function () { return this._currentAni; },
        set: function (v) { this._currentAni = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "Sprite3D", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "Model", {
        get: function () { return this.owner.getChildAt(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "mOwner", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "RockerAxis", {
        get: function () {
            if (this._rockerInputTimer <= 0) {
                this._rockerAxis = null;
            }
            return this._rockerAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "JumpInput", {
        get: function () {
            return this._jumpInputTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "ThrowStoneInput", {
        get: function () {
            return this._throwstoneTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "FireInput", {
        get: function () {
            return this._fireInputTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "FireBallInput", {
        get: function () {
            return this._fireBallInputTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "TransformInput", {
        get: function () {
            return this._transformInputTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "AttackInput", {
        get: function () {
            return this._attackInputTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "UpInput", {
        get: function () {
            return this._upTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "DownInput", {
        get: function () {
            return this._downTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseState.prototype, "CameraAxis", {
        get: function () { return this._cameraAxis; },
        enumerable: true,
        configurable: true
    });
    BaseState.prototype.Reason = function (any) {
        console.log("-----------------------输入数据", any);
        var input = any;
        if (!input)
            return;
        var type = input.InputType;
        var value = input.Value;
        switch (type) {
            case Enums_1.InputType.RockerAxis:
                if (value != null) {
                    this._rockerAxis = value;
                    this._rockerInputTimer = 150;
                }
                else {
                    this._rockerAxis = null;
                    this._rockerInputTimer = 0;
                }
                break;
            case Enums_1.InputType.CameraAxis:
                this._cameraAxis = value;
                break;
            case Enums_1.InputType.Jump:
                this._jumpInputTimer = 100;
                break;
            case Enums_1.InputType.Fire:
                this._fireInputTimer = 100;
                break;
            case Enums_1.InputType.FireBall:
                this._fireBallInputTimer = 100;
                break;
            case Enums_1.InputType.Transform:
                this._transformInputTimer = 100;
                break;
            case Enums_1.InputType.Attack:
                this._attackInputTimer = 100;
                break;
            case Enums_1.InputType.UP:
                this._upTimer = 100;
                break;
            case Enums_1.InputType.Down:
                this._downTimer = 100;
                break;
            case Enums_1.InputType.ThrowStone:
                console.log("----------------丢石头");
                this._throwstoneTimer = 100;
                break;
        }
    };
    BaseState.prototype.Act = function (any) {
        this._attackInputTimer -= Laya.timer.delta;
        this._rockerInputTimer -= Laya.timer.delta;
        this._transformInputTimer -= Laya.timer.delta;
        this._jumpInputTimer -= Laya.timer.delta;
        this._fireInputTimer -= Laya.timer.delta;
        this._fireBallInputTimer -= Laya.timer.delta;
        this._upTimer -= Laya.timer.delta;
        this._downTimer -= Laya.timer.delta;
        this._throwstoneTimer -= Laya.timer.delta;
    };
    return BaseState;
}(FsmState_1.default));
exports.default = BaseState;
},{"../Enums":38,"../Fsm/FsmState":44}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseState_1 = require("./BaseState");
var FsmEnum_1 = require("../Fsm/FsmEnum");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var SceneMgr_1 = require("../SceneMgr");
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var Enums_1 = require("../Enums");
var MyAnimatorEvent_1 = require("../Character/MyAnimatorEvent");
var KingkongSubState;
(function (KingkongSubState) {
    KingkongSubState[KingkongSubState["Idle"] = 0] = "Idle";
    KingkongSubState[KingkongSubState["Move"] = 1] = "Move";
    KingkongSubState[KingkongSubState["Trans2Pter"] = 2] = "Trans2Pter";
    KingkongSubState[KingkongSubState["Attack"] = 3] = "Attack";
    KingkongSubState[KingkongSubState["SpitFire"] = 4] = "SpitFire";
    KingkongSubState[KingkongSubState["Jumping"] = 5] = "Jumping";
    KingkongSubState[KingkongSubState["Falling"] = 6] = "Falling";
    KingkongSubState[KingkongSubState["Eating"] = 7] = "Eating";
    KingkongSubState[KingkongSubState["Climb"] = 8] = "Climb";
    KingkongSubState[KingkongSubState["ClimbEnd"] = 9] = "ClimbEnd";
    KingkongSubState[KingkongSubState["ThrowStone"] = 10] = "ThrowStone";
})(KingkongSubState || (KingkongSubState = {}));
var KingkingState = /** @class */ (function (_super) {
    __extends(KingkingState, _super);
    function KingkingState() {
        var _this = _super.call(this) || this;
        _this._subState = KingkongSubState.Idle;
        _this._attackTimer = 0;
        _this.stateID = FsmEnum_1.StateID.KingKong;
        _this._onGround = true;
        _this._isClimb = false;
        _this._climbMask = false;
        _this.tempV3 = new Laya.Vector3();
        _this.AddTransition(FsmEnum_1.Transition.Kingkong2Trex, FsmEnum_1.StateID.KingKong);
        return _this;
    }
    // private _attack1: Laya.PhysicsComponent;
    // private _attack2: Laya.PhysicsComponent;
    KingkingState.prototype.onAwake = function () {
        console.log("-----------------------开始爬楼");
        this._animator = this.Model.getComponent(Laya.Animator);
        // this._animator.avatar. = false
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D);
        this._rigidBody3D.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigidBody3D.collisionGroup = Enums_1.CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = Enums_1.CollisionGroup.All ^ Enums_1.CollisionGroup.Character;
        var ani = this.Model.addComponent(MyAnimatorEvent_1.default);
        this._isClimb = false;
        ani.SetCharacter(this);
        this.SetAttack();
    };
    KingkingState.prototype.SetAttack = function () {
        // this._attack1 = this.Model.getChildByName("Attack1").getComponent(Laya.PhysicsComponent);
        // this._attack1.collisionGroup = CollisionGroup.Character
        // this._attack1.canCollideWith = CollisionGroup.All | CollisionGroup.Obstacle ^ CollisionGroup.Character;
        // this._attack2 = this.Model.getChildByName("Attack2").getComponent(Laya.PhysicsComponent);
        // this._attack2.collisionGroup = CollisionGroup.Character
        // this._attack2.canCollideWith = CollisionGroup.All | CollisionGroup.Obstacle ^ CollisionGroup.Character;
        // this.Animator.play("Climbing Up Wall");
    };
    KingkingState.prototype.DoBeforeEntering = function (any) {
        this.characterCtr.SetFollowObj(this.Sprite3D);
        this.Animator.play("ClimbingOver");
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.TransformEvent, [false]);
        // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: new Laya.Vector3(0, 20, 10), CameraViewForward: 0 });
    };
    KingkingState.prototype.DoBeforeLeaving = function (any) {
        this._subState = KingkongSubState.Idle;
        this.characterCtr.StopSound();
    };
    KingkingState.prototype.Reason = function (any) {
        // console.log("-----------------------输入数据",any)
        _super.prototype.Reason.call(this, any);
    };
    /**
     * 反应
     *
     * @param {*} [any]
     *
     * @memberOf RobotState
     */
    KingkingState.prototype.Act = function (any) {
        // console.log("------------------------输出",any)
        if (this.CurrentAni == "Jump" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime <= 0.5)
            return;
        this._onGround = this.OnGroundCheck();
        if (this._subState != KingkongSubState.ClimbEnd && this._climbMask == false) {
            this.OnWallCheck();
            if (this._isClimb) {
                this.ClimbMethod();
                return;
            }
        }
        // this.OnWallCheck();
        this._onGround = this.OnGroundCheck();
        _super.prototype.Act.call(this, any);
        {
            switch (this._subState) {
                case KingkongSubState.Idle:
                    this.IdleMethod();
                    break;
                case KingkongSubState.Move:
                    this.MoveMethod();
                    break;
                case KingkongSubState.Attack:
                    this.AttackMethod();
                    break;
                case KingkongSubState.Jumping:
                    this.JumpMethod();
                    break;
                case KingkongSubState.Falling:
                    this.Falling();
                    break;
                case KingkongSubState.Eating:
                    this.EatingMethod();
                    break;
                case KingkongSubState.Climb:
                    this.ClimbMethod();
                case KingkongSubState.ClimbEnd:
                    this.ClimbOverMethod();
                    break;
                case KingkongSubState.ThrowStone:
                    this.ThrowStoneMethod();
                    break;
            }
        }
    };
    KingkingState.prototype.AttackMethod = function () {
        // console.log("-------------------攻击",this.Animator)
        this.StopMove();
        this.characterCtr.StopSound();
        this._attackTimer -= Laya.timer.delta;
        var angle = 0;
        var spd = 1;
        if (this.RockerAxis != null) {
            angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
        }
        if (this.CurrentAni == "Attack" && this._attackTimer > 600) {
            this.TurnAndMove(angle, spd * 5);
        }
        else if (this.CurrentAni == "Attack Box" && this._attackTimer < 800 && this._attackTimer > 700) {
            this.TurnAndMove(angle, spd * 5);
        }
        if (this._attackTimer <= 200 && this.AttackInput) {
            if (this.CurrentAni == "Attack") {
                this._attackTimer = 1400;
                this.Animator.play("Attack Box");
                this.CurrentAni = "Attack Box";
            }
            else {
                this._attackTimer = 1000;
                this.Animator.play("Attack");
                this.CurrentAni = "Attack";
                // SoundMgr_csjc.instance_csjc.playSound_csjc("Attack Jaw");
            }
        }
        else if (this._attackTimer <= 0) {
            this._subState = KingkongSubState.Idle;
        }
    };
    KingkingState.prototype.JumpMethod = function () {
        // if(this._attackTimer<)
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Jump") {
            this.CurrentAni = "Jump";
            this.Animator.speed = 1;
            this.Animator.play("Jump", 0, 0);
            SoundMgr_1.default.instance_csjc.playSound_csjc("Land");
        }
        else if (this.CurrentAni == "Jump") {
            if (this.Animator.getCurrentAnimatorPlayState(0).normalizedTime > 0.5) {
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 20, 0);
                this._subState = KingkongSubState.Falling;
            }
        }
    };
    KingkingState.prototype.Falling = function () {
        console.log("*-----------------------向下落");
        if (this._onGround) {
            this._subState = KingkongSubState.Idle;
            SoundMgr_1.default.instance_csjc.playSound_csjc("Land");
        } /*
        else if (this.FaceWall) {
            this._subState = TRexSubState.Climbing;
        } */
        if (this.CurrentAni != "Idle" && this._rigidBody3D.linearVelocity.y < 0) {
            this.CurrentAni = "Idle";
            this.Animator.speed = 1;
            this.Animator.crossFade("Idle", 0.5);
        }
        if (this.RockerAxis != null) {
            var angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            var spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            this.TurnAndMove(angle, spd * 2);
        }
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterFalling);
    };
    /**
     * 暂停
     *
     *
     * @memberOf CharacterCtr
     */
    KingkingState.prototype.IdleMethod = function () {
        if (!this._onGround) {
            this._subState = KingkongSubState.Falling;
        }
        else if (this.FireInput) {
            this._subState = KingkongSubState.SpitFire;
        }
        else if (this.TransformInput) {
            this._subState = KingkongSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = KingkongSubState.Attack;
        }
        else if (this.RockerAxis != null) {
            this._subState = KingkongSubState.Move;
        }
        else if (this.JumpInput) {
            this._subState = KingkongSubState.Jumping;
        }
        else if (this.ThrowStoneInput) {
            console.log("----------------丢石头方法状态");
            this._subState = KingkongSubState.ThrowStone;
        }
        else {
            if (this.CurrentAni != "Idle") {
                if (this.CurrentAni != "Idle") {
                    this.CurrentAni = "Idle";
                    this.Animator.speed = 1;
                    this.Animator.crossFade("Idle", 0.1);
                    this.StopMove();
                }
            }
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
        }
    };
    KingkingState.prototype.MoveMethod = function () {
        if (this.TransformInput) {
            this._subState = KingkongSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = KingkongSubState.Attack;
        }
        else if (this.JumpInput) {
            this._subState = KingkongSubState.Jumping;
        }
        else if (this.ThrowStoneInput) {
            this._subState = KingkongSubState.ThrowStone;
        }
        else if (this.RockerAxis != null) {
            var angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            // let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            var spd = Math.min(1, Math.max(0.2, this.RockerAxis.distance(0, 0)));
            {
                if (this.CurrentAni != "Walk") {
                    this.Animator.play("Walk");
                    this.CurrentAni = "Walk";
                }
                else {
                    this.Animator.speed = spd;
                }
            }
            this.TurnAndMove(angle, spd * 3);
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
        }
        else {
            this._subState = KingkongSubState.Idle;
        }
    };
    KingkingState.prototype.StopMove = function () {
        this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO.clone();
    };
    /*
        机器角色转向移动
    */
    KingkingState.prototype.TurnAndMove = function (angle, spd) {
        if (this._onGround == false) {
            this._subState = KingkongSubState.Falling;
        }
        this.TurnByCamera(angle);
        this.MoveForward(spd);
        // if (this.TurnByCamera(angle)) {
        //     this.MoveForward(spd);
        // }
    };
    KingkingState.prototype.Turn = function (angle) {
        var curAngle = this.Model.transform.localRotationEulerY;
        if (Math.abs(curAngle - angle) < 3)
            return;
        if (curAngle > angle) {
            if (curAngle - angle > 180) {
                curAngle += 3;
            }
            else {
                curAngle -= 3;
            }
        }
        else if (angle > curAngle) {
            if (angle - curAngle > 180) {
                curAngle -= 3;
            }
            else {
                curAngle += 3;
            }
        }
        curAngle = curAngle % 360;
        if (curAngle < 0) {
            curAngle += 360;
        }
        this.Model.transform.localRotationEulerY = curAngle;
    };
    /*
        机器角色转向
    */
    KingkingState.prototype.TurnByCamera = function (angle) {
        var dir = new Laya.Vector3();
        Laya.Vector3.subtract(SceneMgr_1.default.Instance.Camera.transform.position, this.Model.transform.position, dir);
        dir.y = 0;
        var angle2 = (Math.atan2(dir.x, dir.z) / Math.PI * 180) + 180;
        angle = (angle + angle2) % 360;
        var curAngle = this.Model.transform.localRotationEulerY;
        if (Math.abs(curAngle - angle) < 3)
            return;
        if (curAngle > angle) {
            if (curAngle - angle > 180) {
                curAngle += 3;
            }
            else {
                curAngle -= 3;
            }
        }
        else if (angle > curAngle) {
            if (angle - curAngle > 180) {
                curAngle -= 3;
            }
            else {
                curAngle += 3;
            }
        }
        curAngle = curAngle % 360;
        if (curAngle < 0) {
            curAngle += 360;
        }
        this.Model.transform.localRotationEulerY = curAngle;
    };
    /*
        向前移动
     */
    KingkingState.prototype.MoveForward = function (spd) {
        var curAngle = this.Model.transform.localRotationEulerY * 3.14 / 180;
        this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(curAngle) * 3 * spd, this._rigidBody3D.linearVelocity.y, Math.cos(curAngle) * 3 * spd);
    };
    KingkingState.prototype.OnGroundCheck = function () {
        var up = new Laya.Vector3(0, 5, 0);
        var down = new Laya.Vector3(0, -0.1, 0);
        Laya.Vector3.add(this.Sprite3D.transform.position, down, down);
        Laya.Vector3.add(this.Sprite3D.transform.position, up, up);
        var hitResults = new Laya.HitResult();
        var collisionGroup = Enums_1.CollisionGroup.Character;
        var canCollisionWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Ground | Enums_1.CollisionGroup.Obstacle;
        var res = SceneMgr_1.default.Instance.CurrentScene.physicsSimulation.raycastFromTo(up, down, hitResults, collisionGroup, canCollisionWith);
        return res;
    };
    KingkingState.prototype.getForward = function () {
        this.Model.transform.getForward(this.forwardV3);
        return this.forwardV3;
    };
    /**
     * 设置中心变量v3
     * @param x
     * @param y
     * @param z
     */
    KingkingState.prototype.setTempV3 = function (x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.tempV3.x = x;
        this.tempV3.y = y;
        this.tempV3.z = z;
        return this.tempV3;
    };
    KingkingState.prototype.OnWallCheck = function () {
        var tempY = this.CurrentAni == "Climbing Up Wall" ? 15 : 5;
        this.LineRayCast(this.setTempV3(this.Sprite3D.transform.position.x, this.Sprite3D.transform.position.y + tempY, this.Sprite3D.transform.position.z), this.getForward(), -3, true);
        var checkres = false;
        for (var i = 0; i < this.hitResults.length; i++) {
            var collider = this.hitResults[i].collider;
            // console.log("---------------查看前方",collider)
            if (collider.owner.parent.name == "Buildings") {
                this._subState = KingkongSubState.Climb;
                this._isClimb = true;
                checkres = true;
            }
        }
        if (this.CurrentAni == "Climbing Up Wall" && checkres == false) {
            this._subState = KingkongSubState.ClimbEnd;
            this._isClimb = false;
        }
    };
    KingkingState.prototype.LineRayCast = function (m_origin, driect, distance, isTest) {
        if (isTest === void 0) { isTest = false; }
        if (isTest == true) {
            if (this.TextLine) {
                this.TextLine.destroy();
            }
            var lineDir = new Laya.Vector3(driect.x * distance, driect.y * distance, driect.z * distance);
            var lineSprite = SceneMgr_1.default.Instance.CurrentScene.addChild(new Laya.PixelLineSprite3D(1));
            lineSprite.addLine(m_origin, new Laya.Vector3(m_origin.x + lineDir.x, m_origin.y + lineDir.y, m_origin.z + lineDir.z), Laya.Color.RED, Laya.Color.RED);
            this.TextLine = lineSprite;
        }
        this.ray.origin = m_origin; //= new Laya.Ray(origin, driect);
        this.ray.direction = driect;
        SceneMgr_1.default.Instance.CurrentScene.physicsSimulation.rayCastAll(this.ray, this.hitResults, distance);
    };
    KingkingState.prototype.onCollisionEnter = function (collision) {
        var enemy = collision.other.owner;
        if (enemy.name.search("Enemy") > -1) {
            this._subState = KingkongSubState.Eating;
            SoundMgr_1.default.instance_csjc.playSound_csjc("Eating");
        }
    };
    KingkingState.prototype.EatingMethod = function () {
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Eating") {
            this.CurrentAni = "Eating";
            this.Animator.speed = 1;
            this.Animator.play("Eating", 0, 0);
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterFalling);
            this.StopMove();
        }
        else if (this.CurrentAni == "Eating" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
            this._subState = KingkongSubState.Idle;
        }
    };
    /**丢石头 */
    KingkingState.prototype.ThrowStoneMethod = function () {
        var _this = this;
        if (this.CurrentAni != "ThrowStone") {
            this.CurrentAni = "ThrowStone";
            this.Animator.speed = 1;
            this.Animator.play("ThrowStone");
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration * 600, this, function () {
                _this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 5, 0);
                Laya.timer.once(_this.Animator.getCurrentAnimatorPlayState(0).duration * 200, _this, function () {
                });
            });
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration * 1000, this, function () {
                Laya.timer.once(300, _this, function () {
                });
            });
        }
        else if (this.CurrentAni == "ThrowStone" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
            this._subState = KingkongSubState.Idle;
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);
        }
    };
    /**
     * 攀爬结束
     */
    KingkingState.prototype.ClimbOverMethod = function () {
        var _this = this;
        // this.characterCtr.StopSound();
        if (this.CurrentAni != "ClimbingOver") {
            this.CurrentAni = "ClimbingOver";
            this.Animator.speed = 1;
            console.log("---------------开始攀爬");
            this.Animator.play("ClimbingOver");
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration * 600, this, function () {
                _this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 5, 0);
                Laya.timer.once(_this.Animator.getCurrentAnimatorPlayState(0).duration * 200, _this, function () {
                    var localy = _this.Sprite3D.transform.localPositionY + 10;
                    Laya.Tween.to(_this.Sprite3D.transform, { localPositionY: localy }, 300);
                    // this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 20, 0);
                });
            });
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration * 1000, this, function () {
                _this.MoveForward(1.5);
                Laya.timer.once(300, _this, function () {
                    _this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);
                });
            });
        }
        else if (this.CurrentAni == "ClimbingOver" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
            this._subState = KingkongSubState.Idle;
            // this._rigidBody3D.isKinematic = true
            this._rigidBody3D.gravity = this.setTempV3(0, -10, 0);
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);
        }
    };
    KingkingState.prototype.ClimbMask = function () {
        this._climbMask = false;
    };
    /**
     * 攀爬函数
     */
    KingkingState.prototype.ClimbMethod = function () {
        if (this._onGround) {
            this._subState = KingkongSubState.Falling;
        }
        else if (this.JumpInput) {
            console.log("---------------------输入条约");
            this._isClimb = false;
            this._climbMask = true;
            Laya.timer.clear(this, this.ClimbMask);
            Laya.timer.frameOnce(120, this, this.ClimbMask);
            this._rigidBody3D.gravity = this.setTempV3(0, -10, 0);
            this._subState = KingkongSubState.Jumping;
            return;
        }
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Climbing Up Wall") {
            this.CurrentAni = "Climbing Up Wall";
            this.Animator.speed = 1;
            this.Animator.play("Climbing Up Wall");
        }
        this._rigidBody3D.gravity = this.setTempV3(0, 0, 0);
        if (this.RockerAxis != null) {
            var isup = this.RockerAxis.y >= 0 ? 1 : -1;
            var spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            this.Animator.speed = this.RockerAxis == null ? 0 : isup * spd * -1;
            // let curAngle = this.Model.transform.localRotationEulerY * 3.14 / 180;
            // console.log("----------------------爬上爬下",this.RockerAxis.y,spd)
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, isup * spd * -3, 0);
        }
        else {
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);
            this.Animator.speed = 0;
        }
    };
    KingkingState.prototype.onDestroy = function () {
        this.characterCtr.StopSound();
    };
    return KingkingState;
}(BaseState_1.default));
exports.default = KingkingState;
},{"../../../Event/EventDef":5,"../../../Event/EventMgr":6,"../../../Mgr/SoundMgr":10,"../Character/MyAnimatorEvent":37,"../Enums":38,"../Fsm/FsmEnum":43,"../SceneMgr":47,"./BaseState":39}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseState_1 = require("./BaseState");
var FsmEnum_1 = require("../Fsm/FsmEnum");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var SceneMgr_1 = require("../SceneMgr");
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var Enums_1 = require("../Enums");
var MyAnimatorEvent_1 = require("../Character/MyAnimatorEvent");
var TRexSubState;
(function (TRexSubState) {
    TRexSubState[TRexSubState["Idle"] = 0] = "Idle";
    TRexSubState[TRexSubState["Move"] = 1] = "Move";
    TRexSubState[TRexSubState["Trans2Pter"] = 2] = "Trans2Pter";
    TRexSubState[TRexSubState["Attack"] = 3] = "Attack";
    TRexSubState[TRexSubState["SpitFire"] = 4] = "SpitFire";
    TRexSubState[TRexSubState["Jumping"] = 5] = "Jumping";
    TRexSubState[TRexSubState["Falling"] = 6] = "Falling";
    TRexSubState[TRexSubState["Eating"] = 7] = "Eating";
})(TRexSubState || (TRexSubState = {}));
var TRexState = /** @class */ (function (_super) {
    __extends(TRexState, _super);
    function TRexState() {
        var _this = _super.call(this) || this;
        _this._subState = TRexSubState.Idle;
        _this._attackTimer = 0;
        _this.stateID = FsmEnum_1.StateID.TRex;
        _this._onGround = true;
        // FireRay() {
        //     let front = new Laya.Vector3();
        //     let cur = new Laya.Vector3(0, 0, 0);
        //     this.Model.transform.getForward(front);
        //     Laya.Vector3.normalize(front, front);
        //     Laya.Vector3.scale(front, -10, front);
        //     Laya.Vector3.add(this.Model.transform.position, front, front);
        //     let hitResults: Array<Laya.HitResult> = [];
        //     let collisionGroup = CollisionGroup.Character;
        //     let canCollisionWith = CollisionGroup.Obstacle | CollisionGroup.Ground;
        //     let colliderShape = new Laya.SphereColliderShape(5);
        //     let res = SceneMgr_cscj.Instance.CurrentScene.physicsSimulation.shapeCastAll(colliderShape, this.Model.transform.position, front,
        //         hitResults, Laya.Quaternion.NAN, Laya.Quaternion.NAN, collisionGroup, canCollisionWith, 1);
        //     if (res) {
        //         for (let index = 0; index < hitResults.length; index++) {
        //             const element = hitResults[index];
        //         }
        //     }
        //     return res;
        // }
        _this._fireTimer = 0;
        _this.AddTransition(FsmEnum_1.Transition.Trex2Kingkong, FsmEnum_1.StateID.TRex);
        return _this;
    }
    TRexState.prototype.onAwake = function () {
        this._animator = this.Model.getComponent(Laya.Animator);
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D);
        this._rigidBody3D.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigidBody3D.collisionGroup = Enums_1.CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = Enums_1.CollisionGroup.All ^ Enums_1.CollisionGroup.Character;
        this._rigidBody3D.isKinematic = false;
        // if (this._rigidBody3D.colliderShape != null) {
        //     this._rigidBody3D.colliderShape.destroy();
        // }
        // let shape = new Laya.CapsuleColliderShape(3, 8, 0);
        // shape.localOffset = new Laya.Vector3(0, 3, 0);
        // this._rigidBody3D.colliderShape = shape;
        this._fire = this.Model.getChildByName("Flamestrike");
        this._fireCol = this._fire.getComponent(Laya.PhysicsComponent);
        this._fireCol.collisionGroup = Enums_1.CollisionGroup.Character;
        this._fireCol.canCollideWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Obstacle;
        this._fire.active = false;
        this._fireCol.enabled = false;
        var ani = this.Model.addComponent(MyAnimatorEvent_1.default);
        ani.SetCharacter(this);
        this.SetAttack();
    };
    TRexState.prototype.SetAttack = function () {
        var _this = this;
        this._attack1 = this.Model.getChildByName("Attack1_TRex").getComponent(Laya.PhysicsComponent);
        this._attack1.collisionGroup = Enums_1.CollisionGroup.Character;
        this._attack1.canCollideWith = Enums_1.CollisionGroup.All | Enums_1.CollisionGroup.Obstacle ^ Enums_1.CollisionGroup.Character;
        this._attack2 = this.Model.getChildByName("Attack2_TRex").getComponent(Laya.PhysicsComponent);
        this._attack2.collisionGroup = Enums_1.CollisionGroup.Character;
        this._attack2.canCollideWith = Enums_1.CollisionGroup.All | Enums_1.CollisionGroup.Obstacle ^ Enums_1.CollisionGroup.Character;
        Laya.timer.frameOnce(30, this, function () {
            _this.characterCtr.PerformTransition(FsmEnum_1.Transition.Trex2Kingkong);
            console.log("----------------转换形态");
        });
    };
    TRexState.prototype.DoBeforeEntering = function (any) {
        this.characterCtr.SetFollowObj(this.Sprite3D);
        this.Animator.play("End Sleeping");
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.TransformEvent, [false]);
        // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: new Laya.Vector3(0, 20, 10), CameraViewForward: 0 });
    };
    TRexState.prototype.DoBeforeLeaving = function (any) {
        this._subState = TRexSubState.Idle;
        this.characterCtr.StopSound();
    };
    /**
     * 反应
     *
     * @param {*} [any]
     *
     * @memberOf RobotState
     */
    TRexState.prototype.Act = function (any) {
        this._onGround = this.OnGroundCheck();
        _super.prototype.Act.call(this, any);
        // if (this._climbOver >= 0) {
        //     if (this._subState == TRexSubState.Move ||
        //         this._subState == TRexSubState.Idle ||
        //     ) {
        //         this._climbOver -= Laya.timer.delta;;
        //     }
        // }
        /* if (!this.IsTransforming)  */ {
            switch (this._subState) {
                case TRexSubState.Idle:
                    this.IdleMethod();
                    break;
                case TRexSubState.Move:
                    this.MoveMethod();
                    break;
                case TRexSubState.Attack:
                    this.AttackMethod();
                    break;
                case TRexSubState.Trans2Pter:
                    this.Trasform2PterMethod();
                    break;
                case TRexSubState.Jumping:
                    this.JumpMethod();
                    break;
                case TRexSubState.Falling:
                    this.Falling();
                    break;
                case TRexSubState.SpitFire:
                    this.SpitFireMethod();
                    break;
                case TRexSubState.Eating:
                    this.EatingMethod();
                    break;
            }
        }
    };
    TRexState.prototype.AttackMethod = function () {
        this.StopMove();
        this.characterCtr.StopSound();
        this._attackTimer -= Laya.timer.delta;
        var angle = 0;
        var spd = 1;
        if (this.RockerAxis != null) {
            angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
        }
        if (this.CurrentAni == "Attack Jaw" && this._attackTimer > 600) {
            this.TurnAndMove(angle, spd * 5);
            this.EnableAttack();
        }
        else if (this.CurrentAni == "Attack Tail" && this._attackTimer < 800 && this._attackTimer > 700) {
            this.TurnAndMove(angle, spd * 5);
            this.EnableAttack();
        }
        if (this._attackTimer <= 200 && this.AttackInput) {
            if (this.CurrentAni == "Attack Jaw") {
                this._attackTimer = 1400;
                this.Animator.play("Attack Tail");
                this.CurrentAni = "Attack Tail";
            }
            else {
                this._attackTimer = 1000;
                this.Animator.play("Attack Jaw");
                this.CurrentAni = "Attack Jaw";
                SoundMgr_1.default.instance_csjc.playSound_csjc("Attack Jaw");
            }
        }
        else if (this._attackTimer <= 0) {
            this._subState = TRexSubState.Idle;
            this.DisableAttack();
        }
    };
    TRexState.prototype.JumpMethod = function () {
        // if(this._attackTimer<)
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Jumping") {
            this.CurrentAni = "Jumping";
            this.Animator.speed = 1;
            this.Animator.play("Jumping", 0, 0);
            SoundMgr_1.default.instance_csjc.playSound_csjc("Land");
        }
        else if (this.CurrentAni == "Jumping") {
            if (this.Animator.getCurrentAnimatorPlayState(0).normalizedTime > 0.0) {
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 20, 0);
                this._subState = TRexSubState.Falling;
            }
        }
    };
    TRexState.prototype.Falling = function () {
        if (this._onGround) {
            console.log("*-----------------------落下碰到地面");
            this._subState = TRexSubState.Idle;
            SoundMgr_1.default.instance_csjc.playSound_csjc("Land");
        } /*
        else if (this.FaceWall) {
            this._subState = TRexSubState.Climbing;
        } */
        if (this.CurrentAni != "Looking Up" && this._rigidBody3D.linearVelocity.y < 0) {
            this.CurrentAni = "Looking Up";
            this.Animator.speed = 1;
            this.Animator.crossFade("Looking Up", 0.5);
        }
        if (this.RockerAxis != null) {
            var angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            var spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            this.TurnAndMove(angle, spd * 2);
        }
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterFalling);
    };
    /**
     * 暂停
     *
     *
     * @memberOf CharacterCtr
     */
    TRexState.prototype.IdleMethod = function () {
        if (!this._onGround) {
            this._subState = TRexSubState.Falling;
        }
        else if (this.FireInput) {
            this._subState = TRexSubState.SpitFire;
        }
        else if (this.TransformInput) {
            this._subState = TRexSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = TRexSubState.Attack;
        }
        else if (this.RockerAxis != null) {
            this._subState = TRexSubState.Move;
        }
        else if (this.JumpInput) {
            this._subState = TRexSubState.Jumping;
        }
        else {
            if (this.CurrentAni != "Idle") {
                if (this.CurrentAni != "Idle") {
                    this.CurrentAni = "Idle";
                    this.Animator.speed = 1;
                    this.Animator.crossFade("Idle", 0.1);
                    this.StopMove();
                }
            }
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
        }
    };
    TRexState.prototype.MoveMethod = function () {
        /* if (!this.OnGround) {
            this._subState = TRexSubState.Falling;
        }
        else if (this.FaceWall) {
            this._subState = TRexSubState.Climbing;
        }
        else  */ if (this.TransformInput) {
            this._subState = TRexSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = TRexSubState.Attack;
        }
        else if (this.JumpInput) {
            this._subState = TRexSubState.Jumping;
        }
        else if (this.RockerAxis != null) {
            var angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            // let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            var spd = Math.min(1, Math.max(0.2, this.RockerAxis.distance(0, 0)));
            /* if (spd < 0.5) {
                if (this.CurrentAni != "Walk") {
                    this.Animator.crossFade("Walk", 0.1);
                    this.CurrentAni = "Walk";
                }
                else {
                    this.Animator.speed = spd;
                }
            }
            else */ {
                if (this.CurrentAni != "Walk") {
                    this.Animator.play("Walk");
                    this.CurrentAni = "Walk";
                }
                else {
                    this.Animator.speed = spd;
                }
            }
            this.TurnAndMove(angle, spd * 3);
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
        }
        else {
            this._subState = TRexSubState.Idle;
        }
    };
    TRexState.prototype.Trasform2PterMethod = function () {
        console.log("---------------------------------变身！！！！！！！！");
        if (this.CurrentAni != "Start Sliping") {
            this.CurrentAni = "Start Sliping";
            this.Animator.speed = 1;
            this.Animator.play("Start Sliping", 0, 0);
            SoundMgr_1.default.instance_csjc.playSound_csjc("Roar1");
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterFalling);
        }
        else if (this.CurrentAni == "Start Sliping" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            SoundMgr_1.default.instance_csjc.playSound_csjc("Roar2");
            this.characterCtr.PerformTransition(FsmEnum_1.Transition.TRex2Pter);
        }
        this.StopMove();
    };
    TRexState.prototype.StopMove = function () {
        this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO.clone();
    };
    /*
        机器角色转向移动
    */
    TRexState.prototype.TurnAndMove = function (angle, spd) {
        this.TurnByCamera(angle);
        this.MoveForward(spd);
        // if (this.TurnByCamera(angle)) {
        //     this.MoveForward(spd);
        // }
    };
    TRexState.prototype.Turn = function (angle) {
        var curAngle = this.Model.transform.localRotationEulerY;
        if (Math.abs(curAngle - angle) < 3)
            return;
        if (curAngle > angle) {
            if (curAngle - angle > 180) {
                curAngle += 3;
            }
            else {
                curAngle -= 3;
            }
        }
        else if (angle > curAngle) {
            if (angle - curAngle > 180) {
                curAngle -= 3;
            }
            else {
                curAngle += 3;
            }
        }
        curAngle = curAngle % 360;
        if (curAngle < 0) {
            curAngle += 360;
        }
        this.Model.transform.localRotationEulerY = curAngle;
    };
    /*
        机器角色转向
    */
    TRexState.prototype.TurnByCamera = function (angle) {
        var dir = new Laya.Vector3();
        Laya.Vector3.subtract(SceneMgr_1.default.Instance.Camera.transform.position, this.Model.transform.position, dir);
        dir.y = 0;
        var angle2 = (Math.atan2(dir.x, dir.z) / Math.PI * 180) + 180;
        angle = (angle + angle2) % 360;
        var curAngle = this.Model.transform.localRotationEulerY;
        if (Math.abs(curAngle - angle) < 3)
            return;
        if (curAngle > angle) {
            if (curAngle - angle > 180) {
                curAngle += 3;
            }
            else {
                curAngle -= 3;
            }
        }
        else if (angle > curAngle) {
            if (angle - curAngle > 180) {
                curAngle -= 3;
            }
            else {
                curAngle += 3;
            }
        }
        curAngle = curAngle % 360;
        if (curAngle < 0) {
            curAngle += 360;
        }
        this.Model.transform.localRotationEulerY = curAngle;
    };
    /*
        向前移动
     */
    TRexState.prototype.MoveForward = function (spd) {
        var curAngle = this.Model.transform.localRotationEulerY * 3.14 / 180;
        this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(curAngle) * 3 * spd, this._rigidBody3D.linearVelocity.y, Math.cos(curAngle) * 3 * spd);
    };
    TRexState.prototype.EnableAttack = function () {
        if (!this._attack1.enabled) {
            this._attack1.enabled = true;
        }
        if (!this._attack2.enabled) {
            this._attack2.enabled = true;
        }
    };
    TRexState.prototype.DisableAttack = function () {
        if (this._attack1.enabled) {
            this._attack1.enabled = false;
        }
        if (this._attack2.enabled) {
            this._attack2.enabled = false;
        }
    };
    TRexState.prototype.OnGroundCheck = function () {
        var up = new Laya.Vector3(0, 5, 0);
        var down = new Laya.Vector3(0, -0.1, 0);
        Laya.Vector3.add(this.Sprite3D.transform.position, down, down);
        Laya.Vector3.add(this.Sprite3D.transform.position, up, up);
        var hitResults = new Laya.HitResult();
        var collisionGroup = Enums_1.CollisionGroup.Character;
        var canCollisionWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Ground | Enums_1.CollisionGroup.Obstacle;
        var res = SceneMgr_1.default.Instance.CurrentScene.physicsSimulation.raycastFromTo(up, down, hitResults, collisionGroup, canCollisionWith);
        return res;
    };
    TRexState.prototype.SpitFireMethod = function () {
        var _this = this;
        if (this.FireInput) {
            this._fireTimer = 300;
            this.StopMove();
            this.characterCtr.FireSound(1);
            if (this.CurrentAni != "Roarning") {
                this.CurrentAni = "Roarning";
                this.Animator.speed = 1;
                this.Animator.play("Roarning", 0, 0);
                Laya.timer.once(200, this, function () {
                    _this._fire.active = true;
                    _this._fireCol.enabled = true;
                });
            }
            if (this.RockerAxis != null) {
                this.Model.transform.localRotationEulerY -= this.RockerAxis.x * 3;
                // this._fire.transform.localRotationEulerY = this.Model.transform.localRotationEulerY;
                if (this._fireCol.colliderShape != null) {
                    this._fireCol.colliderShape.destroy();
                }
                var shape = new Laya.BoxColliderShape(5, 6, 30);
                shape.localOffset = new Laya.Vector3(0, -2, 15);
                this._fireCol.colliderShape = shape;
                EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
            }
            // this.FireRay();
        }
        else {
            if (this._fireTimer > 0) {
                this._fireTimer -= Laya.timer.delta;
            }
            this.characterCtr.StopSound();
            if (this._fireTimer > 0)
                return;
            Laya.timer.once(1000, this, function () {
                _this.characterCtr.StopSound();
            });
            this._fire.active = false;
            this._fireCol.enabled = false;
            if (this.TransformInput) {
                this._subState = TRexSubState.Trans2Pter;
            }
            else if (this.AttackInput) {
                this._subState = TRexSubState.Attack;
            }
            else if (this.JumpInput) {
                this._subState = TRexSubState.Jumping;
            }
            else {
                this._subState = TRexSubState.Idle;
            }
        }
    };
    TRexState.prototype.onCollisionEnter = function (collision) {
        var enemy = collision.other.owner;
        if (enemy.name.search("Enemy") > -1) {
            this._subState = TRexSubState.Eating;
            SoundMgr_1.default.instance_csjc.playSound_csjc("Eating");
        }
    };
    TRexState.prototype.EatingMethod = function () {
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Eating") {
            this.CurrentAni = "Eating";
            this.Animator.speed = 1;
            this.Animator.play("Eating", 0, 0);
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterFalling);
            this.StopMove();
        }
        else if (this.CurrentAni == "Eating" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.CharacterNormal);
            this._subState = TRexSubState.Idle;
        }
    };
    TRexState.prototype.onDestroy = function () {
        this.characterCtr.StopSound();
    };
    return TRexState;
}(BaseState_1.default));
exports.default = TRexState;
},{"../../../Event/EventDef":5,"../../../Event/EventMgr":6,"../../../Mgr/SoundMgr":10,"../Character/MyAnimatorEvent":37,"../Enums":38,"../Fsm/FsmEnum":43,"../SceneMgr":47,"./BaseState":39}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FsmEnum_1 = require("./FsmEnum");
/**
A Finite State Machine System based on Chapter 3.1 of Game Programming Gems 1 by Eric Dybsand
 
Written by Roberto Cezar Bianchini, July 2010
 
 
How to use:
    1. Place the labels for the transitions and the states of the Finite State System
        in the corresponding enums.
 
    2. Write new class(es) inheriting from FSMState and fill each one with pairs (transition-state).
        These pairs represent the state S2 the FSMSystem should be if while being on state S1, a
        transition T is fired and state S1 has a transition from it to S2. Remember this is a Deterministic FSM.
        You can't have one transition leading to two different states.
 
       Method Reason is used to determine which transition should be fired.
       You can write the code to fire transitions in another place, and leave this method empty if you
       feel it's more appropriate to your project.
 
       Method Act has the code to perform the actions the NPC is supposed do if it's on this state.
       You can write the code for the actions in another place, and leave this method empty if you
       feel it's more appropriate to your project.
 
    3. Create an instance of FSMSystem class and add the states to it.
 
    4. Call Reason and Act (or whichever methods you have for firing transitions and making the NPCs
         behave in your game) from your Update or FixedUpdate methods.
 
    Asynchronous transitions from Unity Engine, like OnTriggerEnter, SendMessage, can also be used,
    just call the Method PerformTransition from your FSMSystem instance with the correct Transition
    when the event occurs.
 
 
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/// <summary>
/// FSMSystem class represents the Finite State Machine class.
///  It has a List with the States the NPC has and methods to add,
///  delete a state, and to change the current state the Machine is on.
/// </summary>
var FSMSystem = /** @class */ (function () {
    function FSMSystem(characterCtr) {
        this.characterCtr = characterCtr;
        this.states = new Array();
    }
    Object.defineProperty(FSMSystem.prototype, "CurrentStateID", {
        get: function () { {
            return this.currentStateID;
        } },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSMSystem.prototype, "CurrentState", {
        get: function () { {
            return this.currentState;
        } },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// This method places new states inside the FSM,
    /// or prints an ERROR message if the state was already inside the List.
    /// First state added is also the initial state.
    /// </summary>
    FSMSystem.prototype.AddState = function (s) {
        // Check for Null reference before deleting
        if (s == null) {
            console.error("FSM ERROR: Null reference is not allowed");
        }
        // First State inserted is also the Initial state,
        //   the state the machine is in when the simulation begins
        if (this.states.length == 0) {
            s.SetCtr(this.characterCtr);
            this.states.push(s);
            this.currentState = s;
            this.currentStateID = s.ID;
            this.currentState.DoBeforeEntering();
            return;
        }
        // Add the state to the List if it's not inside it
        for (var index = 0; index < this.states.length; index++) {
            var state = this.states[index];
            if (state.ID == s.ID) {
                console.error("FSM ERROR: Impossible to add state " + s.ID + " because state has already been added");
                return;
            }
        }
        s.SetCtr(this.characterCtr);
        this.states.push(s);
    };
    /// <summary>
    /// This method delete a state from the FSM List if it exists, 
    ///   or prints an ERROR message if the state was not on the List.
    /// </summary>
    FSMSystem.prototype.DeleteState = function (id) {
        // Check for NullState before deleting
        if (id == FsmEnum_1.StateID.NullStateID) {
            console.error("FSM ERROR: NullStateID is not allowed for a real state");
            return;
        }
        // Search the List and delete the state if it's inside it
        for (var index = 0; index < this.states.length; index++) {
            var state = this.states[index];
            if (state.ID == id) {
                this.states.splice(index, 1);
                return;
            }
        }
        console.error("FSM ERROR: Impossible to delete state " + id + ". It was not on the list of states");
    };
    /// <summary>
    /// This method tries to change the state the FSM is in based on
    /// the current state and the transition passed. If current state
    ///  doesn't have a target state for the transition passed, 
    /// an ERROR message is printed.
    /// </summary>
    FSMSystem.prototype.PerformTransition = function (trans) {
        // Check for NullTransition before changing the current state
        if (trans == FsmEnum_1.Transition.NullTransition) {
            console.error("FSM ERROR: NullTransition is not allowed for a real transition");
            return;
        }
        // Check if the currentState has the transition passed as argument
        var id = this.currentState.GetOutputState(trans);
        if (id == FsmEnum_1.StateID.NullStateID) {
            console.error("FSM ERROR: State " + this.currentStateID + " does not have a target state " + " for transition " + trans);
            return;
        }
        // Update the currentStateID and currentState		
        this.currentStateID = id;
        for (var index = 0; index < this.states.length; index++) {
            var state = this.states[index];
            if (state.ID == this.currentStateID) {
                // Do the post processing of the state before setting the new one
                this.currentState.DoBeforeLeaving();
                this.currentState = state;
                // Reset the state to its desired condition before it can reason or act
                this.currentState.DoBeforeEntering();
                break;
            }
        }
    }; // PerformTransition()
    return FSMSystem;
}()); //class FSMSystem
exports.default = FSMSystem;
},{"./FsmEnum":43}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <summary>
/// Place the labels for the Transitions in this enum.
/// Don't change the first label, NullTransition as FSMSystem class uses it.
/// </summary>
var Transition;
(function (Transition) {
    Transition[Transition["NullTransition"] = 0] = "NullTransition";
    Transition[Transition["TRex2Pter"] = 1] = "TRex2Pter";
    Transition[Transition["Pter2TRex"] = 2] = "Pter2TRex";
    Transition[Transition["KingKong2"] = 3] = "KingKong2";
    Transition[Transition["Trex2Kingkong"] = 4] = "Trex2Kingkong";
    Transition[Transition["Kingkong2Trex"] = 5] = "Kingkong2Trex";
})(Transition = exports.Transition || (exports.Transition = {}));
/// <summary>
/// Place the labels for the States in this enum.
/// Don't change the first label, NullTransition as FSMSystem class uses it.
/// </summary>
var StateID;
(function (StateID) {
    StateID[StateID["NullStateID"] = 0] = "NullStateID";
    StateID[StateID["TRex"] = 1] = "TRex";
    StateID[StateID["Pter"] = 2] = "Pter";
    StateID[StateID["KingKong"] = 3] = "KingKong";
})(StateID = exports.StateID || (exports.StateID = {}));
},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FsmEnum_1 = require("./FsmEnum");
/// <summary>
/// This class represents the States in the Finite State System.
/// Each state has a Dictionary with pairs (transition-state) showing
/// which state the FSM should be if a transition is fired while this state
/// is the current state.
/// Method Reason is used to determine which transition should be fired .
/// Method Act has the code to perform the actions the NPC is supposed do if it's on this state.
/// </summary>
var FSMState = /** @class */ (function (_super) {
    __extends(FSMState, _super);
    function FSMState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = new Dictionary();
        return _this;
    }
    Object.defineProperty(FSMState.prototype, "ID", {
        get: function () { {
            return this.stateID;
        } },
        enumerable: true,
        configurable: true
    });
    FSMState.prototype.SetCtr = function (characterCtr) { this.characterCtr = characterCtr; };
    FSMState.prototype.AddTransition = function (trans, id) {
        // Check if anyone of the args is invalid
        if (trans == FsmEnum_1.Transition.NullTransition) {
            console.error("FSMState ERROR: NullTransition is not allowed for a real transition");
            return;
        }
        if (id == FsmEnum_1.StateID.NullStateID) {
            console.error("FSMState ERROR: NullStateID is not allowed for a real ID");
            return;
        }
        // Since this is a Deterministic FSM,
        //   check if the current transition was already inside the map
        if (this.map.ContainsKey(trans)) {
            console.error("FSMState ERROR: State " + this.stateID + " already has transition " + trans + "Impossible to assign to another state");
            return;
        }
        this.map.Add(trans, id);
    };
    /// <summary>
    /// This method deletes a pair transition-state from this state's map.
    /// If the transition was not inside the state's map, an ERROR message is printed.
    /// </summary>
    FSMState.prototype.DeleteTransition = function (trans) {
        // Check for NullTransition
        if (trans == FsmEnum_1.Transition.NullTransition) {
            console.error("FSMState ERROR: NullTransition is not allowed");
            return;
        }
        // Check if the pair is inside the map before deleting
        if (this.map.ContainsKey(trans)) {
            this.map.Remove(trans);
            return;
        }
        console.error("FSMState ERROR: Transition " + trans + " passed to " + this.stateID + " was not on the state's transition list");
    };
    /// <summary>
    /// This method returns the new state the FSM should be if
    ///    this state receives a transition and 
    /// </summary>
    FSMState.prototype.GetOutputState = function (trans) {
        // Check if the map has this transition
        if (this.map.ContainsKey(trans)) {
            return this.map.Get(trans);
        }
        return FsmEnum_1.StateID.NullStateID;
    };
    return FSMState;
}(Laya.Script3D)); // class FSMState
exports.default = FSMState;
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this._obj = {};
    }
    Dictionary.prototype.ContainsKey = function (key) {
        return this._obj[key] != null;
    };
    Dictionary.prototype.Add = function (key, value) {
        this._obj[key] = value;
    };
    Dictionary.prototype.Remove = function (key) {
        delete this._obj[key];
    };
    Dictionary.prototype.Get = function (key) {
        return this._obj[key];
    };
    return Dictionary;
}());
},{"./FsmEnum":43}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneSetting = /** @class */ (function () {
    function SceneSetting() {
    }
    /* 道路最大偏移 */
    SceneSetting.MaxRoadOffset = 3.25;
    /* 难度设置,角色 */
    SceneSetting.Difficulty = 0;
    /* 重生时间 */
    SceneSetting.RespwanTime = 1000;
    return SceneSetting;
}());
exports.SceneSetting = SceneSetting;
/**
 * 摄像机设置
 *
 * @export
 * @class CameraSettings
 */
var CameraSetting = /** @class */ (function () {
    function CameraSetting() {
    }
    /* 地面摄像机视角偏移 */
    CameraSetting.GoundOffset = new Laya.Vector3(0, 20, 10);
    /* 皮肤摄像机视角偏移 */
    CameraSetting.SkinViewOffset = new Laya.Vector3(-4, 5, 4);
    /* 默认视角 */
    CameraSetting.FieldOfView = 60;
    /* 摄像机会以玩家的中心点加上一个前后的偏移作为最终的视角中心*/
    CameraSetting.FrontBackOffset = 0;
    /* 前后偏移归0时的速度 */
    CameraSetting.FrontBackOffsetMoveSpd = 10;
    /* 摄像机左右偏移移动速度 */
    CameraSetting.LeftRightMoveSpd = 100;
    /* 摄像机左右偏移比率 */
    CameraSetting.LeftRightRate = 0.5;
    /* 摄像机抖动频率 */
    CameraSetting.ShakeFrequency = 10;
    /* 摄像机抖动幅度 */
    CameraSetting.ShakeStrength = 0.2;
    /* 摄像机切换物体速度 */
    CameraSetting.ChangeObjTime = 10;
    return CameraSetting;
}());
exports.CameraSetting = CameraSetting;
/**
 * 玩家跳跃高度
 *
 * @export
 * @class CharacterSetting
 */
var CharacterSetting = /** @class */ (function () {
    function CharacterSetting() {
    }
    /* 角色在道路上的正常速度 */
    CharacterSetting.NormalSpeed = 9;
    /* 大大卷最后冲刺速度 */
    CharacterSetting.EndRollerSpeed = 25;
    /* 开始有多少卷 */
    CharacterSetting.StartPiece = 40;
    /* 角色在道路上处于加速状态获得的速率 */
    CharacterSetting.AccelerateSpeed = 0.5;
    return CharacterSetting;
}());
exports.CharacterSetting = CharacterSetting;
var SprialRollerConfigure = /** @class */ (function () {
    function SprialRollerConfigure() {
    }
    /* 小碎片长度 */
    SprialRollerConfigure.PieceLength = 0.25;
    /* 小碎片高度 */
    SprialRollerConfigure.PieceWidth = 1.5;
    /* 小碎片厚度 */
    SprialRollerConfigure.PieceThickness = 0.1;
    /* 螺旋线激活片数 */
    SprialRollerConfigure.ActivePiece = 45;
    /* 失去螺旋卷距离 */
    SprialRollerConfigure.EmptyLoseDis = 0.7;
    /* 终点失去螺旋卷距离 */
    SprialRollerConfigure.EndRollLoseDis = 0.6;
    //#region 下面的是螺旋生成核心参数
    SprialRollerConfigure.SizeOfPiece = 300;
    /* 螺旋卷最大的半径 */
    SprialRollerConfigure.MaxRadius = 8;
    /* 螺旋卷初始相位，一般不用改 */
    SprialRollerConfigure.InitialPhase = 45;
    /* 螺旋卷圈数 */
    SprialRollerConfigure.Cycles = 15;
    return SprialRollerConfigure;
}());
exports.SprialRollerConfigure = SprialRollerConfigure;
},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Enums_1 = require("./Enums");
var Rocker = /** @class */ (function (_super) {
    __extends(Rocker, _super);
    function Rocker() {
        var _this = _super.call(this) || this;
        _this._rocketType = 1; //摇杆类型,1固定，2以每次按下为中心
        _this._rocketShow = 1; //摇杆显示类型,1一直显示2按下时显示抬起时隐藏
        _this._moveRadius = 100;
        _this.m_isClick = false;
        _this.keyList = [];
        _this.keyDown = false;
        return _this;
    }
    Rocker.prototype.onAwake = function () {
        this._ownerSprite = this.owner;
        this._rockerZone = this.owner.parent;
        this._moveSp = this.owner.getChildByName("Btn");
        this._bgSp = this.owner;
        if (this._rocketShow == 2) {
            this._ownerSprite.visible = false;
        }
    };
    Rocker.prototype.onStart = function () {
        this._originPoint = new Laya.Point(this._ownerSprite.x, this._ownerSprite.y);
    };
    Rocker.prototype.onEnable = function () {
        this._rockerZone.on(Laya.Event.MOUSE_DOWN, this, this.onRokerZoneClickDown);
        this._moveSp.on(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp);
        this._moveSp.x = this._bgSp.width / 2;
        this._moveSp.y = this._bgSp.height / 2;
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onkeyup);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onkeydown);
    };
    Rocker.prototype.onDisable = function () {
        this._rockerZone.off(Laya.Event.MOUSE_DOWN, this, this.onRokerZoneClickDown);
        this._moveSp.off(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp);
        this._rockerZone.off(Laya.Event.MOUSE_MOVE, this, this.onMoveSpClickMove);
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.RockerAxis, Value: null });
        this._moveSp.x = this._bgSp.width / 2;
        this._moveSp.y = this._bgSp.height / 2;
    };
    Rocker.prototype.onRokerZoneClickDown = function () {
        if (this._rocketType == 2) {
            var point = this._rockerZone.localToGlobal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
            this._ownerSprite.x = point.x;
            this._ownerSprite.y = point.y;
        }
        this._rockerZone.on(Laya.Event.MOUSE_MOVE, this, this.onMoveSpClickMove);
        this._rockerZone.on(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp);
        this._rockerZone.on(Laya.Event.MOUSE_OUT, this, this.onMoveSpClickUp);
        this.m_isClick = true;
        this._ownerSprite.visible = true;
        // EventMgr.instance.dispatch(EventDef.GameInput);
        // EventMgr.instance.dispatch(EventDef.Game_GuideShow, {result: false});
    };
    Rocker.prototype.onMoveSpClickUp = function () {
        this._rockerZone.off(Laya.Event.MOUSE_MOVE, this, this.onMoveSpClickMove);
        this._rockerZone.off(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp);
        this._rockerZone.off(Laya.Event.MOUSE_OUT, this, this.onMoveSpClickUp);
        var originX = this._bgSp.width / 2;
        var originY = this._bgSp.height / 2;
        Laya.Tween.to(this._moveSp, { x: originX, y: originY }, 100, Laya.Ease.linearNone);
        this._ownerSprite.x = this._originPoint.x;
        this._ownerSprite.y = this._originPoint.y;
        this.m_isClick = false;
        if (this._rocketShow == 2) {
            this._ownerSprite.visible = false;
        }
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.RockerAxis, Value: null });
    };
    Rocker.prototype.onMoveSpClickMove = function () {
        var parentView = this.owner.parent;
        var bgStagePoint = parentView.localToGlobal(new Laya.Point(this._bgSp.x, this._bgSp.y), true);
        var xx = Laya.stage.mouseX - bgStagePoint.x;
        var yy = Laya.stage.mouseY - bgStagePoint.y;
        var obl = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
        var rad = yy < 0 ? Math.acos(xx / obl) : (Math.PI * 2 - Math.acos(xx / obl));
        var angle = 180 / Math.PI * rad;
        if (obl > this._moveRadius) {
            var x = (this._moveRadius * xx) / obl + bgStagePoint.x;
            var y = (this._moveRadius * yy) / obl + bgStagePoint.y;
            var moveSpLocalPoint = this._bgSp.globalToLocal(new Laya.Point(x, y), true);
            this._moveSp.pos(moveSpLocalPoint.x, moveSpLocalPoint.y);
        }
        else {
            var pos = this._bgSp.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY), true);
            this._moveSp.pos(pos.x, pos.y);
        }
    };
    Rocker.prototype.getRockerVlaue = function () {
        var outX = (this._moveSp.x - this._bgSp.width / 2) / this._moveRadius;
        var outY = (this._moveSp.y - this._bgSp.height / 2) / this._moveRadius;
        var dir = new Laya.Point(outX, outY);
        // dir.normalize();
        return dir;
    };
    Rocker.prototype.onUpdate = function () {
        if (this.m_isClick) {
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.RockerAxis, Value: this.getRockerVlaue() });
            // console.log();
            // EventMgr.instance.dispatch(EventDef.Game_MoveInput, this.getRockerVlaue());
        }
        if (this.keyList.length > 0) {
            this.keyDown = true;
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.RockerAxis, Value: new Laya.Point(0, -1) });
        }
        else {
            if (this.keyDown == true) {
                this.keyDown = false;
                EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.RockerAxis, Value: null });
            }
        }
    };
    Rocker.prototype.onkeyup = function (e) {
        for (var i = 0; i < this.keyList.length; i++) {
            if (this.keyList[i] == e.keyCode) {
                this.keyList.splice(i, 1);
                break;
            }
        }
    };
    Rocker.prototype.onkeydown = function (e) {
        if (this.keyList.indexOf(e.keyCode) < 0) {
            this.keyList.push(e.keyCode);
        }
    };
    return Rocker;
}(Laya.Script));
exports.default = Rocker;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"./Enums":38}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var CharacterCtr_1 = require("./Character/CharacterCtr");
var CameraCtr_1 = require("./CameraCtr");
var DestructibleObj_1 = require("./Character/DestructibleObj");
var Enemy_1 = require("./Character/Enemy");
var User_1 = require("../../User/User");
var Camera2UI_1 = require("./Camera2UI");
var Enums_1 = require("./Enums");
var DestructibleObjBuilds_1 = require("./Character/DestructibleObjBuilds");
var SceneMgr_cscj = /** @class */ (function (_super) {
    __extends(SceneMgr_cscj, _super);
    function SceneMgr_cscj() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Scole = 0;
        _this._enemyList = [];
        _this._enemyAllList = [];
        _this._restTimer = 0;
        _this._gamePlaying = false;
        _this._enemyLocList = [];
        _this._enemyCount = 0;
        _this._enemyKillCount = 0;
        _this._gameOver = 0;
        _this._fireEffects = [];
        _this._playerKind = Enums_1.PlayerType.TRex;
        return _this;
    }
    Object.defineProperty(SceneMgr_cscj, "Instance", {
        get: function () { return this._instance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "CurrentScene", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "ReplaceObj", {
        get: function () { return this._replaceObj; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "Player", {
        get: function () { return this._playerCtr; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "RestTimer", {
        get: function () { return Math.floor(this._restTimer); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "EnemyList", {
        get: function () { return this._enemyList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "EnemyLocList", {
        get: function () { return this._enemyLocList; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "EnemCount", {
        get: function () { return this._enemyCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "EnemyKillCount", {
        get: function () { return this._enemyKillCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "GameOver", {
        get: function () { return this._gameOver; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "CameraCtr", {
        get: function () { return this._cameraCtr; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "FireEffects", {
        get: function () { return this._fireEffects; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "CurrLockEnemy", {
        get: function () { return this._currLockEnemy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "CurrLockEnemyPos", {
        get: function () { return this._currLockEnemyPos; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "StateId", {
        get: function () { return this.Player.StateId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneMgr_cscj.prototype, "PlayerKind", {
        get: function () { return this._playerKind; },
        set: function (kind) { this._playerKind = kind; },
        enumerable: true,
        configurable: true
    });
    SceneMgr_cscj.prototype.onAwake = function () {
        console.log("---------------------进入游戏");
        SceneMgr_cscj._instance = this;
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_GameSceneLoadCompelete_csjc);
        this.Camera = this.owner.getChildByName("Main Camera");
        this._cameraCtr = this.Camera.addComponent(CameraCtr_1.default);
        this._restTimer = 150;
        this.InitGameObjects();
    };
    SceneMgr_cscj.prototype.onEnable = function () {
        this.addEvent();
    };
    SceneMgr_cscj.prototype.onDisable = function () {
        this.RemoveEvent();
    };
    SceneMgr_cscj.prototype.addEvent = function () {
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, this, this.Input_csjc);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.EnemyDead, this, this.OnEnemyDead);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.SelectHero, this, this.OnSelectHero);
    };
    SceneMgr_cscj.prototype.RemoveEvent = function () {
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, this, this.Input_csjc);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.EnemyDead, this, this.OnEnemyDead);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.SelectHero, this, this.OnSelectHero);
    };
    SceneMgr_cscj.prototype.OnSelectHero = function () {
        var player = this.owner.getChildByName("Player");
        var boss = this.owner.getChildByName("Boss");
        boss = player.clone();
        this.owner.addChild(boss);
        boss.transform.position = new Laya.Vector3(0, 0, 0);
        boss.name = "boss";
        this._playerCtr = player.addComponent(CharacterCtr_1.default);
        // this._boss = boss.addComponent(BossRobot);
        this._playerLoc = this.owner.getChildByName("PlayerLoc");
        if (User_1.default.getLeveNum_csjc() > 1) {
            var index = Math.floor(Math.random() * this._playerLoc.numChildren);
            var loc = this._playerLoc.getChildAt(index);
            this._playerCtr.FollowObj.transform.worldMatrix = loc.transform.worldMatrix.clone();
        }
    };
    SceneMgr_cscj.prototype.OnEnemyDead = function () {
        this._enemyKillCount++;
        if (this._enemyKillCount >= this._enemyCount) {
        }
    };
    SceneMgr_cscj.prototype.PauseGame = function () {
        this._gamePlaying = false;
    };
    SceneMgr_cscj.prototype.StartGame = function () {
        this._gamePlaying = true;
    };
    SceneMgr_cscj.prototype.onUpdate = function () {
        if (this._gameOver != 0 || !this._gamePlaying)
            return;
        this._restTimer -= Math.min(50, Laya.timer.delta) / 1000;
        if (this._restTimer <= 0) {
            this._restTimer = 0;
            this._gameOver = -1;
        }
        this.CaEnemyLoc();
    };
    SceneMgr_cscj.prototype.CaEnemyLoc = function () {
        this._enemyLocList = [];
        var cent = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
        var closeDis = -1;
        this._currLockEnemyPos = null;
        this._currLockEnemy = null;
        for (var index = 0; index < this.EnemyList.length; index++) {
            var enemy = this.EnemyList[index];
            if (enemy.Alive) {
                var pos = enemy.Sprite3D.transform.position.clone();
                pos.y += 2;
                pos = Camera2UI_1.default.WorldToScreen2(this.Camera, pos);
                var inRange = (pos.x > Laya.stage.width * 0.25) && (pos.x < Laya.stage.width * 0.75); /* &&
                (pos.y > cent.y * 0.25) && (pos.y < cent.y * 0.75) */
                if (pos.z <= 0 && inRange) {
                    var dis_1 = Math.pow((pos.x - cent.x), 2) + Math.pow((pos.y - cent.y), 2);
                    if (closeDis == -1 || closeDis > dis_1) {
                        closeDis = dis_1;
                        this._currLockEnemyPos = pos;
                        this._currLockEnemy = enemy.Sprite3D;
                    }
                }
                var dis = Laya.Vector3.distance(this._playerCtr.FollowObj.transform.position, enemy.Sprite3D.transform.position);
                this._enemyLocList.push({ Postion: pos, Distance: dis });
            }
        }
    };
    /**
     * 玩家输入
     *
     * @param {Laya.Point} point
     * @memberof ryw_SceneManager
     */
    SceneMgr_cscj.prototype.Input_csjc = function (point) {
        // if (this._gameOver || this.Provoking) {
        //     return;
        // }
        if (point == null) {
            console.log("停止输入");
            // this._player.Input(point);
            // this._playerCtr.PlayerIdle();
        }
        else {
            // this._playerCtr.PlayerMove(point);
            // console.log(`输入值${point}`);
        }
        this._playerCtr.Input(point);
    };
    SceneMgr_cscj.prototype.InitGameObjects = function () {
        var boundary = this.owner.getChildByName("Boundary");
        for (var index = 0; index < boundary.numChildren; index++) {
            var ground = boundary.getChildAt(index).getComponent(Laya.PhysicsComponent);
            if (ground) {
                this.SetGround(ground);
            }
        }
        var buildings = this.owner.getChildByName("Buildings");
        for (var index = 0; index < buildings.numChildren; index++) {
            var buildCol = buildings.getChildAt(index).getComponent(Laya.PhysicsComponent);
            if (buildCol) {
                this.SetClimb(buildCol);
            }
        }
        var roadObj = this.owner.getChildByName("RoadObj");
        for (var index = 0; index < roadObj.numChildren; index++) {
            var obj = roadObj.getChildAt(index);
            if (obj.getComponent(Laya.PhysicsComponent) != null) {
                obj.addComponent(DestructibleObj_1.default);
            }
        }
        roadObj = this.owner.getChildByName("Buildings");
        for (var index = 0; index < roadObj.numChildren; index++) {
            var obj = roadObj.getChildAt(index);
            if (obj.getComponent(Laya.PhysicsComponent) != null) {
                obj.addComponent(DestructibleObjBuilds_1.default);
            }
        }
        this._replaceObj = this.owner.getChildByName("ReplaceObj");
        var freeObj = this.owner.getChildByName("FreeObj");
        for (var index = 0; index < freeObj.numChildren; index++) {
            var objCol = freeObj.getChildAt(index).getComponent(Laya.PhysicsComponent);
            if (objCol) {
                objCol.collisionGroup = Enums_1.CollisionGroup.Obstacle;
                objCol.canCollideWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Character | Enums_1.CollisionGroup.Ground | Enums_1.CollisionGroup.Obstacle;
            }
        }
        this.CreatEnemy();
    };
    SceneMgr_cscj.prototype.CreatEnemy = function () {
        this._enemyPrefab = this.owner.getChildByName("Enemys").getChildAt(0);
        var enemyAll = this.owner.getChildByName("EnemyAllList");
        var enemyEx = this.owner.getChildByName("EnemyExList");
        this._enemyCount = 1;
        if (User_1.default.getLeveNum_csjc() == 1) {
            if (Math.random() > 0.5) {
                this._enemyCount = 2;
            }
        }
        else if (User_1.default.getLeveNum_csjc() > 1 && User_1.default.getLeveNum_csjc() < 3) {
            this._enemyCount = 3 + Math.floor(Math.random() * 3);
        }
        else {
            this._enemyCount = 4 + Math.floor(Math.random() * 3);
        }
        while (this._enemyList.length < this._enemyCount) {
            var enemyFake = enemyAll.getChildAt(Math.floor(Math.random() * enemyAll.numChildren));
            var eSp = Laya.Sprite3D.instantiate(this._enemyPrefab, this._enemyPrefab.parent);
            eSp.transform.worldMatrix = enemyFake.transform.worldMatrix;
            var e = eSp.addComponent(Enemy_1.default);
            this._enemyList.push(e);
        }
        var rd = Math.floor(Math.random() * 1) + 1;
        while (this._enemyList.length < this._enemyCount + rd) {
            var enemyFake = enemyEx.getChildAt(Math.floor(Math.random() * enemyEx.numChildren));
            var eSp = Laya.Sprite3D.instantiate(this._enemyPrefab, this._enemyPrefab.parent);
            eSp.transform.worldMatrix = enemyFake.transform.worldMatrix;
            var e = eSp.addComponent(Enemy_1.default);
            this._enemyList.push(e);
        }
        this._restTimer = 60 + (this._enemyList.length) * 30;
        this._enemyPrefab.removeSelf();
        this._enemyPrefab.destroy();
    };
    SceneMgr_cscj.prototype.SetGround = function (ground) {
        ground.collisionGroup = Enums_1.CollisionGroup.Obstacle;
        ground.canCollideWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Character | Enums_1.CollisionGroup.Obstacle;
    };
    SceneMgr_cscj.prototype.SetClimb = function (buliding) {
        buliding.collisionGroup = Enums_1.CollisionGroup.Ground;
        buliding.canCollideWith = Enums_1.CollisionGroup.None | Enums_1.CollisionGroup.Character | Enums_1.CollisionGroup.Obstacle;
    };
    return SceneMgr_cscj;
}(Laya.Script3D));
exports.default = SceneMgr_cscj;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../../User/User":64,"./Camera2UI":31,"./CameraCtr":32,"./Character/CharacterCtr":33,"./Character/DestructibleObj":34,"./Character/DestructibleObjBuilds":35,"./Character/Enemy":36,"./Enums":38}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../Mgr/ViewMgr");
var User_1 = require("../User/User");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var WXAPI_1 = require("../PlatformApi/WXAPI");
var SceneMgr_1 = require("./GameCore/SceneMgr");
var SoundMgr_1 = require("../Mgr/SoundMgr");
var TmAPI_1 = require("../TmAPI/TmAPI");
//游戏管理器，游戏代码的入口
var GameMgr_csjc = /** @class */ (function (_super) {
    __extends(GameMgr_csjc, _super);
    function GameMgr_csjc() {
        var _this = _super.call(this) || this;
        _this.FirstAd = false;
        //#region 自己的代码
        /* 当前场景的引用 */
        _this.GameLose = 0;
        GameMgr_csjc._instance = _this;
        return _this;
    }
    GameMgr_csjc.getInstance = function () { return GameMgr_csjc._instance; };
    GameMgr_csjc.prototype.onAwake = function () {
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default.SetShareMenu_csjc("", "", function () {
            }, function () {
            }, function () {
            });
            Laya.Browser.window['wx'].onShow(function (res) {
                console.log("\u7A0B\u5E8F\u8FD4\u56DE,\u53C2\u6570\u4E3A" + res + ",\u573A\u666F\u503C" + res.scene);
                if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView) != null
                    || ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.InGameView) != null
                // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartClick1) != null
                // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartClick2) != null
                // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SignInView) != null
                // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.GetSkinView) != null
                // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartView) != null
                ) {
                    SoundMgr_1.default.instance_csjc.playBGM_csjc("Bgm2");
                }
                /* let abtest = TmAbTestMgr_csjc.Instance_csjc.GetABTestByGroupId_csjc(88);
                if (abtest.groupId == 100172) { */
                /* let sceneGood = res.scene == 1037 || res.scene == 1038 || res.scene == 1089;
                let viewGood = ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.InGameView) == null
                    && ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartClick) == null;
                console.log(`分享失败打开导出,场景值:${res.scene}`);
                if (sceneGood && viewGood) {
                    if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.Export2AdView) == null) {
                        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export2AdView);
                    }
                } */
                /* } */
            });
        }
        // WudianMgr.UpdateIpBlockState();
        Laya.SoundManager.useAudioMusic = false;
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdFail_csjc, this, this.ADShareFail);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdSuccess_csjc, this, this.ShareAdSuccess);
    };
    GameMgr_csjc.prototype.onStart = function () {
        this.preCreateGame_csjc();
    };
    GameMgr_csjc.prototype.preCreateGame_csjc = function () {
        //todo：这里添加初始化主场景的代码。EventMgr.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        EventMgr_1.default.regOnceEvent_csjc(EventDef_1.EventDef_csjc.Game_GameSceneLoadCompelete_csjc, this, function () {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView);
            // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport1AdView);
            // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView, { ShowSkin: false });
            // if (ExamineMgr.CanShowAd_Wx) {
            //     ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export2AdView);
            // }
        });
        this.CreatGameScene();
        this.CreatOpenContext();
    };
    Object.defineProperty(GameMgr_csjc.prototype, "CurrentScene", {
        get: function () {
            return this._currentScene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr_csjc.prototype, "CurrentLevel", {
        /* 当前等级 */
        get: function () {
            return User_1.default.getLeveNum_csjc();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载下一关游戏场景
     *
     * @memberof GameManager
     */
    GameMgr_csjc.prototype.CreatNextGameScene = function () {
        var lev = User_1.default.getLeveNum_csjc();
        lev++;
        User_1.default.setLeveNum_csjc(lev);
        User_1.default.SaveGameData_csjc();
        this.CreatGameScene();
    };
    /**
     * 加载游戏场景
     *
     * @memberof GameManager
     */
    GameMgr_csjc.prototype.CreatGameScene = function () {
        if (this._currentScene) {
            var directionLight = this._currentScene.getChildByName("Directional Light");
            directionLight.shadow = false;
            this._currentScene.removeSelf();
            this._currentScene.destroy();
        }
        var url = "";
        var tureLev = "1";
        url = "subRes/LayaScene_1/Conventional/" + tureLev + ".ls";
        /* let abtest = TmAbTestMgr_csjc.Instance_csjc.GetABTestByGroupId_csjc(86); */
        // /* if (abtest.groupId == 100166)  */{
        //     console.log("赛道加长");
        //     if (tureLev <= 4) {
        //         url = "subRes/LayaScene_Main/Conventional/" + tureLev + "-1.ls";
        //     }
        //     else {
        //         url = "subRes/LayaScene_Main/Conventional/" + tureLev + ".ls";
        //     }
        // }
        /* else {
            console.log("赛道不加长");
        } */
        Laya.Scene3D.load(url, Laya.Handler.create(this, this.LoadComplete));
    };
    /**
     * 加载完成之后需要执行的方法，包括了
     * 1：初始化赛道
     * 2：初始化玩家控制脚本
     *
     * @param {Laya.Scene3D} scene
     * @memberof GameManager
     */
    GameMgr_csjc.prototype.LoadComplete = function (scene) {
        this._currentScene = scene;
        Laya.stage.addChildAt(this._currentScene, 0);
        this._currentScene.addComponent(SceneMgr_1.default);
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnLevelStart_csjc);
    };
    //#endregion
    GameMgr_csjc.prototype.ADShareFail = function () {
        console.log("AdShareFail");
        /* let abtest = TmAbTestMgr_csjc.Instance_csjc.GetABTestByGroupId_csjc(83);
            console.log("分享失败打开导出");
            if (ExamineMgr.CanShowAd_Wx &&
                ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.Export2AdView) == null &&
                ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.Export1AdView) == null
            ) {
                ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export2AdView);
            }
        /* else {
            console.log("分享失败不打开导出");
        } */
    };
    GameMgr_csjc.prototype.CreatOpenContext = function () {
        this._my_open = new Laya.WXOpenDataViewer();
        this._my_open.width = Laya.stage.width;
        this._my_open.height = Laya.stage.height;
    };
    Object.defineProperty(GameMgr_csjc.prototype, "Context", {
        get: function () {
            return this._my_open;
        },
        enumerable: true,
        configurable: true
    });
    GameMgr_csjc.prototype.ShareAdSuccess = function (style) {
        //首页导出
        if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView)) {
            TmAPI_1.default.SendEvent("ExportAd", { View: 1, Style: style });
        }
        //游戏页导出
        else if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.InGameView)) {
            TmAPI_1.default.SendEvent("ExportAd", { View: 2, Style: style });
        }
        else if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.HExport1AdView)) {
            TmAPI_1.default.SendEvent("ExportAd", { View: 3, Style: style });
        }
        else if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.GameOverWinView) ||
            ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.GameOverFailView)) {
            TmAPI_1.default.SendEvent("ExportAd", { View: 4, Style: style });
        }
        else if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.FriendExportView)) {
            TmAPI_1.default.SendEvent("ExportAd", { View: 5, Style: style });
        }
        else if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.HExport2AdView)) {
            TmAPI_1.default.SendEvent("ExportAd", { View: 6, Style: style });
        }
    };
    GameMgr_csjc._instance = null;
    return GameMgr_csjc;
}(Laya.Script));
exports.default = GameMgr_csjc;
},{"../Event/EventDef":5,"../Event/EventMgr":6,"../Mgr/SoundMgr":10,"../Mgr/ViewMgr":12,"../PlatformApi/WXAPI":20,"../TmAPI/TmAPI":62,"../User/User":64,"./GameCore/SceneMgr":47}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Enums_1 = require("../GameCore/Enums");
var SceneMgr_1 = require("../GameCore/SceneMgr");
var BtnPanel = /** @class */ (function (_super) {
    __extends(BtnPanel, _super);
    function BtnPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private _attackBtn: Laya.UIComponent;
        // private _jumpBtn: Laya.UIComponent;
        //翼龙ui
        // private _pterPanel: Laya.UIComponent;
        // private _frontBtn: Laya.UIComponent;
        // private _backBtn: Laya.UIComponent;
        // private _upBtn: Laya.UIComponent;
        // private _leftBtn: Laya.UIComponent;
        // private _rightBtn: Laya.UIComponent;
        // private _downBtn: Laya.UIComponent;
        // private _fireBallBtn: Laya.UIComponent;
        // private _CTransBtn: Laya.UIComponent;
        _this._left = false;
        _this._right = false;
        _this._front = false;
        _this._back = false;
        _this._up = false;
        _this._down = false;
        _this._fire = false;
        return _this;
    }
    BtnPanel.prototype.onAwake = function () {
        this._tRexPanle = this.owner.getChildByName("TRexPanel");
        this._RTransBtn = this._tRexPanle.getChildByName("TransBtn");
        this._attackBtn = this._tRexPanle.getChildByName("AttackBtn");
        this._jumpBtn = this._tRexPanle.getChildByName("JumpBtn");
        this._fireBtn = this._tRexPanle.getChildByName("FireBtn");
        //金刚战斗ui
        this._kingKongPanle = this.owner.getChildByName("KingkongPanel");
        this._kingKongAtkBtn = this._kingKongPanle.getChildByName("AttackBtn");
        this._kingKongJumpBtn = this._kingKongPanle.getChildByName("JumpBtn");
        this._kingKongFireBtnBtn = this._kingKongPanle.getChildByName("FireBtn");
        // this._jumpBtn = this._tRexPanle.getChildByName("JumpBtn") as Laya.UIComponent;
        // this._fireBtn = this._tRexPanle.getChildByName("FireBtn") as Laya.UIComponent;
        // //翼龙战斗ui
        // this._pterPanel = this.owner.getChildByName("PterPanel") as Laya.UIComponent;
        // this._frontBtn = this._pterPanel.getChildByName("FrontBtn") as Laya.UIComponent;
        // this._backBtn = this._pterPanel.getChildByName("BackBtn") as Laya.UIComponent;
        // this._rightBtn = this._pterPanel.getChildByName("RightBtn") as Laya.UIComponent;
        // this._leftBtn = this._pterPanel.getChildByName("LeftBtn") as Laya.UIComponent;
        // this._upBtn = this._pterPanel.getChildByName("UpBtn") as Laya.UIComponent;
        // this._downBtn = this._pterPanel.getChildByName("DownBtn") as Laya.UIComponent;
        // this._CTransBtn = this._pterPanel.getChildByName("TransBtn") as Laya.UIComponent;
        // this._fireBallBtn = this._pterPanel.getChildByName("FireBallBtn") as Laya.UIComponent;
        this.TransformPanle(false);
    };
    BtnPanel.prototype.onEnable = function () {
        this.addEvent();
    };
    BtnPanel.prototype.onDisable = function () {
        this.removeEvent();
    };
    BtnPanel.prototype.onUpdate = function () {
        // if (this._pterPanel.visible) {
        //     let point = new Laya.Point(0, 0);
        //     if (this._left) {
        //         point.x = 1;
        //     }
        //     else if (this._right) {
        //         point.x = -1;
        //     }
        //     else {
        //         point.x = 0;
        //     }
        //     if (this._front) {
        //         point.y = 1;
        //     }
        //     else if (this._back) {
        //         point.y = -1;
        //     }
        //     else {
        //         point.y = 0;
        //     }
        //     if (point.x == 0 && point.y == 0) {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null })
        //     }
        //     else {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: point })
        //     }
        //     if (this._up) {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.UP })
        //     }
        //     else if (this._down) {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.Down })
        //     }
        // }
        // else 
        if (this._tRexPanle.visible) {
            if (this._fire) {
                EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.Fire });
            }
        }
        else if (this._kingKongPanle.visible) {
        }
    };
    BtnPanel.prototype.addEvent = function () {
        this._RTransBtn.on(Laya.Event.CLICK, this, this.OnTransBtn);
        this._attackBtn.on(Laya.Event.CLICK, this, this.OnAttackBtn);
        this._jumpBtn.on(Laya.Event.CLICK, this, this.OnJumpBtn);
        this._fireBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnFireBtn, [true]);
        this._fireBtn.on(Laya.Event.MOUSE_UP, this, this.OnFireBtn, [false]);
        this._kingKongAtkBtn.on(Laya.Event.CLICK, this, this.OnAttackBtn);
        this._kingKongJumpBtn.on(Laya.Event.CLICK, this, this.OnJumpBtn);
        this._kingKongFireBtnBtn.on(Laya.Event.CLICK, this, this.OnThrowStoneBtn);
        // this._CTransBtn.on(Laya.Event.CLICK, this, this.OnTransBtn)
        // this._frontBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnFront, [true]);
        // this._frontBtn.on(Laya.Event.MOUSE_UP, this, this.OnFront, [false]);
        // this._backBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnBack, [true]);
        // this._backBtn.on(Laya.Event.MOUSE_UP, this, this.OnBack, [false]);
        // this._leftBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnLeft, [true]);
        // this._leftBtn.on(Laya.Event.MOUSE_UP, this, this.OnLeft, [false]);
        // this._rightBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnRight, [true]);
        // this._rightBtn.on(Laya.Event.MOUSE_UP, this, this.OnRight, [false]);
        // this._upBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnUp, [true]);
        // this._upBtn.on(Laya.Event.MOUSE_UP, this, this.OnUp, [false]);
        // this._downBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnDown, [true]);
        // this._downBtn.on(Laya.Event.MOUSE_UP, this, this.OnDown, [false]);
        // this._fireBallBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnFireBallBtn);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.TransformEvent, this, this.TransformPanle);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.CharacterFalling, this, this.Falling);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.CharacterClimbing, this, this.Climbing);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.CharacterNormal, this, this.Normal);
    };
    BtnPanel.prototype.removeEvent = function () {
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.TransformEvent, this, this.TransformPanle);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.CharacterFalling, this, this.Falling);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.CharacterClimbing, this, this.Climbing);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.CharacterNormal, this, this.Normal);
    };
    BtnPanel.prototype.TransformPanle = function (isCar) {
        this._tRexPanle.visible = SceneMgr_1.default.Instance.PlayerKind == Enums_1.PlayerType.TRex;
        this._kingKongPanle.visible = SceneMgr_1.default.Instance.PlayerKind == Enums_1.PlayerType.Kingkong;
        // this.Normal();
        // if (SceneMgr_cscj.Instance.PlayerKind == PlayerType.TRex) {
        //     // this._pterPanel.visible = true;
        //     this._tRexPanle.visible = false;
        // }
        // else {
        //     // this._pterPanel.visible = false;
        //     this._tRexPanle.visible = true;
        // }
        // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null })
    };
    BtnPanel.prototype.OnTransBtn = function () {
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.Transform });
    };
    BtnPanel.prototype.OnAttackBtn = function () {
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.Attack });
    };
    BtnPanel.prototype.OnJumpBtn = function () {
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.Jump });
    };
    BtnPanel.prototype.OnThrowStoneBtn = function () {
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.ThrowStone });
    };
    BtnPanel.prototype.OnFireBtn = function (isDown) {
        this._fire = isDown;
    };
    BtnPanel.prototype.OnFireBallBtn = function (isDown) {
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_Input_csjc, { InputType: Enums_1.InputType.FireBall });
    };
    BtnPanel.prototype.OnFront = function (isDown) {
        this._front = isDown;
        if (isDown) {
            this._back = false;
        }
    };
    BtnPanel.prototype.OnBack = function (isDown) {
        this._back = isDown;
        if (isDown) {
            this._front = false;
        }
    };
    BtnPanel.prototype.OnLeft = function (isDown) {
        this._left = isDown;
        if (isDown) {
            this._right = false;
        }
    };
    BtnPanel.prototype.OnRight = function (isDown) {
        this._right = isDown;
        if (isDown) {
            this._left = false;
        }
    };
    BtnPanel.prototype.OnUp = function (isDown) {
        this._up = isDown;
        if (isDown) {
            this._down = false;
        }
    };
    BtnPanel.prototype.OnDown = function (isDown) {
        this._down = isDown;
        if (isDown) {
            this._up = false;
        }
    };
    BtnPanel.prototype.Falling = function () {
        if (!this._attackBtn.gray)
            this._attackBtn.gray = true;
        if (!this._RTransBtn.gray)
            this._RTransBtn.gray = true;
        if (!this._jumpBtn.gray)
            this._jumpBtn.gray = true;
        if (!this._fireBtn.gray)
            this._fireBtn.gray = true;
    };
    BtnPanel.prototype.Climbing = function () {
        if (!this._attackBtn.gray)
            this._attackBtn.gray = true;
        if (!this._RTransBtn.gray)
            this._RTransBtn.gray = true;
        if (!this._fireBtn.gray)
            this._fireBtn.gray = true;
        if (this._jumpBtn.gray)
            this._jumpBtn.gray = false;
    };
    BtnPanel.prototype.Normal = function () {
        if (this._attackBtn.gray)
            this._attackBtn.gray = false;
        if (this._RTransBtn.gray)
            this._RTransBtn.gray = false;
        if (this._jumpBtn.gray)
            this._jumpBtn.gray = false;
        if (this._fireBtn.gray)
            this._fireBtn.gray = false;
    };
    return BtnPanel;
}(Laya.Script));
exports.default = BtnPanel;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../GameCore/Enums":38,"../GameCore/SceneMgr":47}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var User_1 = require("../../User/User");
var CoinSubView = /** @class */ (function (_super) {
    __extends(CoinSubView, _super);
    function CoinSubView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._coinGetList = [];
        _this._effectCount = 0;
        _this._effectTimer = -1;
        _this._goldList = [];
        return _this;
    }
    CoinSubView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._coin_Sp = this.owner.getChildByName("CoinSp");
        this._coinCount_FontClip = this.owner.getChildByName("CoinCount_FontClip");
        this._coinCount_FontClip.value = User_1.default.getMoney_csjc().toString();
        this._originalScale = this._coinCount_FontClip.scaleX;
    };
    CoinSubView.prototype.onStart = function () {
        this.InitGetCointList();
    };
    CoinSubView.prototype.InitGetCointList = function () {
        var _this = this;
        var _loop_1 = function (index) {
            var sp = new Laya.Sprite();
            sp.loadImage("subRes/image/coin.png", Laya.Handler.create(this_1, function () {
                Laya.stage.addChild(sp);
                _this._coinGetList.push(sp);
                sp.visible = false;
                sp.x = 0;
                sp.y = 0;
            }));
        };
        var this_1 = this;
        for (var index = 0; index < 10; index++) {
            _loop_1(index);
        }
        for (var i = 0; i < 4; i++) {
            var text = new Laya.Text();
            text.text = "1000";
            text.width = 120;
            text.height = 40;
            text.pivotX = 60;
            text.pivotY = 20;
            text.align = "center";
            text.valign = "middle";
            text.font = "Microsoft YaHei";
            text.fontSize = 30;
            text.bold = true;
            text.color = "#FFFFFF";
            text.strokeColor = "#000000";
            text.stroke = 4;
            text.visible = false;
            this._ownerSp.addChild(text);
            this._goldList.push(text);
        }
    };
    CoinSubView.prototype.onEnable = function () {
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.Game_OnUserMoneyChange_csjc, this, this.CoinChange);
        // EventMgr_csjc.regEvent_csjc(EventDef_csjc.Game_OnUserMoneyChange_csjc, this, this.GetJumpDistance);
    };
    CoinSubView.prototype.onDestroy = function () {
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.Game_OnUserMoneyChange_csjc, this, this.CoinChange);
        // EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_GetJumpDistance, this, this.GetJumpDistance);
    };
    CoinSubView.prototype.onUpdate = function () {
        if (this._effectTimer >= 0) {
            this._effectTimer += Laya.timer.delta / 1000;
            var angel = this._effectTimer * 1440;
            var rad = angel * Math.PI / 180;
            var scare = this._originalScale + 0.05 * (Math.sin(rad));
            this._coinCount_FontClip.scaleX = scare;
            this._coinCount_FontClip.scaleY = scare;
            var curcoin = parseInt(this._coinCount_FontClip.value);
            var countRemain = User_1.default.getMoney_csjc() - curcoin;
            var timeRemain = ((360 - angel) / 360) * 1000;
            timeRemain = (countRemain / timeRemain) * Laya.timer.delta;
            this._coinCount_FontClip.value = (curcoin + Math.floor(timeRemain)).toString();
            if (angel > 360) {
                this._effectTimer = -1;
                this._coinCount_FontClip.value = User_1.default.getMoney_csjc().toString();
            }
        }
    };
    CoinSubView.prototype.CoinChange = function (res) {
        if (res == null)
            return;
        if (res.curr > res.last) {
            if (res.getLoc) {
                var count = res.curr - res.last;
                if (count <= 25) {
                    this._effectCount = 1;
                }
                else if (count <= 50) {
                    this._effectCount = 3;
                }
                else if (count <= 200) {
                    this._effectCount = 5;
                }
                else if (count <= 400) {
                    this._effectCount = 7;
                }
                else {
                    this._effectCount = 10;
                }
                this._getLoc = res.getLoc;
                this.GetCoinStep1(count);
                // this.GetGoldCount(count);
                // Laya.timer.once(500, this, this.GetCoinStep2);
            }
            else {
                this._effectTimer = 0;
            }
        }
        else if (res.curr < res.last) {
            SoundMgr_1.default.instance_csjc.playSound_csjc("gold2");
            this._effectTimer = 0;
        }
    };
    // GetJumpDistance(point: Laya.Point, distance: number) {
    //     if (this._goldList.length <= 0) return;
    //     const goldText = this._goldList.pop();
    //     point = this._ownerSp.globalToLocal(point, true);
    //     goldText.x = point.x;
    //     goldText.y = point.y;
    //     goldText.fontSize = 50;
    //     goldText.bold = true;
    //     goldText.color = "#FFFFFF";
    //     goldText.strokeColor = "#000000";
    //     goldText.stroke = 4;
    //     goldText.text = "飞行距离:" + distance.toFixed(0);
    //     goldText.visible = true;
    //     Laya.timer.once(1000, this, () => {
    //         goldText.visible = false;
    //         this._goldList.push(goldText);
    //     });
    // }
    CoinSubView.prototype.GetGoldCount = function (count) {
        var _this = this;
        if (this._goldList.length <= 0)
            return;
        var goldText = this._goldList.pop();
        // console.log(sceenPos);
        var point = this._ownerSp.globalToLocal(this._getLoc, true);
        goldText.x = point.x;
        goldText.y = point.y;
        goldText.fontSize = 40;
        goldText.bold = true;
        goldText.color = "#FFFFFF";
        goldText.strokeColor = "#000000";
        goldText.stroke = 4;
        goldText.text = "获得金币" + count /*  + count */;
        goldText.visible = true;
        // Laya.Tween.to(goldText, { x: 0, y: 0 }, 500, null, Laya.Handler.create(this, () => {
        //     goldText.visible = false;
        // }), 300);
        Laya.timer.once(500, this, function () {
            goldText.visible = false;
            _this._goldList.push(goldText);
        });
    };
    CoinSubView.prototype.GetCoinStep1 = function (count) {
        var _this = this;
        var point = this._ownerSp.globalToLocal(this._getLoc, true);
        var _loop_2 = function (index) {
            if (this_2._coinGetList.length <= 0) {
                return "break";
            }
            var sp = this_2._coinGetList.pop();
            sp.x = point.x;
            sp.y = point.y;
            sp.visible = true;
            sp.zOrder = sp.parent.numChildren - 1;
            /* if (count > 50) */ {
                var rdx = point.x + (Math.random() * 300) - 150;
                var rdy = point.y + (Math.random() * 300) - 150;
                var coinPoint = this_2._ownerSp.localToGlobal(new Laya.Point(this_2._coin_Sp.x, this_2._coin_Sp.y));
                Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, function () {
                    SoundMgr_1.default.instance_csjc.playSound_csjc("gold2");
                    _this._effectTimer = 0;
                    sp.visible = false;
                    _this._coinGetList.push(sp);
                }), 200 + (50 * index));
                // Laya.Tween.to(sp, { x: rdx, y: rdy }, 200, null, Laya.Handler.create(this, () => {
                //     let coinPoint = this._ownerSp.localToGlobal(new Laya.Point(this._coin_Sp.x, this._coin_Sp.y));
                //     Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, () => {
                //         SoundMgr_csjc.instance_csjc.playSound_csjc("gold2");
                //         this._effectTimer = 0;
                //         sp.visible = false;
                //         this._coinGetList.push(sp);
                //     }), 200 + (50 * index));
                // }));
            }
            // else {
            //     let point = this._ownerSp.globalToLocal(this._getLoc);
            //     let coinPoint = /* this._ownerSp.globalToLocal( */new Laya.Point(this._coin_Sp.x, this._coin_Sp.y);
            //     Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, () => {
            //         SoundMgr.instance.playSound("gold");
            //         this._effectTimer = 0;
            //         sp.visible = false;
            //         this._coinGetList.push(sp);
            //     }), 500);
            // }
        };
        var this_2 = this;
        for (var index = 0; index < this._effectCount; index++) {
            var state_1 = _loop_2(index);
            if (state_1 === "break")
                break;
        }
    };
    CoinSubView.prototype.GetCoinStep2 = function (sp) {
        var _this = this;
        var point = this._ownerSp.globalToLocal(this._getLoc);
        var coinPoint = /* this._ownerSp.globalToLocal( */ new Laya.Point(this._coin_Sp.x, this._coin_Sp.y);
        var _loop_3 = function (index) {
            var sp_1 = this_3._coinGetList[index];
            // let rdx = point.x + Math.random() * 100;
            // let rdy = point.y + Math.random() * 100;
            Laya.Tween.to(sp_1, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp_1, function () {
                SoundMgr_1.default.instance_csjc.playSound_csjc("gold2");
                _this._effectTimer = 0;
                sp_1.visible = false;
                _this._coinGetList.push(sp_1);
            }), 50 * index);
        };
        var this_3 = this;
        for (var index = 0; index < this._effectCount; index++) {
            _loop_3(index);
        }
    };
    return CoinSubView;
}(Laya.Script));
exports.default = CoinSubView;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../../Mgr/SoundMgr":10,"../../User/User":64}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super.call(this) || this;
    }
    /**
     * 鼠标按下时
     *
     * @memberof Controller
     */
    Controller.prototype.onMouseDown = function () {
        this._isMouseDown = true;
        this._lastX = null;
        this._lastY = null;
    };
    /**
     * 当鼠标移出时
     *
     * @memberof Controller
     */
    Controller.prototype.onMouseOut = function () {
        this._isMouseDown = false;
        this._lastX = null;
        this._lastY = null;
    };
    /**
     * 鼠标抬起
     *
     * @memberof Controller
     */
    Controller.prototype.onMouseUp = function () {
        this._isMouseDown = false;
        this._lastX = null;
        this._lastY = null;
    };
    /**
     * 鼠标移动
     *
     * @memberof Controller
     */
    Controller.prototype.onMouseMove = function () {
        if (this._isMouseDown) {
            if (this._lastX == null) {
                this._lastX = Laya.stage.mouseX;
            }
            else {
                var x = Laya.stage.mouseX - this._lastX;
                // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.CameraAxis, Value: new Laya.Point(x, y) });
                EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Camera_Event_csjc, { CameraRotateY: -x * 0.3 });
                this._lastX = Laya.stage.mouseX;
            }
            if (this._lastY == null) {
                this._lastY = Laya.stage.mouseY;
            }
            else {
                var y = Laya.stage.mouseY - this._lastY;
                // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.CameraAxis, Value: new Laya.Point(x, y) });
                EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Camera_Event_csjc, { CameraRotateX: y * 0.3 });
                this._lastY = Laya.stage.mouseY;
            }
        }
    };
    return Controller;
}(Laya.Script));
exports.default = Controller;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var ExamineCheck = /** @class */ (function (_super) {
    __extends(ExamineCheck, _super);
    function ExamineCheck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExamineCheck.prototype.onAwake = function () {
        this._owner = this.owner;
    };
    ExamineCheck.prototype.onStart = function () {
        if (!ExamineMgr_1.default.CanDoScz_Wx) {
            this._owner.visible = false;
        }
    };
    return ExamineCheck;
}(Laya.Script));
exports.default = ExamineCheck;
},{"../../CommomAPI/ExamineMgr":2}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneMgr_1 = require("../GameCore/SceneMgr");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var FsmEnum_1 = require("../GameCore/Fsm/FsmEnum");
var GameStep = /** @class */ (function (_super) {
    __extends(GameStep, _super);
    function GameStep() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._enemyList = [];
        _this._testList = [];
        return _this;
    }
    GameStep.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._gameTimer = this.owner.getChildByName("GameTimer");
        this._enemyDead = this.owner.getChildByName("EnemyDead");
        this._enemyCount = this.owner.getChildByName("EnemyCount");
        this._lock = this.owner.getChildByName("Lock");
        this._enemyDead.visible = false;
        this.InitGetCointList();
    };
    GameStep.prototype.onEnable = function () {
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.EnemyDead, this, this.EnemyDeadEvent);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.EnemyLock, this, this.EnemyDeadEvent);
    };
    GameStep.prototype.onDestroy = function () {
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.EnemyDead, this, this.EnemyDeadEvent);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.EnemyLock, this, this.EnemyDeadEvent);
    };
    GameStep.prototype.InitGetCointList = function () {
        var _this = this;
        var _loop_1 = function (index) {
            var sp = new Laya.Sprite();
            sp.loadImage("subRes/image/biaoji.png", Laya.Handler.create(this_1, function () {
                _this._ownerSp.addChild(sp);
                _this._enemyList.push(sp);
                sp.visible = false;
                sp.x = 0;
                sp.y = 0;
                sp.pivotX = 25;
                sp.pivotY = 25;
            }));
        };
        var this_1 = this;
        for (var index = 0; index < 10; index++) {
            _loop_1(index);
        }
        for (var i = 0; i < 4; i++) {
            var text = new Laya.Text();
            text.text = "1000";
            text.width = 120;
            text.height = 40;
            text.pivotX = 60;
            text.pivotY = 20;
            text.align = "center";
            text.valign = "middle";
            text.font = "Microsoft YaHei";
            text.fontSize = 30;
            text.bold = true;
            text.color = "#FFFFFF";
            text.strokeColor = "#000000";
            text.stroke = 4;
            text.visible = false;
            this._ownerSp.addChild(text);
            this._testList.push(text);
        }
    };
    GameStep.prototype.onUpdate = function () {
        var list = SceneMgr_1.default.Instance.EnemyLocList;
        for (var index = 0; index < this._enemyList.length; index++) {
            var enemySp = this._enemyList[index];
            var obj = list[index];
            if (obj == null || (SceneMgr_1.default.Instance.Player.StateId == FsmEnum_1.StateID.Pter && obj.Postion == SceneMgr_1.default.Instance.CurrLockEnemyPos)) {
                if (enemySp.visible) {
                    enemySp.visible = false;
                }
            }
            else {
                var point = new Laya.Point();
                var loc = obj.Postion;
                var dis = obj.Distance;
                if (loc.z > 0) {
                    point.setTo(Laya.stage.width / 2, Laya.stage.height);
                }
                else {
                    point.setTo(loc.x, loc.y);
                }
                if (point.x < 0) {
                    point.x = 0;
                }
                else if (point.x > Laya.stage.width) {
                    point.x = Laya.stage.width;
                }
                this._ownerSp.globalToLocal(point);
                enemySp.x = point.x;
                enemySp.y = point.y;
                if (!enemySp.visible) {
                    enemySp.visible = true;
                }
                enemySp.scaleX = Math.min(1, Math.max(0.7, (dis / 50)));
                enemySp.scaleY = enemySp.scaleX;
            }
        }
        var time = SceneMgr_1.default.Instance.RestTimer;
        var min = Math.floor(time / 60);
        var sec = (time % 60);
        var minscr = "";
        var secscr = "";
        if (min < 10) {
            minscr = "0" + min;
        }
        else {
            minscr = min.toString();
        }
        if (sec < 10) {
            secscr = "0" + sec;
        }
        else {
            secscr = sec.toString();
        }
        this._gameTimer.value = minscr + ":" + secscr;
        this._enemyCount.value = SceneMgr_1.default.Instance.EnemyKillCount + "/" + SceneMgr_1.default.Instance.EnemCount;
        if (SceneMgr_1.default.Instance.CurrLockEnemyPos != null && SceneMgr_1.default.Instance.Player.StateId == FsmEnum_1.StateID.Pter) {
            if (!this._lock.visible) {
                this._lock.visible = true;
            }
            var point = new Laya.Point();
            point.setTo(SceneMgr_1.default.Instance.CurrLockEnemyPos.x, SceneMgr_1.default.Instance.CurrLockEnemyPos.y);
            this._ownerSp.globalToLocal(point);
            this._lock.x = point.x;
            this._lock.y = point.y;
        }
        else {
            if (this._lock.visible) {
                this._lock.visible = false;
            }
        }
    };
    GameStep.prototype.EnemyDeadEvent = function () {
        var _this = this;
        Laya.timer.once(500, this, function () {
            _this._enemyDead.visible = true;
        });
        Laya.timer.once(2000, this, function () {
            _this._enemyDead.visible = false;
        });
    };
    GameStep.prototype.EnemyLock = function (loc) {
    };
    return GameStep;
}(Laya.Script));
exports.default = GameStep;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../GameCore/Fsm/FsmEnum":43,"../GameCore/SceneMgr":47}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var CachedWXBannerAd_1 = require("../../PlatformApi/CachedWXBannerAd");
var KdBannerView = /** @class */ (function (_super) {
    __extends(KdBannerView, _super);
    function KdBannerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._needShowAni = true;
        _this._countTimer = 0; //效果计时器
        _this._progressWidth_csjc = 0; //进度条宽度
        _this._clickTime_csjc = 0; //用来保存用户当前点击次数
        _this._totalClickTime_csjc = 0; //用于计算客户总共点击了多少次按钮
        _this._totalClickTimer_csjc = 30; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime_csjc = 15; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime_csjc = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户  
        _this._bannerClicked_csjc = false; //Banner是否已经点击;
        _this.onOpenEvent = function () {
            CachedWXBannerAd_1.default.hide_csjc();
        };
        _this.onCloseEvent = function () {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.InGameView);
            CachedWXBannerAd_1.default.hide_csjc();
        };
        return _this;
    }
    KdBannerView.prototype.onAwake = function () {
        this._treasure_csjc = this.owner.getChildByName("Treasure");
        this._progress_csjc = this.owner.getChildByName("Progress");
        this._progressBar_csjc = this._progress_csjc.getChildByName("Bar");
        this._progressWidth_csjc = this._progressBar_csjc.width;
        this._progressBar_csjc.width = 0;
        this._clickBtn_csjc = this.owner.getChildByName("ClickBtn");
    };
    KdBannerView.prototype.onUpdate = function () {
        if (this._needShowAni) {
            this._countTimer += Laya.timer.delta / 1000;
            var angle = this._countTimer * 3.14 / 180 * 720;
            this._treasure_csjc.rotation = Math.sin(angle) * 15;
            var progress = this._clickTime_csjc / this._needClickTime_csjc;
            var spd = 2 + (progress * 2);
            if (this._progressBar_csjc.width >= spd) {
                this._progressBar_csjc.width -= spd;
            }
            if ((this._progressBar_csjc.width / this._progressWidth_csjc) + 0.1 < progress) {
                this._clickTime_csjc--;
            }
        }
        else {
            this._treasure_csjc.rotation = 0;
        }
    };
    KdBannerView.prototype.addEvent = function () {
        this._clickBtn_csjc.on(Laya.Event.CLICK, this, this.OnClickBtn);
    };
    KdBannerView.prototype.OnClickBtn = function () {
        var _this = this;
        this._totalClickTime_csjc++;
        this._clickTime_csjc++;
        if (this._clickTime_csjc > this._needClickTime_csjc) {
            this._clickTime_csjc = this._needClickTime_csjc;
        }
        if (this._clickTime_csjc >= this._bannerClickTime_csjc) {
            if (this._clickTime_csjc >= this._needClickTime_csjc) {
                this._clickTime_csjc = this._needClickTime_csjc - 1;
            }
            if (this._bannerClicked_csjc) {
                var progress_1 = this._clickTime_csjc / this._needClickTime_csjc;
                this._progressBar_csjc.width = progress_1 * this._progressWidth_csjc;
                return;
            }
            this._bannerClicked_csjc = true;
            this.ShowBanner();
            Laya.timer.once(1500, this, function () {
                _this.BannerClicked();
            });
        }
        else if (this._totalClickTime_csjc > this._totalClickTimer_csjc) {
            this.ShowBanner();
            this.BannerClicked();
        }
        var progress = this._clickTime_csjc / this._needClickTime_csjc;
        this._progressBar_csjc.width = progress * this._progressWidth_csjc;
    };
    KdBannerView.prototype.BannerClicked = function () {
        this._needShowAni = false;
        this._bannerClicked_csjc = true;
        this._clickTime_csjc = this._needClickTime_csjc;
        this._progressBar_csjc.width = this._progressWidth_csjc;
        this._clickBtn_csjc.visible = false;
        this.closeView();
    };
    KdBannerView.prototype.ShowBanner = function () {
        CachedWXBannerAd_1.default.changeShow_csjc(1);
    };
    return KdBannerView;
}(ViewBase_1.default));
exports.default = KdBannerView;
},{"../../Mgr/ViewMgr":12,"../../PlatformApi/CachedWXBannerAd":17,"../../View/ViewBase":87}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var SceneMgr_1 = require("../GameCore/SceneMgr");
var TutorialView = /** @class */ (function (_super) {
    __extends(TutorialView, _super);
    function TutorialView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._index = 0;
        _this.onCloseEvent = function () {
            SceneMgr_1.default.Instance.StartGame();
        };
        return _this;
    }
    TutorialView.prototype.onAwake = function () {
        this._skipBtn = this.owner.getChildByName("SkipBtn");
        this._display = this.owner.getChildByName("Tutorial").getChildByName("Display");
        this._nextBtn = this.owner.getChildByName("NextBtn");
        this._display.skin = "subRes/image/0.jpg";
    };
    TutorialView.prototype.OnSkipBtn = function () {
        this.closeView();
    };
    TutorialView.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
        this._nextBtn.on(Laya.Event.CLICK, this, this.OnNextBtn);
    };
    TutorialView.prototype.OnNextBtn = function () {
        this._index++;
        if (this._index > 2) {
            this._index = 0;
        }
        this._display.skin = "subRes/image/" + this._index + ".jpg";
    };
    return TutorialView;
}(ViewBase_1.default));
exports.default = TutorialView;
},{"../../View/ViewBase":87,"../GameCore/SceneMgr":47}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TmAPI_1 = require("../TmAPI");
var TmAppConfig_1 = require("../TmAppConfig");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var WXAPI_1 = require("../../PlatformApi/WXAPI");
var TmBannerAdView = /** @class */ (function (_super) {
    __extends(TmBannerAdView, _super);
    function TmBannerAdView() {
        var _this = _super.call(this) || this;
        /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
        _this.AdLocationID = TmAPI_1.default.BannerAdLocationId;
        /** @prop {name:RefreshTime, tips:"刷新速度,单位为秒", type:Number, default:10}*/
        _this.RefreshTime = 10;
        _this._data = null;
        _this._positionId = 0;
        _this._creativeId = 0;
        _this._appId = "";
        _this._wxBanner = null;
        return _this;
    }
    TmBannerAdView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
    };
    TmBannerAdView.prototype.onDisable = function () {
        this.clearBannerWx();
    };
    TmBannerAdView.prototype.refreshAd = function () {
        if (TmAppConfig_1.default.CurrentConfig.wxBanner && (Laya.Browser.onMiniGame || Laya.Browser.onQQMiniGame)) {
            console.log("Banner组件显示BannerWx");
            this.refreshBannerWx();
        }
        else {
            console.log("Banner组件显示BannerAd");
            this.refreshBannerAd();
        }
    };
    TmBannerAdView.prototype.refreshBannerAd = function () {
        var _this = this;
        TmAPI_1.default.TryGetAdvs(this.AdLocationID, function (config) {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", _this.AdLocationID, " 状态为关闭,隐藏控件");
                _this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 11) {
                console.log("广告位：", _this.AdLocationID, " 数据位空或者类型错误");
                return;
            }
            if (_this.owner && !_this.owner.destroyed) {
                _this._data = config.creatives[0];
                _this._creativeId = _this._data.creativeId;
                _this._positionId = _this._data.positionId;
                _this._appId = config.appId;
                Laya.loader.load(_this._data.show_config.image, Laya.Handler.create(_this, function () {
                    _this._ownerSp.loadImage(_this._data.show_config.image);
                    Laya.timer.once(_this.RefreshTime * 1000, _this, _this.refreshBannerAd);
                }));
                // this._ownerSp.loadImage(this._data.show_config.image, Laya.Handler.create(this, () => {
                //     if (!this._ownerSp.destroyed) {
                //         this._ownerSp.width = 750;
                //         this._ownerSp.height = 260;
                //     }
                //     Laya.timer.once(this.RefreshTime * 1000, this, this.refreshBannerAd);
                // }));
            }
        });
    };
    TmBannerAdView.prototype.onClick = function () {
        if (this._data) {
            console.log("跳转游戏： " + this._appId);
            TmAPI_1.default.NavigateAndReport(this._positionId, this._creativeId, this._appId, function (flag, list) {
                if (!flag) {
                    EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdFail_csjc);
                }
                if (list != null) {
                }
            });
        }
    };
    TmBannerAdView.prototype.refreshBannerWx = function () {
        var _this = this;
        if (!Laya.Browser.onMiniGame || !this.owner.visible)
            return;
        this.clearBannerWx();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._ownerSp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        this._wxBanner = Laya.Browser.window["wx"].createBannerAd({
            adUnitId: WXAPI_1.default.bannerAdUnitId_csjc,
            adIntervals: 30,
            style: {
                left: left,
                top: top,
                width: width,
            }
        });
        self._wxBanner.onLoad(function (res) {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        });
        this._wxBanner.onError(function (err) {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            _this.refreshBannerAd();
            _this.clearBannerWx();
        });
        this._wxBanner.onResize(function (res) {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight);
        });
        self._wxBanner.show();
    };
    TmBannerAdView.prototype.clearBannerWx = function () {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
        Laya.timer.clear(this, this.refreshBannerAd);
    };
    TmBannerAdView.prototype.onViewShow = function () {
        this.refreshAd();
    };
    TmBannerAdView.prototype.onViewHide = function () {
        this.clearBannerWx();
    };
    return TmBannerAdView;
}(Laya.Script));
exports.default = TmBannerAdView;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../../PlatformApi/WXAPI":20,"../TmAPI":62,"../TmAppConfig":63}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var TmAPI_1 = require("../TmAPI");
var TmListAdBox = /** @class */ (function (_super) {
    __extends(TmListAdBox, _super);
    function TmListAdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        // protected _originW: number = 200;
        // protected _originH: number = 200;
        _this._fontSize = 25;
        _this._positionId = 0;
        _this._creativeId = 0;
        _this._appId = "";
        return _this;
        // protected onSpClick() {
        //     var data = this._data;
        //     if (data) {
        //         console.log("跳转游戏： " + data.title);
        //         if (Laya.Browser.onMiniGame) {
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 ALD.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 EventMgr.dispatch(EventDef.AD_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     ALD.aldSendReportAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //         else if (Laya.Browser.onQGMiniGame) {
        //             OPPOAPI.navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
        //                 console.log("跳转成功")
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 EventMgr.dispatch(EventDef.AD_OnShareAdFail);
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //         else if (Laya.Browser.onQQMiniGame) //qq小游戏
        //         {
        //             QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 EventMgr.dispatch(EventDef.AD_OnShareAdFail);
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }
        // }
    }
    TmListAdBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        // this._originW = this._displaySp.width;
        // this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitleText");
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    };
    // onEnable(): void {
    //     this._displaySp.on(Laya.Event.CLICK, this, this.Clicked);
    // }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onClick);
    // }
    TmListAdBox.prototype.setData = function (data, parent) {
        if (data) {
            this._creativeId = data.creativeId;
            this._positionId = data.positionId;
            this._appId = data.appId;
            this._displaySp.loadImage(data.show_config.image, Laya.Handler.create(this, function () {
                // if (!this._displaySp.destroyed) {
                //     this._displaySp.width = this._originW;
                //     this._displaySp.height = this._originH;
                // }
            }));
            var str = String(data.show_config.title);
            // var num = str.length;
            // num = Math.max(5,num);
            // var fontSize = Math.floor((5 / num) * this._fontSize);
            // this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
        this._parentAdView = parent;
    };
    /**
     * 控件被点击事件
     *
     * @protected
     * @memberof TmListAdBox
     */
    TmListAdBox.prototype.onClick = function () {
        var _this = this;
        if (this._data) {
            console.log("跳转游戏： " + this._appId);
            TmAPI_1.default.NavigateAndReport(this._positionId, this._creativeId, this._appId, function (flag, list) {
                if (!flag) {
                    EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdFail_csjc);
                }
                else {
                    _this._parentAdView.event("AdRefresh");
                }
                // if (list != null) {
                //     this._parentAdView.event("Refresh");
                // }
            });
        }
    };
    return TmListAdBox;
}(Laya.Script));
exports.default = TmListAdBox;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../TmAPI":62}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TmListAdBox_1 = require("./TmListAdBox");
var TmAPI_1 = require("../TmAPI");
/**
 * 用于显示滚动广告列表的类
 *
 * @export
 * @class ListAdView
 * @extends {Laya.Script}
 */
var ListAdView = /** @class */ (function (_super) {
    __extends(ListAdView, _super);
    function ListAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:ScrollDirection,tips:"滚动方向,水平或竖直",type:Option,option:"Horizontal,Vertical",default:"Horizontal"}*/
        _this.ScrollDirection = "Horizontal";
        /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
        _this.AdLocationID = TmAPI_1.default.ListIcoAdLocationId;
        /** @prop {name:ScrollSpeed, tips:"滚动速度", type:Number, default:100}*/
        _this.ScrollSpeed = 100;
        _this._scrollForward = true;
        return _this;
    }
    ListAdView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._list = this.owner.getChildByName("List");
        this._list.elasticEnabled = true;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        if (this.ScrollDirection == "Horizontal") {
            this._list.hScrollBarSkin = "";
        }
        else {
            this._list.vScrollBarSkin = "";
        }
        this.owner.on("AdRefresh", this, this.RefreshAdList);
    };
    ListAdView.prototype.onEnable = function () {
        this.RefreshAdList();
    };
    ListAdView.prototype.RefreshAdList = function () {
        var _this = this;
        TmAPI_1.default.TryGetAdvs(this.AdLocationID, function (config) {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", _this.AdLocationID, " 状态为关闭,隐藏控件");
                _this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 7) {
                console.log("广告位：", _this.AdLocationID, " 数据位空或者类型错误");
                _this._list.array = null;
                return;
            }
            if (_this.owner && !_this.owner.destroyed) {
                var datas = config.creatives;
                _this._list.array = datas;
                // if (datas && datas.length > 0 && datas.length < 50) {
                //     (this.owner as Laya.Sprite).visible = true;
                //     var temp = []
                //     var counter = 0;
                //     for (var i = 0; i < 50; ++i) {
                //         if (counter >= datas.length) {
                //             counter = 0;
                //         }
                //         temp.push(datas[counter]);
                //         ++counter;
                //     }
                //     this._list.array = temp;
                // }
                // else {
                //     this._list.array = datas;
                //     (this.owner as Laya.Sprite).visible = false;
                // }
            }
        });
    };
    // onUpdate() {
    //     let scrollValue = this.ScrollSpeed * Laya.timer.delta / 1000;
    //     if (this._scrollForward) {
    //         this._list.scrollBar.value += scrollValue;
    //         if (this._list.scrollBar.value >= this._list.scrollBar.max) {
    //             this._scrollForward = false;
    //         }
    //     }
    //     else {
    //         this._list.scrollBar.value -= scrollValue;
    //         if (this._list.scrollBar.value <= 0) {
    //             this._scrollForward = true;
    //         }
    //     }
    // }
    ListAdView.prototype.onUpdate = function () {
        var scrollValue = this.ScrollSpeed * Laya.timer.delta / 1000;
        this._list.scrollBar.value += scrollValue;
        if (this._list.scrollBar.value >= this._list.scrollBar.max) {
            this._list.scrollBar.value = 0;
        }
        else if (this._list.scrollBar.value < 0) {
            this._list.scrollBar.value = this._list.scrollBar.max;
        }
    };
    ListAdView.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var listAdBox = cell.getComponent(TmListAdBox_1.default);
        listAdBox.setData(data, this.owner);
    };
    return ListAdView;
}(Laya.Script));
exports.default = ListAdView;
},{"../TmAPI":62,"./TmListAdBox":57}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TmAPI_1 = require("../TmAPI");
var TmListAdBox_1 = require("./TmListAdBox");
var TmShakeAdView = /** @class */ (function (_super) {
    __extends(TmShakeAdView, _super);
    function TmShakeAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
        _this.AdLocationID = TmAPI_1.default.ListIcoAdLocationId;
        /** @prop {name:ShakeTime, tips:"闪动速度", type:Number, default:1000}*/
        _this.ShakeTime = 1000;
        /** @prop {name:ChaneAdTime, tips:"更换广告速度", type:Number, default:1000}*/
        _this.ChaneAdTime = 6000;
        /** @prop {name:RotaAngel, tips:"晃动角度", type:Number, default:10}*/
        _this.RotaAngel = 10;
        /** @prop {name:Scale, tips:"晃动缩放", type:Number, default:0.1}*/
        _this.Scale = 0.1;
        _this._shakeTimer = 0;
        _this._changeAdTimer = 0;
        _this._shakeIndex = 0;
        return _this;
    }
    ;
    TmShakeAdView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._cells = this._list.cells;
    };
    TmShakeAdView.prototype.onEnable = function () {
        this.RefreshAdList();
    };
    TmShakeAdView.prototype.onUpdate = function () {
        if (this._changeAdTimer <= this.ChaneAdTime) {
            this._changeAdTimer += Laya.timer.delta;
        }
        if (this._shakeTimer <= this.ShakeTime) {
            this._shakeTimer += Laya.timer.delta;
            var box = this._cells[this._shakeIndex];
            var period = this._shakeTimer / this.ShakeTime;
            var aniPeriod = 0;
            if (period >= 0 && period < 0.2) {
                aniPeriod = (period / 0.2);
            }
            else if (period >= 0.2 && period < 0.4) {
                aniPeriod = 1 - ((period - 0.2) / 0.2);
            }
            else if (period >= 0.4 && period < 0.6) {
                aniPeriod = -1 * ((period - 0.4) / 0.2);
            }
            else if (period >= 0.6 && period < 0.8) {
                aniPeriod = -1 + ((period - 0.6) / 0.2);
            }
            else {
                aniPeriod = 0;
            }
            box.rotation = aniPeriod * this.RotaAngel;
            box.scaleX = 1 - (aniPeriod * this.Scale);
            box.scaleY = box.scaleX;
        }
        else {
            this._shakeTimer = 0;
            this._shakeIndex++;
            if (this._shakeIndex > this._cells.length - 1) {
                this._shakeIndex = 0;
            }
            if (this._changeAdTimer > this.ChaneAdTime) {
                this._changeAdTimer = 0;
                this.RefreshAdList();
            }
        }
    };
    TmShakeAdView.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(TmListAdBox_1.default);
        loopAdBox.setData(data, this.owner);
    };
    TmShakeAdView.prototype.RefreshAdList = function () {
        var _this = this;
        TmAPI_1.default.TryGetAdvs(this.AdLocationID, function (config) {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", _this.AdLocationID, " 状态为关闭,隐藏控件");
                _this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 7) {
                console.log("广告位：", _this.AdLocationID, " 数据位空或者类型错误");
                _this._list.array = null;
                return;
            }
            if (_this.owner && !_this.owner.destroyed) {
                var datas = config.creatives;
                _this._list.array = datas;
                // if (datas && datas.length > 0 && datas.length < 50) {
                //     (this.owner as Laya.Sprite).visible = true;
                //     var temp = []
                //     var counter = 0;
                //     for (var i = 0; i < 50; ++i) {
                //         if (counter >= datas.length) {
                //             counter = 0;
                //         }
                //         temp.push(datas[counter]);
                //         ++counter;
                //     }
                //     this._list.array = temp;
                // }
                // else {
                //     this._list.array = datas;
                //     (this.owner as Laya.Sprite).visible = false;
                // }
            }
        });
    };
    return TmShakeAdView;
}(Laya.Script));
exports.default = TmShakeAdView;
},{"../TmAPI":62,"./TmListAdBox":57}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Utilit_1 = require("../../Utilit");
var TmSidePopAdView = /** @class */ (function (_super) {
    __extends(TmSidePopAdView, _super);
    function TmSidePopAdView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TmSidePopAdView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._bg = this.owner.getChildByName("BG");
        this._popBtn = this._bg.getChildByName("PopADBtn");
        this._popOut_Img = this._popBtn.getChildByName("PopOut");
        this._popIn_Img = this._popBtn.getChildByName("PopIn");
        this._popOut_Img.visible = true;
        this._popIn_Img.visible = false;
    };
    TmSidePopAdView.prototype.onEnable = function () {
        var _this = this;
        this._popBtn.on(Laya.Event.CLICK, this, this.onPopBtnClick);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdFail_csjc, this, this.onShareAdFail);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.AD_SidePopViewSwitch_csjc, this, function (res) { _this._ownerSp.visible = res; });
    };
    TmSidePopAdView.prototype.onDisable = function () {
        var _this = this;
        this._popBtn.off(Laya.Event.CLICK, this, this.onPopBtnClick);
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.AD_OnShareAdFail_csjc, this, this.onShareAdFail);
        EventMgr_1.default.regEvent_csjc(EventDef_1.EventDef_csjc.AD_SidePopViewSwitch_csjc, this, function (res) { _this._ownerSp.visible = res; });
    };
    TmSidePopAdView.prototype.onPopBtnClick = function () {
        if (this._bg.x > 0) {
            this.popDown();
        }
        else {
            this.popUp();
        }
    };
    TmSidePopAdView.prototype.popDown = function () {
        Laya.Tween.to(this._bg, { x: 0 }, 250, Laya.Ease.circIn, Laya.Handler.create(this, function () {
        }), null, true);
    };
    TmSidePopAdView.prototype.popUp = function () {
        Utilit_1.default.forEachChild(this.owner, function (owner) {
            owner.event("AdRefresh");
        });
        Laya.Tween.to(this._bg, { x: this._bg.width }, 250, Laya.Ease.circIn, Laya.Handler.create(this, function () {
        }), null, true);
    };
    TmSidePopAdView.prototype.onShareAdFail = function () {
        this.popUp();
    };
    return TmSidePopAdView;
}(Laya.Script));
exports.default = TmSidePopAdView;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../../Utilit":65}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TmAPI_1 = require("../TmAPI");
var TmSingleAdView = /** @class */ (function (_super) {
    __extends(TmSingleAdView, _super);
    function TmSingleAdView() {
        var _this = _super.call(this) || this;
        /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
        _this.AdLocationID = TmAPI_1.default.SingleAdLocationId;
        /** @prop {name:RefreshTime, tips:"刷新速度,单位为秒", type:Number, default:0}*/
        _this.RefreshTime = 0;
        _this._data = null;
        _this._positionId = 0;
        _this._creativeId = 0;
        _this._appId = "";
        _this._isAni = false;
        _this._aniImageIndex = 0;
        _this._aniImageArray = [];
        _this._fpsTimer = 0;
        _this._fpsTime = 0;
        return _this;
    }
    TmSingleAdView.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._displaySp = this._ownerSp.getChildByName("Display");
    };
    TmSingleAdView.prototype.onEnable = function () {
        this.refreshAd();
    };
    TmSingleAdView.prototype.refreshAd = function () {
        var _this = this;
        TmAPI_1.default.TryGetAdvs(this.AdLocationID, function (config) {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", _this.AdLocationID, " 状态为关闭,隐藏控件");
                _this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 1) {
                console.log("广告位：", _this.AdLocationID, " 数据位空或者类型错误");
                return;
            }
            if (_this.owner && !_this.owner.destroyed) {
                _this._data = config.creatives[0];
                _this._creativeId = _this._data.creativeId;
                _this._positionId = _this._data.positionId;
                _this._appId = config.appId;
                if (_this._data.show_config.fps != null) {
                    console.log("SingleAd显示序列帧");
                    _this._aniImageArray = _this._data.show_config.images;
                    _this._fpsTime = _this._data.show_config.fps * 1000;
                    Laya.loader.load(_this._aniImageArray, Laya.Handler.create(_this, function (res) {
                        if (!res)
                            return;
                        if (_this.RefreshTime > 0) {
                            Laya.timer.once(_this.RefreshTime * 1000, _this, _this.refreshAd);
                        }
                        _this._aniImageIndex = 0;
                        _this._fpsTimer = 0;
                        _this._isAni = true;
                    }));
                }
                else {
                    console.log("SingleAd显示单独浮动");
                    _this._aniImageArray = [];
                    _this._fpsTime = 0;
                    _this._fpsTimer = 0;
                    _this._isAni = false;
                    Laya.loader.load(_this._data.show_config.image, Laya.Handler.create(_this, function () {
                        _this._displaySp.loadImage(_this._data.show_config.image);
                        if (_this.RefreshTime > 0) {
                            Laya.timer.once(_this.RefreshTime * 1000, _this, _this.refreshAd);
                        }
                    }));
                }
                // this._ownerSp.loadImage(this._data.show_config.image, Laya.Handler.create(this, () => {
                //     if (!this._ownerSp.destroyed) {
                //         this._ownerSp.width = 750;
                //         this._ownerSp.height = 260;
                //     }
                //     Laya.timer.once(this.RefreshTime * 1000, this, this.refreshBannerAd);
                // }));
            }
        });
    };
    TmSingleAdView.prototype.onUpdate = function () {
        if (this._isAni) {
            if (this._fpsTimer < this._fpsTime) {
                this._fpsTimer += Laya.timer.delta;
            }
            else {
                this._fpsTimer = 0;
                this._displaySp.loadImage(this._aniImageArray[this._aniImageIndex]);
                if (this._aniImageIndex > this._aniImageArray.length - 1) {
                    this._aniImageIndex++;
                }
                else {
                    this._aniImageIndex = 0;
                }
            }
        }
    };
    return TmSingleAdView;
}(Laya.Script));
exports.default = TmSingleAdView;
},{"../TmAPI":62}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ALD_1 = require("../ALD");
var TmAppConfig_1 = require("./TmAppConfig");
/**
 * 天幕sdk系统API
 *
 * @export
 * @class TmAPI
 */
var TmAPI = /** @class */ (function () {
    function TmAPI() {
    }
    /**
     * 天幕SDK初始化
     *
     * @static
     * @memberof TmAPI
     */
    TmAPI.Init = function () {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.init({
                hideRequestLog: true,
                appVersion: this.AppVersion
            });
        }
    };
    /**
     * 登录接口
     *
     * @static
     * @param {Function} func
     * @memberof TmAPI
     */
    TmAPI.Login = function (func) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.login().then(function (res) {
                console.log("登陆成功", res);
                if (func != null) {
                    func(res);
                }
            });
        }
    };
    TmAPI.NoLoginInit = function (openId) {
        if (Laya.Browser.onMiniGame) {
            console.log(openId);
            Laya.Browser.window["wx"].tmSDK.sendUserInfo({ openId: openId, gender: 1 });
            console.log("传入天幕OpenId: ", openId);
        }
    };
    /**
     * 尝试得到广告，会先检查广告位是否打开再真正拉取广告
     *
     * @static
     * @param {Function} func
     * @memberof TmAPI
     */
    TmAPI.TryGetAdvs = function (positionId, completeHandler) {
        var _this = this;
        if (!TmAppConfig_1.default.CurrentConfig.adSwitch) {
            console.log("广告总开关为关闭状态");
            completeHandler({ IsOpen: false });
            return;
        }
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.checkFlowIsOpen({
                positionId: positionId
            }).then(function (res) {
                if (res.isOpen) {
                    _this.GetAdvs(positionId, completeHandler);
                }
                else {
                    completeHandler({ IsOpen: false });
                }
            });
        }
        else if (Laya.Browser.onQQMiniGame) {
        }
        else {
            console.log("编辑器下调用广告位,返回测试广告:", positionId);
            var AddDate = {
                creatives: [],
                isOpen: true
            };
            switch (positionId) {
                case this.ListIcoAdLocationId:
                    for (var index = 0; index < 20; index++) {
                        var creativeTemp = {
                            creativeId: 10000,
                            positionId: positionId,
                            appId: "Ico测试广告",
                            show_config: { image: "res/TmTestAd/TestIcoAd-" + (index % 5 + 1) + ".jpg", title: "1" }
                        };
                        AddDate.creatives.push(creativeTemp);
                    }
                    AddDate.type = 7;
                    break;
                case this.BannerAdLocationId:
                    var creativebanner = {
                        creativeId: 10000,
                        positionId: positionId,
                        show_config: { image: "res/TmTestAd/TestBannerAd-" + (Math.floor(Math.random() * 2) + 1) + ".jpg", title: "1" }
                    };
                    AddDate.appId = "Banner微信测试广告";
                    AddDate.creatives.push(creativebanner);
                    AddDate.type = 11;
                    break;
                case this.SingleAdLocationId:
                    var creativeSingle = {
                        creativeId: 10000,
                        positionId: positionId,
                        appId: "Single微信测试广告",
                        show_config: { image: "res/TmTestAd/TestFlowAd-" + (Math.floor(Math.random() * 2) + 1) + ".jpg", title: "1" }
                    };
                    AddDate.creatives.push(creativeSingle);
                    AddDate.type = 1;
                    break;
            }
            completeHandler(AddDate);
        }
    };
    /**
     * 拉取广告的方法,不要直接调用
     *
     * @static
     * @param {string} locationId
     * @param {Function} completeHandler
     * @memberof TmAPI
     */
    TmAPI.GetAdvs = function (positionId, completeHandler) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.getFlowConfig({
                positionId: positionId
            }).then(function (config) {
                console.log(positionId, '该广告位是否开启:', config);
                completeHandler(config);
            });
        }
        else if (Laya.Browser.onQQMiniGame) {
        }
    };
    /**
     * 跳转和自动上报数据的集成化封装
     *
     * @static
     * @param {any} positionId
     * @param {any} creativeId
     * @memberof TmAPI
     */
    TmAPI.NavigateAndReport = function (positionId, creativeId, appid, completeFunc) {
        if (Laya.Browser.onMiniGame) {
            this.FlowNavigate(positionId, creativeId, function (flag, res) {
                console.log(flag, res);
                if (flag) {
                    ALD_1.default.aldSendReportAdClickSuccess_csjc(appid);
                }
                else {
                    if (res.navigateMessage.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSendReportAdClickFail_csjc(appid);
                    }
                }
                if (completeFunc) {
                    completeFunc(flag, res);
                }
            });
        }
        else {
            if (completeFunc) {
                completeFunc(true, null);
            }
        }
    };
    /**
     * 跳转到其他小游戏
     *
     * @memberof TmAPI
     */
    TmAPI.FlowNavigate = function (positionId, creativeId, completeFunc) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.flowNavigate({
                positionId: positionId,
                creativeId: creativeId,
            }).then(function (newList) {
                console.log('调用跳转函数成功');
                console.log('自动刷新列表：', newList); //返回最新列表 
                if (completeFunc) {
                    if (newList.navigateMessage.errMsg == "navigateToMiniProgram:ok") {
                        completeFunc(true, newList);
                    }
                    else {
                        completeFunc(false, newList);
                    }
                }
            }).catch(function (error) {
                console.log('调用跳转函数失败', error);
                if (completeFunc) {
                    completeFunc(false, error);
                }
            });
        }
        else {
            if (completeFunc) {
                console.log('在模拟器中调用跳转函数,返回虚假成功结果');
                completeFunc(true, null);
            }
        }
    };
    /**
     * 得到配置表
     *
     * @static
     * @memberof TmAPI
     */
    TmAPI.getAppJSONConfig = function (key, completeFunc) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.getAppJSONConfig(key).then(function (res) {
                if (completeFunc) {
                    completeFunc(res);
                }
            });
        }
        else {
            if (completeFunc) {
                completeFunc();
            }
        }
    };
    /**
     * 发送事件
     *
     * @static
     * @param {string} eventId
     * @param {*} [res]
     * @memberof TmAPI
     */
    TmAPI.SendEvent = function (eventId, res) {
        if (Laya.Browser.onMiniGame) {
            console.log("发送事件:", eventId, "参数:", res);
            Laya.Browser.window["wx"].tmSDK.sendEvent(eventId, res);
        }
        else {
            console.log("在编辑器下发送Tm事件", eventId, res);
        }
    };
    //AppId
    TmAPI.AppId = "";
    //当前App版本
    TmAPI.AppVersion = "1.0.0";
    //轮播广告位
    TmAPI.ListIcoAdLocationId = 1075799;
    //单个广告位
    TmAPI.SingleAdLocationId = 1075900;
    //Banner广告位
    TmAPI.BannerAdLocationId = 1076001;
    TmAPI._iphoneIgnoreAppIds = [
        "wx2d2acce3c45f4ddf",
        "wxeb93c1298ec7c62b"
    ];
    TmAPI.UserInformation = null;
    return TmAPI;
}());
exports.default = TmAPI;
},{"../ALD":1,"./TmAppConfig":63}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TmAPI_1 = require("./TmAPI");
/**
 * 保存appConfig数值的类
 *
 * @export
 * @class TmAppConfigOptions
 */
var TmAppConfigOptions = /** @class */ (function () {
    function TmAppConfigOptions() {
        //所有导出广告的开关,true为有导出广告
        this.adSwitch = false;
        //是否打开微信banner,true为有微信banner
        this.wxBanner = false;
        //误点狂点功能总开关
        this.wudian = false;
        //审核屏蔽功能总开关,审核屏蔽的意义是让审核人员看不到某些敏感的功能,true为打开屏蔽功能
        this.examineBlock = true;
        //审核屏蔽的场景值，通过这些场景值进来的审核人员看不到某些敏感的功能
        this.examineSceneList = [
            1005, 1006, 1011, 1012, 1013, 1014, 1017, 1019,
            1020, 1023, 1024, 1025, 1030, 1031, 1032, 1036,
            1042, 1047, 1048, 1049, 1053, 1102, 1129
        ];
        //微信banner列表
        this.wxWuDianBanners = [];
        //按钮延迟出现的时间
        this.btnShowTimer = 0;
        //按钮上移的时间
        this.btnMoveTimer = 0;
        //Banner上移的时间
        this.bannerMoveTimer = 0;
        //Banner失败创建的个数
        this.bannerCreateFailNum = 3;
        //Banner每天最大创建次数
        this.bannerTodayBannerMax = 10;
        //买量功能的总开关，为了让通过买量进来的审核人员看不见广告
        this.maiLiangBlock = true;
        //买量功能的的场景值，为了让通过买量进来的审核人员看不见广告
        this.maiLiangSceneList = [
            1011, 1012, 1013, 1017, 1025, 1031, 1032, 1047,
            1048, 1049, 1072
        ];
        //下面是自定义的字段
    }
    /**
     * 初始化appConfigOption字段值
     * 如果表中没有，则设置为初始的默认值
     *
     * @param {*} res
     * @memberof TmAppConfigOptions
     */
    TmAppConfigOptions.prototype.initOptions = function (res) {
        //类型判断，如果是比较简单的number，boolean，string,function就用Typeof
        //如果是Array就用 instanceof
        if (res == null)
            return;
        if (typeof res.adSwitch == "boolean")
            this.adSwitch = res.adSwitch;
        if (typeof res.wxBanner == "boolean")
            this.wxBanner = res.wxBanner;
        if (typeof res.wudian == "boolean")
            this.wudian = res.wudian;
        if (typeof res.examineBlock == "boolean")
            this.examineBlock = res.examineBlock;
        if (res.examineSceneList instanceof Array)
            this.examineSceneList = res.examineSceneList;
        if (res.wxWuDianBanners instanceof Array)
            this.wxWuDianBanners = res.wxWuDianBanners;
        if (typeof res.btnShowTimer == "number")
            this.btnShowTimer = res.btnShowTimer;
        if (typeof res.btnMoveTimer == "number")
            this.btnMoveTimer = res.btnMoveTimer;
        if (typeof res.bannerMoveTimer == "boolean")
            this.bannerMoveTimer = res.bannerMoveTimer;
        if (typeof res.bannerCreateFailNum == "boolean")
            this.bannerCreateFailNum = res.bannerCreateFailNum;
        if (typeof res.bannerTodayBannerMax == "boolean")
            this.bannerTodayBannerMax = res.bannerTodayBannerMax;
        if (typeof res.maiLiangBlock == "boolean")
            this.maiLiangBlock = res.maiLiangBlock;
        if (res.maiLiangSceneList instanceof Array)
            this.maiLiangSceneList = res.maiLiangSceneList;
        //下面是自定义的字段
    };
    return TmAppConfigOptions;
}());
exports.TmAppConfigOptions = TmAppConfigOptions;
var TmAppConfig = /** @class */ (function () {
    function TmAppConfig() {
    }
    Object.defineProperty(TmAppConfig, "CurrentConfig", {
        get: function () {
            return this._currentConfig;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 调用在线版本的appConfig
     *
     * @static
     * @param {Function} completeFunc
     * @memberof TmAppConfig
     */
    TmAppConfig.UpdateConfig = function (completeFunc) {
        var _this = this;
        console.log("调用在线版本的appConfig");
        TmAPI_1.default.getAppJSONConfig("AppConfig", function (res) {
            _this._currentConfig.initOptions(res);
            console.log(_this._currentConfig);
            if (completeFunc) {
                completeFunc();
            }
        });
    };
    /**
     * 调用本地测试版本的appConfig
     *
     * @static
     * @param {Function} completeFunc
     * @memberof TmAppConfig
     */
    TmAppConfig.UpdateLocalConfig = function (completeFunc) {
        var _this = this;
        console.log("调用本地版本的appConfig");
        Laya.loader.load(this.LocalConfigPath, Laya.Handler.create(this, function (res) {
            _this._currentConfig.initOptions(res);
            console.log(_this._currentConfig);
            if (completeFunc) {
                completeFunc();
            }
        }));
    };
    //本地版本的appConfig存储位置
    TmAppConfig.LocalConfigPath = "res/json/AppConfigOption.json";
    //当前的appConfig对象
    TmAppConfig._currentConfig = new TmAppConfigOptions();
    return TmAppConfig;
}());
exports.default = TmAppConfig;
},{"./TmAPI":62}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var StorageMgr_1 = require("../Mgr/StorageMgr");
var HttpUnit_1 = require("../Net/HttpUnit");
//游戏数据,为保持版本兼容，建议不要删除和修改字段名
var UserGameData = /** @class */ (function () {
    function UserGameData() {
        this.levelNum = 1; //当前关卡
        this.moneyNum = 0; //金币数量
        this.crystalNum = 0; //钻石数量    
        this.Piece = 1;
        this.Speed = 1;
        this.Foot = 1;
    }
    return UserGameData;
}());
exports.UserGameData = UserGameData;
var User_csjc = /** @class */ (function (_super) {
    __extends(User_csjc, _super);
    function User_csjc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User_csjc, "isLogin", {
        get: function () {
            return (User_csjc.code_csjc != "") || (User_csjc.token_csjc != "");
        },
        enumerable: true,
        configurable: true
    });
    User_csjc.getSaveData_csjc = function () {
        return JSON.stringify(User_csjc._gameData);
    };
    User_csjc.testInitUser_csjc = function () {
        User_csjc._gameData.levelNum = 1;
        User_csjc._gameData.moneyNum = 10000000;
        User_csjc._gameData.crystalNum = 10000000;
        User_csjc._gameData.Piece = 10;
        User_csjc._gameData.Speed = 10;
        User_csjc._gameData.Foot = 10;
    };
    User_csjc.initiUser_csjc = function (remoteData) {
        if (remoteData && 0 != remoteData) {
            User_csjc._useLocalStorage_csjc = false;
            console.log("获得在线存档");
            User_csjc.SetUserData_csjc(remoteData);
        }
        else {
            //todo：处理没有获取到玩家数据的情况,则直接调用本地数据
            console.log("获得本地存档");
            User_csjc._useLocalStorage_csjc = true;
            var dataStr = StorageMgr_1.default.getStorage_csjc("UserGameData");
            if (dataStr != null && dataStr != "") {
                var localdata = JSON.parse(dataStr);
                User_csjc.SetUserData_csjc(localdata);
            }
            else {
                this.SaveGameData_csjc();
            }
        }
    };
    User_csjc.SetUserData_csjc = function (data) {
        if (data.levelNum)
            User_csjc._gameData.levelNum = data.levelNum;
        if (data.moneyNum)
            User_csjc._gameData.moneyNum = data.moneyNum;
        if (data.crystalNum)
            User_csjc._gameData.crystalNum = data.crystalNum;
        if (data.Piece)
            User_csjc._gameData.Piece = data.Piece;
        if (data.Speed)
            User_csjc._gameData.Speed = data.Speed;
        if (data.Foot)
            User_csjc._gameData.Foot = data.Foot;
    };
    User_csjc.SaveGameData_csjc = function () {
        if (User_csjc._useLocalStorage_csjc) {
            User_csjc.SaveLocalGameDate_csjc();
        }
        else {
            HttpUnit_1.default.saveGameData_csjc(User_csjc.getSaveData_csjc(), function (res) {
                if (res.code == 1) {
                    console.log("存档成功");
                }
                else {
                    console.log("存档失败");
                }
            }, function (res) {
                console.log("存档失败");
            });
        }
    };
    User_csjc.SaveLocalGameDate_csjc = function () {
        var storage = new StorageMgr_1.StorageReq_csjc();
        storage.key = "UserGameData";
        storage.data = User_csjc._gameData;
        StorageMgr_1.default.setStorage_csjc(storage);
    };
    User_csjc.setLeveNum_csjc = function (levelNum) {
        User_csjc._gameData.levelNum = levelNum;
        this.SaveGameData_csjc();
    };
    User_csjc.getLeveNum_csjc = function () {
        return User_csjc._gameData.levelNum;
    };
    User_csjc.addMoney_csjc = function (add, getloc) {
        add = Math.ceil(add);
        var last = User_csjc._gameData.moneyNum;
        User_csjc._gameData.moneyNum += add;
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnUserMoneyChange_csjc, {
            curr: User_csjc._gameData.moneyNum,
            last: last,
            getLoc: getloc
        });
        this.SaveGameData_csjc();
    };
    User_csjc.subMoney_csjc = function (sub) {
        sub = Math.ceil(sub);
        var last = User_csjc._gameData.moneyNum;
        User_csjc._gameData.moneyNum -= sub;
        if (User_csjc._gameData.moneyNum < 0) {
            User_csjc._gameData.moneyNum = 0;
        }
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnUserMoneyChange_csjc, {
            curr: User_csjc._gameData.moneyNum,
            last: last
        });
        this.SaveGameData_csjc();
    };
    User_csjc.getMoney_csjc = function () {
        return User_csjc._gameData.moneyNum;
    };
    User_csjc.addCrystal_csjc = function (add, getloc) {
        add = Math.ceil(add);
        var last = User_csjc._gameData.crystalNum;
        User_csjc._gameData.crystalNum += add;
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnUserCrystalChange_csjc, {
            curr: User_csjc._gameData.crystalNum,
            last: last,
            getLoc: getloc
        });
        this.SaveGameData_csjc();
    };
    User_csjc.subCrystal_csjc = function (sub) {
        sub = Math.ceil(sub);
        var last = User_csjc._gameData.crystalNum;
        User_csjc._gameData.crystalNum -= sub;
        if (User_csjc._gameData.crystalNum < 0) {
            User_csjc._gameData.crystalNum = 0;
        }
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnUserCrystalChange_csjc, {
            curr: User_csjc._gameData.crystalNum,
            last: last
        });
        this.SaveGameData_csjc();
    };
    User_csjc.getCrystal_csjc = function () {
        return User_csjc._gameData.crystalNum;
    };
    User_csjc.GetSpeed_csjc = function () {
        return User_csjc._gameData.Speed;
    };
    User_csjc.SetSpeed_csjc = function (v) {
        User_csjc._gameData.Speed = v;
    };
    User_csjc.GetPiece_csjc = function () {
        return User_csjc._gameData.Piece;
    };
    User_csjc.SetPiece_csjc = function (v) {
        User_csjc._gameData.Piece = v;
    };
    User_csjc.GetFoot_csjc = function () {
        return User_csjc._gameData.Foot;
    };
    User_csjc.SetFoot_csjc = function (v) {
        User_csjc._gameData.Foot = v;
    };
    User_csjc.code_csjc = "";
    User_csjc.openId_csjc = "";
    User_csjc.token_csjc = null;
    User_csjc.nickName_csjc = "";
    User_csjc.gender_csjc = 0;
    User_csjc.city_csjc = "广州市";
    User_csjc._useLocalStorage_csjc = false; //是否使用本地储存数据
    User_csjc._gameData = new UserGameData();
    return User_csjc;
}(Laya.Script));
exports.default = User_csjc;
},{"../Event/EventDef":5,"../Event/EventMgr":6,"../Mgr/StorageMgr":11,"../Net/HttpUnit":14}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit = /** @class */ (function () {
    function Utilit() {
    }
    Utilit.Lerp = function (form, to, delta) {
        if (form == to)
            return to;
        if (form > to) {
            var next = form - delta;
            if (next <= to)
                return to;
            return next;
        }
        else if (form < to) {
            var next = form + delta;
            if (next >= to)
                return to;
            return next;
        }
    };
    Utilit.lerpEulerAngle = function (form, to, delta) {
        var form = form % 360;
        form = form >= 0 ? form : (360 + form);
        var to = to % 360;
        to = to >= 0 ? to : (360 + to);
        var dis = Math.abs(to - form);
        if (dis > 180) {
            if (form < to)
                to = to - 360;
            else if (form > to)
                to = to + 360;
        }
        var next = Utilit.Lerp(form, to, delta);
        return next;
    };
    Utilit.getRotationByDir = function (v) {
        var dotValue = (v.x * Utilit.poinDown.x) + (v.y * Utilit.poinDown.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit.poinDown.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    };
    Utilit.getRotationByDirOn3DSpace = function (v) {
        var dotValue = (v.x * Utilit.poinUp.x) + (v.y * Utilit.poinUp.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit.poinUp.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    };
    Utilit.getDirByRotation = function (rotation) {
        var radian = (rotation - 90) * Math.PI / 180; // -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    };
    Utilit.getDirDirAngle = function (dir1, dir2) {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos);
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    };
    Utilit.getDirScalarLength = function (dir) {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    };
    Utilit.setSpOnParentCenter = function (sp) {
        if (null == sp.parent)
            return;
        var psp = sp.parent;
        var x = 0;
        var y = 0;
        var x = x - sp.width / 2 * sp.scaleX + psp.width / 2;
        var y = y - sp.height / 2 * sp.scaleY + psp.height / 2;
        sp.x = x;
        sp.y = y;
    };
    Utilit.getPointToLineDistance = function (x, y, LineStart, LineEnd) {
        var toStartDir = new Laya.Point(x - LineStart.x, y - LineStart.y);
        var toEndDir = new Laya.Point(x - LineEnd.x, y - LineEnd.y);
        var lineDir = new Laya.Point(LineEnd.x - LineStart.y, LineEnd.y - LineStart.y);
        var dotToStartDir = (lineDir.x * toStartDir.x) + (lineDir.y * toStartDir.y);
        if (dotToStartDir <= 0) {
            return toStartDir.distance(0, 0);
        }
        var dotToEndDir = (lineDir.x * toEndDir.x) + (lineDir.y * toEndDir.y);
        if (dotToEndDir <= 0) {
            return toEndDir.distance(0, 0);
        }
        var toStartDis = toStartDir.distance(0, 0);
        var lineDirDis = lineDir.distance(0, 0);
        var cos = dotToStartDir / (toStartDis * lineDirDis);
        var radians = Math.acos(cos);
        var dis = Math.sin(radians) * toStartDis;
        return dis;
    };
    Utilit.isIphoneX = function () {
        if (!Laya.Browser.onIPhone)
            return false;
        if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
            return true;
        }
        return false;
    };
    Utilit.isIphone = function () {
        return Laya.Browser.onIPhone;
    };
    Utilit.getChild = function (node, name) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Utilit.getChild(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Utilit.forEachChild = function (node, each) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            each(child);
            Utilit.forEachChild(child, each);
        }
    };
    Utilit.OriginStageWidth = 1334;
    Utilit.OriginStageHeight = 750;
    Utilit.grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit.grayscaleFilter = new Laya.ColorFilter(Utilit.grayscaleMat);
    Utilit.poinDown = new Laya.Point(0, -1);
    Utilit.poinUp = new Laya.Point(0, 1);
    return Utilit;
}());
exports.default = Utilit;
},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlphaBreathingAni_csjc = /** @class */ (function (_super) {
    __extends(AlphaBreathingAni_csjc, _super);
    function AlphaBreathingAni_csjc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:BreathingSpeed_csjc, tips:"呼吸速度", type:Number, default:0.5}*/
        _this.BreathingSpeed_csjc = 0.5;
        /** @prop {name:MinAlpha, tips:"最小透明值", type:Number, default:0.5}*/
        _this.MinAlpha = 0.5;
        _this._add_csjc = false;
        return _this;
    }
    AlphaBreathingAni_csjc.prototype.onAwake = function () {
        this._ownerSprite_csjc = this.owner;
    };
    AlphaBreathingAni_csjc.prototype.onUpdate = function () {
        if (this._ownerSprite_csjc.visible) {
            this.bgAni_csjc();
        }
    };
    AlphaBreathingAni_csjc.prototype.bgAni_csjc = function () {
        var spd = (Laya.timer.delta / 1000) * this.BreathingSpeed_csjc;
        if (!this._add_csjc) {
            this._ownerSprite_csjc.alpha = this._ownerSprite_csjc.alpha - spd;
            if (this._ownerSprite_csjc.alpha <= this.MinAlpha) {
                this._add_csjc = true;
            }
        }
        else {
            this._ownerSprite_csjc.alpha = this._ownerSprite_csjc.alpha + spd;
            if (this._ownerSprite_csjc.alpha >= 1) {
                this._add_csjc = false;
            }
        }
    };
    return AlphaBreathingAni_csjc;
}(Laya.Script));
exports.default = AlphaBreathingAni_csjc;
},{}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../Mgr/SoundMgr");
var ButtonAnim_csjc = /** @class */ (function (_super) {
    __extends(ButtonAnim_csjc, _super);
    function ButtonAnim_csjc() {
        var _this = _super.call(this) || this;
        _this.useSound_csjc = true;
        return _this;
    }
    ButtonAnim_csjc.prototype.onAwake = function () {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown_csjc);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp_csjc);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp_csjc);
    };
    ButtonAnim_csjc.prototype.onDisable = function () {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    };
    ButtonAnim_csjc.prototype.onDown_csjc = function () {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if (this.useSound_csjc) {
            SoundMgr_1.default.instance_csjc.playSound_csjc("anniu");
        }
    };
    ButtonAnim_csjc.prototype.onUp_csjc = function () {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    };
    return ButtonAnim_csjc;
}(Laya.Script));
exports.default = ButtonAnim_csjc;
},{"../Mgr/SoundMgr":10}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UniversalBottomZone_csjc = /** @class */ (function (_super) {
    __extends(UniversalBottomZone_csjc, _super);
    function UniversalBottomZone_csjc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniversalBottomZone_csjc.prototype.onAwake = function () {
        this._ownerSprite_csjc = this.owner;
        this._autoZone_csjc = this._ownerSprite_csjc.getChildByName("AutoZone");
        this._loopADZone_csjc = this._ownerSprite_csjc.getChildByName("LoopAD");
        this._bannerADZone_csjc = this._ownerSprite_csjc.getChildByName("BannerAD");
    };
    UniversalBottomZone_csjc.prototype.onEnable = function () {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._autoZone_csjc.bottom = this._loopADZone_csjc.height + this._bannerADZone_csjc.height;
            this._loopADZone_csjc.bottom = this._bannerADZone_csjc.height;
            this._bannerADZone_csjc.visible = true;
        }
        else {
            this._autoZone_csjc.bottom = this._loopADZone_csjc.height;
            this._loopADZone_csjc.bottom = 0;
            this._bannerADZone_csjc.visible = false;
        }
    };
    UniversalBottomZone_csjc.prototype.onDisable = function () {
    };
    UniversalBottomZone_csjc.prototype.onUpdate = function () {
        if (!this._bannerADZone_csjc.visible) {
            this._bannerADZone_csjc.onDisable();
        }
    };
    return UniversalBottomZone_csjc;
}(Laya.Script));
exports.default = UniversalBottomZone_csjc;
},{}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var WudianView_1 = require("./WudianView");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var User_1 = require("../../User/User");
var AdDataMgr_1 = require("../../QpAPI/AdDataMgr");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var Export1AdView = /** @class */ (function (_super) {
    __extends(Export1AdView, _super);
    function Export1AdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipBtnMove = false;
        _this._hideFirst = true;
        _this._wudianTpye = 2;
        return _this;
    }
    Object.defineProperty(Export1AdView.prototype, "NeedWudian", {
        get: function () {
            var swc = QpGameSwitch_1.default.GameSwitch.bannerWudian == 1;
            var wudianSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            console.log("wd\u529F\u80FD\u603B\u5F00\u5173wudianSwitch: " + wudianSwitch + "\uFF0C\u5206\u5F00\u5173bannerWudian\uFF1A" + swc);
            return swc && wudianSwitch;
        },
        enumerable: true,
        configurable: true
    });
    Export1AdView.prototype.OnSkipBtn = function () {
        this.closeView();
        if (ViewMgr_1.default.instance_csjc.getView_csjc(ViewMgr_1.ViewDef_csjc.InGameView)) {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.InGameView);
        }
        else if (this._data == null) {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView);
        }
        else if (this._data.Win) {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.GameOverWinView);
        }
        else {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.GameOverFailView);
        }
    };
    Export1AdView.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    };
    Export1AdView.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (User_1.default.getLeveNum_csjc() == 1) {
            TmAPI_1.default.SendEvent("GameStep", { Step: 4 });
        }
        var skeleton = new Laya.Skeleton();
        //添加到舞台
        this.owner.addChild(skeleton);
        skeleton.pos(700, 350);
        //通过加载直接创建动画
        skeleton.load("subRes/sk/NewProject.sk", Laya.Handler.create(this, function (sk) {
            sk.scaleX = 0.5;
            sk.scaleY = 0.5;
        }));
        if (Laya.Browser.onMiniGame) {
            console.log("\u81EA\u52A8\u8DF3\u529F\u80FD\u5C4F\u853D" + ExamineMgr_1.default.CanDoScz_Wx + ",\u5F00\u5173" + (QpGameSwitch_1.default.GameSwitch.popAd == 1));
            if (ExamineMgr_1.default.CanDoScz_Wx && QpGameSwitch_1.default.GameSwitch.popAd == 1) {
                var arr = AdDataMgr_1.AdDataMgr.Instance.GetDataByStyleAndCount(AdDataMgr_1.ComponentStyle.h_slider, 10);
                if (arr.length > 0) {
                    var game = arr[Math.floor(Math.random() * arr.length)];
                    if (game) {
                        AdDataMgr_1.AdDataMgr.Instance.NavigateTo(AdDataMgr_1.ComponentStyle.h_slider, game);
                    }
                }
            }
        }
    };
    return Export1AdView;
}(WudianView_1.default));
exports.default = Export1AdView;
},{"../../CommomAPI/ExamineMgr":2,"../../Mgr/ViewMgr":12,"../../QpAPI/AdDataMgr":21,"../../QpAPI/QpGameSwitch":30,"../../TmAPI/TmAPI":62,"../../User/User":64,"./WudianView":80}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var WudianView_1 = require("./WudianView");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var GameMgr_1 = require("../../Scripts/GameMgr");
var User_1 = require("../../User/User");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var Export2AdView = /** @class */ (function (_super) {
    __extends(Export2AdView, _super);
    function Export2AdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipBtnMove = false;
        _this._hideFirst = false;
        _this._wudianTpye = 2;
        return _this;
    }
    Object.defineProperty(Export2AdView.prototype, "NeedWudian", {
        get: function () {
            var swc = QpGameSwitch_1.default.GameSwitch.bannerWudian == 1;
            var wudianSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            console.log("wd\u529F\u80FD\u603B\u5F00\u5173wudianSwitch: " + wudianSwitch + "\uFF0C\u5206\u5F00\u5173bannerWudian\uFF1A" + swc);
            return swc && wudianSwitch;
        },
        enumerable: true,
        configurable: true
    });
    Export2AdView.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        GameMgr_1.default.getInstance().CreatNextGameScene();
    };
    Export2AdView.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    };
    Export2AdView.prototype.OnSkipBtn = function () {
        this.closeView();
        ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView);
    };
    Export2AdView.prototype.onStart = function () {
        var skeleton = new Laya.Skeleton();
        //添加到舞台
        this.owner.addChild(skeleton);
        skeleton.pos(700, 350);
        //通过加载直接创建动画
        skeleton.load("subRes/sk/NewProject.sk", Laya.Handler.create(this, function (sk) {
            sk.scaleX = 0.5;
            sk.scaleY = 0.5;
        }));
        if (User_1.default.getLeveNum_csjc() <= 2) {
            TmAPI_1.default.SendEvent("GameStep", { Step: 6 });
        }
    };
    return Export2AdView;
}(WudianView_1.default));
exports.default = Export2AdView;
},{"../../Mgr/ViewMgr":12,"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameMgr":48,"../../TmAPI/TmAPI":62,"../../User/User":64,"./WudianView":80}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var WudianView_1 = require("./WudianView");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var AdDataMgr_1 = require("../../QpAPI/AdDataMgr");
var Export3AdView = /** @class */ (function (_super) {
    __extends(Export3AdView, _super);
    function Export3AdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipBtnMove = true;
        _this._hideFirst = true;
        _this._wudianTpye = 2;
        _this.onCloseEvent = function () {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.Export1AdView);
        };
        return _this;
    }
    Export3AdView.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._btn1 = this.owner.getChildByName("BG").getChildByName("Btn1");
        this._btn2 = this.owner.getChildByName("BG").getChildByName("Btn2");
        if (Laya.Browser.onMiniGame) {
            var arr = AdDataMgr_1.AdDataMgr.Instance.GetDataByStyleAndCount(AdDataMgr_1.ComponentStyle.h_slider, 10);
            if (arr.length > 0) {
                this._game1 = arr[Math.floor(Math.random() * arr.length)];
                this._game2 = arr[Math.floor(Math.random() * arr.length)];
            }
        }
    };
    Object.defineProperty(Export3AdView.prototype, "NeedWudian", {
        get: function () {
            var swc = QpGameSwitch_1.default.GameSwitch.bannerWudian == 1;
            var wudianSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            console.log("wd\u529F\u80FD\u603B\u5F00\u5173wudianSwitch: " + wudianSwitch + "\uFF0C\u5206\u5F00\u5173bannerWudian\uFF1A" + swc);
            return swc && wudianSwitch;
        },
        enumerable: true,
        configurable: true
    });
    Export3AdView.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.closeView);
        this._btn1.on(Laya.Event.CLICK, this, this.Game1);
        this._btn2.on(Laya.Event.CLICK, this, this.Game2);
    };
    Export3AdView.prototype.OnSkipBtn = function () {
        this.closeView();
    };
    Export3AdView.prototype.Game1 = function () {
        if (Laya.Browser.onMiniGame) {
            if (this._game1) {
                AdDataMgr_1.AdDataMgr.Instance.NavigateTo(AdDataMgr_1.ComponentStyle.h_slider, this._game1);
            }
        }
    };
    Export3AdView.prototype.Game2 = function () {
        if (Laya.Browser.onMiniGame) {
            if (this._game2) {
                AdDataMgr_1.AdDataMgr.Instance.NavigateTo(AdDataMgr_1.ComponentStyle.h_slider, this._game2);
            }
        }
    };
    return Export3AdView;
}(WudianView_1.default));
exports.default = Export3AdView;
},{"../../Mgr/ViewMgr":12,"../../QpAPI/AdDataMgr":21,"../../QpAPI/QpGameSwitch":30,"./WudianView":80}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameMgr_1 = require("../../Scripts/GameMgr");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var FirstViewAd = /** @class */ (function (_super) {
    __extends(FirstViewAd, _super);
    function FirstViewAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstViewAd.prototype.onStart = function () {
        if ((GameMgr_1.default.getInstance().FirstAd == false && QpGameSwitch_1.default.customkey.indexAd != 2) || QpGameSwitch_1.default.customkey.indexAd == 0) {
            this.owner.visible = false;
        }
    };
    return FirstViewAd;
}(Laya.Script));
exports.default = FirstViewAd;
},{"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameMgr":48}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var WudianView_1 = require("./WudianView");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var User_1 = require("../../User/User");
var GameMgr_1 = require("../../Scripts/GameMgr");
var FriendExport = /** @class */ (function (_super) {
    __extends(FriendExport, _super);
    function FriendExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipBtnMove = false;
        _this._hideFirst = true;
        _this._wudianTpye = 2;
        return _this;
    }
    Object.defineProperty(FriendExport.prototype, "NeedWudian", {
        get: function () {
            var swc = QpGameSwitch_1.default.GameSwitch.bannerWudian == 1;
            var wudianSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            console.log("wd\u529F\u80FD\u603B\u5F00\u5173wudianSwitch: " + wudianSwitch + "\uFF0C\u5206\u5F00\u5173bannerWudian\uFF1A" + swc);
            return swc && wudianSwitch;
        },
        enumerable: true,
        configurable: true
    });
    FriendExport.prototype.OnSkipBtn = function () {
        this.closeView();
    };
    FriendExport.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    };
    FriendExport.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (User_1.default.getLeveNum_csjc() == 1) {
            TmAPI_1.default.SendEvent("GameStep", { Step: 5 });
        }
        this.owner.addChild(GameMgr_1.default.getInstance().Context);
        GameMgr_1.default.getInstance().Context.postMsg({ cmd: "OpenExport", data: { width: Laya.stage.width, height: Laya.stage.height } });
    };
    FriendExport.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport2AdView);
    };
    FriendExport.prototype.onDestroy = function () {
        GameMgr_1.default.getInstance().Context.removeSelf();
        _super.prototype.onDestroy.call(this);
    };
    return FriendExport;
}(WudianView_1.default));
exports.default = FriendExport;
},{"../../Mgr/ViewMgr":12,"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameMgr":48,"../../TmAPI/TmAPI":62,"../../User/User":64,"./WudianView":80}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var User_1 = require("../../User/User");
var GameOverWinVIew_1 = require("./GameOverWinVIew");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var GameMgr_1 = require("../../Scripts/GameMgr");
var GameOverFailView = /** @class */ (function (_super) {
    __extends(GameOverFailView, _super);
    function GameOverFailView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOverFailView.prototype.GetReward = function () {
        var _this = this;
        if (!ExamineMgr_1.default.CanDoScz_Wx) {
            this.closeView();
            GameMgr_1.default.getInstance().CreatGameScene();
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView);
        }
        else {
            this._skipBtn.mouseEnabled = false;
            var p = new Laya.Point(100, 100);
            this._money.localToGlobal(p, false);
            User_1.default.addMoney_csjc(100, p);
            Laya.timer.once(1500, this, function () {
                _this.closeView();
                console.log("\u597D\u53CB\u70ED\u73A9" + ExamineMgr_1.default.CanDoScz_Wx + ",\u5F00\u5173" + (QpGameSwitch_1.default.GameSwitch.indexPanel == 1));
                if (ExamineMgr_1.default.CanDoScz_Wx && QpGameSwitch_1.default.GameSwitch.indexPanel == 1) {
                    ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.FriendExportView);
                }
                else {
                    ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport2AdView);
                }
            });
        }
    };
    GameOverFailView.prototype.SendGameResult = function () {
        TmAPI_1.default.SendEvent("GameResult", { Level: User_1.default.getLeveNum_csjc(), Result: 0 });
    };
    return GameOverFailView;
}(GameOverWinVIew_1.default));
exports.default = GameOverFailView;
},{"../../CommomAPI/ExamineMgr":2,"../../Mgr/ViewMgr":12,"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameMgr":48,"../../TmAPI/TmAPI":62,"../../User/User":64,"./GameOverWinVIew":75}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianView_1 = require("./WudianView");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var User_1 = require("../../User/User");
var SceneMgr_1 = require("../../Scripts/GameCore/SceneMgr");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var GameMgr_1 = require("../../Scripts/GameMgr");
var GameOverWinView = /** @class */ (function (_super) {
    __extends(GameOverWinView, _super);
    function GameOverWinView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipBtnMove = false;
        _this._hideFirst = true;
        _this._wudianTpye = 2;
        return _this;
    }
    Object.defineProperty(GameOverWinView.prototype, "NeedWudian", {
        get: function () {
            var swc = QpGameSwitch_1.default.GameSwitch.bannerWudian == 1;
            var wudianSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            console.log("wd\u529F\u80FD\u603B\u5F00\u5173wudianSwitch: " + wudianSwitch + "\uFF0C\u5206\u5F00\u5173bannerWudian\uFF1A" + swc);
            return swc && wudianSwitch;
        },
        enumerable: true,
        configurable: true
    });
    GameOverWinView.prototype.OnSkipBtn = function () {
        this.GetReward();
    };
    GameOverWinView.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    };
    GameOverWinView.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._money = this.owner.getChildByName("Money");
        this._enemyCount = this.owner.getChildByName("Destory").getChildByName("EnemyCount");
        this._enemyCount.value = (SceneMgr_1.default.Instance.EnemyKillCount) + "/" + SceneMgr_1.default.Instance.EnemCount;
        this.SendGameResult();
        if (!ExamineMgr_1.default.CanDoScz_Wx) {
            this._money.visible = false;
        }
    };
    GameOverWinView.prototype.GetReward = function () {
        var _this = this;
        if (!ExamineMgr_1.default.CanDoScz_Wx) {
            this.closeView();
            GameMgr_1.default.getInstance().CreatNextGameScene();
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView);
        }
        else {
            this._skipBtn.mouseEnabled = false;
            var p = new Laya.Point(100, 100);
            this._money.localToGlobal(p, false);
            User_1.default.addMoney_csjc(500, p);
            Laya.timer.once(1500, this, function () {
                _this.closeView();
                console.log("\u597D\u53CB\u70ED\u73A9" + ExamineMgr_1.default.CanDoScz_Wx + ",\u5F00\u5173" + (QpGameSwitch_1.default.GameSwitch.indexPanel == 1));
                if (ExamineMgr_1.default.CanDoScz_Wx && QpGameSwitch_1.default.GameSwitch.indexPanel == 1) {
                    ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.FriendExportView);
                }
                else {
                    ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport2AdView);
                }
            });
        }
    };
    GameOverWinView.prototype.SendGameResult = function () {
        TmAPI_1.default.SendEvent("GameResult", { Level: User_1.default.getLeveNum_csjc(), Result: 1 });
    };
    return GameOverWinView;
}(WudianView_1.default));
exports.default = GameOverWinView;
},{"../../CommomAPI/ExamineMgr":2,"../../Mgr/ViewMgr":12,"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameCore/SceneMgr":47,"../../Scripts/GameMgr":48,"../../TmAPI/TmAPI":62,"../../User/User":64,"./WudianView":80}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianView_1 = require("./WudianView");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var User_1 = require("../../User/User");
var SceneMgr_1 = require("../../Scripts/GameCore/SceneMgr");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var GameMgr_1 = require("../../Scripts/GameMgr");
var GameOverWinView = /** @class */ (function (_super) {
    __extends(GameOverWinView, _super);
    function GameOverWinView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipBtnMove = false;
        _this._hideFirst = true;
        _this._wudianTpye = 2;
        return _this;
    }
    Object.defineProperty(GameOverWinView.prototype, "NeedWudian", {
        get: function () {
            var swc = QpGameSwitch_1.default.GameSwitch.bannerWudian == 1;
            var wudianSwitch = QpGameSwitch_1.default.GameSwitch.wudianSwitch == 1;
            console.log("wd\u529F\u80FD\u603B\u5F00\u5173wudianSwitch: " + wudianSwitch + "\uFF0C\u5206\u5F00\u5173bannerWudian\uFF1A" + swc);
            return swc && wudianSwitch;
        },
        enumerable: true,
        configurable: true
    });
    GameOverWinView.prototype.OnSkipBtn = function () {
        this.GetReward();
    };
    GameOverWinView.prototype.addEvent = function () {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    };
    GameOverWinView.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._money = this.owner.getChildByName("Money");
        this._enemyCount = this.owner.getChildByName("Destory").getChildByName("EnemyCount");
        this._enemyCount.value = (SceneMgr_1.default.Instance.EnemyKillCount) + "/" + SceneMgr_1.default.Instance.EnemCount;
        this.SendGameResult();
        if (!ExamineMgr_1.default.CanDoScz_Wx) {
            this._money.visible = false;
        }
    };
    GameOverWinView.prototype.GetReward = function () {
        var _this = this;
        if (!ExamineMgr_1.default.CanDoScz_Wx) {
            this.closeView();
            GameMgr_1.default.getInstance().CreatNextGameScene();
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.MainGameView);
        }
        else {
            this._skipBtn.mouseEnabled = false;
            var p = new Laya.Point(100, 100);
            this._money.localToGlobal(p, false);
            User_1.default.addMoney_csjc(500, p);
            Laya.timer.once(1500, this, function () {
                _this.closeView();
                console.log("\u597D\u53CB\u70ED\u73A9" + ExamineMgr_1.default.CanDoScz_Wx + ",\u5F00\u5173" + (QpGameSwitch_1.default.GameSwitch.indexPanel == 1));
                if (ExamineMgr_1.default.CanDoScz_Wx && QpGameSwitch_1.default.GameSwitch.indexPanel == 1) {
                    ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.FriendExportView);
                }
                else {
                    ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport2AdView);
                }
            });
        }
    };
    GameOverWinView.prototype.SendGameResult = function () {
        TmAPI_1.default.SendEvent("GameResult", { Level: User_1.default.getLeveNum_csjc(), Result: 1 });
    };
    return GameOverWinView;
}(WudianView_1.default));
exports.default = GameOverWinView;
},{"../../CommomAPI/ExamineMgr":2,"../../Mgr/ViewMgr":12,"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameCore/SceneMgr":47,"../../Scripts/GameMgr":48,"../../TmAPI/TmAPI":62,"../../User/User":64,"./WudianView":80}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var SceneMgr_1 = require("../../Scripts/GameCore/SceneMgr");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var User_1 = require("../../User/User");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var CachedWXBannerAd_1 = require("../../PlatformApi/CachedWXBannerAd");
var InGameView = /** @class */ (function (_super) {
    __extends(InGameView, _super);
    function InGameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._gameOver = false;
        _this.onCloseEvent = function () {
            CachedWXBannerAd_1.default.hide_csjc();
            SoundMgr_1.default.instance_csjc.stopBGM_csjc();
            // SceneMgr_cscj.Instance.Player.StopSound();
            if (User_1.default.getLeveNum_csjc() == 1) {
                TmAPI_1.default.SendEvent("GameStep", { Step: 3 });
            }
        };
        return _this;
    }
    InGameView.prototype.onAwake = function () {
        this._moreGameBtn = this.owner.getChildByName("MoreGameBtn");
        this._tutorialBtn = this.owner.getChildByName("TutorialBtn");
        this._complete = this.owner.getChildByName("Complete");
        this._fail = this.owner.getChildByName("Fail");
        this._complete.visible = false;
        this._fail.visible = false;
        if (ExamineMgr_1.default.CanDoScz_Wx) {
            this.ShowBanner();
        }
    };
    InGameView.prototype.addEvent = function () {
        this._tutorialBtn.on(Laya.Event.CLICK, this, this.OnTutorialBtn);
        this._moreGameBtn.on(Laya.Event.CLICK, this, this.OnMoreGameBtn);
    };
    InGameView.prototype.onStart = function () {
        SoundMgr_1.default.instance_csjc.playBGM_csjc("Bgm2");
        if (User_1.default.getLeveNum_csjc() == 1) {
            TmAPI_1.default.SendEvent("GameStep", { Step: 2 });
        }
        // Scene3dMgr.Camera.viewport.project(Scene3dMgr.Monster.transform.position, Scene3dMgr.Camera.projectionViewMatrix, this.outpos)
        // subNum.pos(this.outpos.x / Laya.stage.clientScaleX ,this.outpos.y / Laya.stage.clientScaleY)
    };
    InGameView.prototype.OnMoreGameBtn = function () {
        SceneMgr_1.default.Instance.PauseGame();
        ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport1AdView);
    };
    InGameView.prototype.OnTutorialBtn = function () {
        SceneMgr_1.default.Instance.PauseGame();
        ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.TutorialView);
    };
    InGameView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        // SceneMgr_cscj.Instance.StartGame();
        ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.SelectHero);
    };
    InGameView.prototype.onUpdate = function () {
        var _this = this;
        if (this._gameOver || SceneMgr_1.default.Instance.GameOver == 0)
            return;
        this._gameOver = true;
        if (SceneMgr_1.default.Instance.GameOver == 1) {
            this._complete.visible = true;
        }
        else if (SceneMgr_1.default.Instance.GameOver == -1) {
            this._fail.visible = true;
        }
        Laya.timer.once(3000, this, function () {
            if (SceneMgr_1.default.Instance.GameOver == 1) {
                _this.GameOver(true);
            }
            else if (SceneMgr_1.default.Instance.GameOver == -1) {
                _this.GameOver(false);
            }
        });
    };
    InGameView.prototype.GameOver = function (win) {
        this.closeView();
        if (ExamineMgr_1.default.CanDoScz_Wx) {
            var data = { Win: false };
            if (win) {
                data.Win = true;
            }
            else {
                data.Win = false;
            }
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport1AdView, data);
        }
        else {
            if (win) {
                ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.GameOverWinView);
            }
            else {
                ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.GameOverFailView);
            }
        }
    };
    InGameView.prototype.ShowBanner = function () {
        var _this = this;
        var rd = Math.random() * 5000;
        Laya.timer.once(15000 + rd, this, function () {
            // let rd = Math.random();
            // if (rd <= 0.33) {
            //     rd = -1
            // }
            // else if (rd > 0.33 && rd <= 0.66) {
            //     rd = 0;
            // }
            // else {
            //     rd = 1;
            // }
            CachedWXBannerAd_1.default.changeShow_csjc(0);
            Laya.timer.once(2500, _this, function () {
                CachedWXBannerAd_1.default.hide_csjc();
                _this.ShowBanner();
            });
        });
    };
    return InGameView;
}(ViewBase_1.default));
exports.default = InGameView;
},{"../../CommomAPI/ExamineMgr":2,"../../Mgr/SoundMgr":10,"../../Mgr/ViewMgr":12,"../../PlatformApi/CachedWXBannerAd":17,"../../Scripts/GameCore/SceneMgr":47,"../../TmAPI/TmAPI":62,"../../User/User":64,"../../View/ViewBase":87}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var TmAPI_1 = require("../../TmAPI/TmAPI");
var User_1 = require("../../User/User");
var CachedWXBannerAd_1 = require("../../PlatformApi/CachedWXBannerAd");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var WXAPI_1 = require("../../PlatformApi/WXAPI");
var GameMgr_1 = require("../../Scripts/GameMgr");
var MainGameView = /** @class */ (function (_super) {
    __extends(MainGameView, _super);
    function MainGameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCloseEvent = function () {
            GameMgr_1.default.getInstance().FirstAd = true;
            CachedWXBannerAd_1.default.hide_csjc();
        };
        return _this;
    }
    MainGameView.prototype.onAwake = function () {
        this._aniZone = this.owner.getChildByName("AniZone");
        this._ani1 = this._aniZone.getChildByName("Robot");
        this._ani2 = this._aniZone.getChildByName("Car");
        // this._ani1.skin = "subRes/image/img_jiqiren.png";
        this._loopAd = this.owner.getChildByName("BottomLoopAd");
        // this._ani2.skin = "subRes/image/img_che.png";
        // if (!ExamineMgr.CanDoScz_Wx) {
        //     this._ani1.visible = false;
        // }
        this._startBtn = this.owner.getChildByName("StartBtn");
        this._moreGameBtn = this.owner.getChildByName("MoreGameBtn");
    };
    MainGameView.prototype.onStart = function () {
        if (User_1.default.getLeveNum_csjc() == 1) {
            TmAPI_1.default.SendEvent("GameStep", { Step: 1 });
        }
        if (Laya.Browser.onMiniGame) {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var dpr = Laya.stage.width / sw;
            console.log(sysInfo.screenWidth, sysInfo.screenHeight);
            this._loopAd.left = Laya.stage.width - ((sw - 350) * dpr);
        }
        else {
            this._loopAd.left = Laya.stage.width - 350;
        }
    };
    MainGameView.prototype.addEvent = function () {
        this._startBtn.on(Laya.Event.CLICK, this, this.OnStartBtn);
        this._moreGameBtn.on(Laya.Event.CLICK, this, this.OnMoreGameBtn);
    };
    MainGameView.prototype.OnStartBtn = function () {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            if (ExamineMgr_1.default.CanDoKd_Wx && QpGameSwitch_1.default.customkey.startVideo == 1) {
                WXAPI_1.default.showRewardedVideoAd_csjc(function () {
                    _this.StartGame();
                }, function () {
                    _this.StartGame();
                });
            }
            else {
                this.StartGame();
            }
        }
        else {
            this.StartGame();
        }
    };
    MainGameView.prototype.StartGame = function () {
        this.closeView();
        if (ExamineMgr_1.default.CanDoScz_Wx && QpGameSwitch_1.default.GameSwitch.bannerKuangdian1 == 1) {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.KdBannerView);
        }
        else {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.InGameView);
        }
    };
    MainGameView.prototype.OnMoreGameBtn = function () {
        this.closeView();
        ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.HExport1AdView);
        // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.FriendExportView);
    };
    MainGameView.prototype.onShow = function () {
        var _this = this;
        _super.prototype.onShow.call(this);
        CachedWXBannerAd_1.default.changeShow_csjc(-1);
        SoundMgr_1.default.instance_csjc.playBGM_csjc("Bgm2");
        Laya.timer.once(500, this, function () {
            Laya.Tween.to(_this._ani1, { right: 0 }, 500);
            Laya.Tween.to(_this._ani2, { left: -51 }, 500);
        });
    };
    return MainGameView;
}(ViewBase_1.default));
exports.default = MainGameView;
},{"../../CommomAPI/ExamineMgr":2,"../../Mgr/SoundMgr":10,"../../Mgr/ViewMgr":12,"../../PlatformApi/CachedWXBannerAd":17,"../../PlatformApi/WXAPI":20,"../../QpAPI/QpGameSwitch":30,"../../Scripts/GameMgr":48,"../../TmAPI/TmAPI":62,"../../User/User":64,"../ViewBase":87}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var SceneMgr_1 = require("../../Scripts/GameCore/SceneMgr");
var Enums_1 = require("../../Scripts/GameCore/Enums");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SelectHero = /** @class */ (function (_super) {
    __extends(SelectHero, _super);
    function SelectHero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._heroSlt_0 = null;
        _this._heroSlt_1 = null;
        _this._select = null;
        _this._startBtn = null;
        return _this;
        // onStart() {
        // }
    }
    SelectHero.prototype.onAwake = function () {
        this._heroSlt_0 = this.owner.getChildByName("hero1");
        this._heroSlt_1 = this.owner.getChildByName("hero2");
        this._select = this.owner.getChildByName("select");
        this._startBtn = this.owner.getChildByName("start");
    };
    SelectHero.prototype.addEvent = function () {
        this._heroSlt_0.on(Laya.Event.CLICK, this, this.clickKingKong);
        this._heroSlt_1.on(Laya.Event.CLICK, this, this.clickTRex);
        this._startBtn.on(Laya.Event.CLICK, this, this.onPlayGame);
        this.clickKingKong();
    };
    SelectHero.prototype.removeEvent = function () {
        this._heroSlt_0.off(Laya.Event.CLICK, this, this.clickKingKong);
        this._heroSlt_1.off(Laya.Event.CLICK, this, this.clickTRex);
        this._startBtn.off(Laya.Event.CLICK, this, this.onPlayGame);
    };
    SelectHero.prototype.clickKingKong = function () {
        SceneMgr_1.default.Instance.PlayerKind = Enums_1.PlayerType.Kingkong;
        this._select.x = this._heroSlt_0.x;
    };
    SelectHero.prototype.clickTRex = function () {
        SceneMgr_1.default.Instance.PlayerKind = Enums_1.PlayerType.TRex;
        this._select.x = this._heroSlt_1.x;
    };
    SelectHero.prototype.onPlayGame = function () {
        SceneMgr_1.default.Instance.StartGame();
        this.closeView();
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.SelectHero);
    };
    return SelectHero;
}(ViewBase_1.default));
exports.default = SelectHero;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6,"../../Scripts/GameCore/Enums":38,"../../Scripts/GameCore/SceneMgr":47,"../ViewBase":87}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var QpGameSwitch_1 = require("../../QpAPI/QpGameSwitch");
var CachedWXBannerAd_1 = require("../../PlatformApi/CachedWXBannerAd");
var ExamineMgr_1 = require("../../CommomAPI/ExamineMgr");
var WudianView = /** @class */ (function (_super) {
    __extends(WudianView, _super);
    function WudianView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wudianTpye = 2;
        _this._hideFirst = false;
        _this._skipBtnMove = true;
        _this._bannerShowTime = 0;
        _this.onOpenEvent = function () {
            console.log("BtnMovetime:" + QpGameSwitch_1.default.GameSwitch.btnMoveTimer + ",bannerMoveTimer:" + QpGameSwitch_1.default.GameSwitch.bannerMoveTimer);
            CachedWXBannerAd_1.default.hide_csjc();
            if (!ExamineMgr_1.default.CanDoScz_Wx) {
                if (_this._skipBtnMove) {
                    CachedWXBannerAd_1.default.changeShow_csjc(0);
                }
                return;
            }
            if (_this.NeedWudian) {
                if (_this._skipBtnMove) {
                    _this._skipBtn.bottom = 100;
                }
                _this._skipBtn.offAllCaller(_this);
                if (_this._hideFirst) {
                    if (QpGameSwitch_1.default.GameSwitch.btnShowTimer > 0) {
                        _this._skipBtn.visible = false;
                        Laya.timer.once(QpGameSwitch_1.default.GameSwitch.btnShowTimer * 1000, _this, function () {
                            _this._skipBtn.visible = true;
                            _this.SelectWudianMethod();
                        });
                    }
                    else {
                        _this.SelectWudianMethod();
                    }
                }
                else {
                    _this.SelectWudianMethod();
                }
            }
            else {
                if (_this._skipBtnMove) {
                    _this._skipBtn.bottom = 320;
                    CachedWXBannerAd_1.default.changeShow_csjc(0);
                    Laya.timer.once(500, _this, function () {
                        CachedWXBannerAd_1.default.changeShow_csjc(0);
                    });
                }
                if (QpGameSwitch_1.default.GameSwitch.btnShowTimer > 0) {
                    _this._skipBtn.visible = false;
                    Laya.timer.once(QpGameSwitch_1.default.GameSwitch.btnShowTimer * 1000, _this, function () {
                        _this._skipBtn.visible = true;
                    });
                }
            }
        };
        return _this;
    }
    WudianView.prototype.onAwake = function () {
        this._skipBtn = this.owner.getChildByName("SkipBtn");
    };
    WudianView.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        CachedWXBannerAd_1.default.hide_csjc();
    };
    WudianView.prototype.SelectWudianMethod = function () {
        if (this._wudianTpye == 1) {
            // console.log("WMethod1");
            // this._skipBtn.once(Laya.Event.CLICK, this, this.WudianMethod1);
            console.log("WMethod1");
            this._skipBtn.offAllCaller(this);
            var rdtime = Math.random() * 1000 + 500;
            Laya.timer.once(rdtime, this, this.FlashBanner2);
        }
        else {
            // console.log("WMethod2");
            // this.WudianMethod2();
            console.log("WMethod2");
            this._skipBtn.once(Laya.Event.CLICK, this, this.WudianMethod1);
        }
    };
    /*
        传统误点， 按下按键后开始触发,
     */
    WudianView.prototype.WudianMethod1 = function () {
        var _this = this;
        Laya.timer.clearAll(this);
        CachedWXBannerAd_1.default.hide_csjc();
        var time = QpGameSwitch_1.default.GameSwitch.btnMoveTimer;
        var time2 = QpGameSwitch_1.default.GameSwitch.bannerMoveTimer;
        if (time < 100) {
            time *= 1000;
        }
        if (time2 < 100) {
            time2 *= 1000;
        }
        Laya.timer.once(time, this, function () {
            if (_this._skipBtnMove) {
                _this._skipBtn.bottom = 320;
            }
            _this._skipBtn.on(Laya.Event.CLICK, _this, _this.OnSkipBtn);
        });
        Laya.timer.once(time2, this, this.FlashBanner1);
    };
    /*
        闪现误点， 不需要按键自动触发
    */
    WudianView.prototype.WudianMethod2 = function () {
        var _this = this;
        var time = QpGameSwitch_1.default.GameSwitch.btnMoveTimer;
        var time2 = QpGameSwitch_1.default.GameSwitch.bannerMoveTimer;
        if (time < 100) {
            time *= 1000;
        }
        if (time2 < 100) {
            time2 *= 1000;
        }
        Laya.timer.once(time, this, function () {
            if (_this._skipBtnMove) {
                _this._skipBtn.bottom = 320;
            }
            _this._skipBtn.on(Laya.Event.CLICK, _this, _this.OnSkipBtn);
        });
        Laya.timer.once(time2, this, this.FlashBanner1);
    };
    WudianView.prototype.FlashBanner1 = function () {
        CachedWXBannerAd_1.default.changeShow_csjc(0);
        if (!this._skipBtnMove) {
            Laya.timer.once(2200, this, function () {
                CachedWXBannerAd_1.default.hide_csjc();
            });
        }
        /* else {
            Laya.timer.once(500, this, () => {
                CachedWXBannerAd_csjc.changeShow_csjc();
            })
        } */
        // this._bannerShowTime++;
        // if (this._bannerShowTime > 3) {
        //     Laya.timer.clear(this, this.FlashBanner);
        // }
        // else {
        // }
    };
    WudianView.prototype.FlashBanner2 = function () {
        /* Laya.timer.once(700, this, () => {
            CachedWXBannerAd_csjc.hide_csjc();
        }) */
        CachedWXBannerAd_1.default.changeShow_csjc(0);
        Laya.timer.once(500, this, function () {
            CachedWXBannerAd_1.default.hide_csjc();
        });
        this._skipBtn.once(Laya.Event.CLICK, this, this.WudianMethod1);
        /* else {
            Laya.timer.once(500, this, () => {
                CachedWXBannerAd_csjc.changeShow_csjc();
            })
        } */
    };
    return WudianView;
}(ViewBase_1.default));
exports.default = WudianView;
},{"../../CommomAPI/ExamineMgr":2,"../../PlatformApi/CachedWXBannerAd":17,"../../QpAPI/QpGameSwitch":30,"../ViewBase":87}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isIViewStateListener_csjc(element) {
    if ((null != element.onViewShow && typeof (element.onViewShow) == "function")
        && (null != element.onViewHide && typeof (element.onViewHide) == "function")) {
        return true;
    }
    return false;
}
exports.isIViewStateListener_csjc = isIViewStateListener_csjc;
},{}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var LoadingView_csjc = /** @class */ (function (_super) {
    __extends(LoadingView_csjc, _super);
    function LoadingView_csjc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._processWidth_csjc = 0;
        return _this;
    }
    LoadingView_csjc.prototype.onAwake = function () {
        this._processBarBg_csjc = this.owner.getChildByName("ProcessBarBg");
        this._processBar_csjc = this._processBarBg_csjc.getChildByName("ProcessBar");
        this._processWidth_csjc = this._processBar_csjc.width;
        EventMgr_1.default.regOnceEvent_csjc(EventDef_1.EventDef_csjc.Game_GameSceneLoadCompelete_csjc, this, this.FinishLoading_csjc);
    };
    LoadingView_csjc.prototype.onUpdate = function () {
        if (this._processBar_csjc.width < this._currentProcess_csjc) {
            var speed = Math.floor((this._currentProcess_csjc - this._processBar_csjc.width) / 100);
            this._processBar_csjc.width += (5 + speed);
            if (this._processBar_csjc.width > this._currentProcess_csjc) {
                this._processBar_csjc.width = this._currentProcess_csjc;
            }
        }
    };
    LoadingView_csjc.prototype.onDestroy = function () {
        EventMgr_1.default.removeEvent_csjc(EventDef_1.EventDef_csjc.Game_GameSceneLoadCompelete_csjc, this, this.FinishLoading_csjc);
    };
    /**
     * 设置进度
     *
     * @param {number} process
     * @memberof LoadingView
     */
    LoadingView_csjc.prototype.setProcess_csjc = function (process) {
        if (process < 0)
            process = 0;
        if (process > 1)
            process = 1;
        this._currentProcess_csjc = this._processWidth_csjc * process;
    };
    /**
     * 此方法用来关闭loading界面,会先将进度条进度置为1然后停顿100毫秒再消失，给用户一个进度条加载良好的感觉
     * 如果不想用此方法,在其他代码中直接调用EventMgr.dispatch(EventDef.App_CloseFirstLoadingView)即可
     *
     * @memberof LoadingView
     */
    LoadingView_csjc.prototype.FinishLoading_csjc = function () {
        this._processBar_csjc.width = this._processWidth_csjc;
        Laya.timer.once(200, this, function () {
            EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.App_CloseFirstLoadingView_csjc);
        });
    };
    return LoadingView_csjc;
}(Laya.Script));
exports.default = LoadingView_csjc;
},{"../../Event/EventDef":5,"../../Event/EventMgr":6}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var OPPOAPI_1 = require("../../PlatformApi/OPPOAPI");
var GameSwitch_1 = require("../../CommomAPI/GameSwitch/GameSwitch");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var OppoNativeAdView_csjc = /** @class */ (function (_super) {
    __extends(OppoNativeAdView_csjc, _super);
    function OppoNativeAdView_csjc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeAd_csjc = null;
        _this._curAdItem_csjc = null;
        _this._reTry_csjc = false;
        _this.onCloseEvent = function () {
            ViewMgr_1.default.instance_csjc.openView_csjc(ViewMgr_1.ViewDef_csjc.InGameView);
        };
        return _this;
    }
    OppoNativeAdView_csjc.prototype.onAwake = function () {
        this._centerZone_csjc = this.owner.getChildByName("CenterZone");
        this._display_csjc = this._centerZone_csjc.getChildByName("Display");
        this._okBtn_csjc = this._centerZone_csjc.getChildByName("OkBtn");
        this._closeBtn_csjc = this._centerZone_csjc.getChildByName("CloseBtn");
        this._title_Text_csjc = this._centerZone_csjc.getChildByName("Title_Text");
        this._desc_Text_csjc = this._centerZone_csjc.getChildByName("Desc_Text");
    };
    OppoNativeAdView_csjc.prototype.onStart = function () {
        this.loadAd_csjc();
    };
    OppoNativeAdView_csjc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._okBtn_csjc.on(Laya.Event.CLICK, this, this.onOkBtn_csjc);
        this._closeBtn_csjc.on(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.on(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    };
    OppoNativeAdView_csjc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._okBtn_csjc.off(Laya.Event.CLICK, this, this.onOkBtn_csjc);
        this._closeBtn_csjc.off(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.off(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    };
    OppoNativeAdView_csjc.prototype.loadAd_csjc = function () {
        var _this = this;
        var self = this;
        if (Laya.Browser.onQGMiniGame) {
            this._closeBtn_csjc.visible = false;
            if (this._nativeAd_csjc) {
                this._nativeAd_csjc.destroy();
                this._nativeAd_csjc = null;
            }
            this._curAdItem_csjc = null;
            this._nativeAd_csjc = qg.createNativeAd({
                posId: OPPOAPI_1.default.GetNativeAd_csjc
            });
            this._nativeAd_csjc.load();
            this._nativeAd_csjc.onLoad(function (res) {
                console.log("原生广告加载成功：", res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i) {
                    var ad = adlist[i];
                    console.log("原生广告数据：", i);
                    for (var key in ad) {
                        console.log(key, ad[key]);
                    }
                }
                _this._curAdItem_csjc = adlist[Math.floor(Math.random() * adlist.length)];
                if (null != _this._curAdItem_csjc) {
                    for (var i = 0; i < _this._curAdItem_csjc.imgUrlList.length; ++i) {
                        console.log("imgUrlList : ", i + " ", _this._curAdItem_csjc.imgUrlList[i]);
                    }
                    var imgulr = _this._curAdItem_csjc.imgUrlList[Math.floor(Math.random() * _this._curAdItem_csjc.imgUrlList.length)];
                    self._display_csjc.loadImage(imgulr, Laya.Handler.create(self, function () {
                        self._title_Text_csjc.text = _this._curAdItem_csjc.title;
                        self._desc_Text_csjc.text = _this._curAdItem_csjc.desc;
                        self._nativeAd_csjc.reportAdShow({
                            adId: self._curAdItem_csjc.adId
                        });
                    }));
                    console.log("加载图片", imgulr);
                }
                self.showCenterZone_csjc();
            });
            this._nativeAd_csjc.onError(function (res) {
                console.log("原生广告加载失败：", res);
                for (var key in res) {
                    console.log(key, res[key]);
                }
                if (!_this._reTry_csjc) {
                    _this._reTry_csjc = true;
                    _this._centerZone_csjc.visible = false;
                    Laya.timer.once(1000, self, function () {
                        console.log("原生广告重新加载");
                        self.loadAd_csjc();
                    });
                }
                else {
                    self.closeView();
                }
            });
        }
        else {
            self.closeView();
        }
    };
    OppoNativeAdView_csjc.prototype.onCloseBtn_csjc = function () {
        var rate = GameSwitch_1.default.CurrentConfig.oppoConf_csjc.yuanshengWudian_csjc;
        if (Math.random() <= rate) {
            if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
                console.log("点击上报！！！");
                this._nativeAd_csjc.reportAdClick({
                    adId: this._curAdItem_csjc.adId
                });
            }
        }
        this.closeView();
    };
    OppoNativeAdView_csjc.prototype.onOkBtn_csjc = function () {
        if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
            console.log("点击上报！！！");
            this._nativeAd_csjc.reportAdClick({
                adId: this._curAdItem_csjc.adId
            });
        }
    };
    OppoNativeAdView_csjc.prototype.onDisplayClick_csjc = function () {
        if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
            console.log("点击上报！！！");
            this._nativeAd_csjc.reportAdClick({
                adId: this._curAdItem_csjc.adId
            });
        }
    };
    OppoNativeAdView_csjc.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (Laya.Browser.onQGMiniGame) {
            if (this._nativeAd_csjc) {
                this._nativeAd_csjc.destroy();
            }
            this._nativeAd_csjc = null;
            this._curAdItem_csjc = null;
        }
    };
    OppoNativeAdView_csjc.prototype.showCenterZone_csjc = function () {
        var _this = this;
        this._centerZone_csjc.visible = true;
        var time = GameSwitch_1.default.CurrentConfig.oppoConf_csjc.yuanshengBtnShowTime_csjc * 1000;
        if (time > 0) {
            this._closeBtn_csjc.visible = false;
            Laya.timer.once(time, this, function () {
                _this._closeBtn_csjc.visible = true;
            });
        }
        else {
            this._closeBtn_csjc.visible = true;
        }
    };
    return OppoNativeAdView_csjc;
}(ViewBase_1.default));
exports.default = OppoNativeAdView_csjc;
},{"../../CommomAPI/GameSwitch/GameSwitch":3,"../../Mgr/ViewMgr":12,"../../PlatformApi/OPPOAPI":18,"../../View/ViewBase":87}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var TipsView_csjc = /** @class */ (function (_super) {
    __extends(TipsView_csjc, _super);
    function TipsView_csjc() {
        return _super.call(this) || this;
    }
    TipsView_csjc.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._tipsText = this._bg.getChildByName("Text");
    };
    TipsView_csjc.prototype.openView = function (data) {
        var _this = this;
        _super.prototype.openView.call(this, data);
        this.setTipsMsg(data);
        Laya.timer.clearAll(this);
        Laya.Tween.to(this._bg, { alpha: 0 }, 1500, Laya.Ease.quintIn, Laya.Handler.create(this, function () {
            _this.closeView();
        }));
    };
    TipsView_csjc.prototype.setTipsMsg = function (msg) {
        this._tipsText.text = msg;
    };
    return TipsView_csjc;
}(ViewBase_1.default));
exports.default = TipsView_csjc;
},{"../ViewBase":87}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TwinkleSprite_csjc = /** @class */ (function (_super) {
    __extends(TwinkleSprite_csjc, _super);
    function TwinkleSprite_csjc() {
        var _this = _super.call(this) || this;
        /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
        _this.TwinkleSpeed = 1000;
        /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
        _this.TwinkleMinSize = 0.95;
        /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
        _this.TwinkleMaxSize = 1.05;
        _this._aniForward_csjc = false;
        _this._fontSize_csjc = 25;
        _this._originSize_csjc = 1;
        return _this;
    }
    TwinkleSprite_csjc.prototype.onAwake = function () {
        this._displaySp_csjc = this.owner;
        this._disText_csjc = this.owner.getChildByName("TitelText");
        this._originSize_csjc = this._displaySp_csjc.scaleX;
        if (this._disText_csjc != null) {
            this._disText_csjc.text = "";
            this._fontSize_csjc = this._disText_csjc.fontSize;
        }
    };
    TwinkleSprite_csjc.prototype.onEnable = function () {
        this._displaySp_csjc.scale(this._originSize_csjc, this._originSize_csjc);
    };
    TwinkleSprite_csjc.prototype.onDisable = function () {
    };
    TwinkleSprite_csjc.prototype.onUpdate = function () {
        this.displayAni_csjc();
    };
    TwinkleSprite_csjc.prototype.displayAni_csjc = function () {
        if (!this._aniForward_csjc) {
            var scale = this._displaySp_csjc.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._originSize_csjc);
            this._displaySp_csjc.scale(scale, scale);
            if (this._displaySp_csjc.scaleX <= this.TwinkleMinSize * this._originSize_csjc) {
                this._aniForward_csjc = true;
            }
        }
        else {
            var scale = this._displaySp_csjc.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._originSize_csjc);
            this._displaySp_csjc.scale(scale, scale);
            if (this._displaySp_csjc.scaleX >= this.TwinkleMaxSize * this._originSize_csjc) {
                this._aniForward_csjc = false;
            }
        }
    };
    return TwinkleSprite_csjc;
}(Laya.Script));
exports.default = TwinkleSprite_csjc;
},{}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var GameSwitch_1 = require("../../CommomAPI/GameSwitch/GameSwitch");
var VIVOAPI_1 = require("../../PlatformApi/VIVOAPI");
var VivoNativeAdView_csjc = /** @class */ (function (_super) {
    __extends(VivoNativeAdView_csjc, _super);
    function VivoNativeAdView_csjc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeAd_csjc = null;
        _this._curAdItem_csjc = null;
        _this._reTry_csjc = false;
        return _this;
    }
    VivoNativeAdView_csjc.prototype.onAwake = function () {
        this._centerZone_csjc = this.owner.getChildByName("CenterZone");
        this._display_csjc = this._centerZone_csjc.getChildByName("Display");
        this._okBtn_csjc = this._centerZone_csjc.getChildByName("OkBtn");
        this._closeBtn_csjc = this._centerZone_csjc.getChildByName("CloseBtn");
        this._title_Text_csjc = this._centerZone_csjc.getChildByName("Title_Text");
        this._desc_Text_csjc = this._centerZone_csjc.getChildByName("Desc_Text");
    };
    VivoNativeAdView_csjc.prototype.onStart = function () {
        this.loadAd_csjc();
    };
    VivoNativeAdView_csjc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._okBtn_csjc.on(Laya.Event.CLICK, this, this.onOkBtn_csjc);
        this._closeBtn_csjc.on(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.on(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    };
    VivoNativeAdView_csjc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._okBtn_csjc.off(Laya.Event.CLICK, this, this.onOkBtn_csjc);
        this._closeBtn_csjc.off(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.off(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    };
    VivoNativeAdView_csjc.prototype.loadAd_csjc = function () {
        var _this = this;
        var self = this;
        if (Laya.Browser.onVVMiniGame) {
            // if (this._nativeAd && this._nativeAd.title != null) {
            //     this._nativeAd.destroy();
            this._nativeAd_csjc = null;
            // }
            this._curAdItem_csjc = null;
            this._nativeAd_csjc = qg.createNativeAd({
                posId: VIVOAPI_1.default.nativeAdId_csjc
            });
            this._nativeAd_csjc.onLoad(function (res) {
                console.log("原生广告加载成功：", res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i) {
                    var ad = adlist[i];
                    console.log("原生广告数据：", i);
                    for (var key in ad) {
                        console.log(key, ad[key]);
                    }
                }
                self._curAdItem_csjc = adlist[Math.floor(Math.random() * adlist.length)];
                if (null != self._curAdItem_csjc) {
                    for (var i = 0; i < self._curAdItem_csjc.imgUrlList.length; ++i) {
                        console.log("imgUrlList : ", i + " ", self._curAdItem_csjc.imgUrlList[i]);
                    }
                    var imgulr = self._curAdItem_csjc.imgUrlList[Math.floor(Math.random() * self._curAdItem_csjc.imgUrlList.length)];
                    self._display_csjc.loadImage(imgulr, Laya.Handler.create(self, function () {
                        self.showCenterZone_csjc();
                        self._nativeAd_csjc.reportAdShow({
                            adId: self._curAdItem_csjc.adId
                        });
                        console.log("加载图片并上报", imgulr);
                    }));
                }
            });
            var adLoad = this._nativeAd_csjc.load();
            adLoad && adLoad.then(function () {
                console.log('原生广告加载完成');
            }).catch(function (err) {
                console.log('加载失败', JSON.stringify(err));
                _this._centerZone_csjc.visible = false;
                if (!_this._reTry_csjc) {
                    _this._reTry_csjc = true;
                    Laya.timer.once(1000, self, function () {
                        console.log("原生广告重新加载");
                        self.loadAd_csjc();
                    });
                }
                else {
                    self.closeView();
                }
            });
        }
        else {
            self.closeView();
        }
    };
    VivoNativeAdView_csjc.prototype.onCloseBtn_csjc = function () {
        var rate = GameSwitch_1.default.CurrentConfig.vivoAdConf_csjc.yuanshengWudian_csjc;
        if (Math.random() <= rate) {
            if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
                console.log("点击上报！！！");
                this._nativeAd_csjc.reportAdClick({
                    adId: this._curAdItem_csjc.adId
                });
            }
        }
        this.closeView();
    };
    VivoNativeAdView_csjc.prototype.onOkBtn_csjc = function () {
        this._nativeAd_csjc.reportAdClick({
            adId: this._curAdItem_csjc.adId
        });
    };
    VivoNativeAdView_csjc.prototype.onDisplayClick_csjc = function () {
        if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
            console.log("点击上报！！！");
            this._nativeAd_csjc.reportAdClick({
                adId: this._curAdItem_csjc.adId
            });
        }
    };
    VivoNativeAdView_csjc.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (Laya.Browser.onVVMiniGame) {
            if (this._nativeAd_csjc && this._nativeAd_csjc.title != null) {
                this._nativeAd_csjc.destroy();
            }
            this._nativeAd_csjc = null;
            this._curAdItem_csjc = null;
        }
    };
    VivoNativeAdView_csjc.prototype.showCenterZone_csjc = function () {
        var _this = this;
        this._centerZone_csjc.visible = true;
        var time = GameSwitch_1.default.CurrentConfig.vivoAdConf_csjc.yuanshengBtnShowTime_csjc * 1000;
        if (time > 0) {
            this._okBtn_csjc.visible = false;
            Laya.timer.once(time, this, function () {
                _this._okBtn_csjc.visible = true;
            });
        }
        else {
            this._okBtn_csjc.visible = true;
        }
    };
    return VivoNativeAdView_csjc;
}(ViewBase_1.default));
exports.default = VivoNativeAdView_csjc;
},{"../../CommomAPI/GameSwitch/GameSwitch":3,"../../PlatformApi/VIVOAPI":19,"../../View/ViewBase":87}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../Mgr/ViewMgr");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var Utilit_1 = require("../Utilit");
var IViewStateListener_1 = require("./IViewStateListener");
//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
var ViewBase_csjc = /** @class */ (function (_super) {
    __extends(ViewBase_csjc, _super);
    function ViewBase_csjc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCloseEvent = null;
        _this.onOpenEvent = null;
        _this._viewBase = true;
        _this._viewDef = ViewMgr_1.ViewDef_csjc.None;
        _this._data = {};
        return _this;
    }
    ViewBase_csjc.prototype.onAwake = function () {
        //删除时自动释放
        this.owner.autoDestroyAtClosed = true;
        this.owner.height = Laya.stage.height;
    };
    ViewBase_csjc.prototype.onEnable = function () {
        this.addEvent();
    };
    ViewBase_csjc.prototype.onDisable = function () {
        this.removeEvent();
    };
    ViewBase_csjc.prototype.onDestroy = function () {
        this.removeEvent();
    };
    ViewBase_csjc.prototype.openView = function (data) {
        this._data = data;
        this.show();
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnViewOpen_csjc, { view: this._viewDef });
        if (this.onOpenEvent) {
            this.onOpenEvent();
        }
    };
    ViewBase_csjc.prototype.addEvent = function () {
    };
    ViewBase_csjc.prototype.removeEvent = function () {
        Laya.timer.clearAll(this);
    };
    ViewBase_csjc.prototype.closeView = function () {
        ViewMgr_1.default.instance_csjc.closeView_csjc(this._viewDef);
    };
    ViewBase_csjc.prototype.hide = function () {
        var _this = this;
        this.owner.visible = false;
        this.onHide();
        Utilit_1.default.forEachChild(this.owner, function (child) {
            var coms = child._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (IViewStateListener_1.isIViewStateListener_csjc(element)) {
                        element.onViewHide(_this);
                    }
                }
            }
        });
    };
    ViewBase_csjc.prototype.show = function () {
        var _this = this;
        this.owner.visible = true;
        this.onShow();
        Utilit_1.default.forEachChild(this.owner, function (child) {
            var coms = child._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (IViewStateListener_1.isIViewStateListener_csjc(element)) {
                        element.onViewShow(_this);
                    }
                }
            }
        });
    };
    ViewBase_csjc.prototype.viewIsHide = function () {
        return this.owner.visible;
    };
    ViewBase_csjc.prototype.onHide = function () { };
    ViewBase_csjc.prototype.onShow = function () { };
    ViewBase_csjc.prototype.onClose = function () {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr_1.default.dispatch_csjc(EventDef_1.EventDef_csjc.Game_OnViewClose_csjc, { view: this._viewDef });
        if (this.onCloseEvent) {
            this.onCloseEvent();
        }
    };
    return ViewBase_csjc;
}(Laya.Script));
exports.default = ViewBase_csjc;
},{"../Event/EventDef":5,"../Event/EventMgr":6,"../Mgr/ViewMgr":12,"../Utilit":65,"./IViewStateListener":81}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var View;
    (function (View) {
        var LoadingUI = /** @class */ (function (_super) {
            __extends(LoadingUI, _super);
            function LoadingUI() {
                return _super.call(this) || this;
            }
            LoadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(LoadingUI.uiView);
            };
            LoadingUI.uiView = { "type": "View", "props": { "zOrder": 10, "width": 1334, "top": 0, "right": 0, "mouseThrough": false, "left": 0, "height": 750, "bottom": 0 }, "compId": 2, "child": [{ "type": "Image", "props": { "skin": "LoadingView/zhuyebeijing.jpg", "right": 0, "name": "BG", "left": 0, "bottom": 0 }, "compId": 11 }, { "type": "Image", "props": { "width": 297, "top": -738, "skin": "LoadingView/jiqiren.png", "scaleY": 2, "scaleX": 2, "left": -115, "height": 328 }, "compId": 21, "child": [{ "type": "Script", "props": { "MinAlpha": 0.8, "BreathingSpeed_csjc": 0.3, "runtime": "View/AlphaBreathingAni.ts" }, "compId": 22 }] }, { "type": "Image", "props": { "skin": "LoadingView/qiang_1.png", "left": 0, "bottom": 0 }, "compId": 28 }, { "type": "Image", "props": { "width": 374, "skin": "LoadingView/long1.png", "scaleY": 2, "scaleX": 2, "right": -170, "height": 348, "bottom": 771 }, "compId": 19, "child": [{ "type": "Script", "props": { "MinAlpha": 0.8, "BreathingSpeed_csjc": 0.3, "runtime": "View/AlphaBreathingAni.ts" }, "compId": 20 }] }, { "type": "Image", "props": { "skin": "LoadingView/qiang_2.png", "right": 0, "bottom": 0 }, "compId": 29 }, { "type": "Image", "props": { "width": 415, "top": 158, "skin": "LoadingView/logo.png", "pivotY": 70, "pivotX": 208, "name": "Logo", "height": 140, "centerX": 0 }, "compId": 12 }, { "type": "Image", "props": { "skin": "LoadingView/zg.png", "scaleY": 0.7, "scaleX": 0.7, "centerX": -100, "bottom": -229, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 14 }, { "type": "Image", "props": { "skin": "LoadingView/loading.png", "centerX": 0, "bottom": 99 }, "compId": 27 }, { "type": "Image", "props": { "zOrder": 0, "skin": "LoadingView/jiazaijindu1.png", "pivotY": 22, "name": "ProcessBarBg", "centerX": 0, "bottom": 57 }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 2, "x": 3, "width": 456, "skin": "LoadingView/jiazaijindu2.png", "sizeGrid": "0,45,0,531", "name": "ProcessBar" }, "compId": 9 }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["LoadingView/zhuyebeijing.jpg", "LoadingView/jiqiren.png", "LoadingView/qiang_1.png", "LoadingView/long1.png", "LoadingView/qiang_2.png", "LoadingView/logo.png", "LoadingView/zg.png", "LoadingView/loading.png", "LoadingView/jiazaijindu1.png", "LoadingView/jiazaijindu2.png"], "loadList3D": [] };
            return LoadingUI;
        }(Laya.View));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[9])