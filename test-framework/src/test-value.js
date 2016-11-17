const compare = require("./compare");

/**
 *
 * Represents value to test
 *
 * @constructor
 * @param {TestBlockStates} testStates The states of the test block
 * @param {any} val The value to test
 */
function TestValue(testStates, val) {
  if (typeof testStates === "undefined") {
    throw new Error("Please only use test methods in test blocks.");
  }

  this.val = val;
  this.testStates = testStates;
}

/**
 *
 * Test if the value in the object equals to the provided value (can not be null or undefined)
 *
 * @param {any} val The value to compare with
 * @return {boolean} True if the value equals to the value in the object
 *
 */
TestValue.prototype.toEqual = function (val) {
  if (typeof val === "undefined") {
    throw new Error("Please use 'toBeUndefined' to test undefined value.");
  }
  else if (val === null) {
    throw new Error("Please use 'toBeNull' to test null value.");
  }

  return compare(this.val, val);
};

/**
 *
 * Test if the value in the object is undefined
 *
 * @return {boolean} True if the value in the object is undefined
 *
 */
TestValue.prototype.toBeUndefined = function () {
  return typeof this.val === "undefined";
};

/**
 *
 * Test if the value in the object is null
 *
 * @return {boolean} True if the value in the object is null
 *
 */
TestValue.prototype.toBeNull = function () {
  return this.val === null;
};

/**
 *
 * Test if the value in the object is an instance of a constructor
 *
 * @return {boolean} True if the value in the object is an instance of a constructor
 *
 */
TestValue.prototype.toBeInstanceOf = function (ctor) {
  return this.val instanceof ctor;
};

module.exports = TestValue;