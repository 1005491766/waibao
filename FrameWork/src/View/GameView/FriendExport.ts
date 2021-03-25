import ViewBase_csjc from "../ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import WudianView from "./WudianView";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import TmAPI from "../../TmAPI/TmAPI";
import User_csjc from "../../User/User";
import { AdDataMgr, ComponentStyle } from "../../QpAPI/AdDataMgr";
import GameMgr_csjc from "../../Scripts/GameMgr";

export default class FriendExport extends WudianView {
    protected _skipBtnMove = false;
    protected _hideFirst = true;
    protected _wudianTpye = 2;
    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian：${swc}`);
        return swc && wudianSwitch;
    }
    OnSkipBtn() {
        this.closeView();
    }
    protected _skipBtn: Laya.Image;
    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    }
    onStart() {
        super.onStart();
        if (User_csjc.getLeveNum_csjc() == 1) {
            TmAPI.SendEvent("GameStep", { Step: 5 });
        }
        this.owner.addChild(GameMgr_csjc.getInstance().Context);
        GameMgr_csjc.getInstance().Context.postMsg({ cmd: "OpenExport", data: { width: Laya.stage.width, height: Laya.stage.height } });
    }
    onClose() {
        super.onClose();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport2AdView);
    }
    onDestroy() {
        GameMgr_csjc.getInstance().Context.removeSelf();
        super.onDestroy();
    }
}