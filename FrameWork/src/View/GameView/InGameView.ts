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
import Camera2UI from "../../Scripts/GameCore/Camera2UI";
import { PlayerType } from "../../Scripts/GameCore/Enums";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import GameStep from "../../Scripts/MyGameView/GameStep";

export default class InGameView extends ViewBase_csjc {
    private _moreGameBtn: Laya.Image;
    private _gameOver: boolean = false;
    private _complete: Laya.Image;
    private _fail: Laya.Image;
    private _tutorialBtn: Laya.Image;
    private _pros:Laya.Image;
    private _prosSpeedOf:Laya.Image;

    private _playerPros:Laya.Image;
    private _playerProsSpeedOf:Laya.Image;
    private _selecetKind = 0;
    private tip_boss:Laya.Sprite;
    private timer_boss:Laya.FontClip;

    private GameStep:Laya.Sprite;
    onAwake() {
        this._moreGameBtn = this.owner.getChildByName("MoreGameBtn") as Laya.Image;
        this._tutorialBtn = this.owner.getChildByName("TutorialBtn") as Laya.Image;
        this._complete = this.owner.getChildByName("Complete") as Laya.Image;
        this._pros = this.owner.getChildByName("progress") as Laya.Image;
        this._prosSpeedOf = this._pros.getChildAt(0) as Laya.Image;
        this._playerPros = this.owner.getChildByName("Playerprogress") as Laya.Image;
        this._playerProsSpeedOf = this._playerPros.getChildAt(0) as Laya.Image;
        this.tip_boss = this.owner.getChildByName("tip_boss") as Laya.Sprite
        this.timer_boss = this.tip_boss.getChildByName("GameTimer") as Laya.FontClip
        this._pros.visible =false
        this._playerPros.visible =false

        this.GameStep = this.owner.getChildByName("GameStep") as Laya.Sprite;

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
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.SelectHero, this, this.OnSelectHero);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.BossVisible, this, this.onBossVisible);
    }
    removeEvent(){
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.SelectHero, this, this.OnSelectHero);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.BossVisible, this, this.onBossVisible);
    }
    /**
     * 怪物出现
     */
    onBossVisible()
    {
        this._pros.visible =true
        this._playerPros.visible =true
        this.tip_boss.visible=true
        this.GameStep.alpha = 0

    }
    /**监听选择英雄 */
    OnSelectHero(){
        if(SceneMgr_cscj.Instance.PlayerKind == PlayerType.Kingkong)
        {
            this._playerProsSpeedOf.skin = "GamePlaying/boss_xuetiao_jingang.png";
            (this._playerProsSpeedOf.getChildAt(0) as Laya.Image).skin = "GamePlaying/touxiang_jingang.png";

            this._prosSpeedOf.skin = "GamePlaying/boss_xuetiao_long.png";
            (this._prosSpeedOf.getChildAt(0) as Laya.Image).skin = "GamePlaying/touxiang_long.png";
            this._selecetKind = 0
        }
        else{
            this._playerProsSpeedOf.skin = "GamePlaying/boss_xuetiao_long.png";
            (this._playerProsSpeedOf.getChildAt(0) as Laya.Image).skin = "GamePlaying/touxiang_long.png";

            this._prosSpeedOf.skin = "GamePlaying/boss_xuetiao_jingang.png";
            (this._prosSpeedOf.getChildAt(0) as Laya.Image).skin = "GamePlaying/touxiang_jingang.png";
            this._selecetKind = 1
        }


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
        this._playerProsSpeedOf.width = 400;

        this._prosSpeedOf.width = 400;
        this.tip_boss.visible=false
        this.GameStep.alpha = 1
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
        // console.log("boss-------------",SceneMgr_cscj.Instance.Boss)
        // console.log("-+----------------------狂点",ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.KdBannerView))
        // ViewMgr_csjc.instance_csjc.closeView_csjc(ViewDef_csjc.KdBannerView);

        if( this._pros.visible ==true&&SceneMgr_cscj.Instance.Boss)
        {
            // console.log("----------------跟随boss")
            let closeDis = -1;
            let cent = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
            let pos = SceneMgr_cscj.Instance.BossSprite3D.transform.position.clone();
            pos.y += 2;
            pos = Camera2UI.WorldToScreen2(SceneMgr_cscj.Instance.Camera, (SceneMgr_cscj.Instance.BossSprite3D.getChildAt(this._selecetKind) as Laya.Sprite3D).transform.position)
            this._pros.x = pos.x-300
            this._pros.y = pos.y-100
            this.timer_boss.value = this.GameStep.getComponent(GameStep).timevalue
            this.onCheckPros()
        }

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

    onCheckPros()
    {
        this._playerProsSpeedOf.width = 400* SceneMgr_cscj.Instance.Player.State.Hp/SceneMgr_cscj.Instance.Player.State.HpSum
        this._prosSpeedOf.width = 400* SceneMgr_cscj.Instance.Boss.State.Hp/SceneMgr_cscj.Instance.Boss.State.HpSum
        // console.log("---------------------bosss血量",SceneMgr_cscj.Instance.Boss.State.Hp)
        if(SceneMgr_cscj.Instance.Boss.State.Hp<=0)
        {
            SceneMgr_cscj.Instance.GameOver = 1
        }
        if(SceneMgr_cscj.Instance.Player.State.Hp<=0)
        {
            SceneMgr_cscj.Instance.GameOver = -1
        }

    }
    GameOver(win: boolean) {
        this.closeView();
        if (ExamineMgr.CanDoScz_Wx&&QpGameSwitch.GameSwitch.bannerKuangdian1 == 1) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.KdBannerView,{func:()=>{
                let data = { Win: false };
                if (win) {
                    data.Win = true;
                }
                else {
                    data.Win = false;
                }
                ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport1AdView, data);
                // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
            }});
        }   
        else if (ExamineMgr.CanDoScz_Wx) {
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