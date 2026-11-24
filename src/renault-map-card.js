// ── renault-map-card ─────────────────────────────────────────────────────────
// Leaflet and MapLibre ship with the card in dist/ (all .js, so HACS downloads them): no CDN,
// only the map tiles come from the network. Same base maps as ha-carburants-france.
import { RENAULT_CARD_VERSION, RN_LEAFLET_CSS, RN_RENAULT_LOGO, pickerDefine } from "./card-picker.js";
import { rnEsc, rnIntlLang, rnRelative, rnResolveLang, rnT } from "./i18n-helpers.js";
import { RN_LANGUAGE_FIELD, RN_ROLES, rnBrandHtml, rnBrandKey, rnDeviceEntities, rnFindRole, rnModelLabel, rnPhotoEntity, rnPhotoKey, rnPhotoUrl, rnRegistryEntities, rnStateless, rnStillStateless, rnVehicles } from "./entity-discovery.js";
import { rnInk } from "./lease-tracking.js";
import { RN_NO_VALUE, RN_PILL_STYLE, RN_SCENE_STYLE, RenaultCard, rnIsNight, rnMorph, rnSceneSvg, rnUid } from "./illustrated-header.js";
import { rnEnsureForm } from "./renault-card-editor.js";
import { RnMapI18n } from "./i18n/tables.js";

export var RN_MAP_DEFAULTS = { illustration: true, illustration_theme: 'auto', height: 400, show_icon: true, show_home: true, show_name: true, show_picture: true, show_fullscreen: true, map_style: 'ha', theme: 'auto' };

export var RN_OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
export var RN_IGN_WMTS = 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}';

// Base maps that need no API key. "osm" goes through Home Assistant (see _tileUrl).
// photo: aerial imagery, never darkened by the dark theme.
export var RN_MAP_STYLES = {
  // Home Assistant's own map: OpenStreetMap vector tiles and the style its map card uses (2026.9+).
  ha: { vector: true, maxZoom: 20, attribution: RN_OSM_ATTRIBUTION },
  osm: { maxZoom: 19, attribution: RN_OSM_ATTRIBUTION },
  osm_fr: {
    url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    maxZoom: 20,
    attribution: `&copy; <a href="https://www.openstreetmap.fr" target="_blank" rel="noopener">OpenStreetMap France</a> | ${RN_OSM_ATTRIBUTION}`,
  },
  ign: {
    url: `${RN_IGN_WMTS}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&FORMAT=image/png`,
    maxNativeZoom: 19,
    maxZoom: 20,
    attribution: 'Plan IGN &copy; <a href="https://www.ign.fr" target="_blank" rel="noopener">IGN</a>',
  },
  ign_photo: {
    url: `${RN_IGN_WMTS}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&FORMAT=image/jpeg`,
    maxNativeZoom: 19,
    maxZoom: 20,
    photo: true,
    attribution: 'Aerial photography &copy; <a href="https://www.ign.fr" target="_blank" rel="noopener">IGN</a>',
  },
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    maxZoom: 17,
    attribution: `${RN_OSM_ATTRIBUTION}, SRTM | &copy; <a href="https://opentopomap.org" target="_blank" rel="noopener">OpenTopoMap</a> (CC-BY-SA)`,
  },
  cyclosm: {
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    maxZoom: 20,
    attribution: `<a href="https://www.cyclosm.org" target="_blank" rel="noopener">CyclOSM</a> | ${RN_OSM_ATTRIBUTION}`,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    photo: true,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  custom: { maxZoom: 20 },
};


export function rnMapLang(hass) {
  return rnResolveLang(RnMapI18n, (hass?.language) || document.documentElement.lang);
}

// Where this file was loaded from (/hacsfiles/ha-vehicle-card/ with the Marketplace): the libraries sit next to it.
export var rnBaseUrl = null;
export function rnAssetBase() {
  if (rnBaseUrl) return rnBaseUrl;
  var found = null;
  try {
    var entries = performance.getEntriesByType('resource');
    for (var i = entries.length - 1; i >= 0; i--) {
      if (/\/(vehicle|renault)-card\.js(\?|$)/.test(entries[i].name)) { found = entries[i].name; break; }
    }
  } catch (_err) { /* no resource timing */ }
  if (!found) {
    var scripts = document.querySelectorAll('script[src]');
    for (var j = 0; j < scripts.length; j++) {
      if (/\/(vehicle|renault)-card\.js(\?|$)/.test(scripts[j].src)) found = scripts[j].src;
    }
  }
  rnBaseUrl = found ? found.split('?')[0].replace(/[^/]*$/, '') : '/hacsfiles/ha-vehicle-card/';
  return rnBaseUrl;
}

export function rnLoadScript(file, check) {
  return new Promise((resolve, reject) => {
    if (check()) { resolve(); return; }
    var script = document.createElement('script');
    script.src = `${rnAssetBase() + file}?v=${RENAULT_CARD_VERSION}`;
    script.onload = () => { resolve(); };
    script.onerror = () => {
      script.remove();
      reject(new Error(`${file} could not be loaded from ${rnAssetBase()}`));
    };
    document.head.appendChild(script);
  });
}

// After a failed load, every map card on the page waits this long before requesting leaflet.js again,
// instead of adding a new <script> tag on each state change.
export var RN_LEAFLET_RETRY_MS = 30000;
export var rnLeafletPromise = null;
export var rnLeafletError = null;
export var rnLeafletFailedAt = 0;
export function rnLoadLeaflet() {
  if (window.L?.map) return Promise.resolve(window.L);
  if (!rnLeafletPromise && rnLeafletError && Date.now() - rnLeafletFailedAt < RN_LEAFLET_RETRY_MS) {
    return Promise.reject(rnLeafletError);
  }
  if (!rnLeafletPromise) {
    rnLeafletPromise = rnLoadScript('leaflet.js', () => window.L?.map)
      .then(() => { rnLeafletError = null; return window.L; })
      .catch((err) => {
        rnLeafletPromise = null;
        rnLeafletError = err;
        rnLeafletFailedAt = Date.now();
        throw err;
      });
  }
  return rnLeafletPromise;
}

