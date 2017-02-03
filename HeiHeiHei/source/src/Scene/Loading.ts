// TypeScript file
/**
 * Loading
 */
class Loading extends eui.Component {
    

    private hhhProGressBar: LCProgressBar;
    private monkeyMC: egret.MovieClip;
    public constructor() {
        super();
        this.init();
    }

    public init() {


        let bg = new egret.Bitmap(RES.getRes("loadingBg_png"));
        this.addChild(bg);

        let barWidth = 463;
        let barHeight = 24;
        this.hhhProGressBar = new LCProgressBar("progressBg_png", "progressBar_png");
        this.addChild(this.hhhProGressBar);
        this.hhhProGressBar.x = (egret.MainContext.instance.stage.stageWidth - barWidth) / 2;
        this.hhhProGressBar.y = 370;

        let loadingText = new egret.Bitmap(RES.getRes("loadingText_png"));
        loadingText.x = (egret.MainContext.instance.stage.stageWidth - loadingText.width) / 2;
        loadingText.y = 400;
        this.addChild(loadingText); 
     
        let pngRes = RES.getRes("monkey_png");
        let jsonRes = RES.getRes("monkey_json");
        let mcFactory = new egret.MovieClipDataFactory(jsonRes, pngRes);
        this.monkeyMC = new egret.MovieClip(mcFactory.generateMovieClipData("monkey"));
        this.monkeyMC.x = (egret.MainContext.instance.stage.stageWidth - this.monkeyMC.width) / 2;
        this.monkeyMC.y = 250;
        this.addChild(this.monkeyMC);
        this.monkeyMC.gotoAndPlay(1, -1);
        this.monkeyMC.gotoAndPlay(1, -1);
    }

    public startLoadingGameResource() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameGroupLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.gameGroupLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.gameGroupProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.gameGroupItemLoadError, this);
        RES.loadGroup("game");
    }

    //game组资源全部加载完成
    public gameGroupLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "game") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameGroupLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.gameGroupLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,  this.gameGroupProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.gameGroupItemLoadError, this);
            
            this.toNextScene();
        }
    }
    
    //game组资源加载失败
    public gameGroupLoadError(event: RES.ResourceEvent) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.gameGroupLoadComplete(event);
    }

    //game组加载进度
    public gameGroupProgress(event: RES.ResourceEvent) {
        if (event.groupName == "game") {
            this.hhhProGressBar.setProgress(event.itemsLoaded / event.itemsTotal);
        }
    }

    //game组组件加载失败
    public gameGroupItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    public toNextScene() {
        let changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = Start.STARTRUN;
        changeEvent.obj = this;
        ViewManager.getInstance().onChangeScene(changeEvent);
    }
}