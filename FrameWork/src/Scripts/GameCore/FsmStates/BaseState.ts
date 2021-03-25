import FSMState from "../Fsm/FsmState";
import { InputType } from "../Enums";

export default abstract class BaseState extends FSMState {
    get Animator(): Laya.Animator { return this._animator }
    set Animator(v) { this._animator = v; }
    get CurrentAni(): string { return this._currentAni; }
    set CurrentAni(v) { this._currentAni = v; }
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D; }
    get Model(): Laya.Sprite3D { return this.owner.getChildAt(0) as Laya.Sprite3D; }
    get mOwner(): Laya.Sprite3D { return this.owner as Laya.Sprite3D; }

    protected _rockerAxis: Laya.Point;
    private _rockerInputTimer: number = 0;
    private _jumpInputTimer: number = 0;
    private _fireInputTimer: number = 0;
    private _fireBallInputTimer: number = 0;
    private _transformInputTimer: number = 0;
    private _attackInputTimer: number = 0;
    private _upTimer: number = 0;
    private _downTimer: number = 0;
    private _throwstoneTimer: number = 0;

    protected _animator: Laya.Animator;
    protected _currentAni: string;
    protected ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
    protected hitResults: Array<Laya.HitResult> = [];
    forwardV3:Laya.Vector3 = new Laya.Vector3()

    get RockerAxis(): Laya.Point {
        if (this._rockerInputTimer <= 0) {
            this._rockerAxis = null;
        }
        return this._rockerAxis;
    }

    get JumpInput(): boolean {
        return this._jumpInputTimer > 0;
    }
    get ThrowStoneInput(): boolean {
        return this._throwstoneTimer > 0;
    }

    get FireInput(): boolean {
        return this._fireInputTimer > 0;
    }

    get FireBallInput(): boolean {
        return this._fireBallInputTimer > 0;
    }

    get TransformInput(): boolean {
        return this._transformInputTimer > 0;
    }

    get AttackInput(): boolean {
        return this._attackInputTimer > 0;
    }

    get UpInput(): boolean {
        return this._upTimer > 0;
    }

    get DownInput(): boolean {
        return this._downTimer > 0;
    }

    get CameraAxis(): Laya.Point { return this._cameraAxis; }

    protected _cameraAxis: Laya.Point = new Laya.Point();
    public Reason(any?: any) {
        console.log("-----------------------输入数据",any)

        let input = any;
        if (!input) return;
        let type = input.InputType;
        let value = input.Value;
        switch (type) {
            case InputType.RockerAxis:

                if (value != null) {
                    this._rockerAxis = value;
                    this._rockerInputTimer = 150;
                }
                else {
                    this._rockerAxis = null;
                    this._rockerInputTimer = 0;
                }
                break;
            case InputType.CameraAxis:
                this._cameraAxis = value;
                break;
            case InputType.Jump:
                this._jumpInputTimer = 100;
                break;
            case InputType.Fire:
                this._fireInputTimer = 100;
                break;
            case InputType.FireBall:
                this._fireBallInputTimer = 100;
                break;
            case InputType.Transform:
                this._transformInputTimer = 100;
                break;
            case InputType.Attack:
                this._attackInputTimer = 100;
                break;
            case InputType.UP:
                this._upTimer = 100;
                break;
            case InputType.Down:
                this._downTimer = 100;
                break;
            case InputType.ThrowStone:
                console.log("----------------丢石头")
                this._throwstoneTimer = 100;
                break;
        }
    }

    public Act(any?) {
        this._attackInputTimer -= Laya.timer.delta;
        this._rockerInputTimer -= Laya.timer.delta;
        this._transformInputTimer -= Laya.timer.delta;
        this._jumpInputTimer -= Laya.timer.delta;
        this._fireInputTimer -= Laya.timer.delta;
        this._fireBallInputTimer -= Laya.timer.delta;
        this._upTimer -= Laya.timer.delta;
        this._downTimer -= Laya.timer.delta;
        this._throwstoneTimer -= Laya.timer.delta;

    }
}