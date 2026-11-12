
const raw = `
H|Hydro|1.008
He|Heli|4.0026
Li|Liti|6.94
Be|Beri|9.0122
B|Bo|10.81
C|Cacbon|12.011
N|Nitơ|14.007
O|Oxi|15.999
F|Flo|18.998
Ne|Neon|20.180
Na|Natri|22.990
Mg|Magie|24.305
Al|Nhôm|26.982
Si|Silic|28.085
P|Photpho|30.974
S|Lưu huỳnh|32.06
Cl|Clo|35.45
Ar|Argon|39.948
K|Kali|39.098
Ca|Canxi|40.078
Sc|Scandi|44.956
Ti|Titan|47.867
V|Vanadi|50.942
Cr|Crom|51.996
Mn|Mangan|54.938
Fe|Sắt|55.845
Co|Coban|58.933
Ni|Niken|58.693
Cu|Đồng|63.546
Zn|Kẽm|65.38
Ga|Gali|69.723
Ge|Gecmani|72.630
As|Asen|74.922
Se|Selen|78.971
Br|Brom|79.904
Kr|Krypton|83.798
Rb|Rubidi|85.468
Sr|Stronti|87.62
Y|Ytri|88.906
Zr|Zirconi|91.224
Nb|Niobi|92.906
Mo|Molypden|95.95
Tc|Tecneti|98
Ru|Rutheni|101.07
Rh|Rodi|102.91
Pd|Paladi|106.42
Ag|Bạc|107.87
Cd|Cadimi|112.41
In|Indi|114.82
Sn|Thiếc|118.71
Sb|Antimon|121.76
Te|Telu|127.60
I|Iốt|126.90
Xe|Xenon|131.29
Cs|Xesi|132.91
Ba|Bari|137.33
La|Lantan|138.91
Ce|Xeri|140.12
Pr|Praseodymi|140.91
Nd|Neodymi|144.24
Pm|Promethi|145
Sm|Samari|150.36
Eu|Europi|151.96
Gd|Gadolini|157.25
Tb|Terbi|158.93
Dy|Dysprosi|162.50
Ho|Holmi|164.93
Er|Erbi|167.26
Tm|Tuli|168.93
Yb|Yterbi|173.05
Lu|Luteti|174.97
Hf|Hafni|178.49
Ta|Tantan|180.95
W|Vonfram|183.84
Re|Rheni|186.21
Os|Osmi|190.23
Ir|Iridi|192.22
Pt|Platin|195.08
Au|Vàng|196.97
Hg|Thủy ngân|200.59
Tl|Tali|204.38
Pb|Chì|207.2
Bi|Bitmut|208.98
Po|Poloni|209
At|Astatin|210
Rn|Radon|222
Fr|Franxi|223
Ra|Radi|226
Ac|Actini|227
Th|Thori|232.04
Pa|Protactini|231.04
U|Urani|238.03
Np|Neptuni|237
Pu|Plutoni|244
Am|Americi|243
Cm|Curi|247
Bk|Berkeli|247
Cf|Californi|251
Es|Einsteini|252
Fm|Fermi|257
Md|Mendelevi|258
No|Nobeli|259
Lr|Lawrenci|266
Rf|Rutherfordi|267
Db|Dubni|268
Sg|Seaborgi|269
Bh|Bohri|270
Hs|Hassi|277
Mt|Meitneri|278
Ds|Darmstadti|281
Rg|Roentgeni|282
Cn|Copernixi|285
Nh|Nihoni|286
Fl|Flerovi|289
Mc|Moscovi|290
Lv|Livermori|293
Ts|Tennessine|294
Og|Oganesson|294
`.trim();

const elements = raw.split("\n").map((line, i) => {
  const [symbol, name, mass] = line.split("|");
  return {
    z: i + 1,
    symbol,
    name,
    mass: Number(mass)
  };
});

const categories = {
  nonmetal: [1,6,7,8,15,16,34],
  noble: [2,10,18,36,54,86,118],
  alkali: [3,11,19,37,55,87],
  alkaline: [4,12,20,38,56,88],
  metalloid: [5,14,32,33,51,52],
  halogen: [9,17,35,53,85,117],
  lanthanoid: Array.from({length:15},(_,i)=>57+i),
  actinoid: Array.from({length:15},(_,i)=>89+i),
  post: [13,31,49,50,81,82,83,84,113,114,115,116],
  transition: [
    21,22,23,24,25,26,27,28,29,30,
    39,40,41,42,43,44,45,46,47,48,
    72,73,74,75,76,77,78,79,80,
    104,105,106,107,108,109,110,111,112
  ]
};

const categoryNames = {
  nonmetal: "Phi kim",
  noble: "Khí hiếm",
  alkali: "Kim loại kiềm",
  alkaline: "Kim loại kiềm thổ",
  transition: "Kim loại chuyển tiếp",
  metalloid: "Á kim",
  halogen: "Halogen",
  lanthanoid: "Họ Lantan",
  actinoid: "Họ Actini",
  post: "Kim loại khác"
};

elements.forEach(el => {
  el.category = Object.keys(categories).find(
    key => categories[key].includes(el.z)
  ) || "post";
});

