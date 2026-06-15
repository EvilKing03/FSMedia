// ===== DATA =====
const CPUS = [
  // Intel — 8e génération (Coffee Lake)
  { id: 'i3-8100',     brand: 'Intel', name: 'Core i3-8100',      gaming: 50,  productivity: 48  },
  { id: 'i5-8400',     brand: 'Intel', name: 'Core i5-8400',      gaming: 65,  productivity: 68  },
  { id: 'i5-8600k',    brand: 'Intel', name: 'Core i5-8600K',     gaming: 72,  productivity: 75  },
  { id: 'i7-8700',     brand: 'Intel', name: 'Core i7-8700',      gaming: 82,  productivity: 115 },
  { id: 'i7-8700k',    brand: 'Intel', name: 'Core i7-8700K',     gaming: 85,  productivity: 120 },
  // Intel — 9e génération (Coffee Lake Refresh)
  { id: 'i3-9100',     brand: 'Intel', name: 'Core i3-9100',      gaming: 52,  productivity: 50  },
  { id: 'i3-9100f',    brand: 'Intel', name: 'Core i3-9100F',     gaming: 52,  productivity: 50  },
  { id: 'i5-9400',     brand: 'Intel', name: 'Core i5-9400',      gaming: 68,  productivity: 70  },
  { id: 'i5-9400f',    brand: 'Intel', name: 'Core i5-9400F',     gaming: 68,  productivity: 70  },
  { id: 'i5-9600k',    brand: 'Intel', name: 'Core i5-9600K',     gaming: 75,  productivity: 78  },
  { id: 'i5-9600kf',   brand: 'Intel', name: 'Core i5-9600KF',    gaming: 75,  productivity: 78  },
  { id: 'i7-9700',     brand: 'Intel', name: 'Core i7-9700',      gaming: 88,  productivity: 118 },
  { id: 'i7-9700f',    brand: 'Intel', name: 'Core i7-9700F',     gaming: 88,  productivity: 118 },
  { id: 'i7-9700k',    brand: 'Intel', name: 'Core i7-9700K',     gaming: 90,  productivity: 122 },
  { id: 'i7-9700kf',   brand: 'Intel', name: 'Core i7-9700KF',    gaming: 90,  productivity: 122 },
  { id: 'i9-9900k',    brand: 'Intel', name: 'Core i9-9900K',     gaming: 102, productivity: 148 },
  { id: 'i9-9900kf',   brand: 'Intel', name: 'Core i9-9900KF',    gaming: 102, productivity: 148 },
  { id: 'i9-9900ks',   brand: 'Intel', name: 'Core i9-9900KS',    gaming: 105, productivity: 152 },
  // Intel — 10e génération (Comet Lake)
  { id: 'i3-10100',    brand: 'Intel', name: 'Core i3-10100',     gaming: 62,  productivity: 60  },
  { id: 'i3-10100f',   brand: 'Intel', name: 'Core i3-10100F',    gaming: 62,  productivity: 60  },
  { id: 'i5-10400',    brand: 'Intel', name: 'Core i5-10400',     gaming: 78,  productivity: 82  },
  { id: 'i5-10400f',   brand: 'Intel', name: 'Core i5-10400F',    gaming: 78,  productivity: 82  },
  { id: 'i5-10500',    brand: 'Intel', name: 'Core i5-10500',     gaming: 80,  productivity: 85  },
  { id: 'i5-10600',    brand: 'Intel', name: 'Core i5-10600',     gaming: 85,  productivity: 88  },
  { id: 'i5-10600k',   brand: 'Intel', name: 'Core i5-10600K',    gaming: 88,  productivity: 90  },
  { id: 'i5-10600kf',  brand: 'Intel', name: 'Core i5-10600KF',   gaming: 88,  productivity: 90  },
  { id: 'i7-10700',    brand: 'Intel', name: 'Core i7-10700',     gaming: 95,  productivity: 132 },
  { id: 'i7-10700f',   brand: 'Intel', name: 'Core i7-10700F',    gaming: 95,  productivity: 132 },
  { id: 'i7-10700k',   brand: 'Intel', name: 'Core i7-10700K',    gaming: 98,  productivity: 138 },
  { id: 'i7-10700kf',  brand: 'Intel', name: 'Core i7-10700KF',   gaming: 98,  productivity: 138 },
  { id: 'i9-10850k',   brand: 'Intel', name: 'Core i9-10850K',    gaming: 106, productivity: 162 },
  { id: 'i9-10900k',   brand: 'Intel', name: 'Core i9-10900K',    gaming: 108, productivity: 165 },
  // Intel — 11e génération (Rocket Lake)
  { id: 'i5-11400',    brand: 'Intel', name: 'Core i5-11400',     gaming: 85,  productivity: 88  },
  { id: 'i5-11400f',   brand: 'Intel', name: 'Core i5-11400F',    gaming: 85,  productivity: 88  },
  { id: 'i5-11500',    brand: 'Intel', name: 'Core i5-11500',     gaming: 87,  productivity: 90  },
  { id: 'i5-11600k',   brand: 'Intel', name: 'Core i5-11600K',    gaming: 92,  productivity: 98  },
  { id: 'i5-11600kf',  brand: 'Intel', name: 'Core i5-11600KF',   gaming: 92,  productivity: 98  },
  { id: 'i7-11700',    brand: 'Intel', name: 'Core i7-11700',     gaming: 98,  productivity: 145 },
  { id: 'i7-11700f',   brand: 'Intel', name: 'Core i7-11700F',    gaming: 98,  productivity: 145 },
  { id: 'i7-11700k',   brand: 'Intel', name: 'Core i7-11700K',    gaming: 102, productivity: 152 },
  { id: 'i7-11700kf',  brand: 'Intel', name: 'Core i7-11700KF',   gaming: 102, productivity: 152 },
  { id: 'i9-11900k',   brand: 'Intel', name: 'Core i9-11900K',    gaming: 108, productivity: 168 },
  { id: 'i9-11900kf',  brand: 'Intel', name: 'Core i9-11900KF',   gaming: 108, productivity: 168 },
  { id: 'i9-11900ks',  brand: 'Intel', name: 'Core i9-11900KS',   gaming: 110, productivity: 170 },
  // Intel — 12e génération (Alder Lake)
  { id: 'i3-12100',    brand: 'Intel', name: 'Core i3-12100',     gaming: 75,  productivity: 72  },
  { id: 'i3-12100f',   brand: 'Intel', name: 'Core i3-12100F',    gaming: 75,  productivity: 72  },
  { id: 'i5-12400',    brand: 'Intel', name: 'Core i5-12400',     gaming: 94,  productivity: 100 },
  { id: 'i5-12400f',   brand: 'Intel', name: 'Core i5-12400F',    gaming: 94,  productivity: 100 },
  { id: 'i5-12500',    brand: 'Intel', name: 'Core i5-12500',     gaming: 98,  productivity: 105 },
  { id: 'i5-12600k',   brand: 'Intel', name: 'Core i5-12600K',    gaming: 105, productivity: 112 },
  { id: 'i5-12600kf',  brand: 'Intel', name: 'Core i5-12600KF',   gaming: 105, productivity: 112 },
  { id: 'i7-12700',    brand: 'Intel', name: 'Core i7-12700',     gaming: 126, productivity: 170 },
  { id: 'i7-12700f',   brand: 'Intel', name: 'Core i7-12700F',    gaming: 126, productivity: 170 },
  { id: 'i7-12700k',   brand: 'Intel', name: 'Core i7-12700K',    gaming: 128, productivity: 175 },
  { id: 'i7-12700kf',  brand: 'Intel', name: 'Core i7-12700KF',   gaming: 128, productivity: 175 },
  { id: 'i9-12900k',   brand: 'Intel', name: 'Core i9-12900K',    gaming: 138, productivity: 225 },
  { id: 'i9-12900kf',  brand: 'Intel', name: 'Core i9-12900KF',   gaming: 138, productivity: 225 },
  { id: 'i9-12900ks',  brand: 'Intel', name: 'Core i9-12900KS',   gaming: 142, productivity: 230 },
  // Intel — 13e génération (Raptor Lake)
  { id: 'i3-13100',    brand: 'Intel', name: 'Core i3-13100',     gaming: 78,  productivity: 75  },
  { id: 'i3-13100f',   brand: 'Intel', name: 'Core i3-13100F',    gaming: 78,  productivity: 75  },
  { id: 'i5-13400',    brand: 'Intel', name: 'Core i5-13400',     gaming: 100, productivity: 110 },
  { id: 'i5-13400f',   brand: 'Intel', name: 'Core i5-13400F',    gaming: 100, productivity: 110 },
  { id: 'i5-13500',    brand: 'Intel', name: 'Core i5-13500',     gaming: 110, productivity: 122 },
  { id: 'i5-13600',    brand: 'Intel', name: 'Core i5-13600',     gaming: 112, productivity: 125 },
  { id: 'i5-13600k',   brand: 'Intel', name: 'Core i5-13600K',    gaming: 118, productivity: 130 },
  { id: 'i5-13600kf',  brand: 'Intel', name: 'Core i5-13600KF',   gaming: 118, productivity: 130 },
  { id: 'i7-13700',    brand: 'Intel', name: 'Core i7-13700',     gaming: 132, productivity: 188 },
  { id: 'i7-13700f',   brand: 'Intel', name: 'Core i7-13700F',    gaming: 132, productivity: 188 },
  { id: 'i7-13700k',   brand: 'Intel', name: 'Core i7-13700K',    gaming: 135, productivity: 192 },
  { id: 'i7-13700kf',  brand: 'Intel', name: 'Core i7-13700KF',   gaming: 135, productivity: 192 },
  { id: 'i9-13900k',   brand: 'Intel', name: 'Core i9-13900K',    gaming: 153, productivity: 248 },
  { id: 'i9-13900kf',  brand: 'Intel', name: 'Core i9-13900KF',   gaming: 153, productivity: 248 },
  { id: 'i9-13900ks',  brand: 'Intel', name: 'Core i9-13900KS',   gaming: 158, productivity: 255 },
  // Intel — 14e génération (Raptor Lake Refresh)
  { id: 'i5-14400',    brand: 'Intel', name: 'Core i5-14400',     gaming: 103, productivity: 115 },
  { id: 'i5-14400f',   brand: 'Intel', name: 'Core i5-14400F',    gaming: 103, productivity: 115 },
  { id: 'i5-14500',    brand: 'Intel', name: 'Core i5-14500',     gaming: 112, productivity: 125 },
  { id: 'i5-14600',    brand: 'Intel', name: 'Core i5-14600',     gaming: 118, productivity: 132 },
  { id: 'i5-14600k',   brand: 'Intel', name: 'Core i5-14600K',    gaming: 122, productivity: 138 },
  { id: 'i5-14600kf',  brand: 'Intel', name: 'Core i5-14600KF',   gaming: 122, productivity: 138 },
  { id: 'i7-14700',    brand: 'Intel', name: 'Core i7-14700',     gaming: 138, productivity: 198 },
  { id: 'i7-14700f',   brand: 'Intel', name: 'Core i7-14700F',    gaming: 138, productivity: 198 },
  { id: 'i7-14700k',   brand: 'Intel', name: 'Core i7-14700K',    gaming: 140, productivity: 200 },
  { id: 'i7-14700kf',  brand: 'Intel', name: 'Core i7-14700KF',   gaming: 140, productivity: 200 },
  { id: 'i9-14900k',   brand: 'Intel', name: 'Core i9-14900K',    gaming: 158, productivity: 258 },
  { id: 'i9-14900kf',  brand: 'Intel', name: 'Core i9-14900KF',   gaming: 158, productivity: 258 },
  { id: 'i3-14100',    brand: 'Intel', name: 'Core i3-14100',     gaming: 78,  productivity: 75  },
  { id: 'i3-14100f',   brand: 'Intel', name: 'Core i3-14100F',    gaming: 78,  productivity: 75  },
  { id: 'i9-14900ks',  brand: 'Intel', name: 'Core i9-14900KS',   gaming: 162, productivity: 265 },
  // Intel — Core Ultra (Arrow Lake)
  { id: 'cu5-245k',    brand: 'Intel', name: 'Core Ultra 5 245K', gaming: 128, productivity: 145 },
  { id: 'cu7-265k',    brand: 'Intel', name: 'Core Ultra 7 265K', gaming: 148, productivity: 210 },
  { id: 'cu9-285k',    brand: 'Intel', name: 'Core Ultra 9 285K', gaming: 162, productivity: 265 },
  // AMD — Ryzen 3
  { id: 'r3-1200',    brand: 'AMD',   name: 'Ryzen 3 1200',     gaming: 40,  productivity: 38  },
  { id: 'r3-1300x',   brand: 'AMD',   name: 'Ryzen 3 1300X',    gaming: 44,  productivity: 42  },
  { id: 'r3-2200g',   brand: 'AMD',   name: 'Ryzen 3 2200G',    gaming: 45,  productivity: 42  },
  { id: 'r3-3100',    brand: 'AMD',   name: 'Ryzen 3 3100',     gaming: 52,  productivity: 50  },
  { id: 'r3-3300x',   brand: 'AMD',   name: 'Ryzen 3 3300X',    gaming: 58,  productivity: 55  },
  { id: 'r3-4100',    brand: 'AMD',   name: 'Ryzen 3 4100',     gaming: 55,  productivity: 52  },
  { id: 'r3-4300g',   brand: 'AMD',   name: 'Ryzen 3 4300G',    gaming: 60,  productivity: 58  },
  { id: 'r3-5300g',   brand: 'AMD',   name: 'Ryzen 3 5300G',    gaming: 65,  productivity: 62  },
  // AMD — Ryzen 5
  { id: 'r5-1600',    brand: 'AMD',   name: 'Ryzen 5 1600',     gaming: 55,  productivity: 58  },
  { id: 'r5-1600x',   brand: 'AMD',   name: 'Ryzen 5 1600X',    gaming: 58,  productivity: 62  },
  { id: 'r5-2600',    brand: 'AMD',   name: 'Ryzen 5 2600',     gaming: 62,  productivity: 68  },
  { id: 'r5-2600x',   brand: 'AMD',   name: 'Ryzen 5 2600X',    gaming: 65,  productivity: 72  },
  { id: 'r5-3400g',   brand: 'AMD',   name: 'Ryzen 5 3400G',    gaming: 68,  productivity: 65  },
  { id: 'r5-3600',    brand: 'AMD',   name: 'Ryzen 5 3600',     gaming: 80,  productivity: 85  },
  { id: 'r5-3600x',   brand: 'AMD',   name: 'Ryzen 5 3600X',    gaming: 83,  productivity: 88  },
  { id: 'r5-3600xt',  brand: 'AMD',   name: 'Ryzen 5 3600XT',   gaming: 84,  productivity: 89  },
  { id: 'r5-4500',    brand: 'AMD',   name: 'Ryzen 5 4500',     gaming: 82,  productivity: 85  },
  { id: 'r5-4600g',   brand: 'AMD',   name: 'Ryzen 5 4600G',    gaming: 85,  productivity: 90  },
  { id: 'r5-5500',    brand: 'AMD',   name: 'Ryzen 5 5500',     gaming: 78,  productivity: 80  },
  { id: 'r5-5500gt',  brand: 'AMD',   name: 'Ryzen 5 5500GT',   gaming: 80,  productivity: 82  },
  { id: 'r5-5600g',   brand: 'AMD',   name: 'Ryzen 5 5600G',    gaming: 95,  productivity: 98  },
  { id: 'r5-5600gt',  brand: 'AMD',   name: 'Ryzen 5 5600GT',   gaming: 96,  productivity: 99  },
  { id: 'r5-5600',    brand: 'AMD',   name: 'Ryzen 5 5600',     gaming: 97,  productivity: 98  },
  { id: 'r5-5600x',   brand: 'AMD',   name: 'Ryzen 5 5600X',    gaming: 103, productivity: 108 },
  { id: 'r5-7500f',   brand: 'AMD',   name: 'Ryzen 5 7500F',    gaming: 115, productivity: 118 },
  { id: 'r5-7600',    brand: 'AMD',   name: 'Ryzen 5 7600',     gaming: 118, productivity: 122 },
  { id: 'r5-7600x',   brand: 'AMD',   name: 'Ryzen 5 7600X',    gaming: 122, productivity: 128 },
  { id: 'r5-8400f',   brand: 'AMD',   name: 'Ryzen 5 8400F',    gaming: 112, productivity: 115 },
  { id: 'r5-8500g',   brand: 'AMD',   name: 'Ryzen 5 8500G',    gaming: 108, productivity: 112 },
  { id: 'r5-8600g',   brand: 'AMD',   name: 'Ryzen 5 8600G',    gaming: 118, productivity: 122 },
  { id: 'r5-9600',    brand: 'AMD',   name: 'Ryzen 5 9600',     gaming: 128, productivity: 132 },
  { id: 'r5-9600x',   brand: 'AMD',   name: 'Ryzen 5 9600X',    gaming: 132, productivity: 138 },
  // AMD — Ryzen 7
  { id: 'r7-1700',    brand: 'AMD',   name: 'Ryzen 7 1700',     gaming: 58,  productivity: 85  },
  { id: 'r7-1700x',   brand: 'AMD',   name: 'Ryzen 7 1700X',    gaming: 62,  productivity: 92  },
  { id: 'r7-1800x',   brand: 'AMD',   name: 'Ryzen 7 1800X',    gaming: 65,  productivity: 98  },
  { id: 'r7-2700',    brand: 'AMD',   name: 'Ryzen 7 2700',     gaming: 65,  productivity: 102 },
  { id: 'r7-2700x',   brand: 'AMD',   name: 'Ryzen 7 2700X',    gaming: 68,  productivity: 108 },
  { id: 'r7-3700x',   brand: 'AMD',   name: 'Ryzen 7 3700X',    gaming: 88,  productivity: 138 },
  { id: 'r7-3800x',   brand: 'AMD',   name: 'Ryzen 7 3800X',    gaming: 90,  productivity: 142 },
  { id: 'r7-3800xt',  brand: 'AMD',   name: 'Ryzen 7 3800XT',   gaming: 92,  productivity: 145 },
  { id: 'r7-4700g',   brand: 'AMD',   name: 'Ryzen 7 4700G',    gaming: 100, productivity: 140 },
  { id: 'r7-4800h',   brand: 'AMD',   name: 'Ryzen 7 4800H',    gaming: 90,  productivity: 145 },
  { id: 'r7-5800h',   brand: 'AMD',   name: 'Ryzen 7 5800H',    gaming: 95,  productivity: 150 },
  { id: 'r7-6800h',   brand: 'AMD',   name: 'Ryzen 7 6800H',    gaming: 100, productivity: 158 },
  { id: 'r7-7745hx',  brand: 'AMD',   name: 'Ryzen 7 7745HX',   gaming: 132, productivity: 205 },
  { id: 'r9-6900hs',  brand: 'AMD',   name: 'Ryzen 9 6900HS',   gaming: 112, productivity: 155 },
  { id: 'r9-6900hx',  brand: 'AMD',   name: 'Ryzen 9 6900HX',   gaming: 118, productivity: 162 },
  { id: 'r7-5700',    brand: 'AMD',   name: 'Ryzen 7 5700',     gaming: 106, productivity: 146 },
  { id: 'r7-5700g',   brand: 'AMD',   name: 'Ryzen 7 5700G',    gaming: 105, productivity: 145 },
  { id: 'r7-5700x',   brand: 'AMD',   name: 'Ryzen 7 5700X',    gaming: 108, productivity: 148 },
  { id: 'r7-5700x3d', brand: 'AMD',   name: 'Ryzen 7 5700X3D',  gaming: 145, productivity: 140 },
  { id: 'r7-5800',    brand: 'AMD',   name: 'Ryzen 7 5800',     gaming: 110, productivity: 152 },
  { id: 'r7-5800x',   brand: 'AMD',   name: 'Ryzen 7 5800X',    gaming: 113, productivity: 158 },
  { id: 'r7-5800x3d', brand: 'AMD',   name: 'Ryzen 7 5800X3D',  gaming: 155, productivity: 152 },
  { id: 'r7-7700',    brand: 'AMD',   name: 'Ryzen 7 7700',     gaming: 128, productivity: 182 },
  { id: 'r7-7700x',   brand: 'AMD',   name: 'Ryzen 7 7700X',    gaming: 132, productivity: 188 },
  { id: 'r7-7800x3d', brand: 'AMD',   name: 'Ryzen 7 7800X3D',  gaming: 172, productivity: 168 },
  { id: 'r7-8700f',   brand: 'AMD',   name: 'Ryzen 7 8700F',    gaming: 125, productivity: 182 },
  { id: 'r7-8700g',   brand: 'AMD',   name: 'Ryzen 7 8700G',    gaming: 128, productivity: 185 },
  { id: 'r7-9700x',   brand: 'AMD',   name: 'Ryzen 7 9700X',    gaming: 148, productivity: 200 },
  { id: 'r7-9800x3d', brand: 'AMD',   name: 'Ryzen 7 9800X3D',  gaming: 185, productivity: 180 },
  // AMD — Ryzen 9
  { id: 'r9-3900x',   brand: 'AMD',   name: 'Ryzen 9 3900X',    gaming: 98,  productivity: 195 },
  { id: 'r9-3900xt',  brand: 'AMD',   name: 'Ryzen 9 3900XT',   gaming: 99,  productivity: 198 },
  { id: 'r9-3950x',   brand: 'AMD',   name: 'Ryzen 9 3950X',    gaming: 100, productivity: 225 },
  { id: 'r9-5900x',   brand: 'AMD',   name: 'Ryzen 9 5900X',    gaming: 120, productivity: 215 },
  { id: 'r9-5950x',   brand: 'AMD',   name: 'Ryzen 9 5950X',    gaming: 125, productivity: 248 },
  { id: 'r9-7900',    brand: 'AMD',   name: 'Ryzen 9 7900',     gaming: 135, productivity: 245 },
  { id: 'r9-7900x',   brand: 'AMD',   name: 'Ryzen 9 7900X',    gaming: 140, productivity: 258 },
  { id: 'r9-7900x3d', brand: 'AMD',   name: 'Ryzen 9 7900X3D',  gaming: 155, productivity: 250 },
  { id: 'r9-7950x',   brand: 'AMD',   name: 'Ryzen 9 7950X',    gaming: 158, productivity: 305 },
  { id: 'r9-7950x3d', brand: 'AMD',   name: 'Ryzen 9 7950X3D',  gaming: 178, productivity: 320 },
  { id: 'r9-7945hx',  brand: 'AMD',   name: 'Ryzen 9 7945HX',   gaming: 148, productivity: 280 },
  { id: 'r9-9900',    brand: 'AMD',   name: 'Ryzen 9 9900',     gaming: 150, productivity: 262 },
  { id: 'r9-9900x',   brand: 'AMD',   name: 'Ryzen 9 9900X',    gaming: 155, productivity: 272 },
  { id: 'r9-9950x',   brand: 'AMD',   name: 'Ryzen 9 9950X',    gaming: 165, productivity: 330 },
];

