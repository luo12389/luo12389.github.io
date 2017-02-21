// TypeScript file
/**
 * Game
 */
class Game extends eui.Component {

    //生命文字
    public lifeText: egret.BitmapFont;

    //下一关
    public nextRoundBtn: egret.Bitmap;
    //分享
    public shareBtn: egret.Bitmap;
    //重新开始
    public restart: egret.Bitmap;
    //九宫格行和列
    public row: number;
    public col: number;

    public grayBg: egret.Bitmap;

    //通关判断
    public passBool: boolean;
    //计时器
    public timer: egret.Timer;

    public bigTimes = 1.02;
    public bigInterval = 250;
    public distance = 5;
    //打败小怪兽次数
    public skillRound = 0;
    //组数组
    public groupArray: eui.Group[] = [];
    //状态数组
    public stateArray: number[] = [];
    //json数组
    public jsonResArray: string[] = ["game_chick1_json", "game_chick2_json", "game_chick3_json", "game_monster1_json", "game_monster2_json", "game_monster3_json", "game_monster4_json", "game_monster5_json", "game_monster6_json"];
    //png数组
    public pngResArray: string[] = ["game_chick1_png", "game_chick2_png", "game_chick3_png", "game_monster1_png", "game_monster2_png", "game_monster3_png", "game_monster4_png", "game_monster5_png", "game_monster6_png"];
    //mc名字数组
    public nameResArray: string[] = ["1111", "8888", "9999", "2222", "3333", "4444", "5555", "6666", "7777"];
    public static GAMERUN = "run";
    public constructor(round, interval, life, skill) {
        super();
        this.skinName = "resource/skins/game.exml";
        //初始化界面
        this.init();
    }

    public init() {
        this.skillRound = ViewController.getInstance().skillRound;


        let groupW = 190;
        let groupH = 290;
        //创建第一个和第二个窗户 固定
        let group1 = new eui.Group();
        group1.x = 86.6;
        group1.y = 90;
        this.groupArray.push(group1);
        let win1 = new eui.Image(this.randomWindow(ViewController.getInstance().round));
        group1.addChild(win1);
        this.addChild(group1);

        let group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);
        let win2 = new eui.Image(this.randomWindow(ViewController.getInstance().round));
        group2.addChild(win2);
        this.addChild(group2);

