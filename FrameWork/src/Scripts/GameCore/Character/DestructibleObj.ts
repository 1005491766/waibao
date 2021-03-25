import { CollisionGroup } from "../Enums";
import SceneMgr_cscj from "../SceneMgr";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";

export default class DestructibleObj extends Laya.Script3D {
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D }
    get isBreak(){return this._isbreak}
    private _physicsComponent: Laya.PhysicsComponent;
    protected _isbreak :boolean= false
    protected _timer = -1;

    onAwake() {
        this._physicsComponent = this.owner.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        if (this._physicsComponent != null) {
            this._physicsComponent.collisionGroup = CollisionGroup.Obstacle;
            this._physicsComponent.canCollideWith = CollisionGroup.None | CollisionGroup.Character;
        }
    }
    onUpdate() {
        if (this._timer > 50) {
            if (this.Sprite3D.active) {
                this.Sprite3D.active = false;
            }
        }
        else if (this._timer >= 0) {
            this._timer += Laya.timer.delta;
        }
    }
    onTriggerEnter(res?) {
        SoundMgr_csjc.instance_csjc.playSound_csjc("Broken");
        console.log("-----------------物体名字查看",this.owner.name)
        let replace = SceneMgr_cscj.Instance.ReplaceObj.getChildByName(this.owner.name + "Replace") as Laya.Sprite3D;
        let ani = replace.getComponent(Laya.Animator) as Laya.Animator;
        ani.play(null, 0, 0);
        replace.transform.worldMatrix = this.Sprite3D.transform.worldMatrix;
        if (this._timer < 0) {
            this._timer = 0;
        }
        this._isbreak = true
        // this._physicsComponent.enabled = false;
    }
}