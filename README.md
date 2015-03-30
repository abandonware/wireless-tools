# Wireless tools for Node.js
[![Release Version](https://img.shields.io/badge/version-0.3.0-blue.svg)](https://github.com/bakerface/wireless-tools)
[![Build Status](https://travis-ci.org/bakerface/wireless-tools.svg?branch=master)](https://travis-ci.org/bakerface/wireless-tools)
[![Coverage Status](https://coveralls.io/repos/bakerface/wireless-tools/badge.svg?branch=master)](https://coveralls.io/r/bakerface/wireless-tools)

## Table of Contents
- [ifconfig](#ifconfig) - configure network interfaces
  - [ifconfig.status(callback)](#ifconfigstatuscallback) - status of all network interfaces
  - [ifconfig.status(interface, callback)](#ifconfigstatusinterfacecallback) - status of a network interface
  - [ifconfig.down(interface, callback)](#ifconfigdowninterfacecallback) - take down a network interface
  - [ifconfig.up(options, callback)](#ifconfigupoptionscallback) - bring up a network interface

# ifconfig
The **ifconfig** command is used to configure network interfaces.

## ifconfig.status(callback)
The **ifconfig status** command is used to query the status of all configured interfaces.

``` javascript
var ifconfig = require('wireless-tools/ifconfig');

ifconfig.status(function(err, status) {
  console.log(status);
});

// =>
[
  {
    interface: 'eth0',
    link: 'ethernet',
    address: 'b8:27:eb:da:52:ad',
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
    running: true,
    loopback: true
  },
  {
    interface: 'wlan0',
    link: 'ethernet',
    address: '00:0b:81:95:12:21',
    ipv4_address: '192.168.10.1',
    ipv4_broadcast: '192.168.10.255',
    ipv4_subnet_mask: '255.255.255.0',
    up: true,
    broadcast: true,
    multicast: true
  }
]
```

## ifconfig.status(interface, callback)
The **ifconfig interface status** command is used to query the status of a specific interface.

``` javascript
var ifconfig = require('wireless-tools/ifconfig');

ifconfig.status('eth0', function(err, status) {
  console.log(status);
});

// =>
{
  interface: 'eth0',
  link: 'ethernet',
  address: 'b8:27:eb:da:52:ad',
  ipv4_address: '192.168.1.2',
  ipv4_broadcast: '192.168.1.255',
  ipv4_subnet_mask: '255.255.255.0',
  up: true,
  broadcast: true,
  running: true,
  multicast: true
}
```

## ifconfig.down(interface, callback)
The **ifconfig down** command is used to take down an interface that is up.

``` javascript
var ifconfig = require('wireless-tools/ifconfig');

ifconfig.down('wlan0', function(err) {
  // the interface is down
});
```

## ifconfig.up(options, callback)
The **ifconfig up** command is used to bring up an interface with the specified configuration.

``` javascript
var ifconfig = require('wireless-tools/ifconfig');

var options = {
  interface: 'wlan0',
  ipv4_address: '192.168.10.1',
  ipv4_broadcast: '192.168.10.255',
  ipv4_subnet_mask: '255.255.255.0'
};

ifconfig.up(options, function(err) {
  // the interface is up 
});
```
