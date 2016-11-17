const extractUTF8 = require("./../extract").extractUTF8;
const fs = require("fs");
const path = require("path");

// Match only require statements with raw relative or absolute paths
const LOCAL_DEP_REQUIRE_REGEX = /require\s*\(.*?(\.\.[\/\\])+.*?\)/g;
// Match a path as the second capture group
const PATH_REGEX = /(\'|\")\s*(.*?)\s*(\'|\")/;

function _checkOptions(options) {

  if (!options) {
    throw new Error("No arguments provided.");
  } else {
    options.updateFlag = options.updateFlag || false;

    if (typeof options.updateFlag !== "boolean") {
      throw new Error("Invalid flag.");
    } else if (!options.dependencies ||
      (typeof options.dependencies !== "string" &&
        !(options.dependencies instanceof Array))) {
      throw new Error("Invalid dependencies");
    } else return true;
  }
}

/**
 *
 * Check if the depspec.json in a dependency matches its requires.
 * You can also specify that depspec.json should be updated the
 * depspec.json if not matching. Resules will be printed out on the console.
 *
 * @param {Array|string} options.dependencies Dependencies to check
 * @param {boolean} options.updateFlag The flag to indicate that whether it will update the
 *                                      depspec.json if not matching. Default to false;
 */
function depSpecChecker(options) {
  _checkOptions(options);

  let deps = options.dependencies;
  // Matched count and unmatched count
  let mC = 0, umC = 0;
  for (let i = 0, ll = deps.length; i < ll; i++) {
    let isMatched = true;
    // Dir of index.js
    let indexDir = path.resolve(__dirname, "../", deps[i]);

    if (!fs.existsSync(indexDir) || !fs.lstatSync(indexDir).isDirectory()) {
      throw new Error("Invalid dependencies.");
    }

    // Extracted content of index.js
    let indexContent = extractUTF8(path.resolve(indexDir, "index.js"));

    if (indexContent === null) {
      throw new Error(`index.js of ${deps[i]} does not exist.`);
    }

    // Table to keep track of require dependencies
    let reqPathsExist = {};

    let reqPaths = (indexContent.match(LOCAL_DEP_REQUIRE_REGEX) || []).map(val => {
      let p = val.match(PATH_REGEX)[2];
      reqPathsExist[p] = true;
      return p;
    });
    
    let depSpecPath = path.resolve(__dirname, "../", deps[i], "depspec.json");

    if (!fs.existsSync(depSpecPath)) {
      console.log(`depspec.json in ${deps[i]} does not exist.`);
      isMatched = false;
    } else {
      let depSpecJSON = JSON.parse(extractUTF8(depSpecPath));

      let depSpecDeps = depSpecJSON["dependencies"] || {};
      let depSpecDepsIndicies = Object.keys(depSpecDeps);
      if (depSpecDepsIndicies.length !== reqPaths.length) {
        isMatched = false;
      }
      else {
        depSpecDepsIndicies.map((val, index, arr) => {
        isMatched = isMatched ? reqPathsExist.hasOwnProperty(depSpecDeps[val]) && arr.length === reqPaths.length : isMatched;
        return depSpecDeps[val];
      });
      }

      console.log(`depspec.json in ${deps[i]} ${isMatched ? "matches" : "does not match"}.`);
    }

    if (options.updateFlag) {
      if (isMatched) {
        console.log("All dependencies up-to-date.");
        mC++;
      } else {
        let depspec = {
          "name": deps[i],
          "dependencies": {

          }
        };
        for (let ii = 0, ll = reqPaths.length; ii < ll; ii++)
          depspec.dependencies[ii] = reqPaths[ii];
        fs.writeFileSync(depSpecPath, JSON.stringify(depspec), "utf8");
        console.log(`Updated depspec.json in ${deps[i]}`);
        umC++;
      }
    }

    console.log("--------------------------");
  }
  console.log(`${deps.length} dependencies in total. ${mC} matched and ${umC} unmatched.`);
}

module.exports = depSpecChecker;