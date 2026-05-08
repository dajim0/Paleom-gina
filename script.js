const scopes = [
  { code: "A0", key: "scope_a0", title_es: "Bienvenida", title_en: "Welcome" },
  { code: "A1", key: "scope_a1", title_es: "El mar de Tetis", title_en: "The Tethys Sea" },
  { code: "A2", key: "scope_a2", title_es: "Geologia y orografia", title_en: "Geology and orography" },
  { code: "A3", key: "scope_a3", title_es: "Cuaternario", title_en: "Quaternary" },
  { code: "A4", key: "scope_a4", title_es: "Mundo neandertal", title_en: "Neanderthal world" },
  { code: "A5", key: "scope_a5", title_es: "Paleolitico superior", title_en: "Upper Paleolithic" },
  { code: "A6", key: "scope_a6", title_es: "Neolitico", title_en: "Neolithic" },
  { code: "A7", key: "scope_a7", title_es: "Calcolitico", title_en: "Chalcolithic" },
  { code: "A8", key: "scope_a8", title_es: "Ciencia y ciudadania", title_en: "Science and citizenship" },
  { code: "ATZ", key: "scope_atz", title_es: "Terraza y paisaje", title_en: "Terrace and landscape" }
];

const timelineContent = {
  marine: {
    es: {
      title: "Era marina",
      text: "Sierra Magina estuvo cubierta por mares antiguos. Sus sedimentos explican el origen de muchos fosiles del museo."
    },
    en: {
      title: "Marine era",
      text: "Sierra Magina was once covered by ancient seas. Their sediments explain the origin of many fossils in the museum."
    }
  },
  geology: {
    es: {
      title: "Formacion geologica",
      text: "El levantamiento del relieve y la erosion modelaron el paisaje actual y su diversidad geologica."
    },
    en: {
      title: "Geological formation",
      text: "Relief uplift and erosion shaped the current landscape and its geological diversity."
    }
  },
  quaternary: {
    es: {
      title: "Cuaternario",
      text: "Cambios climaticos y ambientales afectaron ecosistemas, fauna y ocupacion humana."
    },
    en: {
      title: "Quaternary",
      text: "Climatic and environmental changes affected ecosystems, fauna, and human occupation."
    }
  },
  neanderthal: {
    es: {
      title: "Neandertales",
      text: "Los grupos neandertales dejaron evidencias en herramientas y restos que permiten reconstruir su modo de vida."
    },
    en: {
      title: "Neanderthals",
      text: "Neanderthal groups left evidence in tools and remains that help reconstruct their way of life."
    }
  },
  neolithic: {
    es: {
      title: "Neolitico",
      text: "Se consolidan nuevas formas de produccion, poblamiento y relacion con el territorio."
    },
    en: {
      title: "Neolithic",
      text: "New forms of production, settlement, and land-use became established."
    }
  },
  chalcolithic: {
    es: {
      title: "Calcolitico",
      text: "La metalurgia y los cambios sociales marcan una etapa clave en la evolucion de las comunidades."
    },
    en: {
      title: "Chalcolithic",
      text: "Metallurgy and social change marked a key stage in the evolution of communities."
    }
  }
};

