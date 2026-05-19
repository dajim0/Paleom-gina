/* Línea temporal interactiva (Ámbitos) */

const TIMELINE_DATA = {
  stage1: {
    title: 'La Fundación: La Tierra Primitiva y el Amanecer de la Vida Compleja',
    period: 'Precámbrico — Paleozoico temprano',
    text:
      'La línea temporal comienza en las profundidades del tiempo geológico, mostrando la Tierra primitiva en una espectacular sala de museo cinematográfica y ultra realista en 4K. La escena inicial presenta una formación rocosa del Precámbrico profundamente texturizada, iluminada tenuemente bajo un cielo volcánico y caótico. A través de una transición sutil y perfectamente integrada, el paisaje evoluciona hacia el Paleozoico temprano. A la derecha, el entorno se convierte en un cálido mar poco profundo repleto de vida antigua meticulosamente recreada: trilobites, escorpiones marinos y peces primitivos fosilizados aparecen con un nivel extremo de detalle. Todo mantiene una estética hiperrealista, científica y cinematográfica.',
    color: '#1e5a8c'
  },
  stage2: {
    title: 'Los Mamíferos Mesozoicos y la Cuna Carbonífera',
    period: 'Carbonífero — Mesozoico temprano',
    text:
      'Continuando desde el borde derecho de la imagen anterior, el mar paleozoico se transforma gradualmente en el Carbonífero mediante cambios ambientales dramáticos y capas geológicas que se mezclan entre sí. El fondo marino da paso a un enorme pantano cubierto de niebla, dominado por gigantescos licopodios y helechos colosales. Conforme el ambiente se seca, el pantano se convierte de forma fluida en una llanura árida del Mesozoico iluminada por un atardecer volcánico. Entre la vegetación aparecen pequeños mamíferos primitivos, como Eomaia, representados con gran precisión anatómica y detalle cinematográfico, insinuando los futuros pasos evolutivos de la humanidad. El borde derecho prepara la transición hacia el Cenozoico.',
    color: '#2d6b4f'
  },
  stage3: {
    title: 'El Amanecer de los Homínidos: Australopithecus y el Bipedismo',
    period: 'Cenozoico — Plioceno / Pleistoceno temprano',
    text:
      'Siguiendo la transición establecida en la escena anterior, la exhibición introduce dramáticamente a los primeros homínidos bípedos durante el Cenozoico. El paisaje cambia desde una llanura seca hacia la inmensa sabana del África oriental bajo un cielo cambiante y espectacular. El foco principal es una reconstrucción hiperrealista de un Australopithecus afarensis, similar a Lucy, caminando erguido sobre el lecho seco de un río. A la derecha, el entorno se mezcla a través de un desenfoque temporal mostrando a los primeros Homo habilis cerca de una cueva, manipulando herramientas de piedra primitivas, marcando el siguiente gran salto evolutivo.',
    color: '#c65d1a'
  },
  stage4: {
    title: 'Homo Erectus: Migración y el Dominio del Fuego',
    period: 'Pleistoceno medio',
    text:
      'Partiendo de la transición de Homo habilis mostrada anteriormente, la escena avanza hacia el Pleistoceno. La sabana africana se transforma en un ambiente euroasiático más frío, seco y variable, inspirado en lugares como Dmanisi. En el centro de la composición aparece un grupo de Homo erectus representados con increíble realismo y detalle anatómico. Están reunidos alrededor de un fuego controlado y pulsante, simbolizando el dominio del fuego y el desarrollo cognitivo. A la derecha, otro individuo contempla el horizonte, insinuando las futuras migraciones humanas. El extremo derecho se difumina temporalmente mostrando la figura robusta de un neandertal, preparando la siguiente etapa de la evolución.',
    color: '#8b3a1f'
  },
  stage5: {
    title: 'La Explosión del Simbolismo: Neandertales y la Cueva del Arte',
    period: 'Paleolítico superior — transición al Holoceno',
    text:
      'La línea temporal avanza hacia el Paleolítico Superior manteniendo la misma estética ultra detallada y cinematográfica. El frío entorno glacial de la escena anterior se transforma en una enorme cueva profunda iluminada por antorchas. En primer plano, Homo sapiens de tipo Cro-Magnon y un robusto neandertal colaboran creando complejas pinturas rupestres sobre paredes de piedra caliza texturizada. Utilizan pigmentos de ocre y carbón, simbolizando el nacimiento del pensamiento abstracto y artístico. Al fondo, la entrada de la cueva revela mediante una distorsión temporal un fértil valle holocénico con los primeros asentamientos humanos permanentes, preparando la llegada de la agricultura.',
    color: '#5c3d7a'
  },
  stage6: {
    title: 'Vida Sedentaria: Agricultura y la Aldea Neolítica',
    period: 'Holoceno temprano — Neolítico',
    text:
      'Desde el borde derecho de la escena anterior, el paisaje evoluciona completamente hacia el Holoceno temprano y la Revolución Neolítica. El pequeño asentamiento natufiense se convierte en un exuberante valle fluvial del Creciente Fértil. En primer plano, grupos de Homo sapiens cultivan trigo y cebada domesticados utilizando hoces de piedra. Cerca de ellos pastan ovejas y cabras domesticadas. En la zona media se alza una auténtica aldea neolítica de casas permanentes de adobe, inspirada en Jericó o Çatalhöyük. Todo el conjunto se mezcla gradualmente hacia monumentales construcciones de piedra y tablillas con escritura cuneiforme, anunciando el surgimiento de las primeras civilizaciones complejas.',
    color: '#6b8e23'
  },
  stage7: {
    title: 'Civilización Compleja y la Reflexión del Antropoceno',
    period: 'Edades del Bronce e Hierro — Antropoceno',
    text:
      'La última escena completa la línea temporal manteniendo la estética hiperrealista de museo cinematográfico. A partir de las pistas de civilización compleja vistas anteriormente, el entorno avanza hacia las Edades del Bronce y del Hierro. La aldea neolítica y el paisaje fluvial son reemplazados por una ciudad organizada e intensamente urbanizada. En primer plano, trabajadores funden bronce y construyen un gigantesco zigurat de adobe inspirado en Uruk. A la derecha, tablillas cuneiformes se integran visualmente en una antigua biblioteca repleta de escritura compleja. Finalmente, esta escena proto-urbana se acelera mediante una intensa distorsión temporal hasta transformarse en una moderna megalópolis de acero y cristal con enormes centros de datos. Bajo la ciudad moderna, las capas industriales y nucleares aparecen fusionadas con antiguos estratos geológicos, simbolizando el inicio del Antropoceno y concluyendo la secuencia con una poderosa reflexión sobre la complejidad humana y la escala del tiempo geológico.',
    color: '#4a5568'
  }
};

