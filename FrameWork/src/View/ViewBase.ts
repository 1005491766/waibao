import ViewMgr_csjc, { ViewDef_csjc } from "../Mgr/ViewMgr";
import EventMgr_csjc from "../Event/EventMgr";
import { EventDef_csjc } from "../Event/EventDef";
import Utilit from "../Utilit";
import IViewStateListener_csjc, { isIViewStateListener_csjc } from "./IViewStateListener";


//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class ViewBase_csjc extends Laya.Script 
{
    public onCloseEvent : Function = null;
    public onOpenEvent : Function = null;
    
    protected readonly _viewBase : boolean  = true
    protected _viewDef : ViewDef_csjc = ViewDef_csjc.None;
    protected _data : any = {};

    onAwake(): void {
        //删除时自动释放
        (this.owner as Laya.View).autoDestroyAtClosed = true;
        (this.owner as Laya.View).height = Laya.stage.height;
    }

    onEnable(): void {
        this.addEvent();
    }
    onDisable(): void {
        this.removeEvent();
    }
    onDestroy(): void {
        this.removeEvent();
    }
    
    public openView(data?: any): void {
        this._data = data;
        this.show()
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnViewOpen_csjc,{view:this._viewDef})
        if(this.onOpenEvent)
        {
            this.onOpenEvent();
        }
    }

    public addEvent() {

    }

    public removeEvent() {
        Laya.timer.clearAll(this);
    }

    public closeView() 
    {
        ViewMgr_csjc.instance_csjc.closeView_csjc(this._viewDef);
    }

    public hide()
    {
        (this.owner as Laya.View).visible = false;
        this.onHide();
        Utilit.forEachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener_csjc(element))
                    {
                        (element as IViewStateListener_csjc).onViewHide(this);
                    }
                }
            }
        })
    }

    public show()
    {
        (this.owner as Laya.View).visible = true;
        this.onShow();
        Utilit.forEachChild(this.owner,(child : Laya.Node)=>
        {
            let coms = (child as any)._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(isIViewStateListener_csjc(element))
                    {
                        (element as IViewStateListener_csjc).onViewShow(this);
                    }
                }
            }
        })
    }

    public viewIsHide()
    {
        return (this.owner as Laya.View).visible;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr_csjc.dispatch_csjc(EventDef_csjc.Game_OnViewClose_csjc,{view:this._viewDef})
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}