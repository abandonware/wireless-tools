const assert = require('assert');
const wireless = require('..');

describe('wireless.status()', () => {
  it('can get status of all interfaces', async () => {
    await wireless.status();
  });

  it('can parse alpine format', async () => {
    const stdout = [
      'eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:03',
      '          inet addr:172.17.0.3  Bcast:172.17.255.255  Mask:255.255.0.0',
      '          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1',
      '          RX packets:3 errors:0 dropped:0 overruns:0 frame:0',
      '          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0',
      '          collisions:0 txqueuelen:0',
      '          RX bytes:258 (258.0 B)  TX bytes:0 (0.0 B)',
      '',
      'ip6tnl0   Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00',
      '          NOARP  MTU:1452  Metric:1',
      '          RX packets:0 errors:0 dropped:0 overruns:0 frame:0',
      '          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0',
      '          collisions:0 txqueuelen:1',
      '          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)',
      '',
      'lo        Link encap:Local Loopback',
      '          inet addr:127.0.0.1  Mask:255.0.0.0',
      '          UP LOOPBACK RUNNING  MTU:65536  Metric:1',
      '          RX packets:0 errors:0 dropped:0 overruns:0 frame:0',
      '          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0',
      '          collisions:0 txqueuelen:1',
      '          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)',
      '',
      'tunl0     Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-62-D6-00-00-00-00-00-00-00-00',
      '          NOARP  MTU:1480  Metric:1',
      '          RX packets:0 errors:0 dropped:0 overruns:0 frame:0',
      '          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0',
      '          collisions:0 txqueuelen:1',
      '          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)',
      ''
    ].join('\n');

    const exec = async () => ({stdout});
    const status = await wireless.status({exec});

    assert.deepEqual(status, [
      {
        name: 'eth0',
        mac: '02:42:ac:11:00:03',
        ip: '172.17.0.3',
        mask: '255.255.0.0',
        broadcast: '172.17.255.255',
        flags: {
          broadcast: true,
          multicast: true,
          running: true,
          up: true
        }
      },
      {
        name: 'ip6tnl0',
        flags: {
          noarp: true
        }
      },
      {
        name: 'lo',
        ip: '127.0.0.1',
        mask: '255.0.0.0',
        flags: {
          loopback: true,
          running: true,
          up: true
        }
      },
      {
        name: 'tunl0',
        flags: {
          noarp: true
        }
      }
    ]);
  });

  it('can parse debian format', async () => {
    const stdout = [
      'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
      '        inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255',
      '        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)',
      '        RX packets 17410  bytes 15890390 (15.8 MB)',
      '        RX errors 0  dropped 0  overruns 0  frame 0',
      '        TX packets 9701  bytes 928960 (928.9 KB)',
      '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
      '',
      'ip6tnl0: flags=128<NOARP>  mtu 1452',
      '        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 1  (UNSPEC)',
      '        RX packets 0  bytes 0 (0.0 B)',
      '        RX errors 0  dropped 0  overruns 0  frame 0',
      '        TX packets 0  bytes 0 (0.0 B)',
      '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
      '',
      'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
      '        inet 127.0.0.1  netmask 255.0.0.0',
      '        loop  txqueuelen 1  (Local Loopback)',
      '        RX packets 0  bytes 0 (0.0 B)',
      '        RX errors 0  dropped 0  overruns 0  frame 0',
      '        TX packets 0  bytes 0 (0.0 B)',
      '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
      '',
      'tunl0: flags=128<NOARP>  mtu 1480',
      '        tunnel   txqueuelen 1  (IPIP Tunnel)',
      '        RX packets 0  bytes 0 (0.0 B)',
      '        RX errors 0  dropped 0  overruns 0  frame 0',
      '        TX packets 0  bytes 0 (0.0 B)',
      '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
      ''
    ].join('\n');

    const exec = async () => ({stdout});
    const status = await wireless.status({exec});

    assert.deepEqual(status, [
      {
        name: 'eth0',
        mac: '02:42:ac:11:00:02',
        ip: '172.17.0.2',
        mask: '255.255.0.0',
        broadcast: '172.17.255.255',
        flags: {
          broadcast: true,
          multicast: true,
          running: true,
          up: true
        }
      },
      {
        name: 'ip6tnl0',
        flags: {
          noarp: true
        }
      },
      {
        name: 'lo',
        ip: '127.0.0.1',
        mask: '255.0.0.0',
        flags: {
          loopback: true,
          running: true,
          up: true
        }
      },
      {
        name: 'tunl0',
        flags: {
          noarp: true
        }
      }
    ]);
  });
});