const TIMELINE_IMAGE_META = {
  stage1: {
    src: '../images/site/1_peeled.png',
    caption:
      'Precámbrico y Paleozoico temprano: rocas volcánicas y mar antiguo con trilobites y vida marina recreada.'
  },
  stage2: {
    src: '../images/site/2_peeled.png',
    caption:
      'Carbonífero y Mesozoico: pantanos, helechos gigantes y primeros mamíferos como Eomaia.'
  },
  stage3: {
    src: '../images/site/3_peeled.png',
    caption:
      'Sabana africana: Australopithecus bípedo y Homo habilis con herramientas de piedra.'
  },
  stage4: {
    src: '../images/site/4_peeled.png',
    caption:
      'Homo erectus alrededor del fuego; paisaje euroasiático y presagio del neandertal.'
  },
  stage5: {
    src: '../images/site/5_peeled.png',
    caption:
      'Cueva iluminada por antorchas: arte rupestre compartido y valle holocénico al fondo.'
  },
  stage6: {
    src: '../images/site/6_peeled.png',
    caption:
      'Holoceno temprano: cultivos, ganado y aldea neolítica hacia la escritura cuneiforme.'
  },
  stage7: {
    src: '../images/site/7_peeled.png',
    caption:
      'Bronce, zigurat y ciudad histórica hasta la megalópolis moderna y el Antropoceno.'
  }
};

function escapeTimelineHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function renderTimeline(timeKey) {
  const data = TIMELINE_DATA[timeKey];
  if (!data) return;
  const detail = document.getElementById('timeline-detail');
  if (!detail) return;

  const meta = TIMELINE_IMAGE_META[timeKey];
  const safeTitle = escapeTimelineHtml(data.title);
  const safePeriod = escapeTimelineHtml(data.period);
  const safeText = escapeTimelineHtml(data.text);
  const safeCaption = meta ? escapeTimelineHtml(meta.caption) : '';
  const photoBlock = meta
    ? `<div class="timeline-photo"><img src="${meta.src}" alt="${safeTitle}" loading="lazy" width="1200" height="675" decoding="async" /><p class="timeline-photo-caption">${safeCaption}</p></div>`
    : '';

  detail.style.borderTop = `4px solid ${data.color}`;
  detail.innerHTML = `
    ${photoBlock}
    <div class="timeline-inner px-3 pb-3 pt-3">
      <div class="timeline-text-block">
        <h3 style="color:${data.color}">${safeTitle}</h3>
        <p class="timeline-period">⏱ ${safePeriod}</p>
        <div class="timeline-prose"><p>${safeText}</p></div>
      </div>
    </div>`;
}

function initTimeline() {
  const eras = document.querySelectorAll('.timeline-era');
  if (!eras.length) return;

  eras.forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll('.timeline-era').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderTimeline(btn.dataset.time);
    };
  });

  renderTimeline('stage1');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimeline);
} else {
  initTimeline();
}

document.addEventListener('pm:navigation', initTimeline);
