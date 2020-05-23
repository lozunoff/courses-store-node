module.exports = {
  ifeq(a, b, options) {
    // eslint-disable-next-line eqeqeq
    if (a == b) {
      return options.fn(this);
    }

    return options.inverse(this);
  },
};
