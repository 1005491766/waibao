import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import CharacterCtr from "./Character/CharacterCtr";
import CameraCtr from "./CameraCtr";
import DestructibleObj from "./Character/DestructibleObj";
import Enemy from "./Character/Enemy";
import User_csjc from "../../User/User";
import Camera2UI from "./Camera2UI";
import { StateID } from "./Fsm/FsmEnum";
import Bullet from "./Character/Bullet";
import BossRobot from "./Character/BossRobot";
import { PlayerType, CollisionGroup } from "./Enums";
import DestructibleObjBuilds from "./Character/DestructibleObjBuilds";


export default class SceneMgr_cscj extends Laya.Script3D {
    private static _instance;
    static get Instance(): SceneMgr_cscj { return this._instance }
    get CurrentScene(): Laya.Scene3D { return this.owner as Laya.Scene3D; }
    get ReplaceObj(): Laya.Sprite3D { return this._replaceObj; }
    get Player(): CharacterCtr { return this._playerCtr; }
    get Boss(): CharacterCtr { return this._boss; }
    get BossSprite3D(): Laya.Sprite3D { return this._boss.owner as Laya.Sprite3D; }

    get RestTimer(): number { return Math.floor(this._restTimer); }
    get EnemyList(): Array<Enemy> { return this._enemyList; }
    get EnemyLocList(): Array<any> { return this._enemyLocList; }
    get EnemCount(): number { return this._enemyCount; }
    get EnemyKillCount(): number { return this._enemyKillCount; }
    get GameOver(): number { return this._gameOver; }
    get CameraCtr(): CameraCtr { return this._cameraCtr; }
    get FireEffects(): Array<Laya.Sprite3D> { return this._fireEffects; }
    get CurrLockEnemy(): Laya.Sprite3D { return this._currLockEnemy; }
    get CurrLockEnemyPos(): Laya.Vector3 { return this._currLockEnemyPos; }
    get StateId(): StateID { return this.Player.StateId }

    get PlayerKind(): number { return this._playerKind}
    set PlayerKind(kind) { this._playerKind = kind}

    get BossKind(): number { return this._bossKind}
    set BossKind(kind) { this._bossKind = kind}


    Scole: number = 0;
    private _playerCtr: CharacterCtr;
    public Camera: Laya.Sprite3D;
    private _replaceObj: Laya.Sprite3D;
    private _enemyList: Array<Enemy> = [];
    private _enemyAllList: Array<Laya.Sprite3D> = [];
    private _restTimer: number = 0;
    private _gamePlaying: boolean = false;
    private _enemyPrefab: Laya.Sprite3D;
    private _enemyLocList: Array<any> = [];
    private _enemyCount: number = 0;
    private _enemyKillCount: number = 0;
    private _gameOver: number = 0;
    private _playerLoc: Laya.Sprite3D;
    private _cameraCtr: CameraCtr;
    private _fireEffects: Array<Laya.Sprite3D> = [];
    private _currLockEnemy: Laya.Sprite3D;
    private _currLockEnemyPos: Laya.Vector3;
    private _stateId: StateID;

    private _playerKind:PlayerType = PlayerType.TRex;
    private _bossKind:PlayerType = PlayerType.TRex;

    private _boss:BossRobot;

    onAwake() {
        console.log("---------------------进入游戏")
        SceneMgr_cscj._instance = this;
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_GameSceneLoadCompelete_csjc);


        this.Camera = this.owner.getChildByName("Main Camera") as Laya.Sprite3D;
        this._cameraCtr = this.Camera.addComponent(CameraCtr) as CameraCtr;