// MapLibre GL draws Home Assistant's vector map; the adapter puts it in Leaflet, as the native map card does.
export var rnMaplibrePromise = null;
export function rnLoadMaplibre() {
  if (!rnMaplibrePromise) {
    var base = rnAssetBase();
    rnMaplibrePromise = Promise.all([
      import(`${base}maplibre-gl.js?v=${RENAULT_CARD_VERSION}`),
      rnLoadScript('maplibre-gl-css.js', () => !!window.__rnMaplibreCss),
    ]).then((results) => {
      var module = results[0];
      // The worker is a .js file next to the library (HACS only downloads .js files).
      if (module.setWorkerUrl) module.setWorkerUrl(`${base}maplibre-gl-worker.js?v=${RENAULT_CARD_VERSION}`);
      window.maplibregl = window.maplibregl || module;
      if (window.MaplibreGLLeaflet?.maplibreGL) return window.MaplibreGLLeaflet.maplibreGL;
      return rnLoadScript('leaflet-maplibre-gl.js', () => window.MaplibreGLLeaflet)
        .then(() => window.MaplibreGLLeaflet.maplibreGL);
    }).catch((err) => {
      rnMaplibrePromise = null;
      throw err;
    });
  }
  return rnMaplibrePromise;
}

export function rnSupportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch (_err) {
    return false;
  }
}

// Everything the map needs about one vehicle.
// ent: the vehicle's entities by role (rnVehicleEntities), resolved once per registry change.
export function rnVehicleEntities(hass, deviceId) {
  var list = rnDeviceEntities(hass, deviceId);
  var ent = {};
  Object.keys(RN_ROLES).forEach((role) => { ent[role] = rnFindRole(hass, list, RN_ROLES[role]); });
  return ent;
}

// photo: the renault_picture entity id, resolved once by the map card's discovery (walked here if omitted).
export function rnVehicle(hass, deviceId, ent, photo) {
  var device = hass.devices?.[deviceId];
  ent = ent || rnVehicleEntities(hass, deviceId);
  var tracker = ent.location && hass.states[ent.location];
  if (!tracker || tracker.attributes.latitude == null || tracker.attributes.longitude == null) return null;
  return {
    deviceId: deviceId,
    device: device,
    ent: ent,
    tracker: tracker,
    name: device ? String(device.name_by_user || device.name || '').trim() : tracker.attributes.friendly_name,
    model: rnModelLabel(hass, deviceId, device),
    image: rnPhotoUrl(hass, photo === undefined ? rnPhotoEntity(hass, deviceId) : photo),
    lat: tracker.attributes.latitude,
    lon: tracker.attributes.longitude,
  };
}

