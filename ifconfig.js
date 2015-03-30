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

var child_process = require('child_process');

var ifconfig = module.exports = {
  exec: child_process.exec,
  status: status,
  down: down,
  up: up
};

function parse_status_block(block) {
  var match;

  var parsed = {
    interface: block.match(/^([^\s]+)/)[1]
  };

  if ((match = block.match(/Link encap:\s*([^\s]+)/))) {
    parsed.link = match[1].toLowerCase();
  }

  if ((match = block.match(/HWaddr\s+([^\s]+)/))) {
    parsed.address = match[1].toLowerCase();
  }

  if ((match = block.match(/inet6\s+addr:\s*([^\s]+)/))) {
    parsed.ipv6_address = match[1];
  }

  if ((match = block.match(/inet\s+addr:\s*([^\s]+)/))) {
    parsed.ipv4_address = match[1];
  }

  if ((match = block.match(/Bcast:\s*([^\s]+)/))) {
    parsed.ipv4_broadcast = match[1];
  }

  if ((match = block.match(/Mask:\s*([^\s]+)/))) {
    parsed.ipv4_subnet_mask = match[1];
  }

  if ((match = block.match(/UP/))) {
    parsed.up = true;
  }

  if ((match = block.match(/BROADCAST/))) {
    parsed.broadcast = true;
  }

  if ((match = block.match(/RUNNING/))) {
    parsed.running = true;
  }

  if ((match = block.match(/MULTICAST/))) {
    parsed.multicast = true;
  }

  if ((match = block.match(/LOOPBACK/))) {
    parsed.loopback = true;
  }

  return parsed;
}

function parse_status(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error,
      stdout.trim().split('\n\n').map(parse_status_block));
  };
}

function parse_status_interface(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error, parse_status_block(stdout.trim()));
  };
}

function status(interface, callback) {
  if (callback) {
    this.exec('ifconfig ' + interface, parse_status_interface(callback));  
  }
  else {
    this.exec('ifconfig -a', parse_status(interface));  
  }
}

function down(interface, callback) {
  this.exec('ifconfig ' + interface + ' down', callback);
}

function up(options, callback) {
  this.exec('ifconfig ' + options.interface +
    ' ' + options.ipv4_address +
    ' netmask ' + options.ipv4_subnet_mask +
    ' broadcast ' + options.ipv4_broadcast +
    ' up', callback);
}
