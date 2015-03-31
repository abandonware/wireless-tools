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

var should = require('should');
var iwlist = require('../iwlist');

var IWLIST_SCAN_LINUX = [
'Cell 01 - Address: 00:0B:81:95:12:21',
'          ESSID:"RaspberryPi"',
'          Protocol:IEEE 802.11bgn',
'          Mode:Master',
'          Frequency:2.437 GHz (Channel 6)',
'          Encryption key:on',
'          Bit Rates:144 Mb/s',
'          Extra:rsn_ie=00000000000000000000000000000000000000000000',
'          IE: IEEE 802.11i/WPA2 Version 1',
'              Group Cipher : CCMP',
'              Pairwise Ciphers (1) : CCMP',
'              Authentication Suites (1) : PSK',
'          IE: Unknown: 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
'          Quality=58/100  Signal level=83/100',
'Cell 02 - Address: 00:0B:81:AB:14:22',
'          ESSID:"BlueberryPi"',
'          Protocol:IEEE 802.11bgn',
'          Mode:Master',
'          Frequency:2.437 GHz (Channel 6)',
'          Encryption key:on',
'          Bit Rates:144 Mb/s',
'          IE: WPA Version 1',
'              Group Cipher : TKIP',
'              Pairwise Ciphers (2) : CCMP TKIP',
'              Authentication Suites (1) : PSK',
'          Extra:rsn_ie=0000000000000000000000000000000000000000000000000000',
'          Quality=48/100  Signal level=87/100',
'Cell 03 - Address: 00:0B:81:CD:F2:04',
'          ESSID:"BlackberryPi"',
'          Protocol:IEEE 802.11bgn',
'          Mode:Master',
'          Frequency:2.437 GHz (Channel 6)',
'          Encryption key:on',
'          Bit Rates:144 Mb/s',
'          IE: Unknown: 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
'          Extra:rsn_ie=0000000000000000000000000000000000000000000000000000',
'          Quality=48/100  Signal level=80/100',
'Cell 04 - Address: 00:0B:81:FD:42:14',
'          ESSID:"CranberryPi"',
'          Protocol:IEEE 802.11bgn',
'          Mode:Master',
'          Frequency:2.437 GHz (Channel 6)',
'          Encryption key:off',
'          Bit Rates:144 Mb/s',
'          IE: Unknown: 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
'          Quality=32/100  Signal level=71/100',
'Cell 05 - Address: 00:0B:81:ED:E2:44',
'          ESSID:""'
].join('\n');

describe('iwlist', function() {
  describe('iwlist.scan(interface, callback)', function() {
    it('should scan the specified interface', function(done) {
      iwlist.exec = function(command, callback) {
        should(command).eql('iwlist wlan0 scan');
        callback(null, IWLIST_SCAN_LINUX, '');
      };

      iwlist.scan('wlan0', function(err, status) {
        should(status).eql([
          {
            address: '00:0b:81:ab:14:22',
            ssid: 'BlueberryPi',
            mode: 'master',
            frequency: 2.437,
            channel: 6,
            security: 'wpa',
            quality: 48,
            signal: 87
          },
          {
            address: '00:0b:81:95:12:21',
            ssid: 'RaspberryPi',
            mode: 'master',
            frequency: 2.437,
            channel: 6,
            security: 'wpa2',
            quality: 58,
            signal: 83
          },
          {
            address: '00:0b:81:cd:f2:04',
            ssid: 'BlackberryPi',
            mode: 'master',
            frequency: 2.437,
            channel: 6,
            security: 'wep',
            quality: 48,
            signal: 80
          },
          {
            address: '00:0b:81:fd:42:14',
            ssid: 'CranberryPi',
            mode: 'master',
            frequency: 2.437,
            channel: 6,
            security: 'open',
            quality: 32,
            signal: 71
          }
        ]);

        done();
      });
    })

    it('should handle errors', function(done) {
      iwlist.exec = function(command, callback) {
        callback('error');
      };

      iwlist.scan('wlan0', function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })
})
