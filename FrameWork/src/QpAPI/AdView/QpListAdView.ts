import QpListAdBox from "./QpListAdBox";
import { AdDataMgr, ComponentStyle } from "../AdDataMgr";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

/**
 * 用于显示滚动广告列表的类
 * 
 * @export
 * @class ListAdView
 * @extends {Laya.Script}
 */
export default class ListAdView extends Laya.Script {

    /** @prop {name:AdStyle, tips:"广告位类型", type:Option, default:"Slider",option:"Slider,Export"}*/
    public AdStyle: string = "Slider";

    /** @prop {name:ScrollDirection,tips:"滚动方向,水平或竖直",type:Option,option:"Horizontal,Vertical",default:"Horizontal"}*/
    public ScrollDirection: String = "Horizontal";

    /** @prop {name:ScrollSpeed, tips:"滚动速度", type:Number, default:100}*/
    public ScrollSpeed: number = 100;

    /** @prop {name:ListCount, tips:"数量", type:Number, default:20}*/
    public ListCount: number = 20;

    protected _ownerSp: Laya.Sprite;
    protected _list: Laya.List;
    protected _scrollForward = true;

    onAwake() {
        this._ownerSp = this.owner as Laya.Sprite;
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.elasticEnabled = true;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        if (this.ScrollDirection == "Horizontal") {
            this._list.hScrollBarSkin = "";
        }
        else {
            this._list.vScrollBarSkin = "";
        }
        this.owner.on("AdRefresh", this, this.RefreshAdList);
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
        let scrollValue = this.ScrollSpeed * Laya.timer.delta / 1000;
        this._list.scrollBar.value += scrollValue;
        if (this._list.scrollBar.value >= this._list.scrollBar.max) {
            this._list.scrollBar.value = 0;
        }
        else if (this._list.scrollBar.value < 0) {
            this._list.scrollBar.value = this._list.scrollBar.max;
        }

    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var listAdBox: QpListAdBox = cell.getComponent(QpListAdBox);
        listAdBox.setData(data, this.owner, index);
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
        let data = AdDataMgr.Instance.GetDataByStyleAndCount(style, 30);
        if (data.length > 0 && data.length < this.ListCount) {
            let resetCount = this.ListCount - data.length
            let dataTemp = data.concat();
            for (let index = 0; index < resetCount; index++) {
                const element = data[index];
                dataTemp.push(element);
            }
            this._list.array = dataTemp;
        }
        else {
            this._list.array = data;
        }

    }
}