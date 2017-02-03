// TypeScript file
/**
 * Game 
 */
class Game extends eui.Component {
    public static GAMERUN: string = "GameRun";
    //背景
    private bg: eui.Image;
    //美女
    private beauty: egret.Bitmap;
    //窗帘动画
    private curtainMC: egret.MovieClip;
    //猴子数组
    private monkeyArray = [];
    //灰色层
    private gray: egret.Bitmap;
    //手
    private hand: egret.Bitmap;
    //点击
    private click: egret.Bitmap;
    //玩法
    private playInfo: egret.Bitmap;
    //游戏开始状态
    private gameState = 1;
    //计时器
    private timer: egret.Timer;
    //速度增加间隔
    private interval = 0;

    private firstTime = 0;
    private secondTime = 0;
    private thirdTime = 0;


    public playTime: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/skins/gameSkin.exml";
        //先播放窗帘动画
        let json = RES.getRes("curtain_json");
        let png = RES.getRes("curtain_png");
        let curtainData = new egret.MovieClipDataFactory(json, png);
        this.curtainMC = new egret.MovieClip(curtainData.generateMovieClipData("curtain"));
        this.curtainMC.y = 82;;
        this.curtainMC.addEventListener(egret.MovieClipEvent.COMPLETE, this.layOut, this);
        this.addChild(this.curtainMC);
        this.curtainMC.touchEnabled = true;
        this.curtainMC.play();
    }

    private layOut() {
        //创建美女
        this.beauty = new egret.Bitmap(RES.getRes("gameWoman_png"));
        this.beauty.x = 320;
        this.beauty.y = 557;
        this.beauty.touchEnabled = false;
        this.beauty.anchorOffsetX = 24;
        this.beauty.anchorOffsetY = 62;
        this.addChild(this.beauty);

        //创建猴子
        let monkey = new Moneky();
        monkey.x = 140;
        monkey.y = 130;
        this.addChild(monkey);
        this.monkeyArray.push(monkey);

        //灰色
        this.gray = new egret.Bitmap(RES.getRes("gray_png"));
        this.gray.touchEnabled = false;
        this.addChild(this.gray);

        //点击
        this.click = new egret.Bitmap(RES.getRes("click_png"));
        this.click.x = this.beauty.x;
        this.click.y = this.beauty.y;
        this.click.touchEnabled = false;
        this.click.anchorOffsetX = 45;
        this.click.anchorOffsetY = 45;
        this.addChild(this.click);

        //手
        this.hand = new egret.Bitmap(RES.getRes("gameHand_png"));
        this.hand.x = this.beauty.x;
        this.hand.y = this.beauty.y;
        this.hand.touchEnabled = false;
        this.addChild(this.hand);

        //玩法
        this.playInfo = new egret.Bitmap(RES.getRes("howToPlay_png"));
        this.playInfo.x = (640 - this.playInfo.width) / 2;
        this.playInfo.y = 700;
        this.playInfo.touchEnabled = false;
        this.addChild(this.playInfo);

        //点击动画
        egret.Tween.get(this.click, { loop: true })
            .set({ alpha: 1 })
            .to({ scaleX: 0.8, scaleY: 0.8 }, 500, egret.Ease.quartOut)
            .to({ scaleX: 1, scaleY: 1 }, 500)
            .to({ scaleX: 0.8, scaleY: 0.8 }, 500, egret.Ease.quartOut)
            .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 1000, egret.Ease.quartInOut)
            .wait(500);

        this.curtainMC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this);
        this.curtainMC.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.beautyMove, this);
    }

    //游戏开始
    private gameStart(e: egret.TouchEvent) {
        if (this.judgeDistances(e.stageX, e.stageY) && this.gameState) {
            this.gray.alpha = 0;
            this.removeChild(this.hand);
            this.removeChild(this.click);
            this.removeChild(this.playInfo);
            this.gameState = 0;

            //设定计时器
            this.timer = new egret.Timer(50, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.monKeyMove, this);
            this.timer.start();

        }
    }

    //判断距离
    private judgeDistances(x, y) {
        let distance = Math.sqrt((x - this.beauty.x) * (x - this.beauty.x) + (y - this.beauty.y) * (y - this.beauty.y));
        if (distance < 120) {
            return true;
        }
        return false;
    }

    //美女跟随移动
    public beautyMove(e: egret.TouchEvent) {
        if (this.judgeDistances(e.stageX, e.stageY)) {
            let point = this.checkPoint(e.stageX, e.stageY);
            this.beauty.x = point[0];
            this.beauty.y = point[1];
        }
    }

    //猴子移动和计时
    private monKeyMove() {
        this.interval++;
        for (let i = 0; i < this.monkeyArray.length; i++) {
            let monkey = this.monkeyArray[i];
            if (this.interval == 20) {
                //计算时间
                if(i == 0)
                {
                     this.firstTime++;
                }
                monkey.ratio = monkey.ratio - 0.01;
                if (this.firstTime == 10) {
                    //创建新猴子
                    let newMonkey = new Moneky();
                    let positionArray = this.setMonkeyPosition();
                    newMonkey.x = positionArray[0];
                    newMonkey.y = positionArray[1];
                    this.monkeyArray.push(newMonkey);
                    this.addChild(newMonkey);
                    this.firstTime = 0;
                    this.secondTime++;
                }
                if (this.secondTime == 6) {
                    this.secondTime = 0;
                    this.thirdTime++;
                }
                this.playTime.text = "0" + this.thirdTime.toString() + ":" + this.secondTime.toString() + this.firstTime.toString();
                //加速
                if (i == this.monkeyArray.length - 1) {
                    this.interval = 0;
                }
            }
            if (monkey.hitTestPoint(this.beauty.x - 24, this.beauty.y - 62) ||
                monkey.hitTestPoint(this.beauty.x + 24, this.beauty.y - 62) ||
                monkey.hitTestPoint(this.beauty.x - 24, this.beauty.y + 62) ||
                monkey.hitTestPoint(this.beauty.x + 24, this.beauty.y + 62)
            ) {
                this.gameOver();
            }
            monkey.x = this.lerpDistance(this.beauty.x, monkey.x, monkey.ratio);
            monkey.y = this.lerpDistance(this.beauty.y, monkey.y, monkey.ratio);
        }

    }

    // 点击位置判断
    public checkPoint(x, y) {
        if (x < 24) {
            x = 24;
        }
        if (x > 614) {
            x = 614;
        }
        if (y > 968) {
            y = 968;
        }
        if (y < 160) {
            y = 160;
        }
        return [x, y];
    }

    private gameOver() {
        this.timer.stop();

        //跳出成绩
        this.gray.alpha = 1;
        let score = new egret.Bitmap(RES.getRes("score_png"));
        score.x = (640 - score.width) / 2;
        score.y = 150;
        this.addChild(score);


        let result = new eui.Label();
        result.text = this.playTime.text;
        result.x = 357;
        result.y = 285;
        result.size = 35;
        result.textColor = 0xF52B00;
        this.addChild(result);

        let againBtn = new egret.Bitmap(RES.getRes("again_png"));
        againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.again, this);
        againBtn.touchEnabled = true;
        againBtn.x = 100;
        againBtn.y = 700;
        this.addChild(againBtn);

        let shareBtn = new egret.Bitmap(RES.getRes("share_png"));
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        shareBtn.touchEnabled = true;
        shareBtn.x = 364;
        shareBtn.y = 700;
        this.addChild(shareBtn);
    }

    public share() {
        let arrows = new egret.Bitmap(RES.getRes("arrows_png"));
        arrows.x = 450;
        arrows.y = 0;
        this.addChild(arrows);
    }

    public again() {
        let changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = Game.GAMERUN;
        changeEvent.obj = this;
        ViewManager.getInstance().onChangeScene(changeEvent);
    }

    public lerpDistance(aim, cur, ratio) {
        let delta = cur - aim;
        return Math.round(aim + delta * ratio);
    }

    // 给猴子定的坐标
    public setMonkeyPosition() {
        let x = 0;
        let y = 0;
        if (Math.round(2) > 1) {
            x = Math.floor(Math.random() * 560 + 40);
            y = Math.round(2) > 1 ? 140 : 990;
            if (x == 40 || x == 600) {
                y = Math.floor(Math.random() * 850 + 140);
            }
        }
        else {
            x = Math.round(2) > 1 ? 40 : 600;
            y = Math.floor(Math.random() * 850 + 140);
            if (y == 140 || y == 990) {
                x = Math.floor(Math.random() * 560 + 40);
            }
        }
        return [x, y];
    }
}

