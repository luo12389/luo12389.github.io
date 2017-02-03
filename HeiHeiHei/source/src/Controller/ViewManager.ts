// TypeScript file
class ViewManager extends egret.Sprite {
    public constructor() {
        super();
        this.init();
    }
 
    private static instance:ViewManager;
    private loadingScene: Loading; 
    private startScene: Start; 
    private gameScene: Game; 
	
    private init() {
        this.loadingScene = new Loading()
        this.addChild(this.loadingScene);
        this.loadingScene.startLoadingGameResource();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT,this.onChangeScene,this);
    }

    public static getInstance():ViewManager
    {
        if(ViewManager.instance == null)
        {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    }

    public onChangeScene(e: ChangeSceneEvent)
    {
        this.removeChildren();

        switch (e.eventType)
        {
            case Start.STARTRUN:
                this.addChild(new Start());
                break;
            case Game.GAMERUN:
                this.addChild(new Game());
                break;
            default :
                break;
        }
    }
}
