export enum EventDef_csjc 
{
    None_csjc = 0,
    App_CloseFirstLoadingView_csjc = 500,
    AD_OnShareAdFail_csjc = 501,

    //当界面打开
    Game_OnViewOpen_csjc = 600,//{view : ViewDef}
    //当界面关闭
    Game_OnViewClose_csjc = 601,//{view : ViewDef}
    //当玩家金币变动
    Game_OnUserMoneyChange_csjc = 701,//{curr:number,last:number}
    //当玩家钻石变动
    Game_OnUserCrystalChange_csjc = 702,//{curr:number,last:number}
    //当关卡开始
    Game_OnLevelStart_csjc = 1000,
    //当关卡结束
    Game_OnLevelComplate_csjc = 1001,
    //当游戏关卡加载完毕
    Game_GameSceneLoadCompelete_csjc = 1002,
    //误点预加载完毕
    AD_WudianBanner_LoadComplete_csjc = 2217,
    //显示误点Banner
    AD_WudianBanner_Show_csjc = 2218,
    //影藏误点Banner
    AD_WudianBanner_Hide_csjc = 2219,
    //预加载Banner
    AD_WudianBanner_PreLoad_csjc =2220,    
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    AD_SidePopViewSwitch_csjc = "AD_SidePopViewSwitch_csjc",
    AD_ShowNativeAd = "AD_ShowNativeAd",
    Game_Input_csjc = "Game_Input",
    Camera_Event_csjc = "Camera_Event",
    Game_ShowScore_csjc = "Game_ShowScore",
    ChangeSkin = "ChangeSkin",
    SkinView = "SkinView",
    TransformEvent ="TransformEvent",
    /**
     * 英雄选择完毕
     */
    SelectHero ="SelectHero",

    EnemyDead = "EnemyDead",
    EnemyLock = "EnemyLock",
    CharacterFalling  = "CharacterFalling",
    CharacterClimbing  = "CharacterClimbing",
    CharacterNormal  = "CharacterNormal",
    GameOver  = "GameOver",
    AD_OnShareAdSuccess_csjc = "AD_OnShareAdSuccess_csjc",    
}