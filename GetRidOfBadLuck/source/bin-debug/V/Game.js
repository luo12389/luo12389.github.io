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
        _this.skillRound = 4;
        _this.groupArray = [];
        _this.stateArray = [];
        _this.skinName = "resource/skins/game.exml";
        //初始化界面
        _this.init();
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
        var win1 = new eui.Image(this.randomWindow());
        group1.addChild(win1);
        this.addChild(group1);
        var group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);
        var win2 = new eui.Image(this.randomWindow());
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
                //根据行号和列号来确定 子控件的坐标  
                var groupX = marginX + col * (groupW + marginX);
                var groupY = 400 + row * (groupH + marginY);
                var group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
                var win = new eui.Image(this.randomWindow());
                group.addChild(win);
                this.addChild(group);
            }
        }
    };
    Game.prototype.start = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var group = this_1.groupArray[i];
            var showImg = new eui.Image(RES.getRes(this_1.randomChoose()));
            this_1.setImage(showImg);
            showImg.scaleX = 0;
            showImg.scaleY = 0;
            group.addChildAt(showImg, 0);
            egret.Tween.get(showImg)
                .wait(1000)
                .to({ scaleX: 1, scaleY: 1 }, 1000)
                .call(function () {
                var showX = showImg.x;
                var showY = showImg.y;
                egret.Tween.get(showImg)
                    .to({ x: showX - 10 }, 800)
                    .call(function () {
                    egret.Tween.get(showImg, { loop: true })
                        .to({ x: showX }, 500)
                        .to({ x: showX + 10 }, 500)
                        .to({ x: showX }, 500)
                        .to({ x: showX - 10 }, 500);
                    if (i == _this.groupArray.length - 1) {
                        //启动触碰事件
                        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchResult, _this);
                        //启动计时器
                        _this.timer = new egret.Timer(ViewController.getInstance().interval, 0);
                        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.resetImg, _this);
                        console.log(egret.getTimer());
                        _this.timer.start();
                    }
                });
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.groupArray.length; i++) {
            _loop_1(i);
        }
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
                    ViewController.getInstance().skill += 1;
                    if (this.skillRound == 0) {
                        //本关结果
                        this.passBool = true;
                        this.roundResult(ViewController.getInstance().round);
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
                        this.passBool = false;
                        this.roundResult(ViewController.getInstance().round);
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
        var _this = this;
        //重置当前检测值
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            group.removeChildAt(0);
        }
        this.timer.reset();
        console.log("重置");
        this.stateArray = [];
        var _loop_2 = function (i) {
            var group = this_2.groupArray[i];
            var showImg = new eui.Image(RES.getRes(this_2.randomChoose()));
            this_2.setImage(showImg);
            showImg.scaleX = 0;
            showImg.scaleY = 0;
            group.addChildAt(showImg, 0);
            egret.Tween.get(showImg)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.sineInOut)
                .wait(300)
                .call(function () {
                var showX = showImg.x;
                var showY = showImg.y;
                egret.Tween.get(showImg)
                    .to({ x: showX - 10 }, 800)
                    .call(function () {
                    egret.Tween.get(showImg, { loop: true })
                        .to({ x: showX }, 500)
                        .to({ x: showX + 10 }, 500)
                        .to({ x: showX }, 500)
                        .to({ x: showX - 10 }, 500);
                });
                if (i == _this.groupArray.length - 1) {
                    _this.timer.start();
                    console.log("开始");
                    console.log(egret.getTimer());
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < this.groupArray.length; i++) {
            _loop_2(i);
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
        //移除按钮监听
        if (this.nextRound) {
            if (this.nextRoundBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                console.log("下一关监听");
                this.nextRoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextRound, this);
            }
        }
        if (this.shareBtn) {
            if (this.shareBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                console.log("分享监听");
                this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            }
        }
        if (this.restart) {
            if (this.restart.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                console.log("重新开始监听");
                this.restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
            }
        }
        if (this.grayBg) {
            if (this.grayBg.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                console.log("重新开始监听");
                this.grayBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideShare, this);
            }
        }
        console.log(ViewController.getInstance().round);
        console.log(ViewController.getInstance().life);
        console.log(ViewController.getInstance().interval);
        console.log(ViewController.getInstance().skill);
        ViewController.getInstance().round += 1;
        ViewController.getInstance().interval -= 800;
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
    Game.prototype.roundResult = function (round) {
        var _this = this;
        egret.Tween.removeAllTweens();
        //移除game监听
        if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            console.log("移除点击监听");
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchResult, this);
        }
        //暂停计时器
        this.timer.stop();
        if (this.timer.hasEventListener(egret.TimerEvent.TIMER)) {
            console.log("移除计时监听");
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
            light.y = 40;
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
                console.log("注册监听");
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
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
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
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
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
        }
        egret.Tween.get(alertGroup)
            .to({ y: 160 }, 1200, egret.Ease.elasticOut)
            .call(function () {
            if (_this.passBool) {
                egret.Tween.get(light)
                    .to({ alpha: 1 }, 500);
            }
            egret.Tween.get(text)
                .to({ alpha: 1 }, 500);
        });
        egret.Tween.get(this.restart)
            .wait(2000)
            .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
            .call(function () {
            _this.restart.touchEnabled = true;
            _this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.restartGame, _this);
        });
    };
    Game.prototype.restartGame = function () {
        console.log("restart");
        //所有参数重置
        //跳转页面
        ViewController.getInstance().round = 1;
        ViewController.getInstance().interval = 3000;
        ViewController.getInstance().life = 5;
        ViewController.getInstance().skill = 0;
        var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
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