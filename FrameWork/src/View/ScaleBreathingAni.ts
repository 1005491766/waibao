export default class ScaleBreathingAni_csjc extends Laya.Script 
{
    public breathingSpeed_csjc = 500;
    public maxScale_csjc = 1;
    public minScale_csjc = 0.9;
    protected _add_csjc : boolean = false;
    protected _ownerSprite_csjc : Laya.Sprite;
    
    onAwake()
    {
        this._ownerSprite_csjc = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this._ownerSprite_csjc.scale(this.maxScale_csjc,this.maxScale_csjc);
    }
    
    onEnable()
    {
        this._ownerSprite_csjc.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange_csjc);
    }

    onDisable()
    {
        this._ownerSprite_csjc.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange_csjc);
    }

    onUpdate()
    {
        if(this._ownerSprite_csjc.visible)
        {
            this.bgAni_csjc();
        }
    }

    protected bgAni_csjc()
    {
        if(!this._add_csjc)
        {
            var value = this._ownerSprite_csjc.scaleX - Math.min(50,Laya.timer.delta) / this.breathingSpeed_csjc  * 1
            value = Math.max(this.minScale_csjc,value)
            this._ownerSprite_csjc.scale(value,value);
            if(this._ownerSprite_csjc.scaleX <= this.minScale_csjc)
            {
                this._add_csjc = true;
            }
        }
        else
        {
            var value = this._ownerSprite_csjc.scaleX + Math.min(50,Laya.timer.delta) / this.breathingSpeed_csjc  * 1;
            value = Math.min(this.maxScale_csjc,value)
            this._ownerSprite_csjc.scale(value,value);
            if(this._ownerSprite_csjc.scaleX >= this.maxScale_csjc)
            {
                this._add_csjc = false;
            }
        }
    }

    protected onFocusChange_csjc()
    {
        this._ownerSprite_csjc.scale(this.maxScale_csjc,this.maxScale_csjc);
        this._add_csjc = false;
    }
}