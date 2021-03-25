export default class NetConfig_csjc
{
    public static readonly state_csjc = 0;
    public static readonly gameid_csjc : number = -1;
    public static readonly serverUrl_csjc : string = "";
    public static readonly login_csjc : string = "";
    public static readonly saveGameData_csjc : string = "";
    public static readonly getUser_csjc = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    public static readonly ipBlock = "";
    public static readonly reportExport = "/api/share/getwaibuad";
    public static readonly reportImport = "/api/share/getzjadml";
    public static readonly getuserip = "/api/share/getuserip";
}