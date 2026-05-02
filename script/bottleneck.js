// ===== DATA =====
const CPUS = [
  // Intel
  { id: 'i3-12100f',  brand: 'Intel', name: 'Core i3-12100F',   gaming: 75,  productivity: 72  },
  { id: 'i3-13100f',  brand: 'Intel', name: 'Core i3-13100F',   gaming: 78,  productivity: 75  },
  { id: 'i5-12400f',  brand: 'Intel', name: 'Core i5-12400F',   gaming: 95,  productivity: 102 },
  { id: 'i5-12600k',  brand: 'Intel', name: 'Core i5-12600K',   gaming: 105, productivity: 112 },
  { id: 'i5-13400f',  brand: 'Intel', name: 'Core i5-13400F',   gaming: 100, productivity: 110 },
  { id: 'i5-13600k',  brand: 'Intel', name: 'Core i5-13600K',   gaming: 118, productivity: 130 },
  { id: 'i5-14400f',  brand: 'Intel', name: 'Core i5-14400F',   gaming: 103, productivity: 115 },
  { id: 'i5-14600k',  brand: 'Intel', name: 'Core i5-14600K',   gaming: 122, productivity: 138 },
  { id: 'i7-12700k',  brand: 'Intel', name: 'Core i7-12700K',   gaming: 128, productivity: 175 },
  { id: 'i7-13700k',  brand: 'Intel', name: 'Core i7-13700K',   gaming: 135, productivity: 192 },
  { id: 'i7-14700k',  brand: 'Intel', name: 'Core i7-14700K',   gaming: 140, productivity: 200 },
  { id: 'i9-13900k',  brand: 'Intel', name: 'Core i9-13900K',   gaming: 153, productivity: 248 },
  { id: 'i9-14900k',  brand: 'Intel', name: 'Core i9-14900K',   gaming: 158, productivity: 258 },
  // AMD — Ryzen 3
  { id: 'r3-3100',    brand: 'AMD',   name: 'Ryzen 3 3100',     gaming: 52,  productivity: 50  },
  { id: 'r3-3300x',   brand: 'AMD',   name: 'Ryzen 3 3300X',    gaming: 58,  productivity: 55  },
  { id: 'r3-4100',    brand: 'AMD',   name: 'Ryzen 3 4100',     gaming: 55,  productivity: 52  },
  { id: 'r3-5300g',   brand: 'AMD',   name: 'Ryzen 3 5300G',    gaming: 65,  productivity: 62  },
  // AMD — Ryzen 5
  { id: 'r5-1600',    brand: 'AMD',   name: 'Ryzen 5 1600',     gaming: 55,  productivity: 58  },
  { id: 'r5-2600',    brand: 'AMD',   name: 'Ryzen 5 2600',     gaming: 62,  productivity: 68  },
  { id: 'r5-3600',    brand: 'AMD',   name: 'Ryzen 5 3600',     gaming: 80,  productivity: 85  },
  { id: 'r5-3600x',   brand: 'AMD',   name: 'Ryzen 5 3600X',    gaming: 83,  productivity: 88  },
  { id: 'r5-4500',    brand: 'AMD',   name: 'Ryzen 5 4500',     gaming: 82,  productivity: 85  },
  { id: 'r5-5500',    brand: 'AMD',   name: 'Ryzen 5 5500',     gaming: 78,  productivity: 80  },
  { id: 'r5-5600g',   brand: 'AMD',   name: 'Ryzen 5 5600G',    gaming: 95,  productivity: 98  },
  { id: 'r5-5600',    brand: 'AMD',   name: 'Ryzen 5 5600',     gaming: 97,  productivity: 98  },
  { id: 'r5-5600x',   brand: 'AMD',   name: 'Ryzen 5 5600X',    gaming: 103, productivity: 108 },
  { id: 'r5-7500f',   brand: 'AMD',   name: 'Ryzen 5 7500F',    gaming: 115, productivity: 118 },
  { id: 'r5-7600',    brand: 'AMD',   name: 'Ryzen 5 7600',     gaming: 118, productivity: 122 },
  { id: 'r5-7600x',   brand: 'AMD',   name: 'Ryzen 5 7600X',    gaming: 122, productivity: 128 },
  { id: 'r5-9600',    brand: 'AMD',   name: 'Ryzen 5 9600',     gaming: 128, productivity: 132 },
  { id: 'r5-9600x',   brand: 'AMD',   name: 'Ryzen 5 9600X',    gaming: 132, productivity: 138 },
  // AMD — Ryzen 7
  { id: 'r7-1700',    brand: 'AMD',   name: 'Ryzen 7 1700',     gaming: 58,  productivity: 85  },
  { id: 'r7-2700x',   brand: 'AMD',   name: 'Ryzen 7 2700X',    gaming: 68,  productivity: 108 },
  { id: 'r7-3700x',   brand: 'AMD',   name: 'Ryzen 7 3700X',    gaming: 88,  productivity: 138 },
  { id: 'r7-3800x',   brand: 'AMD',   name: 'Ryzen 7 3800X',    gaming: 90,  productivity: 142 },
  { id: 'r7-5700g',   brand: 'AMD',   name: 'Ryzen 7 5700G',    gaming: 105, productivity: 145 },
  { id: 'r7-5700x',   brand: 'AMD',   name: 'Ryzen 7 5700X',    gaming: 108, productivity: 148 },
  { id: 'r7-5700x3d', brand: 'AMD',   name: 'Ryzen 7 5700X3D',  gaming: 145, productivity: 140 },
  { id: 'r7-5800x',   brand: 'AMD',   name: 'Ryzen 7 5800X',    gaming: 113, productivity: 158 },
  { id: 'r7-5800x3d', brand: 'AMD',   name: 'Ryzen 7 5800X3D',  gaming: 155, productivity: 152 },
  { id: 'r7-7700',    brand: 'AMD',   name: 'Ryzen 7 7700',     gaming: 128, productivity: 182 },
  { id: 'r7-7700x',   brand: 'AMD',   name: 'Ryzen 7 7700X',    gaming: 132, productivity: 188 },
  { id: 'r7-7800x3d', brand: 'AMD',   name: 'Ryzen 7 7800X3D',  gaming: 172, productivity: 168 },
  { id: 'r7-9700x',   brand: 'AMD',   name: 'Ryzen 7 9700X',    gaming: 148, productivity: 200 },
  { id: 'r7-9800x3d', brand: 'AMD',   name: 'Ryzen 7 9800X3D',  gaming: 185, productivity: 180 },
  // AMD — Ryzen 9
  { id: 'r9-3900x',   brand: 'AMD',   name: 'Ryzen 9 3900X',    gaming: 98,  productivity: 195 },
  { id: 'r9-3950x',   brand: 'AMD',   name: 'Ryzen 9 3950X',    gaming: 100, productivity: 225 },
  { id: 'r9-5900x',   brand: 'AMD',   name: 'Ryzen 9 5900X',    gaming: 120, productivity: 215 },
  { id: 'r9-5950x',   brand: 'AMD',   name: 'Ryzen 9 5950X',    gaming: 125, productivity: 248 },
  { id: 'r9-7900',    brand: 'AMD',   name: 'Ryzen 9 7900',     gaming: 135, productivity: 245 },
  { id: 'r9-7900x',   brand: 'AMD',   name: 'Ryzen 9 7900X',    gaming: 140, productivity: 258 },
  { id: 'r9-7900x3d', brand: 'AMD',   name: 'Ryzen 9 7900X3D',  gaming: 155, productivity: 250 },
  { id: 'r9-7950x',   brand: 'AMD',   name: 'Ryzen 9 7950X',    gaming: 158, productivity: 305 },
  { id: 'r9-7950x3d', brand: 'AMD',   name: 'Ryzen 9 7950X3D',  gaming: 178, productivity: 320 },
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
  // AMD 7xxx
  { id: 'rx7600',     brand: 'AMD',    name: 'Radeon RX 7600',            gaming: { 1080: 118, 1440: 88,  2160: 55  }, productivity: 95  },
  { id: 'rx7700xt',   brand: 'AMD',    name: 'Radeon RX 7700 XT',         gaming: { 1080: 150, 1440: 122, 2160: 82  }, productivity: 132 },
  { id: 'rx7800xt',   brand: 'AMD',    name: 'Radeon RX 7800 XT',         gaming: { 1080: 178, 1440: 148, 2160: 108 }, productivity: 162 },
  { id: 'rx7900gre',  brand: 'AMD',    name: 'Radeon RX 7900 GRE',        gaming: { 1080: 205, 1440: 175, 2160: 138 }, productivity: 195 },
  { id: 'rx7900xt',   brand: 'AMD',    name: 'Radeon RX 7900 XT',         gaming: { 1080: 242, 1440: 212, 2160: 170 }, productivity: 232 },
  { id: 'rx7900xtx',  brand: 'AMD',    name: 'Radeon RX 7900 XTX',        gaming: { 1080: 268, 1440: 240, 2160: 198 }, productivity: 260 },
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

  const nvidiaGroup = document.createElement('optgroup');
  nvidiaGroup.label = 'NVIDIA';
  const amdGpuGroup = document.createElement('optgroup');
  amdGpuGroup.label = 'AMD';

  GPUS.forEach(gpu => {
    const opt = new Option(gpu.name, gpu.id);
    if (gpu.brand === 'NVIDIA') nvidiaGroup.appendChild(opt);
    else amdGpuGroup.appendChild(opt);
  });

  gpuSelect.appendChild(nvidiaGroup);
  gpuSelect.appendChild(amdGpuGroup);
}

