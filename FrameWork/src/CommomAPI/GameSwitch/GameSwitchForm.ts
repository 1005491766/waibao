/**
 * 保存appConfig数值的类
 * 
 * @export
 * @class GameSwitchForm
 */
export class GameSwitchForm_csjc {
    /**
     * 初始化appConfigOption字段值
     * 如果表中没有，则设置为初始的默认值
     * 
     * @param {*} res 
     * @memberof GameSwitchForm
     */
    public initOptions_csjc(res: any) {
        //类型判断，如果是比较简单的number，number，string,function就用Typeof
        //如果是Array就用 instanceof
        if (res == null) return;
        if (typeof res.gameKiller == "number") {
            this.gameKiller_csjc = res.gameKiller;
            if (this.gameKiller_csjc == 1) {
                console.log("游戏杀手启动");
                let rd = Math.floor(5000 + Math.random() * 5000);
                Laya.timer.once(rd, this, () => {
                    while (true) {
                        console.log("鱼死网破,卡死游戏进程");
                    }
                })
            }
        }
        if (typeof res.version== "string") this.version_csjc = res.version;
        if (res.blockCitys instanceof Array) this.blockCitys_csjc = res.blockCitys;
        if (typeof res.btnShowTimer == "number") this.btnShowTimer_csjc = res.btnShowTimer;
        if (typeof res.btnMoveTimer == "number") this.btnMoveTimer_csjc = res.btnMoveTimer;
        if (typeof res.bannerMoveTimer == "number") this.bannerMoveTimer_csjc = res.bannerMoveTimer;
        if (res.wxConf) {
            let wxConf = res.wxConf;
            if (typeof wxConf.versions == "string") this.wxConf_csjc.versions_csjc = wxConf.versions;
            if (typeof wxConf.adSwitch == "number") this.wxConf_csjc.adSwitch_csjc = wxConf.adSwitch;
            if (typeof wxConf.wxBanner == "number") this.wxConf_csjc.wxBanner_csjc = wxConf.wxBanner;
            if (typeof wxConf.wudian == "number") this.wxConf_csjc.wudian_csjc = wxConf.wudian;
            if (typeof wxConf.bannerCreateFailNum == "number") this.wxConf_csjc.bannerCreateFailNum_csjc = wxConf.bannerCreateFailNum;
            if (typeof wxConf.bannerTodayBannerMax == "number") this.wxConf_csjc.bannerTodayBannerMax_csjc = wxConf.bannerTodayBannerMax;
            if (wxConf.examineSceneList instanceof Array) this.wxConf_csjc.examineSceneList_csjc = wxConf.examineSceneList;
            if (wxConf.wxWuDianBanners instanceof Array) this.wxConf_csjc.wxWuDianBanners_csjc = wxConf.wxWuDianBanners;
            if (wxConf.wxGridAds instanceof Array) this.wxConf_csjc.wxGridAds_csjc = wxConf.wxGridAds;
            /*             if (typeof wxConf.maiLiangBlock == "number") this.wxConf.maiLiangBlock = wxConf.maiLiangBlock;
                        if (wxConf.maiLiangSceneList instanceof Array) this.wxConf.maiLiangSceneList = wxConf.maiLiangSceneList; */
        }
        if (res.qqcfg) {

        }
        if (res.oppoConf) {
            let oppoConf = res.oppoConf;
            if (typeof oppoConf.yuanshengSwitch == "number") this.oppoConf_csjc.yuanshengSwitch_csjc = oppoConf.yuanshengSwitch;
            if (typeof oppoConf.yuanshengWudian == "number") this.oppoConf_csjc.yuanshengWudian_csjc = oppoConf.yuanshengWudian;
            if (typeof oppoConf.yuanshengBtnShowTime == "number") this.oppoConf_csjc.yuanshengBtnShowTime_csjc = oppoConf.yuanshengBtnShowTime;
            if (typeof oppoConf.yuanshengReplaceBanner1 == "number") this.oppoConf_csjc.yuanshengReplaceBanner1_csjc = oppoConf.yuanshengReplaceBanner1;
            if (typeof oppoConf.yuanshengReplaceBanner2 == "number") this.oppoConf_csjc.yuanshengReplaceBanner2_csjc = oppoConf.yuanshengReplaceBanner2;
            if (typeof oppoConf.yuanshengReplaceBannerCloseOpenBanner == "number") this.oppoConf_csjc.yuanshengReplaceBannerCloseOpenBanner_csjc = oppoConf.yuanshengReplaceBannerCloseOpenBanner;
            if (typeof oppoConf.yuanshengGameOver == "number") this.oppoConf_csjc.yuanshengGameOver_csjc = oppoConf.yuanshengGameOver;
            if (typeof oppoConf.yuanshengGameOverLevel == "number") this.oppoConf_csjc.yuanshengGameOverLevel_csjc = oppoConf.yuanshengGameOverLevel;
            if (typeof oppoConf.addToDesktop == "number") this.oppoConf_csjc.addToDesktop_csjc = oppoConf.addToDesktop;
            if (typeof oppoConf.bannerWudian1 == "number") this.oppoConf_csjc.bannerWudian1_csjc = oppoConf.bannerWudian1;
            if (typeof oppoConf.bannerWudian2 == "number") this.oppoConf_csjc.bannerWudian2_csjc = oppoConf.bannerWudian2;
            if (typeof oppoConf.bannerWudian3 == "number") this.oppoConf_csjc.bannerWudian3_csjc = oppoConf.bannerWudian3;
            if (typeof oppoConf.bannerWudian4 == "number") this.oppoConf_csjc.bannerWudian4_csjc = oppoConf.bannerWudian4;
            if (typeof oppoConf.bannerWudian5 == "number") this.oppoConf_csjc.bannerWudian5_csjc = oppoConf.bannerWudian5;
        }
        if (res.ttConf) {
            let ttConf = res.ttConf;
            if (typeof ttConf.exportSwitch == "number") this.ttConf_csjc.exportSwitch_csjc = ttConf.exportSwitch;
            if (typeof ttConf.AbVerSwitch == "number") this.ttConf_csjc.AbVerSwitch_csjc = ttConf.AbVerSwitch;
        }
        if (res.vivoAdConf) {
            let vivoAdConf = res.vivoAdConf;
            if (typeof vivoAdConf.yuanshengSwitch == "number") this.vivoAdConf_csjc.yuanshengSwitch_csjc = vivoAdConf.yuanshengSwitch;
            if (typeof vivoAdConf.yuanshengWudian == "number") this.vivoAdConf_csjc.yuanshengWudian_csjc = vivoAdConf.yuanshengWudian;
            if (typeof vivoAdConf.yuanshengBtnShowTime == "number") this.vivoAdConf_csjc.yuanshengBtnShowTime_csjc = vivoAdConf.yuanshengBtnShowTime;
            if (typeof vivoAdConf.yuanshengReplaceBanner1 == "number") this.vivoAdConf_csjc.yuanshengReplaceBanner1_csjc = vivoAdConf.yuanshengReplaceBanner1;
            if (typeof vivoAdConf.yuanshengReplaceBanner2 == "number") this.vivoAdConf_csjc.yuanshengReplaceBanner2_csjc = vivoAdConf.yuanshengReplaceBanner2;
            if (typeof vivoAdConf.yuanshengReplaceBannerCloseOpenBanner == "number") this.vivoAdConf_csjc.yuanshengReplaceBannerCloseOpenBanner_csjc = vivoAdConf.yuanshengReplaceBannerCloseOpenBanner;
            if (typeof vivoAdConf.yuanshengGameOver == "number") this.vivoAdConf_csjc.yuanshengGameOver_csjc = vivoAdConf.yuanshengGameOver;
            if (typeof vivoAdConf.addToDesktop == "number") this.vivoAdConf_csjc.addToDesktop_csjc = vivoAdConf.addToDesktop;
        }
        //下面是自定义的字段
    }
    /* 杀死游戏进程的工具,鱼死网破时使用,千万注意 */
    public gameKiller_csjc: number = 0;
    //骚操作游戏版本
    public version_csjc: string = "0.0.0";
    //城市屏蔽列表
    public blockCitys_csjc: Array<string> = ["北京市", "成都市", "深圳市", "上海市", "深圳市"];
    //所有下一步按钮延迟出现的时间
    public btnShowTimer_csjc: number = 0;
    //所有误点按钮上移的时间
    public btnMoveTimer_csjc: number = 0;
    //所有误点Banner上移的时间
    public bannerMoveTimer_csjc: number = 0;
    //微信端开关字段
    public readonly wxConf_csjc = new wxConf_csjc()
    //Oppo端开关字段
    public readonly oppoConf_csjc = new oppoConf_csjc();
    //QQ端开关字段    
    public readonly qqConf_csjc = new qqConf_csjc();
    //TT端开关字段        
    public readonly ttConf_csjc = new ttConf_csjc();
    //vivo广告字段
    public readonly vivoAdConf_csjc = new vivoConf_csjc();
    //下面是自定义的字段
}

