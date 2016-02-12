# Wireless tools for Node.js
[![npm version](https://badge.fury.io/js/wireless-tools.svg)](http://badge.fury.io/js/wireless-tools)
[![release version](https://img.shields.io/badge/version-0.15.0-blue.svg)](https://github.com/bakerface/wireless-tools)
[![build status](https://travis-ci.org/bakerface/wireless-tools.svg?branch=master)](https://travis-ci.org/bakerface/wireless-tools)
[![code climate](https://codeclimate.com/github/bakerface/wireless-tools/badges/gpa.svg)](https://codeclimate.com/github/bakerface/wireless-tools)
[![test coverage](https://codeclimate.com/github/bakerface/wireless-tools/badges/coverage.svg)](https://codeclimate.com/github/bakerface/wireless-tools/coverage)
[![github issues](https://img.shields.io/github/issues/bakerface/wireless-tools.svg)](https://github.com/bakerface/wireless-tools/issues)
[![dependencies](https://david-dm.org/bakerface/wireless-tools.svg)](https://david-dm.org/bakerface/wireless-tools)
[![dev dependencies](https://david-dm.org/bakerface/wireless-tools/dev-status.svg)](https://david-dm.org/bakerface/wireless-tools#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/wireless-tools.svg)](https://www.npmjs.com/package/wireless-tools)

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
- [iwlist](#iwlist) - query wireless network interfaces
  - [iwlist.scan(interface, callback)](#iwlistscaninterface-callback) - scan for wireless networks
- [udhcpc](#udhcpc) - configure a dhcp client
  - [udhcpc.enable(options, callback)](#udhcpcenableoptions-callback) - start a dhcp client
  - [udhcpc.disable(interface, callback)](#udhcpcdisableinterface-callback) - stop a dhcp client
- [udhcpd](#udhcpd) - configure a dhcp server
  - [udhcpd.enable(options, callback)](#udhcpdenableoptions-callback) - start a dhcp server
  - [udhcpd.disable(interface, callback)](#udhcpddisableinterface-callback) - stop a dhcp server
- [wpa_supplicant](#wpa_supplicant) - configure a wireless network connection
  - [wpa_supplicant.enable(options, callback)](#wpa_supplicantenableoptions-callback) - connect to a wireless network
  - [wpa_supplicant.disable(interface, callback)](#wpa_supplicantdisableinterface-callback) - disconnect from a wireless network

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

# iwlist
The **iwlist** command is used to get detailed information from a wireless interface.

## iwlist.scan(interface, callback)
The **iwlist scan** command is used to scan for wireless networks visible to a wireless interface. For convenience, the networks are sorted by signal strength.

``` javascript
var iwlist = require('wireless-tools/iwlist');

iwlist.scan('wlan0', function(err, networks) {
  console.log(networks);
});

// =>
[
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
    quality: 32,
    signal: 71
  }
]
```

# udhcpc
The **udhcpc** command is used to configure a dhcp client for a network interface.

## udhcpc.enable(options, callback)
The **udhcpc enable** command is used to start a dhcp client on a specific network interface.

``` javascript
var udhcpc = require('wireless-tools/udhcpc');

var options = {
  interface: 'wlan0'
};

udhcpc.enable(options, function(err) {
  // the dhcp client was started
});
```

## udhcpc.disable(interface, callback)
The **udhcpc disable** command is used to stop a dhcp client on a specific network interface.

``` javascript
var udhcpc = require('wireless-tools/udhcpc');

udhcpc.disable('wlan0', function(err) {
  // the dhcp client was stopped
});
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

# wpa_supplicant
The **wpa_supplicant** command is used to configure a wireless network connection for a network interface.

## wpa_supplicant.enable(options, callback)
The **wpa_supplicant enable** command is used to join a wireless network on a specific network interface.

``` javascript
var wpa_supplicant = require('wireless-tools/wpa_supplicant');

var options = {
  interface: 'wlan0',
  ssid: 'RaspberryPi',
  passphrase: 'raspberry',
  driver: 'wext'
};

wpa_supplicant.enable(options, function(err) {
  // connected to the wireless network
});
```

## wpa_supplicant.disable(interface, callback)
The **wpa_supplicant disable** command is used to disconnect from a wireless network on a specific network interface.

``` javascript
var wpa_supplicant = require('wireless-tools/wpa_supplicant');

wpa_supplicant.disable('wlan0', function(err) {
  // disconnected from wireless network
});
```
