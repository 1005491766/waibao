import HttpUnit_csjc from "../Net/HttpUnit";


export default class OPPOAPI_csjc {
    public static readonly appId_csjc = "30263446";
    public static readonly adUnitId_csjc = "258312";
    public static readonly bannerAdUnitId_csjc = "258306";
    // public static readonly insAdUnitId_csjc = "";
    // public static readonly openScreenAdUnitId_csjc = "176944";
    public static readonly nativeAdId_csjc = "258308"

    public static readonly nativeAdList_csjc = [
        "258308",
        "258309",
        "258310",
    ]

    private static nativeIndex = 0;
    public static get GetNativeAd_csjc(): string {
        OPPOAPI_csjc.nativeIndex++;
        if (OPPOAPI_csjc.nativeIndex > OPPOAPI_csjc.nativeAdList_csjc.length - 1) {
            OPPOAPI_csjc.nativeIndex = 0;
        }
        console.log("拿取原生返回Id： ", OPPOAPI_csjc.nativeAdList_csjc[OPPOAPI_csjc.nativeIndex]);
        return OPPOAPI_csjc.nativeAdList_csjc[OPPOAPI_csjc.nativeIndex];
    }
    public static get BannerInstance_csjc() {
        return OPPOAPI_csjc._banner_csjc;
    }

    protected static _banner_csjc: any = null;

    public static Login_csjc(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].login(
                {
                    success: (res) => {
                        let token = res.data.token;
                        onSuccess(token);
                        console.log("OPPO 登陆成功,获取到 token : " + token);
                        for (var key in res) {
                            console.log(key, res[key]);
                        }
                    },
                    fail: (res) => {
                        console.log("OPPO 登陆失败", res);
                        for (var key in res) {
                            console.log(key, res[key]);
                        }
                    }
                })
        }
    }

    public static initAdService_csjc(onSuccess: Function, onFail: Function, onComplete: Function) {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: OPPOAPI_csjc.appId_csjc,
                isDebug: false,
                success: function (res) {
                    console.log("oppo initAdService success");
                    if (onSuccess) {
                        onSuccess(res)
                    }
                },
                fail: function (res) {
                    console.log("oppo initAdService fail: ", res.code, res.msg);
                    if (onFail) {
                        onFail(res)
                    }
                },
                complete: function (res) {
                    console.log("oppo initAdService complete");
                    if (onComplete) {
                        onComplete(res)
                    }
                }
            })
    }

    public static showRewardedVideoAd_csjc(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPOAPI_csjc.adUnitId_csjc,
            })
            videoAd.onLoad(() => {
                console.log("oppo 视频广告加载完成");
                videoAd.show();
            })
            videoAd.onVideoStart(() => {
                console.log("oppo 视频广告开始播放");
            })
            videoAd.onClose((res) => {
                if (res.isEnded) {
                    console.log("oppo 视频广告观看 完成");
                    onAdClose(true);
                } else {
                    console.log("oppo 视频广告观看 未完成");
                    onAdClose(false);
                }
                videoAd.destroy();
            })
            videoAd.onError((err) => {
                console.log("oppo 视频广告获取失败", err);
                for (var key in err) {
                    console.log(key, err[key]);
                }
                videoAd.destroy();
                onFailed();
            })
            videoAd.load();
        }
        else {
            onAdClose(true);
        }
    }

    public static navigateToMiniProgram_csjc(pkgName: string, gameName: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            HttpUnit_csjc.reportExport_csjc(pkgName, gameName, (result) => {
                if (1 == result.code) {
                    console.log("OPPO 导出上报成功");
                }
                else {
                    console.log("OPPO 导出上报失败", result.msg);
                }
            }, (result) => {
                console.log("OPPO 导出上报失败");
                for (var key in result) {
                    console.log(key, result[key]);
                }
            });
            let time = Date.now();
            while (Date.now() - time <= 500) {

            }
            Laya.Browser.window["qg"].navigateToMiniGame(
                {
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: OPPOAPI_csjc.appId_csjc
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
                    // complete(res) {
                    //     if (onComplate) {
                    //         onComplate(res)
                    //     }
                    // }
                })
        }
    }

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

    public static showBannaerAd_csjc(): any {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO显示Banner");
            if (OPPOAPI_csjc._banner_csjc) {
                OPPOAPI_csjc._banner_csjc.show();
                return;
            }
            var bannerAd = qg.createBannerAd({
                posId: OPPOAPI_csjc.bannerAdUnitId_csjc
            })
            bannerAd.onError((err) => {
                console.log("Banner广告拉取失败", err);
                for (var key in err) {
                    console.log(key, err[key]);
                }
            })
            bannerAd.show();
            OPPOAPI_csjc._banner_csjc = bannerAd;
        }
    }

    public static hideBannerAd_csjc() {
        if (OPPOAPI_csjc._banner_csjc) {
            OPPOAPI_csjc._banner_csjc.hide();
        }
    }

    public static getLaunchOptionsSync_csjc() {
        let obj: any = { query: "", referrerInfo: { package: "", extraData: { appid: "" } } }
        if (Laya.Browser.onQGMiniGame) {
            var options = Laya.Browser.window["qg"].getLaunchOptionsSync();
            if (null != options && options != "") {
                obj = options;
            }
            else {
                console.log("没有启动设置！！！")
            }
            return obj;
        }
        return obj;
    }

    public static share_csjc(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static createDesktopIcon_csjc(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQGMiniGame) {
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
            })
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    }
}