import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import { InputType, PlayerType } from "../GameCore/Enums";
import SceneMgr_cscj from "../GameCore/SceneMgr";

export default class BtnPanel extends Laya.Script {
    //恐龙ui
    private _tRexPanle: Laya.UIComponent;
    private _RTransBtn: Laya.UIComponent;
    private _attackBtn: Laya.UIComponent;
    private _jumpBtn: Laya.UIComponent;
    private _fireBtn: Laya.UIComponent;


    //金刚ui
    private _kingKongPanle: Laya.UIComponent;
    private _kingKongAtkBtn: Laya.UIComponent;
    private _kingKongJumpBtn: Laya.UIComponent;
    private _kingKongFireBtnBtn: Laya.UIComponent;

    
    
    // private _attackBtn: Laya.UIComponent;
    // private _jumpBtn: Laya.UIComponent;

    //翼龙ui
    // private _pterPanel: Laya.UIComponent;
    // private _frontBtn: Laya.UIComponent;
    // private _backBtn: Laya.UIComponent;
    // private _upBtn: Laya.UIComponent;
    // private _leftBtn: Laya.UIComponent;
    // private _rightBtn: Laya.UIComponent;
    // private _downBtn: Laya.UIComponent;
    // private _fireBallBtn: Laya.UIComponent;
    // private _CTransBtn: Laya.UIComponent;


    private _left: boolean = false;
    private _right: boolean = false;
    private _front: boolean = false;
    private _back: boolean = false;
    private _up: boolean = false;
    private _down: boolean = false;
    private _fire: boolean = false;
    onAwake() {
        this._tRexPanle = this.owner.getChildByName("TRexPanel") as Laya.UIComponent;

        this._RTransBtn = this._tRexPanle.getChildByName("TransBtn") as Laya.UIComponent;
        this._attackBtn = this._tRexPanle.getChildByName("AttackBtn") as Laya.UIComponent;
        this._jumpBtn = this._tRexPanle.getChildByName("JumpBtn") as Laya.UIComponent;
        this._fireBtn = this._tRexPanle.getChildByName("FireBtn") as Laya.UIComponent;

        //金刚战斗ui
        this._kingKongPanle = this.owner.getChildByName("KingkongPanel") as Laya.UIComponent;

        this._kingKongAtkBtn = this._kingKongPanle.getChildByName("AttackBtn") as Laya.UIComponent;
        this._kingKongJumpBtn = this._kingKongPanle.getChildByName("JumpBtn") as Laya.UIComponent;
        this._kingKongFireBtnBtn = this._kingKongPanle.getChildByName("FireBtn") as Laya.UIComponent;
        
        // this._jumpBtn = this._tRexPanle.getChildByName("JumpBtn") as Laya.UIComponent;
        // this._fireBtn = this._tRexPanle.getChildByName("FireBtn") as Laya.UIComponent;


        // //翼龙战斗ui
        // this._pterPanel = this.owner.getChildByName("PterPanel") as Laya.UIComponent;
        // this._frontBtn = this._pterPanel.getChildByName("FrontBtn") as Laya.UIComponent;
        // this._backBtn = this._pterPanel.getChildByName("BackBtn") as Laya.UIComponent;
        // this._rightBtn = this._pterPanel.getChildByName("RightBtn") as Laya.UIComponent;
        // this._leftBtn = this._pterPanel.getChildByName("LeftBtn") as Laya.UIComponent;
        // this._upBtn = this._pterPanel.getChildByName("UpBtn") as Laya.UIComponent;
        // this._downBtn = this._pterPanel.getChildByName("DownBtn") as Laya.UIComponent;
        // this._CTransBtn = this._pterPanel.getChildByName("TransBtn") as Laya.UIComponent;
        // this._fireBallBtn = this._pterPanel.getChildByName("FireBallBtn") as Laya.UIComponent;


        this.TransformPanle(false);
    }
    onEnable() {
        this.addEvent();
    }
    onDisable() {
        this.removeEvent();
    }

