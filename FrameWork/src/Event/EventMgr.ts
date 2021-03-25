import EventDispatcher = laya.events.EventDispatcher;
export default class EventMgr_csjc extends EventDispatcher {
    private static eventDispatcher_csjc: EventDispatcher = new EventDispatcher();
    private constructor() {
        super();
    }

    //广播事件
    public static dispatch_csjc(InName, agv?: any) {
        EventMgr_csjc.eventDispatcher_csjc.event(InName, agv);
    }
    //注册事件
    public static regEvent_csjc(InName, caller, listener: Function, arg?: any[]): void {
        EventMgr_csjc.eventDispatcher_csjc.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //注册单次事件
    public static regOnceEvent_csjc(InName, caller, listener: Function, arg?: any[]): void {
        EventMgr_csjc.eventDispatcher_csjc.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    }
    //移除事件注册
    public static removeEvent_csjc(InName, caller, listener: Function, arg?: any[]): void {
        EventMgr_csjc.eventDispatcher_csjc.off(InName, caller, listener);
    }
}