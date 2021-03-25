import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default class ExamineCheck extends Laya.Script {
    private _owner: Laya.Sprite;
    onAwake() {
        this._owner = this.owner as Laya.Sprite;
    }

    onStart() {
        if (!ExamineMgr.CanDoScz_Wx) {
            this._owner.visible = false;
        }
    }
}