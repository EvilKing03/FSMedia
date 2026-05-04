// ===== SHARED DATA =====
// Reference: Ryzen 5 5600 = 100 (gaming), RTX 3060 @1080p = 100

const CPUS = [
  // Intel 6e gen (Skylake)
  { id: 'i3-6100',    brand: 'Intel', name: 'Core i3-6100',        gaming: 35,  productivity: 33,  tdp: 51  },
  { id: 'i5-6400',    brand: 'Intel', name: 'Core i5-6400',        gaming: 42,  productivity: 44,  tdp: 65  },
  { id: 'i5-6500',    brand: 'Intel', name: 'Core i5-6500',        gaming: 44,  productivity: 46,  tdp: 65  },
  { id: 'i5-6600k',   brand: 'Intel', name: 'Core i5-6600K',       gaming: 52,  productivity: 54,  tdp: 91  },
  { id: 'i7-6700',    brand: 'Intel', name: 'Core i7-6700',        gaming: 58,  productivity: 82,  tdp: 65  },
  { id: 'i7-6700k',   brand: 'Intel', name: 'Core i7-6700K',       gaming: 63,  productivity: 88,  tdp: 91  },
  // Intel 7e gen (Kaby Lake)
  { id: 'i3-7100',    brand: 'Intel', name: 'Core i3-7100',        gaming: 38,  productivity: 36,  tdp: 51  },
  { id: 'i5-7400',    brand: 'Intel', name: 'Core i5-7400',        gaming: 45,  productivity: 47,  tdp: 65  },
  { id: 'i5-7500',    brand: 'Intel', name: 'Core i5-7500',        gaming: 47,  productivity: 49,  tdp: 65  },
  { id: 'i5-7600k',   brand: 'Intel', name: 'Core i5-7600K',       gaming: 55,  productivity: 57,  tdp: 91  },
  { id: 'i7-7700',    brand: 'Intel', name: 'Core i7-7700',        gaming: 63,  productivity: 90,  tdp: 65  },
  { id: 'i7-7700k',   brand: 'Intel', name: 'Core i7-7700K',       gaming: 68,  productivity: 96,  tdp: 91  },
  // Intel 8e gen (Coffee Lake)
  { id: 'i3-8100',    brand: 'Intel', name: 'Core i3-8100',        gaming: 50,  productivity: 48,  tdp: 65  },
  { id: 'i5-8400',    brand: 'Intel', name: 'Core i5-8400',        gaming: 65,  productivity: 68,  tdp: 65  },
  { id: 'i5-8600k',   brand: 'Intel', name: 'Core i5-8600K',       gaming: 72,  productivity: 75,  tdp: 95  },
  { id: 'i7-8700',    brand: 'Intel', name: 'Core i7-8700',        gaming: 82,  productivity: 115, tdp: 65  },
  { id: 'i7-8700k',   brand: 'Intel', name: 'Core i7-8700K',       gaming: 85,  productivity: 120, tdp: 95  },
  // Intel 9e gen (Coffee Lake Refresh)
  { id: 'i3-9100',    brand: 'Intel', name: 'Core i3-9100',        gaming: 52,  productivity: 50,  tdp: 65  },
  { id: 'i3-9100f',   brand: 'Intel', name: 'Core i3-9100F',       gaming: 52,  productivity: 50,  tdp: 65  },
  { id: 'i5-9400',    brand: 'Intel', name: 'Core i5-9400',        gaming: 68,  productivity: 70,  tdp: 65  },
  { id: 'i5-9400f',   brand: 'Intel', name: 'Core i5-9400F',       gaming: 68,  productivity: 70,  tdp: 65  },
  { id: 'i5-9600k',   brand: 'Intel', name: 'Core i5-9600K',       gaming: 75,  productivity: 78,  tdp: 95  },
  { id: 'i7-9700',    brand: 'Intel', name: 'Core i7-9700',        gaming: 88,  productivity: 118, tdp: 65  },
  { id: 'i7-9700k',   brand: 'Intel', name: 'Core i7-9700K',       gaming: 90,  productivity: 122, tdp: 95  },
  { id: 'i9-9900k',   brand: 'Intel', name: 'Core i9-9900K',       gaming: 102, productivity: 148, tdp: 95  },
  { id: 'i9-9900ks',  brand: 'Intel', name: 'Core i9-9900KS',      gaming: 105, productivity: 152, tdp: 127 },
  // Intel 10e gen (Comet Lake)
  { id: 'i3-10100',   brand: 'Intel', name: 'Core i3-10100',       gaming: 62,  productivity: 60,  tdp: 65  },
  { id: 'i3-10100f',  brand: 'Intel', name: 'Core i3-10100F',      gaming: 62,  productivity: 60,  tdp: 65  },
  { id: 'i5-10400',   brand: 'Intel', name: 'Core i5-10400',       gaming: 78,  productivity: 82,  tdp: 65  },
  { id: 'i5-10400f',  brand: 'Intel', name: 'Core i5-10400F',      gaming: 78,  productivity: 82,  tdp: 65  },
  { id: 'i5-10600k',  brand: 'Intel', name: 'Core i5-10600K',      gaming: 88,  productivity: 90,  tdp: 125 },
  { id: 'i7-10700',   brand: 'Intel', name: 'Core i7-10700',       gaming: 95,  productivity: 132, tdp: 65  },
  { id: 'i7-10700k',  brand: 'Intel', name: 'Core i7-10700K',      gaming: 98,  productivity: 138, tdp: 125 },
  { id: 'i9-10900k',  brand: 'Intel', name: 'Core i9-10900K',      gaming: 108, productivity: 165, tdp: 125 },
  // Intel 11e gen (Rocket Lake)
  { id: 'i5-11400',   brand: 'Intel', name: 'Core i5-11400',       gaming: 85,  productivity: 88,  tdp: 65  },
  { id: 'i5-11400f',  brand: 'Intel', name: 'Core i5-11400F',      gaming: 85,  productivity: 88,  tdp: 65  },
  { id: 'i5-11600k',  brand: 'Intel', name: 'Core i5-11600K',      gaming: 92,  productivity: 98,  tdp: 125 },
  { id: 'i7-11700',   brand: 'Intel', name: 'Core i7-11700',       gaming: 98,  productivity: 145, tdp: 65  },
  { id: 'i7-11700k',  brand: 'Intel', name: 'Core i7-11700K',      gaming: 102, productivity: 152, tdp: 125 },
  { id: 'i9-11900k',  brand: 'Intel', name: 'Core i9-11900K',      gaming: 108, productivity: 168, tdp: 125 },
  // Intel 12e gen (Alder Lake)
  { id: 'i3-12100',   brand: 'Intel', name: 'Core i3-12100',       gaming: 75,  productivity: 72,  tdp: 60  },
  { id: 'i3-12100f',  brand: 'Intel', name: 'Core i3-12100F',      gaming: 75,  productivity: 72,  tdp: 60  },
  { id: 'i5-12400',   brand: 'Intel', name: 'Core i5-12400',       gaming: 94,  productivity: 100, tdp: 65  },
  { id: 'i5-12400f',  brand: 'Intel', name: 'Core i5-12400F',      gaming: 94,  productivity: 100, tdp: 65  },
  { id: 'i5-12600k',  brand: 'Intel', name: 'Core i5-12600K',      gaming: 105, productivity: 112, tdp: 125 },
  { id: 'i5-12600kf', brand: 'Intel', name: 'Core i5-12600KF',     gaming: 105, productivity: 112, tdp: 125 },
  { id: 'i7-12700',   brand: 'Intel', name: 'Core i7-12700',       gaming: 126, productivity: 170, tdp: 65  },
  { id: 'i7-12700k',  brand: 'Intel', name: 'Core i7-12700K',      gaming: 128, productivity: 175, tdp: 125 },
  { id: 'i9-12900k',  brand: 'Intel', name: 'Core i9-12900K',      gaming: 138, productivity: 225, tdp: 125 },
  { id: 'i9-12900ks', brand: 'Intel', name: 'Core i9-12900KS',     gaming: 142, productivity: 230, tdp: 150 },
  // Intel 13e gen (Raptor Lake)
  { id: 'i3-13100',   brand: 'Intel', name: 'Core i3-13100',       gaming: 78,  productivity: 75,  tdp: 60  },
  { id: 'i3-13100f',  brand: 'Intel', name: 'Core i3-13100F',      gaming: 78,  productivity: 75,  tdp: 60  },
  { id: 'i5-13400',   brand: 'Intel', name: 'Core i5-13400',       gaming: 100, productivity: 110, tdp: 65  },
  { id: 'i5-13400f',  brand: 'Intel', name: 'Core i5-13400F',      gaming: 100, productivity: 110, tdp: 65  },
  { id: 'i5-13600k',  brand: 'Intel', name: 'Core i5-13600K',      gaming: 118, productivity: 130, tdp: 125 },
  { id: 'i5-13600kf', brand: 'Intel', name: 'Core i5-13600KF',     gaming: 118, productivity: 130, tdp: 125 },
  { id: 'i7-13700',   brand: 'Intel', name: 'Core i7-13700',       gaming: 132, productivity: 188, tdp: 65  },
  { id: 'i7-13700k',  brand: 'Intel', name: 'Core i7-13700K',      gaming: 135, productivity: 192, tdp: 125 },
  { id: 'i9-13900k',  brand: 'Intel', name: 'Core i9-13900K',      gaming: 153, productivity: 248, tdp: 125 },
  { id: 'i9-13900ks', brand: 'Intel', name: 'Core i9-13900KS',     gaming: 158, productivity: 255, tdp: 150 },
  // Intel 14e gen (Raptor Lake Refresh)
  { id: 'i3-14100',   brand: 'Intel', name: 'Core i3-14100',       gaming: 78,  productivity: 75,  tdp: 60  },
  { id: 'i3-14100f',  brand: 'Intel', name: 'Core i3-14100F',      gaming: 78,  productivity: 75,  tdp: 60  },
  { id: 'i5-14400',   brand: 'Intel', name: 'Core i5-14400',       gaming: 103, productivity: 115, tdp: 65  },
  { id: 'i5-14400f',  brand: 'Intel', name: 'Core i5-14400F',      gaming: 103, productivity: 115, tdp: 65  },
  { id: 'i5-14600k',  brand: 'Intel', name: 'Core i5-14600K',      gaming: 122, productivity: 138, tdp: 125 },
  { id: 'i5-14600kf', brand: 'Intel', name: 'Core i5-14600KF',     gaming: 122, productivity: 138, tdp: 125 },
  { id: 'i7-14700',   brand: 'Intel', name: 'Core i7-14700',       gaming: 138, productivity: 198, tdp: 65  },
  { id: 'i7-14700k',  brand: 'Intel', name: 'Core i7-14700K',      gaming: 140, productivity: 200, tdp: 125 },
  { id: 'i9-14900k',  brand: 'Intel', name: 'Core i9-14900K',      gaming: 158, productivity: 258, tdp: 125 },
  { id: 'i9-14900ks', brand: 'Intel', name: 'Core i9-14900KS',     gaming: 162, productivity: 265, tdp: 150 },
  // Intel Arrow Lake (Core Ultra 200S)
  { id: 'cu5-245k',   brand: 'Intel', name: 'Core Ultra 5 245K',   gaming: 128, productivity: 145, tdp: 125 },
  { id: 'cu7-265k',   brand: 'Intel', name: 'Core Ultra 7 265K',   gaming: 148, productivity: 210, tdp: 125 },
  { id: 'cu9-285k',   brand: 'Intel', name: 'Core Ultra 9 285K',   gaming: 162, productivity: 265, tdp: 125 },
  // AMD Ryzen 1000 (Zen)
  { id: 'r5-1400',    brand: 'AMD',   name: 'Ryzen 5 1400',        gaming: 38,  productivity: 42,  tdp: 65  },
  { id: 'r5-1600',    brand: 'AMD',   name: 'Ryzen 5 1600',        gaming: 52,  productivity: 65,  tdp: 65  },
  { id: 'r5-1600x',   brand: 'AMD',   name: 'Ryzen 5 1600X',       gaming: 55,  productivity: 68,  tdp: 95  },
  { id: 'r7-1700',    brand: 'AMD',   name: 'Ryzen 7 1700',        gaming: 55,  productivity: 98,  tdp: 65  },
  { id: 'r7-1700x',   brand: 'AMD',   name: 'Ryzen 7 1700X',       gaming: 58,  productivity: 105, tdp: 95  },
  // AMD Ryzen 2000 (Zen+)
  { id: 'r5-2600',    brand: 'AMD',   name: 'Ryzen 5 2600',        gaming: 62,  productivity: 68,  tdp: 65  },
  { id: 'r5-2600x',   brand: 'AMD',   name: 'Ryzen 5 2600X',       gaming: 65,  productivity: 72,  tdp: 95  },
  { id: 'r7-2700',    brand: 'AMD',   name: 'Ryzen 7 2700',        gaming: 62,  productivity: 112, tdp: 65  },
  { id: 'r7-2700x',   brand: 'AMD',   name: 'Ryzen 7 2700X',       gaming: 65,  productivity: 118, tdp: 105 },
  // AMD Ryzen 3000 (Zen 2)
  { id: 'r3-3100',    brand: 'AMD',   name: 'Ryzen 3 3100',        gaming: 52,  productivity: 50,  tdp: 65  },
  { id: 'r3-3300x',   brand: 'AMD',   name: 'Ryzen 3 3300X',       gaming: 58,  productivity: 55,  tdp: 65  },
  { id: 'r5-3600',    brand: 'AMD',   name: 'Ryzen 5 3600',        gaming: 80,  productivity: 85,  tdp: 65  },
  { id: 'r5-3600x',   brand: 'AMD',   name: 'Ryzen 5 3600X',       gaming: 83,  productivity: 88,  tdp: 95  },
  { id: 'r7-3700x',   brand: 'AMD',   name: 'Ryzen 7 3700X',       gaming: 88,  productivity: 138, tdp: 65  },
  { id: 'r7-3800x',   brand: 'AMD',   name: 'Ryzen 7 3800X',       gaming: 90,  productivity: 142, tdp: 105 },
  { id: 'r9-3900x',   brand: 'AMD',   name: 'Ryzen 9 3900X',       gaming: 98,  productivity: 195, tdp: 105 },
  { id: 'r9-3950x',   brand: 'AMD',   name: 'Ryzen 9 3950X',       gaming: 102, productivity: 228, tdp: 105 },
  // AMD Ryzen 4000 (Zen 2, desktop)
  { id: 'r3-4100',    brand: 'AMD',   name: 'Ryzen 3 4100',        gaming: 55,  productivity: 52,  tdp: 65  },
  { id: 'r5-4500',    brand: 'AMD',   name: 'Ryzen 5 4500',        gaming: 82,  productivity: 85,  tdp: 65  },
  { id: 'r5-4600g',   brand: 'AMD',   name: 'Ryzen 5 4600G',       gaming: 85,  productivity: 88,  tdp: 65  },
  // AMD Ryzen 5000 (Zen 3)
  { id: 'r3-5300g',   brand: 'AMD',   name: 'Ryzen 3 5300G',       gaming: 65,  productivity: 62,  tdp: 65  },
  { id: 'r5-5500',    brand: 'AMD',   name: 'Ryzen 5 5500',        gaming: 78,  productivity: 80,  tdp: 65  },
  { id: 'r5-5600',    brand: 'AMD',   name: 'Ryzen 5 5600',        gaming: 100, productivity: 100, tdp: 65  },
  { id: 'r5-5600g',   brand: 'AMD',   name: 'Ryzen 5 5600G',       gaming: 95,  productivity: 98,  tdp: 65  },
  { id: 'r5-5600x',   brand: 'AMD',   name: 'Ryzen 5 5600X',       gaming: 103, productivity: 108, tdp: 65  },
  { id: 'r7-5700',    brand: 'AMD',   name: 'Ryzen 7 5700',        gaming: 106, productivity: 146, tdp: 65  },
  { id: 'r7-5700x',   brand: 'AMD',   name: 'Ryzen 7 5700X',       gaming: 108, productivity: 148, tdp: 65  },
  { id: 'r7-5700x3d', brand: 'AMD',   name: 'Ryzen 7 5700X3D',     gaming: 145, productivity: 140, tdp: 120 },
  { id: 'r7-5800x',   brand: 'AMD',   name: 'Ryzen 7 5800X',       gaming: 113, productivity: 158, tdp: 105 },
  { id: 'r7-5800x3d', brand: 'AMD',   name: 'Ryzen 7 5800X3D',     gaming: 155, productivity: 152, tdp: 120 },
  { id: 'r9-5900x',   brand: 'AMD',   name: 'Ryzen 9 5900X',       gaming: 120, productivity: 215, tdp: 105 },
  { id: 'r9-5950x',   brand: 'AMD',   name: 'Ryzen 9 5950X',       gaming: 125, productivity: 248, tdp: 105 },
  // AMD Ryzen 7000 (Zen 4)
  { id: 'r5-7500f',   brand: 'AMD',   name: 'Ryzen 5 7500F',       gaming: 115, productivity: 118, tdp: 65  },
  { id: 'r5-7600',    brand: 'AMD',   name: 'Ryzen 5 7600',        gaming: 118, productivity: 122, tdp: 65  },
  { id: 'r5-7600x',   brand: 'AMD',   name: 'Ryzen 5 7600X',       gaming: 122, productivity: 128, tdp: 105 },
  { id: 'r7-7700',    brand: 'AMD',   name: 'Ryzen 7 7700',        gaming: 128, productivity: 182, tdp: 65  },
  { id: 'r7-7700x',   brand: 'AMD',   name: 'Ryzen 7 7700X',       gaming: 132, productivity: 188, tdp: 105 },
  { id: 'r7-7800x3d', brand: 'AMD',   name: 'Ryzen 7 7800X3D',     gaming: 172, productivity: 168, tdp: 120 },
  { id: 'r9-7900',    brand: 'AMD',   name: 'Ryzen 9 7900',        gaming: 135, productivity: 245, tdp: 65  },
  { id: 'r9-7900x',   brand: 'AMD',   name: 'Ryzen 9 7900X',       gaming: 140, productivity: 258, tdp: 170 },
  { id: 'r9-7900x3d', brand: 'AMD',   name: 'Ryzen 9 7900X3D',     gaming: 155, productivity: 250, tdp: 120 },
  { id: 'r9-7950x',   brand: 'AMD',   name: 'Ryzen 9 7950X',       gaming: 158, productivity: 305, tdp: 170 },
  { id: 'r9-7950x3d', brand: 'AMD',   name: 'Ryzen 9 7950X3D',     gaming: 178, productivity: 320, tdp: 120 },
  // AMD Ryzen 9000 (Zen 5)
  { id: 'r5-9600',    brand: 'AMD',   name: 'Ryzen 5 9600',        gaming: 128, productivity: 132, tdp: 65  },
  { id: 'r5-9600x',   brand: 'AMD',   name: 'Ryzen 5 9600X',       gaming: 132, productivity: 138, tdp: 65  },
  { id: 'r7-9700x',   brand: 'AMD',   name: 'Ryzen 7 9700X',       gaming: 148, productivity: 200, tdp: 65  },
  { id: 'r7-9800x3d', brand: 'AMD',   name: 'Ryzen 7 9800X3D',     gaming: 185, productivity: 180, tdp: 120 },
  { id: 'r9-9900x',   brand: 'AMD',   name: 'Ryzen 9 9900X',       gaming: 155, productivity: 272, tdp: 120 },
  { id: 'r9-9950x',   brand: 'AMD',   name: 'Ryzen 9 9950X',       gaming: 165, productivity: 330, tdp: 170 },
];

