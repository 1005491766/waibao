import ViewBase_csjc from "../../View/ViewBase";
import SignMgr_csjc from "../../Mgr/SignInMgr";
import User_csjc from "../../User/User";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import SkinMgr_csjc from "../../Mgr/SkinMgr";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import GameSwitch_csjc from "../../CommomAPI/GameSwitch/GameSwitch";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import WudianView from "../../View/GameView/WudianView";

export default class SignInView extends WudianView {
    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian：${swc}`);
        return swc && wudianSwitch;
    }
    OnSkipBtn() {
        this.NormalSignIn();
    }
    private _bg: Laya.Sprite;
    private _closeBtn: Laya.Sprite;
    private _vSignInBtn: Laya.Image;
    private _signDays: Array<Laya.UIComponent> = [];
    onAwake() {
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._closeBtn = this._bg.getChildByName("CloseBtn") as Laya.Sprite;
        this._skipBtn = this.owner.getChildByName("NSignInBtn") as Laya.Image;
        this._vSignInBtn = this._bg.getChildByName("VSignInBtn") as Laya.Image;
        this._signDays = this._bg.getChildByName("SignDays")._children;
        this.RefreshSignState();
    }
    addEvent() {
        this._closeBtn.on(Laya.Event.CLICK, this, this.OnCloseBtn);
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
        this._vSignInBtn.on(Laya.Event.CLICK, this, this.VideoSignIn);
    }

    RefreshSignState() {
        let data = SignMgr_csjc.Instance_csjc.SignInData_csjc;
        this._skipBtn.visible = false;
        this._vSignInBtn.visible = false;
        for (let index = 0; index < this._signDays.length; index++) {
            const dayBox = this._signDays[index];
            const day = data.SignInDays_csjc[index];
            if (day != -1) {
                (dayBox.getChildByName("Signed") as Laya.Sprite).visible = true;
                (dayBox.getChildByName("CanSign") as Laya.Sprite).visible = false;
                (dayBox.getChildByName("Today") as Laya.Sprite).visible = false;
            }
            else {
                if (index == SignMgr_csjc.Instance_csjc.DayInPeriod_csjc && !SignMgr_csjc.Instance_csjc.IsSignInToday_csjc) {
                    (dayBox.getChildByName("Signed") as Laya.Sprite).visible = false;
                    (dayBox.getChildByName("CanSign") as Laya.Sprite).visible = false;
                    (dayBox.getChildByName("Today") as Laya.Sprite).visible = true;
                    this._skipBtn.visible = true;
                    this._vSignInBtn.visible = true;
                }
                else {
                    (dayBox.getChildByName("Signed") as Laya.Sprite).visible = false;
                    (dayBox.getChildByName("CanSign") as Laya.Sprite).visible = true;
                    (dayBox.getChildByName("Today") as Laya.Sprite).visible = false;
                }
            }
        }
    }

    OnCloseBtn() {
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
        this.closeView();
    }

    NormalSignIn() {
        this.SignIn(false);
    }

    VideoSignIn() {
        WXAPI_csjc.showRewardedVideoAd_csjc((res) => {
            if (res) {
                ViewMgr_csjc.instance_csjc.showTips_csjc("视频签到成功");
                this.SignIn(true);
            }
            else {
                ViewMgr_csjc.instance_csjc.showTips_csjc("看完激励视频才能双倍领取");
            }
        }, () => {
            ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频拉取失败，请稍候重试");
        })
    }

    SignIn(video: boolean) {
        if (SignMgr_csjc.Instance_csjc.IsSignInToday_csjc) {
            return;
        }
        SignMgr_csjc.Instance_csjc.SignIn_csjc();
        let p = new Laya.Point();
        this._skipBtn.localToGlobal(p, false);
        switch (SignMgr_csjc.Instance_csjc.DayInPeriod_csjc) {
            case 0:
                if (!video) {
                    User_csjc.addMoney_csjc(100, p);
                }
                else {
                    User_csjc.addMoney_csjc(200, p);
                }
                SkinMgr_csjc.Instance_csjc.UnLockSkin_csjc(2);
                SkinMgr_csjc.Instance_csjc.SetCurrentSkin_csjc(2);
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.ChangeSkin, [2]);
                break;
            case 1:
                if (!video) {
                    User_csjc.addMoney_csjc(200, p);
                }
                else {
                    User_csjc.addMoney_csjc(400, p);
                }
                break;
            case 2:
                if (!video) {
                    User_csjc.addMoney_csjc(400, p);
                }
                else {
                    User_csjc.addMoney_csjc(800, p);
                }
                SkinMgr_csjc.Instance_csjc.UnLockSkin_csjc(4);
                SkinMgr_csjc.Instance_csjc.SetCurrentSkin_csjc(4);
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.ChangeSkin, [4]);
                break;
            case 3:
                if (!video) {
                    User_csjc.addMoney_csjc(800, p);
                }
                else {
                    User_csjc.addMoney_csjc(1600, p);
                }
                break;
            case 4:
                if (!video) {
                    User_csjc.addMoney_csjc(2000, p);
                }
                else {
                    User_csjc.addMoney_csjc(4000, p);
                }
                break;
        }
        (this.owner as Laya.View).mouseEnabled = false;
        this.RefreshSignState();
        Laya.timer.once(2000, this, () => {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
            this.closeView();
        })
    }
}