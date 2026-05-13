const scopes = [
  { code: "AAN", key: "scope_aan", title_es: "Antesala (AAN)", title_en: "Ante-room (AAN)" },
  { code: "A0", key: "scope_a0", title_es: "Bienvenida", title_en: "Welcome" },
  { code: "A1", key: "scope_a1", title_es: "El mar de Tetis", title_en: "The Tethys Sea" },
  { code: "A2", key: "scope_a2", title_es: "Geologia y orografia", title_en: "Geology and orography" },
  { code: "A3", key: "scope_a3", title_es: "Cuaternario", title_en: "Quaternary" },
  { code: "A4", key: "scope_a4", title_es: "Mundo neandertal", title_en: "Neanderthal world" },
  { code: "A5", key: "scope_a5", title_es: "Paleolitico superior", title_en: "Upper Paleolithic" },
  { code: "A6", key: "scope_a6", title_es: "Neolitico", title_en: "Neolithic" },
  { code: "A7", key: "scope_a7", title_es: "Calcolitico", title_en: "Chalcolithic" },
  { code: "A8", key: "scope_a8", title_es: "Ciencia y ciudadania", title_en: "Science and citizenship" },
  { code: "A9", key: "scope_a9", title_es: "Testimonios y voces", title_en: "Testimonies and voices" },
  { code: "ATZ", key: "scope_atz", title_es: "Terraza final (ATZ)", title_en: "Final terrace (ATZ)" }
];

/** Legacy timeline panels using `.timeline-item` (interactive timeline uses museum3d.js). */
const timelineContent = {
  stage1: {
    es: {
      title: "Tierra primitiva",
      text: "Del Precámbrico al Paleozoico temprano: orígenes geológicos y vida marina antigua."
    },
    en: {
      title: "Primordial Earth",
      text: "From the Precambrian to the early Paleozoic: geological origins and ancient marine life."
    }
  },
  stage2: {
    es: {
      title: "Carbonifero / Mesozoico",
      text: "Pantanos carboníferos, paisaje mesozoico y primeros mamíferos."
    },
    en: {
      title: "Carboniferous / early Mesozoic",
      text: "Carboniferous swamps, Mesozoic landscapes, and early mammals."
    }
  },
  stage3: {
    es: {
      title: "Hominidos",
      text: "Australopithecus bípedo y Homo habilis en la sabana africana."
    },
    en: {
      title: "Early hominins",
      text: "Bipedal Australopithecus and Homo habilis on the African savanna."
    }
  },
  stage4: {
    es: {
      title: "Homo erectus",
      text: "Fuego, migraciones y entornos pleistocenos variables."
    },
    en: {
      title: "Homo erectus",
      text: "Fire, migration, and variable Pleistocene environments."
    }
  },
  stage5: {
    es: {
      title: "Arte rupestre",
      text: "Simbolismo, neandertales, Cro-Magnon y transicion al Holoceno."
    },
    en: {
      title: "Cave art",
      text: "Symbolism, Neanderthals, Cro-Magnon people, and the shift toward the Holocene."
    }
  },
  stage6: {
    es: {
      title: "Neolitico",
      text: "Agricultura, asentamientos y aldea en el Creciente Fértil."
    },
    en: {
      title: "Neolithic",
      text: "Farming, settlements, and village life in the Fertile Crescent."
    }
  },
  stage7: {
    es: {
      title: "Civilizacion",
      text: "Ciudades antiguas, escritura y reflexion sobre el Antropoceno."
    },
    en: {
      title: "Civilization",
      text: "Ancient cities, writing, and a perspective on the Anthropocene."
    }
  }
};

