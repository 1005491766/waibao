import { Transition, StateID } from "../Fsm/FsmEnum";
import FSMSystem from "../Fsm/FSMSystem";
import TRexState from "../FsmStates/TRexState";
import PterState from "../FsmStates/PterState";
import SceneMgr_cscj from "../SceneMgr";
import CharacterCtr from "./CharacterCtr";
import MyAnimatorEvent from "./MyAnimatorEvent";
import { CollisionGroup } from "../Enums";

export default class CharacterCtr_KingKong extends CharacterCtr {
    get FaceWall(): boolean { return this._faceWall; }
    get Model(): Laya.Sprite3D { return this._model };
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D };

    private _faceWall: boolean;
    private _model: Laya.Sprite3D;
    private _hitResult: Laya.HitResult;


    onAwake() {
        this._tRex = this.owner.getChildByName("TRex") as Laya.Sprite3D;
        let ani = this.Model.addComponent(MyAnimatorEvent);
        ani.SetCharacter(this);

        this.MakeFsm();
    }

    MakeFsm() {
        this._fsm = new FSMSystem(this);
        this._fsm.AddState(this._tRex.addComponent(TRexState));
        // this._fsm.AddState(this._pter.addComponent(PterState));

    }


    onUpdate() {
        this._fsm.CurrentState.Act();
        // this._faceWall = this.FaceWallCheck();

    }
    FaceWallCheck() {
        // let front = new Laya.Vector3();
        // let back = new Laya.Vector3();
        // this.Model.transform.getForward(front);
        // Laya.Vector3.normalize(front, front);
        // Laya.Vector3.scale(front, 0.8, back);
        // Laya.Vector3.scale(front, -0.8, front);
        // front.y = 2;
        // back.y = 2;
        // Laya.Vector3.add(this.Sprite3D.transform.position, front, front);
        // Laya.Vector3.add(this.Sprite3D.transform.position, back, back)
        // let hitResults: Laya.HitResult = new Laya.HitResult();
        // let collisionGroup = CollisionGroup.Character;
        // let canCollisionWith = CollisionGroup.None | CollisionGroup.Ground;
        // let res = SceneMgr_cscj.Instance.CurrentScene.physicsSimulation.raycastFromTo(back, front, hitResults, collisionGroup, canCollisionWith);
        // if (res) {
        //     this._hitResult = hitResults;
        // }
        // else {
        //     this._hitResult = null;
        // }
        // return res;
    }
}