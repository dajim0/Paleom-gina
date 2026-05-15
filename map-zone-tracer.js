/* ═════════════════════════════════════════════════════════════════════════════ */
/* MapZoneTracer — herramienta manual: polígonos SVG sobre planos del museo      */
/* ═════════════════════════════════════════════════════════════════════════════ */

const DEFAULT_IMAGES = {
  ground: '../images/site/planta-baja-museo.png',
  first: '../images/site/planta-primera-museo.png'
};

/** Paleta sugerida (zonas 1–10), alineada con tonos del mapa; editable en UI. */
const DEFAULT_ZONE_PRESETS = [
  { id: '1', color: '#c79a5f' },
  { id: '2', color: '#d6a66f' },
  { id: '3', color: '#9da881' },
  { id: '4', color: '#cda36d' },
  { id: '5', color: '#d8ad76' },
  { id: '6', color: '#cb7f49' },
  { id: '7', color: '#bb703f' },
  { id: '8', color: '#6f9663' },
  { id: '9', color: '#879e5d' },
  { id: '10', color: '#a99e4a' }
];

function pointsToSvgString(points) {
  return points.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).join(' ');
}

function buildPolygonSnippet(id, color, pointsStr) {
  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '');
  return `<polygon id="museum-zone-${safeId}" fill="${color}" fill-opacity="0.45" stroke="${color}" stroke-width="1" vector-effect="non-scaling-stroke" points="${pointsStr}" />`;
}

/**
 * @param {HTMLElement} root
 * @param {{ images?: { ground: string, first: string }, presets?: { id: string, color: string }[] }} [options]
 */
class MapZoneTracer {
  constructor(root, options = {}) {
    if (!root || !(root instanceof HTMLElement)) {
      throw new TypeError('MapZoneTracer: se requiere un elemento contenedor');
    }
    this._root = root;
    this._images = { ...DEFAULT_IMAGES, ...options.images };
    this._presets = options.presets && options.presets.length ? options.presets : DEFAULT_ZONE_PRESETS;
    this._zones = [];
    this._draft = [];
    this._floor = 'ground';
    this._imgNatural = { w: 0, h: 0 };
    this._els = {};
    this._onStageClick = this._onStageClick.bind(this);
    this._onResize = this._onResize.bind(this);
    this._render = this._render.bind(this);
    this._build();
  }

  getZones() {
    return this._zones.map(z => ({ ...z }));
  }

  destroy() {
    window.removeEventListener('resize', this._onResize);
    const img = this._els.img;
    if (img && this._onImgLoad) {
      img.removeEventListener('load', this._onImgLoad);
    }
    const svg = this._els.svg;
    if (svg) {
      svg.removeEventListener('click', this._onStageClick);
    }
    this._root.innerHTML = '';
    this._els = {};
  }

