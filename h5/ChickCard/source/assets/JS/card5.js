cc.Class({
    extends: cc.Component,

    properties: {
        cloud1: {
            default: null,
            type: cc.Sprite
        },
        cloud2: {
            default: null,
            type: cc.Sprite
        },
        sheng: {
            default: null,
            type: cc.Sprite
        },
        ji: {
            default: null,
            type: cc.Sprite
        },
        bo1: {
            default: null,
            type: cc.Sprite
        },
        bo2: {
            default: null,
            type: cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
        this.sheng.node.runAction(cc.fadeIn(1));
        this.bo1.node.runAction(cc.fadeIn(1));
        this.bo2.node.runAction(cc.fadeIn(1));
        this.ji.node.runAction(cc.sequence(
              cc.delayTime(1.4),
            cc.scaleTo(2, 1).easing(cc.easeElasticOut()),
            cc.callFunc(function () {
                this.ji.node.runAction(cc.sequence(
                    cc.delayTime(.5),
                    cc.rotateTo(1, 5),
                    cc.rotateTo(1, 0),
                    cc.rotateTo(1, 5),
                    cc.rotateTo(1, 0),
                ).repeatForever());
            }, this)));
        this.cloud1.node.runAction(
            cc.sequence(
                cc.moveBy(15, cc.p(-cc.winSize.width - this.cloud1.node.width, 0)),
                cc.place(432, 133)
            ).repeatForever()
        );
        this.cloud2.node.runAction(
            cc.sequence(
                cc.moveBy(12, cc.p(cc.winSize.width + this.cloud2.node.width, 0)),
                cc.place(-433, 263),
            ).repeatForever()
        );
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});