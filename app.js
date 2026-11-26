const chips = [
  { name: "AMD Ryzen 7 7840U", type: "CPU", maker: "AMD", cores: "8C / 16T", architecture: "Zen 4", tdp: "15–30W", launch: 2023 },
  { name: "Intel Core Ultra 7 155H", type: "CPU", maker: "Intel", cores: "16C / 22T", architecture: "Meteor Lake", tdp: "28–115W", launch: 2023 },
  { name: "Apple M3", type: "CPU", maker: "Apple", cores: "8C / 8T", architecture: "M3", tdp: "~20W", launch: 2023 },
  { name: "NVIDIA GeForce RTX 4060 Laptop", type: "GPU", maker: "NVIDIA", cores: "3072 CUDA", architecture: "Ada Lovelace", tdp: "35–115W", launch: 2023 },
  { name: "AMD Radeon 780M", type: "GPU", maker: "AMD", cores: "12 CU", architecture: "RDNA 3", tdp: "Integrated", launch: 2023 },
  { name: "Intel Arc 140V", type: "GPU", maker: "Intel", cores: "8 Xe cores", architecture: "Xe-LPG", tdp: "Integrated", launch: 2024 }
];

// Common suffixes and related model-name labels. Meanings can vary by generation.
const suffixes = [
  { maker: "AMD", family: "Ryzen laptop CPUs", label: "U", kind: "Suffix", meaning: "Usually an efficient thin-and-light laptop processor class. Exact power limits depend on the chip and laptop." },
  { maker: "AMD", family: "Ryzen laptop CPUs", label: "HS", kind: "Suffix", meaning: "A performance-oriented mobile processor class designed for relatively slim systems. It is not a fixed wattage guarantee." },
  { maker: "AMD", family: "Ryzen laptop CPUs", label: "H", kind: "Suffix", meaning: "A higher-performance mobile processor class, generally used in performance laptops." },
  { maker: "AMD", family: "Ryzen laptop CPUs", label: "HX", kind: "Suffix", meaning: "An enthusiast/high-performance mobile class. Some HX chips use a desktop-derived design; check the individual model." },
  { maker: "AMD", family: "Ryzen laptop CPUs", label: "PRO", kind: "Label", meaning: "Business-focused features such as manageability and security. It is a product designation, not a power class." },
  { maker: "AMD", family: "Ryzen AI laptop CPUs", label: "AI", kind: "Family label", meaning: "Identifies AMD's Ryzen AI branding and chips with an NPU in applicable generations; it does not by itself specify performance." },
  { maker: "AMD", family: "Older / desktop Ryzen", label: "G", kind: "Suffix", meaning: "Historically used for Ryzen processors with integrated Radeon graphics, especially desktop models. Check the exact generation and product." },
  { maker: "AMD", family: "Older / desktop Ryzen", label: "GE", kind: "Suffix", meaning: "Historically denoted a lower-power desktop APU variant. It is not a common current laptop suffix." },
  { maker: "AMD", family: "Desktop Ryzen", label: "X", kind: "Suffix", meaning: "Often marks a higher-clocked desktop variant. It does not have one universal meaning across AMD product families." },
  { maker: "AMD", family: "Desktop Ryzen", label: "X3D", kind: "Suffix", meaning: "Marks a processor with 3D V-Cache. Primarily a desktop gaming designation, not a laptop power class." },
  { maker: "AMD", family: "Desktop Ryzen", label: "XT", kind: "Suffix", meaning: "Used on some refreshed desktop Ryzen models; meaning and availability depend on the product generation." },
  { maker: "AMD", family: "Radeon graphics", label: "M", kind: "Legacy suffix", meaning: "Used in older Radeon mobile GPU names to indicate a mobile part. Not a consistent suffix in current naming." },
  { maker: "AMD", family: "Radeon graphics", label: "XT", kind: "Suffix", meaning: "Can identify a faster variant in some Radeon GPU families. It does not imply one fixed performance increase." },
  { maker: "AMD", family: "Radeon graphics", label: "PRO", kind: "Label", meaning: "Professional graphics product branding; features and certification vary by model." },

  { maker: "Intel", family: "Core / Core Ultra laptop CPUs", label: "U", kind: "Suffix", meaning: "Generally identifies an efficiency-oriented laptop processor. Power and performance differ by generation and laptop design." },
  { maker: "Intel", family: "Core laptop CPUs", label: "P", kind: "Suffix", meaning: "Used for performance-oriented processors in thin-and-light laptops, notably in certain 12th- and 13th-gen Core families." },
  { maker: "Intel", family: "Core / Core Ultra laptop CPUs", label: "H", kind: "Suffix", meaning: "Higher-performance laptop processor class, commonly used in performance and creator laptops." },
  { maker: "Intel", family: "Core / Core Ultra laptop CPUs", label: "HX", kind: "Suffix", meaning: "High-performance laptop class, often based on desktop-class silicon and used in gaming/workstation laptops." },
  { maker: "Intel", family: "Core laptop CPUs", label: "HK", kind: "Legacy suffix", meaning: "An H-class mobile processor with an unlocked multiplier in older Intel naming." },
  { maker: "Intel", family: "Core laptop CPUs", label: "HQ", kind: "Legacy suffix", meaning: "Older high-performance quad-core mobile designation." },
  { maker: "Intel", family: "Core laptop CPUs", label: "Y", kind: "Legacy suffix", meaning: "Older designation for very-low-power mobile processors." },
  { maker: "Intel", family: "Core laptop CPUs", label: "M", kind: "Legacy suffix", meaning: "Used on older mobile processors; exact meaning depended on the generation." },
  { maker: "Intel", family: "Core desktop CPUs", label: "K", kind: "Suffix", meaning: "Unlocked desktop processor, generally permitting CPU overclocking on supported platforms. Not a laptop power class." },
  { maker: "Intel", family: "Core desktop CPUs", label: "F", kind: "Suffix", meaning: "Usually indicates that the processor lacks enabled integrated graphics and needs a discrete graphics solution. Verify the model's specifications." },
  { maker: "Intel", family: "Core desktop CPUs", label: "KF", kind: "Suffix", meaning: "Typically combines the unlocked K designation with F (no enabled integrated graphics). Desktop designation." },
  { maker: "Intel", family: "Core desktop CPUs", label: "T", kind: "Suffix", meaning: "A lower-power desktop processor class. It does not denote a laptop processor." },
  { maker: "Intel", family: "Core / Core Ultra", label: "5 / 7 / 9", kind: "Tier number", meaning: "Product tier within a family, not a suffix or direct performance guarantee. Compare full model numbers and generation." },
  { maker: "Intel", family: "Core Ultra", label: "V", kind: "Series marker", meaning: "Used in Lunar Lake model numbers such as Core Ultra 7 258V. It identifies that series, not a general-purpose suffix meaning." },
  { maker: "Intel", family: "Core desktop CPUs", label: "X / XE", kind: "Legacy suffix", meaning: "Used for certain high-end desktop and workstation processors; not a current general laptop power-class label." },
  { maker: "Intel", family: "Intel graphics", label: "Arc", kind: "Brand", meaning: "Intel's graphics brand, used for discrete GPUs and some integrated graphics. It is a brand name, not a chip suffix." },
  { maker: "Intel", family: "Intel graphics", label: "Xe / Xe-LP / Xe-LPG / Xe-HPG", kind: "Architecture label", meaning: "Graphics architecture or product-family terms. These describe graphics technology, not CPU model suffixes." },

  { maker: "NVIDIA", family: "GeForce laptop GPUs", label: "Laptop GPU", kind: "Product label", meaning: "Identifies the notebook version. Its power limit (TGP), cooling, and laptop configuration can cause large performance differences." },
  { maker: "NVIDIA", family: "GeForce laptop GPUs", label: "Max-Q", kind: "Design label", meaning: "NVIDIA branding for efficiency-focused laptop designs and technologies. It is not a separate GPU tier or a single fixed wattage." },
  { maker: "NVIDIA", family: "GeForce GPUs", label: "Ti", kind: "Suffix", meaning: "Usually indicates a higher-performance variant within a GPU family; the size of the difference varies by generation and laptop." },
  { maker: "NVIDIA", family: "GeForce GPUs", label: "SUPER", kind: "Suffix", meaning: "Used for refreshed GeForce GPU variants in selected generations. Availability and performance uplift vary." },
  { maker: "NVIDIA", family: "GeForce GPUs", label: "M / MX", kind: "Legacy label", meaning: "M marked older mobile GPUs; MX branded entry-level discrete laptop graphics. These are not the standard naming pattern for current RTX laptop GPUs." },
  { maker: "NVIDIA", family: "GeForce GPUs", label: "RTX / GTX", kind: "Brand", meaning: "GeForce product-family branding, not a suffix. RTX generations include dedicated ray-tracing hardware; features vary by model." },

  { maker: "Apple", family: "Apple silicon", label: "Pro", kind: "Tier label", meaning: "Higher-tier Apple silicon with more resources than the base chip, typically including more CPU/GPU capability and memory bandwidth." },
  { maker: "Apple", family: "Apple silicon", label: "Max", kind: "Tier label", meaning: "Higher-end Apple silicon tier, generally offering more GPU capability and memory bandwidth than Pro." },
  { maker: "Apple", family: "Apple silicon", label: "Ultra", kind: "Tier label", meaning: "Top workstation-oriented tier in some Apple silicon generations; historically formed by combining two Max dies. Check the specific generation." },
  { maker: "Apple", family: "Apple silicon", label: "M-series number", kind: "Family and generation", meaning: "The M family name and number identify a chip family/generation (for example, M3). It is not a suffix; capability varies by model and configuration." },

  { maker: "Qualcomm", family: "Snapdragon X laptop processors", label: "X Elite", kind: "Tier label", meaning: "Higher-tier Snapdragon X laptop processor branding. Compare the full SKU for core configuration and clocks." },
  { maker: "Qualcomm", family: "Snapdragon X laptop processors", label: "X Plus", kind: "Tier label", meaning: "Snapdragon X laptop processor tier. Exact core counts and performance depend on the SKU and generation." },
  { maker: "Qualcomm", family: "Snapdragon X laptop processors", label: "X1E / X1P", kind: "Model prefix", meaning: "Prefixes used in Snapdragon X Elite and X Plus model numbers. They identify product families, not a universal technical suffix definition." },
  { maker: "Qualcomm", family: "Snapdragon X laptop processors", label: "PRO", kind: "Platform label", meaning: "Commercial/business platform branding on applicable Snapdragon laptop processors; check the particular model for included features." }
];

