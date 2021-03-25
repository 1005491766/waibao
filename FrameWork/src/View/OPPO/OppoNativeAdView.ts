import ViewBase_csjc from "../../View/ViewBase";
import OPPOAPI_csjc from "../../PlatformApi/OPPOAPI";
import GameSwitch_csjc from "../../CommomAPI/GameSwitch/GameSwitch";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";


export default class OppoNativeAdView_csjc extends ViewBase_csjc {
    protected _centerZone_csjc: Laya.Sprite;
    protected _display_csjc: Laya.Sprite;
    protected _okBtn_csjc: Laya.Sprite;
    protected _closeBtn_csjc: Laya.Sprite;

    protected _nativeAd_csjc: any = null;
    protected _curAdItem_csjc: any = null;
    protected _reTry_csjc: boolean = false;
    protected _title_Text_csjc: Laya.Text;
    protected _desc_Text_csjc: Laya.Text;
    onAwake() {
        this._centerZone_csjc = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._display_csjc = this._centerZone_csjc.getChildByName("Display") as Laya.Sprite;
        this._okBtn_csjc = this._centerZone_csjc.getChildByName("OkBtn") as Laya.Sprite;
        this._closeBtn_csjc = this._centerZone_csjc.getChildByName("CloseBtn") as Laya.Sprite;
        this._title_Text_csjc = this._centerZone_csjc.getChildByName("Title_Text") as Laya.Text;
        this._desc_Text_csjc = this._centerZone_csjc.getChildByName("Desc_Text") as Laya.Text;
    }

    onStart() {
        this.loadAd_csjc();
    }

    addEvent() {
        super.addEvent();
        this._okBtn_csjc.on(Laya.Event.CLICK, this, this.onOkBtn_csjc);
        this._closeBtn_csjc.on(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.on(Laya.Event.CLICK, this, this.onDisplayClick_csjc);

    }

    removeEvent() {
        super.removeEvent();
        this._okBtn_csjc.off(Laya.Event.CLICK, this, this.onOkBtn_csjc);
        this._closeBtn_csjc.off(Laya.Event.CLICK, this, this.onCloseBtn_csjc);
        this._display_csjc.off(Laya.Event.CLICK, this, this.onDisplayClick_csjc);
    }

    protected loadAd_csjc() {
        var self = this;
        if (Laya.Browser.onQGMiniGame) {
            this._closeBtn_csjc.visible = false;
            if (this._nativeAd_csjc) {
                this._nativeAd_csjc.destroy();
                this._nativeAd_csjc = null;
            }
            this._curAdItem_csjc = null;

            this._nativeAd_csjc = qg.createNativeAd({
                posId: OPPOAPI_csjc.GetNativeAd_csjc
            })
            this._nativeAd_csjc.load();
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
                this._curAdItem_csjc = adlist[Math.floor(Math.random() * adlist.length)];
                if (null != this._curAdItem_csjc) {
                    for (var i = 0; i < this._curAdItem_csjc.imgUrlList.length; ++i) {
                        console.log("imgUrlList : ", i + " ", this._curAdItem_csjc.imgUrlList[i])
                    }
                    var imgulr = this._curAdItem_csjc.imgUrlList[Math.floor(Math.random() * this._curAdItem_csjc.imgUrlList.length)];
                    self._display_csjc.loadImage(imgulr, Laya.Handler.create(self, () => {
                        self._title_Text_csjc.text = this._curAdItem_csjc.title;
                        self._desc_Text_csjc.text = this._curAdItem_csjc.desc;
                        self._nativeAd_csjc.reportAdShow({
                            adId: self._curAdItem_csjc.adId
                        })
                    }));
                    console.log("加载图片", imgulr);
                }
                self.showCenterZone_csjc();
            })
            this._nativeAd_csjc.onError((res) => {
                console.log("原生广告加载失败：", res);
                for (var key in res) {
                    console.log(key, res[key]);
                }
                if (!this._reTry_csjc) {
                    this._reTry_csjc = true;
                    this._centerZone_csjc.visible = false;
                    Laya.timer.once(1000, self, () => {
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
    }

    protected onCloseBtn_csjc() {
        var rate = GameSwitch_csjc.CurrentConfig.oppoConf_csjc.yuanshengWudian_csjc;
        if (Math.random() <= rate) {
            if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
                console.log("点击上报！！！")
                this._nativeAd_csjc.reportAdClick({
                    adId: this._curAdItem_csjc.adId
                })
            }
        }
        this.closeView();
    }

    protected onOkBtn_csjc() {
        if (null != this._nativeAd_csjc && null != this._curAdItem_csjc) {
            console.log("点击上报！！！")
            this._nativeAd_csjc.reportAdClick({
                adId: this._curAdItem_csjc.adId
            })
        }
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
        super.onDestroy();
        if (Laya.Browser.onQGMiniGame) {
            if (this._nativeAd_csjc) {
                this._nativeAd_csjc.destroy();
            }
            this._nativeAd_csjc = null;
            this._curAdItem_csjc = null;
        }
    }

    protected showCenterZone_csjc() {
        this._centerZone_csjc.visible = true;
        let time = GameSwitch_csjc.CurrentConfig.oppoConf_csjc.yuanshengBtnShowTime_csjc * 1000;
        if (time > 0) {
            this._closeBtn_csjc.visible = false;
            Laya.timer.once(time, this, () => {
                this._closeBtn_csjc.visible = true;
            })
        }
        else {
            this._closeBtn_csjc.visible = true;
        }
    }

    onCloseEvent = () => {
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
    }
}