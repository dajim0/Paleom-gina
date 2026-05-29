(function () {
  "use strict";

  const evidenceConfig = {
    "footprint-carnivore": {
      answer: "footprint-trace",
      feedback: "track_feedback_footprint_carnivore",
      hint: "track_hint_footprint_carnivore",
    },
    "footprint-herbivore": {
      answer: "footprint-trace",
      feedback: "track_feedback_footprint_herbivore",
      hint: "track_hint_footprint_herbivore",
    },
    coprolite: {
      answer: "feeding-trace",
      feedback: "track_feedback_coprolite",
      hint: "track_hint_coprolite",
    },
    egg: {
      answer: "reproduction",
      feedback: "track_feedback_egg",
      hint: "track_hint_egg",
    },
    "marine-fossil": {
      answer: "marine",
      feedback: "track_feedback_marine",
      hint: "track_hint_marine",
    },
    "skull-carnivore": {
      answer: "carnivore-body",
      feedback: "track_feedback_skull",
      hint: "track_hint_skull",
    },
    belemnite: {
      answer: "marine",
      feedback: "track_feedback_belemnite",
      hint: "track_hint_belemnite",
    },
    archosaur: {
      answer: "carnivore-body",
      feedback: "track_feedback_archosaur",
      hint: "track_hint_archosaur",
    },
    "skull-herbivore": {
      answer: "herbivore-body",
      feedback: "track_feedback_skull_herbivore",
      hint: "track_hint_skull_herbivore",
    },
    "footprint-armored": {
      answer: "footprint-trace",
      feedback: "track_feedback_footprint_armored",
      hint: "track_hint_footprint_armored",
    },
    nest: {
      answer: "reproduction",
      feedback: "track_feedback_nest",
      hint: "track_hint_nest",
    },
    thalassinoides: {
      answer: "burrow-trace",
      feedback: "track_feedback_thalassinoides",
      hint: "track_hint_thalassinoides",
    },
    raptor: {
      answer: "carnivore-body",
      feedback: "track_feedback_raptor",
      hint: "track_hint_raptor",
    },
    "fossil-tunnel": {
      answer: "burrow-trace",
      feedback: "track_feedback_fossil_tunnel",
      hint: "track_hint_fossil_tunnel",
    },
  };

  function t(key, fallback = "") {
    return window.paleomaginaT?.(key) || fallback;
  }

  function getState(root) {
    if (!root._trackGameState) {
      root._trackGameState = {
        selectedAsset: null,
        solved: new Set(),
        mistakes: 0,
        messageKey: "track_status_start",
        messageFallback: "Selecciona una evidencia para empezar la investigación.",
      };
    }
    return root._trackGameState;
  }

  function getPageRoot(root) {
    return root.closest(".track-training-section") || root.closest("section") || document;
  }

  function getEvidenceCards(root) {
    return [...root.querySelectorAll("[data-track-asset]")];
  }

  function getZoneCards(root) {
    return [...root.querySelectorAll("[data-track-zone]")];
  }

  function getEvidenceName(card) {
    return card?.querySelector("span:not(.track-solved-stamp)")?.textContent?.trim() || "";
  }

  function getEvidenceHint(card) {
    return card?.querySelector("small")?.textContent?.trim() || "";
  }

  function updateSelectedPreview(root) {
    const state = getState(root);
    const selectedCard = state.selectedAsset
      ? root.querySelector(`[data-track-asset="${state.selectedAsset}"]`)
      : null;
    const preview = root.querySelector("[data-track-selection]");
    if (!preview) return;

    const image = preview.querySelector("[data-track-selected-img]");
    const placeholder = preview.querySelector("[data-track-selected-placeholder]");
    const title = preview.querySelector("[data-track-selected-title]");
    const hint = preview.querySelector("[data-track-selected-hint]");
    const sourceImage = selectedCard?.querySelector(".track-evidence-card__placeholder img");

    preview.classList.toggle("has-selection", Boolean(selectedCard));
    if (selectedCard && sourceImage) {
      if (image) {
        image.src = sourceImage.getAttribute("src");
        image.hidden = false;
      }
      if (placeholder) placeholder.hidden = true;
      if (title) {
        title.removeAttribute("data-i18n");
        title.textContent = getEvidenceName(selectedCard);
      }
      if (hint) {
        hint.removeAttribute("data-i18n");
        hint.textContent = getEvidenceHint(selectedCard);
      }
      return;
    }

    if (image) {
      image.removeAttribute("src");
      image.hidden = true;
    }
    if (placeholder) placeholder.hidden = false;
    if (title) {
      title.dataset.i18n = "track_selected_empty_title";
      title.textContent = t("track_selected_empty_title", "Elige una carta");
    }
    if (hint) {
      hint.dataset.i18n = "track_selected_empty_text";
      hint.textContent = t("track_selected_empty_text", "Después pulsa una interpretación de la derecha.");
    }
  }

  function setStatus(root, key, fallback) {
    const state = getState(root);
    state.messageKey = key;
    state.messageFallback = fallback;
    const feedback = root.querySelector("[data-track-feedback]");
    if (feedback) feedback.textContent = t(key, fallback);
  }

  function setAdhocStatus(root, text) {
    const state = getState(root);
    state.messageKey = "";
    state.messageFallback = text;
    const feedback = root.querySelector("[data-track-feedback]");
    if (feedback) feedback.textContent = text;
  }

  function updateScore(root) {
    const state = getState(root);
    const pageRoot = getPageRoot(root);
    const total = Object.keys(evidenceConfig).length;
    const solved = state.solved.size;
    const score = pageRoot.querySelector("[data-track-score]");
    const mistakes = pageRoot.querySelector("[data-track-mistakes]");
    const progress = root.querySelector("[data-track-progress-bar]");

    if (score) score.textContent = `${solved}/${total}`;
    if (mistakes) mistakes.textContent = String(state.mistakes);
    if (progress) progress.style.width = `${Math.round((solved / total) * 100)}%`;
  }

  function updateFinalCard(root) {
    const state = getState(root);
    const complete = state.solved.size === Object.keys(evidenceConfig).length;
    const finalCard = document.querySelector("[data-track-final-card]");
    const finalBadge = finalCard?.querySelector("[data-track-final-badge]");
    const museumReady = document.querySelector("[data-track-museum-ready]");

    if (finalCard) finalCard.classList.toggle("is-track-unlocked", complete);
    if (museumReady) museumReady.classList.toggle("is-hidden", !complete);
    if (finalBadge) {
      const key = complete ? "track_unlocked_badge" : "track_locked_badge";
      finalBadge.dataset.i18n = key;
      finalBadge.textContent = t(key, finalBadge.textContent);
    }
  }

  function renderState(root) {
    const state = getState(root);
    getEvidenceCards(root).forEach((card) => {
      const asset = card.dataset.trackAsset;
      const solved = state.solved.has(asset);
      const selected = state.selectedAsset === asset;
      card.classList.toggle("is-selected", selected);
      card.classList.toggle("is-solved", solved);
      card.setAttribute("aria-pressed", String(selected));
      card.setAttribute("aria-disabled", String(solved));
    });

    getZoneCards(root).forEach((zone) => {
      zone.classList.toggle("is-ready", Boolean(state.selectedAsset));
      zone.setAttribute("aria-pressed", "false");
    });

    updateSelectedPreview(root);
    updateScore(root);
    updateFinalCard(root);
    if (state.messageKey) setStatus(root, state.messageKey, state.messageFallback);
    else setAdhocStatus(root, state.messageFallback);
  }

  function selectEvidence(root, card) {
    const state = getState(root);
    const asset = card?.dataset.trackAsset;
    if (!asset || state.solved.has(asset)) return;
    state.selectedAsset = asset;
    const name = getEvidenceName(card);
    setAdhocStatus(root, `${t("track_status_selected", "Evidencia seleccionada:")} ${name}. ${t("track_status_choose_zone", "Ahora elige una interpretación.")}`);
    renderState(root);
  }

  function flashClass(el, className) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
    window.setTimeout(() => el.classList.remove(className), 700);
  }

  function resolveZone(root, zone) {
    const state = getState(root);
    if (!state.selectedAsset) {
      setStatus(root, "track_status_pick_first", "Primero selecciona una evidencia.");
      return;
    }

    const selectedCard = root.querySelector(`[data-track-asset="${state.selectedAsset}"]`);
    const config = evidenceConfig[state.selectedAsset];
    if (!config) return;

    if (config.answer === zone.dataset.trackZone) {
      state.solved.add(state.selectedAsset);
      state.selectedAsset = null;
      flashClass(zone, "is-correct");
      flashClass(selectedCard, "is-correct");
      setStatus(root, config.feedback, "Bien observado. Esa evidencia encaja con la interpretación.");
      renderState(root);
      if (state.solved.size === Object.keys(evidenceConfig).length) {
        root.classList.add("is-complete");
        setStatus(root, "track_status_complete", "Entrenamiento completado. Ya puedes venir al museo a resolver el caso completo.");
      }
      return;
    }

    state.mistakes += 1;
    flashClass(zone, "is-wrong");
    flashClass(selectedCard, "is-wrong");
    setStatus(root, config.hint, "Observa de nuevo la forma y busca la interpretación más probable.");
    updateScore(root);
  }

  function showHint(root) {
    const state = getState(root);
    if (!state.selectedAsset) {
      setStatus(root, "track_hint_pick_card", "Elige una carta y la pista te ayudará a observarla.");
      return;
    }
    const config = evidenceConfig[state.selectedAsset];
    setStatus(root, config?.hint || "track_hint_pick_card", "Observa de nuevo la forma y los detalles.");
  }

  function shuffleEvidence(root) {
    const grid = root.querySelector(".track-evidence-grid");
    if (!grid) return;
    getEvidenceCards(root)
      .sort(() => Math.random() - 0.5)
      .forEach((card) => grid.appendChild(card));
  }

  function resetGame(root) {
    const state = getState(root);
    state.selectedAsset = null;
    state.solved.clear();
    state.mistakes = 0;
    state.messageKey = "track_status_start";
    state.messageFallback = "Selecciona una evidencia para empezar la investigación.";
    root.classList.remove("is-complete");
    shuffleEvidence(root);
    getEvidenceCards(root).forEach((card) => card.classList.remove("is-correct", "is-wrong"));
    getZoneCards(root).forEach((zone) => zone.classList.remove("is-correct", "is-wrong"));
    renderState(root);
  }

  function bindGame(root) {
    if (root.dataset.trackGameReady === "1") return;
    root.dataset.trackGameReady = "1";

    root.addEventListener("click", (event) => {
      const evidence = event.target.closest("[data-track-asset]");
      if (evidence && root.contains(evidence)) {
        selectEvidence(root, evidence);
        return;
      }

      const zone = event.target.closest("[data-track-zone]");
      if (zone && root.contains(zone)) resolveZone(root, zone);
    });

    root.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const evidence = event.target.closest("[data-track-asset]");
      const zone = event.target.closest("[data-track-zone]");
      if (!evidence && !zone) return;
      event.preventDefault();
      if (evidence) selectEvidence(root, evidence);
      if (zone) resolveZone(root, zone);
    });

    const pageRoot = getPageRoot(root);
    pageRoot.querySelector("[data-track-hint-button]")?.addEventListener("click", () => showHint(root));
    pageRoot.querySelector("[data-track-reset]")?.addEventListener("click", () => resetGame(root));
  }

  function initTrackGame() {
    document.querySelectorAll("[data-track-game]").forEach((root) => {
      bindGame(root);
      renderState(root);
    });
  }

  window.PaleomaginaTrackGame = {
    refresh: initTrackGame,
    resetAll() {
      document.querySelectorAll("[data-track-game]").forEach(resetGame);
    },
  };

  initTrackGame();
  document.addEventListener("pm:navigation", initTrackGame);
  window.addEventListener("pm:languagechange", initTrackGame);
})();
