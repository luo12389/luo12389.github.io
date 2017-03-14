// TypeScript file
/**
 * RIOController
 */
class RIOController extends egret.Sprite {
    private static instance: RIOController;

    public constructor() {
        super();
        this.init();
        let channel: egret.SoundChannel;
        let sound:egret.Sound = RES.getRes("bg_mp3");
        channel = sound.play();
        channel.stop();
    }

    private init() {
        this.addChild(new RIOIndexPage());
        this.addEventListener(RIOEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    }

    public start() {
        this.addEventListener(RIOEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    }

    public static getInstance(): RIOController {
        if (RIOController.instance == null) {
            RIOController.instance = new RIOController();
        }
        return RIOController.instance;
    }


    public onChangeScene(e: RIOEvent) {

        this.removeChildren();
        console.log(e.eventType);
        switch (e.eventType) {
            case RIOResultFirstPage.RUN:
    
                this.addChild(new RIOResultFirstPage(e.prizeNum,e.count));
         
                break;
            case RIOResultSecondPage.RUN:
                this.addChild(new RIOResultSecondPage);
                break;
            case RIOWriteInfoPage.RUN:
                this.addChild(new RIOWriteInfoPage(e.prizeNum));
                break;
            default:
                break;
        }
    }
}