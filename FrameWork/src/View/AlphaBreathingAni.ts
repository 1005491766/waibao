export default class AlphaBreathingAni_csjc extends Laya.Script {

    /** @prop {name:BreathingSpeed_csjc, tips:"呼吸速度", type:Number, default:0.5}*/
    public BreathingSpeed_csjc: number = 0.5;
    /** @prop {name:MinAlpha, tips:"最小透明值", type:Number, default:0.5}*/
    public MinAlpha: number = 0.5;
    protected _add_csjc: boolean = false;
    protected _ownerSprite_csjc: Laya.Sprite;

    onAwake() {
        this._ownerSprite_csjc = this.owner as Laya.Sprite;
    }

    onUpdate() {
        if (this._ownerSprite_csjc.visible) {
            this.bgAni_csjc();
        }
    }

    protected bgAni_csjc() {
        let spd = (Laya.timer.delta / 1000) * this.BreathingSpeed_csjc;
        if (!this._add_csjc) {
            this._ownerSprite_csjc.alpha = this._ownerSprite_csjc.alpha - spd
            if (this._ownerSprite_csjc.alpha <= this.MinAlpha) {
                this._add_csjc = true;
            }
        }
        else {
            this._ownerSprite_csjc.alpha = this._ownerSprite_csjc.alpha + spd
            if (this._ownerSprite_csjc.alpha >= 1) {
                this._add_csjc = false;
            }
        }
    }
}