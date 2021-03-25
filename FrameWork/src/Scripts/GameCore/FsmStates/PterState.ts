import BaseState from "./BaseState";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";
import { StateID, Transition } from "../Fsm/FsmEnum";
import { CollisionGroup } from "../Enums";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import SceneMgr_cscj from "../SceneMgr";


enum PterSubState {
    Idle,
    Move,
    Transform,
    FireBall
}

export default class PterState extends BaseState {
    constructor() {
        super();
        this.AddTransition(Transition.Pter2TRex, StateID.TRex);
    }

    private _subState: PterSubState = PterSubState.Idle;
    protected stateID = StateID.Pter;
    private _rigidBody3D: Laya.Rigidbody3D;
    private _speedTimer: number = 0;
    private _cameraTimer: number = 0;
    private _lockObj: Laya.Sprite3D;
    private _currentTarget: Laya.Sprite3D;
    private _firePos: Laya.Sprite3D;
    onAwake() {
        this._animator = this.Model.getComponent(Laya.Animator) as Laya.Animator;
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        this._rigidBody3D.isKinematic = false;
        this._rigidBody3D.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigidBody3D.collisionGroup = CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = CollisionGroup.All ^ CollisionGroup.Character;
        this._firePos = this.Model.getChildByName("FirePos") as Laya.Sprite3D;
        this.StopMove();
    }

