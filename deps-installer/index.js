const path = require("path");
const fs = require("fs");

function _checkOptions(options) {
  if (!options) {
    throw new Error("No arguments provided.");
  }
  else {
    if (!options.dir ||
      typeof options.dir !== "string") {
      throw new Error("Invalid installation directory.");
    }
    else if (!options.deps ||
      typeof options.deps !== "string" ||
      !(options.deps instanceof Array)) {
      throw new Error("Invalid dependencies to install.");
    }
    else return true;
  }
}

var DepsInstaller = {
  install: function (options) {
    _checkOptions(options);

    var dir = path.resolve(options.dir, "deps");
    var deps = options.deps;
    if (fs.existsSync(dir)) {
      
    }
    else {

    }
  }
};