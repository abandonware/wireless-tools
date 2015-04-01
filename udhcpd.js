/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var child_process = require('child_process');

/**
 * The **udhcpd** command is used to configure a dhcp server for a
 * network interface.
 *
 * @static
 * @category udhcpd
 *
 */
var udhcpd = module.exports = {
  exec: child_process.exec,
  disable: disable,
  enable: enable
};

/**
 * Recursively expand `options` into `lines` with a `prefix`.
 *
 * @private
 * @static
 * @category udhcpd
 * @param {object} options The dhcp server configuration.
 * @param {array} lines The lines of the configuration file.
 * @param {array) prefix The key prefix.
 *
 */
function expand_r(options, lines, prefix) {
  Object.getOwnPropertyNames(options).forEach(function(key) {
    var full = prefix.concat(key);
    var value = options[key];

    if (Array.isArray(value)) {
      value.forEach(function(val) {
        lines.push(full.concat(val).join(' '));
      });      
    }
    else if (typeof(value) == 'object') {
      expand_r(value, lines, full);
    }
    else {
      lines.push(full.concat(value).join(' '));
    }
  });
}

/**
 * Convert dhcp server configuration options to a configuration file.
 *
 * @private
 * @static
 * @category udhcpd
 * @param {object} options The dhcp server configuration.
 * @returns {array} The lines of the configuration file.
 *
 */
function expand(options) {
  var lines = [];
  expand_r(options, lines, []);
  return lines;
}

/**
 * The **udhcpd enable** command is used to start a dhcp server on a
 * specific network interface.
 *
 * @static
 * @category udhcpd
 * @param {object} options The dhcp server configuration.
 * @param {function} callback The callback function.
 * @returns {process} The child process.
 * @example
 *
 * var udhcpd = require('wireless-tools/udhcpd');
 *
 * var options = {
 *   interface: 'wlan0',
 *   start: '192.168.10.100',
 *   end: '192.168.10.200',
 *   option: {
 *     router: '192.168.10.1',
 *     subnet: '255.255.255.0',
 *     dns: [ '4.4.4.4', '8.8.8.8' ]
 *   }
 * };
 *
 * udhcpd.enable(options, function(err) {
 *   // the dhcp server was started 
 * });
 *
 */
function enable(options, callback) {
  var file = options.interface + '-udhcpd.conf';

  var commands = [].concat(
    'cat <<EOF >' + file + ' && udhcpd ' + file + ' && rm -f ' + file,
    expand(options));

  return this.exec(commands.join('\n'), callback);
}

/**
 * The **udhcpd disable** command is used to stop a dhcp server on a
 * specific network interface.
 *
 * @static
 * @category udhcpd
 * @param {string} interface The network interface.
 * @param {function} callback The callback function.
 * @returns {process} The child process.
 * @example
 *
 * var udhcpd = require('wireless-tools/udhcpd');
 *
 * udhcpd.disable('wlan0', function(err) {
 *   // the dhcp server was stopped 
 * });
 *
 */
function disable(interface, callback) {
  var file = interface + '-udhcpd.conf';
  return this.exec('kill `pgrep -f "^udhcpd ' + file + '"` || true', callback);
}
