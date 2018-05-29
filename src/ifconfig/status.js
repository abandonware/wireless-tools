const exec = require('../exec');

const flags = [
  'ADDRCONF',
  'ANYCAST',
  'BROADCAST',
  'CoS',
  'DEPRECATED',
  'DHCP',
  'DUPLICATE',
  'FAILED',
  'FIXEDMTU',
  'INACTIVE',
  'LOOPBACK',
  'MIP',
  'MULTI_BCAST',
  'MULTICAST',
  'NOARP',
  'NOFAILOVER',
  'NOLOCAL',
  'NONUD',
  'NORTEXCH',
  'NOXMIT',
  'OFFLINE',
  'POINTOPOINT',
  'PREFERRED',
  'PRIVATE',
  'ROUTER',
  'RUNNING',
  'STANDBY',
  'TEMPORARY',
  'UNNUMBERED',
  'UP',
  'VIRTUAL',
  'XRESOLV'
];

function parseName(section) {
  const match = section.match(/^([^:\s]+)/);
  return match && match[1];
}

function parseMac(section) {
  const hwaddr = section.match(/HWaddr ((\w{2}:)+\w{2})/);
  const ether = section.match(/ether ((\w{2}:)+\w{2})/);

  return (hwaddr && hwaddr[1]) || (ether && ether[1]);
}

function parseIp(section) {
  const inet = section.match(/inet ([^\s]+)/);
  const inetaddr = section.match(/inet addr:([^\s]+)/);

  return (inetaddr && inetaddr[1]) || (inet && inet[1]);
}

function parseMask(section) {
  const netmask = section.match(/netmask ([^\s]+)/);
  const mask = section.match(/Mask:([^\s]+)/);

  return (netmask && netmask[1]) || (mask && mask[1]);
}

function parseBroadcast(section) {
  const broadcast = section.match(/broadcast ([^\s]+)/);
  const bcast = section.match(/Bcast:([^\s]+)/);

  return (broadcast && broadcast[1]) || (bcast && bcast[1]);
}

const sequence = (parse, flag) => section => {
  const key = flag.toLowerCase().replace(/[^a-z0-9]/g, '');
  const exists = new RegExp(`[^\\w]${flag}[^\\w]`).test(section);
  const target = parse(section);

  if (exists) {
    target[key] = true;
  }

  return target;
};

const parseFlags = flags.reduce(sequence, () => ({}));

function parseSection(target, section) {
  const name = parseName(section);
  const mac = parseMac(section);
  const ip = parseIp(section);
  const mask = parseMask(section);
  const broadcast = parseBroadcast(section);
  const flags = parseFlags(section);

  if (name) {
    const network = {name, flags};

    if (mac) {
      network.mac = mac.toLowerCase();
    }

    if (ip) {
      network.ip = ip.toLowerCase();
    }

    if (mask) {
      network.mask = mask.toLowerCase();
    }

    if (broadcast) {
      network.broadcast = broadcast.toLowerCase();
    }

    target.push(network);
  }

  return target;
}

const parse = ({stdout}) =>
  stdout
    .trim()
    .split(/\n\n/g)
    .reduce(parseSection, []);

module.exports = async (options = {}) => {
  const run = options.exec || exec;
  return parse(await run('ifconfig -a'));
};
