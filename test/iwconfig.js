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
var iwconfig = require('../iwconfig');

var IWCONFIG_STATUS_LINUX = [
  'wlan0     IEEE 802.11bg  ESSID:"RaspberryPi"  Nickname:"<WIFI@REALTEK>"',
  '          Mode:Master  Frequency:2.437 GHz  Access Point: 00:0B:81:95:12:21',
  '          Bit Rate:54 Mb/s   Sensitivity:0/0',
  '          Retry:off   RTS thr:off   Fragment thr:off',
  '          Power Management:off',
  '          Link Quality=18/100  Signal level=11/100  Noise level=0/100',
  '          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0',
  '          Tx excessive retries:0  Invalid misc:0   Missed beacon:0',
  '',
  '',
  '',
  'wlan1     unassociated  Nickname:"<WIFI@REALTEK>"',
  '          Mode:Auto  Frequency=2.412 GHz  Access Point: Not-Associated',
  '          Sensitivity:0/0',
  '          Retry:off   RTS thr:off   Fragment thr:off',
  '          Power Management:off',
  '          Link Quality:0  Signal level:0  Noise level:0',
  '          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0',
  '          Tx excessive retries:0  Invalid misc:0   Missed beacon:0',
  '',
  'lo        no wireless extensions.',
  ''
].join('\n');

var IWCONFIG_STATUS_INTERFACE_LINUX = [
  'wlan0     IEEE 802.11bg  ESSID:"RaspberryPi"  Nickname:"<WIFI@REALTEK>"',
  '          Mode:Master  Frequency:2.437 GHz  Access Point: 00:0B:81:95:12:21',
  '          Bit Rate:54 Mb/s   Sensitivity:0/0',
  '          Retry:off   RTS thr:off   Fragment thr:off',
  '          Power Management:off',
  '          Link Quality=18/100  Signal level=11/100  Noise level=0/100',
  '          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0',
  '          Tx excessive retries:0  Invalid misc:0   Missed beacon:0',
  ''
].join('\n');

var IWCONFIG_STATUS_INTERFACE_LINUX2 = [
  'wlan0     IEEE 802.11abgn  ESSID:"FAKE-Wifi"',
  '          Mode:Managed  Frequency:2.412 GHz  Access Point: 00:0B:81:95:12:21',
  '          Bit Rate=36 Mb/s   Tx-Power=22 dBm',
  '          Retry short limit:7   RTS thr:off   Fragment thr:off',
  '          Encryption key:off',
  '          Power Management:on',
  '          Link Quality=63/70 Signal level=-47 dBm',
  '          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0',
  '          Tx excessive retries:0  Invalid misc:0   Missed beacon:0',
  ''
].join('\n');

describe('iwconfig', function() {
  describe('iwconfig.status(callback)', function() {
    it('should get the status for each interface', function(done) {
      iwconfig.exec = function(command, callback) {
        should(command).eql('iwconfig');
        callback(null, IWCONFIG_STATUS_LINUX, '');
      };

      iwconfig.status(function(err, status) {
        should(status).eql([
          {
            interface: 'wlan0',
            ssid: 'RaspberryPi',
            access_point: '00:0b:81:95:12:21',
            ieee: '802.11bg',
            mode: 'master',
            frequency: 2.437,
            sensitivity: 0,
            quality: 18,
            signal: 11,
            noise: 0
          },
          {
            interface: 'wlan1',
            unassociated: true,
            mode: 'auto',
            frequency: 2.412,
            sensitivity: 0,
            quality: 0,
            signal: 0,
            noise: 0
          },
          {
            interface: 'lo'
          }
        ]);

        done();
      });
    })

    it('should handle errors', function(done) {
      iwconfig.exec = function(command, callback) {
        callback('error');
      };

      iwconfig.status(function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('iwconfig.status(interface, callback)', function() {
    it('should get the status for the specified interface', function(done) {
      iwconfig.exec = function(command, callback) {
        should(command).eql('iwconfig wlan0');
        callback(null, IWCONFIG_STATUS_INTERFACE_LINUX, '');
      };

      iwconfig.status('wlan0', function(err, status) {
        should(status).eql({
          interface: 'wlan0',
          ssid: 'RaspberryPi',
          access_point: '00:0b:81:95:12:21',
          ieee: '802.11bg',
          mode: 'master',
          frequency: 2.437,
          sensitivity: 0,
          quality: 18,
          signal: 11,
          noise: 0
        });

        done();
      });
    })

    it('should handle errors', function(done) {
      iwconfig.exec = function(command, callback) {
        callback('error');
      };

      iwconfig.status('wlan0', function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('iwconfig.status(interface, callback)', function() {
    it('should get the status for the specified interface', function(done) {
      iwconfig.exec = function(command, callback) {
        should(command).eql('iwconfig wlan0');
        callback(null, IWCONFIG_STATUS_INTERFACE_LINUX2, '');
      };

      iwconfig.status('wlan0', function(err, status) {
        should(status).eql({
          interface: 'wlan0',
          ssid: 'FAKE-Wifi',
          access_point: '00:0b:81:95:12:21',
          ieee: '802.11abgn',
          mode: 'managed',
          frequency: 2.412,
          quality: 63,
          signal: -47
        });

        done();
      });
    })

    it('should handle errors', function(done) {
      iwconfig.exec = function(command, callback) {
        callback('error');
      };

      iwconfig.status('wlan0', function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })
})
