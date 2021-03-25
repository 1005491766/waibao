import { SkinState } from "../GameCore/Enums";
import SkinMgr_csjc from "../../Mgr/SkinMgr";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import WXAPI_csjc from "../../PlatformApi/WXAPI";

export default class SkinBox extends Laya.Script {
    constructor() {
        super()
    }
    private _select_Img: Laya.Image;
    private _owned_Img: Laya.Image;
    private _notOwned_Img: Laya.Image;
    private _skin_Img: Laya.Image;
    private _skinState: SkinState;
    private _skinIndex: number = 0;

    onAwake() {
        this._select_Img = this.owner.getChildByName("Selected") as Laya.Image;
        this._owned_Img = this.owner.getChildByName("Owned") as Laya.Image;
        this._notOwned_Img = this.owner.getChildByName("NotOwned") as Laya.Image;
        this._skin_Img = this.owner.getChildByName("Skin") as Laya.Image;
    }

    SetDate(skinIndex: number, skinState: SkinState) {
        this._skinIndex = skinIndex;
        this._skinState = skinState;
        this._skin_Img.skin = "Skin/" + this._skinIndex + ".png";
        switch (this._skinState) {
            case SkinState.Owned:
                this._notOwned_Img.visible = false;
                this._select_Img.visible = false;
                this._owned_Img.visible = true;
                break;
            case SkinState.NotOwned:
                this._notOwned_Img.visible = true;
                this._select_Img.visible = false;
                this._owned_Img.visible = false;
                break;
            case SkinState.Seleced:
                this._notOwned_Img.visible = false;
                this._select_Img.visible = true;
                this._owned_Img.visible = false;
                break;
        }
    }

    onEnable(): void {
        this.owner.on(Laya.Event.CLICK, this, this.onClick);
    }

    onDisable(): void {
        this.owner.off(Laya.Event.CLICK, this, this.onClick);
    }

    onClick() {
        if (this._skinState == SkinState.NotOwned) {
            this.OnButtonClick();
        }
        else if (this._skinState == SkinState.Owned) {
            this.SetSkin();
        }
    }

    SetSkin() {
        SkinMgr_csjc.Instance_csjc.SetCurrentSkin_csjc(this._skinIndex);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.ChangeSkin, this._skinIndex);
    }

    VideoUnlock() {
        ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频解锁");
        SkinMgr_csjc.Instance_csjc.UnLockSkin_csjc(this._skinIndex);
        this.SetSkin();
    }

    OnButtonClick() {
        WXAPI_csjc.showRewardedVideoAd_csjc((res) => {
            if (res) {
                ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频解锁");
                this.VideoUnlock();
            }
            else {
                ViewMgr_csjc.instance_csjc.showTips_csjc("看完激励视频才能解锁");
            }
        }, () => {
            ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频拉取失败，请稍候重试");
        })
    }
}