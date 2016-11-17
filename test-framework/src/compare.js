const getObjectConstructor = require("./get-object-constructor");

/**
 *
 * Compare two values (any)
 *
 * @param {any} val1 The first value
 * @param {any} val2 The second value
 * @return {boolean} True if two values equal
 */
function compare(val1, val2) {
  if (arguments.length !== 2) {
    throw new Error("Invalid number of arguments.");
  }
  else if (typeof val1 !== typeof val2) {
    return false;
  }
  else if (typeof val1 !== "object" || val1 === null) {
    return val1 === val2;
  }
  else {
    if (Object.keys(val1).length !== Object.keys(val2).length) {
      return false;
    }
    else {
      if (getObjectConstructor(val1) !== getObjectConstructor(val2)) {
        return false;
      }
      else {
        for (let prop in val1) {
          if (val1.hasOwnProperty(prop) && val2.hasOwnProperty(prop)) {
            return compare(val1[prop], val2[prop]);
          }
          else return false;
        }
      }
    }
  }
}

module.exports = compare;