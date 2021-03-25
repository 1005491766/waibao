import QpShakeAd2View from "./QpShakeAd2View";
import QpListAdBox from "./QpListAdBox";

export default class QpShakeAd3View extends QpShakeAd2View {
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
    protected _list2: Laya.List;
    onAwake() {
        super.onAwake();
        this._list2 = this.owner.getChildByName("List2") as Laya.List;
        this._list2.renderHandler = Laya.Handler.create(this, this.onList2Render, null, false)
    }

    protected onList2Render(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: QpListAdBox = cell.getComponent(QpListAdBox);
        loopAdBox.setData(data, this.owner, index);
    }

    RefreshAdList() {
        super.RefreshAdList()
        this._list2.array = this._list.array.concat();
    }
}