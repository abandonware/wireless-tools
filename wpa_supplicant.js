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
 * The **wpa_supplicant** command is used to configure a wireless
 * network connection for a network interface.
 *
 * @static
 * @category wpa_supplicant
 *
 */
var wpa_supplicant = module.exports = {
  exec: child_process.exec,
  disable: disable,
  enable: enable,
  manual: manual
};

/**
 * The **wpa_supplicant disable** command is used to disconnect from
 * a wireless network on a specific network interface.
 *
 * @static
 * @category wpa_supplicant
 * @param {string} interface The network interface.
 * @param {function} callback The callback function.
 * @returns {process} The child process.
 * @example
 *
 * var wpa_supplicant = require('wireless-tools/wpa_supplicant');
 *
 * wpa_supplicant.disable('wlan0', function(err) {
 *   // disconnected from wireless network
 * });
 *
 */
function disable(interface, callback) {
  var command = 'kill `pgrep -f "wpa_supplicant -i ' +
    interface + ' .*"` || true';

  return this.exec(command, callback);
}

/**
 * The **wpa_supplicant enable** command is used to join a wireless network
 * on a specific network interface.
 *
 * @static
 * @category wpa_supplicant
 * @param {object} options The wireless network configuration.
 * @param {function} callback The callback function.
 * @returns {process} The child process.
 * @example
 *
 * var wpa_supplicant = require('wireless-tools/wpa_supplicant');
 *
 * var options = {
 *   interface: 'wlan0',
 *   ssid: 'RaspberryPi',
 *   passphrase: 'raspberry',
 *   driver: 'wext'
 * };
 *
 * wpa_supplicant.enable(options, function(err) {
 *   // connected to the wireless network
 * });
 *
 */
function enable(options, callback) {
  var file = options.interface + '-wpa_supplicant.conf';

  var command = 'wpa_passphrase "' + options.ssid + '" "' + options.passphrase
    + '" > ' + file + ' && wpa_supplicant -i ' + options.interface + ' -B -D '
    + options.driver + ' -c ' + file + ' && rm -f ' + file;

  return this.exec(command, callback);
}

/**
 * launchs wpa manually (as if it were launched by ifup if interface wpa setup
 * was done in /network/interfaces)
 * /sbin/wpa_supplicant -s -B -P /run/wpa_supplicant.wlan0.pid -i wlan0 -D nl80211,wext -C /run/wpa_supplicant
 * options = {
 *     interface: 'wlan0',
 *     drivers: [ 'nl80211', 'wext' ]
 * }
 */
function manual(options, callback) {
  var command = [
    'wpa_supplicant',
    '-i', options.interface,
    '-s -B -P /run/wpa_supplicant/' + options.interface + '.pid',
    '-D', options.drivers.join(','),
    '-C /run/wpa_supplicant'
  ].join(' ');

  return this.exec(command, callback);
}


