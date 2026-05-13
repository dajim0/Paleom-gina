// Contenidos ampliados de ambitos con descripciones completas
const scopeContents = {
  AAN: {
    es: {
      title: "AAN — Antesala",
      description:
        "Espacio inicial con familia neandertal, frase introductoria y relación visual con el paisaje. Crea impacto emocional e introduce la dimensión humana antes del recorrido numerado.",
      content:
        "Funciona como umbral afectivo y conceptual: vocabulario mínimo, escenografía que conecta con Sierra Mágina y una primera lectura del territorio como archivo de tiempo.",
      timeline: "Umbral de visita",
      facts: ["Impacto emocional y dimensión humana", "Relación visual con el paisaje exterior", "Preparación narrativa antes de A0"]
    },
    en: {
      title: "AAN — Ante-room",
      description:
        "Opening space with Neanderthal family, introductory line, and visual link to the landscape. Builds emotional impact and a human dimension before the numbered route.",
      content:
        "It works as an affective and conceptual threshold: minimal vocabulary, staging linked to Sierra Mágina, and a first reading of the territory as an archive of time.",
      timeline: "Visit threshold",
      facts: ["Emotional impact and human scale", "Visual link to the outdoor landscape", "Narrative preparation before A0"]
    }
  },
  A9: {
    es: {
      title: "A9 — Testimonios y voces",
      description:
        "Espacio audiovisual con investigadores, habitantes locales, experiencias personales y memoria territorial. Humaniza el discurso y relaciona ciencia y ciudadanía.",
      content:
        "Cierra el circuito interior con voces reales: cómo se investiga, qué significa el patrimonio para quien vive en el entorno y cómo la memoria colectiva dialoga con la evidencia científica.",
      timeline: "Memoria y ciudadanía",
      facts: ["Testimonios de equipo científico y vecindario", "Experiencias personales y memoria territorial", "Puente entre rigor y emoción compartida"]
    },
    en: {
      title: "A9 — Testimonies and voices",
      description:
        "Audiovisual space with researchers, local residents, personal stories, and territorial memory. It humanises the narrative and connects science and citizenship.",
      content:
        "It closes the indoor circuit with real voices: how research happens, what heritage means for people who live nearby, and how collective memory dialogues with scientific evidence.",
      timeline: "Memory and citizenship",
      facts: ["Statements from scientific staff and neighbours", "Personal stories and territorial memory", "A bridge between rigour and shared emotion"]
    }
  },
  A0: {
    es: {
      title: "Bienvenida a Sierra Magina",
      description: "Introducción al museo y guía de visita. Sierra Magina es un territorio extraordinario donde confluyen 250 millones de años de historia geológica y humana.",
      content: "Este ámbito marca el inicio de tu recorrido. Sierra Magina es una montaña que cuenta historias: de antiguos mares, de movimientos terrestres, de cambios climáticos, de los primeros humanos que la habitaron y de las sociedades que evolucionaron en su territorio. A través de ciencia basada en evidencias, reconstruimos esa historia.",
      timeline: "Hoy",
      facts: ["Sierra Magina tiene 2.144 metros de altura", "Contiene registros de 250 millones de años", "Es un Geoparque UNESCO propuesto"]
    },
    en: {
      title: "Welcome to Sierra Magina",
      description: "Museum introduction and visit guide. Sierra Magina is an extraordinary territory where 250 million years of geological and human history converge.",
      content: "This area marks the start of your journey. Sierra Magina is a mountain that tells stories: of ancient seas, of earth movements, of climate change, of the first humans who inhabited it, and of the societies that evolved in its territory. Through evidence-based science, we reconstruct that history.",
      timeline: "Today",
      facts: ["Sierra Magina is 2,144 meters high", "Contains records spanning 250 million years", "A proposed UNESCO Geopark"]
    }
  },
  A1: {
    es: {
      title: "El mar de Tetis",
      description: "Origen marino del territorio y fósiles del Tetis. Entre 200 y 100 millones de años, Sierra Magina fue el fondo de un océano tropical.",
      content: "Durante el Mesozoico, Sierra Magina estuvo completamente sumergida bajo el Mar de Tetis, un vasto océano tropical. Los sedimentos depositados durante millones de años formaron capas que hoy contienen abundantes fósiles: ammonites, belemnites, bivalvos y otros organismos marinos. La lenta evaporación del mar dejó depósitos de sal y yeso que son visibles en las canteras actuales.",
      timeline: "Mesozoico (200-65 M.a.)",
      facts: ["Profundidad estimada: 500-2000 metros", "Temperatura del agua: 25-30°C", "Fósiles frecuentes: Ammonites de 30 cm"]
    },
    en: {
      title: "The Tethys Sea",
      description: "Marine origin of the territory and Tethys fossils. Between 200 and 100 million years ago, Sierra Magina was the floor of a tropical ocean.",
      content: "During the Mesozoic Era, Sierra Magina was completely submerged under the Tethys Sea, a vast tropical ocean. Sediments deposited over millions of years formed layers that today contain abundant fossils: ammonites, belemnites, bivalves, and other marine organisms. The slow evaporation of the sea left deposits of salt and gypsum visible in current quarries.",
      timeline: "Mesozoic (200-65 Ma)",
      facts: ["Estimated depth: 500-2,000 meters", "Water temperature: 25-30°C", "Common fossils: Ammonites up to 30 cm"]
    }
  },
  A2: {
    es: {
      title: "Geología y orografía",
      description: "Lectura del relieve, rocas y procesos geológicos. Cómo el levantamiento tectónico transformó un fondo marino en montaña.",
      content: "Hace 65 millones de años comenzó el levantamiento de la cadena bética. Las capas marinas se plegaron, fracturaron y elevaron, transformando el fondo del océano en tierra. Las rocas calizas, dolomías y margas de origen marino son ahora los componentes principales de Sierra Magina. La erosión ha modelado profundas gargantas y cuevas, creando un paisaje kárstico de gran belleza.",
      timeline: "Cenozoico (65 M.a. - hoy)",
      facts: ["Tasa de elevación: 0.5-1 mm/año", "Número de cuevas catalogadas: 47", "Principales: Cueva del Agua, Cueva de la Sorda"]
    },
    en: {
      title: "Geology and orography",
      description: "Reading relief, rocks, and geological processes. How tectonic uplift transformed an ocean floor into a mountain.",
      content: "Sixty-five million years ago, the uplift of the Betic chain began. Marine layers folded, fractured, and rose, transforming the ocean floor into land. Limestone, dolomite, and marl rocks of marine origin are now the main components of Sierra Magina. Erosion has sculpted deep gorges and caves, creating a karst landscape of great beauty.",
      timeline: "Cenozoic (65 Ma - present)",
      facts: ["Uplift rate: 0.5-1 mm/year", "Number of catalogued caves: 47", "Major: Water Cave, Deaf Woman's Cave"]
    }
  },
  A3: {
    es: {
      title: "Cuaternario",
      description: "Clima, fauna y cambios ambientales. La era de las glaciaciones y los primeros humanos.",
      content: "Los últimos 2.5 millones de años fueron marcados por ciclos de frío intenso y calentamiento. Sierra Magina experimentó múltiples glaciaciones que dejaron depósitos de sedimentos glaciares. La fauna cambió drásticamente: rinocerontes lanudos, mamuts, hienas de las cavernas y luego, los primeros humanos adaptados al frío. Los glaciares retrocedieron y el clima se estabilizó hace apenas 10.000 años.",
      timeline: "Cuaternario (2.5 M.a. - hoy)",
      facts: ["Ciclos glaciares: 4-5 principales", "Temperatura media en glaciaciones: -10°C", "Primer registro humano: hace 300.000 años"]
    },
    en: {
      title: "Quaternary",
      description: "Climate, fauna, and environmental changes. The era of glaciations and the first humans.",
      content: "The last 2.5 million years were marked by cycles of intense cold and warming. Sierra Magina experienced multiple glaciations that left glacial sediment deposits. Fauna changed dramatically: woolly rhinoceroses, mammoths, cave hyenas, and then the first humans adapted to cold. Glaciers retreated and the climate stabilized only 10,000 years ago.",
      timeline: "Quaternary (2.5 Ma - present)",
      facts: ["Glacial cycles: 4-5 major ones", "Average temperature during glaciations: -10°C", "First human record: 300,000 years ago"]
    }
  },
  A4: {
    es: {
      title: "Mundo neandertal",
      description: "Vida cotidiana, tecnología y evidencias neandertales. Una especie humana adaptada al frío extremo.",
      content: "Los neandertales (Homo neanderthalensis) dominaron Europa entre hace 400.000 y 40.000 años. En Sierra Magina encontramos evidencias de su presencia: herramientas de piedra tallada, restos óseos y, en ocasiones, evidencias de enterramientos. Eran cazadores especializados, con cerebro comparable al nuestro, capaces de hacer fuego, cuidar a sus enfermos y posiblemente tener lenguaje. Se extinguieron hace 40.000 años, posiblemente tras la llegada de los Homo sapiens.",
      timeline: "Paleolítico Medio (400.000-40.000 a.C.)",
      facts: ["Altura promedio: 165 cm", "Capacidad craneal: 1.450-1.750 cc", "Arqueosítios: Cueva de las Grajas, Cueva de la Cabrería"]
    },
    en: {
      title: "Neanderthal world",
      description: "Daily life, technology, and Neanderthal evidence. A human species adapted to extreme cold.",
      content: "Neanderthals (Homo neanderthalensis) dominated Europe between 400,000 and 40,000 years ago. In Sierra Magina we find evidence of their presence: flaked stone tools, bone remains, and occasionally burial evidence. They were specialized hunters with brains comparable to ours, capable of making fire, caring for the sick, and possibly having language. They went extinct 40,000 years ago, possibly after the arrival of Homo sapiens.",
      timeline: "Middle Paleolithic (400,000-40,000 BC)",
      facts: ["Average height: 165 cm", "Cranial capacity: 1,450-1,750 cc", "Archaeological sites: Grajas Cave, Cabrería Cave"]
    }
  },
  A5: {
    es: {
      title: "Paleolítico superior",
      description: "Innovaciones humanas del Paleolítico superior. Arte, símbolos y consolidación de Homo sapiens.",
      content: "Hace 40.000 años, los Homo sapiens llegaron a Europa y con ellos nuevas tecnologías y capacidades. El Paleolítico superior vio la explosión del arte: grabados en piedra, esculturas en marfil y hueso, posiblemente música. Las herramientas se hicieron más sofisticadas, con puntas de flecha especializadas para diferentes presas. Las redes sociales se ampliaron, el comercio a larga distancia se intensificó y aparecen los primeros santuarios compartidos.",
      timeline: "Paleolítico Superior (40.000-10.000 a.C.)",
      facts: ["Tecnología: láminas, buriles, arpones", "Primeras flautas: hace 35.000 años", "Arte rupestre identificado en la región"]
    },
    en: {
      title: "Upper Paleolithic",
      description: "Human innovations in the Upper Paleolithic. Art, symbols, and consolidation of Homo sapiens.",
      content: "Forty thousand years ago, Homo sapiens arrived in Europe bringing new technologies and abilities. The Upper Paleolithic saw an explosion of art: stone engravings, ivory and bone sculptures, possibly music. Tools became more sophisticated, with specialized arrowheads for different prey. Social networks expanded, long-distance trade intensified, and the first shared sanctuaries appeared.",
      timeline: "Upper Paleolithic (40,000-10,000 BC)",
      facts: ["Technology: blades, burins, harpoons", "First flutes: 35,000 years ago", "Rock art identified in the region"]
    }
  },
  A6: {
    es: {
      title: "Neolítico",
      description: "Primeras comunidades agricultoras y ganaderas. La transformación más importante de la humanidad.",
      content: "Hace 10.000 años comenzó la revolución neolítica. Las sociedades de cazadores-recolectores se transformaron en agricultoras y ganaderas. En Sierra Magina, encontramos evidencia de cereales cultivados, domesticación de cabras y ovejas, y asentamientos más permanentes. Esta transición permitió el crecimiento de la población, la especialización del trabajo y la acumulación de bienes. Aparecen las primeras cerámicas decoradas y los primeros templos colectivos.",
      timeline: "Neolítico (10.000-4.500 a.C.)",
      facts: ["Primeros cereales: trigo y cebada", "Plantas domesticadas: legumbres, lino", "Asentamientos tipo: poblados de 50-200 personas"]
    },
    en: {
      title: "Neolithic",
      description: "First farming and herding communities. The most important transformation in humanity.",
      content: "Ten thousand years ago, the Neolithic Revolution began. Hunter-gatherer societies transformed into farming and pastoral communities. In Sierra Magina, we find evidence of cultivated cereals, domestication of goats and sheep, and more permanent settlements. This transition enabled population growth, labor specialization, and accumulation of goods. Decorated pottery and the first collective temples appear.",
      timeline: "Neolithic (10,000-4,500 BC)",
      facts: ["First cereals: wheat and barley", "Domesticated plants: legumes, flax", "Settlement type: villages of 50-200 people"]
    }
  },
  A7: {
    es: {
      title: "Calcolítico",
      description: "Metalurgia temprana y transformaciones sociales. El cobre, la riqueza y la diferenciación social.",
      content: "Hace 5.000 años, llegó la metalurgia del cobre. Este metal podía ser trabajado en frío y, mediante calor, forjado en herramientas más eficientes. La minería del cobre generó riqueza concentrada. Aparecen las primeras élites, fortificaciones y conflictos organizados. Los enterramientos calcolíticos muestran diferenciación social clara: algunos individuos reciben elaborados ajuares mientras otros tienen entierros sencillos. Se desarrollan sistemas complejos de intercambio comercial.",
      timeline: "Calcolítico (5.000-3.500 a.C.)",
      facts: ["Minas de cobre: Linares y Peñarroya", "Primeras armas: puntas de cobre", "Asentamientos amurallados: Fuente Álamo"]
    },
    en: {
      title: "Chalcolithic",
      description: "Early metallurgy and social transformations. Copper, wealth, and social differentiation.",
      content: "Five thousand years ago, copper metallurgy arrived. This metal could be worked cold and, through heat, forged into more efficient tools. Copper mining generated concentrated wealth. The first elites, fortifications, and organized conflicts appear. Chalcolithic burials show clear social differentiation: some individuals receive elaborate grave goods while others have simple burials. Complex systems of commercial exchange develop.",
      timeline: "Chalcolithic (5,000-3,500 BC)",
      facts: ["Copper mines: Linares and Peñarroya", "First weapons: copper points", "Fortified settlements: Fuente Álamo"]
    }
  },
  A8: {
    es: {
      title: "Ciencia y ciudadanía",
      description: "Método científico, participación ciudadana y patrimonio. Cómo la arqueología se abre a la sociedad.",
      content: "La investigación arqueológica en Sierra Magina sigue el método científico riguroso: observación, hipótesis, experimentación y conclusiones basadas en evidencias. Excavamos, registramos en 3D, analizamos en laboratorio, datamos con carbono-14 y comparamos con otras regiones. Pero además, abrimos las investigaciones a la ciudadanía: participan en excavaciones, aprenden a identificar artefactos, comprenden cómo reconstruimos la historia. El patrimonio de Sierra Magina es de todos y para todos.",
      timeline: "Presente y futuro",
      facts: ["Campañas de excavación: anuales", "Participantes ciudadanos: 50-100/año", "Publicaciones científicas: 5-8/año"]
    },
    en: {
      title: "Science and citizenship",
      description: "Scientific method, citizen engagement, and heritage. How archaeology opens to society.",
      content: "Archaeological research in Sierra Magina follows rigorous scientific method: observation, hypothesis, experimentation, and evidence-based conclusions. We excavate, record in 3D, analyze in the lab, date with carbon-14, and compare with other regions. But we also open research to citizens: they participate in digs, learn to identify artifacts, understand how we reconstruct history. Sierra Magina's heritage belongs to everyone and is for everyone.",
      timeline: "Present and future",
      facts: ["Excavation campaigns: annual", "Citizen participants: 50-100/year", "Scientific publications: 5-8/year"]
    }
  },
  ATZ: {
    es: {
      title: "ATZ — Terraza final",
      description:
        "El museo continúa en el paisaje: desde la terraza se observa Sierra Mágina aplicando geología, relieve, historia humana y transformación del territorio.",
      content:
        "La visita no termina en sala: el horizonte pasa a ser parte de la exposición. Allí se relaciona lo visto en vitrinas y paneles con laderas, crestas y valles, cerrando el relato entre evidencia y territorio real.",
      timeline: "Todas las eras",
      facts: ["Altitud: 2.144 metros", "Visibilidad: hasta 50 km en días claros", "Especies vegetales: 60+ especies endémicas"]
    },
    en: {
      title: "ATZ — Final terrace",
      description:
        "The museum continues in the landscape: from the terrace you read Sierra Mágina through geology, relief, human history, and how the territory has changed.",
      content:
        "The visit does not end indoors: the horizon becomes part of the exhibition. What you saw in cases and panels connects with slopes, ridges, and valleys, closing the narrative between evidence and the real territory.",
      timeline: "All eras",
      facts: ["Altitude: 2,144 meters", "Visibility: up to 50 km on clear days", "Plant species: 60+ endemic species"]
    }
  }
};

