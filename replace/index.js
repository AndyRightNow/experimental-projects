"use strict";

const extract = require("./../extract");
const path = require("path");
const fs = require("fs");

/**
 * Replace a substr(regexp) to new substr.
 *
 * @param {string} options.path Path name of the HTML file name to process
 * @param {string} options.content Content of the HTML file name to process
 * @param {string/RegExp} options.match A substr or regexp to match
 * @param {string} options.newSubstr A new substr to replace the matched old one
 * @param {function} options.newSubstrFunc A new substr function to produce the string to replace the matched old one
 */
function replace(options) {
  if (typeof options === "undefined" ||
      typeof options !== "object") {
    throw new Error("Invalid arguments!");
  }

  options.content = options.content.replace(options.match, options.newSubstr || options.newSubstrFunc);
}

module.exports = replace;