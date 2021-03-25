
import IViewStateListener_csjc from "../../View/IViewStateListener";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import { AdDataMgr, ComponentStyle } from "../AdDataMgr";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default class TmBannerAdView extends Laya.Script implements IViewStateListener_csjc {
    constructor() {
        super()
    }

    /** @prop {name:RefreshTime, tips:"刷新速度,单位为毫秒", type:Number, default:6000}*/
    public RefreshTime: number = 6000;

    protected _showSp: Laya.Sprite;

    protected _data: any = null;
    public WXBannerWidth: number;
    protected _wxBanner: any = null;
    onAwake() {
        this._showSp = this.owner.getChildByName("Display") as Laya.Sprite;
        if (this._showSp == null) {
            this._showSp = this.owner as Laya.Sprite;
        }
    }
    onDisable() {
        this.clearBannerWx();
    }

    onStart() {
        if (ExamineMgr.CanShowAd_Wx) {
            this.refreshAd();
        }
        else {
            this._showSp.visible = false;
        }
    }

    refreshAd() {
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
    }

    refreshBannerAd() {
        this._data = AdDataMgr.Instance.GetDataByStyleAndCount(ComponentStyle.banner, 1)[0];
        if (this._data) {
            console.log(this._data);
            this._showSp.loadImage(this._data.bannerList[Math.floor(Math.random() * this._data.bannerList.length)]);
        }
    }


    onClick() {
        if (this._data) {
            console.log("跳转游戏： " + this._data.gameName);
            if (Laya.Browser.onMiniGame) {
                AdDataMgr.Instance.NavigateTo(ComponentStyle.banner, this._data);
            }
            else {
                console.log("跳转完成")
            }
        }
    }

    protected refreshBannerWx() {
        Laya.timer.clear(this, this.refreshBannerAd);
        if (!Laya.Browser.onMiniGame || !(this.owner as Laya.Sprite).visible)
            return;
        this.clearBannerWx();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._showSp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;

        this._wxBanner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: WXAPI_csjc.bannerAdUnitId_csjc,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wxBanner.onLoad((res) => {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        })
        this._wxBanner.onError((err) => {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            this.refreshBannerAd();
            this.clearBannerWx();
        })
        this._wxBanner.onResize(res => {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight)
        })
        self._wxBanner.show();
    }

    public clearBannerWx() {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
        CachedWXBannerAd_csjc.hide_csjc();
        Laya.timer.clear(this, this.refreshBannerAd);
    }

    public onViewShow() {

    }

    public onViewHide() {
        this.clearBannerWx();
    }
}