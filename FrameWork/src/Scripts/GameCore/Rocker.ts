import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import { InputType } from "./Enums";



export default class Rocker extends Laya.Script {

    protected _rocketType = 1;//摇杆类型,1固定，2以每次按下为中心
    protected _rocketShow = 1;//摇杆显示类型,1一直显示2按下时显示抬起时隐藏

    protected _rockerZone: Laya.Sprite;
    protected _moveSp: Laya.Sprite;
    protected _bgSp: Laya.Sprite;
    protected _moveRadius: number = 100;
    protected _ownerSprite: Laya.Sprite;
    protected _originPoint: Laya.Point;
    private m_isClick: boolean = false;
    private keyList: Array<any> = [];
    private keyDown: boolean = false;
    constructor() { super(); }


    onAwake() {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._rockerZone = this.owner.parent as Laya.Sprite;
        this._moveSp = this.owner.getChildByName("Btn") as Laya.Sprite;
        this._bgSp = this.owner as Laya.Sprite;
        if (this._rocketShow == 2) {
            this._ownerSprite.visible = false;
        }
    }

    onStart() {
        this._originPoint = new Laya.Point(this._ownerSprite.x, this._ownerSprite.y);
    }

    onEnable(): void {
        this._rockerZone.on(Laya.Event.MOUSE_DOWN, this, this.onRokerZoneClickDown)
        this._moveSp.on(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp)

        this._moveSp.x = this._bgSp.width / 2;
        this._moveSp.y = this._bgSp.height / 2;

        Laya.stage.on(Laya.Event.KEY_UP, this, this.onkeyup);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onkeydown);
    }

    onDisable(): void {
        this._rockerZone.off(Laya.Event.MOUSE_DOWN, this, this.onRokerZoneClickDown)
        this._moveSp.off(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp)
        this._rockerZone.off(Laya.Event.MOUSE_MOVE, this, this.onMoveSpClickMove);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null });
        this._moveSp.x = this._bgSp.width / 2;
        this._moveSp.y = this._bgSp.height / 2;
    }

    protected onRokerZoneClickDown() {
        if (this._rocketType == 2) {
            var point = this._rockerZone.localToGlobal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY));
            this._ownerSprite.x = point.x
            this._ownerSprite.y = point.y;
        }
        this._rockerZone.on(Laya.Event.MOUSE_MOVE, this, this.onMoveSpClickMove);
        this._rockerZone.on(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp);
        this._rockerZone.on(Laya.Event.MOUSE_OUT, this, this.onMoveSpClickUp);
        this.m_isClick = true;
        this._ownerSprite.visible = true;
        // EventMgr.instance.dispatch(EventDef.GameInput);
        // EventMgr.instance.dispatch(EventDef.Game_GuideShow, {result: false});
    }

    protected onMoveSpClickUp() {
        this._rockerZone.off(Laya.Event.MOUSE_MOVE, this, this.onMoveSpClickMove);
        this._rockerZone.off(Laya.Event.MOUSE_UP, this, this.onMoveSpClickUp);
        this._rockerZone.off(Laya.Event.MOUSE_OUT, this, this.onMoveSpClickUp);

        var originX = this._bgSp.width / 2;
        var originY = this._bgSp.height / 2;
        Laya.Tween.to(this._moveSp, { x: originX, y: originY }, 100, Laya.Ease.linearNone);

        this._ownerSprite.x = this._originPoint.x;
        this._ownerSprite.y = this._originPoint.y;

        this.m_isClick = false;
        if (this._rocketShow == 2) {
            this._ownerSprite.visible = false;
        }
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null });
    }

    protected onMoveSpClickMove() {
        var parentView = this.owner.parent as Laya.View;
        var bgStagePoint = parentView.localToGlobal(new Laya.Point(this._bgSp.x, this._bgSp.y), true);
        var xx: number = Laya.stage.mouseX - bgStagePoint.x;
        var yy: number = Laya.stage.mouseY - bgStagePoint.y;

        var obl: number = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
        var rad: number = yy < 0 ? Math.acos(xx / obl) : (Math.PI * 2 - Math.acos(xx / obl));
        var angle: number = 180 / Math.PI * rad;

        if (obl > this._moveRadius) {
            var x: number = (this._moveRadius * xx) / obl + bgStagePoint.x;
            var y: number = (this._moveRadius * yy) / obl + bgStagePoint.y;
            var moveSpLocalPoint = this._bgSp.globalToLocal(new Laya.Point(x, y), true);
            this._moveSp.pos(moveSpLocalPoint.x, moveSpLocalPoint.y);
        }
        else {
            var pos = this._bgSp.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY), true);
            this._moveSp.pos(pos.x, pos.y);
        }
    }

    public getRockerVlaue(): Laya.Point {
        var outX = (this._moveSp.x - this._bgSp.width / 2) / this._moveRadius;
        var outY = (this._moveSp.y - this._bgSp.height / 2) / this._moveRadius;
        var dir = new Laya.Point(outX, outY);
        // dir.normalize();
        return dir;
    }

    onUpdate() {
        if (this.m_isClick) {
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: this.getRockerVlaue() });
            // console.log();
            // EventMgr.instance.dispatch(EventDef.Game_MoveInput, this.getRockerVlaue());
        }
        if (this.keyList.length > 0) {
            this.keyDown = true;
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: new Laya.Point(0, -1) });
        }
        else {
            if (this.keyDown == true) {
                this.keyDown = false;
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null });
            }
        }
    }
    onkeyup(e) {
        for (let i: number = 0; i < this.keyList.length; i++) {
            if (this.keyList[i] == e.keyCode) {
                this.keyList.splice(i, 1);
                break;
            }
        }
    }

    onkeydown(e) {
        if (this.keyList.indexOf(e.keyCode) < 0) {
            this.keyList.push(e.keyCode);
        }
    }
}