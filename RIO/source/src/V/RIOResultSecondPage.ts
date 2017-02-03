// TypeScript file
/**
 * RIOResultSecondPage
 */
class RIOResultSecondPage extends eui.Component {
    public static RUN = "SecondRun";
    public pingzi: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/ResultSecondSkin.exml"
        egret.Tween.get(this.pingzi)
            .to({ x: 215, alpha: 1 }, 1000)
            .wait(100);
    }
}