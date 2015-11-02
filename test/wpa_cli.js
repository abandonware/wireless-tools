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
var wpa_cli = require('../wpa_cli');

var WPA_CLI_STATUS_COMPLETED = [
    'bssid=2c:f5:d3:02:ea:d9',
    'freq=2412',
    'ssid=Fake-Wifi',
    'id=0',
    'mode=station',
    'pairwise_cipher=CCMP',
    'group_cipher=CCMP',
    'key_mgmt=WPA2-PSK',
    'wpa_state=COMPLETED',
    'ip_address=10.34.141.168',
    'p2p_device_address=e4:28:9c:a8:53:72',
    'address=e4:28:9c:a8:53:72',
    'uuid=e1cda789-8c88-53e8-ffff-31c304580c1e'
].join('\n');

var WPA_CLI_STATUS_4WAY_HANDSHAKE = [
    'bssid=2c:f5:d3:02:ea:d9',
    'freq=2412',
    'ssid=Fake-Wifi',
    'id=0',
    'mode=station',
    'pairwise_cipher=CCMP',
    'group_cipher=CCMP',
    'key_mgmt=WPA2-PSK',
    'wpa_state=4WAY_HANDSHAKE',
    'ip_address=10.34.141.168',
    'p2p_device_address=e4:28:9c:a8:53:72',
    'address=e4:28:9c:a8:53:72',
    'uuid=e1cda789-8c88-53e8-ffff-31c304580c1e'
].join('\n');

var WPA_CLI_STATUS_SCANNING = [
    'wpa_state=SCANNING',
    'ip_address=10.34.141.168',
    'p2p_device_address=e4:28:9c:a8:53:72',
    'address=e4:28:9c:a8:53:72',
    'uuid=e1cda789-8c88-53e8-ffff-31c304580c1e'
].join('\n');

var WPA_CLI_COMMAND_OK = 'OK\n';
var WPA_CLI_COMMAND_FAIL = 'FAIL\n';

describe('wpa_cli', function() {
    describe('wpa_cli.status(iface, callback)', function() {
        before(function() {
            this.OUTPUT = '';
            var self = this;

            wpa_cli.exec = function(command, callback) {
                should(command).eql('wpa_cli -i wlan0 status');
                callback(null, self.OUTPUT);
            };
        });

        it('status COMPLETED', function(done) {
            this.OUTPUT = WPA_CLI_STATUS_COMPLETED;
            wpa_cli.status('wlan0', function(err, status) {
                should(status).eql({
                    bssid: '2c:f5:d3:02:ea:d9',
                    frequency: 2412,
                    mode: 'station',
                    key_mgmt: 'wpa2-psk',
                    ssid: 'Fake-Wifi',
                    pairwise_cipher: 'CCMP',
                    group_cipher: 'CCMP',
                    p2p_device_address: 'e4:28:9c:a8:53:72',
                    wpa_state: 'COMPLETED',
                    ip: '10.34.141.168',
                    mac: 'e4:28:9c:a8:53:72',
                    uuid: 'e1cda789-8c88-53e8-ffff-31c304580c1e',
                    id: 0
                });

                done();
            });
        });

        it('status 4WAY_HANDSHAKE', function(done) {
            this.OUTPUT = WPA_CLI_STATUS_4WAY_HANDSHAKE;
            wpa_cli.status('wlan0', function(err, status) {
                should(status).eql({
                    bssid: '2c:f5:d3:02:ea:d9',
                    frequency: 2412,
                    mode: 'station',
                    key_mgmt: 'wpa2-psk',
                    ssid: 'Fake-Wifi',
                    pairwise_cipher: 'CCMP',
                    group_cipher: 'CCMP',
                    p2p_device_address: 'e4:28:9c:a8:53:72',
                    wpa_state: '4WAY_HANDSHAKE',
                    ip: '10.34.141.168',
                    mac: 'e4:28:9c:a8:53:72',
                    uuid: 'e1cda789-8c88-53e8-ffff-31c304580c1e',
                    id: 0
                });

                done();
            });
        });

        it('status SCANNING', function(done) {
            this.OUTPUT = WPA_CLI_STATUS_SCANNING;
            wpa_cli.status('wlan0', function(err, status) {
                should(status).eql({
                    p2p_device_address: 'e4:28:9c:a8:53:72',
                    wpa_state: 'SCANNING',
                    ip: '10.34.141.168',
                    mac: 'e4:28:9c:a8:53:72',
                    uuid: 'e1cda789-8c88-53e8-ffff-31c304580c1e' });
            });

            done();
        });

        it('should handle errors', function(done) {
            wpa_cli.exec = function(command, callback) {
                callback('error');
            };

            wpa_cli.status('wlan0', function(err, status) {
                should(err).eql('error');
                done();
            });
        });
    });

    describe('wpa_cli.bssid(iface, ap, ssid, callback)', function(){
        it('OK result', function(done) {
            wpa_cli.exec = function(command, callback) {
                should(command).eql('wpa_cli -i wlan0 bssid Fake-Wifi 2c:f5:d3:02:ea:89');
                callback(null, WPA_CLI_COMMAND_OK);
            };

            wpa_cli.bssid('wlan0', '2c:f5:d3:02:ea:89', 'Fake-Wifi', function(err, status) {
                should(status).eql({
                    result: 'OK'
                });

                done();
            });
        });

        it('FAIL result', function(done) {
            wpa_cli.exec = function(command, callback) {
                should(command).eql('wpa_cli -i wlan0 bssid 2c:f5:d3:02:ea:89 Fake-Wifi');
                callback(null, WPA_CLI_COMMAND_FAIL);
            };

            wpa_cli.bssid('wlan0', 'Fake-Wifi', '2c:f5:d3:02:ea:89', function(err, status) {
                should(err.message).eql('FAIL');
                done();
            });
        });

        it('Handle errors', function(done) {
            wpa_cli.exec = function(command, callback) {
                callback('error');
            };

            wpa_cli.bssid('wlan0', '2c:f5:d3:02:ea:89', 'Fake-Wifi', function(err, status) {
                should(err).eql('error');
                done();
            });
        });
    });

    describe('wpa_cli.reassociate(iface, callback)', function(){
        it('OK result', function(done) {
            wpa_cli.exec = function(command, callback) {
                should(command).eql('wpa_cli -i wlan0 reassociate');
                callback(null, WPA_CLI_COMMAND_OK);
            };

            wpa_cli.reassociate('wlan0', function(err, status) {
                should(status).eql({
                    result: 'OK'
                });

                done();
            });
        });

        it('FAIL result', function(done) {
            wpa_cli.exec = function(command, callback) {
                should(command).eql('wpa_cli -i wlan0 reassociate');
                callback(null, WPA_CLI_COMMAND_FAIL);
            };

            wpa_cli.reassociate('wlan0', function(err, status) {
                should(err.message).eql('FAIL');
                done();
            });
        });

        it('should handle errors', function(done) {
            wpa_cli.exec = function(command, callback) {
                callback('error');
            };

            wpa_cli.reassociate('wlan0', function(err, status) {
                should(err).eql('error');
                done();
            });
        });
    });
});
