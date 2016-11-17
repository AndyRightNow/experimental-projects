
/**
 *
 * Get the constructor of an object
 *
 * @param {object} obj An object instance
 * @return {function} The constructor of the object instance
 */
function getObjectConstructor(obj) {
  return (function () {
    return this.constructor;
  }).call(obj);
}

module.exports = getObjectConstructor;