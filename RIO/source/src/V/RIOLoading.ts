// TypeScript file
/**
 * Loading
 */
class RIOLoading extends eui.Component {
    public barMask: egret.Rectangle;
    public progressBar: egret.Bitmap;
    public percent: eui.Label;
    public constructor() {
        super();
        let bg = new egret.Bitmap(RES.getRes("loading_bg_jpg"));
        this.addChild(bg);

        let pingzi = new egret.Bitmap(RES.getRes("loading_bottle_jpg"));
        pingzi.x = 320;
        pingzi.y = 300;
        pingzi.rotation = -10;
        pingzi.anchorOffsetX = pingzi.width / 2;
        // pingzi.anchorOffsetY = pingzi.height / 2;
        this.addChild(pingzi);

        egret.Tween.get(pingzi, {loop:true})
              .to({rotation: 10}, 500)
              .to({rotation: -10}, 500);

        let progressBg = new egret.Bitmap(RES.getRes("loading_progress_bg_png"));
        progressBg.x = 320;
        progressBg.y = 450;
        progressBg.anchorOffsetX = progressBg.width / 2;
        this.addChild(progressBg); 

        this.progressBar = new egret.Bitmap(RES.getRes("loading_progress_bar_png"));
        this.progressBar.x = 320;
        this.progressBar.y = 450;
        this.progressBar.anchorOffsetX = this.progressBar.width / 2;
        this.addChild(this.progressBar); 

        this.barMask = new egret.Rectangle(0, 0, 0, this.progressBar.height);
        this.progressBar.mask = this.barMask;
        console.log("页面加载完成");
        
        this.percent = new eui.Label();
        this.percent.x = 320;
        this.percent.width = 150;
        this.percent.textAlign = "center";
        this.percent.anchorOffsetX = 75;
        this.percent.y = 470;
        this.addChild(this.percent);
    }

    public setProgresss(num)
    {
        this.barMask = new egret.Rectangle(0, 0, num * this.progressBar.width, this.progressBar.height);
        this.percent.text = Math.round(num * 100).toString() + "%";
        this.progressBar.mask = this.barMask;
    }
}