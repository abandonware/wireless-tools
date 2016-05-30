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
 * The **iwlist** command is used to get detailed information from a
 * wireless interface.
 *
 * @static
 * @category iwlist
 *
 */
var iwlist = module.exports = {
  exec: child_process.exec,
  scan: scan
};

/**
 * Returns a truthy if the network has an ssid; falsy otherwise.
 *
 * @private
 * @static
 * @category iwlist
 * @param {object} network The scanned network object.
 * @returns {string} The ssid.
 *
 */
function has_ssid(network) {
  return network.ssid;
}

/**
 * Returns a truthy if the network has any key; falsy otherwise.
 *
 * @private
 * @static
 * @category iwlist
 * @param {object} network The scanned network object.
 * @returns {boolean} True if any key.
 *
 */
function has_keys(network) {
  return Object.keys(network).length !== 0;
}



/**
 * A comparison function to sort networks ordered by signal strength.
 *
 * @private
 * @static
 * @category iwlist
 * @param {object} a A scanned network object.
 * @param {object} b Another scanned network object.
 * @returns {number} The comparison value.
 *
 */
function by_signal(a, b) {
  return b.signal - a.signal;
}

/**
 * Parses a scanned wireless network cell.
 *
 * @private
 * @static
 * @category iwlist
 * @param {string} cell The section of stdout for the cell.
 * @returns {object} The scanned network object.
 *
 */
function parse_cell(cell) {
  var parsed = { };
  var match;

  if ((match = cell.match(/Address\s*[:|=]\s*([A-Fa-f0-9:]{17})/))) {
    parsed.address = match[1].toLowerCase();
  }

  if ((match = cell.match(/Channel\s*([0-9]+)/))) {
    parsed.channel = parseInt(match[1], 10);
  }

  if ((match = cell.match(/Frequency\s*[:|=]\s*([0-9\.]+)\s*GHz/))) {
    parsed.frequency = parseFloat(match[1]);
  }

  if ((match = cell.match(/Mode\s*[:|=]\s*([^\s]+)/))) {
    parsed.mode = match[1].toLowerCase();
  }

  if ((match = cell.match(/Quality\s*[:|=]\s*([0-9]+)/))) {
    parsed.quality = parseInt(match[1], 10);
  }

  if ((match = cell.match(/Signal level\s*[:|=]\s*(-?[0-9]+)/))) {
    parsed.signal = parseInt(match[1], 10);
  }

  if ((match = cell.match(/Noise level\s*[:|=]\s*(-?[0-9]+)/))) {
    parsed.noise = parseInt(match[1], 10);
  }

  if ((match = cell.match(/ESSID\s*[:|=]\s*"([^"]+)"/))) {
    parsed.ssid = match[1];
  }

  if ((match = cell.match(/WPA2\s+Version/))) {
    parsed.security = 'wpa2';
  }
  else if ((match = cell.match(/WPA\s+Version/))) {
    parsed.security = 'wpa';
  }
  else if ((match = cell.match(/Encryption key\s*[:|=]\s*on/))) {
    parsed.security = 'wep';
  }
  else if ((match = cell.match(/Encryption key\s*[:|=]\s*off/))) {
    parsed.security = 'open';
  }

  return parsed;
}

/**
 * Parses all scanned wireless network cells.
 *
 * @private
 * @static
 * @category iwlist
 * @param {function} callback The callback function.
 *
 */
function parse_scan(show_hidden, callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else
      if (show_hidden) {
        callback(error, stdout
        .split(/Cell [0-9]+ -/)
        .map(parse_cell)
        .filter(has_keys)
        .sort(by_signal));
    } else {
        callback(error, stdout
        .split(/Cell [0-9]+ -/)
        .map(parse_cell)
        .filter(has_ssid)
        .sort(by_signal));
    }
  };
}

/**
 * The **iwlist scan** command is used to scan for wireless networks
 * visible to a wireless interface. For convenience, the networks are
 * sorted by signal strength.
 *
 * @static
 * @category iwlist
 * @param {string} interface The wireless network interface.
 * @param {function} callback The callback function.
 * @example
 *
 * var iwlist = require('wireless-tools/iwlist');
 *
 * iwlist.scan('wlan0', function(err, networks) {
 *   console.log(networks);
 * });
 *
 * iwlist.scan({ iface : 'wlan0', show_hidden: true }, function(err, networks) {
 *   console.log(networks);
 * });
 *
 * // =>
 * [
 *   {
 *     address: '00:0b:81:ab:14:22',
 *     ssid: 'BlueberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'wpa',
 *     quality: 48,
 *     signal: 87
 *   },
 *   {
 *     address: '00:0b:81:95:12:21',
 *     ssid: 'RaspberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'wpa2',
 *     quality: 58,
 *     signal: 83
 *   },
 *   {
 *     address: '00:0b:81:cd:f2:04',
 *     ssid: 'BlackberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'wep',
 *     quality: 48,
 *     signal: 80
 *   },
 *   {
 *     address: '00:0b:81:fd:42:14',
 *     ssid: 'CranberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'open',
 *     quality: 32,
 *     signal: 71
 *   }
 * ]
 *
  * [
 *   {
 *     address: '00:0b:81:ab:14:22',
 *     ssid: 'BlueberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'wpa',
 *     quality: 48,
 *     signal: 87
 *   },
 *   {
 *     address: '00:0b:81:95:12:21',
 *     ssid: 'RaspberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'wpa2',
 *     quality: 58,
 *     signal: 83
 *   },
 *   {
 *     address: '00:0b:81:cd:f2:04',
 *     ssid: 'BlackberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'wep',
 *     quality: 48,
 *     signal: 80
 *   },
 *   {
 *     address: '00:0b:81:fd:42:14',
 *     ssid: 'CranberryPi',
 *     mode: 'master',
 *     frequency: 2.437,
 *     channel: 6,
 *     security: 'open',
 *     quality: 32,
 *     signal: 71
 *   },
 *   {
 *     address: '2c:c5:d3:02:ae:4c',
 *     channel: 100,
 *     frequency: 5.5,
 *     mode: 'master',
 *     quality: 66,
 *     signal: -44,
 *     security: 'wpa2'
 *   }
 * ]
 *
 */
function scan(options, callback) {
  var interface, show_hidden
  if (typeof options === 'string') {
    var interface = options;
    var show_hidden = false;
  } else {
    var interface = options.iface;
    var show_hidden = options.show_hidden || false;
  }

  var extra_params = '';

  if (options.ssid) {
    extra_params = ' essid ' + options.ssid;
  }

  this.exec('iwlist ' + interface + ' scan' + extra_params, parse_scan(show_hidden, callback));
}
