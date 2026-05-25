(function () {
  const state = { theme: null, playlist: null, scope: null, libraryOpen: false };

  function t(key) {
    return typeof paleomaginaT === "function" ? paleomaginaT(key) : key;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getCatalog(lang) {
    return typeof getAudiovisualCatalog === "function"
      ? getAudiovisualCatalog(lang)
      : { routes: [], playlists: [], items: [], levels: {} };
  }

  function filterItems(items) {
    return items.filter((item) => {
      if (state.theme && item.theme !== state.theme) return false;
      if (state.playlist && !(item.playlists || []).includes(state.playlist)) return false;
      if (state.scope && item.scope !== state.scope) return false;
      return true;
    });
  }

  function hasActiveFilter() {
    return Boolean(state.theme || state.playlist || state.scope);
  }

  function renderRoutes(lang) {
    const el = document.getElementById("av-routes-grid");
    if (!el) return;
    const { routes } = getCatalog(lang);
    el.innerHTML = routes
      .map(
        (route) => `
        <button
          type="button"
          class="av-route-card ${state.theme === route.id ? "is-active" : ""}"
          data-av-theme="${route.id}"
          aria-pressed="${state.theme === route.id}"
        >
          <span class="av-route-card__title">${escapeHtml(route.title)}</span>
          <span class="av-route-card__text">${escapeHtml(route.text)}</span>
        </button>
      `
      )
      .join("");
  }

  function renderPlaylists(lang) {
    const el = document.getElementById("av-playlists");
    if (!el) return;
    const { playlists } = getCatalog(lang);
    const allLabel = t("av_filter_all");
    el.innerHTML =
      `<button type="button" class="av-playlist-btn ${!state.playlist ? "is-active" : ""}" data-av-playlist="" aria-pressed="${!state.playlist}">
        <span class="av-playlist-btn__title">${escapeHtml(allLabel)}</span>
        <span class="av-playlist-btn__text">${escapeHtml(t("audiovisuals_section_lead"))}</span>
      </button>` +
      playlists
        .map(
          (pl) => `
          <button
            type="button"
            class="av-playlist-btn ${state.playlist === pl.id ? "is-active" : ""}"
            data-av-playlist="${pl.id}"
            aria-pressed="${state.playlist === pl.id}"
          >
            <span class="av-playlist-btn__title">${escapeHtml(pl.title)}</span>
            <span class="av-playlist-btn__text">${escapeHtml(pl.text)}</span>
          </button>
        `
        )
        .join("");
  }

  function renderActiveFilters(lang) {
    const el = document.getElementById("av-active-filters");
    if (!el) return;
    const { routes, playlists } = getCatalog(lang);
    const chips = [];
    if (state.theme) {
      const route = routes.find((r) => r.id === state.theme);
      if (route) chips.push({ type: "theme", label: route.title });
    }
    if (state.playlist) {
      const pl = playlists.find((p) => p.id === state.playlist);
      if (pl) chips.push({ type: "playlist", label: pl.title });
    }
    if (state.scope) chips.push({ type: "scope", label: state.scope });

    if (!chips.length) {
      el.innerHTML = "";
      el.classList.add("d-none");
      return;
    }
    el.classList.remove("d-none");
    const clearLabel = t("av_filter_all");
    el.innerHTML =
      chips
        .map(
          (c) =>
            `<span class="av-filter-chip">${escapeHtml(c.label)} <button type="button" class="av-filter-chip__clear" data-av-clear="${c.type}" aria-label="${escapeHtml(clearLabel)}">×</button></span>`
        )
        .join("") +
      `<button type="button" class="btn btn-sm btn-outline-secondary av-clear-all" data-av-clear="all">${escapeHtml(clearLabel)}</button>`;
  }

  function renderLearnList(learn) {
    if (!learn || !learn.length) return "";
    return `
      <div class="av-card-learn">
        <strong class="av-card-label">${escapeHtml(t("av_learn_label"))}</strong>
        <ul class="av-card-list">${learn.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}</ul>
      </div>
    `;
  }

  function renderGlossaryTerms(terms) {
    if (!terms || !terms.length) return "";
    return `
      <div class="av-card-glossary">
        <strong class="av-card-label">${escapeHtml(t("av_glossary_label"))}</strong>
        <div class="av-glossary-tags">
          ${terms.map((term) => `<a class="av-glossary-tag" href="glosario.html?term=${encodeURIComponent(term)}">${escapeHtml(term)}</a>`).join("")}
        </div>
      </div>
    `;
  }

  function renderThumb(item) {
    if (item.planned || !item.youtubeId) {
      return `
        <div class="ratio ratio-16x9 av-planned-thumb" aria-hidden="true">
          <span class="av-planned-thumb__icon">${item.icon || "🎬"}</span>
        </div>
      `;
    }
    const title = escapeHtml(item.title);
    const vid = escapeHtml(item.youtubeId);
    const playLabel = currentLang === "en" ? `Play ${title}` : `Ver ${title}`;
    return `
      <div class="ratio ratio-16x9 video-thumb">
        <img src="https://img.youtube.com/vi/${vid}/hqdefault.jpg" alt="" loading="lazy" decoding="async" />
        <button
          class="video-launch-button"
          type="button"
          data-video-id="${vid}"
          data-video-title="${title}"
          aria-label="${escapeHtml(playLabel)}"
        >
          <span class="play-icon" aria-hidden="true">▶</span>
        </button>
      </div>
    `;
  }

  function getA11yStatus(item) {
    const subtitles = item.a11ySubtitles || (item.subtitle ? "ok" : "pending");
    const transcript = item.a11yTranscript || (item.transcriptFull ? "ok" : item.transcript ? "summary" : "pending");
    const audioDesc = item.a11yAudioDesc || (item.audioDescription ? "ok" : "pending");
    return { subtitles, transcript, audioDesc };
  }

  function renderA11yBadges(item) {
    const { subtitles, transcript, audioDesc } = getA11yStatus(item);
    const badgeClass = (state) =>
      state === "ok" ? "text-bg-success" : state === "summary" ? "text-bg-info" : "text-bg-light text-dark border";
    const labels = {
      subtitles:
        subtitles === "ok" ? t("av_a11y_subtitles_ok") : t("av_a11y_subtitles_pending"),
      transcript:
        transcript === "ok"
          ? t("av_a11y_transcript_ok")
          : transcript === "summary"
            ? t("av_a11y_transcript_summary")
            : t("av_a11y_transcript_pending"),
      audioDesc:
        audioDesc === "ok" ? t("av_a11y_audiodesc_ok") : t("av_a11y_audiodesc_pending"),
    };
    return `<div class="av-a11y-badges mt-2">
      <span class="badge rounded-pill ${badgeClass(subtitles)}">${escapeHtml(labels.subtitles)}</span>
      <span class="badge rounded-pill ${badgeClass(transcript)}">${escapeHtml(labels.transcript)}</span>
      <span class="badge rounded-pill ${badgeClass(audioDesc)}">${escapeHtml(labels.audioDesc)}</span>
    </div>`;
  }

  function renderBadges(item) {
    const badges = [];
    if (item.scope) {
      badges.push(
        `<button type="button" class="badge rounded-pill text-bg-primary av-scope-badge" data-av-scope="${escapeHtml(item.scope)}">${escapeHtml(item.scope)}</button>`
      );
    }
    if (item.planned) {
      badges.push(`<span class="badge rounded-pill text-bg-warning">${escapeHtml(t("av_planned_badge"))}</span>`);
    } else if (item.source === "external") {
      badges.push(`<span class="badge rounded-pill text-bg-secondary">${escapeHtml(t("av_external_badge"))}</span>`);
    }
    if (item.subtitle) {
      badges.push(`<span class="badge rounded-pill text-bg-success">${escapeHtml(t("av_subtitle_badge"))}</span>`);
    }
    return badges.length ? `<div class="av-card-badges">${badges.join("")}</div>` : "";
  }

  function renderCard(item) {
    const title = `${item.icon ? item.icon + " " : ""}${item.title}`;
    const footer = item.planned
      ? `<a class="btn btn-sm btn-outline-primary mt-auto" href="${escapeHtml(item.ambitoLink || "ambitos.html")}">${escapeHtml(t("av_planned_cta"))}</a>`
      : item.scope
        ? `<a class="btn btn-sm btn-link px-0 mt-auto" href="ambitos.html?scope=${encodeURIComponent(item.scope)}">${escapeHtml(t("av_scope_link"))} · ${escapeHtml(item.scope)}</a>`
        : "";

    const details =
      (item.transcript
        ? `
        <details class="av-card-details">
          <summary>${escapeHtml(t("av_transcript_toggle"))}</summary>
          <p>${escapeHtml(item.transcript)}</p>
        </details>`
        : "") +
      (item.teacher
        ? `
        <details class="av-card-details">
          <summary>${escapeHtml(t("av_teacher_toggle"))}</summary>
          <p>${escapeHtml(item.teacher)}</p>
        </details>`
        : "");

    return `
      <article class="col-12 col-lg-6 av-grid-item" role="listitem" data-theme="${escapeHtml(item.theme || "")}" data-scope="${escapeHtml(item.scope || "")}">
        <div class="card h-100 av-item-card ${item.planned ? "av-item-card--planned" : ""}">
          ${renderThumb(item)}
          <div class="card-body d-flex flex-column">
            ${renderBadges(item)}
            ${renderA11yBadges(item)}
            <p class="av-video-title">${escapeHtml(title)}</p>
            <p class="card-text text-muted small mb-2">${escapeHtml(item.duration || "")}</p>
            <p class="card-text flex-grow-1">${escapeHtml(item.summary || "")}</p>
            ${renderLearnList(item.learn)}
            ${renderGlossaryTerms(item.glossary)}
            ${details}
            ${footer}
          </div>
        </div>
      </article>
    `;
  }

  function ensureAudiovisualContentVisible() {
    const catalog = getCatalog(typeof currentLang === "undefined" ? "es" : currentLang);
    const libraryTitle = document.getElementById("av-library-heading");
    if (libraryTitle && catalog?.items) {
      libraryTitle.textContent = t("audiovisuals_available") || libraryTitle.textContent || "Biblioteca de videos";
    }

    document.querySelectorAll(
      ".av-library-section-title, .av-library-card, .av-library-card *, #av-grid .av-item-card, #av-grid .av-video-title"
    ).forEach((el) => {
      el.classList.remove(
        "d-none",
        "pm-cinema-reveal",
        "pm-text-reveal",
        "pm-text-reveal--title",
        "pm-text-reveal--body",
        "pm-cinema-reveal--visible"
      );
      el.classList.add("pm-text-reveal--visible", "pm-section-visible", "is-visible");
      if (el.classList.contains("av-library-card")) {
        el.style.setProperty("display", "flex", "important");
      }
      el.style.setProperty("opacity", "1", "important");
      el.style.setProperty("filter", "none", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("visibility", "visible", "important");
    });
  }

  function updateLibraryPanel() {
    const panel = document.getElementById("av-library-panel");
    const toggle = document.querySelector("[data-av-library-toggle]");
    if (!panel || !toggle) return;

    panel.hidden = false;
    panel.classList.toggle("is-preview", !state.libraryOpen);
    panel.classList.toggle("is-expanded", state.libraryOpen);
    toggle.setAttribute("aria-expanded", String(state.libraryOpen));
    toggle.textContent = t(state.libraryOpen ? "av_library_hide" : "av_library_show");
    ensureAudiovisualContentVisible();
  }

  function renderGrid(lang) {
    const grid = document.getElementById("av-grid");
    const empty = document.getElementById("av-empty");
    if (!grid) return;
    const items = filterItems(getCatalog(lang).items || []);
    const visibleItems = state.libraryOpen ? items : items.slice(0, 2);
    grid.innerHTML = visibleItems.map(renderCard).join("");
    if (empty) empty.classList.toggle("d-none", items.length > 0 || !hasActiveFilter());
    renderActiveFilters(lang);
    ensureAudiovisualContentVisible();
    updateLibraryPanel();
    requestAnimationFrame(ensureAudiovisualContentVisible);
    window.setTimeout(ensureAudiovisualContentVisible, 250);
  }

  function toggleTheme(id) {
    state.theme = state.theme === id ? null : id;
    state.libraryOpen = true;
    renderAll(currentLang);
  }

  function setPlaylist(id) {
    state.playlist = id || null;
    state.libraryOpen = true;
    renderAll(currentLang);
  }

  function setScope(scope) {
    state.scope = state.scope === scope ? null : scope;
    state.libraryOpen = true;
    renderAll(currentLang);
  }

  function clearFilters(type) {
    if (type === "all" || type === "theme") state.theme = null;
    if (type === "all" || type === "playlist") state.playlist = null;
    if (type === "all" || type === "scope") state.scope = null;
    renderAll(currentLang);
  }

  function renderAll(lang) {
    renderRoutes(lang);
    renderPlaylists(lang);
    renderGrid(lang);
  }

  function bindEvents() {
    const root = document.getElementById("audiovisuals-page");
    if (!root || root.dataset.pmAvBound) return;
    root.dataset.pmAvBound = "1";

    root.addEventListener("click", (e) => {
      const routeBtn = e.target.closest("[data-av-theme]");
      if (routeBtn) {
        toggleTheme(routeBtn.dataset.avTheme);
        return;
      }
      const playlistBtn = e.target.closest("[data-av-playlist]");
      if (playlistBtn && playlistBtn.closest("#av-playlists")) {
        setPlaylist(playlistBtn.dataset.avPlaylist || null);
        return;
      }
      const scopeBtn = e.target.closest("[data-av-scope]");
      if (scopeBtn) {
        setScope(scopeBtn.dataset.avScope);
        return;
      }
      const clearBtn = e.target.closest("[data-av-clear]");
      if (clearBtn) {
        clearFilters(clearBtn.dataset.avClear);
        return;
      }
      const libraryToggle = e.target.closest("[data-av-library-toggle]");
      if (libraryToggle) {
        state.libraryOpen = !state.libraryOpen;
        renderGrid(currentLang);
      }
    });
  }

  function initFromUrl() {
    state.theme = null;
    state.playlist = null;
    state.scope = null;
    try {
      const params = new URLSearchParams(window.location.search);
      const scope = params.get("scope");
      const playlist = params.get("playlist");
      if (scope) {
        state.scope = scope.trim().toUpperCase();
        state.libraryOpen = true;
      }
      if (playlist) {
        state.playlist = playlist.trim();
        state.libraryOpen = true;
      }
    } catch (_) { /* ignore */ }
  }

  function init() {
    if (!document.getElementById("audiovisuals-page")) return;
    if (typeof currentLang === "undefined" || typeof getAudiovisualCatalog !== "function") return;
    initFromUrl();
    bindEvents();
    renderAll(currentLang);
    if (window._pmAvLangHook) return;
    window._pmAvLangHook = true;
    const originalApplyLanguage = window.applyLanguage;
    window.applyLanguage = function (lang) {
      originalApplyLanguage(lang);
      renderAll(lang);
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  document.addEventListener("pm:navigation", init);
})();
