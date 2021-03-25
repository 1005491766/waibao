import ViewBase_csjc from "./ViewBase";

export default interface IViewStateListener_csjc
{
    onViewShow(view : ViewBase_csjc) : void;
    onViewHide(view : ViewBase_csjc) : void;
}

export function isIViewStateListener_csjc(element : any)
{
    if((null != element.onViewShow && typeof(element.onViewShow) == "function")
        && (null != element.onViewHide && typeof(element.onViewHide) == "function") )
    {
        return true;
    }
    return false;
}

