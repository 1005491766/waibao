import { HttpTools } from "./HttpUnit";
import GameSettings_csjc from "../GameSettings";
import User_csjc from "../User/User";
import WXAPI_csjc from "../PlatformApi/WXAPI";
import TmAPI from "../TmAPI/TmAPI";
import EventMgr_csjc from "../Event/EventMgr";
import { EventDef_csjc } from "../Event/EventDef";
import EventMgr from "../Event/EventMgr";

/** 组件样式 */
export enum ComponentStyle {
    ce_la_lan = 1, //侧拉栏
    h_slider = 2, //左右横向滑动
    banner = 3, //banner
    big_export_ui = 4, //大导出页
    over_ui = 5, //结束页
    wei_tui_chu = 6, //伪退出s
}

/** APP操作记录 */
export class APPItemRecord {
    /** 广告游戏appId */
    public exportProductId: string;
    /** 出现的位置编号记录 */
    public locationCode: string;
    /** 展示次数 */
    public displayCount: number = 0;
    /** 点击次数 */
    public clickCount: number = 0;
    /** 导出次数 */
    public exportCount: number = 0;
    /** 是否成功导出 1已导出 */
    public isExport: number = 0;
}

/** APP信息 */
export class APPItem {
    /**动图序列帧 */
    public gifList: Array<string> = [];
    /** 插屏图片列表 */
    public screenList: Array<string> = [];
    /** 游戏名称 */
    public gameName: string;
    /** banner图片列表 */
    public bannerList: Array<string> = [];
    /** 广告游戏appId */
    public appId: string;
    /** 路径地址 */
    public advertPath: string;
    /** 权重 */
    public weight: number = 1;
    // /** icon图片列表 */
    public iconFilletList: Array<string> = [];
    /** 广告id */
    public advertId: number;
    /** 展示次数 */
    public displayCount: number = 0;
    /**使用的图片资源，length为1表示静图，>1表示使用gift */
    public useImgList: Array<string> = [];
}


export class AdDataMgr {

    private static _instance: AdDataMgr;

    public static get Instance(): AdDataMgr {
        if (this._instance == null) {
            this._instance = new AdDataMgr();
        }
        return this._instance;
    }

    private mAppId: string = ''; //产品的appid
    private mOpenId: string = ''; //用户的openid
    private mProductId: number = 0; //产品id
    private mServerRootUrl: string = '"https://qp.qingpukj.com:8055/'; //游戏服务器接口url根路径

    protected _canUsedStyle: Array<ComponentStyle> = []; // 可开启的导出组件类型 (ComponentStyle)
    protected _products: Array<APPItem> = []; // 全产品信息 
    protected _isCheck: boolean = false; // 是否已过审

    protected _loaded: boolean = false; //数据加载成功

    protected shareCount = 0;
    /** style导出次数 */
    private _materiaList: APPItemRecord[] = [];
    /** 导出产品记录 */
    private _exportProductList: { productId: string, clickCount: number }[] = [];

    /** 上报数据 */
    protected _url_matrixReport = "reportGame/matrixReport";

    /** 记录 */
    protected _recording = false;

    public InitMatix(callback?: Function, serverRootUrl: string = "https://qp.qingpukj.com:8055/") {
        this.mAppId = GameSettings_csjc.AppID_csjc;
        this.mServerRootUrl = serverRootUrl;
        this.Init(callback || null);
    }

    private Init(callback?: Function, shareUser: string = '') {
        var self = this;
        this.LoadInfo(shareUser, function (res) {
            setInterval(() => {
                self.UpdateRecord();
            }, 30000);
            callback && callback(res);
        });
    }

