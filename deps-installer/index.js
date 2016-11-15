const path = require("path");
const fs = require("fs");
const CommandsRunner = require("./commands-runner");

function _checkOptions(options) {
  if (!options) {
    throw new Error("No arguments provided.");
  }
  else {
    if (!options.destination ||
      typeof options.destination !== "string") {
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

function install (options) {
    _checkOptions(options);

    if (options.deps.length === 0) return;

    var deps = options.deps;
    var des = path.resolve(options.destination, "deps");
    var exist = {};
    
    for (let i = 0, ll = deps.length; i < ll; i++) {
        
    }
}