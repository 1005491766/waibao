import ViewBase_csjc from "../../View/ViewBase";
import SceneMgr_cscj from "../../Scripts/GameCore/SceneMgr";
import SoundMgr_csjc from "../../Mgr/SoundMgr";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import User_csjc from "../../User/User";
import TmAPI from "../../TmAPI/TmAPI";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";

export default class InGameView extends ViewBase_csjc {
    private _moreGameBtn: Laya.Image;
    private _gameOver: boolean = false;
    private _complete: Laya.Image;
    private _fail: Laya.Image;
    private _tutorialBtn: Laya.Image;

    onAwake() {
        this._moreGameBtn = this.owner.getChildByName("MoreGameBtn") as Laya.Image;
        this._tutorialBtn = this.owner.getChildByName("TutorialBtn") as Laya.Image;
        this._complete = this.owner.getChildByName("Complete") as Laya.Image;
        this._fail = this.owner.getChildByName("Fail") as Laya.Image;
        this._complete.visible = false;
        this._fail.visible = false;
        if (ExamineMgr.CanDoScz_Wx) {
            this.ShowBanner();
        }
    }

    addEvent() {
        this._tutorialBtn.on(Laya.Event.CLICK, this, this.OnTutorialBtn);
        this._moreGameBtn.on(Laya.Event.CLICK, this, this.OnMoreGameBtn);
    }

    onStart() {
        SoundMgr_csjc.instance_csjc.playBGM_csjc("Bgm2");
        if (User_csjc.getLeveNum_csjc() == 1) {
            TmAPI.SendEvent("GameStep", { Step: 2 });
        }

        // Scene3dMgr.Camera.viewport.project(Scene3dMgr.Monster.transform.position, Scene3dMgr.Camera.projectionViewMatrix, this.outpos)
        // subNum.pos(this.outpos.x / Laya.stage.clientScaleX ,this.outpos.y / Laya.stage.clientScaleY)
    }

    OnMoreGameBtn() {
        SceneMgr_cscj.Instance.PauseGame();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport1AdView);
    }

    OnTutorialBtn() {
        SceneMgr_cscj.Instance.PauseGame();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.TutorialView);
    }

    onShow() {
        super.onShow();
        // SceneMgr_cscj.Instance.StartGame();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.SelectHero);
    }

    onCloseEvent = () => {
        CachedWXBannerAd_csjc.hide_csjc();
        SoundMgr_csjc.instance_csjc.stopBGM_csjc();
        // SceneMgr_cscj.Instance.Player.StopSound();
        if (User_csjc.getLeveNum_csjc() == 1) {
            TmAPI.SendEvent("GameStep", { Step: 3 });
        }
    }

    onUpdate() {
        if (this._gameOver || SceneMgr_cscj.Instance.GameOver == 0) return;
        this._gameOver = true;
        if (SceneMgr_cscj.Instance.GameOver == 1) {
            this._complete.visible = true;
        }
        else if (SceneMgr_cscj.Instance.GameOver == -1) {
            this._fail.visible = true;
        }
        Laya.timer.once(3000, this, () => {
            if (SceneMgr_cscj.Instance.GameOver == 1) {
                this.GameOver(true);
            }
            else if (SceneMgr_cscj.Instance.GameOver == -1) {
                this.GameOver(false);
            }
        })
    }

    GameOver(win: boolean) {
        this.closeView();
        if (ExamineMgr.CanDoScz_Wx) {
            let data = { Win: false };
            if (win) {
                data.Win = true;
            }
            else {
                data.Win = false;
            }
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport1AdView, data);
        }
        else {
            if (win) {
                ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.GameOverWinView);
            }
            else {
                ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.GameOverFailView);
            }
        }
    }

    ShowBanner() {
        let rd = Math.random() * 5000;
        Laya.timer.once(15000 + rd, this, () => {
            // let rd = Math.random();
            // if (rd <= 0.33) {
            //     rd = -1
            // }
            // else if (rd > 0.33 && rd <= 0.66) {
            //     rd = 0;
            // }
            // else {
            //     rd = 1;
            // }
            CachedWXBannerAd_csjc.changeShow_csjc(0);
            Laya.timer.once(2500, this, () => {
                CachedWXBannerAd_csjc.hide_csjc();
                this.ShowBanner();
            })
        })
    }
}