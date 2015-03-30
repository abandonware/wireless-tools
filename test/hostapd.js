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
var hostapd = require('../hostapd');

describe('hostapd', function() {
  describe('hostapd.disable(options, callback)', function() {
    it('should stop the daemons', function(done) {
      hostapd.exec = function(command, callback) {
        should(command).eql(
          'kill `pgrep -f "^hostapd -B wlan0-hostapd.conf"` || true');
        callback(null, '', '');
      };

      hostapd.disable('wlan0', function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      hostapd.exec = function(command, callback) {
        callback('error');
      };

      hostapd.disable('wlan0', function(err) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('hostapd.enable(options, callback)', function() {
    it('should start the daemon', function(done) {
      hostapd.exec = function(command, callback) {
        should(command).eql('cat <<EOF >wlan0-hostapd.conf' +
          ' && hostapd -B wlan0-hostapd.conf' +
          ' && rm -f wlan0-hostapd.conf\n' +
          'channel=6\n' +
          'driver=rtl871xdrv\n' +
          'hw_mode=g\n' +
          'interface=wlan0\n' +
          'ssid=RaspberryPi\n' +
          'wpa=2\n' +
          'wpa_passphrase=raspberry');

        callback(null, '', '');
      };

      var options = {
        channel: 6,
        driver: 'rtl871xdrv',
        hw_mode: 'g',
        interface: 'wlan0',
        ssid: 'RaspberryPi',
        wpa: 2,
        wpa_passphrase: 'raspberry'
      };

      hostapd.enable(options, function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      hostapd.exec = function(command, callback) {
        callback('error');
      };

      var options = {
        channel: 6,
        driver: 'rtl871xdrv',
        hw_mode: 'g',
        interface: 'wlan0',
        ssid: 'RaspberryPi',
        wpa: 2,
        wpa_passphrase: 'raspberry'
      };

      hostapd.enable(options, function(err) {
        should(err).eql('error');
        done();
      });
    })
  })
})
