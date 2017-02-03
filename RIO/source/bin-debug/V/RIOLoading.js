var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 * Loading
 */
var RIOLoading = (function (_super) {
    __extends(RIOLoading, _super);
    function RIOLoading() {
        var _this = _super.call(this) || this;
        var bg = new egret.Bitmap(RES.getRes("loading_bg_jpg"));
        _this.addChild(bg);
        var pingzi = new egret.Bitmap(RES.getRes("loading_bottle_jpg"));
        pingzi.x = 320;
        pingzi.y = 300;
        pingzi.rotation = -10;
        pingzi.anchorOffsetX = pingzi.width / 2;
        // pingzi.anchorOffsetY = pingzi.height / 2;
        _this.addChild(pingzi);
        egret.Tween.get(pingzi, { loop: true })
            .to({ rotation: 10 }, 500)
            .to({ rotation: -10 }, 500);
        var progressBg = new egret.Bitmap(RES.getRes("loading_progress_bg_png"));
        progressBg.x = 320;
        progressBg.y = 450;
        progressBg.anchorOffsetX = progressBg.width / 2;
        _this.addChild(progressBg);
        _this.progressBar = new egret.Bitmap(RES.getRes("loading_progress_bar_png"));
        _this.progressBar.x = 320;
        _this.progressBar.y = 450;
        _this.progressBar.anchorOffsetX = _this.progressBar.width / 2;
        _this.addChild(_this.progressBar);
        _this.barMask = new egret.Rectangle(0, 0, 0, _this.progressBar.height);
        _this.progressBar.mask = _this.barMask;
        console.log("页面加载完成");
        _this.percent = new eui.Label();
        _this.percent.x = 320;
        _this.percent.width = 150;
        _this.percent.textAlign = "center";
        _this.percent.anchorOffsetX = 75;
        _this.percent.y = 470;
        _this.addChild(_this.percent);
        return _this;
    }
    RIOLoading.prototype.setProgresss = function (num) {
        this.barMask = new egret.Rectangle(0, 0, num * this.progressBar.width, this.progressBar.height);
        this.percent.text = Math.round(num * 100).toString() + "%";
        this.progressBar.mask = this.barMask;
    };
    return RIOLoading;
}(eui.Component));
__reflect(RIOLoading.prototype, "RIOLoading");
