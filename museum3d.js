const host = document.getElementById("museum-3d-canvas");
const listHost = document.getElementById("museum-3d-sections");
const legendHost = document.getElementById("museum-3d-legend");
const detailTitle = document.getElementById("museum-3d-detail-title");
const detailText = document.getElementById("museum-3d-detail-text");

if (host && listHost && legendHost && detailTitle && detailText) {
  const floorButtons = Array.from(document.querySelectorAll(".museum-3d-floor-btn"));
  const PLAN_BASE_W = 760;
  const PLAN_BASE_H = 360;
  const floorData = {
    ground: {
      label: "Planta BAJA",
      planImagePath: "../images/planta-baja-plano.png",
      legendTitle: "Leyenda planta baja",
      sections: [
        { code: "R1", title: "Recepcion y acogida", text: "Primer punto de contacto y bienvenida del visitante.", color: "#c79a5f", poly: [[88, 226], [172, 200], [214, 244], [134, 290], [82, 274]] },
        { code: "R2", title: "Distribucion y transicion", text: "Area de paso interpretativo y preparacion del recorrido.", color: "#d6a66f", poly: [[198, 194], [330, 158], [380, 208], [244, 242]] },
        { code: "R3", title: "Escaleras y eras geologicas", text: "Conexion vertical con introduccion a las eras geologicas.", color: "#9da881", poly: [[364, 152], [520, 114], [578, 174], [418, 214]] }
      ]
    },
    first: {
      label: "Planta PRIMERA",
      planImagePath: "../images/planta-primera-plano.png",
      legendTitle: "Leyenda planta primera",
      sections: [
        { code: "AN", title: "Antesala", text: "Antesala de acceso a la exposicion permanente.", color: "#d0b183", poly: [[70, 272], [142, 238], [182, 274], [116, 316], [68, 302]] },
        { code: "A0", title: "Bienvenida", text: "Punto inicial del recorrido expositivo en sala.", color: "#c79a5f", poly: [[160, 236], [250, 206], [292, 254], [206, 286]] },
        { code: "A1", title: "Mar de Tetis", text: "Lectura del origen marino del territorio y registro fosil.", color: "#cda36d", poly: [[260, 204], [352, 176], [396, 226], [302, 256]] },
        { code: "A2", title: "Geologia y orografia", text: "Procesos geologicos que modelan Sierra Magina.", color: "#d8ad76", poly: [[366, 172], [466, 146], [508, 198], [404, 226]] },
        { code: "A3", title: "Cuaternario", text: "Cambios climaticos y ambientales durante el Cuaternario.", color: "#dfb57d", poly: [[474, 140], [574, 116], [616, 166], [514, 192]] },
        { code: "A4", title: "Mundo neandertal", text: "Evidencias de vida neandertal y tecnologia asociada.", color: "#cb7f49", poly: [[246, 272], [342, 242], [388, 292], [286, 326]] },
        { code: "A5", title: "Paleolitico superior", text: "Innovaciones culturales y tecnicas de sociedades cazadoras.", color: "#bb703f", poly: [[352, 238], [454, 210], [500, 260], [392, 292]] },
        { code: "A6", title: "Neolitico", text: "Primeras comunidades productoras y transformacion del territorio.", color: "#6f9663", poly: [[460, 204], [562, 176], [612, 226], [500, 258]] },
        { code: "A7", title: "Calcolitico", text: "Metalurgia inicial y nuevos modelos sociales.", color: "#879e5d", poly: [[514, 266], [610, 240], [650, 282], [552, 308]] },
        { code: "A8", title: "Ciencia y ciudadania", text: "Investigacion arqueologica y divulgacion abierta al publico.", color: "#a99e4a", poly: [[364, 82], [486, 56], [526, 100], [404, 126]] },
        { code: "TZ", title: "Terraza y paisaje", text: "Cierre del recorrido con lectura directa del paisaje real.", color: "#9f8564", poly: [[538, 44], [668, 24], [704, 66], [576, 92]] }
      ]
    }
  };

  let currentFloor = "ground";
  let selectedCode = floorData[currentFloor].sections[0].code;

  host.innerHTML = `
    <div class="museum-3d-stage">
      <img class="museum-3d-plan-image" alt="Plano del museo" />
      <div class="museum-3d-floor-label"></div>
    </div>
  `;

  const planImage = host.querySelector(".museum-3d-plan-image");
  const stage = host.querySelector(".museum-3d-stage");
  const floorLabel = host.querySelector(".museum-3d-floor-label");

  function pointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];
      const intersect = (yi > point[1]) !== (yj > point[1]) &&
        point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function getImageDrawBox() {
    const box = planImage.getBoundingClientRect();
    const imageAspect = PLAN_BASE_W / PLAN_BASE_H;
    const boxAspect = box.width / box.height;
    if (boxAspect > imageAspect) {
      const drawHeight = box.height;
      const drawWidth = drawHeight * imageAspect;
      return { left: box.left + (box.width - drawWidth) / 2, top: box.top, width: drawWidth, height: drawHeight };
    }
    const drawWidth = box.width;
    const drawHeight = drawWidth / imageAspect;
    return { left: box.left, top: box.top + (box.height - drawHeight) / 2, width: drawWidth, height: drawHeight };
  }

  function renderLegend() {
    const current = floorData[currentFloor];
    legendHost.innerHTML = "";
    const title = document.createElement("p");
    title.className = "museum-3d-legend-title";
    title.textContent = current.legendTitle;
    legendHost.appendChild(title);

    const list = document.createElement("div");
    list.className = "museum-3d-legend-list";
    current.sections.forEach((section) => {
      const item = document.createElement("div");
      item.className = "museum-3d-legend-item";

      const swatch = document.createElement("span");
      swatch.className = "museum-3d-legend-swatch";
      swatch.style.backgroundColor = section.color;

      const text = document.createElement("span");
      text.textContent = `${section.code} - ${section.title}`;

      item.appendChild(swatch);
      item.appendChild(text);
      list.appendChild(item);
    });
    legendHost.appendChild(list);
  }

  function setActive(code) {
    selectedCode = code;
    const current = floorData[currentFloor];
    const active = current.sections.find((s) => s.code === code);
    if (!active) return;

    detailTitle.textContent = `${active.code} - ${active.title}`;
    detailText.textContent = active.text;

    document.querySelectorAll(".museum-3d-section-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.code === code);
    });
  }

  function renderSectionButtons() {
    const current = floorData[currentFloor];
    listHost.innerHTML = "";
    current.sections.forEach((section) => {
      const btn = document.createElement("button");
      btn.className = "museum-3d-section-btn";
      btn.dataset.code = section.code;
      btn.type = "button";
      btn.textContent = `${section.code} - ${section.title}`;
      btn.addEventListener("click", () => setActive(section.code));
      listHost.appendChild(btn);
    });
  }

  function setFloor(floor) {
    currentFloor = floor;
    floorButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.floor === floor);
    });

    const current = floorData[floor];
    floorLabel.textContent = current.label;
    planImage.src = current.planImagePath;

    renderLegend();
    renderSectionButtons();

    selectedCode = current.sections[0].code;
    setActive(selectedCode);
  }

  floorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const floor = button.dataset.floor;
      if (floorData[floor]) setFloor(floor);
    });
  });

  stage.addEventListener("click", (event) => {
    const drawBox = getImageDrawBox();
    const localX = event.clientX - drawBox.left;
    const localY = event.clientY - drawBox.top;
    if (localX < 0 || localY < 0 || localX > drawBox.width || localY > drawBox.height) return;
    const mapX = (localX / drawBox.width) * PLAN_BASE_W;
    const mapY = (localY / drawBox.height) * PLAN_BASE_H;
    const hit = floorData[currentFloor].sections.find((section) => pointInPolygon([mapX, mapY], section.poly));
    if (hit) setActive(hit.code);
  });

  setFloor(currentFloor);
}
