module.exports = class UnsupportedPlatformError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.code = 'ERROR_UNSUPPORTED_PLATFORM';
  }
};
