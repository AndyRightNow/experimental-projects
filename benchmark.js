"use strict";

const log = console.log;

function benchmark(thisObj, func, args) {
  var startTime = process.hrtime();

  func.apply(thisObj, Array.from(arguments).slice(2));

  var diff = process.hrtime(startTime);

  log("-----------------------------------------------");
  log("The function");
  log(" ");
  log(func.toString());
  log(" ");
  log(`runs for ${diff[1] / 1000000} milliseconds or ${diff[1]} nanoseconds.`);
  log("-----------------------------------------------");
  return diff;
}

module.exports = benchmark;