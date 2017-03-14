var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 * RIOWriteInfoPage
 */
var RIOWriteInfoPage = (function (_super) {
    __extends(RIOWriteInfoPage, _super);
    function RIOWriteInfoPage(num) {
        var _this = _super.call(this) || this;
        _this.prizeType = num;
        _this.skinName = "resource/skins/WriteInfoSkin.exml";
        _this.address.alpha = 0;
        egret.Tween.get(_this.info)
            .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut)
            .call(function () {
            _this.address.alpha = 1;
            egret.Tween.get(_this.sub).to({ scaleX: 1, scaleY: 1 }, 500);
            egret.Tween.get(_this.title, { loop: true })
                .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                .to({ scaleX: 1, scaleY: 1 }, 300)
                .to({ scaleX: 1.05, scaleY: 1.05 }, 300)
                .to({ scaleX: 1, scaleY: 1 }, 300)
                .wait(1000);
        });
        _this.sub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.subInfo, _this);
        return _this;
    }
    RIOWriteInfoPage.prototype.subInfo = function () {
        var _this = this;
        egret.Tween.get(this.sub)
            .to({ scaleX: .9, scaleY: .9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(function () {
            if (_this.user.text.length >= 2 && _this.phone.text.length === 11) {
                if (_this.prizeType != 6 && _this.prizeType != 7 && _this.address.text.length === 0) {
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
                    var randomNum = Math.floor(Math.random() * 2);
                    var info = { state: randomNum };
                    _this.getData(info);
                }
            }
            else {
                if (_this.user.text.length < 2) {
                    alert("姓名不符合要求");
                }
                else {
                    alert("手机号码格式不正确");
                }
            }
        });
    };
    RIOWriteInfoPage.prototype.getData = function (/*event: egret.Event*/ info) {
        // let request = <egret.HttpRequest>event.currentTarget;
        // let info = JSON.parse(request.response);
        if (info.state && info.state === 1) {
            alert("感谢您的参与！RIO提示：10个工作日内，实物奖品将会快递送达，RIO天猫旗舰店优惠券将由短信发送至您填写的手机号码，敬请查收。");
            var rioEvent = new RIOEvent(RIOEvent.CHANGE_SCENE_EVENT);
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
    };
    RIOWriteInfoPage.prototype.getError = function () {
        alert("网络请求失败");
    };
    return RIOWriteInfoPage;
}(eui.Component));
RIOWriteInfoPage.RUN = "InfoRun";
__reflect(RIOWriteInfoPage.prototype, "RIOWriteInfoPage");
//# sourceMappingURL=RIOWriteInfoPage.js.map