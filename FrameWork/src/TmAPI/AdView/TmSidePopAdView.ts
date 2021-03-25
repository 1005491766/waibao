import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import Utilit from "../../Utilit";

export default class TmSidePopAdView extends Laya.Script {
    protected _ownerSp: Laya.Sprite;
    protected _bg: Laya.Sprite;
    protected _popBtn: Laya.Sprite;
    protected _popOut_Img: Laya.Sprite;
    protected _popIn_Img: Laya.Sprite;

    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._popBtn = this._bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._popOut_Img = this._popBtn.getChildByName("PopOut") as Laya.Sprite;
        this._popIn_Img = this._popBtn.getChildByName("PopIn") as Laya.Sprite;
        this._popOut_Img.visible = true;
        this._popIn_Img.visible = false;
    }

    onEnable(): void {
        this._popBtn.on(Laya.Event.CLICK, this, this.onPopBtnClick);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_OnShareAdFail_csjc, this, this.onShareAdFail);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_SidePopViewSwitch_csjc, this, (res) => { this._ownerSp.visible = res });
    }

    onDisable(): void {
        this._popBtn.off(Laya.Event.CLICK, this, this.onPopBtnClick);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.AD_OnShareAdFail_csjc, this, this.onShareAdFail);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_SidePopViewSwitch_csjc, this, (res) => { this._ownerSp.visible = res });
    }


    protected onPopBtnClick() {
        if (this._bg.x > 0) {
            this.popDown();
        }
        else {
            this.popUp();
        }
    }

    public popDown() {
        Laya.Tween.to(this._bg,
            { x: 0 },
            250,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {

            }), null, true)
    }

    public popUp() {
        Utilit.forEachChild(this.owner, (owner:Laya.Node) => {
            owner.event("AdRefresh");
        });
        Laya.Tween.to(this._bg,
            { x: this._bg.width },
            250,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {

            }), null, true)
    }

    protected onShareAdFail() {
        this.popUp();
    }
}