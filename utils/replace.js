"use strict";

const extract = require("./extract");
const path = require("path");
const fs = require("fs");

/*
 * Replace a substr(regexp) to new substr.
 *
 * @param {string} argObj.path Path name of the HTML file name to process
 * @param {string} argObj.content Content of the HTML file name to process
 * @param {string} argObj.match A substr or regexp to match
 * @param {RegExp} argObj.newSubstr A new substr to replace the matched old one
 */
function replace(argObj) {
  if (typeof argObj === "undefined" ||
      typeof argObj !== "object") {
    throw new Error("Invalid arguments!");
  }

  argObj.content = argObj.content.replace(argObj.match, argObj.newSubstr);
}

module.exports = replace;