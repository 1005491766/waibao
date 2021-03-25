import ViewBase_csjc from "../ViewBase";

export default class TipsView_csjc extends ViewBase_csjc {
    protected _bg: Laya.UIComponent;
    protected _tipsText: Laya.Text;

    constructor() { super(); }

    onAwake() {
        this._bg = this.owner.getChildByName("Bg") as Laya.UIComponent;
        this._tipsText = this._bg.getChildByName("Text") as Laya.Text;
    }

    public openView(data?: any): void {
        super.openView(data);
        this.setTipsMsg(data);
        Laya.timer.clearAll(this);
        Laya.Tween.to(this._bg, { alpha: 0 }, 1500, Laya.Ease.quintIn, Laya.Handler.create(this, () => {
            this.closeView();
        }))
    }

    public setTipsMsg(msg: string) {
        this._tipsText.text = msg;
    }
}