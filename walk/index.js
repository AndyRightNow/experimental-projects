"use strict";

const fs = require("fs");
const path = require("path");

/**
 * Recursively walk through all folders and files under a directory name
 *
 * @param {string} dirname A directory name to start
 * @param {function} callback A callback to apply on every result(folder or file). The callback takes
 *                            two arguments: dirname and filename. The dirname is the directory name one level before
 *                            the filename. The filename is empty if it is a folder or the file name if it is a file.
 * @return none
 */
function walk(dirname, callback) {
  if (arguments.length !== 2 ||
    typeof dirname !== "string" ||
    typeof callback !== "function") { 
    throw new Error("Invalid arguments");
  }

  if (dirname.length === 0 || // Empty directory
    !fs.lstatSync(dirname).isDirectory()) { // Not a directory
    return;
  } 

  // List all files/dirs under this dir
  var files = fs.readdirSync(dirname);

  for (let i = 0; i < files.length; i++) {
    // Run the callback
    callback(dirname, files[i]);
    // Recursively walk through all sub dirs
    walk(path.resolve(dirname, files[i]), callback);
  }
}

module.exports = walk;
