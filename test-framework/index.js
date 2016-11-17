const TestBlockStates = require("./src/test-block-states");

/**
 * Create a test block to run the test framework methods. Tests should be written in the callback function
 *
 * @param {string} desc The description of the test block
 * @param {function} cb The test code body. It takes one argument which is the 'expect' method.
 * @return {object} 
 */
function TEST(desc, cb) {
  if (arguments.length !== 2) {
    throw new Error("Incorrect number of arguments.");
  } else if (!desc || typeof desc !== "string") {
    throw new Error("Invalid description.");
  } else if (!cb || typeof cb !== "function") {
    throw new Error("Invalid callback.");
  }
    
  var testStates = new TestBlockStates(desc);

  // Pass the expect function bound with test states object    
  cb(require("./src/expect").bind(null, testStates));

  return testStates.getStates();
}

module.exports = TEST;