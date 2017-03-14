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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/loading.exml";
        //小鸡帧动画
        var chickPng = RES.getRes("loading_chick_png");
        var chickJson = RES.getRes("loading_chick_json");
        var chickMCDF = new egret.MovieClipDataFactory(chickJson, chickPng);
        var chickMC = new egret.MovieClip(chickMCDF.generateMovieClipData("444"));
        chickMC.anchorOffsetX = chickMC.width / 2;
        chickMC.x = 320;
        chickMC.y = 320;
        _this.addChild(chickMC);
        //怪物1帧动画
        var monster1Png = RES.getRes("loading_monster1_png");
        var monster1Json = RES.getRes("loading_monster1_json");
        var monster1MCDF = new egret.MovieClipDataFactory(monster1Json, monster1Png);
        var monster1MC = new egret.MovieClip(monster1MCDF.generateMovieClipData("111"));
        monster1MC.x = 700;
        monster1MC.y = 300;
        monster1MC.anchorOffsetX = monster1MC.width;
        monster1MC.anchorOffsetY = monster1MC.height;
        monster1MC.rotation = 60;
        _this.addChild(monster1MC);
        //怪物2帧动画
        var monster2Png = RES.getRes("loading_monster2_png");
        var monster2Json = RES.getRes("loading_monster2_json");
        var monster2MCDF = new egret.MovieClipDataFactory(monster2Json, monster2Png);
        var monster2MC = new egret.MovieClip(monster2MCDF.generateMovieClipData("222"));
        monster2MC.x = -420;
        monster2MC.y = 560;
        _this.addChild(monster2MC);
        //怪物3帧动画
        var monster3Png = RES.getRes("loading_monster3_png");
        var monster3Json = RES.getRes("loading_monster3_json");
        var monster3MCDF = new egret.MovieClipDataFactory(monster3Json, monster3Png);
        var monster3MC = new egret.MovieClip(monster3MCDF.generateMovieClipData("333"));
        monster3MC.x = 420;
        monster3MC.y = 1010;
        _this.addChild(monster3MC);
        egret.Tween.get(monster1MC)
            .wait(300)
            .to({ rotation: -10 }, 500)
            .call(function () {
            monster1MC.play(-1);
        });
        egret.Tween.get(monster2MC)
            .to({ x: -290, y: 400 }, 500)
            .call(function () {
            monster2MC.play(-1);
        });
        egret.Tween.get(monster3MC)
            .wait(600)
            .to({ x: 400, y: 780 }, 500)
            .call(function () {
            monster3MC.play(-1);
            chickMC.play(-1);
        });
        return _this;
    }
    LoadingUI.prototype.setProgress = function (num) {
        this.barMask = new egret.Rectangle(0, 0, num * this.bar.width, this.bar.height);
        this.barText.text = Math.round(num * 100).toString() + "%";
        this.bar.mask = this.barMask;
    };
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map