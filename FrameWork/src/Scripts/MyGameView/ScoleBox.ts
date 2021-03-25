import SceneMgr_csjc from "../GameCore/SceneMgr";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";

export default class ScoleBox extends Laya.Script {
    private _scoleTextList: Array<Laya.Text> = [];
    private _ownerSp: Laya.UIComponent;
    private _scoleFontClip: Laya.FontClip;
    onAwake() {
        this._ownerSp = this.owner as Laya.UIComponent;
        this._scoleFontClip = this.owner.getChildByName("ScoleFontClip") as Laya.FontClip;
        for (let i = 0; i < 10; i++) {
            let text = new Laya.Text();
            text.text = "1000";
            text.width = 120;
            text.height = 40;
            text.pivotX = 60;
            text.pivotY = 20;
            text.align = "center";
            text.valign = "middle";
            text.font = "Microsoft YaHei";
            text.fontSize = 30;
            text.bold = true;
            text.color = "#FFFFFF";
            text.strokeColor = "#000000";
            text.stroke = 4;
            text.visible = false;
            this._ownerSp.addChild(text);
            this._scoleTextList.push(text);
        }
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.Game_ShowScore_csjc, this, this.ShowScole);
    }
    onUpdate() {
        this._scoleFontClip.value = SceneMgr_csjc.Instance.Scole.toString();;
    }
    onDestroy() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_ShowScore_csjc, this, this.ShowScole);
    }
    ShowScole(count: number, pos: Laya.Point) {
        if (this._scoleTextList.length <= 0) return;
        const scoleText = this._scoleTextList.pop();
        let point = this._ownerSp.globalToLocal(pos, true);
        scoleText.x = point.x + 20;
        scoleText.y = point.y + 20;
        scoleText.fontSize = 50;
        scoleText.bold = true;
        scoleText.color = "#FFFFFF";
        scoleText.strokeColor = "#000000";
        scoleText.stroke = 4;
        scoleText.text = "+" + count/*  + count */;
        scoleText.visible = true;
        Laya.Tween.to(scoleText, { y: point.y - 50, scaleX: 0.5, scaleY: 0.5 }, 500, Laya.Ease.expoIn, Laya.Handler.create(this, () => {
            scoleText.visible = false;
            scoleText.scaleX = 1;
            scoleText.scaleY = 1;
            this._scoleTextList.push(scoleText);
        }))
    }
}