const search = document.querySelector("#search");
const typeFilter = document.querySelector("#type-filter");
const chipList = document.querySelector("#chip-list");
const resultCount = document.querySelector("#result-count");
const suffixSearch = document.querySelector("#suffix-search");
const makerFilter = document.querySelector("#maker-filter");
const suffixList = document.querySelector("#suffix-list");
const suffixCount = document.querySelector("#suffix-count");

function renderChips() {
  const query = search.value.trim().toLowerCase();
  const type = typeFilter.value;
  const results = chips.filter((chip) => {
    const searchable = `${chip.name} ${chip.maker} ${chip.architecture}`.toLowerCase();
    return (type === "all" || chip.type === type) && searchable.includes(query);
  });

  resultCount.textContent = `${results.length} chip${results.length === 1 ? "" : "s"} found`;
  chipList.innerHTML = results.length ? results.map((chip) => `
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
  `).join("") : '<p class="empty-state">No chips match that search.</p>';
}

function renderSuffixes() {
  const query = suffixSearch.value.trim().toLowerCase();
  const maker = makerFilter.value;
  const results = suffixes.filter((entry) => {
    const searchable = `${entry.maker} ${entry.family} ${entry.label} ${entry.kind} ${entry.meaning}`.toLowerCase();
    return (maker === "all" || entry.maker === maker) && searchable.includes(query);
  });

  suffixCount.textContent = `${results.length} glossary entr${results.length === 1 ? "y" : "ies"}`;
  suffixList.innerHTML = results.length ? results.map((entry) => `
    <article class="suffix-card">
      <div class="suffix-card-top">
        <span class="badge">${entry.maker}</span>
        <span class="suffix-kind">${entry.kind}</span>
      </div>
      <h3><span class="suffix-label">${entry.label}</span><span class="suffix-family">${entry.family}</span></h3>
      <p>${entry.meaning}</p>
    </article>
  `).join("") : '<p class="empty-state">No glossary entries match that search.</p>';
}

search.addEventListener("input", renderChips);
typeFilter.addEventListener("change", renderChips);
suffixSearch.addEventListener("input", renderSuffixes);
makerFilter.addEventListener("change", renderSuffixes);
renderChips();
renderSuffixes();
