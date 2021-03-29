import CharacterCtr from "./CharacterCtr";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";
import { InputType, PlayerType, CollisionGroup } from "../Enums";
import FSMSystem from "../Fsm/FSMSystem";
import TRexState from "../FsmStates/TRexState";
import KingkingState from "../FsmStates/KingkingState";
import SceneMgr_cscj from "../SceneMgr";
import BaseState from "../FsmStates/BaseState";

export default class BossRobot extends CharacterCtr {

    get Player(): Laya.Sprite3D { return SceneMgr_cscj.Instance.Player.FollowObj; }
    get AniSprite(): Laya.Sprite3D { return this._mowner.getChildAt(0)as Laya.Sprite3D }
    private _die: boolean = false;
    private _timer: number = 0;
    private _ani : Laya.Animator = null;
    private _rigidBody3D: Laya.Rigidbody3D;
    private _physicsComponent: Laya.PhysicsComponent;
    private _isAtk:boolean = false
    onEnable()
    {
        super.onEnable()
        this._mowner = this._playerKind != PlayerType.Kingkong?this._tRex:this._kingkong;
        this._ani = this._mowner.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
        this._rigidBody3D =this._mowner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;

        this._physicsComponent = this._mowner.getComponent(Laya.PhysicsComponent);
        // this._physicsComponent.collisionGroup = CollisionGroup.Obstacle;
        // this._physicsComponent.canCollideWith = CollisionGroup.None | CollisionGroup.Ground | CollisionGroup.Character;
        this._rigidBody3D.isKinematic = false
        
    }
    // onDisable()
    // {
    //     this._rigidBody3D.isKinematic = true

    // }
    Input(point: Laya.Point) {
    }
    MakeFsm() {
        this._fsm = new FSMSystem(this);

        if(SceneMgr_cscj.Instance.BossKind == PlayerType.Kingkong)
        {
            this._fsm.AddState(this._kingkong.addComponent(KingkingState));
            this._fsmboss = this._kingkong.getComponent(KingkingState)
            this._kingkong.getChildAt(0).getChildByName("Attack1_Kingkong").name = "Attack1kk"
            this._tRex.active=false;
            this._playerKind = PlayerType.Kingkong;
        }
        else{
            this._fsm.AddState(this._tRex.addComponent(TRexState));
            this._fsmboss = this._tRex.getComponent(TRexState)
            this._kingkong.active=false;
            this._playerKind = PlayerType.TRex;
        }
    }
    SetFollowObj(obj: Laya.Sprite3D) {
    }

    onUpdate()
    {
        // console.log("*---------------------------------攻击中罚站",this._isAtk)

        // console.log("*---------------------------------xxxxxxxxxx",this._isAtk)

        if(SceneMgr_cscj.Instance.BossVisible == false||SceneMgr_cscj.Instance.GameOver != 0)
        return
        super.onUpdate()

        // return
        if (this._die||SceneMgr_cscj.Instance.Player==null) return;
        let dis = Laya.Vector3.distance(this.Sprite3D.transform.position, this.Player.transform.position);
        let inPlane = Math.abs(this.Sprite3D.transform.position.y - this.Player.transform.position.y) <= 1;
        this.AniSprite.transform.localRotationEulerY=0    
        this.ChaseMethod();

        if(this._isAtk==true)
        return
        if (dis <= 10 && inPlane&&this._timer<=0) {
            this.Attack();
            this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO
            this._isAtk = true
            this._ani.speed =1.5;

            Laya.timer.once(3000,this,()=>{
                this._isAtk = false
            })
        }
        else if (dis < 80 && inPlane) {
            // if(dis<60)
            // {
            //     this._ani.play("Walk");
            //     this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(this._mowner.transform.position.y) * 3 , 
            //     this._rigidBody3D.linearVelocity.y, Math.cos(this._mowner.transform.position.y) * 3 );
            // }
            // else
            {
                let speed = 0.3 + (dis/80)*0.7
                this._ani.play("Walk");
                this._ani.speed = speed;
                this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(this.Sprite3D.transform.rotationEuler.y) * 8*speed ,
                 this._rigidBody3D.linearVelocity.y, Math.cos(this.Sprite3D.transform.rotationEuler.y) * 8*speed );
            }
        }
        else {
            this._ani.play("Idle");
            this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO
            // this.ChaseMethod();
        }
    }

    Attack() {
        this.AniSprite.transform.localRotationEulerY=0    
        this._timer = 4000;
        this.ChaseMethod();

        this.EnemyTrun();
        this._fsm.CurrentState.Reason({InputType:InputType.Attack});
    }

    ChaseMethod() {
        if (this._timer <= 0) {
            this.EnemyTrun();
            // this.EnemyMove();
        }
        else {
            this._timer -= Laya.timer.delta;
        }
    }


    EnemyTrun() {
        this.AniSprite.transform.localRotationEulerY=0    

        let dir = new Laya.Vector3();
        Laya.Vector3.subtract(this.Sprite3D.transform.position, this.Player.transform.position, dir);
        Laya.Vector3.add(this.Sprite3D.transform.position, dir, dir);
        this.Sprite3D.transform.lookAt(dir, Laya.Vector3._Up);
    }

}