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

    get Sprite3D(): Laya.Sprite3D { return this._mowner as Laya.Sprite3D }
    get kingkong():Laya.Sprite3D{ return this._kingkong as Laya.Sprite3D}
    get Player(): Laya.Sprite3D { return SceneMgr_cscj.Instance.Player.FollowObj; }
    get AniSprite(): Laya.Sprite3D { return this._mowner.getChildAt(0)as Laya.Sprite3D }

    private _die: boolean = false;
    private _timer: number = 0;
    private _mowner : Laya.Sprite3D = null;
    private _ani : Laya.Animator = null;
    private _fsmboss:BaseState
    private _rigidBody3D: Laya.Rigidbody3D;
    private _physicsComponent: Laya.PhysicsComponent;
    onEnable()
    {
        super.onEnable()
        this._mowner = this._playerKind != PlayerType.Kingkong?this._tRex:this._kingkong;
        this._ani = this._mowner.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
        this._rigidBody3D =this._mowner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;

        this._physicsComponent = this._mowner.getComponent(Laya.PhysicsComponent);
        // this._physicsComponent.collisionGroup = CollisionGroup.Obstacle;
        // this._physicsComponent.canCollideWith = CollisionGroup.None | CollisionGroup.Ground | CollisionGroup.Character;
        // this._rigidBody3D.isKinematic = false
        
    }
    Input(point: Laya.Point) {
    }
    MakeFsm() {
        this._fsm = new FSMSystem(this);

        if(SceneMgr_cscj.Instance.BossKind == PlayerType.Kingkong)
        {
            this._fsm.AddState(this._kingkong.addComponent(KingkingState));
            this._fsmboss = this._kingkong.getComponent(KingkingState)
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
        super.onUpdate()
        // return
        if (this._die||SceneMgr_cscj.Instance.Player==null) return;
        let dis = Laya.Vector3.distance(this.Sprite3D.transform.position, this.Player.transform.position);
        let inPlane = Math.abs(this.Sprite3D.transform.position.y - this.Player.transform.position.y) <= 1;
        // console.log("----------------是否打人",dis)
        this.AniSprite.transform.localRotationEulerY=0    

        if (dis <= 10 && inPlane&&this._timer<=0) {
            this.Attack();
            this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO
        }
        else if (dis < 20 && inPlane) {
            this.ChaseMethod();
            // this._ani.play("Idle");
            this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO
        }
        else if (dis < 80 && inPlane) {
            this.ChaseMethod();
            // if(dis<60)
            // {
            //     this._ani.play("Walk");
            //     this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(this._mowner.transform.position.y) * 3 , 
            //     this._rigidBody3D.linearVelocity.y, Math.cos(this._mowner.transform.position.y) * 3 );
            // }
            // else
            {
                // console.log("----------------c查看角度",this._mowner.transform.rotationEuler.y)
                this._ani.play("Walk");
                this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(this.Sprite3D.transform.rotationEuler.y) * 5 ,
                 this._rigidBody3D.linearVelocity.y, Math.cos(this.Sprite3D.transform.rotationEuler.y) * 5 );
            }
        }
        else {
            this._ani.play("Idle");
            this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO
            // this.ChaseMethod();
        }
    }

    Attack() {
        // console.log("----------------c查看角度",this._mowner.transform.rotationEuler.y)    
        this.AniSprite.transform.localRotationEulerY=0    
        this._timer = 2000;
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