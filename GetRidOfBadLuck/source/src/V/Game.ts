// TypeScript file
/**
 * Game
 */
class Game extends eui.Component {

    //生命文字
    public lifeText: eui.Image;

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

    //当前图片标号
    public curImgNum = 0;
    //通关判断
    public passBool: boolean;
    //计时器
    public timer: egret.Timer;

    //打败小怪兽次数
    public skillRound = 4;
    public groupArray = [];
    public stateArray = [];
    public static GAMERUN = "run";
    public constructor(round, interval, life, skill) {
        super();
        this.skinName = "resource/skins/game.exml";
        //初始化界面
        this.init();
    }

    public init() {

        //刷新生命
        this.refreshLife(ViewController.getInstance().life);
        let groupW = 190;
        let groupH = 290;
        //创建第一个和第二个窗户 固定
        let group1 = new eui.Group();
        group1.x = 86.6;
        group1.y = 90;
        this.groupArray.push(group1);
        let win1 = new eui.Image(this.randomWindow());
        group1.addChild(win1);
        this.addChild(group1);


        let group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);
        let win2 = new eui.Image(this.randomWindow());
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
                //根据行号和列号来确定 子控件的坐标  
                let groupX = marginX + col * (groupW + marginX);
                let groupY = 400 + row * (groupH + marginY);
                let group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
                let win = new eui.Image(this.randomWindow());
                group.addChild(win);
                this.addChild(group);
            }
        }
    }

    public start() {
        for (let i = 0; i < this.groupArray.length; i++) {
            let group = this.groupArray[i];
            let showImg = new eui.Image(RES.getRes(this.randomChoose()));
            this.setImage(showImg);
            showImg.scaleX = 0;
            showImg.scaleY = 0;
            group.addChildAt(showImg, 0);
            egret.Tween.get(showImg)
                .wait(1000)
                .to({ scaleX: 1, scaleY: 1 }, 1000)
                .call(() => {
                    let showX = showImg.x;
                    let showY = showImg.y;
                    egret.Tween.get(showImg)
                        .to({ x: showX - 10 }, 800)
                        .call(() => {
                            egret.Tween.get(showImg, { loop: true })
                                .to({ x: showX }, 500)
                                .to({ x: showX + 10 }, 500)
                                .to({ x: showX }, 500)
                                .to({ x: showX - 10 }, 500);
                            if (i == this.groupArray.length - 1) {
                                //启动触碰事件
                                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchResult, this);
                                //启动计时器
                                this.timer = new egret.Timer(ViewController.getInstance().interval, 0);
                                this.timer.addEventListener(egret.TimerEvent.TIMER, this.resetImg, this);
                                console.log(egret.getTimer());
                                this.timer.start();
                            }
                        });
                });
        }
    }

    //触碰处理
    public touchResult(e: egret.TouchEvent) {
        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
            let img = group.getChildAt(0);
            let isHit: boolean = img.hitTestPoint(e.stageX, e.stageY, true);
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
    }

    //重置小鸡或怪兽
    public resetImg() {
        //重置当前检测值
        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
            group.removeChildAt(0);
        }
        this.timer.reset();
        console.log("重置");
        this.stateArray = [];
        for (let i = 0; i < this.groupArray.length; i++) {
            let group: eui.Group = this.groupArray[i];
            let showImg = new eui.Image(RES.getRes(this.randomChoose()));
            this.setImage(showImg);
            showImg.scaleX = 0;
            showImg.scaleY = 0;
            group.addChildAt(showImg, 0);

            egret.Tween.get(showImg)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.sineInOut)
                .wait(300)
                .call(() => {
                    let showX = showImg.x;
                    let showY = showImg.y;
                    egret.Tween.get(showImg)
                        .to({ x: showX - 10 }, 800)
                        .call(() => {
                            egret.Tween.get(showImg, { loop: true })
                                .to({ x: showX }, 500)
                                .to({ x: showX + 10 }, 500)
                                .to({ x: showX }, 500)
                                .to({ x: showX - 10 }, 500);
                        });
                    if (i == this.groupArray.length - 1) {
                        this.timer.start();
                        console.log("开始");
                        console.log(egret.getTimer());
                    }
                });
        }
    }

    //显示当前生命
    public refreshLife(life: number) {
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
    }

    //随机颜色窗户
    public randomWindow() {
        let winName: string;
        switch (Math.floor(Math.random() * 6 + 1)) {
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

    //随机颜色怪兽
    public randomMonster() {
        let monster: string;

        switch (Math.floor(Math.random() * 6 + 1)) {
            case 1:
                this.curImgNum = 1;
                monster = "game_monster1_png"
                break;
            case 2:
                this.curImgNum = 2;
                monster = "game_monster2_png"
                break;
            case 3:
                this.curImgNum = 3;
                monster = "game_monster3_png"
                break;
            case 4:
                this.curImgNum = 4;
                monster = "game_monster4_png"
                break;
            case 5:
                this.curImgNum = 5;
                monster = "game_monster5_png"
                break;
            case 6:
                this.curImgNum = 6;
                monster = "game_monster6_png"
                break;
        }
        this.stateArray.push(1);
        return monster;
    }

    //随机小鸡
    public randomChick() {
        let chick: string;
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                this.curImgNum = 7;
                chick = "game_chick1_png"
                break;
            case 2:
                this.curImgNum = 8;
                chick = "game_chick2_png"
                break;
            case 3:
                this.curImgNum = 9;
                chick = "game_chick3_png"
                break;
        }
        this.stateArray.push(0);
        return chick;
    }

    //是小鸡还是怪兽
    public randomChoose() {
        let precent: number;
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
    }

    public nextRound() {
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

        let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    }

    public setImage(image: eui.Image) {
        let imgW: number;
        let imgH: number;
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
    }

    //关卡结果
    public roundResult(round: number) {
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
                    console.log("注册监听");
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
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
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
                .wait(2000)
                .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
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
        }
        egret.Tween.get(alertGroup)
            .to({ y: 160 }, 1200, egret.Ease.elasticOut)
            .call(() => {
                if (this.passBool) {
                    egret.Tween.get(light)
                        .to({ alpha: 1 }, 500);
                }
                egret.Tween.get(text)
                    .to({ alpha: 1 }, 500);
            });
        egret.Tween.get(this.restart)
            .wait(2000)
            .to({ scaleX: 1, scaleY: 1 }, 1500, egret.Ease.elasticOut)
            .call(() => {
                this.restart.touchEnabled = true;
                this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
            });
    }

    public restartGame() {
        console.log("restart");
        //所有参数重置
        //跳转页面
        ViewController.getInstance().round = 1;
        ViewController.getInstance().interval = 3000;
        ViewController.getInstance().life = 5;
        ViewController.getInstance().skill = 0;

        let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
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