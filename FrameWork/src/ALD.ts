export enum ALDEventDef_csjc {
    None = "",
    ReportAdClickSuccess = "广告导出成功",
    ReportAdClickFail = "广告导出失败",
    //todo:添加你自己的阿拉丁事件
}

//阿拉丁相关接口
export default class ALD_csjc {
    public static aldSendOpenId_csjc(openid: string)  {
        if (Laya.Browser.onMiniGame)  {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
        else if (Laya.Browser.onQQMiniGame)  {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
    }

    public static aldSendEvent_csjc(event: ALDEventDef_csjc, data: any)  {
        var eventName: string = event;
        if (Laya.Browser.onMiniGame)  {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
        else if (Laya.Browser.onQQMiniGame)  {
            Laya.Browser.window["qq"].aldSendEvent(eventName, data);
        }
    }
    public static aldSendReportAdClickSuccess_csjc(data: any)  {
        console.log("ALD导出成功: ", data);
        ALD_csjc.aldSendEvent_csjc(ALDEventDef_csjc.ReportAdClickSuccess,
            {
                "导出成功": data
            })
    }

    public static aldSendReportAdClickFail_csjc(data: any)  {
        console.log("AlD导出失败: ", data);
        ALD_csjc.aldSendEvent_csjc(ALDEventDef_csjc.ReportAdClickFail,
            {
                "导出失败": data
            })
    }

    // public static aldSendReportAdClickSuccess(data : any)
    // {
    //     var type = ALDEventDef.ReportAdClickSuccess  + " " +  data.title + ":" + String(data.appid)
    //     var ald = ALD as any;
    //     ald.aldSendEvent(type,
    //         {
    //             "导出成功" : data.title + ":" + String(data.appid)
    //         })
    // }

    // public static aldSendReportAdClickFail(data : any)
    // {
    //     var type = ALDEventDef.ReportAdClickFail  + " " +  data.title + ":" + String(data.appid)
    //     var ald = ALD as any;
    //     ald.aldSendEvent(type,
    //         {
    //             "导出失败"  :  data.title + ":" + String(data.appid)
    //         })
    // }
}