import ViewBase_csjc from "../../View/ViewBase";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import SceneMgr_cscj from "../GameCore/SceneMgr";

export default class TutorialView extends ViewBase_csjc {
    private _skipBtn: Laya.Image;
    private _display: Laya.Image;
    private _nextBtn: Laya.Image;
    onAwake() {
        this._skipBtn = this.owner.getChildByName("SkipBtn") as Laya.Image;
        this._display = this.owner.getChildByName("Tutorial").getChildByName("Display") as Laya.Image;
        this._nextBtn = this.owner.getChildByName("NextBtn") as Laya.Image;
        this._display.skin = "subRes/image/0.jpg";
    }

    OnSkipBtn() {
        this.closeView();
    }

    addEvent() {
        this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
        this._nextBtn.on(Laya.Event.CLICK, this, this.OnNextBtn);
    }

    private _index = 0;
    OnNextBtn() {
        this._index++;
        if (this._index > 2) {
            this._index = 0;
        }
        this._display.skin = "subRes/image/" + this._index + ".jpg";
    }

    onCloseEvent = () => {
        SceneMgr_cscj.Instance.StartGame();
    }
}