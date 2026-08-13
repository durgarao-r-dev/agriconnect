/* ==========================================================
   AgriConnect — admin-dashboard.js
   Demo-only: persists "live" edits to localStorage so the public
   homepage market table reflects admin changes immediately.
   ========================================================== */

const STORAGE_KEYS = {
  rates: "agri_market_prices",
  crops: "agri_crops",
  farmerListings: "agri_farmer_listings",
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSidebarNav();
  initGreeting();
  initRatesEditor();
  initCropManager();
  initFarmerListingsView();
  updateKPIs();
  renderSoilReference();
});

function initMobileMenu() {
  const toggle = document.getElementById("dashMenuToggle");
  const sidebar = document.getElementById("dashSidebar");
  if (!toggle || !sidebar) return;
  toggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function renderSoilReference() {
  const el = document.getElementById("adminSoilRef");
  if (!el || typeof SOIL_DISTRICTS === "undefined") return;
  el.innerHTML = SOIL_DISTRICTS.map(d => {
    const names = (d.soils || []).map(id => (SOIL_TYPES[id] && SOIL_TYPES[id].name) || id);
    return `<div style="margin-bottom:14px"><strong>${d.name}</strong><br><span style="font-size:0.86rem;color:#6b6056">${names.join(" · ")}</span></div>`;
  }).join("");
}


/* ---------- Sidebar panel switching ---------- */
function initSidebarNav() {
  const links = document.querySelectorAll(".dash-nav a");
  const panels = document.querySelectorAll(".dash-panel");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      links.forEach(l => l.classList.toggle("active", l === link));
      panels.forEach(p => p.classList.toggle("active", p.id === target));
      const sidebar = document.getElementById("dashSidebar");
      if (sidebar) sidebar.classList.remove("nav-open");
      const toggle = document.getElementById("dashMenuToggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initGreeting() {
  const name = localStorage.getItem("agri_user_name");
  const el = document.getElementById("adminName");
  if (name && el) el.textContent = name;
}

/* ---------- Live rate editing ---------- */
function getRates() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.rates) || "null");
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (e) {}
  return JSON.parse(JSON.stringify(MARKET_PRICES));
}

function initRatesEditor() {
  const body = document.getElementById("adminRatesBody");
  if (!body) return;
  let rates = getRates();

  function render() {
    body.innerHTML = rates.map((r, i) => `
      <tr data-index="${i}">
        <td><input type="text" value="${r.crop}" data-field="crop"></td>
        <td><input type="text" value="${r.market}" data-field="market"></td>
        <td><input type="number" value="${r.price}" data-field="price"></td>
        <td>
          <select data-field="trend">
            <option value="up" ${r.trend === "up" ? "selected" : ""}>▲ Rising</option>
            <option value="down" ${r.trend === "down" ? "selected" : ""}>▼ Falling</option>
            <option value="flat" ${r.trend === "flat" ? "selected" : ""}>▬ Steady</option>
          </select>
        </td>
        <td><input type="text" value="${r.updated}" data-field="updated"></td>
        <td><button class="row-delete-btn" type="button" data-action="delete">Remove</button></td>
      </tr>
    `).join("");
  }

  body.addEventListener("input", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const i = Number(tr.dataset.index);
    const field = e.target.dataset.field;
    if (!field) return;
    rates[i][field] = field === "price" ? Number(e.target.value) : e.target.value;
  });

  body.addEventListener("click", (e) => {
    if (e.target.dataset.action === "delete") {
      const tr = e.target.closest("tr");
      const i = Number(tr.dataset.index);
      rates.splice(i, 1);
      render();
    }
  });

  document.getElementById("addRateBtn")?.addEventListener("click", () => {
    rates.push({ crop: "New Crop", market: "Market Name", price: 0, trend: "flat", updated: "Just now" });
    render();
  });

  document.getElementById("saveRatesBtn")?.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEYS.rates, JSON.stringify(rates));
    const confirm = document.getElementById("saveConfirm");
    confirm.hidden = false;
    setTimeout(() => { confirm.hidden = true; }, 4000);
    updateKPIs();
  });

  document.getElementById("resetRatesBtn")?.addEventListener("click", () => {
    if (!confirm("Reset all rates to the original demo defaults? This discards your edits.")) return;
    rates = JSON.parse(JSON.stringify(MARKET_PRICES));
    localStorage.removeItem(STORAGE_KEYS.rates);
    render();
  });

  render();
}

/* ---------- Crop directory management ---------- */
function getCrops() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.crops) || "null");
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (e) {}
  return JSON.parse(JSON.stringify(CROPS));
}

function initCropManager() {
  const list = document.getElementById("adminCropList");
  if (!list) return;
  const crops = getCrops();

  list.innerHTML = crops.map((c, i) => `
    <div class="admin-crop-row" data-index="${i}">
      <span class="ac-icon">${c.icon}</span>
      <div class="ac-info">
        <strong>${c.name}</strong>
        <span>${c.season} · ${c.soil}</span>
      </div>
      <button class="row-delete-btn" type="button" data-action="remove-crop">Remove</button>
    </div>
  `).join("");

  list.addEventListener("click", (e) => {
    if (e.target.dataset.action === "remove-crop") {
      const row = e.target.closest(".admin-crop-row");
      const i = Number(row.dataset.index);
      crops.splice(i, 1);
      localStorage.setItem(STORAGE_KEYS.crops, JSON.stringify(crops));
      row.remove();
      updateKPIs();
    }
  });
}

/* ---------- Farmer listings review ---------- */
function initFarmerListingsView() {
  const body = document.getElementById("farmerListingsBody");
  if (!body) return;
  let listings = [];
  try { listings = JSON.parse(localStorage.getItem(STORAGE_KEYS.farmerListings) || "[]"); } catch (e) {}

  if (!listings.length) {
    body.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:#a39c8c;">No farmer listings yet.</td></tr>`;
    return;
  }

  body.innerHTML = listings.map(l => `
    <tr>
      <td>${l.farmerName || "Farmer"}</td>
      <td>${l.name}</td>
      <td>${l.qty} quintals</td>
      <td>₹${Number(l.price).toLocaleString("en-IN")}/qtl</td>
      <td>${l.listedOn}</td>
    </tr>
  `).join("");
}

function updateKPIs() {
  const cropsEl = document.getElementById("kpiCrops");
  const listingsEl = document.getElementById("kpiListings");
  if (cropsEl) cropsEl.textContent = getCrops().length;
  if (listingsEl) {
    let listings = [];
    try { listings = JSON.parse(localStorage.getItem(STORAGE_KEYS.farmerListings) || "[]"); } catch (e) {}
    listingsEl.textContent = listings.length;
  }
}
