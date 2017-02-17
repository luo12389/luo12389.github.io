//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.Component {
    public bar: eui.Image;
    public barText: eui.Label;

    public barMask: egret.Rectangle;
    public constructor() {
        super();
        this.skinName = "resource/skins/loading.exml";

        //小鸡帧动画
        let chickPng = RES.getRes("loading_chick_png");
        let chickJson = RES.getRes("loading_chick_json");
        let chickMCDF = new egret.MovieClipDataFactory(chickJson, chickPng);
        let chickMC = new egret.MovieClip(chickMCDF.generateMovieClipData("444"));
        chickMC.anchorOffsetX = chickMC.width / 2;
        chickMC.x = 320;
        chickMC.y = 320;
        this.addChild(chickMC);

        //怪物1帧动画
        let monster1Png = RES.getRes("loading_monster1_png");
        let monster1Json = RES.getRes("loading_monster1_json");
        let monster1MCDF = new egret.MovieClipDataFactory(monster1Json, monster1Png);
        let monster1MC = new egret.MovieClip(monster1MCDF.generateMovieClipData("111"));
        monster1MC.x = 700;
        monster1MC.y = 300;
        monster1MC.anchorOffsetX = monster1MC.width;
        monster1MC.anchorOffsetY = monster1MC.height;
        monster1MC.rotation = 60;
        this.addChild(monster1MC);

        //怪物2帧动画
        let monster2Png = RES.getRes("loading_monster2_png");
        let monster2Json = RES.getRes("loading_monster2_json");
        let monster2MCDF = new egret.MovieClipDataFactory(monster2Json, monster2Png);
        let monster2MC = new egret.MovieClip(monster2MCDF.generateMovieClipData("222"));
        monster2MC.x = -420;
        monster2MC.y = 560;
        this.addChild(monster2MC);

        //怪物3帧动画
        let monster3Png = RES.getRes("loading_monster3_png");
        let monster3Json = RES.getRes("loading_monster3_json");
        let monster3MCDF = new egret.MovieClipDataFactory(monster3Json, monster3Png);
        let monster3MC = new egret.MovieClip(monster3MCDF.generateMovieClipData("333"));
        monster3MC.x = 420;
        monster3MC.y = 1010;
        this.addChild(monster3MC);

        egret.Tween.get(monster1MC)
            .wait(300)
            .to({ rotation: -10 }, 500)
            .call(() => {
                monster1MC.play(-1);
            });

        egret.Tween.get(monster2MC)
            .to({ x: -290, y: 400 }, 500)
            .call(() => {
                monster2MC.play(-1);
            });

        egret.Tween.get(monster3MC)
            .wait(600)    
            .to({ x: 400, y: 780 }, 500)
            .call(() => {
                monster3MC.play(-1);
                  chickMC.play(-1);
            });
    }

    public setProgress(num): void {
        this.barMask = new egret.Rectangle(0, 0, num * this.bar.width, this.bar.height);
        this.barText.text = Math.round(num * 100).toString() + "%";
        this.bar.mask = this.barMask;
    }
}
