// import WXAPI_csjc from "../../PlatformApi/WXAPI";
// import IViewStateListener_csjc from "../../View/IViewStateListener";

// export default class QpNativaGridView extends Laya.Script implements IViewStateListener_csjc {
//     protected _wxNative: any = null;

//     refreshNative() {
//         if (Laya.Browser.onMiniGame) {
//             let bannerAdUnitId = WXAPI_csjc.nativeadId_csjc;
//             this._wxNative = Laya.Browser.window["wx"].createNativeAd(
//                 {
//                     adUnitId: bannerAdUnitId,
//                     adIntervals: 30,
//                     style:
//                         {
//                             left: left,
//                             top: top,
//                         }
//                 })
//             this._wxNative.onLoad((res) => {
//                 console.log("WXNative广告 加载完成");
//                 console.log(res);
//             })
//             this._wxNative.onError((err) => {
//                 console.log("WXNative广告 加载失败");
//                 console.log(err);
//                 this.refreshNativeDis();
//                 this.clearWXBaner();
//             })
//             this._wxNative.onResize(res => {

//             })
//             this._wxNative.show();
//         }
//     }

//     public onViewShow() {
//         this.refreshNative();
//     }

//     public onViewHide() {
//         this.clearNativeWx();
//     }
// }