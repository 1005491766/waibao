
export default class PoolManager  extends Laya.Sprite3D {

    static _instance:any;
    private node:Laya.Node; //3D物体父节点
    public m_ObjectPoolDic:{[key:number]: Laya.Sprite3D}={}
    constructor() {super();
         this.node=new Laya.Node(); 
         this. node.name="Node"; 
         Laya.stage.addChild(this.node);
        }
    static getInstance() {
    return this._instance || (this._instance = new PoolManager() )
    }
    
    //初始化
    //加载到内存中创建出来之后添加到这里面
    public InitPool(key:number,MeshSprite: Laya.Sprite3D)
    {
        //初始化id对应对象池， 第一次初始化则必须保证池中最少存在1个
        if (this.m_ObjectPoolDic[key]){
        console.log("初始化有误，该值已经有对应的 对象池了");
        }
        else{
        this.m_ObjectPoolDic[key]=(MeshSprite);
        let childNode=new Laya.Node();
        childNode.name=key.toString();
        this.node.addChild(childNode)
        }
    }
    private counter=0
    //按照编号取出对应对象池中的一个物体
    public  DequeueItem(key:number): Laya.Sprite3D {
    if(this.m_ObjectPoolDic[key])
    {
        let childNode=this.node.getChildByName(key.toString())
        // console.log("-------------对象池",this.counter)//this.GetPoolLenght(1))
        if(childNode.numChildren==0){
            let tempobj :Laya.Sprite3D = this.m_ObjectPoolDic[key].clone() as  Laya.Sprite3D;;
             tempobj.name=key.toString();
             this.counter++;
             return tempobj;
        }
        else{
            let tempobj=childNode.getChildAt(0)as  Laya.Sprite3D; ;
            tempobj.removeSelf();
            tempobj.active=true;
            return tempobj ;
        }
    }else
    {
        //对象池中不存在该 key 对应的池
        console.log("获取对象错误，没有 该值所对应的对象池");
        // let tempobj = Laya.Sprite3D.instantiate((PrefabMgr.preBall as Laya.Sprite3D))
        // tempobj.name=key.toString();
        return null;
    }

}

//对象回池，对象的状态信息，尽可能在回池前设置成默认状态
// 比如说物体上添加的一些脚本，可以在回池前去掉或者 后面再对脚本进行判断
//需要记住该物体对象池所对应的指定的编号，否则一旦添加错误，无法修改
public  EnqueueItem(key:number,MeshSprite:Laya.Sprite3D):void{
    if(this.m_ObjectPoolDic[key])
    {
        //对象池中存在该 key 对应的池
        let childNode=this.node.getChildByName(key.toString())

        MeshSprite.active=false;
        MeshSprite.removeSelf();
        childNode.addChild(MeshSprite);
    }else
    {
        //对象池中不存在该 key 对应的池
        console.log("获取对象错误，没有 该值所对应的对象池");
        return;
    }
}

//清理对象池 根据编号清理指定的对象池
public ClearPool(key:number):void{
    if(this.m_ObjectPoolDic[key])
    {
        //对象池中存在该 key 对应的池
        let QueuePool=this.m_ObjectPoolDic[key];
        this.m_ObjectPoolDic[key].destroy();
        delete this.m_ObjectPoolDic[key];

        let childNode=this.node.getChildByName(key.toString())
        childNode.destroyChildren();
        childNode.destroy();
    }else
    {
        //对象池中不存在该 key 对应的池
        console.log("获取对象错误，没有 该值所对应的对象池");
        return ;
    }
}
//获取对象池长度 根据编号获取指定的对象池的长度
public GetPoolLenght(key:number):number{
    if(this.m_ObjectPoolDic[key])
    {
        //对象池中存在该 key 对应的池
        let childNode=this.node.getChildByName(key.toString())
        return childNode.numChildren;
    }else
    {
        //对象池中不存在该 key 对应的池
        console.log("获取对象错误，没有 该值所对应的对象池");
        return null;
    }
}
}