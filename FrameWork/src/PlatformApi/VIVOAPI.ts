import User_csjc from "../User/User";
import HttpUnit_csjc from "../Net/HttpUnit";
import GameConfig from "../GameConfig";
import SoundMgr_csjc from "../Mgr/SoundMgr";
import GameSwitch_csjc from "../CommomAPI/GameSwitch/GameSwitch";
import GameSettings_csjc from "../GameSettings";


export default class VIVOAPI_csjc {
    public static adUnitId_csjc = "a8a44fd39bcd4e80a52e39be99074ac1";                      //视频广告
    public static bannerAdUnitId_csjc = "bc2f7435abde42aeb30186460ff3c57b";                //banner广告
    public static nativeAdId_csjc = "caa8404ca6e7413795c43ed17189faff";                    //原生广告
    public static insAdUnitId_csjc = "6ab8564f134e45508dc6a2be9b2d544f";                                                   //插屏广告

    public static rewardedAd_csjc = null;
    public static rewardedAdNum_csjc = 0;
    public static get BannerInstance_csjc() {
        return VIVOAPI_csjc._banner_csjc;
    }
    protected static _banner_csjc: any = null;

    public static readonly nativeAdList_csjc = [

    ]
    private static nativeIndex_csjc = 0;

    public static Login_csjc(onSuccess: Function, onFail: Function) {
        console.log("vivo 开始登陆");
        if (Laya.Browser.window["qg"].getSystemInfoSync().platformVersionCode >= 1053) {
            Laya.Browser.window["qg"].login().then((res) => {
                console.log("开始登陆成功 >= 1053");
                if (res.data.token) {
                    // 使用token进行服务端对接
                    let token = res.data.token;
                    onSuccess(token, true);
                    console.log("vivo 登陆成功,获取到 token : " + token);
                }
            }, (err) => {
                console.log('登录失败' + JSON.stringify(err));
                VIVOAPI_csjc.showDialog_csjc();
            });
        } else {
            Laya.Browser.window["qg"].authorize({
                type: "token",
                success: function (data) {
                    // 使用token进行服务端对接
                    Laya.Browser.window["qg"].getProfile({
                        token: data.accessToken,
                        success: function (data) {
                            console.log('openid获取成功', data.openid)
                            onSuccess(data.openid, false);
                        },
                        fail: function (data, code) {
                            VIVOAPI_csjc.showDialog_csjc();
                            console.log("获取openid失败 : " + code);
                        }
                    })
                },
                fail: function (data, code) {
                    console.log('登录失败' + code);
                    VIVOAPI_csjc.showDialog_csjc();
                }
            })
        }
    }

