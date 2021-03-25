import EventMgr_csjc from "../Event/EventMgr";
import ALD_csjc from "../ALD"
import TmAppConfig from "./TmAppConfig";
/**
 * 天幕sdk系统API
 * 
 * @export
 * @class TmAPI
 */
export default class TmAPI {

    //AppId
    public static AppId = "";

    //当前App版本
    public static AppVersion = "1.0.0";

    //轮播广告位
    public static ListIcoAdLocationId = 1075799;

    //单个广告位
    public static SingleAdLocationId = 1075900;

    //Banner广告位
    public static BannerAdLocationId = 1076001;


    public static _iphoneIgnoreAppIds =
        [
            "wx2d2acce3c45f4ddf",
            "wxeb93c1298ec7c62b"
        ]

    public static UserInformation: object = null;
    /**
     * 天幕SDK初始化
     * 
     * @static
     * @memberof TmAPI
     */
    public static Init() {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.init({
                hideRequestLog: true,
                appVersion: this.AppVersion
            });
        }
    }

    /**
     * 登录接口
     * 
     * @static
     * @param {Function} func 
     * @memberof TmAPI
     */
    public static Login(func: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.login().then(res => {
                console.log("登陆成功", res)
                if (func != null) {
                    func(res);
                }
            });
        }
    }

    public static NoLoginInit(openId) {
        if (Laya.Browser.onMiniGame) {
            console.log(openId);
            Laya.Browser.window["wx"].tmSDK.sendUserInfo({ openId: openId, gender: 1 });
            console.log("传入天幕OpenId: ", openId);
        }
    }

    /**
     * 尝试得到广告，会先检查广告位是否打开再真正拉取广告
     * 
     * @static
     * @param {Function} func 
     * @memberof TmAPI
     */
    public static TryGetAdvs(positionId: number, completeHandler: Function) {
        if (!TmAppConfig.CurrentConfig.adSwitch) {
            console.log("广告总开关为关闭状态")
            completeHandler({ IsOpen: false });
            return;
        }
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.checkFlowIsOpen({
                positionId: positionId
            }).then((res) => {
                if (res.isOpen) {
                    this.GetAdvs(positionId, completeHandler);
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
            let AddDate: any = {
                creatives: [],
                isOpen: true
            }
            switch (positionId) {
                case this.ListIcoAdLocationId:
                    for (let index = 0; index < 20; index++) {
                        let creativeTemp = {
                            creativeId: 10000,
                            positionId: positionId,
                            appId: "Ico测试广告",
                            show_config: { image: "res/TmTestAd/TestIcoAd-" + (index % 5 + 1) + ".jpg", title: "1" }
                        }
                        AddDate.creatives.push(creativeTemp);
                    }
                    AddDate.type = 7;
                    break;
                case this.BannerAdLocationId:
                    let creativebanner = {
                        creativeId: 10000,
                        positionId: positionId,
                        show_config: { image: "res/TmTestAd/TestBannerAd-" + (Math.floor(Math.random() * 2) + 1) + ".jpg", title: "1" }
                    }
                    AddDate.appId = "Banner微信测试广告";
                    AddDate.creatives.push(creativebanner);
                    AddDate.type = 11;
                    break;
                case this.SingleAdLocationId:
                    let creativeSingle = {
                        creativeId: 10000,
                        positionId: positionId,
                        appId: "Single微信测试广告",
                        show_config: { image: "res/TmTestAd/TestFlowAd-" + (Math.floor(Math.random() * 2) + 1) + ".jpg", title: "1" }
                    }
                    AddDate.creatives.push(creativeSingle);
                    AddDate.type = 1;
                    break;
            }
            completeHandler(AddDate);
        }
    }

    /**
     * 拉取广告的方法,不要直接调用
     * 
     * @static
     * @param {string} locationId 
     * @param {Function} completeHandler 
     * @memberof TmAPI
     */
    private static GetAdvs(positionId: number, completeHandler: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.getFlowConfig({
                positionId: positionId
            }).then((config) => {
                console.log(positionId, '该广告位是否开启:', config);
                completeHandler(config);
            });
        }
        else if (Laya.Browser.onQQMiniGame) {
        }
    }

    /**
     * 跳转和自动上报数据的集成化封装
     * 
     * @static
     * @param {any} positionId 
     * @param {any} creativeId 
     * @memberof TmAPI
     */
    public static NavigateAndReport(positionId, creativeId, appid, completeFunc?: Function) {
        if (Laya.Browser.onMiniGame) {
            this.FlowNavigate(positionId, creativeId, (flag, res) => {
                console.log(flag, res)
                if (flag) {
                    ALD_csjc.aldSendReportAdClickSuccess_csjc(appid);
                }
                else {
                    if (res.navigateMessage.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_csjc.aldSendReportAdClickFail_csjc(appid);
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
    }

    /**
     * 跳转到其他小游戏
     * 
     * @memberof TmAPI
     */
    public static FlowNavigate(positionId, creativeId, completeFunc?: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.flowNavigate({
                positionId: positionId, // 广告位id, 请先使用该id获取推广创意列表
                creativeId: creativeId,  // 传入获取到的creativeId
            }).then((newList) => {
                console.log('调用跳转函数成功')
                console.log('自动刷新列表：', newList)//返回最新列表 
                if (completeFunc) {
                    if (newList.navigateMessage.errMsg == "navigateToMiniProgram:ok") {
                        completeFunc(true, newList);
                    }
                    else {
                        completeFunc(false, newList);
                    }
                }
            }).catch((error) => {
                console.log('调用跳转函数失败', error);
                if (completeFunc) {
                    completeFunc(false, error);
                }
            })
        }
        else {
            if (completeFunc) {
                console.log('在模拟器中调用跳转函数,返回虚假成功结果');
                completeFunc(true, null);
            }
        }
    }

    /**
     * 得到配置表
     * 
     * @static
     * @memberof TmAPI
     */
    public static getAppJSONConfig(key: string, completeFunc: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].tmSDK.getAppJSONConfig(key).then((res) => {
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
    }


    /**
     * 发送事件
     * 
     * @static
     * @param {string} eventId 
     * @param {*} [res] 
     * @memberof TmAPI
     */
    public static SendEvent(eventId: string, res?: any) {
        if (Laya.Browser.onMiniGame) {
            console.log("发送事件:", eventId, "参数:", res);
            Laya.Browser.window["wx"].tmSDK.sendEvent(eventId, res);
        }
        else {
            console.log("在编辑器下发送Tm事件", eventId, res);
        }
    }
}