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
        egret.Tween.get(_this.monster2, { loop: true })
            .to({ x: -54 }, 2000)
            .to({ x: -190 }, 2000);
        egret.Tween.get(_this.monster3, { loop: true })
            .to({ x: 452 }, 2000)
            .to({ x: 560 }, 2000);
        egret.Tween.get(_this.monster1, { loop: true })
            .to({ y: 835 }, 2000)
            .to({ y: 956 }, 2000);
        egret.Tween.get(_this.wing1, { loop: true })
            .to({ rotation: 0 }, 300)
            .to({ rotation: -10 }, 300)
            .to({ rotation: 0 }, 300)
            .to({ rotation: -10 }, 300)
            .wait(1000);
        egret.Tween.get(_this.wing2, { loop: true })
            .to({ rotation: 0 }, 300)
            .to({ rotation: 10 }, 300)
            .to({ rotation: 0 }, 300)
            .to({ rotation: 10 }, 300)
            .wait(1000);
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