// ==UserScript==
// @name         屏蔽哔哩哔哩播放视频时自动弹出登录
// @namespace    http://www.mayushan.com/
// @version      0.1.0
// @description  去掉播放视频时烦人的弹出登录
// @author       MaYushan
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var oldPause = window.player.pause
    window.player.pause = function(){
        if(new Error().stack.includes("loginVersionEveryPlayInternval")){
            throw "\n陈睿: 你所热爱的，就是你的生活。\n蒙古上单: 你 ( )什么时候( )啊？";
        }
        return oldPause()
    }
})();