"use strict";

const fs = require("fs");
const path = require("path");

function _walkHelper(pathName, callback, visited) {
  if (!visited.hasOwnProperty(pathName)) {
    callback(pathName);
    visited[pathName] = true;
  }

  // List all files/dirs under this dir
  var files = fs.lstatSync(pathName).isDirectory() ? fs.readdirSync(pathName) : [];

  for (let i = 0; i < files.length; i++) {
    // Run the callback
    if (!visited.hasOwnProperty(pathName)) {
      callback(pathName);
      visited[pathName] = true;
    }
    // Recursively walk through all sub dirs
    _walkHelper(path.resolve(pathName, files[i]), callback, visited);
  }
}

/**
 * Recursively walk through all folders and files under a path name
 *
 * @param {string} pathName - A path name to start
 * @param {function} callback - A callback to apply on every result(folder or file). The callback takes 
 *                            one argument: pathName, which is the pathName (folder or file) of the current level
 *
 * @return none
 */
function walk(pathName, callback) {
  if (arguments.length !== 2 ||
    typeof pathName !== "string" ||
    typeof callback !== "function") {
    throw new Error("Invalid arguments");
  }

  var visited = {};

  _walkHelper(pathName, callback, visited);
}

module.exports = walk;