// TypeScript file
/**
 * RIOWriteInfoPage 
 */
class RIOWriteInfoPage extends eui.Component {
    public static RUN = "InfoRun";
    public title: eui.Image;
    public info: eui.Image;
    public sub: eui.Image;
    public user: eui.EditableText;
    public phone: eui.EditableText;
    public address: eui.EditableText;
    public prizeType: number;

    public timer: egret.Timer;
    public constructor(num) {
        super();
        this.prizeType = num;
        this.skinName = "resource/skins/WriteInfoSkin.exml"
        this.address.alpha = 0;

        egret.Tween.get(this.info)
            .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut)
            .call(() => {
                this.address.alpha = 1;
                egret.Tween.get(this.sub).to({ scaleX: 1, scaleY: 1 }, 500);
                egret.Tween.get(this.title, { loop: true })
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                    .to({ scaleX: 1, scaleY: 1 }, 300)
                    .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                    .to({ scaleX: 1, scaleY: 1 }, 300)
                    .wait(1000);
            });
        this.sub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subInfo, this);
    }

    public subInfo() {
        egret.Tween.get(this.sub)
            .to({ scaleX: .9, scaleY: .9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(() => {
                if (this.user.text.length >= 2 && this.phone.text.length === 11) {
                    if (this.prizeType != 6 && this.prizeType != 7 && this.address.text.length === 0) {
                        alert("请填写地址");
                    }
                    else {
                        // let url = window["subPath"];
                        // // index.php?welcome/update_address',{username:name,tel:phone,address:address
                        // var params = "username=" + this.user.text + "&tel=" + this.phone.text + "&address=" + this.address.text;
                        // var request = new egret.HttpRequest();
                        // request.responseType = egret.HttpResponseType.TEXT;
                        // request.open(url, egret.HttpMethod.POST);
                        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        // request.send(params);
                        // request.addEventListener(egret.Event.COMPLETE, this.getData, this);
                        // request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.getError, this);
                        let randomNum = Math.floor(Math.random() * 2)
                        let info = { state: randomNum };
                        this.getData(info);
                    }
                }
                else {
                    if (this.user.text.length < 2) {
                        alert("姓名不符合要求");
                    }
                    else {
                        alert("手机号码格式不正确");
                    }
                }
            });
    }

    public getData(/*event: egret.Event*/info) {
        // let request = <egret.HttpRequest>event.currentTarget;
        // let info = JSON.parse(request.response);
        if (info.state && info.state === 1) {

            alert("感谢您的参与！RIO提示：10个工作日内，实物奖品将会快递送达，RIO天猫旗舰店优惠券将由短信发送至您填写的手机号码，敬请查收。");

            let rioEvent = new RIOEvent(RIOEvent.CHANGE_SCENE_EVENT);
            rioEvent.prizeNum = this.prizeType;
            rioEvent.eventType = RIOResultFirstPage.RUN;
            rioEvent.obj = this;
            rioEvent.count = 2;
            RIOController.getInstance().onChangeScene(rioEvent);

            this.sub.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subInfo, this);
        }
        else if (info.state && info.state === 0) {

            alert("提交失败,请重新提交");
            this.sub.touchEnabled = true;
        }
        else if (info.state && info.state === 2) {

            alert(" 不可重复提交信息");
            this.sub.touchEnabled = false;
        }
    }

    public getError() {
        alert("网络请求失败");
    }
}