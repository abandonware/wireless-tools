const exec = require('./exec');
const which = require('./which');

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

  if (name) {
    target[name] = {
      flags: parseFlags(section)
    };
  }

  return target;
}

const parse = ({stdout}) =>
  stdout
    .trim()
    .split(/\n\n/g)
    .reduce(parseSection, {});

exports.exists = () => which('ifconfig');

exports.status = async () => {
  return parse(await exec('ifconfig'));
};
