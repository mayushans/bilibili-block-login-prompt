// ==UserScript==
// @name         哔哩哔哩 阻止侵入式的登录提示
// @namespace    http://www.mayushan.com/
// @version      0.1.2
// @description  阻止B站侵入式的登录提醒
// @author       MaYushan
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico?v=1
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // 阻止非用户触发的登录框弹出
  var MiniLoginObject = null;
  Object.defineProperty(window, "MiniLogin", {
    set: (val) => {
      MiniLoginObject = val;
    },
    get: () => {
      return new Proxy(function () {}, {
        construct() {
          if (new Error().stack.includes("addEventListener")) {
            return new MiniLoginObject();
          }
          throw "\n陈睿: 你所热爱的，就是你的生活。\n蒙古上单: 你 ( )什么时候( )啊？";
        },
      });
    },
  });

  // 阻止非用户触发的视频暂停
  if (window.location.href.includes("/video/") == true) {
    var oldPause = window.player.pause;
    window.player.pause = function () {
      if (new Error().stack.includes("loginVersionEveryPlayInternval")) {
        throw "\n陈睿: 你所热爱的，就是你的生活。\n蒙古上单: 你 ( )什么时候( )啊？";
      }
      return oldPause();
    };
  }

  var styleNode = document.createElement("style");
  styleNode.textContent = `.adblock-tips,.bili-header__bar .v-popover,.vip-login-tip,.login-tip{ display: none !important; }`;
  var targ = document.getElementsByTagName("head")[0] || document.body || document.documentElement;
  targ.appendChild(styleNode);
})();
