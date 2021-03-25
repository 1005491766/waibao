import WXAPI_csjc from "./WXAPI";

export default class CachedWXBannerAd_csjc {
    protected static _bannerCache_csjc: any = {};
    protected static _curBanner_csjc: any = null;

    protected static readonly _preLoopObj_csjc = {}

    protected static readonly _wxBannerIds_csjc: Array<string> = [
        "adunit-b56f2105151c8af4",
        "adunit-da778e192859eeb2",
        "adunit-02f4a57b7c1a334a"
        // ,
        // "adunit-2f8440701664c50a",
        // "adunit-184455f3f8e74277",
    ]

    protected static _curBannerId_csjc: string = "";
    protected static _bannerIndex_csjc: number = 0;

    protected static _bannerDestoryTime: number = 0;

    protected static _sysInfo: any;

    protected static get GetBannerId_csjc(): string {
        if (this._wxBannerIds_csjc.length == 0) return "";
        let index = this._bannerIndex_csjc;
        if (this._bannerIndex_csjc > this._wxBannerIds_csjc.length - 1) {
            this._bannerIndex_csjc = 0;
            index = this._bannerIndex_csjc;
        }
        this._bannerIndex_csjc++;
        return this._wxBannerIds_csjc[index];
    }


    public static preloadBanner_csjc() {
        var bannerTodayBannerMax = 10;
        var preLoadBanners: Array<string> = new Array<string>();
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
        Laya.timer.loop(2000, CachedWXBannerAd_csjc._preLoopObj_csjc, () => {
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
    }

    protected static getBanner_csjc(bannerid: string): any {
        if (null == bannerid || "" == bannerid)
            return null;
        var banner = CachedWXBannerAd_csjc._bannerCache_csjc[bannerid];
        if (null == banner) {
            banner = CachedWXBannerAd_csjc.create_csjc(bannerid);
            if (null != banner) {
                CachedWXBannerAd_csjc._bannerCache_csjc[bannerid] = banner;
            }
        }
        return banner
    }

    protected static create_csjc(bannerid: string) {
        if (Laya.Browser.onMiniGame) {
            if (this._sysInfo == null) {
                this._sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            }
            var sw = this._sysInfo.screenWidth;
            var sh = this._sysInfo.screenHeight;
            var dpr = Laya.stage.height / sh;
            var banner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId: bannerid,
                    adIntervals: 30,
                    style:
                        {
                            left: (sw - 300) / 2,
                            top: sh - 115,
                            width: 300,
                        }
                })
            if (banner) {
                banner.onLoad((res) => {
                    console.log("CachedWXBanner 广告 加载完成", bannerid);
                })
                banner.onError((err) => {
                    console.log("CachedWXBanner 广告 加载失败", bannerid);
                })
                banner.onResize(res => {
                    console.log(banner.style.realWidth, banner.style.realHeight)
                })
            }
            return banner;
        }
        else {
            return null;
        }
    }

    public static show_csjc(style: number) {
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
    }


    public static hide_csjc(destroy: boolean = true) {
        Laya.timer.clearAll(CachedWXBannerAd_csjc);
        if (null != CachedWXBannerAd_csjc._curBanner_csjc) {
            let rd = Math.random() > Math.max(0.5, (this._bannerDestoryTime / 15));
            if (rd && destroy) {
                CachedWXBannerAd_csjc._curBanner_csjc.destroy();
                let banner = this.create_csjc(this._curBannerId_csjc);
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
    }

    public static changeShow_csjc(style, destroy: boolean = true) {
        if (null != CachedWXBannerAd_csjc._curBanner_csjc) {
            CachedWXBannerAd_csjc._curBanner_csjc.hide(destroy);
            CachedWXBannerAd_csjc._curBanner_csjc = null;
        }
        CachedWXBannerAd_csjc.show_csjc(style);
    }

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

    public static clear_csjc() {
        Laya.timer.clearAll(CachedWXBannerAd_csjc);
        for (var key in CachedWXBannerAd_csjc._bannerCache_csjc) {
            var banner = CachedWXBannerAd_csjc._bannerCache_csjc[key];
            if (null != banner) {
                banner.destroy();
            }
            CachedWXBannerAd_csjc._bannerCache_csjc[key] = null;
        }
    }
}