// Glosario científico
const glossary = {
  es: [
    { term: "Ammonite", def: "Molusco marino extinto con concha en espiral. Fósil guía del Mesozoico." },
    { term: "Estratigrafía", def: "Ciencia que estudia el orden y la composición de las capas rocosas." },
    { term: "Fósil", def: "Resto o huella de un organismo antiguo conservado en una roca." },
    { term: "Geología", def: "Ciencia que estudia la estructura, composición y evolución de la Tierra." },
    { term: "Glaciación", def: "Período de clima frío en el que los glaciares avanzan sobre grandes áreas." },
    { term: "Homo neanderthalensis", def: "Especie humana extinta que vivió en Europa hace 400.000-40.000 años." },
    { term: "Homo sapiens", def: "Especie humana actual. Surgió en África hace ~300.000 años." },
    { term: "Kárstico", def: "Paisaje formado por la disolución de rocas solubles como la caliza y la dolomía." },
    { term: "Mesozoico", def: "Era geológica hace 252-66 millones de años. Era de los dinosaurios." },
    { term: "Metalurgia", def: "Tecnología de extracción y trabajo de metales." },
    { term: "Neolítico", def: "Período de la prehistoria en el que surge la agricultura (10.000-3.500 a.C.)." },
    { term: "Paleolítico", def: "Período más antiguo de la prehistoria caracterizado por el uso de herramientas de piedra." },
    { term: "Paleontología", def: "Ciencia que estudia los fósiles y la vida pasada." },
    { term: "Sedimento", def: "Material sólido o fragmentos de roca transportados y depositados por agua o viento." },
    { term: "Tetis", def: "Antiguo océano tropical que existió entre Europa y África durante el Mesozoico." }
  ],
  en: [
    { term: "Ammonite", def: "Extinct marine mollusk with spiral shell. Guide fossil of the Mesozoic." },
    { term: "Stratigraphy", def: "Science that studies the order and composition of rock layers." },
    { term: "Fossil", def: "Remains or traces of an ancient organism preserved in rock." },
    { term: "Geology", def: "Science that studies the structure, composition, and evolution of the Earth." },
    { term: "Glaciation", def: "Period of cold climate when glaciers advance over large areas." },
    { term: "Homo neanderthalensis", def: "Extinct human species that lived in Europe 400,000-40,000 years ago." },
    { term: "Homo sapiens", def: "Current human species. Emerged in Africa ~300,000 years ago." },
    { term: "Karst", def: "Landscape formed by dissolution of soluble rocks like limestone and dolomite." },
    { term: "Mesozoic", def: "Geological era 252-66 million years ago. Age of dinosaurs." },
    { term: "Metallurgy", def: "Technology of metal extraction and working." },
    { term: "Neolithic", def: "Prehistoric period when agriculture emerged (10,000-3,500 BC)." },
    { term: "Paleolithic", def: "Oldest period of prehistory characterized by stone tool use." },
    { term: "Paleontology", def: "Science that studies fossils and past life." },
    { term: "Sediment", def: "Solid material or rock fragments transported and deposited by water or wind." },
    { term: "Tethys", def: "Ancient tropical ocean that existed between Europe and Africa during the Mesozoic." }
  ]
};

