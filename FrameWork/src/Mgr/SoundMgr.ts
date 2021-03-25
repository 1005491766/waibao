export default class SoundMgr_csjc {
    public static readonly soundResPath_csjc = "subRes/sound/"
    public static readonly instance_csjc: SoundMgr_csjc = new SoundMgr_csjc();

    private bgm_csjc: any;
    private _bgmname_csjc: string;
    private constructor() {
    }


    public getSoundUrl_csjc(name: string): string {
        let url = SoundMgr_csjc.soundResPath_csjc + name + ".mp3";
        return url;
    }

    public playSound_csjc(name: string, volume?): void {
        if (volume == null) volume = 1;
        var url = this.getSoundUrl_csjc(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.volume = volume;
                sound.src = SoundMgr_csjc.soundResPath_csjc + name + ".mp3";
                sound.onEnded(() => {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
        } else {
            let res = Laya.SoundManager.playSound(url, 1);
            if (res != null) res.volume = 1;
        }
    }

    public playBGM_csjc(name) {
        let url = this.getSoundUrl_csjc(name);
        if (Laya.Browser.onMiniGame) {
            if (!this.bgm_csjc) {
                this.bgm_csjc = wx.createInnerAudioContext();
            }
            this.bgm_csjc.pause();
            this.bgm_csjc.src = url;
            this.bgm_csjc.loop = true;
            this.bgm_csjc.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public stopBGM_csjc() {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm_csjc) {
                this.bgm_csjc.stop();
                this.bgm_csjc.destroy();
                this.bgm_csjc = null;
            }
        } else {
            Laya.SoundManager.stopMusic();
        }
    }
    public setBGMVolume_csjc(volume: number) {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm_csjc) {
                this.bgm_csjc.volume = volume;
            }
        } else {
            Laya.SoundManager.setMusicVolume(volume);
        }
    }
}