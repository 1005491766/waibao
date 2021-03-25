export default class Camera2UI {
    /**[SixGod]
     * 世界坐标转屏幕坐标
     * @param {Laya.Camera} camera   参照相机
     * @param {Laya.Vector3} point   需要转换的点
     */
    public static WorldToScreen2(camera, point) {
        var pointA = this.InverseTransformPoint(camera.transform, point);
        var distance = pointA.z;
        var out = new Laya.Vector3();
        camera.viewport.project(point, camera.projectionViewMatrix, out);
        var value = new Laya.Vector3(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY, distance);
        return value;
    }

    /**[SixGod]
     * 世界坐标转相对坐标
     * @param {Laya.Transform} origin   camera.transform
     * @param {Laya.Vector3} point      需要转换的点
     */
    public static InverseTransformPoint(origin, point) {
        var xx = new Laya.Vector3();
        origin.getRight(xx);
        var yy = new Laya.Vector3();
        origin.getUp(yy);
        var zz = new Laya.Vector3();
        origin.getForward(zz);
        var zz1 = new Laya.Vector3(-zz.x, -zz.y, -zz.z);
        var x = this.ProjectDistance(point, origin.position, xx);
        var y = this.ProjectDistance(point, origin.position, yy);
        var z = this.ProjectDistance(point, origin.position, zz1);
        var value = new Laya.Vector3(x, y, z);
        return value;
    }

    /**[SixGod]
     * 向量投影长度, 向量CA 在向量 CB 上的投影长度
     * @param {Laya.Vector3} A
     * @param {Laya.Vector3} C
     * @param {Laya.Vector3} B
     */
    public static ProjectDistance(A, C, B) {
        var CA = new Laya.Vector3();
        Laya.Vector3.subtract(A, C, CA);
        var angle = this.Angle2(CA, B) * Math.PI / 180;
        var distance = Laya.Vector3.distance(A, C);
        distance *= Math.cos(angle);
        return distance;
    }

    /**[SixGod]
     * 向量夹角
     * @param {Laya.Vector3} ma 向量A
     * @param {Laya.Vector3} mb 向量B
     */
    public static Angle2(ma, mb) {
        var v1 = (ma.x * mb.x) + (ma.y * mb.y) + (ma.z * mb.z);
        var ma_val = Math.sqrt(ma.x * ma.x + ma.y * ma.y + ma.z * ma.z);
        var mb_val = Math.sqrt(mb.x * mb.x + mb.y * mb.y + mb.z * mb.z);
        var cosM = v1 / (ma_val * mb_val);

        if (cosM < -1) cosM = -1;
        if (cosM > 1) cosM = 1;

        var angleAMB = Math.acos(cosM) * 180 / Math.PI;
        return angleAMB;
    }
}