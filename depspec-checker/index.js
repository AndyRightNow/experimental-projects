const extractUTF8 = require("./../extract").extractUTF8;
const fs = require("fs");
const path = require("path");

// Match only require statements with raw relative or absolute paths
const LOCAL_REQUIRE_REGEX = /require\s*\(\s*([\']|[\"])+.*?([\\]|[\/])+.*?\)/g;
// Match a path as the second capture group
const PATH_REGEX = /(\'|\")\s*(.*?)\s*(\'|\")/;

function _checkOptions(options) {

  if (!options) {
    throw new Error("No arguments provided.");
  } else {
    options.updateFlag = options.updateFlag || false;

    if (typeof options.updateFlag !== "boolean") {
      throw new Error("Invalid flag.");
    }
    else if (!options.dependencies ||
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
function DepSpecChecker(options) {
  _checkOptions(options);

  var deps = options.dependencies;
  for (let i = 0, ll = deps.length; i < ll; i++) {
    var indexPath = path.resolve(__dirname, "../", deps[i]);

    if (!fs.existsSync(indexPath) || !fs.lstatSync(indexPath).isDirectory()) {
      throw new Error("Invalid dependencies.");
    }

    var indexContent = extractUTF8(path.resolve(indexPath, "index.js"));

    if (indexContent === null) {
      throw new Error(`index.js of ${deps[i]} does not exist.`);
    }

    var reqs = (indexContent.match(LOCAL_REQUIRE_REGEX) || []).map(val => val.match(PATH_REGEX)[2]);
  }
}