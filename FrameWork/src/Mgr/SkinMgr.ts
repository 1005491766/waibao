import StorageMgr_csjc, { StorageReq_csjc } from "./StorageMgr";
export default class SkinMgr_csjc {
    /* 各项目自填写，SkinCount填写当前项目中皮肤的总数量 */
    public static readonly SkinCount_csjc = 8;
    private static _instance_csjc: SkinMgr_csjc;
    private _skinDate_csjc: SkinDate_csjc;
    /**
     * 单例模式
     * 
     * @readonly
     * @static
     * @type {SkinMgr_csjc}
     * @memberof SkinMgr
     */
    public static get Instance_csjc(): SkinMgr_csjc {
        if (SkinMgr_csjc._instance_csjc == null) {
            SkinMgr_csjc._instance_csjc = new SkinMgr_csjc();
        }
        return SkinMgr_csjc._instance_csjc;
    }

    /**
     * 得到当前的皮肤名
     *
     * @returns {string}
     * @memberof SkinMgr
     */
    GetCurrentSkin_csjc(): number {
        var skin = this.CurrentSkinDate_csjc.CurrentSkin_csjc;
        return skin;
    }

    /**
     * 设置当前使用皮肤
     * 
     * @param {number} index 
     * @memberof SkinMgr
     */
    SetCurrentSkin_csjc(index: number) {
        this.CurrentSkinDate_csjc.CurrentSkin_csjc = index;
        console.log("设置当前皮肤使用为: " + index);
        this.SaveSkinDate_csjc();
    }

    /**
     * 得到当前的SkinDate
     * 
     * @readonly
     * @type {SkinDate_csjc}
     * @memberof SkinMgr
     */
    public get CurrentSkinDate_csjc(): SkinDate_csjc {
        if (this._skinDate_csjc == null) {
            var dataStr = StorageMgr_csjc.getStorage_csjc("SkinDate");
            if (dataStr == null || dataStr == "") {
                this._skinDate_csjc = new SkinDate_csjc(SkinMgr_csjc.SkinCount_csjc, true);
                this.SaveSkinDate_csjc();
            }
            else {
                var data = JSON.parse(dataStr) as SkinDate_csjc;
                if (data != null && data.Owned_csjc != null && data.Owned_csjc.length == SkinMgr_csjc.SkinCount_csjc) {
                    this._skinDate_csjc = data;
                }
                else {
                    this._skinDate_csjc = new SkinDate_csjc(SkinMgr_csjc.SkinCount_csjc, true);
                    this.SaveSkinDate_csjc();
                }
            }
        }
        return this._skinDate_csjc;
    }

    /**
     * 保存皮肤数据
     *
     * @memberof SkinMgr
     */
    SaveSkinDate_csjc() {
        var storage = new StorageReq_csjc();
        storage.key = "SkinDate";
        storage.data = this._skinDate_csjc;
        StorageMgr_csjc.setStorage_csjc(storage);
    }


    /**
     * 按照皮肤的名字得到皮肤是否可用
     *
     * @param {string} name
     * @memberof SkinMgr
     */
    GetSkinAvailable_csjc(index: number) {
        return this.CurrentSkinDate_csjc.Owned_csjc[index];
    }

    /**
     * 解锁皮肤
     *
     * @memberof SkinMgr
     */
    UnLockSkin_csjc(index: number) {
        this.CurrentSkinDate_csjc.Owned_csjc[index] = true;
        this.SaveSkinDate_csjc();
    }
}

/**
 * 皮肤数据
 * 
 * @class SkinDate
 */
class SkinDate_csjc {
    constructor(skinCount: number, unlockFirst: boolean = false) {
        this.SkinCount_csjc = skinCount;
        this.Owned_csjc = [];
        for (let index = 0; index < this.SkinCount_csjc; index++) {
            if (unlockFirst && index == 0) {
                this.Owned_csjc.push(true);
            }
            else {
                this.Owned_csjc.push(false);
            }
        }
        if (unlockFirst) {
            this.CurrentSkin_csjc = 0;
        }
        else {
            this.CurrentSkin_csjc = -1;
        }
    }
    public CurrentSkin_csjc: number;
    public SkinCount_csjc: number;
    // public Price: Array<number> = [50, 100, 150, 300, 400, 500, 600, 700, 800];
    public Owned_csjc: Array<boolean>;
}