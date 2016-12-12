"use strict";

const path = require("path");
const inlineFiles = require("./../inline-files");
const TaskRunner = require("./../task-runner");
const replace = require("./../replace");
const UglifyJS = require("uglify-js");
const CleanCSS = require("clean-css");

const ROOT_DIR = path.resolve(__dirname, "../../../");

function distHTML(folderNames) {
  var p = ROOT_DIR;
  for (let i = 0, ll = arguments.length; i < ll; i++)
    p = path.resolve(p, arguments[i]);

  TaskRunner
    .text(path.resolve(p, "weebly-main.html"))
    .task(inlineFiles, {
      type: "css",
      fileRegEx: /main-style.css/,
      plugins: [
        function (cont) {
          return new CleanCSS().minify(cont).styles || cont;
        }
      ]
    })
    .task(inlineFiles, {
      type: "js",
      fileRegEx: /main.js/,
      plugins: [
        function (cont) {
          return UglifyJS.minify(cont, { fromString: true }).code;
        }
      ]
    })
    .task(replace, {
      match: /<link.*ESLSuiteStyle\.css".*?>|<script.*ESLSuitejs\.js".*?>.*?<\/script>|<script.*jquery.*?>.*?<\/script>/g,
      newSubstr: ""
    })
    .output({
      dir: './dist/',
      name: 'weebly-main.html'
    });
}

module.exports = distHTML;