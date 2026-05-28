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
        learn: [
          "Introduce el ámbito del mar de Tetis.",
          "Explica fósiles marinos en un entorno montañoso.",
          "Complementa el guion del ámbito A1 y la pieza del ammonite cretácico.",
        ],
        glossary: ["Tetis", "Ammonite", "Fósil", "Mesozoico", "Pangea"],
        transcript: "Recorrido narrado por el ámbito A1: de un océano tropical a un territorio interior con fósiles marinos conservados en la roca. Pensado para verse antes o después de la vitrina de ammonites.",
        teacher: "¿Qué evidencias del vídeo reconocerías en sala? · Dibuja la secuencia mar → sedimento → montaña.",
        duration: "13:17",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-ambito",
        youtubeId: "s-e8H_1a5h0",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "general",
        icon: "🗺️",
        title: "Vídeo n.º 2 · El mar de Tetis (ámbito 1)",
        summary: "Apoyo audiovisual: Pangea, deriva continental y mar de Tetis. Complementa el guion del ámbito hasta la pieza definitiva.",
        learn: [
          "Sitúa el Tetis entre Gondwana y Laurasia y explica por qué era un mar somero y cálido.",
          "Recorre Triásico, Jurásico, Cretácico y Mioceno con mapas y ecosistemas marinos.",
          "Relaciona fósiles locales (Siles, Villarrodrigo, Cazorla, Bedmar, Porcuna, Villanueva de la Reina) con cada etapa.",
        ],
        glossary: ["Tetis", "Pangea", "Mesozoico", "Ammonite", "Belemnite"],
        transcript:
          "Vídeo de apoyo sobre formación de Pangea, deriva continental y relación del Mediterráneo con el antiguo mar de Tetis. Usar junto al guion del ámbito 1 y a las piezas de ammonites y paleogeografía.",
        transcriptFull:
          "Presentación del Mar de Tetis sobre fondo marino; a continuación, evolución de la Pangea (animación océano-tetis-evolucion).\n\nHace 250 millones de años el mar de Tetis u océano de Tetis existió durante la era mesozoica y parte de la cenozoica, entre Gondwana y Laurasia, antes del océano Índico y el Mediterráneo. Era un mar somero, cálido y propenso a la sedimentación, con arrecifes de coral e islas. Albergaba microorganismos basales, amonites, bivalvos, lirios de mar y grandes reptiles marinos.\n\nTRIÁSICO (250 Ma). Pangea en el Triásico; mapa de Europa señalando la Península Ibérica o Sierra Mágina. Pangea comienza a fracturarse y Tetis se expande como gran golfo ecuatorial interior; sus cuencas acumularon carbonatos. Fauna: Nothosaurus (Siles, Villarrodrigo, Las Atalayas); placodonto Henodus (Villarrodrigo); Tanystropheus (Siles); Hybodus (Siles); Colobodus; Saurichthys, pez lagarto (Siles).\n\nJURÁSICO (199 Ma). Pangea en el Jurásico; mapa de Europa con la península o Sierra Mágina. Tetis separa Laurasia y Gondwana; archipiélagos tropicales y arrecifes cubrieron gran parte de la actual Península Ibérica. Fauna: Hispaniachelys penibética (Cazorla); Plesiosaurus; Ichthyosaurus; ecosistema jurásico con ammonites.\n\nCRETÁCICO (145 Ma). Pangea en el Cretácico; mapa con Ibérica o Sierra Mágina. Tetis alcanza su máxima extensión, inundando cerca del 40 % de las masas continentales; clima subtropical, húmedo y cálido, con abundantes reptiles marinos. Fauna: ammonites; belemnites; Steneosaurus (Bedmar).\n\nMIOCENO (23 Ma). Evolución en el Mioceno; mapa con Ibérica o Sierra Mágina. El Tetis original se reduce hasta desaparecer; remanentes modernos: Mediterráneo, Mar Negro y Caspio. Fauna: Megalodon (Porcuna); Cephalotropys (ballenas, Villanueva de la Reina); Metaxytherium, sirénido (Villanueva de la Reina); otárido (Villanueva de la Reina).\n\nRecursos del documento: Nothosaurus (alquivir.ujaen.es/museo/nothosaurus/), Saurichthys 3D (sketchfab.com/3d-models/saurichthys-sp-2b12cf060d904838b8adf2c093de8853), Hispaniachelys (alquivir.ujaen.es/museo/hispaniachelys-prebetica/), diente de Megalodon (alquivir.ujaen.es/museo/diente-de-megalodon/), costillas de Metaxytherium (alquivir.ujaen.es/museo/costillas-de-metaxytherium/) y tórax de pinnípedo/otárido (alquivir.ujaen.es/museo/torax-pinnipedo/).",
        teacher:
          "Ordena los cuatro periodos en una línea temporal y asigna a cada uno un fósil de Jaén. · ¿Por qué el Mediterráneo es un remanente del Tetis?",
        duration: "Apoyo · guion en producción",
        subtitle: true,
        source: "external",
        a11yTranscript: "ok",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-ammonite",
        youtubeId: "3P92PMZMrjM",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "school",
        icon: "🐚",
        title: "Ammonites del Cretácico (referencia)",
        summary: "Referencia audiovisual del guion del ámbito 1 para el ecosistema marino cretácico.",
        learn: ["Visualiza ammonites en un ambiente marino del Cretácico.", "Complementa vitrinas y el guion del mar de Tetis."],
        glossary: ["Ammonite", "Mesozoico", "Tetis"],
        transcript: "Secuencia de referencia del documento museográfico: útil para ilustrar ammonites del Cretácico en el ecosistema del Tetis (no como pieza narrativa completa del ámbito).",
        teacher: "Identifica en el vídeo formas espirales de ammonites y relaciónalas con fósiles de sala.",
        duration: "Referencia",
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-paleogeografia",
        youtubeId: "UevnAq1MTVA",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "school",
        icon: "🌍",
        title: "Evolución de placas y paleogeografía (Tetis)",
        summary: "Animación de Christopher Scotese: movimiento de placas, nivel del mar y hielo a lo largo del tiempo geológico.",
        learn: ["Visualiza la fragmentación de Pangea y la apertura del Tetis.", "Complementa mapas del ámbito 1 con una secuencia animada."],
        glossary: ["Pangea", "Mesozoico", "Tetis"],
        transcript: "Animación científica del proyecto PALEOMAP que muestra la evolución de continentes y océanos. Útil como apoyo visual al guion del mar de Tetis (audio en inglés).",
        teacher: "Identifica en qué momento del vídeo aparece un mar interior entre continentes. · Relaciónalo con el Mediterráneo actual.",
        duration: "1:40",
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-ebro",
        youtubeId: "4T3a4cLvl14",
        theme: "geo",
        playlists: ["during"],
        scope: "A1",
        level: "general",
        icon: "🏞️",
        title: "Un mar interior conectado al Tetis (Valle del Ebro)",
        summary: "Documental sobre un antiguo mar tropical peninsular y su cierre, paralelo al relato del Tetis en Iberia.",
        learn: ["Entiende cómo un mar somero se cierra y deja cuencas interiores.", "Conecta sedimentos marinos con el paisaje montañoso actual."],
        glossary: ["Tetis", "Sedimento", "Mesozoico"],
        transcript: "Recorre la historia geológica de un gran mar interior en la península, conectado al Tetis y posteriormente aislado. Ayuda a imaginar ambientes marinos que hoy son tierra elevada.",
        teacher: "¿Qué paralelismos ves con Sierra Mágina y sus fósiles marinos?",
        duration: "Documental",
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-arcosaurio-cambil",
        youtubeId: "rA15ftLRQ9g",
        theme: "paleo",
        playlists: ["during", "after"],
        scope: "A1",
        level: "general",
        icon: "🐾",
        title: "El Arcosaurio de Cambil",
        summary: "Pieza Paleomágina · huellas fósiles del Triásico superior y reconstrucción del animal que pudo producirlas.",
        learn: ["Reconoce una icnita como rastro fósil, no como hueso.", "Relaciona Cambil con ambientes húmedos próximos al litoral triásico.", "Distingue manos, pies, contramoldes y marcas de escamas en las huellas.", "Sitúa el hallazgo de 1991 y la conservación de las piezas en el Parque de las Ciencias de Granada."],
        glossary: ["Brachychiroterium", "Icnita", "Contramolde", "Arcosaurio", "Triásico"],
        transcript: "Hace unos 225 millones de años, un arcosaurio caminó por zonas húmedas próximas al mar en lo que hoy es Cambil. Sus pisadas quedaron marcadas en el fango, se rellenaron con arena y fosilizaron como contramoldes en arenisca roja. El rastro atribuido al icnogénero Brachychiroterium permite imaginar un reptil de hasta cinco metros, con manos más pequeñas que los pies, cinco dedos y una cola larga para mantener el equilibrio.",
        transcriptFull:
          "Hace unos 225 millones de años, en el Triásico, un vertebrado dejó su rastro en zonas húmedas próximas al mar, en lo que hoy es Cambil (Sierra Mágina). El rastro se atribuye al icnogénero Brachychiroterium, pronunciado en locución como Braqui o Braquiquiroterium. Este reptil era un arcosaurio anterior a los dinosaurios jurásicos; pudo medir hasta cinco metros, tenía manos y pies pentadáctilos, y las huellas de las manos son mucho más pequeñas que las de los pies. Esa diferencia sugiere extremidades posteriores más robustas, una cola larga para mantener el equilibrio y la capacidad de elevarse o apoyarse con fuerza sobre las patas traseras.\n\nLas huellas aparecieron en arenisca roja del Triásico, propia de depósitos continentales y fluviales. Son contramoldes: el reptil pisó el fango, la huella se rellenó con arena y ese relleno fosilizó como relieve sobresaliente. En una de las huellas se conservan impresiones de escamas de la planta del pie y en algunos dedos se observan uñas de hasta 2,5 cm.\n\nLas pisadas fueron descubiertas en 1991 en Cambil por Alberto Pérez-López, investigador de la Universidad de Granada, y actualmente se exponen en el Parque de las Ciencias de Granada. Cartela científica: arcosaurio y huellas asociadas al icnogénero Brachychiroterium; Clase Sauropsida, Infraclase Archosauromorpha, Orden Rauisuchia, Familia Rauisuchidae; Triásico superior, aprox. 220 millones de años; localidad Cambil (Jaén). Recursos del documento: modelos 3D UJA de huellas fósiles de arcosaurio, huellas 1, 2 y 3; página de Alberto Pérez-López; vídeo del Ayuntamiento de Cambil y Universidad de Granada.",
        teacher: "Observa una huella 3D y localiza dedos, uñas y diferencia entre mano y pie. · ¿Por qué una huella fósil puede contar cómo se movía un animal?",
        duration: "Vídeo",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html#dino-3d-h",
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
        id: "pm-magina",
        theme: "human",
        playlists: ["during", "after"],
        scope: "A5",
        level: "general",
        icon: "🌿",
        title: "Mágina: presentación del personaje",
        summary: "Relato en primera persona sobre una joven de hace 13.000 años en Sierra Mágina, basado en evidencias arqueológicas y antropología física.",
        learn: [
          "Conecta restos humanos con empatía, cuidado y simbolismo, no solo supervivencia.",
          "Relaciona el personaje con la Cueva del Portillo, el paisaje estacional y los tejos de la sierra.",
          "Introduce adornos de conchas perforadas, ajuar y agujas de hueso como señales de identidad.",
          "Mientras tanto, consulta el vídeo de apoyo sobre arte rupestre peninsular.",
        ],
        glossary: ["Homo sapiens", "Paleolítico", "Arte rupestre", "Ajuar funerario", "Abrigo rocoso"],
        transcript:
          "Presentación narrativa de Mágina: una voz joven, calmada e íntima que recorre el territorio, la estacionalidad y el vínculo con Sierra Mágina hace unos 13.000 años. La pieza busca dignidad y emoción sin infantilizar ni idealizar la Prehistoria. Hasta la pieza audiovisual, usa el vídeo de apoyo sobre arte rupestre.",
        transcriptFull:
          'Hola. Mi nombre es Mágina, como esos árboles especiales que ahora llamáis "tejos" y que crecían en esta misma sierra hace 13.000 años, formando parte de mi paisaje. Con mi familia recorría el territorio siguiendo las estaciones. Cuando la nieve se retiraba de las cumbres, regresábamos a estas tierras en busca de refugio y alimento. Conocíamos los senderos, los ríos, las plantas silvestres, cómo se movían los animales que cazábamos y las cuevas que nos servían de refugio. Uno de ellos fue la Cueva del Portillo, en Bedmar. El viento, la lluvia, las estrellas y el frío de la noche nos acompañaban cada día. Al amanecer observábamos la gran montaña Aznaitín para saber qué tiempo se acercaba. Por la noche, las hogueras iluminaban las cuevas mientras escuchábamos el sonido del agua y los animales entre la oscuridad. Aprendimos a observar, a recordar los caminos y a respetar la tierra que nos daba la vida. Para nosotros, Sierra Mágina no era solo un paisaje: era nuestro hogar. Hoy la ciencia ha permitido reconstruir una pequeña parte de nuestra historia. Y ahora quiero compartirla con vosotros.',
        teacher:
          "¿Qué detalles del relato se apoyan en evidencias materiales? · ¿Qué emociones te transmite la voz de Mágina y por qué?",
        duration: "Guion · vídeo en producción",
        planned: true,
        source: "planned",
        a11yTranscript: "ok",
        ambitoLink: "recorrido-expositivo.html?scope=A5",
      },
      {
        id: "pm-magina-apoyo",
        youtubeId: "z3furyxLUNo",
        theme: "human",
        playlists: ["during", "before"],
        scope: "A5",
        level: "general",
        icon: "🎨",
        title: "Arte rupestre en la Península Ibérica (apoyo)",
        summary: "Contexto del Paleolítico superior, arte parietal y simbolismo en la península. Complementa el relato de Mágina hasta la pieza narrativa.",
        learn: [
          "Sitúa el Paleolítico superior y el arte rupestre en la península.",
          "Prepara la lectura de abrigos, cuevas y expresión simbólica del ámbito A5.",
        ],
        glossary: ["Paleolítico", "Arte rupestre", "Homo sapiens", "Abrigo rocoso"],
        transcript: "Panorama del arte rupestre paleolítico en la península: clima, cronología, cuevas y abrigos. Vídeo de apoyo mientras se produce la pieza narrativa de Mágina.",
        teacher: "¿Qué elementos del vídeo podrían inspirar el relato de Mágina? · ¿Qué diferencia hay entre arte en cueva y en abrigo?",
        duration: "Apoyo",
        subtitle: true,
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A5",
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
        learn: [
          "Introduces the Tethys Sea scope.",
          "Explains marine fossils in a mountain setting.",
          "Complements the scope A1 script and the Cretaceous ammonite clip.",
        ],
        glossary: ["Tethys", "Ammonite", "Fossil", "Mesozoic", "Pangea"],
        transcript: "Narrated route through scope A1: from a tropical ocean to an inland territory with marine fossils preserved in rock. Designed to watch before or after the ammonite display.",
        teacher: "Which evidence from the video would you recognise in the gallery? · Draw the sequence sea → sediment → mountain.",
        duration: "13:17",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-ambito",
        youtubeId: "s-e8H_1a5h0",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "general",
        icon: "🗺️",
        title: "Video no. 2 · The Tethys Sea (scope 1)",
        summary: "Support video: Pangea, continental drift, and the Tethys Sea. Complements the scope script until the final piece is ready.",
        learn: [
          "Places the Tethys between Gondwana and Laurasia and explains why it was a warm, shallow sea.",
          "Moves through Triassic, Jurassic, Cretaceous, and Miocene with maps and marine ecosystems.",
          "Links local fossils (Siles, Villarrodrigo, Cazorla, Bedmar, Porcuna, Villanueva de la Reina) to each stage.",
        ],
        glossary: ["Tethys", "Pangea", "Mesozoic", "Ammonite", "Belemnite"],
        transcript:
          "Support video on Pangea formation, continental drift, and the link between the Mediterranean and the ancient Tethys Sea. Use with the scope 1 script, ammonite clip, and palaeogeography animation.",
        transcriptFull:
          "Opening on the Tethys Sea over a marine backdrop; then Pangea evolution (ocean-tethys-evolution animation).\n\nAbout 250 million years ago the Tethys Ocean existed through much of the Mesozoic and part of the Cenozoic, between Gondwana and Laurasia, before the Indian Ocean and Mediterranean formed. It was a warm, shallow, sediment-rich sea with coral reefs and islands, hosting basal microorganisms, ammonites, bivalves, sea lilies, and large marine reptiles.\n\nTRIASSIC (250 Ma). Triassic Pangea; European map marking Iberia or Sierra Mágina. Pangea begins to break apart and the Tethys expands as a vast equatorial gulf; its basins accumulated carbonates. Fauna: Nothosaurus (Siles, Villarrodrigo, Las Atalayas); placodont Henodus (Villarrodrigo); Tanystropheus (Siles); Hybodus (Siles); Colobodus; Saurichthys (Siles).\n\nJURASSIC (199 Ma). Jurassic Pangea; European map with Iberia or Sierra Mágina. The Tethys becomes a continuous ocean between Laurasia and Gondwana; tropical archipelagos and reefs covered much of today's Iberian Peninsula. Fauna: Hispaniachelys penibetica (Cazorla); Plesiosaurus; Ichthyosaurus; Jurassic ecosystem with ammonites.\n\nCRETACEOUS (145 Ma). Cretaceous Pangea; map with Iberia or Sierra Mágina. The Tethys reaches maximum extent, flooding nearly 40% of continental masses; subtropical, humid, warm climate with abundant marine reptiles. Fauna: ammonites; belemnites; Steneosaurus (Bedmar).\n\nMIOCENE (23 Ma). Miocene evolution; map with Iberia or Sierra Mágina. The original Tethys shrinks and disappears; modern remnants include the Mediterranean, Black Sea, and Caspian Sea. Fauna: Megalodon (Porcuna); Cephalotropys whales (Villanueva de la Reina); Metaxytherium sirenian (Villanueva de la Reina); pinniped (Villanueva de la Reina).\n\nDocument resources: Nothosaurus (alquivir.ujaen.es/museo/nothosaurus/), Saurichthys 3D (sketchfab.com/3d-models/saurichthys-sp-2b12cf060d904838b8adf2c093de8853), Hispaniachelys (alquivir.ujaen.es/museo/hispaniachelys-prebetica/), Megalodon tooth (alquivir.ujaen.es/museo/diente-de-megalodon/), Metaxytherium ribs (alquivir.ujaen.es/museo/costillas-de-metaxytherium/) and pinniped/otarid thorax (alquivir.ujaen.es/museo/torax-pinnipedo/).",
        teacher:
          "Order the four periods on a timeline and assign a Jaén fossil to each. · Why is the Mediterranean a remnant of the Tethys?",
        duration: "Support · script in production",
        subtitle: true,
        source: "external",
        a11yTranscript: "ok",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-ammonite",
        youtubeId: "3P92PMZMrjM",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "school",
        icon: "🐚",
        title: "Cretaceous ammonites (reference)",
        summary: "Scope 1 museographic reference clip for the Cretaceous marine ecosystem.",
        learn: ["Visualise ammonites in a Cretaceous marine setting.", "Complements displays and the Tethys Sea script."],
        glossary: ["Ammonite", "Mesozoic", "Tethys"],
        transcript: "Reference sequence from the museographic document: useful to illustrate Cretaceous ammonites in the Tethys ecosystem (not the full narrative piece for the scope).",
        teacher: "Spot spiral ammonite shapes in the video and link them to gallery fossils.",
        duration: "Reference",
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-paleogeografia",
        youtubeId: "UevnAq1MTVA",
        theme: "paleo",
        playlists: ["during"],
        scope: "A1",
        level: "school",
        icon: "🌍",
        title: "Plate evolution and palaeogeography (Tethys)",
        summary: "Christopher Scotese animation: plate motion, sea level, and ice through geological time.",
        learn: ["Visualise Pangea break-up and the opening of the Tethys.", "Complements scope 1 maps with an animated sequence."],
        glossary: ["Pangea", "Mesozoic", "Tethys"],
        transcript: "PALEOMAP project scientific animation showing continent and ocean evolution. Useful visual support for the Tethys Sea script (audio in English).",
        teacher: "When does an interior sea appear between continents in the video? · Link it to today's Mediterranean.",
        duration: "1:40",
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-tetis-ebro",
        youtubeId: "4T3a4cLvl14",
        theme: "geo",
        playlists: ["during"],
        scope: "A1",
        level: "general",
        icon: "🏞️",
        title: "An inland sea linked to the Tethys (Ebro valley)",
        summary: "Documentary on an ancient tropical peninsular sea and its closure, parallel to the Tethys story in Iberia.",
        learn: ["Understand how a shallow sea closes and leaves interior basins.", "Connect marine sediments with today's upland landscape."],
        glossary: ["Tethys", "Sediment", "Mesozoic"],
        transcript: "Covers the geological history of a large interior sea in the peninsula, linked to the Tethys and later isolated. Helps imagine marine settings that are now raised land.",
        teacher: "What parallels do you see with Sierra Mágina and its marine fossils?",
        duration: "Documentary",
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A1",
      },
      {
        id: "pm-arcosaurio-cambil",
        youtubeId: "rA15ftLRQ9g",
        theme: "paleo",
        playlists: ["during", "after"],
        scope: "A1",
        level: "general",
        icon: "🐾",
        title: "The Cambil archosaur",
        summary: "Paleomágina piece · Late Triassic fossil footprints and reconstruction of the animal that may have made them.",
        learn: ["Recognise an ichnite as a fossil trace, not a bone.", "Link Cambil with wet environments near the Triassic shoreline.", "Distinguish hands, feet, counter-moulds, and scale marks in the footprints.", "Places the 1991 discovery and the preservation of the pieces at the Granada Science Park."],
        glossary: ["Brachychiroterium", "Ichnite", "Counter-mould", "Archosaur", "Triassic"],
        transcript: "About 225 million years ago, an archosaur walked through wet areas near the sea in what is now Cambil. Its footprints were impressed in mud, filled with sand, and fossilised as counter-moulds in red sandstone. The trackway attributed to the ichnogenus Brachychiroterium suggests a reptile up to five metres long, with hands smaller than feet, five digits, and a long tail for balance.",
        transcriptFull:
          "About 225 million years ago, in the Triassic, a vertebrate left its trackway in wet areas close to the sea, in what is now Cambil (Sierra Mágina). The trackway is attributed to the ichnogenus Brachychiroterium. This reptile was an archosaur, earlier than Jurassic dinosaurs; it may have reached up to five metres in length, with five-fingered hands and feet, and the handprints are much smaller than the footprints. This size difference suggests stronger hind limbs, a long tail for balance, and the ability to rise or support itself strongly on its hind legs.\n\nThe footprints were found in red Triassic sandstone linked to continental and fluvial deposits. They are counter-moulds: the reptile stepped into mud, the footprint filled with sand, and that fill fossilised as raised relief. One footprint preserves scale impressions from the sole, and some digits show claws up to 2.5 cm long.\n\nThe tracks were discovered in Cambil in 1991 by Alberto Pérez-López, a University of Granada researcher, and are now exhibited at the Granada Science Park. Scientific label: archosaur and associated footprints, ichnogenus Brachychiroterium; Class Sauropsida, Infraclass Archosauromorpha, Order Rauisuchia, Family Rauisuchidae; Late Triassic, approx. 220 million years; locality Cambil (Jaén). Document resources: UJA 3D models of archosaur fossil footprints, footprints 1, 2 and 3; Alberto Pérez-López website; Cambil Town Council and University of Granada video.",
        teacher: "Inspect a 3D footprint and identify digits, claws, and the difference between hand and foot. · Why can a fossil footprint tell us how an animal moved?",
        duration: "Video",
        source: "youtube",
        ambitoLink: "recorrido-expositivo.html#dino-3d-h",
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
        id: "pm-magina",
        theme: "human",
        playlists: ["during", "after"],
        scope: "A5",
        level: "general",
        icon: "🌿",
        title: "Mágina: meeting the character",
        summary: "First-person story of a young woman from about 13,000 years ago in Sierra Mágina, grounded in archaeological evidence and physical anthropology.",
        learn: [
          "Connects human remains with empathy, care, and symbolism, not survival alone.",
          "Links the character to Cueva del Portillo, seasonal landscape, and yew trees in the range.",
          "Introduces perforated shell ornaments, grave goods, and bone needles as signs of identity.",
          "Until then, use the support video on peninsular rock art.",
        ],
        glossary: ["Homo sapiens", "Paleolithic", "Rock art", "Grave goods", "Rock shelter"],
        transcript:
          "A narrative introduction to Mágina: a young, calm, intimate voice moving through the territory, seasonality, and bond with Sierra Mágina around 13,000 years ago. The piece seeks dignity and emotion without infantilising or idealising Prehistory. Until the audiovisual piece is ready, use the rock-art support video.",
        transcriptFull:
          'Hello. My name is Mágina, like those special trees you now call yews, which grew in this same mountain range 13,000 years ago as part of my landscape. With my family I travelled the territory following the seasons. When snow withdrew from the peaks, we returned to these lands seeking shelter and food. We knew the paths, the rivers, the wild plants, how the animals we hunted moved, and the caves that sheltered us. One of them was Cueva del Portillo, in Bedmar. Wind, rain, stars, and the cold of night accompanied us every day. At dawn we watched great Mount Aznaitín to see what weather was coming. At night, fires lit the caves while we listened to water and animals in the darkness. We learned to observe, to remember the paths, and to respect the land that gave us life. For us, Sierra Mágina was not only a landscape: it was our home. Today science has made it possible to reconstruct a small part of our history. And now I want to share it with you.',
        teacher:
          "Which details in the story are supported by material evidence? · What emotions does Mágina's voice convey, and why?",
        duration: "Script · video in production",
        planned: true,
        source: "planned",
        a11yTranscript: "ok",
        ambitoLink: "recorrido-expositivo.html?scope=A5",
      },
      {
        id: "pm-magina-apoyo",
        youtubeId: "z3furyxLUNo",
        theme: "human",
        playlists: ["during", "before"],
        scope: "A5",
        level: "general",
        icon: "🎨",
        title: "Rock art in the Iberian Peninsula (support)",
        summary: "Upper Palaeolithic context, cave art, and symbolism in the peninsula. Complements Mágina's story until the narrative piece is ready.",
        learn: [
          "Places Upper Palaeolithic rock art in the peninsula.",
          "Prepares reading of shelters, caves, and symbolic expression in scope A5.",
        ],
        glossary: ["Paleolithic", "Rock art", "Homo sapiens", "Rock shelter"],
        transcript: "Overview of Palaeolithic rock art in the peninsula: climate, chronology, caves, and shelters. Support video while the Mágina narrative piece is in production.",
        teacher: "Which elements in the video could inspire Mágina's story? · What is the difference between cave and shelter art?",
        duration: "Support",
        subtitle: true,
        source: "external",
        ambitoLink: "recorrido-expositivo.html?scope=A5",
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
