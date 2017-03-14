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
 * Start
 */
var Start = (function (_super) {
    __extends(Start, _super);
    function Start() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.skinName = "resource/skins/startSkin.exml";
        _this.init();
        return _this;
    }
    Start.prototype.init = function () {
        var _this = this;
        this.complete();
        var wmJson = RES.getRes("woman_json");
        var wmPng = RES.getRes("woman_png");
        var wmMCDF = new egret.MovieClipDataFactory(wmJson, wmPng);
        this.wmMC = new egret.MovieClip(wmMCDF.generateMovieClipData("woman"));
        this.wmMC.x = 320;
        this.wmMC.y = 270 + this.wmMC.height / 2;
        this.wmMC.anchorOffsetX = this.wmMC.width / 2;
        this.wmMC.anchorOffsetY = this.wmMC.height / 2;
        this.wmMC.scaleX = 0;
        this.wmMC.scaleY = 0;
        this.addChildAt(this.wmMC, 6);
        egret.Tween.get(this.wmMC)
            .to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.quadOut)
            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut);
        egret.Tween.get(this.hand2)
            .to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.quadOut)
            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut);
        egret.Tween.get(this.hand1)
            .to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.quadOut)
            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut)
            .call(function () {
            egret.Tween.get(_this.hand1, { loop: true })
                .to({ y: 540 }, 200)
                .call(function () {
                _this.wmMC.gotoAndStop(2);
            })
                .to({ y: 504 }, 200)
                .call(function () {
                _this.wmMC.gotoAndStop(1);
            });
            egret.Tween.get(_this.hand2, { loop: true })
                .to({ y: 540 }, 200)
                .to({ y: 504 }, 200);
            _this.titleShow();
        });
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicStart, this);
    };
    Start.prototype.musicStart = function () {
        this.bgMusic = RES.getRes("bgMusic_mp3");
        this.soundChannel = this.bgMusic.play();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.musicStart, this);
        this.touchEnabled = false;
    };
    Start.prototype.complete = function () {
        var _this = this;
        //灯光动画
        var stageLight = new egret.Bitmap(RES.getRes("stageLight_png"));
        stageLight.x = (640 - stageLight.width) / 2;
        stageLight.y = 820;
        stageLight.alpha = 0.5;
        this.addChild(stageLight);
        //舞台星星
        egret.Tween.get(stageLight, { loop: true })
            .to({ alpha: 1 }, 500, egret.Ease.quintOut)
            .wait(500)
            .to({ alpha: 0.5 }, 500);
        egret.Tween.get(this.light)
            .to({ rotation: -5 }, 1500, egret.Ease.quadInOut)
            .call(function () {
            egret.Tween.get(_this.light, { loop: true })
                .to({ rotation: 5, alpha: 0.5 }, 2000, egret.Ease.quadInOut)
                .to({ rotation: -5, alpha: 1 }, 2000, egret.Ease.quadInOut);
        });
        egret.Tween.get(this.star)
            .to({ alpha: 0.5 }, 2000)
            .call(function () {
            _this.star.alpha = 0.5;
            egret.Tween.get(_this.star, { loop: true })
                .to({ alpha: 1 }, 800, egret.Ease.quintIn)
                .wait(500)
                .to({ alpha: 0.5 }, 800);
        });
    };
    Start.prototype.titleShow = function () {
        var _this = this;
        //标题动画
        egret.Tween.get(this.startGroup)
            .to({ y: 450 }, 400, egret.Ease.quadOut)
            .to({ y: 150 }, 400, egret.Ease.quadOut)
            .to({ y: 330 }, 300, egret.Ease.quadOut)
            .call(function () {
            //猩猩头
            egret.Tween.get(_this.head)
                .to({ scaleX: 1, scaleY: 1 }, 500);
            //嘴唇出现
            egret.Tween.get(_this.lip)
                .to({ scaleX: 0.8, scaleY: 0.8 }, 500);
            //parts
            egret.Tween.get(_this.parts)
                .to({ scaleX: 0.8, scaleY: 0.8 }, 500);
        })
            .to({ y: 300 }, 300, egret.Ease.quadOut)
            .to({ y: 310 }, 250, egret.Ease.quadOut)
            .wait(500)
            .call(function () {
            //标题循环动画
            egret.Tween.get(_this.startGroup, { loop: true })
                .to({ y: 295 }, 1500, egret.Ease.sineInOut)
                .call(function () {
                egret.Tween.get(_this.head)
                    .to({ rotation: -5 }, 200, egret.Ease.quadInOut)
                    .call(function () {
                    egret.Tween.get(_this.head)
                        .to({ rotation: 5 }, 200, egret.Ease.quadInOut)
                        .to({ rotation: -5 }, 200, egret.Ease.quadInOut)
                        .to({ rotation: 5 }, 200, egret.Ease.quadInOut)
                        .to({ rotation: -5 }, 200, egret.Ease.quadInOut);
                });
                egret.Tween.get(_this.lip)
                    .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quintOut)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 400);
                egret.Tween.get(_this.parts)
                    .to({ scaleX: 1, scaleY: 1 }, 125, egret.Ease.quadIn)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 125, egret.Ease.quadIn)
                    .to({ scaleX: 1, scaleY: 1 }, 125, egret.Ease.quadIn)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 125, egret.Ease.quadIn)
                    .to({ scaleX: 1, scaleY: 1 }, 125, egret.Ease.quadIn)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 125, egret.Ease.quadIn);
            })
                .to({ y: 310 }, 1500, egret.Ease.sineInOut);
            _this.startBtn.touchEnabled = false;
            egret.Tween.get(_this.startBtn)
                .to({ scaleX: 1, scaleY: 1 }, 1000)
                .call(function () {
                var startLight = new egret.Bitmap(RES.getRes("startLight_png"));
                startLight.x = (640 - startLight.width) / 2 - 5;
                startLight.y = 905;
                _this.addChild(startLight);
                egret.Tween.get(startLight, { loop: true })
                    .to({ alpha: 0.4 }, 500, egret.Ease.quintOut)
                    .to({ alpha: 1 }, 500, egret.Ease.quintOut)
                    .wait(500);
                _this.startBtn.touchEnabled = true;
            });
            _this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toNextScene, _this);
        });
    };
    Start.prototype.toNextScene = function () {
        if (this.startBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toNextScene, this);
            var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
            changeEvent.eventType = Game.GAMERUN;
            changeEvent.obj = this;
            ViewManager.getInstance().onChangeScene(changeEvent);
        }
    };
    return Start;
}(eui.Component));
Start.STARTRUN = "StartRun";
__reflect(Start.prototype, "Start");