        //当回合数大于1时
        if (ViewController.getInstance().round > 1) {
            let marginY = 20;
            let marginX = 86.6;
            //根据格子个数创建对应的框框  
            for (let index = 0; index < ViewController.getInstance().round - 1; index++) {
                // 计算行号  和   列号  
                let row = Math.floor(index / 2);
                let col = index % 2;
                //根据行号和列号来确定子控件的坐标  
                let groupX = marginX + col * (groupW + marginX);
                let groupY = 400 + row * (groupH + marginY);
                let group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
                let win = new eui.Image(this.randomWindow(ViewController.getInstance().round));
                group.addChild(win);
                this.addChild(group);
            }
        }
    }

    public start() {
        let time = 300;
        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
            let resArray = this.randomResult(index);
            let json = RES.getRes(resArray[0]);
            let png = RES.getRes(resArray[1]);
            let mcData = new egret.MovieClipDataFactory(json, png);
            let mc = new egret.MovieClip(mcData.generateMovieClipData(resArray[2]));
            group.addChildAt(mc, 0);
            mc.play(-1);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchResult, this);
        //启动计时器
        this.timer = new egret.Timer(ViewController.getInstance().interval, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.resetImg, this);
        this.timer.start();
    }

    //触碰处理
    public touchResult(e: egret.TouchEvent) {
        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
            let mc = group.getChildAt(0);
            let isHit: boolean = mc.hitTestPoint(e.stageX, e.stageY, true);
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
    }

    public clickIndexReset(index: number) {
        let group: eui.Group = this.groupArray[index];
        group.removeChildAt(0);
        let resArray = this.randomResult(index);
        let json = RES.getRes(resArray[0]);
        let png = RES.getRes(resArray[1]);
        let mcData = new egret.MovieClipDataFactory(json, png);
        let mc = new egret.MovieClip(mcData.generateMovieClipData(resArray[2]));
        group.addChildAt(mc, 0);
        mc.play(-1);
    }

    //重置小鸡或怪兽
    public resetImg() {
        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
            group.removeChildAt(0);
            let resArray = this.randomResult(i);
            let json = RES.getRes(resArray[0]);
            let png = RES.getRes(resArray[1]);
            let mcData = new egret.MovieClipDataFactory(json, png);
            let mc = new egret.MovieClip(mcData.generateMovieClipData(resArray[2]));
            group.addChildAt(mc, 0);
            mc.play(-1);
        }
        this.timer.reset();
        this.timer.start();
    }

    //随机小鸡或怪兽
    public randomResult(arrayIndex) {
        let state = Math.floor(Math.random() * (ViewController.getInstance().round + 1));
        let index: number;
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
    }

    //随机颜色窗户
    public randomWindow(num) {
        let winName: string;
        switch (num) {
            case 1:
                winName = "game_win1_png"
                break;
            case 2:
                winName = "game_win2_png"
                break;
            case 3:
                winName = "game_win3_png"
                break;
            case 4:
                winName = "game_win4_png"
                break;
            case 5:
                winName = "game_win5_png"
                break;
            case 6:
                winName = "game_win6_png"
                break;
        }
        return winName;
    }

    public nextRound() {
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
            .call(() => {
                ViewController.getInstance().round += 1;
                ViewController.getInstance().skillRound = 1;
                ViewController.getInstance().interval -= 500;
                let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
                viewEvent.eventType = Game.GAMERUN;
                console.log(ViewController.getInstance().interval);
                ViewController.getInstance().onChangeScene(viewEvent);
            });
    }

    public setWinBitmap(bitMap: egret.Bitmap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.anchorOffsetY = bitMap.height / 2;
        bitMap.x = 95;
        bitMap.y = 60 + 130;
    }

    //关卡结果
    public roundResult(round: number) {

        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
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
        let gray = new egret.Bitmap(RES.getRes("game_gary_png"));
        this.addChild(gray);

        //创建需要的组件
        let alertGroup: eui.Group;
        let alert: egret.Bitmap;
        let alertImg: string;
        let light: egret.Bitmap;
        let titleImg: string;
        let title: egret.Bitmap;
        let textImg: string;
        let text: egret.Bitmap;

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

            let skillNum = new eui.Label();
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
                .call(() => {
                    this.nextRoundBtn.touchEnabled = true;
                    this.nextRoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextRound, this);
                })
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
                .call(() => {
                    this.restart.touchEnabled = true;
                    this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
                })

            this.shareBtn = new egret.Bitmap(RES.getRes("game_share_png"));
            this.setBitmap(this.shareBtn);
            this.shareBtn.y = 560;
            this.shareBtn.scaleX = 0;
            this.shareBtn.scaleY = 0;
            alertGroup.addChild(this.shareBtn);

            egret.Tween.get(this.shareBtn)
                .wait(2500)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
                .call(() => {
                    this.shareBtn.touchEnabled = true;
                    this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
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
                .call(() => {
                    this.restart.touchEnabled = true;
                    this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
                });
        }
        if (this.passBool) {
            //出现星星
            let star1Res = "";
            let star2Res = "";
            let star3Res = "";
            let star4Res = "";
            let star5Res = "";
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

            let star1 = new egret.Bitmap()
            star1.texture = RES.getRes(star1Res);
            star1.anchorOffsetX = star1.width / 2;
            star1.anchorOffsetY = star1.height / 2;
            star1.x = 95;
            star1.y = 205;
            star1.scaleX = 0;
            star1.scaleY = 0;
            alertGroup.addChild(star1);

            let star2 = new egret.Bitmap()
            star2.texture = RES.getRes(star2Res);
            star2.anchorOffsetX = star2.width / 2;
            star2.anchorOffsetY = star2.height / 2;
            star2.x = 165;
            star2.y = 185;
            star2.scaleX = 0;
            star2.scaleY = 0;
            alertGroup.addChild(star2);

            let star3 = new egret.Bitmap()
            star3.texture = RES.getRes(star3Res);
            star3.anchorOffsetX = star3.width / 2;
            star3.anchorOffsetY = star3.height / 2;
            star3.x = 250;
            star3.y = 170;
            star3.scaleX = 0;
            star3.scaleY = 0;
            alertGroup.addChild(star3);

            let star4 = new egret.Bitmap()
            star4.texture = RES.getRes(star4Res);
            star4.anchorOffsetX = star4.width / 2;
            star4.anchorOffsetY = star4.height / 2;
            star4.x = 335;
            star4.y = 185;
            star4.scaleX = 0;
            star4.scaleY = 0;
            alertGroup.addChild(star4);

            let star5 = new egret.Bitmap()
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
            .call(() => {
                if (this.passBool) {
                    egret.Tween.get(light)
                        .to({ alpha: 1 }, 500)
                        .call(() => {
                            egret.Tween.get(light, { loop: true })
                                .to({ rotation: 360 }, 10000);
                        });
                }
                egret.Tween.get(text)
                    .to({ alpha: 1 }, 500);
            });
    }

    public restartGame() {
        egret.Tween.get(this.restart)
            .set({ touchEnabled: false })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(() => {
                //所有参数重置
                //跳转页面
                ViewController.getInstance().round = 1;
                ViewController.getInstance().interval = 3000;
                ViewController.getInstance().life = 5;
                ViewController.getInstance().skill = 0;
                ViewController.getInstance().skillRound = 3;

                let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
                viewEvent.eventType = Game.GAMERUN;
                ViewController.getInstance().onChangeScene(viewEvent);
            });
    }

    public share() {
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
    }

    public hideShare() {
        egret.Tween.get(this.grayBg)
            .to({ scaleX: 0, scaleY: 0 }, 500);
    }

    public setBitmap(bitMap: egret.Bitmap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.x = 250;
    }
}