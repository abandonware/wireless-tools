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

var iwconfig = module.exports = {
  exec: child_process.exec,
  status: status
};

function parse_status_block(block) {
  var match;

  var parsed = {
    interface: block.match(/^([^\s]+)/)[1]
  };

  if ((match = block.match(/Access Point:\s*([A-Fa-f0-9:]{17})/))) {
    parsed.access_point = match[1].toLowerCase();
  }

  if ((match = block.match(/Frequency[:|=]\s*([0-9\.]+)/))) {
    parsed.frequency = parseFloat(match[1]);
  }

  if ((match = block.match(/IEEE\s*([^\s]+)/))) {
    parsed.ieee = match[1].toLowerCase();
  }

  if ((match = block.match(/Mode[:|=]\s*([^\s]+)/))) {
    parsed.mode = match[1].toLowerCase();
  }

  if ((match = block.match(/Noise level[:|=]\s*([0-9]+)/))) {
    parsed.noise = parseInt(match[1], 10);
  }

  if ((match = block.match(/Link Quality[:|=]\s*([0-9]+)/))) {
    parsed.quality = parseInt(match[1], 10);
  }

  if ((match = block.match(/Sensitivity[:|=]\s*([0-9]+)/))) {
    parsed.sensitivity = parseInt(match[1], 10);
  }

  if ((match = block.match(/Signal level[:|=]\s*([0-9]+)/))) {
    parsed.signal = parseInt(match[1], 10);
  }

  if ((match = block.match(/ESSID[:|=]\s*"([^"]+)"/))) {
    parsed.ssid = match[1];
  }

  if ((match = block.match(/unassociated/))) {
    parsed.unassociated = true;
  }

  return parsed;
}

function parse_status(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error,
      stdout.trim().split('\n\n').map(parse_status_block));
  };
}

function parse_status_interface(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error, parse_status_block(stdout.trim()));
  };
}

function status(interface, callback) {
  if (callback) {
    return this.exec('iwconfig ' + interface,
      parse_status_interface(callback));  
  }
  else {
    return this.exec('iwconfig', parse_status(interface));  
  }
}
