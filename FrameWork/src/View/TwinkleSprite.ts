export default class TwinkleSprite_csjc extends Laya.Script {
    /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
    public TwinkleSpeed: number = 1000;
    /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
    public TwinkleMinSize: number = 0.95;
    /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
    public TwinkleMaxSize: number = 1.05;

    protected _ownerSprite_csjc: Laya.Sprite;
    protected _displaySp_csjc: Laya.Sprite;
    protected _disText_csjc: Laya.Text;
    protected _aniForward_csjc: boolean = false;
    protected _fontSize_csjc = 25;
    protected _originSize_csjc = 1;
    constructor() {
        super();
    }
    onAwake() {
        this._displaySp_csjc = this.owner as Laya.Sprite;
        this._disText_csjc = this.owner.getChildByName("TitelText") as Laya.Text;
        this._originSize_csjc = this._displaySp_csjc.scaleX;
        if (this._disText_csjc != null) {
            this._disText_csjc.text = "";
            this._fontSize_csjc = this._disText_csjc.fontSize;
        }
    }
    onEnable(): void {
        this._displaySp_csjc.scale(this._originSize_csjc, this._originSize_csjc);
    }
    onDisable(): void {

    }
    onUpdate() {
        this.displayAni_csjc();
    }

    protected displayAni_csjc() {
        if (!this._aniForward_csjc) {
            var scale = this._displaySp_csjc.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._originSize_csjc);
            this._displaySp_csjc.scale(scale, scale);
            if (this._displaySp_csjc.scaleX <= this.TwinkleMinSize * this._originSize_csjc) {
                this._aniForward_csjc = true;
            }
        }
        else {
            var scale = this._displaySp_csjc.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._originSize_csjc);
            this._displaySp_csjc.scale(scale, scale);
            if (this._displaySp_csjc.scaleX >= this.TwinkleMaxSize * this._originSize_csjc) {
                this._aniForward_csjc = false;
            }
        }
    }
}