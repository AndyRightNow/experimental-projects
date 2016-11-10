const extract = require("./extract");
const path = require("path");

// Match only require statements with raw relative or absolute paths
const REQUIRE_REGEX = /require\s*\(\s*([\']|[\"])+.*?([\\]|[\/])+.*?\)/g;
// Match a path as the second capture group
const PATH_REGEX = /(\'|\")\s*(.*?)\s*(\'|\")/;
// .js suffix
const SUFFIX = ".js";

/*
 * Extract dependencies imported by 'require' to make it available for browsers
 *
 */
function packer(argObj) {
  if (typeof argObj === "undefined") {
    throw new Error("Invalid Arguments");
  }

  
}