/* ============================================================
   AgriConnect — Soil Intelligence UI (Farmer Dashboard)
   ============================================================ */

function initSoilIntelligence() {
  const districtSelect = document.getElementById("soilDistrict");
  const soilSelect = document.getElementById("soilType");
  const btn = document.getElementById("soilGetBtn");
  const result = document.getElementById("soilResult");
  const status = document.getElementById("soilStatus");

  if (!districtSelect || !soilSelect || typeof SOIL_DISTRICTS === "undefined") return;

  // Populate districts
  districtSelect.innerHTML =
    '<option value="">— Select District / Area —</option>' +
    SOIL_DISTRICTS.map(d => `<option value="${d.id}">${d.name}</option>`).join("");

  soilSelect.innerHTML = '<option value="">— Select Soil Type —</option>';
  soilSelect.disabled = true;

  districtSelect.addEventListener("change", () => {
    const id = districtSelect.value;
    result.hidden = true;
    result.innerHTML = "";
    if (!id) {
      soilSelect.innerHTML = '<option value="">— Select Soil Type —</option>';
      soilSelect.disabled = true;
      if (status) status.textContent = "Select a district or area to continue.";
      return;
    }
    const district = SOIL_DISTRICTS.find(d => d.id === id);
    if (!district) return;
    soilSelect.innerHTML =
      '<option value="">— Select Soil Type —</option>' +
      district.soils
        .map(sid => {
          const s = SOIL_TYPES[sid];
          return s ? `<option value="${sid}">${s.name}</option>` : "";
        })
        .filter(Boolean)
        .join("");
    soilSelect.disabled = false;
    if (status) status.textContent = "Now select a soil type, then get recommendation.";
  });

  function showRecommendation() {
    const districtId = districtSelect.value;
    const soilId = soilSelect.value;
    if (!districtId) {
      if (status) status.textContent = "Please select a district / area.";
      return;
    }
    if (!soilId) {
      if (status) status.textContent = "Please select a soil type.";
      return;
    }
    const district = SOIL_DISTRICTS.find(d => d.id === districtId);
    const soil = SOIL_TYPES[soilId];
    if (!soil) {
      if (status) status.textContent = "Soil data not found.";
      return;
    }
    if (status) status.textContent = "";

    const cropTags = (soil.crops || [])
      .map(c => `<span class="soil-tag">${escapeSoilHtml(c)}</span>`)
      .join("");
    const bioTags = (soil.biofertilizers || [])
      .map(b => `<span class="soil-tag soil-tag-bio">${escapeSoilHtml(b)}</span>`)
      .join("");

    // Preserve selections — do not reset form or rebuild dropdowns
    const preservedDistrict = districtId;
    const preservedSoil = soilId;

    result.innerHTML = `
      <div class="soil-rec-card">
        <div class="soil-rec-header">
          <h3>🌱 ${escapeSoilHtml(soil.name)}</h3>
          <p class="soil-rec-meta">📍 ${escapeSoilHtml(district ? district.name : "")} · ${escapeSoilHtml(soil.category || "")}</p>
        </div>
        <div class="soil-rec-block">
          <h4>ℹ️ Soil information</h4>
          <p>${escapeSoilHtml(soil.description || "")}</p>
          <p class="soil-rec-meta">💧 Water retention: ${escapeSoilHtml(soil.waterRetention || "—")} · 🚿 Drainage: ${escapeSoilHtml(soil.drainage || "—")}</p>
        </div>
        <div class="soil-rec-block">
          <h4>🌾 Suitable crops</h4>
          <div class="soil-tag-list">${cropTags || "<span class='soil-tag'>No specific crops listed</span>"}</div>
        </div>
        <div class="soil-rec-block">
          <h4>🦠 Biofertilizers</h4>
          <div class="soil-tag-list">${bioTags || "<span class='soil-tag soil-tag-bio'>Consult local expert</span>"}</div>
        </div>
        <div class="soil-rec-block">
          <h4>💧 Management guidance</h4>
          <div class="soil-mgmt">${escapeSoilHtml(soil.management || "Follow local agricultural guidance.")}</div>
        </div>
        <div class="soil-disclaimer">
          <strong>Disclaimer:</strong> ${escapeSoilHtml(typeof SOIL_DISCLAIMER !== "undefined" ? SOIL_DISCLAIMER : "General guidelines only. Use soil testing and consult agricultural experts.")}
        </div>
      </div>
    `;
    result.hidden = false;

    // Re-assert selected values so they stay visible after recommendation
    districtSelect.value = preservedDistrict;
    soilSelect.value = preservedSoil;
    soilSelect.disabled = false;
  }

  btn?.addEventListener("click", showRecommendation);
  soilSelect.addEventListener("change", () => {
    result.hidden = true;
    if (soilSelect.value && status) status.textContent = "Press Get Recommendation.";
  });
}

function escapeSoilHtml(str) {
  if (str == null) return "";
  const d = document.createElement("div");
  d.textContent = String(str);
  return d.innerHTML;
}
