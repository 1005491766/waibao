import { Transition, StateID } from "../Fsm/FsmEnum";
import FSMSystem from "../Fsm/FSMSystem";
import TRexState from "../FsmStates/TRexState";
import PterState from "../FsmStates/PterState";
import SceneMgr_cscj from "../SceneMgr";
import KingkingState from "../FsmStates/KingkingState";
import { PlayerType, InputType } from "../Enums";
import BaseState from "../FsmStates/BaseState";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";

export default class CharacterCtr extends Laya.Script3D {
    get FollowObj(): Laya.Sprite3D { return this._followObj; }
    get StateId(): StateID { return this._fsm.CurrentStateID; }
    get State(): BaseState { return this._fsmboss }
    get Sprite3D(): Laya.Sprite3D { return this._mowner as Laya.Sprite3D }
    private _selecetKind = 0
    private _canRO = true

    protected _mowner: Laya.Sprite3D = null;
    protected _fsm: FSMSystem;
    protected _tRex: Laya.Sprite3D;
    protected _kingkong: Laya.Sprite3D;
    protected _playerKind: PlayerType
    protected _fsmboss: BaseState
    
    // protected _pter: Laya.Sprite3D;
    protected _followObj: Laya.Sprite3D;
    onAwake() {
        this._tRex = this.owner.getChildByName("TRex") as Laya.Sprite3D;
        this._kingkong = this.owner.getChildByName("Kingkong") as Laya.Sprite3D;
        // this._pter = this.owner.getChildByName("PteroShort") as Laya.Sprite3D;
        this.MakeFsm();
    }
    onEnable()  {
        this._mowner = this._playerKind != PlayerType.Kingkong?this._tRex.getChildAt(0) as Laya.Sprite3D:this._kingkong.getChildAt(0)as Laya.Sprite3D;
        this._canRO=true
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.Game_Input_csjc, this, this.Input_csjc);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.BossVisible, this, this.OnSelectHero);

    }
    onDisable()
    {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_Input_csjc, this, this.Input_csjc);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.BossVisible, this, this.OnSelectHero);
    }
    // RemoveEvent() {
    //     super.RemoveEvent
    // }
    /**监听选择英雄 */
    OnSelectHero() {
        if (SceneMgr_cscj.Instance.PlayerKind == PlayerType.Kingkong)  {
            this._selecetKind = 0
        }
        else {
            this._selecetKind = 1
        }
        console.log("----------------------------xxx选择结果",this._selecetKind)
    }


    onUpdate() {
        this._fsm.CurrentState.Act();
    }
    public Input_csjc(point) {
        if(SceneMgr_cscj.Instance.BossVisible==false)
        return ;
        if (!point) return;
        let type = point.InputType;

        if(type == InputType.Attack&&this._canRO == true)
        {
            this._canRO = false
            Laya.timer.once(1000,this,()=>{
                this._canRO = true
            })
            let dir = new Laya.Vector3();
            Laya.Vector3.subtract(this.Sprite3D.transform.position,
            (SceneMgr_cscj.Instance.BossSprite3D.getChildAt(this._selecetKind) as Laya.Sprite3D).transform.position, dir);
            Laya.Vector3.add(this.Sprite3D.transform.position, dir, dir);
            // console.log("-------------旋转输出",SceneMgr_cscj.Instance.BossSprite3D.getChildAt(this._selecetKind).name,this.Sprite3D.transform.rotationEuler.y)
            this.Sprite3D.transform.lookAt(dir, Laya.Vector3._Up);

            // this.Sprite3D.transform.lookAt((SceneMgr_cscj.Instance.BossSprite3D.getChildAt(this._selecetKind) as Laya.Sprite3D).transform.position, Laya.Vector3._Up);
            // this.Sprite3D.transform.localRotationEulerY+=180
            // console.log("-------------输出22222222222222",this.Sprite3D.transform.rotationEuler.y)

        }

    }

    MakeFsm() {
        this._fsm = new FSMSystem(this);
        // this._fsm.AddState(this._kingkong.addComponent(KingkingState));
        // this._fsm.AddState(this._tRex.addComponent(TRexState));
        // this._kingkong.active=false

        if (SceneMgr_cscj.Instance.PlayerKind == PlayerType.TRex)  {
            this._fsm.AddState(this._tRex.addComponent(TRexState));
            this._fsmboss = this._tRex.getComponent(TRexState)
            this._kingkong.active = false
            this._playerKind = PlayerType.TRex

        }
        else  {
            this._fsm.AddState(this._kingkong.addComponent(KingkingState));
            this._fsmboss = this._kingkong.getComponent(KingkingState)
            this._tRex.active = false
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