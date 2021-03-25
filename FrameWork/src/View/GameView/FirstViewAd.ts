import GameMgr_csjc from "../../Scripts/GameMgr";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";

export default class FirstViewAd extends Laya.Script {
    onStart() {
        if ((GameMgr_csjc.getInstance().FirstAd == false && QpGameSwitch.customkey.indexAd != 2) || QpGameSwitch.customkey.indexAd == 0) {
            (this.owner as Laya.UIComponent).visible = false;
        }
    }
}