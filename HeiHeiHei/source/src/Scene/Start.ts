// TypeScript file
/**
 * Start 
 */
class Start extends eui.Component {
    private gameStage: eui.Image;
    private light: eui.Image;
    private title: eui.Image;
    private lip: eui.Image;
    private parts: eui.Image;
    private startGroup: eui.Group;
    private startBtn: eui.Image;
    private star: eui.Image;
    private hand1: eui.Image;
    private hand2: eui.Image;
    private head: eui.Image;
    private bgMusic: egret.Sound;
    private soundChannel: egret.SoundChannel;

    private wmMC: egret.MovieClip;
    private time: number = 0;
    public static STARTRUN: string = "StartRun";

    public constructor() {
        super();
        this.skinName = "resource/skins/startSkin.exml";
        this.init();
    }

    private init() {
        this.complete();


        let wmJson = RES.getRes("woman_json");
        let wmPng = RES.getRes("woman_png");
        let wmMCDF = new egret.MovieClipDataFactory(wmJson, wmPng);
        this.wmMC = new egret.MovieClip(wmMCDF.generateMovieClipData("woman"));
        this.wmMC.x = 320
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
            .call(() => {
                egret.Tween.get(this.hand1, { loop: true })
                    .to({ y: 540 }, 200)
                    .call(() => {
                        this.wmMC.gotoAndStop(2);
                    })
                    .to({ y: 504 }, 200)
                    .call(() => {
                        this.wmMC.gotoAndStop(1);
                    });
                egret.Tween.get(this.hand2, { loop: true })
                    .to({ y: 540 }, 200)
                    .to({ y: 504 }, 200);

                this.titleShow();
            });
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicStart, this);
    }

    public musicStart() {
        this.bgMusic = RES.getRes("bgMusic_mp3");
        this.soundChannel = this.bgMusic.play();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.musicStart, this);
        this.touchEnabled = false;
    }

    public complete() {
        //灯光动画
        let stageLight = new egret.Bitmap(RES.getRes("stageLight_png"));
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
            .call(() => {
                egret.Tween.get(this.light, { loop: true })
                    .to({ rotation: 5, alpha: 0.5 }, 2000, egret.Ease.quadInOut)
                    .to({ rotation: -5, alpha: 1 }, 2000, egret.Ease.quadInOut);
            });
        egret.Tween.get(this.star)
            .to({ alpha: 0.5 }, 2000)
            .call(() => {
                this.star.alpha = 0.5;
                egret.Tween.get(this.star, { loop: true })
                    .to({ alpha: 1 }, 800, egret.Ease.quintIn)
                    .wait(500)
                    .to({ alpha: 0.5 }, 800);
            });
    }

    public titleShow() {
        //标题动画
        egret.Tween.get(this.startGroup)
            .to({ y: 450 }, 400, egret.Ease.quadOut)
            .to({ y: 150 }, 400, egret.Ease.quadOut)
            .to({ y: 330 }, 300, egret.Ease.quadOut)
            .call(() => {
                //猩猩头
                egret.Tween.get(this.head)
                    .to({ scaleX: 1, scaleY: 1 }, 500);
                //嘴唇出现
                egret.Tween.get(this.lip)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 500);
                //parts
                egret.Tween.get(this.parts)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 500);
            })
            .to({ y: 300 }, 300, egret.Ease.quadOut)
            .to({ y: 310 }, 250, egret.Ease.quadOut)
            .wait(500)
            .call(() => {

                //标题循环动画
                egret.Tween.get(this.startGroup, { loop: true })
                    .to({ y: 295 }, 1500, egret.Ease.sineInOut)
                    .call(() => {
                        egret.Tween.get(this.head)
                            .to({ rotation: -5 }, 200, egret.Ease.quadInOut)
                            .call(() => {
                                egret.Tween.get(this.head)
                                    .to({ rotation: 5 }, 200, egret.Ease.quadInOut)
                                    .to({ rotation: -5 }, 200, egret.Ease.quadInOut)
                                    .to({ rotation: 5 }, 200, egret.Ease.quadInOut)
                                    .to({ rotation: -5 }, 200, egret.Ease.quadInOut);
                            });
                        egret.Tween.get(this.lip)
                            .to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quintOut)
                            .to({ scaleX: 0.8, scaleY: 0.8 }, 400)


                        egret.Tween.get(this.parts)
                            .to({ scaleX: 1, scaleY: 1 }, 125, egret.Ease.quadIn)
                            .to({ scaleX: 0.8, scaleY: 0.8 }, 125, egret.Ease.quadIn)
                            .to({ scaleX: 1, scaleY: 1 }, 125, egret.Ease.quadIn)
                            .to({ scaleX: 0.8, scaleY: 0.8 }, 125, egret.Ease.quadIn)
                            .to({ scaleX: 1, scaleY: 1 }, 125, egret.Ease.quadIn)
                            .to({ scaleX: 0.8, scaleY: 0.8 }, 125, egret.Ease.quadIn)

                    })
                    .to({ y: 310 }, 1500, egret.Ease.sineInOut);

                this.startBtn.touchEnabled = false;
                egret.Tween.get(this.startBtn)
                    .to({ scaleX: 1, scaleY: 1 }, 1000)
                    .call(() => {
                        let startLight = new egret.Bitmap(RES.getRes("startLight_png"));
                        startLight.x = (640 - startLight.width) / 2 - 5;
                        startLight.y = 905;
                        this.addChild(startLight);

                        egret.Tween.get(startLight, { loop: true })
                            .to({ alpha: 0.4 }, 500, egret.Ease.quintOut)
                            .to({ alpha: 1 }, 500, egret.Ease.quintOut)
                            .wait(500);
                        this.startBtn.touchEnabled = true;
                    });
                this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toNextScene, this);
            });

    }

    public toNextScene() {
        if (this.startBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toNextScene, this);
            let changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
            changeEvent.eventType = Game.GAMERUN;
            changeEvent.obj = this;
            ViewManager.getInstance().onChangeScene(changeEvent);
        }
    }
}