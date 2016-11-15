const path = require("path");
const fs = require("fs");
const extract = require("./../extract");
const CommandsRunner = require("./../commands-runner");

function _checkOptions(options) {
  if (!options) {
    throw new Error("No arguments provided.");
  } else {
    if (!options.destination ||
      typeof options.destination !== "string") {
      throw new Error("Invalid installation directory.");
    } else if (!options.dependencies ||
      (typeof options.dependencies !== "string" &&
        !(options.dependencies instanceof Array))) {
      throw new Error("Invalid dependencies to install.");
    } else return true;
  }
}

function _getDependenciesInDepSpec(depRelDir) {
  var json = JSON.parse(extract.extractUTF8(path.resolve(__dirname, depRelDir, "depspec.json")))["dependencies"] || null;
  if (json) {
    for (let i = 0;; i++) {
      if (!json.hasOwnProperty(i)) {
        json.length = i;
        return Array.from(json);
      }
    }
  } else return json;
}

/**
 * Helper recursive function for installing dependencies in a directory
 *
 * @param {Array} deps An array of dependencies to install
 * @param {Set} finalDeps The final dependencies to install
 *
 */
function _installHelper(deps, finalDeps) {
  if (deps.length === 0) return;

  for (let dep of deps) {
    finalDeps.add(dep);
    let nextDeps = _getDependenciesInDepSpec(dep.match(/[\/]/) ? dep : "./../" + dep);
    if (nextDeps.length > 0) _installHelper(nextDeps, finalDeps);
  }
}

/**
 * Install dependencies in a directory
 *
 * @param {string} options.destination The absolute destination directory to install dependencies in.
 * @param {string|Array} options.deps The dependencies to install
 *
 */
function install(options) {
  _checkOptions(options);

  if (options.dependencies.length === 0) return;

  var deps = options.dependencies;
  var des = path.resolve(options.destination, "deps");

  if (!fs.existsSync(des)) {
    fs.mkdirSync(des);
  }

  var finalDeps = new Set();
  deps.map((val) => {
    finalDeps.add(val);
  });

  _installHelper(deps, finalDeps);

  for (let dep of finalDeps) {
    dep = dep.match(/[\\/]/) ? dep.split(dep.indexOf("/") !== -1 ? '/' : '\\').splice(-1)[0] : dep;

    let src = path.resolve(__dirname, "../", dep).replace(/\\/g, "/");
    let desFolder = path.resolve(des, dep).replace(/\\/g, "/");
    CommandsRunner
      .run(`ROBOCOPY  /IS ${src} ${desFolder}`)
      .then(stdout => {
        console.log("Success: ", stdout);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }
}

module.exports = {
  install: install
};