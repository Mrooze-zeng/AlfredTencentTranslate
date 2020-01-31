"use strict";

require("@babel/polyfill");

var keywords = process.argv[2];
keywords = keywords.replace(/\/|\\/gi, " ").trim();

var fetch = require("node-fetch");

var qs = require("qs");

var uri = "https://fanyi.qq.com/api/translate";
var data = {
  source: "auto",
  target: "zh",
  sourceText: keywords,
  essionUuid: "translate_uuid" + Date.now(),
  qtv: "092fe6ce09a7ffd2",
  qtk: "7ln4zCbJpbn0QhpTlnmVQD1Pnp+4FBZ/5oeacMNW/vlkvgpKtYYuHX2ykxuI9ZB3p8W7cMg8zyCa3Qnp4Tyg5VOXSBvv+yCd81lmCqQl4Bkt/BG43wzkRnGFeG4PAf/zb6dT6UAgYFmPlRuYMGTrNQ=="
};
var options = {
  method: "POST",
  body: qs.stringify(data),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Host: "fanyi.qq.com",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    Referer: "https://fanyi.qq.com/"
  }
};
fetch(uri, options).then(function (res) {
  return res.json();
}).then(function (res) {
  var _res$translate, _res$translate$record, _res$translate2, _res$translate2$recor, _res$suggest;

  var items = [];
  items.push({
    title: res === null || res === void 0 ? void 0 : (_res$translate = res.translate) === null || _res$translate === void 0 ? void 0 : (_res$translate$record = _res$translate.records[0]) === null || _res$translate$record === void 0 ? void 0 : _res$translate$record.sourceText,
    subtitle: res === null || res === void 0 ? void 0 : (_res$translate2 = res.translate) === null || _res$translate2 === void 0 ? void 0 : (_res$translate2$recor = _res$translate2.records[0]) === null || _res$translate2$recor === void 0 ? void 0 : _res$translate2$recor.targetText,
    arg: "",
    icon: {
      path: ""
    }
  });
  res === null || res === void 0 ? void 0 : (_res$suggest = res.suggest) === null || _res$suggest === void 0 ? void 0 : _res$suggest.data.forEach(function (element) {
    items.push({
      title: element.word,
      subtitle: element.suggest_translation,
      arg: "",
      icon: {
        path: ""
      }
    });
  });
  console.log(JSON.stringify({
    items: items
  }));
});