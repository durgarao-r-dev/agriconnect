/* ==========================================================
   AgriConnect — main.js
   Renders dynamic sections from data.js and wires up interactions.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTicker();
  initCrops();
  initMarket();
  initServices();
  initContactForm();
  initScrollTop();
});

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
}

/* ---------- Live-style ticker ---------- */
function initTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track || typeof MARKET_PRICES === "undefined") return;

  const itemsHTML = MARKET_PRICES.map(item => {
    const arrow = item.trend === "up" ? "▲" : item.trend === "down" ? "▼" : "▬";
    const cls = item.trend === "up" ? "price-up" : item.trend === "down" ? "price-down" : "";
    return `<span class="ticker-item"><span class="crop-name">${item.crop}</span> ₹${item.price.toLocaleString("en-IN")}/qtl <span class="${cls}">${arrow}</span></span>`;
  }).join("");

  // duplicate content for seamless infinite scroll
  track.innerHTML = itemsHTML + itemsHTML;
}

/* ---------- Crops grid ---------- */
function initCrops() {
  const grid = document.getElementById("cropGrid");
  if (!grid || typeof CROPS === "undefined") return;

  grid.innerHTML = CROPS.map(crop => `
    <article class="crop-card">
      <span class="crop-icon" aria-hidden="true">${crop.icon}</span>
      <h3>${crop.name}</h3>
      <div class="crop-meta">
        <span><strong>Season:</strong> ${crop.season}</span>
        <span><strong>Soil:</strong> ${crop.soil}</span>
        <span><strong>Water need:</strong> ${crop.water}</span>
      </div>
      <p class="crop-desc">${crop.desc}</p>
    </article>
  `).join("");
}

/* ---------- Market table with search + sort ---------- */
function initMarket() {
  const body = document.getElementById("marketBody");
  const searchInput = document.getElementById("marketSearch");
  const sortSelect = document.getElementById("marketSort");
  if (!body || typeof MARKET_PRICES === "undefined") return;

  function render() {
    let data = [...getLiveMarketData()];
    const q = (searchInput?.value || "").toLowerCase().trim();
    if (q) data = data.filter(d => d.crop.toLowerCase().includes(q));

    const sortBy = sortSelect?.value || "name";
    if (sortBy === "name") data.sort((a, b) => a.crop.localeCompare(b.crop));
    if (sortBy === "high") data.sort((a, b) => b.price - a.price);
    if (sortBy === "low") data.sort((a, b) => a.price - b.price);

    if (data.length === 0) {
      body.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:30px; color:#a39c8c;">No crops match your search.</td></tr>`;
      return;
    }

    body.innerHTML = data.map(row => {
      const arrow = row.trend === "up" ? "▲ Rising" : row.trend === "down" ? "▼ Falling" : "▬ Steady";
      const cls = `trend-${row.trend}`;
      return `
        <tr>
          <td>${row.crop}</td>
          <td>${row.market}</td>
          <td class="price-cell">₹${row.price.toLocaleString("en-IN")}</td>
          <td class="${cls}">${arrow}</td>
          <td>${row.updated}</td>
        </tr>
      `;
    }).join("");
  }

  searchInput?.addEventListener("input", render);
  sortSelect?.addEventListener("change", render);
  render();
}

/* Reads admin-edited / farmer-added prices from localStorage and
   merges them with the base demo dataset, so edits made on the
   admin or farmer dashboards show up here live. */
function getLiveMarketData() {
  try {
    const stored = JSON.parse(localStorage.getItem("agri_market_prices") || "null");
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (e) { /* fall through to defaults */ }
  return MARKET_PRICES;
}

/* ---------- Services: click-to-redirect ---------- */
function initServices() {
  const grid = document.getElementById("serviceGrid");
  if (!grid || typeof SERVICES === "undefined") return;

  grid.innerHTML = SERVICES.map((s, i) => `
    <button class="service-card" data-index="${i}" type="button">
      <span class="service-icon" aria-hidden="true">${s.icon}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <span class="service-link">${s.type === "external" ? "Open service →" : "View on this page →"}</span>
    </button>
  `).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".service-card");
    if (!card) return;
    const service = SERVICES[card.dataset.index];
    if (!service) return;

    if (service.type === "external") {
      window.open(service.target, "_blank", "noopener,noreferrer");
    } else if (service.target && service.target.endsWith(".html") || (service.target && service.target.includes(".html#"))) {
      window.location.href = service.target;
    } else {
      const el = document.querySelector(service.target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* ---------- Contact form (demo: no backend) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.hidden = false;
    form.reset();
    setTimeout(() => { success.hidden = true; }, 5000);
  });
}

/* ---------- Scroll-to-top button ---------- */
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
