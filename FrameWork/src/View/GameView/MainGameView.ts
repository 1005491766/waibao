import ViewBase_csjc from "../ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import SoundMgr_csjc from "../../Mgr/SoundMgr";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import TmAPI from "../../TmAPI/TmAPI";
import User_csjc from "../../User/User";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import GameMgr_csjc from "../../Scripts/GameMgr";

export default class MainGameView extends ViewBase_csjc {
    private _aniZone: Laya.UIComponent;
    private _ani1: Laya.Image;
    private _ani2: Laya.Image;
    private _startBtn: Laya.Image;
    private _moreGameBtn: Laya.Image;
    private _loopAd: Laya.UIComponent;
    canin =true

    onAwake() {
        this._aniZone = this.owner.getChildByName("AniZone") as Laya.UIComponent;
        this._ani1 = this._aniZone.getChildByName("Robot") as Laya.Image;
        this._ani2 = this._aniZone.getChildByName("Car") as Laya.Image;
        // this._ani1.skin = "subRes/image/img_jiqiren.png";
        this._loopAd = this.owner.getChildByName("BottomLoopAd") as Laya.UIComponent;
        // this._ani2.skin = "subRes/image/img_che.png";
        // if (!ExamineMgr.CanDoScz_Wx) {
        //     this._ani1.visible = false;
        // }
        this._startBtn = this.owner.getChildByName("StartBtn") as Laya.Image;
        this._moreGameBtn = this.owner.getChildByName("MoreGameBtn") as Laya.Image;
    }

    onStart() {
        if (User_csjc.getLeveNum_csjc() == 1) {
            TmAPI.SendEvent("GameStep", { Step: 1 });
        }
        if (Laya.Browser.onMiniGame) {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var dpr = Laya.stage.width / sw;
            console.log(sysInfo.screenWidth, sysInfo.screenHeight);
            this._loopAd.left = Laya.stage.width - ((sw - 350) * dpr);
        }
        else {
            this._loopAd.left = Laya.stage.width - 350;
        }
    }

    addEvent() {
        this.canin = true;
        this._startBtn.on(Laya.Event.CLICK, this, this.OnStartBtn);
        this._moreGameBtn.on(Laya.Event.CLICK, this, this.OnMoreGameBtn);
    }

    OnStartBtn() {
        if (Laya.Browser.onMiniGame) {
            if (ExamineMgr.CanDoKd_Wx && QpGameSwitch.customkey.startVideo == 1) {
                WXAPI_csjc.showRewardedVideoAd_csjc(() => {
                    this.StartGame();
                }, () => {
                    this.StartGame();
                })
            }
            else {
                this.StartGame();
            }
        }
        else {
            this.StartGame();
        }
    }
    StartGame() {
        if(this.canin == false)
        return ;
        this.closeView();
        this.canin = false;

        console.log("-------------进入游戏界面")
        // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.KdBannerView,{func:()=>{
        //     ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
        // }});
        // return
        if (ExamineMgr.CanDoScz_Wx && QpGameSwitch.GameSwitch.bannerKuangdian1 == 1) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.KdBannerView,{func:()=>{
                ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
            }});
        }
        else {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
        }
    }

    OnMoreGameBtn() {
        this.closeView();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport1AdView);
        // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.FriendExportView);
    }

    onShow() {
        super.onShow();
        CachedWXBannerAd_csjc.changeShow_csjc(-1);
        SoundMgr_csjc.instance_csjc.playBGM_csjc("Bgm2");
        Laya.timer.once(500, this, () => {
            Laya.Tween.to(this._ani1, { right: 0 }, 500);
            Laya.Tween.to(this._ani2, { left: -51 }, 500);
        })
    }

    onCloseEvent = () => {
        GameMgr_csjc.getInstance().FirstAd = true;
        CachedWXBannerAd_csjc.hide_csjc();
    }
}