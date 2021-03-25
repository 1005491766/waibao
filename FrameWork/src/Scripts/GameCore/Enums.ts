/**
 * 摄像机的跟随状态枚举
 * 
 * @enum {number}
 */
export enum CameraState {
    Normal = 1,
    RotatedAround = 2,
    ChangeFollowObj = 3,
    ChangeingFollowObj = 4,
}
/**
 * 角色加速状态枚举
 * 
 * @export
 * @enum {number}
 */
export enum SpeedState {
    Normal = 1,
    SpeedUp = 2,
    SpeedDown = 3,
    SpeedBackward = 4,
}

export enum CharacterState {
    Idle = "Idle",
    Paused = "Paused",
    GroundMoving = "GroundMoving",
    EndSpeed = "EndSpeed",
    EndKick = "EndKick",
    EndRoll = "EndRoll",
    GameOver = "GameOver",
}

/**
 * 碰撞组别
 * 
 * @export
 * @enum {number}
 */
export enum CollisionGroup {
    All = -1,
    None = 0,
    Character = Math.pow(2, 0),
    Obstacle = Math.pow(2, 1),
    Ground = Math.pow(2, 3),
}

export enum SkinState {
    NotOwned = 0,
    Owned = 1,
    Seleced = 2
}

export enum GameState {
    GameLoad,
    Prepare,
    Gameing,
    GameOver
}


export enum InputType {
    RockerAxis,
    CameraAxis,
    Jump,
    Transform,
    Attack,
    UP,
    Down,
    Fire,
    FireBall,
    ThrowStone,
}

export enum PlayerType {
    TRex,
    Kingkong,
}