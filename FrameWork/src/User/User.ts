import EventMgr_csjc from "../Event/EventMgr";
import { EventDef_csjc } from "../Event/EventDef";
import StorageMgr_csjc, { StorageReq_csjc } from "../Mgr/StorageMgr";
import HttpUnit_csjc from "../Net/HttpUnit";

//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGameData {
    public levelNum: number = 1;//当前关卡
    public moneyNum: number = 0;//金币数量
    public crystalNum: number = 0;//钻石数量    
    public Piece: number = 1;
    public Speed: number = 1;
    public Foot: number = 1;
}

export default class User_csjc extends Laya.Script {
    public static code_csjc: string = "";
    public static openId_csjc: string = "";
    public static token_csjc: string = null;
    public static nickName_csjc: string = "";
    public static gender_csjc: number = 0;
    public static city_csjc: string = "广州市";
    private static _useLocalStorage_csjc: boolean = false;//是否使用本地储存数据

    public static get isLogin() {
        return (User_csjc.code_csjc != "") || (User_csjc.token_csjc != "");
    }

    private static readonly _gameData: UserGameData = new UserGameData();

    public static getSaveData_csjc(): string {
        return JSON.stringify(User_csjc._gameData);
    }

    public static testInitUser_csjc() {
        User_csjc._gameData.levelNum = 1;
        User_csjc._gameData.moneyNum = 10000000;
        User_csjc._gameData.crystalNum = 10000000;
        User_csjc._gameData.Piece = 10;
        User_csjc._gameData.Speed = 10;
        User_csjc._gameData.Foot = 10;
    }

    public static initiUser_csjc(remoteData) {
        if (remoteData && 0 != remoteData) {
            User_csjc._useLocalStorage_csjc = false;
            console.log("获得在线存档");
            User_csjc.SetUserData_csjc(remoteData);
        }
        else {
            //todo：处理没有获取到玩家数据的情况,则直接调用本地数据
            console.log("获得本地存档");
            User_csjc._useLocalStorage_csjc = true;
            var dataStr = StorageMgr_csjc.getStorage_csjc("UserGameData");
            if (dataStr != null && dataStr != "") {
                var localdata = JSON.parse(dataStr);
                User_csjc.SetUserData_csjc(localdata);
            }
            else {
                this.SaveGameData_csjc();
            }
        }
    }

    public static SetUserData_csjc(data: any) {
        if (data.levelNum) User_csjc._gameData.levelNum = data.levelNum;
        if (data.moneyNum) User_csjc._gameData.moneyNum = data.moneyNum;
        if (data.crystalNum) User_csjc._gameData.crystalNum = data.crystalNum;
        if (data.Piece) User_csjc._gameData.Piece = data.Piece;
        if (data.Speed) User_csjc._gameData.Speed = data.Speed;
        if (data.Foot) User_csjc._gameData.Foot = data.Foot;
    }

    public static SaveGameData_csjc() {
        if (User_csjc._useLocalStorage_csjc) {
            User_csjc.SaveLocalGameDate_csjc();
        }
        else {
            HttpUnit_csjc.saveGameData_csjc(User_csjc.getSaveData_csjc(),
                (res) => {
                    if (res.code == 1) {
                        console.log("存档成功")
                    }
                    else {
                        console.log("存档失败")
                    }
                },
                (res) => {
                    console.log("存档失败")
                })
        }
    }

    public static SaveLocalGameDate_csjc() {
        var storage = new StorageReq_csjc();
        storage.key = "UserGameData";
        storage.data = User_csjc._gameData;
        StorageMgr_csjc.setStorage_csjc(storage);
    }


    public static setLeveNum_csjc(levelNum: number) {
        User_csjc._gameData.levelNum = levelNum;
        this.SaveGameData_csjc();
    }

    public static getLeveNum_csjc(): number {
        return User_csjc._gameData.levelNum;
    }

    public static addMoney_csjc(add: number, getloc?: Laya.Point) {
        add = Math.ceil(add)
        var last = User_csjc._gameData.moneyNum
        User_csjc._gameData.moneyNum += add;
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnUserMoneyChange_csjc,
            {
                curr: User_csjc._gameData.moneyNum,
                last: last,
                getLoc: getloc
            })
        this.SaveGameData_csjc();
    }

    public static subMoney_csjc(sub: number) {
        sub = Math.ceil(sub)
        var last = User_csjc._gameData.moneyNum
        User_csjc._gameData.moneyNum -= sub;
        if (User_csjc._gameData.moneyNum < 0) {
            User_csjc._gameData.moneyNum = 0;
        }
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnUserMoneyChange_csjc,
            {
                curr: User_csjc._gameData.moneyNum,
                last: last
            })
        this.SaveGameData_csjc();
    }

    public static getMoney_csjc() {
        return User_csjc._gameData.moneyNum;
    }

    public static addCrystal_csjc(add: number, getloc?: Laya.Point) {
        add = Math.ceil(add)
        var last = User_csjc._gameData.crystalNum
        User_csjc._gameData.crystalNum += add;
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnUserCrystalChange_csjc,
            {
                curr: User_csjc._gameData.crystalNum,
                last: last,
                getLoc: getloc
            })
        this.SaveGameData_csjc();
    }

    public static subCrystal_csjc(sub: number) {
        sub = Math.ceil(sub)
        var last = User_csjc._gameData.crystalNum
        User_csjc._gameData.crystalNum -= sub;
        if (User_csjc._gameData.crystalNum < 0) {
            User_csjc._gameData.crystalNum = 0;
        }
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnUserCrystalChange_csjc,
            {
                curr: User_csjc._gameData.crystalNum,
                last: last
            })
        this.SaveGameData_csjc();
    }

    public static getCrystal_csjc() {
        return User_csjc._gameData.crystalNum;
    }

    public static GetSpeed_csjc() {
        return User_csjc._gameData.Speed;
    }

    public static SetSpeed_csjc(v) {
        User_csjc._gameData.Speed = v;
    }

    public static GetPiece_csjc() {
        return User_csjc._gameData.Piece;
    }

    public static SetPiece_csjc(v) {
        User_csjc._gameData.Piece = v;
    }

    public static GetFoot_csjc() {
        return User_csjc._gameData.Foot;
    }

    public static SetFoot_csjc(v) {
        User_csjc._gameData.Foot = v;
    }
}

