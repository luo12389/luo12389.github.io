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

    //当前图片标号
    public curImgNum = 0;

    //计时器
    public timer: egret.Timer;

    //打败小怪兽次数
    public skillRound = 4;
    public groupArray = [];
    public stateArray = [];
    public curImgArray = [];
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

        let group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);

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
            }
        }

        for (let i = 0; i < this.groupArray.length; i++) {
            let group = this.groupArray[i];
            let showImg = new eui.Image(this.randomChoose());
            this.setImage(showImg);
            this.curImgArray.push(showImg);
            group.addChild(showImg);
            let win = new eui.Image(this.randomWindow());
            group.addChild(win);
            this.addChild(group);
        }
    }

    public start() {
        //启动触碰事件
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
            let img = group.getChildAt(0);
            let isHit: boolean = img.hitTestPoint(e.stageX, e.stageY, true);
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
                            this.roundResult(ViewController.getInstance().round, true);
                        }
                        //进入下一关
                        else {
                            //本关结果
                            this.roundResult(ViewController.getInstance().round, true);
                            ViewController.getInstance().round += 1;
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
    }

    //重置小鸡或怪兽
    public resetImg() {
        //重置当前检测值
        this.timer.reset();
        this.timer.start();
        this.stateArray = [];
        for (let i = 0; i < this.curImgArray.length; i++) {
            let showImg: eui.Image = this.curImgArray[i];
            //重置图片
            showImg.source = this.randomChoose();
            this.setImage(showImg);
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
    public roundResult(round: number, passBool: boolean) {
        //创建灰色层
        let gray = new egret.Bitmap(RES.getRes("game_gary_png"));
        this.addChild(gray);

        let alertGroup = new eui.Group();
        alertGroup.width = 500;
        alertGroup.height = 500;
        alertGroup.anchorOffsetX = 250;
        alertGroup.x = 320;
        alertGroup.y = -400;
        this.addChild(alertGroup);

        let alert = new egret.Bitmap(RES.getRes("game_alert_png"));
        alert.y = 50;
        this.setBitmap(alert);
        alertGroup.addChild(alert);

        let light = new egret.Bitmap(RES.getRes("game_light_png"));
        light.y = 40;
        light.alpha = 0;
        this.setBitmap(light);
        alertGroup.addChild(light);

        let title = new egret.Bitmap(RES.getRes("game_passTitle_png"));
        this.setBitmap(title);
        alertGroup.addChild(title);

        let textImg: string;
        let starImg: string;
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
        let star = new egret.Bitmap(RES.getRes(starImg));
        star.y = 170;
        star.alpha = 0;
        this.setBitmap(star);
        alertGroup.addChild(star);

        let text = new egret.Bitmap(RES.getRes(textImg));
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
                .call(() => {
                    this.nextRoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextRound, this);
                })
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
                .call(() => {
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
                    this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
                })

        }
        egret.Tween.get(alertGroup)
            .to({ y: 160 }, 1200, egret.Ease.elasticOut)
            .call(() => {
                egret.Tween.get(star)
                    .to({ y: 125, alpha: 1 }, 800)
                    .call(() => {
                        egret.Tween.get(light)
                            .to({ alpha: 1 }, 500);
                        egret.Tween.get(text)
                            .to({ alpha: 1 }, 500);
                    })
            });
    }

    public restartGame() {
        //所有参数重置
        //跳转页面
    }

    public share() { 
       
    }

    public setBitmap(bitMap: egret.Bitmap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.x = 250;
    }
}