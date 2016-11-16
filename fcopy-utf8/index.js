const path = require("path");
const fs = require("fs");
const extractUTF8 = require("./../extract").extractUTF8;

function _checkOptions(options) {
  if (!options) {
    throw new Error("No arguments provided.");
  } else {
    if (!options.destination ||
      typeof options.destination !== "string") {
      throw new Error("Invalid destination directory.");
    } else if (!options.source ||
      typeof options.source !== "string") {
      throw new Error("Invalid source file or folder to copy.");
    } else return true;
  }
}

/**
 *
 * Copy a file or files and subfolders in a folder to a new folder
 *
 * @param {string} options.source A absolute path of the file or folder to copy
 * @param {string} options.destination A absolute path of where to copy to 
 */
function fCopyUTF8(options) {

}

module.exports = fCopyUTF8;