import NetConfig_csjc from "./NetConfig";
import User_csjc from "../User/User";
import AesTools_csjc from "./AesTools";

export class requestData_csjc
{
    public meth : string = "post";
    public header : any = null;
    public data : any;
    public url : string = "";
    public onSuccess : Function = null;
    public onFail : Function = null;

    constructor()
    {
        this.data = {};
    }
}

export default class HttpUnit_csjc 
{
    public static request(req : requestData_csjc) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = NetConfig_csjc.serverUrl_csjc + req.url;
        }

        var completeFunc = (res) => {
            console.log(res,"http Success")
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };

        var errorFunc = (res) => {
            console.log(res,"http fail")
            if (req.onFail)  {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, HttpUnit_csjc, completeFunc);
        xhr.once(Laya.Event.ERROR, HttpUnit_csjc, errorFunc);
        // let dataStr:string = JSON.stringify(req.data);

        if(Laya.Browser.onMiniGame /* || AppConfig.onTTMiniGame */)
        {
            req.data.code = User_csjc.code_csjc;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req.data.oppotoken = User_csjc.code_csjc;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.data.code = User_csjc.code_csjc;
        }
        else
        {
            // req.data.code = User_csjc.code_csjc;
        }

        var time = "time=" + String(Date.now());
        if(req.header == null){
            req.header = 
            [
                "Content-Type", "application/json",
                "state" , NetConfig_csjc.state_csjc,
                "gameid" ,NetConfig_csjc.gameid_csjc,
                "sign" ,AesTools_csjc.encrypt_csjc(time),
            ]
        }
        
        if(User_csjc.token_csjc)
        {
            req.header.push("token");
            req.header.push(User_csjc.token_csjc);
        }

        xhr.send(req.url, /* JSON.stringify( */req.data/* ) */, req.meth, "json",req.header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static login_csjc(onSuccess : Function,onFail : Function)
    {
        var req = new requestData_csjc();
        req.url = NetConfig_csjc.login_csjc;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    }
    
    public static saveGameData_csjc(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new requestData_csjc();
        req.url = NetConfig_csjc.saveGameData_csjc;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    }
    
    public static getGameData_csjc(onSuccess : Function,onFail : Function)
    {
        var req = new requestData_csjc();
        req.url = NetConfig_csjc.getUser_csjc;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetIpBlock_csjc(onSuccess : Function,onFail : Function){
        if(-1 != NetConfig_csjc.gameid_csjc)
        {
            var req = new requestData_csjc();
            req.url = NetConfig_csjc.ipBlock;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit_csjc.request(req);
        }
    }

    public static reportExport_csjc(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new requestData_csjc();
        req.url = NetConfig_csjc.reportExport;
        req.data.wbappid = appid;
        req.data.game_name = game_name;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    }

    public static reportImport_csjc(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new requestData_csjc();
        req.url = NetConfig_csjc.reportImport;
        req.data.wbappid = appid;
        req.data.channel = channel;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    }

    public static getuserip_csjc(onSuccess : Function,onFail : Function)
    {
        var req = new requestData_csjc();
        req.url = NetConfig_csjc.getuserip;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit_csjc.request(req);
    }
}