    //提示弹窗
    public static showDialog_csjc() {
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
                console.log('handling callback')
                VIVOAPI_csjc.VIVOLogin_csjc();
            },
            cancel: function () {
                console.log('handling cancel')
            },
            fail: function (data, code) {
                console.log(`handling fail, code = ${code}`)
            }
        })
    }

    //vivo登录
    public static VIVOLogin_csjc() {
        VIVOAPI_csjc.Login_csjc(function (code, type) {
            if (type) {
                console.log("登陆token1111:", code);
                User_csjc.code_csjc = code;
            } else {
                User_csjc.openId_csjc = code;
            }
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

            }));
        }, () => {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {

            }));
        })
    }


    //创建视频广告
    public static createRewardedVideoAd_csjc() {
        if (Laya.Browser.onVVMiniGame) {
            VIVOAPI_csjc.rewardedAd_csjc = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: VIVOAPI_csjc.adUnitId_csjc,
                style: {}
            });

            VIVOAPI_csjc.rewardedAd_csjc.onError(err => {
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
                        console.log("激励广告展示失败")
                        console.log(JSON.stringify(err))
                        break;
                }
            })
        }
    }

    //显示视频广告
    public static showRewardedVideoAd_csjc(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onVVMiniGame) {
            SoundMgr_csjc.instance_csjc.stopBGM_csjc();
            console.log("---------------------------------- VIVOAPI.rewardedAd:", VIVOAPI_csjc.rewardedAd_csjc + ",VIVOAPI.rewardedAdNum:", VIVOAPI_csjc.rewardedAdNum_csjc)
            // if (VIVOAPI.rewardedAd == null) {
            //     onFailed();
            //     return;
            // }

            if (VIVOAPI_csjc.rewardedAdNum_csjc == 0) {
                VIVOAPI_csjc.createRewardedVideoAd_csjc();
            } else {
                // 第一次creat后广告可以在onload里面直接show
                // 后续的加载必须要load才能触发onload接着才能show出广告
                let adLoad = VIVOAPI_csjc.rewardedAd_csjc.load();//第一次调用 可能会报-3  广告能正常展示就可以忽略
                // 捕捉load失败的错误
                adLoad && adLoad.catch(err => {
                    console.log("激励广告load失败" + JSON.stringify(err))
                    onFailed();
                })
            }

            VIVOAPI_csjc.rewardedAdNum_csjc = 1;
            console.log("近来showRewardedVideoAd");

            VIVOAPI_csjc.rewardedAd_csjc.onLoad(() => {
                let adshow = VIVOAPI_csjc.rewardedAd_csjc.show();
                // 捕捉show失败的错误
                adshow && adshow.then(() => {
                    console.log("激励广告展示成功");
                }).catch(err => {
                    console.log("激励广告展示失败" + JSON.stringify(err))
                    onFailed();
                })
            })

            VIVOAPI_csjc.rewardedAd_csjc.onClose(res => {
                if (res && res.isEnded) {
                    console.log("正常播放结束，可以下发游戏奖励");
                    onAdClose(true);
                } else {
                    console.log("播放中途退出，不下发游戏奖励");
                    onAdClose(false);
                }
            });
        }
        else {
            onAdClose(true);
        }
    }

    public static mBannerAd_csjc = null;
    public static showBannerAd_csjc() {
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
            let adshow = VIVOAPI_csjc.mBannerAd_csjc.show();
            // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adshow && adshow.then(() => {
                console.log("banner广告展示成功");
            }).catch((err) => {
                switch (err.code) {
                    case 30003:
                        console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入")
                        break;
                    case 30009:
                        console.log("10秒内调用广告次数超过1次，10秒后再调用")
                        // setTimeout(() => {
                        //     show()
                        // }, 10000);
                        break;
                    case 30002:
                        console.log("加载广告失败，重新加载广告")
                        // setTimeout(() => {
                        //     retryShow()
                        // }, 10000);             
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("banner广告展示失败")
                        console.log(JSON.stringify(err))
                        break;
                }
            });

            VIVOAPI_csjc.mBannerAd_csjc.onError(function (err) {
                console.log('Banner广告加载失败111:' + JSON.stringify(err));
            })
        }
    }

    public static hideBannerAd_csjc() {
        if (VIVOAPI_csjc.mBannerAd_csjc) {
            console.log('===========bannerAd 隐藏');
            VIVOAPI_csjc.mBannerAd_csjc.hide();
            VIVOAPI_csjc.mBannerAd_csjc.destroy();
            // this.mBannerAd = null;
        } else {
            console.log('===========bannerAd 为空');
        }
    }

    public static navigateToMiniProgram_csjc(pkgName: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onVVMiniGame) {
            console.log("vivo 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame(
                {
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: GameSettings_csjc.AppID_csjc
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res)
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res)
                        }
                    },
                    complete(res) {
                        if (onComplate) {
                            onComplate(res)
                        }
                    }
                })

        }
    }

    private static _insertAd: any = null;

    public static preLoadInterstitialAd_csjc() {
        if (Laya.Browser.onVVMiniGame) {
            VIVOAPI_csjc._insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                posId: VIVOAPI_csjc.insAdUnitId_csjc
            })
        }
    }
    public static showInterstitialAd_csjc(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onVVMiniGame) {
            if (VIVOAPI_csjc._insertAd == null) return;
            VIVOAPI_csjc._insertAd.onLoad(() => {
                console.log("插屏广告加载完成");
            })
            VIVOAPI_csjc._insertAd.onClose(() => {
                this._insertAd = null;
                if (onAdClose) onAdClose();
            })
            VIVOAPI_csjc._insertAd.onError((err) => {
                console.log("插屏广告拉取失败", JSON.stringify(err));
                if (onFailed) {
                    onFailed();
                }
            });
            VIVOAPI_csjc._insertAd.show().then(() => {
                console.log('插屏广告展示完成');
            }).catch((err) => {
                console.log('插屏广告展示失败', JSON.stringify(err));
            })
        }
        else {
            if (onAdClose) onAdClose();
        }

    }

    public static getLaunchOptionsSync_csjc() {
        return {};
    }

    public static share_csjc(complate: Function) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].share({
                success() {
                    if (complate != null) {
                        complate(true);
                    }

                    Laya.Browser.window["qg"].showToast({
                        message: "分享成功"
                    })
                },

                fail(erromsg, errocode) {
                    // Laya.Browser.window["qg"].showToast({
                    //     message: "分享失败：" + errocode + ': ' + erromsg
                    // })

                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    })
                },

                cancel() {
                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    })
                },

                complete() {

                }
            })
        }
    }

    public static createDesktopIcon_csjc(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut(
                            {
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
                            })
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
            })
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    }

    public static hasDesktopIcon_csjc(onSuccess: Function, onFail: Function) {
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
            })
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    }
}