  _build() {
    const p = this._presets;
    const presetOptions = p.map(x => `<option value="${x.id}">${x.id} — ${x.color}</option>`).join('');

    this._root.className = 'map-zone-tracer';
    this._root.innerHTML = `
      <div class="map-zone-tracer__panel card border-0 shadow-sm">
        <div class="card-body">
          <h1 class="h4 mb-2">MapZoneTracer</h1>
          <p class="text-muted small mb-3">
            Clic en el plano para añadir vértices. Pulsa <strong>Cerrar zona</strong> con al menos 3 puntos.
            Las coordenadas son las del bitmap (espacio natural de la imagen), listas para <code>points</code> en SVG con el mismo <code>viewBox</code>.
          </p>
          <div class="row g-2 align-items-end mb-3">
            <div class="col-md-4">
              <label class="form-label small mb-0">Plano</label>
              <select class="form-select form-select-sm map-zone-tracer__floor" aria-label="Plano del museo">
                <option value="ground">Planta baja</option>
                <option value="first">Planta primera</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label small mb-0">ID zona (1–10)</label>
              <select class="form-select form-select-sm map-zone-tracer__zone-id" aria-label="Identificador de zona">${presetOptions}</select>
            </div>
            <div class="col-md-3">
              <label class="form-label small mb-0">Color (mapa)</label>
              <input type="color" class="form-control form-control-color map-zone-tracer__color w-100" value="${p[0].color}" title="Color de relleno" />
            </div>
            <div class="col-md-2">
              <span class="map-zone-tracer__status small text-muted" aria-live="polite"></span>
            </div>
          </div>
          <div class="btn-toolbar flex-wrap gap-2 mb-3" role="toolbar">
            <button type="button" class="btn btn-primary btn-sm map-zone-tracer__close">Cerrar zona</button>
            <button type="button" class="btn btn-outline-secondary btn-sm map-zone-tracer__undo">Deshacer último punto</button>
            <button type="button" class="btn btn-outline-secondary btn-sm map-zone-tracer__clear">Limpiar borrador</button>
          </div>
        </div>
      </div>
      <div class="map-zone-tracer__stage-wrap">
        <div class="map-zone-tracer__stage">
          <img class="map-zone-tracer__img" alt="" decoding="async" />
          <svg class="map-zone-tracer__svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g class="map-zone-tracer__saved"></g>
            <g class="map-zone-tracer__draft"></g>
          </svg>
        </div>
      </div>
      <div class="map-zone-tracer__export card border-0 shadow-sm mt-3">
        <div class="card-body">
          <h2 class="h6 mb-3">Zonas guardadas</h2>
          <p class="text-muted small mb-2 map-zone-tracer__empty">Aún no hay zonas. Cierra una zona para listarla aquí.</p>
          <ul class="list-unstyled mb-0 map-zone-tracer__list"></ul>
        </div>
      </div>
    `;

    this._els.floor = this._root.querySelector('.map-zone-tracer__floor');
    this._els.zoneId = this._root.querySelector('.map-zone-tracer__zone-id');
    this._els.color = this._root.querySelector('.map-zone-tracer__color');
    this._els.status = this._root.querySelector('.map-zone-tracer__status');
    this._els.img = this._root.querySelector('.map-zone-tracer__img');
    this._els.svg = this._root.querySelector('.map-zone-tracer__svg');
    this._els.savedG = this._root.querySelector('.map-zone-tracer__saved');
    this._els.draftG = this._root.querySelector('.map-zone-tracer__draft');
    this._els.list = this._root.querySelector('.map-zone-tracer__list');
    this._els.empty = this._root.querySelector('.map-zone-tracer__empty');

    this._els.floor.addEventListener('change', () => this._setFloor(this._els.floor.value));
    this._els.zoneId.addEventListener('change', () => this._syncColorFromPreset());
    this._els.color.addEventListener('input', () => this._renderDraftOnly());

    this._root.querySelector('.map-zone-tracer__close').addEventListener('click', () => this._closeZone());
    this._root.querySelector('.map-zone-tracer__undo').addEventListener('click', () => this._undoPoint());
    this._root.querySelector('.map-zone-tracer__clear').addEventListener('click', () => this._clearDraft());

    this._onImgLoad = this._render;
    this._els.svg.addEventListener('click', this._onStageClick);
    this._els.img.addEventListener('load', this._onImgLoad);
    window.addEventListener('resize', this._onResize);

    this._syncColorFromPreset();
    this._setFloor(this._floor, true);
  }

  _setStatus(msg, isError = false) {
    if (!this._els.status) return;
    this._els.status.textContent = msg || '';
    this._els.status.classList.toggle('text-danger', !!isError);
    this._els.status.classList.toggle('text-muted', !isError && !!msg);
  }

  _syncColorFromPreset() {
    const id = this._els.zoneId.value;
    const hit = this._presets.find(z => z.id === id);
    if (hit) this._els.color.value = hit.color;
    this._renderDraftOnly();
  }

  _setFloor(floor, initial = false) {
    this._floor = floor;
    const src = this._images[floor];
    if (!src) return;
    this._els.img.src = src;
    this._els.img.alt = floor === 'ground' ? 'Plano planta baja' : 'Plano planta primera';
    if (!initial) {
      this._draft = [];
      this._setStatus('');
      if (this._els.savedG) this._els.savedG.innerHTML = '';
      this._renderDraftOnly();
    }
  }

  _onResize() {
    this._syncSvgViewBox();
  }

