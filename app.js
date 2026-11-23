const chips = [
  { name: "AMD Ryzen 7 7840U", type: "CPU", maker: "AMD", cores: "8C / 16T", architecture: "Zen 4", tdp: "15–30W", launch: 2023 },
  { name: "Intel Core Ultra 7 155H", type: "CPU", maker: "Intel", cores: "16C / 22T", architecture: "Meteor Lake", tdp: "28–115W", launch: 2023 },
  { name: "Apple M3", type: "CPU", maker: "Apple", cores: "8C / 8T", architecture: "M3", tdp: "~20W", launch: 2023 },
  { name: "NVIDIA GeForce RTX 4060 Laptop", type: "GPU", maker: "NVIDIA", cores: "3072 CUDA", architecture: "Ada Lovelace", tdp: "35–115W", launch: 2023 },
  { name: "AMD Radeon 780M", type: "GPU", maker: "AMD", cores: "12 CU", architecture: "RDNA 3", tdp: "Integrated", launch: 2023 },
  { name: "Intel Arc 140V", type: "GPU", maker: "Intel", cores: "8 Xe cores", architecture: "Xe-LPG", tdp: "Integrated", launch: 2024 }
];

const search = document.querySelector("#search");
const typeFilter = document.querySelector("#type-filter");
const chipList = document.querySelector("#chip-list");
const resultCount = document.querySelector("#result-count");

function render() {
  const query = search.value.trim().toLowerCase();
  const type = typeFilter.value;
  const results = chips.filter((chip) => {
    const searchable = `${chip.name} ${chip.maker} ${chip.architecture}`.toLowerCase();
    return (type === "all" || chip.type === type) && searchable.includes(query);
  });

  resultCount.textContent = `${results.length} chip${results.length === 1 ? "" : "s"} found`;
  chipList.innerHTML = results.map((chip) => `
    <article class="chip-card">
      <span class="badge">${chip.type} · ${chip.maker}</span>
      <h2>${chip.name}</h2>
      <div class="chip-meta">
        <div class="stat"><span>Cores</span><strong>${chip.cores}</strong></div>
        <div class="stat"><span>Architecture</span><strong>${chip.architecture}</strong></div>
        <div class="stat"><span>Power</span><strong>${chip.tdp}</strong></div>
        <div class="stat"><span>Launch</span><strong>${chip.launch}</strong></div>
      </div>
    </article>
  `).join("");
}

search.addEventListener("input", render);
typeFilter.addEventListener("change", render);
render();

// ---- Chip suffix / power-class reference ----
const suffixes = [
  { code: "U", maker: "Intel & AMD", name: "Ultra-low power", detail: "~9–15W TDP. Built for thin-and-light laptops and long battery life. Best for office work, browsing, streaming; not ideal for sustained heavy loads.", tone: "eco" },
  { code: "P", maker: "Intel (12th gen+)", name: "Performance thin-and-light", detail: "~28W TDP. A middle ground between U and H — more headroom in slim chassis. Good for heavier multitasking and light creative work.", tone: "mid" },
  { code: "G7 / G5", maker: "AMD (Ryzen 4000/5000 era)", name: "Graphics tier marker", detail: "The G-number indicated the strength of the integrated Radeon GPU (G7 = strongest, e.g. Vega 11 / Radeon Graphics 8 CU). On newer chips this role is filled by model numbers like 780M.", tone: "gpu" },
  { code: "H", maker: "Intel & AMD", name: "High performance", detail: "~45W TDP. Found in gaming and creator laptops. Much higher sustained clocks, but hotter and shorter battery life.", tone: "perf" },
  { code: "HS", maker: "AMD (and Intel in some SKUs)", name: "High performance, slim", detail: "~35W tuned variant of H. Near-H performance in thinner chassis with tighter power/thermal limits.", tone: "perf" },
  { code: "HX", maker: "Intel & AMD", name: "Enthusiast / desktop-class", detail: "55W+ and often unlocked. Desktop silicon repackaged for the biggest gaming/workstation laptops. Maximum performance, minimal concern for battery or noise.", tone: "max" },
  { code: "Y", maker: "Intel (older)", name: "Extreme low power", detail: "~5–7W TDP for fanless and ultra-slate devices. Superseded on recent Intel parts by the U class and Core Ultra naming.", tone: "eco" },
  { code: "U-H spectrum (Apple)", maker: "Apple", name: "No suffix system", detail: "Apple's M-series doesn't use U/P/H letters at all. Instead, chips are tiered by model (M3 → M3 Pro → M3 Max) and each chip mixes Performance (P) and Efficiency (E) cores internally. Active vs fanless cooling is what decides real-world speed, not a letter.", tone: "apple" },
  { code: "X / XE", maker: "Intel", name: "Exceptional / unlocked", detail: "Top-binned, highest-clocks part of a generation (e.g. i9-12900HK/XE variants). Rare in laptops; means 'best bin, highest power envelope'.", tone: "max" },
  { code: "K", maker: "Intel (mostly desktop)", name: "Unlocked multiplier", detail: "Rarely seen in laptops (some XE/HX parts allow overclocking). K marks an unlocked chip intended for enthusiast tuning.", tone: "max" },
  { code: "F", maker: "Intel", name: "No integrated graphics", detail: "Chip without an iGPU — requires a discrete GPU. Uncommon in laptops since most designs rely on the iGPU for battery-friendly display output.", tone: "note" },
  { code: "vPro / Business (T-family)", maker: "Intel", name: "Manageability / vPro branding", detail: "Some OEMs use letters like T or vPro tags to mark manageability-enabled SKUs aimed at fleets rather than raw performance tiers.", tone: "note" }
];

