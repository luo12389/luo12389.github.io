// TypeScript file
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=ViewManager,p=c.prototype;
    p.init = function () {
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
    p.onChangeScene = function (e) {
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
egret.registerClass(ViewManager,'ViewManager');
//# sourceMappingURL=ViewManager.js.map