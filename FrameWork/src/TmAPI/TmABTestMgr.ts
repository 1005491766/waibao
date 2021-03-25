export class TmABTest_csjc {
    constructor(name: string, planeId: number) {
        this.name = name;
        this.planeId = planeId;
    }
    public name: string = "AB测试计划";
    public planeId: number = -1;
    public groupId: number = -1;
}

export default class TmAbTestMgr_csjc {
    /**
     * AB测试数组
     * 
     * @private
     * @type {Array<TmABTest_csjc>}
     * @memberof AbTestMgr
     */
    private readonly ABTestList_csjc: Array<TmABTest_csjc> = [
        new TmABTest_csjc("新导出", 83),
        new TmABTest_csjc("赛道加长", 86),
        new TmABTest_csjc("返回导出", 88),
    ]
    private static _instance_csjc: TmAbTestMgr_csjc;
    public static get Instance_csjc(): TmAbTestMgr_csjc {
        if (TmAbTestMgr_csjc._instance_csjc == null) {
            TmAbTestMgr_csjc._instance_csjc = new TmAbTestMgr_csjc();
        }
        return TmAbTestMgr_csjc._instance_csjc;
    }

    /**
     * 初始化AB测试
     * 
     * @memberof AbTestMgr
     */
    public InitAbTest_csjc() {
        if (Laya.Browser.onMiniGame)
            for (let i = 0; i < this.ABTestList_csjc.length; i++) {
                const abtest = this.ABTestList_csjc[i];
                let plan_id = abtest.planeId;
                Laya.timer.once(70, this, () => {
                    Laya.Browser.window.wx.tmSDK.abtest(plan_id).then(res => {
                        abtest.groupId = res.groupId;
                        console.log(`AB计划返回:${abtest.name},Id:${abtest.planeId},组别:${abtest.groupId}`);
                    });
                })
            }
    }

    /**
     * 按照计划ID得到测试组别
     * 
     * @param {number} planId 
     * @returns {TmABTest_csjc} 
     * @memberof AbTestMgr
     */
    public GetABTestByGroupId_csjc(planId: number): TmABTest_csjc {
        for (let i = 0; i < this.ABTestList_csjc.length; i++) {
            const abtest = this.ABTestList_csjc[i];
            if (abtest.planeId == planId) {
                console.log(`AB计划获取:${abtest.name},Id:${abtest.planeId},组别:${abtest.groupId}`);
                return abtest;
            }
        }
        console.log("AB计划未能拿到数据,返回默认值");
        return new TmABTest_csjc("AB计划未能拿到数据", planId);
    }
}