// ===== CALCULATE =====
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

  const cpuScore = selectedUsage === 'gaming' ? cpu.gaming : cpu.productivity;
  const gpuScore = selectedUsage === 'gaming' ? gpu.gaming[selectedRes] : gpu.productivity;

  const maxScore     = Math.max(cpuScore, gpuScore);
  const bottleneckPct = Math.round((Math.abs(cpuScore - gpuScore) / maxScore) * 100);
  const bottleneck   = cpuScore < gpuScore ? 'CPU' : 'GPU';

  displayResults(cpu, gpu, cpuScore, gpuScore, bottleneckPct, bottleneck);
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

  if (pct < 10) {
    severity  = 'balanced';
    badgeText = 'Configuration équilibrée';
    text = `Votre ${cpu.name} et votre ${gpu.name} sont bien assortis — aucun composant ne bride l'autre de façon significative.`;
    tip  = '';
  } else if (bottleneck === 'CPU') {
    if (pct < 20) {
      severity  = 'low';
      badgeText = 'Bottleneck CPU léger';
      text = isGaming
        ? `Votre ${cpu.name} limite légèrement votre ${gpu.name}. Dans la grande majorité des jeux, l'impact sur vos FPS sera minimal.`
        : `Votre ${cpu.name} est légèrement en dessous de votre ${gpu.name} pour les tâches créatives. L'impact sur vos rendus sera faible.`;
      tip = isGaming
        ? 'Ce niveau de bottleneck est tout à fait acceptable. Augmenter la résolution ou la qualité graphique peut réduire cet écart.'
        : 'Peu d\'impact sur la productivité quotidienne. Ce bottleneck peut se ressentir sur de très longs rendus 3D.';
    } else if (pct < 35) {
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
    if (pct < 20) {
      severity  = 'low';
      badgeText = 'Bottleneck GPU léger';
      text = isGaming
        ? `Votre ${gpu.name} limite légèrement votre ${cpu.name}. Dans la plupart des jeux et à cette résolution, l'impact sera minime.`
        : `Votre ${gpu.name} est légèrement en dessous de votre ${cpu.name} pour les tâches créatives assistées par GPU.`;
      tip = isGaming
        ? 'Ce niveau est tout à fait normal et acceptable. Baisser légèrement les paramètres graphiques peut libérer du headroom.'
        : 'L\'impact est faible au quotidien. Il se fera davantage sentir sur des rendus GPU intensifs comme Blender.';
    } else if (pct < 35) {
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
