import ViewBase_csjc from "../ViewBase";
import EventMgr_csjc from "../../Event/EventMgr";
import { EventDef_csjc } from "../../Event/EventDef";

export default class LoadingView_csjc extends Laya.Script
{
    protected _processBarBg_csjc : Laya.Image;
    protected _processBar_csjc : Laya.Image;
    protected _currentProcess_csjc: number;
    protected _processWidth_csjc : number = 0;

    onAwake()
    {
        this._processBarBg_csjc = this.owner.getChildByName("ProcessBarBg") as Laya.Image;
        this._processBar_csjc = this._processBarBg_csjc.getChildByName("ProcessBar") as Laya.Image;
        this._processWidth_csjc = this._processBar_csjc.width;
        EventMgr_csjc.regOnceEvent_csjc(EventDef_csjc.Game_GameSceneLoadCompelete_csjc, this, this.FinishLoading_csjc);
    }

    onUpdate() {
        if (this._processBar_csjc.width < this._currentProcess_csjc) {
            let speed = Math.floor((this._currentProcess_csjc - this._processBar_csjc.width) / 100);
            this._processBar_csjc.width += (5 + speed);
            if (this._processBar_csjc.width > this._currentProcess_csjc) {
                this._processBar_csjc.width = this._currentProcess_csjc;
            }
        }
    }

    onDestroy(){
        EventMgr_csjc.removeEvent_csjc(EventDef_csjc.Game_GameSceneLoadCompelete_csjc, this, this.FinishLoading_csjc);
    }
    
    /**
     * 设置进度
     * 
     * @param {number} process 
     * @memberof LoadingView
     */
    public setProcess_csjc(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        this._currentProcess_csjc = this._processWidth_csjc * process;
    }

    /**
     * 此方法用来关闭loading界面,会先将进度条进度置为1然后停顿100毫秒再消失，给用户一个进度条加载良好的感觉
     * 如果不想用此方法,在其他代码中直接调用EventMgr.dispatch(EventDef.App_CloseFirstLoadingView)即可
     * 
     * @memberof LoadingView
     */
    FinishLoading_csjc(){
        this._processBar_csjc.width = this._processWidth_csjc
        Laya.timer.once(200,this,()=>{
            EventMgr_csjc.dispatch_csjc(EventDef_csjc.App_CloseFirstLoadingView_csjc);
        });
    }
}