const translations = {
  es: {
    skip_to_content: "Saltar al contenido principal",
    nav_home: "Inicio",
    nav_about: "Sobre",
    nav_exhibits: "Ambitos",
    nav_resources: "Recursos",
    nav_education: "Educacion",
    nav_science: "Ciencia",
    nav_news: "Noticias",
    nav_contact: "Contacto",
    hero_kicker: "Centro de Interpretacion Paleomagina",
    hero_title: "Sierra Magina: un archivo del tiempo",
    hero_text: "Un museo moderno para leer millones de años de historia: mares antiguos, montañas, cambios climaticos, aparicion humana y evolucion cultural.",
    hero_cta: "Comenzar recorrido",
    goal_title: "Objetivo del proyecto",
    goal_intro: "Paleomagina divulga ciencia de forma moderna para explicar la evolucion del territorio y la relacion entre naturaleza y humanidad.",
    goal_1_t: "Experiencia inmersiva",
    goal_1_p: "Recorrido interactivo que une museo fisico y microsite digital.",
    goal_2_t: "Aprendizaje por evidencias",
    goal_2_p: "Contenidos construidos desde la arqueologia, paleontologia y geologia.",
    goal_3_t: "Ciencia y ciudadania",
    goal_3_p: "Investigacion actual compartida de forma clara y participativa.",
    about_title: "Sobre Paleomagina",
    about_p1: "Paleomagina presenta Sierra Magina como un archivo del tiempo donde pueden leerse antiguos mares, formacion de montanas y transformaciones ambientales.",
    about_p2: "El proyecto museografico conecta arqueologia, paleontologia y geologia para explicar como ha evolucionado el territorio y su ocupacion humana.",
    about_p3: "La experiencia combina recorrido presencial con contenido digital accesible, multimedia y multilingue antes, durante y despues de la visita.",
    about_highlights_title: "Claves del centro",
    about_h1: "Investigacion en campo, laboratorio y territorio.",
    about_h2: "Difusion del patrimonio de Sierra Magina.",
    about_h3: "Experiencia museistica progresiva por ambitos.",
    about_h4: "Soporte educativo para aulas y familias.",
    exhibits_title: "Ambitos expositivos A0-A8 y terraza",
    exhibits_lead: "Cada ambito incluye resumen, recursos audiovisuales, galeria, curiosidades, linea temporal y acceso por QR.",
    timeline_title: "Linea temporal interactiva",
    timeline_intro: "Explora las grandes etapas para entender la evolucion de Sierra Magina y su registro arqueologico.",
    timeline_marine: "Era marina",
    timeline_geology: "Formacion geologica",
    timeline_quaternary: "Cuaternario",
    timeline_neanderthal: "Neandertales",
    timeline_neolithic: "Neolitico",
    timeline_chalcolithic: "Calcolitico",
    resources_title: "Recursos digitales",
    res_audiovisual: "Audiovisuales",
    res_audiovisual_p: "Documentales, piezas breves y explicaciones por ambito con subtitulos.",
    res_datasheets: "Fichas",
    res_datasheets_p: "Fichas tecnicas de fosiles, hallazgos y materiales de excavacion.",
    res_maps: "Mapas",
    res_maps_p: "Mapa interactivo de cuevas, yacimientos y puntos de interes de Sierra Magina.",
    res_gallery: "Galerias",
    res_gallery_p: "Imagenes de paisaje, laboratorio, recreaciones y procesos cientificos.",
    res_glossary: "Glosario",
    res_glossary_p: "Terminos clave de geologia, paleontologia y arqueologia para todos los publicos.",
    res_transcripts: "Transcripciones",
    res_transcripts_p: "Transcripciones de videos y audios para accesibilidad y consulta academica.",
    map_title: "Mapa interactivo y QR",
    map_p1: "Cada panel fisico del museo conecta con una pagina especifica del microsite mediante QR para ampliar contenidos.",
    map_l1: "Sierra Magina y su evolucion paisajistica.",
    map_l2: "Cuevas y areas de excavacion.",
    map_l3: "Puntos con hallazgos destacados.",
    map_l4: "Rutas educativas para visitas guiadas.",
    qr_title: "Ejemplo QR de sala",
    qr_p: "Escanea para abrir una ficha ampliada del fosil en tiempo real.",
    gallery_title: "Galeria multimedia",
    gal_1: "Paisaje de Sierra Magina",
    gal_2: "Fosiles y registro geologico",
    gal_3: "Excavaciones arqueologicas",
    gal_4: "Trabajo cientifico en laboratorio",
    education_title: "Educacion para colegios",
    edu_1_t: "Materiales didacticos",
    edu_1_p: "Unidades por edades, actividades imprimibles y recursos para aula.",
    edu_2_t: "Actividades",
    edu_2_p: "Talleres sobre fosiles, herramientas prehistoricas y lectura del paisaje.",
    edu_3_t: "Visitas escolares",
    edu_3_p: "Itinerarios guiados por niveles con objetivos curriculares adaptados.",
    science_title: "Ciencia y laboratorio",
    science_intro: "La investigacion se basa en evidencias obtenidas en campo, analizadas en laboratorio y compartidas con la ciudadania.",
    science_l1: "Metodologia de excavacion y registro estratigrafico.",
    science_l2: "Conservacion preventiva y restauracion de piezas.",
    science_l3: "Arqueologia experimental para contrastar hipotesis.",
    science_l4: "Difusion de resultados en actividades y publicaciones.",
    news_title: "Noticias y eventos",
    news_1_t: "Taller de fosiles",
    news_1_p: "Sesiones practicas para familias sobre identificacion de restos.",
    news_2_t: "Conferencia anual",
    news_2_p: "Encuentro sobre avances en arqueologia y paleontologia regional.",
    news_3_t: "Campaña de excavacion",
    news_3_p: "Seguimiento en directo de trabajos de campo y hallazgos.",
    footer_title: "Paleomagina",
    footer_p: "Sierra Magina, ciencia y patrimonio al alcance de todos.",
    footer_contact: "Contacto",
    scope_meta: "Incluye texto, imagenes, videos, galeria, curiosidades, linea temporal y QR."
  },
  en: {
    skip_to_content: "Skip to main content",
    nav_home: "Home",
    nav_about: "About",
    nav_exhibits: "Exhibits",
    nav_resources: "Resources",
    nav_education: "Education",
    nav_science: "Science",
    nav_news: "News",
    nav_contact: "Contact",
    hero_kicker: "Paleomagina Interpretation Center",
    hero_title: "Sierra Magina: an archive of time",
    hero_text: "A modern museum to read millions of years of history: ancient seas, mountain building, climate shifts, human emergence, and cultural evolution.",
    hero_cta: "Start the journey",
    goal_title: "Project objective",
    goal_intro: "Paleomagina shares science in a modern way to explain landscape evolution and the relationship between nature and humanity.",
    goal_1_t: "Immersive experience",
    goal_1_p: "An interactive route connecting the physical museum and digital microsite.",
    goal_2_t: "Evidence-based learning",
    goal_2_p: "Content built from archaeology, paleontology, and geology.",
    goal_3_t: "Science and citizenship",
    goal_3_p: "Current research shared in a clear and participatory way.",
    about_title: "About Paleomagina",
    about_p1: "Paleomagina presents Sierra Magina as an archive of time where ancient seas, mountain formation, and environmental change can be read.",
    about_p2: "The museographic project connects archaeology, paleontology, and geology to explain how the territory and human occupation evolved.",
    about_p3: "The experience combines on-site touring with accessible, multimedia, multilingual digital content before, during, and after the visit.",
    about_highlights_title: "Center highlights",
    about_h1: "Research in fieldwork, laboratory, and territory.",
    about_h2: "Dissemination of Sierra Magina heritage.",
    about_h3: "Progressive museum experience by exhibit areas.",
    about_h4: "Educational support for schools and families.",
    exhibits_title: "Exhibit areas A0-A8 and terrace",
    exhibits_lead: "Each area includes a summary, audiovisual resources, gallery, curiosities, timeline, and QR access.",
    timeline_title: "Interactive timeline",
    timeline_intro: "Explore key stages to understand Sierra Magina's evolution and archaeological record.",
    timeline_marine: "Marine era",
    timeline_geology: "Geological formation",
    timeline_quaternary: "Quaternary",
    timeline_neanderthal: "Neanderthals",
    timeline_neolithic: "Neolithic",
    timeline_chalcolithic: "Chalcolithic",
    resources_title: "Digital resources",
    res_audiovisual: "Audiovisuals",
    res_audiovisual_p: "Documentaries, short pieces, and area-specific explainers with subtitles.",
    res_datasheets: "Data sheets",
    res_datasheets_p: "Technical sheets for fossils, findings, and excavation materials.",
    res_maps: "Maps",
    res_maps_p: "Interactive map of caves, archaeological sites, and key points in Sierra Magina.",
    res_gallery: "Galleries",
    res_gallery_p: "Images of landscapes, labs, reconstructions, and scientific workflows.",
    res_glossary: "Glossary",
    res_glossary_p: "Key geology, paleontology, and archaeology terms for all audiences.",
    res_transcripts: "Transcripts",
    res_transcripts_p: "Video and audio transcripts for accessibility and academic consultation.",
    map_title: "Interactive map and QR",
    map_p1: "Each physical panel in the museum connects to a specific microsite page via QR to expand content.",
    map_l1: "Sierra Magina and its landscape evolution.",
    map_l2: "Caves and excavation areas.",
    map_l3: "Highlighted discovery points.",
    map_l4: "Educational routes for guided visits.",
    qr_title: "Exhibit QR example",
    qr_p: "Scan to open an expanded real-time fossil sheet.",
    gallery_title: "Multimedia gallery",
    gal_1: "Sierra Magina landscape",
    gal_2: "Fossils and geological record",
    gal_3: "Archaeological excavations",
    gal_4: "Scientific work in the lab",
    education_title: "Education for schools",
    edu_1_t: "Learning materials",
    edu_1_p: "Age-based units, printable activities, and classroom resources.",
    edu_2_t: "Activities",
    edu_2_p: "Workshops on fossils, prehistoric tools, and landscape reading.",
    edu_3_t: "School visits",
    edu_3_p: "Guided itineraries by level with tailored curriculum goals.",
    science_title: "Science and laboratory",
    science_intro: "Research is based on evidence collected in the field, analyzed in the lab, and shared with citizens.",
    science_l1: "Excavation methodology and stratigraphic recording.",
    science_l2: "Preventive conservation and restoration of artifacts.",
    science_l3: "Experimental archaeology to test hypotheses.",
    science_l4: "Dissemination of results in activities and publications.",
    news_title: "News and events",
    news_1_t: "Fossil workshop",
    news_1_p: "Hands-on sessions for families on identifying remains.",
    news_2_t: "Annual conference",
    news_2_p: "Meeting focused on regional archaeology and paleontology advances.",
    news_3_t: "Excavation campaign",
    news_3_p: "Live follow-up of fieldwork and discoveries.",
    footer_title: "Paleomagina",
    footer_p: "Sierra Magina, science and heritage for everyone.",
    footer_contact: "Contact",
    scope_meta: "Includes text, images, videos, gallery, curiosities, timeline, and QR."
  }
};

