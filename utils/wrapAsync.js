// utils/wrapAsync.js
module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    // handle async error and return to prevent further execution
    return fn(req, res, next).catch(next);
  };
};
