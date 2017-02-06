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
 * Index
 */
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/index.exml";
        _this.init();
        return _this;
    }
    Index.prototype.init = function () {
        var _this = this;
        egret.Tween.get(this.group)
            .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
            .call(function () {
            egret.Tween.get(_this.wing1, { loop: true })
                .to({ rotation: 0 }, 400)
                .to({ rotation: -10 }, 400)
                .to({ rotation: 0 }, 400)
                .to({ rotation: -10 }, 400)
                .wait(1000);
            egret.Tween.get(_this.wing2, { loop: true })
                .to({ rotation: 0 }, 400)
                .to({ rotation: 10 }, 400)
                .to({ rotation: 0 }, 400)
                .to({ rotation: 10 }, 400)
                .wait(1000);
            egret.Tween.get(_this.hammer, { loop: true })
                .to({ rotation: 0 }, 500)
                .to({ rotation: 10 }, 500);
            egret.Tween.get(_this.chick)
                .to({ alpha: 1 }, 500);
            egret.Tween.get(_this.monster, { loop: true })
                .to({ y: 90 }, 500)
                .to({ y: 80 }, 500);
        });
        egret.Tween.get(this.hand)
            .wait(1000)
            .to({ alpha: 1 }, 800)
            .call(function () {
            egret.Tween.get(_this.hand, { loop: true })
                .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 600)
                .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 800, egret.Ease.quartInOut)
                .wait(500);
        });
        egret.Tween.get(this.click)
            .wait(1000)
            .to({ alpha: 1 }, 800)
            .call(function () {
            _this.click.touchEnabled = true;
            _this.click.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.gameStart, _this);
            _this.rule.touchEnabled = true;
            _this.rule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ruleInfo, _this);
            egret.Tween.get(_this.click, { loop: true })
                .set({ touchEnabled: true })
                .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1 }, 600)
                .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 800, egret.Ease.quartInOut)
                .set({ touchEnabled: false })
                .wait(500);
        });
    };
    Index.prototype.gameStart = function () {
        var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    };
    Index.prototype.ruleInfo = function () {
        console.log("游戏规则");
    };
    return Index;
}(eui.Component));
__reflect(Index.prototype, "Index");
//# sourceMappingURL=Index.js.map