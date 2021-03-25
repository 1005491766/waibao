import GameSettings_csjc from "../../GameSettings";
import { GameSwitchForm_csjc } from "./GameSwitchForm";

export default class GameSwitch_csjc {
    //当前的appConfig对象
    private static _currentConfig: GameSwitchForm_csjc = new GameSwitchForm_csjc();
    public static get CurrentConfig(): GameSwitchForm_csjc {
        return GameSwitch_csjc._currentConfig;
    }

    /**
     * 调用在线版本的appConfig
     * 
     * @static
     * @param {Function} completeFunc 
     * @memberof GameSwitch
     */
    public static UpdateOnlineConfig_csjc(completeFunc: Function) {
        let serverUrl = GameSettings_csjc.RemoteServerUrl_csjc + "/json/gameswitch.json";
        console.log("调用在线版本的appConfig", serverUrl);
        Laya.loader.load(serverUrl, Laya.Handler.create(GameSwitch_csjc, (res) => {
            if (res) {
                this._currentConfig.initOptions_csjc(res);
                console.log(this._currentConfig);
                if (completeFunc) {
                    completeFunc();
                }
            }
        }))
    }

    /**
     * 调用本地测试版本的appConfig
     * 
     * @static
     * @param {Function} completeFunc 
     * @memberof GameSwitch
     */
    public static UpdateLocalConfig_csjc(completeFunc: Function) {
        let serverUrl = GameSettings_csjc.LocalServerUrl_csjc + "/json/gameswitch.json";
        console.log("调用本地版本的appConfig", serverUrl);
        Laya.loader.load(serverUrl, Laya.Handler.create(GameSwitch_csjc, (res) => {
            if (res) {
                this._currentConfig.initOptions_csjc(res);
                console.log(this._currentConfig);
                if (completeFunc) {
                    completeFunc();
                }
            }
        }))
    }
}