const ramModes = [
  { mode: "Single-channel (1x stick)", effect: "Only one 64-bit memory path is active. Bandwidth is halved vs dual-channel — typically 10–30% lower FPS on integrated graphics and slightly higher latency/stutter in CPU-heavy tasks. Fine for basic use; the biggest real-world upgrade you can make is adding a second matching stick.", tone: "bad" },
  { mode: "Dual-channel (2 matched sticks)", effect: "Two 64-bit paths run in parallel, roughly doubling bandwidth (~128-bit total). The sweet spot for laptops: best iGPU performance, smoother multitasking, minimal battery cost. Always prefer 2x smaller sticks over 1x large stick if you use integrated graphics.", tone: "good" },
  { mode: "Flex / Asymmetric mode", effect: "When two sticks differ in size (e.g. 8GB + 16GB), the matching portion (8+8=16GB) runs dual-channel and the remainder (8GB) runs single-channel. Performance sits between the two modes — better than pure single-channel, slightly worse than true dual-channel if you exceed the symmetric range.", tone: "mid" },
  { mode: "Quad-channel", effect: "Four memory paths (~256-bit). Essentially absent from mainstream laptops due to board space and power; found only in workstation/server-class mobile platforms. Massive bandwidth for scientific workloads and huge VMs; negligible benefit for gaming.", tone: "good" },
  { mode: "Channel mode & iGPUs", effect: "Integrated GPUs have no dedicated VRAM and read from system RAM, so they feel channel loss hardest: single-channel can cut iGPU frame rates by 20–40%. If you buy a laptop with Radeon 780M / Intel Arc graphics, dual-channel RAM is effectively mandatory for advertised performance.", tone: "tip" },
  { mode: "Mixed speed/timings", effect: "Mismatched modules run at the slowest stick's speed and loosest common timings, and may fall back to single-channel or fail to POST. Buy kits rated together (or identical modules) to avoid silently losing bandwidth.", tone: "bad" }
];

function infoCard(item, titleKey) {
  return `
    <article class="info-card tone-${item.tone}">
      <div class="info-head">
        <span class="badge">${item.code || item.mode}</span>
        ${item.maker ? `<span class="info-maker">${item.maker}</span>` : ""}
      </div>
      <h3>${item.name || item.mode}</h3>
      <p>${item.detail || item.effect}</p>
    </article>`;
}

document.querySelector("#suffix-list").innerHTML = suffixes.map((s) => infoCard(s)).join("");
document.querySelector("#ram-list").innerHTML = ramModes.map((m) => infoCard(m)).join("");

