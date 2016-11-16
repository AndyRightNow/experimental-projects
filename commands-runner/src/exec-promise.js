/**
 * Run exec function and return a promise for its results
 *
 * @param {string} cmd A string of commands (connected by "&&" if more than one)
 * @return {Promise} A promise that takes the stdout as the resolve param and err as the reject and catch param
 **/
module.exports = function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) {
        reject(err);
      }
      else resolve(stdout);
    });
  });
}