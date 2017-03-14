// TypeScript file

class LCProgressBar extends egret.Sprite {
    public bg: egret.Bitmap;
    public bar: egret.Bitmap;
    public barMask: egret.Rectangle;
  
    public constructor(bgFilePath: string, barFilePath: string) {
        super();
        this.bg = new egret.Bitmap(RES.getRes(bgFilePath));
        this.addChild(this.bg);

        this.bar = new egret.Bitmap(RES.getRes(barFilePath));
        this.addChild(this.bar);

        this.barMask = new egret.Rectangle(0, 0, 0, this.bar.width);
        this.bar.mask = this.barMask;
    }
    
    public setProgress(value) {
        this.barMask = new egret.Rectangle(0, 0, value * this.bar.width, this.bar.height);
        this.bar.mask = this.barMask;
    }
}