const translations = {
  es: {
    skip_to_content: "Saltar al contenido principal",
    nav_main_aria: "Navegacion principal",
    language_selector_aria: "Selector de idioma",
    nav_home: "Inicio",
    nav_about: "Sobre",
    nav_exhibits: "Ambitos",
    nav_resources: "Recursos",
    nav_education: "Educacion",
    nav_science: "Ciencia",
    nav_news: "Noticias",
    nav_glossary: "Glosario",
    nav_audiovisuals: "Audiovisuales",
    img_museo_moderno_alt: "Centro de interpretación Paleomagina, vista exterior del edificio",
    img_sobre_museo_alt: "El museo y el paisaje de Sierra Mágina",
    img_fosil_alt: "Fósil de la colección en el relato de Paleomagina",
    about_sections_nav_aria: "Secciones de la página Sobre",
    about_nav_que: "Qué es",
    about_nav_obj: "Objetivos",
    about_nav_phil: "Filosofía",
    about_nav_build: "Edificio",
    about_nav_contact: "Contacto",
    about_aerial_photo_title: "Vista aérea de Sierra Magina",
    about_aerial_photo_caption: "El territorio visto desde el aire: contexto del paisaje que enmarca el centro.",
    about_building_photo_title: "El centro de interpretación",
    about_map_photo_title: "Mapa arqueológico del territorio",
    img_vista_aerea_alt: "Vista aérea de Sierra Mágina",
    img_mapa_edificio_alt: "Mapa arqueológico de Sierra Magina",
    img_lab_alt: "Laboratorio de análisis de materiales",
    img_excavacion_alt: "Excavación arqueológica desde una vista cenital",
    img_glossary_alt: "Fósil ilustrativo para el glosario científico",
    img_glossary_restos_alt: "Restos arqueológicos del territorio de Sierra Magina",
    img_terraza_alt: "Terraza mirador con Sierra Mágina al fondo",
    hero_kicker: "Centro de Interpretacion Paleomagina",
    hero_title: "Sierra Magina: un archivo del tiempo",
    hero_text: "Un museo moderno para leer millones de años de historia: mares antiguos, montañas, cambios climaticos, aparicion humana y evolucion cultural.",
    hero_cta: "Comenzar recorrido",
    home_teaser_title: "Introducción",
    home_teaser_intro:
      "Paleomagina es el espacio donde Sierra Magina se interpreta con evidencias: una visita ordenada por ámbitos, contenidos digitales y una terraza que mira al propio paisaje.",
    home_teaser_hint:
      "Esta es solo la entrada: misión, objetivos, filosofía y cómo se organiza el edificio amplían el relato cuando decidas seguir explorando.",
    home_teaser_cta: "Ir a Sobre",
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
    timeline_intro:
      "Un relato en siete escenas desde los origenes geologicos de la vida hasta el Antropoceno, enlazando tiempo profundo y evolucion humana.",
    timeline_stage_1: "Tierra primitiva",
    timeline_stage_2: "Carbonífero / Mesozoico",
    timeline_stage_3: "Hominidos",
    timeline_stage_4: "Homo erectus",
    timeline_stage_5: "Arte rupestre",
    timeline_stage_6: "Neolítico",
    timeline_stage_7: "Civilización",
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
    page_home_title: "Paleomagina | Inicio",
    page_about_title: "Paleomagina | Sobre",
    page_exhibits_title: "Paleomagina | Ambitos",
    page_resources_title: "Paleomagina | Recursos",
    page_contact_title: "Paleomagina | Contacto",
    index_title: "INDICE",
    index_main: "ASPECTOS GENERALES",
    index_intro: "INTRODUCCION GENERAL: UN RECORRIDO PARA COMPRENDER SIERRA MAGINA DESDE LA CIENCIA, EL PAISAJE Y LA MEMORIA HUMANA",
    index_criteria: "CRITERIOS A TENER EN CUENTA EN EL PROYECTO",
    timeline_aria: "Linea temporal del museo",
    qr_example_alt: "Codigo QR de ejemplo que abre la ficha del fosil A2",
    gal_1_alt: "Paisaje montanoso de Sierra Magina al amanecer",
    gal_2_alt: "Detalle de fosil sobre soporte de laboratorio",
    gal_3_alt: "Excavacion arqueologica en terreno de montana",
    gal_4_alt: "Mesa de laboratorio con herramientas cientificas",
    contact_intro: "Escribenos para organizar visitas escolares, actividades en grupo y colaboraciones cientificas.",
    contact_footer_note:
      "El email, el teléfono y la ubicación figuran también en el pie de página de todas las pantallas para consultarlos al instante.",
    contact_email_label: "Email:",
    contact_phone_label: "Telefono:",
    contact_location_label: "Ubicacion:",
    contact_location_value: "Sierra Magina, Jaen",
    contact_quick_access: "Acceso rapido",
    contact_qr_help: "Escanea para abrir la pagina principal del proyecto.",
    contact_qr_alt: "Codigo QR para acceder al inicio de Paleomagina",
    floor_info_title: "Informacion por plantas",
    floor_info_intro: "La visita se organiza en dos niveles con una secuencia lineal, progresiva y facilmente interpretable.",
    floor_program_alt: "Esquema general con programa de planta baja y planta primera",
    floor_ground_title: "Planta BAJA",
    floor_ground_1: "Zona de recepcion y acogida.",
    floor_ground_2: "Espacios de distribucion y transicion.",
    floor_ground_3: "Escaleras. Las eras geologicas.",
    floor_ground_plan_caption: "Plano general de la planta baja.",
    floor_ground_text: "La planta baja introduce el relato del centro: recibe al visitante, ordena la orientacion inicial y prepara el paso hacia la sala principal. Este tramo no funciona solo como circulacion, sino como umbral interpretativo que activa la experiencia desde el primer momento.",
    floor_ground_alt: "Plano de planta baja con recorrido propuesto",
    floor_first_title: "Planta PRIMERA",
    floor_first_an: "Ambito AN. Antesala a la exposicion permanente.",
    floor_first_a0: "Ambito 0. Bienvenida a Sierra Magina.",
    floor_first_a1: "Ambito 1. El mar de Tetis.",
    floor_first_a2: "Ambito 2. Geologia y orografia en Sierra Magina.",
    floor_first_a3: "Ambito 3. El Cuaternario y el origen del hombre.",
    floor_first_a4: "Ambito 4. El Paleolitico medio. El mundo Neandertal.",
    floor_first_a5: "Ambito 5. El Paleolitico superior.",
    floor_first_a6: "Ambito 6. Neolitico.",
    floor_first_a7: "Ambito 7. Calcolitico.",
    floor_first_a8: "Ambito 8. Investigacion arqueologica: ciencia y ciudadania.",
    floor_first_tz: "Ambito TZ. Terraza: el museo continua en el paisaje.",
    floor_first_plan_caption: "Plano general de la planta primera.",
    floor_first_text: "La primera planta concentra el desarrollo expositivo completo. La secuencia de ambitos construye una lectura progresiva del territorio, desde los procesos geologicos y paleoambientales hasta la evolucion cultural y la investigacion arqueologica contemporanea.",
    floor_first_alt: "Plano de planta primera con recorrido y ambitos expositivos",
    floor_route_title: "Desarrollo: un recorrido lineal y progresivo en la sala expositiva",
    floor_route_p1: "El cuerpo principal del recorrido se desarrolla en la sala de la primera planta, con una implantacion que favorece un avance lineal, ordenado y confortable.",
    floor_route_p2: "La transicion entre ambitos se resuelve mediante muros separadores de aproximadamente 250 cm, que organizan la circulacion y revelan cada espacio de forma secuenciada.",
    floor_route_p3: "La alternancia de recursos y atmosferas mantiene el interes y refuerza la comprension del relato cientifico.",
    floor_end_title: "Finalizacion: la terraza como cierre con significado",
    floor_end_p1: "La salida a la terraza funciona como ambito final del recorrido y como transicion simbolica entre el relato interior y el paisaje real.",
    floor_end_p2: "Este cierre vincula de forma directa conocimiento y territorio, convirtiendo el entorno en una continuidad tangible de lo aprendido.",
    museum_3d_title: "Recreacion 3D interactiva del museo",
    museum_3d_intro: "Explora el museo por secciones. Pulsa en una seccion para resaltarla y ver su descripcion.",
    museum_3d_floor_switch_aria: "Selector de planta del museo",
    museum_3d_floor_ground: "Planta baja",
    museum_3d_floor_first: "Planta primera",
    museum_3d_legend_ground: "Leyenda planta baja",
    museum_3d_legend_first: "Leyenda planta primera",
    museum_3d_sections_title: "Secciones",
    museum_3d_canvas_aria: "Plano interactivo del museo con zonas seleccionables",
    museum_3d_viewer_hint: "Pulsa una zona coloreada del plano o elige una seccion en la lista.",
    museum_3d_detail_title: "Selecciona una seccion",
    museum_3d_detail_hint:
      "Pulsa en cualquier zona coloreada del plano o en la lista para ver su descripcion.",
    floor_detail_alt: "Detalle de la planta primera con ambitos AN, 0, 1, 2 y 3",
    floor_narrative_alt: "Texto de narrativa museografica sobre desarrollo lineal y finalizacion en terraza",
    theme_mode_dark: "Modo oscuro",
    theme_mode_light: "Modo claro",
    footer_title: "Paleomagina",
    footer_p: "Sierra Magina, ciencia y patrimonio al alcance de todos.",
    footer_contact: "Contacto",
    scope_meta: "Incluye texto, imagenes, videos, galeria, curiosidades, linea temporal y QR.",
    page_glossary_title: "Paleomagina | Glosario",
    page_audiovisuals_title: "Paleomagina | Audiovisuales",
    glossary_title: "Glosario científico",
    glossary_intro: "Términos clave de geología, paleontología y arqueología explicados de forma clara y accesible para todos los públicos.",
    glossary_search_placeholder: "Buscar término...",
    glossary_no_results: "No se encontraron resultados para tu búsqueda.",
    glossary_context_title: "Contexto científico",
    glossary_geology: "Geología",
    glossary_geology_p: "Ciencia que estudia la estructura, composición y evolución de la Tierra y sus rocas.",
    glossary_paleontology: "Paleontología",
    glossary_paleontology_p: "Ciencia que estudia los fósiles y la vida pasada de nuestro planeta.",
    glossary_archaeology: "Arqueología",
    glossary_archaeology_p: "Ciencia que estudia las culturas pasadas a través de sus restos materiales.",
    audiovisuals_title: "Audiovisuales educativos",
    audiovisuals_intro: "Documentales, piezas breves y explicaciones por ámbito con subtítulos en español e inglés.",
    audiovisuals_available: "Contenido disponible",
    audiovisuals_section_lead:
      "Selecciona un ambito para filtrar piezas breves y documentales con subtítulos.",
    img_audiovisuals_banner_alt: "Ciencia, tecnología y divulgación audiovisual en Paleomagina",
    audiovisuals_accessibility: "Accesibilidad",
    audiovisuals_subtitles: "Subtítulos",
    audiovisuals_subtitles_p: "Todos los audiovisuales cuentan con subtítulos en español e inglés para garantizar accesibilidad auditiva.",
    audiovisuals_descriptions: "Audiodescripciones",
    audiovisuals_descriptions_p: "Disponibles descripciones de audio para personas con discapacidad visual en contenido seleccionado.",
    audiovisuals_transcripts: "Transcripciones",
    audiovisuals_transcripts_p: "Acceso a texto completo de cada audiovisual para consulta académica e inclusión digital.",
    filter_all: "Todos",
    filter_geology: "Geología",
    filter_paleontology: "Paleontología",
    filter_archaeology: "Arqueología",
    que_es_title: "Qué es Paleomágina",
    que_es_intro:
      "Paleomágina es un centro científico, arqueológico y museográfico centrado en la interpretación de Sierra Mágina desde la geología, la paleontología, la arqueología y la evolución humana. El proyecto plantea el territorio como un gran archivo natural donde el paisaje conserva millones de años de historia.",
    que_es_li_rocks: "Las rocas contienen información legible en estratos y fósiles.",
    que_es_li_landscape: "El paisaje conserva huellas del pasado visible y oculta.",
    que_es_li_science: "La ciencia permite interpretar esas huellas con método y evidencias.",
    que_es_li_history: "La historia se reconstruye a partir de restos, contextos y comparación.",
    que_es_combine: "La idea del museo se apoya en cuatro ideas y se despliega en siete líneas de trabajo:",
    que_es_pillar_1: "Ciencia.",
    que_es_pillar_2: "Divulgación.",
    que_es_pillar_3: "Educación.",
    que_es_pillar_4: "Turismo cultural.",
    que_es_pillar_5: "Participación ciudadana.",
    que_es_pillar_6: "Experiencia emocional.",
    que_es_pillar_7: "Rigor y accesibilidad en la lectura del territorio.",
    about_highlights_title: "Ejes del proyecto",
    about_h1: "Ciencia de campo, laboratorio y territorio.",
    about_h2: "Divulgación del patrimonio de Sierra Mágina.",
    about_h3: "Educación y públicos diversos.",
    about_h4: "Turismo cultural y referencia regional.",
    about_h5: "Participación ciudadana y memoria compartida.",
    about_h6: "Experiencia museística progresiva por ámbitos.",
    about_h7: "Conexión entre evidencia y emoción.",
    obj_museum_title: "Objetivos del museo",
    obj_museum_intro:
      "Paleomágina articula investigación, divulgación y experiencia de visita en torno a cuatro ejes complementarios, cada uno con metas concretas.",
    obj_sci_t: "Objetivos científicos",
    obj_sci_intro: "Enfoque en método y transparencia del conocimiento:",
    obj_sci_li1: "Explicar cómo se investiga el pasado.",
    obj_sci_li2: "Mostrar el trabajo arqueológico y paleontológico.",
    obj_sci_li3: "Divulgar conocimiento científico.",
    obj_sci_li4: "Enseñar el método científico.",
    obj_edu_t: "Objetivos educativos",
    obj_edu_intro: "Contenidos para distintas edades y ritmos:",
    obj_edu_li1: "Facilitar la comprensión de procesos complejos.",
    obj_edu_li2: "Adaptar contenidos a todas las edades.",
    obj_edu_li3: "Despertar la curiosidad científica.",
    obj_edu_li4: "Favorecer el aprendizaje activo.",
    obj_tour_t: "Objetivos turísticos",
    obj_tour_intro: "Inserción en la oferta cultural del territorio:",
    obj_tour_li1: "Reforzar Sierra Mágina como destino cultural.",
    obj_tour_li2: "Aumentar y diversificar visitantes.",
    obj_tour_li3: "Consolidar turismo científico y natural.",
    obj_tour_li4: "Convertirse en referencia regional.",
    obj_soc_t: "Objetivos sociales",
    obj_soc_intro: "Patrimonio vivo y ciudadanía:",
    obj_soc_li1: "Integrar ciudadanía y patrimonio.",
    obj_soc_li2: "Reforzar la identidad territorial.",
    obj_soc_li3: "Crear conciencia de conservación.",
    obj_soc_li4: "Generar memoria compartida.",
    philosophy_title: "Filosofía del proyecto",
    phil_archives_t: "El paisaje como archivo del tiempo",
    phil_archives_lead: "Sierra Mágina se presenta como archivo geológico, memoria natural y territorio modelado por millones de años.",
    phil_archives_li1: "Archivo geológico: estratos, cuevas y yacimientos.",
    phil_archives_li2: "Memoria natural en el relieve y los procesos.",
    phil_archives_li3: "Espacio donde leer procesos naturales y humanos.",
    phil_archives_li4: "Lectura científica del territorio como narrativa compartida.",
    phil_process_t: "La ciencia como proceso vivo",
    phil_process_lead: "El museo no solo muestra resultados: explica cómo se produce el conocimiento.",
    phil_process_li1: "Excavaciones y trabajo de campo.",
    phil_process_li2: "Trabajo de laboratorio y análisis.",
    phil_process_li3: "Interpretación de evidencias y debate.",
    phil_process_li4: "Actualización del relato con nuevas datos.",
    phil_emotion_t: "Ciencia y emoción",
    phil_emotion_lead: "La exposición busca un equilibrio entre rigor y experiencia.",
    phil_emotion_li1: "Impacto visual y comprensión sencilla.",
    phil_emotion_li2: "Experiencia inmersiva y ritmos de visita variados.",
    phil_emotion_li3: "Rigor científico en textos y piezas.",
    phil_emotion_li4: "Conexión emocional con el esfuerzo humano y el entorno.",
    building_title: "El edificio",
    building_visit_teaser:
      "Para el recorrido paso a paso por plantas, ámbitos AAN–A9, terraza ATZ y recursos de sala —incluidos línea temporal y plano interactivo— visita la página ",
    building_visit_teaser_end:
      ". Aquí resume la organización general, los espacios principales y la accesibilidad.",
    building_org_t: "Organización general",
    building_org_lead: "El edificio articula la visita en altura y en profundidad:",
    building_org_li1: "Sótano: almacenes científicos y servicios vinculados a la investigación.",
    building_org_li2: "Planta baja: acogida, orientación y arranque del relato.",
    building_org_li3: "Primera planta: exposición permanente, transiciones y terraza panorámica.",
    building_spaces_t: "Espacios principales",
    building_spaces_lead: "Salas y usos previstos para la experiencia completa:",
    building_spaces_li1: "Exposición permanente y recorrido cronológico.",
    building_spaces_li2: "Salas para exposiciones temporales.",
    building_spaces_li3: "Sala de conferencias y actividades.",
    building_spaces_li4: "Laboratorio y espacios de análisis.",
    building_spaces_li5: "Patio didáctico exterior.",
    building_spaces_li6: "Terraza panorámica ATZ como cierre en paisaje.",
    building_access_t: "Accesibilidad",
    building_access_lead: "Diseño inclusivo y circulación clara:",
    building_access_li1: "Ascensor y recorridos accesibles.",
    building_access_li2: "Circulación adaptada y señalización coherente.",
    building_access_li3: "Consulta accesible en pantalla y apoyo a visitas guiadas.",
    building_access_li4: "Compatibilidad con distintas necesidades de movilidad y tiempo.",
    building_photo_caption: "Centro de interpretación Paleomágina: vista del edificio.",
    building_map_caption: "Mapa arqueológico de Sierra Mágina.",
    expo_concept_title: "Concepto de la exposición permanente",
    expo_concept_lead:
      "La exposición funciona como viaje temporal, recorrido cronológico y descubrimiento progresivo: interpretación científica del territorio con revelación gradual de espacios.",
    expo_concept_li1: "Muros separadores y sectores diferenciados.",
    expo_concept_li2: "Recorrido en zigzag que ordena la narrativa.",
    expo_concept_li3: "Cambios de iluminación y atmósfera entre ámbitos.",
    expo_concept_li4: "Paneles, vitrinas, audiovisuales y piezas que sostienen el método.",
    expo_concept_li5: "Cierre en terraza: el museo continúa en el paisaje.",
    expo_route_detail_title: "Recorrido expositivo por ámbitos",
    expo_route_detail_lead:
      "Despliega cada bloque para ver objetivos, contenidos y recursos según el guion museográfico (AAN, A0–A9, ATZ).",
    expo_route_accordion_aria: "Detalle del recorrido por ámbitos",
    expo_permanent_title: "Exposición permanente y recorrido",
    expo_permanent_intro:
      "Resumen del circuito interior: acogida, transición temporal, antesala emocional, secuencia A0–A9, voces y terraza ATZ frente a Sierra Mágina.",
    route_rec_title: "Recepción y planta baja",
    route_rec_p:
      "Bienvenida, orientación, introducción conceptual y preparación narrativa con mapas, cronologías, paneles, objetos y audiovisuales.",
    route_stairs_title: "Escaleras y transición",
    route_stairs_p:
      "Las escaleras introducen el tiempo geológico mediante eras, gráficos temporales, vinilos y mensajes interpretativos entre acogida y sala.",
    route_aan_title: "AAN — Antesala",
    route_aan_p:
      "Espacio inicial con impacto emocional, familia neandertal y relación visual con el paisaje antes de la secuencia numerada.",
    route_a0_tz_title: "Ámbitos A0–A9 y terraza ATZ",
    route_a0_tz_intro:
      "La secuencia recorre desde la bienvenida a Sierra Mágina hasta testimonios y voces; la terraza ATZ proyecta el relato hacia el horizonte real.",
    route_a0_tz_li:
      "Incluye Tetis, geología y relieve, Cuaternario, mundo neandertal, Paleolítico superior, Neolítico, Calcolítico, investigación arqueológica (A8), testimonios (A9) y cierre en terraza.",
    route_resources_title: "Recursos museográficos",
    route_resources_lead: "Físicos, digitales y educativos:",
    route_resources_li1: "Físicos: vitrinas, paneles, réplicas, piezas originales, ilustraciones y cronologías.",
    route_resources_li2: "Digitales: micrositio responsive, QR, audiovisuales, interactividad y subtítulos bilingües.",
    route_resources_li3: "Educativos: talleres, actividades escolares, arqueología experimental y patio didáctico.",
    route_public_title: "Público objetivo",
    route_public_lead: "Públicos actuales y estratégicos:",
    route_public_li1: "Actuales: escolares, familias, turismo local y público cultural.",
    route_public_li2: "Estratégicos: universitarios, investigadores, turismo científico y de naturaleza.",
    route_public_li3: "Centros educativos externos y grupos organizados.",
    route_public_li4: "Vecindario e interesados en el patrimonio territorial.",
    route_exp_title: "Experiencia del visitante",
    route_exp_lead: "La visita busca ser:",
    route_exp_li1: "Clara, fluida y comprensible.",
    route_exp_li2: "Emocional y participativa.",
    route_exp_li3: "Memorable y adaptada a distintos ritmos.",
    route_exp_li4: "Coherente con evidencia científica y lectura del paisaje.",
    resources_visit_title: "Información práctica de visita",
    resources_visit_lead:
      "Datos orientativos para planificar la experiencia; confirma horarios y reservas con el centro antes de desplazarte.",
    resources_visit_li1: "Horario orientativo: martes a domingo, mañana y tarde (consultar calendario oficial).",
    resources_visit_li2: "Duración recomendada del recorrido completo: entre 90 y 120 minutos.",
    resources_visit_li3: "Grupos escolares y visitas organizadas: reserva previa por correo o teléfono.",
    resources_visit_li4: "Accesibilidad: ascensor, itinerarios accesibles y apoyo en sala (detalle en recepción).",
    resources_visit_li5: "Cómo llegar: Sierra Mágina (Jaén); enlaces de transporte y aparcamiento en la web municipal o de turismo provincial.",
    resources_visit_li6: "Tarifas y bonos: publicar cuando el centro las tenga aprobadas; hasta entonces, consulta en contacto.",
    footer_legal_heading: "Información legal",
    footer_legal_notice: "Aviso legal",
    footer_legal_privacy: "Privacidad",
    footer_legal_cookies: "Cookies",
    footer_legal_a11y: "Accesibilidad",
    page_legal_notice_title: "Paleomágina | Aviso legal",
    page_legal_privacy_title: "Paleomágina | Privacidad",
    page_legal_cookies_title: "Paleomágina | Cookies",
    page_legal_a11y_title: "Paleomágina | Accesibilidad",
    legal_h1_notice: "Aviso legal",
    legal_h1_privacy: "Privacidad",
    legal_h1_cookies: "Cookies",
    legal_h1_a11y: "Accesibilidad",
    media_placeholder_label: "Imagen próximamente",
  },
  en: {
    skip_to_content: "Skip to main content",
    nav_main_aria: "Main navigation",
    language_selector_aria: "Language selector",
    nav_home: "Home",
    nav_about: "About",
    nav_exhibits: "Exhibits",
    nav_resources: "Resources",
    nav_education: "Education",
    nav_science: "Science",
    nav_news: "News",
    nav_glossary: "Glossary",
    nav_audiovisuals: "Audiovisuals",
    img_museo_moderno_alt: "Paleomagina interpretation center, exterior view of the building",
    img_sobre_museo_alt: "The museum and the Sierra Mágina landscape",
    img_fosil_alt: "Fossil specimen featured in Paleomagina’s narrative",
    about_sections_nav_aria: "About page sections",
    about_nav_que: "What it is",
    about_nav_obj: "Objectives",
    about_nav_phil: "Philosophy",
    about_nav_build: "Building",
    about_nav_contact: "Contact",
    about_aerial_photo_title: "Aerial view of Sierra Magina",
    about_aerial_photo_caption: "The territory from above: landscape context around the centre.",
    about_building_photo_title: "The interpretation centre",
    about_map_photo_title: "Archaeological map of the territory",
    img_vista_aerea_alt: "Aerial view of Sierra Mágina",
    img_mapa_edificio_alt: "Archaeological map of Sierra Mágina",
    img_lab_alt: "Laboratory for analysing archaeological materials",
    img_excavacion_alt: "Archaeological excavation seen from above",
    img_glossary_alt: "Illustrative fossil for the scientific glossary",
    img_glossary_restos_alt: "Archaeological remains from the Sierra Mágina territory",
    img_terraza_alt: "Terrace viewpoint with Sierra Mágina in the background",
    hero_kicker: "Paleomagina Interpretation Center",
    hero_title: "Sierra Magina: an archive of time",
    hero_text: "A modern museum to read millions of years of history: ancient seas, mountain building, climate shifts, human emergence, and cultural evolution.",
    hero_cta: "Start the journey",
    home_teaser_title: "Introduction",
    home_teaser_intro:
      "Paleomagina is where Sierra Magina is interpreted through evidence: a gallery route organised by scopes, digital layers, and a terrace overlooking the landscape itself.",
    home_teaser_hint:
      "This is only the opening: mission, objectives, philosophy, and how the building is organised broaden the story when you choose to explore further.",
    home_teaser_cta: "Go to About",
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
    timeline_intro:
      "A seven-scene narrative from the geological dawn of life to the Anthropocene, linking deep time and human evolution.",
    timeline_stage_1: "Primordial Earth",
    timeline_stage_2: "Carboniferous / early Mesozoic",
    timeline_stage_3: "Early hominins",
    timeline_stage_4: "Homo erectus",
    timeline_stage_5: "Cave art",
    timeline_stage_6: "Neolithic",
    timeline_stage_7: "Civilization",
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
    page_home_title: "Paleomagina | Home",
    page_about_title: "Paleomagina | About",
    page_exhibits_title: "Paleomagina | Exhibits",
    page_resources_title: "Paleomagina | Resources",
    page_contact_title: "Paleomagina | Contact",
    index_title: "INDEX",
    index_main: "GENERAL ASPECTS",
    index_intro: "GENERAL INTRODUCTION: A JOURNEY TO UNDERSTAND SIERRA MAGINA THROUGH SCIENCE, LANDSCAPE, AND HUMAN MEMORY",
    index_criteria: "KEY CRITERIA TO CONSIDER IN THE PROJECT",
    timeline_aria: "Museum timeline",
    qr_example_alt: "Example QR code opening the A2 fossil record",
    gal_1_alt: "Mountain landscape of Sierra Magina at sunrise",
    gal_2_alt: "Fossil detail on a laboratory support",
    gal_3_alt: "Archaeological excavation in mountain terrain",
    gal_4_alt: "Laboratory table with scientific tools",
    contact_intro: "Write to us to organize school visits, group activities, and scientific collaborations.",
    contact_footer_note:
      "Email, phone, and location are also listed in the footer on every page for quick reference.",
    contact_email_label: "Email:",
    contact_phone_label: "Phone:",
    contact_location_label: "Location:",
    contact_location_value: "Sierra Magina, Jaen",
    contact_quick_access: "Quick access",
    contact_qr_help: "Scan to open the project's home page.",
    contact_qr_alt: "QR code to access the Paleomagina home page",
    floor_info_title: "Floor information",
    floor_info_intro: "The visit is organized across two levels with a linear, progressive, and easy-to-follow sequence.",
    floor_program_alt: "General diagram with ground and first floor program",
    floor_ground_title: "Ground FLOOR",
    floor_ground_1: "Reception and welcome area.",
    floor_ground_2: "Distribution and transition spaces.",
    floor_ground_3: "Stairs. Geological eras.",
    floor_ground_plan_caption: "General plan of the ground floor.",
    floor_ground_text: "The ground floor introduces the center's narrative: it welcomes visitors, structures initial orientation, and prepares the transition to the main exhibition room. This segment is not just circulation; it acts as an interpretive threshold that activates the experience from the very beginning.",
    floor_ground_alt: "Ground floor plan with proposed route",
    floor_first_title: "First FLOOR",
    floor_first_an: "Scope AN. Ante-room to the permanent exhibition.",
    floor_first_a0: "Scope 0. Welcome to Sierra Magina.",
    floor_first_a1: "Scope 1. The Tethys Sea.",
    floor_first_a2: "Scope 2. Geology and orography in Sierra Magina.",
    floor_first_a3: "Scope 3. The Quaternary and the origin of humans.",
    floor_first_a4: "Scope 4. Middle Paleolithic. The Neanderthal world.",
    floor_first_a5: "Scope 5. Upper Paleolithic.",
    floor_first_a6: "Scope 6. Neolithic.",
    floor_first_a7: "Scope 7. Chalcolithic.",
    floor_first_a8: "Scope 8. Archaeological research: science and citizenship.",
    floor_first_tz: "Scope TZ. Terrace: the museum continues in the landscape.",
    floor_first_plan_caption: "General plan of the first floor.",
    floor_first_text: "The first floor concentrates the full exhibition development. The sequence of scopes builds a progressive reading of the territory, from geological and paleoenvironmental processes to cultural evolution and contemporary archaeological research.",
    floor_first_alt: "First floor plan with route and exhibition scopes",
    floor_route_title: "Development: a linear and progressive route in the exhibition room",
    floor_route_p1: "The main body of the route unfolds on the first floor, with a layout designed to support a linear, orderly, and comfortable progression.",
    floor_route_p2: "Transitions between scopes are solved through approximately 250 cm divider walls, organizing circulation and revealing each space in sequence.",
    floor_route_p3: "The alternation of resources and atmospheres sustains interest and strengthens understanding of the scientific narrative.",
    floor_end_title: "Conclusion: the terrace as a meaningful ending",
    floor_end_p1: "The exit to the terrace acts as the final scope of the route and as a symbolic transition between the interior narrative and the real landscape.",
    floor_end_p2: "This closure directly links knowledge and territory, turning the surroundings into a tangible continuation of what was learned.",
    museum_3d_title: "Interactive 3D recreation of the museum",
    museum_3d_intro: "Explore the museum by sections. Click a section to highlight it and read its description.",
    museum_3d_floor_switch_aria: "Museum floor selector",
    museum_3d_floor_ground: "Ground floor",
    museum_3d_floor_first: "First floor",
    museum_3d_legend_ground: "Ground floor legend",
    museum_3d_legend_first: "First floor legend",
    museum_3d_sections_title: "Sections",
    museum_3d_canvas_aria: "Interactive museum floor plan with selectable zones",
    museum_3d_viewer_hint: "Tap a coloured zone on the plan or pick a section from the list.",
    museum_3d_detail_title: "Choose a section",
    museum_3d_detail_hint:
      "Click any coloured zone on the plan or use the list to read its description.",
    floor_detail_alt: "First floor detail with scopes AN, 0, 1, 2, and 3",
    floor_narrative_alt: "Museographic narrative text on linear development and terrace conclusion",
    theme_mode_dark: "Dark mode",
    theme_mode_light: "Light mode",
    footer_title: "Paleomagina",
    footer_p: "Sierra Magina, science and heritage for everyone.",
    footer_contact: "Contact",
    scope_meta: "Includes text, images, videos, gallery, curiosities, timeline, and QR.",
    page_glossary_title: "Paleomagina | Glossary",
    page_audiovisuals_title: "Paleomagina | Audiovisuals",
    glossary_title: "Scientific glossary",
    glossary_intro: "Key terms in geology, paleontology, and archaeology explained clearly and accessibly for all audiences.",
    glossary_search_placeholder: "Search term...",
    glossary_no_results: "No results found for your search.",
    glossary_context_title: "Scientific context",
    glossary_geology: "Geology",
    glossary_geology_p: "Science that studies the structure, composition, and evolution of the Earth and its rocks.",
    glossary_paleontology: "Paleontology",
    glossary_paleontology_p: "Science that studies fossils and past life on our planet.",
    glossary_archaeology: "Archaeology",
    glossary_archaeology_p: "Science that studies past cultures through their material remains.",
    audiovisuals_title: "Educational audiovisuals",
    audiovisuals_intro: "Documentaries, short pieces, and area-specific explanations with subtitles in Spanish and English.",
    audiovisuals_available: "Available content",
    audiovisuals_section_lead:
      "Pick an area to filter short pieces and documentaries with subtitles.",
    img_audiovisuals_banner_alt: "Science, technology and audiovisual outreach at Paleomagina",
    audiovisuals_accessibility: "Accessibility",
    audiovisuals_subtitles: "Subtitles",
    audiovisuals_subtitles_p: "All audiovisuals include subtitles in Spanish and English to ensure hearing accessibility.",
    audiovisuals_descriptions: "Audio descriptions",
    audiovisuals_descriptions_p: "Audio descriptions available for visually impaired users in selected content.",
    audiovisuals_transcripts: "Transcripts",
    audiovisuals_transcripts_p: "Access to full text of each audiovisual for academic consultation and digital inclusion.",
    filter_all: "All",
    filter_geology: "Geology",
    filter_paleontology: "Paleontology",
    filter_archaeology: "Archaeology",
    que_es_title: "What is Paleomágina",
    que_es_intro:
      "Paleomágina is a scientific, archaeological, and museographic centre focused on interpreting Sierra Mágina through geology, palaeontology, archaeology, and human evolution. The project treats the territory as a vast natural archive where the landscape preserves millions of years of history.",
    que_es_li_rocks: "Rocks carry readable information in strata and fossils.",
    que_es_li_landscape: "The landscape keeps traces of the past—visible and hidden.",
    que_es_li_science: "Science interprets those traces with method and evidence.",
    que_es_li_history: "History is reconstructed from remains, contexts, and comparison.",
    que_es_combine: "The museum rests on four core ideas and unfolds along seven lines of work:",
    que_es_pillar_1: "Science.",
    que_es_pillar_2: "Outreach.",
    que_es_pillar_3: "Education.",
    que_es_pillar_4: "Cultural tourism.",
    que_es_pillar_5: "Citizen participation.",
    que_es_pillar_6: "Emotional experience.",
    que_es_pillar_7: "Rigour and accessibility in reading the territory.",
    about_highlights_title: "Project strands",
    about_h1: "Field, lab, and territory science.",
    about_h2: "Heritage communication for Sierra Mágina.",
    about_h3: "Education and diverse audiences.",
    about_h4: "Cultural tourism and regional reference.",
    about_h5: "Citizen participation and shared memory.",
    about_h6: "Progressive museum experience by scopes.",
    about_h7: "Connection between evidence and emotion.",
    obj_museum_title: "Museum objectives",
    obj_museum_intro:
      "Paleomágina connects research, outreach, and the visit around four complementary strands, each with clear goals.",
    obj_sci_t: "Scientific objectives",
    obj_sci_intro: "Focus on method and transparent knowledge:",
    obj_sci_li1: "Explain how the past is investigated.",
    obj_sci_li2: "Show archaeological and palaeontological work.",
    obj_sci_li3: "Share scientific knowledge.",
    obj_sci_li4: "Teach the scientific method.",
    obj_edu_t: "Educational objectives",
    obj_edu_intro: "Content for different ages and paces:",
    obj_edu_li1: "Support understanding of complex processes.",
    obj_edu_li2: "Adapt content to all ages.",
    obj_edu_li3: "Stimulate scientific curiosity.",
    obj_edu_li4: "Favour active learning.",
    obj_tour_t: "Tourism objectives",
    obj_tour_intro: "Place in the region’s cultural offer:",
    obj_tour_li1: "Strengthen Sierra Mágina as a cultural destination.",
    obj_tour_li2: "Grow and diversify visitors.",
    obj_tour_li3: "Consolidate scientific and nature tourism.",
    obj_tour_li4: "Become a regional reference.",
    obj_soc_t: "Social objectives",
    obj_soc_intro: "Living heritage and citizenship:",
    obj_soc_li1: "Connect citizens and heritage.",
    obj_soc_li2: "Reinforce territorial identity.",
    obj_soc_li3: "Build conservation awareness.",
    obj_soc_li4: "Create shared memory.",
    philosophy_title: "Project philosophy",
    phil_archives_t: "The landscape as an archive of time",
    phil_archives_lead:
      "Sierra Mágina is presented as a geological archive, natural memory, and territory shaped over millions of years.",
    phil_archives_li1: "Geological archive: strata, caves, and sites.",
    phil_archives_li2: "Natural memory in relief and processes.",
    phil_archives_li3: "A place to read natural and human processes.",
    phil_archives_li4: "Scientific reading of the territory as shared narrative.",
    phil_process_t: "Science as a living process",
    phil_process_lead: "The museum shows not only results but how knowledge is made.",
    phil_process_li1: "Excavations and fieldwork.",
    phil_process_li2: "Laboratory work and analysis.",
    phil_process_li3: "Interpretation of evidence and debate.",
    phil_process_li4: "Updating the narrative with new data.",
    phil_emotion_t: "Science and emotion",
    phil_emotion_lead: "The exhibition balances rigour and experience.",
    phil_emotion_li1: "Visual impact and clear explanation.",
    phil_emotion_li2: "Immersive experience and varied visit rhythms.",
    phil_emotion_li3: "Scientific rigour in texts and objects.",
    phil_emotion_li4: "Emotional connection with human effort and the environment.",
    building_title: "The building",
    building_visit_teaser:
      "For a step-by-step route through floors, scopes AAN–A9, terrace ATZ, and on-gallery resources —including the timeline and interactive plan— see the ",
    building_visit_teaser_end:
      " page. Below is a summary of overall layout, main spaces, and accessibility.",
    building_org_t: "Overall layout",
    building_org_lead: "The building structures the visit in height and depth:",
    building_org_li1: "Basement: scientific stores and services linked to research.",
    building_org_li2: "Ground floor: welcome, orientation, and start of the narrative.",
    building_org_li3: "First floor: permanent exhibition, transitions, and panoramic terrace.",
    building_spaces_t: "Main spaces",
    building_spaces_lead: "Rooms and uses for the full experience:",
    building_spaces_li1: "Permanent exhibition and chronological route.",
    building_spaces_li2: "Rooms for temporary exhibitions.",
    building_spaces_li3: "Lecture hall and activities.",
    building_spaces_li4: "Laboratory and analysis spaces.",
    building_spaces_li5: "Outdoor educational courtyard.",
    building_spaces_li6: "Panoramic terrace ATZ as a landscape closure.",
    building_access_t: "Accessibility",
    building_access_lead: "Inclusive design and clear circulation:",
    building_access_li1: "Lift and accessible routes.",
    building_access_li2: "Adapted circulation and consistent signage.",
    building_access_li3: "Accessible on-screen information and guided visit support.",
    building_access_li4: "Compatibility with different mobility and timing needs.",
    building_photo_caption: "Paleomágina interpretation centre: exterior view.",
    building_map_caption: "Archaeological map of Sierra Mágina.",
    expo_concept_title: "Permanent exhibition concept",
    expo_concept_lead:
      "The exhibition works as a time journey, chronological path, and progressive discovery: scientific interpretation of the territory with gradual revelation of spaces.",
    expo_concept_li1: "Partition walls and differentiated sectors.",
    expo_concept_li2: "Zigzag circulation ordering the narrative.",
    expo_concept_li3: "Lighting and atmosphere shifts between scopes.",
    expo_concept_li4: "Panels, showcases, audiovisuals, and objects supporting the method.",
    expo_concept_li5: "Terrace closure: the museum continues in the landscape.",
    expo_route_detail_title: "Exhibition route by scope",
    expo_route_detail_lead:
      "Expand each block for aims, contents, and resources following the museographic script (AAN, A0–A9, ATZ).",
    expo_route_accordion_aria: "Detailed route by exhibition scope",
    expo_permanent_title: "Permanent exhibition and route",
    expo_permanent_intro:
      "Summary of the indoor circuit: welcome, temporal transition, emotional ante-room, sequence A0–A9, voices, and terrace ATZ facing Sierra Mágina.",
    route_rec_title: "Reception and ground floor",
    route_rec_p:
      "Welcome, orientation, conceptual introduction, and narrative preparation with maps, chronologies, panels, objects, and audiovisuals.",
    route_stairs_title: "Stairs and transition",
    route_stairs_p:
      "Stairs introduce geological time through eras, timelines, graphics, vinyls, and interpretive messages between welcome and gallery.",
    route_aan_title: "AAN — Ante-room",
    route_aan_p:
      "Opening space with emotional impact, Neanderthal family, and visual link to the landscape before the numbered sequence.",
    route_a0_tz_title: "Scopes A0–A9 and terrace ATZ",
    route_a0_tz_intro:
      "The sequence runs from the welcome to Sierra Mágina through testimonies and voices; terrace ATZ projects the narrative onto the real horizon.",
    route_a0_tz_li:
      "Includes Tethys, geology and relief, Quaternary, Neanderthal world, Upper Palaeolithic, Neolithic, Chalcolithic, archaeological research (A8), testimonies (A9), and terrace closure.",
    route_resources_title: "Museographic resources",
    route_resources_lead: "Physical, digital, and educational:",
    route_resources_li1: "Physical: showcases, panels, replicas, originals, illustrations, chronologies.",
    route_resources_li2: "Digital: responsive microsite, QR, audiovisuals, interaction, bilingual subtitles.",
    route_resources_li3: "Educational: workshops, school activities, experimental archaeology, educational courtyard.",
    route_public_title: "Target audiences",
    route_public_lead: "Current and strategic audiences:",
    route_public_li1: "Current: schools, families, local tourism, cultural public.",
    route_public_li2: "Strategic: undergraduates, researchers, scientific and nature tourism.",
    route_public_li3: "External education centres and organised groups.",
    route_public_li4: "Local residents and heritage-interested visitors.",
    route_exp_title: "Visitor experience",
    route_exp_lead: "The visit aims to be:",
    route_exp_li1: "Clear, smooth, and understandable.",
    route_exp_li2: "Emotional and participatory.",
    route_exp_li3: "Memorable and adapted to different paces.",
    route_exp_li4: "Consistent with scientific evidence and landscape reading.",
    resources_visit_title: "Practical visit information",
    resources_visit_lead:
      "Guidance for planning your visit; confirm opening hours and bookings with the centre before travelling.",
    resources_visit_li1: "Indicative opening: Tuesday to Sunday, morning and afternoon (check official calendar).",
    resources_visit_li2: "Recommended duration for the full route: 90–120 minutes.",
    resources_visit_li3: "School groups and organised visits: advance booking by email or phone.",
    resources_visit_li4: "Accessibility: lift, accessible routes, and on-gallery support (details at reception).",
    resources_visit_li5: "Getting there: Sierra Mágina (Jaén); transport and parking via municipal or provincial tourism sites.",
    resources_visit_li6: "Admission: publish when officially approved; until then, contact the centre.",
    footer_legal_heading: "Legal information",
    footer_legal_notice: "Legal notice",
    footer_legal_privacy: "Privacy",
    footer_legal_cookies: "Cookies",
    footer_legal_a11y: "Accessibility",
    page_legal_notice_title: "Paleomágina | Legal notice",
    page_legal_privacy_title: "Paleomágina | Privacy",
    page_legal_cookies_title: "Paleomágina | Cookies",
    page_legal_a11y_title: "Paleomágina | Accessibility",
    legal_h1_notice: "Legal notice",
    legal_h1_privacy: "Privacy",
    legal_h1_cookies: "Cookies",
    legal_h1_a11y: "Accessibility",
    media_placeholder_label: "Image coming soon",
  }
};

