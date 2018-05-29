const assert = require('assert');
const wireless = require('..');

describe('wireless.status()', () => {
  it('can get status of all interfaces', async () => {
    await wireless.status();
  });

  it('can parse alpine format', async () => {
    const stdout = [
      'eth0      Link encap:Ethernet  HWaddr DE:AD:BE:EF:00:03',
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
        mac: 'de:ad:be:ef:00:03',
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

  it('can parse darwin format', async () => {
    const stdout = [
      'lo0: flags=8049<UP,LOOPBACK,RUNNING,MULTICAST> mtu 16384',
      '	options=1203<RXCSUM,TXCSUM,TXSTATUS,SW_TIMESTAMP>',
      '	inet 127.0.0.1 netmask 0xff000000',
      '	inet6 ::1 prefixlen 128',
      '	inet6 fe80::1%lo0 prefixlen 64 scopeid 0x1',
      '	nd6 options=201<PERFORMNUD,DAD>',
      'gif0: flags=8010<POINTOPOINT,MULTICAST> mtu 1280',
      'stf0: flags=0<> mtu 1280',
      'XHC1: flags=0<> mtu 0',
      'XHC0: flags=0<> mtu 0',
      'XHC20: flags=0<> mtu 0',
      'en1: flags=8963<UP,BROADCAST,SMART,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1500',
      '	options=60<TSO4,TSO6>',
      '	ether de:ad:be:ef:4c:01',
      '	media: autoselect <full-duplex>',
      '	status: inactive',
      'en2: flags=8963<UP,BROADCAST,SMART,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1500',
      '	options=60<TSO4,TSO6>',
      '	ether de:ad:be:ef:4c:00',
      '	media: autoselect <full-duplex>',
      '	status: inactive',
      'en3: flags=8963<UP,BROADCAST,SMART,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1500',
      '	options=60<TSO4,TSO6>',
      '	ether de:ad:be:ef:4c:05',
      '	media: autoselect <full-duplex>',
      '	status: inactive',
      'en4: flags=8963<UP,BROADCAST,SMART,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1500',
      '	options=60<TSO4,TSO6>',
      '	ether de:ad:be:ef:4c:04',
      '	media: autoselect <full-duplex>',
      '	status: inactive',
      'en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500',
      '	ether de:ad:be:ef:04:80',
      '	inet6 fe80::10f2:34ff:8edb:a602%en0 prefixlen 64 secured scopeid 0xc',
      '	inet 192.168.1.150 netmask 0xffffff00 broadcast 192.168.1.255',
      '	nd6 options=201<PERFORMNUD,DAD>',
      '	media: autoselect',
      '	status: active',
      'p2p0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 2304',
      '	ether de:ad:be:ef:04:80',
      '	media: autoselect',
      '	status: inactive',
      'awdl0: flags=8943<UP,BROADCAST,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1484',
      '	ether de:ad:be:ef:86:ad',
      '	inet6 fe80::2c93:c1ff:fe4f:86ad%awdl0 prefixlen 64 scopeid 0xe',
      '	nd6 options=201<PERFORMNUD,DAD>',
      '	media: autoselect',
      '	status: active',
      'bridge0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500',
      '	options=63<RXCSUM,TXCSUM,TSO4,TSO6>',
      '	ether de:ad:be:ef:4c:01',
      '	Configuration:',
      '		id 0:0:0:0:0:0 priority 0 hellotime 0 fwddelay 0',
      '		maxage 0 holdcnt 0 proto stp maxaddr 100 timeout 1200',
      '		root id 0:0:0:0:0:0 priority 0 ifcost 0 port 0',
      '		ipfilter disabled flags 0x2',
      '	member: en1 flags=3<LEARNING,DISCOVER>',
      '	        ifmaxaddr 0 port 8 priority 0 path cost 0',
      '	member: en2 flags=3<LEARNING,DISCOVER>',
      '	        ifmaxaddr 0 port 9 priority 0 path cost 0',
      '	member: en3 flags=3<LEARNING,DISCOVER>',
      '	        ifmaxaddr 0 port 10 priority 0 path cost 0',
      '	member: en4 flags=3<LEARNING,DISCOVER>',
      '	        ifmaxaddr 0 port 11 priority 0 path cost 0',
      '	nd6 options=201<PERFORMNUD,DAD>',
      '	media: <unknown type>',
      '	status: inactive',
      'utun0: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> mtu 2000',
      '	inet6 fe80::10de:260e:2f3:da5e%utun0 prefixlen 64 scopeid 0x10',
      '	nd6 options=201<PERFORMNUD,DAD>',
      'en5: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500',
      '	ether de:ad:be:ef:11:22',
      '	inet6 fe80::aede:48ff:fe00:1122%en5 prefixlen 64 scopeid 0x7',
      '	nd6 options=201<PERFORMNUD,DAD>',
      '	media: autoselect',
      '	status: active'
    ].join('\n');

    const exec = async () => ({stdout});
    const status = await wireless.status({exec});

    assert.deepEqual(status, [
      {
        name: 'lo0',
        ip: '127.0.0.1',
        mask: '255.0.0.0',
        flags: {
          up: true,
          loopback: true,
          running: true,
          multicast: true
        }
      },
      {
        name: 'gif0',
        flags: {
          pointopoint: true,
          multicast: true
        }
      },
      {
        name: 'stf0',
        flags: {}
      },
      {
        name: 'XHC1',
        flags: {}
      },
      {
        name: 'XHC0',
        flags: {}
      },
      {
        name: 'XHC20',
        flags: {}
      },
      {
        name: 'en1',
        mac: 'de:ad:be:ef:4c:01',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          promisc: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'en2',
        mac: 'de:ad:be:ef:4c:00',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          promisc: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'en3',
        mac: 'de:ad:be:ef:4c:05',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          promisc: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'en4',
        mac: 'de:ad:be:ef:4c:04',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          promisc: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'en0',
        mac: 'de:ad:be:ef:04:80',
        ip: '192.168.1.150',
        mask: '255.255.255.0',
        broadcast: '192.168.1.255',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'p2p0',
        mac: 'de:ad:be:ef:04:80',
        flags: {
          up: true,
          broadcast: true,
          running: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'awdl0',
        mac: 'de:ad:be:ef:86:ad',
        flags: {
          up: true,
          broadcast: true,
          running: true,
          promisc: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'bridge0',
        mac: 'de:ad:be:ef:4c:01',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          simplex: true,
          multicast: true
        }
      },
      {
        name: 'utun0',
        flags: {
          up: true,
          pointopoint: true,
          running: true,
          multicast: true
        }
      },
      {
        name: 'en5',
        mac: 'de:ad:be:ef:11:22',
        flags: {
          up: true,
          broadcast: true,
          smart: true,
          running: true,
          simplex: true,
          multicast: true
        }
      }
    ]);
  });

  it('can parse debian format', async () => {
    const stdout = [
      'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
      '        inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255',
      '        ether de:ad:be:ef:00:02  txqueuelen 0  (Ethernet)',
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
        mac: 'de:ad:be:ef:00:02',
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