// Audiovisuales con metadatos
const audiovisuals = {
  es: [
    { id: 1, scope: "A1", title: "El Tetis: un océano perdido", duration: "8:45", subtitle: true },
    { id: 2, scope: "A2", title: "Cómo nace una montaña", duration: "6:30", subtitle: true },
    { id: 3, scope: "A3", title: "Glaciaciones: el ciclo del hielo", duration: "10:15", subtitle: true },
    { id: 4, scope: "A4", title: "Neandertales: habitantes del frío", duration: "7:45", subtitle: true },
    { id: 5, scope: "A5", title: "El arte rupestre del Paleolítico", duration: "9:00", subtitle: true },
    { id: 6, scope: "A6", title: "La revolución neolítica", duration: "11:30", subtitle: true },
    { id: 7, scope: "A7", title: "Primeros metales, primeras élites", duration: "8:15", subtitle: true },
    { id: 8, scope: "A8", title: "Arqueología: desenterrando el pasado", duration: "12:00", subtitle: true }
  ],
  en: [
    { id: 1, scope: "A1", title: "The Tethys: a lost ocean", duration: "8:45", subtitle: true },
    { id: 2, scope: "A2", title: "How mountains are born", duration: "6:30", subtitle: true },
    { id: 3, scope: "A3", title: "Glaciations: the ice cycle", duration: "10:15", subtitle: true },
    { id: 4, scope: "A4", title: "Neanderthals: inhabitants of the cold", duration: "7:45", subtitle: true },
    { id: 5, scope: "A5", title: "Paleolithic rock art", duration: "9:00", subtitle: true },
    { id: 6, scope: "A6", title: "The Neolithic Revolution", duration: "11:30", subtitle: true },
    { id: 7, scope: "A7", title: "First metals, first elites", duration: "8:15", subtitle: true },
    { id: 8, scope: "A8", title: "Archaeology: excavating the past", duration: "12:00", subtitle: true }
  ]
};

