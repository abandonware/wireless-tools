const assert = require('assert');
const wireless = require('..');

describe('wireless.status([name])', () => {
  it('can get status of all interfaces', async () => {
    const status = await wireless.status();

    assert.deepEqual(status, {
      eth0: {
        flags: {
          broadcast: true,
          multicast: true,
          running: true,
          up: true
        }
      },
      lo: {
        flags: {
          loopback: true,
          running: true,
          up: true
        }
      }
    });
  });
});
