// TypeScript file
/**
 * ViewController
 */
class ViewController extends egret.Sprite {
    private static instance: ViewController;
    public round = 1; //回合
    public interval = 3000;  //间隔
    public life = 5;  //生命
    public skill = 0; //打败怪兽数量

    public constructor() {
        super();
        this.init();
        //游戏音乐预加载
        // let channel: egret.SoundChannel;
        // let sound:egret.Sound = RES.getRes("bg_mp3");
        // channel = sound.play();
        // channel.stop();
    }

    private init() {
        this.addChild(new Index())
        this.addEventListener(ViewEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    }

    public start() {
        this.addEventListener(ViewEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    }

    public static getInstance(): ViewController {
        if (ViewController.instance == null) {
            ViewController.instance = new ViewController();
        }
        return ViewController.instance;
    }


    public onChangeScene(e: ViewEvent) {
        let game = new Game(ViewController.getInstance().round, ViewController.getInstance().interval, ViewController.getInstance().life, ViewController.getInstance().skill);
        //先判断当前关卡是第几
        if (ViewController.getInstance().round > 1) {
            //获取位置最前的页面
            let lastPage = this.getChildAt(0);
            //设定第二关进入动画
            this.addChild(game);
            game.y = -1030;
            let self = this;
            egret.Tween.get(game)
                .to({ y: 0 }, 2000)
                .call(() => { 
                    //开启计时器和监听事件
                    game.start();
                });
            egret.Tween.get(lastPage)
                .to({ y: 1030 }, 2000)
                .call(() => {
                    self.removeChildAt(0);
                });
        }
        else {
            this.removeChildren();
            this.addChild(game);
            game.start();
        }
    }
}