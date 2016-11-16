/**
 * Concatenate multiple commands with "&&" and return a string
 *
 * @param {string} cmds Multiple commands you want to concatenate. Separated by commas
 * @return {string} A concatenated command
 **/
module.exports = function concatCommands(cmds) {
  var err = new Error("Invalid commands");

  var ret = arguments[0];
  if (!ret || typeof ret !== "string") throw err;
  
  for (let i = 1, ll = arguments.length; i < ll; i++) {
    if (typeof arguments[i] !== "string") {
      throw err;
    }
    ret += `&& ${arguments[i]}`;
  }
  return ret;
}