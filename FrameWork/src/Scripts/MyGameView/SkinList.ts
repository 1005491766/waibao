import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import SkinMgr_csjc from "../../Mgr/SkinMgr";
import { SkinState } from "../GameCore/Enums";
import SkinBox from "./SkinBox";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import { CameraSetting } from "../GameCore/GameSetting";

export default class SkinList extends Laya.Script {
    constructor() {
        super();
    }
    private _ownerView: Laya.UIComponent;
    private _close_Btn: Laya.UIComponent;
    private _unlockSkin_Btn: Laya.UIComponent;
    private _list: Laya.List;
    onAwake() {
        this._ownerView = this.owner as Laya.UIComponent;
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._close_Btn = this.owner.getChildByName("Close_Btn") as Laya.UIComponent;
        this._unlockSkin_Btn = this.owner.getChildByName("UnlockSkin_Btn") as Laya.UIComponent;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
    }
    onEnable() {
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.ChangeSkin, this, this.ShowSkin1);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.SkinView, this, this.SkinView);
        this._close_Btn.on(Laya.Event.CLICK, this, this.OnCloseBtn);
        this._unlockSkin_Btn.on(Laya.Event.CLICK, this, this.onUnlockBtn);
        this.RefreshSkin();
    }

    SkinView(show: boolean) {
        Laya.Tween.clearAll(this._ownerView);
        if (show) {
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: CameraSetting.SkinViewOffset, CameraViewForward: 0 });
            Laya.Tween.to(this._ownerView, { bottom: 200 }, 300);
        }
        else {
            this.CloseList();
        }
    }

    OnCloseBtn() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.SkinView, false);
    }

    CloseList() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: CameraSetting.GoundOffset, CameraViewForward: 3 });
        Laya.Tween.to(this._ownerView, { bottom: -500 }, 300);
    }

    onDisable() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.ChangeSkin, this, this.ShowSkin1);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.SkinView, this, this.SkinView);
    }

    RefreshSkin() {
        let ownedList = SkinMgr_csjc.Instance_csjc.CurrentSkinDate_csjc.Owned_csjc;
        let skinstate: Array<any> = [];
        for (let i = 0; i < ownedList.length; i++) {
            if (ownedList[i]) {
                if (SkinMgr_csjc.Instance_csjc.GetCurrentSkin_csjc() == i) {
                    skinstate.push(SkinState.Seleced);
                }
                else {
                    skinstate.push(SkinState.Owned);
                }
            }
            else {
                skinstate.push(SkinState.NotOwned);
            }
        }
        this._list.array = skinstate;
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: SkinBox = cell.getComponent(SkinBox);
        loopAdBox.SetDate(index, data);
    }

    ShowSkin1() {
        this.RefreshSkin();
        // this._ownerView.mouseEnabled = false;
        // Laya.Tween.to(this._ownerView, { bottom: -100 }, 200, null, Laya.Handler.create(this, this.ShowSkin2));
    }

    ShowSkin2() {
        Laya.Tween.to(this._ownerView, { bottom: 200 }, 200, null, Laya.Handler.create(this, () => {
            this._ownerView.mouseEnabled = true;
        }), 1000);
    }

    UnlockRandomSkin() {
        let ownedList = SkinMgr_csjc.Instance_csjc.CurrentSkinDate_csjc.Owned_csjc;
        let skinstate: Array<any> = [];
        for (var i = 0; i < ownedList.length; i++) {
            if (!ownedList[i]) {
                break;
            }
        }
        i = Math.min(ownedList.length - 1, i);
        SkinMgr_csjc.Instance_csjc.UnLockSkin_csjc(i);
        SkinMgr_csjc.Instance_csjc.SetCurrentSkin_csjc(i);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.ChangeSkin, i);
    }

    onUnlockBtn() {
        WXAPI_csjc.showRewardedVideoAd_csjc((res) => {
            if (res) {
                ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频解锁");
                this.UnlockRandomSkin();
            }
            else {
                ViewMgr_csjc.instance_csjc.showTips_csjc("看完激励视频才能解锁");
            }
        }, () => {
            ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频拉取失败，请稍候重试");
        })
    }
}