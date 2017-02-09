// TypeScript file
/**
 * RIOIndexPage
 */
class RIOIndexPage extends eui.Component {
    public title: eui.Image;
    public ruleBtn: eui.Image;
    public yy: eui.Group;
    public caijie: eui.Group;
    public package1: eui.Group;
    public package2: eui.Group;
    public youhui5: eui.Group;
    public youhui20: eui.Group;
    public card: eui.Group;
    public hint: eui.Image;
    public lottery: eui.Image;
    public bg: eui.Image;
    public channel: egret.SoundChannel;
    public sound: egret.Sound = RES.getRes("bg_mp3");

    public ruleImg = new egret.Bitmap(RES.getRes("index_rule_img_png"));
    public knowBtn = new egret.Bitmap(RES.getRes("index_know_png"));
    private duration: number = 500;
    private anAlpha: number = 0.8;
    public constructor() {
        super();
        this.skinName = "resource/skins/IndexSkin.exml"
        this.init();
    }

    public init() {
        let time = 1000 / 60;
        egret.Tween.get(this.title)
            .to({ scaleX: 1.3, scaleY: 1.3, rotation: 360 }, 500, egret.Ease.quadOut)
            .to({ scaleX: 1, scaleY: 1 }, 700, egret.Ease.quintOut)
            .call(() => {
                // 优惠5
                egret.Tween.get(this.youhui5)
                    .to({ alpha: 1, y: 436 }, 1000);
                // 优惠20
                egret.Tween.get(this.youhui20)
                    .to({ alpha: 1, x: 430 }, 1000);
                //卡
                egret.Tween.get(this.card)
                    .to({ alpha: 1, y: 400 }, 1000);
                //礼包1
                egret.Tween.get(this.package1)
                    .to({ alpha: 1, x: 228 }, 1000);
                //yy
                egret.Tween.get(this.yy)
                    .to({ alpha: 1, x: 408 }, 1000);
                //caijie
                egret.Tween.get(this.caijie)
                    .to({ alpha: 1, x: 564 }, 1000);
                //礼包2
                egret.Tween.get(this.package2)
                    .to({ alpha: 1, x: 546 }, 1000);
            })
            .wait(500)
            .call(() => {
                //hint
                egret.Tween.get(this.hint)
                    .to({ y: 690, alpha: 1 }, 1000);
                egret.Tween.get(this.lottery)
                    .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
                    .call(() => {
                        this.lottery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPageClick, this);
                        this.lottery.touchEnabled = true;

                        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);
                        this.ruleBtn.touchEnabled = true;
                    });
            })
            .wait(2000)
            .call(() => {

                egret.Tween.get(this.title, { loop: true })
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 250)
                    .to({ scaleX: 1, scaleY: 1 }, 250)
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 250)
                    .to({ scaleX: 1, scaleY: 1 }, 250)
                    .wait(this.duration * 4 * 2);

                //卡
                egret.Tween.get(this.card, { loop: true })
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .wait(this.duration * 4 * 6);
                //5
                egret.Tween.get(this.youhui5, { loop: true })
                    .wait(this.duration * 4)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .wait(this.duration * 4 * 5);
                //20
                egret.Tween.get(this.youhui20, { loop: true })
                    .wait(this.duration * 4 * 2)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .wait(this.duration * 4 * 4);
                //caijie
                egret.Tween.get(this.caijie, { loop: true })
                    .wait(this.duration * 4 * 3)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .wait(this.duration * 4 * 3);
                //礼包2
                egret.Tween.get(this.package2, { loop: true })
                    .wait(this.duration * 4 * 4)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .wait(this.duration * 4 * 2)
                //yy
                egret.Tween.get(this.yy, { loop: true })
                    .wait(this.duration * 4 * 5)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .wait(this.duration * 4);
                //libao 1
                egret.Tween.get(this.package1, { loop: true })
                    .wait(this.duration * 4 * 6)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)
                    .to({ alpha: this.anAlpha, scaleX: 1.2, scaleY: 1.2 }, this.duration)
                    .to({ alpha: 1, scaleX: 1, scaleY: 1 }, this.duration)

            });
        //添加规则图片,并隐藏
        this.addChild(this.ruleImg);
        this.ruleImg.alpha = 0;
        //添加规则按钮,设位置,并隐藏，添加点击事件
        this.knowBtn.x = (640 - this.knowBtn.width) / 2;
        this.knowBtn.y = 930;
        this.addChild(this.knowBtn);
        this.knowBtn.alpha = 0;
        this.knowBtn.touchEnabled = true;
        this.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideRule, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.music, this);
    }

    public music() {
        this.channel = this.sound.play();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.music, this);
        this.touchEnabled = false;
    }

    //按钮点击事件
    public nextPageClick() {
        egret.Tween.get(this.lottery)
            .to({ scaleX: .9, scaleY: .9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(() => {
                //移除点击，防止再次点击
                // this.lottery.touchEnabled = false;
                //请求抽奖
                // window["btnclick"]("ChouJiang");
                // let url = window["rewardPath"];
                // var request = new egret.HttpRequest();
                // request.responseType = egret.HttpResponseType.TEXT;
                // request.open(url, egret.HttpMethod.POST);
                // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // request.send();
                // request.addEventListener(egret.Event.COMPLETE, this.getData, this);
                // request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getError, this);

                // let rewardState = Math.floor(Math.random() * 2);
                let rewardState = 1;
                let rewardType: number;
                if (rewardState) {
                    rewardType = Math.floor(Math.random() * 7 + 1);
                    console.log(rewardType);
                }
                else {
                    rewardType = Math.floor(Math.random() * 3 + 1);
                }
                let info = { "rewardState": rewardState, "rewardType": rewardType };
                this.getData(info);
            });
    }

    public getData(/*event: egret.Event*/info) {
        //得到参数
        // let request = <egret.HttpRequest>event.currentTarget;
        // let info = JSON.parse(request.response);
        if (info.rewardState === 1 && info.rewardType) {
            console.log("抽奖成功");
            //移除监听
            if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.music, this);
            }
            //知道按钮监听
            this.knowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideRule, this);
            //规则按钮监听
            this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);
            //领取奖品按钮监听
            this.lottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);

            let rioEvent = new RIOEvent(RIOEvent.CHANGE_SCENE_EVENT);
            rioEvent.prizeNum = info.rewardType;
            rioEvent.count = 1;
            rioEvent.eventType = RIOResultFirstPage.RUN;
            rioEvent.obj = this;
            RIOController.getInstance().onChangeScene(rioEvent);
        }
        else if (info.rewardState === 0 && info.rewardType == 1) {
            if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.music, this);
            }
            console.log("您已抽过奖");
            //知道按钮监听
            this.knowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideRule, this);
            //规则按钮监听
            this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);
            //领取奖品按钮监听
            this.lottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);

            let rioEvent = new RIOEvent(RIOEvent.CHANGE_SCENE_EVENT);
            rioEvent.prizeNum = info.rewardType;
            rioEvent.eventType = RIOWriteInfoPage.RUN;
            rioEvent.obj = this;
            RIOController.getInstance().onChangeScene(rioEvent);
        }
        else if (info.rewardState == 0 && info.rewardType == 2) {

            //抽奖失败
            console.log(info);
            //移除监听

            //知道按钮监听
            this.knowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideRule, this);
            //规则按钮监听
            this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);
            //领取奖品按钮监听
            this.lottery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ruleShow, this);

            let rioEvent = new RIOEvent(RIOEvent.CHANGE_SCENE_EVENT);
            rioEvent.obj = this;
            rioEvent.eventType = RIOResultSecondPage.RUN;
            RIOController.getInstance().onChangeScene(rioEvent);

            // else if (info.rewardInfo === 2) {
            //     alert("没奖品了,亲");
            //     this.lottery.touchEnabled = true;
            // }
            // else if (info.rewardInfo === 3) {
            //     alert("每人只有一次抽奖机会哦");
            //     this.lottery.touchEnabled = true;
            // }
        }
        else if (info.rewardState === 0 && info.rewardType == 3) {
            alert("没奖品了,亲");
            this.lottery.touchEnabled = true;
        }
        else if (info.rewardState === 0 && info.rewardType == 4) {
            alert("每人只有一次抽奖机会哦");
            this.lottery.touchEnabled = true;
        }
        // else if (!info.rewardState || !info.rewardType) {
        //     alert("数据错误");
        //     //恢复点击
        //     this.lottery.touchEnabled = true;
        // }
    }

    //展示规则
    public ruleShow() {
        //暂时关闭规则按钮,防止重复点击
        this.ruleBtn.touchEnabled = false;
        //显示规则图片和按钮
        this.ruleImg.alpha = 1;
        this.knowBtn.alpha = 1;
    }

    //隐藏规则
    public hideRule() {
        this.ruleImg.alpha = 0;
        this.knowBtn.alpha = 0;
        //恢复规则按钮
        this.ruleBtn.touchEnabled = true;
    }

    public getError() {
        alert("网络有问题，请检查网络");
        this.lottery.touchEnabled = true;
    }
}