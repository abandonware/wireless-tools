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
'          Quality:4/5  Signal level:-60 dBm  Noise level:-92 dBm',
'Cell 05 - Address: 2C:C5:D3:02:AE:4C',
'          Channel:100',
'          Frequency:5.5 GHz (Channel 100)',
'          Quality=65/70  Signal level=-45 dBm',
'          Encryption key:on',
'          ESSID:""',
'          Bit Rates:24 Mb/s; 36 Mb/s; 48 Mb/s; 54 Mb/s',
'          Mode:Master',
'          Extra:tsf=0000003d2a54d03b',
'          Extra: Last beacon: 3360ms ago',
'          IE: Unknown: DD180050F20201018E0003A4000027A4000042435E0062322F00',
'          IE: Unknown: 2D1AAD091BF8FE000000000000000000001000000000000000000000',
'          IE: Unknown: 3D1664000000000000000000000000000000000000000000',
'          IE: IEEE 802.11i/WPA2 Version 1',
'              Group Cipher : CCMP',
'              Pairwise Ciphers (1) : CCMP',
'              Authentication Suites (1) : PSK'
].join('\n');

var IWLIST_SCAN_LINUX_ACTIVE_SCAN = [
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
'Cell 05 - Address: 2C:C5:D3:02:AE:4C',
'          Channel:100',
'          Frequency:5.5 GHz (Channel 100)',
'          Quality=65/70  Signal level=-45 dBm',
'          Encryption key:on',
'          ESSID:"hidden-ssid"',
'          Bit Rates:24 Mb/s; 36 Mb/s; 48 Mb/s; 54 Mb/s',
'          Mode:Master',
'          Extra:tsf=0000003d2a54d03b',
'          Extra: Last beacon: 3360ms ago',
'          IE: Unknown: DD180050F20201018E0003A4000027A4000042435E0062322F00',
'          IE: Unknown: 2D1AAD091BF8FE000000000000000000001000000000000000000000',
'          IE: Unknown: 3D1664000000000000000000000000000000000000000000',
'          IE: IEEE 802.11i/WPA2 Version 1',
'              Group Cipher : CCMP',
'              Pairwise Ciphers (1) : CCMP',
'              Authentication Suites (1) : PSK'
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
            quality: 4,
            signal: -60,
            noise: -92
          }
        ]);

        done();
      });
    })

    it('should scan the specified interface and show hidden ssid networks', function(done) {
      iwlist.exec = function(command, callback) {
        should(command).eql('iwlist wlan0 scan');
        callback(null, IWLIST_SCAN_LINUX, '');
      };

      var options = {
        iface: 'wlan0',
        show_hidden: true
      };

      iwlist.scan(options, function(err, status) {
        should(status).eql(
          [
          {
            address: '00:0b:81:ab:14:22',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 48,
            signal: 87,
            ssid: 'BlueberryPi',
            security: 'wpa'
          },
          {
            address: '00:0b:81:95:12:21',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 58,
            signal: 83,
            ssid: 'RaspberryPi',
            security: 'wpa2'
          },
          {
            address: '00:0b:81:cd:f2:04',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 48,
            signal: 80,
            ssid: 'BlackberryPi',
            security: 'wep'
          },
          {
            address: '2c:c5:d3:02:ae:4c',
            channel: 100,
            frequency: 5.5,
            mode: 'master',
            quality: 65,
            signal: -45,
            security: 'wpa2'
          },
          {
            address: '00:0b:81:fd:42:14',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 4,
            signal: -60,
            noise: -92,
            ssid: 'CranberryPi',
            security: 'open'
          }
          ]);

        done();
      });
    })

    it('should scan the specified interface looking for hidden ssid', function(done) {
      iwlist.exec = function(command, callback) {
        should(command).eql('iwlist wlan0 scan essid hidden-ssid');
        callback(null, IWLIST_SCAN_LINUX_ACTIVE_SCAN, '');
      };

      var options = {
        iface: 'wlan0',
        show_hidden: false,
        ssid: 'hidden-ssid'
      };

      iwlist.scan(options, function(err, status) {
        should(status).eql(
          [
          {
            address: '00:0b:81:ab:14:22',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 48,
            signal: 87,
            ssid: 'BlueberryPi',
            security: 'wpa'
          },
          {
            address: '00:0b:81:95:12:21',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 58,
            signal: 83,
            ssid: 'RaspberryPi',
            security: 'wpa2'
          },
          {
            address: '00:0b:81:cd:f2:04',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 48,
            signal: 80,
            ssid: 'BlackberryPi',
            security: 'wep'
          },
          {
            address: '00:0b:81:fd:42:14',
            channel: 6,
            frequency: 2.437,
            mode: 'master',
            quality: 32,
            signal: 71,
            ssid: 'CranberryPi',
            security: 'open'
          },
          {
            address: '2c:c5:d3:02:ae:4c',
            channel: 100,
            frequency: 5.5,
            mode: 'master',
            quality: 65,
            signal: -45,
            ssid: 'hidden-ssid',
            security: 'wpa2'
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
