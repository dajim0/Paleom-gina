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

  function updateTrainingProgress(pageRoot) {
    const classifierComplete = pageRoot?.dataset.trackClassifierComplete === "true";
    const memoryComplete = pageRoot?.dataset.trackMemoryComplete === "true";
    const finalComplete = classifierComplete && memoryComplete;
    const finalCard = document.querySelector("[data-track-final-card]");
    const finalBadge = finalCard?.querySelector("[data-track-final-badge]");
    const museumReady = document.querySelector("[data-track-museum-ready]");

    if (finalCard) finalCard.classList.toggle("is-track-unlocked", finalComplete);
    if (museumReady) museumReady.classList.toggle("is-hidden", !finalComplete);
    if (finalBadge) {
      const key = finalComplete ? "track_unlocked_badge" : "track_locked_badge";
      finalBadge.dataset.i18n = key;
      finalBadge.textContent = t(key, finalBadge.textContent);
    }
  }

  function updateFinalCard(root) {
    const state = getState(root);
    const pageRoot = getPageRoot(root);
    pageRoot.dataset.trackClassifierComplete = String(state.solved.size === Object.keys(evidenceConfig).length);
    updateTrainingProgress(pageRoot);
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

  const imageBase = "../images/IMAGENES%20JUEGO/";
  const memoryCharacters = {
    bedmar: {
      name: "track_profile_bedmar_name",
      badge: "track_profile_bedmar_badge",
      profile: "track_profile_bedmar_text",
      lead: "track_memory_bedmar_lead",
      resultTitle: "track_result_bedmar_title",
      resultText: "track_result_bedmar_text",
      pairs: [
        ["bedmar-teeth", "track_card_sharp_teeth", "CRANEO_CARNIVORO.png", "track_card_predator_diet", "ARCOSAURIO_DE_CAMBIL.png", "track_pair_bedmar_teeth_title", "track_pair_bedmar_teeth_text"],
        ["bedmar-track", "track_card_three_toes", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_card_hunter_step", "TEROPODO-RAPTOR_DE_SANTISTEBAN.png", "track_pair_bedmar_footprint_title", "track_pair_bedmar_footprint_text"],
        ["bedmar-food", "track_card_coprolite", "COPROLITO.png", "track_card_food_trace", "CRANEO_CARNIVORO.png", "track_pair_bedmar_feeding_title", "track_pair_bedmar_feeding_text"],
        ["bedmar-nest", "track_card_egg", "HUEVO_DE_DINOSAURIO.png", "track_card_nest", "NIDO_CON_HUEVOS.png", "track_pair_bedmar_nest_title", "track_pair_bedmar_nest_text"],
        ["bedmar-mud", "track_card_deep_track", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_card_recent_step", "FONDO_DE_BARRO_TRIASICO.png", "track_pair_bedmar_mud_title", "track_pair_bedmar_mud_text"],
        ["bedmar-clue", "track_card_silhouette", "SILUETA_MISTERIOSA_CON_HUEVO.png", "track_card_investigation", "ICONO%20PISTA.png", "track_pair_bedmar_clue_title", "track_pair_bedmar_clue_text"],
        ["bedmar-skull", "track_card_carnivore_skull", "CRANEO_CARNIVORO.png", "track_card_land_predator", "ARCOSAURIO_DE_CAMBIL.png", "track_pair_bedmar_skull_title", "track_pair_bedmar_skull_text"],
        ["bedmar-pursuit", "track_card_hunter_step", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_card_silhouette", "SILUETA_MISTERIOSA_CON_HUEVO.png", "track_pair_bedmar_pursuit_title", "track_pair_bedmar_pursuit_text"],
      ],
    },
    santisteban: {
      name: "track_profile_santisteban_name",
      badge: "track_profile_santisteban_badge",
      profile: "track_profile_santisteban_text",
      lead: "track_memory_santisteban_lead",
      resultTitle: "track_result_santisteban_title",
      resultText: "track_result_santisteban_text",
      pairs: [
        ["santisteban-run", "track_card_raptor", "TEROPODO-RAPTOR_DE_SANTISTEBAN.png", "track_card_fast_stride", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_pair_santisteban_runner_title", "track_pair_santisteban_runner_text"],
        ["santisteban-claws", "track_card_claws", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_card_hunt", "CRANEO_CARNIVORO.png", "track_pair_santisteban_claws_title", "track_pair_santisteban_claws_text"],
        ["santisteban-eggs", "track_card_nest", "NIDO_CON_HUEVOS.png", "track_card_egg", "HUEVO_DE_DINOSAURIO.png", "track_pair_santisteban_eggs_title", "track_pair_santisteban_eggs_text"],
        ["santisteban-compare", "track_card_old_track", "HUELLA_HERBIVORA_REDONDEADA.png", "track_card_compare", "ICONO%20PISTA.png", "track_pair_santisteban_mistake_title", "track_pair_santisteban_mistake_text"],
        ["santisteban-track", "track_card_three_toes", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_card_biped", "TEROPODO-RAPTOR_DE_SANTISTEBAN.png", "track_pair_santisteban_track_title", "track_pair_santisteban_track_text"],
        ["santisteban-body", "track_card_body", "TEROPODO-RAPTOR_DE_SANTISTEBAN.png", "track_card_carnivore", "CRANEO_CARNIVORO.png", "track_pair_santisteban_body_title", "track_pair_santisteban_body_text"],
        ["santisteban-recent", "track_card_recent_step", "FONDO_DE_BARRO_TRIASICO.png", "track_card_fast_stride", "HUELLA_CARNIVORA_TRIDACTILA.png", "track_pair_santisteban_recent_title", "track_pair_santisteban_recent_text"],
        ["santisteban-distraction", "track_card_armored_track", "HUELLA_HERVIBORA_ACORAZADA.png", "track_card_compare", "ICONO%20PISTA.png", "track_pair_santisteban_distraction_title", "track_pair_santisteban_distraction_text"],
      ],
    },
    omanite: {
      name: "track_profile_omanite_name",
      badge: "track_profile_omanite_badge",
      profile: "track_profile_omanite_text",
      lead: "track_memory_omanite_lead",
      resultTitle: "track_result_omanite_title",
      resultText: "track_result_omanite_text",
      pairs: [
        ["omanite-shell", "track_card_spiral_shell", "AMMONITE.png", "track_card_omanite", "AMMONITE.png", "track_pair_omanite_shell_title", "track_pair_omanite_shell_text"],
        ["omanite-sea", "track_card_ancient_sea", "AMMONITE.png", "track_card_marine_fossil", "BELEMNITE.png", "track_pair_omanite_sea_title", "track_pair_omanite_sea_text"],
        ["omanite-sediment", "track_card_sediment", "FONDO_DE_BARRO_TRIASICO.png", "track_card_fossilization", "AMMONITE.png", "track_pair_omanite_sediment_title", "track_pair_omanite_sediment_text"],
        ["omanite-tunnel", "track_card_tunnel", "TUNEL_FOSIL-ICNITA_DE_TALASINOIDE.png", "track_card_seafloor", "TALASINOIDE.png", "track_pair_omanite_tunnel_title", "track_pair_omanite_tunnel_text"],
        ["omanite-belemnite", "track_card_belemnite", "BELEMNITE.png", "track_card_marine_group", "AMMONITE.png", "track_pair_omanite_belemnite_title", "track_pair_omanite_belemnite_text"],
        ["omanite-environment", "track_card_environment", "AMMONITE.png", "track_card_paleo_sea", "BELEMNITE.png", "track_pair_omanite_environment_title", "track_pair_omanite_environment_text"],
        ["omanite-shell-fossil", "track_card_spiral_shell", "AMMONITE.png", "track_card_fossilization", "FONDO_DE_BARRO_TRIASICO.png", "track_pair_omanite_shell_fossil_title", "track_pair_omanite_shell_fossil_text"],
        ["omanite-gallery", "track_card_thalassinoides", "TALASINOIDE.png", "track_card_activity_trace", "TUNEL_FOSIL-ICNITA_DE_TALASINOIDE.png", "track_pair_omanite_gallery_title", "track_pair_omanite_gallery_text"],
      ],
    },
  };

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function getMemoryState(root) {
    if (!root._trackMemoryState) {
      root._trackMemoryState = {
        character: "bedmar",
        deck: [],
        open: [],
        matched: new Set(),
        attempts: 0,
        locked: false,
        pendingResult: false,
      };
    }
    return root._trackMemoryState;
  }

  function pairToCards(pair) {
    const [pairId, firstLabel, firstImage, secondLabel, secondImage, title, text] = pair;
    return [
      { pairId, cardId: `${pairId}-a`, label: firstLabel, image: firstImage, title, text },
      { pairId, cardId: `${pairId}-b`, label: secondLabel, image: secondImage, title, text },
    ];
  }

  function setText(root, selector, value) {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  }

  function getMemoryCharacter(state) {
    return memoryCharacters[state.character] || memoryCharacters.bedmar;
  }

  function resetMemory(root, characterId) {
    const state = getMemoryState(root);
    if (characterId) state.character = characterId;
    const character = getMemoryCharacter(state);
    state.deck = shuffle(character.pairs.flatMap(pairToCards));
    state.open = [];
    state.matched.clear();
    state.attempts = 0;
    state.locked = false;
    state.pendingResult = false;
    root.classList.remove("is-complete");
    (root.closest("section") || document).dataset.trackMemoryComplete = "false";
    updateMemoryProfile(root);
    renderMemoryBoard(root);
    updateMemoryCounters(root);
    updateTrainingProgress(root.closest("section") || document);
    setMemoryStatus(root, "track_memory_status_start", "Elige dos cartas para buscar una pareja.");
  }

  function updateMemoryProfile(root) {
    const state = getMemoryState(root);
    const character = getMemoryCharacter(state);
    setText(root, "[data-track-memory-character-hint]", t(character.lead));
    setText(root, "[data-track-profile-badge]", t(character.badge));
    setText(root, "[data-track-profile-title]", t(character.name));
    setText(root, "[data-track-profile-text]", t(character.profile));
    root.querySelectorAll("[data-track-character-choice]").forEach((button) => {
      const active = button.dataset.trackCharacterChoice === state.character;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderMemoryBoard(root) {
    const state = getMemoryState(root);
    const board = root.querySelector("[data-track-memory-board]");
    if (!board) return;
    const columns = 4;
    const rows = [];
    for (let index = 0; index < state.deck.length; index += columns) {
      rows.push(state.deck.slice(index, index + columns));
    }
    board.innerHTML = rows.map((row) => `
      <div class="track-memory-row">
        ${row.map((card) => {
      const matched = state.matched.has(card.pairId);
      return `
        <button class="track-memory-card${matched ? " is-matched" : ""}" type="button" data-track-card="${card.cardId}" aria-pressed="${matched ? "true" : "false"}">
          <span class="track-memory-card__back" aria-hidden="true">?</span>
          <span class="track-memory-card__front">
            <img src="${imageBase}${card.image}" alt="" loading="lazy" decoding="async" />
            <b>${t(card.label)}</b>
          </span>
        </button>
      `;
        }).join("")}
      </div>
    `).join("");
  }

  function updateMemoryCounters(root) {
    const state = getMemoryState(root);
    const total = getMemoryCharacter(state).pairs.length;
    const progress = root.querySelector("[data-track-memory-progress-bar]");
    setText(root, "[data-track-memory-score]", `${state.matched.size}/${total}`);
    setText(root, "[data-track-memory-attempts]", String(state.attempts));
    if (progress) progress.style.width = `${Math.round((state.matched.size / total) * 100)}%`;
  }

  function setMemoryStatus(root, key, fallback) {
    const feedback = root.querySelector("[data-track-memory-feedback]");
    if (feedback) feedback.textContent = t(key, fallback);
  }

  function findMemoryCard(state, cardId) {
    return state.deck.find((card) => card.cardId === cardId);
  }

  function showMemoryModal(card) {
    const modal = document.querySelector("[data-track-modal]");
    if (!modal) return;
    const image = modal.querySelector("[data-track-modal-img]");
    if (image) image.src = `${imageBase}${card.image}`;
    setText(modal, "[data-track-modal-title]", t(card.title));
    setText(modal, "[data-track-modal-text]", t(card.text));
    modal.hidden = false;
    modal.querySelector("[data-track-modal-continue]")?.focus();
  }

  function hideMemoryModal(root) {
    const modal = document.querySelector("[data-track-modal]");
    if (modal) modal.hidden = true;
    if (root && getMemoryState(root).pendingResult) showMemoryResult(root);
  }

  function closeMemoryCards(state) {
    state.open.forEach(({ button }) => {
      button.classList.remove("is-open");
      button.setAttribute("aria-pressed", "false");
    });
    state.open = [];
    state.locked = false;
  }

  function showMemoryResult(root) {
    const state = getMemoryState(root);
    const character = getMemoryCharacter(state);
    const result = root.querySelector("[data-track-memory-result]");
    if (!result) return;
    state.pendingResult = false;
    result.classList.remove("is-hidden");
    setText(result, "[data-track-memory-result-title]", t(character.resultTitle));
    setText(result, "[data-track-memory-result-text]", t(character.resultText));
    root.classList.add("is-complete");
    (root.closest("section") || document).dataset.trackMemoryComplete = "true";
    updateTrainingProgress(root.closest("section") || document);
    setMemoryStatus(root, "track_status_complete", "Memory completado.");
  }

  function resolveMemoryPair(root) {
    const state = getMemoryState(root);
    const [first, second] = state.open;
    if (!first || !second) return;
    state.attempts += 1;
    updateMemoryCounters(root);
    if (first.card.pairId !== second.card.pairId) {
      window.setTimeout(() => closeMemoryCards(state), 700);
      setMemoryStatus(root, "track_memory_try_again", "No forman pareja. Prueba otra combinación.");
      return;
    }
    state.matched.add(first.card.pairId);
    first.button.classList.add("is-matched");
    second.button.classList.add("is-matched");
    state.open = [];
    state.locked = false;
    updateMemoryCounters(root);
    setMemoryStatus(root, "track_memory_pair_found", "Pareja encontrada.");
    showMemoryModal(first.card);
    if (state.matched.size === getMemoryCharacter(state).pairs.length) {
      state.pendingResult = true;
    }
  }

  function openMemoryCard(root, button) {
    const state = getMemoryState(root);
    if (state.locked || button.classList.contains("is-open") || button.classList.contains("is-matched")) return;
    const card = findMemoryCard(state, button.dataset.trackCard);
    if (!card) return;
    button.classList.add("is-open");
    button.setAttribute("aria-pressed", "true");
    state.open.push({ button, card });
    if (state.open.length === 2) {
      state.locked = true;
      resolveMemoryPair(root);
    }
  }

  function bindMemory(root) {
    if (root.dataset.trackMemoryReady === "1") return;
    root.dataset.trackMemoryReady = "1";
    root.addEventListener("click", (event) => {
      const character = event.target.closest("[data-track-character-choice]");
      if (character && root.contains(character)) {
        resetMemory(root, character.dataset.trackCharacterChoice);
        return;
      }
      const card = event.target.closest("[data-track-card]");
      if (card && root.contains(card)) openMemoryCard(root, card);
    });
    root.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest("[data-track-card]");
      if (!card || !root.contains(card)) return;
      event.preventDefault();
      openMemoryCard(root, card);
    });
    root.closest("section")?.querySelector("[data-track-memory-reset]")?.addEventListener("click", () => resetMemory(root));
    document.querySelectorAll("[data-track-modal-close], [data-track-modal-continue]").forEach((button) => {
      button.addEventListener("click", () => hideMemoryModal(root));
    });
  }

  function bindModeSwitch(panel) {
    if (panel.dataset.trackModeReady === "1") return;
    panel.dataset.trackModeReady = "1";
    panel.querySelectorAll("[data-track-mode-button]").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.trackModeButton;
        panel.querySelectorAll("[data-track-mode-button]").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        panel.querySelectorAll("[data-track-mode-panel]").forEach((modePanel) => {
          const active = modePanel.dataset.trackModePanel === mode;
          modePanel.hidden = !active;
          modePanel.classList.toggle("is-active", active);
        });
        panel.classList.toggle("is-memory-mode", mode === "memory");
      });
    });
  }

  function initMemoryGame() {
    document.querySelectorAll(".track-training-panel").forEach(bindModeSwitch);
    document.querySelectorAll("[data-track-memory-game]").forEach((root) => {
      bindMemory(root);
      if (!getMemoryState(root).deck.length) resetMemory(root);
      else {
        updateMemoryProfile(root);
        renderMemoryBoard(root);
        updateMemoryCounters(root);
      }
    });
  }

  initTrackGame();
  initMemoryGame();
  document.addEventListener("pm:navigation", initTrackGame);
  document.addEventListener("pm:navigation", initMemoryGame);
  window.addEventListener("pm:languagechange", initTrackGame);
  window.addEventListener("pm:languagechange", initMemoryGame);
})();
