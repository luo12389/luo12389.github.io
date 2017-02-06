
// TypeScript file
/**
 * Index
 */
class Index extends eui.Component {
    //标题
    public title: eui.Image;
    //翅膀1
    public wing1: eui.Image;
    //翅膀2
    public wing2: eui.Image;
    //点击
    public click: eui.Image;
    //手
    public hand: eui.Image;
    //锤子
    public hammer: eui.Image;
    //规则
    public rule: eui.Image;
    //小鸡
    public chick: eui.Image;
    //小怪兽
    public monster: eui.Image;
    //de1
    public de1: eui.Image;
    //de2
    public de2: eui.Image;
    //group
    public group: eui.Group;
    public constructor() {
        super();
        this.skinName = "resource/skins/index.exml";
        this.init();
    }

    public init() {
        egret.Tween.get(this.group)
            .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
            .call(() => {
                egret.Tween.get(this.wing1, { loop: true })
                    .to({ rotation: 0 }, 400)
                    .to({ rotation: -10 }, 400)
                    .to({ rotation: 0 }, 400)
                    .to({ rotation: -10 }, 400)
                    .wait(1000);

                egret.Tween.get(this.wing2, { loop: true })
                    .to({ rotation: 0 }, 400)
                    .to({ rotation: 10 }, 400)
                    .to({ rotation: 0 }, 400)
                    .to({ rotation: 10 }, 400)
                    .wait(1000);

                egret.Tween.get(this.hammer, { loop: true })
                    .to({ rotation: 0 }, 500)
                    .to({ rotation: 10 }, 500)

                egret.Tween.get(this.chick)
                    .to({ alpha: 1 }, 500);

                egret.Tween.get(this.monster, { loop: true })
                    .to({ y: 90 }, 500)
                    .to({ y: 80 }, 500)
            });

        egret.Tween.get(this.hand)
            .wait(1000)
            .to({ alpha: 1 }, 800)
            .call(() => {
                egret.Tween.get(this.hand, { loop: true })
                    .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 600)
                    .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 800, egret.Ease.quartInOut)
                    .wait(500);
            });

        egret.Tween.get(this.click)
            .wait(1000)
            .to({ alpha: 1 }, 800)
            .call(() => {
                this.click.touchEnabled = true;
                this.click.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);

                this.rule.touchEnabled = true;
                this.rule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleInfo, this);
                egret.Tween.get(this.click, { loop: true })
                    .set({ touchEnabled: true })
                    .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 600)
                    .to({ scaleX: 0.85, scaleY: 0.85 }, 600, egret.Ease.cubicInOut)
                    .to({ scaleX: 1, scaleY: 1, alpha: 0 }, 800, egret.Ease.quartInOut)
                    .set({ touchEnabled: false })
                    .wait(500);
            });
    }

    public gameStart() {
        let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    }

    public ruleInfo() {
        console.log("游戏规则");
    }
}