export class RenaultMapCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('renault-map-card-editor');
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    var previous = this._config;
    this._config = Object.assign({}, RN_MAP_DEFAULTS, config || {});
    if (previous && this._tilesKey(previous) !== this._tilesKey(this._config)) this._vectorFailed = false;
    this._reloadTilesIfNeeded();
    this._fitted = false;
    this._sig = null;
    if (this._hass) this._update();
  }

  set hass(hass) {
    this._hass = hass;
    var sig = this._signature();
    if (sig !== this._sig || !this._map) {
      this._sig = sig;
      this._update();
    } else if (this._root) {
      // Theme switched in Home Assistant: dark filter and light / dark vector style follow.
      this._root.querySelector('.map').classList.toggle('dark', this._darkTiles());
      this._reloadTilesIfNeeded();
    }
  }

  connectedCallback() {
    if (!this._map) return;
    if (this._fsLink && !this._onFsChange) this._bindFs();
    if (this._resizeObserver) this._resizeObserver.observe(this._root.querySelector('.map'));
    this._pillResize?.observe(this._root.querySelector('ha-card'));
    this._scheduleTokenRefresh();
    // The token may have expired while the card was detached.
    if (this._tiles?.getMaplibreMap) {
      this._hass.callWS({ type: 'map_tiles/access_token' }).then((res) => { this._mapToken = res.token; }, () => {});
    } else if (this._tiles && this._tilesProxied) {
      this._tileUrl().then((url) => { if (this._tiles) this._tiles.setUrl(url); });
    }
    setTimeout(this._invalidate.bind(this), 0);
  }

  disconnectedCallback() {
    if (this._resizeObserver) this._resizeObserver.disconnect();
    this._pillResize?.disconnect();
    clearInterval(this._tokenTimer);
    if (this._onFsChange) {
      document.removeEventListener('fullscreenchange', this._onFsChange);
      document.removeEventListener('webkitfullscreenchange', this._onFsChange);
      document.removeEventListener('keydown', this._onFsKey);
      this._onFsChange = null;
    }
    // Leaving the view in pseudo full screen: drop the fixed-position classes too.
    if (this._pseudoFs) {
      this._pseudoFs = false;
      this._fullscreenChanged();
    }
  }

  getCardSize() {
    return Math.ceil((this._config ? this._config.height : 400) / 50) + 1;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  _lang() { return this._config?.language ? rnResolveLang(RnMapI18n, this._config.language) : rnMapLang(this._hass); }

  _mt() { return RnMapI18n[this._lang()]; }

  _intl() { return rnIntlLang(RnMapI18n, this._lang(), this._hass); }

  _deviceIds() {
    var ids = this._config.devices;
    if (typeof ids === 'string') ids = [ids];
    if (ids?.length) return ids;
    // From the registry: a vehicle whose tracker has no state yet is kept, and shown once it has one.
    return rnVehicles(this._hass).filter((id) => rnRegistryEntities(this._hass, id).some((e) => e.entity_id.indexOf('device_tracker.') === 0));
  }

  // Device and entity discovery walks the whole registry: redo it only when the registries
  // (replaced, not mutated, on change) or the config change, or once one of the vehicles'
  // registry entities that had no state at discovery time has one (its role may have been missed).
  _discovered() {
    var hass = this._hass, d = this._disc;
    if (!d || d.entities !== hass.entities || d.devices !== hass.devices || d.config !== this._config ||
        !rnStillStateless(hass, d.stateless)) {
      var ids = this._deviceIds();
      var ents = {};
      var photos = {};
      var regIds = [];
      ids.forEach((id) => {
        ents[id] = rnVehicleEntities(hass, id);
        photos[id] = rnPhotoEntity(hass, id);
        regIds = regIds.concat(rnRegistryEntities(hass, id).map((e) => e.entity_id));
      });
      d = this._disc = { entities: hass.entities, devices: hass.devices, config: this._config, ids: ids, ents: ents, photos: photos, stateless: rnStateless(hass, regIds) };
    }
    return d;
  }

  _vehicles() {
    var hass = this._hass, d = this._discovered();
    return d.ids.map((id) => rnVehicle(hass, id, d.ents[id], d.photos[id])).filter(Boolean);
  }

  // Redraw only when something shown on the map changes.
  _signature() {
    if (!this._hass || !this._config) return '';
    var hass = this._hass;
    return JSON.stringify([this._lang(), this._illustrated() && rnIsNight(hass, this._config), this._vehicles().map((v) => [v.deviceId, v.lat, v.lon, v.tracker.state, v.name, rnPhotoKey(v.image),
        ['fuel_autonomy', 'battery_autonomy', 'battery_level', 'fuel_quantity', 'mileage', 'location_last_activity', 'charging', 'plugged_in'].map((r) => {
          var s = v.ent[r] && hass.states[v.ent[r]];
          return s ? s.state : null;
        })])]);
  }

  _dark(config) {
    var theme = (config || this._config).theme;
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return !!(this._hass?.themes?.darkMode);
  }

  _style() {
    var style = this._config.map_style;
    if (style === 'custom' && !this._config.tile_url) style = 'osm';
    return RN_MAP_STYLES[style] ? style : 'osm';
  }

  // What the base layer depends on; the vector style also has a light and a dark version.
  _tilesKey(config) {
    var vector = RN_MAP_STYLES[config.map_style || RN_MAP_DEFAULTS.map_style]?.vector;
    return [config.map_style, config.tile_url, config.tile_attribution, vector && this._dark(config)].join('|');
  }

  // Raster tiles are darkened with a filter; aerial imagery and the vector style (dark version) are not.
  // A vector style that fell back to raster is darkened like any other raster layer.
  _darkTiles() {
    var spec = RN_MAP_STYLES[this._style()];
    return this._dark() && !spec.photo && !(spec.vector && !this._vectorFailed);
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML =
      '<style>' + RN_LEAFLET_CSS + '</style><style class="mlcss"></style>' +
      '<style>' + RenaultMapCard._styles() + '</style>' +
      '<ha-card><div class="header" hidden></div><div class="message" hidden></div><div class="map"></div></ha-card>';
    // The status pill's place is measured (see RenaultCard._fitPill): again when the card's width changes.
    if (window.ResizeObserver) {
      this._pillResize = new ResizeObserver(() => { this._fitPill(); });
      this._pillResize.observe(this._root.querySelector('ha-card'));
    }
    document.fonts?.ready?.then(() => this._fitPill());
    this._root.addEventListener('click', (ev) => {
      var btn = ev.composedPath().find((n) => n.dataset?.more);
      if (btn) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: btn.dataset.more }, bubbles: true, composed: true }));
    });
  }

  // The brand logo when every vehicle on the map is of the same brand, else the car icon.
  _brandIcon() {
    var hass = this._hass;
    var keys = this._discovered().ids.map((id) => rnBrandKey(hass, id, hass.devices?.[id]));
    var one = keys.length && keys.every((k) => k === keys[0]) ? keys[0] : null;
    return rnBrandHtml(one, () => { this._update(); }) ||
      `<ha-icon class="car" icon="${keys.length > 1 ? 'mdi:car-multiple' : 'mdi:car'}"></ha-icon>`;
  }

  _update() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var mt = this._mt();
    var header = this._root.querySelector('.header');
    var title = this._config.title === undefined ? mt.default_title : this._config.title;
    var vehicles = this._vehicles();
    // The header is patched in place, and only when it changes: the picture keeps its nodes and animations, the
    // card its height (a vehicle moving only moves its marker).
    var headerHtml, headerHidden, headerClass;
    if (this._illustrated()) {
      headerHidden = false;
      headerClass = 'header illustrated';
      headerHtml = this._banner(title, vehicles);
    } else {
      var icon = this._config.show_icon ? this._brandIcon() : '';
      headerHidden = !title && !icon;
      headerClass = 'header';
      headerHtml = icon + (title ? `<span class="title">${rnEsc(title)}</span>` : '');
    }
    if (header.hidden !== headerHidden) header.hidden = headerHidden;
    if (header.className !== headerClass) header.className = headerClass;
    if (headerHtml !== this._headerHtml) {
      this._headerHtml = headerHtml;
      rnMorph(header, headerHtml);
      if (this._illustrated()) this._fitPill();
    }
    // The <ha-card> lays the header out once it has rendered (a microtask later, Lit): measured then again.
    var hc = this._root.querySelector('ha-card');
    if (hc?.updateComplete && !hc._rnFitWait) {
      hc._rnFitWait = true;
      hc.updateComplete.then(() => this._fitPill());
    }
    var mapEl = this._root.querySelector('.map');
    var mapH = `${Math.max(150, Number(this._config.height) || 400)}px`;
    if (mapEl.style.height !== mapH) mapEl.style.height = mapH;
    mapEl.classList.toggle('dark', this._darkTiles());
    this._reloadTilesIfNeeded();
    var message = this._root.querySelector('.message');
    if (!vehicles.length) {
      // Clear stale markers left over from when vehicles still had a position.
      if (this._layer) {
        this._layer.clearLayers();
        this._markers = {};
        this._homeMarker = null;
        this._markerSet = '';
        this._bounds = null;
        this._fitted = false;
      }
      this._leafletError = false;
      message.hidden = false;
      message.textContent = mt.no_vehicle;
      return;
    }
    // A Leaflet load error stays on screen between updates (no flicker) until Leaflet is there.
    if (!this._leafletError) message.hidden = true;
    rnLoadLeaflet().then((L) => {
      this._leafletError = false;
      message.hidden = true;
      this._ensureMap(L);
      this._drawMarkers(L, vehicles);
    }).catch((err) => {
      this._leafletError = true;
      message.hidden = false;
      message.textContent = String((err?.message) || err);
    });
  }

  _illustrated() { return this._config?.illustration !== false; }

  _fitPill() { RenaultCard.prototype._fitPill.call(this); }

  // Where the vehicles are, for the illustrated header. One vehicle: its zone in the pill (green at home,
  // the accent colour in another zone, grey away), its model below the title, its charging post in the scene.
  // Several: how many are at home in the pill (green when all of them), their names below the title.
  _mapStatus(vehicles) {
    var hass = this._hass, mt = this._mt();
    var zone = (v) => (v.tracker?.state === 'home' ? 'home' : v.tracker?.state === 'not_home' ? 'away' : 'zone');
    if (!vehicles.length) return { level: 'idle', pill: '', text: '', charger: null, entity: null };
    if (vehicles.length === 1) {
      var v = vehicles[0], z = zone(v);
      var where = hass.formatEntityState ? hass.formatEntityState(v.tracker) : z === 'home' ? mt.home : v.tracker.state;
      var val = (id) => (id && hass.states[id] ? hass.states[id].state : null);
      var charger = null;
      if (val(v.ent.charging) === 'on') charger = 'charging';
      else if (val(v.ent.plugged_in) === 'on' || val(v.ent.plugged_in) === 'off') charger = val(v.ent.plugged_in) === 'on' ? 'plugged' : 'unplugged';
      else if (v.ent.charging && RN_NO_VALUE.indexOf(String(val(v.ent.charging))) < 0 && val(v.ent.charging) != null) charger = 'unplugged';
      return { level: z === 'home' ? 'ok' : z === 'zone' ? 'active' : 'idle', pill: where, text: v.model || '', charger: charger, entity: v.ent.location };
    }
    var home = vehicles.filter((v) => zone(v) === 'home').length;
    return { level: home === vehicles.length ? 'ok' : 'idle', pill: `${mt.home} · ${home}/${vehicles.length}`,
      text: vehicles.map((v) => v.name).join(', '), charger: null, entity: null };
  }

  // The illustrated header of the vehicle card, on the map: the round map-marker icon (its colour is where the
  // vehicles are, the brand's logo in a badge), the title and status on the sky, the roadside scene with the
  // car's own picture (the first one that has one when there are several), the road strip below.
  _banner(title, vehicles) {
    var c = this._config, st = this._mapStatus(vehicles);
    if (!this._uid) this._uid = rnUid();
    var pill = st.pill ? RenaultCard.prototype._pill.call(this, st) : '';
    var trow = title || pill ? `<div class="trow">${title ? `<div class="name">${rnEsc(title)}</div>` : ''}${pill}</div>` : '';
    var subtitle = st.text && st.text !== title ? `<div class="model" title="${rnEsc(st.text)}">${rnEsc(st.text)}</div>` : '';
    var hass = this._hass;
    var keys = this._discovered().ids.map((id) => rnBrandKey(hass, id, hass.devices?.[id]));
    var one = keys.length && keys.every((k) => k === keys[0]) ? keys[0] : null;
    var brand = c.show_icon ? rnBrandHtml(one, () => { this._sig = null; this._update(); }) : null;
    var img = c.show_picture ? vehicles.map((v) => v.image).find(Boolean) || null : null;
    return `<div class="banner${rnIsNight(hass, c) ? ' night' : ''}">` +
      '<div class="g-road"></div>' + rnSceneSvg({ uid: this._uid, img: img, charger: st.charger }) +
      `<div class="htext"><div class="vc-icon st-${st.level}"><ha-icon icon="${vehicles.length > 1 ? 'mdi:map-marker-multiple' : 'mdi:map-marker'}"></ha-icon>` +
      (brand ? `<span class="bbadge">${brand}</span>` : '') + `</div><div class="titles">${trow}${subtitle}</div></div></div>`;
  }

  _ensureMap(L) {
    if (this._map) return;
    var mapEl = this._root.querySelector('.map');
    this._map = L.map(mapEl, { zoomControl: false, attributionControl: true, scrollWheelZoom: false, zoomSnap: 0.25 });
    mapEl.classList.toggle('dark', this._darkTiles());
    this._loadTiles(L);
    this._layer = L.layerGroup().addTo(this._map);
    // At the bottom right, as on ha-carburants-france: bottom corners stack upwards, so the full screen
    // button first, then the zoom above it; the CSS joins them into one bar above the attribution.
    if (this._config.show_fullscreen) this._addFullscreenControl(L);
    L.control.zoom({ position: 'bottomright' }).addTo(this._map);
    this._fitted = false;
    if (window.ResizeObserver) {
      this._resizeObserver = new ResizeObserver(() => { this._invalidate(); });
      this._resizeObserver.observe(mapEl);
    }
  }

  // OpenStreetMap tiles through Home Assistant's own Map tiles proxy (2026.9+), like the
  // native map card. Its access token rotates every 30 minutes, two being valid at once.
  _tileUrl() {
    var hass = this._hass;
    return Promise.resolve()
      .then(() => hass.callWS({ type: 'map_tiles/access_token' }))
      .then((res) => `/api/map_tiles/raster/{z}/{x}/{y}.png?token=${encodeURIComponent(res.token)}`)
      .catch(() => 'https://tile.openstreetmap.org/{z}/{x}/{y}.png');
  }

  _loadTiles(L) {
    var map = this._map;
    var style = this._style();
    var spec = RN_MAP_STYLES[style];
    var options = { maxZoom: spec.maxZoom, attribution: spec.attribution };
    if (spec.maxNativeZoom) options.maxNativeZoom = spec.maxNativeZoom;
    var key = this._tilesKey(this._config);
    this._tilesLoadedKey = key;
    if (spec.vector && !this._vectorFailed) {
      this._loadVector(L, map, key);
      return;
    }
    if (spec.vector) {
      style = 'osm';
      spec = RN_MAP_STYLES.osm;
      options = { maxZoom: spec.maxZoom, attribution: spec.attribution };
    }
    var url;
    if (style === 'osm') url = this._tileUrl();
    else if (style === 'custom') {
      options.attribution = this._config.tile_attribution || '';
      url = Promise.resolve(this._config.tile_url);
    } else url = Promise.resolve(spec.url);
    this._root.querySelector('.map').classList.toggle('dark', this._darkTiles());
    url.then((resolved) => {
      // The map was rebuilt or the style changed while the token was loading.
      if (this._map !== map || this._tilesKey(this._config) !== key) return;
      this._tiles = L.tileLayer(resolved, options).addTo(map);
      // Our own flag instead of peeking at Leaflet's private _url when the token must be refreshed.
      this._tilesProxied = typeof resolved === 'string' && resolved.indexOf('/api/map_tiles/') === 0;
      this._tiles.bringToBack();
      this._scheduleTokenRefresh();
    });
  }

  // The base layer no longer matches the config or the theme (light / dark vector style): swap it.
  _reloadTilesIfNeeded() {
    if (!this._map || this._tilesLoadedKey === this._tilesKey(this._config)) return;
    if (this._tiles) this._map.removeLayer(this._tiles);
    this._tiles = null;
    this._tilesProxied = false;
    this._loadTiles(window.L);
  }

  // Home Assistant's style, fetched from the instance like its map card does: /static/map/light.json
  // or dark.json, tiles and glyphs through /api/map_tiles with the rotating token in a header.
  // Anything missing (WebGL2, Home Assistant before 2026.9) falls back to raster OpenStreetMap.
  _loadVector(L, map, key) {
    var dark = this._dark();
    var hass = this._hass;
    var fallback = (err) => {
      if (this._map !== map || this._tilesKey(this._config) !== key) return;
      // eslint-disable-next-line no-console
      console.info('renault-map-card: Home Assistant map style unavailable, using raster tiles', err);
      this._vectorFailed = true;
      this._loadTiles(L);
    };
    if (!rnSupportsWebGL2()) {
      fallback(new Error('WebGL2 not supported'));
      return;
    }
    Promise.all([
      rnLoadMaplibre(),
      hass.callWS({ type: 'map_tiles/access_token' }),
      fetch(`/static/map/${dark ? 'dark' : 'light'}.json`).then((resp) => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
      }),
    ]).then((results) => {
      if (this._map !== map || this._tilesKey(this._config) !== key) return;
      this._root.querySelector('.mlcss').textContent = window.__rnMaplibreCss || '';
      var maplibreGL = results[0];
      var style = results[2];
      this._mapToken = results[1].token;
      var absolute = (url) => new URL(url, location.href).href;
      if (typeof style.sprite === 'string') style.sprite = absolute(style.sprite);
      else if (Array.isArray(style.sprite)) {
        style.sprite = style.sprite.map((sprite) => Object.assign({}, sprite, { url: absolute(sprite.url) }));
      }
      this._tiles = maplibreGL({
        style: style,
        attributionControl: { customAttribution: RN_OSM_ATTRIBUTION },
        // Same as the native map card: the token in a header keeps tile URLs, and the cache, stable.
        transformRequest: (url) => {
          var full = new URL(url, location.href);
          if (full.origin === location.origin && full.pathname.indexOf('/api/map_tiles/') === 0) {
            return { url: full.href, headers: { 'X-Map-Tiles-Token': this._mapToken } };
          }
          return { url: full.href };
        },
      });
      this._tiles.addTo(map);
      this._scheduleTokenRefresh();
    }).catch(fallback);
  }

  _scheduleTokenRefresh() {
    clearInterval(this._tokenTimer);
    if (!this._tiles) return;
    if (this._tiles.getMaplibreMap) {
      this._tokenTimer = setInterval(() => {
        this._hass.callWS({ type: 'map_tiles/access_token' }).then((res) => { this._mapToken = res.token; }, () => {});
      }, 20 * 60 * 1000);
      return;
    }
    if (!this._tilesProxied) return;
    this._tokenTimer = setInterval(() => {
      this._tileUrl().then((url) => { if (this._tiles) this._tiles.setUrl(url, true); });
    }, 20 * 60 * 1000);
  }

  _invalidate() {
    if (!this._map) return;
    this._map.invalidateSize();
    if (!this._fitted && this._bounds) this._fit();
  }

  _addFullscreenControl(L) {
    var Fullscreen = L.Control.extend({
      onAdd: () => {
        var bar = L.DomUtil.create('div', 'leaflet-bar rn-fs');
        var link = L.DomUtil.create('a', '', bar);
        link.href = '#';
        link.setAttribute('role', 'button');
        L.DomEvent.disableClickPropagation(bar);
        L.DomEvent.on(link, 'click', (ev) => { L.DomEvent.preventDefault(ev); this._toggleFullscreen(); });
        this._fsLink = link;
        this._updateFullscreenButton();
        return bar;
      },
    });
    new Fullscreen({ position: 'bottomright' }).addTo(this._map);
    this._bindFs();
  }

  // Document listeners of the full screen control: added with it, removed when the card is
  // detached and added back when it is attached again.
  _bindFs() {
    if (this._onFsChange) return;
    this._onFsChange = () => { this._fullscreenChanged(); };
    this._onFsKey = (ev) => { if (ev.key === 'Escape' && this._pseudoFs) this._toggleFullscreen(); };
    document.addEventListener('fullscreenchange', this._onFsChange);
    document.addEventListener('webkitfullscreenchange', this._onFsChange);
    document.addEventListener('keydown', this._onFsKey);
  }

  _isFullscreen() { return this._pseudoFs || this._isNativeFullscreen(); }

  // Not document.fullscreenElement: on a dashboard the card is deep in shadow roots,
  // so that property points at the outermost host, never at this card.
  _isNativeFullscreen() {
    var selectors = [':fullscreen', ':-webkit-full-screen'];
    for (var i = 0; i < selectors.length; i++) {
      try { if (this.matches(selectors[i])) return true; } catch (_err) { /* unsupported selector */ }
    }
    return false;
  }

  // Native full screen where the browser allows it, else (iPhone) the card fills the window.
  _toggleFullscreen() {
    if (this._pseudoFs) { this._pseudoFs = false; this._fullscreenChanged(); return; }
    if (this._isFullscreen()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    var request = this.requestFullscreen || this.webkitRequestFullscreen;
    var pseudo = () => { this._pseudoFs = true; this._fullscreenChanged(); };
    if (!request) { pseudo(); return; }
    try {
      var result = request.call(this);
      if (result?.catch) result.catch(pseudo);
    } catch (_err) { pseudo(); }
  }

  _fullscreenChanged() {
    var card = this._root?.querySelector('ha-card');
    if (!card) return;
    var on = this._isFullscreen();
    card.classList.toggle('fullscreen', on);
    card.classList.toggle('pseudo', !!this._pseudoFs);
    this._updateFullscreenButton();
    setTimeout(() => { this._fitted = false; this._invalidate(); }, 50);
  }

  _updateFullscreenButton() {
    if (!this._fsLink) return;
    var mt = this._mt();
    var on = this._isFullscreen();
    var label = on ? mt.exit_fullscreen : mt.fullscreen;
    var path = on
      ? 'M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z'
      : 'M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z';
    this._fsLink.title = label;
    this._fsLink.setAttribute('aria-label', label);
    this._fsLink.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>`;
  }

  _fit() {
    var mapEl = this._root.querySelector('.map');
    if (!mapEl.clientWidth) return; // Not laid out yet: the resize observer comes back.
    if (this._config.zoom && this._bounds) {
      this._map.setView(this._bounds.getCenter(), this._config.zoom);
    } else if (this._bounds) {
      // Pins sit above their point and are ~150 px wide: leave room on top and on the sides.
      this._map.fitBounds(this._bounds, { paddingTopLeft: [100, 90], paddingBottomRight: [100, 30], maxZoom: 15 });
    }
    this._fitted = true;
  }

  _num(id) {
    var s = id && this._hass.states[id];
    return s && s.state !== 'unavailable' && s.state !== 'unknown' && s.state !== '' && !Number.isNaN(Number(s.state)) ? Number(s.state) : null;
  }

  _fmt(id) {
    var s = id && this._hass.states[id];
    var n = this._num(id);
    if (n == null) return '';
    var u = s.attributes.unit_of_measurement || '';
    return n.toLocaleString(this._intl(), { maximumFractionDigits: 0 }) + (u ? (u === '%' ? ' %' : ` ${u}`) : '');
  }

  _drawMarkers(L, vehicles) {
    var points = [];
    var signature = vehicles.map((v) => v.deviceId).join(',');
    if (signature !== this._markerSet) this._fitted = false;
    this._markerSet = signature;
    // Markers are kept per vehicle and updated in place, so an open popup stays open.
    var markers = this._markers || {};
    this._markers = {};

    vehicles.forEach((v) => {
      var range = v.ent.battery_autonomy && this._num(v.ent.battery_autonomy) != null ? v.ent.battery_autonomy : v.ent.fuel_autonomy;
      var rangeTxt = this._fmt(range);
      var pic = this._config.show_picture && v.image
        ? `<img class="car" src="${rnEsc(v.image)}" alt="">`
        : '<span class="car-icon"><ha-icon icon="mdi:car"></ha-icon></span>';
      var text = this._config.show_name
        ? `<span class="ptext"><span class="pname">${rnEsc(v.name)}</span>${rangeTxt ? `<span class="prange">${rnEsc(rangeTxt)}</span>` : ''}</span>`
        : (rangeTxt ? `<span class="prange">${rnEsc(rangeTxt)}</span>` : '');
      var pinHtml = `<div class="pin" title="${rnEsc(v.name)}">${pic}${text}</div>`;
      var icon = L.divIcon({
        className: 'rn-marker',
        html: pinHtml,
        iconSize: null,
        iconAnchor: [0, 0],
      });
      var marker = markers[v.deviceId];
      if (marker) {
        delete markers[v.deviceId];
        marker.setLatLng([v.lat, v.lon]);
        // The same pin (a vehicle that only moved): its element, photo included, is kept.
        if (marker._rnIconHtml !== pinHtml) marker.setIcon(icon);
        marker.setPopupContent(this._popup(v));
      } else {
        marker = L.marker([v.lat, v.lon], { icon: icon, riseOnHover: true });
        marker.bindPopup(this._popup(v), { maxWidth: 280, minWidth: 230 });
        // The map is only redrawn when a state changes: rebuild the popup when it opens so
        // "updated X ago" is current for a parked car. Skipped once the marker was removed.
        marker.on('popupopen', () => {
          if (this._markers?.[marker._rnId] === marker && this._hass) marker.setPopupContent(this._popup(marker._rnVehicle));
        });
        marker.addTo(this._layer);
      }
      marker._rnId = v.deviceId;
      marker._rnIconHtml = pinHtml;
      marker._rnVehicle = v;
      this._markers[v.deviceId] = marker;
      points.push([v.lat, v.lon]);
    });
    Object.keys(markers).forEach((id) => { this._layer.removeLayer(markers[id]); });

    if (this._homeMarker) {
      this._layer.removeLayer(this._homeMarker);
      this._homeMarker = null;
    }
    var home = this._hass.states['zone.home'];
    if (this._config.show_home && home && home.attributes.latitude != null) {
      this._homeMarker = L.marker([home.attributes.latitude, home.attributes.longitude], {
        icon: L.divIcon({ className: 'rn-marker', html: `<div class="home" title="${rnEsc(this._mt().home)}"><ha-icon icon="mdi:home"></ha-icon></div>`, iconSize: null, iconAnchor: [0, 0] }),
        zIndexOffset: -1000,
        keyboard: false,
      }).addTo(this._layer);
      points.push([home.attributes.latitude, home.attributes.longitude]);
    }

    this._bounds = points.length ? L.latLngBounds(points) : null;
    if (!this._fitted) this._fit();
  }

  _popup(v) {
    var mt = this._mt();
    var lang = this._lang();
    var hass = this._hass;
    var where = hass.formatEntityState ? hass.formatEntityState(v.tracker) : v.tracker.state;
    var lastId = v.ent.location_last_activity;
    var lastSt = lastId && hass.states[lastId];
    var lastOk = lastSt && lastSt.state !== 'unavailable' && lastSt.state !== 'unknown' && lastSt.state !== '';
    var last = lastOk ? new Date(lastSt.state) : new Date(v.tracker.last_updated || '');
    var when = Number.isNaN(last.getTime()) ? '' : rnT(lang, 'updated').replace('{t}', rnRelative(this._intl(), last));
    var rows = [
      ['battery_level', 'battery_level'], ['battery_autonomy', 'battery_autonomy'],
      ['fuel_autonomy', 'fuel_autonomy'], ['fuel_quantity', 'fuel_quantity'], ['mileage', 'mileage'],
    ].map((r) => {
      var txt = this._fmt(v.ent[r[0]]);
      return txt ? `<tr><td>${rnEsc(rnT(lang, r[1]))}</td><td><b>${rnEsc(txt)}</b></td></tr>` : '';
    }).join('');
    return '<div class="popup">' +
      (v.image && this._config.show_picture ? `<img class="pimg" src="${rnEsc(v.image)}" alt="">` : '') +
      '<div class="pname-pop">' + rnEsc(v.name) + '</div>' +
      (v.model ? `<div class="pmodel">${rnEsc(v.model)}</div>` : '') +
      '<div class="pwhere">' + rnEsc(where) + (when ? ` · ${rnEsc(when)}` : '') + '</div>' +
      (rows ? `<table>${rows}</table>` : '') +
      '<div class="pactions">' +
        '<a class="pbtn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(`${v.lat},${v.lon}`) + '">' +
          '<ha-icon icon="mdi:directions"></ha-icon>' + rnEsc(mt.directions) + '</a>' +
        '<button class="pbtn alt" data-more="' + rnEsc(v.ent.location) + '"><ha-icon icon="mdi:information-outline"></ha-icon>' + rnEsc(mt.details) + '</button>' +
      '</div></div>';
  }

  static _styles() {
    return [
      // The map has no width of its own: in an auto-width parent (layout-card, inline-block, grid auto
      // column) the card would be as narrow as its title. The empty :host::before grid gives the host a
      // 300 px max-content width there and a 0 min-content width, so in a 1fr grid track or a flex item
      // (even wrapped in a div or hui-card) the card shrinks to its share; elsewhere the parent sets it.
      ':host { display: block; min-width: 0; --rn-accent: var(--primary-color, #03a9f4); }',
      ":host::before { content: ''; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }",
      'ha-card { display: block; overflow: hidden; contain: inline-size; container-type: inline-size; }',
      '.header { display: flex; align-items: center; gap: 10px; min-height: 36px; padding: 12px 12px 8px; font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); }',
      '.brand { width: 40px; height: 40px; flex: none; background: var(--primary-text-color);' +
        ' -webkit-mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; }',
      '.brand-svg { width: 32px; height: 32px; padding: 4px; flex: none; fill: var(--primary-text-color); }',
      '.header .car { --mdc-icon-size: 28px; width: 40px; display: grid; place-items: center; flex: none; color: var(--primary-text-color); }',
      '.header .title { flex: 1 1 auto; min-width: 4ch; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.header[hidden], .message[hidden] { display: none; }',
      // The illustrated header, as on the vehicle card: edge to edge above the map.
      '.header.illustrated { display: block; padding: 0; min-height: 0; }',
      '.titles { flex: 1 1 0; min-width: 5ch; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.model { font-size: 12px; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      RN_PILL_STYLE, RN_SCENE_STYLE,
      '.banner { margin: 0; }',
      '.message { padding: 12px 16px; color: var(--secondary-text-color); }',
      '.map { width: 100%; background: var(--secondary-background-color, #e5e5e5); z-index: 0; }',
      ':host(:fullscreen) { background: var(--card-background-color, #fff); }',
      'ha-card.fullscreen { display: flex !important; flex-direction: column; width: 100%; height: 100vh; height: 100dvh; border-radius: 0; box-sizing: border-box; }',
      'ha-card.fullscreen .map { flex: 1; height: auto !important; }',
      'ha-card.pseudo { position: fixed; inset: 0; z-index: 9999; height: 100vh; height: 100dvh; padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); box-sizing: border-box; }',
      '.rn-fs a { display: flex; align-items: center; justify-content: center; cursor: pointer; }',
      // Zoom and full screen in one bar at the bottom right, above the attribution (as on ha-carburants-france).
      '.leaflet-bottom.leaflet-right .leaflet-control-zoom:has(+ .rn-fs) { margin-bottom: 0; border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }',
      '.leaflet-bottom.leaflet-right .leaflet-control-zoom:has(+ .rn-fs) a:last-child { border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: 1px solid var(--divider-color, #ccc); }',
      '.leaflet-bottom.leaflet-right .rn-fs { margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0; }',
      '.leaflet-bottom.leaflet-right .rn-fs a:first-child { border-top-left-radius: 0; border-top-right-radius: 0; }',
      '.leaflet-bottom.leaflet-right .leaflet-bar { margin-bottom: 6px; }',
      // Leaflet's controls are white with black text whatever the theme: theme them like the HA map card.
      '.leaflet-touch .leaflet-bar { border-color: var(--divider-color, rgba(0,0,0,.2)); }',
      '.leaflet-container .leaflet-bar a { background-color: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); border-bottom-color: var(--divider-color, #ccc); }',
      '.leaflet-container .leaflet-bar a:hover, .leaflet-container .leaflet-bar a:focus { background-color: var(--secondary-background-color, #f4f4f4); }',
      '.leaflet-container .leaflet-bar a.leaflet-disabled { background-color: var(--secondary-background-color, #f4f4f4); color: var(--disabled-text-color, #bdbdbd); }',
      '.leaflet-container .leaflet-control-attribution { background: color-mix(in srgb, var(--card-background-color, #fff) 90%, transparent); color: var(--primary-text-color, #212121); }',
      '.leaflet-container .leaflet-control-attribution a { color: color-mix(in srgb, var(--primary-color, #03a9f4) 50%, var(--primary-text-color, #212121)); }',
      '.leaflet-container { font: inherit; }',
      '.map.dark .leaflet-tile-pane { filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9); }',
      '.rn-marker { background: none; border: none; }',
      '.pin { position: absolute; transform: translate(-50%, calc(-100% - 8px)); display: flex; align-items: center; gap: 6px; padding: 3px 10px 3px 4px; border-radius: 18px;' +
        ' background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); border: 2px solid var(--primary-color, #03a9f4);' +
        ' box-shadow: 0 2px 6px rgba(0,0,0,.3); white-space: nowrap; cursor: pointer; }',
      '.pin::after { content: ""; position: absolute; left: 50%; bottom: -9px; transform: translateX(-50%); border: 7px solid transparent; border-top: 8px solid var(--primary-color, #03a9f4); border-bottom: 0; }',
      // Leaflet forces width:auto and max-width:none on marker images: these selectors must outrank it.
      '.leaflet-container .leaflet-marker-pane .pin img.car { flex: none; height: 28px !important; width: 50px !important; max-width: none !important; object-fit: contain; }',
      '.car-icon { display: flex; color: var(--primary-color, #03a9f4); --mdc-icon-size: 22px; }',
      '.ptext { display: flex; flex-direction: column; line-height: 1.15; }',
      '.pname { font-size: 12px; font-weight: 500; }',
      '.prange { font-size: 11px; color: var(--secondary-text-color, #727272); }',
      '.home { position: absolute; transform: translate(-50%, -50%); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
        ' background: var(--primary-color, #03a9f4); color: #fff; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.35); --mdc-icon-size: 18px; }',
      '.leaflet-popup-content-wrapper, .leaflet-popup-tip { background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); }',
      '.leaflet-popup-content { margin: 10px 12px; font-size: 13px; }',
      '.pimg { display: block; width: 100%; max-height: 110px; object-fit: contain; margin-bottom: 6px; }',
      '.pname-pop { font-weight: 500; font-size: 15px; }',
      '.pmodel { font-size: 12px; color: var(--secondary-text-color, #727272); }',
      '.pwhere { margin-top: 4px; font-size: 12px; color: var(--secondary-text-color, #727272); }',
      '.popup table { margin-top: 6px; border-collapse: collapse; width: 100%; }',
      '.popup td { padding: 2px 0; }',
      '.popup td:last-child { text-align: right; }',
      '.pactions { display: flex; gap: 6px; margin-top: 10px; }',
      // Leaflet colours every link in the map: the selector must outrank '.leaflet-container a'.
      '.leaflet-container .pbtn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 7px 10px; border-radius: 16px; border: none; cursor: pointer;' +
        ' font: inherit; font-size: 13px; font-weight: 500; text-decoration: none; background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent); color: ' + rnInk('var(--primary-color, #03a9f4)') + '; }',
      '.leaflet-container .pbtn:not(.alt) ha-icon { color: var(--primary-color, #03a9f4); }',
      '.leaflet-container .pbtn:hover { background: color-mix(in srgb, var(--primary-color, #03a9f4) 24%, transparent); }',
      '.leaflet-container .pbtn.alt { background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--primary-text-color, #212121); }',
      '.pbtn ha-icon { --mdc-icon-size: 18px; }',
    ].join('\n');
  }
}

export class RenaultMapCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = rnMapLang(this._hass);
    this._hass = hass;
    if (this._form && prevLang === rnMapLang(hass)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _schema() {
    var mt = RnMapI18n[rnMapLang(this._hass)];
    var themes = ['auto', 'light', 'dark'].map((k) => ({ value: k, label: mt.themes[k] }));
    var styles = Object.keys(RN_MAP_STYLES).map((k) => ({ value: k, label: mt.styles[k] }));
    var custom = this._config.map_style === 'custom'
      ? [
          { name: 'tile_url', selector: { text: { type: 'url' } } },
          { name: 'tile_attribution', selector: { text: {} } },
        ]
      : [];
    return [
      { name: 'devices', selector: { device: { entity: [{ domain: 'device_tracker' }], multiple: true } } },
      { name: 'title', selector: { text: {} } },
      {
        type: 'grid', name: '', schema: [
          { name: 'illustration', selector: { boolean: {} } },
          // The illustrated header's labels are the vehicle card's (same strings in every language).
          { name: 'illustration_theme', selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: rnT(rnMapLang(this._hass), `theme_${v}`) })) } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'map_style', selector: { select: { mode: 'dropdown', options: styles } } },
          { name: 'theme', selector: { select: { mode: 'dropdown', options: themes } } },
        ],
      },
    ].concat(custom, [
      {
        type: 'grid', name: '', schema: [
          { name: 'height', selector: { number: { min: 150, max: 1200, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
          { name: 'zoom', selector: { number: { min: 5, max: 18, mode: 'box' } } },
          { name: 'show_icon', selector: { boolean: {} } },
          { name: 'show_home', selector: { boolean: {} } },
          { name: 'show_name', selector: { boolean: {} } },
          { name: 'show_picture', selector: { boolean: {} } },
          { name: 'show_fullscreen', selector: { boolean: {} } },
        ],
      },
      RN_LANGUAGE_FIELD,
    ]);
  }

  _render() {
    if (!this._hass || !this._config) return;
    rnEnsureForm(this);
    var mt = RnMapI18n[rnMapLang(this._hass)];
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => mt.editor[s.name] || (/^illustration/.test(s.name) ? rnT(rnMapLang(this._hass), `ed_${s.name}`) : s.name);
    var data = Object.assign({}, RN_MAP_DEFAULTS, this._config);
    if (data.title === undefined) data.title = mt.default_title;
    this._form.data = data;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    var mt = RnMapI18n[rnMapLang(this._hass)];
    Object.keys(value).forEach((key) => {
      if (key !== 'title' && (value[key] === '' || value[key] === null || value[key] === undefined)) delete value[key];
    });
    Object.keys(RN_MAP_DEFAULTS).forEach((key) => {
      if (value[key] === RN_MAP_DEFAULTS[key]) delete value[key];
    });
    // Cleared title = no title (''); the default title is not written to the YAML.
    if (value.title === undefined || value.title === null) value.title = '';
    else if (value.title === mt.default_title) delete value.title;
    if (Array.isArray(value.devices) && !value.devices.length) delete value.devices;
    if (value.map_style !== 'custom') { delete value.tile_url; delete value.tile_attribution; }
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    this._config = value;
    // A switch to "custom" adds the URL fields.
    this._form.schema = this._schema();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('renault-map-card-editor')) {
  pickerDefine('renault-map-card-editor', RenaultMapCardEditor);
}

// vehicle-… since the cards cover every brand; renault-… (their former name) stays defined for the dashboards that use it.
if (!customElements.get('vehicle-map-card')) {
  pickerDefine('vehicle-map-card', class extends RenaultMapCard {});
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'vehicle-map-card',
    name: 'Vehicle Map Card',
    description: 'Map of your vehicles, of any brand, with Home Assistant, OpenStreetMap, IGN or satellite base maps',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-vehicle-card',
  });
}
if (!customElements.get('renault-map-card')) pickerDefine('renault-map-card', class extends RenaultMapCard {});

console.info(`%c VEHICLE-CARD %c v${RENAULT_CARD_VERSION} `, 'color:#000;background:#ffcc33;font-weight:700', 'color:#000;background:#fff');
