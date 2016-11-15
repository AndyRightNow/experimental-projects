"use strict";

const extract = require("./../extract");
const path = require("path");
const fs = require("fs");

/**
 * Inline all specified files that fit the given regex and replace the HTML content in the argument object
 * passed in with the new text
 *
 * @param {string} options.path Path name of the HTML file name to process
 * @param {string} options.content Content of the HTML file name to process
 * @param {string} options.type File type, CSS or JS (case-insensitive)
 * @param {RegExp} options.fileRegEx Regular expression representing the file names
 */
function inlineFiles(options) {
  // Note: exclude all links with any type of URL reference or absolute path
  const CSS_INLINE_TAG_REGEX_START = /<link.*?rel\s*=\s*"stylesheet".*?href\s*=\s*"(?!\w+\:).*/;
  const JS_INLINE_TAG_REGEX_START = /<script.*?src\s*=\s*"(?!\w+\:).*/;
  const CSS_INLINE_TAG_REGEX_END = /".*?\>/;
  const JS_INLINE_TAG_REGEX_END = /".*?\>\s*?<\/script>/;
  const CSS_HREF_REGEX = /href\s*=\s*"(.*)"/;
  const JS_SRC_REGEX = /src\s*=\s*"(.*)"/;

  // Check for argument object  
  if (typeof options === "undefined") {
    throw new Error("No argument object specified!");
  }

  var htmlPathName = options.path,
    htmlText = options.content,
    fileRegEx = options.fileRegEx,
    type = options.type ?
    options.type.toLowerCase() === "css" || options.type.toLowerCase() === "js" ? options.type : "css" : "css";

  // Check for invalid dirname and regex
  if (!htmlText || !fileRegEx || !(fileRegEx instanceof RegExp)) {
    throw new Error("Invalid HTML file or file name regular expressions");
  }

  // Get dirname of the given path name  
  const htmlDirname = path.dirname(htmlPathName);

  // Compose the regex to find the required links  
  const FILE_INLINE_REGEX = new RegExp(
    (type === "css" ? CSS_INLINE_TAG_REGEX_START.source : JS_INLINE_TAG_REGEX_START.source) +
    fileRegEx.source +
    (type === "css" ? CSS_INLINE_TAG_REGEX_END.source : JS_INLINE_TAG_REGEX_END.source),
    'g');

  // Extract all css files and combine them to one file
  var matchedLinks = htmlText.match(FILE_INLINE_REGEX);
  var fileText = "";
  var fileDirname, thisFileText;
  for (let i = 0, ll = matchedLinks.length; i < ll; i++) {
    fileDirname = path.resolve(
      htmlDirname,
      matchedLinks[i].match(type === "css" ? CSS_HREF_REGEX : JS_SRC_REGEX)[1]);
    thisFileText = extract.extractUTF8(fileDirname);

    if (type === "css") {
      fileText += thisFileText !== null ? thisFileText : "";
    } else {
      fileText += (`<script>\n${thisFileText}\n</script>\n`);
    }
  }
  // Remove matched links
  htmlText = htmlText.replace(FILE_INLINE_REGEX, "");

  // Build the corresponding tag and insert it into the HTML text 
  var finalTag, tagToReplace;
  if (type === "css") {
    finalTag = "<style>\n" + fileText + "\n</style>\n</head>";
    tagToReplace = "</head>";
  } else {
    finalTag = "</body>\n" + fileText;
    tagToReplace = "</body>";
  }
  htmlText = htmlText.replace(tagToReplace, finalTag);

  options.content = htmlText;
}


module.exports = inlineFiles;