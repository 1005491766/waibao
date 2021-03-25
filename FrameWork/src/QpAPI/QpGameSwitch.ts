import GameSettings_csjc from "../GameSettings";
import HttpUnit_csjc, { requestData_csjc } from "../Net/HttpUnit";

export class sdkcustom {
    wudianSwitch: number = 1;//所有误点狂点的总开关
    export: number = 1;//大导出页面
    endExport: number = 1;//胜利失败后，额外的导出页面
    btnShowTimer: number = 2;//所有下一步按钮延迟出现的时间
    btnMoveTimer: number = 2.5;//所有误点按钮上移的时间
    bannerMoveTimer: number = 1.5;//所有误点Banner上移的时间
    bannerKuangdian1: number = 0;//开局的狂点
    bannerKuangdian2: number = 0;//结束狂点
    bannerWudian: number = 0;//所有界面的误点
    cityList: Array<string> = [];//屏蔽审核的城市列表
    indexPanel: number = 0;//好友热玩功能
    popAd: number = 0;//自动弹导出
    sceneList: Array<number> = [1005, 1006, 1007, 1008, 1011, 1012, 1013, 1014, 1017, 1020, 1023, 1024, 1025,
        1030, 1031, 1032, 1036, 1042, 1044, 1047, 1048, 1049, 1053, 1102];//屏蔽场景值
    kuangdianTime: Array<number> = [11, 12, 13, 14, 18, 19, 20];
    startVideo: number = 0;
    indexAd: number = 1;
}

export default class QpGameSwitch {
    static customkey: sdkcustom = new sdkcustom();
    static getCustomKey(success?: Function) {
        this.httpRequest("https://qp.qingpukj.com:8055/business/product/game/getAttribute", "appid=" + GameSettings_csjc.AppID_csjc, "application/x-www-form-urlencoded", (res) => {
            let key = JSON.parse(res.msg);
            if (key) {
                if (key.wudianSwitch) this.customkey.wudianSwitch = key.wudianSwitch;
                if (key.export) this.customkey.export = key.export;
                if (key.endExport) this.customkey.endExport = key.endExport;
                if (key.btnShowTimer) this.customkey.btnShowTimer = key.btnShowTimer;
                if (key.btnMoveTimer) this.customkey.btnMoveTimer = key.btnMoveTimer;
                if (key.bannerMoveTimer) this.customkey.bannerMoveTimer = key.bannerMoveTimer;
                if (key.bannerKuangdian1) this.customkey.bannerKuangdian1 = key.bannerKuangdian1;
                if (key.bannerKuangdian2) this.customkey.bannerKuangdian2 = key.bannerKuangdian2;
                if (key.bannerWudian) this.customkey.bannerWudian = key.bannerWudian;
                if (key.indexPanel) this.customkey.indexPanel = key.indexPanel;
                if (key.popAd) this.customkey.popAd = key.popAd;
                if (key.cityList) this.customkey.cityList = JSON.parse(key.cityList);
                if (key.sceneList) this.customkey.sceneList = JSON.parse(key.sceneList);
                if (key.kuangdianTime) this.customkey.kuangdianTime = JSON.parse(key.kuangdianTime);
                if (key.startVideo) this.customkey.startVideo =  key.startVideo;
                if (key.indexAd) this.customkey.indexAd =  key.indexAd;
            }
            if (success) success();
        });
    }

    static get IsIpPass(): boolean {
        if (this._city == null) {
            // console.log("不通过,当前地址为空");
        }
        else {
            for (let index = 0; index < this.customkey.cityList.length; index++) {
                const city = this.customkey.cityList[index];
                if (this._city.search(city) > -1) {
                    // console.log("不通过,当前地址为:", this._city, "city:", city);
                    return false;
                }
            }
            // console.log("通过,当前地址为:", this._city);
            return true;
        }
    }

    private static _city: string;
    static UpdateIpCity(success?: Function) {
        this.httpRequest("https://qp.qingpukj.com:8055/business/product/game/getIPArea", "appid=" + GameSettings_csjc.AppID_csjc, "application/x-www-form-urlencoded", (res) => {
            console.log("IP", res);
            if (res && res.area) {
                this._city = res.area;
            }
            if (success) success();
        });
    }

    static get GameSwitch(): sdkcustom {
        return this.customkey;
    }

    static httpRequest(url: string, data: any, content_type: string, complete: Function, method: string = 'POST') {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window['wx'].request({
                url: url, //接口地址
                data: data,
                method: method,
                header: {
                    'content-type': content_type // 默认值
                },
                success(res) {
                    if (complete)
                        complete(res.data);
                    console.log("连接成功", res);
                }, fail(res) {
                    if (complete)
                        complete(null);
                    console.log("连接错误", res);
                }
            })
        }
    }
}