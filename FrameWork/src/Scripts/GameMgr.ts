import Utilit from "../Utilit";
import ViewMgr_csjc, { ViewDef_csjc } from "../Mgr/ViewMgr";
import User_csjc from "../User/User";
import EventMgr_csjc from "../Event/EventMgr";
import { EventDef_csjc } from "../Event/EventDef";
import WXAPI_csjc from "../PlatformApi/WXAPI";
import CachedWXBannerAd_csjc from "../PlatformApi/CachedWXBannerAd";
import SkinMgr_csjc from "../Mgr/SkinMgr";
import SceneMgr_csjc from "./GameCore/SceneMgr";
import SoundMgr_csjc from "../Mgr/SoundMgr";
import TmAbTestMgr_csjc from "../TmAPI/TmABTestMgr";
import ExamineMgr from "../CommomAPI/ExamineMgr";
import TmAPI from "../TmAPI/TmAPI";


//游戏管理器，游戏代码的入口
export default class GameMgr_csjc extends Laya.Script {

    private static _instance: GameMgr_csjc = null;
    public static getInstance(): GameMgr_csjc { return GameMgr_csjc._instance; }

    public FirstAd: boolean = false;
    
    constructor() {
        super();
        GameMgr_csjc._instance = this;
    }

    onAwake() {
        if (Laya.Browser.onMiniGame) {
            WXAPI_csjc.SetShareMenu_csjc("", "",
                () => {

                },
                () => {

                },
                () => {

                });
            Laya.Browser.window['wx'].onShow((res) => {
                console.log(`程序返回,参数为${res},场景值${res.scene}`);
                if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.MainGameView) != null
                    || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.InGameView) != null
                    // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartClick1) != null
                    // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartClick2) != null
                    // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SignInView) != null
                    // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.GetSkinView) != null
                    // || ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartView) != null
                ) {
                    SoundMgr_csjc.instance_csjc.playBGM_csjc("Bgm2");
                }
                /* let abtest = TmAbTestMgr_csjc.Instance_csjc.GetABTestByGroupId_csjc(88);
                if (abtest.groupId == 100172) { */
                /* let sceneGood = res.scene == 1037 || res.scene == 1038 || res.scene == 1089;
                let viewGood = ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.InGameView) == null
                    && ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.SuperStartClick) == null;
                console.log(`分享失败打开导出,场景值:${res.scene}`);
                if (sceneGood && viewGood) {
                    if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.Export2AdView) == null) {
                        ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export2AdView);
                    }
                } */
                /* } */
            })
        }
        // WudianMgr.UpdateIpBlockState();
        Laya.SoundManager.useAudioMusic = false;
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_OnShareAdFail_csjc, this, this.ADShareFail);
        EventMgr_csjc.regEvent_csjc(EventDef_csjc.AD_OnShareAdSuccess_csjc, this, this.ShareAdSuccess);
    }

    onStart() {
        this.preCreateGame_csjc();
    }

    private preCreateGame_csjc(): void {
        //todo：这里添加初始化主场景的代码。EventMgr.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        EventMgr_csjc.regOnceEvent_csjc(EventDef_csjc.Game_GameSceneLoadCompelete_csjc, this, () => {
            ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView);
            // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.HExport1AdView);
            // ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.MainGameView, { ShowSkin: false });
            // if (ExamineMgr.CanShowAd_Wx) {
            //     ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export2AdView);
            // }
        })
        this.CreatGameScene();
        this.CreatOpenContext();
    }

    //#region 自己的代码

    /* 当前场景的引用 */
    public GameLose: number = 0;

    private _currentScene: Laya.Scene3D;
    public get CurrentScene(): Laya.Scene3D {
        return this._currentScene;
    }

    /* 当前等级 */

    public get CurrentLevel(): number {
        return User_csjc.getLeveNum_csjc();
    }

    /**
     * 加载下一关游戏场景
     * 
     * @memberof GameManager
     */
    CreatNextGameScene() {
        let lev = User_csjc.getLeveNum_csjc();
        lev++;
        User_csjc.setLeveNum_csjc(lev);
        User_csjc.SaveGameData_csjc();
        this.CreatGameScene();
    }

    /**
     * 加载游戏场景
     * 
     * @memberof GameManager
     */
    CreatGameScene() {
        if (this._currentScene) {
            let directionLight: Laya.DirectionLight = this._currentScene.getChildByName("Directional Light") as Laya.DirectionLight
            directionLight.shadow = false;
            this._currentScene.removeSelf();
            this._currentScene.destroy();
        }
        let url: string = "";
        let tureLev = "1";
        url = "subRes/LayaScene_1/Conventional/" + tureLev + ".ls";
        /* let abtest = TmAbTestMgr_csjc.Instance_csjc.GetABTestByGroupId_csjc(86); */
        // /* if (abtest.groupId == 100166)  */{
        //     console.log("赛道加长");
        //     if (tureLev <= 4) {
        //         url = "subRes/LayaScene_Main/Conventional/" + tureLev + "-1.ls";
        //     }
        //     else {
        //         url = "subRes/LayaScene_Main/Conventional/" + tureLev + ".ls";
        //     }
        // }
        /* else {
            console.log("赛道不加长");
        } */
        Laya.Scene3D.load(url, Laya.Handler.create(this, this.LoadComplete));
    }

    /**
     * 加载完成之后需要执行的方法，包括了
     * 1：初始化赛道
     * 2：初始化玩家控制脚本
     * 
     * @param {Laya.Scene3D} scene 
     * @memberof GameManager
     */
    LoadComplete(scene: Laya.Scene3D) {
        this._currentScene = scene;
        Laya.stage.addChildAt(this._currentScene, 0);
        this._currentScene.addComponent(SceneMgr_csjc);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnLevelStart_csjc);
    }
    //#endregion

    ADShareFail() {
        console.log("AdShareFail");
        /* let abtest = TmAbTestMgr_csjc.Instance_csjc.GetABTestByGroupId_csjc(83);
            console.log("分享失败打开导出");
            if (ExamineMgr.CanShowAd_Wx &&
                ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.Export2AdView) == null &&
                ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.Export1AdView) == null
            ) {
                ViewMgr_csjc.instance_csjc.openView_csjc(ViewDef_csjc.Export2AdView);
            }
        /* else {
            console.log("分享失败不打开导出");
        } */
    }

    private _my_open;
    CreatOpenContext() {
        this._my_open = new Laya.WXOpenDataViewer();
        this._my_open.width = Laya.stage.width;
        this._my_open.height = Laya.stage.height;
    }

    get Context(): Laya.WXOpenDataViewer {
        return this._my_open;
    }

    ShareAdSuccess(style) {
        //首页导出
        if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.MainGameView)) {
            TmAPI.SendEvent("ExportAd", { View: 1, Style: style });
        }
        //游戏页导出
        else if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.InGameView)) {
            TmAPI.SendEvent("ExportAd", { View: 2, Style: style });
        }
        else if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.HExport1AdView)) {
            TmAPI.SendEvent("ExportAd", { View: 3, Style: style });
        }
        else if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.GameOverWinView) ||
            ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.GameOverFailView)
        ) {
            TmAPI.SendEvent("ExportAd", { View: 4, Style: style });
        }
        else if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.FriendExportView)) {
            TmAPI.SendEvent("ExportAd", { View: 5, Style: style });
        }
        else if (ViewMgr_csjc.instance_csjc.getView_csjc(ViewDef_csjc.HExport2AdView)) {
            TmAPI.SendEvent("ExportAd", { View: 6, Style: style });
        }
    }
}
