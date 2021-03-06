import ViewBase_csjc from "../ViewBase";
import SceneMgr_cscj from "../../Scripts/GameCore/SceneMgr";
import { PlayerType } from "../../Scripts/GameCore/Enums";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";

export default class SelectHero extends ViewBase_csjc {

    _heroSlt_0 :Laya.Image = null
    _heroSlt_1 :Laya.Image = null
    _select:Laya.Image = null
    _startBtn:Laya.Sprite = null

    onAwake() {
        this._heroSlt_0 = this.owner.getChildByName("hero1") as Laya.Image;
        this._heroSlt_1 = this.owner.getChildByName("hero2") as Laya.Image;
        this._select = this.owner.getChildByName("select") as Laya.Image;
        this._startBtn = this.owner.getChildByName("start") as Laya.Image;
    }

    addEvent() {
        this._heroSlt_0.on(Laya.Event.CLICK, this,this.clickKingKong);
        this._heroSlt_1.on(Laya.Event.CLICK, this,this.clickTRex);
        this._startBtn.on(Laya.Event.CLICK, this,this.onPlayGame);

        // this.clickKingKong()
    }
    removeEvent()
    {
        this._heroSlt_0.off(Laya.Event.CLICK, this,this.clickKingKong);
        this._heroSlt_1.off(Laya.Event.CLICK, this,this.clickTRex);
        this._startBtn.off(Laya.Event.CLICK, this,this.onPlayGame);

    }

    clickKingKong()
    {
        SceneMgr_cscj.Instance.PlayerKind = PlayerType.Kingkong
        SceneMgr_cscj.Instance.BossKind = PlayerType.TRex
        this._select.x = this._heroSlt_0.x
        this.onPlayGame()
    }

    clickTRex()
    {
        SceneMgr_cscj.Instance.PlayerKind = PlayerType.TRex
        SceneMgr_cscj.Instance.BossKind = PlayerType.Kingkong
        this._select.x = this._heroSlt_1.x
        this.onPlayGame()

    }
    onPlayGame()
    {
        SceneMgr_cscj.Instance.StartGame();
        this.closeView();
        // Laya.timer.frameOnce(5,this,()=>{
        //     ViewMgr_csjc.instance_csjc.closeView_csjc(ViewDef_csjc.KdBannerView);
        // })
        // ViewMgr_csjc.instance_csjc.closeView_csjc(ViewDef_csjc.KdBannerView);

        EventMgr_csjc.dispatch_csjc(EventDef_csjc.SelectHero);
        
    }


    // onStart() {

    // }

  
}