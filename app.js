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
