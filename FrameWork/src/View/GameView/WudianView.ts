import ViewBase_csjc from "../ViewBase";
import QpGameSwitch from "../../QpAPI/QpGameSwitch";
import CachedWXBannerAd_csjc from "../../PlatformApi/CachedWXBannerAd";
import ExamineMgr from "../../CommomAPI/ExamineMgr";

export default abstract class WudianView extends ViewBase_csjc {
    protected _wudianTpye = 2;
    protected _hideFirst = false;
    protected _skipBtnMove: Boolean = true;
    protected _bannerShowTime: number = 0;
    protected _skipBtn: Laya.Image;
    abstract get NeedWudian(): boolean;

    onAwake() {
        this._skipBtn = this.owner.getChildByName("SkipBtn") as Laya.Image;
    }

    onOpenEvent = () => {
        console.log(`BtnMovetime:${QpGameSwitch.GameSwitch.btnMoveTimer},bannerMoveTimer:${QpGameSwitch.GameSwitch.bannerMoveTimer}`)
        CachedWXBannerAd_csjc.hide_csjc();
        if (!ExamineMgr.CanDoScz_Wx) {
            if (this._skipBtnMove) {
                CachedWXBannerAd_csjc.changeShow_csjc(0);
            }
            return;
        }
        if (this.NeedWudian) {
            if (this._skipBtnMove) {
                this._skipBtn.bottom = 100;
            }
            this._skipBtn.offAllCaller(this);
            if (this._hideFirst) {
                if (QpGameSwitch.GameSwitch.btnShowTimer > 0) {
                    this._skipBtn.visible = false;
                    Laya.timer.once(QpGameSwitch.GameSwitch.btnShowTimer * 1000, this, () => {
                        this._skipBtn.visible = true;
                        this.SelectWudianMethod();
                    })
                }
                else {
                    this.SelectWudianMethod();
                }
            }
            else {
                this.SelectWudianMethod();
            }
        }
        else {
            if (this._skipBtnMove) {
                this._skipBtn.bottom = 320;
                CachedWXBannerAd_csjc.changeShow_csjc(0);
                Laya.timer.once(500, this, () => {
                    CachedWXBannerAd_csjc.changeShow_csjc(0);
                })
            }
            if (QpGameSwitch.GameSwitch.btnShowTimer > 0) {
                this._skipBtn.visible = false;
                Laya.timer.once(QpGameSwitch.GameSwitch.btnShowTimer * 1000, this, () => {
                    this._skipBtn.visible = true;
                })
            }
        }
    }

    onClose() {
        super.onClose();
        CachedWXBannerAd_csjc.hide_csjc();
    }

    abstract OnSkipBtn();

    SelectWudianMethod() {
        if (this._wudianTpye == 1) {
            // console.log("WMethod1");
            // this._skipBtn.once(Laya.Event.CLICK, this, this.WudianMethod1);
            console.log("WMethod1");
            this._skipBtn.offAllCaller(this);
            let rdtime = Math.random() * 1000 + 500
            Laya.timer.once(rdtime, this, this.FlashBanner2);
        }
        else {
            // console.log("WMethod2");
            // this.WudianMethod2();
            console.log("WMethod2");
            this._skipBtn.once(Laya.Event.CLICK, this, this.WudianMethod1);
        }
    }

    /*
        传统误点， 按下按键后开始触发,
     */
    WudianMethod1() {
        Laya.timer.clearAll(this);
        CachedWXBannerAd_csjc.hide_csjc();
        let time = QpGameSwitch.GameSwitch.btnMoveTimer;
        let time2 = QpGameSwitch.GameSwitch.bannerMoveTimer;
        if (time < 100) { time *= 1000; }
        if (time2 < 100) { time2 *= 1000; }
        Laya.timer.once(time, this, () => {
            if (this._skipBtnMove) {
                this._skipBtn.bottom = 320;
            }
            this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
        });
        Laya.timer.once(time2, this, this.FlashBanner1)
    }

    /*
        闪现误点， 不需要按键自动触发
    */
    WudianMethod2() {
        let time = QpGameSwitch.GameSwitch.btnMoveTimer;
        let time2 = QpGameSwitch.GameSwitch.bannerMoveTimer;
        if (time < 100) { time *= 1000; }
        if (time2 < 100) { time2 *= 1000; }
        Laya.timer.once(time, this, () => {
            if (this._skipBtnMove) {
                this._skipBtn.bottom = 320;
            }
            this._skipBtn.on(Laya.Event.CLICK, this, this.OnSkipBtn);
        });
        Laya.timer.once(time2, this, this.FlashBanner1)
    }

    FlashBanner1() {
        CachedWXBannerAd_csjc.changeShow_csjc(0);
        if (!this._skipBtnMove) {
            Laya.timer.once(2200, this, () => {
                CachedWXBannerAd_csjc.hide_csjc();
            })
        }
        /* else {
            Laya.timer.once(500, this, () => {
                CachedWXBannerAd_csjc.changeShow_csjc();
            })
        } */
        // this._bannerShowTime++;
        // if (this._bannerShowTime > 3) {
        //     Laya.timer.clear(this, this.FlashBanner);
        // }
        // else {

        // }
    }

    FlashBanner2() {
        /* Laya.timer.once(700, this, () => {
            CachedWXBannerAd_csjc.hide_csjc();
        }) */
        CachedWXBannerAd_csjc.changeShow_csjc(0);
        Laya.timer.once(500, this, () => {
            CachedWXBannerAd_csjc.hide_csjc();
        })
        this._skipBtn.once(Laya.Event.CLICK, this, this.WudianMethod1);
        /* else {
            Laya.timer.once(500, this, () => {
                CachedWXBannerAd_csjc.changeShow_csjc();
            })
        } */
    }
}