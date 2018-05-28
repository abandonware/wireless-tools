const assert = require('assert');
const wireless = require('..');

describe('wireless.status([name])', () => {
  it('can get status of all interfaces', async () => {
    const status = await wireless.status();

    assert.deepEqual(status, [
      {
        name: 'eth0',
        flags: {
          addrconf: false,
          anycast: false,
          broadcast: true,
          cos: false,
          deprecated: false,
          dhcp: false,
          duplicate: false,
          failed: false,
          fixedmtu: false,
          inactive: false,
          loopback: false,
          mip: false,
          multibcast: false,
          multicast: true,
          noarp: false,
          nofailover: false,
          nolocal: false,
          nonud: false,
          nortexch: false,
          noxmit: false,
          offline: false,
          pointtopoint: false,
          preferred: false,
          private: false,
          router: false,
          running: true,
          standby: false,
          temporary: false,
          unnumbered: false,
          up: true,
          virtual: false,
          xresolv: false
        }
      },
      {
        name: 'lo',
        flags: {
          addrconf: false,
          anycast: false,
          broadcast: false,
          cos: false,
          deprecated: false,
          dhcp: false,
          duplicate: false,
          failed: false,
          fixedmtu: false,
          inactive: false,
          loopback: true,
          mip: false,
          multibcast: false,
          multicast: false,
          noarp: false,
          nofailover: false,
          nolocal: false,
          nonud: false,
          nortexch: false,
          noxmit: false,
          offline: false,
          pointtopoint: false,
          preferred: false,
          private: false,
          router: false,
          running: true,
          standby: false,
          temporary: false,
          unnumbered: false,
          up: true,
          virtual: false,
          xresolv: false
        }
      }
    ]);
  });
});
