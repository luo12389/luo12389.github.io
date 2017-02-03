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
 * RIOController
 */
var RIOController = (function (_super) {
    __extends(RIOController, _super);
    function RIOController() {
        var _this = _super.call(this) || this;
        _this.init();
        var channel;
        var sound = RES.getRes("bg_mp3");
        channel = sound.play();
        channel.stop();
        return _this;
    }
    RIOController.prototype.init = function () {
        this.addChild(new RIOResultFirstPage(1, 1));
        this.addEventListener(RIOEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    };
    RIOController.prototype.start = function () {
        this.addEventListener(RIOEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    };
    RIOController.getInstance = function () {
        if (RIOController.instance == null) {
            RIOController.instance = new RIOController();
        }
        return RIOController.instance;
    };
    RIOController.prototype.onChangeScene = function (e) {
        this.removeChildren();
        console.log(e.eventType);
        switch (e.eventType) {
            case RIOResultFirstPage.RUN:
                this.addChild(new RIOResultFirstPage(e.prizeNum, e.count));
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
    };
    return RIOController;
}(egret.Sprite));
__reflect(RIOController.prototype, "RIOController");
//# sourceMappingURL=RIOController.js.map