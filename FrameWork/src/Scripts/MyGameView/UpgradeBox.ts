import StorageMgr_csjc, { StorageReq_csjc } from "../../Mgr/StorageMgr";
import User_csjc from "../../User/User";
import ViewMgr_csjc from "../../Mgr/ViewMgr";

export default class UpgradeBox extends Laya.Script {
    private _speedBtn: Laya.Image;
    private _pieceBtn: Laya.Image;
    private _footBtn: Laya.Image;
    private _speedLevel: Laya.Text;
    private _pieceLevel: Laya.Text;
    private _footLevel: Laya.Text;
    private _speedGold: Laya.FontClip;
    private _pieceGold: Laya.FontClip;
    private _footGold: Laya.FontClip;
    onAwake() {
        this._speedBtn = this.owner.getChildByName("SpeedBtn") as Laya.Image;
        this._pieceBtn = this.owner.getChildByName("PieceBtn") as Laya.Image;
        this._footBtn = this.owner.getChildByName("FootBtn") as Laya.Image;
        this._speedLevel = this._speedBtn.getChildByName("Level") as Laya.Text;
        this._pieceLevel = this._pieceBtn.getChildByName("Level") as Laya.Text;
        this._footLevel = this._footBtn.getChildByName("Level") as Laya.Text;
        this._speedGold = this._speedBtn.getChildByName("Gold") as Laya.FontClip;
        this._pieceGold = this._pieceBtn.getChildByName("Gold") as Laya.FontClip;
        this._footGold = this._footBtn.getChildByName("Gold") as Laya.FontClip;
        this.RefreshState();
        if (User_csjc.getLeveNum_csjc() == 1) {
            (this.owner as Laya.UIComponent).visible = false;
        }
    }
    onEnable() {
        this._speedBtn.on(Laya.Event.CLICK, this, this.UpSpeed);
        this._pieceBtn.on(Laya.Event.CLICK, this, this.UpPiece);
        this._footBtn.on(Laya.Event.CLICK, this, this.UpFoot);
    }

    RefreshState() {
        let speed = User_csjc.GetSpeed_csjc();
        let piece = User_csjc.GetPiece_csjc();
        let foot = User_csjc.GetFoot_csjc();
        if (speed <= 10) {
            this._speedLevel.text = ":" + speed;
            this._speedGold.value = (speed * 500).toString();
            this._speedBtn.disabled = false;
        }
        else {
            this._speedLevel.text = ":MAX";
            this._speedGold.value = '';
            this._speedBtn.disabled = true;
        }
        if (piece <= 10) {
            this._pieceLevel.text = ":" + piece;
            this._pieceGold.value = (piece * 500).toString();
            this._pieceBtn.disabled = false;
        }
        else {
            this._pieceLevel.text = ":MAX";
            this._pieceGold.value = '';
            this._pieceBtn.disabled = true;
        }
        if (foot <= 10) {
            this._footLevel.text = ":" + foot;
            this._footGold.value = (foot * 500).toString();
            this._footBtn.disabled = false;
        }
        else {
            this._footLevel.text = ":MAX";
            this._footGold.value = '';
            this._footBtn.disabled = true;
        }
    }

    UpSpeed() {
        if (User_csjc.getMoney_csjc() > User_csjc.GetSpeed_csjc() * 500) {
            User_csjc.subMoney_csjc(User_csjc.GetSpeed_csjc() * 500);
            User_csjc.SetSpeed_csjc(User_csjc.GetSpeed_csjc() + 1);
            this.RefreshState();
        }
        else {
            ViewMgr_csjc.instance_csjc.showTips_csjc("金币不足无法升级")
        }
    }

    UpPiece() {
        if (User_csjc.getMoney_csjc() > User_csjc.GetPiece_csjc() * 500) {
            User_csjc.subMoney_csjc(User_csjc.GetPiece_csjc() * 500);
            User_csjc.SetPiece_csjc(User_csjc.GetPiece_csjc() + 1);
            this.RefreshState();
        }
        else {
            ViewMgr_csjc.instance_csjc.showTips_csjc("金币不足无法升级")

        }
    }

    UpFoot() {
        if (User_csjc.getMoney_csjc() > User_csjc.GetFoot_csjc() * 500) {
            User_csjc.subMoney_csjc(User_csjc.GetFoot_csjc() * 500);
            User_csjc.SetFoot_csjc(User_csjc.GetFoot_csjc() + 1);
            this.RefreshState();
        }
        else {
            ViewMgr_csjc.instance_csjc.showTips_csjc("金币不足无法升级")
        }
    }
}