        this._restTimer = 150;
        this.InitGameObjects();
    }

    onEnable() {
        this.addEvent();
    }

    onDisable() {
        this.RemoveEvent();
    }

    addEvent() {
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.Game_Input_csjc, this, this.Input_csjc);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.EnemyDead, this, this.OnEnemyDead);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.SelectHero, this, this.OnSelectHero);

        
    }

    RemoveEvent() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_Input_csjc, this, this.Input_csjc);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.EnemyDead, this, this.OnEnemyDead);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.SelectHero, this, this.OnSelectHero);


    }

    OnSelectHero()
    {
        let player = this.owner.getChildByName("Player") as Laya.Sprite3D;
        let boss = this.owner.getChildByName("Boss") as Laya.Sprite3D;
        boss = player.clone()as Laya.Sprite3D
        this.owner.addChild(boss)
        boss.transform.position = new Laya.Vector3(0,0,0)
        boss.name = "boss"
        this._playerCtr = player.addComponent(CharacterCtr);
        this._boss = boss.addComponent(BossRobot);

        this._playerLoc = this.owner.getChildByName("PlayerLoc") as Laya.Sprite3D;
        if (User_csjc.getLeveNum_csjc() > 1) {
            let index = Math.floor(Math.random() * this._playerLoc.numChildren);
            let loc = this._playerLoc.getChildAt(index) as Laya.Sprite3D;
            this._playerCtr.FollowObj.transform.worldMatrix = loc.transform.worldMatrix.clone();
        }
    }

    OnEnemyDead() {
        this._enemyKillCount++;
        if (this._enemyKillCount >= this._enemyCount) {

        }
    }

    PauseGame() {
        this._gamePlaying = false;
    }

    StartGame() {
        this._gamePlaying = true;
    }

    onUpdate() {
        if (this._gameOver != 0 || !this._gamePlaying) return;
        this._restTimer -= Math.min(50, Laya.timer.delta) / 1000;
        if (this._restTimer <= 0) {
            this._restTimer = 0;
            this._gameOver = -1;
        }
        this.CaEnemyLoc();
    }

    CaEnemyLoc() {
        this._enemyLocList = [];
        let cent = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
        let closeDis = -1;
        this._currLockEnemyPos = null;
        this._currLockEnemy = null;
        for (let index = 0; index < this.EnemyList.length; index++) {
            const enemy = this.EnemyList[index];
            if (enemy.Alive) {
                let pos = enemy.Sprite3D.transform.position.clone();
                pos.y += 2;
                pos = Camera2UI.WorldToScreen2(this.Camera, pos)
                let inRange =
                    (pos.x > Laya.stage.width * 0.25) && (pos.x < Laya.stage.width * 0.75) /* &&
                    (pos.y > cent.y * 0.25) && (pos.y < cent.y * 0.75) */
                if (pos.z <= 0 && inRange) {
                    let dis = Math.pow((pos.x - cent.x), 2) + Math.pow((pos.y - cent.y), 2);
                    if (closeDis == -1 || closeDis > dis) {
                        closeDis = dis;
                        this._currLockEnemyPos = pos;
                        this._currLockEnemy = enemy.Sprite3D;
                    }
                }
                let dis = Laya.Vector3.distance(this._playerCtr.FollowObj.transform.position, enemy.Sprite3D.transform.position);
                this._enemyLocList.push({ Postion: pos, Distance: dis });
            }
        }
    }

    /**
     * 玩家输入
     * 
     * @param {Laya.Point} point 
     * @memberof ryw_SceneManager
     */
    public Input_csjc(point: Laya.Point) {
        // if (this._gameOver || this.Provoking) {
        //     return;
        // }
        if (point == null) {
            console.log("停止输入");
            // this._player.Input(point);
            // this._playerCtr.PlayerIdle();
        }
        else {
            // this._playerCtr.PlayerMove(point);
            // console.log(`输入值${point}`);
        }
        this._playerCtr.Input(point);
    }

    InitGameObjects() {
        let boundary: Laya.Sprite3D = this.owner.getChildByName("Boundary") as Laya.Sprite3D;
        for (let index = 0; index < boundary.numChildren; index++) {
            const ground = boundary.getChildAt(index).getComponent(Laya.PhysicsComponent);
            if (ground) {
                this.SetGround(ground);
            }
        }
        let buildings = this.owner.getChildByName("Buildings") as Laya.Sprite3D;
        for (let index = 0; index < buildings.numChildren; index++) {
            const buildCol = buildings.getChildAt(index).getComponent(Laya.PhysicsComponent);
            if (buildCol) {
                this.SetClimb(buildCol);
            }
        }
        let roadObj = this.owner.getChildByName("RoadObj") as Laya.Sprite3D;
        for (let index = 0; index < roadObj.numChildren; index++) {
            const obj = roadObj.getChildAt(index);
            if (obj.getComponent(Laya.PhysicsComponent) != null) {
                obj.addComponent(DestructibleObj);
            }
        }
        roadObj = this.owner.getChildByName("Buildings") as Laya.Sprite3D;
        for (let index = 0; index < roadObj.numChildren; index++) {
            const obj = roadObj.getChildAt(index);
            if (obj.getComponent(Laya.PhysicsComponent) != null) {
                obj.addComponent(DestructibleObjBuilds);
            }
        }
        this._replaceObj = this.owner.getChildByName("ReplaceObj") as Laya.Sprite3D;

        let freeObj = this.owner.getChildByName("FreeObj") as Laya.Sprite3D;
        for (let index = 0; index < freeObj.numChildren; index++) {
            const objCol = freeObj.getChildAt(index).getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
            if (objCol) {
                objCol.collisionGroup = CollisionGroup.Obstacle;
                objCol.canCollideWith = CollisionGroup.None | CollisionGroup.Character | CollisionGroup.Ground | CollisionGroup.Obstacle;
            }
        }

        this.CreatEnemy();
     
    }

    CreatEnemy() {

        this._enemyPrefab = this.owner.getChildByName("Enemys").getChildAt(0) as Laya.Sprite3D;
        let enemyAll = this.owner.getChildByName("EnemyAllList") as Laya.Sprite3D;
        let enemyEx = this.owner.getChildByName("EnemyExList") as Laya.Sprite3D;
        this._enemyCount = 1;
        if (User_csjc.getLeveNum_csjc() == 1) {
            if (Math.random() > 0.5) {
                this._enemyCount = 2;
            }
        }
        else if (User_csjc.getLeveNum_csjc() > 1 && User_csjc.getLeveNum_csjc() < 3) {
            this._enemyCount = 3 + Math.floor(Math.random() * 3);
        }
        else {
            this._enemyCount = 4 + Math.floor(Math.random() * 3);
        }
        while (this._enemyList.length < this._enemyCount) {
            let enemyFake = enemyAll.getChildAt(Math.floor(Math.random() * enemyAll.numChildren)) as Laya.Sprite3D;
            let eSp = Laya.Sprite3D.instantiate(this._enemyPrefab, this._enemyPrefab.parent);
            eSp.transform.worldMatrix = enemyFake.transform.worldMatrix;
            let e = eSp.addComponent(Enemy);
            this._enemyList.push(e);
        }
        let rd = Math.floor(Math.random() * 1) + 1;
        while (this._enemyList.length < this._enemyCount + rd) {
            let enemyFake = enemyEx.getChildAt(Math.floor(Math.random() * enemyEx.numChildren)) as Laya.Sprite3D;
            let eSp = Laya.Sprite3D.instantiate(this._enemyPrefab, this._enemyPrefab.parent);
            eSp.transform.worldMatrix = enemyFake.transform.worldMatrix;
            let e = eSp.addComponent(Enemy);
            this._enemyList.push(e);
        }
        this._restTimer = 60 + (this._enemyList.length) * 30;
        this._enemyPrefab.removeSelf();
        this._enemyPrefab.destroy();
    }

    SetGround(ground: Laya.PhysicsComponent) {
        ground.collisionGroup = CollisionGroup.Obstacle;
        ground.canCollideWith = CollisionGroup.None | CollisionGroup.Character | CollisionGroup.Obstacle;
    }

    SetClimb(buliding: Laya.PhysicsComponent) {
        buliding.collisionGroup = CollisionGroup.Ground;
        buliding.canCollideWith = CollisionGroup.None | CollisionGroup.Character | CollisionGroup.Obstacle;
    }
}