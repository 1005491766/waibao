import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import { InputType } from "../GameCore/Enums";
export default class Controller extends Laya.Script {
    constructor() {
        super();
    }
    private _isMouseDown;
    private _lastX;
    private _lastY;
    /**
     * 鼠标按下时
     * 
     * @memberof Controller
     */
    onMouseDown() {
        this._isMouseDown = true;
        this._lastX = null;
        this._lastY = null;
    }

    /**
     * 当鼠标移出时
     * 
     * @memberof Controller
     */
    onMouseOut() {
        this._isMouseDown = false;
        this._lastX = null;
        this._lastY = null;
    }

    /**
     * 鼠标抬起
     * 
     * @memberof Controller
     */
    onMouseUp() {
        this._isMouseDown = false;
        this._lastX = null;
        this._lastY = null;
    }

    /**
     * 鼠标移动
     * 
     * @memberof Controller
     */
    onMouseMove() {
        if (this._isMouseDown) {
            if (this._lastX == null) {
                this._lastX = Laya.stage.mouseX;
            }
            else {
                let x = Laya.stage.mouseX - this._lastX;
                // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.CameraAxis, Value: new Laya.Point(x, y) });
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraRotateY: -x * 0.3 });
                this._lastX = Laya.stage.mouseX;
            }

            if (this._lastY == null) {
                this._lastY = Laya.stage.mouseY;
            }
            else {
                let y = Laya.stage.mouseY - this._lastY;
                // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_Input_csjc, { InputType: InputType.CameraAxis, Value: new Laya.Point(x, y) });
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraRotateX: y * 0.3 });
                this._lastY = Laya.stage.mouseY;
            }
        }
    }
}