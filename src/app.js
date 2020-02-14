import "@babel/polyfill";
let keywords = process.argv[2] || "";
keywords = keywords.replace(/\/|\\/gi, " ").trim();

const fetch = require("node-fetch");
const qs = require("qs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

let qtv, qtk;

function translate() {
  const uri = "https://fanyi.qq.com/api/translate";
  let qtv = "";
  let qtk = "";
  const data = {
    source: "auto",
    target: "zh",
    sourceText: keywords,
    essionUuid: "translate_uuid" + Date.now(),
    qtv: qtv,
    qtk: qtk
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
}

let t = db.get("t").value();

if (!t || (t && Math.floor((Date.now() - t) / 1000) > 60 * 60 * 60)) {
  fetch("https://fanyi.qq.com/", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      Host: "fanyi.qq.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
      Referer: "https://fanyi.qq.com/"
    }
  })
    .then(res => res.text())
    .then(res => {
      qtv = res.match(/"qtv=(.+?)"/i)[1];
      qtk = res.match(/"qtk=(.+?)"/i)[1];
      db.set("qtv", qtv).write();
      db.set("qtk", qtk).write();
      db.set("t", Date.now()).write();
      translate();
    });
} else {
  qtv = db.get("qtv").value();
  qtk = db.get("qtk").value();
  translate();
}
