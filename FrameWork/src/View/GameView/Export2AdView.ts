import ViewBase_csjc from "../ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import WudianView from "./WudianView";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import { AdDataMgr, ComponentStyle } from "../../QpAPI/AdDataMgr";
import GameMgr_csjc from "../../Scripts/GameMgr";
import User_csjc from "../../User/User";
import TmAPI from "../../TmAPI/TmAPI";

export default class Export2AdView extends WudianView {
    protected _skipBtnMove = false;
    protected _hideFirst = false;
    protected _wudianTpye = 2;
    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian：${swc}`);
        return swc && wudianSwitch;
    }
    onAwake() {
        super.onAwake();
        GameMgr_csjc.getInstance().CreatNextGameScene();
    }
    protected _skipBtn: Laya.Image;
    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    }
    OnSkipBtn() {
        this.closeView();
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
    }

    onStart() {
        var skeleton = new Laya.Skeleton();
        //添加到舞台
        this.owner.addChild(skeleton);
        skeleton.pos(700, 350);
        //通过加载直接创建动画
        skeleton.load("subRes/sk/NewProject.sk", Laya.Handler.create(this, (sk) => {
            sk.scaleX = 0.5;
            sk.scaleY = 0.5;
        }));
        if (User_csjc.getLeveNum_csjc() <= 2) {
            TmAPI.SendEvent("GameStep", { Step: 6 });
        }
    }
}