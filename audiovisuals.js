(function () {
  function renderAudiovisuals(lang) {
    const grid = document.getElementById("audiovisuals-grid");
    if (!grid || typeof getAudiovisuals !== "function") return;
    const audiovisuals = getAudiovisuals(lang);

    grid.innerHTML = audiovisuals
      .map(
        (av) => `
          <article class="audiovisual-card" role="button" tabindex="0">
            <div class="audiovisual-thumbnail">🎬</div>
            <div class="audiovisual-content">
              <span class="audiovisual-scope">${av.scope}</span>
              <h3 class="audiovisual-title">${av.title}</h3>
              <div class="audiovisual-duration">⏱️ ${av.duration}</div>
              ${av.subtitle ? '<span class="audiovisual-subtitle-badge">✓ Subtítulos</span>' : ""}
            </div>
          </article>
        `
      )
      .join("");

    grid.querySelectorAll(".audiovisual-card").forEach((card) => {
      card.addEventListener("click", function () {
        const title = this.querySelector(".audiovisual-title");
        alert("Reproductor de video:\n" + (title ? title.textContent : ""));
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  function wireFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  function init() {
    if (typeof currentLang === "undefined" || typeof applyLanguage !== "function") return;
    renderAudiovisuals(currentLang);
    wireFilters();
    const originalApplyLanguage = window.applyLanguage;
    window.applyLanguage = function (lang) {
      originalApplyLanguage(lang);
      renderAudiovisuals(lang);
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
