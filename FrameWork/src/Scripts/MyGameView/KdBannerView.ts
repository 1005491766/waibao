import ViewBase_csjc from "../../View/ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";

export default class KdBannerView extends ViewBase_csjc {
    protected _needShowAni: boolean = true;
    protected _countTimer: number = 0;//效果计时器
    protected _treasure_csjc: Laya.Image;//宝箱
    protected _clickBtn_csjc: Laya.Button;//点击按钮
    protected _progress_csjc: Laya.Image;//当前进度
    protected _progressBar_csjc: Laya.Image;//
    protected _progressWidth_csjc: number = 0;//进度条宽度
    protected _clickTime_csjc: number = 0;//用来保存用户当前点击次数
    protected _totalClickTime_csjc: number = 0;//用于计算客户总共点击了多少次按钮
    protected _totalClickTimer_csjc: number = 30;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _needClickTime_csjc: number = 15;//一共点多少次能够获得奖励，用于显示进度条
    protected _bannerClickTime_csjc: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户  
    protected _bannerClicked_csjc: boolean = false;//Banner是否已经点击;
    onAwake() {
        this._treasure_csjc = this.owner.getChildByName("Treasure") as Laya.Image;
        this._progress_csjc = this.owner.getChildByName("Progress") as Laya.Image;
        this._progressBar_csjc = this._progress_csjc.getChildByName("Bar") as Laya.Image;
        this._progressWidth_csjc = this._progressBar_csjc.width;
        this._progressBar_csjc.width = 0;
        this._clickBtn_csjc = this.owner.getChildByName("ClickBtn") as Laya.Button;
    }

    onUpdate() {
        if (this._needShowAni) {
            this._countTimer += Laya.timer.delta / 1000;
            let angle = this._countTimer * 3.14 / 180 * 720;
            this._treasure_csjc.rotation = Math.sin(angle) * 15
            let progress = this._clickTime_csjc / this._needClickTime_csjc;
            let spd = 2 + (progress * 2);
            if (this._progressBar_csjc.width >= spd) {
                this._progressBar_csjc.width -= spd;
            }
            if ((this._progressBar_csjc.width / this._progressWidth_csjc) + 0.1 < progress) {
                this._clickTime_csjc--;
            }
        }
        else {
            this._treasure_csjc.rotation = 0;
        }
    }

    addEvent() {
        this._clickBtn_csjc.on(Laya.Event.CLICK, this, this.OnClickBtn);
    }

    OnClickBtn() {
        this._totalClickTime_csjc++;
        this._clickTime_csjc++;
        if (this._clickTime_csjc > this._needClickTime_csjc) {
            this._clickTime_csjc = this._needClickTime_csjc;
        }
        if (this._clickTime_csjc >= this._bannerClickTime_csjc) {
            if (this._clickTime_csjc >= this._needClickTime_csjc) {
                this._clickTime_csjc = this._needClickTime_csjc - 1;
            }
            if (this._bannerClicked_csjc) {
                let progress = this._clickTime_csjc / this._needClickTime_csjc;
                this._progressBar_csjc.width = progress * this._progressWidth_csjc;
                return;
            }
            this._bannerClicked_csjc = true;
            this.ShowBanner();
            Laya.timer.once(1500, this, () => {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime_csjc > this._totalClickTimer_csjc) {
            this.ShowBanner();
            this.BannerClicked();
        }
        let progress = this._clickTime_csjc / this._needClickTime_csjc;
        this._progressBar_csjc.width = progress * this._progressWidth_csjc;
    }

    BannerClicked() {
        this._needShowAni = false;
        this._bannerClicked_csjc = true;
        this._clickTime_csjc = this._needClickTime_csjc;
        this._progressBar_csjc.width = this._progressWidth_csjc;
        this._clickBtn_csjc.visible = false;
        this.closeView();
    }

    onOpenEvent = () => {
        CachedWXBannerAd_csjc.hide_csjc();
    }

    onCloseEvent = () => {
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
        CachedWXBannerAd_csjc.hide_csjc();
    }

    ShowBanner() {
        CachedWXBannerAd_csjc.changeShow_csjc(1);
    }
}