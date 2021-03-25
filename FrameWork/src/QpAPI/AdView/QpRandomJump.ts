import { AdDataMgr, ComponentStyle } from "../AdDataMgr";
import ExamineMgr from "../../CommomAPI/ExamineMgr";
import QpGameSwitch from "../QpGameSwitch";

export default class QpRandomJump extends Laya.Script {
    private _clickTimer: number = 500;

    onUpdate() {
        if (this._clickTimer > 0) {
            this._clickTimer -= Laya.timer.delta;
        }
    }
    onClick() {
        if (Laya.Browser.onMiniGame) {
            console.log(`自动跳功能屏蔽${ExamineMgr.CanDoScz_Wx},开关${QpGameSwitch.GameSwitch.popAd == 1}`);
            if (ExamineMgr.CanDoScz_Wx && QpGameSwitch.GameSwitch.popAd == 1 && QpGameSwitch.GameSwitch.indexAd) {
                if (this._clickTimer > 0) return;
                this._clickTimer = 3000;
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