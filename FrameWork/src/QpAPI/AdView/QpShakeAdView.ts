import QpListAdBox from "./QpListAdBox";
import { AdDataMgr, ComponentStyle } from "../AdDataMgr";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default class QpShakeAdView extends Laya.Script {

    /** @prop {name:AdStyle, tips:"广告位类型", type:Option, default:"Slider",option:"Slider,Export,Banner"}*/
    public AdStyle: string = "Slider";

    /** @prop {name:ShakeTime, tips:"闪动速度", type:Number, default:1000}*/
    public ShakeTime: number = 1000;

    /** @prop {name:ChaneAdTime, tips:"更换广告速度", type:Number, default:6000}*/
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
        if (ExamineMgr.CanShowAd_Wx) {
            this.RefreshAdList();
        }
        else {
            this._ownerSp.visible = false;
        }
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
        var loopAdBox: QpListAdBox = cell.getComponent(QpListAdBox);
        loopAdBox.setData(data, this.owner, index);
    }

    RefreshAdList() {
        let style: ComponentStyle = ComponentStyle.h_slider;
        switch (this.AdStyle) {
            case "Slider":
                style = ComponentStyle.h_slider;
                break;
            case "Banner":
                style = ComponentStyle.banner;
                break;
            case "Export":
                style = ComponentStyle.big_export_ui;
                break;
        }
        let data = AdDataMgr.Instance.GetDataByStyleAndCount(style, this._cells.length);
        this._list.array = data;
    }

    onClick() {
        if (Laya.Browser.onMiniGame) {
            let arr = AdDataMgr.Instance.GetDataByStyleAndCount(ComponentStyle.h_slider, 10);
            if (arr.length > 0) {
                let game = arr[Math.floor(Math.random() * arr.length)];
                if (game) {
                    AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, game);
                }
            }
        }
    }
}