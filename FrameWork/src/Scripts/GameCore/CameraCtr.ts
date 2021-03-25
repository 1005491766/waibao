import { CameraState, SpeedState } from "./Enums";
import { CameraSetting } from "./GameSetting";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";

/**
 * 控制摄像机移动的类,使用时调用InitCamera()方法初始化，传入的参数为玩家组件的引用，以及在地面和空中摄像机的初始偏移
 * 此类使用消息中心解耦合，如果需要触发摄像机事件，需要使用消息中心dispatch(EventDef.Camera_Event)事件
 * 
 * @export
 * @class CameraCtr
 * @extends {Laya.Script}
 */
export default class CameraCtr extends Laya.Script3D {
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D; }


    //保存的对自身摄像机组件的引用
    private _cameraParent: Laya.Sprite3D;
    //真正的摄像机组件，可能外面套了一层父组件
    private _camera: Laya.Camera;
    //保存的玩家的引用
    private _followObjSp3D: Laya.Sprite3D;
    //摄像机当前的状态
    private _cameraState: CameraState;
    //摄像机当前的加速状态
    private _speedState: SpeedState;
    //在地面时摄像机离玩家的距离
    private _goundOffset: Laya.Vector3 = CameraSetting.GoundOffset;
    //摄像机视角
    private _fieldOfView: number = CameraSetting.FieldOfView;
    //当前摄像机离玩家的距离
    private _currentOffset: Laya.Vector3 = new Laya.Vector3();
    //摄像机相对于玩家的角度
    private _currentrotate: Laya.Point = new Laya.Point();
    //摄像机X轴旋转角度
    private _angleX: number = -60;
    //摄像机Y轴旋转角度
    private _angleY: number = -90;
    //摄像机目标左右偏移
    // private _targetOffset: number = 0;
    //摄像机当前左右偏移
    // private _cameraOffset: number = 0;
    //摄像机固定跟随点
    // private _fixedFollowPos: Laya.Vector3;
    //当前摄像机向前看的值
    private _curViewForward: number = 0;
    //摄像机应当向前看的值
    private _needViewForward: number = CameraSetting.FrontBackOffset;
    //摄像机抖动
    private _shakeTime: number = 0;
    //摄像机高度
    private _height: number = 0;
    //摄像机转换目标时的速度
    private _changeMoveSpeed: number = 0;
    //摄像机转换目标一共需要走的距离
    private _changeTotlaDistance: number = 0;
    //摄像机转换目标当前走的距离
    private _changeCurrentDistance: number = 0;
    //摄像机上一个需要追踪的物体
    private _preFollowObj: Laya.Sprite3D;
    // private _speedEffect: Laya.Sprite3D;
    /**构造函数
     * Creates an instance of CameraCtr.
     * @memberof CameraCtr
     */
    constructor() {
        super();
    }

    /**
     * 初始化，注册摄像机事件
     * 
     * @memberof CameraCtr
     */
    onAwake() {
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.Camera_Event_csjc, this, this.ChangeCameraState);
    }

    /**
     * 脚本被删除时自动反注册事件
     * 
     * @memberof CameraCtr
     */
    onDestroy() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Camera_Event_csjc, this, this.ChangeCameraState);
    }

    /**
     * 摄像机位置移动在LateUpdate中运行
     * 
     * @memberof CameraCtr
     */
    onLateUpdate() {
        if (this._cameraState == CameraState.ChangeingFollowObj) {
            if (this._changeCurrentDistance > this._changeTotlaDistance) {
                this._cameraState = CameraState.Normal;
                return;
            }
            this._changeCurrentDistance += (Laya.timer.delta / 1000) * this._changeMoveSpeed;
            let finalOffset = new Laya.Vector3();
            let progress = this._changeCurrentDistance / this._changeTotlaDistance;
            Laya.Vector3.lerp(this._preFollowObj.transform.position, this._followObjSp3D.transform.position, progress, finalOffset);
            Laya.Vector3.add(finalOffset, this._followObjSp3D.transform.position, this.Sprite3D.transform.position);
            this.Sprite3D.transform.position = this.Sprite3D.transform.position;
            return;
        }
        if (this._followObjSp3D == null) return;
        let deltaTime = Laya.timer.delta / 1000;
        // let finalOffser = this.GetOffsetByAngel();
        let finalOffser = this.RotateCamera();
        /* 下面的代码是按照摄像机和玩家的偏移_currentOffset求出摄像机的位置 */
        let offset_x: Laya.Vector3 = new Laya.Vector3();
        this._followObjSp3D.transform.getRight(offset_x);
        Laya.Vector3.scale(offset_x, finalOffser.x, offset_x);
        let offset_y: Laya.Vector3 = new Laya.Vector3();
        this._followObjSp3D.transform.getUp(offset_y);
        Laya.Vector3.scale(offset_y, finalOffser.y, offset_y);
        let offset_z: Laya.Vector3 = new Laya.Vector3();
        this._followObjSp3D.transform.getForward(offset_z);
        Laya.Vector3.scale(offset_z, finalOffser.z, offset_z);
        let offset = new Laya.Vector3();
        Laya.Vector3.add(offset_x, offset_y, offset);
        Laya.Vector3.add(offset, offset_z, offset);
        // let scale = Math.min(this._height / 5, 1);
        // Laya.Vector3.scale(offset, 1 + scale, offset);
        offset.y += this._height;
        // offset.x -= Math.max(0, this._height - 1.5) * 3;        
        offset.x -= this._height;
        offset.z -= this._height;
        /* 改良前的方法 */
        let finalPos = new Laya.Vector3();
        let followPos = new Laya.Vector3();
        /* 左右平移平滑函数 */
        /* if (this._cameraState == CameraState.Fixed) {
            // if (this._fixedFollowPos != null) {
            //     followPos = 
            // }
            followPos = this._fixedFollowPos;
        }
        else  */
        if (this._cameraState == CameraState.RotatedAround) {
            followPos = this._followObjSp3D.transform.position;
            if (this._curViewForward > 0) {
                this._curViewForward -= (deltaTime) * CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward < 0) {
                    this._curViewForward = 0;
                }
            }
            else if (this._curViewForward < 0) {
                this._curViewForward += (deltaTime) * CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward > 0) {
                    this._curViewForward = 0;
                }
            }
        }
        else {
            if (this._curViewForward < this._needViewForward) {
                this._curViewForward += (deltaTime) * CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward > this._needViewForward) {
                    this._curViewForward = this._needViewForward;
                }
            }
            else if (this._curViewForward > this._needViewForward) {
                this._curViewForward -= (deltaTime) * CameraSetting.FrontBackOffsetMoveSpd;
                if (this._curViewForward < this._needViewForward) {
                    this._curViewForward = this._needViewForward;
                }
            }
            /* if (this._posObj.CurrentPosOnRoad != null) {
                let distance = (deltaTime) * CameraSetting.LeftRightMoveSpd;
                if (this._cameraOffset > this._targetOffset) {
                    this._cameraOffset -= distance;
                    if (this._cameraOffset <= this._targetOffset) {
                        this._cameraOffset = this._targetOffset;
                    }
                }
                else if (this._cameraOffset < this._targetOffset) {
                    this._cameraOffset += distance;
                    if (this._cameraOffset >= this._targetOffset) {
                        this._cameraOffset = this._targetOffset;
                    }
                }
                followPos = this.GetPosByOffset(this._posObjSp3D.transform, this._posObj.CurrentPosOnRoad.PosWithOutOffset, this._cameraOffset);
            }
            else  */{
                followPos = this._followObjSp3D.transform.position;
            }
        }
        Laya.Vector3.add(offset, followPos, finalPos);
        this._cameraParent.transform.position = finalPos;
        let dir = new Laya.Vector3();
        this._followObjSp3D.transform.getForward(dir);
        Laya.Vector3.normalize(dir, dir);
        Laya.Vector3.scale(dir, this._curViewForward * -1, dir);
        Laya.Vector3.add(dir, followPos, dir);
        this._cameraParent.transform.lookAt(dir, Laya.Vector3._Up, false);
        if (this._camera != null) {
            this._camera.fieldOfView = this._fieldOfView;
            if (this._shakeTime > 0) {
                let shakeFrequency = this._shakeTime * 2 * Math.PI * CameraSetting.ShakeFrequency;
                // let pos = new Laya.Vector3(Math.sin(shakeFrequency) * 0.1, Math.cos(shakeFrequency) * 0.1, Math.cos(shakeFrequency) * 0.1);
                let pos = new Laya.Vector3(Math.sin(shakeFrequency) * CameraSetting.ShakeStrength, 0, 0);
                this._cameraParent.transform.getRight(pos);
                Laya.Vector3.scale(pos, Math.sin(shakeFrequency) * CameraSetting.ShakeStrength, pos)
                Laya.Vector3.add(pos, this._camera.transform.position, pos);
                this._camera.transform.position = pos;
                this._shakeTime -= Laya.timer.delta / 1000;
            }
        }
    }

    /**
     * 按照角度得到摄像机偏移，用于旋转摄像机
     * 
     * @returns {Laya.Vector3} 
     * @memberof CameraCtr
     */
    GetOffsetByAngel(): Laya.Vector3 {
        let result: Laya.Vector3;
        let dis = Laya.Vector3.distance(this._currentOffset, Laya.Vector3._ZERO.clone());
        //当摄像机状态为非旋转状态时
        if (this._cameraState != CameraState.RotatedAround) {
            //当摄像机状态为非旋转状态且当前角度不为0时，先将角度转为0
            if (this._angleY > 180) {
                this._angleY += Laya.timer.delta / 1000 * 360;
            }
            else if (this._angleY > 0 && this._angleY < 180) {
                this._angleY -= Laya.timer.delta / 1000 * 360;
            }
            //当摄像机状态为非旋转状态且当前角度为0时
            if (this._angleY < 0 || this._angleY >= 360) {
                this._angleY = 0;
            }
            result = this.RotateAroundYByAngle(dis, this._currentOffset, this._angleY);
        }
        else {
            this._angleY += Laya.timer.delta / 1000 * 30;
            if (this._angleY > 360) {
                this._angleY = this._angleY - 360;
            }
            result = this.RotateAroundYByAngle(dis, this._currentOffset, this._angleY);
        }
        return result;
    }


    RotateCamera(): Laya.Vector3 {
        let result: Laya.Vector3;
        let dis = Laya.Vector3.distance(this._currentOffset, Laya.Vector3._ZERO.clone());
        result = this.RotateAroundByAngle(dis, this._currentOffset, this._angleX, this._angleY);
        return result;
    }

    /**
     * 按照世界坐标的Y轴旋转 
     * 
     * @param {Laya.Vector3} vector 
     * @param {number} angelY 
     * @returns {Laya.Vector3} 
     * @memberof CameraCtr
     */
    RotateAroundYByAngle(radius: number, vector: Laya.Vector3, angelY: number): Laya.Vector3 {
        //角度为0的时候不需要旋转直接返回原位移，可以节约性能
        if (angelY == 0) {
            return vector;
        }
        let result = new Laya.Vector3();
        let rad = (angelY / 180) * Math.PI;
        result.x = Math.sin(rad) * radius;
        result.y = vector.y;
        result.z = Math.cos(rad) * radius;
        return result;
    }

    /**
     * 按照世界坐标的X轴旋转 
     * 
     * @param {Laya.Vector3} vector 
     * @param {number} angelX 
     * @returns {Laya.Vector3} 
     * @memberof CameraCtr
     */
    RotateAroundXByAngle(radius: number, vector: Laya.Vector3, angelX: number) {
        //角度为0的时候不需要旋转直接返回原位移，可以节约性能
        if (angelX == 0) {
            return vector;
        }
        let result = new Laya.Vector3();
        let rad = (angelX / 180) * Math.PI;
        result.x = vector.x;
        result.y = Math.sin(rad) * radius;
        result.z = Math.cos(rad) * radius;
        return result;
    }

    RotateAroundByAngle(radius: number, vector: Laya.Vector3, angelX: number, angelY: number) {
        let result = vector.clone();
        let radx = (angelX / 180) * Math.PI;
        let rady = (angelY / 180) * Math.PI;
        // console.log(radx);
        result.x = Math.sin(radx) * Math.cos(rady) * radius;
        result.y = Math.cos(radx) * radius;
        result.z = Math.sin(radx) * Math.sin(rady) * radius;
        return result;
    }

    /**
     * 设置摄像机动画状态的方法
     * 
     * @param {*} args 
     * @memberof CameraCtr
     */
    public ChangeCameraState(args: any) {
        // let transformOffset: Laya.Vector3;//摄像机与角色的transform偏移
        // let rotate: Laya.Vector3;//摄像机的旋转
        let fieldOfView: number;//摄像机角度，用来表现加速减速的效果
        // let cameraState = args.CameraState as CameraState;
        let speedState = args.SpeedState as SpeedState;
        let cameraOffSet = args.CameraOffset as Laya.Vector3;
        let cameraRotate = args.CameraRotate as Laya.Point;
        let cameraRotateX = args.CameraRotateX;
        let cameraRotateY = args.CameraRotateY;
        let cameraViewForward = args.CameraViewForward as number;
        // let roadOffset = args.RoadOffset as number;
        let shakeTime = args.ShakeTime as number;
        let height = args.Height as number;
        if (shakeTime) {
            this._shakeTime = Math.max(0, shakeTime);
        }
        if (height) {
            this._height = Math.max(0, height);
        }
        // if (roadOffset) {
        //     this._targetOffset = roadOffset * CameraSetting.LeftRightRate;
        //     // if (this._cameraState == CameraState.GroundRun && cameraState == CameraState.Ground) {
        //     //     this._cameraOffset = offset;
        //     // }
        //     // else {
        //     //     this._targetOffset = offset * 0.6;
        //     // }
        // }
        /* 切换摄像机跟随状态 */
        // if (cameraState) {
        //     this._cameraState = cameraState;
        //     /*             switch (cameraState) {
        //                     case CameraState.RotatedAround:
        //                         break;
        //                     case CameraState.Normal:

        //                         this
        //                         break;
        //                 }
        //                 // if (this._cameraState == CameraState.Fixed) {
        //                 //     this._fixedFollowPos = this._player.transform.position.clone();
        //                 // }
        //      */
        // }
        if (cameraOffSet) {
            let dis = Laya.Vector3.distance(this._currentOffset, cameraOffSet);
            let time = dis;
            if (dis > 0.1) {
                Laya.Tween.to(this._currentOffset, { x: cameraOffSet.x, y: cameraOffSet.y, z: cameraOffSet.z }, Math.min(1000, time * 1000), Laya.Ease.linearNone, null, 0, true);
            }
        }
        if (cameraRotateX) {
            this._angleX += cameraRotateX;
            if (this._angleX > -10) {
                this._angleX = -10
            }
            else if (this._angleX < -120) {
                this._angleX = -120;
            }
        }
        if (cameraRotate) {
            // this._angleX = cameraRotate.x;
            // this._angleY = cameraRotate.y;
            let dis = Math.pow(cameraRotate.x - this._angleX, 2) + Math.pow(cameraRotate.y - this._angleY, 2);
            if (dis > 1) {
                Laya.Tween.to(this, { _angleX: cameraRotate.x, _angleY: cameraRotate.y }, 1000, Laya.Ease.linearNone, null, 0, true);
            }
        }
        if (cameraRotateY) {
            this._angleY += cameraRotateY;
        }
        if (cameraViewForward != null) {
            this._needViewForward = cameraViewForward;
        }
        /* 摄像机加速减速效果，加速时会扩大加大fieldOfView，减速时则相反 */
        if (speedState) {
            switch (speedState) {
                case SpeedState.SpeedUp:
                    // this._speedEffect.active = true;
                    fieldOfView = 70;
                    break;
                case SpeedState.SpeedDown:
                    // this._speedEffect.active = false;
                    fieldOfView = 55;
                    break;
                case SpeedState.Normal:
                    // this._speedEffect.active = false;
                    fieldOfView = 60;
                    break;
            }
            if (this._speedState != speedState && fieldOfView && this._fieldOfView != fieldOfView) {
                // 等测试完毕之后使用这个方法
                this._speedState = speedState;
                let time = ((Math.abs(Math.abs(this._fieldOfView) - Math.abs(fieldOfView))) / 45) * 1000;
                Laya.Tween.to(this, { _fieldOfView: fieldOfView }, time, Laya.Ease.linearNone, null, 0, true);
            }
        }
        // if (rotate && this._rotate != rotate) {
        //     Laya.Tween.to(this._rotate, { x: rotate.x, y: rotate.y, z: rotate.z }, 300, Laya.Ease.circOut, null, 0, true);
        // }
    }

    /**
     * 初始化摄像机
     * 
     * @param {Laya.Sprite3D} playerCtr 玩家控制器的引用
     * @param {Laya.Vector3} goundOffset 玩家在地面时，摄像机位移
     * @param {Laya.Vector3} skyOffset 玩家在空中时，摄像机位移
     * @param {number} [fieldOfView = 60] 正常情况下的视角
     * @memberof CameraCtr
     */
    public InitCamera(posObj: Laya.Sprite3D) {
        this._cameraParent = this.owner as Laya.Sprite3D;
        this._camera = this.owner as Laya.Camera;
        if (this._followObjSp3D != null && this._cameraState == CameraState.ChangeFollowObj) {
            this._cameraState = CameraState.ChangeingFollowObj;
            this._preFollowObj = this._followObjSp3D;
            this._followObjSp3D = posObj;
            this._changeTotlaDistance = Laya.Vector3.distance(this._preFollowObj.transform.position, this._followObjSp3D.transform.position);
            this._changeMoveSpeed = this._changeTotlaDistance / CameraSetting.ChangeObjTime;
            this._changeCurrentDistance = 0;
        }
        else {
            this._followObjSp3D = posObj;
        }
        // this._camera = this._cameraParent.getChildByName("Main Camera") as Laya.Camera;
        // this._speedEffect = this._cameraParent.getChildByName("shexian") as Laya.Sprite3D;
        this._currentOffset = this._goundOffset.clone();
        this._cameraParent.transform.position = this._followObjSp3D.transform.position.clone();
        this._cameraState = CameraState.Normal;
    }
}