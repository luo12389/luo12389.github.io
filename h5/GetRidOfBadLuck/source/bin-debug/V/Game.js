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
 * Game
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(round, interval, life, skill) {
        var _this = _super.call(this) || this;
        _this.bigTimes = 1.02;
        _this.bigInterval = 250;
        _this.distance = 5;
        //打败小怪兽次数
        _this.skillRound = 0;
        //组数组
        _this.groupArray = [];
        //状态数组
        _this.stateArray = [];
        //json数组
        _this.jsonResArray = ["game_chick1_json", "game_chick2_json", "game_chick3_json", "game_monster1_json", "game_monster2_json", "game_monster3_json", "game_monster4_json", "game_monster5_json", "game_monster6_json"];
        //png数组
        _this.pngResArray = ["game_chick1_png", "game_chick2_png", "game_chick3_png", "game_monster1_png", "game_monster2_png", "game_monster3_png", "game_monster4_png", "game_monster5_png", "game_monster6_png"];
        //mc名字数组
        _this.nameResArray = ["1111", "8888", "9999", "2222", "3333", "4444", "5555", "6666", "7777"];
        _this.skinName = "resource/skins/game.exml";
        //初始化界面
        _this.init();
        return _this;
    }
    Game.prototype.init = function () {
        this.skillRound = ViewController.getInstance().skillRound;
        var groupW = 190;
        var groupH = 290;
        //创建第一个和第二个窗户 固定
        var group1 = new eui.Group();
        group1.x = 86.6;
        group1.y = 90;
        this.groupArray.push(group1);
        var win1 = new eui.Image(this.randomWindow(ViewController.getInstance().round));
        group1.addChild(win1);
        this.addChild(group1);
        var group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);
        var win2 = new eui.Image(this.randomWindow(ViewController.getInstance().round));
        group2.addChild(win2);
        this.addChild(group2);
        //当回合数大于1时
        if (ViewController.getInstance().round > 1) {
            var marginY = 20;
            var marginX = 86.6;
            //根据格子个数创建对应的框框  
            for (var index_1 = 0; index_1 < ViewController.getInstance().round - 1; index_1++) {
                // 计算行号  和   列号  
                var row = Math.floor(index_1 / 2);
                var col = index_1 % 2;
                //根据行号和列号来确定子控件的坐标  
                var groupX = marginX + col * (groupW + marginX);
                var groupY = 400 + row * (groupH + marginY);
                var group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
                var win = new eui.Image(this.randomWindow(ViewController.getInstance().round));
                group.addChild(win);
                this.addChild(group);
            }
        }
    };
    Game.prototype.start = function () {
        var time = 300;
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            var resArray = this.randomResult(index);
            var json = RES.getRes(resArray[0]);
            var png = RES.getRes(resArray[1]);
            var mcData = new egret.MovieClipDataFactory(json, png);
            var mc = new egret.MovieClip(mcData.generateMovieClipData(resArray[2]));
            group.addChildAt(mc, 0);
            mc.play(-1);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchResult, this);
        //启动计时器
        this.timer = new egret.Timer(ViewController.getInstance().interval, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.resetImg, this);
        this.timer.start();
    };
    //触碰处理
    Game.prototype.touchResult = function (e) {
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            var mc = group.getChildAt(0);
            var isHit = mc.hitTestPoint(e.stageX, e.stageY, true);
            //假如点击成功
            if (isHit == true) {
                if (!this.stateArray[i]) {
                    //小怪兽
                    //关卡击杀数减1
                    this.skillRound -= 1;
                    ViewController.getInstance().skill += 1;
                    console.log("击杀怪兽");
                    if (this.skillRound == 0) {
                        //本关结果
                        this.passBool = true;
                        this.roundResult(ViewController.getInstance().round);
                    }
                    else {
                        this.clickIndexReset(i);
                    }
                }
                else {
                    //小鸡
                    //减去生命
                    //生命还有剩余，改变生命图片
                    if (ViewController.getInstance().life == 0) {
                        this.passBool = false;
                        this.roundResult(ViewController.getInstance().round);
                    }
                    else {
                        this.clickIndexReset(i);
                    }
                }
            }
        }
    };
    Game.prototype.clickIndexReset = function (index) {
        var group = this.groupArray[index];
        group.removeChildAt(0);
        var resArray = this.randomResult(index);
        var json = RES.getRes(resArray[0]);
        var png = RES.getRes(resArray[1]);
        var mcData = new egret.MovieClipDataFactory(json, png);
        var mc = new egret.MovieClip(mcData.generateMovieClipData(resArray[2]));
        group.addChildAt(mc, 0);
        mc.play(-1);
    };
    //重置小鸡或怪兽
    Game.prototype.resetImg = function () {
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            group.removeChildAt(0);
            var resArray = this.randomResult(i);
            var json = RES.getRes(resArray[0]);
            var png = RES.getRes(resArray[1]);
            var mcData = new egret.MovieClipDataFactory(json, png);
            var mc = new egret.MovieClip(mcData.generateMovieClipData(resArray[2]));
            group.addChildAt(mc, 0);
            mc.play(-1);
        }
        this.timer.reset();
        this.timer.start();
    };
    //随机小鸡或怪兽
    Game.prototype.randomResult = function (arrayIndex) {
        var state = Math.floor(Math.random() * (ViewController.getInstance().round + 1));
        var index;
        if (state === 0) {
            this.stateArray.splice(arrayIndex, 0, 0);
            index = Math.floor(Math.random() * 6 + 3);
        }
        else {
            this.stateArray.splice(arrayIndex, 0, 1);
            index = Math.floor(Math.random() * 3);
            console.log(index);
        }
        return [this.jsonResArray[index], this.pngResArray[index], this.nameResArray[index]];
    };
    //随机颜色窗户
    Game.prototype.randomWindow = function (num) {
        var winName;
        switch (num) {
            case 1:
                winName = "game_win1_png";
                break;
            case 2:
                winName = "game_win2_png";
                break;
            case 3:
                winName = "game_win3_png";
                break;
            case 4:
                winName = "game_win4_png";
                break;
            case 5:
                winName = "game_win5_png";
                break;
            case 6:
                winName = "game_win6_png";
                break;
        }
        return winName;
    };
    Game.prototype.nextRound = function () {
        //移除按钮监听
        if (this.nextRound) {
            if (this.nextRoundBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.nextRoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextRound, this);
            }
        }
        if (this.shareBtn) {
            if (this.shareBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            }
        }
        if (this.restart) {
            if (this.restart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
            }
        }
        if (this.grayBg) {
            if (this.grayBg.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.grayBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideShare, this);
            }
        }
        egret.Tween.get(this.nextRoundBtn)
            .set({ touchEnabled: false })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(function () {
            ViewController.getInstance().round += 1;
            ViewController.getInstance().skillRound = 1;
            ViewController.getInstance().interval -= 500;
            var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
            viewEvent.eventType = Game.GAMERUN;
            console.log(ViewController.getInstance().interval);
            ViewController.getInstance().onChangeScene(viewEvent);
        });
    };
    Game.prototype.setWinBitmap = function (bitMap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.anchorOffsetY = bitMap.height / 2;
        bitMap.x = 95;
        bitMap.y = 60 + 130;
    };
    //关卡结果
    Game.prototype.roundResult = function (round) {
        var _this = this;
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            group.removeChildAt(0);
        }
        //移除game监听
        if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchResult, this);
        }
        //暂停计时器
        this.timer.stop();
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER)) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.resetImg, this);
        }
        var gray = new egret.Bitmap(RES.getRes("game_gary_png"));
        this.addChild(gray);
        //创建需要的组件
        var alertGroup;
        var alert;
        var alertImg;
        var light;
        var titleImg;
        var title;
        var textImg;
        var text;
        alertGroup = new eui.Group();
        alertGroup.width = 500;
        alertGroup.height = 500;
        alertGroup.anchorOffsetX = 250;
        alertGroup.x = 320;
        alertGroup.y = -400;
        this.addChild(alertGroup);
        if (this.passBool) {
            light = new egret.Bitmap(RES.getRes("game_light_png"));
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.x = 250;
            light.y = 160;
            light.alpha = 0;
            this.setBitmap(light);
            alertGroup.addChild(light);
            switch (round) {
                case 1:
                    textImg = "game_pass1_text_png";
                    break;
                case 2:
                    textImg = "game_pass2_text_png";
                    break;
                case 3:
                    textImg = "game_pass3_text_png";
                    break;
                case 4:
                    textImg = "game_pass4_text_png";
                    break;
                case 5:
                    textImg = "game_pass5_text_png";
                    break;
            }
            alertImg = "game_alert_png";
            titleImg = "game_passTitle_png";
        }
        else {
            alertImg = "game_failed_alert_png";
            titleImg = "game_failed_title_png";
            textImg = "game_failed_png";
            var skillNum = new eui.Label();
            skillNum.text = ViewController.getInstance().skill.toString();
            skillNum.x = 205;
            skillNum.y = 272;
            skillNum.width = 70;
            skillNum.size = 35;
            skillNum.alpha = 0;
            skillNum.textAlign = "center";
            alertGroup.addChild(skillNum);
            egret.Tween.get(skillNum)
                .wait(1200)
                .to({ alpha: 1 }, 500);
        }
        alert = new egret.Bitmap(RES.getRes(alertImg));
        alert.y = 50;
        this.setBitmap(alert);
        console.log(alert);
        alertGroup.addChildAt(alert, 0);
        title = new egret.Bitmap(RES.getRes(titleImg));
        this.setBitmap(title);
        alertGroup.addChild(title);
        text = new egret.Bitmap(RES.getRes(textImg));
        this.setBitmap(text);
        text.y = 270;
        text.alpha = 0;
        alertGroup.addChild(text);
        if (round != 5 && this.passBool) {
            this.nextRoundBtn = new egret.Bitmap(RES.getRes("game_enterRound_png"));
            this.setBitmap(this.nextRoundBtn);
            this.nextRoundBtn.y = 460;
            this.nextRoundBtn.scaleX = 0;
            this.nextRoundBtn.scaleY = 0;
            alertGroup.addChild(this.nextRoundBtn);
            egret.Tween.get(this.nextRoundBtn)
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
                .call(function () {
                _this.nextRoundBtn.touchEnabled = true;
                _this.nextRoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.nextRound, _this);
            });
        }
        else if (round == 5 && this.passBool) {
            this.restart = new egret.Bitmap(RES.getRes("game_restart_png"));
            this.setBitmap(this.restart);
            this.restart.y = 460;
            this.restart.scaleX = 0;
            this.restart.scaleY = 0;
            alertGroup.addChild(this.restart);
            egret.Tween.get(this.restart)
                .wait(2500)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
                .call(function () {
                _this.restart.touchEnabled = true;
                _this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.restartGame, _this);
            });
            this.shareBtn = new egret.Bitmap(RES.getRes("game_share_png"));
            this.setBitmap(this.shareBtn);
            this.shareBtn.y = 560;
            this.shareBtn.scaleX = 0;
            this.shareBtn.scaleY = 0;
            alertGroup.addChild(this.shareBtn);
            egret.Tween.get(this.shareBtn)
                .wait(2500)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
                .call(function () {
                _this.shareBtn.touchEnabled = true;
                _this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.share, _this);
            });
        }
        else {
            this.restart = new egret.Bitmap(RES.getRes("game_failed_restart_png"));
            this.setBitmap(this.restart);
            this.restart.y = 460;
            this.restart.scaleX = 0;
            this.restart.scaleY = 0;
            alertGroup.addChild(this.restart);
            egret.Tween.get(this.restart)
                .wait(2500)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
                .call(function () {
                _this.restart.touchEnabled = true;
                _this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.restartGame, _this);
            });
        }
        if (this.passBool) {
            //出现星星
            var star1Res = "";
            var star2Res = "";
            var star3Res = "";
            var star4Res = "";
            var star5Res = "";
            switch (round) {
                case 1:
                    star1Res = "game_star_light1_png";
                    star2Res = "game_star_dark2_png";
                    star3Res = "game_star_dark3_png";
                    star4Res = "game_star_dark4_png";
                    star5Res = "game_star_dark5_png";
                    break;
                case 2:
                    star1Res = "game_star_light1_png";
                    star2Res = "game_star_light2_png";
                    star3Res = "game_star_dark3_png";
                    star4Res = "game_star_dark4_png";
                    star5Res = "game_star_dark5_png";
                    break;
                case 3:
                    star1Res = "game_star_light1_png";
                    star2Res = "game_star_light2_png";
                    star3Res = "game_star_light3_png";
                    star4Res = "game_star_dark4_png";
                    star5Res = "game_star_dark5_png";
                    break;
                case 4:
                    star1Res = "game_star_light1_png";
                    star2Res = "game_star_light2_png";
                    star3Res = "game_star_light3_png";
                    star4Res = "game_star_light4_png";
                    star5Res = "game_star_dark5_png";
                    break;
                case 5:
                    star1Res = "game_star_light1_png";
                    star2Res = "game_star_light2_png";
                    star3Res = "game_star_light3_png";
                    star4Res = "game_star_light4_png";
                    star5Res = "game_star_light5_png";
                    break;
            }
            var star1 = new egret.Bitmap();
            star1.texture = RES.getRes(star1Res);
            star1.anchorOffsetX = star1.width / 2;
            star1.anchorOffsetY = star1.height / 2;
            star1.x = 95;
            star1.y = 205;
            star1.scaleX = 0;
            star1.scaleY = 0;
            alertGroup.addChild(star1);
            var star2 = new egret.Bitmap();
            star2.texture = RES.getRes(star2Res);
            star2.anchorOffsetX = star2.width / 2;
            star2.anchorOffsetY = star2.height / 2;
            star2.x = 165;
            star2.y = 185;
            star2.scaleX = 0;
            star2.scaleY = 0;
            alertGroup.addChild(star2);
            var star3 = new egret.Bitmap();
            star3.texture = RES.getRes(star3Res);
            star3.anchorOffsetX = star3.width / 2;
            star3.anchorOffsetY = star3.height / 2;
            star3.x = 250;
            star3.y = 170;
            star3.scaleX = 0;
            star3.scaleY = 0;
            alertGroup.addChild(star3);
            var star4 = new egret.Bitmap();
            star4.texture = RES.getRes(star4Res);
            star4.anchorOffsetX = star4.width / 2;
            star4.anchorOffsetY = star4.height / 2;
            star4.x = 335;
            star4.y = 185;
            star4.scaleX = 0;
            star4.scaleY = 0;
            alertGroup.addChild(star4);
            var star5 = new egret.Bitmap();
            star5.texture = RES.getRes(star5Res);
            star5.anchorOffsetX = star5.width / 2;
            star5.anchorOffsetY = star5.height / 2;
            star5.x = 405;
            star5.y = 205;
            star5.scaleX = 0;
            star5.scaleY = 0;
            alertGroup.addChild(star5);
            egret.Tween.get(star1)
                .wait(1500)
                .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut);
            egret.Tween.get(star2)
                .wait(1600)
                .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut);
            egret.Tween.get(star3)
                .wait(1700)
                .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut);
            egret.Tween.get(star4)
                .wait(1800)
                .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut);
            egret.Tween.get(star5)
                .wait(1900)
                .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut);
        }
        egret.Tween.get(alertGroup)
            .to({ y: 160 }, 1200, egret.Ease.elasticOut)
            .call(function () {
            if (_this.passBool) {
                egret.Tween.get(light)
                    .to({ alpha: 1 }, 500)
                    .call(function () {
                    egret.Tween.get(light, { loop: true })
                        .to({ rotation: 360 }, 10000);
                });
            }
            egret.Tween.get(text)
                .to({ alpha: 1 }, 500);
        });
    };
    Game.prototype.restartGame = function () {
        egret.Tween.get(this.restart)
            .set({ touchEnabled: false })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(function () {
            //所有参数重置
            //跳转页面
            ViewController.getInstance().round = 1;
            ViewController.getInstance().interval = 3000;
            ViewController.getInstance().life = 5;
            ViewController.getInstance().skill = 0;
            ViewController.getInstance().skillRound = 3;
            var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
            viewEvent.eventType = Game.GAMERUN;
            ViewController.getInstance().onChangeScene(viewEvent);
        });
    };
    Game.prototype.share = function () {
        if (this.grayBg) {
            egret.Tween.get(this.grayBg)
                .to({ scaleX: 1, scaleY: 1 }, 500);
        }
        else {
            this.grayBg = new egret.Bitmap(RES.getRes("game_share_gray_png"));
            this.grayBg.touchEnabled = true;
            this.grayBg.anchorOffsetX = this.grayBg.width / 2;
            this.grayBg.anchorOffsetY = this.grayBg.height / 2;
            this.grayBg.x = 320;
            this.grayBg.y = 515;
            this.addChild(this.grayBg);
            this.grayBg.scaleX = 0;
            this.grayBg.scaleY = 0;
            this.grayBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideShare, this);
            egret.Tween.get(this.grayBg)
                .to({ scaleX: 1, scaleY: 1 }, 500);
        }
    };
    Game.prototype.hideShare = function () {
        egret.Tween.get(this.grayBg)
            .to({ scaleX: 0, scaleY: 0 }, 500);
    };
    Game.prototype.setBitmap = function (bitMap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.x = 250;
    };
    return Game;
}(eui.Component));
Game.GAMERUN = "run";
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map