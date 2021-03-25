import ViewBase_csjc from "../../View/ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import User_csjc from "../../User/User";
import TmAPI from "../../TmAPI/TmAPI";

export default class SuperStartClicl_csjc extends ViewBase_csjc {
    protected _bg_csjc: Laya.UIComponent;
    protected _getPrizeView: Laya.UIComponent;
    protected _closeBtn: Laya.Image;
    protected _clickBtn_csjc: Laya.Button;
    protected _progress_csjc: Laya.Image;
    protected _progressBar_csjc: Laya.Image;
    protected _progressWidth_csjc: number = 0;
    protected _clickTime_csjc: number = 0;//用来保存用户当前点击次数
    protected _totalClickTime_csjc: number = 0;//用于计算客户总共点击了多少次按钮
    protected _totalClickTimer_csjc: number = 30;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _needClickTime_csjc: number = 15;//一共点多少次能够获得奖励，用于显示进度条
    protected _bannerClickTime_csjc: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户  
    protected _bannerClicked_csjc: boolean = false;//Banner是否已经点击;
    protected _needShowAni: boolean = true;
    protected _countTimer: number = 0;//效果计时器
    private _rollerImg: Laya.Image;

    onAwake() {
        this._bg_csjc = this.owner.getChildByName("BG") as Laya.UIComponent;
        this._getPrizeView = this.owner.getChildByName("GetPrizeView") as Laya.UIComponent;
        this._closeBtn = this._getPrizeView.getChildByName("CloseBtn") as Laya.Image;
        this._rollerImg = this._bg_csjc.getChildByName("Roller") as Laya.Image;
        this._progress_csjc = this.owner.getChildByName("Progress") as Laya.Image;
        this._progressBar_csjc = this._progress_csjc.getChildByName("Bar") as Laya.Image;
        this._progressWidth_csjc = this._progressBar_csjc.width;
        this._progressBar_csjc.width = 0;
        this._clickBtn_csjc = this.owner.getChildByName("ClickBtn") as Laya.Button;
        this._getPrizeView.visible = false;
    }

    onStart() {
        super.onStart();
    }

    addEvent() {
        this._clickBtn_csjc.on(Laya.Event.CLICK, this, this.OnClickBtn);
        this._closeBtn.on(Laya.Event.CLICK, this, this.OnCloseBtn);
    }

    removeEvent() {

    }

    onUpdate() {
        if (this._needShowAni) {
            this._countTimer += Laya.timer.delta / 1000;
            let angle = this._countTimer * 3.14 / 180 * 360;
            this._rollerImg.x = 123 + Math.sin(angle) * 20;
            this._rollerImg.y = 644 + Math.cos(angle) * 20;
            this._rollerImg.scaleX = (this._clickTime_csjc / this._needClickTime_csjc * 0.5) + 1;
            this._rollerImg.scaleY = (this._clickTime_csjc / this._needClickTime_csjc * 0.5) + 1;
            let progress = this._clickTime_csjc / this._needClickTime_csjc;
            let spd = 2 + (progress * 2);
            if (this._progressBar_csjc.width >= spd) {
                this._progressBar_csjc.width -= spd;
            }
            if ((this._progressBar_csjc.width / this._progressWidth_csjc) + 0.1 < progress) {
                this._clickTime_csjc--;
            }
        }
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
        this.OpenGetPrize();
    }

    OpenGetPrize() {
        this._getPrizeView.visible = true;
    }

    ShowBanner() {
        CachedWXBannerAd_csjc.show_csjc(0);
    }

    OnCloseBtn() {
        this.closeView();
    }

    onCloseEvent = () => {
        CachedWXBannerAd_csjc.hide_csjc();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView, { SuperStart: true });
    }

    onOpenEvent = () => {
        CachedWXBannerAd_csjc.hide_csjc();
    }
}