    public DoBeforeEntering(any?: any) {
        this.characterCtr.SetFollowObj(this.Model);
        this._subState = PterSubState.Idle;
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.TransformEvent, [true]);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: new Laya.Vector3(0, 20, 10), CameraViewForward: 0 });
        this.SetCameraPos();
    }


    public DoBeforeLeaving(any?: any) {
        this.Animator.play("Idle");
        SoundMgr_csjc.instance_csjc.playSound_csjc("Roar1");
        this._subState = PterSubState.Idle;
    }

    public Act(any?: any) {
        super.Act(any);
        switch (this._subState) {
            case PterSubState.Idle:
                this.Idle();
                break;
            case PterSubState.Move:
                this.PterMoveMethod();
                break;
            case PterSubState.Transform:
                this.PterTrasform2TRex();
                break;
            case PterSubState.FireBall:
                this.FireBallMethod();
                break;
        }
    }

    PterMoveMethod() {
        if (this.TransformInput) {
            this._subState = PterSubState.Transform;
        }
        else if (this.FireBallInput) {
            this._subState = PterSubState.FireBall;
        }
        else if (this._speedTimer == 0 && this.RockerAxis == null && !this.DownInput && !this.UpInput) {
            this._subState = PterSubState.Idle;
        }
        // else if (this.RockerAxis) {
        // let angle = (Math.atan2(this._rockerAxis.x, this._rockerAxis.y) / 3.14 * 180) + 180;
        // let spd = Math.min(1, Math.max(0.7, this._rockerAxis.distance(0, 0))) * 3;
        // this.characterCtr.TurnAndMove(angle, 0);
        // this.characterCtr.MoveForward(spd);
        // }
        // else {
        // this._subState = PterSubState.Idle;
        // }
        else {
            let time = Laya.timer.delta / 1000 * 10;
            if (this.RockerAxis != null && this.RockerAxis.y != 0) {
                this._speedTimer += this.RockerAxis.y * time * 2;
            }
            else {
                if (this._speedTimer > 0) {
                    this._speedTimer -= time;
                    if (this._speedTimer < 0) {
                        this._speedTimer = 0;
                    }
                }
                else if (this._speedTimer < 0) {
                    this._speedTimer += time;
                    if (this._speedTimer > 0) {
                        this._speedTimer = 0;
                    }
                }
            }
            this._cameraTimer += time * Math.abs(this._speedTimer / 3);
            if (this._cameraTimer > 1) {
                this.SetCameraPos();
                this._cameraTimer = 0;
            }
            this._speedTimer = Math.max(-10, Math.min(10, this._speedTimer))
            if (this.RockerAxis != null && this.RockerAxis.x != 0) {
                this.Model.transform.localRotationEulerY += this.RockerAxis.x;
            }
            if (this.CurrentAni != "Flying_") {
                this.CurrentAni = "Flying_";
                this.Animator.crossFade("Flying_", 0.1);
                this.Animator.speed = 1;
            }
            // else {
            //     this.Animator.speed = this._speedTimer;
            // }
            this.MoveForward(this._speedTimer * 3);
        }
    }

    /*
        向前移动 
     */
    MoveForward(spd: number) {
        if (this._rigidBody3D.isKinematic == true) {
            this._rigidBody3D.isKinematic = false;
        }
        let curAngle = this.Model.transform.localRotationEulerY * 3.14 / 180;
        let forward = new Laya.Vector3();
        this.Model.transform.getForward(forward);
        Laya.Vector3.normalize(forward, forward);
        Laya.Vector3.scale(forward, Laya.timer.delta / 1000 * -spd * 20, forward);
        // Laya.Vector3.add(this.Model.transform.position, forward, forward);
        // this.Model.transform.position = forward;
        console.log(this.Sprite3D.transform.localPositionY);
        forward.y = 0.15;
        if (this.UpInput) {
            forward.y = 6;
        }
        else if (this.DownInput) {
            forward.y = -6;
        }
        this._rigidBody3D.linearVelocity = forward;
    }

    MoveUpDown() {

    }

    public SetCameraPos() {
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, {
            CameraOffset: new Laya.Vector3(0, 5, 5), CameraViewForward: 3,
            CameraRotate: new Laya.Point(-45, -90)
        });
    }

    /**
     * 
     * 
     * 
     * @memberOf CharacterCtr
     */
    Idle() {
        if (this.TransformInput) {
            this._subState = PterSubState.Transform;
        }
        else if (this.FireBallInput) {
            this._subState = PterSubState.FireBall;
        }
        else if (this.RockerAxis != null || this.UpInput || this.DownInput) {
            this._subState = PterSubState.Move;
        }
        else {
            if (this.CurrentAni != "Soaring") {
                this.CurrentAni = "Soaring";
                this.Animator.speed = 1;
                this.Animator.crossFade("Soaring", 0.1);
                this.StopMove();
            }
        }
    }

    /**
     * 
     * 
     * 
     * @memberOf CharacterCtr
     */
    PterTrasform2TRex() {
        console.log("---------------------------------变身22222222222222！！！！！！！！")

        if (this.CurrentAni != "Idle") {
            this.CurrentAni = "Idle";
            this.Animator.speed = 1;
            this.Animator.play("Idle");
            SoundMgr_csjc.instance_csjc.playSound_csjc("Roar2");
            this.StopMove();
        }
        else if (this.CurrentAni == "Idle" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            this.characterCtr.PerformTransition(Transition.Pter2TRex);
            SoundMgr_csjc.instance_csjc.playSound_csjc("Roar1");
        }
        // if (this.characterCtr.FollowObj.transform.localPositionY < 1.5) {
        //     this.characterCtr.FollowObj.transform.localPositionY += 0.01;
        // }
    }

    StopMove() {
        if (this._rigidBody3D.isKinematic == false) {
            this._rigidBody3D.isKinematic = true;
            this._rigidBody3D.linearVelocity = new Laya.Vector3();
        }
    }

    FireBallMethod() {
        // this.StopMove();
        // if (this.CurrentAni != "Fight Idle") {
        //     this.CurrentAni = "Fight Idle";
        //     this.Animator.speed = 1;
        //     this.Animator.play("Fight Idle");
        //     let bullet = SceneMgr_cscj.Instance.Bullets[0];
        //     if (SceneMgr_cscj.Instance.CurrLockEnemy != null) {
        //         SoundMgr_csjc.instance_csjc.playSound_csjc("FireStart");
        //         bullet.SetFirePos(SceneMgr_cscj.Instance.CurrLockEnemy.transform.position, this._firePos.transform.position, this.Model);
        //         Laya.timer.once(500, this, () => {
        //             SceneMgr_cscj.Instance.CameraCtr.InitCamera(bullet.Sprite3D);
        //             EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, {
        //                 CameraOffset: new Laya.Vector3(0, 10, 10), CameraViewForward: 0,
        //                 CameraRotate: new Laya.Point(-90, -45)
        //             });
        //         })
        //     }
        // }
        // else if (this.CurrentAni == "Fight Idle" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
        //     this._subState = PterSubState.Idle;
        // }
    }
}