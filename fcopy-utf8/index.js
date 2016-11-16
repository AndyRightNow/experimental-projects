const path = require("path");
const fs = require("fs");
const extractUTF8 = require("./../extract").extractUTF8;
const walk = require("./../walk");

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
 * Copy a file or a folder (including files and subfolders) to a new folder
 *
 * @param {string} options.source A absolute path of the file or folder to copy
 * @param {string} options.destination A absolute path of where to copy to 
 */
function fCopyUTF8(options) {
  _checkOptions(options);

  var writePathNameSuffixStart = path.basename(options.source);

  walk(options.source, (pathName) => {
    var writePathName = path.resolve(options.destination,
      path.basename(pathName) !== writePathNameSuffixStart ?
        "./" + writePathNameSuffixStart + pathName.split(writePathNameSuffixStart).splice(-1)[0] : writePathNameSuffixStart);

    var stat = fs.lstatSync(pathName);
    if (stat.isDirectory(pathName) && !fs.existsSync(writePathName)) {
      fs.mkdirSync(writePathName);
      console.log("Create Folder:", writePathName);
    }
    else if (!stat.isDirectory()) {
      fs.writeFileSync(writePathName, extractUTF8(pathName), "utf-8");
      console.log("Copy File:", writePathName);
    }
  });
}

module.exports = fCopyUTF8;