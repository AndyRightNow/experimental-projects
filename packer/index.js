"use strict";

const extract = require("./../utils/extract");
const path = require("path");

// .js suffix
const SUFFIX = ".js";

/*
 * Extract dependencies imported by 'require' to make it available for browsers.
 * It will check all entries under all paths instead of one entry for all paths if multiple
 * entries are specified
 *
 * @param {object} options Options arguments provided by users
 * @param {regex/Array} options.entry Relative file names of the entry js files
 * @param {string/Array} options.dir Relative directories of the entry js files
 * @param {string} options.output A relative directory to output packed files
 */
function packer(options) {
  // Check arguments 
  if (typeof options === "undefined" ||
    !options.entry ||
    !options.dir ||
    !options.output ||
    typeof options.output !== "string" ||
    (!(options.entry instanceof Array) && (options.entry instanceof RegExp)) ||
    (!(options.dir instanceof Array) && (options.dir instanceof string))) {
    throw new Error("Invalid Arguments");
  }

  // If arguments are not arrays, wrap them in arrays  
  options.entry = options.entry instanceof Array ? options.entry : [options.entry];
  options.dir = options.dir instanceof Array ? options.dir : [options.dir];
}