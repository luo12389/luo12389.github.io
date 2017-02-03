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
 * RIOResultFirstPage
 */
var RIOResultFirstPage = (function (_super) {
    __extends(RIOResultFirstPage, _super);
    function RIOResultFirstPage(prizeNum, count) {
        var _this = _super.call(this) || this;
        _this.shareImg = new egret.Bitmap(RES.getRes("result2_tell_png"));
        _this.skinName = "resource/skins/ResultFirstSkin.exml";
        //初始化
        var text;
        var img;
        _this.num = prizeNum;
        _this.count = count;
        switch (prizeNum) {
            case 1:
                //洋洋
                img = "result1_yy_img_png";
                text = "result1_yy_text_png";
                break;
            case 2:
                //郭采洁
                img = "result1_cj_img_png";
                text = "result1_cj_text_png";
                break;
            case 3:
                //card
                img = "result1_card_img_png";
                text = "result1_card_text_png";
                break;
            case 4:
                //瓶
                img = "result1_package1_img_png";
                text = "result1_package1_text_png";
                break;
            case 5:
                //罐
                img = "result1_package2_img_png";
                text = "result1_package2_text_png";
                break;
            case 6:
                img = "result1_youhui20_img_png";
                text = "result1_youhui20_text_png";
                break;
            case 7:
                //5元优惠券
                img = "result1_youhui5_img_png";
                text = "result1_youhui5_text_png";
                break;
            default:
                break;
        }
        _this.init();
        _this.prizeShow(img, text);
        return _this;
    }
    RIOResultFirstPage.prototype.init = function () {
        //添加分享，隐藏分享
        this.getPrize.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPageClick, this);
    };
    //奖品分类动画
    RIOResultFirstPage.prototype.prizeShow = function (img, title) {
        var _this = this;
        //奖品
        var prize = new egret.Bitmap(RES.getRes(img));
        prize.x = 320;
        prize.y = 340 + prize.height / 2;
        prize.anchorOffsetY = prize.height / 2;
        prize.anchorOffsetX = prize.width / 2;
        prize.scaleX = 0;
        prize.scaleY = 0;
        this.addChild(prize);
        if (img === "result1_package2_img_png") {
            prize.y = prize.height / 2;
        }
        //奖品文字
        var text = new egret.Bitmap(RES.getRes(title));
        text.x = 320;
        text.y = 260;
        text.anchorOffsetX = text.width / 2;
        text.anchorOffsetY = text.height / 2;
        text.scaleX = 0;
        text.scaleY = 0;
        this.addChild(text);
        //美食卡
        if (img === "result1_card_img_png") {
            var paper = new egret.Bitmap(RES.getRes("result1_paper2_png"));
            paper.x = 320;
            paper.alpha = 0;
            paper.y = 470;
            paper.anchorOffsetX = paper.width / 2;
            paper.anchorOffsetY = paper.height / 2;
            this.addChild(paper);
            //装饰
            var de = new egret.Bitmap(RES.getRes("result1_decoration1_png"));
            de.x = 460;
            de.alpha = 0;
            de.y = 340;
            this.addChild(de);
            var hint = new egret.Bitmap(RES.getRes("result1_card_hint_png"));
            hint.x = 320;
            hint.y = 540;
            hint.scaleX = 0;
            hint.scaleY = 0;
            hint.anchorOffsetX = hint.width / 2;
            hint.anchorOffsetY = hint.height / 2;
            this.addChild(hint);
            egret.Tween.get(hint)
                .wait(500)
                .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
            egret.Tween.get(paper)
                .wait(700)
                .to({ alpha: 1 }, 500);
            egret.Tween.get(de)
                .wait(700)
                .to({ alpha: 1 }, 500);
        }
        else if (img === "result1_package1_img_png" || img === "result1_package2_img_png") {
            var paper = new egret.Bitmap(RES.getRes("result1_paper1_png"));
            paper.x = 320;
            paper.alpha = 0;
            paper.y = 500;
            paper.anchorOffsetX = paper.width / 2;
            paper.anchorOffsetY = paper.height / 2;
            this.addChild(paper);
            //装饰
            var decoration1 = new egret.Bitmap(RES.getRes("result1_decoration1_png"));
            decoration1.x = 450;
            decoration1.alpha = 0;
            decoration1.y = 400;
            this.addChild(decoration1);
            var decoration2 = new egret.Bitmap(RES.getRes("result1_decoration2_png"));
            decoration2.x = 170;
            decoration2.alpha = 0;
            decoration2.y = 350;
            this.addChild(decoration2);
            egret.Tween.get(paper)
                .wait(800)
                .to({ alpha: 1 }, 500);
            egret.Tween.get(decoration1)
                .wait(800)
                .to({ alpha: 1 }, 500);
            egret.Tween.get(decoration2)
                .wait(800)
                .to({ alpha: 1 }, 500);
        }
        else if (img === "result1_yy_img_png" || img === "result1_cj_img_png" || img === "result1_youhui20_img_png" || img === "result1_youhui5_img_png") {
            prize.y = prize.y - 20;
            var paper = new egret.Bitmap(RES.getRes("result1_paper2_png"));
            paper.x = 320;
            paper.alpha = 0;
            paper.y = 480;
            paper.anchorOffsetX = paper.width / 2;
            paper.anchorOffsetY = paper.height / 2;
            this.addChild(paper);
            //装饰
            var decoration1 = new egret.Bitmap(RES.getRes("result1_decoration1_png"));
            decoration1.x = 420;
            decoration1.alpha = 0;
            decoration1.y = 400;
            this.addChild(decoration1);
            if (img === "result1_yy_img_png" || img === "result1_cj_img_png") {
                var hint2 = new egret.Bitmap(RES.getRes("result1_qianming_hint_png"));
                hint2.x = 320;
                hint2.y = 580;
                hint2.alpha = 0;
                hint2.anchorOffsetX = hint2.width / 2;
                hint2.anchorOffsetY = hint2.height / 2;
                this.addChild(hint2);
                egret.Tween.get(hint2)
                    .wait(700)
                    .to({ alpha: 1 }, 500);
            }
            else {
                prize.y = prize.y + 40;
                paper.y = paper.y + 40;
                decoration1.x = 480;
                decoration1.y = 360;
            }
            egret.Tween.get(paper)
                .wait(700)
                .to({ alpha: 1 }, 500);
            egret.Tween.get(decoration1)
                .wait(700)
                .to({ alpha: 1 }, 500);
        }
        egret.Tween.get(text).to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut);
        egret.Tween.get(prize)
            .wait(500)
            .to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.elasticOut)
            .call(function () {
            egret.Tween.get(text, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 250)
                .to({ scaleX: 1, scaleY: 1 }, 250)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 250)
                .to({ scaleX: 1, scaleY: 1 }, 250)
                .wait(800);
            if (_this.count == 1) {
                egret.Tween.get(_this.getPrize)
                    .to({ alpha: 1, y: 700 }, 1000)
                    .wait(300)
                    .call(function () {
                    egret.Tween.get(_this.getPrize, { loop: true })
                        .to({ rotation: 3 }, 100)
                        .to({ rotation: -3 }, 100)
                        .to({ rotation: 3 }, 100)
                        .to({ rotation: -3 }, 100)
                        .to({ rotation: 3 }, 100)
                        .to({ rotation: -3 }, 100)
                        .to({ rotation: 0 }, 100)
                        .wait(500);
                });
            }
        });
    };
    //按钮点击事件
    RIOResultFirstPage.prototype.nextPageClick = function () {
        var _this = this;
        egret.Tween.get(this.getPrize)
            .to({ scaleX: .9, scaleY: .9 }, 150)
            .to({ scaleX: 1, scaleY: 1 }, 150)
            .call(function () {
            window["btnclick"]("LingJiang");
            //传递事件
            var rioEvent = new RIOEvent(RIOEvent.CHANGE_SCENE_EVENT);
            rioEvent.eventType = RIOWriteInfoPage.RUN;
            rioEvent.prizeNum = _this.num;
            rioEvent.obj = _this;
            RIOController.getInstance().onChangeScene(rioEvent);
        });
    };
    return RIOResultFirstPage;
}(eui.Component));
RIOResultFirstPage.RUN = "FirstRun";
__reflect(RIOResultFirstPage.prototype, "RIOResultFirstPage");
