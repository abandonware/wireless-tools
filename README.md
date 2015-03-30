# Wireless tools for Node.js
[![Release Version](https://img.shields.io/badge/version-0.8.1-blue.svg)](https://github.com/bakerface/wireless-tools)
[![Build Status](https://travis-ci.org/bakerface/wireless-tools.svg?branch=master)](https://travis-ci.org/bakerface/wireless-tools)
[![Coverage Status](https://coveralls.io/repos/bakerface/wireless-tools/badge.svg?branch=master)](https://coveralls.io/r/bakerface/wireless-tools)

## Table of Contents
- [hostapd](#hostapd) - configure an access point
  - [hostapd.enable(options, callback)](#hostapdenableoptions-callback) - host an access point
  - [hostapd.disable(interface, callback)](#hostapddisableinterface-callback) - stop hosting an access point
- [ifconfig](#ifconfig) - configure network interfaces
  - [ifconfig.status(callback)](#ifconfigstatuscallback) - status of all network interfaces
  - [ifconfig.status(interface, callback)](#ifconfigstatusinterface-callback) - status of a network interface
  - [ifconfig.down(interface, callback)](#ifconfigdowninterface-callback) - take down a network interface
  - [ifconfig.up(options, callback)](#ifconfigupoptions-callback) - bring up a network interface
- [iwconfig](#iwconfig) - configure wireless network interfaces
  - [iwconfig.status(callback)](#iwconfigstatuscallback) - status of all wireless network interfaces
  - [iwconfig.status(interface, callback)](#iwconfigstatusinterface-callback) - status of a wireless network interface
- [udhcpd](#udhcpd) - configure a dhcp server
  - [udhcpd.enable(options, callback)](#udhcpdenableoptions-callback) - start a dhcp server
  - [udhcpd.disable(interface, callback)](#udhcpddisableinterface-callback) - stop a dhcp server

# hostapd
The **hostapd** command is used to configure wireless access points.

## hostapd.enable(options, callback)
The **hostapd enable** command is used to host an access point on a specific wireless interface.

``` javascript
var hostapd = require('wireless-tools/hostapd');

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
  // the access point was created
});
```

## hostapd.disable(interface, callback)
The **hostapd disable** command is used to stop hosting an access point on a specific wireless interface.

``` javascript
var hostapd = require('wireless-tools/hostapd');

hostapd.disable('wlan0', function(err) {
  // no longer hosting the access point
});
```

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

# iwconfig
The **iwconfig** command is used to configure wireless network interfaces.

## iwconfig.status(callback)
The **iwconfig status** command is used to query the status of all configured wireless interfaces.

``` javascript
var iwconfig = require('wireless-tools/iwconfig');

iwconfig.status(function(err, status) {
  console.log(status);
});

// =>
[
  {
    interface: 'wlan0',
    access_point: '00:0b:81:95:12:21',
    frequency: 2.437,
    ieee: '802.11bg',
    mode: 'master',
    noise: 0,
    quality: 77,
    sensitivity: 0,
    signal: 50,
    ssid: 'RaspberryPi'
  },
  {
    interface: 'wlan1',
    frequency: 2.412,
    mode: 'auto',
    noise: 0,
    quality: 0,
    sensitivity: 0,
    signal: 0,
    unassociated: true
  }
]
```

## iwconfig.status(interface, callback)
The **iwconfig interface status** command is used to query the status of a specific wireless interface.

``` javascript
var iwconfig = require('wireless-tools/iwconfig');

iwconfig.status('wlan0', function(err, status) {
  console.log(status);
});

// =>
{
  interface: 'wlan0',
  access_point: '00:0b:81:95:12:21',
  frequency: 2.437,
  ieee: '802.11bg',
  mode: 'master',
  noise: 0,
  quality: 77,
  sensitivity: 0,
  signal: 50,
  ssid: 'RaspberryPi'
}
```

# udhcpd
The **udhcpd** command is used to configure a dhcp server for a network interface.

## udhcpd.enable(options, callback)
The **udhcpd enable** command is used to start a dhcp server on a specific network interface.

``` javascript
var udhcpd = require('wireless-tools/udhcpd');

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
  // the dhcp server was started
});
```

## udhcpd.disable(interface, callback)
The **udhcpd disable** command is used to stop a dhcp server on a specific network interface.

``` javascript
var udhcpd = require('wireless-tools/udhcpd');

udhcpd.disable('wlan0', function(err) {
  // the dhcp server was stopped
});
```
