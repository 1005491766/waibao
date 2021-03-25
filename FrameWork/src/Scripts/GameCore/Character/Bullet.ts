import { CollisionGroup } from "../Enums";
import SceneMgr_cscj from "../SceneMgr";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";

export default class Bullet extends Laya.Script3D {
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D }
    get CanUse(): boolean { return this._canUse; }

    private _targetPos: Laya.Vector3;
    private _effect: Laya.Sprite3D;
    private _rigidBody3D: Laya.Rigidbody3D;
    private _tail: Laya.TrailSprite3D;
    private _fireEff: Laya.Sprite3D;
    private _explore: Laya.Sprite3D;
    private _model: Laya.Sprite3D;

    private _active: boolean = false;
    private _canUse: boolean = false;
    private _activeTime: number = 0;
    private _pter: Laya.Sprite3D;
    onAwake() {
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        this._tail = this.owner.getChildByName("Tail") as Laya.TrailSprite3D;
        this._fireEff = this.owner.getChildByName("SmallFires") as Laya.Sprite3D;
        this._explore = this.owner.getChildByName("FireExplosion") as Laya.Sprite3D;
        this._model = this.owner.getChildByName("Meteor") as Laya.Sprite3D;
        this._rigidBody3D.collisionGroup = CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = CollisionGroup.None | CollisionGroup.Ground | CollisionGroup.Obstacle;
        this._fireEff.active = false;
        this._explore.active = false;
        this._tail.active = false;
    }

    SetFirePos(targetPos: Laya.Vector3, curPos: Laya.Vector3, pter: Laya.Sprite3D) {
        this._targetPos = targetPos;
        this._active = true;
        this._model.active = true;
        this.Sprite3D.transform.position = curPos;
        this._tail.active = true;
        this._fireEff.active = false;
        this._pter = pter;
        let forward = new Laya.Vector3();
        Laya.Vector3.subtract(this.Sprite3D.transform.position, targetPos, forward);
        Laya.Vector3.add(this.Sprite3D.transform.position, forward, forward);
        this.Sprite3D.transform.lookAt(forward, Laya.Vector3._Up);
    }

    onUpdate() {
        if (this._targetPos != null && this._active) {
            let dir = new Laya.Vector3();
            Laya.Vector3.subtract(this._targetPos, this.Sprite3D.transform.position, dir);
            Laya.Vector3.normalize(dir, dir);
            Laya.Vector3.scale(dir, Laya.timer.delta / 1000 * 30, dir);
            Laya.Vector3.add(dir, this.Sprite3D.transform.position, dir); 
            this.Sprite3D.transform.position = dir;
        }
        if (this._activeTime > 0) {
            this._activeTime -= Laya.timer.delta;
            if (this._activeTime <= 0) {
                this._active = false;
                Laya.timer.once(2000, this, () => {
                    SceneMgr_cscj.Instance.CameraCtr.InitCamera(this._pter);
                    EventMgr_csjc.dispatch_csjc(EventDef_csjc.Camera_Event_csjc, {
                        CameraOffset: new Laya.Vector3(0, 5, 5), CameraViewForward: 3,
                        CameraRotate: new Laya.Point(-45, -90)
                    });
                })
            }
        }
    }

    onCollisionEnter(other: Laya.Collision) {
        if (other.other.owner.name.search("Enemy") > -1) {
            SoundMgr_csjc.instance_csjc.playSound_csjc("Explore");
            this._activeTime = 10;
            this._model.active = false;
            this._fireEff.active = true;
            this._explore.active = true;
            this._tail.active = false;
            Laya.timer.once(1000, this, () => { this._explore.active = false })
        }
    }
}