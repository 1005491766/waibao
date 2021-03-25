import SoundMgr_csjc from "../../../Mgr/SoundMgr";
import BaseState from "../FsmStates/BaseState";

export default class MyAnimatorEvent extends Laya.Script3D {
    private _baseState: BaseState;
    SetCharacter(ctr) {
        this._baseState = ctr;
    }

    Attack1() {
        SoundMgr_csjc.instance_csjc.playSound_csjc("Attack1");
    }

    Attack2() {
        SoundMgr_csjc.instance_csjc.playSound_csjc("Attack2");
    }

    Walk() {
        if (this._baseState.CurrentAni == "Walk") {
            SoundMgr_csjc.instance_csjc.playSound_csjc("Step");
        }
    }
}