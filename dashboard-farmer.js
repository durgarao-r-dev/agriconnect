/* ==========================================================
   AgriConnect — dashboard-farmer.js (upgraded)
   ========================================================== */

const FARMER_KEYS = {
  rates: "agri_market_prices",
  listings: "agri_farmer_listings",
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSidebarNav();
  initGreeting();
  renderRates();
  renderMyListings();
  initAddProduceForm();
  if (typeof initSoilIntelligence === "function") initSoilIntelligence();
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

function initSidebarNav() {
  const panels = document.querySelectorAll(".dash-panel");
  const navLinks = document.querySelectorAll(".dash-nav a");
  const sidebar = document.getElementById("dashSidebar");

  function go(target) {
    if (!target) target = "overview";
    // Only switch if a matching panel exists; otherwise keep Overview
    const panelExists = Array.from(panels).some(p => p.id === target);
    if (!panelExists) target = "overview";

    navLinks.forEach(l => l.classList.toggle("active", l.dataset.target === target));
    panels.forEach(p => p.classList.toggle("active", p.id === target));
    if (sidebar) sidebar.classList.remove("nav-open");
    const toggle = document.getElementById("dashMenuToggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll("[data-target]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.dataset.target;
      go(target);
      // Keep URL hash in sync for bookmarking / deep links
      if (history.replaceState) {
        history.replaceState(null, "", "#" + target);
      } else {
        location.hash = target;
      }
    });
  });

  // Deep-link support: open the section from the URL hash on load
  // e.g. farmer-dashboard.html#soil → Soil Intelligence panel
  function applyHash() {
    const hash = (location.hash || "").replace(/^#/, "").trim();
    if (hash) go(hash);
    else go("overview");
  }
  applyHash();
  window.addEventListener("hashchange", applyHash);
}

function initGreeting() {
  const name = localStorage.getItem("agri_user_name");
  const el = document.getElementById("farmerName");
  if (name && el) el.textContent = name;
}

function getRates() {
  try {
    const stored = JSON.parse(localStorage.getItem(FARMER_KEYS.rates) || "null");
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (e) {}
  return typeof MARKET_PRICES !== "undefined" ? MARKET_PRICES : [];
}

function renderRates() {
  const body = document.getElementById("farmerRatesBody");
  if (!body) return;
  const rates = getRates();

  body.innerHTML = rates.map(r => {
    const arrow = r.trend === "up" ? "▲ Rising" : r.trend === "down" ? "▼ Falling" : "▬ Steady";
    return `
      <tr>
        <td>${escapeHtml(r.crop)}</td>
        <td>${escapeHtml(r.market)}</td>
        <td class="price-cell">₹${Number(r.price).toLocaleString("en-IN")}</td>
        <td class="trend-${r.trend}">${arrow}</td>
        <td>${escapeHtml(r.updated)}</td>
      </tr>
    `;
  }).join("");

  const best = [...rates].sort((a, b) => b.price - a.price)[0];
  const bestEl = document.getElementById("kpiBestPrice");
  if (bestEl && best) bestEl.textContent = `₹${Number(best.price).toLocaleString("en-IN")} (${best.crop})`;
}

function getListings() {
  try { return JSON.parse(localStorage.getItem(FARMER_KEYS.listings) || "[]"); }
  catch (e) { return []; }
}

function saveListings(listings) {
  try {
    localStorage.setItem(FARMER_KEYS.listings, JSON.stringify(listings));
    return true;
  } catch (e) {
    alert("Could not save listings on this device. Storage may be full or blocked.");
    return false;
  }
}

function renderMyListings() {
  const grid = document.getElementById("myListingsGrid");
  const kpiEl = document.getElementById("kpiMyListings");
  if (!grid) return;

  const farmerName = localStorage.getItem("agri_user_name") || "Farmer";
  const all = getListings();
  const mine = all.filter(l => l.farmerName === farmerName);

  if (kpiEl) kpiEl.textContent = mine.length;

  if (!mine.length) {
    grid.innerHTML = `<p class="empty-state">You haven't added any produce yet. Use <strong>Add Produce</strong> to list your first item.</p>`;
    return;
  }

  grid.innerHTML = mine.map(l => {
    const unit = l.unit || "quintals";
    return `
    <div class="listing-card" data-id="${escapeHtml(String(l.id))}">
      <h4>${escapeHtml(l.name)}</h4>
      <span class="listing-detail">${escapeHtml(String(l.qty))} ${escapeHtml(unit)} · ${escapeHtml(l.location || "")}</span>
      <span class="listing-price">₹${Number(l.price).toLocaleString("en-IN")}/${escapeHtml(unit === "quintals" ? "qtl" : unit)}</span>
      ${l.notes ? `<span class="listing-detail">${escapeHtml(l.notes)}</span>` : ""}
      <span class="listing-detail">Listed: ${escapeHtml(l.listedOn || l.date || "—")}</span>
      <div class="listing-actions">
        <button class="listing-edit" type="button" data-action="edit" data-id="${escapeHtml(String(l.id))}">Edit</button>
        <button class="listing-remove" type="button" data-action="remove" data-id="${escapeHtml(String(l.id))}">Remove</button>
      </div>
    </div>
  `;
  }).join("");

  grid.querySelectorAll("[data-action='remove']").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!confirm("Remove this listing?")) return;
      const id = btn.dataset.id;
      const updated = getListings().filter(l => String(l.id) !== String(id));
      saveListings(updated);
      renderMyListings();
    });
  });

  grid.querySelectorAll("[data-action='edit']").forEach(btn => {
    btn.addEventListener("click", () => startEditListing(btn.dataset.id));
  });
}