const GPUS = [
  // NVIDIA - ancienne génération
  { id: 'gtx1060',    brand: 'NVIDIA', name: 'GeForce GTX 1060 6GB',      gaming: { 1080: 55,  1440: 40,  2160: 22  }, productivity: 38  },
  { id: 'gtx1070ti',  brand: 'NVIDIA', name: 'GeForce GTX 1070 Ti',       gaming: { 1080: 70,  1440: 52,  2160: 30  }, productivity: 52  },
  { id: 'gtx1080ti',  brand: 'NVIDIA', name: 'GeForce GTX 1080 Ti',       gaming: { 1080: 105, 1440: 80,  2160: 50  }, productivity: 78  },
  { id: 'rtx2060',    brand: 'NVIDIA', name: 'GeForce RTX 2060',          gaming: { 1080: 85,  1440: 65,  2160: 38  }, productivity: 65  },
  { id: 'rtx2060s',   brand: 'NVIDIA', name: 'GeForce RTX 2060 Super',    gaming: { 1080: 95,  1440: 72,  2160: 45  }, productivity: 78  },
  { id: 'rtx2070s',   brand: 'NVIDIA', name: 'GeForce RTX 2070 Super',    gaming: { 1080: 112, 1440: 88,  2160: 55  }, productivity: 95  },
  { id: 'rtx2080ti',  brand: 'NVIDIA', name: 'GeForce RTX 2080 Ti',       gaming: { 1080: 145, 1440: 118, 2160: 78  }, productivity: 142 },
  // NVIDIA 30xx
  { id: 'rtx3060',    brand: 'NVIDIA', name: 'GeForce RTX 3060',          gaming: { 1080: 105, 1440: 78,  2160: 48  }, productivity: 98  },
  { id: 'rtx3060ti',  brand: 'NVIDIA', name: 'GeForce RTX 3060 Ti',       gaming: { 1080: 130, 1440: 100, 2160: 65  }, productivity: 115 },
  { id: 'rtx3070',    brand: 'NVIDIA', name: 'GeForce RTX 3070',          gaming: { 1080: 150, 1440: 118, 2160: 78  }, productivity: 138 },
  { id: 'rtx3070ti',  brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti',       gaming: { 1080: 163, 1440: 128, 2160: 85  }, productivity: 150 },
  { id: 'rtx3080',    brand: 'NVIDIA', name: 'GeForce RTX 3080',          gaming: { 1080: 185, 1440: 152, 2160: 112 }, productivity: 185 },
  { id: 'rtx3080ti',  brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti',       gaming: { 1080: 200, 1440: 165, 2160: 125 }, productivity: 210 },
  { id: 'rtx3090',    brand: 'NVIDIA', name: 'GeForce RTX 3090',          gaming: { 1080: 210, 1440: 178, 2160: 138 }, productivity: 245 },
  { id: 'rtx3090ti',  brand: 'NVIDIA', name: 'GeForce RTX 3090 Ti',       gaming: { 1080: 220, 1440: 188, 2160: 148 }, productivity: 258 },
  // NVIDIA 40xx
  { id: 'rtx4060',    brand: 'NVIDIA', name: 'GeForce RTX 4060',          gaming: { 1080: 118, 1440: 88,  2160: 55  }, productivity: 102 },
  { id: 'rtx4060ti',  brand: 'NVIDIA', name: 'GeForce RTX 4060 Ti',       gaming: { 1080: 150, 1440: 120, 2160: 80  }, productivity: 135 },
  { id: 'rtx4070',    brand: 'NVIDIA', name: 'GeForce RTX 4070',          gaming: { 1080: 188, 1440: 158, 2160: 118 }, productivity: 175 },
  { id: 'rtx4070s',   brand: 'NVIDIA', name: 'GeForce RTX 4070 Super',    gaming: { 1080: 208, 1440: 175, 2160: 132 }, productivity: 195 },
  { id: 'rtx4070ti',  brand: 'NVIDIA', name: 'GeForce RTX 4070 Ti',       gaming: { 1080: 228, 1440: 195, 2160: 150 }, productivity: 218 },
  { id: 'rtx4070tis', brand: 'NVIDIA', name: 'GeForce RTX 4070 Ti Super', gaming: { 1080: 245, 1440: 212, 2160: 165 }, productivity: 238 },
  { id: 'rtx4080',    brand: 'NVIDIA', name: 'GeForce RTX 4080',          gaming: { 1080: 262, 1440: 232, 2160: 185 }, productivity: 272 },
  { id: 'rtx4080s',   brand: 'NVIDIA', name: 'GeForce RTX 4080 Super',    gaming: { 1080: 272, 1440: 242, 2160: 195 }, productivity: 282 },
  { id: 'rtx4090',    brand: 'NVIDIA', name: 'GeForce RTX 4090',          gaming: { 1080: 310, 1440: 282, 2160: 240 }, productivity: 320 },
  // AMD - ancienne génération
  { id: 'rx580',      brand: 'AMD',    name: 'Radeon RX 580 8GB',         gaming: { 1080: 55,  1440: 40,  2160: 22  }, productivity: 35  },
  { id: 'rx5700xt',   brand: 'AMD',    name: 'Radeon RX 5700 XT',         gaming: { 1080: 110, 1440: 85,  2160: 52  }, productivity: 90  },
  // AMD 6xxx
  { id: 'rx6600',     brand: 'AMD',    name: 'Radeon RX 6600',            gaming: { 1080: 105, 1440: 75,  2160: 45  }, productivity: 82  },
  { id: 'rx6600xt',   brand: 'AMD',    name: 'Radeon RX 6600 XT',         gaming: { 1080: 118, 1440: 88,  2160: 55  }, productivity: 95  },
  { id: 'rx6700xt',   brand: 'AMD',    name: 'Radeon RX 6700 XT',         gaming: { 1080: 142, 1440: 112, 2160: 72  }, productivity: 120 },
  { id: 'rx6800',     brand: 'AMD',    name: 'Radeon RX 6800',            gaming: { 1080: 168, 1440: 138, 2160: 100 }, productivity: 155 },
  { id: 'rx6800xt',   brand: 'AMD',    name: 'Radeon RX 6800 XT',         gaming: { 1080: 188, 1440: 158, 2160: 118 }, productivity: 175 },
  { id: 'rx6900xt',   brand: 'AMD',    name: 'Radeon RX 6900 XT',         gaming: { 1080: 200, 1440: 170, 2160: 130 }, productivity: 190 },
  { id: 'rx6950xt',   brand: 'AMD',    name: 'Radeon RX 6950 XT',         gaming: { 1080: 218, 1440: 188, 2160: 148 }, productivity: 208 },
  // AMD 7xxx
  { id: 'rx7600',     brand: 'AMD',    name: 'Radeon RX 7600',            gaming: { 1080: 118, 1440: 88,  2160: 55  }, productivity: 95  },
  { id: 'rx7700xt',   brand: 'AMD',    name: 'Radeon RX 7700 XT',         gaming: { 1080: 150, 1440: 122, 2160: 82  }, productivity: 132 },
  { id: 'rx7800xt',   brand: 'AMD',    name: 'Radeon RX 7800 XT',         gaming: { 1080: 178, 1440: 148, 2160: 108 }, productivity: 162 },
  { id: 'rx7900gre',  brand: 'AMD',    name: 'Radeon RX 7900 GRE',        gaming: { 1080: 205, 1440: 175, 2160: 138 }, productivity: 195 },
  { id: 'rx7900xt',   brand: 'AMD',    name: 'Radeon RX 7900 XT',         gaming: { 1080: 242, 1440: 212, 2160: 170 }, productivity: 232 },
  { id: 'rx7900xtx',  brand: 'AMD',    name: 'Radeon RX 7900 XTX',        gaming: { 1080: 268, 1440: 240, 2160: 198 }, productivity: 260 },
  // AMD — RDNA 4 (RX 9000 / 2025)
  { id: 'ai-pro-r9700',  brand: 'AMD', name: 'Radeon AI PRO R9700',       gaming: { 1080: 238, 1440: 208, 2160: 169 }, productivity: 226 },
  { id: 'rx9070xt',      brand: 'AMD', name: 'Radeon RX 9070 XT',         gaming: { 1080: 206, 1440: 180, 2160: 146 }, productivity: 196 },
  { id: 'rx9070',        brand: 'AMD', name: 'Radeon RX 9070',            gaming: { 1080: 194, 1440: 170, 2160: 138 }, productivity: 184 },
  { id: 'rx9070gre',     brand: 'AMD', name: 'Radeon RX 9070 GRE',        gaming: { 1080: 175, 1440: 153, 2160: 124 }, productivity: 166 },
  { id: 'rx9060xt',      brand: 'AMD', name: 'Radeon RX 9060 XT',         gaming: { 1080: 141, 1440: 123, 2160: 100 }, productivity: 134 },
  { id: 'rx9060xt16',    brand: 'AMD', name: 'Radeon RX 9060 XT 16 GB',   gaming: { 1080: 139, 1440: 122, 2160:  99 }, productivity: 132 },
  { id: 'rx9060xt8',     brand: 'AMD', name: 'Radeon RX 9060 XT 8 GB',    gaming: { 1080: 137, 1440: 120, 2160:  97 }, productivity: 130 },
  { id: 'rx9060',        brand: 'AMD', name: 'Radeon RX 9060',            gaming: { 1080: 128, 1440: 112, 2160:  91 }, productivity: 122 },
  { id: 'rx8060s',       brand: 'AMD', name: 'Radeon RX 8060S',           gaming: { 1080: 117, 1440: 102, 2160:  83 }, productivity: 111 },
  { id: 'rx8050s',       brand: 'AMD', name: 'Radeon RX 8050S',           gaming: { 1080: 101, 1440:  88, 2160:  72 }, productivity:  96 },
  // AMD — RDNA 3.5 (iGPU / mobile 2024-2025)
  { id: 'r8060s',        brand: 'AMD', name: 'Radeon 8060S',              gaming: { 1080: 126, 1440: 110, 2160:  90 }, productivity: 120 },
  { id: 'r8050s',        brand: 'AMD', name: 'Radeon 8050S',              gaming: { 1080: 108, 1440:  95, 2160:  77 }, productivity: 103 },
  { id: 'r8040s',        brand: 'AMD', name: 'Radeon 8040S',              gaming: { 1080:  65, 1440:  57, 2160:  46 }, productivity:  62 },
  { id: 'r890m',         brand: 'AMD', name: 'Radeon 890M',               gaming: { 1080:  47, 1440:  41, 2160:  33 }, productivity:  45 },
  { id: 'r880m',         brand: 'AMD', name: 'Radeon 880M',               gaming: { 1080:  44, 1440:  38, 2160:  31 }, productivity:  42 },
  { id: 'r860m',         brand: 'AMD', name: 'Radeon 860M',               gaming: { 1080:  26, 1440:  23, 2160:  18 }, productivity:  25 },
  { id: 'r840m',         brand: 'AMD', name: 'Radeon 840M',               gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  // AMD — PRO W7000 (RDNA 3 workstation)
  { id: 'w7900',         brand: 'AMD', name: 'Radeon PRO W7900',          gaming: { 1080: 239, 1440: 209, 2160: 170 }, productivity: 227 },
  { id: 'w7800',         brand: 'AMD', name: 'Radeon PRO W7800',          gaming: { 1080: 237, 1440: 207, 2160: 168 }, productivity: 225 },
  { id: 'w7700',         brand: 'AMD', name: 'Radeon PRO W7700',          gaming: { 1080: 164, 1440: 144, 2160: 116 }, productivity: 156 },
  { id: 'w7600',         brand: 'AMD', name: 'Radeon PRO W7600',          gaming: { 1080: 108, 1440:  95, 2160:  77 }, productivity: 103 },
  { id: 'w7500',         brand: 'AMD', name: 'Radeon PRO W7500',          gaming: { 1080:  89, 1440:  78, 2160:  63 }, productivity:  85 },
  // AMD — RDNA 3 mobile / autres
  { id: 'rx7900m',       brand: 'AMD', name: 'Radeon RX 7900M',           gaming: { 1080: 159, 1440: 139, 2160: 113 }, productivity: 151 },
  { id: 'rx7650gre',     brand: 'AMD', name: 'Radeon RX 7650 GRE',        gaming: { 1080: 127, 1440: 111, 2160:  90 }, productivity: 121 },
  { id: 'rx7600xt',      brand: 'AMD', name: 'Radeon RX 7600 XT',         gaming: { 1080: 120, 1440: 105, 2160:  85 }, productivity: 114 },
  { id: 'rx7800m',       brand: 'AMD', name: 'Radeon RX 7800M',           gaming: { 1080: 110, 1440:  96, 2160:  78 }, productivity: 105 },
  { id: 'rx7700s',       brand: 'AMD', name: 'Radeon RX 7700S',           gaming: { 1080: 104, 1440:  91, 2160:  74 }, productivity:  99 },
  { id: 'rx7600s',       brand: 'AMD', name: 'Radeon RX 7600S',           gaming: { 1080: 104, 1440:  91, 2160:  74 }, productivity:  99 },
  { id: 'rx7600mxt',     brand: 'AMD', name: 'Radeon RX 7600M XT',        gaming: { 1080:  98, 1440:  86, 2160:  70 }, productivity:  93 },
  { id: 'rx7600m',       brand: 'AMD', name: 'Radeon RX 7600M',           gaming: { 1080:  68, 1440:  60, 2160:  48 }, productivity:  65 },
  { id: 'rx7400',        brand: 'AMD', name: 'Radeon RX 7400',            gaming: { 1080:  74, 1440:  65, 2160:  52 }, productivity:  70 },
  { id: 'r780m',         brand: 'AMD', name: 'Radeon 780M',               gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'r760m',         brand: 'AMD', name: 'Radeon 760M',               gaming: { 1080:  28, 1440:  25, 2160:  20 }, productivity:  27 },
  { id: 'prov710',       brand: 'AMD', name: 'Radeon PRO V710',           gaming: { 1080:  43, 1440:  37, 2160:  30 }, productivity:  41 },
  // AMD — RDNA 2 étendu
  { id: 'rx6900',        brand: 'AMD', name: 'Radeon RX 6900',            gaming: { 1080: 204, 1440: 179, 2160: 145 }, productivity: 194 },
  { id: 'rx6750xt',      brand: 'AMD', name: 'Radeon RX 6750 XT',         gaming: { 1080: 144, 1440: 126, 2160: 102 }, productivity: 137 },
  { id: 'rx6750gre12',   brand: 'AMD', name: 'Radeon RX 6750 GRE 12 GB',  gaming: { 1080: 140, 1440: 122, 2160:  99 }, productivity: 133 },
  { id: 'w6800pro',      brand: 'AMD', name: 'Radeon Pro W6800',          gaming: { 1080: 140, 1440: 122, 2160:  99 }, productivity: 133 },
  { id: 'rx6750gre',     brand: 'AMD', name: 'Radeon RX 6750 GRE',        gaming: { 1080: 132, 1440: 115, 2160:  94 }, productivity: 125 },
  { id: 'rx6750gre10',   brand: 'AMD', name: 'Radeon RX 6750 GRE 10 GB',  gaming: { 1080: 132, 1440: 115, 2160:  94 }, productivity: 125 },
  { id: 'rx6700',        brand: 'AMD', name: 'Radeon RX 6700',            gaming: { 1080: 131, 1440: 115, 2160:  93 }, productivity: 124 },
  { id: 'w6900x',        brand: 'AMD', name: 'Radeon Pro W6900X',         gaming: { 1080: 121, 1440: 106, 2160:  86 }, productivity: 115 },
  { id: 'rx6850mxt',     brand: 'AMD', name: 'Radeon RX 6850M XT',        gaming: { 1080: 119, 1440: 104, 2160:  85 }, productivity: 113 },
  { id: 'rx6650xt',      brand: 'AMD', name: 'Radeon RX 6650 XT',         gaming: { 1080: 119, 1440: 104, 2160:  85 }, productivity: 113 },
  { id: 'rx6650mxt',     brand: 'AMD', name: 'Radeon RX 6650M XT',        gaming: { 1080: 118, 1440: 103, 2160:  84 }, productivity: 112 },
  { id: 'w6800x',        brand: 'AMD', name: 'Radeon Pro W6800X',         gaming: { 1080: 111, 1440:  97, 2160:  79 }, productivity: 105 },
  { id: 'rx6800s',       brand: 'AMD', name: 'Radeon RX 6800S',           gaming: { 1080: 106, 1440:  93, 2160:  75 }, productivity: 101 },
  { id: 'prov620',       brand: 'AMD', name: 'Radeon Pro V620',           gaming: { 1080: 105, 1440:  92, 2160:  74 }, productivity: 100 },
  { id: 'rx6650m',       brand: 'AMD', name: 'Radeon RX 6650M',           gaming: { 1080: 102, 1440:  89, 2160:  72 }, productivity:  97 },
  { id: 'w5700x',        brand: 'AMD', name: 'Radeon Pro W5700X',         gaming: { 1080: 102, 1440:  89, 2160:  72 }, productivity:  97 },
  { id: 'rx6700s',       brand: 'AMD', name: 'Radeon RX 6700S',           gaming: { 1080: 101, 1440:  88, 2160:  72 }, productivity:  96 },
  { id: 'w6600pro',      brand: 'AMD', name: 'Radeon Pro W6600',          gaming: { 1080: 100, 1440:  88, 2160:  71 }, productivity:  95 },
  { id: 'w6800xduo',     brand: 'AMD', name: 'Radeon Pro W6800X Duo',     gaming: { 1080:  99, 1440:  86, 2160:  70 }, productivity:  94 },
  { id: 'rx6600le',      brand: 'AMD', name: 'Radeon RX 6600 LE',         gaming: { 1080:  94, 1440:  82, 2160:  67 }, productivity:  89 },
  { id: 'rx6600m',       brand: 'AMD', name: 'Radeon RX 6600M',           gaming: { 1080:  93, 1440:  81, 2160:  66 }, productivity:  88 },
  { id: 'rx6700m',       brand: 'AMD', name: 'Radeon RX 6700M',           gaming: { 1080:  91, 1440:  80, 2160:  65 }, productivity:  86 },
  { id: 'w6600x',        brand: 'AMD', name: 'Radeon Pro W6600X',         gaming: { 1080:  88, 1440:  77, 2160:  62 }, productivity:  84 },
  { id: 'rx6600s',       brand: 'AMD', name: 'Radeon RX 6600S',           gaming: { 1080:  87, 1440:  76, 2160:  62 }, productivity:  83 },
  { id: 'w6600m',        brand: 'AMD', name: 'Radeon Pro W6600M',         gaming: { 1080:  71, 1440:  62, 2160:  50 }, productivity:  67 },
  { id: 'rx6550m',       brand: 'AMD', name: 'Radeon RX 6550M',           gaming: { 1080:  60, 1440:  52, 2160:  43 }, productivity:  57 },
  { id: 'rx6500xt',      brand: 'AMD', name: 'Radeon RX 6500 XT',         gaming: { 1080:  60, 1440:  52, 2160:  43 }, productivity:  57 },
  { id: 'rx6500m',       brand: 'AMD', name: 'Radeon RX 6500M',           gaming: { 1080:  42, 1440:  37, 2160:  30 }, productivity:  40 },
  { id: 'rx6400',        brand: 'AMD', name: 'Radeon RX 6400',            gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'rx6500',        brand: 'AMD', name: 'Radeon RX 6500',            gaming: { 1080:  44, 1440:  38, 2160:  31 }, productivity:  42 },
  { id: 'rx6450m',       brand: 'AMD', name: 'Radeon RX 6450M',           gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'rx6300m',       brand: 'AMD', name: 'Radeon RX 6300M',           gaming: { 1080:  37, 1440:  32, 2160:  26 }, productivity:  35 },
  { id: 'w6400',         brand: 'AMD', name: 'Radeon Pro W6400',          gaming: { 1080:  52, 1440:  46, 2160:  37 }, productivity:  49 },
  { id: 'w6300',         brand: 'AMD', name: 'Radeon PRO W6300',          gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  { id: 'r680m',         brand: 'AMD', name: 'Radeon 680M',               gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  // AMD — RDNA 1 étendu
  { id: 'rx5700xt50',    brand: 'AMD', name: 'Radeon RX 5700 XT 50th',    gaming: { 1080: 111, 1440:  97, 2160:  79 }, productivity: 105 },
  { id: 'rx5700',        brand: 'AMD', name: 'Radeon RX 5700',            gaming: { 1080:  95, 1440:  83, 2160:  67 }, productivity:  90 },
  { id: 'w5700',         brand: 'AMD', name: 'Radeon Pro W5700',          gaming: { 1080:  95, 1440:  83, 2160:  67 }, productivity:  90 },
  { id: 'rx5600xt',      brand: 'AMD', name: 'Radeon RX 5600 XT',         gaming: { 1080:  90, 1440:  79, 2160:  64 }, productivity:  85 },
  { id: 'rx5600oem',     brand: 'AMD', name: 'Radeon RX 5600 OEM',        gaming: { 1080:  77, 1440:  67, 2160:  55 }, productivity:  73 },
  { id: 'pro5700xt',     brand: 'AMD', name: 'Radeon Pro 5700 XT',        gaming: { 1080:  77, 1440:  67, 2160:  55 }, productivity:  73 },
  { id: 'prov520',       brand: 'AMD', name: 'Radeon Pro V520',           gaming: { 1080:  76, 1440:  67, 2160:  54 }, productivity:  72 },
  { id: 'pro5700',       brand: 'AMD', name: 'Radeon Pro 5700',           gaming: { 1080:  71, 1440:  62, 2160:  50 }, productivity:  67 },
  { id: 'pro5600m',      brand: 'AMD', name: 'Radeon Pro 5600M',          gaming: { 1080:  58, 1440:  51, 2160:  41 }, productivity:  55 },
  { id: 'w5500',         brand: 'AMD', name: 'Radeon Pro W5500',          gaming: { 1080:  56, 1440:  49, 2160:  40 }, productivity:  53 },
  { id: 'rx5500xt',      brand: 'AMD', name: 'Radeon RX 5500 XT',         gaming: { 1080:  56, 1440:  49, 2160:  40 }, productivity:  53 },
  { id: 'rx5600m',       brand: 'AMD', name: 'Radeon RX 5600M',           gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'rx5500',        brand: 'AMD', name: 'Radeon RX 5500',            gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'pro5500xt',     brand: 'AMD', name: 'Radeon Pro 5500 XT',        gaming: { 1080:  45, 1440:  39, 2160:  32 }, productivity:  43 },
  { id: 'rx5300',        brand: 'AMD', name: 'Radeon RX 5300',            gaming: { 1080:  44, 1440:  38, 2160:  31 }, productivity:  42 },
  { id: 'w5500x',        brand: 'AMD', name: 'Radeon Pro W5500X',         gaming: { 1080:  42, 1440:  37, 2160:  30 }, productivity:  40 },
  { id: 'pro5500m',      brand: 'AMD', name: 'Radeon Pro 5500M',          gaming: { 1080:  39, 1440:  34, 2160:  27 }, productivity:  37 },
  { id: 'pro5300',       brand: 'AMD', name: 'Radeon Pro 5300',           gaming: { 1080:  41, 1440:  36, 2160:  29 }, productivity:  39 },
  { id: 'pro5300m',      brand: 'AMD', name: 'Radeon Pro 5300M',          gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'rx5500m',       brand: 'AMD', name: 'Radeon RX 5500M',           gaming: { 1080:  32, 1440:  28, 2160:  22 }, productivity:  30 },
  { id: 'rx5300m',       brand: 'AMD', name: 'Radeon RX 5300M',           gaming: { 1080:  27, 1440:  24, 2160:  19 }, productivity:  26 },
  // AMD — GCN 5 / Vega
  { id: 'r7',            brand: 'AMD', name: 'Radeon VII',                gaming: { 1080: 109, 1440:  95, 2160:  77 }, productivity: 104 },
  { id: 'vegafe',        brand: 'AMD', name: 'Radeon Vega Frontier',      gaming: { 1080:  85, 1440:  74, 2160:  60 }, productivity:  81 },
  { id: 'vega64',        brand: 'AMD', name: 'Radeon RX Vega 64',         gaming: { 1080:  93, 1440:  81, 2160:  66 }, productivity:  88 },
  { id: 'vega56',        brand: 'AMD', name: 'Radeon RX Vega 56',         gaming: { 1080:  87, 1440:  76, 2160:  62 }, productivity:  83 },
  { id: 'prowx8200',     brand: 'AMD', name: 'Radeon Pro WX 8200',        gaming: { 1080:  84, 1440:  74, 2160:  60 }, productivity:  80 },
  { id: 'provega2',      brand: 'AMD', name: 'Radeon Pro Vega II',        gaming: { 1080: 104, 1440:  91, 2160:  74 }, productivity:  99 },
  { id: 'provega2duo',   brand: 'AMD', name: 'Radeon Pro Vega II Duo',    gaming: { 1080:  92, 1440:  80, 2160:  65 }, productivity:  87 },
  { id: 'pro7vii',       brand: 'AMD', name: 'Radeon Pro VII',            gaming: { 1080:  90, 1440:  79, 2160:  64 }, productivity:  85 },
  { id: 'provega64x',    brand: 'AMD', name: 'Radeon Pro Vega 64X',       gaming: { 1080:  89, 1440:  78, 2160:  64 }, productivity:  85 },
  { id: 'provega64',     brand: 'AMD', name: 'Radeon Pro Vega 64',        gaming: { 1080:  86, 1440:  75, 2160:  61 }, productivity:  82 },
  { id: 'prowx9100',     brand: 'AMD', name: 'Radeon PRO WX 9100',        gaming: { 1080:  74, 1440:  65, 2160:  53 }, productivity:  70 },
  { id: 'mi60',          brand: 'AMD', name: 'Radeon Instinct MI60',      gaming: { 1080:  72, 1440:  63, 2160:  51 }, productivity:  68 },
  { id: 'provega56',     brand: 'AMD', name: 'Radeon Pro Vega 56',        gaming: { 1080:  75, 1440:  66, 2160:  53 }, productivity:  71 },
  { id: 'provega48',     brand: 'AMD', name: 'Radeon Pro Vega 48',        gaming: { 1080:  70, 1440:  61, 2160:  50 }, productivity:  67 },
  { id: 'mi25',          brand: 'AMD', name: 'Radeon Instinct MI25',      gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'provega20',     brand: 'AMD', name: 'Radeon Pro Vega 20',        gaming: { 1080:  27, 1440:  24, 2160:  19 }, productivity:  26 },
  { id: 'provega16',     brand: 'AMD', name: 'Radeon Pro Vega 16',        gaming: { 1080:  25, 1440:  22, 2160:  18 }, productivity:  24 },
  { id: 'prowxvegagl',   brand: 'AMD', name: 'Radeon Pro WX Vega M GL',   gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'vegamgh',       brand: 'AMD', name: 'Radeon RX Vega M GH',       gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'vegam',         brand: 'AMD', name: 'Radeon RX Vega M',          gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'vegamgl',       brand: 'AMD', name: 'Radeon RX Vega M GL',       gaming: { 1080:  19, 1440:  16, 2160:  13 }, productivity:  18 },
  // AMD — GCN 4 / Polaris étendu
  { id: 'rx590',         brand: 'AMD', name: 'Radeon RX 590',             gaming: { 1080:  58, 1440:  51, 2160:  41 }, productivity:  55 },
  { id: 'rx480',         brand: 'AMD', name: 'Radeon RX 480',             gaming: { 1080:  53, 1440:  46, 2160:  38 }, productivity:  50 },
  { id: 'rx470',         brand: 'AMD', name: 'Radeon RX 470',             gaming: { 1080:  46, 1440:  40, 2160:  33 }, productivity:  44 },
  { id: 'pro580',        brand: 'AMD', name: 'Radeon Pro 580',            gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'rx5802048',     brand: 'AMD', name: 'Radeon RX 580 2048SP',      gaming: { 1080:  44, 1440:  38, 2160:  31 }, productivity:  42 },
  { id: 'rx580mob',      brand: 'AMD', name: 'Radeon RX 580 Mobile',      gaming: { 1080:  44, 1440:  38, 2160:  31 }, productivity:  42 },
  { id: 'pro580x',       brand: 'AMD', name: 'Radeon Pro 580X',           gaming: { 1080:  43, 1440:  38, 2160:  30 }, productivity:  41 },
  { id: 'rx580x',        brand: 'AMD', name: 'Radeon RX 580X',            gaming: { 1080:  43, 1440:  38, 2160:  30 }, productivity:  41 },
  { id: 'prowx7100',     brand: 'AMD', name: 'Radeon Pro WX 7100',        gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'rx570',         brand: 'AMD', name: 'Radeon RX 570',             gaming: { 1080:  40, 1440:  35, 2160:  28 }, productivity:  38 },
  { id: 'rx470mob',      brand: 'AMD', name: 'Radeon RX 470 Mobile',      gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'pro570',        brand: 'AMD', name: 'Radeon Pro 570',            gaming: { 1080:  36, 1440:  32, 2160:  26 }, productivity:  34 },
  { id: 'rx560mob',      brand: 'AMD', name: 'Radeon RX 560 Mobile',      gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'rx560xmob',     brand: 'AMD', name: 'Radeon RX 560X Mobile',     gaming: { 1080:  20, 1440:  17, 2160:  14 }, productivity:  19 },
  { id: 'rx460',         brand: 'AMD', name: 'Radeon RX 460',             gaming: { 1080:  20, 1440:  17, 2160:  14 }, productivity:  19 },
  { id: 'rx460mob',      brand: 'AMD', name: 'Radeon RX 460 Mobile',      gaming: { 1080:  19, 1440:  16, 2160:  13 }, productivity:  18 },
  // AMD — GCN 5 Fiji / Polaris Pro
  { id: 'r9fury',        brand: 'AMD', name: 'Radeon R9 Fury',            gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'r9furyx',       brand: 'AMD', name: 'Radeon R9 Fury X',          gaming: { 1080:  58, 1440:  51, 2160:  41 }, productivity:  55 },
  { id: 'r9nano',        brand: 'AMD', name: 'Radeon R9 Nano',            gaming: { 1080:  53, 1440:  46, 2160:  37 }, productivity:  50 },
  { id: 'produo',        brand: 'AMD', name: 'Radeon Pro Duo',            gaming: { 1080:  48, 1440:  42, 2160:  34 }, productivity:  46 },
  { id: 'prossg',        brand: 'AMD', name: 'Radeon Pro SSG',            gaming: { 1080:  68, 1440:  60, 2160:  48 }, productivity:  65 },
  // AMD — GCN 3 / Tonga / Ellesmere
  { id: 'r9390x',        brand: 'AMD', name: 'Radeon R9 390X',            gaming: { 1080:  58, 1440:  51, 2160:  41 }, productivity:  55 },
  { id: 'r9390',         brand: 'AMD', name: 'Radeon R9 390',             gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'r9295x2',       brand: 'AMD', name: 'Radeon R9 295X2',           gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'r9285',         brand: 'AMD', name: 'Radeon R9 285',             gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'r9380x',        brand: 'AMD', name: 'Radeon R9 380X',            gaming: { 1080:  32, 1440:  28, 2160:  23 }, productivity:  30 },
  { id: 'r9380',         brand: 'AMD', name: 'Radeon R9 380',             gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'r9e8950',       brand: 'AMD', name: 'Radeon E8950',              gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  // AMD — GCN 2 / Hawaii
  { id: 'r9290x',        brand: 'AMD', name: 'Radeon R9 290X',            gaming: { 1080:  43, 1440:  38, 2160:  30 }, productivity:  41 },
  { id: 'r9290',         brand: 'AMD', name: 'Radeon R9 290',             gaming: { 1080:  46, 1440:  40, 2160:  33 }, productivity:  44 },
  { id: 'r9280x',        brand: 'AMD', name: 'Radeon R9 280X',            gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'r9280',         brand: 'AMD', name: 'Radeon R9 280',             gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  { id: 'r9270x',        brand: 'AMD', name: 'Radeon R9 270X',            gaming: { 1080:  26, 1440:  23, 2160:  18 }, productivity:  25 },
  { id: 'r9270',         brand: 'AMD', name: 'Radeon R9 270',             gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'r7265',         brand: 'AMD', name: 'Radeon R7 265',             gaming: { 1080:  19, 1440:  17, 2160:  14 }, productivity:  18 },
  { id: 'r9370',         brand: 'AMD', name: 'Radeon R9 370',             gaming: { 1080:  25, 1440:  22, 2160:  18 }, productivity:  24 },
  { id: 'r7370',         brand: 'AMD', name: 'Radeon R7 370',             gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  // AMD — FirePro / FirePro S
  { id: 'fpw9100',       brand: 'AMD', name: 'FirePro W9100',             gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'fpw9000',       brand: 'AMD', name: 'FirePro W9000',             gaming: { 1080:  32, 1440:  28, 2160:  23 }, productivity:  30 },
  { id: 'fpw8100',       brand: 'AMD', name: 'FirePro W8100',             gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'fpw8000',       brand: 'AMD', name: 'FirePro W8000',             gaming: { 1080:  22, 1440:  19, 2160:  16 }, productivity:  21 },
  { id: 'fpw7100',       brand: 'AMD', name: 'FirePro W7100',             gaming: { 1080:  30, 1440:  26, 2160:  21 }, productivity:  29 },
  { id: 'fpw7000',       brand: 'AMD', name: 'FirePro W7000',             gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'fps10000',      brand: 'AMD', name: 'FirePro S10000',            gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'fps9000',       brand: 'AMD', name: 'FirePro S9000',             gaming: { 1080:  27, 1440:  23, 2160:  19 }, productivity:  26 },
  { id: 'fps9050',       brand: 'AMD', name: 'FirePro S9050',             gaming: { 1080:  26, 1440:  23, 2160:  18 }, productivity:  25 },
  { id: 'fps7000',       brand: 'AMD', name: 'FirePro S7000',             gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'fps7150',       brand: 'AMD', name: 'FirePro S7150',             gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  { id: 'fpd700',        brand: 'AMD', name: 'FirePro D700',              gaming: { 1080:  28, 1440:  25, 2160:  20 }, productivity:  27 },
  { id: 'fpd500',        brand: 'AMD', name: 'FirePro D500',              gaming: { 1080:  20, 1440:  17, 2160:  14 }, productivity:  19 },
  { id: 'fpd300',        brand: 'AMD', name: 'FirePro D300',              gaming: { 1080:  19, 1440:  16, 2160:  13 }, productivity:  18 },
  // AMD — GCN 1 / Legacy
  { id: 'hd7990',        brand: 'AMD', name: 'Radeon HD 7990',            gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  { id: 'hd7970',        brand: 'AMD', name: 'Radeon HD 7970',            gaming: { 1080:  28, 1440:  24, 2160:  20 }, productivity:  26 },
  { id: 'hd7950',        brand: 'AMD', name: 'Radeon HD 7950',            gaming: { 1080:  25, 1440:  22, 2160:  18 }, productivity:  24 },
  { id: 'hd7870xt',      brand: 'AMD', name: 'Radeon HD 7870 XT',         gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'hd7870',        brand: 'AMD', name: 'Radeon HD 7870',            gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'hd7850',        brand: 'AMD', name: 'Radeon HD 7850',            gaming: { 1080:  19, 1440:  16, 2160:  13 }, productivity:  18 },
  { id: 'skyserver500',  brand: 'AMD', name: 'Radeon Sky 500',            gaming: { 1080:  25, 1440:  22, 2160:  18 }, productivity:  24 },
  { id: 'hd7970mcf',     brand: 'AMD', name: 'Radeon HD 7970M Crossfire', gaming: { 1080:  32, 1440:  28, 2160:  22 }, productivity:  30 },
  { id: 'hd6990mcf',     brand: 'AMD', name: 'Radeon HD 6990M Crossfire', gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  { id: 'hd8970mcf',     brand: 'AMD', name: 'Radeon HD 8970M Crossfire', gaming: { 1080:  41, 1440:  36, 2160:  29 }, productivity:  39 },
  { id: 'hd8970m',       brand: 'AMD', name: 'Radeon HD 8970M',           gaming: { 1080:  19, 1440:  16, 2160:  13 }, productivity:  18 },
  { id: 'r9m290xcf',     brand: 'AMD', name: 'Radeon R9 M290X Crossfire', gaming: { 1080:  41, 1440:  36, 2160:  29 }, productivity:  39 },
  { id: 'r9m295xmac',    brand: 'AMD', name: 'Radeon R9 M295X Mac Ed.',   gaming: { 1080:  27, 1440:  24, 2160:  19 }, productivity:  26 },
  { id: 'r9m295x',       brand: 'AMD', name: 'Radeon R9 M295X',           gaming: { 1080:  27, 1440:  24, 2160:  19 }, productivity:  26 },
  { id: 'r9m395x',       brand: 'AMD', name: 'Radeon R9 M395X',           gaming: { 1080:  27, 1440:  24, 2160:  19 }, productivity:  26 },
  { id: 'r9m395',        brand: 'AMD', name: 'Radeon R9 M395',            gaming: { 1080:  26, 1440:  23, 2160:  18 }, productivity:  25 },
  { id: 'r9m390x',       brand: 'AMD', name: 'Radeon R9 M390X',           gaming: { 1080:  19, 1440:  16, 2160:  13 }, productivity:  18 },
  { id: 'r9m390',        brand: 'AMD', name: 'Radeon R9 M390',            gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  { id: 'r9m485x',       brand: 'AMD', name: 'Radeon R9 M485X',           gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  { id: 'steamdeck8',    brand: 'AMD', name: 'Radeon Steam Deck 8CU',     gaming: { 1080:  22, 1440:  19, 2160:  16 }, productivity:  21 },
  // NVIDIA — RTX 50xx Laptop
  { id: 'rtx5090l',      brand: 'NVIDIA', name: 'GeForce RTX 5090 (Laptop)',           gaming: { 1080: 245, 1440: 214, 2160: 174 }, productivity: 233 },
  { id: 'rtx5080l',      brand: 'NVIDIA', name: 'GeForce RTX 5080 (Laptop)',           gaming: { 1080: 224, 1440: 196, 2160: 159 }, productivity: 213 },
  { id: 'rtx5070til',    brand: 'NVIDIA', name: 'GeForce RTX 5070 Ti (Laptop)',        gaming: { 1080: 171, 1440: 150, 2160: 121 }, productivity: 162 },
  { id: 'rtx5070l',      brand: 'NVIDIA', name: 'GeForce RTX 5070 (Laptop)',           gaming: { 1080: 136, 1440: 119, 2160:  97 }, productivity: 129 },
  { id: 'rtx5060l',      brand: 'NVIDIA', name: 'GeForce RTX 5060 (Laptop)',           gaming: { 1080: 118, 1440: 103, 2160:  84 }, productivity: 112 },
  { id: 'rtx5050l',      brand: 'NVIDIA', name: 'GeForce RTX 5050 (Laptop)',           gaming: { 1080:  93, 1440:  81, 2160:  66 }, productivity:  88 },
  // NVIDIA — RTX 40xx Laptop
  { id: 'rtx4090l175',   brand: 'NVIDIA', name: 'GeForce RTX 4090 (Laptop, 175W)',    gaming: { 1080: 215, 1440: 188, 2160: 153 }, productivity: 204 },
  { id: 'rtx4090l150',   brand: 'NVIDIA', name: 'GeForce RTX 4090 (Laptop, 150W)',    gaming: { 1080: 191, 1440: 167, 2160: 136 }, productivity: 181 },
  { id: 'rtx4090l125',   brand: 'NVIDIA', name: 'GeForce RTX 4090 (Laptop, 125W)',    gaming: { 1080: 179, 1440: 157, 2160: 127 }, productivity: 170 },
  { id: 'rtx4090l115',   brand: 'NVIDIA', name: 'GeForce RTX 4090 (Laptop, 115W)',    gaming: { 1080: 176, 1440: 154, 2160: 125 }, productivity: 167 },
  { id: 'rtx4080l175',   brand: 'NVIDIA', name: 'GeForce RTX 4080 (Laptop, 175W)',    gaming: { 1080: 195, 1440: 171, 2160: 138 }, productivity: 185 },
  { id: 'rtx4080l145',   brand: 'NVIDIA', name: 'GeForce RTX 4080 (Laptop, 145W)',    gaming: { 1080: 173, 1440: 151, 2160: 123 }, productivity: 164 },
  { id: 'rtx4080l140',   brand: 'NVIDIA', name: 'GeForce RTX 4080 (Laptop, 140W)',    gaming: { 1080: 173, 1440: 151, 2160: 123 }, productivity: 164 },
  { id: 'rtx4080l115',   brand: 'NVIDIA', name: 'GeForce RTX 4080 (Laptop, 115W)',    gaming: { 1080: 137, 1440: 120, 2160:  97 }, productivity: 130 },
  { id: 'rtx4080l105',   brand: 'NVIDIA', name: 'GeForce RTX 4080 (Laptop, 105W)',    gaming: { 1080: 151, 1440: 132, 2160: 107 }, productivity: 143 },
  { id: 'rtx4080l80',    brand: 'NVIDIA', name: 'GeForce RTX 4080 (Laptop, 80W)',     gaming: { 1080: 141, 1440: 123, 2160: 100 }, productivity: 134 },
  { id: 'rtx4070l140',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 140W)',    gaming: { 1080: 128, 1440: 112, 2160:  91 }, productivity: 122 },
  { id: 'rtx4070l130',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 130W)',    gaming: { 1080: 121, 1440: 106, 2160:  86 }, productivity: 115 },
  { id: 'rtx4070l125',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 125W)',    gaming: { 1080: 131, 1440: 115, 2160:  93 }, productivity: 124 },
  { id: 'rtx4070l120',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 120W)',    gaming: { 1080: 124, 1440: 109, 2160:  88 }, productivity: 118 },
  { id: 'rtx4070l115',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 115W)',    gaming: { 1080: 127, 1440: 111, 2160:  90 }, productivity: 121 },
  { id: 'rtx4070l110',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 110W)',    gaming: { 1080: 127, 1440: 111, 2160:  90 }, productivity: 121 },
  { id: 'rtx4070l105',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 105W)',    gaming: { 1080: 117, 1440: 102, 2160:  83 }, productivity: 111 },
  { id: 'rtx4070l100',   brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 100W)',    gaming: { 1080: 123, 1440: 108, 2160:  87 }, productivity: 117 },
  { id: 'rtx4070l95',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 95W)',     gaming: { 1080: 115, 1440: 101, 2160:  82 }, productivity: 109 },
  { id: 'rtx4070l90',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 90W)',     gaming: { 1080: 115, 1440: 101, 2160:  82 }, productivity: 109 },
  { id: 'rtx4070l80',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 80W)',     gaming: { 1080: 110, 1440:  96, 2160:  78 }, productivity: 105 },
  { id: 'rtx4070l70',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 70W)',     gaming: { 1080:  93, 1440:  81, 2160:  66 }, productivity:  88 },
  { id: 'rtx4070l65',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 65W)',     gaming: { 1080:  95, 1440:  83, 2160:  67 }, productivity:  90 },
  { id: 'rtx4070l60',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 60W)',     gaming: { 1080:  86, 1440:  75, 2160:  61 }, productivity:  82 },
  { id: 'rtx4070l55',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 55W)',     gaming: { 1080:  88, 1440:  77, 2160:  63 }, productivity:  84 },
  { id: 'rtx4070l50',    brand: 'NVIDIA', name: 'GeForce RTX 4070 (Laptop, 50W)',     gaming: { 1080:  62, 1440:  54, 2160:  44 }, productivity:  59 },
  { id: 'rtx4060l140',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 140W)',    gaming: { 1080: 106, 1440:  93, 2160:  75 }, productivity: 101 },
  { id: 'rtx4060l130',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 130W)',    gaming: { 1080: 109, 1440:  95, 2160:  77 }, productivity: 104 },
  { id: 'rtx4060l125',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 125W)',    gaming: { 1080: 113, 1440:  99, 2160:  80 }, productivity: 107 },
  { id: 'rtx4060l120',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 120W)',    gaming: { 1080: 106, 1440:  93, 2160:  75 }, productivity: 101 },
  { id: 'rtx4060l115',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 115W)',    gaming: { 1080: 106, 1440:  93, 2160:  75 }, productivity: 101 },
  { id: 'rtx4060l110',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 110W)',    gaming: { 1080: 109, 1440:  95, 2160:  77 }, productivity: 104 },
  { id: 'rtx4060l105',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 105W)',    gaming: { 1080: 101, 1440:  88, 2160:  72 }, productivity:  96 },
  { id: 'rtx4060l100',   brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 100W)',    gaming: { 1080: 100, 1440:  88, 2160:  71 }, productivity:  95 },
  { id: 'rtx4060l90',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 90W)',     gaming: { 1080: 100, 1440:  88, 2160:  71 }, productivity:  95 },
  { id: 'rtx4060l85',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 85W)',     gaming: { 1080: 102, 1440:  89, 2160:  72 }, productivity:  97 },
  { id: 'rtx4060l80',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 80W)',     gaming: { 1080:  96, 1440:  84, 2160:  68 }, productivity:  91 },
  { id: 'rtx4060l75',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 75W)',     gaming: { 1080:  92, 1440:  81, 2160:  65 }, productivity:  87 },
  { id: 'rtx4060l65',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 65W)',     gaming: { 1080:  87, 1440:  76, 2160:  62 }, productivity:  83 },
  { id: 'rtx4060l60',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 60W)',     gaming: { 1080:  81, 1440:  71, 2160:  57 }, productivity:  77 },
  { id: 'rtx4060l55',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 55W)',     gaming: { 1080:  81, 1440:  71, 2160:  58 }, productivity:  77 },
  { id: 'rtx4060l50',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 50W)',     gaming: { 1080:  73, 1440:  64, 2160:  52 }, productivity:  69 },
  { id: 'rtx4060l45',    brand: 'NVIDIA', name: 'GeForce RTX 4060 (Laptop, 45W)',     gaming: { 1080:  74, 1440:  65, 2160:  53 }, productivity:  70 },
  { id: 'rtx4050l140',   brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 140W)',    gaming: { 1080:  88, 1440:  77, 2160:  62 }, productivity:  84 },
  { id: 'rtx4050l130',   brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 130W)',    gaming: { 1080:  86, 1440:  75, 2160:  61 }, productivity:  82 },
  { id: 'rtx4050l120',   brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 120W)',    gaming: { 1080:  88, 1440:  77, 2160:  62 }, productivity:  84 },
  { id: 'rtx4050l105',   brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 105W)',    gaming: { 1080:  87, 1440:  76, 2160:  62 }, productivity:  83 },
  { id: 'rtx4050l100',   brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 100W)',    gaming: { 1080:  82, 1440:  72, 2160:  58 }, productivity:  78 },
  { id: 'rtx4050l95',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 95W)',     gaming: { 1080:  89, 1440:  78, 2160:  63 }, productivity:  85 },
  { id: 'rtx4050l90',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 90W)',     gaming: { 1080:  76, 1440:  67, 2160:  54 }, productivity:  72 },
  { id: 'rtx4050l85',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 85W)',     gaming: { 1080:  87, 1440:  76, 2160:  62 }, productivity:  83 },
  { id: 'rtx4050l80',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 80W)',     gaming: { 1080:  83, 1440:  73, 2160:  59 }, productivity:  79 },
  { id: 'rtx4050l75',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 75W)',     gaming: { 1080:  82, 1440:  72, 2160:  58 }, productivity:  78 },
  { id: 'rtx4050l65',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 65W)',     gaming: { 1080:  74, 1440:  65, 2160:  53 }, productivity:  70 },
  { id: 'rtx4050l60',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 60W)',     gaming: { 1080:  67, 1440:  59, 2160:  48 }, productivity:  64 },
  { id: 'rtx4050l55',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 55W)',     gaming: { 1080:  64, 1440:  56, 2160:  45 }, productivity:  61 },
  { id: 'rtx4050l50',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 50W)',     gaming: { 1080:  63, 1440:  55, 2160:  45 }, productivity:  60 },
  { id: 'rtx4050l45',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 45W)',     gaming: { 1080:  65, 1440:  57, 2160:  46 }, productivity:  62 },
  { id: 'rtx4050l35',    brand: 'NVIDIA', name: 'GeForce RTX 4050 (Laptop, 35W)',     gaming: { 1080:  57, 1440:  50, 2160:  40 }, productivity:  54 },
  // NVIDIA — RTX 30xx Laptop
  { id: 'rtx3080til175', brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti (Laptop, 175W)', gaming: { 1080: 133, 1440: 116, 2160:  94 }, productivity: 126 },
  { id: 'rtx3080til150', brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti (Laptop, 150W)', gaming: { 1080: 128, 1440: 112, 2160:  91 }, productivity: 122 },
  { id: 'rtx3080til165', brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti (Laptop, 165W)', gaming: { 1080:  95, 1440:  83, 2160:  67 }, productivity:  90 },
  { id: 'rtx3080til130', brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti (Laptop, 130W)', gaming: { 1080: 121, 1440: 106, 2160:  86 }, productivity: 115 },
  { id: 'rtx3080til105', brand: 'NVIDIA', name: 'GeForce RTX 3080 Ti (Laptop, 105W)', gaming: { 1080: 108, 1440:  95, 2160:  77 }, productivity: 103 },
  { id: 'rtx3080l165',   brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 165W)',    gaming: { 1080: 124, 1440: 109, 2160:  88 }, productivity: 118 },
  { id: 'rtx3080l150',   brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 150W)',    gaming: { 1080: 122, 1440: 107, 2160:  87 }, productivity: 116 },
  { id: 'rtx3080l140',   brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 140W)',    gaming: { 1080: 116, 1440: 102, 2160:  82 }, productivity: 110 },
  { id: 'rtx3080l130',   brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 130W)',    gaming: { 1080: 113, 1440:  99, 2160:  80 }, productivity: 107 },
  { id: 'rtx3080l110',   brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 110W)',    gaming: { 1080: 102, 1440:  89, 2160:  72 }, productivity:  97 },
  { id: 'rtx3080l100',   brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 100W)',    gaming: { 1080: 104, 1440:  91, 2160:  74 }, productivity:  99 },
  { id: 'rtx3080l95',    brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 95W)',     gaming: { 1080:  96, 1440:  84, 2160:  68 }, productivity:  91 },
  { id: 'rtx3080l90',    brand: 'NVIDIA', name: 'GeForce RTX 3080 (Laptop, 90W)',     gaming: { 1080:  88, 1440:  77, 2160:  62 }, productivity:  84 },
  { id: 'rtx3070til150', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 150W)', gaming: { 1080: 116, 1440: 102, 2160:  82 }, productivity: 110 },
  { id: 'rtx3070til140', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 140W)', gaming: { 1080: 112, 1440:  98, 2160:  80 }, productivity: 106 },
  { id: 'rtx3070til130', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 130W)', gaming: { 1080: 104, 1440:  91, 2160:  74 }, productivity:  99 },
  { id: 'rtx3070til120', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 120W)', gaming: { 1080:  94, 1440:  82, 2160:  67 }, productivity:  89 },
  { id: 'rtx3070til115', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 115W)', gaming: { 1080:  98, 1440:  86, 2160:  70 }, productivity:  93 },
  { id: 'rtx3070til105', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 105W)', gaming: { 1080:  96, 1440:  84, 2160:  68 }, productivity:  91 },
  { id: 'rtx3070til100', brand: 'NVIDIA', name: 'GeForce RTX 3070 Ti (Laptop, 100W)', gaming: { 1080:  98, 1440:  86, 2160:  70 }, productivity:  93 },
  { id: 'rtx3070l140',   brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 140W)',    gaming: { 1080: 107, 1440:  94, 2160:  76 }, productivity: 102 },
  { id: 'rtx3070l130',   brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 130W)',    gaming: { 1080: 106, 1440:  93, 2160:  75 }, productivity: 101 },
  { id: 'rtx3070l110',   brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 110W)',    gaming: { 1080:  95, 1440:  83, 2160:  67 }, productivity:  90 },
  { id: 'rtx3070l105',   brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 105W)',    gaming: { 1080:  90, 1440:  79, 2160:  64 }, productivity:  86 },
  { id: 'rtx3070l100',   brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 100W)',    gaming: { 1080:  89, 1440:  78, 2160:  63 }, productivity:  85 },
  { id: 'rtx3070l95',    brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 95W)',     gaming: { 1080:  91, 1440:  80, 2160:  65 }, productivity:  86 },
  { id: 'rtx3070l85',    brand: 'NVIDIA', name: 'GeForce RTX 3070 (Laptop, 85W)',     gaming: { 1080:  81, 1440:  71, 2160:  58 }, productivity:  77 },
  { id: 'rtx3060l140',   brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 140W)',    gaming: { 1080:  89, 1440:  78, 2160:  63 }, productivity:  85 },
  { id: 'rtx3060l130',   brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 130W)',    gaming: { 1080:  89, 1440:  78, 2160:  63 }, productivity:  85 },
  { id: 'rtx3060l125',   brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 125W)',    gaming: { 1080:  83, 1440:  73, 2160:  59 }, productivity:  79 },
  { id: 'rtx3060l120',   brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 120W)',    gaming: { 1080:  85, 1440:  74, 2160:  60 }, productivity:  81 },
  { id: 'rtx3060l105',   brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 105W)',    gaming: { 1080:  83, 1440:  73, 2160:  59 }, productivity:  79 },
  { id: 'rtx3060l100',   brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 100W)',    gaming: { 1080:  80, 1440:  70, 2160:  57 }, productivity:  76 },
  { id: 'rtx3060l95',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 95W)',     gaming: { 1080:  77, 1440:  67, 2160:  55 }, productivity:  73 },
  { id: 'rtx3060l90',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 90W)',     gaming: { 1080:  73, 1440:  64, 2160:  52 }, productivity:  69 },
  { id: 'rtx3060l85',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 85W)',     gaming: { 1080:  72, 1440:  63, 2160:  51 }, productivity:  68 },
  { id: 'rtx3060l80',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 80W)',     gaming: { 1080:  78, 1440:  68, 2160:  55 }, productivity:  74 },
  { id: 'rtx3060l75',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 75W)',     gaming: { 1080:  75, 1440:  66, 2160:  53 }, productivity:  71 },
  { id: 'rtx3060l70',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 70W)',     gaming: { 1080:  69, 1440:  60, 2160:  49 }, productivity:  66 },
  { id: 'rtx3060l65',    brand: 'NVIDIA', name: 'GeForce RTX 3060 (Laptop, 65W)',     gaming: { 1080:  68, 1440:  60, 2160:  48 }, productivity:  65 },
  { id: 'rtx3050til95',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 95W)',  gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'rtx3050til90',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 90W)',  gaming: { 1080:  57, 1440:  50, 2160:  40 }, productivity:  54 },
  { id: 'rtx3050til85',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 85W)',  gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'rtx3050til80',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 80W)',  gaming: { 1080:  57, 1440:  50, 2160:  40 }, productivity:  54 },
  { id: 'rtx3050til75',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 75W)',  gaming: { 1080:  60, 1440:  53, 2160:  43 }, productivity:  57 },
  { id: 'rtx3050til65',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 65W)',  gaming: { 1080:  53, 1440:  46, 2160:  38 }, productivity:  50 },
  { id: 'rtx3050til60',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 60W)',  gaming: { 1080:  52, 1440:  46, 2160:  37 }, productivity:  49 },
  { id: 'rtx3050til50',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 50W)',  gaming: { 1080:  51, 1440:  45, 2160:  36 }, productivity:  48 },
  { id: 'rtx3050til45',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 45W)',  gaming: { 1080:  47, 1440:  41, 2160:  33 }, productivity:  45 },
  { id: 'rtx3050til40',  brand: 'NVIDIA', name: 'GeForce RTX 3050 Ti (Laptop, 40W)',  gaming: { 1080:  45, 1440:  39, 2160:  32 }, productivity:  43 },
  { id: 'rtx3050l6gb95', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 95W, 6GB)',gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'rtx3050l95',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 95W)',     gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'rtx3050l90',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 90W)',     gaming: { 1080:  51, 1440:  45, 2160:  36 }, productivity:  48 },
  { id: 'rtx3050l85',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 85W)',     gaming: { 1080:  53, 1440:  46, 2160:  38 }, productivity:  50 },
  { id: 'rtx3050l6gb75', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 75W, 6GB)',gaming: { 1080:  54, 1440:  47, 2160:  38 }, productivity:  51 },
  { id: 'rtx3050l75',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 75W)',     gaming: { 1080:  50, 1440:  44, 2160:  35 }, productivity:  48 },
  { id: 'rtx3050l6gb70', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 70W, 6GB)',gaming: { 1080:  51, 1440:  45, 2160:  36 }, productivity:  48 },
  { id: 'rtx3050l6gb65', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 65W, 6GB)',gaming: { 1080:  50, 1440:  44, 2160:  36 }, productivity:  48 },
  { id: 'rtx3050l65',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 65W)',     gaming: { 1080:  48, 1440:  42, 2160:  34 }, productivity:  46 },
  { id: 'rtx3050l6gb63', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 63W, 6GB)',gaming: { 1080:  49, 1440:  43, 2160:  35 }, productivity:  47 },
  { id: 'rtx3050l6gb60', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 60W, 6GB)',gaming: { 1080:  48, 1440:  42, 2160:  34 }, productivity:  46 },
  { id: 'rtx3050l60',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 60W)',     gaming: { 1080:  47, 1440:  41, 2160:  33 }, productivity:  45 },
  { id: 'rtx3050l55',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 55W)',     gaming: { 1080:  45, 1440:  39, 2160:  32 }, productivity:  43 },
  { id: 'rtx3050l6gb50', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 50W, 6GB)',gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'rtx3050l50',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 50W)',     gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'rtx3050l6gb45', brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 45W, 6GB)',gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'rtx3050l45',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 45W)',     gaming: { 1080:  45, 1440:  39, 2160:  32 }, productivity:  43 },
  { id: 'rtx3050l40',    brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 40W)',     gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'rtx3050l6gb',   brand: 'NVIDIA', name: 'GeForce RTX 3050 (Laptop, 6GB)',     gaming: { 1080:  46, 1440:  40, 2160:  33 }, productivity:  44 },
  // NVIDIA — RTX 20xx Laptop
  { id: 'rtx2080sl150',  brand: 'NVIDIA', name: 'GeForce RTX 2080 SUPER (Laptop, 150W)',    gaming: { 1080:  97, 1440:  85, 2160:  69 }, productivity:  92 },
  { id: 'rtx2080smq90',  brand: 'NVIDIA', name: 'GeForce RTX 2080 SUPER Max-Q (90W)',       gaming: { 1080:  92, 1440:  81, 2160:  65 }, productivity:  87 },
  { id: 'rtx2080smq80',  brand: 'NVIDIA', name: 'GeForce RTX 2080 SUPER Max-Q (80W)',       gaming: { 1080:  81, 1440:  71, 2160:  58 }, productivity:  77 },
  { id: 'rtx2080smq',    brand: 'NVIDIA', name: 'GeForce RTX 2080 SUPER Max-Q',             gaming: { 1080:  86, 1440:  75, 2160:  61 }, productivity:  82 },
  { id: 'rtx2080mq',     brand: 'NVIDIA', name: 'GeForce RTX 2080 Max-Q',                   gaming: { 1080:  79, 1440:  69, 2160:  56 }, productivity:  75 },
  { id: 'rtx2070smq90',  brand: 'NVIDIA', name: 'GeForce RTX 2070 SUPER Max-Q (90W)',       gaming: { 1080:  75, 1440:  66, 2160:  53 }, productivity:  71 },
  { id: 'rtx2070smq',    brand: 'NVIDIA', name: 'GeForce RTX 2070 SUPER Max-Q',             gaming: { 1080:  76, 1440:  67, 2160:  54 }, productivity:  72 },
  { id: 'rtx2070mq',     brand: 'NVIDIA', name: 'GeForce RTX 2070 Max-Q',                   gaming: { 1080:  64, 1440:  56, 2160:  45 }, productivity:  61 },
  { id: 'rtx2060l115',   brand: 'NVIDIA', name: 'GeForce RTX 2060 (Laptop, 115W)',          gaming: { 1080:  66, 1440:  58, 2160:  47 }, productivity:  63 },
  { id: 'rtx2060l90',    brand: 'NVIDIA', name: 'GeForce RTX 2060 (Laptop, 90W)',           gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'rtx2060l80',    brand: 'NVIDIA', name: 'GeForce RTX 2060 (Laptop, 80W)',           gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'rtx2060mq',     brand: 'NVIDIA', name: 'GeForce RTX 2060 Max-Q',                   gaming: { 1080:  56, 1440:  49, 2160:  40 }, productivity:  53 },
  { id: 'rtx2050l65',    brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop, 65W)',           gaming: { 1080:  41, 1440:  36, 2160:  29 }, productivity:  39 },
  { id: 'rtx2050l60',    brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop, 60W)',           gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'rtx2050l',      brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop)',                gaming: { 1080:  39, 1440:  34, 2160:  27 }, productivity:  37 },
  { id: 'rtx2050l45',    brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop, 45W)',           gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'rtx2050l40',    brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop, 40W)',           gaming: { 1080:  35, 1440:  31, 2160:  25 }, productivity:  33 },
  { id: 'rtx2050l35',    brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop, 35W)',           gaming: { 1080:  32, 1440:  28, 2160:  23 }, productivity:  30 },
  { id: 'rtx2050l30',    brand: 'NVIDIA', name: 'GeForce RTX 2050 (Laptop, 30W)',           gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  // NVIDIA — RTX Ada Generation Laptop (workstation)
  { id: 'rtx5000ada105', brand: 'NVIDIA', name: 'RTX 5000 Ada Generation (105W)',           gaming: { 1080: 162, 1440: 142, 2160: 115 }, productivity: 154 },
  { id: 'rtx5000ada95',  brand: 'NVIDIA', name: 'RTX 5000 Ada Generation (95W)',            gaming: { 1080: 149, 1440: 130, 2160: 106 }, productivity: 142 },
  { id: 'rtx3000ada130', brand: 'NVIDIA', name: 'RTX 3000 Ada Generation (130W)',           gaming: { 1080: 126, 1440: 110, 2160:  90 }, productivity: 120 },
  { id: 'rtx3000ada60',  brand: 'NVIDIA', name: 'RTX 3000 Ada Generation (60W)',            gaming: { 1080:  93, 1440:  81, 2160:  66 }, productivity:  88 },
  { id: 'rtx3000ada50',  brand: 'NVIDIA', name: 'RTX 3000 Ada Generation (50W)',            gaming: { 1080:  88, 1440:  77, 2160:  63 }, productivity:  84 },
  { id: 'rtx2000ada80',  brand: 'NVIDIA', name: 'RTX 2000 Ada Generation (80W)',            gaming: { 1080:  92, 1440:  81, 2160:  65 }, productivity:  87 },
  { id: 'rtx2000ada65',  brand: 'NVIDIA', name: 'RTX 2000 Ada Generation (65W)',            gaming: { 1080:  88, 1440:  77, 2160:  63 }, productivity:  84 },
  { id: 'rtx2000ada50',  brand: 'NVIDIA', name: 'RTX 2000 Ada Generation (50W)',            gaming: { 1080:  75, 1440:  66, 2160:  53 }, productivity:  71 },
  { id: 'rtx1000ada50',  brand: 'NVIDIA', name: 'RTX 1000 Ada Generation (50W)',            gaming: { 1080:  67, 1440:  59, 2160:  48 }, productivity:  64 },
  { id: 'rtx500ada50',   brand: 'NVIDIA', name: 'RTX 500 Ada Generation (50W)',             gaming: { 1080:  53, 1440:  46, 2160:  38 }, productivity:  50 },
  { id: 'rtx500ada',     brand: 'NVIDIA', name: 'RTX 500 Ada Generation',                   gaming: { 1080:  53, 1440:  46, 2160:  38 }, productivity:  50 },
  { id: 'rtx500ada45',   brand: 'NVIDIA', name: 'RTX 500 Ada Generation (45W)',             gaming: { 1080:  47, 1440:  41, 2160:  33 }, productivity:  45 },
  { id: 'rtx500ada35',   brand: 'NVIDIA', name: 'RTX 500 Ada Generation (35W)',             gaming: { 1080:  47, 1440:  41, 2160:  33 }, productivity:  45 },
  // NVIDIA — RTX A-series Laptop
  { id: 'rtxa4500l',     brand: 'NVIDIA', name: 'RTX A4500 (Laptop, 135W)',                 gaming: { 1080:  94, 1440:  82, 2160:  67 }, productivity:  89 },
  { id: 'rtxa3000l',     brand: 'NVIDIA', name: 'RTX A3000 (Laptop, 135W)',                 gaming: { 1080:  84, 1440:  74, 2160:  60 }, productivity:  80 },
  { id: 'rtxa3000l12',   brand: 'NVIDIA', name: 'RTX A3000 (Laptop, 12GB)',                 gaming: { 1080:  73, 1440:  64, 2160:  52 }, productivity:  69 },
  { id: 'rtxa2000l',     brand: 'NVIDIA', name: 'RTX A2000 (Laptop, 65W)',                  gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'rtxa1000l',     brand: 'NVIDIA', name: 'RTX A1000 (Laptop, 95W)',                  gaming: { 1080:  50, 1440:  44, 2160:  35 }, productivity:  48 },
  { id: 'rtxa1000l6gb',  brand: 'NVIDIA', name: 'RTX A1000 (Laptop, 65W, 6GB)',             gaming: { 1080:  48, 1440:  42, 2160:  34 }, productivity:  46 },
  { id: 'rtxa500l35',    brand: 'NVIDIA', name: 'RTX A500 (Laptop, 35W)',                   gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'rtxa500l30',    brand: 'NVIDIA', name: 'RTX A500 (Laptop, 30W)',                   gaming: { 1080:  28, 1440:  25, 2160:  20 }, productivity:  27 },
  // NVIDIA — T-series Laptop
  { id: 'nvt1200',       brand: 'NVIDIA', name: 'NVIDIA T1200',                             gaming: { 1080:  34, 1440:  30, 2160:  24 }, productivity:  32 },
  { id: 'nvt600',        brand: 'NVIDIA', name: 'NVIDIA T600',                              gaming: { 1080:  28, 1440:  25, 2160:  20 }, productivity:  27 },
  { id: 'nvt550',        brand: 'NVIDIA', name: 'NVIDIA T550',                              gaming: { 1080:  22, 1440:  19, 2160:  15 }, productivity:  21 },
  { id: 'nvt500',        brand: 'NVIDIA', name: 'NVIDIA T500',                              gaming: { 1080:  20, 1440:  18, 2160:  14 }, productivity:  19 },
  // NVIDIA — Quadro Laptop
  { id: 'qp5200l',       brand: 'NVIDIA', name: 'Quadro P5200 (Laptop, 16GB)',              gaming: { 1080:  64, 1440:  56, 2160:  45 }, productivity:  61 },
  { id: 'qp3200l',       brand: 'NVIDIA', name: 'Quadro P3200 (Laptop, 6GB)',               gaming: { 1080:  44, 1440:  39, 2160:  31 }, productivity:  42 },
  { id: 'qp5000l',       brand: 'NVIDIA', name: 'Quadro P5000 (16GB)',                      gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'qp4000',        brand: 'NVIDIA', name: 'Quadro P4000 (8GB)',                       gaming: { 1080:  40, 1440:  35, 2160:  28 }, productivity:  38 },
  { id: 'qt2000',        brand: 'NVIDIA', name: 'Quadro T2000 (4GB)',                       gaming: { 1080:  33, 1440:  29, 2160:  23 }, productivity:  31 },
  { id: 'qt1000',        brand: 'NVIDIA', name: 'Quadro T1000 (4GB)',                       gaming: { 1080:  33, 1440:  29, 2160:  23 }, productivity:  31 },
  { id: 'qt2000mq',      brand: 'NVIDIA', name: 'Quadro T2000 Max-Q',                       gaming: { 1080:  32, 1440:  28, 2160:  23 }, productivity:  30 },
  { id: 'qt1000mq',      brand: 'NVIDIA', name: 'Quadro T1000 Max-Q',                       gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  { id: 'qt550l',        brand: 'NVIDIA', name: 'Quadro T550 (25W)',                        gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'qp3000l',       brand: 'NVIDIA', name: 'Quadro P3000 (6GB)',                       gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  { id: 'qp2000l',       brand: 'NVIDIA', name: 'Quadro P2000 (Laptop, 4GB)',               gaming: { 1080:  20, 1440:  18, 2160:  14 }, productivity:  19 },
  { id: 'qm2200l',       brand: 'NVIDIA', name: 'Quadro M2200 (4GB)',                       gaming: { 1080:  17, 1440:  15, 2160:  12 }, productivity:  16 },
  { id: 'qm620l',        brand: 'NVIDIA', name: 'Quadro M620 (2GB)',                        gaming: { 1080:   9, 1440:   8, 2160:   6 }, productivity:   9 },
  { id: 'qm520l',        brand: 'NVIDIA', name: 'Quadro M520 (2GB)',                        gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'qm600ml',       brand: 'NVIDIA', name: 'Quadro M600M (2GB)',                       gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  // NVIDIA — GTX Laptop
  { id: 'gtx1080l',      brand: 'NVIDIA', name: 'GeForce GTX 1080 (Laptop, 8GB)',           gaming: { 1080:  69, 1440:  60, 2160:  49 }, productivity:  66 },
  { id: 'gtx1080mq',     brand: 'NVIDIA', name: 'GeForce GTX 1080 Max-Q (8GB)',             gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'gtx1070l',      brand: 'NVIDIA', name: 'GeForce GTX 1070 (Laptop, 8GB)',           gaming: { 1080:  55, 1440:  48, 2160:  39 }, productivity:  52 },
  { id: 'gtx1070mq',     brand: 'NVIDIA', name: 'GeForce GTX 1070 Max-Q (8GB)',             gaming: { 1080:  47, 1440:  41, 2160:  33 }, productivity:  45 },
  { id: 'gtx1060l6',     brand: 'NVIDIA', name: 'GeForce GTX 1060 (Laptop, 6GB)',           gaming: { 1080:  38, 1440:  33, 2160:  27 }, productivity:  36 },
  { id: 'gtx1060l3',     brand: 'NVIDIA', name: 'GeForce GTX 1060 (Laptop, 3GB)',           gaming: { 1080:  37, 1440:  32, 2160:  26 }, productivity:  35 },
  { id: 'gtx1060mq',     brand: 'NVIDIA', name: 'GeForce GTX 1060 Max-Q (6GB)',             gaming: { 1080:  33, 1440:  29, 2160:  23 }, productivity:  31 },
  { id: 'gtx1650til128', brand: 'NVIDIA', name: 'GeForce GTX 1650 Ti (Laptop, 128-bit)',    gaming: { 1080:  36, 1440:  32, 2160:  26 }, productivity:  34 },
  { id: 'gtx1650timq50', brand: 'NVIDIA', name: 'GeForce GTX 1650 Ti Max-Q (50W)',          gaming: { 1080:  35, 1440:  31, 2160:  25 }, productivity:  33 },
  { id: 'gtx1650l',      brand: 'NVIDIA', name: 'GeForce GTX 1650 (Laptop)',                gaming: { 1080:  34, 1440:  30, 2160:  24 }, productivity:  32 },
  { id: 'gtx1650l50',    brand: 'NVIDIA', name: 'GeForce GTX 1650 (Laptop, 50W)',           gaming: { 1080:  34, 1440:  30, 2160:  24 }, productivity:  32 },
  { id: 'gtx1650l40',    brand: 'NVIDIA', name: 'GeForce GTX 1650 (Laptop, 40W)',           gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'gtx1650til',    brand: 'NVIDIA', name: 'GeForce GTX 1650 Ti (Laptop)',             gaming: { 1080:  36, 1440:  32, 2160:  25 }, productivity:  34 },
  { id: 'gtx1650mq',     brand: 'NVIDIA', name: 'GeForce GTX 1650 Max-Q',                   gaming: { 1080:  29, 1440:  25, 2160:  21 }, productivity:  28 },
  { id: 'gtx1650timq',   brand: 'NVIDIA', name: 'GeForce GTX 1650 Ti Max-Q',                gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'gtx980ml',      brand: 'NVIDIA', name: 'GeForce GTX 980M (8GB)',                   gaming: { 1080:  28, 1440:  25, 2160:  20 }, productivity:  27 },
  { id: 'gtx1050til',    brand: 'NVIDIA', name: 'GeForce GTX 1050 Ti (Laptop, 4GB)',        gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'gtx1050timq',   brand: 'NVIDIA', name: 'GeForce GTX 1050 Ti Max-Q (4GB)',          gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'gtx1050l3',     brand: 'NVIDIA', name: 'GeForce GTX 1050 (Laptop, 3GB)',           gaming: { 1080:  21, 1440:  18, 2160:  15 }, productivity:  20 },
  { id: 'gtx1050l4',     brand: 'NVIDIA', name: 'GeForce GTX 1050 (Laptop, 4GB)',           gaming: { 1080:  17, 1440:  15, 2160:  12 }, productivity:  16 },
  { id: 'gtx1050l2',     brand: 'NVIDIA', name: 'GeForce GTX 1050 (Laptop, 2GB)',           gaming: { 1080:  17, 1440:  15, 2160:  12 }, productivity:  16 },
  { id: 'gtx1050lmq',    brand: 'NVIDIA', name: 'GeForce GTX 1050 Max-Q (40W)',             gaming: { 1080:  16, 1440:  14, 2160:  11 }, productivity:  15 },
  { id: 'gtx965ml',      brand: 'NVIDIA', name: 'GeForce GTX 965M (2GB)',                   gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  { id: 'gtx960ml',      brand: 'NVIDIA', name: 'GeForce GTX 960M (4GB)',                   gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'gtx950ml',      brand: 'NVIDIA', name: 'GeForce GTX 950M (2GB)',                   gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  // NVIDIA — MX Series
  { id: 'mx570-30',      brand: 'NVIDIA', name: 'GeForce MX570 (30W)',                      gaming: { 1080:  31, 1440:  27, 2160:  22 }, productivity:  29 },
  { id: 'mx570',         brand: 'NVIDIA', name: 'GeForce MX570',                            gaming: { 1080:  28, 1440:  25, 2160:  20 }, productivity:  27 },
  { id: 'mx550-35',      brand: 'NVIDIA', name: 'GeForce MX550 (35W)',                      gaming: { 1080:  26, 1440:  23, 2160:  18 }, productivity:  25 },
  { id: 'mx550',         brand: 'NVIDIA', name: 'GeForce MX550',                            gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'mx450-g6',      brand: 'NVIDIA', name: 'GeForce MX450 (GDDR6, 25W)',               gaming: { 1080:  23, 1440:  20, 2160:  16 }, productivity:  22 },
  { id: 'mx450',         brand: 'NVIDIA', name: 'GeForce MX450',                            gaming: { 1080:  21, 1440:  18, 2160:  15 }, productivity:  20 },
  { id: 'mx450-12w',     brand: 'NVIDIA', name: 'GeForce MX450 (GDDR6, 12W)',               gaming: { 1080:  17, 1440:  15, 2160:  12 }, productivity:  16 },
  { id: 'mx350',         brand: 'NVIDIA', name: 'GeForce MX350',                            gaming: { 1080:  14, 1440:  12, 2160:  10 }, productivity:  13 },
  { id: 'mx350-25',      brand: 'NVIDIA', name: 'GeForce MX350 (25W)',                      gaming: { 1080:  13, 1440:  11, 2160:  10 }, productivity:  12 },
  { id: 'mx350-10',      brand: 'NVIDIA', name: 'GeForce MX350 (10W)',                      gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'mx330-4g',      brand: 'NVIDIA', name: 'GeForce MX330 (4GB, 25W)',                 gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'mx330-2g',      brand: 'NVIDIA', name: 'GeForce MX330 (2GB, 25W)',                 gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  { id: 'mx250-25',      brand: 'NVIDIA', name: 'GeForce MX250 (25W)',                      gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'mx250-10',      brand: 'NVIDIA', name: 'GeForce MX250 (10W)',                      gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
  { id: 'mx230',         brand: 'NVIDIA', name: 'GeForce MX230 (2GB)',                      gaming: { 1080:   7, 1440:   6, 2160:   5 }, productivity:   7 },
  { id: 'mx150',         brand: 'NVIDIA', name: 'GeForce MX150 (2GB)',                      gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  { id: 'mx130',         brand: 'NVIDIA', name: 'GeForce MX130 (2GB)',                      gaming: { 1080:   7, 1440:   6, 2160:   5 }, productivity:   7 },
  { id: 'mx110',         brand: 'NVIDIA', name: 'GeForce MX110 (2GB)',                      gaming: { 1080:   5, 1440:   4, 2160:   3 }, productivity:   5 },
  { id: 'g940mx',        brand: 'NVIDIA', name: 'GeForce 940MX (2GB)',                      gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'g930mx',        brand: 'NVIDIA', name: 'GeForce 930MX (2GB)',                      gaming: { 1080:   5, 1440:   4, 2160:   4 }, productivity:   5 },
  { id: 'g920mx',        brand: 'NVIDIA', name: 'GeForce 920MX (2GB)',                      gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'g920m',         brand: 'NVIDIA', name: 'GeForce 920M (4GB)',                       gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  // Intel — Arc Laptop
  { id: 'arc-a770m',     brand: 'Intel',  name: 'Arc A770M',                               gaming: { 1080: 108, 1440:  95, 2160:  77 }, productivity: 103 },
  { id: 'arc-a730m',     brand: 'Intel',  name: 'Arc A730M',                               gaming: { 1080: 101, 1440:  88, 2160:  72 }, productivity:  96 },
  { id: 'arc-a550m',     brand: 'Intel',  name: 'Arc A550M',                               gaming: { 1080:  60, 1440:  53, 2160:  43 }, productivity:  57 },
  { id: 'arc-a530m',     brand: 'Intel',  name: 'Arc A530M',                               gaming: { 1080:  59, 1440:  52, 2160:  42 }, productivity:  56 },
  { id: 'arc-a370m',     brand: 'Intel',  name: 'Arc A370M',                               gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'arc-a350m',     brand: 'Intel',  name: 'Arc A350M',                               gaming: { 1080:  26, 1440:  23, 2160:  19 }, productivity:  25 },
  { id: 'arc-140t',      brand: 'Intel',  name: 'Arc 140T',                                gaming: { 1080:  39, 1440:  34, 2160:  28 }, productivity:  37 },
  { id: 'arc-130t',      brand: 'Intel',  name: 'Arc 130T',                                gaming: { 1080:  24, 1440:  21, 2160:  17 }, productivity:  23 },
  { id: 'arc-7c',        brand: 'Intel',  name: 'Arc (7-Cores)',                           gaming: { 1080:  34, 1440:  30, 2160:  24 }, productivity:  32 },
  { id: 'arc-8c',        brand: 'Intel',  name: 'Arc (8-Cores)',                           gaming: { 1080:  35, 1440:  31, 2160:  25 }, productivity:  33 },
  // Intel — Arc Integrated
  { id: 'arc-140v',      brand: 'Intel',  name: 'Arc Graphics 140V',                      gaming: { 1080:  41, 1440:  36, 2160:  29 }, productivity:  39 },
  { id: 'arc-130v',      brand: 'Intel',  name: 'Arc Graphics 130V',                      gaming: { 1080:  34, 1440:  30, 2160:  24 }, productivity:  32 },
  { id: 'iris-xe-max',   brand: 'Intel',  name: 'Iris Xe MAX',                             gaming: { 1080:  19, 1440:  17, 2160:  13 }, productivity:  18 },
  { id: 'iris-xe-96eu',  brand: 'Intel',  name: 'Iris Xe G7 (96EU)',                       gaming: { 1080:  15, 1440:  13, 2160:  10 }, productivity:  14 },
  { id: 'iris-xe-80eu',  brand: 'Intel',  name: 'Iris Xe G7 (80EU)',                       gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'iris-xe-g4',    brand: 'Intel',  name: 'Iris Xe G4',                              gaming: { 1080:   7, 1440:   6, 2160:   5 }, productivity:   7 },
  { id: 'intel-g4c',     brand: 'Intel',  name: 'Intel Graphics (4-Cores)',                gaming: { 1080:  19, 1440:  17, 2160:  13 }, productivity:  18 },
  { id: 'uhd-xe750-32',  brand: 'Intel',  name: 'UHD Graphics Xe 750 (32EU)',              gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'uhd-xe750-16',  brand: 'Intel',  name: 'UHD Graphics Xe 750 (16EU)',              gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'uhd-xe-tgl48',  brand: 'Intel',  name: 'UHD Graphics Xe G4 (Tiger Lake, 48EU)',   gaming: { 1080:   8, 1440:   7, 2160:   5 }, productivity:   8 },
  { id: 'uhd-xe-48',     brand: 'Intel',  name: 'UHD Graphics Xe G4 (48EU)',               gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
  { id: 'uhd-xe-24',     brand: 'Intel',  name: 'UHD Graphics Xe (24EU)',                  gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'uhd-770',       brand: 'Intel',  name: 'UHD Graphics 770',                        gaming: { 1080:   7, 1440:   6, 2160:   5 }, productivity:   7 },
  { id: 'uhd-adl64',     brand: 'Intel',  name: 'UHD Graphics (Alder Lake, 64EU)',         gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  { id: 'uhd-jpl32',     brand: 'Intel',  name: 'UHD Graphics (Jasper Lake 32EU)',         gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'uhd-jpl24',     brand: 'Intel',  name: 'UHD Graphics (Jasper Lake 24EU)',         gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'uhd-jpl16',     brand: 'Intel',  name: 'UHD Graphics (Jasper Lake 16EU)',         gaming: { 1080:   5, 1440:   4, 2160:   4 }, productivity:   5 },
  { id: 'uhd-630',       brand: 'Intel',  name: 'UHD Graphics 630',                        gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'uhd-620',       brand: 'Intel',  name: 'UHD Graphics 620',                        gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'uhd-617',       brand: 'Intel',  name: 'UHD Graphics 617',                        gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'uhd-615',       brand: 'Intel',  name: 'UHD Graphics 615',                        gaming: { 1080:   2, 1440:   2, 2160:   2 }, productivity:   2 },
  { id: 'uhd-610',       brand: 'Intel',  name: 'UHD Graphics 610',                        gaming: { 1080:   2, 1440:   2, 2160:   1 }, productivity:   2 },
  { id: 'uhd-605',       brand: 'Intel',  name: 'UHD Graphics 605',                        gaming: { 1080:   1, 1440:   1, 2160:   1 }, productivity:   1 },
  { id: 'uhd-600',       brand: 'Intel',  name: 'UHD Graphics 600',                        gaming: { 1080:   1, 1440:   1, 2160:   1 }, productivity:   1 },
  { id: 'uhd-g',         brand: 'Intel',  name: 'UHD Graphics',                            gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'hd-530',        brand: 'Intel',  name: 'HD Graphics 530',                         gaming: { 1080:   2, 1440:   2, 2160:   2 }, productivity:   2 },
  { id: 'hd-520',        brand: 'Intel',  name: 'HD Graphics 520',                         gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'hd-620',        brand: 'Intel',  name: 'HD Graphics 620',                         gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'hd-615',        brand: 'Intel',  name: 'HD Graphics 615',                         gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'iris-550',      brand: 'Intel',  name: 'Iris Graphics 550',                       gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'iris-650',      brand: 'Intel',  name: 'Iris Graphics 650',                       gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'iris-plus640',  brand: 'Intel',  name: 'Iris Plus Graphics 640',                  gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'iris-plus645',  brand: 'Intel',  name: 'Iris Plus Graphics 645',                  gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'iris-plus655',  brand: 'Intel',  name: 'Iris Plus Graphics 655',                  gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'iris-6100',     brand: 'Intel',  name: 'Iris Pro Graphics 6100',                  gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'hd-6000',       brand: 'Intel',  name: 'HD Graphics 6000',                        gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'iris-plus-g7',  brand: 'Intel',  name: 'Iris Plus Graphics G7',                   gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'hd-610',        brand: 'Intel',  name: 'HD Graphics 610',                         gaming: { 1080:   2, 1440:   2, 2160:   1 }, productivity:   2 },
  // AMD — Laptop & Mobile supplémentaires
  { id: 'rx7800mxtl',    brand: 'AMD',    name: 'Radeon RX 7800M XT',                      gaming: { 1080: 178, 1440: 156, 2160: 126 }, productivity: 169 },
  { id: 'rx6800m',       brand: 'AMD',    name: 'Radeon RX 6800M',                         gaming: { 1080: 115, 1440: 101, 2160:  82 }, productivity: 109 },
  { id: 'rx580l4',       brand: 'AMD',    name: 'Radeon RX 580 (4GB, Laptop)',              gaming: { 1080:  35, 1440:  31, 2160:  25 }, productivity:  33 },
  { id: 'radeon660m',    brand: 'AMD',    name: 'Radeon 660M',                              gaming: { 1080:  16, 1440:  14, 2160:  11 }, productivity:  15 },
  { id: 'radeon740m',    brand: 'AMD',    name: 'Radeon 740M',                              gaming: { 1080:  18, 1440:  16, 2160:  13 }, productivity:  17 },
  { id: 'radeon610m',    brand: 'AMD',    name: 'Radeon 610M',                              gaming: { 1080:   5, 1440:   4, 2160:   4 }, productivity:   5 },
  // AMD — Vega APU / Mobile (non-desktop)
  { id: 'vega10-apu',    brand: 'AMD',    name: 'Radeon RX Vega 10',                       gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
  { id: 'vega9-apu',     brand: 'AMD',    name: 'Radeon Vega 9',                            gaming: { 1080:   9, 1440:   8, 2160:   6 }, productivity:   9 },
  { id: 'vega8-r5-45',   brand: 'AMD',    name: 'Radeon RX Vega 8 (R4000/5000, 35/45W)',   gaming: { 1080:  12, 1440:  11, 2160:   9 }, productivity:  11 },
  { id: 'vega8-r5-15',   brand: 'AMD',    name: 'Radeon RX Vega 8 (R4000/5000, 15W)',      gaming: { 1080:  12, 1440:  11, 2160:   9 }, productivity:  11 },
  { id: 'vega8-r2k',     brand: 'AMD',    name: 'Radeon RX Vega 8 (R2000/3000, 15W)',      gaming: { 1080:   7, 1440:   6, 2160:   5 }, productivity:   7 },
  { id: 'vega7-r5-45',   brand: 'AMD',    name: 'Radeon RX Vega 7 (R4000/5000, 35/45W)',   gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'vega7-r5-15',   brand: 'AMD',    name: 'Radeon RX Vega 7 (R4000/5000, 15W)',      gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  { id: 'vega6-r5-45',   brand: 'AMD',    name: 'Radeon RX Vega 6 (R4000/5000, 35/45W)',   gaming: { 1080:   9, 1440:   8, 2160:   6 }, productivity:   9 },
  { id: 'vega6-r5-15',   brand: 'AMD',    name: 'Radeon RX Vega 6 (R4000/5000, 15W)',      gaming: { 1080:   7, 1440:   6, 2160:   5 }, productivity:   7 },
  { id: 'vega6-r2k',     brand: 'AMD',    name: 'Radeon RX Vega 6 (R2000/3000, 15W)',      gaming: { 1080:   6, 1440:   5, 2160:   4 }, productivity:   6 },
  { id: 'vega5-apu',     brand: 'AMD',    name: 'Radeon RX Vega 5',                        gaming: { 1080:   9, 1440:   8, 2160:   6 }, productivity:   9 },
  { id: 'vega3-apu',     brand: 'AMD',    name: 'Radeon RX Vega 3',                        gaming: { 1080:   5, 1440:   4, 2160:   3 }, productivity:   5 },
  { id: 'radeon-r7-br',  brand: 'AMD',    name: 'Radeon R7 (Bristol Ridge)',               gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'radeon540x',    brand: 'AMD',    name: 'Radeon 540X (2GB)',                        gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
  { id: 'rx640',         brand: 'AMD',    name: 'Radeon RX 640',                            gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
  { id: 'radeon520',     brand: 'AMD',    name: 'Radeon 520 (2GB)',                         gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'radeon530',     brand: 'AMD',    name: 'Radeon 530 (2GB)',                         gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  // AMD — Pro Mobile
  { id: 'pro560x',       brand: 'AMD',    name: 'Radeon Pro 560X (4GB)',                   gaming: { 1080:  16, 1440:  14, 2160:  11 }, productivity:  15 },
  { id: 'pro560',        brand: 'AMD',    name: 'Radeon Pro 560 (4GB)',                    gaming: { 1080:  14, 1440:  12, 2160:  10 }, productivity:  13 },
  { id: 'pro455',        brand: 'AMD',    name: 'Radeon Pro 455 (2GB)',                    gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'pro555',        brand: 'AMD',    name: 'Radeon Pro 555 (2GB)',                    gaming: { 1080:  11, 1440:  10, 2160:   8 }, productivity:  10 },
  { id: 'pro450',        brand: 'AMD',    name: 'Radeon Pro 450 (2GB)',                    gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  { id: 'prowx3200',     brand: 'AMD',    name: 'Radeon Pro WX 3200 (4GB)',               gaming: { 1080:  10, 1440:   9, 2160:   7 }, productivity:  10 },
  { id: 'prowx3100',     brand: 'AMD',    name: 'Radeon PRO WX 3100 (2GB)',               gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
  { id: 'r7m445',        brand: 'AMD',    name: 'Radeon R7 M445 (4GB)',                    gaming: { 1080:   5, 1440:   4, 2160:   4 }, productivity:   5 },
  { id: 'r7m440',        brand: 'AMD',    name: 'Radeon R7 M440 (2GB)',                    gaming: { 1080:   4, 1440:   4, 2160:   3 }, productivity:   4 },
  { id: 'r8m445dx',      brand: 'AMD',    name: 'Radeon R8 M445DX (2GB)',                  gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  { id: 'r5-stoney',     brand: 'AMD',    name: 'Radeon R5 (Stoney Ridge)',                gaming: { 1080:   3, 1440:   3, 2160:   2 }, productivity:   3 },
  // Qualcomm
  { id: 'snap-xe',       brand: 'Qualcomm', name: 'Snapdragon X Elite Adreno GPU',        gaming: { 1080:  14, 1440:  12, 2160:  10 }, productivity:  13 },
  { id: 'adreno690',     brand: 'Qualcomm', name: 'Adreno 690',                            gaming: { 1080:   8, 1440:   7, 2160:   6 }, productivity:   8 },
];

// ===== STATE =====
let selectedRes   = '1080';
let selectedUsage = 'gaming';

// ===== DOM =====
const cpuSelect  = document.getElementById('cpu-select');
const gpuSelect  = document.getElementById('gpu-select');
const calcBtn    = document.getElementById('calc-btn');
const errorBox   = document.getElementById('btool-error');
const resultsBox = document.getElementById('btool-results');

// ===== POPULATE SELECTS =====
function populateSelects() {
  const intelGroup  = document.createElement('optgroup');
  intelGroup.label  = 'Intel';
  const amdCpuGroup = document.createElement('optgroup');
  amdCpuGroup.label = 'AMD';

  CPUS.forEach(cpu => {
    const opt = new Option(cpu.name, cpu.id);
    if (cpu.brand === 'Intel') intelGroup.appendChild(opt);
    else amdCpuGroup.appendChild(opt);
  });

  cpuSelect.appendChild(intelGroup);
  cpuSelect.appendChild(amdCpuGroup);

  const nvidiaGroup   = document.createElement('optgroup');
  nvidiaGroup.label   = 'NVIDIA';
  const amdGpuGroup   = document.createElement('optgroup');
  amdGpuGroup.label   = 'AMD';
  const intelGpuGroup = document.createElement('optgroup');
  intelGpuGroup.label = 'Intel';
  const qualcommGroup = document.createElement('optgroup');
  qualcommGroup.label = 'Qualcomm';

  GPUS.forEach(gpu => {
    const opt = new Option(gpu.name, gpu.id);
    if (gpu.brand === 'NVIDIA')       nvidiaGroup.appendChild(opt);
    else if (gpu.brand === 'Intel')   intelGpuGroup.appendChild(opt);
    else if (gpu.brand === 'Qualcomm') qualcommGroup.appendChild(opt);
    else                              amdGpuGroup.appendChild(opt);
  });

  gpuSelect.appendChild(nvidiaGroup);
  gpuSelect.appendChild(amdGpuGroup);
  gpuSelect.appendChild(intelGpuGroup);
  gpuSelect.appendChild(qualcommGroup);
}

// ===== CALCULATE =====
// Scaling factors derived from real game average FPS drops across resolutions
// (calibrated on RTX 3060: 1080p=105, 1440p=78, 4K=48 in our benchmark data).
// Applied to the GPU's 1080p score to get a resolution-normalised score,
// so every GPU tier scales consistently — matching real game behaviour.
const RES_SCALE = { '1080': 1.0, '1440': 78 / 105, '2160': 48 / 105 };
// Single ideal GPU/CPU ratio for a perfectly balanced system on the unified scale
// (R5 3600 gaming=80, RTX 3060 1080p=105 → 80 = 105 / 1.3125)
const GAMING_IDEAL = 1.3125;
const WORK_IDEAL   = 1.20;

// Returns the GPU gaming score normalised to a resolution-independent scale
function gpuGameScore(gpu, res) {
  return Math.round(gpu.gaming['1080'] * RES_SCALE[res]);
}

function calculate() {
  const cpu = CPUS.find(c => c.id === cpuSelect.value);
  const gpu = GPUS.find(g => g.id === gpuSelect.value);

  cpuSelect.classList.remove('invalid');
  gpuSelect.classList.remove('invalid');
  errorBox.style.display = 'none';

  if (!cpu || !gpu) {
    if (!cpu) cpuSelect.classList.add('invalid');
    if (!gpu) gpuSelect.classList.add('invalid');
    errorBox.style.display = 'flex';
    return;
  }

  const isGaming   = selectedUsage === 'gaming';
  const cpuScore   = isGaming ? cpu.gaming : cpu.productivity;
  // Use normalised GPU score so all GPU tiers scale uniformly with resolution
  const gpuScore   = isGaming ? gpuGameScore(gpu, selectedRes) : gpu.productivity;
  const idealRatio = isGaming ? GAMING_IDEAL : WORK_IDEAL;

  const gpuNorm       = gpuScore / idealRatio;
  const diff          = Math.abs(cpuScore - gpuNorm);
  const maxNorm       = Math.max(cpuScore, gpuNorm);
  const bottleneckPct = Math.round((diff / maxNorm) * 100);
  const bottleneck    = cpuScore < gpuNorm ? 'CPU' : 'GPU';

  displayResults(cpu, gpu, cpuScore, gpuNorm, bottleneckPct, bottleneck);
}

// ===== DISPLAY RESULTS =====
function displayResults(cpu, gpu, cpuScore, gpuScore, pct, bottleneck) {
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

  const maxScore = Math.max(cpuScore, gpuScore);
  cpuBar.style.width = (cpuScore / maxScore * 100) + '%';
  gpuBar.style.width = (gpuScore / maxScore * 100) + '%';

  cpuTag.textContent = '';
  gpuTag.textContent = '';
  cpuTag.className = 'btool-bar-tag';
  gpuTag.className = 'btool-bar-tag';

  if (pct > 0) {
    if (bottleneck === 'CPU') {
      cpuTag.textContent = 'Bottleneck';
      cpuTag.classList.add('btool-bar-tag--bottleneck');
    } else {
      gpuTag.textContent = 'Bottleneck';
      gpuTag.classList.add('btool-bar-tag--bottleneck');
    }
  }

  pctEl.textContent = pct + '%';

  let severity, badgeText, text, tip;
  const isGaming = selectedUsage === 'gaming';

  if (pct < 15) {
    severity  = 'balanced';
    badgeText = 'Configuration équilibrée';
    text = `Votre ${cpu.name} et votre ${gpu.name} sont bien assortis — aucun composant ne bride l'autre de façon significative.`;
    tip  = '';
  } else if (bottleneck === 'CPU') {
    if (pct < 25) {
      severity  = 'low';
      badgeText = 'Bottleneck CPU léger';
      text = isGaming
        ? `Votre ${cpu.name} limite légèrement votre ${gpu.name}. Dans la grande majorité des jeux, l'impact sur vos FPS sera minimal.`
        : `Votre ${cpu.name} est légèrement en dessous de votre ${gpu.name} pour les tâches créatives. L'impact sur vos rendus sera faible.`;
      tip = isGaming
        ? 'Ce niveau de bottleneck est tout à fait acceptable. Augmenter la résolution ou la qualité graphique peut réduire cet écart.'
        : 'Peu d\'impact sur la productivité quotidienne. Ce bottleneck peut se ressentir sur de très longs rendus 3D.';
    } else if (pct < 40) {
      severity  = 'medium';
      badgeText = 'Bottleneck CPU modéré';
      text = isGaming
        ? `Votre ${cpu.name} crée un bottleneck notable sur votre ${gpu.name}. Vous n'exploitez pas pleinement les capacités de votre carte graphique.`
        : `Votre ${cpu.name} ralentit significativement votre ${gpu.name} sur les tâches créatives lourdes.`;
      tip = isGaming
        ? 'Un upgrade CPU améliorerait vos performances. En attendant, jouer en 1440p ou 4K réduit la pression sur le CPU.'
        : 'Un processeur avec plus de cœurs ou une meilleure fréquence boost améliorerait vos temps de rendu et d\'export.';
    } else {
      severity  = 'high';
      badgeText = 'Bottleneck CPU sévère';
      text = isGaming
        ? `Votre ${cpu.name} bride fortement votre ${gpu.name}. Cette combinaison n'est pas optimale — vous perdez une part importante des performances de votre GPU.`
        : `Votre ${cpu.name} est clairement insuffisant pour exploiter votre ${gpu.name} en usage créatif intensif.`;
      tip = isGaming
        ? 'Un upgrade CPU est fortement recommandé. Jouer en haute résolution (1440p/4K) peut temporairement masquer ce bottleneck.'
        : 'Un changement de CPU s\'impose pour exploiter correctement votre GPU en rendu, montage ou modélisation 3D.';
    }
  } else {
    if (pct < 25) {
      severity  = 'low';
      badgeText = 'Bottleneck GPU léger';
      text = isGaming
        ? `Votre ${gpu.name} limite légèrement votre ${cpu.name}. Dans la plupart des jeux et à cette résolution, l'impact sera minime.`
        : `Votre ${gpu.name} est légèrement en dessous de votre ${cpu.name} pour les tâches créatives assistées par GPU.`;
      tip = isGaming
        ? 'Ce niveau est tout à fait normal et acceptable. Baisser légèrement les paramètres graphiques peut libérer du headroom.'
        : 'L\'impact est faible au quotidien. Il se fera davantage sentir sur des rendus GPU intensifs comme Blender.';
    } else if (pct < 40) {
      severity  = 'medium';
      badgeText = 'Bottleneck GPU modéré';
      text = isGaming
        ? `Votre ${gpu.name} crée un bottleneck notable sur votre ${cpu.name}. Votre processeur est sous-exploité à cette résolution.`
        : `Votre ${gpu.name} ralentit les tâches créatives qui dépendent du GPU — rendus, encodage accéléré, IA.`;
      tip = isGaming
        ? 'Un upgrade GPU améliorerait vos performances. Augmenter la résolution peut aussi mieux équilibrer la charge entre CPU et GPU.'
        : 'Un GPU plus puissant avec davantage de VRAM améliorerait sensiblement vos temps de rendu et d\'encodage.';
    } else {
      severity  = 'high';
      badgeText = 'Bottleneck GPU sévère';
      text = isGaming
        ? `Votre ${gpu.name} bride fortement votre ${cpu.name}. Votre processeur attend constamment votre carte graphique, ce qui cause des pertes de FPS importantes.`
        : `Votre ${gpu.name} est clairement le maillon faible de votre configuration pour un usage créatif GPU-intensif.`;
      tip = isGaming
        ? 'Un upgrade GPU est fortement recommandé. Réduire la résolution ou les paramètres peut temporairement compenser.'
        : 'Un GPU plus moderne avec plus de VRAM transformerait radicalement votre expérience créative. Contactez-nous pour un conseil personnalisé.';
    }
  }

  badge.textContent = badgeText;
  badge.className   = `btool-result-badge btool-result-badge--${severity}`;
  textEl.textContent = text;
  tipEl.textContent  = tip;

  resultsBox.classList.add('visible');
  resultsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== EVENTS =====
calcBtn.addEventListener('click', calculate);

cpuSelect.addEventListener('change', () => cpuSelect.classList.remove('invalid'));
gpuSelect.addEventListener('change', () => gpuSelect.classList.remove('invalid'));

document.querySelectorAll('#res-pills .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#res-pills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRes = btn.dataset.value;
  });
});

document.querySelectorAll('#usage-pills .pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#usage-pills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedUsage = btn.dataset.value;

    const resGroup = document.getElementById('res-group');
    resGroup.style.display = selectedUsage === 'gaming' ? '' : 'none';
  });
});

// ===== INIT =====
populateSelects();