    onUpdate() {
        // if (this._pterPanel.visible) {
        //     let point = new Laya.Point(0, 0);
        //     if (this._left) {
        //         point.x = 1;
        //     }
        //     else if (this._right) {
        //         point.x = -1;
        //     }
        //     else {
        //         point.x = 0;
        //     }
        //     if (this._front) {
        //         point.y = 1;
        //     }
        //     else if (this._back) {
        //         point.y = -1;
        //     }
        //     else {
        //         point.y = 0;
        //     }
        //     if (point.x == 0 && point.y == 0) {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null })
        //     }
        //     else {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: point })
        //     }
        //     if (this._up) {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.UP })
        //     }
        //     else if (this._down) {
        //         EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.Down })
        //     }
        // }
        // else 
        if (this._tRexPanle.visible) {
            if (this._fire) {
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.Fire })
            }
        }
        else if(this._kingKongPanle.visible)
        {
            
        }
    }

    addEvent() {
        this._RTransBtn.on(Laya.Event.CLICK, this, this.OnTransBtn)
        this._attackBtn.on(Laya.Event.CLICK, this, this.OnAttackBtn)
        this._jumpBtn.on(Laya.Event.CLICK, this, this.OnJumpBtn)
        this._fireBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnFireBtn, [true])
        this._fireBtn.on(Laya.Event.MOUSE_UP, this, this.OnFireBtn, [false])

        this._kingKongAtkBtn.on(Laya.Event.CLICK, this, this.OnAttackBtn)
        this._kingKongJumpBtn.on(Laya.Event.CLICK, this, this.OnJumpBtn)
        this._kingKongFireBtnBtn.on(Laya.Event.CLICK, this, this.OnThrowStoneBtn)

        // this._CTransBtn.on(Laya.Event.CLICK, this, this.OnTransBtn)
        // this._frontBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnFront, [true]);
        // this._frontBtn.on(Laya.Event.MOUSE_UP, this, this.OnFront, [false]);
        // this._backBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnBack, [true]);
        // this._backBtn.on(Laya.Event.MOUSE_UP, this, this.OnBack, [false]);
        // this._leftBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnLeft, [true]);
        // this._leftBtn.on(Laya.Event.MOUSE_UP, this, this.OnLeft, [false]);
        // this._rightBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnRight, [true]);
        // this._rightBtn.on(Laya.Event.MOUSE_UP, this, this.OnRight, [false]);
        // this._upBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnUp, [true]);
        // this._upBtn.on(Laya.Event.MOUSE_UP, this, this.OnUp, [false]);
        // this._downBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnDown, [true]);
        // this._downBtn.on(Laya.Event.MOUSE_UP, this, this.OnDown, [false]);
        // this._fireBallBtn.on(Laya.Event.MOUSE_DOWN, this, this.OnFireBallBtn);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.TransformEvent, this, this.TransformPanle);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.CharacterFalling, this, this.Falling);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.CharacterClimbing, this, this.Climbing);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.CharacterNormal, this, this.Normal);
    }

    removeEvent() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.TransformEvent, this, this.TransformPanle);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.CharacterFalling, this, this.Falling);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.CharacterClimbing, this, this.Climbing);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.CharacterNormal, this, this.Normal);
    }

    TransformPanle(isCar: boolean) {
        this._tRexPanle.visible = SceneMgr_cscj.Instance.PlayerKind == PlayerType.TRex
        this._kingKongPanle.visible = SceneMgr_cscj.Instance.PlayerKind == PlayerType.Kingkong
        // this.Normal();


        // if (SceneMgr_cscj.Instance.PlayerKind == PlayerType.TRex) {
        //     // this._pterPanel.visible = true;
        //     this._tRexPanle.visible = false;
        // }
        // else {
        //     // this._pterPanel.visible = false;
        //     this._tRexPanle.visible = true;
        // }
        // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.RockerAxis, Value: null })
    }

    OnTransBtn() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.Transform })
    }

    OnAttackBtn() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.Attack })
    }

    OnJumpBtn() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.Jump })
    }

    OnThrowStoneBtn() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.ThrowStone })
    }

    OnFireBtn(isDown: boolean) {
        this._fire = isDown;
    }

    OnFireBallBtn(isDown: boolean) {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.FireBall })
    }

    OnFront(isDown: boolean) {
        this._front = isDown;
        if (isDown) {
            this._back = false;
        }
    }

    OnBack(isDown: boolean) {
        this._back = isDown;
        if (isDown) {
            this._front = false;
        }
    }

    OnLeft(isDown: boolean) {
        this._left = isDown;
        if (isDown) {
            this._right = false;
        }
    }

    OnRight(isDown: boolean) {
        this._right = isDown;
        if (isDown) {
            this._left = false;
        }
    }

    OnUp(isDown: boolean) {
        this._up = isDown;
        if (isDown) {
            this._down = false;
        }
    }

    OnDown(isDown: boolean) {
        this._down = isDown;
        if (isDown) {
            this._up = false;
        }
    }

    Falling() {
        if (!this._attackBtn.gray) this._attackBtn.gray = true;
        if (!this._RTransBtn.gray) this._RTransBtn.gray = true;
        if (!this._jumpBtn.gray) this._jumpBtn.gray = true;
        if (!this._fireBtn.gray) this._fireBtn.gray = true;
        
        if (!this._kingKongAtkBtn.gray) this._kingKongAtkBtn.gray = true;
        if (!this._kingKongFireBtnBtn.gray) this._kingKongFireBtnBtn.gray = true;
    }

    Climbing() {
        if (!this._attackBtn.gray) this._attackBtn.gray = true;
        if (!this._RTransBtn.gray) this._RTransBtn.gray = true;
        if (!this._fireBtn.gray) this._fireBtn.gray = true;
        if (this._jumpBtn.gray) this._jumpBtn.gray = false;

        if (!this._kingKongAtkBtn.gray) this._kingKongAtkBtn.gray = true;
        if (!this._kingKongFireBtnBtn.gray) this._kingKongFireBtnBtn.gray = true;

    }

    Normal() {
        if (this._attackBtn.gray) this._attackBtn.gray = false;
        if (this._RTransBtn.gray) this._RTransBtn.gray = false;
        if (this._jumpBtn.gray) this._jumpBtn.gray = false;
        if (this._fireBtn.gray) this._fireBtn.gray = false;

        if (this._kingKongAtkBtn.gray) this._kingKongAtkBtn.gray = false;
        if (this._kingKongFireBtnBtn.gray) this._kingKongFireBtnBtn.gray = false;

    }
}