import GameSwitch from "./GameSwitch/GameSwitch";
import GdIpManager from "./GdIPManager";
import GameSettings_csjc from "../GameSettings";
import GameSwitch_csjc from "./GameSwitch/GameSwitch";
import User_csjc from "../User/User";
import QpGameSwitch from "../QpAPI/QpGameSwitch";
import WXAPI_csjc from "../PlatformApi/WXAPI";

export default class ExamineMgr {
    // public static get CanDoScz_Oppo(): boolean {
    //     let version = (GameSettings_csjc.Versions_csjc == GameSwitch_csjc.CurrentConfig.version_csjc);
    //     let level = User_csjc.getLeveNum_csjc() >= 2;
    //     console.log(`检查更新,当前包体版本:${GameSettings_csjc.Versions_csjc},线上版:${GameSwitch_csjc.CurrentConfig.version_csjc}`);
    //     return version && level;
    // }

    public static get CanDoScz_Wx(): boolean {
        let ip = QpGameSwitch.IsIpPass;
        let sceneId = WXAPI_csjc.getLaunchOptionsSync_csjc().scene;
        let sceneGood = true;
        for (let index = 0; index < QpGameSwitch.GameSwitch.sceneList.length; index++) {
            const sc = QpGameSwitch.GameSwitch.sceneList[index];
            if (sc == sceneId) {
                sceneGood = false;
                break;
            }
        }
        console.log(`当前IP检查地址:${QpGameSwitch.IsIpPass},场景：${sceneId}通过${sceneGood}`);
        return ip && sceneGood;
    }

    public static get CanDoKd_Wx(): boolean {
        let kdSwitch = QpGameSwitch.GameSwitch.wudianSwitch == 1;
        let ip = QpGameSwitch.IsIpPass;
        let sceneId = WXAPI_csjc.getLaunchOptionsSync_csjc().scene;
        let sceneGood = true;
        for (let index = 0; index < QpGameSwitch.GameSwitch.sceneList.length; index++) {
            const sc = QpGameSwitch.GameSwitch.sceneList[index];
            if (sc == sceneId) {
                sceneGood = false;
                break;
            }
        }
        let curTime = new Date().getHours();
        let timeOpen = false;
        for (let index = 0; index < QpGameSwitch.GameSwitch.kuangdianTime.length; index++) {
            const time = QpGameSwitch.GameSwitch.kuangdianTime[index];
            if (time == curTime) {
                timeOpen = true;
                break;
            }
        }
        console.log(`kd开关${kdSwitch}当前IP检查地址:${QpGameSwitch.IsIpPass},场景：${sceneId}通过${sceneGood},当前时间${curTime}打开状态${timeOpen}`);
        return kdSwitch && ip && sceneGood && timeOpen;
    }


    public static get CanShowAd_Wx(): boolean {
        let sceneId = WXAPI_csjc.getLaunchOptionsSync_csjc().scene;
        let sceneGood = true;
        for (let index = 0; index < QpGameSwitch.GameSwitch.sceneList.length; index++) {
            const sc = QpGameSwitch.GameSwitch.sceneList[index];
            if (sc == sceneId) {
                sceneGood = false;
                break;
            }
        }
        console.log(`显示广告场景：${sceneId}通过${sceneGood}`);
        return sceneGood;
    }
    // public static get SceneIsGood(): boolean {
    //     let sceneList = GameSwitch.CurrentConfig.wxConf.examineSceneList;
    //     let scene = WXAPI.getLaunchOptionsSync().scene;
    //     for (let index = 0; index < sceneList.length; index++) {
    //         const element = sceneList[index];
    //         if (scene == element) {
    //             console.log("examineScene", scene, "未通过返回False");
    //             return false;
    //         }
    //     }
    //     console.log("examineScene", scene, "已通过返回True");
    //     return true;
    // }
    // /**
    //  * 敏感功能屏蔽
    //  * 
    //  * @readonly
    //  * @static
    //  * @type {boolean}
    //  * @memberof ExamineMgr
    //  */
    // public static get WudianSceneIpFlag(): boolean {
    //     let wudian = GameSwitch.CurrentConfig.wxConf.wudian == 1 ? true : false;
    //     let ipIsGood = GdIpManager.IpIsPass;
    //     let sceneIsGood = this.SceneIsGood;
    //     let res = wudian && ipIsGood && sceneIsGood;
    //     console.log("WudianFlag总开关为:", res, "wudian:", wudian, "IpIsGood:", ipIsGood, "SceneIsGood", sceneIsGood);
    //     return res;
    // }
    // /**
    //  * 敏感功能屏蔽
    //  * 
    //  * @readonly
    //  * @static
    //  * @type {boolean}
    //  * @memberof ExamineMgr
    //  */
    // public static get WudianIpFlag(): boolean {
    //     let wudian = GameSwitch.CurrentConfig.wxConf.wudian == 1 ? true : false;
    //     let ipIsGood = GdIpManager.IpIsPass;
    //     let res = wudian && ipIsGood;
    //     console.log("WudianIpFlag总开关为:", res, "wudian:", wudian, "IpIsGood:", ipIsGood);
    //     return res;
    // }
}