// Índice de códigos QR por ámbito
const qrIndex = {
  es: {
    A0: { url: "/ambitos/bienvenida", label: "Bienvenida", floor: "PB" },
    A1: { url: "/ambitos/tetis", label: "El mar de Tetis", floor: "P1" },
    A2: { url: "/ambitos/geologia", label: "Geología y orografía", floor: "P1" },
    A3: { url: "/ambitos/cuaternario", label: "Cuaternario", floor: "P1" },
    A4: { url: "/ambitos/neandertales", label: "Mundo neandertal", floor: "P1" },
    A5: { url: "/ambitos/paleolitico-superior", label: "Paleolítico superior", floor: "P1" },
    A6: { url: "/ambitos/neolitico", label: "Neolítico", floor: "P1" },
    A7: { url: "/ambitos/calcolitico", label: "Calcolítico", floor: "P1" },
    A8: { url: "/ambitos/ciencia", label: "Ciencia y ciudadanía", floor: "P1" },
    ATZ: { url: "/ambitos/terraza", label: "Terraza y paisaje", floor: "P1" }
  },
  en: {
    A0: { url: "/exhibits/welcome", label: "Welcome", floor: "GF" },
    A1: { url: "/exhibits/tethys", label: "The Tethys Sea", floor: "F1" },
    A2: { url: "/exhibits/geology", label: "Geology and orography", floor: "F1" },
    A3: { url: "/exhibits/quaternary", label: "Quaternary", floor: "F1" },
    A4: { url: "/exhibits/neanderthals", label: "Neanderthal world", floor: "F1" },
    A5: { url: "/exhibits/paleolithic", label: "Upper Paleolithic", floor: "F1" },
    A6: { url: "/exhibits/neolithic", label: "Neolithic", floor: "F1" },
    A7: { url: "/exhibits/chalcolithic", label: "Chalcolithic", floor: "F1" },
    A8: { url: "/exhibits/science", label: "Science and citizenship", floor: "F1" },
    ATZ: { url: "/exhibits/terrace", label: "Terrace and landscape", floor: "F1" }
  }
};

// Funciones auxiliares para acceder a contenidos
function getScopeContent(scopeCode, lang = "es") {
  return scopeContents[scopeCode]?.[lang] || null;
}

function getGlossary(lang = "es") {
  return glossary[lang] || [];
}

function getAudiovisuals(lang = "es") {
  return audiovisuals[lang] || [];
}

function getQRInfo(scopeCode, lang = "es") {
  return qrIndex[lang]?.[scopeCode] || null;
}
