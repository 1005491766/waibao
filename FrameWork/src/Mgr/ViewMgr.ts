
import ViewBase_csjc from "../View/ViewBase";

export enum ViewDef_csjc {
    None = "",
    TipsView = "View/TipsView.json",
    MainGameView = "View/Game/MainGameView.json",
    InGameView = "View/Game/InGameView.json",
    SelectHero = "View/Game/SelectHero.json",

    GameOverView = "View/Game/GameOverView.json",
    Export1AdView = "View/Game/Export1AdView.json",
    Export2AdView = "View/Game/Export2AdView.json",
    Export3AdView = "View/Game/Export3AdView.json",
    GameOverWinView = "View/Game/GameOverWinView.json",
    GameOverFailView = "View/Game/GameOverFailView.json",
    TestAdvisementView = "View/TestAdvisementView.json",
    //todo:添加你的界面
    SignInView = "View/Game/SignInView.json",
    ReviveView = "View/Game/ReviveView.json",
    GetSkinView = "View/Game/GetSkinView.json",
    SuperStartView = "View/Game/SuperStartView.json",
    OppoNativeAd = "View/OPPO/OppoNativeAdView.json",
    HExport1AdView = "View/Game/HExport1AdView.json",
    HExport2AdView = "View/Game/HExport2AdView.json",
    FriendExportView = "View/Game/FriendExportView.json",
    TutorialView = "View/Game/TutorialView.json",
    KdBannerView = "View/Game/KdBannerView.json",
}

//界面管理器
export default class ViewMgr_csjc {
    public static readonly instance_csjc: ViewMgr_csjc = new ViewMgr_csjc();
    protected readonly _views_csjc: any = {};

    public openView_csjc(viewType: ViewDef_csjc, data?: any, oncomplate?: Function): void {
        if (this._views_csjc[viewType]) {
            var view = this._views_csjc[viewType];
            let coms = view._components;
            let viewBase: ViewBase_csjc = null;
            if (coms) {
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if (element._viewBase) {
                        viewBase = element as ViewBase_csjc
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
            return;
        }
        var viewUrl = String(viewType)
        var self = this;
        Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner: any) {
            Laya.stage.addChild(owner);
            var view = owner as Laya.View;
            self._views_csjc[viewType] = view;
            let coms = owner._components;
            let viewBase: ViewBase_csjc = null;
            if (coms) {
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if (element._viewBase) {
                        viewBase = element as ViewBase_csjc;
                        element._viewDef = viewType;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
        }));
    }

    public closeView_csjc(viewType: ViewDef_csjc) {
        var view: Laya.View = this._views_csjc[viewType];
        if (view) {
            var owner = view as any;
            let coms = owner._components;
            if (coms) {
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if (element._viewBase) {
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this._views_csjc[viewType] = null;
        }
    }

    public showView_csjc(viewType: ViewDef_csjc) {
        var view = this._views_csjc[viewType];
        if (view) {
            let coms = view._components;
            if (coms) {
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if (element._viewBase) {
                        element.show();
                        break;
                    }
                }
            }
        }
    }

    public hideView_csjc(viewType: ViewDef_csjc) {
        var view = this._views_csjc[viewType];
        if (view) {
            let coms = view._components;
            if (coms) {
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if (element._viewBase) {
                        element.hide();
                        break;
                    }
                }
            }
        }
    }

    public getView_csjc(viewType: ViewDef_csjc): Laya.View {
        return this._views_csjc[viewType];
    }

    public showTips_csjc(msg: string) {
        this.openView_csjc(ViewDef_csjc.TipsView, msg);
    }
}