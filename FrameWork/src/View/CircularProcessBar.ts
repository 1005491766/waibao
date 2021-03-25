//环形进度条，只支持纯色
export default class CircularProcessBar_csjc extends Laya.Script
{
    public color_csjc : string = "#7CFC00";
    public lineColor_csjc : string = "";
    public lineWidth_csjc : number = 0;
    protected _ownerSprite_csjc : Laya.Sprite = null;
    protected _value_csjc = 0;

    onAwake()
    {
        this._ownerSprite_csjc = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {

    }

    onDisable(): void 
    {

    }

    public setValue_csjc(value : number)
    {
        if(value > 1)
            value = 1;
        if(value < 0)
            value = 0;
        var angle = 360 * (1 -  value) - 90;
        if(null == this._ownerSprite_csjc)
            this._ownerSprite_csjc =  this.owner as Laya.Sprite;
        this._ownerSprite_csjc.graphics.clear();
        this._ownerSprite_csjc.graphics.drawPie(this._ownerSprite_csjc.width/ 2,this._ownerSprite_csjc.height / 2,this._ownerSprite_csjc.width / 2,
                angle,
                270,
                this.color_csjc,this.lineColor_csjc,this.lineWidth_csjc);
    }
}