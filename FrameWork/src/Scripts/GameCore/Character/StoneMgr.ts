import { CollisionGroup } from "../Enums";
import SceneMgr_cscj from "../SceneMgr";
import EventMgr_csjc from "../../../Event/EventMgr";
import { EventDef_csjc } from "../../../Event/EventDef";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import PoolManager from "../GameTools/PoolManager";
import BezierPath from "../GameTools/BezierPath";

export default class StoneMgr extends Laya.Script3D {
    get Sprite3D(): Laya.Sprite3D { return this.owner as Laya.Sprite3D }

    private _targetPos: Laya.Vector3;
    private _rigidBody3D: Laya.Rigidbody3D;
    private _forwardV3:Laya.Vector3 = new Laya.Vector3()


    onAwake() {
        this._rigidBody3D = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        this._rigidBody3D.isKinematic = false
        this._rigidBody3D.gravity = new Laya.Vector3(0,-10,0)

        this._rigidBody3D.collisionGroup = CollisionGroup.Character;
        this._rigidBody3D.canCollideWith = CollisionGroup.None | CollisionGroup.Ground | CollisionGroup.Obstacle;

    }

    onEnable()
    {
        // Laya.timer.frameOnce(120,this,()=>{
        //     this.comeBackPool()
        // })
        // this.creatPath()
    }

    onUpdate()
    {
        // this._rigidBody3D.isKinematic
        // console.log("-------------线速度",this._rigidBody3D.isKinematic,this._rigidBody3D.linearVelocity)

    }
    /**
     * 初始化投掷
    */
    public Init(roy)
    {
        // roy+=90
        let curAngle = this.Sprite3D.transform.localRotationEulerY * 3.14 / 180;
        // console.log("-------------添加线速度",roy,Math.sin(roy), Math.cos(roy))
        this._rigidBody3D.linearVelocity = new Laya.Vector3(Math.sin(curAngle)*50, 15,Math.cos(curAngle)*50);
    }

    onTriggerEnter(res) {
        // this.keyList.indexOf(e.keyCode) < 0
        console.log("-----------------物体名字查看",res.owner.name)
        this.comeBackPool()
    }
    // protected getForward()
    // {
    //     this.Sprite3D.transform.getForward(this._forwardV3)
    //     return this._forwardV3
    // }

    // protected tempV3:Laya.Vector3 = new Laya.Vector3()
    // /**
    //  * 设置中心变量v3
    //  * @param x 
    //  * @param y 
    //  * @param z 
    //  */
    // setTempV3(x:number=0,y:number=0,z:number=0)
    // {
    //     this.tempV3.x = x;
    //     this.tempV3.y = y;
    //     this.tempV3.z = z;
    //     return this.tempV3
    // }

    // protected creatPath()
    // {
    //     // moosnow.event.sendEventImmediately(EventType.CAMERA_PULL);

    //     let points = []
    //     let point1 = new Laya.Vector3(this.Sprite3D.transform.position.x, this.Sprite3D.transform.position.y, this.Sprite3D.transform.position.z) // 起点        
    //     let point2 = new Laya.Vector3(this.Sprite3D.transform.position.x, this.Sprite3D.transform.position.y+4, this.Sprite3D.transform.position.z)//一个顶点 还可以继续添加 点
    //     let point3 = new Laya.Vector3(this.Sprite3D.transform.position.x+30*this.getForward().x, -10, this.Sprite3D.transform.position.z+30*this.getForward().z)//终点    
    //     points.push(point1)
    //     points.push(point2)
    //     points.push(point3)

    //     let maxdd = 65
    //     let array = BezierPath.CreateBezierPoints(points, maxdd)
    //     let index = 0
    //     Laya.timer.frameLoop(1, this, ()=> {
    //         if (index <= array.length - 1)  {
    //             this.Sprite3D.transform.rotate
    //             // (this.setTempV3(this.roSpeed*this.mainSpeedCtr*this.getForward().x,0,this.getForward().z),false)
    //             if(array[index])
    //             this.Sprite3D.transform.position = this.setTempV3(array[index].x,array[index].y,array[index].z)//new Laya.Vector3(array[index].x, array[index].y, array[index].z)
    //             index+=1
    //         }
    //         else
    //         {
    //             // Laya.timer.clearAll(this)
    //             this.Sprite3D.transform.localScaleX = 1
    //             this.Sprite3D.transform.localScaleY = 1
    //             this.Sprite3D.transform.localScaleZ = 1
    //             this.Sprite3D.active =false
    //             this.comeBackPool()
    //         }
    //     })
    // }

    protected comeBackPool()
    {
        // console.log("-----------------隐藏")
        Laya.timer.clearAll(this);   
        PoolManager.getInstance().EnqueueItem(0,this.owner)
        this._rigidBody3D.linearVelocity = Laya.Vector3._ZERO

    }

    // // SetFirePos(targetPos: Laya.Vector3, curPos: Laya.Vector3, pter: Laya.Sprite3D) {
    // //     this._targetPos = targetPos;

    // //     this.Sprite3D.transform.position = curPos;

    // //     let forward = new Laya.Vector3();
    // //     Laya.Vector3.subtract(this.Sprite3D.transform.position, targetPos, forward);
    // //     Laya.Vector3.add(this.Sprite3D.transform.position, forward, forward);
    // //     this.Sprite3D.transform.lookAt(forward, Laya.Vector3._Up);
    // // }

    // // onCollisionEnter(other: Laya.Collision) {
    // //     if (other.other.owner.name.search("Enemy") > -1) {
    // //         SoundMgr_csjc.instance_csjc.playSound_csjc("Explore");
    // //     }
    // // }
}