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
        //当前图片标号
        _this.curImgNum = 0;
        //打败小怪兽次数
        _this.skillRound = 3;
        _this.groupArray = [];
        _this.stateArray = [];
        _this.curImgArray = [];
        _this.skinName = "resource/skins/game.exml";
        //初始化界面
        _this.init();
        console.log(_this.stage.stageWidth);
        return _this;
    }
    Game.prototype.init = function () {
        //刷新生命
        this.refreshLife(ViewController.getInstance().life);
        var groupW = 190;
        var groupH = 290;
        //创建第一个和第二个窗户 固定
        var group1 = new eui.Group();
        group1.x = 86.6;
        group1.y = 90;
        this.groupArray.push(group1);
        var group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);
        //当回合数大于1时
        if (ViewController.getInstance().round > 1) {
            var marginY = 20;
            var marginX = 86.6;
            //根据格子个数创建对应的框框  
            for (var index_1 = 0; index_1 < ViewController.getInstance().round - 1; index_1++) {
                // 计算行号  和   列号  
                var row = Math.floor(index_1 / 2);
                var col = index_1 % 2;
                //根据行号和列号来确定 子控件的坐标  
                var groupX = marginX + col * (groupW + marginX);
                var groupY = 400 + row * (groupH + marginY);
                var group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
            }
        }
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            var showImg = new eui.Image(this.randomChoose());
            this.setImage(showImg);
            this.curImgArray.push(showImg);
            group.addChild(showImg);
            var win = new eui.Image(this.randomWindow());
            group.addChild(win);
            this.addChild(group);
        }
    };
    Game.prototype.start = function () {
        //启动触碰事件
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
            var img = group.getChildAt(0);
            var isHit = img.hitTestPoint(e.stageX, e.stageY, true);
            //假如点击成功
            if (isHit == true) {
                if (this.stateArray[i]) {
                    //小怪兽
                    console.log("小怪兽");
                    //关卡击杀数减1
                    this.skillRound -= 1;
                    if (this.skillRound == 0) {
                        //通关
                        if (ViewController.getInstance().round == 5) {
                            console.log("通关成功");
                        }
                        else {
                            //本关结果
                            this.roundResult(5, true);
                        }
                    }
                    else {
                        //重置
                        this.resetImg();
                    }
                }
                else {
                    //小鸡
                    console.log("小鸡");
                    //减去生命
                    ViewController.getInstance().life -= 1;
                    if (ViewController.getInstance().life == 0) {
                        console.log("游戏结束,跳出失败界面");
                        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchResult, this);
                    }
                    else {
                        //生命还有剩余，改变生命图片
                        this.refreshLife(ViewController.getInstance().life);
                        //刷新
                        this.resetImg();
                    }
                }
            }
        }
    };
    //重置小鸡或怪兽
    Game.prototype.resetImg = function () {
        //重置当前检测值
        this.timer.reset();
        this.timer.start();
        this.stateArray = [];
        for (var i = 0; i < this.curImgArray.length; i++) {
            var showImg = this.curImgArray[i];
            //重置图片
            showImg.source = this.randomChoose();
            this.setImage(showImg);
        }
    };
    //显示当前生命
    Game.prototype.refreshLife = function (life) {
        switch (life) {
            case 1:
                this.lifeText.source = "game_life1_png";
                break;
            case 2:
                this.lifeText.source = "game_life2_png";
                break;
            case 3:
                this.lifeText.source = "game_life3_png";
                break;
            case 4:
                this.lifeText.source = "game_life4_png";
                break;
        }
    };
    //随机颜色窗户
    Game.prototype.randomWindow = function () {
        var winName;
        switch (Math.floor(Math.random() * 6 + 1)) {
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
    //随机颜色怪兽
    Game.prototype.randomMonster = function () {
        var monster;
        switch (Math.floor(Math.random() * 6 + 1)) {
            case 1:
                this.curImgNum = 1;
                monster = "game_monster1_png";
                break;
            case 2:
                this.curImgNum = 2;
                monster = "game_monster2_png";
                break;
            case 3:
                this.curImgNum = 3;
                monster = "game_monster3_png";
                break;
            case 4:
                this.curImgNum = 4;
                monster = "game_monster4_png";
                break;
            case 5:
                this.curImgNum = 5;
                monster = "game_monster5_png";
                break;
            case 6:
                this.curImgNum = 6;
                monster = "game_monster6_png";
                break;
        }
        this.stateArray.push(1);
        return monster;
    };
    //随机小鸡
    Game.prototype.randomChick = function () {
        var chick;
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                this.curImgNum = 7;
                chick = "game_chick1_png";
                break;
            case 2:
                this.curImgNum = 8;
                chick = "game_chick2_png";
                break;
            case 3:
                this.curImgNum = 9;
                chick = "game_chick3_png";
                break;
        }
        this.stateArray.push(0);
        return chick;
    };
    //是小鸡还是怪兽
    Game.prototype.randomChoose = function () {
        var precent;
        switch (ViewController.getInstance().round) {
            case 1:
                precent = 2;
                break;
            case 2:
                precent = 3;
                break;
            case 3:
                precent = 4;
                break;
            case 4:
                precent = 5;
                break;
            case 5:
                precent = 6;
                break;
        }
        if (Math.floor(Math.random() * precent + 1) == 1) {
            return this.randomMonster();
        }
        return this.randomChick();
    };
    Game.prototype.nextRound = function () {
        var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    };
    Game.prototype.setImage = function (image) {
        var imgW;
        var imgH;
        switch (this.curImgNum) {
            case 1:
                imgW = 100;
                imgH = 137;
                break;
            case 2:
                imgW = 121;
                imgH = 137;
                break;
            case 3:
                imgW = 133;
                imgH = 137;
                break;
            case 4:
                imgW = 104;
                imgH = 137;
                break;
            case 5:
                imgW = 144;
                imgH = 137;
                break;
            case 6:
                imgW = 124;
                imgH = 137;
                break;
            case 7:
                imgW = 115;
                imgH = 137;
                break;
            case 8:
                imgW = 157;
                imgH = 137;
                break;
            case 9:
                imgW = 144;
                imgH = 137;
                break;
        }
        image.anchorOffsetX = imgW / 2;
        image.anchorOffsetY = imgH / 2;
        image.x = 95;
        image.y = 130 + imgH / 2;
    };
    //关卡结果
    Game.prototype.roundResult = function (round, passBool) {
        var _this = this;
        //创建灰色层
        var gray = new egret.Bitmap(RES.getRes("game_gary_png"));
        this.addChild(gray);
        var alertGroup = new eui.Group();
        alertGroup.width = 500;
        alertGroup.height = 500;
        alertGroup.anchorOffsetX = 250;
        alertGroup.x = 320;
        alertGroup.y = -400;
        this.addChild(alertGroup);
        var alert = new egret.Bitmap(RES.getRes("game_alert_png"));
        alert.y = 50;
        this.setBitmap(alert);
        alertGroup.addChild(alert);
        var light = new egret.Bitmap(RES.getRes("game_light_png"));
        light.y = 40;
        light.alpha = 0;
        this.setBitmap(light);
        alertGroup.addChild(light);
        var title = new egret.Bitmap(RES.getRes("game_passTitle_png"));
        this.setBitmap(title);
        alertGroup.addChild(title);
        var textImg;
        var starImg;
        switch (round) {
            case 1:
                textImg = "game_pass1_text_png";
                starImg = "game_pass1_star_png";
                break;
            case 2:
                textImg = "game_pass2_text_png";
                starImg = "game_pass2_star_png";
                break;
            case 3:
                textImg = "game_pass3_text_png";
                starImg = "game_pass3_star_png";
                break;
            case 4:
                textImg = "game_pass4_text_png";
                starImg = "game_pass4_star_png";
                break;
            case 5:
                textImg = "game_pass5_text_png";
                starImg = "game_pass5_star_png";
                break;
        }
        var star = new egret.Bitmap(RES.getRes(starImg));
        star.y = 170;
        star.alpha = 0;
        this.setBitmap(star);
        alertGroup.addChild(star);
        var text = new egret.Bitmap(RES.getRes(textImg));
        this.setBitmap(text);
        text.y = 270;
        text.alpha = 0;
        alertGroup.addChild(text);
        if (round != 5 && passBool) {
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
                _this.nextRoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.nextRound, _this);
            });
        }
        else if (round == 5 && passBool) {
            this.restart = new egret.Bitmap(RES.getRes("game_restart_png"));
            this.setBitmap(this.restart);
            this.restart.y = 460;
            this.restart.scaleX = 0;
            this.restart.scaleY = 0;
            alertGroup.addChild(this.restart);
            egret.Tween.get(this.restart)
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
                .call(function () {
                _this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.restartGame, _this);
            });
            this.shareBtn = new egret.Bitmap(RES.getRes("game_share_png"));
            this.setBitmap(this.shareBtn);
            this.shareBtn.y = 560;
            this.shareBtn.scaleX = 0;
            this.shareBtn.scaleY = 0;
            alertGroup.addChild(this.shareBtn);
            egret.Tween.get(this.shareBtn)
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
                .call(function () {
                _this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.share, _this);
            });
        }
        egret.Tween.get(alertGroup)
            .to({ y: 160 }, 1200, egret.Ease.elasticOut)
            .call(function () {
            egret.Tween.get(star)
                .to({ y: 125, alpha: 1 }, 800)
                .call(function () {
                egret.Tween.get(light)
                    .to({ alpha: 1 }, 500);
                egret.Tween.get(text)
                    .to({ alpha: 1 }, 500);
            });
        });
    };
    Game.prototype.restartGame = function () {
        //所有参数重置
        //跳转页面
    };
    Game.prototype.share = function () {
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