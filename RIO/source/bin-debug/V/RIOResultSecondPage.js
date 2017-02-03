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
 * RIOResultSecondPage
 */
var RIOResultSecondPage = (function (_super) {
    __extends(RIOResultSecondPage, _super);
    function RIOResultSecondPage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/ResultSecondSkin.exml";
        egret.Tween.get(_this.pingzi)
            .to({ x: 215, alpha: 1 }, 1000)
            .wait(100);
        return _this;
    }
    return RIOResultSecondPage;
}(eui.Component));
RIOResultSecondPage.RUN = "SecondRun";
__reflect(RIOResultSecondPage.prototype, "RIOResultSecondPage");
//# sourceMappingURL=RIOResultSecondPage.js.map