function startEditListing(id) {
  const all = getListings();
  const item = all.find(l => String(l.id) === String(id));
  if (!item) return;

  document.getElementById("produceEditId").value = item.id;
  document.getElementById("produceName").value = item.name || "";
  document.getElementById("produceQty").value = item.qty || "";
  document.getElementById("produceUnit").value = item.unit || "quintals";
  document.getElementById("producePrice").value = item.price || "";
  document.getElementById("produceLocation").value = item.location || "";
  document.getElementById("produceNotes").value = item.notes || "";
  if (item.date) document.getElementById("produceDate").value = item.date;

  document.getElementById("addProduceTitle").textContent = "Edit Produce Listing";
  document.getElementById("addProduceSub").textContent = "Update your listing details. Changes are saved on this device only.";
  document.getElementById("produceSubmitBtn").textContent = "Save Changes";
  document.getElementById("produceCancelEdit").hidden = false;

  // switch panel
  document.querySelectorAll(".dash-nav a").forEach(l => l.classList.toggle("active", l.dataset.target === "addproduce"));
  document.querySelectorAll(".dash-panel").forEach(p => p.classList.toggle("active", p.id === "addproduce"));
}

function resetProduceFormMode() {
  document.getElementById("produceEditId").value = "";
  document.getElementById("addProduceTitle").textContent = "Add Fruits & Vegetables";
  document.getElementById("addProduceSub").textContent = "List what you have ready to sell. It'll appear in \"My Listings\" immediately on this device.";
  document.getElementById("produceSubmitBtn").textContent = "Add to My Listings";
  document.getElementById("produceCancelEdit").hidden = true;
  document.getElementById("addProduceForm").reset();
}

function initAddProduceForm() {
  const form = document.getElementById("addProduceForm");
  if (!form) return;

  const cancelBtn = document.getElementById("produceCancelEdit");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      resetProduceFormMode();
      document.querySelectorAll(".dash-nav a").forEach(l => l.classList.toggle("active", l.dataset.target === "mylistings"));
      document.querySelectorAll(".dash-panel").forEach(p => p.classList.toggle("active", p.id === "mylistings"));
    });
  }

  // default date
  const dateEl = document.getElementById("produceDate");
  if (dateEl && !dateEl.value) dateEl.value = new Date().toISOString().slice(0, 10);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const farmerName = localStorage.getItem("agri_user_name") || "Farmer";
    const editId = document.getElementById("produceEditId").value;

    const entry = {
      farmerName,
      name: document.getElementById("produceName").value,
      qty: document.getElementById("produceQty").value,
      unit: document.getElementById("produceUnit").value || "quintals",
      price: document.getElementById("producePrice").value,
      location: document.getElementById("produceLocation").value,
      notes: document.getElementById("produceNotes").value.trim(),
      date: document.getElementById("produceDate").value || new Date().toISOString().slice(0, 10),
      listedOn: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };

    if (!entry.name || !entry.qty || !entry.price || !entry.location) {
      alert("Please fill in produce name, quantity, price, and location.");
      return;
    }

    const all = getListings();
    if (editId) {
      const idx = all.findIndex(l => String(l.id) === String(editId));
      if (idx !== -1) {
        all[idx] = { ...all[idx], ...entry, id: all[idx].id };
      }
    } else {
      entry.id = Date.now();
      all.push(entry);
    }

    if (!saveListings(all)) return;

    resetProduceFormMode();
    if (dateEl) dateEl.value = new Date().toISOString().slice(0, 10);

    const confirm = document.getElementById("addConfirm");
    if (confirm) {
      confirm.hidden = false;
      setTimeout(() => { confirm.hidden = true; }, 4000);
    }

    renderMyListings();
    document.querySelectorAll(".dash-nav a").forEach(l => l.classList.toggle("active", l.dataset.target === "mylistings"));
    document.querySelectorAll(".dash-panel").forEach(p => p.classList.toggle("active", p.id === "mylistings"));
  });
}

function escapeHtml(str) {
  if (str == null) return "";
  const d = document.createElement("div");
  d.textContent = String(str);
  return d.innerHTML;
}
