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
        var titlePng = RES.getRes("index_title_png");
        var titleJson = RES.getRes("index_title_json");
        var titleMCDF = new egret.MovieClipDataFactory(titleJson, titlePng);
        var titleMC = new egret.MovieClip(titleMCDF.generateMovieClipData("123"));
        titleMC.anchorOffsetX = titleMC.width / 2;
        titleMC.anchorOffsetY = titleMC.height / 2;
        titleMC.x = 330;
        titleMC.y = 220;
        titleMC.scaleX = 0;
        titleMC.scaleY = 0;
        this.addChild(titleMC);
        var chickPng = RES.getRes("index_de2_png");
        var chickJson = RES.getRes("index_de2_json");
        var chickMCDF = new egret.MovieClipDataFactory(chickJson, chickPng);
        var chickMC = new egret.MovieClip(chickMCDF.generateMovieClipData("777"));
        chickMC.x = 50;
        chickMC.y = 430;
        this.addChild(chickMC);
        var monsterPng = RES.getRes("index_de1_png");
        var monsterJson = RES.getRes("index_de1_json");
        var monsterMCDF = new egret.MovieClipDataFactory(monsterJson, monsterPng);
        var monsterMC = new egret.MovieClip(monsterMCDF.generateMovieClipData("666"));
        monsterMC.x = 590 - monsterMC.width;
        monsterMC.y = 430;
        this.addChild(monsterMC);
        var clickPng = RES.getRes("index_click_png");
        var clickJson = RES.getRes("index_click_json");
        var clickMCDF = new egret.MovieClipDataFactory(clickJson, clickPng);
        var clickMC = new egret.MovieClip(clickMCDF.generateMovieClipData("888"));
        clickMC.x = 420;
        clickMC.y = 650;
        this.addChild(clickMC);
        clickMC.touchEnabled = true;
        clickMC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        chickMC.play(-1);
        clickMC.play(-1);
        monsterMC.play(-1);
        egret.Tween.get(titleMC)
            .wait(500)
            .to({ scaleX: 1, scaleY: 1 }, 2000, egret.Ease.elasticOut)
            .call(function () {
            titleMC.play(-1);
        });
        // egret.Tween.get(this.musicBtn, {loop:true})
        //     .to({ rotation: 360 }, 3000);
        // this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicSwitch, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
    };
    // public musicSwitch() {
    //     if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
    //         this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
    //     }
    // }
    // public stageClick() {
    // }
    Index.prototype.gameStart = function () {
        var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    };
    Index.prototype.ruleInfo = function () {
        egret.Tween.get(this.rule)
            .set({ touchEnabled: false })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .set({ touchEnabled: true });
    };
    return Index;
}(eui.Component));
__reflect(Index.prototype, "Index");
//# sourceMappingURL=Index.js.map