import { requestData_csjc } from "../Net/HttpUnit";
import GameSwitch_csjc from "./GameSwitch/GameSwitch";

export default class GdIpManager_csjc {
    private static readonly url = "https://restapi.amap.com/v3/ip";
    private static readonly key = "81a745fb92f3c3446869b18a51cf50f6";
    private static _currentCity: string;

    /**
     * 当前Ip是否通过
     * 
     * @readonly
     * @static
     * @type {boolean}
     * @memberof GdIpManager
     */
    public static get IpIsPass_csjc(): boolean {
        if (GdIpManager_csjc._currentCity == null) {
            console.log("当前IP未知,返回默认值");
            return false;
        }
        else {
            let blockCitys = GameSwitch_csjc.CurrentConfig.blockCitys_csjc;
            for (let i = 0; i < blockCitys.length; i++) {
                const city = blockCitys[i];
                if (city == GdIpManager_csjc._currentCity) {
                    console.log("当前Ip未通过检查", city);
                    return false;
                }
            }
        }
        console.log("当前Ip已通过检查");
        return true;
    }

    public static UpdateIpState_csjc() {
        if (GdIpManager_csjc.key == null) {
            console.log("高德地图Ip接口没有填写KEY值,接口无法生效");
            return;
        }
        var req = new requestData_csjc();
        req.url = GdIpManager_csjc.url;
        req.onSuccess = (res) => {
            if (res && res.status == "1") {
                if (res.info == "OK" && res.infocode == "10000") {
                    console.log("已获当前地址信息:", res);
                    this._currentCity = res.city
                }
                else {
                    console.log("Ip接口返回错误值:", res);
                }
            }
        }
        req.onFail = (res) => {
            console.log("Ip接口调用错误", res);
        }
        req.meth = "get";
        req.data.key = GdIpManager_csjc.key;
        GdIpManager_csjc.request_csjc(req);
    }

    protected static request_csjc(req: requestData_csjc) {
        if (req.url.indexOf("http://") > -1 || req.url.indexOf("https://") < 0) {
            req.onFail("请求地址不合法");
            return;
        }
        var completeFunc = (res) => {
            console.log(res, "http Success")
            res = JSON.parse(res);
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "http fail")
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, GdIpManager_csjc, completeFunc);
        xhr.once(Laya.Event.ERROR, GdIpManager_csjc, errorFunc);
        var para = "";
        for (const key of Object.keys(req.data)) {
            var value = req.data[key];
            para += key + "=" + value + "&";
        }
        req.url = req.url + "?" + para;
        xhr.send(req.url, null, req.meth, null, null);
    }
}