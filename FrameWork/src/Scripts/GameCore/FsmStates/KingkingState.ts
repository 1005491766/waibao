import BaseState from "./BaseState";
import { Transition, StateID } from "../Fsm/FsmEnum";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";
import SceneMgr_cscj from "../SceneMgr";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import { CollisionGroup } from "../Enums";
import MyAnimatorEvent from "../Character/MyAnimatorEvent";
enum KingkongSubState {
    Idle,
    Move,
    Trans2Pter,
    Attack,
    SpitFire,
    Jumping,
    Falling,
    Eating,
    Climb,
    ClimbEnd,
    ThrowStone,
    Hited,
}
export default class KingkingState extends BaseState {
    constructor() {
        super();
        this.AddTransition(Transition.Kingkong2Trex, StateID.KingKong);
    }
    get Hp(): number {return  this._hp}
    private _subState: KingkongSubState = KingkongSubState.Idle;
    private _attackTimer: number = 0;
    protected stateID = StateID.KingKong;
    private _rigidBody3D: Laya.Rigidbody3D;
    private _onGround: boolean = true;
    private _isClimb:boolean = false
    private _climbMask:boolean = false
    private _faceWall: boolean;

    // private _attack1: Laya.PhysicsComponent;
    // private _attack2: Laya.PhysicsComponent;
    onAwake() {
        console.log("-----------------------开始爬楼")
        this._animator = this.Model.getComponent(Laya.Animator) as Laya.Animator;
        // this._animator.avatar. = false
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        this._rigidBody3D.angularFactor = new Laya.Vector3(0, 0, 0);
        this._rigidBody3D.isKinematic = false
        this._rigidBody3D.collisionGroup = CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = CollisionGroup.All ^ CollisionGroup.Character;
        let ani = this.Model.addComponent(MyAnimatorEvent) as MyAnimatorEvent;
        this._isClimb = false

        ani.SetCharacter(this);
        this.SetAttack();
    }

    SetAttack() {
        // this._attack1 = this.Model.getChildByName("Attack1").getComponent(Laya.PhysicsComponent);
        // this._attack1.collisionGroup = CollisionGroup.Character
        // this._attack1.canCollideWith = CollisionGroup.All | CollisionGroup.Obstacle ^ CollisionGroup.Character;
        // this._attack2 = this.Model.getChildByName("Attack2").getComponent(Laya.PhysicsComponent);
        // this._attack2.collisionGroup = CollisionGroup.Character
        // this._attack2.canCollideWith = CollisionGroup.All | CollisionGroup.Obstacle ^ CollisionGroup.Character;

        // this.Animator.play("Climbing Up Wall");
    }

