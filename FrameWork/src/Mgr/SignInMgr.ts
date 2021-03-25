import StorageMgr_csjc, { StorageReq_csjc } from "./StorageMgr";
/**
 * 7天签到的数据类，用于保存签到数据
 * 
 * @export
 * @class SignInData
 */
export class SignInData_csjc {
    constructor(firstDay: number, signPeriod: number) {
        this.FirstDay_csjc = firstDay;
        this.SignPeriod_csjc = signPeriod;
        for (let index = 0; index < signPeriod; index++) {
            this.SignInDays_csjc.push(-1);
        }
    }
    public SignPeriod_csjc: number;
    public FirstDay_csjc: number;//当前7天签到是以哪天为开始的,计算方式为一年中的第几天
    public SignInDays_csjc: Array<number> = [];//这7天的签到状态
}

/**
 * 签到管理器类
 * 签到内部的时间(天数)数据都统一成一年当中的某天，是一个number值
 * 例如类中CurrentSignInDay属性返回值就是“当前7天签到周期的第一天是今天的哪一天”
 * @export
 * @class SignMgr
 */
export default class SignMgr_csjc {
    /* 单例模式 */
    private static _instance_csjc: SignMgr_csjc;
    public static get Instance_csjc(): SignMgr_csjc {
        if (SignMgr_csjc._instance_csjc == null) {
            SignMgr_csjc._instance_csjc = new SignMgr_csjc();
        }
        return SignMgr_csjc._instance_csjc;
    }
    /* 重要！ContiuneSign表示是否为连续签到
        连续签到的意思是中途不能断，第一天签了，第二天没签，则第三天时显示第二天没签到，当前是签到周期第三天
        非连续签到则相反，第一天签了，第二天没签，则第三天时显示的是当前是签到周期第二天，没签到的那天被跳过了
    */
    private static readonly ContiuneSign_csjc: boolean = false;
    /* 签到周期数，就是一共能有几天签到 */
    private static readonly SignPeriod_csjc: number = 5;
    /**
     * 签到数据
     * 
     * @readonly
     * @type {SignInData_csjc}
     * @memberof SignMgr
     */
    public get SignInData_csjc(): SignInData_csjc {
        if (this._signInData_csjc == null) {
            this.GetStorageData_csjc();
        }
        return this._signInData_csjc;
    }
    private _signInData_csjc: SignInData_csjc;//签到数据保存字段

    /**
     * 获得签到数据,内部有对数据是否合法的判断
     * 
     * @memberof SignInView
     */
    GetStorageData_csjc() {
        let datastring = StorageMgr_csjc.getStorage_csjc("SignData") as string;
        let tempdata: SignInData_csjc = null;
        if (datastring == null || datastring == "") {
            this._signInData_csjc = new SignInData_csjc(SignMgr_csjc.GetDayOfYear_csjc(), SignMgr_csjc.SignPeriod_csjc);
            this.SetStorageData_csjc();
        }
        else {
            try {
                this._signInData_csjc = JSON.parse(datastring);
                if (!this.IsDataValid_csjc(this._signInData_csjc)) {
                    this._signInData_csjc = new SignInData_csjc(SignMgr_csjc.GetDayOfYear_csjc(), SignMgr_csjc.SignPeriod_csjc);
                    this.SetStorageData_csjc();
                }
            }
            catch (error) {
                this._signInData_csjc = new SignInData_csjc(SignMgr_csjc.GetDayOfYear_csjc(), SignMgr_csjc.SignPeriod_csjc);
                this.SetStorageData_csjc();
            }
        }
    }

    /**
     * 保存签到数据
     * 
     * @memberof SignInView
     */
    SetStorageData_csjc() {
        var signData = new StorageReq_csjc();
        signData.key = "SignData";
        if (this._signInData_csjc == null) {
            this._signInData_csjc = new SignInData_csjc(SignMgr_csjc.GetDayOfYear_csjc(), SignMgr_csjc.SignPeriod_csjc);
        }
        signData.data = this._signInData_csjc;
        StorageMgr_csjc.setStorage_csjc(signData);
    }

