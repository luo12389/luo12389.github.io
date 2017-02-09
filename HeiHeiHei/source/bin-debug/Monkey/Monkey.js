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
 * Moneky
 */
var Moneky = (function (_super) {
    __extends(Moneky, _super);
    function Moneky() {
        var _this = _super.call(this) || this;
        _this.ratio = 0.99;
        var doCount = 3;
        var monkey = new egret.Bitmap(RES.getRes("gameMonkey_png"));
        _this.addChild(monkey);
        var heart1 = new egret.Bitmap(RES.getRes("peachHeart_png"));
        heart1.scaleX = 0.6;
        heart1.scaleY = 0.6;
        heart1.x = 60;
        heart1.y = 5;
        heart1.alpha = 0;
        _this.addChild(heart1);
        var heart2 = new egret.Bitmap(RES.getRes("peachHeart_png"));
        heart2.scaleX = 1;
        heart2.scaleY = 1;
        heart2.alpha = 0;
        heart2.x = 68;
        heart2.y = -5;
        _this.addChild(heart2);
        var heart3 = new egret.Bitmap(RES.getRes("peachHeart_png"));
        heart3.scaleX = 1.4;
        heart3.scaleY = 1.4;
        heart3.x = 80;
        heart3.y = -18;
        heart3.alpha = 0;
        _this.addChild(heart3);
        return _this;
        // this.heartTimer = new egret.Timer(300, 0);
        // this.heartTimer.addEventListener(egret.TimerEvent.TIMER, () => {
        //     if (doCount == 1) {
        //         heart1.alpha = 0;
        //         heart2.alpha = 0;
        //         heart3.alpha = 0;
        //     }
        //     if (doCount == 1) {
        //         heart1.alpha = 1;
        //     }
        //     if (doCount == 2) {
        //         heart2.alpha = 1;
        //     }
        //     if (doCount == 3) {
        //         heart3.alpha = 1;
        //     }
        //     doCount++;
        //     if (doCount == 4) {
        //         doCount = 0;
        //     }
        // }, this);
        // this.heartTimer.start();
    }
    return Moneky;
}(egret.Sprite));
__reflect(Moneky.prototype, "Moneky");
