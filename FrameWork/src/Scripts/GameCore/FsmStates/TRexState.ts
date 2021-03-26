import BaseState from "./BaseState";
import { Transition, StateID } from "../Fsm/FsmEnum";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";
import SceneMgr_cscj from "../SceneMgr";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import { CollisionGroup } from "../Enums";
import MyAnimatorEvent from "../Character/MyAnimatorEvent";
enum TRexSubState {
    Idle,
    Move,
    Trans2Pter,
    Attack,
    SpitFire,
    Jumping,
    Falling,
    Eating,
    Hited

}
export default class TRexState extends BaseState {
    constructor() {
        super();
        this.AddTransition(Transition.Trex2Kingkong, StateID.TRex);
    }

    private _fire: Laya.Sprite3D;
    private _fireCol: Laya.PhysicsComponent;
    private _subState: TRexSubState = TRexSubState.Idle;
    private _attackTimer: number = 0;
    protected stateID = StateID.TRex;
    private _rigidBody3D: Laya.Rigidbody3D;
    private _onGround: boolean = true;
    private _attack1: Laya.PhysicsComponent;
    private _attack2: Laya.PhysicsComponent;
    onAwake() {
        this._animator = this.Model.getComponent(Laya.Animator) as Laya.Animator;
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        this._rigidBody3D.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigidBody3D.collisionGroup = CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = CollisionGroup.All ^ CollisionGroup.Character;
        this._rigidBody3D.isKinematic =false
        // if (this._rigidBody3D.colliderShape != null) {
        //     this._rigidBody3D.colliderShape.destroy();
        // }
        // let shape = new Laya.CapsuleColliderShape(3, 8, 0);
        // shape.localOffset = new Laya.Vector3(0, 3, 0);
        // this._rigidBody3D.colliderShape = shape;
        this._fire = this.Model.getChildByName("Flamestrike") as Laya.Sprite3D;
        this._fireCol = this._fire.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        this._fireCol.collisionGroup = CollisionGroup.Character;
        this._fireCol.canCollideWith = CollisionGroup.None | CollisionGroup.Obstacle;
        this._fire.active = false;
        this._fireCol.enabled = false;
        let ani = this.Model.addComponent(MyAnimatorEvent) as MyAnimatorEvent;
        ani.SetCharacter(this);
        this.SetAttack();
        
    }

    SetAttack() {
        this._attack1 = this.Model.getChildByName("Attack1_TRex").getComponent(Laya.PhysicsComponent);
        this._attack1.collisionGroup = CollisionGroup.Character
        this._attack1.canCollideWith = CollisionGroup.All | CollisionGroup.Obstacle ^ CollisionGroup.Character;
        this._attack2 = this.Model.getChildByName("Attack2_TRex").getComponent(Laya.PhysicsComponent);
        this._attack2.collisionGroup = CollisionGroup.Character
        this._attack2.canCollideWith = CollisionGroup.All | CollisionGroup.Obstacle ^ CollisionGroup.Character;

        Laya.timer.frameOnce(30,this,()=>{
            this.characterCtr.PerformTransition(Transition.Trex2Kingkong);
            console.log("----------------转换形态")
        })
    }

