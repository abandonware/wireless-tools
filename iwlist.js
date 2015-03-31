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

var iwlist = module.exports = {
  exec: child_process.exec,
  scan: scan
};

function has_ssid(network) {
  return network.ssid;
}

function by_signal(a, b) {
  return b.signal - a.signal;
}

function parse_cell(cell) {
  var parsed = { };

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

function parse_scan(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error, stdout
      .split(/Cell [0-9]+ -/)
      .map(parse_cell)
      .filter(has_ssid)
      .sort(by_signal));
  };
}

function scan(interface, callback) {
  this.exec('iwlist ' + interface + ' scan', parse_scan(callback));  
}
