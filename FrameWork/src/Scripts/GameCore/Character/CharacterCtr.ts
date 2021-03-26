import { Transition, StateID } from "../Fsm/FsmEnum";
import FSMSystem from "../Fsm/FSMSystem";
import TRexState from "../FsmStates/TRexState";
import PterState from "../FsmStates/PterState";
import SceneMgr_cscj from "../SceneMgr";
import KingkingState from "../FsmStates/KingkingState";
import { PlayerType } from "../Enums";
import BaseState from "../FsmStates/BaseState";

export default class CharacterCtr extends Laya.Script3D {
    get FollowObj(): Laya.Sprite3D { return this._followObj; }
    get StateId(): StateID { return this._fsm.CurrentStateID; }
    get State():BaseState{ return this._fsmboss }

    protected _fsm: FSMSystem;
    protected _tRex: Laya.Sprite3D;
    protected _kingkong: Laya.Sprite3D;
    protected _playerKind:PlayerType
    protected _fsmboss:BaseState

    // protected _pter: Laya.Sprite3D;
    protected _followObj: Laya.Sprite3D;
    onAwake() {
        this._tRex = this.owner.getChildByName("TRex") as Laya.Sprite3D;
        this._kingkong = this.owner.getChildByName("Kingkong") as Laya.Sprite3D;
        // this._pter = this.owner.getChildByName("PteroShort") as Laya.Sprite3D;
        this.MakeFsm();
    }

    onUpdate() {
        this._fsm.CurrentState.Act();
    }

    MakeFsm() {
        this._fsm = new FSMSystem(this);
        // this._fsm.AddState(this._kingkong.addComponent(KingkingState));
        // this._fsm.AddState(this._tRex.addComponent(TRexState));
        // this._kingkong.active=false
        
        if(SceneMgr_cscj.Instance.PlayerKind == PlayerType.TRex)
        {
            this._fsm.AddState(this._tRex.addComponent(TRexState));
            this._fsmboss = this._tRex.getComponent(TRexState)
            this._kingkong.active=false
            this._playerKind = PlayerType.TRex
            
        }
        else
        {
            this._fsm.AddState(this._kingkong.addComponent(KingkingState));
            this._fsmboss = this._kingkong.getComponent(KingkingState)
            this._tRex.active=false
            this._playerKind = PlayerType.Kingkong
        }
    }

    PerformTransition(trs: Transition) {
        this._fsm.PerformTransition(trs);
    }

    Input(point: Laya.Point) {
        // console.log("---------------------------输入",point)
        this._fsm.CurrentState.Reason(point);
    }

    SetFollowObj(obj: Laya.Sprite3D) {
        this._followObj = obj;
        SceneMgr_cscj.Instance.CameraCtr.InitCamera(this._followObj);
    }

    private _vsound1: any;
    private _curUrl: string;
    private _fireSound: string = "subRes/sound/Fire.mp3";

    public FireSound(volume) {
        if (Laya.Browser.onMiniGame) {
            if (!this._vsound1) {
                this._vsound1 = wx.createInnerAudioContext();
            }
            if (this._curUrl == this._fireSound) {
                if (this._vsound1.paused) {
                    this._vsound1.play();
                }
                this._vsound1.volume = volume;
            }
            else {
                this._curUrl = this._fireSound;
                this._vsound1.stop();
                this._vsound1.src = this._fireSound;
                this._vsound1.loop = true;
                this._vsound1.play();
            }
        }
    }

    StopSound() {
        if (Laya.Browser.onMiniGame) {
            if (this._vsound1) {
                this._vsound1.stop();
            }
        }
    }
}