const scopeDescriptions = {
  es: {
    scope_aan: "Umbral emocional y primera lectura del territorio antes de la secuencia numerada.",
    scope_a0: "Introduccion al museo y guia de visita.",
    scope_a1: "Origen marino del territorio y fosiles del Tetis.",
    scope_a2: "Lectura del relieve, rocas y procesos geologicos.",
    scope_a3: "Clima, fauna y cambios ambientales del Cuaternario.",
    scope_a4: "Vida cotidiana, tecnologia y evidencias neandertales.",
    scope_a5: "Innovaciones humanas del Paleolitico superior.",
    scope_a6: "Primeras comunidades agricultoras y ganaderas.",
    scope_a7: "Metalurgia temprana y transformaciones sociales.",
    scope_a8: "Metodo cientifico, participacion ciudadana y patrimonio.",
    scope_a9: "Voces de investigadores y vecindario; memoria territorial y ciudadania.",
    scope_atz: "Cierre en paisaje: el museo continua en Sierra Magina."
  },
  en: {
    scope_aan: "Emotional threshold and first reading of the territory before numbered scopes.",
    scope_a0: "Museum introduction and visit guide.",
    scope_a1: "Marine origin of the territory and Tethys fossils.",
    scope_a2: "Reading relief, rocks, and geological processes.",
    scope_a3: "Climate, fauna, and environmental changes in the Quaternary.",
    scope_a4: "Daily life, technology, and Neanderthal evidence.",
    scope_a5: "Human innovations in the Upper Paleolithic.",
    scope_a6: "First farming and herding communities.",
    scope_a7: "Early metallurgy and social transformations.",
    scope_a8: "Scientific method, citizen engagement, and heritage.",
    scope_a9: "Researchers and neighbours’ voices; territorial memory and citizenship.",
    scope_atz: "Landscape closure: the museum continues outdoors."
  }
};

