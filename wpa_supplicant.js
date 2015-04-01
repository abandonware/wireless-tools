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

var wpa_supplicant = module.exports = {
  exec: child_process.exec,
  disable: disable,
  enable: enable
};

function disable(interface, callback) {
  var command = 'kill `pgrep -f "^wpa_supplicant -i '
    + interface + '"` || true';

  return this.exec(command, callback);
}

function enable(options, callback) {
  var file = options.interface + '-wpa_supplicant.conf';

  var command = 'wpa_passphrase "' + options.ssid + '" "' + options.passphrase
    + '" > ' + file + ' && wpa_supplicant -i ' + options.interface + ' -B -D '
    + options.driver + ' -c ' + file + ' && rm -f ' + file;

  return this.exec(command, callback);  
}
