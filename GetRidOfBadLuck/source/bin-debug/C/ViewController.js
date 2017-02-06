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
 * ViewController
 */
var ViewController = (function (_super) {
    __extends(ViewController, _super);
    function ViewController() {
        var _this = _super.call(this) || this;
        _this.round = 1; //回合
        _this.time = 3; //间隔
        _this.life = 5; //生命
        _this.skill = 0; //打败怪兽数量
        _this.init();
        return _this;
        //游戏音乐预加载
        // let channel: egret.SoundChannel;
        // let sound:egret.Sound = RES.getRes("bg_mp3");
        // channel = sound.play();
        // channel.stop();
    }
    ViewController.prototype.init = function () {
        this.addChild(new Index());
        this.addEventListener(ViewEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    };
    ViewController.prototype.start = function () {
        this.addEventListener(ViewEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    };
    ViewController.getInstance = function () {
        if (ViewController.instance == null) {
            ViewController.instance = new ViewController();
        }
        return ViewController.instance;
    };
    ViewController.prototype.onChangeScene = function (e) {
        var game = new Game(ViewController.getInstance().round, ViewController.getInstance().time, ViewController.getInstance().life, ViewController.getInstance().skill);
        //先判断当前关卡是第几
        if (ViewController.getInstance().round > 1) {
            //获取位置最前的页面
            var lastPage = this.getChildAt(0);
            //设定第二关进入动画
            this.addChild(game);
            game.y = -1030;
            var self_1 = this;
            egret.Tween.get(game)
                .to({ y: 0 }, 2000);
            egret.Tween.get(lastPage)
                .to({ y: 1030 }, 2000)
                .call(function () {
                self_1.removeChildAt(0);
            });
        }
        else {
            this.removeChildren();
            this.addChild(game);
        }
    };
    return ViewController;
}(egret.Sprite));
__reflect(ViewController.prototype, "ViewController");
//# sourceMappingURL=ViewController.js.map