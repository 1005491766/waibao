import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";
import GameMgr_csjc from "../GameMgr";
import SoundMgr_csjc from "../../Mgr/SoundMgr";
import User_csjc from "../../User/User";


export default class CoinSubView extends Laya.Script {
    private _ownerSp: Laya.UIComponent;
    private _originalScale: number;
    private _coin_Sp: Laya.Sprite;
    private _coinCount_FontClip: Laya.FontClip;
    private _coinGetList: Array<Laya.Sprite> = [];
    private _effectCount: number = 0;
    private _effectTimer: number = -1;
    private _getLoc: Laya.Point;
    private _goldList: Array<Laya.Text> = []
    onAwake() {
        this._ownerSp = this.owner as Laya.UIComponent;
        this._coin_Sp = this.owner.getChildByName("CoinSp") as Laya.Sprite;
        this._coinCount_FontClip = this.owner.getChildByName("CoinCount_FontClip") as Laya.FontClip;
        this._coinCount_FontClip.value = User_csjc.getMoney_csjc().toString();
        this._originalScale = this._coinCount_FontClip.scaleX;
    }
    onStart() {
        this.InitGetCointList()
    }
    InitGetCointList() {
        for (let index = 0; index < 10; index++) {
            let sp = new Laya.Sprite();
            sp.loadImage("subRes/image/coin.png", Laya.Handler.create(this, () => {
                Laya.stage.addChild(sp);
                this._coinGetList.push(sp);
                sp.visible = false;
                sp.x = 0;
                sp.y = 0;
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
            this._goldList.push(text);
        }
    }
    onEnable() {
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.Game_OnUserMoneyChange_csjc, this, this.CoinChange);
        // EventMgr_csjc.regEvent_csjc(EventDef_csjc.Game_OnUserMoneyChange_csjc, this, this.GetJumpDistance);
    }
    onDestroy() {
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_OnUserMoneyChange_csjc, this, this.CoinChange);
        // EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_GetJumpDistance, this, this.GetJumpDistance);
    }
    onUpdate() {
        if (this._effectTimer >= 0) {
            this._effectTimer += Laya.timer.delta / 1000;
            let angel = this._effectTimer * 1440;
            let rad = angel * Math.PI / 180;
            let scare = this._originalScale + 0.05 * (Math.sin(rad));
            this._coinCount_FontClip.scaleX = scare;
            this._coinCount_FontClip.scaleY = scare;
            let curcoin = parseInt(this._coinCount_FontClip.value);
            let countRemain = User_csjc.getMoney_csjc() - curcoin;
            let timeRemain = ((360 - angel) / 360) * 1000
            timeRemain = (countRemain / timeRemain) * Laya.timer.delta;
            this._coinCount_FontClip.value = (curcoin + Math.floor(timeRemain)).toString();
            if (angel > 360) {
                this._effectTimer = -1;
                this._coinCount_FontClip.value = User_csjc.getMoney_csjc().toString();
            }
        }
    }
    CoinChange(res: any) {
        if (res == null) return;
        if (res.curr > res.last) {
            if (res.getLoc) {
                let count = res.curr - res.last;
                if (count <= 25) {
                    this._effectCount = 1;
                }
                else if (count <= 50) {
                    this._effectCount = 3;
                }
                else if (count <= 200) {
                    this._effectCount = 5;
                }
                else if (count <= 400) {
                    this._effectCount = 7;
                }
                else {
                    this._effectCount = 10;
                }
                this._getLoc = res.getLoc;
                this.GetCoinStep1(count);
                // this.GetGoldCount(count);
                // Laya.timer.once(500, this, this.GetCoinStep2);
            }
            else {
                this._effectTimer = 0;
            }
        }
        else if (res.curr < res.last) {
            SoundMgr_csjc.instance_csjc.playSound_csjc("gold2");
            this._effectTimer = 0;
        }
    }
    // GetJumpDistance(point: Laya.Point, distance: number) {
    //     if (this._goldList.length <= 0) return;
    //     const goldText = this._goldList.pop();
    //     point = this._ownerSp.globalToLocal(point, true);
    //     goldText.x = point.x;
    //     goldText.y = point.y;
    //     goldText.fontSize = 50;
    //     goldText.bold = true;
    //     goldText.color = "#FFFFFF";
    //     goldText.strokeColor = "#000000";
    //     goldText.stroke = 4;
    //     goldText.text = "飞行距离:" + distance.toFixed(0);
    //     goldText.visible = true;
    //     Laya.timer.once(1000, this, () => {
    //         goldText.visible = false;
    //         this._goldList.push(goldText);
    //     });
    // }
    GetGoldCount(count: number) {
        if (this._goldList.length <= 0) return;
        const goldText = this._goldList.pop();
        // console.log(sceenPos);
        let point = this._ownerSp.globalToLocal(this._getLoc, true);
        goldText.x = point.x;
        goldText.y = point.y;
        goldText.fontSize = 40;
        goldText.bold = true;
        goldText.color = "#FFFFFF";
        goldText.strokeColor = "#000000";
        goldText.stroke = 4;
        goldText.text = "获得金币" + count/*  + count */;
        goldText.visible = true;
        // Laya.Tween.to(goldText, { x: 0, y: 0 }, 500, null, Laya.Handler.create(this, () => {
        //     goldText.visible = false;
        // }), 300);
        Laya.timer.once(500, this, () => {
            goldText.visible = false;
            this._goldList.push(goldText);
        });
    }
    GetCoinStep1(count: number) {
        let point = this._ownerSp.globalToLocal(this._getLoc, true);
        for (let index = 0; index < this._effectCount; index++) {
            if (this._coinGetList.length <= 0) {
                break;
            }
            let sp = this._coinGetList.pop();
            sp.x = point.x;
            sp.y = point.y
            sp.visible = true;
            sp.zOrder = sp.parent.numChildren - 1;
            /* if (count > 50) */ {
                let rdx = point.x + (Math.random() * 300) - 150;
                let rdy = point.y + (Math.random() * 300) - 150;
                let coinPoint = this._ownerSp.localToGlobal(new Laya.Point(this._coin_Sp.x, this._coin_Sp.y));
                Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, () => {
                    SoundMgr_csjc.instance_csjc.playSound_csjc("gold2");
                    this._effectTimer = 0;
                    sp.visible = false;
                    this._coinGetList.push(sp);
                }), 200 + (50 * index));
                // Laya.Tween.to(sp, { x: rdx, y: rdy }, 200, null, Laya.Handler.create(this, () => {
                //     let coinPoint = this._ownerSp.localToGlobal(new Laya.Point(this._coin_Sp.x, this._coin_Sp.y));
                //     Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, () => {
                //         SoundMgr_csjc.instance_csjc.playSound_csjc("gold2");
                //         this._effectTimer = 0;
                //         sp.visible = false;
                //         this._coinGetList.push(sp);
                //     }), 200 + (50 * index));
                // }));
            }
            // else {
            //     let point = this._ownerSp.globalToLocal(this._getLoc);
            //     let coinPoint = /* this._ownerSp.globalToLocal( */new Laya.Point(this._coin_Sp.x, this._coin_Sp.y);
            //     Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, () => {
            //         SoundMgr.instance.playSound("gold");
            //         this._effectTimer = 0;
            //         sp.visible = false;
            //         this._coinGetList.push(sp);
            //     }), 500);
            // }
        }
    }
    GetCoinStep2(sp) {
        let point = this._ownerSp.globalToLocal(this._getLoc);
        let coinPoint = /* this._ownerSp.globalToLocal( */new Laya.Point(this._coin_Sp.x, this._coin_Sp.y);
        for (let index = 0; index < this._effectCount; index++) {
            let sp = this._coinGetList[index];
            // let rdx = point.x + Math.random() * 100;
            // let rdy = point.y + Math.random() * 100;
            Laya.Tween.to(sp, { x: coinPoint.x, y: coinPoint.y }, 500, null, Laya.Handler.create(sp, () => {
                SoundMgr_csjc.instance_csjc.playSound_csjc("gold2");
                this._effectTimer = 0;
                sp.visible = false;
                this._coinGetList.push(sp);
            }), 50 * index);
        }
    }
}