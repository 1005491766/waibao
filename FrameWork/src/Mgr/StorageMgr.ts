export class StorageReq_csjc
{
    public key : string = null;
    public data : any = {};
    public success : ()=> void = null;
    public fail :  ()=> void = null;
    public complete : ()=> void = null;
}

//数据本地持久化保存
export default class StorageMgr_csjc {
    
    public static setStorage_csjc(req : StorageReq_csjc) {
        let dataStr:string = JSON.stringify(req.data);
        if (!Laya.Browser.onMiniGame) {
            localStorage.setItem(req.key,dataStr);
            return;
        } 
        wx.setStorage({
            key : req.key,
            data : dataStr,
            success : req.success,
            fail: req.fail,
            complete: req.complete
        });
    }

    public static getStorage_csjc(key): any {
        var value = null;
        try {
            if (!Laya.Browser.onMiniGame) {
                value = localStorage.getItem(key);
            }else{
                value = wx.getStorageSync(key);
            }
        } catch (e) {
        }
        return value;
    }
}