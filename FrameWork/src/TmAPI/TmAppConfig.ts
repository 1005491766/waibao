import TmAPI from "./TmAPI";

/**
 * 保存appConfig数值的类
 * 
 * @export
 * @class TmAppConfigOptions
 */
export class TmAppConfigOptions {
    /**
     * 初始化appConfigOption字段值
     * 如果表中没有，则设置为初始的默认值
     * 
     * @param {*} res 
     * @memberof TmAppConfigOptions
     */
    public initOptions(res: any) {
        //类型判断，如果是比较简单的number，boolean，string,function就用Typeof
        //如果是Array就用 instanceof
        if (res == null) return;
        if (typeof res.adSwitch == "boolean") this.adSwitch = res.adSwitch;
        if (typeof res.wxBanner == "boolean") this.wxBanner = res.wxBanner;
        if (typeof res.wudian == "boolean") this.wudian = res.wudian;
        if (typeof res.examineBlock == "boolean") this.examineBlock = res.examineBlock;
        if (res.examineSceneList instanceof Array) this.examineSceneList = res.examineSceneList;
        if (res.wxWuDianBanners instanceof Array) this.wxWuDianBanners = res.wxWuDianBanners;
        if (typeof res.btnShowTimer == "number") this.btnShowTimer = res.btnShowTimer;
        if (typeof res.btnMoveTimer == "number") this.btnMoveTimer = res.btnMoveTimer;
        if (typeof res.bannerMoveTimer == "boolean") this.bannerMoveTimer = res.bannerMoveTimer;
        if (typeof res.bannerCreateFailNum == "boolean") this.bannerCreateFailNum = res.bannerCreateFailNum;
        if (typeof res.bannerTodayBannerMax == "boolean") this.bannerTodayBannerMax = res.bannerTodayBannerMax;
        if (typeof res.maiLiangBlock == "boolean") this.maiLiangBlock = res.maiLiangBlock;
        if (res.maiLiangSceneList instanceof Array) this.maiLiangSceneList = res.maiLiangSceneList;

        //下面是自定义的字段


    }

    //所有导出广告的开关,true为有导出广告
    public adSwitch: boolean = false;
    //是否打开微信banner,true为有微信banner
    public wxBanner: boolean = false;
    //误点狂点功能总开关
    public wudian: boolean = false;
    //审核屏蔽功能总开关,审核屏蔽的意义是让审核人员看不到某些敏感的功能,true为打开屏蔽功能
    public examineBlock: boolean = true;
    //审核屏蔽的场景值，通过这些场景值进来的审核人员看不到某些敏感的功能
    public examineSceneList: Array<number> = [
        1005, 1006, 1011, 1012, 1013, 1014, 1017, 1019,
        1020, 1023, 1024, 1025, 1030, 1031, 1032, 1036,
        1042, 1047, 1048, 1049, 1053, 1102, 1129];
    //微信banner列表
    public wxWuDianBanners: Array<string> = [];
    //按钮延迟出现的时间
    public btnShowTimer: number = 0;
    //按钮上移的时间
    public btnMoveTimer: number = 0;
    //Banner上移的时间
    public bannerMoveTimer: number = 0;
    //Banner失败创建的个数
    public bannerCreateFailNum: number = 3;
    //Banner每天最大创建次数
    public bannerTodayBannerMax: number = 10;
    //买量功能的总开关，为了让通过买量进来的审核人员看不见广告
    public maiLiangBlock: boolean = true;
    //买量功能的的场景值，为了让通过买量进来的审核人员看不见广告
    public maiLiangSceneList: Array<number> = [
        1011, 1012, 1013, 1017, 1025, 1031, 1032, 1047,
        1048, 1049, 1072
    ]

    //下面是自定义的字段


}

export default class TmAppConfig {
    //本地版本的appConfig存储位置
    public static LocalConfigPath = "res/json/AppConfigOption.json"
    //当前的appConfig对象
    private static _currentConfig: TmAppConfigOptions = new TmAppConfigOptions();
    public static get CurrentConfig(): TmAppConfigOptions {
        return this._currentConfig;
    }

    /**
     * 调用在线版本的appConfig
     * 
     * @static
     * @param {Function} completeFunc 
     * @memberof TmAppConfig
     */
    public static UpdateConfig(completeFunc: Function) {
        console.log("调用在线版本的appConfig");
        TmAPI.getAppJSONConfig("AppConfig", (res) => {
            this._currentConfig.initOptions(res);
            console.log(this._currentConfig);
            if (completeFunc) {
                completeFunc();
            }
        });
    }

    /**
     * 调用本地测试版本的appConfig
     * 
     * @static
     * @param {Function} completeFunc 
     * @memberof TmAppConfig
     */
    public static UpdateLocalConfig(completeFunc: Function) {
        console.log("调用本地版本的appConfig");
        Laya.loader.load(this.LocalConfigPath, Laya.Handler.create(this, (res) => {
            this._currentConfig.initOptions(res);
            console.log(this._currentConfig);
            if (completeFunc) {
                completeFunc();
            }
        }));
    }
}