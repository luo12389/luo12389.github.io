// TypeScript file
/**
 * Moneky 
 */
class Moneky extends egret.Sprite {
    public ratio = 0.99;
    public constructor() {
        super();
        let doCount = 3;

        let monkey = new egret.Bitmap(RES.getRes("gameMonkey_png"));
        this.addChild(monkey);

        let heart1 = new egret.Bitmap(RES.getRes("peachHeart_png"));
        heart1.scaleX = 0.6;
        heart1.scaleY = 0.6;
        heart1.x = 60;
        heart1.y = 5;
        heart1.alpha = 0;
        this.addChild(heart1);

        let heart2 = new egret.Bitmap(RES.getRes("peachHeart_png"));
        heart2.scaleX = 1;
        heart2.scaleY = 1;
        heart2.alpha = 0;
        heart2.x = 68;
        heart2.y = -5;
        this.addChild(heart2);

        let heart3 = new egret.Bitmap(RES.getRes("peachHeart_png"));
        heart3.scaleX = 1.4;
        heart3.scaleY = 1.4;
        heart3.x = 80;
        heart3.y = -18;
        heart3.alpha = 0;
        this.addChild(heart3);

        // this.heartTimer = new egret.Timer(300, 0);
        // this.heartTimer.addEventListener(egret.TimerEvent.TIMER, () => {
        //     if (doCount == 1) {
        //         heart1.alpha = 0;
        //         heart2.alpha = 0;
        //         heart3.alpha = 0;
        //     }
        //     if (doCount == 1) {
        //         heart1.alpha = 1;
        //     }
        //     if (doCount == 2) {
        //         heart2.alpha = 1;
        //     }
        //     if (doCount == 3) {
        //         heart3.alpha = 1;
        //     }
        //     doCount++;
        //     if (doCount == 4) {
        //         doCount = 0;
        //     }
        // }, this);
        // this.heartTimer.start();
    }

}