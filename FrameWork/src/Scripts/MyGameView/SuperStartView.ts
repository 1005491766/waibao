import ViewBase_csjc from "../../View/ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import User_csjc from "../../User/User";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import WudianView from "../../View/GameView/WudianView";

export default class SurperStartView extends WudianView {
    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian：${swc}`);
        return swc && wudianSwitch;
    }
    OnSkipBtn() {
        this.NormalStart();
    }
    protected _videoBtn1: Laya.Image;
    protected _videoBtn2: Laya.Image;
    protected _bg: Laya.Image;
    onAwake() {
        this._bg = this.owner.getChildByName("BG") as Laya.Image;
        this._videoBtn1 = this._bg.getChildByName("VideoBtn1") as Laya.Image;
        this._videoBtn2 = this._bg.getChildByName("VideoBtn2") as Laya.Image;
        this._skipBtn = this.owner.getChildByName("SkipBtn") as Laya.Image;
        if (User_csjc.getLeveNum_csjc() < 3) {
            this._videoBtn1.visible = false
            this._videoBtn2.visible = true;
            this._skipBtn.visible = false;
        }
        else {
            this._videoBtn1.visible = true
            this._videoBtn2.visible = false;
            this._skipBtn.visible = true;
        }
    }

    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
        this._videoBtn1.on(Laya.Event.CLICK, this, this.OnVideoBtn1);
        this._videoBtn2.on(Laya.Event.CLICK, this, this.SuperStart);
    }

    OnVideoBtn1() {
        WXAPI_csjc.showRewardedVideoAd_csjc((res) => {
            if (res) {
                ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频强力开局");
                this.SuperStart();
            }
            else {
                ViewMgr_csjc.instance_csjc.showTips_csjc("看完激励视频才能强力开局");
            }
        }, () => {
            ViewMgr_csjc.instance_csjc.showTips_csjc("激励视频拉取失败，请稍候重试");
        })
    }

    NormalStart() {
        this.closeView();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
    }

    SuperStart() {
        this.closeView();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView, { SuperStart: true });
    }
}