// ---- Who actually manufactures (fabs) each chip brand ----
const fabBrands = [
  { code: "Apple", maker: "Designer only (fabless)", name: "Designed by Apple, fabbed by TSMC", detail: "Every M-series chip (M1 → M4 and beyond) is designed in California but manufactured by TSMC — on N5 for M1/M2, N3B/N3E for M3/M4, at fabs in Hsinchu and Kaohsiung, Taiwan. Apple books huge volumes of TSMC's most advanced nodes; packaging happens largely in Asia as well.", tone: "apple" },
  { code: "AMD", maker: "Fabless since 2009", name: "Designed by AMD, fabbed mostly by TSMC", detail: "AMD spun off its factories into GlobalFoundries in 2009. Today all modern laptop chips — Ryzen 6000/7000/8000/9000 CPUs and Radeon iGPUs/dGPUs — are made by TSMC (7nm → 4nm, with Zen 5 parts on N4/N3). Some older I/O and RF companion chips still came from GlobalFoundries.", tone: "amd" },
  { code: "Intel", maker: "IDM (owns its fabs)", name: "Designed AND manufactured by Intel", detail: "Intel is the last major x86 vendor that builds its own silicon: Core U/P/H laptop chips were fabbed on Intel 7 / Intel 4 in Oregon, Arizona, Ireland and Israel. Since Meteor Lake (Core Ultra), Intel also uses TSMC for some tiles (e.g. the GPU tile) and Samsung for others — a hybrid 'Intel Foundry + external foundry' model — while expanding new fabs in Arizona, Germany and Poland.", tone: "intel" },
  { code: "NVIDIA", maker: "Fabless", name: "Designed by NVIDIA, fabbed by TSMC", detail: "NVIDIA owns no factories. GeForce RTX laptop GPUs (Ampere, Ada Lovelace, Blackwell) are manufactured by TSMC — typically on 8N/4N-class nodes. The 'Laptop GPU' die is often a binned/downclocked version of the desktop chip, built at the same TSMC fabs.", tone: "nvidia" },
  { code: "Qualcomm", maker: "Fabless", name: "Snapdragon X: designed by Qualcomm, fabbed by TSMC", detail: "The Snapdragon X Elite/X Plus ARM laptop chips are made by TSMC on N4. Qualcomm (like Apple and AMD) relies entirely on TSMC for its cutting-edge mobile/laptop silicon.", tone: "gpu" },
  { code: "MediaTek", maker: "Fabless", name: "Fabbed by TSMC (and occasionally others)", detail: "Behind fewer mainstream laptops today, but its Dimensity/companion silicon is TSMC-manufactured; MediaTek designs SoCs used in Chromebooks and budget Windows arm machines.", tone: "note" },
  { code: "Samsung Exynos", maker: "IDM", name: "Designed and fabbed by Samsung", detail: "Samsung both designs and manufactures its own chips in its Korean fabs (Hwaseong/Pyeongtaek). It also runs a foundry business making chips for NVIDIA (older modems/GPUs historically) and others — with mixed results on the most advanced nodes versus TSMC.", tone: "note" }
];

const foundries = [
  { mode: "TSMC (Taiwan)", effect: "The world's #1 contract factory — makes the vast majority of cutting-edge chips: Apple M-series, AMD Ryzen/Radeon, NVIDIA GeForce, Qualcomm Snapdragon. Leading nodes (N5/N4/N3) run in Hsinchu, Taichung and Kaohsiung, with new fabs in Arizona, Japan and Germany. If your premium laptop chip isn't Intel, it's almost certainly TSMC-made.", tone: "good" },
  { mode: "Intel Foundry (USA/EU)", effect: "Intel's own factories, now also selling capacity to outside customers. Produces Intel's Core series plus selected partners' chips on Intel 3/Intel 18A nodes. Fabs in Oregon, Arizona, New Mexico; under construction in Ohio, Germany and Poland.", tone: "perf" },
  { mode: "Samsung Foundry (Korea)", effect: "#2 contract maker. Fabbed some older NVIDIA and Qualcomm parts and Intel's low-power Atom/SoC tiles (Meteor Lake's base tile came from Samsung). Strong in memory (DRAM/NAND) — the RAM in your laptop likely comes from Samsung, SK hynix or Micron regardless of CPU maker.", tone: "mid" },
  { mode: "GlobalFoundries", effect: "The company AMD sold its fabs to in 2009. No longer chases the smallest nodes; makes older/specialty chips — some AMD I/O dies, RF and power-management components found inside laptops.", tone: "eco" },
  { mode: "SMIC / Hua Hong (China)", effect: "Chinese contract fabs working mainly on mature nodes (28nm+). Rarely seen in premium Western laptop CPUs, but increasingly relevant for budget components, controllers and domestic-market SoCs.", tone: "note" },
  { mode: "Assembly & test (OSATs)", effect: "After wafer fabrication, chips are cut, packaged and tested by firms like ASE, Amkor and JCET — mostly in Taiwan, Malaysia, South Korea and China. 'Made where?' therefore has three answers: wafer fab, packaging site, and final assembly of the laptop itself.", tone: "tip" }
];

document.querySelector("#fab-brand-list").innerHTML = fabBrands.map((s) => infoCard(s)).join("");
document.querySelector("#fab-foundry-list").innerHTML = foundries.map((m) => infoCard(m)).join("");

// ---- Tabs ----
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
    panels.forEach((p) => {
      const active = p.id === `panel-${tab.dataset.tab}`;
      p.classList.toggle("active", active);
      p.hidden = !active;
    });
  });
});
