const TestValue = require("./test-value");

/**
 *
 * Test entry function. Expect a value to be tested
 *
 * @param {TestBlockStates} testStates The states of the test block
 * @param {any} val The value to test
 * @return {TestValue} The wrapped test value
 *
 */
function expect(testStates, val) {
	return new TestValue(testStates, val);
}

module.exports = expect;