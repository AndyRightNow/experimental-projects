const fs = require("fs");
const path = require("path");

function _checkOptions(options) {
  if (!options) {
    throw new Error("Invalid arguments.");
  }
  else {
    if (!options.source ||
      typeof options.source !== "string") {
      throw new Error("Invalid folder or file name to copy.");
    } 

    if (!fs.existsSync(options.source)) {
      throw new Error("The folder or file name to copy does not exist.");
    }

    if (!options.destination ||
      typeof options.destination !== "string" ||
      !(options.deps instanceof Array)) {
      throw new Error("Invalid copy destination.");
    }

    return true;
  }
}

function fcopy(options) {
  _checkOptions(options);

  // If the destination directory does not exist, create one
  if (!fs.existsSync(options.destination)) {
    
  }
}