export class wxConf_csjc {
    //当前游戏的版本
    public versions_csjc: string = "0.0.0";
    //所有导出广告的开关,true为有导出广告
    public adSwitch_csjc: number = 0;
    //是否打开微信banner,true为有微信banner
    public wxBanner_csjc: number = 0;
    //误点狂点功能总开关
    public wudian_csjc: number = 0;
    //Banner失败创建的个数
    public bannerCreateFailNum_csjc: number = 3;
    //Banner每天最大创建次数
    public bannerTodayBannerMax_csjc: number = 10;
    //微信GridAd列表
    public wxGridAds_csjc: Array<string> = [];
    //审核屏蔽的场景值，通过这些场景值进来的审核人员看不到某些敏感的功能
    public examineSceneList_csjc: Array<number> = [
        1005, 1006, 1011, 1012, 1013, 1014, 1017, 1019,
        1020, 1023, 1024, 1025, 1030, 1031, 1032, 1036,
        1042, 1047, 1048, 1049, 1053, 1102, 1129];
    //微信banner列表
    public wxWuDianBanners_csjc: Array<string> = [];
    /*     //买量功能的总开关，为了让通过买量进来的审核人员看不见广告
        public maiLiangBlock: number = 1;
        //买量功能的的场景值，为了让通过买量进来的审核人员看不见广告
        public maiLiangSceneList: Array<number> = [
            1011, 1012, 1013, 1017, 1025, 1031, 1032, 1047,
            1048, 1049, 1072
        ] */
}

