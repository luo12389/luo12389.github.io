// TypeScript file
var LCProgressBar = (function (_super) {
    __extends(LCProgressBar, _super);
    function LCProgressBar(bgFilePath, barFilePath) {
        _super.call(this);
        this.bg = new egret.Bitmap(RES.getRes(bgFilePath));
        this.addChild(this.bg);
        this.bar = new egret.Bitmap(RES.getRes(barFilePath));
        this.addChild(this.bar);
        this.barMask = new egret.Rectangle(0, 0, 0, this.bar.width);
        this.bar.mask = this.barMask;
    }
    var d = __define,c=LCProgressBar,p=c.prototype;
    p.setProgress = function (value) {
        this.barMask = new egret.Rectangle(0, 0, value * this.bar.width, this.bar.height);
        this.bar.mask = this.barMask;
    };
    return LCProgressBar;
}(egret.Sprite));
egret.registerClass(LCProgressBar,'LCProgressBar');
//# sourceMappingURL=LCProgressBar.js.map