// Vị trí 18 cột của bảng tuần hoàn
const rows = [
  ["H", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "He"],
  ["Li", "Be", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "B", "C", "N", "O", "F", "Ne"],
  ["Na", "Mg", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "Al", "Si", "P", "S", "Cl", "Ar"],
  ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
  ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
  ["Cs", "Ba", ".", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
["Fr", "Ra", ".", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"]
];
const lanthanoidSymbols = elements
  .filter(e => e.category === "lanthanoid")
  .map(e => e.symbol);

const actinoidSymbols = elements
  .filter(e => e.category === "actinoid")
  .map(e => e.symbol);

const positions = {};

rows.forEach((row, r) => {
  row.forEach((symbol, c) => {
    if (symbol !== ".") positions[symbol] = [r + 1, c + 1];
  });
});

lanthanoidSymbols.forEach((s, i) => {
  positions[s] = [8, i + 4];
});

actinoidSymbols.forEach((s, i) => {
  positions[s] = [9, i + 4];
});

// Tạo bảng
const table = document.getElementById("periodicTable");

elements.forEach(el => {
  const [r, c] = positions[el.symbol];

  const cell = document.createElement("button");
  cell.className = `element ${el.category}`;
  cell.style.gridRow = r;
  cell.style.gridColumn = c;
  cell.dataset.z = el.z;

  cell.innerHTML = `
    <span class="number">${el.z}</span>
    <span class="symbol">${el.symbol}</span>
    <span class="mass">${el.mass}</span>
  `;

  cell.setAttribute("aria-label", `${el.name}, ${el.symbol}`);

  cell.addEventListener("click", () => {
    showDetail(el);
  });

  table.appendChild(cell);
});

// Tìm kiếm
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");

let activeFilter = "all";
let selected = null;

function updateTable() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase("vi");

  document.querySelectorAll(".element").forEach(cell => {
    const el = elements.find(
      e => e.z === Number(cell.dataset.z)
    );

    const matchesSearch =
      el.name.toLocaleLowerCase("vi").includes(query) ||
      el.symbol.toLowerCase().includes(query) ||
      String(el.z) === query;

    const matchesFilter =
      activeFilter === "all" ||
      el.category === activeFilter;

    cell.classList.toggle(
      "dimmed",
      !(matchesSearch && matchesFilter)
    );
  });
}

searchInput.addEventListener("input", updateTable);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  updateTable();
  searchInput.focus();
});

// Bộ lọc
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("active");
    });

    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    updateTable();
  });
});

// Cấu hình electron theo thứ tự orbital
function electronConfiguration(z) {
  const orbitals = [
    ["1s",2],["2s",2],["2p",6],
    ["3s",2],["3p",6],["4s",2],
    ["3d",10],["4p",6],["5s",2],
    ["4d",10],["5p",6],["6s",2],
    ["4f",14],["5d",10],["6p",6],
    ["7s",2],["5f",14],["6d",10],["7p",6]
  ];

  let remaining = z;
  const result = [];

  for (const [orbital, capacity] of orbitals) {
    if (remaining <= 0) break;

    const count = Math.min(remaining, capacity);
    result.push(`${orbital}${count}`);
    remaining -= count;
  }

  return result.join(" ");
}

// Hiển thị thông tin
function showDetail(el) {
  selected = el;

  document.querySelectorAll(".element").forEach(cell => {
    cell.classList.toggle(
      "selected",
      Number(cell.dataset.z) === el.z
    );
  });

  const neutrons = Math.round(el.mass) - el.z;

  document.getElementById("detail").innerHTML = `
    <div class="detail-header">
      <div class="big-element ${el.category}">
        <small>${el.z}</small>
        <strong>${el.symbol}</strong>
        <small>${el.mass}</small>
      </div>

      <div class="detail-info">
        <h2>${el.name}</h2>
        <p>${categoryNames[el.category]}</p>
        <p>Nguyên tố số ${el.z}</p>
      </div>
    </div>

    <div class="detail-grid">
      <div class="info-card">
        <span>Số hiệu nguyên tử</span>
        <strong>${el.z}</strong>
      </div>

      <div class="info-card">
        <span>Nguyên tử khối</span>
        <strong>${el.mass}</strong>
      </div>

      <div class="info-card">
        <span>Số proton</span>
        <strong>${el.z}</strong>
      </div>

      <div class="info-card">
        <span>Số electron (nguyên tử trung hòa)</span>
        <strong>${el.z}</strong>
      </div>

      <div class="info-card">
        <span>Số neutron ước tính</span>
        <strong>${neutrons}</strong>
      </div>

      <div class="info-card">
        <span>Phân loại</span>
        <strong>${categoryNames[el.category]}</strong>
      </div>
    </div>

    <div class="electron-config">
      <strong>Cấu hình electron</strong>
      <p>${electronConfiguration(el.z)}</p>
      <small>
        Lưu ý: cấu hình trên là kết quả điền orbital theo thứ tự
        cơ bản, chưa hiệu chỉnh các trường hợp ngoại lệ.
      </small>
    </div>
  `;

  document.getElementById("detail").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Chế độ sáng/tối
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeBtn.textContent = isLight ? "☾" : "☀";

  localStorage.setItem("periodic-theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("periodic-theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☾";
}