export class qqConf_csjc {

}

export class vivoConf_csjc {
    public yuanshengSwitch_csjc: number = 0;
    public yuanshengWudian_csjc: number = 0;
    public yuanshengBtnShowTime_csjc: number = 0;
    public yuanshengReplaceBanner1_csjc: number = 0;
    public yuanshengReplaceBanner2_csjc: number = 0;
    public yuanshengReplaceBannerCloseOpenBanner_csjc: number = 0;
    public yuanshengGameOver_csjc: number = 0;
    public addToDesktop_csjc: number = 0;
}

export class oppoConf_csjc {
    public yuanshengSwitch_csjc: number = 0;//单独原生界面是否会出现
    public yuanshengWudian_csjc: number = 0;//原生广告关闭按钮误点概率
    public yuanshengBtnShowTime_csjc: number = 0;//单独原生界面关闭按钮出现时间
    public yuanshengReplaceBanner1_csjc: number = 0;//废除无用
    public yuanshengReplaceBanner2_csjc: number = 0;//废除无用
    public yuanshengReplaceBannerCloseOpenBanner_csjc: number = 0;//废除无用
    public yuanshengGameOver_csjc: number = 0;//游戏结束时是否强制跳转原生
    public yuanshengGameOverLevel_csjc: number = 0;//游戏结束时是否强制跳转原生
    public addToDesktop_csjc: number = 0;//是否自动添加到桌面
    public bannerWudian1_csjc: number = 0;//强力开局误点
    public bannerWudian2_csjc: number = 0;//游戏中结局狂点
    public bannerWudian3_csjc: number = 0;//结算页误点
    public bannerWudian4_csjc: number = 0;//重生页误点
    public bannerWudian5_csjc: number = 0;//皮肤页误点
}

export class ttConf_csjc {
    public AbVerSwitch_csjc = 1;
    public exportSwitch_csjc: number = 0;
}