import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import TmAPI from "../TmAPI";

export default class TmListAdBox extends Laya.Script {
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

    public setData(data, parent) {
        if (data) {
            this._creativeId = data.creativeId;
            this._positionId = data.positionId;
            this._appId = data.appId;
            this._displaySp.loadImage(data.show_config.image, Laya.Handler.create(this, () => {
                // if (!this._displaySp.destroyed) {
                //     this._displaySp.width = this._originW;
                //     this._displaySp.height = this._originH;
                // }
            }));
            var str = String(data.show_config.title);
            // var num = str.length;
            // num = Math.max(5,num);
            // var fontSize = Math.floor((5 / num) * this._fontSize);
            // this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
        this._parentAdView = parent;
    }
    /**
     * 控件被点击事件
     * 
     * @protected
     * @memberof TmListAdBox
     */
    public onClick() {
        if (this._data) {
            console.log("跳转游戏： " + this._appId);
            TmAPI.NavigateAndReport(this._positionId, this._creativeId, this._appId, (flag, list) => {
                if (!flag) {
                    EventMgr_csjc.dispatch_csjc(EventDef_csjc.AD_OnShareAdFail_csjc);
                }
                else {
                    this._parentAdView.event("AdRefresh");
                }
                // if (list != null) {
                //     this._parentAdView.event("Refresh");
                // }
            });
        }
    }
    // protected onSpClick() {
    //     var data = this._data;
    //     if (data) {
    //         console.log("跳转游戏： " + data.title);
    //         if (Laya.Browser.onMiniGame) {
    //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
    //                 console.log("跳转成功")
    //                 ALD.aldSendReportAdClickSuccess(data);
    //             }, (res) => {
    //                 console.log("跳转失败")
    //                 EventMgr.dispatch(EventDef.AD_OnShareAdFail);
    //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
    //                     console.log("用户取消跳转");
    //                     ALD.aldSendReportAdClickFail(data);
    //                 }
    //             }, (res) => {
    //                 console.log("跳转完成")
    //             });
    //         }
    //         else if (Laya.Browser.onQGMiniGame) {
    //             OPPOAPI.navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
    //                 console.log("跳转成功")
    //             }, (res) => {
    //                 console.log("跳转失败")
    //                 EventMgr.dispatch(EventDef.AD_OnShareAdFail);
    //             }, (res) => {
    //                 console.log("跳转完成")
    //             });
    //         }
    //         else if (Laya.Browser.onQQMiniGame) //qq小游戏
    //         {
    //             QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
    //                 console.log("跳转成功")
    //             }, (res) => {
    //                 console.log("跳转失败")
    //                 EventMgr.dispatch(EventDef.AD_OnShareAdFail);
    //             }, (res) => {
    //                 console.log("跳转完成")
    //             });
    //         }
    //     }
    // }
}