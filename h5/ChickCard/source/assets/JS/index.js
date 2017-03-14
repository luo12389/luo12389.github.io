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
        logo: {
            default: null,
            type: cc.Sprite
        },
        zhi: {
            default: null,
            type: cc.Sprite
        },
        start1: {
            default: null,
            type: cc.Sprite
        },
        start2: {
            default: null,
            type: cc.Sprite
        },
        start3: {
            default: null,
            type: cc.Sprite
        },
        start4: {
            default: null,
            type: cc.Sprite
        },
        start5: {
            default: null,
            type: cc.Sprite
        },
        start6: {
            default: null,
            type: cc.Sprite
        },
        tip: {
            default: null,
            type: cc.Sprite
        },
        bgMusic: {
            default: null,
            url: cc.AudioClip
        },
        card: {
            default: null,
            type: cc.Button
        },
        de1: {
            default: null,
            type: cc.Sprite
        },
        de2: {
            default: null,
            type: cc.Sprite
        },
        de3: {
            default: null,
            type: cc.Sprite
        },
        de4: {
            default: null,
            type: cc.Sprite
        },
        de5: {
            default: null,
            type: cc.Sprite
        },
        de6: {
            default: null,
            type: cc.Sprite
        },
        de7: {
            default: null,
            type: cc.Sprite
        },
        de8: {
            default: null,
            type: cc.Sprite
        },
        de9: {
            default: null,
            type: cc.Sprite
        },
        de10: {
            default: null,
            type: cc.Sprite
        },
        de11: {
            default: null,
            type: cc.Sprite
        },
        de12: {
            default: null,
            type: cc.Sprite
        },
        chick: cc.Animation
    },

    onLoad: function () {
        this.musicState = 1;
        this.btnState = 0;
        this.musicID = cc.audioEngine.playEffect(this.bgMusic, true);
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            cc.renderer.enableDirtyRegion(false);
        }

        this.start1.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(2.5, cc.p(-this.start2.node.width, 0)),
                )
            )
        );
        this.start3.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(2.5, cc.p(-this.start3.node.width, 0)),

                ),
                cc.callFunc(function () {
                    this.startPage();
                }, this)
            )
        );
        this.start5.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(2.5, cc.p(-this.start5.node.width, 0)),

                )
            )
        );
        this.start2.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(2.5, cc.p(this.start2.node.width, 0)),

                )
            )
        );
        this.start4.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(2.5, cc.p(this.start4.node.width, 0)),

                )
            )
        );
        this.start6.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(3, cc.p(this.start6.node.width, 0)),

                )
            )
        );
    },

    startPage: function () {
        this.cloud1.node.runAction(
            cc.sequence(
                cc.moveBy(15, cc.p(cc.winSize.width + this.cloud1.node.width, 0)),
                cc.place(-399, 167)
            ).repeatForever()
        );
        this.cloud2.node.runAction(
            cc.sequence(
                cc.moveBy(12, cc.p(-cc.winSize.width - this.cloud2.node.width, 0)),
                cc.place(446, 357),
            ).repeatForever()
        );

        this.chick.play('chick');
        this.node.runAction(cc.sequence(cc.delayTime(7), cc.callFunc(this.showCard, this)));
    },

    showCard: function () {
        this.card.node.runAction(cc.spawn(cc.moveTo(1, cc.p(-155, 0)), cc.rotateTo(1, 720)));
        this.de1.node.runAction(
            cc.sequence(
                cc.delayTime(.3),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de1.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),
                cc.place(-210, 553),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.de2.node.runAction(
            cc.sequence(
                cc.delayTime(0.5),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de2.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),
                cc.place(151, 675),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.de3.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de3.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(-157, 576),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.de4.node.runAction(
            cc.sequence(
                cc.delayTime(.2),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de4.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),
                cc.place(83, 579),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.de5.node.runAction(
            cc.sequence(
                cc.delayTime(.8),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de5.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),
                cc.place(-35, 703),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.de6.node.runAction(
            cc.sequence(
                cc.delayTime(0.5),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de6.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),
                cc.place(0, 556),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.de7.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de7.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(-100, 687),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
         this.de8.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de7.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(200, 957),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
         this.de9.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de7.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(150, 667),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
         this.de10.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de7.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(-150, 853),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
         this.de11.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de7.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(-30, 807),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
         this.de12.node.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveBy(6, cc.p(0, -1030)),
                    cc.callFunc(function () {
                        this.de7.node.runAction(cc.sequence(cc.delayTime(4), cc.fadeOut(2)));
                    }, this)
                ),

                cc.place(-284, 1007),
                cc.fadeIn(0.1)
            ).repeatForever()
        );
        this.tip.node.runAction(cc.sequence(cc.delayTime(1.5), cc.fadeIn(1)));
        this.node.runAction(cc.sequence(cc.delayTime(1.1), cc.callFunc(this.showLogo, this)));
    },

    showLogo: function () {
        this.logo.node.runAction(cc.sequence(cc.scaleTo(2, 1).easing(cc.easeElasticOut()), cc.callFunc(function () {
            this.zhi.node.runAction(
                cc.sequence(
                    cc.rotateTo(0.5, 10),
                    cc.rotateTo(0.5, -5),
                    cc.rotateTo(0.5, 10),
                    cc.rotateTo(0.5, -5),
                    cc.delayTime(1)
                ).repeatForever()
            );
            this.card.node.runAction(
                cc.sequence(
                    cc.scaleTo(0.5, 0.8),
                    cc.scaleTo(0.5, 1)
                ).repeatForever()
            );
            this.btnState = 1;
        }, this)));

        this.card.node.on(cc.Node.EventType.TOUCH_END, function (event) {

            var num = Math.round(Math.random() * 5);
            switch (num) {
                case 0:
                    cc.director.loadScene('card1');
                    break;
                case 1:
                    cc.director.loadScene('card2');
                    break;
                case 2:
                    cc.director.loadScene('card3');
                    break;
                case 3:
                    cc.director.loadScene('card4');
                    break;
                case 4:
                    cc.director.loadScene('card5');
                    break;
                case 5:
                    cc.director.loadScene('card6');
                    break;
                default:
                    break;
            }
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});