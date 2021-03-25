import SoundMgr_csjc from "../Mgr/SoundMgr";

export default class ButtonAnim_csjc extends Laya.Script {

    public useSound_csjc : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown_csjc);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp_csjc);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp_csjc);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public onDown_csjc(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.useSound_csjc)
        {
            SoundMgr_csjc.instance_csjc.playSound_csjc("anniu");
        }
    }

    private onUp_csjc(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}