    public DoBeforeEntering(any?: any) {
        this.characterCtr.SetFollowObj(this.Sprite3D);
        this.Animator.play("Idle");
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.TransformEvent, [false]);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AttackInput,this,this.Hited);
        //测试为30
        this._hpSum = 30
        this._hp = this._hpSum
    }

    public Hited(data){
        if(data.name==this.owner.name)
        return
        if (this.CurrentAni != "Hit Left") {
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0,0,0);
            this._subState = KingkongSubState.Hited;
        }
    }

    public DoBeforeLeaving(any?: any) {
        this._subState = KingkongSubState.Idle;
        this.characterCtr.StopSound();
    }
    public Reason(any?: any) {
        // console.log("-----------------------输入数据",any)
        super.Reason(any)
    }

    /**
     * 反应
     * 
     * @param {*} [any] 
     * 
     * @memberOf RobotState
     */
    public Act(any?: any) {
        // console.log("------------------------输出",any)
        if(this.CurrentAni == "Jump"&&this.Animator.getCurrentAnimatorPlayState(0).normalizedTime <= 0.5)
        return

        this._onGround = this.OnGroundCheck();

        if(this._subState != KingkongSubState.ClimbEnd&&this._climbMask == false)
        {
            this.OnWallCheck()
            if(this._isClimb)
            {
                this.ClimbMethod();
                return
            }
        }
        // this.OnWallCheck();

        this._onGround = this.OnGroundCheck();
        super.Act(any);
        {
            switch (this._subState) {
                case KingkongSubState.Idle:
                    this.IdleMethod();
                    break;
                case KingkongSubState.Move:
                    this.MoveMethod();
                    break;
                case KingkongSubState.Attack:
                    this.AttackMethod();
                    break;
                case KingkongSubState.Jumping:
                    this.JumpMethod();
                    break;
                case KingkongSubState.Falling:
                    this.Falling();
                    break;
                case KingkongSubState.Eating:
                    this.EatingMethod();
                    break;
                case KingkongSubState.Climb:
                    this.ClimbMethod();
                case KingkongSubState.ClimbEnd:
                    this.ClimbOverMethod();
                    break;
                case KingkongSubState.ThrowStone:
                    this.ThrowStoneMethod();
                    break;
                case KingkongSubState.Hited:
                    this.HitedMethod();
                    break;
            }
        }
    }

    private AttackMethod() {
        // console.log("-------------------攻击",this.owner.name)

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
        if (this.CurrentAni == "Attack" && this._attackTimer > 600) {
            this.TurnAndMove(angle, spd * 5);
        }
        else if (this.CurrentAni == "Attack Box" && this._attackTimer < 800 && this._attackTimer > 700) {
            this.TurnAndMove(angle, spd * 5);
        }
        if (this._attackTimer <= 200 && this.AttackInput) {
            if (this.CurrentAni == "Attack") {
                this._attackTimer = 1400;
                this.Animator.play("Attack Box");
                this.CurrentAni = "Attack Box";
                SoundMgr_csjc.instance_csjc.playSound_csjc("Attack Jaw");

            }
            else {
                this._attackTimer = 1000;
                this.Animator.play("Attack");
                this.CurrentAni = "Attack";
                SoundMgr_csjc.instance_csjc.playSound_csjc("Attack Jaw");
            }
        }
        else if (this._attackTimer <= 0) {
            this._subState = KingkongSubState.Idle;
        }
    }

    private JumpMethod() {
        // if(this._attackTimer<)
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Jump") {
            this.CurrentAni = "Jump";
            this.Animator.speed = 1;
            this.Animator.play("Jump", 0, 0);
            SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
        }
        else if (this.CurrentAni == "Jump") {
            if (this.Animator.getCurrentAnimatorPlayState(0).normalizedTime > 0.5) {
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 20, 0);
                this._subState = KingkongSubState.Falling;

            }

        }
    }

    Falling() {
        console.log("*-----------------------向下落")

        if (this._onGround) {
            this._subState = KingkongSubState.Idle;
            SoundMgr_csjc.instance_csjc.playSound_csjc("Land");
        }/* 
        else if (this.FaceWall) {
            this._subState = TRexSubState.Climbing;
        } */
        if (this.CurrentAni != "Idle" && this._rigidBody3D.linearVelocity.y < 0) {
            this.CurrentAni = "Idle";
            this.Animator.speed = 1;
            this.Animator.crossFade("Idle", 0.5);
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
            this._subState = KingkongSubState.Falling;
        }
        else if (this.FireInput) {
            this._subState = KingkongSubState.SpitFire;
        }
        else if (this.TransformInput) {
            this._subState = KingkongSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = KingkongSubState.Attack;
        }
        else if (this.RockerAxis != null) {
            this._subState = KingkongSubState.Move;
        }
        else if (this.JumpInput) {
            this._subState = KingkongSubState.Jumping;
        }
        else if (this.ThrowStoneInput) {
            console.log("----------------丢石头方法状态")

            this._subState = KingkongSubState.ThrowStone;
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
        if (this.TransformInput) {
            this._subState = KingkongSubState.Trans2Pter;
        }
        else if (this.AttackInput) {
            this._subState = KingkongSubState.Attack;
        }
        else if (this.JumpInput) {
            this._subState = KingkongSubState.Jumping;
        }
        else if (this.ThrowStoneInput) {
            this._subState = KingkongSubState.ThrowStone;
        }
        
        else if (this.RockerAxis != null) {
            let angle = (Math.atan2(this.RockerAxis.x, this.RockerAxis.y) / 3.14 * 180) + 180;
            // let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));
            let spd = Math.min(1, Math.max(0.2, this.RockerAxis.distance(0, 0)));

            {
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
            this._subState = KingkongSubState.Idle;
        }
    }



    StopMove() {
        this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO.clone();
    }

    /*
        机器角色转向移动 
    */
   TurnAndMove(angle: number, spd: number) {
       if(this._onGround==false)
       {
        this._subState = KingkongSubState.Falling;
       }
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

    protected getForward()
    {
        this.Model.transform.getForward(this.forwardV3)
        return this.forwardV3
    }

    protected tempV3:Laya.Vector3 = new Laya.Vector3()
    /**
     * 设置中心变量v3
     * @param x 
     * @param y 
     * @param z 
     */
    setTempV3(x:number=0,y:number=0,z:number=0)
    {
        this.tempV3.x = x;
        this.tempV3.y = y;
        this.tempV3.z = z;
        return this.tempV3
    }

    OnWallCheck() {
        let tempY = this.CurrentAni == "Climbing Up Wall"?15:5
        this.LineRayCast(this.setTempV3(this.Sprite3D.transform.position.x,this.Sprite3D.transform.position.y+tempY,this.Sprite3D.transform.position.z)
        ,this.getForward(),-3,true)
        let checkres = false
        for (let i = 0; i < this.hitResults.length; i++)
        {
            let collider = this.hitResults[i].collider
            // console.log("---------------查看前方",collider)
            if(collider.owner.parent.name=="Buildings")
            {
                this._subState = KingkongSubState.Climb;
                this._isClimb = true
                checkres = true
            }
        }
        if (this.CurrentAni == "Climbing Up Wall"&&checkres ==false)
        {
            this._subState = KingkongSubState.ClimbEnd;
            this._isClimb = false
        }

    }
    TextLine

    protected LineRayCast(m_origin: Laya.Vector3, driect: Laya.Vector3, distance: number,isTest=false)//: Array<Laya.HitResult>  {
    {
        if(isTest==true)
        {
            if(this.TextLine)
            {
                this.TextLine.destroy();
            }
            var lineDir = new Laya.Vector3(driect.x*distance,driect.y*distance,driect.z*distance)
            var lineSprite:Laya.PixelLineSprite3D = SceneMgr_cscj.Instance.CurrentScene.addChild(new Laya.PixelLineSprite3D(1)) as Laya.PixelLineSprite3D;
            lineSprite.addLine(m_origin, new Laya.Vector3(m_origin.x+lineDir.x,m_origin.y+lineDir.y,m_origin.z+lineDir.z), Laya.Color.RED, Laya.Color.RED);
            this.TextLine = lineSprite
        }
        this.ray.origin = m_origin//= new Laya.Ray(origin, driect);
        this.ray.direction = driect
        SceneMgr_cscj.Instance.CurrentScene.physicsSimulation.rayCastAll(this.ray, this.hitResults, distance);
    }

    onCollisionEnter(collision: Laya.Collision) {
        let enemy = collision.other.owner as Laya.Sprite3D;
        if (enemy.name.search("Enemy") > -1) {
            this._subState = KingkongSubState.Eating;
            SoundMgr_csjc.instance_csjc.playSound_csjc("Eating");
        }
        // console.log("----------------我是恐龙攻击我",enemy.name)

    }

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
            this._subState = KingkongSubState.Idle;
        }
    }

    /**受击 */
    HitedMethod(){
            if (this.CurrentAni != "Hit Left") {
                this.CurrentAni = "Hit Left";
                this.Animator.speed = 1;
                this.Animator.play("Hit Left");
                this._hp-=1;
            }
            else if ((this.CurrentAni == "Hit Left" )&& this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
                this._subState = KingkongSubState.Idle;
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);
            }
    }
    /**丢石头 */
    ThrowStoneMethod(){
        if (this.CurrentAni != "ThrowStone") {
            this.CurrentAni = "ThrowStone";
            this.Animator.speed = 1;
            this.Animator.play("ThrowStone");
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration*600,this,()=>{
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 5, 0);
                Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration*200,this,()=>{
                })
            })
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration*1000,this,()=>{
                Laya.timer.once(300,this,()=>{

                })
            })
        }
        else if (this.CurrentAni == "ThrowStone" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
            this._subState = KingkongSubState.Idle;
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);

        }
    }

    /**
     * 攀爬结束
     */
    ClimbOverMethod() {
        // this.characterCtr.StopSound();
        if (this.CurrentAni != "ClimbingOver") {
            this.CurrentAni = "ClimbingOver";
            this.Animator.speed = 1;
            console.log("---------------开始攀爬")
            this.Animator.play("ClimbingOver");
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration*600,this,()=>{
                this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 5, 0);
                Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration*200,this,()=>{
                    let localy = this.Sprite3D.transform.localPositionY+10
                    Laya.Tween.to(this.Sprite3D.transform,{localPositionY:localy},300)
                    // this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 20, 0);
                })
            })
            Laya.timer.once(this.Animator.getCurrentAnimatorPlayState(0).duration*1000,this,()=>{
                this.MoveForward(1.5);
                Laya.timer.once(300,this,()=>{
                    this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);

                })
            })
        }
        else if (this.CurrentAni == "ClimbingOver" && this.Animator.getCurrentAnimatorPlayState(0).normalizedTime >= 1) {
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.CharacterNormal);
            this._subState = KingkongSubState.Idle;
            // this._rigidBody3D.isKinematic = true
            this._rigidBody3D.gravity = this.setTempV3(0,-10,0)
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0, 0, 0);

        }
    }

    ClimbMask()
    {
        this._climbMask = false
    }

    /**
     * 攀爬函数
     */
    ClimbMethod() {
        if (this._onGround) {
            this._subState = KingkongSubState.Falling;
        }
        else if (this.JumpInput) {
            console.log("---------------------输入条约")
            this._isClimb = false
            this._climbMask = true
            Laya.timer.clear(this,this.ClimbMask)
            Laya.timer.frameOnce(120,this,this.ClimbMask)
            this._rigidBody3D.gravity = this.setTempV3(0,-10,0)
            this._subState = KingkongSubState.Jumping;

            return
        }
        this.characterCtr.StopSound();
        if (this.CurrentAni != "Climbing Up Wall") {
            this.CurrentAni = "Climbing Up Wall";
            this.Animator.speed = 1;
            this.Animator.play("Climbing Up Wall");
        }
        this._rigidBody3D.gravity = this.setTempV3(0,0,0)

        if (this.RockerAxis != null) {
            let isup = this.RockerAxis.y>=0?1:-1

            let spd = Math.min(1, Math.max(0.7, this.RockerAxis.distance(0, 0)));

            this.Animator.speed = this.RockerAxis==null?0: isup*spd*-1;

            // let curAngle = this.Model.transform.localRotationEulerY * 3.14 / 180;
            // console.log("----------------------爬上爬下",this.RockerAxis.y,spd)
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0,isup*spd*-3,0);
        }
        else
        {
            this._rigidBody3D.linearVelocity = new Laya.Vector3(0,0,0);
            this.Animator.speed = 0
        }
    }

    onDestroy() {
        this.characterCtr.StopSound();
    }
}