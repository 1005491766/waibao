import SceneMgr_cscj from "../SceneMgr";
import { CollisionGroup } from "../Enums";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";

export default class Enemy extends Laya.Script3D {
    get EnemySprite3D(): Laya.Sprite3D { return this.Sprite3D; }
    get Alive(): boolean { return !this._die; }
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D }
    get Player(): Laya.Sprite3D { return SceneMgr_cscj.Instance.Player.FollowObj; }
    private _physicsComponent: Laya.PhysicsComponent;
    private _timer: number = 0;
    private _die: boolean = false;
    private _eff: Laya.Sprite3D;
    onAwake() {
        this._eff = this.owner.getChildAt(1) as Laya.Sprite3D;
        this._physicsComponent = this.owner.getComponent(Laya.PhysicsComponent);
        this._physicsComponent.collisionGroup = CollisionGroup.Obstacle;
        this._physicsComponent.canCollideWith = CollisionGroup.None | CollisionGroup.Ground | CollisionGroup.Character;
    }
    onUpdate() {
        if (this._die||SceneMgr_cscj.Instance.Player==null) return;
        let dis = Laya.Vector3.distance(this.Sprite3D.transform.position, this.Player.transform.position);
        let inPlane = Math.abs(this.Sprite3D.transform.position.y - this.Player.transform.position.y) <= 1;
        // if (dis <= 0.5 && inPlane) {
        //     // this._animator.play("Idle_Crazy_Robot");
        //     this.Attack();
        // }
        // else 
        if (dis < 7 && inPlane) {
            this.ChaseMethod();
        }
        else if (dis < 15 && inPlane) {
            if (this._eff.active) {
                this._eff.active = false;
            }
        }
        else {
        }
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

    // Attack() {
    //     this._timer = 1000;
    //     this.EnemyTrun();
    // }

    EnemyTrun() {
        let dir = new Laya.Vector3();
        Laya.Vector3.subtract(this.Sprite3D.transform.position, this.Player.transform.position, dir);
        Laya.Vector3.add(this.Sprite3D.transform.position, dir, dir);
        this.Sprite3D.transform.lookAt(dir, Laya.Vector3._Up);
    }

    // EnemyMove() {
    //     let dir = new Laya.Vector3();
    //     Laya.Vector3.subtract(this.Player.transform.position, this.Sprite3D.transform.position, dir);
    //     Laya.Vector3.normalize(dir, dir);
    //     Laya.Vector3.scale(dir, Laya.timer.delta / 1000 * 2, dir);
    //     Laya.Vector3.add(dir, this.Sprite3D.transform.position, dir);
    //     this.Sprite3D.transform.position = dir;
    // }

    onCollisionEnter(collision: Laya.Collision) {
        console.log("--------------吃物品xxxx",collision.other.owner.name)

        if (this._die) return;
        /* if (collision.other.owner.name.search("Attack") > -1 || collision.other.owner.name.search("-Car") > -1 || collision.other.owner.name.search("-Robot") > -1)  */{
            SoundMgr_csjc.instance_csjc.playSound_csjc("Broken");
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.EnemyDead);
            this._die = true;
            this._physicsComponent.enabled = false;
            this._eff.active = false;

            Laya.timer.frameOnce(20,this,()=>{
                this.owner.active =false
            })
        }
    }
}