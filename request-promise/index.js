"use strict";

const http = require("http");

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
        if (res.statusCode !== 200 && res.statusCode !== 304) {
          reject(new Error(`Failed Request with status code ${res.statusCode}`));
        }

        var body = "";
        res.setEncoding("utf-8");
        res.on("data", d => {
            body += d;
          })
          .on("end", () => {
            res.body = body;
            resolve(res);
          });
      })
      .on("error", err => {
        reject(err);
      });
  });
}

module.exports = {
  get: get
};