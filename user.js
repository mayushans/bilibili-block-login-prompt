// ==UserScript==
// @name         哔哩哔哩 阻止侵入式的登录提示
// @namespace    http://www.mayushan.com/
// @version      0.1.5
// @description  阻止B站非用户触发的登录提醒
// @author       MaYushan
// @match        https://www.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @license      MIT
// @grant        none
// ==/UserScript==


(function () {
  "use strict";
  // 阻止非用户触发的登录框弹出
  var MiniLoginObject = null;
  var fakeMiniLogin = function(){}
  fakeMiniLogin.prototype.showComponent = function(){}
  fakeMiniLogin.prototype.addEventListener = function(){}
  Object.defineProperty(window, "MiniLogin", {
    set: (val) => {
      MiniLoginObject = val;
    },
    get: () => {
      if (
        new Error().stack.includes("loginVersionEveryPlayInternval")
        || new Error().stack.includes("loginVersionBackBlock")
        || new Error().stack.includes("loginVersionMultiEveryPlay")
        || new Error().stack.includes("loginVersionForce")
        || new Error().stack.includes("loginVersionWechat")
      ) {
        console.log("\n陈睿: 你所热爱的，就是你的生活。\n蒙古上单: 你 ( )什么时候( )啊？");
        return fakeMiniLogin;
      }else{
        return MiniLoginObject;
      }
    },
  });

    // 阻止非用户触发的视频暂停
  if (window.location.href.includes("/video/") == true) {
    var oldPause = window.player.pause;
    window.player.pause = function () {
      if (
        new Error().stack.includes("loginVersionEveryPlayInternval")
        || new Error().stack.includes("loginVersionBackBlock")
        || new Error().stack.includes("loginVersionMultiEveryPlay")
        || new Error().stack.includes("loginVersionForce")
        || new Error().stack.includes("loginVersionWechat")
      ) {
        console.log("\n陈睿: 你所热爱的，就是你的生活。\n蒙古上单: 你 ( )什么时候( )啊？");
        return function(){};
      }else{
        return oldPause;
      }
    };
  }

  var styleNode = document.createElement("style");
  styleNode.textContent = `.adblock-tips,.bili-header__bar .v-popover,.vip-login-tip,.login-tip{ display: none !important; }`;
  var targ = document.getElementsByTagName("head")[0] || document.body || document.documentElement;
  targ.appendChild(styleNode);
})();

