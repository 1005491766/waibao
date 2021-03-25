import { CollisionGroup } from "../Enums";
import SceneMgr_cscj from "../SceneMgr";
import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import DestructibleObj from "./DestructibleObj";

export default class DestructibleObjBuilds extends DestructibleObj {

    onTriggerEnter(res) {
        // this.keyList.indexOf(e.keyCode) < 0
        console.log("-----------------物体名字查看",res.owner.name)

        if(res.owner.name.indexOf("Kingkong")>0)
        return
        SoundMgr_csjc.instance_csjc.playSound_csjc("Broken");
        let replace = SceneMgr_cscj.Instance.ReplaceObj.getChildByName(this.owner.name + "Replace") as Laya.Sprite3D;
        let ani = replace.getComponent(Laya.Animator) as Laya.Animator;
        ani.play(null, 0, 0);
        replace.transform.worldMatrix = this.Sprite3D.transform.worldMatrix;
        if (this._timer < 0) {
            this._timer = 0;
        }
        this._isbreak = true
        // this._physicsComponent.enabled = false;
    }
}