    public DoBeforeEntering(any?: any) {
        this.characterCtr.SetFollowObj(this.Sprite3D);
        this.Animator.play("End Sleeping");
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.TransformEvent, [false]);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AttackInput,this,this.Hited);
        //初步测试用30
        this._hpSum = 30
        this._hp = this._hpSum

        // EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, { CameraOffset: new Laya.Vector3(0, 20, 10), CameraViewForward: 0 });
    }

    /**受击 */
    public Hited(data){
        if(data.name==this.owner.name)
        return
        if (this.CurrentAni != "End Sleeping") {
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0,0,0);
            this._subState = TRexSubState.Hited;
        }
    }
    public DoBeforeLeaving(any?: any) {
        this._subState = TRexSubState.Idle;
        this.characterCtr.StopSound();
    }

    /**
     * 反应
     * 
     * @param {*} [any] 
     * 
     * @memberOf RobotState
     */
    public Act(any?: any) {
        this._onGround = this.OnGroundCheck();
        super.Act(any);
        // if (this._climbOver >= 0) {
        //     if (this._subState == TRexSubState.Move ||
        //         this._subState == TRexSubState.Idle ||
        //     ) {
        //         this._climbOver -= Laya.timer.delta;;
        //     }
        // }
        /* if (!this.IsTransforming)  */{
            switch (this._subState) {
                case TRexSubState.Idle:
                    this.IdleMethod();
                    break;
                case TRexSubState.Move:
                    this.MoveMethod();
                    break;
                case TRexSubState.Attack:
                    this.AttackMethod();
                    break;
                case TRexSubState.Trans2Pter:
                    this.Trasform2PterMethod();
                    break;
                case TRexSubState.Jumping:
                    this.JumpMethod();
                    break;
                case TRexSubState.Falling:
                    this.Falling();
                    break;
                case TRexSubState.SpitFire:
                    this.SpitFireMethod();
                    break;
                case TRexSubState.Eating:
                    this.EatingMethod();
                case TRexSubState.Hited:
                    this.HitedMethod();
                    break;
            }
        }
    }

    private AttackMethod() {
        this.StopMove();
        this.characterCtr.StopSound();
        this._attackTimer -= Laya.timer.delta;
        let angle = 0;
        let spd = 1;
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.AttackInput, { name:this.owner.name })
        if (this.RockerAxis != null) {
            angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
        }
        if (this.CurrentAni == "Attack Jaw" && this._attackTimer > 600) {
            this.TurnAndMove(angle, spd * 5);
            this.EnableAttack();
        }
        else if (this.CurrentAni == "Attack Tail" && this._attackTimer < 800 && this._attackTimer > 700) {
            this.TurnAndMove(angle, spd * 5);
            this.EnableAttack();
        }
        if (this._attackTimer <= 200 && this.AttackInput) {
            if (this.CurrentAni == "Attack Jaw") {
                this._attackTimer = 1400;
                this.Animator.play("Attack Tail");
                this.CurrentAni = "Attack Tail";
            }
            else {
                this._attackTimer = 1000;
                this.Animator.play("Attack Jaw");
                this.CurrentAni = "Attack Jaw";
                SoundMgr_csjc.instance_csjc.playSound_csjc("Attack Jaw");
            }
        }
        else if (this._attackTimer <= 0) {
            this._subState = TRexSubState.Idle;
            this.DisableAttack();
        }
    }

    private JumpMethod() {
        // if(this._attackTimer<)
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Jumping") {
            this.CurrentAni = "Jumping";
            this.Animator.speed = 1;
            this.Animator.play("Jumping", 0, 0);
            SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
        }
        else if (this.CurrentAni == "Jumping") {
            if (this.Animator.getCurrentAnimatorPlayState(0).normalizedTime > 0.0
            ) {
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 20, 0);
                this._subState = TRexSubState.Falling;
            }
        }
    }

    Falling() {
        if (this._onGround) {
            console.log("*-----------------------落下碰到地面")

            this._subState = TRexSubState.Idle;
            SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
        }/* 
        else if (this.FaceWall) {
            this._subState = TRexSubState.Climbing;
        } */
        if (this.CurrentAni != "Looking Up" && this._rigidBody3D.linearVelocity.y < 0) {
            this.CurrentAni = "Looking Up";
            this.Animator.speed = 1;
            this.Animator.crossFade("Looking Up", 0.5);
        }
        if (this.RockerAxis != null) {
            let angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            this.TurnAndMove(angle, spd * 2);
        }
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterFalling);
    }

    /**
     * 暂停
     * 
     * 
     * @memberOf CharacterCtr
     */
    IdleMethod() {
        if (!this._onGround) {
            this._subState = TRexSubState.Falling;
        }
        else if (this.FireInput) {
            this._subState = TRexSubState.SpitFire;
        }
        else if (this.TransformInput) {
            this._subState = TRexSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = TRexSubState.Attack;
        }
        else if (this.RockerAxis != null) {
            this._subState = TRexSubState.Move;
        }
        else if (this.JumpInput) {
            this._subState = TRexSubState.Jumping;
        }
        else {
            if (this.CurrentAni != "Idle") {
                if (this.CurrentAni != "Idle") {
                    this.CurrentAni = "Idle";
                    this.Animator.speed = 1;
                    this.Animator.crossFade("Idle", 0.1);
                    this.StopMove();
                }
            }
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
        }
    }

    MoveMethod() {
        /* if (!this.OnGround) {
            this._subState = TRexSubState.Falling;
        }
        else if (this.FaceWall) {
            this._subState = TRexSubState.Climbing;
        }
        else  */if (this.TransformInput) {
            this._subState = TRexSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = TRexSubState.Attack;
        }
        else if (this.JumpInput) {
            this._subState = TRexSubState.Jumping;
        }
        else if (this.RockerAxis != null) {
            let angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            // let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            let spd = Math.min(1, Math.max(0.2, this.RockerAxis.distance(0, 0)));
            /* if (spd < 0.5) {
                if (this.CurrentAni != "Walk") {
                    this.Animator.crossFade("Walk", 0.1);
                    this.CurrentAni = "Walk";
                }
                else {
                    this.Animator.speed = spd;
                }
            }
            else */ {
                if (this.CurrentAni != "Walk") {
                    this.Animator.play("Walk");
                    this.CurrentAni = "Walk";
                }
                else {
                    this.Animator.speed = spd;
                }
            }
            this.TurnAndMove(angle, spd * 3);
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
        }
        else {
            this._subState = TRexSubState.Idle;
        }
    }

    Trasform2PterMethod() {
        console.log("---------------------------------变身！！！！！！！！")
        if (this.CurrentAni != "Start Sliping") {
            this.CurrentAni = "Start Sliping";
            this.Animator.speed = 1;
            this.Animator.play("Start Sliping", 0, 0);
            SoundMgr_csjc.instance_csjc.playSound_csjc("Roar1");
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterFalling);
        }
        else if (this.CurrentAni == "Start Sliping" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            SoundMgr_csjc.instance_csjc.playSound_csjc("Roar2");
            this.characterCtr.PerformTransition(Transition.TRex2Pter);


        }
        this.StopMove();
    }


    StopMove() {
        this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO.clone();
    }

    /*
        机器角色转向移动 
    */
    TurnAndMove(angle: number, spd: number) {
        this.TurnByCamera(angle);
        this.MoveForward(spd);
        // if (this.TurnByCamera(angle)) {
        //     this.MoveForward(spd);
        // }
    }


    Turn(angle: number) {
        let curAngle = this.Model.transform.localRotationEulerY;
        if (Math.abs(curAngle - angle) < 3) return;
        if (curAngle > angle) {
            if (curAngle - angle > 180) {
                curAngle += 3;
            }
            else {
                curAngle -= 3;
            }
        }
        else if (angle > curAngle) {
            if (angle - curAngle > 180) {
                curAngle -= 3;
            }
            else {
                curAngle += 3;
            }
        }
        curAngle = curAngle % 360;
        if (curAngle < 0) {
            curAngle += 360;
        }
        this.Model.transform.localRotationEulerY = curAngle
    }

    /*
        机器角色转向 
    */
    TurnByCamera(angle: number) {
        let dir = new Laya.Vector3();
        Laya.Vector3.subtract(SceneMgr_cscj.Instance.Camera.transform.position, this.Model.transform.position, dir);
        dir.y = 0;
        let angle2 = (Math.atan2(dir.x, dir.z) / Math.PI * 180) + 180;
        angle = (angle + angle2) % 360;
        let curAngle = this.Model.transform.localRotationEulerY;
        if (Math.abs(curAngle - angle) < 3) return;
        if (curAngle > angle) {
            if (curAngle - angle > 180) {
                curAngle += 3;
            }
            else {
                curAngle -= 3;
            }
        }
        else if (angle > curAngle) {
            if (angle - curAngle > 180) {
                curAngle -= 3;
            }
            else {
                curAngle += 3;
            }
        }
        curAngle = curAngle % 360;
        if (curAngle < 0) {
            curAngle += 360;
        }
        this.Model.transform.localRotationEulerY = curAngle;
    }

    /*
        向前移动 
     */
    MoveForward(spd: number) {
        let curAngle = this.Model.transform.localRotationEulerY * 3.14 / 180;
        this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(curAngle) * 3 * spd, this._rigidBody3D.linearVelocity.y, Math.cos(curAngle) * 3 * spd);
    }

    EnableAttack() {
        if (!this._attack1.enabled) {
            this._attack1.enabled = true;
        }
        if (!this._attack2.enabled) {
            this._attack2.enabled = true;
        }
    }

    DisableAttack() {
        if (this._attack1.enabled) {
            this._attack1.enabled = false;
        }
        if (this._attack2.enabled) {
            this._attack2.enabled = false;
        }
    }

    OnGroundCheck(): boolean {
        let up = new Laya.Vector3(0, 5, 0);
        let down = new Laya.Vector3(0, -0.1, 0);
        Laya.Vector3.add(this.Sprite3D.transform.position, down, down);
        Laya.Vector3.add(this.Sprite3D.transform.position, up, up);
        let hitResults: Laya.HitResult = new Laya.HitResult();
        let collisionGroup = CollisionGroup.Character;
        let canCollisionWith = CollisionGroup.None | CollisionGroup.Ground | CollisionGroup.Obstacle;
        let res = SceneMgr_cscj.Instance.CurrentScene.physicsSimulation.raycastFromTo(up, down, hitResults, collisionGroup, canCollisionWith);
        return res;
    }


    // FireRay() {
    //     let front = new Laya.Vector3();
    //     let cur = new Laya.Vector3(0, 0, 0);
    //     this.Model.transform.getForward(front);
    //     Laya.Vector3.normalize(front, front);
    //     Laya.Vector3.scale(front, -10, front);
    //     Laya.Vector3.add(this.Model.transform.position, front, front);
    //     let hitResults: Array<Laya.HitResult> = [];
    //     let collisionGroup = CollisionGroup.Character;
    //     let canCollisionWith = CollisionGroup.Obstacle | CollisionGroup.Ground;
    //     let colliderShape = new Laya.SphereColliderShape(5);
    //     let res = SceneMgr_cscj.Instance.CurrentScene.physicsSimulation.shapeCastAll(colliderShape, this.Model.transform.position, front,
    //         hitResults, Laya.Quaternion.NAN, Laya.Quaternion.NAN, collisionGroup, canCollisionWith, 1);
    //     if (res) {
    //         for (let index = 0; index < hitResults.length; index++) {
    //             const element = hitResults[index];
    //         }
    //     }
    //     return res;
    // }

    private _fireTimer: number = 0;
    SpitFireMethod() {
        if (this.FireInput) {
            this._fireTimer = 300;
            this.StopMove();
            this.characterCtr.FireSound(1);
            if (this.CurrentAni != "Roarning") {
                this.CurrentAni = "Roarning";
                this.Animator.speed = 1;
                this.Animator.play("Roarning", 0, 0);
                Laya.timer.once(200, this, () => {
                    this._fire.active = true;
                    this._fireCol.enabled = true;
                })
            }
            if (this.RockerAxis != null) {
                this.Model.transform.localRotationEulerY -= this.RockerAxis.x * 3;
                // this._fire.transform.localRotationEulerY = this.Model.transform.localRotationEulerY;
                if (this._fireCol.colliderShape != null) {
                    this._fireCol.colliderShape.destroy();
                }
                let shape = new Laya.BoxColliderShape(5, 6, 30);
                shape.localOffset = new Laya.Vector3(0, -2, 15);
                this._fireCol.colliderShape = shape;
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
            }
            // this.FireRay();
        }
        else {
            if (this._fireTimer > 0) {
                this._fireTimer -= Laya.timer.delta;
            }
            this.characterCtr.StopSound();
            if (this._fireTimer > 0) return;
            Laya.timer.once(1000, this, () => {
                this.characterCtr.StopSound();
            })
            this._fire.active = false;
            this._fireCol.enabled = false;
            if (this.TransformInput) {
                this._subState = TRexSubState.Trans2Pter;
            }
            else if (this.AttackInput) {
                this._subState = TRexSubState.Attack;
            }
            else if (this.JumpInput) {
                this._subState = TRexSubState.Jumping;
            }
            else {
                this._subState = TRexSubState.Idle;
            }
        }
    }

    onCollisionEnter(collision: Laya.Collision) {
        let enemy = collision.other.owner as Laya.Sprite3D;
        if (enemy.name.search("Enemy") > -1) {
            this._subState = TRexSubState.Eating;
            SoundMgr_csjc.instance_csjc.playSound_csjc("Eating");
        }

        // console.log("----------------我是恐龙攻击我",enemy.name)
        // if()
    }


    
    /**受击 */
    HitedMethod(){
        if (this.CurrentAni != "End Sleeping") {
            this.CurrentAni = "End Sleeping";
            this.Animator.speed = 3;
            this.Animator.play("End Sleeping");
            this._hp-=1;
            console.log("----------------扣血",this._hp)
        }
        else if ((this.CurrentAni == "End Sleeping" )&& this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
            this._subState = TRexSubState.Idle;
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);
        }
}

    /**进食 */
    EatingMethod() {
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Eating") {
            this.CurrentAni = "Eating";
            this.Animator.speed = 1;
            this.Animator.play("Eating", 0, 0);
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterFalling);
            this.StopMove();
        }
        else if (this.CurrentAni == "Eating" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
            this._subState = TRexSubState.Idle;
        }
    }

    onDestroy() {
        this.characterCtr.StopSound();
    }
}