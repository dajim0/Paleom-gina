(function () {
  const categoryOrder = [
    "Geología",
    "Geology",
    "Paisaje",
    "Landscape",
    "Paleontología",
    "Paleontology",
    "Arqueología",
    "Archaeology",
    "Evolución humana",
    "Human evolution",
    "Metodología",
    "Method",
    "Museografía",
    "Museography",
    "Patrimonio",
    "Heritage",
    "Educación",
    "Education",
  ];

  function groupGlossaryItems(items) {
    const grouped = items.reduce((acc, item) => {
      const category = item.category || "General";
      if (!acc.has(category)) acc.set(category, []);
      acc.get(category).push(item);
      return acc;
    }, new Map());

    return [...grouped.entries()].sort(([a], [b]) => {
      const aIdx = categoryOrder.indexOf(a);
      const bIdx = categoryOrder.indexOf(b);
      if (aIdx !== -1 || bIdx !== -1) {
        return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
      }
      return a.localeCompare(b);
    });
  }

  function renderItems(items) {
    return items
      .map(
        (item) => `
          <details class="glossary-entry">
            <summary class="glossary-term">📌 ${item.term}</summary>
            <div class="glossary-definition">${item.def}</div>
          </details>
        `
      )
      .join("");
  }

  function renderGroupedGlossary(items, { openAll = false } = {}) {
    const countLabel = currentLang === "en" ? "terms" : "términos";
    return groupGlossaryItems(items)
      .map(
        ([category, groupItems]) => `
          <details class="glossary-group" ${openAll ? "open" : ""}>
            <summary class="glossary-group__summary">
              <span>${category}</span>
              <strong>${groupItems.length} ${countLabel}</strong>
            </summary>
            <div class="glossary-group__items">
              ${renderItems(groupItems)}
            </div>
          </details>
        `
      )
      .join("");
  }

  function renderGlossary(lang) {
    const list = document.getElementById("glossary-list");
    if (!list || typeof getGlossary !== "function") return;
    const glossaryData = getGlossary(lang);
    list.innerHTML = renderGroupedGlossary(glossaryData);
  }

  function initSearch() {
    const searchInput = document.getElementById("glossary-input");
    const noResults = document.getElementById("no-results");
    const glossaryList = document.getElementById("glossary-list");
    if (!searchInput || !noResults || !glossaryList) return;
    if (searchInput.dataset.pmBound) return;
    searchInput.dataset.pmBound = "1";

    searchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase();
      if (typeof getGlossary !== "function" || typeof currentLang === "undefined") return;
      const glossaryData = getGlossary(currentLang);
      const filtered = glossaryData.filter(
        (item) =>
          item.term.toLowerCase().includes(query) ||
          item.def.toLowerCase().includes(query) ||
          (item.category || "").toLowerCase().includes(query)
      );

      if (filtered.length === 0 && query.length > 0) {
        noResults.classList.remove("d-none");
        glossaryList.classList.add("d-none");
      } else {
        noResults.classList.add("d-none");
        glossaryList.classList.remove("d-none");
        glossaryList.innerHTML = renderGroupedGlossary(filtered, { openAll: query.length > 0 });
      }
    });
  }

  function init() {
    if (typeof currentLang === "undefined" || typeof applyLanguage !== "function") return;
    renderGlossary(currentLang);
    initSearch();
    if (window._pmGlossaryLangHook) return;
    window._pmGlossaryLangHook = true;
    const originalApplyLanguage = window.applyLanguage;
    window.applyLanguage = function (lang) {
      originalApplyLanguage(lang);
      renderGlossary(lang);
      const q = document.getElementById("glossary-input");
      if (q && q.value) q.dispatchEvent(new Event("input"));
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  document.addEventListener("pm:navigation", init);
})();
