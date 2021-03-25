import GameSwitch_csjc from "../../CommomAPI/GameSwitch/GameSwitch";
import VIVOAPI_csjc from "../../PlatformApi/VIVOAPI";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";

export default class VivoNativeAdSubView_csjc extends Laya.Script {
    protected _ownerSp_csjc: Laya.UIComponent;
    protected _display_csjc: Laya.Sprite;
    protected _title_Text_csjc: Laya.Text;
    protected _gotoAd_Btn_csjc: Laya.Sprite;
    protected _closeBtn_csjc: Laya.Sprite;
    protected _nativeAd_csjc: any = null;
    protected _curAdItem_csjc: any = null;
    protected _reTry_csjc: boolean = false;

    onAwake() {
        this._ownerSp_csjc = this.owner as Laya.UIComponent;
        this._display_csjc = this.owner.getChildByName("Display") as Laya.Sprite;
        this._title_Text_csjc = this.owner.getChildByName("Title_Text") as Laya.Text;
        this._gotoAd_Btn_csjc = this.owner.getChildByName("GotoAd_Bnt") as Laya.Sprite;
        this._closeBtn_csjc = this.owner.getChildByName("Close_Btn") as Laya.Sprite;
        // this._ok_Btn = this.owner.getChildByName("Ok_Btn") as Laya.Sprite;
    }

    onStart() {
        this.addEvent();
        this.loadAd_csjc();
    }

    addEvent() {
        this._closeBtn_csjc.on(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        // this._ok_Btn.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._gotoAd_Btn_csjc.on(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
        this._display_csjc.on(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_ShowNativeAd, this, this.onDisplayClick_csjc);
    }

    removeEvent() {
        this._closeBtn_csjc.off(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        // this._ok_Btn.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._gotoAd_Btn_csjc.off(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
        this._display_csjc.off(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.AD_ShowNativeAd, this, this.onDisplayClick_csjc);
    }

    protected loadAd_csjc() {
        var self = this;
        if (Laya.Browser.onVVMiniGame) {
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
                self._ownerSp_csjc.visible = true;
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

    protected onOkBtn_csjc() {
        this._ownerSp_csjc.visible = false;
    }

    protected onCloseBtn_csjc() {
        var rate = GameSwitch_csjc.CurrentConfig.vivoAdConf_csjc.yuanshengWudian_csjc;
        if (Math.random() <= rate) {
            if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
                console.log("点击上报！！！")
                this._nativeAd_csjc.reportAdClick({
                    adId: this._curAdItem_csjc.adId
                })
            }
        }
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
        this.removeEvent();
        if (Laya.Browser.onVVMiniGame) {
            // if (this._nativeAd && this._nativeAd.title != null) {
            //     this._nativeAd.destroy();
            // }
            this._nativeAd_csjc = null;
            this._curAdItem_csjc = null;
        }
    }
    // protected showOkBtn() {
    //     let time = GameSwitch.CurrentConfig.oppoConf.yuanshengBtnShowTime * 1000;
    //     if (GameSwitch.CurrentConfig.oppoConf.yuanshengGameOver == 0) {
    //         this._ok_Btn.visible = false;
    //     }
    //     else if (time > 0) {
    //         this._ok_Btn.visible = false;
    //         Laya.timer.once(time, this, () => {
    //             this._ok_Btn.visible = true;
    //         })
    //     }
    //     else {
    //         this._ok_Btn.visible = true;
    //     }
    // }
}