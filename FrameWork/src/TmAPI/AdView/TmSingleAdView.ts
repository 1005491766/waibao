import TmAPI from "../TmAPI";

export default class TmSingleAdView extends Laya.Script {
    constructor() {
        super();
    }
    /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
    public AdLocationID: number = TmAPI.SingleAdLocationId;

    /** @prop {name:RefreshTime, tips:"刷新速度,单位为秒", type:Number, default:0}*/
    public RefreshTime: number = 0;

    protected _ownerSp: Laya.Sprite
    protected _displaySp: Laya.Sprite;
    protected _data: any = null;
    protected _positionId: number = 0;
    protected _creativeId: number = 0;
    protected _appId: string = "";
    protected _isAni: boolean = false;
    protected _aniImageIndex: number = 0;
    protected _aniImageArray: Array<string> = [];
    protected _fpsTimer: number = 0;
    protected _fpsTime: number = 0;
    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._displaySp = this._ownerSp.getChildByName("Display") as Laya.Sprite;
    }
    onEnable() {
        this.refreshAd();
    }
    refreshAd() {
        TmAPI.TryGetAdvs(this.AdLocationID, (config) => {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", this.AdLocationID, " 状态为关闭,隐藏控件");
                this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 1) {
                console.log("广告位：", this.AdLocationID, " 数据位空或者类型错误");
                return;
            }
            if (this.owner && !this.owner.destroyed) {
                this._data = config.creatives[0];
                this._creativeId = this._data.creativeId;
                this._positionId = this._data.positionId;
                this._appId = config.appId;
                if (this._data.show_config.fps != null) {
                    console.log("SingleAd显示序列帧");
                    this._aniImageArray = this._data.show_config.images;
                    this._fpsTime = this._data.show_config.fps * 1000;
                    Laya.loader.load(this._aniImageArray, Laya.Handler.create(this, (res) => {
                        if (!res) return;
                        if (this.RefreshTime > 0) {
                            Laya.timer.once(this.RefreshTime * 1000, this, this.refreshAd);
                        }
                        this._aniImageIndex = 0;
                        this._fpsTimer = 0;
                        this._isAni = true;
                    }));
                }
                else {
                    console.log("SingleAd显示单独浮动");
                    this._aniImageArray = [];
                    this._fpsTime = 0;
                    this._fpsTimer = 0;
                    this._isAni = false;
                    Laya.loader.load(this._data.show_config.image, Laya.Handler.create(this, () => {
                        this._displaySp.loadImage(this._data.show_config.image);
                        if (this.RefreshTime > 0) {
                            Laya.timer.once(this.RefreshTime * 1000, this, this.refreshAd);
                        }
                    }));
                }
                // this._ownerSp.loadImage(this._data.show_config.image, Laya.Handler.create(this, () => {
                //     if (!this._ownerSp.destroyed) {
                //         this._ownerSp.width = 750;
                //         this._ownerSp.height = 260;
                //     }
                //     Laya.timer.once(this.RefreshTime * 1000, this, this.refreshBannerAd);
                // }));
            }
        });
    }

    onUpdate() {
        if (this._isAni) {
            if (this._fpsTimer < this._fpsTime) {
                this._fpsTimer += Laya.timer.delta;
            }
            else {
                this._fpsTimer = 0;
                this._displaySp.loadImage(this._aniImageArray[this._aniImageIndex]);
                if (this._aniImageIndex > this._aniImageArray.length - 1) {
                    this._aniImageIndex++;
                }
                else {
                    this._aniImageIndex = 0;
                }
            }
        }
    }
}