    /**
     * 得到某天是一年中的第几天，如果不传入值就默认指的是今天
     * 
     * @param {Date} [date] 
     * @returns {number} 
     * @memberof SignMgr
     */
    public static GetDayOfYear_csjc(date?: Date): number {
        if (date == null) {
            date = new Date();
        }
        // 每个月份的天数 1   2   3   4   5   6   7   8   9   10  11  12
        let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let year = date.getFullYear();
        if (year % 100 == 0 && year % 400 == 0) {
            monthDays[1] = 29;
        }
        else if (year % 100 != 0 && year % 4 == 0) {
            monthDays[1] = 29;
        }
        let month = date.getMonth();
        let day = date.getDate();
        let dayOfyear = day;
        for (let index = 0; index < month; index++) {
            const element = monthDays[index];
            dayOfyear += element;
        }
        return dayOfyear;
    }

    /**
     * 今天是否已经签到了
     * 
     * @readonly
     * @type {boolean}
     * @memberof SignMgr
     */
    public get IsSignInToday_csjc(): boolean {
        let signed = false;
        if (SignMgr_csjc.ContiuneSign_csjc) {
            if (this.SignInData_csjc.SignInDays_csjc[this.DayInPeriod_csjc] == SignMgr_csjc.GetDayOfYear_csjc()) {
                signed = true;
            }
        }
        else {
            for (let index = 0; index < this.SignInData_csjc.SignInDays_csjc.length; index++) {
                if (this.SignInData_csjc.SignInDays_csjc[index] == SignMgr_csjc.GetDayOfYear_csjc()) {
                    signed = true;
                    break;
                }
            }
        }
        return signed;
    }

    /**
     * 得到今天是属于签到周期的哪一天，注意可能会超出范围
     * 
     * @readonly
     * @type {number}
     * @memberof SignMgr
     */
    public get DayInPeriod_csjc(): number {
        let day = 0;
        if (SignMgr_csjc.ContiuneSign_csjc) {
            day = SignMgr_csjc.GetDayOfYear_csjc() - this.SignInData_csjc.FirstDay_csjc;
        }
        else {
            for (let index = 0; index < this.SignInData_csjc.SignInDays_csjc.length; index++) {
                if (this.SignInData_csjc.SignInDays_csjc[index] == -1 || this.SignInData_csjc.SignInDays_csjc[index] == SignMgr_csjc.GetDayOfYear_csjc()) {
                    day = index;
                    break;
                }
            }
        }
        return day;
    }

    /**
     * 签到,传入参数为第几天，默认是今天
     * 
     * @memberof SignMgr
     */
    public SignIn_csjc(day: number = this.DayInPeriod_csjc) {
        //如果是连续签到，则直接按照周期签
        this.SignInData_csjc.SignInDays_csjc[day] = SignMgr_csjc.GetDayOfYear_csjc();
        this.SetStorageData_csjc();
    }

    /**
     * 数据是否有效
     * 
     * @returns {boolean} 
     * @memberof SignMgr
     */
    public IsDataValid_csjc(signData: SignInData_csjc): boolean {
        if (signData.FirstDay_csjc == null || signData.FirstDay_csjc < 0 || signData.FirstDay_csjc > 365) {
            return false;
        }
        if (signData.SignInDays_csjc == null || signData.SignInDays_csjc.length != signData.SignPeriod_csjc) {
            return false;
        }
        //如果跨年则重新签到
        if (this.DayInPeriod_csjc < 0) {
            return false;
        }
        //如果是连续签到,则看当前的签到天数是否超出签到周期
        if (SignMgr_csjc.ContiuneSign_csjc) {
            if (this.DayInPeriod_csjc > signData.SignPeriod_csjc - 1) {
                return false;
            }
        }
        //如果是非连续签到，则看签到周期是否已满
        else {
            if (signData.SignInDays_csjc[signData.SignPeriod_csjc - 1] != -1) {
                return false;
            }
        }
        return true;
    }
}