import WudianView from "./WudianView";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import EventMgr_csjc from "../../Event/EventMgr";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import User_csjc from "../../User/User";
import GameOverWinView from "./GameOverWinVIew";
import TmAPI from "../../TmAPI/TmAPI";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import GameMgr_csjc from "../../Scripts/GameMgr";

export default class GameOverFailView extends GameOverWinView {
    GetReward() {
        if (!ExamineMgr.CanDoScz_Wx) {
            this.closeView();
            GameMgr_csjc.getInstance().CreatGameScene();
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
        }
        else {
            this._skipBtn.mouseEnabled = false;
            let p = new Laya.Point(100, 100);
            this._money.localToGlobal(p, false);
            User_csjc.addMoney_csjc(100, p);
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
    SendGameResult() {
        TmAPI.SendEvent("GameResult", { Level: User_csjc.getLeveNum_csjc(), Result: 0 });
    }
}