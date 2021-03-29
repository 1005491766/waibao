export default class BezierPath {
    public static CreateBezierPoints(anchorpoints, pointsAmount): Array<any> {
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }
    private static MultiPointBezier(points, t): any {
        let len: number = points.length;
        let x: number = 0, y: number = 0, z: number = 0;
        for (let i: number = 0; i < len; i++) {
            let point: any = points[i];
            x += point.x * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            y += point.y * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
            z += point.z * Math.pow((1 - t), (len - 1 - i)) * Math.pow(t, i) * (this.erxiangshi(len - 1, i));
        } return { x: x, y: y, z: z };
    }

    private static erxiangshi(start: number, end: number): number {
        let cs: number = 1, bcs: number = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return (cs / bcs);
    };

    /**
  * 
   * @param ctrlPosArr 贝塞尔曲线控制点坐标
   * @param precison 精度，需要计算的该条贝塞尔曲线上的点的数目
   * @param resArr 该条贝塞尔曲线上的点（二维坐标）
    */
   public static getBezierPos(ctrlPosArr:Array<Laya.Vector2>,precison:number):Array<Laya.Vector2>
   {
       let resArr:Array<Laya.Vector2> = new Array<Laya.Vector2>();

       /**贝塞尔曲线控制点数目（阶数）*/
       let number:number = ctrlPosArr.length;

       if(number < 2)
       {
           return resArr;
       }

       /**杨辉三角数据 */
       let yangHuiArr:Array<number> = this.getYangHuiTriangle(number);

       //计算坐标
       for (let i = 0; i < precison; i++) {
           
           let t:number = i/precison;
           let tmpX:number = 0;
           let tmpY:number = 0;

           for (let j = 0; j < number; j++) {
               
               tmpX += Math.pow(1 - t,number - j - 1) * ctrlPosArr[j].x * Math.pow(t,j) * yangHuiArr[j];

               tmpY += Math.pow(1 - t,number - j - 1) * ctrlPosArr[j].y * Math.pow(t,j) * yangHuiArr[j];
           }

           // resArr[i].x = tmpX;
           // resArr[i].y = tmpY;

           resArr[i] = new Laya.Vector2(tmpX,tmpY);
       }

       return resArr;
   }

   /**
    * 获取杨辉三角对应阶数的值
    * @param num 杨辉三角阶数
    */
   public static getYangHuiTriangle(num:number):Array<number>
   {
       //计算杨辉三角
       let yangHuiArr = new Array<number>();

       if(num === 1)
       {
           yangHuiArr[0] = 1;
       }
       else
       {
           yangHuiArr[0] = yangHuiArr[1] = 1;

           for (let i = 3; i <= num; i++) 
           {
               let t = new Array<number>();
               for (let j = 0; j < i - 1; j++) 
               {
                   t[j] = yangHuiArr[j];
               }

               yangHuiArr[0] = yangHuiArr[i - 1] = 1;
               for (let j = 0; j < i - 2; j++) 
               {
                   yangHuiArr[j + 1] = t[j] + t[j + 1];            
               }
           }
       }

       return yangHuiArr;
   }
}