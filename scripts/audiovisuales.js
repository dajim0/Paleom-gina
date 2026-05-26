// Catálogo audiovisual Paleomagina — rutas, playlists y piezas (ES/EN)
const audiovisualCatalog = {
  es: {
    routes: [
      { id: "geo", title: "Geología y paisaje", text: "Tiempo profundo, placas tectónicas, rocas y formación del relieve de Sierra Mágina." },
      { id: "paleo", title: "Fósiles y vida antigua", text: "Mares antiguos, fósiles, fauna cuaternaria y reconstrucción de ecosistemas pasados." },
      { id: "human", title: "Evolución humana", text: "Neandertales, arte, tecnología lítica y cambios en las formas de vida." },
      { id: "arch", title: "Arqueología y método", text: "Excavación, datación, evidencias materiales y construcción del conocimiento científico." },
      { id: "museum", title: "Museo y visita", text: "Cómo los audiovisuales complementan ámbitos, línea temporal, glosario y terraza final." },
    ],
    playlists: [
      { id: "before", title: "Antes de la visita", text: "Vídeos breves para situar el territorio, el tiempo geológico y las grandes preguntas del recorrido." },
      { id: "during", title: "Durante el recorrido", text: "Piezas que enlazan con ámbitos concretos mientras avanzas por la exposición." },
      { id: "after", title: "Después de la visita", text: "Profundiza metodología, paisaje y memoria territorial una vez completado el circuito." },
    ],
    levels: { general: "Público general", school: "Centros educativos", all: "Todos los niveles" },
    items: [
      {
        id: "yt-placas",
        youtubeId: "bffze7j_wWE",
        theme: "geo",
        playlists: ["before"],
        scope: "A2",
        level: "general",
        icon: "🌐",
        title: "Bordes de placa en 10 minutos",
        summary: "Resumen sobre bordes de placa, terremotos y volcanes.",
        learn: ["Relaciona procesos tectónicos con relieve y riesgos geológicos.", "Prepara la lectura de geología y orografía en el recorrido."],
        glossary: ["Falla", "Plegamiento", "Geología"],
        transcript: "El vídeo explica qué son los bordes de placa, cómo se desplazan las masas litosféricas y por qué aparecen terremotos y volcanes. Es una introducción útil para entender cómo se forman cordilleras como la Bética y el paisaje actual de Sierra Mágina.",
        teacher: "¿Qué relación hay entre placas tectónicas y el relieve que vemos hoy? · Dibuja un esquema simple de colisión entre placas.",
        duration: "10 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-iberia-geo",
        youtubeId: "OCPjD_dzcls",
        theme: "geo",
        playlists: ["before", "during"],
        scope: "A2",
        level: "school",
        icon: "🧭",
        title: "Evolución geológica de la Península Ibérica",
        summary: "Guía sobre la historia geológica de la península.",
        learn: ["Sitúa Sierra Mágina dentro de la evolución geológica de Iberia.", "Conecta mares antiguos, sedimentos y levantamientos tectónicos."],
        glossary: ["Mesozoico", "Sedimento", "Orografía"],
        transcript: "Recorre las grandes etapas que transformaron la península: antiguos océanos, sedimentación, orogenias y modelado del relieve. Ayuda a comprender por qué en zonas interiores montañosas aún encontramos fósiles marinos.",
        teacher: "¿Qué etapas geológicas reconoces en el vídeo? · ¿Por qué Iberia conserva evidencias de antiguos mares?",
        duration: "15 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-tierra",
        youtubeId: "5i9zPNzfdbU",
        theme: "geo",
        playlists: ["before"],
        scope: "A1",
        level: "general",
        icon: "🌍",
        title: "Evolución de la Tierra",
        summary: "Origen del planeta y grandes cambios a lo largo del tiempo.",
        learn: ["Introduce la escala del tiempo geológico.", "Prepara la línea temporal interactiva del museo."],
        glossary: ["Geología", "Cenozoico", "Línea temporal"],
        transcript: "Presenta el origen de la Tierra y los procesos que la han transformado: formación de la atmósfera, aparición de océanos, cambios climáticos y evolución de la vida. Es una puerta de entrada al relato temporal del centro.",
        teacher: "Ordena cinco hitos del vídeo en una línea temporal dibujada. · ¿Qué escala temporal te resulta más difícil de imaginar?",
        duration: "12 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-estructura",
        youtubeId: "Mx4RpaJ9OOA",
        theme: "geo",
        playlists: ["before"],
        scope: "A2",
        level: "school",
        icon: "🧪",
        title: "Estructura y composición de la Tierra",
        summary: "Capas internas del planeta y sus materiales.",
        learn: ["Diferencia corteza, manto y núcleo.", "Relaciona procesos internos con fenómenos en superficie."],
        glossary: ["Geología", "Sedimento", "Falla"],
        transcript: "Describe las capas que forman el planeta y cómo influyen en volcanismo, terremotos y formación de rocas. Refuerza la idea de que el territorio visible es solo la parte superior de un sistema mucho más complejo.",
        teacher: "Etiqueta un diagrama de capas terrestres. · ¿Qué capa condiciona directamente lo que excavamos o estudiamos en superficie?",
        duration: "11 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-escala",
        youtubeId: "ptO0m3BjghQ",
        theme: "geo",
        playlists: ["before", "during"],
        scope: "A1",
        level: "general",
        icon: "⏳",
        title: "Escala de tiempo geológico",
        summary: "Eras y periodos que ordenan la historia de la Tierra.",
        learn: ["Entrena la lectura de eras y periodos.", "Facilita la comprensión de la secuencia expositiva."],
        glossary: ["Mesozoico", "Cuaternario", "Cenozoico"],
        transcript: "Explica cómo los geólogos dividen el tiempo en eras y periodos, y qué eventos marcan cada tramo. Es clave para no perderse entre millones de años y cambios humanos recientes.",
        teacher: "Construye una escala con al menos cuatro divisiones y un ejemplo de cada una.",
        duration: "9 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-historia",
        youtubeId: "UEx5hCcxO-Y",
        theme: "geo",
        playlists: ["before"],
        scope: "A0",
        level: "general",
        icon: "📚",
        title: "Historia de la Tierra",
        summary: "Hitos del desarrollo geológico del planeta.",
        learn: ["Resume los grandes cambios del planeta.", "Conecta geología con aparición y evolución de la vida."],
        glossary: ["Fósil", "Paleontología", "Geología"],
        transcript: "Recorre acontecimientos como la formación de la Luna, la aparición de la vida, la diversificación de organismos y las grandes extinciones. Sirve como mapa general antes de entrar en los ámbitos del museo.",
        teacher: "Elige tres hitos y explícalos con tus propias palabras.",
        duration: "14 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-rocas",
        youtubeId: "3Vaj7YNepik",
        theme: "geo",
        playlists: ["during"],
        scope: "A2",
        level: "school",
        icon: "🪨",
        title: "Tipos de rocas",
        summary: "Rocas ígneas, sedimentarias y metamórficas.",
        learn: ["Identifica tipos de roca en vitrinas y paneles.", "Relaciona rocas con procesos y fósiles."],
        glossary: ["Caliza", "Sedimento", "Dolomía"],
        transcript: "Clasifica las rocas según su origen y proceso de formación. En Paleomágina esta base ayuda a leer calizas, margas y dolomías presentes en el territorio de Sierra Mágina.",
        teacher: "Busca ejemplos de cada tipo de roca en fotografías del museo o del paisaje.",
        duration: "8 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-placas2",
        youtubeId: "Vx6ESMK4CCk",
        theme: "geo",
        playlists: ["before"],
        scope: "A2",
        level: "general",
        icon: "🌍",
        title: "Placas tectónicas",
        summary: "Origen de océanos y movimiento de placas.",
        learn: ["Comprende deriva continental y formación de cuencas.", "Enlaza con el antiguo mar de Tetis."],
        glossary: ["Tetis", "Falla", "Levantamiento tectónico"],
        transcript: "Explica la teoría de placas tectónicas con ejemplos de dorsales, subducción y colisión. Permite entender cómo un fondo marino puede acabar convertido en montaña.",
        teacher: "¿Qué proceso tectónico explica que haya fósiles marinos en la sierra?",
        duration: "7 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-iberia2",
        youtubeId: "Mpj8__oHbaw",
        theme: "geo",
        playlists: ["during"],
        scope: "A2",
        level: "general",
        icon: "🧭",
        title: "Evolución geológica de Iberia",
        summary: "Cambios geológicos recientes de la península.",
        learn: ["Refuerza la lectura del relieve peninsular.", "Prepara la terraza final y el mapa interactivo."],
        glossary: ["Sierra Mágina", "Orografía", "Erosión"],
        transcript: "Sintetiza procesos que modelaron la península en los últimos millones de años. Conecta la escala ibérica con la lectura local del paisaje desde la terraza del centro.",
        teacher: "Compara el relieve de Sierra Mágina con el mapa general de Iberia.",
        duration: "6 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "pm-tetis",
        youtubeId: "ooUtrnZi_Ko",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "general",
        icon: "🌊",
        title: "Del mar de Tetis a Sierra Mágina",
        summary: "Serie Paleomágina · pieza sobre el origen marino del territorio.",
        learn: ["Introduce el ámbito del mar de Tetis.", "Explica fósiles marinos en un entorno montañoso."],
        glossary: ["Tetis", "Ammonite", "Fósil"],
        transcript: "Recorrido narrado por el ámbito A1: de un océano tropical a un territorio interior con fósiles marinos conservados en la roca. Pensado para verse antes o después de la vitrina de ammonites.",
        teacher: "¿Qué evidencias del vídeo reconocerías en sala? · Dibuja la secuencia mar → sedimento → montaña.",
        duration: "13:17",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-fosiles",
        youtubeId: "joZZ1v8Pc8g",
        theme: "geo",
        playlists: ["during"],
        scope: "A2",
        level: "school",
        icon: "⛰️",
        title: "Cómo una montaña conserva fósiles marinos",
        summary: "Serie Paleomágina · geología y relieve explicados con evidencias.",
        learn: ["Une geología, sedimentos y paisaje kárstico.", "Prepara la lectura del mapa y la terraza."],
        glossary: ["Caliza", "Kárstico", "Estratigrafía"],
        transcript: "Explica cómo capas sedimentarias marinas se pliegan, se elevan y se erosionan hasta formar el relieve actual. La pieza enlaza paneles de geología con la vista exterior.",
        teacher: "Identifica en el vídeo tres procesos: sedimentación, elevación y erosión.",
        duration: "8:45",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-neanderthal",
        youtubeId: "HHnQ6N57nhY",
        theme: "human",
        playlists: ["during"],
        scope: "A4",
        level: "general",
        icon: "🔥",
        title: "Neandertales en el territorio",
        summary: "Serie Paleomágina · vida, frío y evidencias humanas.",
        learn: ["Contextualiza el ámbito del mundo neandertal.", "Relaciona tecnología lítica y adaptación al frío."],
        glossary: ["Homo neanderthalensis", "Paleolítico", "Industria lítica"],
        transcript: "Presenta cómo vivieron los neandertales en entornos fríos, qué herramientas fabricaron y qué restos se documentan en el territorio. Complementa la antesala y el ámbito A4.",
        teacher: "Lista tres adaptaciones al frío mencionadas en el vídeo.",
        duration: "25:56",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-excavacion",
        youtubeId: "lMxUBVQ68-Y",
        theme: "arch",
        playlists: ["after"],
        scope: "A8",
        level: "school",
        icon: "🔬",
        title: "La ciencia detrás de una excavación",
        summary: "Serie Paleomágina · método, registro y laboratorio.",
        learn: ["Muestra cómo se produce conocimiento arqueológico.", "Enlaza con ciencia y ciudadanía."],
        glossary: ["Excavación arqueológica", "Carbono 14", "Método científico"],
        transcript: "Describe fases de una excavación: prospección, cuadrícula, registro, laboratorio y publicación. Humaniza el trabajo científico que aparece en el ámbito A8.",
        teacher: "Ordena las fases del vídeo y explica por qué el contexto es tan importante.",
        duration: "7:14",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-terraza",
        youtubeId: "fhY_7GiR7kM",
        theme: "museum",
        playlists: ["after"],
        scope: "ATZ",
        level: "general",
        icon: "🌄",
        title: "La terraza final: leer el paisaje",
        summary: "Serie Paleomágina · cierre entre sala y horizonte real.",
        learn: ["Cierra el recorrido conectando interior y paisaje.", "Invita a continuar la visita fuera del edificio."],
        glossary: ["Terraza final", "Sierra Mágina", "Interpretación del patrimonio"],
        transcript: "Relaciona lo visto en vitrinas y paneles con laderas, crestas y valles visibles desde la terraza. Es el cierre audiovisual del relato museográfico.",
        teacher: "Desde la terraza, señala tres elementos del paisaje mencionados en el vídeo.",
        duration: "11:58",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
    ],
  },
  en: {
    routes: [
      { id: "geo", title: "Geology and landscape", text: "Deep time, plate tectonics, rocks, and how Sierra Mágina's relief was formed." },
      { id: "paleo", title: "Fossils and ancient life", text: "Ancient seas, fossils, Quaternary fauna, and reconstruction of past ecosystems." },
      { id: "human", title: "Human evolution", text: "Neanderthals, art, stone technology, and changes in ways of life." },
      { id: "arch", title: "Archaeology and method", text: "Excavation, dating, material evidence, and how scientific knowledge is built." },
      { id: "museum", title: "Museum and visit", text: "How audiovisuals complement scopes, timeline, glossary, and the final terrace." },
    ],
    playlists: [
      { id: "before", title: "Before your visit", text: "Short videos to place the territory, geological time, and the route's big questions." },
      { id: "during", title: "During the route", text: "Pieces linked to specific scopes as you move through the exhibition." },
      { id: "after", title: "After your visit", text: "Go deeper into method, landscape, and territorial memory once the circuit is complete." },
    ],
    levels: { general: "General audience", school: "School groups", all: "All levels" },
    items: [
      {
        id: "yt-placas",
        youtubeId: "bffze7j_wWE",
        theme: "geo",
        playlists: ["before"],
        scope: "A2",
        level: "general",
        icon: "🌐",
        title: "Plate boundaries in 10 minutes",
        summary: "Overview of plate boundaries, earthquakes, and volcanoes.",
        learn: ["Links tectonic processes to relief and geological hazards.", "Prepares the geology and relief section of the route."],
        glossary: ["Fault", "Folding", "Geology"],
        transcript: "The video explains what plate boundaries are, how lithospheric plates move, and why earthquakes and volcanoes occur. It is a useful introduction to understanding ranges such as the Betic chain and today's landscape of Sierra Mágina.",
        teacher: "What is the link between plate tectonics and today's relief? · Draw a simple diagram of plate collision.",
        duration: "10 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-iberia-geo",
        youtubeId: "OCPjD_dzcls",
        theme: "geo",
        playlists: ["before", "during"],
        scope: "A2",
        level: "school",
        icon: "🧭",
        title: "Geological evolution of the Iberian Peninsula",
        summary: "Guide to the peninsula's geological history.",
        learn: ["Places Sierra Mágina within Iberia's geological evolution.", "Connects ancient seas, sediments, and tectonic uplift."],
        glossary: ["Mesozoic", "Sediment", "Orography"],
        transcript: "Covers the main stages that transformed the peninsula: ancient oceans, sedimentation, orogenies, and relief shaping. Helps explain why marine fossils still appear in inland mountain areas.",
        teacher: "Which geological stages do you recognise in the video? · Why does Iberia preserve evidence of ancient seas?",
        duration: "15 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-tierra",
        youtubeId: "5i9zPNzfdbU",
        theme: "geo",
        playlists: ["before"],
        scope: "A1",
        level: "general",
        icon: "🌍",
        title: "Evolution of the Earth",
        summary: "Origin of the planet and major changes over time.",
        learn: ["Introduces the geological time scale.", "Prepares the museum's interactive timeline."],
        glossary: ["Geology", "Cenozoic", "Timeline"],
        transcript: "Presents the origin of the Earth and processes that transformed it: atmosphere, oceans, climate change, and the evolution of life. A gateway to the centre's temporal narrative.",
        teacher: "Order five milestones from the video on a drawn timeline. · Which time scale is hardest to imagine?",
        duration: "12 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-estructura",
        youtubeId: "Mx4RpaJ9OOA",
        theme: "geo",
        playlists: ["before"],
        scope: "A2",
        level: "school",
        icon: "🧪",
        title: "Structure and composition of the Earth",
        summary: "Internal layers of the planet and their materials.",
        learn: ["Distinguishes crust, mantle, and core.", "Links internal processes to surface phenomena."],
        glossary: ["Geology", "Sediment", "Fault"],
        transcript: "Describes the layers that make up the planet and how they influence volcanism, earthquakes, and rock formation. Reinforces that visible territory is only the top of a much larger system.",
        teacher: "Label a diagram of Earth's layers. · Which layer directly conditions what we study at the surface?",
        duration: "11 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-escala",
        youtubeId: "ptO0m3BjghQ",
        theme: "geo",
        playlists: ["before", "during"],
        scope: "A1",
        level: "general",
        icon: "⏳",
        title: "Geological time scale",
        summary: "Eras and periods that order Earth's history.",
        learn: ["Practises reading eras and periods.", "Supports understanding of the exhibition sequence."],
        glossary: ["Mesozoic", "Quaternary", "Cenozoic"],
        transcript: "Explains how geologists divide time into eras and periods and what events mark each span. Key for moving between millions of years and recent human change.",
        teacher: "Build a scale with at least four divisions and one example for each.",
        duration: "9 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-historia",
        youtubeId: "UEx5hCcxO-Y",
        theme: "geo",
        playlists: ["before"],
        scope: "A0",
        level: "general",
        icon: "📚",
        title: "History of the Earth",
        summary: "Milestones in the planet's geological development.",
        learn: ["Summarises major planetary changes.", "Connects geology with the appearance and evolution of life."],
        glossary: ["Fossil", "Paleontology", "Geology"],
        transcript: "Covers events such as the Moon's formation, the appearance of life, diversification of organisms, and major extinctions. Works as a general map before entering the museum scopes.",
        teacher: "Choose three milestones and explain them in your own words.",
        duration: "14 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-rocas",
        youtubeId: "3Vaj7YNepik",
        theme: "geo",
        playlists: ["during"],
        scope: "A2",
        level: "school",
        icon: "🪨",
        title: "Types of rocks",
        summary: "Igneous, sedimentary, and metamorphic rocks.",
        learn: ["Identifies rock types in cases and panels.", "Links rocks to processes and fossils."],
        glossary: ["Limestone", "Sediment", "Dolomite"],
        transcript: "Classifies rocks by origin and formation process. At Paleomágina this foundation helps read limestone, marl, and dolomite in the Sierra Mágina territory.",
        teacher: "Find examples of each rock type in museum photos or the landscape.",
        duration: "8 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-placas2",
        youtubeId: "Vx6ESMK4CCk",
        theme: "geo",
        playlists: ["before"],
        scope: "A2",
        level: "general",
        icon: "🌍",
        title: "Plate tectonics",
        summary: "Origin of oceans and plate movement.",
        learn: ["Understands continental drift and basin formation.", "Links to the ancient Tethys Sea."],
        glossary: ["Tethys", "Fault", "Tectonic uplift"],
        transcript: "Explains plate tectonics with examples of ridges, subduction, and collision. Shows how a seabed can end up as a mountain range.",
        teacher: "Which tectonic process explains marine fossils in the mountain range?",
        duration: "7 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "yt-iberia2",
        youtubeId: "Mpj8__oHbaw",
        theme: "geo",
        playlists: ["during"],
        scope: "A2",
        level: "general",
        icon: "🧭",
        title: "Geological evolution of Iberia",
        summary: "Recent geological changes in the peninsula.",
        learn: ["Reinforces reading of peninsular relief.", "Prepares the final terrace and interactive map."],
        glossary: ["Sierra Mágina", "Orography", "Erosion"],
        transcript: "Summarises processes that shaped the peninsula in recent millions of years. Connects the Iberian scale with local landscape reading from the centre's terrace.",
        teacher: "Compare Sierra Mágina's relief with the general map of Iberia.",
        duration: "6 min",
        subtitle: true,
        source: "external",
      },
      {
        id: "pm-tetis",
        youtubeId: "ooUtrnZi_Ko",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "general",
        icon: "🌊",
        title: "From the Tethys Sea to Sierra Mágina",
        summary: "Paleomágina series · piece on the territory's marine origin.",
        learn: ["Introduces the Tethys Sea scope.", "Explains marine fossils in a mountain setting."],
        glossary: ["Tethys", "Ammonite", "Fossil"],
        transcript: "Narrated route through scope A1: from a tropical ocean to an inland territory with marine fossils preserved in rock. Designed to watch before or after the ammonite display.",
        teacher: "Which evidence from the video would you recognise in the gallery? · Draw the sequence sea → sediment → mountain.",
        duration: "13:17",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-fosiles",
        youtubeId: "joZZ1v8Pc8g",
        theme: "geo",
        playlists: ["during"],
        scope: "A2",
        level: "school",
        icon: "⛰️",
        title: "How a mountain keeps marine fossils",
        summary: "Paleomágina series · geology and relief through evidence.",
        learn: ["Links geology, sediments, and karst landscape.", "Prepares map reading and the terrace."],
        glossary: ["Limestone", "Karst", "Stratigraphy"],
        transcript: "Explains how marine sedimentary layers fold, rise, and erode to form today's relief. Links geology panels with the outdoor view.",
        teacher: "Identify three processes in the video: sedimentation, uplift, and erosion.",
        duration: "8:45",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-neanderthal",
        youtubeId: "HHnQ6N57nhY",
        theme: "human",
        playlists: ["during"],
        scope: "A4",
        level: "general",
        icon: "🔥",
        title: "Neanderthals in the territory",
        summary: "Paleomágina series · life, cold, and human evidence.",
        learn: ["Contextualises the Neanderthal world scope.", "Links stone technology and cold adaptation."],
        glossary: ["Homo neanderthalensis", "Paleolithic", "Lithic industry"],
        transcript: "Presents how Neanderthals lived in cold environments, what tools they made, and what remains are documented in the territory. Complements the ante-room and scope A4.",
        teacher: "List three cold-climate adaptations mentioned in the video.",
        duration: "25:56",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-excavacion",
        youtubeId: "lMxUBVQ68-Y",
        theme: "arch",
        playlists: ["after"],
        scope: "A8",
        level: "school",
        icon: "🔬",
        title: "The science behind an excavation",
        summary: "Paleomágina series · method, recording, and laboratory.",
        learn: ["Shows how archaeological knowledge is produced.", "Links to science and citizenship."],
        glossary: ["Archaeological excavation", "Carbon-14", "Scientific method"],
        transcript: "Describes excavation phases: survey, grid, recording, laboratory, and publication. Humanises the scientific work shown in scope A8.",
        teacher: "Order the video's phases and explain why context matters so much.",
        duration: "7:14",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
      {
        id: "pm-terraza",
        youtubeId: "fhY_7GiR7kM",
        theme: "museum",
        playlists: ["after"],
        scope: "ATZ",
        level: "general",
        icon: "🌄",
        title: "The final terrace: reading the landscape",
        summary: "Paleomágina series · closing between gallery and real horizon.",
        learn: ["Closes the route linking indoors and landscape.", "Invites visitors to continue beyond the building."],
        glossary: ["Final terrace", "Sierra Mágina", "Heritage interpretation"],
        transcript: "Links what you saw in cases and panels with slopes, ridges, and valleys visible from the terrace. The audiovisual closing of the museographic narrative.",
        teacher: "From the terrace, point out three landscape elements mentioned in the video.",
        duration: "11:58",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html",
      },
    ],
  },
};

function getAudiovisualCatalog(lang) {
  return audiovisualCatalog[lang === "en" ? "en" : "es"] || audiovisualCatalog.es;
}

function getAudiovisuals(lang) {
  return getAudiovisualCatalog(lang).items || [];
}

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
      ? `<a class="btn btn-sm btn-outline-primary mt-auto" href="${escapeHtml(item.ambitoLink || "recorrido-expositivo.html")}">${escapeHtml(t("av_planned_cta"))}</a>`
      : item.scope
        ? `<a class="btn btn-sm btn-link px-0 mt-auto" href="recorrido-expositivo.html?scope=${encodeURIComponent(item.scope)}">${escapeHtml(t("av_scope_link"))} · ${escapeHtml(item.scope)}</a>`
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
