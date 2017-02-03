// TypeScript file
/**
 * Loading
 */
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Loading,p=c.prototype;
    p.init = function () {
        var bg = new egret.Bitmap(RES.getRes("loadingBg_png"));
        this.addChild(bg);
        var barWidth = 463;
        var barHeight = 24;
        this.hhhProGressBar = new LCProgressBar("progressBg_png", "progressBar_png");
        this.addChild(this.hhhProGressBar);
        this.hhhProGressBar.x = (egret.MainContext.instance.stage.stageWidth - barWidth) / 2;
        this.hhhProGressBar.y = 370;
        var loadingText = new egret.Bitmap(RES.getRes("loadingText_png"));
        loadingText.x = (egret.MainContext.instance.stage.stageWidth - loadingText.width) / 2;
        loadingText.y = 400;
        this.addChild(loadingText);
        var pngRes = RES.getRes("monkey_png");
        var jsonRes = RES.getRes("monkey_json");
        var mcFactory = new egret.MovieClipDataFactory(jsonRes, pngRes);
        this.monkeyMC = new egret.MovieClip(mcFactory.generateMovieClipData("monkey"));
        this.monkeyMC.x = (egret.MainContext.instance.stage.stageWidth - this.monkeyMC.width) / 2;
        this.monkeyMC.y = 250;
        this.addChild(this.monkeyMC);
        this.monkeyMC.gotoAndPlay(1, -1);
        this.monkeyMC.gotoAndPlay(1, -1);
    };
    p.startLoadingGameResource = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameGroupLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.gameGroupLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.gameGroupProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.gameGroupItemLoadError, this);
        RES.loadGroup("game");
    };
    //game组资源全部加载完成
    p.gameGroupLoadComplete = function (event) {
        if (event.groupName == "game") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameGroupLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.gameGroupLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.gameGroupProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.gameGroupItemLoadError, this);
            this.toNextScene();
        }
    };
    //game组资源加载失败
    p.gameGroupLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.gameGroupLoadComplete(event);
    };
    //game组加载进度
    p.gameGroupProgress = function (event) {
        if (event.groupName == "game") {
            this.hhhProGressBar.setProgress(event.itemsLoaded / event.itemsTotal);
        }
    };
    //game组组件加载失败
    p.gameGroupItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    p.toNextScene = function () {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = Start.STARTRUN;
        changeEvent.obj = this;
        ViewManager.getInstance().onChangeScene(changeEvent);
    };
    return Loading;
}(eui.Component));
egret.registerClass(Loading,'Loading');
//# sourceMappingURL=Loading.js.map