const scopeDescriptions = {
  es: {
    scope_a0: "Introduccion al museo y guia de visita.",
    scope_a1: "Origen marino del territorio y fosiles del Tetis.",
    scope_a2: "Lectura del relieve, rocas y procesos geologicos.",
    scope_a3: "Clima, fauna y cambios ambientales del Cuaternario.",
    scope_a4: "Vida cotidiana, tecnologia y evidencias neandertales.",
    scope_a5: "Innovaciones humanas del Paleolitico superior.",
    scope_a6: "Primeras comunidades agricultoras y ganaderas.",
    scope_a7: "Metalurgia temprana y transformaciones sociales.",
    scope_a8: "Metodo cientifico, participacion ciudadana y patrimonio.",
    scope_atz: "Interpretacion del paisaje desde la terraza exterior."
  },
  en: {
    scope_a0: "Museum introduction and visit guide.",
    scope_a1: "Marine origin of the territory and Tethys fossils.",
    scope_a2: "Reading relief, rocks, and geological processes.",
    scope_a3: "Climate, fauna, and environmental changes in the Quaternary.",
    scope_a4: "Daily life, technology, and Neanderthal evidence.",
    scope_a5: "Human innovations in the Upper Paleolithic.",
    scope_a6: "First farming and herding communities.",
    scope_a7: "Early metallurgy and social transformations.",
    scope_a8: "Scientific method, citizen engagement, and heritage.",
    scope_atz: "Landscape interpretation from the outdoor terrace."
  }
};

