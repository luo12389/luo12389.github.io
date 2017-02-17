
// TypeScript file
/**
 * Index
 */
class Index extends eui.Component {
    //规则
    public rule: eui.Image;
    //音乐按钮
    public musicBtn: eui.Image;
    public constructor() {
        super();
        this.skinName = "resource/skins/index.exml";
        this.init();
    }

    public init() {
        let titlePng = RES.getRes("index_title_png");
        let titleJson = RES.getRes("index_title_json");
        let titleMCDF = new egret.MovieClipDataFactory(titleJson, titlePng);
        let titleMC = new egret.MovieClip(titleMCDF.generateMovieClipData("123"))
        titleMC.anchorOffsetX = titleMC.width / 2;
        titleMC.anchorOffsetY = titleMC.height / 2;
        titleMC.x = 330;
        titleMC.y = 220;
        titleMC.scaleX = 0;
        titleMC.scaleY = 0;
        this.addChild(titleMC);

        egret.Tween.get(titleMC)
            .to({ scaleX: 1, scaleY: 1 }, 2000, egret.Ease.elasticOut)
            .call(() => {
                titleMC.play(-1);
            });


        let chickPng = RES.getRes("index_de2_png");
        let chickJson = RES.getRes("index_de2_json");
        let chickMCDF = new egret.MovieClipDataFactory(chickJson, chickPng);
        let chickMC = new egret.MovieClip(chickMCDF.generateMovieClipData("777"));
        chickMC.x = 50;
        chickMC.y = 430;
        this.addChild(chickMC);
        chickMC.play(-1);

        let monsterPng = RES.getRes("index_de1_png");
        let monsterJson = RES.getRes("index_de1_json");
        let monsterMCDF = new egret.MovieClipDataFactory(monsterJson, monsterPng);
        let monsterMC = new egret.MovieClip(monsterMCDF.generateMovieClipData("666"));
        monsterMC.x = 590 - monsterMC.width;
        monsterMC.y = 430;
        this.addChild(monsterMC);
        monsterMC.play(-1);

        let clickPng = RES.getRes("index_click_png");
        let clickJson = RES.getRes("index_click_json");
        let clickMCDF = new egret.MovieClipDataFactory(clickJson, clickPng);
        let clickMC = new egret.MovieClip(clickMCDF.generateMovieClipData("888"));
        clickMC.x = 420;
        clickMC.y = 650;
        clickMC.play(-1);
        this.addChild(clickMC);
        clickMC.touchEnabled = true;
        clickMC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);

        // egret.Tween.get(this.musicBtn, {loop:true})
        //     .to({ rotation: 360 }, 3000);

        // this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicSwitch, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
    }

    // public musicSwitch() {
    //     if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
    //         this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
    //     }
    // }

    // public stageClick() {

    // }

    public gameStart() {
        let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    }

    public ruleInfo() {
        egret.Tween.get(this.rule)
            .set({ touchEnabled: false })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .set({ touchEnabled: true });
    }
}