export default class QQMiniGameAPI_csjc {
    public static readonly adUnitId_csjc = ""         //激励视频Id
    public static readonly bannerAdUnitId_csjc = ""   //banner广告Id
    public static readonly insAdUnitId_csjc = ""      //插屏广告Id
    public static readonly appBoxId_csjc = ""        //盒子广告Id

    public static Login_csjc(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQQMiniGame) {    
            Laya.Browser.window["qq"].login(
                {
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code)
                        }
                    }
                })
        }
    }


    //-------------------------激励视频---------------------------------
    protected static _isRegRewardedVideoAdEvent_csjc = false;
    protected static _onRewardedVideoAdFailed_csjc: Function = null;
    protected static _onRewardedVideoAdClose_csjc: Function = null;
    protected static onRewardedVideoAdLoad_csjc() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewardedVideoAdError_csjc(err) {
        console.log('激励视频 广告加载失败' + err)
        if (QQMiniGameAPI_csjc._onRewardedVideoAdFailed_csjc) {
            QQMiniGameAPI_csjc._onRewardedVideoAdFailed_csjc();
        }
    }
    protected static onRewardedVideoAdClose_csjc(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (QQMiniGameAPI_csjc._onRewardedVideoAdClose_csjc) {
                QQMiniGameAPI_csjc._onRewardedVideoAdClose_csjc(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (QQMiniGameAPI_csjc._onRewardedVideoAdClose_csjc) {
                QQMiniGameAPI_csjc._onRewardedVideoAdClose_csjc(false)
            }
        }
    }
    protected static regRewardedVideoAdEvent_csjc(rewardedVideoAd) {

        rewardedVideoAd.onLoad(QQMiniGameAPI_csjc.onRewardedVideoAdLoad_csjc)
        rewardedVideoAd.onError(QQMiniGameAPI_csjc.onRewardedVideoAdError_csjc)
        rewardedVideoAd.onClose(QQMiniGameAPI_csjc.onRewardedVideoAdClose_csjc)

        QQMiniGameAPI_csjc._isRegRewardedVideoAdEvent_csjc = true;
    }
    public static showRewardedVideoAd_csjc(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI_csjc._onRewardedVideoAdClose_csjc = onAdClose;
            QQMiniGameAPI_csjc._onRewardedVideoAdFailed_csjc = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: QQMiniGameAPI_csjc.adUnitId_csjc,
                }
            );

            if (!QQMiniGameAPI_csjc._isRegRewardedVideoAdEvent_csjc) {
                QQMiniGameAPI_csjc.regRewardedVideoAdEvent_csjc(rewardedVideoAd);
            }

            rewardedVideoAd.load().then(() => {
                var promise = rewardedVideoAd.show();
                promise.then(() => console.log('激励视频 广告显示成功'));
                promise.catch((err) => {
                    rewardedVideoAd.load()
                        .then(() => rewardedVideoAd.show())
                        .catch(err => {
                            console.log('激励视频 广告显示失败')
                            if (onFailed) {
                                onFailed();
                            }
                        })
                });
            }).catch(err => {
                console.log('激励视频 广告加载失败')
                if (onFailed) {
                    onFailed();
                }
            })
        }
        else {
            onAdClose(true);
        }
    }
    //----------------------------------------------------------------


    //-------------------------小游戏跳转---------------------------
    public static navigateToMiniProgram_csjc(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["qq"].navigateToMiniProgram(
                {
                    appId: appId,
                    path: path,
                    extraData: {
                        foo: 'bar'
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
    //----------------------------------------------------------------------

    //---------------------分享----------------------------------------
    protected static _onShow_csjc: Function = null;
    protected static _lastShareTime_csjc: number = 0;
    public static share_csjc(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI_csjc._onShow_csjc = () => {
                Laya.Browser.window["qq"].offShow(QQMiniGameAPI_csjc._onShow_csjc)
                QQMiniGameAPI_csjc._onShow_csjc = null;
                var c = Date.now() - this._lastShareTime_csjc;
                if (complate) {
                    if (Date.now() - this._lastShareTime_csjc > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["qq"].onShow(QQMiniGameAPI_csjc._onShow_csjc)
            QQMiniGameAPI_csjc._lastShareTime_csjc = Date.now();
            Laya.Browser.window["qq"].shareAppMessage(
                {
                    title: titel,
                    imageUrl: imageUrl
                }
            );
        }
    }
    //----------------------------------------------------------------------


    //--------------------插屏幕广告---------------------------------------
    public static showInterstitialAd_csjc(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMiniGameAPI_csjc.insAdUnitId_csjc,
            })

            interstitialAd.onLoad(() => {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch((err) => {
                    console.log('插屏广告 显示失败 ：' + err)
                    if (onFailed) {
                        onFailed();
                    }
                })
            })

            interstitialAd.onError((err) => {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            })

            interstitialAd.onClose(() => {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            })
        }
        else {
            onAdClose();
        }
    }

        //--------------------盒子广告---------------------------------------
        public static mAppboxAd_csjc = null;
        public static LoadAppBoxAd_csjc(onAdClose: Function, onFailed: Function) {
            if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI_csjc.mAppboxAd_csjc = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQMiniGameAPI_csjc.appBoxId_csjc,
                })
                QQMiniGameAPI_csjc.mAppboxAd_csjc.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                QQMiniGameAPI_csjc.mAppboxAd_csjc.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
    
                QQMiniGameAPI_csjc.mAppboxAd_csjc.onClose(() => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                })
            }
            else {
                onAdClose();
            }
        }
    
        public static showAppBoxAd_csjc(onFailed: Function) {
            if(QQMiniGameAPI_csjc.mAppboxAd_csjc){
                console.log("显示盒子广告");
                QQMiniGameAPI_csjc.mAppboxAd_csjc.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
            }else{
                QQMiniGameAPI_csjc.LoadAppBoxAd_csjc((onAdClose) => {
                }, (onFailed) => {
                })
            } 
        }
        
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof QQMiniGameAPI
     */
    public static getLaunchOptionsSync_csjc() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            let obj = Laya.Browser.window["qq"].getLaunchOptionsSync()
            console.log("场景值 " + obj.scene);
            let str = JSON.stringify(obj.query);
            console.log("Query参数 " + str);
            let key = obj.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj.shareTicket);
            console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
            return obj;
        }
        let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
        return obj;
    }

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
     * @memberof QQMiniGameAPI
     */
    public static SetShareMenu_csjc(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["qq"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["qq"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                }
            });
        }
    }
}