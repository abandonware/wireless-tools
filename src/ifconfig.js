const exec = require('./exec');
const which = require('./which');

const parseName = section => {
  const match = section.match(/^([^:\s]+)/);
  return match && match[1];
};

const parseFlags = section => ({
  addrconf: /ADDRCONF/.test(section),
  anycast: /ANYCAST/.test(section),
  broadcast: /BROADCAST/.test(section),
  cos: /CoS/.test(section),
  deprecated: /DEPRECATED/.test(section),
  dhcp: /DHCP/.test(section),
  duplicate: /DUPLICATE/.test(section),
  failed: /FAILED/.test(section),
  fixedmtu: /FIXEDMTU/.test(section),
  inactive: /INACTIVE/.test(section),
  loopback: /LOOPBACK/.test(section),
  mip: /MIP/.test(section),
  multibcast: /MULTI_BCAST/.test(section),
  multicast: /MULTICAST/.test(section),
  noarp: /NOARP/.test(section),
  nofailover: /NOFAILOVER/.test(section),
  nolocal: /NOLOCAL/.test(section),
  nonud: /NONUD/.test(section),
  nortexch: /NORTEXCH/.test(section),
  noxmit: /NOXMIT/.test(section),
  offline: /OFFLINE/.test(section),
  pointtopoint: /POINTOPOINT/.test(section),
  preferred: /PREFERRED/.test(section),
  private: /PRIVATE/.test(section),
  router: /ROUTER/.test(section),
  running: /RUNNING/.test(section),
  standby: /STANDBY/.test(section),
  temporary: /TEMPORARY/.test(section),
  unnumbered: /UNNUMBERED/.test(section),
  up: /UP/.test(section),
  virtual: /VIRTUAL/.test(section),
  xresolv: /XRESOLV/.test(section)
});

const parseSection = section => {
  return {
    name: parseName(section),
    flags: parseFlags(section)
  };
};

const parse = ({stdout}) =>
  stdout
    .trim()
    .split(/\n\n/g)
    .map(parseSection);

exports.exists = () => which('ifconfig');

exports.status = async () => {
  return parse(await exec('ifconfig'));
};