const defaultLang = "es";
let currentLang = defaultLang;
const themeStorageKey = "paleomagina-theme";
let currentTheme = "light";

/** Usado por museum3d.js para restaurar textos del panel al cambiar de planta */
function paleomaginaT(key) {
  return translations[currentLang]?.[key] ?? translations.es[key] ?? "";
}
window.paleomaginaT = paleomaginaT;

const THEME_ICON_MOON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
const THEME_ICON_SUN =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
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

/** Ámbitos: acordeón con detalle AAN–ATZ desde data.js (scopeContents) */
function initAmbitosExhibitRoute() {
  const root = document.getElementById("exhibit-route-accordion");
  if (!root || typeof scopeContents === "undefined") return;
  const lang = currentLang === "en" ? "en" : "es";
  const order = ["AAN", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "ATZ"];
  const accDomId = "exhibit-route-bs-accordion";
  root.innerHTML = "";
  const acc = document.createElement("div");
  acc.className = "accordion accordion-flush pm-exhibit-route-accordion";
  acc.id = accDomId;

  order.forEach((code, idx) => {
    const sc = scopeContents[code]?.[lang];
    if (!sc) return;
    const collapseId = `exhibit-collapse-${code}`;
    const headingId = `exhibit-heading-${code}`;
    const item = document.createElement("div");
    item.className = "accordion-item";

    const h = document.createElement("h2");
    h.className = "accordion-header";
    h.id = headingId;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `accordion-button${idx === 0 ? "" : " collapsed"}`;
    btn.setAttribute("data-bs-toggle", "collapse");
    btn.setAttribute("data-bs-target", `#${collapseId}`);
    btn.setAttribute("aria-expanded", idx === 0 ? "true" : "false");
    btn.setAttribute("aria-controls", collapseId);
    btn.textContent = sc.title;

    const region = document.createElement("div");
    region.id = collapseId;
    region.className = `accordion-collapse collapse${idx === 0 ? " show" : ""}`;
    region.setAttribute("aria-labelledby", headingId);
    region.setAttribute("data-bs-parent", `#${accDomId}`);

    const body = document.createElement("div");
    body.className = "accordion-body";

    const p1 = document.createElement("p");
    p1.className = "small text-muted mb-2";
    p1.textContent = sc.description;

    const p2 = document.createElement("p");
    p2.className = "mb-2";
    p2.textContent = sc.content;

    body.appendChild(p1);
    body.appendChild(p2);

    if (sc.timeline) {
      const p3 = document.createElement("p");
      p3.className = "small fw-semibold mb-1";
      p3.textContent = sc.timeline;
      body.appendChild(p3);
    }

    if (Array.isArray(sc.facts) && sc.facts.length) {
      const ul = document.createElement("ul");
      ul.className = "small mb-0";
      sc.facts.forEach((fact) => {
        const li = document.createElement("li");
        li.textContent = fact;
        ul.appendChild(li);
      });
      body.appendChild(ul);
    }

    region.appendChild(body);
    h.appendChild(btn);
    item.appendChild(h);
    item.appendChild(region);
    acc.appendChild(item);
  });

  root.appendChild(acc);
  const aria = paleomaginaT("expo_route_accordion_aria");
  if (aria) acc.setAttribute("aria-label", aria);
}

