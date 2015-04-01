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
var udhcpc = require('../udhcpc');

describe('udhcpc', function() {
  describe('udhcpc.disable(options, callback)', function() {
    it('should stop the daemons', function(done) {
      udhcpc.exec = function(command, callback) {
        should(command).eql(
          'kill `pgrep -f "^udhcpc -i wlan0"` || true');

        callback(null, '', '');
      };

      udhcpc.disable('wlan0', function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      udhcpc.exec = function(command, callback) {
        callback('error');
      };

      udhcpc.disable('wlan0', function(err) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('udhcpc.enable(options, callback)', function() {
    it('should start the daemon', function(done) {
      udhcpc.exec = function(command, callback) {
        should(command).eql('udhcpc -i wlan0 -n');
        callback(null, '', '');
      };

      var options = {
        interface: 'wlan0'
      };

      udhcpc.enable(options, function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      udhcpc.exec = function(command, callback) {
        callback('error');
      };

      var options = {
        interface: 'wlan0'
      };

      udhcpc.enable(options, function(err) {
        should(err).eql('error');
        done();
      });
    })
  })
})
