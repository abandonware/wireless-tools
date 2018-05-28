const ifconfig = require('./ifconfig');
const UnsupportedPlatformError = require('./unsupported-platform-error');

module.exports = async () => {
  if (await ifconfig.exists()) {
    return ifconfig.status();
  }

  throw new UnsupportedPlatformError(
    'Could not find a suitable executable for querying network status'
  );
};
