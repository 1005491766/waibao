import ViewBase_csjc from "../../View/ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import SkinMgr_csjc from "../../Mgr/SkinMgr";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import SignMgr_csjc from "../../Mgr/SignInMgr";
import User_csjc from "../../User/User";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import WudianView from "../../View/GameView/WudianView";

export default class GetSkinView extends WudianView {
    protected _hideFirst = true;
    protected _wudianTpye = 2;
    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian4：${swc}`);
        return swc && wudianSwitch;
    }
    OnSkipBtn() {
        this.NoGetSkin();
    }
    private _bg: Laya.Image;
    private _videoBtn: Laya.Image;
    protected _skipBtn: Laya.Image;
    private _skinImage: Laya.Image;
    private _skinIndex: number;
    onAwake() {
        this._bg = this.owner.getChildByName("BG") as Laya.Image;
        this._videoBtn = this._bg.getChildByName("VideoBtn") as Laya.Image;
        this._skipBtn = this.owner.getChildByName("SkipBtn") as Laya.Image;
        this._skinImage = this._bg.getChildByName("SkinImage") as Laya.Image;
        this.GetAvailableSkin();
    }

    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn)
        this._videoBtn.on(Laya.Event.CLICK, this, this.OnVideoBtn)
    }

    GetAvailableSkin() {
        for (let index = 0; index < SkinMgr_csjc.Instance_csjc.CurrentSkinDate_csjc.Owned_csjc.length; index++) {
            const element = SkinMgr_csjc.Instance_csjc.CurrentSkinDate_csjc.Owned_csjc[index];
            if (element == false) {
                this._skinIndex = index;
                break;
            }
        }
        this._skinImage.skin = "Skin/" + this._skinIndex + ".png"
    }

    NoGetSkin() {
        this.closeView();
        if (!SignMgr_csjc.Instance_csjc.IsSignInToday_csjc && User_csjc.getLeveNum_csjc() > 2) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.SignInView);
        }
        else {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
        }
    }

    OnVideoBtn() {
        WXAPI_csjc.showRewardedVideoAd_csjc((res) => {
            if (res) {
                ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频解锁");
                this.UnlockSkin();
            }
            else {
                ViewMgr_csjc.instance_csjc.showTips_csjc("看完激励视频才能解锁");
            }
        }, () => {
            ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频拉取失败，请稍候重试");
        })
    }

    UnlockSkin() {
        ViewMgr_csjc.instance_csjc.showTips_csjc("皮肤已解锁");
        SkinMgr_csjc.Instance_csjc.UnLockSkin_csjc(this._skinIndex);
        SkinMgr_csjc.Instance_csjc.SetCurrentSkin_csjc(this._skinIndex);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.ChangeSkin, [this._skinIndex]);
        this.closeView();
        if (!SignMgr_csjc.Instance_csjc.IsSignInToday_csjc && User_csjc.getLeveNum_csjc() > 2) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.SignInView);
        }
        else {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
        }
    }
}