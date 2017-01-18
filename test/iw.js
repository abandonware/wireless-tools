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

var should = require('should');
var iw = require('../iw');

var IW_SCAN_LINUX = "BSS 14:91:82:c7:76:b9(on wlan0)\n" +
"        TSF: 337644127 usec (0d, 00:05:37)\n" +
"        freq: 2412\n" +
"        beacon interval: 100 TUs\n" +
"        capability: ESS Privacy ShortSlotTime (0x0411)\n" +
"        signal: -87.00 dBm\n" +
"        last seen: 0 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: creamcorn\n" +
"        Supported rates: 1.0* 2.0* 5.5* 11.0* 22.0 6.0 9.0 12.0 \n" +
"        DS Parameter set: channel 1\n" +
"        TIM: DTIM Count 0 DTIM Period 2 Bitmap Control 0x0 Bitmap[0] 0x0\n" +
"        ERP: <no flags>\n" +
"        Extended supported rates: 18.0 24.0 36.0 48.0 54.0 \n" +
"        RSN:     * Version: 1\n" +
"                 * Group cipher: CCMP\n" +
"                 * Pairwise ciphers: CCMP\n" +
"                 * Authentication suites: PSK\n" +
"                 * Capabilities: 16-PTKSA-RC 1-GTKSA-RC (0x000c)\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x6f\n" +
"                        RX LDPC\n" +
"                        HT20/HT40\n" +
"                        SM Power Save disabled\n" +
"                        RX HT20 SGI\n" +
"                        RX HT40 SGI\n" +
"                        No RX STBC\n" +
"                        Max AMSDU length: 3839 bytes\n" +
"                        No DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 4 usec (0x05)\n" +
"                HT TX/RX MCS rate indexes supported: 0-23, 32\n" +
"        HT operation:\n" +
"                 * primary channel: 1\n" +
"                 * secondary channel offset: no secondary\n" +
"                 * STA channel width: 20 MHz\n" +
"                 * RIFS: 0\n" +
"                 * HT protection: nonmember\n" +
"                 * non-GF present: 0\n" +
"                 * OBSS non-GF present: 1\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: 6\n" +
"        VHT capabilities:\n" +
"                VHT Capabilities (0x33801831):\n" +
"                        Max MPDU length: 7991\n" +
"                        Supported Channel Width: neither 160 nor 80+80\n" +
"                        RX LDPC\n" +
"                        short GI (80 MHz)\n" +
"                        SU Beamformer\n" +
"                        SU Beamformee\n" +
"                        RX antenna pattern consistency\n" +
"                        TX antenna pattern consistency\n" +
"                VHT RX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT RX highest supported: 0 Mbps\n" +
"                VHT TX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT TX highest supported: 0 Mbps\n" +
"        VHT operation:\n" +
"                 * channel width: 0 (20 or 40 MHz)\n" +
"                 * center freq segment 1: 0\n" +
"                 * center freq segment 2: 0\n" +
"                 * VHT basic MCS set: 0xfffc\n" +
"        WMM:     * Parameter version 1\n" +
"                 * BE: CW 15-1023, AIFSN 3, TXOP 2048 usec\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n" +
"BSS f4:0f:1b:b5:5b:4d(on wlan0)\n" +
"        TSF: 337645123 usec (0d, 00:05:37)\n" +
"        freq: 5260\n" +
"        beacon interval: 102 TUs\n" +
"        capability: ESS Privacy RadioMeasure (0x1011)\n" +
"        signal: -59.00 dBm\n" +
"        last seen: 4530 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: Wink-Visitor\n" +
"        Supported rates: 6.0* 9.0 12.0* 18.0 24.0* 36.0 48.0 54.0 \n" +
"        Country: US     Environment: Indoor/Outdoor\n" +
"                Channels [36 - 48] @ 17 dBm\n" +
"                Channels [52 - 64] @ 24 dBm\n" +
"                Channels [100 - 116] @ 24 dBm\n" +
"                Channels [132 - 140] @ 24 dBm\n" +
"                Channels [149 - 165] @ 30 dBm\n" +
"        BSS Load:\n" +
"                 * station count: 14\n" +
"                 * channel utilisation: 16/255\n" +
"                 * available admission capacity: 23437 [*32us]\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x19ac\n" +
"                        HT20\n" +
"                        SM Power Save disabled\n" +
"                        RX HT20 SGI\n" +
"                        TX STBC\n" +
"                        RX STBC 1-stream\n" +
"                        Max AMSDU length: 7935 bytes\n" +
"                        DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 8 usec (0x06)\n" +
"                HT RX MCS rate indexes supported: 0-23\n" +
"                HT TX MCS rate indexes are undefined\n" +
"        HT operation:\n" +
"                 * primary channel: 52\n" +
"                 * secondary channel offset: no secondary\n" +
"                 * STA channel width: 20 MHz\n" +
"                 * RIFS: 1\n" +
"                 * HT protection: no\n" +
"                 * non-GF present: 1\n" +
"                 * OBSS non-GF present: 0\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: Proxy ARP Service, WNM-Notification, 6\n" +
"        VHT capabilities:\n" +
"                VHT Capabilities (0x0f8379b2):\n" +
"                        Max MPDU length: 11454\n" +
"                        Supported Channel Width: neither 160 nor 80+80\n" +
"                        RX LDPC\n" +
"                        short GI (80 MHz)\n" +
"                        TX STBC\n" +
"                        SU Beamformer\n" +
"                        SU Beamformee\n" +
"                VHT RX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT RX highest supported: 0 Mbps\n" +
"                VHT TX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT TX highest supported: 0 Mbps\n" +
"        VHT operation:\n" +
"                 * channel width: 0 (20 or 40 MHz)\n" +
"                 * center freq segment 1: 0\n" +
"                 * center freq segment 2: 0\n" +
"                 * VHT basic MCS set: 0x0000\n" +
"        WPA:     * Version: 1\n" +
"                 * Group cipher: CCMP\n" +
"                 * Pairwise ciphers: CCMP\n" +
"                 * Authentication suites: PSK\n" +
"                 * Capabilities: 1-PTKSA-RC 1-GTKSA-RC (0x0000)\n" +
"        WMM:     * Parameter version 1\n" +
"                 * u-APSD\n" +
"                 * BE: CW 15-1023, AIFSN 3\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n" +
"BSS f4:0f:1b:b5:5b:4e(on wlan0)\n" +
"        TSF: 337645151 usec (0d, 00:05:37)\n" +
"        freq: 5260\n" +
"        beacon interval: 102 TUs\n" +
"        capability: ESS RadioMeasure (0x1001)\n" +
"        signal: -59.00 dBm\n" +
"        last seen: 4530 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: Flex-Visitor\n" +
"        Supported rates: 6.0* 9.0 12.0* 18.0 24.0* 36.0 48.0 54.0 \n" +
"        Country: US     Environment: Indoor/Outdoor\n" +
"                Channels [36 - 48] @ 17 dBm\n" +
"                Channels [52 - 64] @ 24 dBm\n" +
"                Channels [100 - 116] @ 24 dBm\n" +
"                Channels [132 - 140] @ 24 dBm\n" +
"                Channels [149 - 165] @ 30 dBm\n" +
"        BSS Load:\n" +
"                 * station count: 14\n" +
"                 * channel utilisation: 16/255\n" +
"                 * available admission capacity: 23437 [*32us]\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x19ac\n" +
"                        HT20\n" +
"                        SM Power Save disabled\n" +
"                        RX HT20 SGI\n" +
"                        TX STBC\n" +
"                        RX STBC 1-stream\n" +
"                        Max AMSDU length: 7935 bytes\n" +
"                        DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 8 usec (0x06)\n" +
"                HT RX MCS rate indexes supported: 0-23\n" +
"                HT TX MCS rate indexes are undefined\n" +
"        HT operation:\n" +
"                 * primary channel: 52\n" +
"                 * secondary channel offset: no secondary\n" +
"                 * STA channel width: 20 MHz\n" +
"                 * RIFS: 1\n" +
"                 * HT protection: no\n" +
"                 * non-GF present: 1\n" +
"                 * OBSS non-GF present: 0\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: Proxy ARP Service, WNM-Notification, 6\n" +
"        VHT capabilities:\n" +
"                VHT Capabilities (0x0f8379b2):\n" +
"                        Max MPDU length: 11454\n" +
"                        Supported Channel Width: neither 160 nor 80+80\n" +
"                        RX LDPC\n" +
"                        short GI (80 MHz)\n" +
"                        TX STBC\n" +
"                        SU Beamformer\n" +
"                        SU Beamformee\n" +
"                VHT RX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT RX highest supported: 0 Mbps\n" +
"                VHT TX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT TX highest supported: 0 Mbps\n" +
"        VHT operation:\n" +
"                 * channel width: 0 (20 or 40 MHz)\n" +
"                 * center freq segment 1: 0\n" +
"                 * center freq segment 2: 0\n" +
"                 * VHT basic MCS set: 0x0000\n" +
"        WMM:     * Parameter version 1\n" +
"                 * u-APSD\n" +
"                 * BE: CW 15-1023, AIFSN 3\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n" +
"BSS 6c:70:9f:e7:d8:b3(on wlan0)\n" +
"        TSF: 337644811 usec (0d, 00:05:37)\n" +
"        freq: 5180\n" +
"        beacon interval: 100 TUs\n" +
"        capability: ESS Privacy SpectrumMgmt RadioMeasure (0x1111)\n" +
"        signal: -77.00 dBm\n" +
"        last seen: 2110 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: QA Lab 5GHz\n" +
"        Supported rates: 6.0* 9.0 12.0* 18.0 24.0* 36.0 48.0 54.0 \n" +
"        Country: US     Environment: Indoor/Outdoor\n" +
"                Channels [36 - 36] @ 17 dBm\n" +
"                Channels [40 - 40] @ 17 dBm\n" +
"                Channels [44 - 44] @ 17 dBm\n" +
"                Channels [48 - 48] @ 17 dBm\n" +
"                Channels [52 - 52] @ 24 dBm\n" +
"                Channels [56 - 56] @ 24 dBm\n" +
"                Channels [60 - 60] @ 24 dBm\n" +
"                Channels [64 - 64] @ 24 dBm\n" +
"                Channels [100 - 100] @ 24 dBm\n" +
"                Channels [104 - 104] @ 24 dBm\n" +
"                Channels [108 - 108] @ 24 dBm\n" +
"                Channels [112 - 112] @ 24 dBm\n" +
"                Channels [116 - 116] @ 24 dBm\n" +
"                Channels [132 - 132] @ 24 dBm\n" +
"                Channels [136 - 136] @ 24 dBm\n" +
"                Channels [140 - 140] @ 24 dBm\n" +
"                Channels [144 - 144] @ 24 dBm\n" +
"                Channels [149 - 149] @ 30 dBm\n" +
"                Channels [153 - 153] @ 30 dBm\n" +
"                Channels [157 - 157] @ 30 dBm\n" +
"                Channels [161 - 161] @ 30 dBm\n" +
"                Channels [165 - 165] @ 30 dBm\n" +
"        Power constraint: 0 dB\n" +
"        TPC report: TX power: 17 dBm\n" +
"        RSN:     * Version: 1\n" +
"                 * Group cipher: CCMP\n" +
"                 * Pairwise ciphers: CCMP\n" +
"                 * Authentication suites: PSK\n" +
"                 * Capabilities: 1-PTKSA-RC 1-GTKSA-RC (0x0000)\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x9ef\n" +
"                        RX LDPC\n" +
"                        HT20/HT40\n" +
"                        SM Power Save disabled\n" +
"                        RX HT20 SGI\n" +
"                        RX HT40 SGI\n" +
"                        TX STBC\n" +
"                        RX STBC 1-stream\n" +
"                        Max AMSDU length: 7935 bytes\n" +
"                        No DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 4 usec (0x05)\n" +
"                HT RX MCS rate indexes supported: 0-23\n" +
"                HT TX MCS rate indexes are undefined\n" +
"        HT operation:\n" +
"                 * primary channel: 36\n" +
"                 * secondary channel offset: above\n" +
"                 * STA channel width: any\n" +
"                 * RIFS: 1\n" +
"                 * HT protection: no\n" +
"                 * non-GF present: 0\n" +
"                 * OBSS non-GF present: 0\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: 6\n" +
"        VHT capabilities:\n" +
"                VHT Capabilities (0x0f8259b2):\n" +
"                        Max MPDU length: 11454\n" +
"                        Supported Channel Width: neither 160 nor 80+80\n" +
"                        RX LDPC\n" +
"                        short GI (80 MHz)\n" +
"                        TX STBC\n" +
"                        SU Beamformer\n" +
"                        SU Beamformee\n" +
"                VHT RX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT RX highest supported: 0 Mbps\n" +
"                VHT TX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT TX highest supported: 0 Mbps\n" +
"        VHT operation:\n" +
"                 * channel width: 1 (80 MHz)\n" +
"                 * center freq segment 1: 42\n" +
"                 * center freq segment 2: 0\n" +
"                 * VHT basic MCS set: 0x0000\n" +
"        WMM:     * Parameter version 1\n" +
"                 * u-APSD\n" +
"                 * BE: CW 15-1023, AIFSN 3\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n" +
"BSS 2c:30:33:ec:4b:24(on wlan0)\n" +
"        TSF: 337644493 usec (0d, 00:05:37)\n" +
"        freq: 2437\n" +
"        beacon interval: 31 TUs\n" +
"        capability: ESS Privacy ShortPreamble SpectrumMgmt ShortSlotTime RadioMeasure (0x1531)\n" +
"        signal: -68.00 dBm\n" +
"        last seen: 0 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: NETGEAR03\n" +
"        Supported rates: 1.0* 2.0* 5.5 11.0 18.0 24.0 36.0 54.0 \n" +
"        DS Parameter set: channel 6\n" +
"        Country: US     Environment: Indoor/Outdoor\n" +
"                Channels [1 - 11] @ 30 dBm\n" +
"        Power constraint: 0 dB\n" +
"        TPC report: TX power: 25 dBm\n" +
"        ERP: <no flags>\n" +
"        ERP D4.0: <no flags>\n" +
"        RSN:     * Version: 1\n" +
"                 * Group cipher: CCMP\n" +
"                 * Pairwise ciphers: CCMP\n" +
"                 * Authentication suites: PSK\n" +
"                 * Capabilities: 16-PTKSA-RC 1-GTKSA-RC (0x000c)\n" +
"        Extended supported rates: 6.0 9.0 12.0 48.0 \n" +
"        BSS Load:\n" +
"                 * station count: 1\n" +
"                 * channel utilisation: 166/255\n" +
"                 * available admission capacity: 0 [*32us]\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x19b0\n" +
"                        HT20\n" +
"                        Static SM Power Save\n" +
"                        RX Greenfield\n" +
"                        RX HT20 SGI\n" +
"                        TX STBC\n" +
"                        RX STBC 1-stream\n" +
"                        Max AMSDU length: 7935 bytes\n" +
"                        DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 8 usec (0x06)\n" +
"                HT RX MCS rate indexes supported: 0-15\n" +
"                HT TX MCS rate indexes are undefined\n" +
"        HT operation:\n" +
"                 * primary channel: 6\n" +
"                 * secondary channel offset: no secondary\n" +
"                 * STA channel width: 20 MHz\n" +
"                 * RIFS: 1\n" +
"                 * HT protection: no\n" +
"                 * non-GF present: 1\n" +
"                 * OBSS non-GF present: 0\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: Extended Channel Switching, BSS Transition, 6\n" +
"        WPS:     * Version: 1.0\n" +
"                 * Wi-Fi Protected Setup State: 2 (Configured)\n" +
"                 * Response Type: 3 (AP)\n" +
"                 * UUID: 00000000-0000-0000-0000-000000000000\n" +
"                 * Manufacturer: NETGEAR, Inc.\n" +
"                 * Model: VMB3010\n" +
"                 * Model Number: VMB3010\n" +
"                 * Serial Number: 01\n" +
"                 * Primary Device Type: 6-0050f204-1\n" +
"                 * Device name: NTGRBS\n" +
"                 * Config methods: Label, PBC\n" +
"                 * RF Bands: 0x1\n" +
"        WMM:     * Parameter version 1\n" +
"                 * u-APSD\n" +
"                 * BE: CW 15-1023, AIFSN 3\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 6016 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 3264 usec\n" +
"BSS 7c:0e:ce:b7:d7:90(on wlan0)\n" +
"        TSF: 239785397355 usec (2d, 18:36:25)\n" +
"        freq: 2412\n" +
"        beacon interval: 102 TUs\n" +
"        capability: ESS Privacy ShortPreamble ShortSlotTime RadioMeasure (0x1431)\n" +
"        signal: -77.00 dBm\n" +
"        last seen: 10 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: Flex-Skynet\n" +
"        Supported rates: 1.0* 2.0* 5.5* 6.0 9.0 11.0* 12.0 18.0 \n" +
"        DS Parameter set: channel 1\n" +
"        Country: US     Environment: Indoor/Outdoor\n" +
"                Channels [1 - 11] @ 30 dBm\n" +
"        BSS Load:\n" +
"                 * station count: 2\n" +
"                 * channel utilisation: 201/255\n" +
"                 * available admission capacity: 23437 [*32us]\n" +
"        ERP: <no flags>\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x19ac\n" +
"                        HT20\n" +
"                        SM Power Save disabled\n" +
"                        RX HT20 SGI\n" +
"                        TX STBC\n" +
"                        RX STBC 1-stream\n" +
"                        Max AMSDU length: 7935 bytes\n" +
"                        DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 8 usec (0x06)\n" +
"                HT RX MCS rate indexes supported: 0-23\n" +
"                HT TX MCS rate indexes are undefined\n" +
"        RSN:     * Version: 1\n" +
"                 * Group cipher: CCMP\n" +
"                 * Pairwise ciphers: CCMP\n" +
"                 * Authentication suites: IEEE 802.1X\n" +
"                 * Capabilities: 4-PTKSA-RC 4-GTKSA-RC (0x0028)\n" +
"        Extended supported rates: 24.0 36.0 48.0 54.0 \n" +
"        HT operation:\n" +
"                 * primary channel: 1\n" +
"                 * secondary channel offset: no secondary\n" +
"                 * STA channel width: 20 MHz\n" +
"                 * RIFS: 0\n" +
"                 * HT protection: nonmember\n" +
"                 * non-GF present: 1\n" +
"                 * OBSS non-GF present: 0\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: Proxy ARP Service, WNM-Notification\n" +
"        WMM:     * Parameter version 1\n" +
"                 * u-APSD\n" +
"                 * BE: CW 15-1023, AIFSN 3\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n" +
"BSS cc:46:d6:3c:91:04(on wlan0)\n" +
"        TSF: 337644462 usec (0d, 00:05:37)\n" +
"        freq: 2412\n" +
"        beacon interval: 102 TUs\n" +
"        capability: ESS ShortPreamble ShortSlotTime RadioMeasure (0x1421)\n" +
"        signal: -90.00 dBm\n" +
"        last seen: 0 ms ago\n" +
"        SSID: \\x00\n" +
"        Supported rates: 1.0* 2.0* 5.5* 6.0 9.0 11.0* 12.0 18.0 \n" +
"        DS Parameter set: channel 1\n" +
"        TIM: DTIM Count 0 DTIM Period 1 Bitmap Control 0x0 Bitmap[0] 0x0\n" +
"        Country: US     Environment: Indoor/Outdoor\n" +
"                Channels [1 - 11] @ 30 dBm\n" +
"        BSS Load:\n" +
"                 * station count: 1\n" +
"                 * channel utilisation: 190/255\n" +
"                 * available admission capacity: 23437 [*32us]\n" +
"        ERP: <no flags>\n" +
"        HT capabilities:\n" +
"                Capabilities: 0x19ac\n" +
"                        HT20\n" +
"                        SM Power Save disabled\n" +
"                        RX HT20 SGI\n" +
"                        TX STBC\n" +
"                        RX STBC 1-stream\n" +
"                        Max AMSDU length: 7935 bytes\n" +
"                        DSSS/CCK HT40\n" +
"                Maximum RX AMPDU length 65535 bytes (exponent: 0x003)\n" +
"                Minimum RX AMPDU time spacing: 8 usec (0x06)\n" +
"                HT RX MCS rate indexes supported: 0-23\n" +
"                HT TX MCS rate indexes are undefined\n" +
"        Extended supported rates: 24.0 36.0 48.0 54.0 \n" +
"        HT operation:\n" +
"                 * primary channel: 1\n" +
"                 * secondary channel offset: no secondary\n" +
"                 * STA channel width: 20 MHz\n" +
"                 * RIFS: 0\n" +
"                 * HT protection: nonmember\n" +
"                 * non-GF present: 1\n" +
"                 * OBSS non-GF present: 0\n" +
"                 * dual beacon: 0\n" +
"                 * dual CTS protection: 0\n" +
"                 * STBC beacon: 0\n" +
"                 * L-SIG TXOP Prot: 0\n" +
"                 * PCO active: 0\n" +
"                 * PCO phase: 0\n" +
"        Extended capabilities: Proxy ARP Service, WNM-Notification\n" +
"        WMM:     * Parameter version 1\n" +
"                 * u-APSD\n" +
"                 * BE: CW 15-1023, AIFSN 3\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n" +
"BSS 14:91:82:bd:15:61(on wlan0)\n" +
"        TSF: 337644716 usec (0d, 00:05:37)\n" +
"        freq: 2457\n" +
"        beacon interval: 100 TUs\n" +
"        capability: ESS Privacy ShortSlotTime (0x0411)\n" +
"        signal: -88.00 dBm\n" +
"        last seen: 1070 ms ago\n" +
"        Information elements from Probe Response frame:\n" +
"        SSID: beast10\n" +
"        Supported rates: 1.0* 2.0* 5.5* 11.0* 22.0 6.0 9.0 12.0 \n" +
"        DS Parameter set: channel 10\n" +
"        TIM: DTIM Count 1 DTIM Period 2 Bitmap Control 0x0 Bitmap[0] 0x0\n" +
"        ERP: <no flags>\n" +
"        Extended supported rates: 18.0 24.0 36.0 48.0 54.0 \n" +
"        Extended capabilities: 6\n" +
"        VHT capabilities:\n" +
"                VHT Capabilities (0x33801831):\n" +
"                        Max MPDU length: 7991\n" +
"                        Supported Channel Width: neither 160 nor 80+80\n" +
"                        RX LDPC\n" +
"                        short GI (80 MHz)\n" +
"                        SU Beamformer\n" +
"                        SU Beamformee\n" +
"                        RX antenna pattern consistency\n" +
"                        TX antenna pattern consistency\n" +
"                VHT RX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT RX highest supported: 0 Mbps\n" +
"                VHT TX MCS set:\n" +
"                        1 streams: MCS 0-9\n" +
"                        2 streams: MCS 0-9\n" +
"                        3 streams: MCS 0-9\n" +
"                        4 streams: not supported\n" +
"                        5 streams: not supported\n" +
"                        6 streams: not supported\n" +
"                        7 streams: not supported\n" +
"                        8 streams: not supported\n" +
"                VHT TX highest supported: 0 Mbps\n" +
"        VHT operation:\n" +
"                 * channel width: 0 (20 or 40 MHz)\n" +
"                 * center freq segment 1: 0\n" +
"                 * center freq segment 2: 0\n" +
"                 * VHT basic MCS set: 0xfffc\n" +
"        WMM:     * Parameter version 1\n" +
"                 * BE: CW 15-1023, AIFSN 3, TXOP 2048 usec\n" +
"                 * BK: CW 15-1023, AIFSN 7\n" +
"                 * VI: CW 7-15, AIFSN 2, TXOP 3008 usec\n" +
"                 * VO: CW 3-7, AIFSN 2, TXOP 1504 usec\n"