const defaultLang = "es";
let currentLang = defaultLang;
const themeStorageKey = "paleomagina-theme";
let currentTheme = "light";
const pageTransitionDuration = 280;

function renderScopes(lang) {
  const container = document.getElementById("ambitos-grid");
  if (!container) return;
  container.innerHTML = scopes
    .map((scope) => {
      const title = lang === "es" ? scope.title_es : scope.title_en;
      const description = scopeDescriptions[lang][scope.key];
      const meta = translations[lang].scope_meta;
      return `
        <article class="card">
          <h3 class="scope-title"><span class="scope-code">${scope.code}</span> - ${title}</h3>
          <p>${description}</p>
          <p class="scope-meta">${meta}</p>
        </article>
      `;
    })
    .join("");
}

function updateTimeline(lang, selectedTime) {
  const detail = document.getElementById("timeline-detail");
  if (!detail) return;
  const content = timelineContent[selectedTime][lang];
  detail.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const value = translations[lang][key];
    if (value) node.textContent = value;
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderScopes(lang);
  const activeTimeline = document.querySelector(".timeline-item.active");
  const selectedTime = activeTimeline?.dataset.time || "marine";
  updateTimeline(lang, selectedTime);
  updateThemeButtonLabel();
}

function updateThemeButtonLabel() {
  const label = currentTheme === "dark" ? "Modo claro" : "Modo oscuro";
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.textContent = label;
    button.setAttribute("aria-label", label);
  });
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (_err) {
    // Ignore localStorage failures in restricted environments.
  }
  updateThemeButtonLabel();
}

function isNavigableInternalLink(link) {
  if (!link || !link.href) return false;
  if (link.target && link.target.toLowerCase() === "_blank") return false;
  if (link.hasAttribute("download")) return false;
  if (link.dataset.noTransition === "true") return false;
  if (link.href.startsWith("mailto:") || link.href.startsWith("tel:")) return false;

  let destination;
  try {
    destination = new URL(link.href, window.location.href);
  } catch (_err) {
    return false;
  }

  if (destination.origin !== window.location.origin) return false;

  const samePath = destination.pathname === window.location.pathname;
  const hasOnlyHashChange = samePath && destination.search === window.location.search && destination.hash;
  if (hasOnlyHashChange) return false;

  return true;
}

function enablePageTransitions() {
  document.body.classList.add("page-transition");
  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
    document.body.classList.add("page-ready");
  });

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!isNavigableInternalLink(link)) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");

    window.setTimeout(() => {
      window.location.href = link.href;
    }, pageTransitionDuration);
  });
}

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

document.querySelectorAll(".timeline-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".timeline-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateTimeline(currentLang, button.dataset.time);
  });
});

document.querySelectorAll(".theme-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
});

let initialTheme = "light";
try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    initialTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    initialTheme = "dark";
  }
} catch (_err) {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    initialTheme = "dark";
  }
}

applyTheme(initialTheme);
applyLanguage(defaultLang);
enablePageTransitions();
