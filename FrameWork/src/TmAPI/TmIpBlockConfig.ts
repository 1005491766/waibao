import TmAPI from "./TmAPI";
import User_csjc from "../User/User";

/**
 * 进行IP屏蔽的类
 * 
 * @export
 * @class TmIpBlockConfig
 */
export default class TmIpBlockConfig {
    private static _ipIsGood: boolean = false;
    public static get IpIsGood(): boolean {
        return TmIpBlockConfig._ipIsGood;
    }

    /**
     * 调用在线版本的appConfig
     * 
     * @static
     * @param {Function} completeFunc 
     * @memberof TmAppConfig
     */
    public static UpdateConfig() {
        console.log("调用在线版本的IP屏蔽列表");
        TmAPI.getAppJSONConfig("IpBlock", (res) => {
            if (res != null && res instanceof Array) {
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];
                    console.log("当前登录地址为:", User_csjc.city_csjc, "屏蔽列表为:", element, "结果为:", element != User_csjc.city_csjc)
                    if (element != User_csjc.city_csjc) {
                        this._ipIsGood = true;
                    }
                    else {
                        this._ipIsGood = false;
                        break;
                    }
                }
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
    public static UpdateLocalConfig() {
        this._ipIsGood = true;
        console.log("调用本地版本的IP屏蔽列表，IpIsGood结果为", this._ipIsGood);
    }
}