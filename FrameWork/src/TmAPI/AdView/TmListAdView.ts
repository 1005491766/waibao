import TmListAdBox from "./TmListAdBox";
import TmAPI from "../TmAPI";

/**
 * 用于显示滚动广告列表的类
 * 
 * @export
 * @class ListAdView
 * @extends {Laya.Script}
 */
export default class ListAdView extends Laya.Script {

    /** @prop {name:ScrollDirection,tips:"滚动方向,水平或竖直",type:Option,option:"Horizontal,Vertical",default:"Horizontal"}*/
    public ScrollDirection: String = "Horizontal";

    /** @prop {name:AdLocationID, tips:"广告位ID", type:Number, default:ShareAd.LoopAdLocationID}*/
    public AdLocationID: number = TmAPI.ListIcoAdLocationId;

    /** @prop {name:ScrollSpeed, tips:"滚动速度", type:Number, default:100}*/
    public ScrollSpeed: number = 100;

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
        this.RefreshAdList();
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

    // onUpdate() {
    //     let scrollValue = this.ScrollSpeed * Laya.timer.delta / 1000;
    //     if (this._scrollForward) {
    //         this._list.scrollBar.value += scrollValue;
    //         if (this._list.scrollBar.value >= this._list.scrollBar.max) {
    //             this._scrollForward = false;
    //         }
    //     }
    //     else {
    //         this._list.scrollBar.value -= scrollValue;
    //         if (this._list.scrollBar.value <= 0) {
    //             this._scrollForward = true;
    //         }
    //     }
    // }

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
        var listAdBox: TmListAdBox = cell.getComponent(TmListAdBox);
        listAdBox.setData(data, this.owner);
    }
}