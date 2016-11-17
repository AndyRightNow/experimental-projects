/**
 *
 * Represents pass and fail sub-tests (test states) of a test block
 *
 * @constructor
 * @param {string} desc The description of the test block
 */
function TestBlockStates(desc) {
  if (typeof desc === "undefined" ||
    typeof desc !== "string") {
    throw new Error("Invalid description of the test block");
  }

  this._states = {
    "pass": [],
    "fail": [],
    "description": desc || null
  };
}

/**
 * Delegate function for adding passed or failed states to the test states object
 *
 * @method
 * @private
 * @param {any} val1 The first value tested
 * @param {any} val2 The second value tested
 * @param {string} rel The relationship between two value (equal, greater, etc.)
 * @param {string} flag The flag to indicate passed or failed. Should only be "pass" or "fail" (case-insensitive)
 *
 */
TestBlockStates.prototype._stateOperationDelegate = function (val1, val2, rel, flag) {
  if (arguments.length !== 4) {
    throw new Error("Invalid number of arguments.");
  } else if (typeof val1 === "undefined" ||
    typeof val2 === "undefined" ||
    typeof rel === "undefined" ||
    typeof flag === "undefined") {
    throw new Error("Arguments contain undefined value");
  }
  else if (typeof rel !== "string" || typeof flag !== "string") {
    throw new Error("Invalid rel and flag arguments.");
  }
  else if (flag.toLowerCase() !== "pass" || flag.toLowerCase() !== "fail") {
    throw new Error("Invalid flag argument.");
  }

  flag = flag.toLowerCase();

  (flag == "pass" ? this.pass : this.fail).call(this, val1, val2, rel);
};

/**
 *
 * Add a passed sub-test state to the block states object
 *
 * @method
 * @public
 * @param {any} val1 The first value tested
 * @param {any} val2 The second value tested
 * @param {string} rel The relationship between two value (equal, greater, etc.)
 *
 */
TestBlockStates.prototype.pass = function (val1, val2, rel) {
  this._stateOperationDelegate(val1, val2, rel, "pass");
};

/**
 *
 * Add a failed sub-test state to the block states object
 *
 * @method
 * @public
 * @param {any} val1 The first value tested
 * @param {any} val2 The second value tested
 * @param {string} rel The relationship between two value (equal, greater, etc.)
 *
 */
TestBlockStates.prototype.fail = function (val1, val2, rel) {
  this._stateOperationDelegate(val1, val2, rel, "fail");
};

module.exports = TestBlockStates;