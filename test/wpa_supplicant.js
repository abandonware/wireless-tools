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
var wpa_supplicant = require('../wpa_supplicant');

describe('wpa_supplicant', function() {
  describe('wpa_supplicant.disable(options, callback)', function() {
    it('should stop the daemons', function(done) {
      wpa_supplicant.exec = function(command, callback) {
        should(command).eql(
          'kill `pgrep -f "wpa_supplicant -i wlan0 .*"` || true');

        callback(null, '', '');
      };

      wpa_supplicant.disable('wlan0', function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      wpa_supplicant.exec = function(command, callback) {
        callback('error');
      };

      wpa_supplicant.disable('wlan0', function(err) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('wpa_supplicant.enable(options, callback)', function() {
    it('should start the daemon', function(done) {
      wpa_supplicant.exec = function(command, callback) {
        should(command).eql('wpa_passphrase "RaspberryPi" "raspberry"' +
          ' > wlan0-wpa_supplicant.conf &&' +
          ' wpa_supplicant -i wlan0 -B -D wext -c wlan0-wpa_supplicant.conf' +
          ' && rm -f wlan0-wpa_supplicant.conf');

        callback(null, '', '');
      };

      var options = {
        interface: 'wlan0',
        ssid: 'RaspberryPi',
        passphrase: 'raspberry',
        driver: 'wext'
      };

      wpa_supplicant.enable(options, function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      wpa_supplicant.exec = function(command, callback) {
        callback('error');
      };

      var options = {
        interface: 'wlan0',
        ssid: 'RaspberryPi',
        passphrase: 'raspberry',
        driver: 'wext'
      };

      wpa_supplicant.enable(options, function(err) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('wpa_supplicant.manual(options, callback)', function() {
    it('should start the daemon', function(done) {
      wpa_supplicant.exec = function(command, callback) {
        should(command).eql([
          'wpa_supplicant -i wlan0 -s -B -P /run/wpa_supplicant/wlan0.pid',
          '-D nl80211,wext -C /run/wpa_supplicant'
          ].join(' '));

        callback(null, '', '');
      };

      var options = {
        interface: 'wlan0',
        drivers: [ 'nl80211', 'wext' ]
      };

      wpa_supplicant.manual(options, function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      wpa_supplicant.exec = function(command, callback) {
        callback('error');
      };

      var options = {
        interface: 'wlan0',
        drivers: [ 'nl80211', 'wext' ]
      };

      wpa_supplicant.manual(options, function(err) {
        should(err).eql('error');
        done();
      });
    })
  })
})
