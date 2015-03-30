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
var udhcpd = require('../udhcpd');

describe('udhcpd', function() {
  describe('udhcpd.disable(options, callback)', function() {
    it('should stop the daemons', function(done) {
      udhcpd.exec = function(command, callback) {
        should(command).eql(
          'kill `pgrep -f "^udhcpd wlan0-udhcpd.conf"` || true');

        callback(null, '', '');
      };

      udhcpd.disable('wlan0', function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      udhcpd.exec = function(command, callback) {
        callback('error');
      };

      udhcpd.disable('wlan0', function(err) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('udhcpd.enable(options, callback)', function() {
    it('should start the daemon', function(done) {
      udhcpd.exec = function(command, callback) {
        should(command).eql('cat <<EOF >wlan0-udhcpd.conf' +
          ' && udhcpd wlan0-udhcpd.conf' +
          ' && rm -f wlan0-udhcpd.conf\n' +
          'interface wlan0\n' +
          'start 192.168.10.100\n' +
          'end 192.168.10.200\n' +
          'option router 192.168.10.1\n' +
          'option subnet 255.255.255.0\n' +
          'option dns 4.4.4.4\n' +
          'option dns 8.8.8.8');

        callback(null, '', '');
      };

      var options = {
        interface: 'wlan0',
        start: '192.168.10.100',
        end: '192.168.10.200',
        option: {
          router: '192.168.10.1',
          subnet: '255.255.255.0',
          dns: [ '4.4.4.4', '8.8.8.8' ]
        }
      };

      udhcpd.enable(options, function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      udhcpd.exec = function(command, callback) {
        callback('error');
      };

      var options = {
        interface: 'wlan0',
        start: '192.168.10.100',
        end: '192.168.10.200',
        option: {
          router: '192.168.10.1',
          subnet: '255.255.255.0',
          dns: [ '4.4.4.4', '8.8.8.8' ]
        }
      };

      udhcpd.enable(options, function(err) {
        should(err).eql('error');
        done();
      });
    })
  })
})
