export class HttpTools {
    public static Requset(url: string, data: any, caller: any, completed: Function, error: Function, method: string, responseType: string = "json", headers = null): void {
        let xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, null, (data) => {
            if (data.code != 200 && data.code != 0) {
                this.Error(xhr, data);
                error && error.call(data);
                return;
            }
            completed && completed.call(caller, data);
        });
        xhr.once(Laya.Event.ERROR, caller, error);
        xhr.once(Laya.Event.ERROR, HttpTools, this.Error);
        xhr.send(url, data, method, responseType, headers);
    }

    public static Post(url: string, data: any, caller: any, completed: Function, error: Function, responseType: string = "json", headers = null): void {
        this.Requset(url, data, caller, completed, error, "post", responseType, headers);
    }

    public static Get(url: string, data: any, caller: any, completed: Function, error: Function, responseType: string = "json", headers = null): void {
        this.Requset(url, data, caller, completed, error, "get", responseType, headers);
    }

    public static PostJson(url: string, data: any, caller: any, completed: Function, error: Function) {
        this.Post(url, data, caller, completed, error, "json");
    }

    private static Error(xhr: Laya.HttpRequest, message: any): void {
        console.log("Requset Error, Url:" + xhr.url + ", Error Message:" + JSON.stringify(message));
    }

    public static JsonToKeyValue(param: any): string {
        let res = [];
        for (var key in param) {
            res.push(key + '=' + param[key]);
        }
        return res.join('&');
    }
}