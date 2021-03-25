import User_csjc from "../../User/User";

export default class LevelInfo extends Laya.Script {
    private _1Text: Laya.Text;
    private _2Text: Laya.Text;
    private _3Text: Laya.Text;
    private _4Text: Laya.Text;
    private _Progress: Laya.UIComponent;
    private _ProgressBar: Laya.Image;
    private _ProgressFlag: Laya.Sprite;
    private _flashTimer: number = 0;
    private _level: number = User_csjc.getLeveNum_csjc();
    onAwake() {
        this._1Text = this.owner.getChildByName("1Text") as Laya.Text;
        this._2Text = this.owner.getChildByName("2Text") as Laya.Text;
        this._3Text = this.owner.getChildByName("3Text") as Laya.Text;
        this._4Text = this.owner.getChildByName("4Text") as Laya.Text;
        this._Progress = this.owner.getChildByName("Progress") as Laya.UIComponent;
        this._ProgressBar = this._Progress.getChildByName("ProgressBar") as Laya.Image;
        this._ProgressFlag = this._Progress.getChildByName("ProgressFlag") as Laya.Image;
        let rate = Math.floor((this._level - 1) / 4);
        this._1Text.text = (rate * 4 + 1).toString();
        this._2Text.text = (rate * 4 + 2).toString();
        this._3Text.text = (rate * 4 + 3).toString();
        this._4Text.text = (rate * 4 + 4).toString();
        let rate2 = (this._level % 4);
        switch (rate2) {
            case 0:
                this._ProgressBar.width = 250;
                this._ProgressFlag.x = 310;
                break;
            case 1:
                this._ProgressBar.width = 25;
                this._ProgressFlag.x = 20;
                break;
            case 2:
                this._ProgressBar.width = 125;
                this._ProgressFlag.x = 116;
                break;
            case 3:
                this._ProgressBar.width = 225;
                this._ProgressFlag.x = 212;
                break;
        }
    }

    onUpdate() {
        this._flashTimer += Laya.timer.delta / 1000;
        let angle = this._flashTimer * 360;
        this._ProgressBar.alpha = 1 + Math.sin(angle * 3.14 / 180) * 0.3;
    }
}