describe('iw', function() {
  describe('iw.scan(interface, callback)', function() {
    it('should scan the specified interface', function(done) {
      iw.exec = function(command, callback) {
        should(command).eql('iw dev wlan0 scan');
        callback(null, IW_SCAN_LINUX, '');
      };

      iw.scan('wlan0', function(err, status) {
        should(status).eql([
          { frequency: 5260,
            address: "f4:0f:1b:b5:5b:4d",
            signal: -59,
            lastSeenMs: 4530,
            ssid: 'Wink-Visitor',
            channel: 52,
            security: 'wpa' },
          { frequency: 5260,
            address: "f4:0f:1b:b5:5b:4e",
            signal: -59,
            lastSeenMs: 4530,
            ssid: 'Flex-Visitor',
            channel: 52,
            security: 'open' },
          { frequency: 2437,
            address: "2c:30:33:ec:4b:24",
            signal: -68,
            lastSeenMs: 0,
            ssid: 'NETGEAR03',
            channel: 6,
            security: 'wpa2' },
          { frequency: 5180,
            address: "6c:70:9f:e7:d8:b3",
            signal: -77,
            lastSeenMs: 2110,
            ssid: 'QA Lab 5GHz',
            channel: 36,
            security: 'wpa2' },
          { frequency: 2412,
            address: "7c:0e:ce:b7:d7:90",
            signal: -77,
            lastSeenMs: 10,
            ssid: 'Flex-Skynet',
            channel: 1,
            security: 'wpa2' },
          { frequency: 2412,
            address: "14:91:82:c7:76:b9",
            signal: -87,
            lastSeenMs: 0,
            ssid: 'creamcorn',
            channel: 1,
            security: 'wpa2' },
          { frequency: 2457,
            address: "14:91:82:bd:15:61",
            signal: -88,
            lastSeenMs: 1070,
            ssid: 'beast10',
            channel: 10,
            security: 'wep' },
        ]);
        done();
      });
    })

    it('should scan the specified interface and show hidden ssid networks', function(done) {
      iw.exec = function(command, callback) {
        should(command).eql('iw dev wlan0 scan');
        callback(null, IW_SCAN_LINUX, '');
      };

      var options = {
        iface: 'wlan0',
        show_hidden: true
      };

      iw.scan(options, function(err, status) {
        should(status).eql([
          { frequency: 5260,
            address: "f4:0f:1b:b5:5b:4d",
            signal: -59,
            lastSeenMs: 4530,
            ssid: 'Wink-Visitor',
            channel: 52,
            security: 'wpa' },
          { frequency: 5260,
            address: "f4:0f:1b:b5:5b:4e",
            signal: -59,
            lastSeenMs: 4530,
            ssid: 'Flex-Visitor',
            channel: 52,
            security: 'open' },
          { frequency: 2437,
            address: "2c:30:33:ec:4b:24",
            signal: -68,
            lastSeenMs: 0,
            ssid: 'NETGEAR03',
            channel: 6,
            security: 'wpa2' },
          { frequency: 5180,
            address: "6c:70:9f:e7:d8:b3",
            signal: -77,
            lastSeenMs: 2110,
            ssid: 'QA Lab 5GHz',
            channel: 36,
            security: 'wpa2' },
          { frequency: 2412,
            address: "7c:0e:ce:b7:d7:90",
            signal: -77,
            lastSeenMs: 10,
            ssid: 'Flex-Skynet',
            channel: 1,
            security: 'wpa2' },
          { frequency: 2412,
            address: "14:91:82:c7:76:b9",
            signal: -87,
            lastSeenMs: 0,
            ssid: 'creamcorn',
            channel: 1,
            security: 'wpa2' },
          { frequency: 2457,
            address: "14:91:82:bd:15:61",
            signal: -88,
            lastSeenMs: 1070,
            ssid: 'beast10',
            channel: 10,
            security: 'wep' },
          { frequency: 2412,
            address: "cc:46:d6:3c:91:04",
            signal: -90,
            lastSeenMs: 0,
            channel: 1,
            security: 'open' },
        ]);
        done();
      });
    })

    it('should scan the specified interface and not show hidden ssid networks', function(done) {
      iw.exec = function(command, callback) {
        should(command).eql('iw dev wlan0 scan');
        callback(null, IW_SCAN_LINUX, '');
      };

      var options = {
        iface: 'wlan0'
      };

      iw.scan(options, function(err, status) {
        should(status).eql([
          { frequency: 5260,
            address: "f4:0f:1b:b5:5b:4d",
            signal: -59,
            lastSeenMs: 4530,
            ssid: 'Wink-Visitor',
            channel: 52,
            security: 'wpa' },
          { frequency: 5260,
            address: "f4:0f:1b:b5:5b:4e",
            signal: -59,
            lastSeenMs: 4530,
            ssid: 'Flex-Visitor',
            channel: 52,
            security: 'open' },
          { frequency: 2437,
            address: "2c:30:33:ec:4b:24",
            signal: -68,
            lastSeenMs: 0,
            ssid: 'NETGEAR03',
            channel: 6,
            security: 'wpa2' },
          { frequency: 5180,
            address: "6c:70:9f:e7:d8:b3",
            signal: -77,
            lastSeenMs: 2110,
            ssid: 'QA Lab 5GHz',
            channel: 36,
            security: 'wpa2' },
          { frequency: 2412,
            address: "7c:0e:ce:b7:d7:90",
            signal: -77,
            lastSeenMs: 10,
            ssid: 'Flex-Skynet',
            channel: 1,
            security: 'wpa2' },
          { frequency: 2412,
            address: "14:91:82:c7:76:b9",
            signal: -87,
            lastSeenMs: 0,
            ssid: 'creamcorn',
            channel: 1,
            security: 'wpa2' },
          { frequency: 2457,
            address: "14:91:82:bd:15:61",
            signal: -88,
            lastSeenMs: 1070,
            ssid: 'beast10',
            channel: 10,
            security: 'wep' },
        ]);
        done();
      });
    })

    it('should handle errors', function(done) {
      iw.exec = function(command, callback) {
        callback('error');
      };

      iw.scan('wlan0', function(err, status) {
        should(err).eql('error');
        done();
      });
    })
  })
})
