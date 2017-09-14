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
var ifconfig = require('../ifconfig');

var IFCONFIG_STATUS_LINUX = [
  'eth0      Link encap:Ethernet  HWaddr DE:AD:BE:EF:C0:DE',
  '          inet addr:192.168.1.2  Bcast:192.168.1.255  Mask:255.255.255.0',
  '          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1',
  '          RX packets:114919 errors:0 dropped:10 overruns:0 frame:0',
  '          TX packets:117935 errors:0 dropped:0 overruns:0 carrier:0',
  '          collisions:0 txqueuelen:1000',
  '          RX bytes:28178397 (26.8 MiB)  TX bytes:23423409 (22.3 MiB)',
  '',
  'lo        Link encap:Local Loopbacks',
  '          inet addr:127.0.0.1  Mask:255.0.0.0',
  '          UP LOOPBACK RUNNING  MTU:65536  Metric:1',
  '          RX packets:0 errors:0 dropped:0 overruns:0 frame:0',
  '          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0',
  '          collisions:0 txqueuelen:0',
  '          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)'
].join('\n');

var IFCONFIG_STATUS_LINUX_NEW_FORMAT = [
  'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
  '        inet 192.168.1.2  netmask 255.255.255.0  broadcast 192.168.1.255',
  '        ether DE:AD:BE:EF:C0:DE  txqueuelen 1000  (Ethernet)',
  '        RX packets 630  bytes 81006 (79.1 KiB)',
  '        RX errors 0  dropped 0  overruns 0  frame 0',
  '        TX packets 225  bytes 48378 (47.2 KiB)',
  '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
  '',
  'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
  '        inet 127.0.0.1  netmask 255.0.0.0',
  '        loop  txqueuelen 1  (Local Loopback)',
  '        RX packets 6  bytes 234 (234.0 B)',
  '        RX errors 0  dropped 0  overruns 0  frame 0',
  '        TX packets 6  bytes 234 (234.0 B)',
  '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0'
].join('\n');

var IFCONFIG_STATUS_INTERFACE_LINUX = [
  'wlan0     HWaddr DE:AD:BE:EF:C0:DE',
  '          inet6 addr:fe80::21c:c0ff:feae:b5e6/64 Scope:Link',
  '          MTU:1500  Metric:1',
  '          RX packets:0 errors:0 dropped:0 overruns:0 frame:0',
  '          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0',
  '          collisions:0 txqueuelen:1000',
  '          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)'
].join('\n');

var IFCONFIG_STATUS_INTERFACE_LINUX_NEW_FORMAT = [
  'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
  '        inet 192.168.1.3  netmask 255.255.255.0  broadcast 192.168.1.255',
  '        inet6 fe80::21c:c0ff:feae:b5e6  prefixlen 64  scopeid 0x20<link>',
  '        ether DE:AD:BE:EF:C0:DE  txqueuelen 1000  (Ethernet)',
  '        RX packets 20  bytes 3297 (3.2 KiB)',
  '        RX errors 0  dropped 0  overruns 0  frame 0',
  '        TX packets 27  bytes 5202 (5.0 KiB)',
  '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0'
].join('\n');



describe('ifconfig', function() {
  describe('ifconfig.status(callback)', function() {
    var ifconfig_variants = {"old format": IFCONFIG_STATUS_LINUX, "new format": IFCONFIG_STATUS_LINUX_NEW_FORMAT};
    for(var format in ifconfig_variants){
      var testFn = function(variant, content){
        it('should get the status for each interface with the ' + variant, function(done) {
          ifconfig.exec = function(command, callback) {
            should(command).eql('ifconfig -a');
            callback(null, content, '');
          };

          ifconfig.status(function(err, status) {
            should(status).eql([
              {
                interface: 'eth0',
                link: 'ethernet',
                address: 'de:ad:be:ef:c0:de',
                ipv4_address: '192.168.1.2',
                ipv4_broadcast: '192.168.1.255',
                ipv4_subnet_mask: '255.255.255.0',
                up: true,
                broadcast: true,
                running: true,
                multicast: true
              },
              {
                interface: 'lo',
                link: 'local',
                ipv4_address: '127.0.0.1',
                ipv4_subnet_mask: '255.0.0.0',
                up: true,
                loopback: true,
                running: true
              }
            ]);

            done();
          });
        })
      }(format, ifconfig_variants[format]);
    }

    it('should handle errors', function(done) {
      ifconfig.exec = function(command, callback) {
        callback('error');
      };

      ifconfig.status(function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('ifconfig.status(interface, callback)', function() {
    it('should get the status for the specified interface with the old format', function(done) {
      ifconfig.exec = function(command, callback) {
        should(command).eql('ifconfig wlan0');
        callback(null, IFCONFIG_STATUS_INTERFACE_LINUX, '');
      };

      ifconfig.status('wlan0', function(err, status) {
        should(status).eql({
          interface: 'wlan0',
          address: 'de:ad:be:ef:c0:de',
          ipv6_address: 'fe80::21c:c0ff:feae:b5e6/64'
        });

        done();
      });
    })

    it('should get the status for the specified interface with the new format', function(done) {
      ifconfig.exec = function(command, callback) {
        should(command).eql('ifconfig wlan0');
        callback(null, IFCONFIG_STATUS_INTERFACE_LINUX_NEW_FORMAT, '');
      };

      ifconfig.status('wlan0', function(err, status) {
        should(status).eql({
          interface: 'wlan0',
          address: 'de:ad:be:ef:c0:de',
          ipv6_address: 'fe80::21c:c0ff:feae:b5e6',
          ipv4_address: "192.168.1.3",
          ipv4_broadcast: "192.168.1.255",
          ipv4_subnet_mask: "255.255.255.0",
          ipv6_address: "fe80::21c:c0ff:feae:b5e6",
          link: "ethernet",
          multicast: true,
          running: true,
          up: true,
          broadcast: true
        });

        done();
      });
    })

    it('should handle errors', function(done) {
      ifconfig.exec = function(command, callback) {
        callback('error');
      };

      ifconfig.status('wlan0', function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('ifconfig.down(interface, callback)', function() {
    it('should take down the interface', function(done) {
      ifconfig.exec = function(command, callback) {
        should(command).eql('ifconfig wlan0 down');
        callback(null, '', '');
      };

      ifconfig.down('wlan0', function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      ifconfig.exec = function(command, callback) {
        callback('error');
      };

      ifconfig.down('wlan0', function(err) {
        should(err).eql('error');
        done();
      });
    })
  })

  describe('ifconfig.up(options, callback)', function() {
    it('should bring up the interface', function(done) {
      ifconfig.exec = function(command, callback) {
        should(command).eql('ifconfig wlan0 192.168.10.1' +
          ' netmask 255.255.255.0 broadcast 192.168.10.255 up');

        callback(null, '', '');
      };

      var options = {
        interface: 'wlan0',
        ipv4_address: '192.168.10.1',
        ipv4_broadcast: '192.168.10.255',
        ipv4_subnet_mask: '255.255.255.0'
      };

      ifconfig.up(options, function(err) {
        should(err).not.be.ok;
        done();
      });
    })

    it('should handle errors', function(done) {
      ifconfig.exec = function(command, callback) {
        callback('error');
      };

      var options = {
        interface: 'wlan0',
        ipv4_address: '192.168.10.1',
        ipv4_broadcast: '192.168.10.255',
        ipv4_subnet_mask: '255.255.255.0'
      };

      ifconfig.down(options, function(err) {
        should(err).eql('error');
        done();
      });
    })
  })
})
