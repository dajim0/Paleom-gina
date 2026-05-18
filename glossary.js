(function () {
  function renderGlossary(lang) {
    const list = document.getElementById("glossary-list");
    if (!list || typeof getGlossary !== "function") return;
    const glossaryData = getGlossary(lang);
    list.innerHTML = glossaryData
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

  function initSearch() {
    const searchInput = document.getElementById("glossary-input");
    const noResults = document.getElementById("no-results");
    const glossaryList = document.getElementById("glossary-list");
    if (!searchInput || !noResults || !glossaryList) return;

    searchInput.addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase();
      if (typeof getGlossary !== "function" || typeof currentLang === "undefined") return;
      const glossaryData = getGlossary(currentLang);
      const filtered = glossaryData.filter(
        (item) => item.term.toLowerCase().includes(query) || item.def.toLowerCase().includes(query)
      );

      if (filtered.length === 0 && query.length > 0) {
        noResults.classList.remove("d-none");
        glossaryList.classList.add("d-none");
      } else {
        noResults.classList.add("d-none");
        glossaryList.classList.remove("d-none");
        glossaryList.innerHTML = filtered
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
    });
  }

  function init() {
    if (typeof currentLang === "undefined" || typeof applyLanguage !== "function") return;
    renderGlossary(currentLang);
    initSearch();
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
})();