    /** 加载配置 */
    private LoadInfo(shareUser: string, callback?: Function) {
        var self = this;
        let option = WXAPI_csjc.getLaunchOptionsSync_csjc();
        let sceneCode = option.scene;
        let sceneAppId = '';
        if (option.referrerInfo && option.referrerInfo.appId) sceneAppId = option.referrerInfo.appId;
        let url = self.mServerRootUrl + 'business/product/game/getProductInfo';
        let paramsObj: any = {};
        paramsObj.appId = GameSettings_csjc.AppID_csjc;
        paramsObj.code = User_csjc.code_csjc;
        paramsObj.sceneCode = sceneCode;
        paramsObj.sceneAppId = sceneAppId;
        paramsObj.shareUser = shareUser;
        let paramsMsg = AdDataMgr.Instance.GetParamsMsgForObj(paramsObj);
        HttpTools.Post(url, paramsMsg, this, (data) => {
            console.log("[Matrix]读取服务矩阵数据：", data);
            if (data && data.code == 0) {
                self._canUsedStyle = [];
                let canUseStringStyle = data.styleAssembly.split(",");
                for (let i = 0; i < canUseStringStyle.length; ++i) {
                    self._canUsedStyle.push(Number(canUseStringStyle[i]));
                }
                self.mProductId = data.productId;
                self._isCheck = (Number(data.isCheck) == 1);  //1通过，2不通过 (string类型)
                self._products = [];
                if (!data.productExportList) {
                    self._loaded = false;
                    return;
                }
                for (let i = 0; i < data.productExportList.length; i++) {
                    let app = data.productExportList[i];
                    let productInfo: APPItem = new APPItem();
                    productInfo.screenList = app.screenList;
                    productInfo.gifList = app.gifList;
                    productInfo.gameName = app.gameName;
                    productInfo.bannerList = app.bannerList;
                    productInfo.appId = app.appId;
                    productInfo.advertPath = app.advertPath;
                    productInfo.weight = app.weight;
                    productInfo.iconFilletList = app.iconFilletList;
                    productInfo.advertId = app.advertId;
                    productInfo.displayCount = 0;
                    self._products.push(productInfo);
                }
                if (User_csjc.openId_csjc == "") {
                    this.mOpenId = data.openId;
                    User_csjc.openId_csjc = this.mOpenId;
                }
                console.error("矩阵列表", this._products);
                self._loaded = true;
            }
            this.loadAllLink();
            callback && callback(data);
        }, (data) => {
            if (true/* PlatformManager.Instance.CurrentAgent.ContentName == "Default" */) {
                self._products = []
                for (let i = 0; i < 10; i++) {
                    let data1 = {
                        advertId: 233,
                        advertPath: "?wxgamecid=CCBgAAoXkpQAM2KVNXRf9BKQ",
                        appId: "wxc5d17fdf515fbbc2",
                        bannerList: ["https://hn.g58mall.com/gameDevopsImgs/20200915/20200915104328_he7v.jpg"],
                        displayCount: 0,
                        gameName: "香肠大决斗",
                        gifList: [],
                        iconFilletList: ["https://hn.g58mall.com/gameDevopsImgs/20201022/20201022162732_utao.jpg", "https://hn.g58mall.com/gameDevopsImgs/20201022/20201022162744_58vd.png"],
                        screenList: ["https://hn.g58mall.com/gameDevopsImgs/20200915/20200915104244_kepk.jpg", "https://hn.g58mall.com/gameDevopsImgs/20200917/20200917160524_hxbi.png"],
                        useImgList: [],
                        weight: 10
                    }
                    self._products.push(data1);
                }
                self._loaded = true;
                this.loadAllLink();
            }
            callback && callback(data);
        });
    }

    /** 应用跳转 */
    public NavigateTo(style: ComponentStyle, data: APPItem, _success?: Function, _fail?: Function) {
        AdDataMgr.Instance.AddClickRecord(style, data);
        WXAPI_csjc.navigateToMiniProgram_csjc(
            data.appId,
            data.advertPath,
            (res) => {
                AdDataMgr.Instance.AddOpenRecord(style, data, true);
                AdDataMgr.Instance.UpdateRecord();
                EventMgr.dispatch_csjc(EventDef_csjc.AD_OnShareAdSuccess_csjc, style);
                if (_success) _success(res);
            },
            (res) => {
                console.log(res.errMsg);
                EventMgr_csjc.dispatch_csjc(EventDef_csjc.AD_OnShareAdFail_csjc);
                if (_fail) _fail(res)
            },
            (res) => { }
        );
    }

