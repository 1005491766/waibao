import GameSwitch_csjc from "../../CommomAPI/GameSwitch/GameSwitch";
import GameConfig from "../../GameConfig";
import VIVOAPI_csjc from "../../PlatformApi/VIVOAPI";


export default class VivoNativeBanner_csjc extends Laya.Script {
    /** @prop {name:ViewPostion,tips:"banner所在的方向,水平或竖直",type:Option,option:"MainView,SkinView",default:"MainView"}*/
    public ViewPostion: String = "MainView";
    protected _ownerSp_csjc: Laya.UIComponent;
    protected _display_csjc: Laya.Sprite;
    protected _closeBtn_csjc: Laya.Sprite;
    protected _nativeAd_csjc: any = null;
    protected _curAdItem_csjc: any = null;
    protected _reTry_csjc: boolean = false;
    onAwake() {
        this._ownerSp_csjc = this.owner as Laya.UIComponent;
        this._display_csjc = this._ownerSp_csjc.getChildByName("Display") as Laya.Sprite;
        this._closeBtn_csjc = this._ownerSp_csjc.getChildByName("Close_Btn") as Laya.Sprite;
    }

    onStart() {
        this.addEvent();
        this.switchBanner_csjc();
    }

    switchBanner_csjc() {
        let yuanshengBanner = false
        if (this.ViewPostion == "MainView") {
            yuanshengBanner = GameSwitch_csjc.CurrentConfig.vivoAdConf_csjc.yuanshengReplaceBanner1_csjc == 1;
            console.log("MainView原生替换Banner值为:", yuanshengBanner);
        }
        else {
            yuanshengBanner = GameSwitch_csjc.CurrentConfig.vivoAdConf_csjc.yuanshengReplaceBanner2_csjc == 1;
            console.log("SkinView原生替换Banner值为:", yuanshengBanner);
        }
        if (yuanshengBanner) {
            console.log("原生替换Banner");
            this.loadAd_csjc();
        }
        else {
            console.log("原生不替换Banner");
            this._ownerSp_csjc.visible = false;
            VIVOAPI_csjc.showBannerAd_csjc();
        }
    }

    addEvent() {
        this._closeBtn_csjc.on(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.on(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    }

    removeEvent() {
        this._closeBtn_csjc.off(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.off(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    }

    protected loadAd_csjc() {
        var self = this;
        if (Laya.Browser.onVVMiniGame) {
            this._ownerSp_csjc.visible = false;
            // if (this._nativeAd && this._nativeAd.title != null) {
            //     this._nativeAd.destroy();
                this._nativeAd_csjc = null;
            // }
            this._curAdItem_csjc = null;

            this._nativeAd_csjc = qg.createNativeAd({
                posId: VIVOAPI_csjc.nativeAdId_csjc
            })

            this._nativeAd_csjc.onLoad((res) => {
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
                        console.log("imgUrlList : ", i + " ", self._curAdItem_csjc.imgUrlList[i])
                    }
                    var imgulr = self._curAdItem_csjc.imgUrlList[Math.floor(Math.random() * self._curAdItem_csjc.imgUrlList.length)];
                    self._display_csjc.loadImage(imgulr, Laya.Handler.create(self, () => {
                        self._ownerSp_csjc.visible = true;
                        self._nativeAd_csjc.reportAdShow({
                            adId: self._curAdItem_csjc.adId
                        })
                        console.log("加载图片并上报", imgulr);
                    }));
                }
            })
            let adLoad = this._nativeAd_csjc.load();
            adLoad && adLoad.then(() => {
                console.log('原生广告加载完成');
            }).catch(err => {
                console.log('加载失败', JSON.stringify(err));
                this._ownerSp_csjc.visible = false;
                if (!this._reTry_csjc) {
                    this._reTry_csjc = true;
                    Laya.timer.once(1000, self, () => {
                        console.log("原生广告重新加载");
                        self.loadAd_csjc();
                    });
                }
                else {
                    VIVOAPI_csjc.showBannerAd_csjc();
                }
            });
        }
        else {
            this._ownerSp_csjc.visible = false;
        }
    }

    protected onCloseBtn_csjc() {
        let rate = GameSwitch_csjc.CurrentConfig.vivoAdConf_csjc.yuanshengWudian_csjc;
        if (Math.random() <= rate) {
            console.log("原生误触!!!");
            if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
                console.log("点击上报！！！")
                this._nativeAd_csjc.reportAdClick({
                    adId: this._curAdItem_csjc.adId
                })
            }
        }
        else {
            if (GameSwitch_csjc.CurrentConfig.vivoAdConf_csjc.yuanshengReplaceBannerCloseOpenBanner_csjc == 1) {
                VIVOAPI_csjc.showBannerAd_csjc();
            }
        }
        console.log("用户关闭原生!!!");
        this._ownerSp_csjc.visible = false;
    }

    protected onDisplayClick_csjc() {
        if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
            console.log("点击上报！！！")
            this._nativeAd_csjc.reportAdClick({
                adId: this._curAdItem_csjc.adId
            })
        }
    }

    onDestroy() {
        Laya.timer.clearAll(this);
        if (Laya.Browser.onVVMiniGame) {
            // if (this._nativeAd && this._nativeAd.title != null) {
            //     this._nativeAd.destroy();
            // }
            this._nativeAd_csjc = null;
            this._curAdItem_csjc = null;
        }
        VIVOAPI_csjc.hideBannerAd_csjc();
        this.removeEvent();
    }
}