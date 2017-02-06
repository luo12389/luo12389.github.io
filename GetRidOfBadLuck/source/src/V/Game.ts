// TypeScript file
/**
 * Game
 */
class Game extends eui.Component {
    //回合参数
    public round: number;
    public time: number;
    public life: number;
    public skill: number;

    public row: number;
    public col: number;

    public groupArray = [];
    public chickArray = [];
    public static GAMERUN = "run";
    public constructor(round, time, life, skill) {
        super();
        this.skinName = "resource/skins/game.exml";
        //获取回合信息
        this.round = round;
        this.time = time;
        this.life = life;
        this.skill = skill;
        //初始化界面
        this.init();
    }

    public init() {
        let groupW = 190;
        let groupH = 290;
        //创建第一个和第二个窗户 固定
        let group1 = new eui.Group();
        group1.x = 86.6;
        group1.y = 90;
        this.groupArray.push(group1);

        let group2 = new eui.Group();
        group2.x = 363.2;
        group2.y = 90;
        this.groupArray.push(group2);

        //当回合数大于1时
        if (this.round > 1) {
            let marginY = 20;
            let marginX = 86.6;
            //根据格子个数创建对应的框框  
            for (let index = 0; index < this.round - 1; index++) {
                // 计算行号  和   列号  
                let row = Math.floor(index / 2);
                let col = index % 2;
                //根据行号和列号来确定 子控件的坐标  
                let groupX = marginX + col * (groupW + marginX);
                let groupY = 400 + row * (groupH + marginY);

                egret.log(row);
                let group = new eui.Group();
                group.x = groupX;
                group.y = groupY;
                this.groupArray.push(group);
            }
        }

        for (let i = 0; i < this.groupArray.length; i++) {
            let group = this.groupArray[i];
            let showImg = new egret.Bitmap(RES.getRes(this.randomChoose()));
            this.setBitMap(showImg);
            group.addChild(showImg);
            let win = new eui.Image(this.randomWindow());
            group.addChild(win);
            this.addChild(group);
            egret.Tween.get(showImg)
                .to({ scaleX: 1 }, 200)
                .to({ scaleX: -1 }, 200)
                .to({ scaleX: 1 }, 200);
        }
    }

    //随机颜色窗户
    public randomWindow() {
        let winName: string;
        switch (Math.floor(Math.random() * 6 + 1)) {
            case 1:
                winName = "game_win1_png"
                break;
            case 2:
                winName = "game_win2_png"
                break;
            case 3:
                winName = "game_win3_png"
                break;
            case 4:
                winName = "game_win4_png"
                break;
            case 5:
                winName = "game_win5_png"
                break;
            case 6:
                winName = "game_win6_png"
                break;
        }

        return winName;
    }

    //随机颜色怪兽
    public randomMonster() {
        let monster: string;

        switch (Math.floor(Math.random() * 6 + 1)) {
            case 1:
                monster = "game_monster1_png"
                break;
            case 2:
                monster = "game_monster2_png"
                break;
            case 3:
                monster = "game_monster3_png"
                break;
            case 4:
                monster = "game_monster4_png"
                break;
            case 5:
                monster = "game_monster5_png"
                break;
            case 6:
                monster = "game_monster6_png"
                break;
        }

        return monster;
    }

    //随机小鸡
    public randomChick() {
        let chick: string;
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                chick = "game_chick1_png"
                break;
            case 2:
                chick = "game_chick2_png"
                break;
            case 3:
                chick = "game_chick3_png"
                break;
        }

        return chick;
    }

    //是小鸡还是怪兽
    public randomChoose() {
        let precent: number;
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
    }

    public nextRound() {
        let viewEvent = new ViewEvent(ViewEvent.CHANGE_SCENE_EVENT);
        viewEvent.eventType = Game.GAMERUN;
        ViewController.getInstance().onChangeScene(viewEvent);
    }

    public setBitMap(bitMap: egret.Bitmap) {
        bitMap.anchorOffsetX = bitMap.width / 2;
        bitMap.anchorOffsetY = bitMap.height / 2;
        bitMap.x = 95;
        bitMap.scaleX = -1;
        bitMap.y = 130 + bitMap.height / 2;
    }
}