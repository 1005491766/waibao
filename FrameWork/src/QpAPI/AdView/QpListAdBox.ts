import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import WXAPI_csjc from "../../PlatformApi/WXAPI";
import { AdDataMgr, ComponentStyle } from "../AdDataMgr";

export default class QpListAdBox extends Laya.Script {
    protected _displaySp: Laya.Sprite;
    protected _disText: Laya.Text;
    protected _data: any = null;
    // protected _originW: number = 200;
    // protected _originH: number = 200;
    protected _fontSize = 25;
    protected _positionId = 0;
    protected _creativeId = 0;
    protected _appId = "";
    protected _parentAdView: Laya.UIComponent;
    onAwake() {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        // this._originW = this._displaySp.width;
        // this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitleText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
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

        }
        this._parentAdView = parent;
    }

    onMouseDown() {
        this.NavigateTo();
    }

    NavigateTo() {
        if (this._data) {
            console.log("跳转游戏： " + this._data.gameName);
            if (Laya.Browser.onMiniGame) {
                AdDataMgr.Instance.NavigateTo(ComponentStyle.h_slider, this._data);
            }
            else {
                console.log("跳转完成")
            }
        }
    }
}