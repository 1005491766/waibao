import ViewBase_csjc from "../ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import WudianView from "./WudianView";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import { AdDataMgr, ComponentStyle } from "../../QpAPI/AdDataMgr";

export default class Export3AdView extends WudianView {
    protected _skipBtnMove = true;
    protected _hideFirst = true;
    protected _wudianTpye = 2;
    protected _btn1: Laya.Image;
    protected _btn2: Laya.Image;
    protected _skipBtn: Laya.Image;
    protected _game1: any;
    protected _game2: any;
    onAwake() {
        super.onAwake();
        this._btn1 = this.owner.getChildByName("BG").getChildByName("Btn1") as Laya.Image;
        this._btn2 = this.owner.getChildByName("BG").getChildByName("Btn2") as Laya.Image;
        if (Laya.Browser.onMiniGame) {
            let arr = AdDataMgr.Instance.GetDataByStyleAndCount(ComponentStyle.h_slider, 10);
            if (arr.length > 0) {
                this._game1 = arr[Math.floor(Math.random() * arr.length)];
                this._game2 = arr[Math.floor(Math.random() * arr.length)];
            }
        }
    }

    get NeedWudian(): boolean {
        let swc = QpGameSwitch.GameSwitch.bannerWudian == 1;
        let wudianSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        console.log(`wd功能总开关wudianSwitch: ${wudianSwitch}，分开关bannerWudian：${swc}`);
        return swc && wudianSwitch;
    }

    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.closeView);
        this._btn1.on(Laya.Event.CLICK, this, this.Game1);
        this._btn2.on(Laya.Event.CLICK, this, this.Game2);
    }

    OnSkipBtn() {
        this.closeView();
    }

    onCloseEvent = () => {
        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export1AdView);
    }

    Game1() {
        if (Laya.Browser.onMiniGame) {
            if (this._game1) {
                AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, this._game1);
            }
        }
    }

    Game2() {
        if (Laya.Browser.onMiniGame) {
            if (this._game2) {
                AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, this._game2);
            }
        }
    }
}