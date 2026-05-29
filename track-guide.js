(function () {
  "use strict";

  const characterConfig = {
    archosaur: {
      badge: "track_char_archosaur_badge",
      title: "track_char_archosaur_name",
      description: "track_char_archosaur_description",
      traits: [
        "track_char_archosaur_trait_1",
        "track_char_archosaur_trait_2",
        "track_char_archosaur_trait_3",
      ],
      bubble: "track_char_archosaur_bubble",
      bubbleIcon: "meat",
    },
    raptor: {
      badge: "track_char_raptor_badge",
      title: "track_char_raptor_name",
      description: "track_char_raptor_description",
      traits: [
        "track_char_raptor_trait_1",
        "track_char_raptor_trait_2",
        "track_char_raptor_trait_3",
      ],
      bubble: "track_char_raptor_bubble",
      bubbleIcon: "claw",
    },
    herbivore: {
      badge: "track_char_herbivore_badge",
      title: "track_char_herbivore_name",
      description: "track_char_herbivore_description",
      traits: [
        "track_char_herbivore_trait_1",
        "track_char_herbivore_trait_2",
        "track_char_herbivore_trait_3",
      ],
      bubble: "track_char_herbivore_bubble",
      bubbleIcon: "shell",
    },
  };

  function t(key, fallback) {
    const lang = document.documentElement.lang || "es";
    return window.translations?.[lang]?.[key] ?? fallback;
  }

  function setI18nText(node, key, fallback) {
    if (!node || !key) return;
    node.dataset.i18n = key;
    node.textContent = t(key, fallback || node.textContent);
  }

  function showCharacter(section, id) {
    const config = characterConfig[id];
    if (!config) return;

    section.querySelectorAll("[data-track-character]").forEach((card) => {
      const active = card.dataset.trackCharacter === id;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    const detail = section.querySelector("[data-track-character-detail]");
    if (!detail) return;

    setI18nText(detail.querySelector("[data-track-character-badge]"), config.badge);
    setI18nText(detail.querySelector("[data-track-character-detail-title]"), config.title);
    setI18nText(detail.querySelector("[data-track-character-description]"), config.description);

    const traitNodes = detail.querySelectorAll(".track-character-detail__traits li");
    traitNodes.forEach((node, index) => {
      const key = config.traits[index];
      if (key) setI18nText(node, key);
    });

    const bubbleText = detail.querySelector("[data-track-character-bubble] p");
    setI18nText(bubbleText, config.bubble);

    const bubbleIcon = detail.querySelector(".track-character-bubble__icon");
    if (bubbleIcon) {
      bubbleIcon.className = `track-character-bubble__icon track-character-bubble__icon--${config.bubbleIcon}`;
    }
  }

  function bindSection(section) {
    if (section.dataset.trackGuideBound === "true") return;
    section.dataset.trackGuideBound = "true";

    section.addEventListener("click", (event) => {
      const card = event.target.closest("[data-track-character]");
      if (!card || !section.contains(card)) return;
      showCharacter(section, card.dataset.trackCharacter);
    });

    const active = section.querySelector("[data-track-character].is-active");
    if (active) showCharacter(section, active.dataset.trackCharacter);
  }

  function init() {
    document.querySelectorAll("#track-characters").forEach(bindSection);
  }

  function refreshLanguage() {
    document.querySelectorAll("#track-characters").forEach((section) => {
      const active = section.querySelector("[data-track-character].is-active");
      if (active) showCharacter(section, active.dataset.trackCharacter);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("pm:navigation", init);
  window.addEventListener("pm:languagechange", () => {
    init();
    refreshLanguage();
  });
})();
