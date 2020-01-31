import "@babel/polyfill";
let keywords = process.argv[2];
keywords = keywords.replace(/\/|\\/gi, " ").trim();

const fetch = require("node-fetch");
const qs = require("qs");
const uri = "https://fanyi.qq.com/api/translate";
const data = {
  source: "auto",
  target: "zh",
  sourceText: keywords,
  essionUuid: "translate_uuid" + Date.now(),
  qtv: "092fe6ce09a7ffd2",
  qtk:
    "7ln4zCbJpbn0QhpTlnmVQD1Pnp+4FBZ/5oeacMNW/vlkvgpKtYYuHX2ykxuI9ZB3p8W7cMg8zyCa3Qnp4Tyg5VOXSBvv+yCd81lmCqQl4Bkt/BG43wzkRnGFeG4PAf/zb6dT6UAgYFmPlRuYMGTrNQ=="
};

const options = {
  method: "POST",
  body: qs.stringify(data),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Host: "fanyi.qq.com",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    Referer: "https://fanyi.qq.com/"
  }
};
fetch(uri, options)
  .then(res => res.json())
  .then(res => {
    let items = [];
    items.push({
      title: res?.translate?.records[0]?.sourceText,
      subtitle: res?.translate?.records[0]?.targetText,
      arg: "",
      icon: {
        path: ""
      }
    });
    res?.suggest?.data.forEach(element => {
      items.push({
        title: element.word,
        subtitle: element.suggest_translation,
        arg: "",
        icon: {
          path: ""
        }
      });
    });
    console.log(
      JSON.stringify({
        items: items
      })
    );
  });
