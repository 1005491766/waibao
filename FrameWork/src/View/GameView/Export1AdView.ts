import ViewBase_csjc from "../ViewBase";
import ViewMgr_csjc, { ViewDef_csjc } from "../../Mgr/ViewMgr";
import WudianView from "./WudianView";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import TmAPI from "../../TmAPI/TmAPI";
import User_csjc from "../../User/User";
import { AdDataMgr, ComponentStyle } from "../../QpAPI/AdDataMgr";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default class Export1AdView extends WudianView {
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
        if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.InGameView)) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.InGameView);
        }
        else if (this._data == null) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
        }
        else if (this._data.Win) {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.GameOverWinView);
        }
        else {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.GameOverFailView);
        }
    }
    protected _skipBtn: Laya.Image;
    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
    }
    onStart() {
        super.onStart();
        if (User_csjc.getLeveNum_csjc() == 1) {
            TmAPI.SendEvent("GameStep", { Step: 4 });
        }
        var skeleton = new Laya.Skeleton();
        //添加到舞台
        this.owner.addChild(skeleton);
        skeleton.pos(700, 350);
        //通过加载直接创建动画
        skeleton.load("subRes/sk/NewProject.sk", Laya.Handler.create(this, (sk) => {
            sk.scaleX = 0.5;
            sk.scaleY = 0.5;
        }));
        if (Laya.Browser.onMiniGame) {
            console.log(`自动跳功能屏蔽${ExamineMgr.CanDoScz_Wx},开关${QpGameSwitch.GameSwitch.popAd == 1}`);
            if (ExamineMgr.CanDoScz_Wx && QpGameSwitch.GameSwitch.popAd == 1) {
                let arr = AdDataMgr.Instance.GetDataByStyleAndCount(ComponentStyle.h_slider, 10);
                if (arr.length > 0) {
                    let game = arr[Math.floor(Math.random() * arr.length)];
                    if (game) {
                        AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, game);
                    }
                }
            }

        }
    }
}