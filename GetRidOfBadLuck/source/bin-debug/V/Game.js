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
 * Game
 */
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(round, time, life, skill) {
        var _this = _super.call(this) || this;
        _this.groupArray = [];
        _this.chickArray = [];
        _this.skinName = "resource/skins/game.exml";
        //获取回合信息
        _this.round = round;
        _this.time = time;
        _this.life = life;
        _this.skill = skill;
        //初始化界面
        _this.init();
        return _this;
    }
    Game.prototype.init = function () {
        var groupW = 190;
        var groupH = 290;
        //创建第一个和第二个窗户 固定
        var group1 = new eui.Group();
        group1.x = 86.6;
        group1.y = 90;
        this.groupArray.push(group1);
        var group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);
        //当回合数大于1时
        if (this.round > 1) {
            var marginY = 20;
            var marginX = 86.6;
            //根据格子个数创建对应的框框  
            for (var index_1 = 0; index_1 < this.round - 1; index_1++) {
                // 计算行号  和   列号  
                var row = Math.floor(index_1 / 2);
                var col = index_1 % 2;
                //根据行号和列号来确定 子控件的坐标  
                var groupX = marginX + col * (groupW + marginX);
                var groupY = 400 + row * (groupH + marginY);
                egret.log(row);
                var group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
            }
        }
        for (var i = 0; i < this.groupArray.length; i++) {
            var group = this.groupArray[i];
            var showImg = new egret.Bitmap(RES.getRes(this.randomChoose()));
            this.setBitMap(showImg);
            group.addChild(showImg);
            var win = new eui.Image(this.randomWindow());
            group.addChild(win);
            this.addChild(group);
            egret.Tween.get(showImg)
                .to({ scaleX: 1 }, 200)
                .to({ scaleX: -1 }, 200)
                .to({ scaleX: 1 }, 200);
        }
    };
    //随机颜色窗户
    Game.prototype.randomWindow = function () {
        var winName;
        switch (Math.floor(Math.random() * 6 + 1)) {
            case 1:
                winName = "game_win1_png";
                break;
            case 2:
                winName = "game_win2_png";
                break;
            case 3:
                winName = "game_win3_png";
                break;
            case 4:
                winName = "game_win4_png";
                break;
            case 5:
                winName = "game_win5_png";
                break;
            case 6:
                winName = "game_win6_png";
                break;
        }
        return winName;
    };
    //随机颜色怪兽
    Game.prototype.randomMonster = function () {
        var monster;
        switch (Math.floor(Math.random() * 6 + 1)) {
            case 1:
                monster = "game_monster1_png";
                break;
            case 2:
                monster = "game_monster2_png";
                break;
            case 3:
                monster = "game_monster3_png";
                break;
            case 4:
                monster = "game_monster4_png";
                break;
            case 5:
                monster = "game_monster5_png";
                break;
            case 6:
                monster = "game_monster6_png";
                break;
        }
        return monster;
    };
    //随机小鸡
    Game.prototype.randomChick = function () {
        var chick;
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                chick = "game_chick1_png";
                break;
            case 2:
                chick = "game_chick2_png";
                break;
            case 3:
                chick = "game_chick3_png";
                break;
        }
        return chick;
    };
    //是小鸡还是怪兽
    Game.prototype.randomChoose = function () {
        var precent;
        switch (this.round) {
            case 1:
                precent = 2;
                break;
            case 2:
                precent = 3;
                break;
            case 3:
                precent = 4;
                break;
            case 4:
                precent = 5;
                break;
            case 5:
                precent = 6;
                break;
        }
        if (Math.floor(Math.random() * precent + 1) == 1) {
            return this.randomMonster();
        }
        return this.randomChick();
    };
    Game.prototype.nextRound = function () {
        var viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    };
    Game.prototype.setBitMap = function (bitMap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.anchorOffsetY = bitMap.height / 2;
        bitMap.x = 95;
        bitMap.scaleX = -1;
        bitMap.y = 130 + bitMap.height / 2;
    };
    return Game;
}(eui.Component));
Game.GAMERUN = "run";
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map