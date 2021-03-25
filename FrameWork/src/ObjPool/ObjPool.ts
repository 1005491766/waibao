import IObj_csjc from "./IObj";

export default class ObjPool_csjc 
{
    protected readonly _pool_csjc : Array<IObj_csjc> = new Array<IObj_csjc>();

    protected _createCaller_csjc : any = null;
    protected _createFunc_csjc : Function = null;

    //从对象池中获取对象,如果不传入key，则直接返回池中最后一个对象
    //如果对象池为空，并没有 create 函数，则返回 null
    //如果对象池为空，有 create 函数，则调用  create 实例化对象并返回。
    public get_csjc(key? : any) : IObj_csjc
    {
        var obj : IObj_csjc = null;
        if(null == key)
        {
            obj = this._pool_csjc.pop();
        }
        else
        {
            for(var i=0;i < this._pool_csjc.length;++i)
            {
                if(this._pool_csjc[i].OP_Key_csjc() == key)
                {
                    obj = this._pool_csjc[i];
                    this._pool_csjc.splice(i,1);
                    break;
                }
            }
        }

        if(obj)
        {
            obj.OP_Init_csjc();
        }
        else
        {
            if(this._createFunc_csjc)
            {
                obj = this._createFunc_csjc.call(this._createCaller_csjc,[key])
                obj.OP_Init_csjc();
            }
        }
        return obj;
    }

    //回收对象
    public recover_csjc(o : IObj_csjc)
    {
        o.OP_Reset_csjc();
        for(var i=0;i < this._pool_csjc.length;++i)
        {
            if(this._pool_csjc[i] == o)
            {
                return;
            }
        }
        this._pool_csjc.push(o);
    }

    //清空对象池
    public clear_csjc()
    {
        for(var i=0;i < this._pool_csjc.length;++i)
        {
            this._pool_csjc[i].OP_OnClear_csjc();//调用对象的清理函数，释放对象自身维护的资源
        }
        this._pool_csjc.splice(0);
    }

    public setCreateFunc_csjc(caller : any,createFunc : Function)
    {
        this._createCaller_csjc = caller;
        this._createFunc_csjc = createFunc;
    }
}