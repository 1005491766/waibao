import WudianView from "./WudianView";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import EventMgr_csjc from "../../Event/EventMgr";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import User_csjc from "../../User/User";
import SceneMgr_cscj from "../../Scripts/GameCore/SceneMgr";
import TmAPI from "../../TmAPI/TmAPI";
import ExamineMgr from "../../CommomAPI/ExamineMgr"
import GameMgr_csjc from "../../Scripts/GameMgr";

export default class GameOverWinView extends WudianView {
    protected _skipBtnMove = false;
    protected _hideFirst = true;
    protected _wudianTpye = 2;
    protected _enemyCount: Laya.FontClip;

    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian：${swc}`);
        return swc && wudianSwitch;
    }

    OnSkipBtn() {
        this.GetReward();
    }

    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    }

    onAwake() {
        super.onAwake();
        this._money = this.owner.getChildByName("Money") as Laya.UIComponent;
        this._enemyCount = this.owner.getChildByName("Destory").getChildByName("EnemyCount") as Laya.FontClip;
        this._enemyCount.value = (SceneMgr_cscj.Instance.EnemyKillCount) + "/" + SceneMgr_cscj.Instance.EnemCount;
        this.SendGameResult();
        if (!ExamineMgr.CanDoScz_Wx) {
            this._money.visible = false;
        }
    }

    GetReward() {
        if (!ExamineMgr.CanDoScz_Wx) {
            this.closeView();
            GameMgr_csjc.getInstance().CreatNextGameScene();
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
        }
        else {
            this._skipBtn.mouseEnabled = false;
            let p = new Laya.Point(100, 100);
            this._money.localToGlobal(p, false);
            User_csjc.addMoney_csjc(500, p);
            Laya.timer.once(1500, this, () => {
                this.closeView();
                console.log(`好友热玩${ExamineMgr.CanDoScz_Wx},开关${QpGameSwitch.GameSwitch.indexPanel == 1}`);
                if (ExamineMgr.CanDoScz_Wx && QpGameSwitch.GameSwitch.indexPanel == 1) {
                    ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.FriendExportView);
                }
                else {
                    ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport2AdView);
                }
            })
        }
    }

    protected _money: Laya.UIComponent;

    SendGameResult() {
        TmAPI.SendEvent("GameResult", { Level: User_csjc.getLeveNum_csjc(), Result: 1 });
    }
}