    /** 获取通用组件数据
    * style： 控件类型
    * count： 生成数量
    * return：没有数据时返回空数组
    */
    // public GetDataByStyleAndCount(style: ComponentStyle, count: number): Array<APPItem> {
    //     let result: APPItem[] = [];
    //     if (!this._products || this._products.length == 0) return result;
    //     if (!this.CanUseStyle(style)) return result;
    //     if (!this._loaded) return result;

    //     let libs: APPItem[] = [];
    //     for (let i = 0; i < this._products.length; i++) {
    //         libs[i] = this._products[i];
    //     }
    //     let usedImgsArray: Array<string> = [];
    //     let useGifAdIdsArray: Array<string> = [];

    //     let loopCount = 0;
    //     while (result.length < count && libs.length > 0 && loopCount < count * 50) {
    //         ++loopCount;
    //         let index = AdDataMgr.Instance.GetRandomByWeight(libs);
    //         let randData = JSON.parse(JSON.stringify(libs[index]));
    //         let isCanUseGif = (useGifAdIdsArray.indexOf(randData.appId) == -1);
    //         let useImgUrls = AdDataMgr.Instance.GetUseImgUrl(style, randData, isCanUseGif, usedImgsArray);
    //         if (useImgUrls.length > 0) {
    //             randData.useImgList = useImgUrls;
    //             result.push(randData);
    //             if (useImgUrls.length == 1) {
    //                 usedImgsArray.push(useImgUrls[0]);
    //             }
    //             else {
    //                 useGifAdIdsArray.push(randData.appId);
    //             }

    //         }
    //         else {
    //             libs.splice(index, 1);
    //         }
    //     }
    //     result = this.RepetitionArr(result);
    //     return result;
    // }

    /** 获取通用组件数据
    * style： 控件类型
    * count： 生成数量
    * return：没有数据时返回空数组
    */
    public GetDataByStyleAndCount(style: ComponentStyle, count: number): Array<APPItem> {
        // cc.error('style ===>', style, count);
        let result: APPItem[] = [];
        if (!this._products || this._products.length == 0) return result;
        // if (!this.canUseStyle(style)) return result;
        if (!this._loaded) return result;
        let arr = [4];
        if (this.screenList.length < count || this.iconList.length < count) this.loadAllLink();
        if (style == 3) {
            result = this.bannerList.splice(0, count);
        } else if (arr.indexOf(style) > -1) {
            result = this.screenList.splice(0, count);
        } else {
            result = this.iconList.splice(0, count);
        }
        this.AddShowRecord(style);
        // cc.error('res ==', result);
        return result;
    }

    iconList = [];
    screenList = [];
    bannerList = [];
    iconNames = [];
    screenNames = [];
    public loadAllLink() {
        this.iconList = [];
        this.screenList = [];
        // this.iconNames = [];
        // this.screenNames = [];
        for (let i = 0; i < this._products.length; i++) {
            let appItem: APPItem = this._products[i];
            appItem.iconFilletList.sort((a, b) => Math.random() - 0.5);
            appItem.screenList.sort((a, b) => Math.random() - 0.5);
        }
        for (let i = 0; i < 4; i++) {
            let _iconList1 = [];
            let _iconList2 = [];
            let _screenList1 = [];
            let _screenList2 = [];
            for (let j = 0; j < this._products.length; j++) {
                let appItem = JSON.parse(JSON.stringify(this._products[j]));
                if (appItem.iconFilletList[i]) {
                    appItem = JSON.parse(JSON.stringify(this._products[j]));
                    appItem.useImgList = [appItem.iconFilletList[i]];
                    j > this._products.length / 2 ? _iconList1.push(appItem) : _iconList2.push(appItem);
                    // this.iconNames.push({gameName: appItem.gameName, useImgList: appItem.useImgList});
                }
                if (appItem.screenList[i]) {
                    appItem = JSON.parse(JSON.stringify(this._products[j]));
                    appItem.useImgList = [appItem.screenList[i]];
                    j > this._products.length / 2 ? _screenList1.push(appItem) : _screenList2.push(appItem);
                    // this.screenNames.push({gameName: appItem.gameName, useImgList: appItem.useImgList});
                }
                if (appItem.bannerList[i]) {
                    appItem = JSON.parse(JSON.stringify(this._products[j]));
                    appItem.useImgList = [appItem.bannerList[i]];
                    this.bannerList.push(appItem)
                }
            }
            _iconList1.sort((a, b) => Math.random() - 0.5);
            _iconList2.sort((a, b) => Math.random() - 0.5);
            _screenList1.sort((a, b) => Math.random() - 0.5);
            _screenList2.sort((a, b) => Math.random() - 0.5);
            this.bannerList.sort((a, b) => Math.random() - 0.5);
            this.iconList = this.iconList.concat(_iconList1, _iconList2);
            this.screenList = this.iconList.concat(_screenList1, _screenList2);
        }
        // console.log('this.iconList ==>', this.iconList);
        // console.log('this.screenList ==>', this.screenList);
        // console.log('this.iconNames ==>', this.iconNames);
        // console.log('this.screenNames ==>', this.screenNames);
    }

