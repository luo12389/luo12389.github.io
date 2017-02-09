// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LCProgressBar = (function (_super) {
    __extends(LCProgressBar, _super);
    function LCProgressBar(bgFilePath, barFilePath) {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Bitmap(RES.getRes(bgFilePath));
        _this.addChild(_this.bg);
        _this.bar = new egret.Bitmap(RES.getRes(barFilePath));
        _this.addChild(_this.bar);
        _this.barMask = new egret.Rectangle(0, 0, 0, _this.bar.width);
        _this.bar.mask = _this.barMask;
        return _this;
    }
    LCProgressBar.prototype.setProgress = function (value) {
        this.barMask = new egret.Rectangle(0, 0, value * this.bar.width, this.bar.height);
        this.bar.mask = this.barMask;
    };
    return LCProgressBar;
}(egret.Sprite));
__reflect(LCProgressBar.prototype, "LCProgressBar");
