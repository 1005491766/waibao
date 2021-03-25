import TmAPI from "../TmAPI";
import TmListAdBox from "./TmListAdBox";


export default class TmShakeAdView extends Laya.Script {

    /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
    public AdLocationID: number = TmAPI.ListIcoAdLocationId;

    /** @prop {name:ShakeTime, tips:"闪动速度", type:Number, default:1000}*/
    public ShakeTime: number = 1000;

    /** @prop {name:ChaneAdTime, tips:"更换广告速度", type:Number, default:1000}*/
    public ChaneAdTime: number = 6000;

    /** @prop {name:RotaAngel, tips:"晃动角度", type:Number, default:10}*/
    public RotaAngel: number = 10;

    /** @prop {name:Scale, tips:"晃动缩放", type:Number, default:0.1}*/
    public Scale: number = 0.1;

    protected _ownerSp: Laya.Sprite;
    protected _list: Laya.List;
    protected _cells: Array<Laya.UIComponent>;
    protected _shakeTimer: number = 0;
    protected _changeAdTimer: number = 0;;
    protected _shakeIndex: number = 0;

    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._cells = this._list.cells;
    }

    onEnable(): void {
        this.RefreshAdList();
    }

    onUpdate() {
        if (this._changeAdTimer <= this.ChaneAdTime) {
            this._changeAdTimer += Laya.timer.delta;
        }
        if (this._shakeTimer <= this.ShakeTime) {
            this._shakeTimer += Laya.timer.delta;
            let box = this._cells[this._shakeIndex];
            let period = this._shakeTimer / this.ShakeTime;
            let aniPeriod = 0;
            if (period >= 0 && period < 0.2) {
                aniPeriod = (period / 0.2);
            }
            else if (period >= 0.2 && period < 0.4) {
                aniPeriod = 1 - ((period - 0.2) / 0.2);
            }
            else if (period >= 0.4 && period < 0.6) {
                aniPeriod = -1 * ((period - 0.4) / 0.2);
            }
            else if (period >= 0.6 && period < 0.8) {
                aniPeriod = -1 + ((period - 0.6) / 0.2);
            }
            else {
                aniPeriod = 0;
            }
            box.rotation = aniPeriod * this.RotaAngel;
            box.scaleX = 1 - (aniPeriod * this.Scale);
            box.scaleY = box.scaleX;
        }
        else {
            this._shakeTimer = 0;
            this._shakeIndex++;
            if (this._shakeIndex > this._cells.length - 1) {
                this._shakeIndex = 0;
            }
            if (this._changeAdTimer > this.ChaneAdTime) {
                this._changeAdTimer = 0;
                this.RefreshAdList();
            }
        }
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: TmListAdBox = cell.getComponent(TmListAdBox);
        loopAdBox.setData(data, this.owner);
    }

    RefreshAdList() {
        TmAPI.TryGetAdvs(this.AdLocationID, (config) => {
            if (config != null && config.IsOpen != null && !config.IsOpen) {
                console.log("广告位：", this.AdLocationID, " 状态为关闭,隐藏控件");
                this._ownerSp.visible = false;
                return;
            }
            else if (config == null || config.type != 7) {
                console.log("广告位：", this.AdLocationID, " 数据位空或者类型错误");
                this._list.array = null;
                return;
            }
            if (this.owner && !this.owner.destroyed) {
                let datas = config.creatives;
                this._list.array = datas;
                // if (datas && datas.length > 0 && datas.length < 50) {
                //     (this.owner as Laya.Sprite).visible = true;
                //     var temp = []
                //     var counter = 0;
                //     for (var i = 0; i < 50; ++i) {
                //         if (counter >= datas.length) {
                //             counter = 0;
                //         }
                //         temp.push(datas[counter]);
                //         ++counter;
                //     }
                //     this._list.array = temp;
                // }
                // else {
                //     this._list.array = datas;
                //     (this.owner as Laya.Sprite).visible = false;
                // }
            }
        })
    }
}