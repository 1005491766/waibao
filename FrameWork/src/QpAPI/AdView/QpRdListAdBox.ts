import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import { AdDataMgr, ComponentStyle } from "../AdDataMgr";
import QpListAdBox from "./QpListAdBox";

export default class QpRdListAdBox extends QpListAdBox {
    /** @prop {name:RdName, tips:"广告位类型", type:String, default:""}*/
    public RdName: string = "";

    /** @prop {name:RdCount, tips:"广告位类型", type:Number, default:"0"}*/
    public RdCount: number = 0;

    protected _rdSp: Laya.Image;
    onAwake() {
        super.onAwake();
        this._rdSp = this.owner.getChildByName("RdSp") as Laya.Image;
    }

    // onEnable(): void {
    //     this._displaySp.on(Laya.Event.CLICK, this, this.Clicked);
    // }

    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onClick);
    // }

    public setData(data, parent, index) {
        if (data) {
            this._data = data;
            this._displaySp.loadImage(this._data.useImgList[Math.floor(Math.random() * this._data.useImgList.length)], Laya.Handler.create(this, () => {
                // if (!this._displaySp.destroyed) {
                //     this._displaySp.width = this._originW;
                //     this._displaySp.height = this._originH;
                // }
            }));
            // var str = String(data.show_config.title);
            // var num = str.length;
            // num = Math.max(5,num);
            // var fontSize = Math.floor((5 / num) * this._fontSize);
            // this._disText.fontSize = fontSize;
            this._disText.text = this._data.gameName;
            if (this.RdName != null && this.RdCount > 0 && this._rdSp != null) {
                let i = index % this.RdCount;
                let resname = this.RdName + i + ".png";
                this._rdSp.skin = resname;
            }
        }
        this._parentAdView = parent;
    }
}