function updateTimeline(lang, selectedTime) {
  const detail = document.getElementById("timeline-detail");
  if (!detail) return;
  const content = timelineContent[selectedTime]?.[lang];
  if (!content) return;
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

  document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
    const key = node.dataset.i18nAlt;
    const value = translations[lang][key];
    if (value) node.setAttribute("alt", value);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    const value = translations[lang][key];
    if (value) node.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    const value = translations[lang][key];
    if (value) node.setAttribute("placeholder", value);
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderScopes(lang);
  if (!document.querySelector(".timeline-era")) {
    const activeTimeline = document.querySelector(".timeline-item.active");
    const selectedTime = activeTimeline?.dataset.time || "stage1";
    updateTimeline(lang, selectedTime);
  }
  if (typeof window.resetMuseumDetail === "function") {
    if (document.body?.dataset.museumZone && typeof window.refreshMuseumSelection === "function") {
      window.refreshMuseumSelection();
    } else {
      window.resetMuseumDetail();
    }
  }
  updateThemeButtonLabel();
  initAmbitosExhibitRoute();
}

function updateThemeButtonLabel() {
  const labelKey = currentTheme === "dark" ? "theme_mode_light" : "theme_mode_dark";
  const label = translations[currentLang]?.[labelKey] || "Theme";
  const icon = currentTheme === "dark" ? THEME_ICON_SUN : THEME_ICON_MOON;
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.innerHTML = `<span class="theme-toggle-icon">${icon}</span><span class="visually-hidden">${label}</span>`;
    button.setAttribute("aria-label", label);
    button.title = label;
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

/** Marca en la barra superior (Paleomagina / enlaces) qué página HTML está abierta */
function initMainNavActiveState() {
  const nav = document.querySelector(".pm-topnav");
  if (!nav) return;

  const path = window.location.pathname.replace(/\\/g, "/");
  const segments = path.split("/").filter(Boolean);
  let currentFile = segments.length ? segments[segments.length - 1] : "";
  if (!currentFile.includes(".")) currentFile = "index.html";

  nav.querySelectorAll("ul.navbar-nav a.nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    try {
      const resolved = new URL(href, window.location.href);
      let linkFile = resolved.pathname.split("/").filter(Boolean).pop() || "";
      if (!linkFile.includes(".")) linkFile = "index.html";
      const match = linkFile === currentFile;
      link.classList.toggle("active", match);
      if (match) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    } catch (_err) {
      // Ignore malformed href
    }
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
initMainNavActiveState();

/** Sobre: resalta en la subnavegación la sección acorde al scroll */
function initSobreSectionNav() {
  const nav = document.querySelector(".sobre-section-nav");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a.sobre-section-nav-link")];
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.replace("#", "");
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  function setActiveById(currentId) {
    links.forEach((link) => {
      const href = link.getAttribute("href");
      const on = href === `#${currentId}`;
      link.classList.toggle("active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    sections.forEach((sec) => {
      sec.classList.toggle("sobre-section-active", sec.id === currentId);
    });
  }

  function updateActive() {
    const offset = 140;
    const y = window.scrollY + offset;
    let currentId = sections[0].id;
    for (const sec of sections) {
      if (sec.offsetTop <= y) currentId = sec.id;
    }
    setActiveById(currentId);
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => {
        l.classList.remove("is-tapped");
        window.clearTimeout(l._pmTapTimer);
      });
      link.classList.add("is-tapped");
      link._pmTapTimer = window.setTimeout(() => link.classList.remove("is-tapped"), 600);
      const id = link.getAttribute("href")?.replace("#", "");
      if (id) setActiveById(id);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(updateActive);
      });
    });
  });

  updateActive();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSobreSectionNav);
} else {
  initSobreSectionNav();
}
