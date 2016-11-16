"use strict";

const exec = require("child_process").exec;
const execPromise = require("./src/exec-promise");
const concatCommands = require("./src/concat-commands");

/**
 * Run a string of commands and return the promise representing the results of the stdout or error message of
 * the commands
 *
 * @param {string} cmd A string of commands (connected by "&&" if more than one)
 * @return {Promise} A promise that takes the stdout as the resolve param and err as the reject and catch param
 **/
function run(cmds) {
  var cmds = concatCommands.apply(null, arguments);
  return execPromise(cmds);
}

module.exports = {
  run: run
};