const GPUS = [
  // NVIDIA GTX 10xx
  { id: 'gtx1050ti',  brand: 'NVIDIA', name: 'GeForce GTX 1050 Ti',        gaming: { 1080: 38,  1440: 27,  2160: 14  }, productivity: 28,  tdp: 75  },
  { id: 'gtx1060-3',  brand: 'NVIDIA', name: 'GeForce GTX 1060 3GB',       gaming: { 1080: 48,  1440: 34,  2160: 18  }, productivity: 32,  tdp: 120 },
  { id: 'gtx1060',    brand: 'NVIDIA', name: 'GeForce GTX 1060 6GB',       gaming: { 1080: 55,  1440: 40,  2160: 22  }, productivity: 38,  tdp: 120 },
  { id: 'gtx1070',    brand: 'NVIDIA', name: 'GeForce GTX 1070',           gaming: { 1080: 65,  1440: 48,  2160: 28  }, productivity: 48,  tdp: 150 },
  { id: 'gtx1070ti',  brand: 'NVIDIA', name: 'GeForce GTX 1070 Ti',        gaming: { 1080: 72,  1440: 54,  2160: 32  }, productivity: 54,  tdp: 180 },
  { id: 'gtx1080',    brand: 'NVIDIA', name: 'GeForce GTX 1080',           gaming: { 1080: 88,  1440: 68,  2160: 40  }, productivity: 66,  tdp: 180 },
  { id: 'gtx1080ti',  brand: 'NVIDIA', name: 'GeForce GTX 1080 Ti',        gaming: { 1080: 108, 1440: 83,  2160: 52  }, productivity: 82,  tdp: 250 },
  // NVIDIA GTX 16xx
  { id: 'gtx1650',    brand: 'NVIDIA', name: 'GeForce GTX 1650',           gaming: { 1080: 45,  1440: 32,  2160: 18  }, productivity: 32,  tdp: 75  },
  { id: 'gtx1650s',   brand: 'NVIDIA', name: 'GeForce GTX 1650 Super',     gaming: { 1080: 58,  1440: 42,  2160: 24  }, productivity: 42,  tdp: 100 },
  { id: 'gtx1660',    brand: 'NVIDIA', name: 'GeForce GTX 1660',           gaming: { 1080: 72,  1440: 54,  2160: 31  }, productivity: 52,  tdp: 120 },
  { id: 'gtx1660s',   brand: 'NVIDIA', name: 'GeForce GTX 1660 Super',     gaming: { 1080: 80,  1440: 60,  2160: 36  }, productivity: 58,  tdp: 125 },
  { id: 'gtx1660ti',  brand: 'NVIDIA', name: 'GeForce GTX 1660 Ti',        gaming: { 1080: 83,  1440: 63,  2160: 38  }, productivity: 62,  tdp: 120 },
  // NVIDIA RTX 20xx
  { id: 'rtx2060',    brand: 'NVIDIA', name: 'GeForce RTX 2060',           gaming: { 1080: 85,  1440: 65,  2160: 38  }, productivity: 65,  tdp: 160 },
  { id: 'rtx2060s',   brand: 'NVIDIA', name: 'GeForce RTX 2060 Super',     gaming: { 1080: 96,  1440: 73,  2160: 45  }, productivity: 78,  tdp: 175 },
  { id: 'rtx2070',    brand: 'NVIDIA', name: 'GeForce RTX 2070',           gaming: { 1080: 103, 1440: 80,  2160: 50  }, productivity: 88,  tdp: 175 },
  { id: 'rtx2070s',   brand: 'NVIDIA', name: 'GeForce RTX 2070 Super',     gaming: { 1080: 115, 1440: 90,  2160: 57  }, productivity: 98,  tdp: 215 },
  { id: 'rtx2080',    brand: 'NVIDIA', name: 'GeForce RTX 2080',           gaming: { 1080: 132, 1440: 104, 2160: 68  }, productivity: 118, tdp: 215 },
  { id: 'rtx2080ti',  brand: 'NVIDIA', name: 'GeForce RTX 2080 Ti',        gaming: { 1080: 148, 1440: 120, 2160: 80  }, productivity: 145, tdp: 250 },
  // NVIDIA RTX 30xx
  { id: 'rtx3050',    brand: 'NVIDIA', name: 'GeForce RTX 3050',           gaming: { 1080: 72,  1440: 52,  2160: 30  }, productivity: 62,  tdp: 130 },
  { id: 'rtx3060',    brand: 'NVIDIA', name: 'GeForce RTX 3060',           gaming: { 1080: 100, 1440: 75,  2160: 46  }, productivity: 95,  tdp: 170 },
  { id: 'rtx3060ti',  brand: 'NVIDIA', name: 'GeForce RTX 3060 Ti',        gaming: { 1080: 128, 1440: 98,  2160: 63  }, productivity: 112, tdp: 200 },
  { id: 'rtx3070',    brand: 'NVIDIA', name: 'GeForce RTX 3070',           gaming: { 1080: 148, 1440: 116, 2160: 76  }, productivity: 135, tdp: 220 },
  { id: 'rtx3070ti',  brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti',        gaming: { 1080: 160, 1440: 126, 2160: 83  }, productivity: 148, tdp: 290 },
  { id: 'rtx3080',    brand: 'NVIDIA', name: 'GeForce RTX 3080',           gaming: { 1080: 182, 1440: 150, 2160: 110 }, productivity: 182, tdp: 320 },
  { id: 'rtx3080ti',  brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti',        gaming: { 1080: 198, 1440: 163, 2160: 122 }, productivity: 208, tdp: 350 },
  { id: 'rtx3090',    brand: 'NVIDIA', name: 'GeForce RTX 3090',           gaming: { 1080: 208, 1440: 176, 2160: 136 }, productivity: 242, tdp: 350 },
  { id: 'rtx3090ti',  brand: 'NVIDIA', name: 'GeForce RTX 3090 Ti',        gaming: { 1080: 218, 1440: 186, 2160: 146 }, productivity: 256, tdp: 450 },
  // NVIDIA RTX 40xx
  { id: 'rtx4060',    brand: 'NVIDIA', name: 'GeForce RTX 4060',           gaming: { 1080: 118, 1440: 88,  2160: 55  }, productivity: 102, tdp: 115 },
  { id: 'rtx4060ti',  brand: 'NVIDIA', name: 'GeForce RTX 4060 Ti',        gaming: { 1080: 148, 1440: 118, 2160: 78  }, productivity: 132, tdp: 165 },
  { id: 'rtx4070',    brand: 'NVIDIA', name: 'GeForce RTX 4070',           gaming: { 1080: 188, 1440: 158, 2160: 118 }, productivity: 172, tdp: 200 },
  { id: 'rtx4070s',   brand: 'NVIDIA', name: 'GeForce RTX 4070 Super',     gaming: { 1080: 208, 1440: 175, 2160: 132 }, productivity: 192, tdp: 220 },
  { id: 'rtx4070ti',  brand: 'NVIDIA', name: 'GeForce RTX 4070 Ti',        gaming: { 1080: 228, 1440: 195, 2160: 150 }, productivity: 215, tdp: 285 },
  { id: 'rtx4070tis', brand: 'NVIDIA', name: 'GeForce RTX 4070 Ti Super',  gaming: { 1080: 245, 1440: 212, 2160: 165 }, productivity: 235, tdp: 285 },
  { id: 'rtx4080',    brand: 'NVIDIA', name: 'GeForce RTX 4080',           gaming: { 1080: 262, 1440: 232, 2160: 185 }, productivity: 268, tdp: 320 },
  { id: 'rtx4080s',   brand: 'NVIDIA', name: 'GeForce RTX 4080 Super',     gaming: { 1080: 272, 1440: 242, 2160: 195 }, productivity: 278, tdp: 320 },
  { id: 'rtx4090',    brand: 'NVIDIA', name: 'GeForce RTX 4090',           gaming: { 1080: 312, 1440: 285, 2160: 242 }, productivity: 322, tdp: 450 },
  // NVIDIA RTX 50xx
  { id: 'rtx5060ti',  brand: 'NVIDIA', name: 'GeForce RTX 5060 Ti',        gaming: { 1080: 182, 1440: 152, 2160: 112 }, productivity: 162, tdp: 180 },
  { id: 'rtx5070',    brand: 'NVIDIA', name: 'GeForce RTX 5070',           gaming: { 1080: 225, 1440: 198, 2160: 162 }, productivity: 218, tdp: 250 },
  { id: 'rtx5070ti',  brand: 'NVIDIA', name: 'GeForce RTX 5070 Ti',        gaming: { 1080: 262, 1440: 235, 2160: 195 }, productivity: 265, tdp: 300 },
  { id: 'rtx5080',    brand: 'NVIDIA', name: 'GeForce RTX 5080',           gaming: { 1080: 295, 1440: 268, 2160: 228 }, productivity: 308, tdp: 360 },
  { id: 'rtx5090',    brand: 'NVIDIA', name: 'GeForce RTX 5090',           gaming: { 1080: 375, 1440: 348, 2160: 302 }, productivity: 395, tdp: 575 },
  // AMD Radeon RX 5xx
  { id: 'rx570',      brand: 'AMD',    name: 'Radeon RX 570 8GB',          gaming: { 1080: 48,  1440: 34,  2160: 18  }, productivity: 32,  tdp: 150 },
  { id: 'rx580',      brand: 'AMD',    name: 'Radeon RX 580 8GB',          gaming: { 1080: 55,  1440: 40,  2160: 22  }, productivity: 36,  tdp: 185 },
  { id: 'rx590',      brand: 'AMD',    name: 'Radeon RX 590',              gaming: { 1080: 60,  1440: 44,  2160: 24  }, productivity: 40,  tdp: 225 },
  // AMD Radeon RX 5700
  { id: 'rx5700xt',   brand: 'AMD',    name: 'Radeon RX 5700 XT',          gaming: { 1080: 110, 1440: 85,  2160: 52  }, productivity: 90,  tdp: 225 },
  // AMD Radeon RX 6xxx
  { id: 'rx6500xt',   brand: 'AMD',    name: 'Radeon RX 6500 XT',          gaming: { 1080: 60,  1440: 42,  2160: 23  }, productivity: 38,  tdp: 107 },
  { id: 'rx6600',     brand: 'AMD',    name: 'Radeon RX 6600',             gaming: { 1080: 102, 1440: 73,  2160: 43  }, productivity: 80,  tdp: 132 },
  { id: 'rx6600xt',   brand: 'AMD',    name: 'Radeon RX 6600 XT',          gaming: { 1080: 115, 1440: 86,  2160: 53  }, productivity: 92,  tdp: 160 },
  { id: 'rx6650xt',   brand: 'AMD',    name: 'Radeon RX 6650 XT',          gaming: { 1080: 122, 1440: 93,  2160: 58  }, productivity: 98,  tdp: 176 },
  { id: 'rx6700xt',   brand: 'AMD',    name: 'Radeon RX 6700 XT',          gaming: { 1080: 140, 1440: 110, 2160: 70  }, productivity: 118, tdp: 230 },
  { id: 'rx6750xt',   brand: 'AMD',    name: 'Radeon RX 6750 XT',          gaming: { 1080: 150, 1440: 120, 2160: 78  }, productivity: 125, tdp: 250 },
  { id: 'rx6800',     brand: 'AMD',    name: 'Radeon RX 6800',             gaming: { 1080: 165, 1440: 135, 2160: 98  }, productivity: 152, tdp: 250 },
  { id: 'rx6800xt',   brand: 'AMD',    name: 'Radeon RX 6800 XT',          gaming: { 1080: 185, 1440: 155, 2160: 116 }, productivity: 172, tdp: 300 },
  { id: 'rx6900xt',   brand: 'AMD',    name: 'Radeon RX 6900 XT',          gaming: { 1080: 198, 1440: 168, 2160: 128 }, productivity: 188, tdp: 300 },
  { id: 'rx6950xt',   brand: 'AMD',    name: 'Radeon RX 6950 XT',          gaming: { 1080: 215, 1440: 186, 2160: 146 }, productivity: 205, tdp: 335 },
  // AMD Radeon RX 7xxx
  { id: 'rx7600',     brand: 'AMD',    name: 'Radeon RX 7600',             gaming: { 1080: 118, 1440: 88,  2160: 55  }, productivity: 95,  tdp: 165 },
  { id: 'rx7700xt',   brand: 'AMD',    name: 'Radeon RX 7700 XT',          gaming: { 1080: 148, 1440: 120, 2160: 80  }, productivity: 130, tdp: 245 },
  { id: 'rx7800xt',   brand: 'AMD',    name: 'Radeon RX 7800 XT',          gaming: { 1080: 175, 1440: 146, 2160: 106 }, productivity: 160, tdp: 263 },
  { id: 'rx7900gre',  brand: 'AMD',    name: 'Radeon RX 7900 GRE',         gaming: { 1080: 202, 1440: 172, 2160: 136 }, productivity: 192, tdp: 260 },
  { id: 'rx7900xt',   brand: 'AMD',    name: 'Radeon RX 7900 XT',          gaming: { 1080: 240, 1440: 210, 2160: 168 }, productivity: 230, tdp: 315 },
  { id: 'rx7900xtx',  brand: 'AMD',    name: 'Radeon RX 7900 XTX',         gaming: { 1080: 265, 1440: 238, 2160: 196 }, productivity: 258, tdp: 355 },
  // AMD Radeon RX 9xxx
  { id: 'rx9070',     brand: 'AMD',    name: 'Radeon RX 9070',             gaming: { 1080: 245, 1440: 218, 2160: 180 }, productivity: 238, tdp: 220 },
  { id: 'rx9070xt',   brand: 'AMD',    name: 'Radeon RX 9070 XT',          gaming: { 1080: 268, 1440: 240, 2160: 200 }, productivity: 262, tdp: 304 },
  // Intel Arc
  { id: 'arc-a750',   brand: 'Intel',  name: 'Arc A750',                   gaming: { 1080: 92,  1440: 68,  2160: 40  }, productivity: 72,  tdp: 225 },
  { id: 'arc-a770',   brand: 'Intel',  name: 'Arc A770',                   gaming: { 1080: 108, 1440: 80,  2160: 48  }, productivity: 85,  tdp: 225 },
  { id: 'arc-b570',   brand: 'Intel',  name: 'Arc B570',                   gaming: { 1080: 118, 1440: 90,  2160: 56  }, productivity: 95,  tdp: 150 },
  { id: 'arc-b580',   brand: 'Intel',  name: 'Arc B580',                   gaming: { 1080: 135, 1440: 105, 2160: 68  }, productivity: 110, tdp: 190 },
];

// ===== FPS GAME DATA =====
const GAMES = {
  cs2:      { name: 'Counter-Strike 2',       baseFps: 248, cpuWeight: 0.68 },
  valo:     { name: 'Valorant',               baseFps: 360, cpuWeight: 0.62 },
  fortnite: { name: 'Fortnite',               baseFps: 133, cpuWeight: 0.42 },
  apex:     { name: 'Apex Legends',           baseFps: 162, cpuWeight: 0.38 },
  cod:      { name: 'Call of Duty: MWIII',    baseFps: 140, cpuWeight: 0.35 },
  r6:       { name: 'Rainbow Six Siege',      baseFps: 181, cpuWeight: 0.48 },
  mc:       { name: 'Minecraft Java',         baseFps: 272, cpuWeight: 0.78 },
  gta5:     { name: 'GTA V',                  baseFps: 114, cpuWeight: 0.32 },
  elden:    { name: 'Elden Ring',             baseFps: 95,  cpuWeight: 0.28 },
  w3:       { name: 'The Witcher 3',          baseFps: 114, cpuWeight: 0.20 },
  cp2077:   { name: 'Cyberpunk 2077',         baseFps: 71,  cpuWeight: 0.15 },
  rdr2:     { name: 'Red Dead Redemption 2',  baseFps: 66,  cpuWeight: 0.22 },
  bg3:      { name: "Baldur's Gate 3",        baseFps: 80,  cpuWeight: 0.25 },
  hell:     { name: 'Helldivers 2',           baseFps: 90,  cpuWeight: 0.35 },
};

const QUAL_FACTORS = { low: 1.52, medium: 1.0, high: 0.70, ultra: 0.55 };

// ===== UTILITIES =====

function buildSelectWithSearch(selectId, items, placeholder) {
  const sel = document.getElementById(selectId);
  if (!sel) return;

  const brands = {};
  items.forEach(item => {
    if (!brands[item.brand]) brands[item.brand] = [];
    brands[item.brand].push(item);
  });

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'btool-search';
  input.placeholder = placeholder || 'Rechercher…';
  sel.parentElement.insertBefore(input, sel);

  function populate(term) {
    const lc = (term || '').toLowerCase();
    const prev = sel.value;
    sel.innerHTML = '<option value="">— Choisir —</option>';
    for (const [brand, list] of Object.entries(brands)) {
      const matches = lc ? list.filter(x => x.name.toLowerCase().includes(lc) || x.id.toLowerCase().includes(lc)) : list;
      if (!matches.length) continue;
      const grp = document.createElement('optgroup');
      grp.label = brand;
      matches.forEach(x => grp.appendChild(new Option(x.name, x.id)));
      sel.appendChild(grp);
    }
    if (prev) sel.value = prev;
  }

  populate('');
  input.addEventListener('input', () => populate(input.value));
}

function pillGroup(containerId, onChange) {
  document.querySelectorAll(`#${containerId} .pill`).forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll(`#${containerId} .pill`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (onChange) onChange(btn.dataset.value);
    });
  });
}