    private RepetitionArr(list: Array<APPItem>) {
        let data: any = {};
        for (let index = 0; index < list.length; index++) {
            let app: APPItem = list[index];
            let array: Array<APPItem> = data[app.appId];
            if (!array) {
                array = [];
            }
            array.push(app);
            data[app.appId] = array;
        }

        let apps = [];
        for (let index = 0; index < 5; index++) {
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let element: Array<APPItem> = data[key];
                    let appitem = element[index];
                    if (appitem) {
                        apps.push(element[index]);
                    }
                }
            }
        }
        return apps;
    }

    // 获取广告在特定位置的图片路径集合
    public GetUseImgUrl(style: ComponentStyle, data: APPItem, isCanUseGif: boolean, ginoreUrls: Array<string>): Array<string> {
        if (!data) {
            return [];
        }
        let giftList: Array<string> = [];
        if (this.GetIsCanUseGifByStyle(style) && isCanUseGif && data.gifList && data.gifList.length > 0) {
            giftList = data.gifList;
        }

        let iconsArray: Array<any> = [];
        switch (style) {
            case ComponentStyle.ce_la_lan:
                iconsArray = data.screenList;
                break;
            case ComponentStyle.big_export_ui:
                iconsArray = data.screenList;
                break;
            case ComponentStyle.banner:
                iconsArray = data.bannerList;
                break;
            case ComponentStyle.h_slider:
                iconsArray = data.iconFilletList;
                break;
            case ComponentStyle.over_ui:
                iconsArray = data.iconFilletList;
                break;
        }

        let targetNum = 0.5;
        if (giftList.length == 0) {
            targetNum = 1.1;
        }
        let randValue = Math.random();
        if (randValue > targetNum) {
            return giftList;
        }
        if (iconsArray.length == 0) {
            return [];
        }

        let canUseImgArray: Array<string> = [];
        for (let i = 0; i < iconsArray.length; ++i) {
            if (ginoreUrls.indexOf(iconsArray[i]) == -1) {
                canUseImgArray.push(iconsArray[i]);
            }
        }

        if (canUseImgArray.length == 0) {
            return [];
        }

        let randIndex = Math.floor(Math.random() * canUseImgArray.length);
        return [canUseImgArray[randIndex]];
    }

    /** 根据权重随机 */
    public GetRandomByWeight(arr: APPItem[]): number {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i].weight;
        }
        let r = Math.floor(Math.random() * total);
        let index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (i > 0) {
                r -= arr[i - 1].weight;
            }
            if (r < arr[i].weight) {
                index = i;
                break;
            }
        }
        return index;
    }

    public GetIsCanUseGifByStyle(style: ComponentStyle): boolean {
        return (style == ComponentStyle.ce_la_lan || style == ComponentStyle.big_export_ui || style == ComponentStyle.h_slider);
    }

    private GetParamsMsgForObj(paramsObj: any): string {
        let res = [];
        for (var key in paramsObj) {
            res.push(key + '=' + paramsObj[key]);
        }
        return res.join('&');
    }

    /** 保存展示次数 */
    public AddShowRecord(style: ComponentStyle) {
        let isHased = false;
        for (let i = 0; i < this._materiaList.length; i++) {
            let ml = this._materiaList[i];
            if (style == Number(ml.locationCode)) {
                this._materiaList[i].displayCount++;
                isHased = true;
            }
        }
        if (!isHased) {
            let ml = new APPItemRecord();
            ml.locationCode = "" + style;
            ml.displayCount = 1;
            ml.clickCount = 0;
            ml.isExport = 0;
            ml.exportCount = 0;
            ml.exportProductId = "";
            this._materiaList.push(ml);
        }
    }

    /** 保存点击次数 */
    public AddClickRecord(style: ComponentStyle, data: APPItem) {
        let isHased = false;
        for (let i = 0; i < this._exportProductList.length; i++) {
            let epl = this._exportProductList[i];
            if (data.advertId == Number(epl.productId)) {
                this._exportProductList[i].clickCount++;
                isHased = true;
            }
        }
        if (!isHased) {
            let epl = {
                productId: "" + data.advertId,
                clickCount: 1
            }
            this._exportProductList.push(epl);
        }
        for (let i = 0; i < this._materiaList.length; i++) {
            let ml = this._materiaList[i];
            if (style == Number(ml.locationCode)) {
                this._materiaList[i].clickCount++;
            }
        }
    }

    /** 保存导出数据 */
    public AddOpenRecord(style: ComponentStyle, data: APPItem, success: boolean) {
        for (let i = 0; i < this._materiaList.length; i++) {
            let ml = this._materiaList[i];
            if (style == Number(ml.locationCode)) {
                if (success) {
                    this._materiaList[i].exportCount++;
                    this._materiaList[i].exportProductId = data.advertId + "";
                    this._materiaList[i].isExport = 1;
                    break;
                }
            }
        }
    }

    /** 上报数据 */
    protected UpdateRecord() {
        if (this._recording) {
            console.log('[Matrix]数据上报中');
            return;
        }
        if ((this._exportProductList.length <= 0 && !this.CheckMateria())) {
            console.log('[Matrix]数据无变更，不需要上报');
            return;
        }

        this._recording = true;
        let params = {
            openId: User_csjc.openId_csjc,
            productId: this.mProductId,
            materiaList: this._materiaList,
            exportProductList: this._exportProductList,
            shareCount: this.shareCount
        };
        if (params.materiaList.length == 0 && params.exportProductList.length == 0 && params.shareCount == 0) {
            return;
        }
        console.log("[Matrix]上传数据到服务器 params:\n", JSON.stringify(params));
        var url = this.mServerRootUrl + 'reportGame/matrixReport';
        HttpTools.PostJson(url, params, this, (data) => {
            console.log("[Matrix]上传数据到服务器结果：", JSON.stringify(data));
            if (data != -1 && data.code == 200) {
                this.clearRecord();
            }
            this._recording = false;
        }, null);
    }

    /** 检测数据变动 */
    protected CheckMateria() {
        if (this._materiaList.length <= 0) return false;
        for (let i = 0; i < this._materiaList.length; i++) {
            if (this._materiaList[i].clickCount != 0 ||
                this._materiaList[i].displayCount != 0 ||
                this._materiaList[i].exportCount != 0 ||
                this._materiaList[i].isExport != 0) {
                return true;
            }
        }
        return false;
    }

    /** 清除导出数据 */
    protected clearRecord() {
        for (let i = 0; i < this._materiaList.length; i++) {
            this._materiaList[i].clickCount = 0;
            this._materiaList[i].displayCount = 0;
            this._materiaList[i].exportCount = 0;
            this._materiaList[i].isExport = 0;
        }
        this._exportProductList = [];
        // for (let i = 0; i < this._exportProductList.length; i++) {
        //     this._exportProductList[i].clickCount = 0;
        // }
        this.shareCount = 0;
    }

    /** 是否已过审 */
    public GetIsPassed(): boolean {
        return this._isCheck;
    }

    /** 是否启用该类型 */
    public CanUseStyle(style: ComponentStyle): boolean {
        return this._canUsedStyle.indexOf(style) > -1;
    }
}