  _syncSvgViewBox() {
    const img = this._els.img;
    const svg = this._els.svg;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (!nw || !nh) return;
    this._imgNatural = { w: nw, h: nh };
    svg.setAttribute('viewBox', `0 0 ${nw} ${nh}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  _eventToNatural(ev) {
    const img = this._els.img;
    const rect = img.getBoundingClientRect();
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (rect.width < 2 || rect.height < 2 || !nw || !nh) return null;
    const x = ((ev.clientX - rect.left) / rect.width) * nw;
    const y = ((ev.clientY - rect.top) / rect.height) * nh;
    return [x, y];
  }

  _onStageClick(ev) {
    if (ev.target.closest('button')) return;
    const pt = this._eventToNatural(ev);
    if (!pt) {
      this._setStatus('Espera a que cargue la imagen.', true);
      return;
    }
    this._draft.push(pt);
    this._setStatus(`${this._draft.length} punto(s)`);
    this._renderDraftOnly();
  }

  _undoPoint() {
    this._draft.pop();
    this._setStatus(this._draft.length ? `${this._draft.length} punto(s)` : '');
    this._renderDraftOnly();
  }

  _clearDraft() {
    this._draft = [];
    this._setStatus('');
    this._renderDraftOnly();
  }

  _closeZone() {
    if (this._draft.length < 3) {
      this._setStatus('Se necesitan al menos 3 puntos para cerrar la zona.', true);
      return;
    }
    const id = this._els.zoneId.value;
    const color = this._els.color.value;
    const pointsStr = pointsToSvgString(this._draft);
    const zone = {
      floor: this._floor,
      id,
      color,
      points: pointsStr,
      polygonHtml: buildPolygonSnippet(id, color, pointsStr)
    };
    this._zones.push(zone);
    this._draft = [];
    this._setStatus('Zona guardada.');
    this._render();
  }

  _renderDraftOnly() {
    const color = this._els.color.value;
    this._drawDraft(this._els.draftG, this._draft, color);
  }

  _render() {
    this._syncSvgViewBox();
    const g = this._els.savedG;
    g.innerHTML = '';
    this._zones.filter(z => z.floor === this._floor).forEach(z => {
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', z.points);
      poly.setAttribute('fill', z.color);
      poly.setAttribute('fill-opacity', '0.35');
      poly.setAttribute('stroke', z.color);
      poly.setAttribute('stroke-width', '2');
      poly.setAttribute('vector-effect', 'non-scaling-stroke');
      g.appendChild(poly);
    });
    this._renderDraftOnly();
    this._renderList();
  }

  _drawDraft(container, points, color) {
    container.innerHTML = '';
    if (!points.length) return;

    if (points.length >= 3) {
      const preview = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      preview.setAttribute('points', pointsToSvgString(points));
      preview.setAttribute('fill', color);
      preview.setAttribute('fill-opacity', '0.2');
      preview.setAttribute('stroke', color);
      preview.setAttribute('stroke-width', '1');
      preview.setAttribute('vector-effect', 'non-scaling-stroke');
      container.appendChild(preview);
    }

    if (points.length >= 2) {
      const pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      pl.setAttribute('points', pointsToSvgString(points));
      pl.setAttribute('fill', 'none');
      pl.setAttribute('stroke', color);
      pl.setAttribute('stroke-width', '2');
      pl.setAttribute('stroke-dasharray', '6 4');
      pl.setAttribute('vector-effect', 'non-scaling-stroke');
      container.appendChild(pl);
    }

    points.forEach(([x, y]) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', String(Math.round(x)));
      c.setAttribute('cy', String(Math.round(y)));
      c.setAttribute('r', '6');
      c.setAttribute('fill', '#fff');
      c.setAttribute('stroke', color);
      c.setAttribute('stroke-width', '2');
      container.appendChild(c);
    });
  }

  _renderList() {
    const list = this._els.list;
    const empty = this._els.empty;
    list.innerHTML = '';
    empty.hidden = this._zones.length > 0;

    this._zones.forEach((z, index) => {
      const li = document.createElement('li');
      li.className = 'map-zone-tracer__item border rounded p-2 mb-2';
      const floorLabel = z.floor === 'first' ? 'Planta primera' : 'Planta baja';
      li.innerHTML = `
        <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
          <span class="badge bg-secondary">#${index + 1}</span>
          <span class="badge bg-dark">${floorLabel}</span>
          <strong>id="${z.id}"</strong>
          <span class="map-zone-tracer__swatch rounded border" title=""></span>
          <code class="small map-zone-tracer__color-code"></code>
          <button type="button" class="btn btn-sm btn-outline-primary map-zone-tracer__copy">Copiar &lt;polygon&gt;</button>
          <button type="button" class="btn btn-sm btn-outline-danger map-zone-tracer__remove ms-auto">Eliminar</button>
        </div>
        <label class="form-label small text-muted mb-0">points</label>
        <textarea class="form-control form-control-sm font-monospace small map-zone-tracer__ta-points" readonly rows="2"></textarea>
        <label class="form-label small text-muted mb-0 mt-2">Fragmento listo</label>
        <textarea class="form-control form-control-sm font-monospace small map-zone-tracer__snippet" readonly rows="3"></textarea>
      `;
      li.querySelector('.map-zone-tracer__swatch').style.background = z.color;
      li.querySelector('.map-zone-tracer__swatch').title = z.color;
      li.querySelector('.map-zone-tracer__color-code').textContent = z.color;
      li.querySelector('.map-zone-tracer__ta-points').value = z.points;
      li.querySelector('.map-zone-tracer__snippet').value = z.polygonHtml;

      li.querySelector('.map-zone-tracer__copy').addEventListener('click', () => this._copyToClipboard(z.polygonHtml, li.querySelector('.map-zone-tracer__copy')));
      li.querySelector('.map-zone-tracer__remove').addEventListener('click', () => {
        this._zones.splice(index, 1);
        this._render();
      });
      list.appendChild(li);
    });
  }

  async _copyToClipboard(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      const prev = btn.textContent;
      btn.textContent = 'Copiado';
      setTimeout(() => {
        btn.textContent = prev;
      }, 1600);
      this._setStatus('Copiado al portapapeles.');
    } catch {
      this._setStatus('No se pudo copiar (permiso o navegador).', true);
    }
  }
}

window.MapZoneTracer = MapZoneTracer;
