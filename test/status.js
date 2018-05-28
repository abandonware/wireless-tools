const assert = require('assert');
const wireless = require('..');

describe('wireless.status([name])', () => {
  it('can get status of all interfaces', async () => {
    const status = await wireless.status();

    assert.deepEqual(status, [
      {
        name: 'eth0'
      },
      {
        name: 'lo'
      }
    ]);
  });
});
