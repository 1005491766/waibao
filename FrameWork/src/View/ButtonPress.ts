export default class ButtonPress_csjc extends Laya.Script 
{
    public onPress_csjc : Function = null; 
    constructor() { super(); }
    protected _ownerSp_csjc : Laya.Sprite;
    protected _press_csjc: boolean  = false;
    onAwake()
    {
        this._ownerSp_csjc = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._press_csjc = false;
        this._ownerSp_csjc.on(Laya.Event.MOUSE_DOWN,this,this.onDown_csjc)
        this._ownerSp_csjc.on(Laya.Event.MOUSE_UP,this,this.onUp_csjc)
        this._ownerSp_csjc.on(Laya.Event.MOUSE_OUT,this,this.onOut_csjc)
        
    }

    
    onDisable(): void 
    {
        this._press_csjc = false;
        this._ownerSp_csjc.off(Laya.Event.MOUSE_DOWN,this,this.onDown_csjc)
        this._ownerSp_csjc.off(Laya.Event.MOUSE_UP,this,this.onUp_csjc)
        this._ownerSp_csjc.off(Laya.Event.MOUSE_OUT,this,this.onOut_csjc)
    }

    onUpdate()
    {
        if(this._press_csjc && this.onPress_csjc)
        {
            this.onPress_csjc();
        }
    }
    protected onDown_csjc()
    {
        this._press_csjc = true;
    }
    protected onUp_csjc()
    {
        this._press_csjc = false;
    }

    protected onOut_csjc()
    {
        this._press_csjc = false;
    }
}