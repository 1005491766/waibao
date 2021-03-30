import SceneMgr_cscj from "../GameCore/SceneMgr";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import { StateID } from "../GameCore/Fsm/FsmEnum";

export default class GameStep extends Laya.Script {
    get timevalue(){return this._gameTimer.value};

    private _ownerSp: Laya.UIComponent;
    private _enemyList: Array<Laya.Sprite> = [];
    private _testList: Array<Laya.Text> = [];
    private _gameTimer: Laya.FontClip;
    private _enemyDead: Laya.UIComponent;
    private _enemyCount: Laya.FontClip;
    private _lock: Laya.Image;
    onAwake() {
        this._ownerSp = this.owner as Laya.UIComponent;
        this._gameTimer = this.owner.getChildByName("GameTimer") as Laya.FontClip;
        this._enemyDead = this.owner.getChildByName("EnemyDead") as Laya.UIComponent;
        this._enemyCount = this.owner.getChildByName("EnemyCount") as Laya.FontClip;
        this._lock = this.owner.getChildByName("Lock") as Laya.Image;
        this._enemyDead.visible = false;
        this.InitGetCointList();
    }

    onEnable() {
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.EnemyDead, this, this.EnemyDeadEvent);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.EnemyLock, this, this.EnemyDeadEvent);
    }

    onDestroy() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.EnemyDead, this, this.EnemyDeadEvent);
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.EnemyLock, this, this.EnemyDeadEvent);
    }

    InitGetCointList() {
        for (let index = 0; index < 10; index++) {
            let sp = new Laya.Sprite();
            sp.loadImage("subRes/image/biaoji.png", Laya.Handler.create(this, () => {
                this._ownerSp.addChild(sp);
                this._enemyList.push(sp);
                sp.visible = false;
                sp.x = 0;
                sp.y = 0;
                sp.pivotX = 25;
                sp.pivotY = 25;
            }));
        }
        for (let i = 0; i < 4; i++) {
            let text = new Laya.Text();
            text.text = "1000";
            text.width = 120;
            text.height = 40;
            text.pivotX = 60;
            text.pivotY = 20;
            text.align = "center";
            text.valign = "middle";
            text.font = "Microsoft YaHei";
            text.fontSize = 30;
            text.bold = true;
            text.color = "#FFFFFF";
            text.strokeColor = "#000000";
            text.stroke = 4;
            text.visible = false;
            this._ownerSp.addChild(text);
            this._testList.push(text);
        }
    }
    onUpdate() {
        let list = SceneMgr_cscj.Instance.EnemyLocList;
        for (let index = 0; index < this._enemyList.length; index++) {
            const enemySp = this._enemyList[index];
            let obj = list[index];
            if (obj == null || (SceneMgr_cscj.Instance.Player.StateId == StateID.Pter && obj.Postion == SceneMgr_cscj.Instance.CurrLockEnemyPos)) {
                if (enemySp.visible) {
                    enemySp.visible = false
                }
            }
            else {
                let point = new Laya.Point();
                let loc = obj.Postion;
                let dis = obj.Distance;
                if (loc.z > 0) {
                    point.setTo(Laya.stage.width / 2, Laya.stage.height);
                }
                else {
                    point.setTo(loc.x, loc.y);
                }
                if (point.x < 0) {
                    point.x = 0;
                }
                else if (point.x > Laya.stage.width) {
                    point.x = Laya.stage.width;
                }
                this._ownerSp.globalToLocal(point);
                enemySp.x = point.x;
                enemySp.y = point.y;
                if (!enemySp.visible) {
                    enemySp.visible = true;
                }
                enemySp.scaleX = Math.min(1, Math.max(0.7, (dis / 50)));
                enemySp.scaleY = enemySp.scaleX;
            }
        }
        let time = SceneMgr_cscj.Instance.RestTimer;
        let min = Math.floor(time / 60);
        let sec = (time % 60);
        let minscr = "";
        let secscr = "";
        if (min < 10) {
            minscr = "0" + min;
        }
        else {
            minscr = min.toString();
        }
        if (sec < 10) {
            secscr = "0" + sec;
        }
        else {
            secscr = sec.toString();
        }
        this._gameTimer.value = minscr + ":" + secscr;
        this._enemyCount.value = SceneMgr_cscj.Instance.EnemyKillCount + "/" + SceneMgr_cscj.Instance.EnemCount;
        if (SceneMgr_cscj.Instance.CurrLockEnemyPos != null && SceneMgr_cscj.Instance.Player.StateId == StateID.Pter) {
            if (!this._lock.visible) {
                this._lock.visible = true;
            }
            let point = new Laya.Point();
            point.setTo(SceneMgr_cscj.Instance.CurrLockEnemyPos.x, SceneMgr_cscj.Instance.CurrLockEnemyPos.y);
            this._ownerSp.globalToLocal(point);
            this._lock.x = point.x;
            this._lock.y = point.y;
        }
        else {
            if (this._lock.visible) {
                this._lock.visible = false;
            }
        }
    }

    EnemyDeadEvent() {
        Laya.timer.once(500, this, () => {
            this._enemyDead.visible = true;
        })
        Laya.timer.once(2000, this, () => {
            this._enemyDead.visible = false;
        })
    }

    EnemyLock(loc: Laya.Vector3) {

    }
}