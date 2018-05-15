const ballDistance = 120;
const rotationSpeed = 4;
const visibleTargets = 7;
const bgColors = ["62bd18", "ffbb00", "ff5300", "d21034", "ff475c", "8f16b2"];
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Sprite,
        highScoresText: cc.Label,
        curScoresText: cc.Label,
        targetBox: cc.Node,
        ballBox: cc.Node,
        gameBox: cc.Node,
        armSF: cc.SpriteFrame,
        ballSF: cc.SpriteFrame,
        targetSF: cc.SpriteFrame
    },

    // use this for initialization
    onLoad() {
        //读取纪录
        this.highScores = cc.sys.localStorage.getItem('HS') ? cc.sys.localStorage.getItem('HS') : 0;
        this.highScoresText.string = "最高分数:" + this.highScores;
        //获取画布信息
        var canvasSize = cc.view.getFrameSize();
        //随机背景颜色
        this.bgColorCode = bgColors[parseInt(Math.random() * bgColors.length)];
        var armColorCode;
        this.bg.node.color = cc.hexToColor("#" + this.bgColorCode);
        do {
            armColorCode = bgColors[parseInt(Math.random() * bgColors.length)];
        } while (armColorCode === this.bgColorCode);
        this.saveRotationSpeed = rotationSpeed;
        //滚动方向
        this.rotatingDirection = Math.floor(Math.random() * 2);
        //销毁状态
        this.destroy = false;
        //步骤
        this.steps = 0;
        //分组 0=default  1=gameGroup 2=targetGroup 3=ballGroup 
        this.groupList = cc.game.groupList;
        //杆
        var armNode = new cc.Node('arm');
        this.ballBox.addChild(armNode);
        armNode.setPosition(0, -100);
        this.arm = armNode.addComponent(cc.Sprite);
        this.arm.spriteFrame = this.armSF;
        armNode.color = cc.hexToColor("#" + armColorCode);
        armNode.anchorX = 1;
        armNode.group = this.groupList[3];

        //两个球
        var ballNode1 = new cc.Node('ballNode1');
        this.ballBox.addChild(ballNode1);
        ballNode1.setPosition(0, -100);
        this.ball1 = ballNode1.addComponent(cc.Sprite);
        this.ball1.spriteFrame = this.ballSF;
        ballNode1.color = cc.hexToColor("#" + armColorCode);
        ballNode1.group = this.groupList[3];

        var ballNode2 = new cc.Node('ballNode2');
        this.ballBox.addChild(ballNode2);
        ballNode2.setPosition(-120, -100);
        this.ball2 = ballNode2.addComponent(cc.Sprite);
        this.ball2.spriteFrame = this.ballSF;
        ballNode2.color = cc.hexToColor("#" + armColorCode);
        ballNode2.group = this.groupList[3];
        this.balls = [this.ball1, this.ball2];
        //旋转角度
        this.rotationAngle = 0;
        //旋转球号
        this.rotationBall = 1;
        //目标点数组
        this.targetArray = []
        var targetNode = new cc.Node('targetNode');
        targetNode.x = this.balls[0].node.x;
        targetNode.y = this.balls[0].node.y;
        var target = targetNode.addComponent(cc.Sprite);
        target.spriteFrame = this.targetSF;
        this.targetBox.addChild(targetNode);
        this.targetArray.push(targetNode);

        // //创建目标
        for (var i = 0; i < visibleTargets; i++) {
            this.addTarget();
        }
        this.node.on(cc.Node.EventType.TOUCH_START, this.changeBall, this);
    },

    addTarget() {
        this.steps++;
        var startX = this.targetArray[this.targetArray.length - 1].x;
        var startY = this.targetArray[this.targetArray.length - 1].y;

        //偏离角度
        var randomAngle = Math.floor(Math.random() * 60);
        var randomDirection = Math.floor(Math.random() * 2);
        var targetNode = new cc.Node('targetNode');
        var ballDisX = ballDistance * Math.sin(cc.degreesToRadians(randomAngle));
        var ballDisY = ballDistance * Math.cos(cc.degreesToRadians(randomAngle));
        if (randomDirection) {
            targetNode.x = startX + ballDisX;
        } else {
            targetNode.x = startX - ballDisX;
        }
        targetNode.y = startY + ballDisY;
        var target = targetNode.addComponent(cc.Sprite);
        target.spriteFrame = this.targetSF;
        var labelNode = new cc.Node('Label')
        targetNode.addChild(labelNode);
        var label = labelNode.addComponent(cc.Label);
        label.string = "" + this.steps;
        labelNode.color = cc.hexToColor("#" + this.bgColorCode);
        this.targetBox.addChild(targetNode);
        this.targetArray.push(targetNode);
    },

    // called every frame
    update() {
        var disFromTarget = cc.pDistance(this.balls[this.rotationBall].node.position, this.targetArray[1].position);
        if (disFromTarget > 90 && this.destroy && this.steps > visibleTargets) {
            this.gameOver();
        }
        if (disFromTarget < 40 && !this.destroy) {
            this.destroy = true;
        }
        this.rotationAngle = (this.rotationAngle + this.saveRotationSpeed * (this.rotatingDirection * 2 - 1)) % 360;
        if (this.arm.node) {
            this.arm.node.rotation = this.rotationAngle + 180;
            this.balls[this.rotationBall].node.x = this.balls[1 - this.rotationBall].node.x + ballDistance * Math.cos(cc.degreesToRadians(this.rotationAngle));
            this.balls[this.rotationBall].node.y = this.balls[1 - this.rotationBall].node.y - ballDistance * Math.sin(cc.degreesToRadians(this.rotationAngle))
        }
        var distanceX = this.node.convertToWorldSpace(this.balls[1 - this.rotationBall].node.position).x;
        var distanceY = this.node.convertToWorldSpace(this.balls[1 - this.rotationBall].node.position).y + 100;
        this.gameBox.x = -distanceX;
        this.gameBox.y = -distanceY;
    },

    changeBall: function () {
        this.destroy = false;
        var disFromTarget = cc.pDistance(this.balls[this.rotationBall].node.position, this.targetArray[1].position);
        this.rotatingDirection = Math.floor(Math.random() * 2);
        console.log(disFromTarget);
        if (disFromTarget < 20) {
            this.targetArray[0].runAction(
                cc.sequence(
                    cc.fadeOut(0.1),
                    cc.callFunc(function () {
                        this.targetArray[0].destroy();
                        this.targetArray.shift();
                    }, this)
                )
            )
            this.arm.node.position = this.balls[this.rotationBall].node.position;
            this.rotationBall = 1 - this.rotationBall;
            this.rotationAngle = cc.pAngle(this.balls[1 - this.rotationBall].node.position, this.balls[this.rotationBall].node.position) + 90;
            this.arm.node.rotation = this.rotationAngle - 90;
            this.addTarget();
            this.curScoresText.string = "当前分数：" + (this.steps - visibleTargets);
        } else {
            this.gameOver();
        }
    },

    gameOver() {
        cc.sys.localStorage.setItem('HS', Math.max(this.highScores, this.steps - visibleTargets));
        this.node.off(cc.Node.EventType.TOUCH_START, this.changeBall, this);
        this.saveRotationSpeed = 0;
        this.arm.node.destroy();
        this.destroy = false;
        this.balls[1 - this.rotationBall].node.runAction(
            cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(function () {
                    cc.director.loadScene("helloworld");
                }, this)
            )
        );
    }
});