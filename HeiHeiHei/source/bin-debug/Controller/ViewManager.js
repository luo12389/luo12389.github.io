var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this.init();
        var channel;
        var sound = RES.getRes("bgMusic_mp3");
        channel = sound.play();
        channel.stop();
        return _this;
    }
    ViewManager.prototype.init = function () {
        this.loadingScene = new Loading();
        this.addChild(this.loadingScene);
        this.loadingScene.startLoadingGameResource();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    };
    ViewManager.getInstance = function () {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    };
    ViewManager.prototype.onChangeScene = function (e) {
        this.removeChildren();
        switch (e.eventType) {
            case Start.STARTRUN:
                this.addChild(new Start());
                break;
            case Game.GAMERUN:
                this.addChild(new Game());
                break;
            default:
                break;
        }
    };
    return ViewManager;
}(egret.Sprite));
__reflect(ViewManager.prototype, "ViewManager");