function activeVal(containerId) {
  return document.querySelector(`#${containerId} .pill.active`)?.dataset.value;
}

// ===== TAB SYSTEM =====
document.querySelectorAll('.toolbox-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.toolbox-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.toolbox-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tool-' + tab.dataset.tool).classList.add('active');
  });
});

// ===== TOOL 1: BOTTLENECK =====
(function () {
  let selectedRes   = '1080';
  let selectedUsage = 'gaming';

  buildSelectWithSearch('cpu-select', CPUS, 'Rechercher un processeur…');
  buildSelectWithSearch('gpu-select', GPUS, 'Rechercher une carte graphique…');

  const cpuSel  = document.getElementById('cpu-select');
  const gpuSel  = document.getElementById('gpu-select');
  const errBox  = document.getElementById('btool-error');
  const results = document.getElementById('btool-results');

  pillGroup('res-pills',   v => { selectedRes   = v; });
  pillGroup('usage-pills', v => {
    selectedUsage = v;
    document.getElementById('res-group').style.display = v === 'gaming' ? '' : 'none';
  });

  cpuSel.addEventListener('change', () => cpuSel.classList.remove('invalid'));
  gpuSel.addEventListener('change', () => gpuSel.classList.remove('invalid'));

  document.getElementById('calc-btn').addEventListener('click', () => {
    const cpu = CPUS.find(c => c.id === cpuSel.value);
    const gpu = GPUS.find(g => g.id === gpuSel.value);
    cpuSel.classList.remove('invalid');
    gpuSel.classList.remove('invalid');
    errBox.style.display = 'none';

    if (!cpu || !gpu) {
      if (!cpu) cpuSel.classList.add('invalid');
      if (!gpu) gpuSel.classList.add('invalid');
      errBox.style.display = 'flex';
      return;
    }

    const cpuScore = selectedUsage === 'gaming' ? cpu.gaming : cpu.productivity;
    const gpuScore = selectedUsage === 'gaming' ? gpu.gaming[selectedRes] : gpu.productivity;
    const max      = Math.max(cpuScore, gpuScore);
    const pct      = Math.round((Math.abs(cpuScore - gpuScore) / max) * 100);
    const btk      = cpuScore < gpuScore ? 'CPU' : 'GPU';

    const badge   = document.getElementById('result-badge');
    const pctEl   = document.getElementById('result-pct');
    const textEl  = document.getElementById('result-text');
    const tipEl   = document.getElementById('result-tip');
    const cpuBar  = document.getElementById('cpu-bar');
    const gpuBar  = document.getElementById('gpu-bar');
    const cpuName = document.getElementById('cpu-name-display');
    const gpuName = document.getElementById('gpu-name-display');
    const cpuTag  = document.getElementById('cpu-tag');
    const gpuTag  = document.getElementById('gpu-tag');

    cpuName.textContent = cpu.name;
    gpuName.textContent = gpu.name;
    cpuBar.style.width  = (cpuScore / max * 100) + '%';
    gpuBar.style.width  = (gpuScore / max * 100) + '%';
    cpuTag.textContent  = ''; gpuTag.textContent = '';
    cpuTag.className    = 'btool-bar-tag'; gpuTag.className = 'btool-bar-tag';

    if (pct > 0) {
      const el = btk === 'CPU' ? cpuTag : gpuTag;
      el.textContent = 'Bottleneck';
      el.classList.add('btool-bar-tag--bottleneck');
    }

    pctEl.textContent = pct + '%';

    const isG = selectedUsage === 'gaming';
    let severity, badgeText, text, tip;

    if (pct < 10) {
      severity = 'balanced'; badgeText = 'Configuration équilibrée';
      text = `Votre ${cpu.name} et votre ${gpu.name} sont bien assortis — aucun composant ne bride l'autre de façon significative.`;
      tip  = '';
    } else if (btk === 'CPU') {
      if (pct < 20) {
        severity = 'low'; badgeText = 'Bottleneck CPU léger';
        text = isG ? `Votre ${cpu.name} limite légèrement votre ${gpu.name}. L'impact sur vos FPS sera minimal dans la plupart des jeux.`
                   : `Votre ${cpu.name} est légèrement en dessous pour les tâches créatives. L'impact est faible.`;
        tip  = isG ? 'Niveau acceptable. Augmenter la résolution ou la qualité graphique peut réduire cet écart.' : 'Peu d\'impact au quotidien. Peut se ressentir sur de très longs rendus.';
      } else if (pct < 35) {
        severity = 'medium'; badgeText = 'Bottleneck CPU modéré';
        text = isG ? `Votre ${cpu.name} crée un bottleneck notable. Vous n'exploitez pas pleinement votre ${gpu.name}.`
                   : `Votre ${cpu.name} ralentit significativement les tâches créatives lourdes.`;
        tip  = isG ? 'Un upgrade CPU améliorerait vos performances. Jouer en 1440p ou 4K réduit aussi la pression CPU.' : 'Un processeur avec plus de cœurs améliorerait vos temps de rendu.';
      } else {
        severity = 'high'; badgeText = 'Bottleneck CPU sévère';
        text = isG ? `Votre ${cpu.name} bride fortement votre ${gpu.name}. Vous perdez une part importante des performances GPU.`
                   : `Votre ${cpu.name} est clairement insuffisant pour exploiter votre ${gpu.name} en créatif intensif.`;
        tip  = isG ? 'Un upgrade CPU est fortement recommandé. Jouer en haute résolution peut temporairement masquer ce bottleneck.' : 'Un changement de CPU s\'impose pour exploiter correctement votre GPU.';
      }
    } else {
      if (pct < 20) {
        severity = 'low'; badgeText = 'Bottleneck GPU léger';
        text = isG ? `Votre ${gpu.name} limite légèrement votre ${cpu.name}. L'impact sera minime dans la plupart des jeux.`
                   : `Votre ${gpu.name} est légèrement en dessous pour les tâches GPU-assistées.`;
        tip  = isG ? 'Niveau normal et acceptable. Baisser légèrement les paramètres graphiques peut libérer du headroom.' : 'L\'impact est faible au quotidien.';
      } else if (pct < 35) {
        severity = 'medium'; badgeText = 'Bottleneck GPU modéré';
        text = isG ? `Votre ${gpu.name} crée un bottleneck notable. Votre processeur est sous-exploité à cette résolution.`
                   : `Votre ${gpu.name} ralentit les tâches créatives GPU-intensives.`;
        tip  = isG ? 'Un upgrade GPU améliorerait vos performances. Augmenter la résolution peut aussi mieux équilibrer la charge.' : 'Un GPU plus puissant avec plus de VRAM améliorerait sensiblement vos temps de rendu.';
      } else {
        severity = 'high'; badgeText = 'Bottleneck GPU sévère';
        text = isG ? `Votre ${gpu.name} bride fortement votre ${cpu.name}. Votre processeur attend constamment votre GPU.`
                   : `Votre ${gpu.name} est clairement le maillon faible pour un usage créatif GPU-intensif.`;
        tip  = isG ? 'Un upgrade GPU est fortement recommandé. Réduire la résolution ou les paramètres peut temporairement compenser.' : 'Un GPU plus récent avec plus de VRAM transformerait votre expérience créative.';
      }
    }

    badge.textContent = badgeText;
    badge.className   = `btool-result-badge btool-result-badge--${severity}`;
    textEl.textContent = text;
    tipEl.textContent  = tip;
    results.classList.add('visible');
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

// ===== TOOL 2: PSU CALCULATOR =====
(function () {
  buildSelectWithSearch('psu-cpu-select', CPUS, 'Rechercher un processeur…');
  buildSelectWithSearch('psu-gpu-select', GPUS, 'Rechercher une carte graphique…');

  const cpuSel = document.getElementById('psu-cpu-select');
  const gpuSel = document.getElementById('psu-gpu-select');
  const errBox = document.getElementById('psu-error');
  const result = document.getElementById('psu-result');

  ['psu-ram-pills','psu-storage-pills','psu-cool-pills','psu-fans-pills','psu-oc-pills'].forEach(id => pillGroup(id));
  cpuSel.addEventListener('change', () => cpuSel.classList.remove('invalid'));
  gpuSel.addEventListener('change', () => gpuSel.classList.remove('invalid'));

  document.getElementById('psu-calc-btn').addEventListener('click', () => {
    const cpu = CPUS.find(c => c.id === cpuSel.value);
    const gpu = GPUS.find(g => g.id === gpuSel.value);
    cpuSel.classList.remove('invalid'); gpuSel.classList.remove('invalid');
    errBox.style.display = 'none';

    if (!cpu || !gpu) {
      if (!cpu) cpuSel.classList.add('invalid');
      if (!gpu) gpuSel.classList.add('invalid');
      errBox.style.display = 'flex';
      return;
    }

    const ram     = parseInt(activeVal('psu-ram-pills') || '2');
    const storage = activeVal('psu-storage-pills') || 'ssd';
    const cool    = activeVal('psu-cool-pills')    || 'air';
    const fans    = parseInt(activeVal('psu-fans-pills') || '0');
    const oc      = activeVal('psu-oc-pills')      === 'yes';

    const cpuWatt  = Math.round(cpu.tdp * (oc ? 1.2 : 0.9));
    const gpuWatt  = Math.round(gpu.tdp * (oc ? 1.15 : 1.0));
    const ramWatt  = ram * 5;
    const storWatt = storage === 'ssd' ? 7 : storage === 'ssd1hdd' ? 15 : 23;
    const coolWatt = cool === 'air' ? 5 : cool === 'aio240' ? 15 : 20;
    const fansWatt = fans * 3;
    const baseWatt = 70;
    const restWatt = ramWatt + storWatt + coolWatt + fansWatt;
    const total    = cpuWatt + gpuWatt + restWatt + baseWatt;

    const sizes   = [450, 550, 650, 750, 850, 1000, 1200];
    const needed  = Math.ceil(total * 1.25);
    const recSize = sizes.find(s => s >= needed) || 1200;

    let severity, badgeText;
    if      (total < 250) { severity = 'balanced'; badgeText = 'Configuration économe'; }
    else if (total < 450) { severity = 'low';      badgeText = 'Consommation modérée'; }
    else if (total < 650) { severity = 'medium';   badgeText = 'Consommation élevée'; }
    else                  { severity = 'high';     badgeText = 'Haute consommation'; }

    const recTexts = {
      450:  'Un PSU 450W suffira. Visez au minimum 80+ Bronze, idéalement 80+ Gold.',
      550:  'Un PSU 550W est recommandé. Optez pour un modèle 80+ Gold pour une meilleure efficacité.',
      650:  'Un PSU 650W est le choix idéal. Le 80+ Gold est fortement recommandé à ce niveau.',
      750:  'Un PSU 750W 80+ Gold est nécessaire. Évitez les marques inconnues à cette puissance.',
      850:  'Un PSU 850W 80+ Gold ou Platinum est requis pour votre configuration haute performance.',
      1000: 'Votre configuration requiert un PSU 1000W de qualité. 80+ Gold minimum, Platinum conseillé.',
      1200: 'Configuration enthousiaste — un PSU 1200W 80+ Gold ou Platinum est indispensable.',
    };

    document.getElementById('psu-badge').textContent  = badgeText;
    document.getElementById('psu-badge').className    = `btool-result-badge btool-result-badge--${severity}`;
    document.getElementById('psu-total-watt').textContent = total;
    document.getElementById('psu-cpu-watt').textContent   = cpuWatt + ' W';
    document.getElementById('psu-gpu-watt').textContent   = gpuWatt + ' W';
    document.getElementById('psu-rest-watt').textContent  = restWatt + ' W';
    document.getElementById('psu-rec-value').textContent  = recSize + ' W';
    document.getElementById('psu-rec-text').textContent   = recTexts[recSize];

    result.classList.add('visible');
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

// ===== TOOL 3: FPS ESTIMATOR =====
(function () {
  buildSelectWithSearch('fps-cpu-select', CPUS, 'Rechercher un processeur…');
  buildSelectWithSearch('fps-gpu-select', GPUS, 'Rechercher une carte graphique…');

  let fpsRes  = '1080';
  let fpsQual = 'medium';

  const cpuSel  = document.getElementById('fps-cpu-select');
  const gpuSel  = document.getElementById('fps-gpu-select');
  const gameSel = document.getElementById('fps-game-select');
  const errBox  = document.getElementById('fps-error');
  const result  = document.getElementById('fps-result');

  pillGroup('fps-res-pills',  v => { fpsRes  = v; });
  pillGroup('fps-qual-pills', v => { fpsQual = v; });

  [cpuSel, gpuSel, gameSel].forEach(el => el.addEventListener('change', () => el.classList.remove('invalid')));

  document.getElementById('fps-calc-btn').addEventListener('click', () => {
    const cpu  = CPUS.find(c => c.id === cpuSel.value);
    const gpu  = GPUS.find(g => g.id === gpuSel.value);
    const game = GAMES[gameSel.value];

    [cpuSel, gpuSel, gameSel].forEach(el => el.classList.remove('invalid'));
    errBox.style.display = 'none';

    if (!cpu || !gpu || !game) {
      if (!cpu)  cpuSel.classList.add('invalid');
      if (!gpu)  gpuSel.classList.add('invalid');
      if (!game) gameSel.classList.add('invalid');
      errBox.style.display = 'flex';
      return;
    }

    const gpuScore = gpu.gaming[fpsRes];
    const cpuScore = cpu.gaming;
    const qf       = QUAL_FACTORS[fpsQual];
    const w        = game.cpuWeight;

    const gpuFps = (gpuScore / 100) * game.baseFps * qf;
    const cpuFps = (cpuScore / 100) * game.baseFps * qf;
    const fps    = Math.round(gpuFps * (1 - w) + Math.min(gpuFps, cpuFps) * w);

    let severity, badgeText, text, tip;
    if (fps < 30) {
      severity = 'high'; badgeText = 'Insuffisant';
      text = `${fps} FPS est insuffisant pour jouer confortablement à ${game.name}. L'expérience sera très saccadée.`;
      tip  = cpuFps < gpuFps ? `Votre CPU (${cpu.name}) limite les performances dans ce jeu. Un upgrade CPU améliorerait significativement la situation.`
                              : `Votre GPU (${gpu.name}) est le facteur limitant. Un upgrade GPU s'impose pour ce jeu.`;
    } else if (fps < 60) {
      severity = 'medium'; badgeText = 'Jouable';
      text = `${fps} FPS est jouable à ${game.name}, mais l'expérience ne sera pas optimale, surtout en action intense.`;
      tip  = 'Baisser la résolution ou la qualité graphique permettrait d\'atteindre 60 FPS stables.';
    } else if (fps < 100) {
      severity = 'low'; badgeText = 'Bon';
      text = `${fps} FPS offre une expérience fluide à ${game.name}. Confortable pour la plupart des joueurs.`;
      tip  = fps < 75 ? 'Vous pouvez améliorer légèrement la fluidité en ajustant quelques paramètres graphiques.' : '';
    } else if (fps < 144) {
      severity = 'balanced'; badgeText = 'Très bon';
      text = `${fps} FPS est excellent à ${game.name}. Vous profiterez pleinement d'un écran 144 Hz.`;
      tip  = '';
    } else {
      severity = 'excellent'; badgeText = 'Excellent';
      text = `${fps} FPS est exceptionnel à ${game.name}. Votre configuration est plus que suffisante — profitez d'un écran 144 Hz ou 240 Hz !`;
      tip  = '';
    }

    document.getElementById('fps-value').textContent = fps;
    document.getElementById('fps-badge').textContent = badgeText;
    document.getElementById('fps-badge').className   = `btool-result-badge btool-result-badge--${severity}`;
    document.getElementById('fps-text').textContent  = text;
    document.getElementById('fps-tip').textContent   = tip;

    const milestonesEl = document.getElementById('fps-milestones');
    milestonesEl.innerHTML = '';
    [30, 60, 120, 144, 240].forEach(m => {
      const ok   = fps >= m;
      const chip = document.createElement('span');
      chip.className   = 'fps-milestone fps-milestone--' + (ok ? 'ok' : 'no');
      chip.textContent = (ok ? '✓ ' : '✗ ') + m + ' FPS';
      milestonesEl.appendChild(chip);
    });

    result.classList.add('visible');
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
