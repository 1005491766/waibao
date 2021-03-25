import QpListAdBox from "./QpListAdBox";
import { AdDataMgr, ComponentStyle } from "../AdDataMgr";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default class QpShakeAd2View extends Laya.Script {

    /** @prop {name:AdStyle, tips:"广告位类型", type:Option, default:"Slider",option:"Slider,Export,Banner"}*/
    public AdStyle: string = "Slider";

    /** @prop {name:ShakeRestTime, tips:"闪动休息", type:Number, default:1000}*/
    public ShakeRestTime: number = 1500;

    /** @prop {name:ShakeTime, tips:"闪动速度", type:Number, default:300}*/
    public ShakeTime: number = 300;

    /** @prop {name:ShakeNeedCount, tips:"闪动次数", type:Number, default:4}*/
    public ShakeNeedCount: number = 4;

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
        if (this._shakeTimer <= this.ChaneAdTime) {
            this._shakeTimer += Laya.timer.delta;
        }
        else {
            this._shakeTimer = 0;
            this.RefreshAdList();
            return;
        }
        // if (this.ShakeTime * this.ShakeNeedTime)
        //     for (let index = 0; index < this._cells.length; index++) {
        //         const box = this._cells[index];
        //         let period = curTime / this.ShakeTime;
        //         let aniPeriod = Math.sin(period * 3.14 * 2);
        //         box.rotation = aniPeriod * this.RotaAngel;
        //         box.scaleX = 1 - (aniPeriod * this.Scale);
        //         box.scaleY = box.scaleX;
        //     }
        if (this._shakeTimer > this.ShakeRestTime && this._shakeTimer <= (this.ShakeRestTime + (this.ShakeTime * this.ShakeNeedCount))) {
            let period = ((this._shakeTimer - this.ShakeRestTime) % this.ShakeTime) / this.ShakeTime;
            let aniPeriod = Math.sin(period * 3.14 * 2);
            for (let index = 0; index < this._cells.length; index++) {
                const box = this._cells[index];
                box.rotation = aniPeriod * this.RotaAngel;
                box.scaleX = 1 - (aniPeriod * this.Scale);
                box.scaleY = box.scaleX;
            }
        }
        else {
            for (let index = 0; index < this._cells.length; index++) {
                const box = this._cells[index];
                box.rotation = 0;
                box.scaleX = 1;
                box.scaleY = 1;
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

    // onClick() {
    //     if (Laya.Browser.onMiniGame) {
    //         let arr = AdDataMgr.Instance.GetDataByStyleAndCount(ComponentStyle.h_slider, 10);
    //         if (arr.length > 0) {
    //             let game = arr[Math.floor(Math.random() * arr.length)];
    //             if (game) {
    //                 AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, game);
    //             }
    //         }
    //     }
    // }
}