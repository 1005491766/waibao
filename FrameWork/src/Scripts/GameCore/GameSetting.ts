export class SceneSetting {
    /* 道路最大偏移 */
    public static readonly MaxRoadOffset: number = 3.25;

    /* 难度设置,角色 */
    public static readonly Difficulty: number = 0;

    /* 重生时间 */
    public static readonly RespwanTime: number = 1000;

}

/**
 * 摄像机设置
 * 
 * @export
 * @class CameraSettings
 */
export class CameraSetting {
    /* 地面摄像机视角偏移 */
    public static readonly GoundOffset: Laya.Vector3 = new Laya.Vector3(0, 20, 10);

    /* 皮肤摄像机视角偏移 */
    public static readonly SkinViewOffset: Laya.Vector3 = new Laya.Vector3(-4, 5, 4);

    /* 默认视角 */
    public static readonly FieldOfView: number = 60

    /* 摄像机会以玩家的中心点加上一个前后的偏移作为最终的视角中心*/
    public static readonly FrontBackOffset: number = 0;

    /* 前后偏移归0时的速度 */
    public static readonly FrontBackOffsetMoveSpd: number = 10;

    /* 摄像机左右偏移移动速度 */
    public static readonly LeftRightMoveSpd: number = 100;

    /* 摄像机左右偏移比率 */
    public static readonly LeftRightRate: number = 0.5;

    /* 摄像机抖动频率 */
    public static readonly ShakeFrequency: number = 10;

    /* 摄像机抖动幅度 */
    public static readonly ShakeStrength: number = 0.2;

    /* 摄像机切换物体速度 */
    public static readonly ChangeObjTime: number = 10;
}

/**
 * 玩家跳跃高度
 * 
 * @export
 * @class CharacterSetting
 */
export class CharacterSetting {
    /* 角色在道路上的正常速度 */
    public static readonly NormalSpeed: number = 9;
    /* 大大卷最后冲刺速度 */
    public static readonly EndRollerSpeed: number = 25;
    /* 开始有多少卷 */
    public static readonly StartPiece: number = 40;
    /* 角色在道路上处于加速状态获得的速率 */
    public static readonly AccelerateSpeed: number = 0.5;
}

export class SprialRollerConfigure {
    /* 小碎片长度 */
    public static readonly PieceLength: number = 0.25;
    /* 小碎片高度 */
    public static readonly PieceWidth: number = 1.5;
    /* 小碎片厚度 */
    public static readonly PieceThickness: number = 0.1;
    /* 螺旋线激活片数 */
    public static readonly ActivePiece = 45;
    /* 失去螺旋卷距离 */
    public static readonly EmptyLoseDis = 0.7;
    /* 终点失去螺旋卷距离 */
    public static readonly EndRollLoseDis = 0.6;


    //#region 下面的是螺旋生成核心参数
    public static readonly SizeOfPiece = 300;
    /* 螺旋卷最大的半径 */
    public static readonly MaxRadius = 8;
    /* 螺旋卷初始相位，一般不用改 */
    public static readonly InitialPhase = 45;
    /* 螺旋卷圈数 */
    public static readonly Cycles = 15;
    //#endregion
}