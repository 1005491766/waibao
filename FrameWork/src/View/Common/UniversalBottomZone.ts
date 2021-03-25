
export default class UniversalBottomZone_csjc extends Laya.Script {

    protected _ownerSprite_csjc: Laya.Sprite;
    protected _autoZone_csjc: Laya.UIComponent;
    protected _loopADZone_csjc: Laya.UIComponent;
    protected _bannerADZone_csjc: Laya.UIComponent;

    onAwake()  {
        this._ownerSprite_csjc = this.owner as Laya.Sprite;
        this._autoZone_csjc = this._ownerSprite_csjc.getChildByName("AutoZone") as Laya.UIComponent;
        this._loopADZone_csjc = this._ownerSprite_csjc.getChildByName("LoopAD") as Laya.UIComponent;
        this._bannerADZone_csjc = this._ownerSprite_csjc.getChildByName("BannerAD") as Laya.UIComponent;
    }

    onEnable(): void {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5)  {
            this._autoZone_csjc.bottom = this._loopADZone_csjc.height + this._bannerADZone_csjc.height;
            this._loopADZone_csjc.bottom = this._bannerADZone_csjc.height;
            this._bannerADZone_csjc.visible = true;
        }
        else  {
            this._autoZone_csjc.bottom = this._loopADZone_csjc.height;
            this._loopADZone_csjc.bottom = 0;
            this._bannerADZone_csjc.visible = false;
        }
    }

    onDisable(): void {

    }

    onUpdate()  {
        if (!this._bannerADZone_csjc.visible)  {
            this._bannerADZone_csjc.onDisable();
        }
    }
}