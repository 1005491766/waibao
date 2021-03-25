import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default class PopAdView extends Laya.Script {
    protected _bg: Laya.UIComponent;
    protected _popBtn: Laya.Sprite;

    protected _popOut: Laya.Sprite;
    protected _popIn: Laya.Sprite;

    onAwake() {
        this._bg = this.owner as Laya.UIComponent;
        this._popBtn = this.owner.getChildByName("PopADBtn") as Laya.Sprite;
        this._popOut = this._popBtn.getChildByName("PopOut") as Laya.Sprite;
        this._popIn = this._popBtn.getChildByName("PopIn") as Laya.Sprite;
        this._popIn.visible = false;
        this._popOut.visible = true;
        // EventMgr_csjc.regEvent_csjc(EventDef.AD_CloseSideView, this, this.SingelPopDown);
        // EventMgr_csjc.regEvent_csjc(EventDef.AD_HideSideView, this, () => { this.owner.visible = false });
        // EventMgr_csjc.regEvent_csjc(EventDef.AD_ShowSideView, this, () => { this.owner.visible = true });
    }

    onEnable(): void {
        if (ExamineMgr.CanShowAd_Wx) {
            this._popBtn.on(Laya.Event.CLICK, this, this.onPopBtnClick);
            EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_OnShareAdFail_csjc, this, this.onShareAdFail);
            EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_SidePopViewSwitch_csjc, this, this.switchPopAd);
        }
        else {
            this._bg.visible = false;
        }
    }

    onDisable(): void {
        this._popBtn.off(Laya.Event.CLICK, this, this.onPopBtnClick);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.AD_OnShareAdFail_csjc, this, this.onShareAdFail);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.AD_SidePopViewSwitch_csjc, this, this.switchPopAd);
        // EventMgr_csjc.removeEvent_csjc(EventDef_csjc.AD_OnShareAdFail, this, this.onShareAdFail);
    }

    protected onPopBtnClick() {
        if (this._bg.left > -100) {
            this.popIn();
        }
        else {
            this.popOut();
        }
    }

    protected switchPopAd(Show) {
        if (Show) {
            this.popOut();
        }
        else {
            this.popIn();
        }
    }
    // public SinglePopUp() {
    //     Laya.Tween.to(this._bg,
    //         { left: 490 },
    //         250,
    //         Laya.Ease.circIn, Laya.Handler.create(this, () => {
    //             this._popOut.visible = false;
    //             this._popIn.visible = true;
    //         }), null, true)
    // }
    // public SingelPopDown() {
    //     Laya.Tween.to(this._bg,
    //         { left: 0 },
    //         250,
    //         Laya.Ease.circIn, Laya.Handler.create(this, () => {
    //             this._popOut.visible = true;
    //             this._popIn.visible = false;
    //         }), null, true)
    // }
    public popIn() {

        Laya.Tween.to(this._bg,
            { left: -550 },
            250,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {
                this._popOut.visible = true;
                this._popIn.visible = false;
                // EventMgr_csjc.dispatch(EventDef.AD_CloseBanner);
                // EventMgr_csjc.dispatch(EventDef.AD_OpenBottomLoopView);
                // console.log("EventDef.AD_CloseSideView");
            }), null, true)
    }

    public popOut() {
        Laya.Tween.to(this._bg,
            { left: 0 },
            250,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {
                this._popOut.visible = false;
                this._popIn.visible = true;
                // if (ViewMgr.instance.getView(ViewDef.MoreGame) == null) {
                //     EventMgr_csjc.instance.dispatch(EventDef.AD_OpenBanner);
                // }
                // if (!AdvertisementView.ShowBothAd) {
                //     EventMgr_csjc.instance.dispatch(EventDef.AD_CloseBottomLoopView);
                // }
            }), null, true)
    }

    protected onShareAdFail() {
        this.popOut();
    }
}