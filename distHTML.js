"use strict";

const path = require("path");
const inlineFiles = require("./utils/inliner").inlineFiles;
const TaskRunner = require("./task-runner/task-runner");
const replace = require("./utils/replace");

const ROOT_DIR = path.resolve(__dirname, "../");

function distHTML(folderNames) {
  var p = ROOT_DIR;
  for (let i = 0, ll = arguments.length; i < ll; i++)
    p = path.resolve(p, arguments[i]);

  TaskRunner
    .text(path.resolve(p, "weebly-main.html"))
    .task(inlineFiles, {
      type: "css",
      fileRegEx: /main-style.css/
    })
    .task(inlineFiles, {
      type: "js",
      fileRegEx: /main.js/
    })
    .task(replace, {
      match: /<link.*ESLSuiteStyle\.css".*?>/,
      newSubstr: ""
    })
    .task(replace, {
      match: /<script.*ESLSuitejs\.js".*?>.*?<\/script>/,
      newSubstr: ""
    })
    .output({
      dir: './dist/',
      name: 'weebly-main.html'
    });
}

module.exports = distHTML;