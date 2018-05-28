const child = require('child_process');
const util = require('util');

module.exports = util.promisify(child.exec);
