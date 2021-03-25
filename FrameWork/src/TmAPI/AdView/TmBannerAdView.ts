
import IViewStateListener_csjc from "../../View/IViewStateListener";
import TmAPI from "../TmAPI";
import TmAppConfig from "../TmAppConfig";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import WXAPI_csjc from "../../PlatformApi/WXAPI";

export default class TmBannerAdView extends Laya.Script implements IViewStateListener_csjc {
    constructor() {
        super()
    }
    /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
    public AdLocationID: number = TmAPI.BannerAdLocationId;

    /** @prop {name:RefreshTime, tips:"刷新速度,单位为秒", type:Number, default:10}*/
    public RefreshTime: number = 10;

    protected _ownerSp: Laya.Sprite;

    protected _data: any = null;
    protected _positionId = 0;
    protected _creativeId = 0;
    protected _appId = "";
    public WXBannerWidth: number;
    protected _wxBanner: any = null;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
    }
    onDisable() {
        this.clearBannerWx();
    }
    refreshAd() {
        if (TmAppConfig.CurrentConfig.wxBanner && (Laya.Browser.onMiniGame || Laya.Browser.onQQMiniGame)) {
            console.log("Banner组件显示BannerWx");
            this.refreshBannerWx();
        }
        else {
            console.log("Banner组件显示BannerAd");
            this.refreshBannerAd();
        }
    }

    refreshBannerAd() {
        TmAPI.TryGetAdvs(this.AdLocationID, (config) => {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", this.AdLocationID, " 状态为关闭,隐藏控件");
                this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 11) {
                console.log("广告位：", this.AdLocationID, " 数据位空或者类型错误");
                return;
            }
            if (this.owner && !this.owner.destroyed) {
                this._data = config.creatives[0];
                this._creativeId = this._data.creativeId;
                this._positionId = this._data.positionId;
                this._appId = config.appId;
                Laya.loader.load(this._data.show_config.image, Laya.Handler.create(this, () => {
                    this._ownerSp.loadImage(this._data.show_config.image);
                    Laya.timer.once(this.RefreshTime * 1000, this, this.refreshBannerAd);
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
    }


    onClick() {
        if (this._data) {
            console.log("跳转游戏： " + this._appId);
            TmAPI.NavigateAndReport(this._positionId, this._creativeId, this._appId, (flag, list) => {
                if (!flag) {
                    EventMgr_csjc.dispatch_csjc(EventDef_csjc.AD_OnShareAdFail_csjc);
                }
                if (list != null) {

                }
            });
        }
    }

    protected refreshBannerWx() {
        if (!Laya.Browser.onMiniGame || !(this.owner as Laya.Sprite).visible)
            return;
        this.clearBannerWx();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._ownerSp.localToGlobal(new Laya.Point(0, 0))

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
        Laya.timer.clear(this, this.refreshBannerAd);
    }

    public onViewShow() {
        this.refreshAd();
    }

    public onViewHide() {
        this.clearBannerWx();
    }
}