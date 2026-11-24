// ── Illustrated header ──────────────────────────────────────────────────────
// A 90 px banner: the sky with the title on its left, a 200 × 80 roadside scene on its right (hills, street
// lamp, bush, and for a car that charges its charging post), the car's own picture parked on the road, and a
// 10 px road strip edge to edge at the bottom. Day or night: illustration_theme, else Home Assistant's dark mode
// alone (a light theme keeps the day picture after sunset).
import { RN_ORANGE_LOGO, RN_ORANGE_URL, RN_RENAULT_LOGO } from "./card-picker.js";
import { rnEsc, rnIntlLang, rnMoneyFormat, rnPlural, rnRelative, rnResolveLang, rnT } from "./i18n-helpers.js";
import { RN_DOORS, RN_KM_PER_MILE, RN_MINUTES, RN_PLAN_ROLES, RN_ROLES, RN_TYRES, rnBar, rnBrandHtml, rnBrandKey, rnDeviceEntities, rnFindDataPlan, rnFindRole, rnFindVehicle, rnModelLabel, rnPhotoEntity, rnPhotoKey, rnPhotoUrl, rnRegistryEntities, rnResolvedReady, rnStateless, rnTyrePos, rnVolvoPicture } from "./entity-discovery.js";
import { RN_BUTTON_ICONS, rnEntityIcon, rnExtraTiles, rnPlate, rnPlateOption, rnPlateSvg } from "./french-licence-plate.js";
import { RN_ERR, RN_OK, RN_WARN, rnInk, rnLeaseDates, rnLeaseStatus, rnSeverityColor } from "./lease-tracking.js";
import { rnInDialog } from "./renault-mini-card.js";
import { RnI18n } from "./i18n/tables.js";

export var RN_NO_VALUE = ['unavailable', 'unknown', ''];
export function rnIsNight(hass, config) {
  var theme = config?.illustration_theme;
  if (theme === 'night') return true;
  if (theme === 'day') return false;
  return !!hass?.themes?.darkMode;
}

export var rnUidSeq = 0;
export function rnUid() {
  rnUidSeq += 1;
  return `vc${rnUidSeq.toString(36)}`;
}

// A plain car drawn when there is no picture of the car (show_image: false, no picture entity).
export function rnSceneCar() {
  return '<g class="vc-car" transform="translate(76 79) scale(2.1)"><path class="vc-body" d="M0 -6 Q1 -11 8 -12 L14 -16 H26 L33 -12 Q40 -11 40 -6 V-2 H0Z"/>' +
    '<path class="vc-glass" d="M15 -15 H25 L30 -12 H11Z"/><circle class="vc-tyre" cx="9" cy="-2" r="3.4"/><circle class="vc-tyre" cx="31" cy="-2" r="3.4"/></g>';
}

// The scene: o.img (the car's picture URL, else a plain car), o.charger ('charging', 'plugged', 'unplugged',
// or none for a car that does not charge), o.uid (keeps the gradient ids of several cards apart).
export function rnSceneSvg(o) {
  var g = `${o.uid}-glow`;
  var stars = [[12, 8], [44, 18], [96, 6], [132, 26], [166, 8], [190, 22], [70, 30], [112, 16]]
    .map((p, i) => `<circle class="vc-star${i % 2 ? ' tw' : ''}" cx="${p[0]}" cy="${p[1]}" r=".6" style="animation-delay:${(i * 0.4).toFixed(1)}s"/>`).join('');
  var charger = '';
  if (o.charger) {
    var cable = o.charger === 'unplugged'
      ? '<path class="vc-cable" d="M180 60 C174 66 174 72 180 70 C184 69 184 64 182 62"/>'
      : '<path class="vc-cable" d="M180 60 C172 60 174 74 166 70"/>' +
        (o.charger === 'charging' ? '<path class="vc-flow" d="M180 60 C172 60 174 74 166 70"/>' : '');
    charger = '<g class="vc-charger"><rect class="vc-post" x="176" y="44" width="12" height="35" rx="2"/>' +
      '<rect class="vc-screen" x="178" y="47" width="8" height="6" rx="1"/>' +
      `<circle class="vc-led ${o.charger}" cx="182" cy="57" r="1.3"/>` +
      '<path class="vc-bolt" d="M182.8 48.2 L180.6 50.6 H182 L181.2 52.2 L183.4 49.8 H182Z"/>' + cable + '</g>';
  }
  var car = o.img
    ? `<image href="${rnEsc(o.img)}" x="54" y="20" width="124" height="66" preserveAspectRatio="xMidYMax meet"/>`
    : rnSceneCar();
  return `<svg class="vc-scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">` +
    `<defs><radialGradient id="${g}"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>` +
    `<g class="vc-night">${stars}<circle class="vc-moon" cx="148" cy="12" r="5.5"/><circle class="vc-moon-cut" cx="150.5" cy="10" r="4.5"/></g>` +
    '<g class="vc-day"><circle class="vc-sun-halo" cx="148" cy="12" r="9"/><circle class="vc-sun" cx="148" cy="12" r="6"/></g>' +
    '<path class="vc-cloud" transform="translate(66 14)" d="M-14,4 C-17,4 -18,0 -14.5,-1 C-14,-5 -8,-6 -6,-3 C-4,-8 4,-8 5,-2 C9,-3 12,0 10,4 Z"/>' +
    '<path class="vc-cloud c2" transform="translate(114 24) scale(.75)" d="M-14,4 C-17,4 -18,0 -14.5,-1 C-14,-5 -8,-6 -6,-3 C-4,-8 4,-8 5,-2 C9,-3 12,0 10,4 Z"/>' +
    '<path class="vc-hill far" d="M0,80 C30,70 60,64 100,66 C140,68 170,60 200,62 L200,80Z"/><path class="vc-hill" d="M0,80 C40,74 90,75 200,72 L200,80Z"/>' +
    `<g class="vc-lamp"><circle class="vc-halo" cx="46" cy="40" r="16" fill="url(#${g})"/><rect class="vc-pole" x="38.4" y="38" width="1.4" height="42"/>` +
    '<path class="vc-arm" d="M39 39 Q39 36 43 36 H47"/><rect class="vc-head" x="43" y="36" width="7" height="2.4" rx="1"/><rect class="vc-bulb" x="44" y="38.2" width="5" height="1.2" rx=".6"/></g>' +
    '<g class="vc-bush"><circle cx="196" cy="72" r="6"/><circle cx="189" cy="75" r="5"/></g>' +
    charger + car + '</svg>';
}

export var RN_PILL_STYLE =
  '.bchip { --c: #6b7a89; display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 51%; box-sizing: border-box;' +
    ' overflow: hidden; white-space: nowrap; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; line-height: 16px;' +
    ' background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }' +
  '.bchip.st-ok { --c: ' + RN_OK + '; } .bchip.st-active { --c: var(--rn-accent); } .bchip.st-warn { --c: ' + RN_WARN + '; } .bchip.st-err { --c: ' + RN_ERR + '; }' +
  '.bchip .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--c); flex: none; }' +
  '.bchip-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; }' +
`
  /* The status pill, in every header: at the right end of the title row only when the whole title and the pill's
     whole label fit there; otherwise on its own line under the subtitle, cut to one line; its dot alone, beside the
     title, when the banner has no room left above its ground strip, or on a card of 200 px or less. Decided by
     measurement (see _fitPill), so that every language and every width gets it right. */
  .titles .trow { display: flex; align-items: center; gap: 8px; min-width: 0; width: 100%; }
  .titles .trow > .name { flex: 0 1 auto; min-width: 0; }
  .titles .trow > .bchip { flex: none; max-width: none; margin: 0 0 0 auto; align-self: center; }
  .titles.below { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
  .titles.below > * { max-width: 100%; }
  .titles.below .trow { display: contents; }
  .titles.below .trow > .name { max-width: 100%; }
  .titles.below .trow > .bchip { order: 9; max-width: 100%; margin: 2px 0 0; align-self: flex-start; }
  /* In the banner, a pill on its own line may run over the picture, up to the banner's edge. */
  .banner .titles.below .trow > .bchip { max-width: none; }
  .titles.below :is(.model) { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .titles.dotonly .trow > .bchip { padding: 4px; } .titles.dotonly .trow > .bchip .bchip-text { display: none; }
  @container (max-width: 200px) { .titles .trow > .bchip { padding: 4px; } .titles .trow > .bchip .bchip-text { display: none; } }
`;

export var RN_SCENE_STYLE =
  '.banner { position: relative; overflow: hidden; height: 90px; margin: -12px -12px -2px; flex: none; color: #0d2a45;' +
    ' border-radius: var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px) 0 0;' +
    ' background: linear-gradient(90deg, #f1f8ff 0%, #e2f1fd 34%, #b9def8 70%, #9fd0f3 100%); }' +
  '.banner.night { color: #fff; background: linear-gradient(90deg, #1b2f52 0%, #15284a 36%, #0f1f3d 72%, #0a1830 100%); }' +
  '.vc-scene { position: absolute; right: 0; bottom: 10px; height: 80px; width: min(200px, 62%); overflow: visible; }' +
  '.vc-night, .night .vc-day { display: none; } .night .vc-night { display: inline; }' +
  '.vc-sun { fill: #ffd65a; } .vc-sun-halo { fill: #ffd65a; opacity: .28; }' +
  '.vc-moon { fill: #f3eed2; } .vc-moon-cut { fill: #0c1b37; } .vc-star { fill: #fff; opacity: .8; }' +
  '.vc-star.tw { animation: vc-twinkle 3.2s ease-in-out infinite alternate; }' +
  '.vc-cloud { fill: #fff; opacity: .92; animation: vc-drift 6s ease-in-out infinite alternate; } .vc-cloud.c2 { animation-duration: 8s; }' +
  '.night .vc-cloud { opacity: .1; }' +
  '.vc-hill.far { fill: #a7d39f; } .vc-hill { fill: #86c27f; } .night .vc-hill.far { fill: #1d3a4a; } .night .vc-hill { fill: #17303d; }' +
  '.vc-bush { fill: #4f9a3a; } .night .vc-bush { fill: #1e3d2a; }' +
  '.vc-pole, .vc-head { fill: #5f6b7a; } .vc-arm { fill: none; stroke: #5f6b7a; stroke-width: 1.2; } .vc-bulb { fill: #e8e0d0; }' +
  '.night .vc-pole, .night .vc-head { fill: #7d8793; } .night .vc-arm { stroke: #7d8793; } .night .vc-bulb { fill: #ffd27a; }' +
  '.vc-halo { display: none; } .night .vc-halo { display: inline; }' +
  '.vc-post { fill: #eef1f4; stroke: #9aa3ae; stroke-width: .6; } .night .vc-post { fill: #3a414d; stroke: #5a6474; }' +
  '.vc-screen { fill: #2a3038; } .vc-bolt { fill: #43c463; }' +
  '.vc-led { fill: #9aa3ae; } .vc-led.plugged { fill: #2f80ed; } .vc-led.charging { fill: #43c463; animation: vc-blink 1.4s ease-in-out infinite; }' +
  '.vc-cable { fill: none; stroke: #2a3038; stroke-width: 1.4; stroke-linecap: round; } .night .vc-cable { stroke: #11151b; }' +
  '.vc-flow { fill: none; stroke: #7dffa0; stroke-width: 1; stroke-linecap: round; stroke-dasharray: 2 5; animation: vc-flow 1s linear infinite; }' +
  '.vc-body { fill: var(--rn-accent); } .vc-glass { fill: #cfe6f7; } .night .vc-glass { fill: #3b4b5e; } .vc-tyre { fill: #22262b; }' +
  // The road: a 10 px strip edge to edge, dashed centre line.
  '.g-road { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #858c94; box-shadow: inset 0 1px 0 #6f767d; }' +
  '.g-road::after { content: ""; position: absolute; left: 0; right: 0; top: calc(50% - .8px); height: 1.6px;' +
    ' background: repeating-linear-gradient(90deg, rgba(255,255,255,.85) 0 9px, transparent 9px 18px); }' +
  '.night .g-road { background: #2c323b; box-shadow: inset 0 1px 0 #3a414c; } .night .g-road::after { opacity: .6; }' +
  // The title on the sky, left of the scene (whose left quarter is only sky and hills).
  '.htext { position: absolute; left: 12px; top: 6px; bottom: 16px; right: calc(min(200px, 62%) * .74 + 4px); display: flex; align-items: center; gap: 10px; min-width: 0; }' +
  '.htext .titles { flex: 1 1 0; min-width: 0; }' +
  '.banner .name { color: inherit; font-weight: 600; }' +
  '.banner .model { white-space: normal; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-height: 1.25; color: #3b5b78; } .banner.night .model { color: rgba(255,255,255,.78); }' +
  '.vc-icon { position: relative; width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; --mdc-icon-size: 24px;' +
    ' background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px rgba(13,42,69,.12); color: var(--vc-st); }' +
  '.night .vc-icon { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }' +
  // The icon's colour is the car's status: green charging, accent air conditioning on, amber to check, red offline, grey at rest.
  '.vc-icon { --vc-st: #6b7a89; } .night .vc-icon { --vc-st: #aab6c3; }' +
  '.vc-icon.st-ok { --vc-st: ' + RN_OK + '; } .night .vc-icon.st-ok { --vc-st: #66d17a; }' +
  '.vc-icon.st-active { --vc-st: var(--rn-accent); }' +
  '.vc-icon.st-warn { --vc-st: ' + RN_WARN + '; } .night .vc-icon.st-warn { --vc-st: #ffc04d; }' +
  '.vc-icon.st-err { --vc-st: ' + RN_ERR + '; } .night .vc-icon.st-err { --vc-st: #ff7a6e; }' +
  // The brand's logo in a badge at the icon's bottom right, on a white tile readable on any sky.
  '.bbadge { position: absolute; right: -4px; bottom: -4px; width: 18px; height: 18px; border-radius: 5px; padding: 2px; box-sizing: border-box;' +
    ' display: grid; place-items: center; background: #fff; box-shadow: 0 0 0 1px rgba(13,42,69,.16), 0 1px 3px rgba(13,42,69,.18); }' +
  '.bbadge .brand { width: 100%; height: 100%; background: #1c1c1c; }' +
  '.bbadge .brand-svg { width: 100%; height: 100%; padding: 0; fill: #1c1c1c; }' +
  // The status pill in the icon's colour on a frosted tint (where it goes: RN_PILL_STYLE and _fitPill).
  '.night .bchip { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }' +
  '.night .bchip.st-idle { --c: #aab6c3; }' +
  '.banner .trow:has(> .bchip) ~ .model { -webkit-line-clamp: 1; }' +
  // The mini card's expand / collapse button: 24 px, frosted, 5 px from the banner's top right corner.
  '.banner .zoom { position: absolute; top: 5px; right: 5px; z-index: 2; margin: 0; width: 24px; height: 24px; color: #33506b;' +
    ' background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); backdrop-filter: blur(4px); --mdc-icon-size: 16px; }' +
  '.banner.night .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }' +
  '.banner .zoom:hover { background: rgba(255,255,255,.75); color: #33506b; } .banner.night .zoom:hover { background: rgba(255,255,255,.22); color: #fff; }' +
  '@keyframes vc-twinkle { from { opacity: .3; } to { opacity: 1; } }' +
  '@keyframes vc-drift { from { translate: -3px 0; } to { translate: 4px 0; } }' +
  '@keyframes vc-blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }' +
  '@keyframes vc-flow { to { stroke-dashoffset: -7; } }' +
  '@media (prefers-reduced-motion: reduce) { .vc-star, .vc-cloud, .vc-led, .vc-flow { animation: none !important; } }';

// "A click elsewhere", caught on the pointer and not only on the click event: on iOS a tap on something that is not
// clickable sends no click to the page. It counts when the press and the release are both outside (`outside(ev)`), a
// scroll does not (the browser cancels the pointer); keyboard clicks (no click count) still go through the click event.
// Patches `cur` in place to the markup `html`: kept nodes keep their size, their running animations, a loaded
// <img> (the vehicle photo) and the focus, so a state update does not make the card jump (a stylesheet or an <img>
// created again can leave the card without its height for a frame, and the sections grid reflows). Children are
// matched by `data-tile`, else by position.
export function rnPatchAttrs(cur, next) {
  for (const { name } of [...cur.attributes]) if (!next.hasAttribute(name)) cur.removeAttribute(name);
  for (const { name, value } of next.attributes) if (cur.getAttribute(name) !== value) cur.setAttribute(name, value);
  // A <select> the user changed no longer follows the selected attribute: its option is selected again.
  if (cur.localName === 'option' && cur.selected !== next.hasAttribute('selected')) cur.selected = next.hasAttribute('selected');
}
export function rnKey(n) {
  return n?.nodeType === 1 ? n.getAttribute('data-tile') : null;
}
// A custom element with no markup inside (ha-icon) draws itself: it is kept as it is while its markup stays the same,
// and replaced by the new one when that changes (its own attributes and content are never compared).
export function rnLeaf(n) {
  return n.nodeType === 1 && n.localName.includes('-') && !n.childNodes.length;
}
export function rnSig(n) {
  return [...n.attributes].map((a) => `${a.name}=${a.value}`).join(' ');
}
export function rnMark(n) {
  if (n.nodeType !== 1) return;
  if (rnLeaf(n)) n._morphSig = rnSig(n);
  else for (const c of n.childNodes) rnMark(c);
}
export function rnPatchChildren(cur, next) {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  const byKey = new Map();
  for (const o of old) {
    const k = rnKey(o);
    if (k !== null && !byKey.has(k)) byKey.set(k, o);
  }
  const used = new Set();
  fresh.forEach((n, i) => {
    const k = rnKey(n);
    let o = k !== null ? byKey.get(k) : old[i];
    if (!o || o.nodeType !== n.nodeType || o.nodeName !== n.nodeName || used.has(o) || (k === null && rnKey(o) !== null)) o = null;
    const ref = cur.childNodes[i] ?? null;
    if (o && rnLeaf(n) && o._morphSig !== rnSig(n)) o = null;
    if (!o) {
      rnMark(n);
      cur.insertBefore(n, ref);
      return;
    }
    used.add(o);
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType === 1) {
      if (rnLeaf(n)) return;
      rnPatchAttrs(o, n);
      rnPatchChildren(o, n);
    } else if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
  });
  while (cur.childNodes.length > fresh.length) cur.removeChild(cur.lastChild);
}
export function rnMorph(cur, html) {
  // Not a DOM node (a stand-in in the unit tests): written as a whole.
  if (!cur.childNodes) {
    cur.innerHTML = html;
    return;
  }
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  rnPatchChildren(cur, tpl.content);
}

export function rnWatchOutside(outside, handler) {
  var downOutside = false;
  var onDown = (ev) => { downOutside = outside(ev); };
  var onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  var onClick = (ev) => { if (ev.detail === 0 && outside(ev)) handler(ev); };
  return {
    on() {
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('click', onClick, true);
    },
    off() {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('click', onClick, true);
    },
  };
}

export class RenaultCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('renault-card-editor');
  }

  static getStubConfig(hass) {
    var id = rnFindVehicle(hass);
    return id ? { device_id: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = Object.assign({
      show_title: true, show_subtitle: true,
      show_logo: true, show_image: true, show_plate: true, show_chips: true, show_location: true, show_actions: true, show_data_plan: true, low_range: 100,
      show_lease_margin: true, illustration: true, illustration_theme: 'auto',
    }, config);
    if (!this._uid) this._uid = rnUid();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener('change', (ev) => this._onChange(ev));
      this.shadowRoot.addEventListener('keydown', (ev) => {
        if ((ev.key !== 'Enter' && ev.key !== ' ') || !ev.target.dataset) return;
        if (ev.target.dataset.leaseToggle !== undefined) {
          ev.preventDefault();
          this._leaseOpen = !this._leaseIsOpen();
          this._update();
        } else if (ev.target.dataset.more && ev.target.getAttribute('role') === 'button') {
          ev.preventDefault();
          this._runAction(ev.target, 'tap');
        }
      });
      // hold_action: a press held for half a second, on a tile, chip or row (the click that follows is ignored).
      this.shadowRoot.addEventListener('pointerdown', (ev) => {
        var el = (ev.composedPath ? ev.composedPath() : []).find((n) => n.dataset?.more);
        clearTimeout(this._holdTimer);
        this._held = false;
        if (!el || !this._actionCfg(el, 'hold')) return;
        this._holdTimer = setTimeout(() => { this._held = true; this._runAction(el, 'hold'); }, 500);
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
        this.shadowRoot.addEventListener(type, () => clearTimeout(this._holdTimer));
      });
    }
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    // Keep "updated 5 min ago" and the days left current. The signature includes the clock-dependent
    // texts (_timeSig), so the tick only re-renders when one of them actually changes.
    this._timer = setInterval(() => this._update(), 60000);
    // A click elsewhere folds the lease back to its default (as in ha-carburants-france). A click,
    // not a pointerdown: folding on press would shift the layout under the pointer before the click.
    this._outside = this._outside || rnWatchOutside(
      (ev) => (ev.composedPath ? ev.composedPath() : []).indexOf(this) === -1 && !rnInDialog(ev),
      () => {
        if (this._leaseOpen == null) return;
        this._leaseOpen = null;
        this._update();
      },
    );
    this._outside.on();
    // A new width fits the banner's status pill again (the banner keeps its height: no resize loop).
    if (typeof ResizeObserver === 'function') {
      this._pillResize = this._pillResize || new ResizeObserver(() => {
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._pillResize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
  }

  // The status pill goes at the right end of the title's row only when the whole title and the pill's whole label fit on that row;
  // otherwise it takes a line of its own under the subtitle (.titles.below, the subtitle cut to one line). In the
  // banner (where that line may run over the picture), when the titles still run below the top of the ground strip or
  // out of the banner, and in the classic header when the label does not fit even alone, the pill keeps its dot alone,
  // beside the title (.titles.dotonly). Measured in fractional pixels.
  _fitPill() {
    for (const t of this.shadowRoot?.querySelectorAll?.(".titles") || []) {
      const row = t.querySelector?.(".trow");
      const chips = row ? [...row.querySelectorAll(":scope > .bchip")] : [];
      if (!chips.length || !row.getBoundingClientRect) continue;
      t.classList.remove("below", "dotonly");
      const name = row.querySelector(":scope > .name");
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const widths = chips.map((c) => c.getBoundingClientRect().width);
      let need = -gap;
      if (name && getComputedStyle(name).display !== "none") {
        name.style.flex = "none";
        need = name.getBoundingClientRect().width;
        name.style.flex = "";
      }
      for (const w of widths) need += gap + w;
      const room = row.getBoundingClientRect().width + 0.01;
      if (need <= room) continue;
      t.classList.add("below");
      const banner = t.closest(".banner");
      const cut = !banner && widths.some((w) => w > room);
      let out = false;
      if (banner) {
        const b = banner.getBoundingClientRect();
        const floor = b.bottom - (banner.querySelector(".g-road")?.getBoundingClientRect().height ?? 10) + 0.5;
        out = [...t.querySelectorAll(".name, .model, .bchip")].some((e) => {
          const r = e.getBoundingClientRect();
          return r.height && (r.bottom > floor || r.top < b.top - 0.5 || r.right > b.right + 0.5);
        });
      }
      if (cut || out) t.classList.replace("below", "dotonly");
    }
  }

  disconnectedCallback() {
    this._pillResize?.disconnect();
    clearInterval(this._timer);
    clearTimeout(this._armTimer);
    clearTimeout(this._resultTimer);
    clearTimeout(this._holdTimer);
    this._armed = null;
    this._result = null;
    this._outside?.off();
  }

  getCardSize() { return 6; }

  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  _lang() {
    return rnResolveLang(RnI18n, (this._config?.language) || (this._hass?.language) || document.documentElement.lang);
  }

  _intl() { return rnIntlLang(RnI18n, this._lang(), this._hass); }

  _t(k, vars) {
    var s = rnT(this._lang(), k);
    Object.keys(vars || {}).forEach((v) => { s = s.replace(`{${v}}`, vars[v]); });
    return s;
  }

  _resolve() {
    var hass = this._hass, c = this._config;
    var deviceId = c.device_id;
    if (!deviceId && c.entity && hass.entities?.[c.entity]) deviceId = hass.entities[c.entity].device_id;
    if (!deviceId) deviceId = rnFindVehicle(hass);
    var device = deviceId && hass.devices ? hass.devices[deviceId] : null;
    var regIds = rnRegistryEntities(hass, deviceId).map((e) => e.entity_id);
    var list = rnDeviceEntities(hass, deviceId);
    var over = c.entities || {};
    var ent = {};
    Object.keys(RN_ROLES).forEach((role) => {
      ent[role] = over[role] || rnFindRole(hass, list, RN_ROLES[role]);
    });
    var byKey = (keys, dc) => list.filter((e) => keys.indexOf(e.translation_key) >= 0 || (dc && hass.states[e.entity_id].attributes.device_class === dc && e.entity_id.indexOf(dc === 'pressure' ? 'sensor.' : 'binary_sensor.') === 0)).map((e) => e.entity_id);
    ent.tyres = byKey(RN_TYRES, 'pressure').map((id) => ({ id: id, pos: rnTyrePos(hass.entities?.[id], id) }))
      .sort((a, b) => (a.pos < 0 ? 9 : a.pos) - (b.pos < 0 ? 9 : b.pos)).map((t) => t.id);
    ent.doors = byKey(RN_DOORS, 'door');
    ent.buttons = list.filter((e) => e.entity_id.indexOf('button.') === 0).map((e) => e.entity_id);
    // buttons: extra entities of any brand or device (a switch, a script, a lock…), after the car's own.
    (Array.isArray(c.buttons) ? c.buttons : []).forEach((b) => {
      var id = typeof b === 'string' ? b : b?.entity;
      if (id && ent.buttons.indexOf(id) < 0 && hass.states[id]) ent.buttons.push(id);
    });
    // extra_tiles: any entity, of the car or not, shown as a tile after the card's own.
    ent.extra = rnExtraTiles(c).map((x) => x.entity).filter((id) => hass.states[id]);

    var plan = null;
    if (c.show_data_plan) {
      var planId = c.data_plan_device_id || rnFindDataPlan(hass, device);
      if (planId) {
        regIds = regIds.concat(rnRegistryEntities(hass, planId).map((e) => e.entity_id));
        var planList = rnDeviceEntities(hass, planId).filter((e) => e.entity_id.indexOf('sensor.') === 0);
        plan = { deviceId: planId };
        Object.keys(RN_PLAN_ROLES).forEach((role) => {
          var hit = planList.find((e) => e.translation_key === role) ||
            planList.find((e) => RN_PLAN_ROLES[role].test(e.entity_id));
          plan[role] = hit ? hit.entity_id : undefined;
        });
        if (!plan.left_data_percentage) {
          var pct = planList.find((e) => hass.states[e.entity_id].attributes.unit_of_measurement === '%');
          plan.left_data_percentage = pct?.entity_id;
        }
      }
    }
    return { deviceId: deviceId, device: device, brand: rnBrandKey(hass, deviceId, device), ent: ent, plan: plan, photo: rnPhotoEntity(hass, deviceId), stateless: rnStateless(hass, regIds) };
  }

  _st(id) { return id && this._hass.states[id]; }

  _val(id) { var s = this._st(id); return s ? s.state : undefined; }

  _avail(id) { var v = this._val(id); return v !== undefined && v !== 'unavailable' && v !== 'unknown' && v !== ''; }

  _num(id) {
    if (!this._avail(id)) return null;
    var n = Number(this._val(id));
    return Number.isNaN(n) ? null : n;
  }

  _fmtNum(n, digits) {
    return Number(n).toLocaleString(this._intl(), { maximumFractionDigits: digits == null ? 0 : digits });
  }

  _fmtState(id) {
    var s = this._st(id);
    if (!s) return '';
    if (this._hass.formatEntityState) return this._hass.formatEntityState(s);
    var u = s.attributes.unit_of_measurement;
    return s.state + (u ? ` ${u}` : '');
  }

  _withUnit(id, digits) {
    var s = this._st(id);
    var u = s.attributes.unit_of_measurement || '';
    var n = Number(s.state);
    if (Number.isNaN(n)) return this._fmtState(id);
    return this._fmtNum(n, digits) + (u ? (u === '%' ? ' %' : ` ${u}`) : '');
  }

  _relative(date) { return rnRelative(this._intl(), date); }

  // The rendered texts that depend on the clock rather than on an entity state: the location
  // "updated X ago", the data plan days left, and the lease figures (which move by the day).
  // Included in the signature so the minute timer re-renders only when one of them changes.
  _timeSig(r) {
    var out = [new Date().toDateString()];
    var ent = r.ent;
    if (this._config.show_location && this._st(ent.location)) {
      var lastId = this._avail(ent.location_last_activity) ? ent.location_last_activity : null;
      var last = lastId ? new Date(this._val(lastId)) : new Date(this._st(ent.location).last_updated || '');
      if (!Number.isNaN(last.getTime())) out.push(this._relative(last));
    }
    if (r.plan && this._avail(r.plan.expiry_date)) {
      var expiry = new Date(this._val(r.plan.expiry_date));
      if (!Number.isNaN(expiry.getTime())) out.push(Math.ceil((expiry.getTime() - Date.now()) / 86400000));
    }
    if (this._avail(ent.services_expiry)) {
      var end = new Date(this._val(ent.services_expiry));
      if (!Number.isNaN(end.getTime())) out.push(Math.ceil((end.getTime() - Date.now()) / 86400000));
    }
    return out;
  }

  _duration(minutes) {
    var h = Math.floor(minutes / 60), m = Math.round(minutes % 60);
    return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`;
  }

  // Orange reports the data plan in megabytes (labelled Mbit): show it in GB above 1 GB.
  _dataSize(id) {
    var s = this._st(id);
    var v = Number(s.state);
    var u = String(s.attributes.unit_of_measurement || '').toLowerCase();
    var mb = v;
    if (u === 'gb' || u === 'gbit' || u === 'go' || u === 'gib') mb = v * 1024;
    else if (u === 'kb' || u === 'kbit' || u === 'ko' || u === 'kib') mb = v / 1024;
    if (mb >= 1024) return `${this._fmtNum(mb / 1024, 1)} ${this._t('unit_gb')}`;
    return `${this._fmtNum(mb, 0)} ${this._t('unit_mb')}`;
  }

  _entityLabel(id, deviceName) {
    var s = this._st(id);
    var name = (s?.attributes.friendly_name) || id;
    if (deviceName && name.indexOf(deviceName) === 0) name = name.slice(deviceName.length).trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // The registries are replaced, not mutated, when they change: resolve again only then.
  _resolved() {
    var hass = this._hass;
    if (!this._res || this._resEnt !== hass.entities || this._resDev !== hass.devices || this._resCfg !== this._config || !rnResolvedReady(hass, this._res)) {
      this._res = this._resolve();
      this._resEnt = hass.entities;
      this._resDev = hass.devices;
      this._resCfg = this._config;
    }
    return this._res;
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolved();
    var hass = this._hass;
    var ids = [];
    Object.keys(r.ent).forEach((k) => { ids = ids.concat(r.ent[k]); });
    if (r.plan) Object.keys(RN_PLAN_ROLES).forEach((k) => { ids.push(r.plan[k]); });
    var head = [this._lang(), r.deviceId, this._illustrated() && rnIsNight(hass, this._config), this._armed, this._result, this._leaseOpen, this._leaseHist?.key, this._leaseHist?.at, rnPhotoKey(rnPhotoUrl(hass, r.photo)), String(this._timeSig(r))];
    // Home Assistant replaces a state object when it changes: the same objects and the same inputs need no signature
    // (a push for another entity of the instance costs no serialisation).
    var objs = ids.map((id) => (id ? hass.states[id] : undefined));
    var last = this._sigIn;
    if (this._sig && last && last.objs.length === objs.length && last.head.every((v, i) => v === head[i]) && last.objs.every((o, i) => o === objs[i])) return;
    var sig = JSON.stringify([head, ids.map((id, i) => {
      var s = objs[i];
      return s ? [id, s.state, s.attributes.options] : null;
    })]);
    if (sig === this._sig) return;
    var active = this.shadowRoot.activeElement;
    if (active && active.tagName === 'SELECT') return;
    this._sig = sig;
    this._sigIn = { head, objs };
    this._r = r;
    this._render(r);
  }

  // tiles: the list of tiles to show (an empty list for none); every tile when it is not set.
  _tileOn(key) {
    var t = this._config.tiles;
    return !Array.isArray(t) || t.indexOf(key) >= 0;
  }

  // lease_figs: the pieces of the lease section to show (an empty list for none); all of them when it is not set.
  _leaseFigOn(key) {
    var f = this._config.lease_figs;
    return !Array.isArray(f) || f.indexOf(key) >= 0;
  }

  // tile_options: per tile (the keys of tiles) name, icon, tap_action and hold_action.
  _tileOpt(key) {
    // An extra tile (extra-N): its own entry of extra_tiles.
    var m = /^extra-(\d+)$/.exec(key || '');
    if (m) return rnExtraTiles(this._config)[Number(m[1])] || {};
    var o = key && this._config.tile_options;
    return (o && typeof o === 'object' && o[key] && typeof o[key] === 'object') ? o[key] : {};
  }

  // The action of a tile, chip or row: the tile's own (tile_options), else the card's tap_action /
  // hold_action, else the more-info dialog on tap and nothing on hold.
  _actionCfg(el, kind) {
    var cfg = this._tileOpt(el.dataset.tile)[`${kind}_action`] || this._config[`${kind}_action`];
    if (!cfg || typeof cfg !== 'object') cfg = kind === 'tap' ? { action: 'more-info' } : null;
    return cfg && cfg.action !== 'none' ? cfg : null;
  }

  // more-info of the element's entity as before; any other action (navigate, url, toggle,
  // perform-action…) goes to Home Assistant's own handler, as for its built-in cards.
  _runAction(el, kind) {
    var cfg = this._actionCfg(el, kind);
    if (!cfg) return;
    var id = el.dataset.more;
    if (cfg.action === 'more-info' && !cfg.entity) {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
      return;
    }
    var config = { entity: id };
    config[`${kind}_action`] = cfg;
    this.dispatchEvent(new CustomEvent('hass-action', { detail: { config: config, action: kind }, bubbles: true, composed: true }));
  }

  _tile(id, icon, label, value, extra) {
    var o = this._tileOpt(extra?.key);
    if (o.name) label = String(o.name);
    if (o.icon) icon = String(o.icon);
    return '<div class="tile' + (extra?.warn ? ' warn' : '') + '"' + (id ? ` data-more="${rnEsc(id)}"${extra?.key ? ` data-tile="${rnEsc(extra.key)}"` : ''} role="button" tabindex="0"` : '') + '>' +
      '<div class="tile-head"><ha-icon icon="' + rnEsc(icon) + '"></ha-icon><span class="lbl">' + rnEsc(label) + '</span></div>' +
      '<span class="val">' + rnEsc(value) + '</span>' + (extra && extra.bar != null ? this._bar(extra.bar, this._levelColor(extra.bar, extra.key)) : '') + '</div>';
  }

  // extra_tiles: one tile per entity, after the card's own (tiles does not hide them). Its name, without the vehicle's
  // name, its icon and its state come from Home Assistant unless the entry sets them; a state in % gets a bar
  // (bar: false removes it).
  _extraTiles(deviceName) {
    var hass = this._hass;
    return rnExtraTiles(this._config).map((x, i) => {
      var st = hass.states[x.entity];
      if (!st) return '';
      var u = st.attributes.unit_of_measurement;
      var n = Number(st.state);
      var bar = u === '%' && x.bar !== false && st.state !== '' && !Number.isNaN(n) ? n : null;
      return this._tile(x.entity, rnEntityIcon(x.entity, st, hass.entities?.[x.entity]), this._entityLabel(x.entity, deviceName),
        this._fmtState(x.entity), { key: `extra-${i}`, bar: bar });
    }).filter(Boolean);
  }

  _bar(pct, color) {
    var p = Math.max(0, Math.min(100, pct));
    return `<div class="bar"><div class="fill" style="width:${p}%;background:${color}"></div></div>`;
  }

  // The bar colour of the battery and fuel tiles: battery_severity / fuel_severity when set, else
  // red under 10 %, orange under 25 %, the accent colour above.
  _levelColor(pct, key) {
    var sev = key === 'battery_level' ? this._config.battery_severity : key === 'fuel' ? this._config.fuel_severity : null;
    var color = rnSeverityColor(sev, pct);
    if (color) return color;
    if (pct < 10) return 'var(--error-color, #db4437)';
    if (pct < 25) return 'var(--warning-color, #ffa600)';
    return 'var(--rn-accent)';
  }

  // Logo (or car icon when there is neither logo nor picture), name and model, plate, then the
  // mini card's detail button (_headerAction). show_title / show_subtitle hide the name / the model;
  // a model that only repeats the name is not shown twice.
  _header(name, model, plate, imgSrc, sceneImg) {
    var c = this._config;
    if (this._illustrated()) return this._banner(name, model, sceneImg);
    var st = this._r ? this._status(this._r.ent) : null;
    var pill = st?.pill ? this._pill(st) : '';
    var title = c.show_title !== false || pill ? `<div class="trow">${c.show_title !== false ? `<div class="name">${rnEsc(name)}</div>` : ''}${pill}</div>` : '';
    var same = model && name && String(model).trim().toLowerCase() === String(name).trim().toLowerCase();
    var subtitle = c.show_subtitle !== false && model && !(same && c.show_title !== false) ? `<div class="model" title="${rnEsc(model)}">${rnEsc(model)}</div>` : '';
    return '<div class="header">' +
      ((c.show_logo && rnBrandHtml(this._r?.brand, () => { this._sig = null; this._update(); })) ||
        (imgSrc && !c.show_logo ? '' : '<div class="badge"><ha-icon icon="mdi:car"></ha-icon></div>')) +
      `<div class="titles">${title}${subtitle}</div>` +  // kept empty: it pushes the plate to the right
      (plate ? rnPlateSvg(plate, c.plate_department) : '') + this._headerAction() +
      '</div>';
  }

  // The status pill: a dot and the car's status, in the colour of the header icon.
  _pill(st) {
    var more = st.entity ? ` data-more="${rnEsc(st.entity)}" role="button" tabindex="0"` : '';
    return `<span class="bchip st-${st.level}" title="${rnEsc(st.pill)}" aria-label="${rnEsc(st.pill)}"${more}><span class="dot"></span><span class="bchip-text">${rnEsc(st.pill)}</span></span>`;
  }

  // Overridden by the mini card: its detail button.
  _headerAction() { return ''; }

  _illustrated() { return this._config?.illustration !== false; }

  // The car's status for the illustrated header: the icon's colour (level) and the subtitle (text).
  // Offline is an error; unlocked, a door open, a low range or a low tyre need a look; charging is
  // green, the air conditioning on the accent colour; else the car rests (grey).
  _status(ent) {
    var parts = [], level = 'idle', pill = null;
    var lowTyres = this._lowTyres(ent.tyres.filter((id) => this._avail(id)));
    var lockId = this._avail(ent.lock_status) ? ent.lock_status : this._avail(ent.lock) && /^(locked|unlocked)$/.test(this._val(ent.lock)) ? ent.lock : null;
    var unlocked = lockId && (lockId === ent.lock_status ? this._val(lockId) === 'on' : this._val(lockId) === 'unlocked');
    var doors = ent.doors.some((id) => this._val(id) === 'on');
    var charging = this._val(ent.charging) === 'on';
    var offline = this._val(ent.cellular) === 'off' && this._val(ent.wifi) !== 'on';
    var lowRange = this._lowRange(ent);
    var hvac = this._val(ent.hvac_status) === 'on';
    var plug = this._avail(ent.plugged_in) ? (this._val(ent.plugged_in) === 'on' ? 'plugged' : 'unplugged') : null;
    // The status pill: what sets the icon's colour first (offline, then what needs a look, then charging, the air
    // conditioning), else the lock or the plug, else parked.
    pill = offline ? 'offline' : doors ? 'doors_open' : unlocked ? 'unlocked' : lowRange ? 'low_range' : lowTyres.length ? 'low_tyre_pressure'
      : charging ? 'charging' : hvac ? 'hvac_on' : lockId ? 'locked' : plug || 'parked';
    // The subtitle: the rest, without the pill's word.
    if (charging) {
      var left = this._chargeMinutes(ent.charging_remaining_time);
      var text = left ? this._t('charging_left', { t: this._duration(left) }) : this._t('charging');
      // "Charging · 45 min left" with the pill saying "Charging": "45 min left".
      if (pill !== 'charging') parts.push(text);
      else if (left) parts.push(text.split(' · ').slice(1).join(' · ') || text);
    } else {
      if (doors && pill !== 'doors_open') parts.push(this._t('doors_open'));
      else if (!doors && lockId && pill !== 'locked' && pill !== 'unlocked') parts.push(this._t(unlocked ? 'unlocked' : 'locked'));
      else if (!doors && !lockId && plug && pill !== plug) parts.push(this._t(plug));
      var total = this._totalRange(ent);
      if (total != null) {
        var rid = this._num(ent.fuel_autonomy) != null ? ent.fuel_autonomy : ent.battery_autonomy;
        var unit = this._st(rid)?.attributes.unit_of_measurement || 'km';
        if (!this._bodyShows(ent).range) parts.push(`${this._fmtNum(total)} ${unit}`);
      }
    }
    if (offline) level = 'err';
    else if (unlocked || doors || lowRange || lowTyres.length) level = 'warn';
    else if (charging) level = 'ok';
    else if (hvac) level = 'active';
    var charger = null;
    if (charging) charger = 'charging';
    else if (plug) charger = plug;
    else if (this._avail(ent.charging)) charger = 'unplugged';
    // On the full card, the subtitle leaves out what a body tile or chip already says.
    var shown = this._bodyShows(ent);
    parts = parts.filter((part) => !shown.chips.some((t) => t === part || t.indexOf(part) >= 0));
    // The entity behind the pill: a tap on it opens it, as the body's chip saying the same (hidden then) did.
    var pillEntity = { locked: lockId, unlocked: lockId, offline: ent.cellular, low_tyre_pressure: lowTyres[0], charging: ent.charging,
      plugged: ent.plugged_in, unplugged: ent.plugged_in }[pill] || null;
    return { level: level, pill: pill ? this._t(pill) : '', entity: pillEntity, text: parts.join(' · '), charger: charger };
  }

  // The illustrated header: the round status icon (with the brand's logo in a badge) and the name and
  // status on the sky, the roadside scene with the car's own picture on the right, the road strip below.
  // The plate stays in the body, with the picture.
  _banner(name, model, img) {
    var c = this._config, st = this._r ? this._status(this._r.ent) : { level: 'idle', pill: '', text: '', charger: null };
    // The status pill right after the title (on its own line under the subtitle when it does not fit there).
    var pill = st.pill ? this._pill(st) : '';
    var title = c.show_title !== false || pill ? `<div class="trow">${c.show_title !== false ? `<div class="name">${rnEsc(name)}</div>` : ''}${pill}</div>` : '';
    var same = !st.text && model && name && String(model).trim().toLowerCase() === String(name).trim().toLowerCase();
    var sub = st.text || (same && c.show_title !== false ? '' : model);
    var subtitle = c.show_subtitle !== false && sub ? `<div class="model" title="${rnEsc(sub === model || !model ? sub : `${sub} · ${model}`)}">${rnEsc(sub)}</div>` : '';
    var brand = c.show_logo ? rnBrandHtml(this._r?.brand, () => { this._sig = null; this._update(); }) : null;
    return `<div class="banner${rnIsNight(this._hass, c) ? ' night' : ''}">` +
      '<div class="g-road"></div>' + rnSceneSvg({ uid: this._uid, img: img, charger: st.charger }) +
      `<div class="htext"><div class="vc-icon st-${st.level}" title="${rnEsc(model || name)}"><ha-icon icon="mdi:car"></ha-icon>` +
      (brand ? `<span class="bbadge">${brand}</span>` : '') + `</div><div class="titles">${title}${subtitle}</div></div>` +
      this._headerAction() + '</div>';
  }

  // Device name (name_by_user, else the plate the integration names it after), shown name, model and
  // picture (custom image, else the MyRenault photo), shared by the full and mini cards.
  _identity(r) {
    var c = this._config, dev = r.device;
    var deviceName = dev ? String(dev.name_by_user || dev.name || '').trim() : '';
    return {
      deviceName: deviceName,
      name: c.name || deviceName || this._t('vehicle'),
      model: rnModelLabel(this._hass, r.deviceId, dev),
      imgSrc: c.show_image ? (c.image || rnPhotoUrl(this._hass, r.photo) || (r.brand === 'volvo' ? rnVolvoPicture(this._hass, dev, () => { this._sig = null; this._update(); }) : null)) : null,
    };
  }

  _batteryTile(ent) {
    return this._tile(ent.battery_level, 'mdi:battery-high', this._t('battery_level'), this._withUnit(ent.battery_level), { key: 'battery_level', bar: this._num(ent.battery_level) });
  }

  // The car's whole range: fuel plus battery for a plug-in hybrid, the battery range of an electric
  // car, the fuel range of a petrol one; null without either.
  _totalRange(ent) {
    var fuel = this._num(ent.fuel_autonomy), battery = this._num(ent.battery_autonomy);
    if (fuel == null) return battery;
    return fuel + (battery || 0);
  }

  // Under low_range: the whole range, not the battery range alone (a plug-in hybrid with an empty
  // battery still has its fuel). low_range is in km: converted when the range sensor reads miles.
  _lowRange(ent) {
    var low = Number(this._config.low_range) || 0, total = this._totalRange(ent);
    if (!low || total == null) return false;
    var id = this._num(ent.fuel_autonomy) != null ? ent.fuel_autonomy : ent.battery_autonomy;
    var unit = String(this._st(id)?.attributes.unit_of_measurement || '').toLowerCase();
    if (unit === 'mi') low /= RN_KM_PER_MILE;
    return total < low;
  }

  // Battery or fuel range (role). The warning colour goes on warnRole when given (the mini card's
  // only range tile), else on the fuel range when there is one, else on the battery range.
  _rangeTile(ent, role, warnRole) {
    var main = warnRole || (this._num(ent.fuel_autonomy) != null ? 'fuel_autonomy' : 'battery_autonomy');
    return this._tile(ent[role], 'mdi:map-marker-distance', this._t(role), this._withUnit(ent[role]), { key: role, warn: role === main && this._lowRange(ent) });
  }

  // Remaining charging time in minutes, from the sensor's unit (s, min, h or d); null when unknown.
  _chargeMinutes(id) {
    var v = this._num(id);
    if (v == null) return null;
    var u = String(this._st(id).attributes.unit_of_measurement || 'min').toLowerCase();
    return v * (RN_MINUTES[u] || 1);
  }

  // Tyre pressures under low_tyre_pressure (bar), in the sensors' own unit.
  _lowTyres(tyres) {
    var low = Number(this._config.low_tyre_pressure) || 0;
    if (!low) return [];
    return tyres.filter((id) => rnBar(Number(this._val(id)), this._st(id).attributes.unit_of_measurement) < low);
  }

  // One tile for the four tyres, each labelled with its position (FL, FR, RL, RR) when known; the
  // tile and the low tyres in the warning colour.
  _tyreTile(tyres, lowTyres) {
    var reg = this._hass.entities || {};
    var vals = tyres.map((id) => {
      var pos = rnTyrePos(reg[id], id);
      return '<span class="tyre' + (lowTyres.indexOf(id) >= 0 ? ' low' : '') + '">' + (pos >= 0 ? `<span class="tpos">${rnEsc(this._t(`tyre_${pos}`))}</span> ` : '') +
        rnEsc(this._fmtNum(Number(this._val(id)), 1)) + '</span>';
    });
    var unit = this._st(tyres[0]).attributes.unit_of_measurement || '';
    var target = lowTyres[0] || tyres[0];
    var o = this._tileOpt('tyres');
    return '<div class="tile' + (lowTyres.length ? ' warn' : '') + `" data-more="${rnEsc(target)}" data-tile="tyres" role="button" tabindex="0">` +
      `<div class="tile-head"><ha-icon icon="${rnEsc(o.icon ? String(o.icon) : 'mdi:car-tire-alert')}"></ha-icon><span class="lbl">${rnEsc(o.name ? String(o.name) : this._t('tyres'))}${unit ? ` (${rnEsc(unit)})` : ''}</span></div>` +
      `<span class="val tyres">${vals.join('')}</span></div>`;
  }

  // "Charging · 45 min left", else "Plugged in" / "Unplugged"; null without either sensor.
  // The status chips; a chip that says word for word what the header pill says is hidden (.pill-echo), and comes back
  // on a card so narrow that the pill keeps only its dot.
  _chipsHtml(chips, ent) {
    if (this._config.show_chips === false || !chips.length) return '';
    var pill = this._status(ent).pill;
    var shown = 0;
    var html = chips.map((chip) => {
      var m = /<\/ha-icon>([^<]*)<\/span>$/.exec(chip);
      if (pill && m && (m[1] === pill || m[1] === rnEsc(pill))) return chip.replace(/^<span class="chip/, '<span class="chip pill-echo');
      shown++;
      return chip;
    }).join('');
    return `<div class="chips${shown ? '' : ' pill-echo'}">${html}</div>`;
  }

  // The full card's status chips (the mini card keeps only the charge one).
  _bodyChips(ent) {
    var chips = [];
    if (this._lowRange(ent)) {
      chips.push(`<span class="chip warn"><ha-icon icon="mdi:gas-station-off-outline"></ha-icon>${this._t('low_range')}</span>`);
    }
    var lowTyres = this._lowTyres(ent.tyres.filter((id) => this._avail(id)));
    if (lowTyres.length) {
      chips.push(`<span class="chip warn" data-more="${rnEsc(lowTyres[0])}" role="button" tabindex="0"><ha-icon icon="mdi:car-tire-alert"></ha-icon>${this._t('low_tyre_pressure')}</span>`);
    }
    // The lock: Renault's binary sensor (on = unlocked), else the lock entity of the other integrations
    var lockId = this._avail(ent.lock_status) ? ent.lock_status : this._avail(ent.lock) && /^(locked|unlocked)$/.test(this._val(ent.lock)) ? ent.lock : null;
    if (lockId) {
      var unlocked = lockId === ent.lock_status ? this._val(lockId) === 'on' : this._val(lockId) === 'unlocked';
      chips.push(`<span class="chip${unlocked ? ' warn' : ''}" data-more="${rnEsc(lockId)}" role="button" tabindex="0"><ha-icon icon="${unlocked ? 'mdi:lock-open-variant-outline' : 'mdi:lock-outline'}"></ha-icon>${this._t(unlocked ? 'unlocked' : 'locked')}</span>`);
    }
    if (ent.doors.some((id) => this._val(id) === 'on')) {
      chips.push(`<span class="chip warn"><ha-icon icon="mdi:car-door"></ha-icon>${this._t('doors_open')}</span>`);
    }
    var charge = this._chargeChip(ent);
    if (charge) chips.push(charge);
    if (this._val(ent.hvac_status) === 'on') {
      chips.push(`<span class="chip ok"><ha-icon icon="mdi:air-conditioner"></ha-icon>${this._t('hvac_on')}</span>`);
    }
    // Neither mobile network nor Wi-Fi: the car does not answer, its values may be old.
    if (this._val(ent.cellular) === 'off' && this._val(ent.wifi) !== 'on') {
      chips.push(`<span class="chip warn" data-more="${rnEsc(ent.cellular)}" role="button" tabindex="0"><ha-icon icon="mdi:access-point-network-off"></ha-icon>${this._t('offline')}</span>`);
    }
    return chips;
  }

  // The full card's header subtitle leaves out what the body shows (a range tile, a chip): there it gives the rest, else
  // the model. The compact mini card keeps the whole subtitle.
  _bodyShows(ent) {
    if (this._zoomed === false) return { range: false, chips: [] };
    var range = ['battery_autonomy', 'fuel_autonomy'].some((role) => this._tileOn(role) && this._avail(ent[role]));
    var chips = this._config.show_chips === false ? [] : this._bodyChips(ent).map((chip) => (/<\/ha-icon>([^<]*)<\/span>$/.exec(chip) || [])[1] || '');
    return { range: range, chips: chips.filter(Boolean) };
  }

  _chargeChip(ent) {
    if (this._val(ent.charging) === 'on') {
      var left = this._chargeMinutes(ent.charging_remaining_time);
      return '<span class="chip ok" data-more="' + rnEsc(ent.charging) + '" role="button" tabindex="0"><ha-icon icon="mdi:battery-charging"></ha-icon>' +
        (left ? this._t('charging_left', { t: this._duration(left) }) : this._t('charging')) + '</span>';
    }
    if (!this._avail(ent.plugged_in)) return null;
    var plugged = this._val(ent.plugged_in) === 'on';
    return `<span class="chip" data-more="${rnEsc(ent.plugged_in)}" role="button" tabindex="0"><ha-icon icon="${plugged ? 'mdi:power-plug' : 'mdi:power-plug-off-outline'}"></ha-icon>${this._t(plugged ? 'plugged' : 'unplugged')}</span>`;
  }

  _render(r) {
    var c = this._config, ent = r.ent, dev = r.device;
    if (!r.deviceId) {
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:car-off"></ha-icon>${this._t('no_vehicle')}</div></ha-card>`);
      return;
    }
    var id = this._identity(r);
    var deviceName = id.deviceName, name = id.name, model = id.model, imgSrc = id.imgSrc;
    // plate: typed by hand when the integration does not give it in the device name.
    var plate = !c.show_plate ? null : c.plate ? rnPlateOption(c.plate) : dev ? rnPlate(dev.name) : null;

    // Illustrated header: the plate goes to the body, at the top right of the picture (or on its own line).
    var bodyPlate = this._illustrated() && plate ? rnPlateSvg(plate, c.plate_department) : '';
    var header = this._header(name, model, bodyPlate ? null : plate, imgSrc, imgSrc);
    var imgH = Number(c.image_height) || 0;
    var image = imgSrc ? `<div class="image${bodyPlate ? ' with-plate' : ''}">${bodyPlate}<img src="${rnEsc(imgSrc)}" alt="${rnEsc(name)}"${imgH > 0 ? ` style="max-height:${imgH}px"` : ''}></div>`
      : bodyPlate ? `<div class="plate-row">${bodyPlate}</div>` : '';

    // Status chips
    var chips = this._bodyChips(ent);
    var tyres = ent.tyres.filter((id) => this._avail(id));
    var lowTyres = this._lowTyres(tyres);

    // Stat tiles
    var tiles = [];
    if (this._tileOn('battery_level') && this._avail(ent.battery_level)) tiles.push(this._batteryTile(ent));
    if (this._tileOn('battery_autonomy') && this._avail(ent.battery_autonomy)) tiles.push(this._rangeTile(ent, 'battery_autonomy'));
    if (this._tileOn('fuel_autonomy') && this._avail(ent.fuel_autonomy)) tiles.push(this._rangeTile(ent, 'fuel_autonomy'));
    var tank = Number(c.fuel_tank_capacity) || 0;
    var fuel = this._num(ent.fuel_quantity);
    var fuelOn = this._tileOn('fuel');
    if (fuelOn && fuel != null) {
      tiles.push(this._tile(ent.fuel_quantity, 'mdi:gas-station', this._t('fuel_quantity'), this._withUnit(ent.fuel_quantity),
        tank ? { key: 'fuel', bar: fuel / tank * 100 } : { key: 'fuel' }));
    }
    // The fuel level in % of the tank, when there is no volume
    var level = fuel == null ? this._num(ent.fuel_level) : null;
    if (fuelOn && level != null) {
      tiles.push(this._tile(ent.fuel_level, 'mdi:gas-station', this._t('fuel_level'), this._withUnit(ent.fuel_level), { key: 'fuel', bar: Math.max(0, Math.min(100, level)) }));
    }
    if (this._tileOn('mileage') && this._avail(ent.mileage)) {
      tiles.push(this._tile(ent.mileage, 'mdi:counter', this._t('mileage'), this._withUnit(ent.mileage), { key: 'mileage' }));
    }
    if (this._tileOn('outside_temperature') && this._avail(ent.outside_temperature)) {
      tiles.push(this._tile(ent.outside_temperature, 'mdi:thermometer', this._t('outside_temperature'), this._fmtState(ent.outside_temperature), { key: 'outside_temperature' }));
    }
    if (this._tileOn('tyres') && tyres.length) tiles.push(this._tyreTile(tyres, lowTyres));
    tiles = tiles.concat(this._extraTiles(deviceName));

    // Location
    var locationHtml = '';
    if (c.show_location && this._st(ent.location)) {
      var when = '';
      var lastId = this._avail(ent.location_last_activity) ? ent.location_last_activity : null;
      var last = lastId ? new Date(this._val(lastId)) : new Date(this._st(ent.location).last_updated || '');
      if (!Number.isNaN(last.getTime())) when = this._t('updated', { t: this._relative(last) });
      var home = this._val(ent.location) === 'home';
      locationHtml = '<div class="row" data-more="' + rnEsc(ent.location) + '" role="button" tabindex="0">' +
        '<ha-icon icon="' + (home ? 'mdi:home-map-marker' : 'mdi:map-marker') + '"></ha-icon>' +
        '<div class="row-text"><span class="lbl">' + this._t('location') + '</span><span class="val">' + rnEsc(this._fmtState(ent.location)) + '</span></div>' +
        '<span class="when">' + rnEsc(when) + '</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon></div>';
    }

    // Actions
    var actionsHtml = '';
    if (c.show_actions) {
      var btns = ent.buttons.filter((id) => this._val(id) !== 'unavailable').map((id) => {
        var st = this._st(id);
        var reg = this._hass.entities[id] || {};
        var key = `${reg.translation_key || ''} ${id}`;
        var icon = st.attributes.icon || reg.icon;
        if (!icon) {
          var hit = RN_BUTTON_ICONS.find((p) => p[0].test(key));
          icon = hit ? hit[1] : 'mdi:gesture-tap-button';
        }
        var armed = this._armed === id;
        var res = this._resultFor(id);
        var text = armed ? this._t('confirm') : res ? res.text : this._entityLabel(id, deviceName);
        var on = rnIsOn(id, st);
        var title = res ? res.text : on == null ? '' : `${this._entityLabel(id, deviceName)} · ${this._t(on ? 'on_state' : 'off_state')}`;
        return '<button class="btn' + (armed ? ' armed' : res ? ` ${res.cls}` : on ? ' on' : '') + '" data-press="' + rnEsc(id) + '"' +
          (on == null ? '' : ` aria-pressed="${on}"`) +
          (title ? ` title="${rnEsc(title)}" aria-label="${rnEsc(title)}"` : '') +
          '><ha-icon icon="' + rnEsc(res && !armed ? res.icon : icon) + '"></ha-icon><span>' + rnEsc(text) + '</span></button>';
      });
      var modeHtml = '';
      if (this._avail(ent.charge_mode)) {
        var s = this._st(ent.charge_mode);
        var opts = (s.attributes.options || []).map((o) =>
          '<option value="' + rnEsc(o) + '"' + (o === s.state ? ' selected' : '') + '>' +
          rnEsc(this._hass.formatEntityState ? this._hass.formatEntityState(s, o) : o) + '</option>').join('');
        var res = this._resultFor(ent.charge_mode);
        var resAttr = res ? ` class="${res.cls}" title="${rnEsc(res.text)}" aria-description="${rnEsc(res.text)}"${res.cls === 'err' ? ' aria-invalid="true"' : ''}` : '';
        modeHtml = `<label class="field"><span>${this._t('charge_mode')}</span><select data-select="${rnEsc(ent.charge_mode)}"${resAttr}>${opts}</select></label>`;
      }
      if (btns.length || modeHtml) actionsHtml = modeHtml + (btns.length ? `<div class="actions">${btns.join('')}</div>` : '');
    }

    // Orange Internet On the move
    var planHtml = '';
    var p = r.plan;
    if (p && (this._avail(p.left_data) || this._avail(p.left_data_percentage))) {
      var pct = this._num(p.left_data_percentage);
      if (pct == null && this._num(p.left_data) != null && this._num(p.initial_data) > 0) pct = this._num(p.left_data) / this._num(p.initial_data) * 100;
      var leftTxt = this._avail(p.left_data) && this._avail(p.initial_data)
        ? this._t('data_left', { l: this._dataSize(p.left_data), t: this._dataSize(p.initial_data) })
        : (this._avail(p.left_data) ? this._dataSize(p.left_data) : '');
      var expiry = this._avail(p.expiry_date) ? new Date(this._val(p.expiry_date)) : null;
      var expiryTxt = '', daysTxt = '';
      if (expiry && !Number.isNaN(expiry.getTime())) {
        var d = expiry.toLocaleDateString(this._intl(), { day: 'numeric', month: 'long' });
        var recurring = String(this._val(p.plan_type) || '').toLowerCase() === 'recurring';
        expiryTxt = this._t(recurring ? 'renews_on' : 'expires_on', { d: d });
        var days = Math.ceil((expiry.getTime() - Date.now()) / 86400000);
        daysTxt = days < 0 ? this._t('expired') : this._t('days_left', { n: days });
      }
      planHtml = '<div class="plan" data-more="' + rnEsc(p.left_data_percentage || p.left_data) + '" role="button" tabindex="0">' +
        '<div class="plan-head"><a class="logo-link" href="' + RN_ORANGE_URL + '" target="_blank" rel="noopener noreferrer" title="Orange Internet On the move">' +
        '<img class="logo" src="' + RN_ORANGE_LOGO + '" alt="Orange"></a><span class="plan-title">' + this._t('data_plan') + '</span>' +
        (pct != null ? `<span class="pct">${Math.round(pct)} %</span>` : '') + '</div>' +
        (pct != null ? this._bar(pct, pct < 10 ? 'var(--error-color, #db4437)' : '#ff7900') : '') +
        '<div class="plan-info"><span>' + rnEsc(leftTxt) + '</span><span>' + rnEsc(expiryTxt) + (daysTxt ? ` · ${rnEsc(daysTxt)}` : '') + '</span></div></div>';
    }

    this._setHtml(this._styles() + '<ha-card>' + header + image +
      this._chipsHtml(chips, ent) +
      (tiles.length ? `<div class="tiles">${tiles.join('')}</div>` : '') +
      this._leaseHtml(ent) + locationHtml + planHtml + this._servicesHtml(ent) + actionsHtml + '</ha-card>');
  }

  // The car's connected services subscription (VW group integrations): its end date and days left,
  // in the warning colour when inactive, expired or ending within 30 days.
  _servicesHtml(ent) {
    if (!this._config.show_data_plan || !this._avail(ent.services_expiry)) return '';
    var end = new Date(this._val(ent.services_expiry));
    if (Number.isNaN(end.getTime())) return '';
    var days = Math.ceil((end.getTime() - Date.now()) / 86400000);
    var inactive = this._val(ent.services_active) === 'off';
    var warn = inactive || days < 30;
    var when = inactive ? this._t('services_inactive') : days < 0 ? this._t('expired') : this._t('days_left', { n: days });
    return `<div class="row${warn ? ' warn' : ''}" data-more="${rnEsc(ent.services_expiry)}" role="button" tabindex="0">` +
      '<ha-icon icon="mdi:access-point-network"></ha-icon>' +
      `<div class="row-text"><span class="lbl">${this._t('services')}</span><span class="val">${rnEsc(this._t('expires_on', { d: end.toLocaleDateString(this._intl(), { day: 'numeric', month: 'long', year: 'numeric' }) }))}</span></div>` +
      `<span class="when">${rnEsc(when)}</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon></div>`;
  }

  // Patches the card content in place (rnMorph) and, when the focused element was not kept (its place in the markup
  // changed), gives the focus back to the same action button, tile or lease header: a keyboard user arming
  // "Sound horn" with Enter keeps the focus to confirm it.
  _setHtml(html) {
    var root = this.shadowRoot;
    var keyOf = (el) => {
      var ds = el?.dataset;
      if (!ds) return null;
      if (ds.press) return `p:${ds.press}`;
      if (ds.more) return `m:${ds.more}`;
      if (ds.leaseToggle !== undefined && String(el.className).indexOf('lease-head') >= 0) return 'l';
      return null;
    };
    var focusables = () => Array.prototype.slice.call(root.querySelectorAll('[data-press], [data-more], .lease-head'));
    var key = keyOf(root.activeElement);
    // The same entity can have several elements (tile and row): keep the rank among them.
    var rank = key ? focusables().filter((el) => keyOf(el) === key).indexOf(root.activeElement) : -1;
    var active = root.activeElement;
    rnMorph(root, html);
    this._fitPill();
    // A new <ha-card> (first render) lays its content out only once it has rendered (a microtask later, Lit):
    // measured then again, otherwise the pill keeps a place measured at 0 px.
    var hc = root.querySelector?.('ha-card');
    if (hc?.updateComplete && !hc._rnFitWait) {
      hc._rnFitWait = true;
      hc.updateComplete.then(() => this._fitPill());
    }
    if (!key || (active && root.activeElement === active)) return;
    var hit = focusables().filter((el) => keyOf(el) === key);
    var el = hit[Math.max(0, Math.min(rank, hit.length - 1))];
    if (el) el.focus({ preventScroll: true });
  }

  _km(n) { return `${this._fmtNum(Math.round(n))} km`; }

  _money(v) {
    var cur = (this._hass.config?.currency) || 'EUR';
    try { return rnMoneyFormat(this._intl(), cur).format(v); }
    catch (_e) { return `${this._fmtNum(v)} ${cur}`; }
  }

  _leaseHist4(entityId, start) {
    var h = this._leaseHist;
    return h && h.key === `${entityId}|${start.getTime()}` ? h.points : null;
  }

  _leaseHtml(ent) {
    var lease = this._config.lease;
    var dates = rnLeaseDates(lease);
    if (!dates || !this._avail(ent.mileage)) return '';
    var st = rnLeaseStatus(lease, this._num(ent.mileage), Date.now(), this._leaseHist4(ent.mileage, dates.start));
    if (!st) return '';
    // The statistics feed the chart, the recent pace and the contract year: fetched once an hour,
    // once the lease has started (no statistics before).
    this._leaseFetch(dates.start, ent.mileage);
    var color = st.state === 'over' ? RN_ERR : st.state === 'warn' ? RN_WARN : RN_OK;
    var icon = st.state === 'ok' ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline';
    var status;
    if (st.state === 'over') status = this._t('lease_over', { k: this._km(st.driven - st.allowed) });
    else if (st.state === 'warn') status = this._t('lease_warn', { k: this._km(st.projected - st.allowed) });
    else if (st.projected != null) status = this._t('lease_ok_margin', { k: this._km(st.allowed - st.projected) });
    else status = this._t('lease_ok');
    // The cost follows the kilometres in the status: driven so far when over, projected when warned.
    var statusCost = st.state === 'over' ? st.costNow : st.cost;
    if (statusCost != null) status += ` · ≈ ${this._money(statusCost)}`;
    // show_lease_margin: false hides the fluctuating OK margin (and its cost); the over / warn alerts stay,
    // and the lease section still opens from the chevron to show the chart.
    if (this._config.show_lease_margin === false && st.state === 'ok') status = '';
    var endTxt = st.end.toLocaleDateString(this._intl(), { month: 'short', year: 'numeric' });

    // Folded: theoretical mileage today, this month, and the monthly budget until the end.
    var figs = [];
    if (!st.ended) {
      if (this._leaseFigOn('target')) {
        var dev = Math.round(st.deviation);
        figs.push(this._leaseFig(this._t('lease_expected_lbl'), this._km(st.expectedOdo),
          (dev > 0 ? '+' : '−') + this._km(Math.abs(dev)), false,
          rnInk(dev > 0 ? RN_WARN : RN_OK)));
      }
      if (st.month && this._leaseFigOn('month')) {
        var over = st.month.left < 0;
        figs.push(this._leaseFig(this._t('lease_month_lbl'), this._km(Math.abs(st.month.left)),
          this._t(over ? 'lease_month_over' : 'lease_month_left', { t: this._km(st.month.allowed) }), over));
      }
      if (st.budget != null && this._leaseFigOn('budget')) {
        figs.push(this._leaseFig(this._t('lease_budget_lbl'), st.budget > 0 ? this._km(st.budget) : '0 km', this._t('lease_budget_sub'), st.budget <= 0));
      }
    }
    var open = this._leaseIsOpen();
    var pct = st.allowed ? st.driven / st.allowed * 100 : 0;
    var marker = Math.max(0, Math.min(100, st.elapsedRatio * 100));
    // Contract year ticks on the bar.
    var ticks = '';
    for (var m = 12; m < st.months; m += 12) ticks += `<span class="lease-tick" style="left:${(m / st.months * 100).toFixed(1)}%"></span>`;
    return '<div class="lease lease-' + st.state + '" data-lease-toggle>' +
      '<div class="lease-head" data-lease-toggle role="button" tabindex="0" aria-expanded="' + open + '">' +
      '<ha-icon class="lease-icon" icon="mdi:file-sign"></ha-icon><span class="plan-title">' + this._t('lease') + '</span>' +
      '<span class="lease-status" style="color:' + rnInk(color) + '"><ha-icon icon="' + icon + '"></ha-icon>' + rnEsc(status) + '</span>' +
      '<ha-icon class="chev lease-chev' + (open ? '' : ' closed') + '" icon="mdi:chevron-down"></ha-icon></div>' +
      '<div class="lease-bar">' + this._bar(pct, color) + ticks + '<span class="lease-mark" style="left:' + marker.toFixed(1) + '%"></span></div>' +
      '<div class="plan-info"><span><b>' + rnEsc(this._km(st.driven)) + '</b> / ' + rnEsc(this._km(st.allowed)) + '</span>' +
      '<span>' + rnEsc(`${this._t('lease_ends', { d: endTxt })} · ${this._leaseLeft(st)}`) + '</span></div>' +
      (figs.length ? `<div class="figs">${figs.join('')}</div>` : '') +
      (open ? `<div class="lease-more">${this._leaseDetails(st)}${this._leaseFigOn('chart') ? this._leaseChart(st, ent.mileage) : ''}</div>` : '') + '</div>';
  }

  // "Ended", "1 month", "5 months"… and the days under a month (rounding would say "0 months" or
  // "1 month" with two weeks left).
  _leaseLeft(st) {
    if (st.ended) return this._t('lease_ended');
    if (st.daysLeft < 30) return this._t('days_left', { n: st.daysLeft });
    return rnPlural(this._lang(), this._intl(), 'lease_months_left', st.monthsLeft);
  }

  // Folded until tapped, unless expand_lease is set (same as ha-carburants-france's sections).
  _leaseIsOpen() {
    return this._leaseOpen != null ? this._leaseOpen : this._config.expand_lease === true;
  }

  _leaseFig(label, value, sub, warn, subColor) {
    return '<div class="fig' + (warn ? ' warn' : '') + '"><span class="lbl">' + rnEsc(label) + '</span><span class="val">' + rnEsc(value) + '</span>' +
      (sub ? `<span class="sub"${subColor ? ` style="color:${subColor}"` : ''}>${rnEsc(sub)}</span>` : '') + '</div>';
  }

  _leaseDetails(st) {
    var figs = [];
    if (st.pace != null && !st.ended && this._leaseFigOn('pace')) {
      figs.push(this._leaseFig(this._t('lease_pace_lbl'), this._km(st.pace) + this._t('lease_per_year'),
        st.recent ? this._t('lease_recent', { n: Number(this._config.lease.forecast) }) : this._t('lease_since_start')));
    }
    if (this._leaseFigOn('projection')) {
      if (st.projected != null && !st.ended) {
        figs.push(this._leaseFig(this._t('lease_projection_lbl'), this._km(st.projected),
          st.cost != null ? `≈ ${this._money(st.cost)}` : null, st.projected > st.allowed));
      } else if (st.projected == null) {
        figs.push(this._leaseFig(this._t('lease_projection_lbl'), '—', this._t('lease_early')));
      }
    }
    if (st.year && !st.ended && this._leaseFigOn('year')) {
      var yr = st.year;
      figs.push(this._leaseFig(this._t('lease_year', { n: yr.index }), this._km(yr.driven),
        this._t('lease_year_sub', { t: this._km(yr.allowed) }),
        (yr.projected || yr.driven) > yr.allowed));
    }
    return figs.length ? `<div class="figs">${figs.join('')}</div>` : '';
  }

  // Daily mileage from the long-term statistics (kept forever by the recorder), cached for an hour.
  _leaseFetch(start, entityId) {
    var key = `${entityId}|${start.getTime()}`;
    if (!this._hass.callWS || (this._leaseHist && this._leaseHist.key === key && Date.now() - this._leaseHist.at < 3600000)) return;
    if (this._leaseFetching === key) return;
    this._leaseFetching = key;
    this._hass.callWS({
      type: 'recorder/statistics_during_period', start_time: start.toISOString(), end_time: new Date().toISOString(),
      statistic_ids: [entityId], period: 'day', types: ['state'],
    }).then((res) => {
      var rows = (res?.[entityId]) || [];
      var points = rows.map((row) => [typeof row.start === 'number' ? row.start : new Date(row.start).getTime(), Number(row.state)]).filter((p) => !Number.isNaN(p[0]) && !Number.isNaN(p[1]));
      this._leaseHist = { key: key, at: Date.now(), points: points };
    }).catch(() => {
      this._leaseHist = { key: key, at: Date.now(), points: [] };
    }).then(() => {
      this._leaseFetching = null;
      this._update();
    });
  }

  _leaseChart(st, entityId) {
    var hist = this._leaseHist4(entityId, st.start);
    var now = Date.now();
    var t0 = st.start.getTime(), t1 = st.end.getTime();
    var W = 320, H = 150, L = 6, R = 6, T = 8, B = 20;
    var top = Math.max(st.allowed, st.projected || 0, st.driven) * 1.08 || 1;
    var x = (t) => (L + (Math.max(t0, Math.min(t1, t)) - t0) / (t1 - t0) * (W - L - R)).toFixed(1);
    var y = (km) => (T + (1 - Math.max(0, km) / top) * (H - T - B)).toFixed(1);
    var pts = [[t0, 0]];
    (hist || []).forEach((p) => {
      if (p[0] >= t0 && p[0] <= now) pts.push([p[0], Math.max(0, p[1] - st.startKm)]);
    });
    pts.push([Math.min(now, t1), st.driven]);
    var line = pts.map((p, i) => `${(i ? 'L' : 'M') + x(p[0])} ${y(p[1])}`).join(' ');
    var area = `${line} L${x(pts[pts.length - 1][0])} ${y(0)} L${x(t0)} ${y(0)} Z`;
    var color = st.state === 'over' ? 'var(--error-color, #db4437)' : st.state === 'warn' ? 'var(--warning-color, #ffa600)' : 'var(--success-color, #43a047)';
    // Year ticks on the x axis.
    var ticks = '';
    var startYear = st.start.getFullYear(), endYear = st.end.getFullYear();
    for (var yr = startYear + 1; yr <= endYear; yr++) {
      var tx = x(new Date(yr, 0, 1).getTime());
      ticks += '<line x1="' + tx + '" x2="' + tx + '" y1="' + T + '" y2="' + (H - B) + '" class="grid"/>' +
        '<text x="' + tx + '" y="' + (H - 6) + '" text-anchor="middle">' + yr + '</text>';
    }
    var proj = st.projected != null && !st.ended
      ? `<path d="M${x(now)} ${y(st.driven)} L${x(t1)} ${y(st.projected)}" class="proj" style="stroke:${color}"/>` : '';
    var svg = '<svg class="lease-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + rnEsc(this._t('lease_chart')) + '">' +
      ticks +
      '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(st.allowed) + '" y2="' + y(st.allowed) + '" class="limit"/>' +
      '<text x="' + (L + 2) + '" y="' + (Number(y(st.allowed)) - 4) + '" class="limit-lbl">' + rnEsc(this._km(st.allowed)) + '</text>' +
      '<path d="M' + x(t0) + ' ' + y(0) + ' L' + x(t1) + ' ' + y(st.allowed) + '" class="allowed"/>' +
      '<path d="' + area + '" class="area"/>' +
      '<path d="' + line + '" class="actual"/>' + proj +
      '<line x1="' + x(now) + '" x2="' + x(now) + '" y1="' + T + '" y2="' + (H - B) + '" class="today"/>' +
      '<circle cx="' + x(Math.min(now, t1)) + '" cy="' + y(st.driven) + '" r="3" class="dot"/>' +
      '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + (H - B) + '" y2="' + (H - B) + '" class="axis"/>' +
      '</svg>';
    return '<div class="lease-graph"><div class="legend">' +
      '<span><i class="sw actual-sw"></i>' + this._t('lease_legend_actual') + '</span>' +
      '<span><i class="sw allowed-sw"></i>' + this._t('lease_legend_allowed') + '</span>' +
      (proj ? `<span><i class="sw proj-sw" style="border-color:${color}"></i>${this._t('lease_legend_projection')}</span>` : '') +
      '</div>' + svg + (hist && !hist.length ? `<div class="plan-info"><span>${this._t('lease_no_history')}</span></div>` : '') + '</div>';
  }

  _styles() {
    return '<style>' +
      // The container queries below need an inline-size container, whose intrinsic width is 0: in an
      // auto-width parent (layout-card, inline-block, grid auto column) the card would shrink to its
      // padding. The empty :host::before grid gives the host a 300 px max-content width there, while its
      // minmax(0, ...) track keeps the min-content width at 0: in a 1fr grid track or a flex item the card
      // still shrinks, even wrapped in a div or hui-card that keeps min-width: auto
      // (contain-intrinsic-inline-size would have made 300 px a minimum there, and the card overflowed).
      ':host { display: block; height: 100%; min-width: 0; --rn-accent: var(--primary-color, #03a9f4); }' +
      ":host::before { content: ''; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }" +
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px; container-type: inline-size; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      // The card gap is 10 px: the header keeps 8 px to the first body element.
      '.header { display: flex; align-items: center; gap: 10px; margin-bottom: -2px; }' +
      '.badge { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;' +
        ' background: color-mix(in srgb, var(--rn-accent) 16%, transparent); color: var(--rn-accent); --mdc-icon-size: 24px; }' +
      '.brand { width: 40px; height: 40px; flex: none; background: var(--primary-text-color);' +
        ' -webkit-mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; }' +
      '.brand-svg { width: 32px; height: 32px; padding: 4px; flex: none; fill: var(--primary-text-color); }' +
      // At the 6 columns minimum (about 240 px) the plate gives way: it shrinks (its SVG keeps the
      // proportions) so the vehicle name keeps at least a few letters.
      '.titles { flex: 1 1 0; min-width: 5ch; }' +
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.model { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      // Classic header: the status pill after the title, tinted with the status colour.
      '.header .bchip { background: color-mix(in srgb, var(--c) 15%, transparent); color: color-mix(in srgb, var(--c) 50%, var(--primary-text-color)); }' +
      '.plate { height: 32px; width: auto; flex: 0 1 auto; min-width: 0; max-width: 45%; display: block; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.25)); }' +
      '.image { display: flex; justify-content: center; margin: 0 0 -4px; }' +
      // Plate in the body: at the top right of the picture, the picture below it so they never overlap.
      '.image.with-plate { position: relative; flex-direction: column; align-items: center; }' +
      '.image.with-plate .plate { align-self: flex-end; max-width: 60%; margin-bottom: -18px; position: relative; z-index: 1; }' +
      '.plate-row { display: flex; justify-content: flex-end; }' +
      '.plate-row .plate, .image.with-plate .plate { height: 30px; }' +
      RN_PILL_STYLE + (this._illustrated() ? RN_SCENE_STYLE : '') +
      '.image img { max-width: 100%; max-height: 150px; object-fit: contain; }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.chip[data-more] { cursor: pointer; }' +
      // What the header pill already says is not repeated in the chips, unless the pill keeps only its dot.
      '.chips.pill-echo, .chip.pill-echo { display: none; }' +
      '@container (max-width: 200px) { .chips.pill-echo { display: flex; } .chip.pill-echo { display: inline-flex; } }' +
      'ha-card:has(.titles.dotonly) .chips.pill-echo { display: flex; } ha-card:has(.titles.dotonly) .chip.pill-echo { display: inline-flex; }' +
      '.bchip[data-more] { cursor: pointer; }' +
      '.chip ha-icon { --mdc-icon-size: 13px; }' +
      '.chip.warn { background: color-mix(in srgb, ' + RN_WARN + ' 15%, transparent); color: ' + rnInk(RN_WARN) + '; }' +
      '.chip.ok { background: color-mix(in srgb, ' + RN_OK + ' 15%, transparent); color: ' + rnInk(RN_OK) + '; }' +
      '.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 6px; }' +
      '.tile { display: flex; flex-direction: column; gap: 2px; padding: 6px 10px; border-radius: 10px; cursor: pointer; min-width: 0;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.tile-head { display: flex; align-items: center; gap: 6px; min-width: 0; }' +
      '.tile ha-icon { color: var(--rn-accent); --mdc-icon-size: 18px; flex-shrink: 0; }' +
      '.tile .bar { margin-top: 4px; height: 4px; background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent); }' +
      '.tile.warn ha-icon, .tile.warn .val { color: ' + rnInk(RN_WARN) + '; }' +
      '.row-text { display: flex; flex-direction: column; min-width: 0; }' +
      '.lbl { font-size: 11px; color: var(--secondary-text-color); }' +
      '.lbl { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.val { font-size: 14px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      // Tyres: the four pressures two by two, front then rear; only the low ones in the warning colour.
      '.tile .val.tyres { display: grid; grid-template-columns: repeat(2, max-content); column-gap: 8px; font-size: 13px; color: var(--primary-text-color); }' +
      '.tpos { font-size: 10px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.tile .tyre.low { color: ' + rnInk(RN_WARN) + '; }' +
      '.bar { height: 6px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,0.15)); overflow: hidden; }' +
      '.fill { height: 100%; border-radius: 3px; }' +
      '.row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 10px; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.row > ha-icon { color: var(--rn-accent); --mdc-icon-size: 20px; }' +
      '.row.warn > ha-icon, .row.warn .when { color: var(--warning-color, #ffa600); }' +
      // The place and "updated X ago" share the row; the time wraps rather than taking it all.
      '.row-text { flex: 1 1 auto; min-width: 0; }' +
      '.when { flex: 0 1 auto; min-width: 0; overflow-wrap: break-word; font-size: 12px; color: var(--secondary-text-color); text-align: right; }' +
      '.chev { color: var(--secondary-text-color); --mdc-icon-size: 20px; flex-shrink: 0; }' +
      '.lease-head .plan-title { white-space: nowrap; }' +
      '.lease-chev.closed { transform: rotate(-90deg); }' +
      '.plan { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 10px; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.plan-head { display: flex; align-items: center; gap: 8px; }' +
      '.logo-link { display: flex; flex-shrink: 0; border-radius: 3px; }' +
      '.plan-head .logo { width: 24px; height: 24px; border-radius: 3px; display: block; }' +
      '.plan-title { flex: 1; font-size: 13px; font-weight: 500; color: var(--primary-text-color); }' +
      '.pct { font-size: 13px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; flex: none; }' +
      '.plan .bar { background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent); }' +
      '.plan-info { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 8px; font-size: 12px; color: var(--secondary-text-color); }' +
      '.lease { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 10px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      // Icon, title, status, chevron. The status ("Projected over: 18,955 km · ≈ €1,516") takes the
      // room left and wraps between words; it is never narrower than its longest word.
      '.lease-head { display: grid; grid-template-columns: auto auto minmax(min-content, 1fr) auto; align-items: center; gap: 2px 8px; min-width: 0; }' +
      '.lease[data-lease-toggle] { cursor: pointer; }' +
      '.lease-more { cursor: default; display: flex; flex-direction: column; gap: 8px; }' +
      '.lease-icon { color: var(--rn-accent); --mdc-icon-size: 22px; flex-shrink: 0; }' +
      '.lease-status { display: flex; align-items: center; justify-content: flex-end; gap: 4px; font-size: 12px; font-weight: 500; text-align: right; overflow-wrap: break-word; }' +
      '.lease-status ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }' +
      '.lease-bar { position: relative; }' +
      '.lease .bar { background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent); }' +
      '.lease-mark { position: absolute; top: -3px; width: 2px; height: 12px; margin-left: -1px; border-radius: 1px; background: var(--primary-text-color); opacity: 0.6; }' +
      '.lease-tick { position: absolute; top: 0; width: 2px; height: 6px; margin-left: -1px; background: var(--card-background-color, #fff); }' +
      '.figs { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px; }' +
      '.plan-info b { font-weight: 500; color: var(--primary-text-color); }' +
      '.fig { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 10px; min-width: 0;' +
        ' background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent); }' +
      '.fig .val { font-size: 14px; white-space: normal; }' +
      '.fig .lbl { white-space: normal; }' +
      '.fig .sub { font-size: 11px; line-height: 1.3; color: var(--secondary-text-color); }' +
      '.fig.warn .val { color: ' + rnInk(RN_WARN) + '; }' +
      '.lease-graph { display: flex; flex-direction: column; gap: 6px; padding-top: 4px; }' +
      '.legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; color: var(--secondary-text-color); }' +
      '.legend span { display: inline-flex; align-items: center; gap: 5px; }' +
      '.sw { display: inline-block; width: 14px; height: 0; border-top: 2px solid; }' +
      '.actual-sw { border-color: var(--rn-accent); }' +
      '.allowed-sw { border-top-style: dashed; border-color: var(--secondary-text-color); }' +
      '.proj-sw { border-top-style: dotted; }' +
      '.lease-chart { width: 100%; height: auto; display: block; overflow: visible; }' +
      '.lease-chart text { font-size: 10px; fill: var(--secondary-text-color); font-family: inherit; }' +
      '.lease-chart .grid { stroke: color-mix(in srgb, var(--secondary-text-color) 15%, transparent); stroke-width: 1; }' +
      '.lease-chart .axis { stroke: color-mix(in srgb, var(--secondary-text-color) 40%, transparent); stroke-width: 1; }' +
      '.lease-chart .limit { stroke: var(--error-color, #db4437); stroke-width: 1; stroke-opacity: 0.5; }' +
      '.lease-chart .limit-lbl { fill: ' + rnInk(RN_ERR) + '; }' +
      '.lease-chart .allowed { fill: none; stroke: var(--secondary-text-color); stroke-width: 1.2; stroke-dasharray: 4 3; }' +
      '.lease-chart .area { fill: color-mix(in srgb, var(--rn-accent) 14%, transparent); stroke: none; }' +
      '.lease-chart .actual { fill: none; stroke: var(--rn-accent); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }' +
      '.lease-chart .proj { fill: none; stroke-width: 1.6; stroke-dasharray: 1.5 3; stroke-linecap: round; }' +
      '.lease-chart .today { stroke: var(--primary-text-color); stroke-opacity: 0.25; stroke-width: 1; }' +
      '.lease-chart .dot { fill: var(--rn-accent); }' +
      '.field { display: flex; flex-direction: column; gap: 4px; }' +
      '.field > span { font-size: 12px; color: var(--secondary-text-color); }' +
      'select { font: inherit; font-size: 14px; color: var(--primary-text-color); padding: 9px 32px 9px 12px; border-radius: 10px; width: 100%;' +
        ' border: 1px solid var(--divider-color, rgba(128,128,128,0.25)); appearance: none; -webkit-appearance: none; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23888\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E") no-repeat right 8px center / 20px; }' +
      '.actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px; }' +
      'button { font: inherit; cursor: pointer; border: none; }' +
      '.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; font-weight: 500; min-width: 0;' +
        ' padding: 7px 12px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,0.1)); color: var(--primary-text-color); }' +
      '.btn span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.btn ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }' +
      '.btn.armed { background: color-mix(in srgb, var(--rn-accent) 16%, transparent); color: ' + rnInk('var(--rn-accent)') + '; }' +
      '.btn.armed ha-icon { color: var(--rn-accent); }' +
      '.btn.on ha-icon { color: var(--rn-accent); }' +
      '.btn.ok { background: color-mix(in srgb, ' + RN_OK + ' 15%, transparent); color: ' + rnInk(RN_OK) + '; }' +
      '.btn.err { background: color-mix(in srgb, ' + RN_ERR + ' 15%, transparent); color: ' + rnInk(RN_ERR) + '; }' +
      '.btn.ok ha-icon { color: ' + RN_OK + '; }' +
      '.btn.err ha-icon { color: ' + RN_ERR + '; }' +
      'select.ok { border-color: ' + RN_OK + '; }' +
      'select.err { border-color: ' + RN_ERR + '; }' +
      // Narrow card (1/3 of a 12 column view, 6 columns of a section): "updated X ago" goes under the
      // place instead of beside it, and the tiles get two columns so their labels are not cut.
      '@container (max-width: 360px) {' +
        ' .row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; column-gap: 8px; }' +
        ' .row > ha-icon { grid-row: 1 / span 2; }' +
        ' .row .when { grid-column: 2; grid-row: 2; text-align: left; }' +
        ' .row .chev { grid-column: 3; grid-row: 1 / span 2; }' +
        ' .tiles { grid-template-columns: repeat(auto-fit, minmax(max(100px, calc(50% - 3px)), 1fr)); }' +
      ' }' +
      // Up to about 326 px of card (container sizes are the content box, inside the 12 px padding): the
      // lease status goes under the title.
      '@container (max-width: 300px) {' +
        ' .lease-head { grid-template-columns: auto minmax(0, 1fr) auto; }' +
        ' .lease-head .chev { grid-column: 3; grid-row: 1; }' +
        ' .lease-status { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; text-align: left; }' +
      ' }' +
      // Under about 236 px (6 to 8 columns of a section on a phone) the name and model would be down to
      // two or three letters beside the plate: the plate takes its own line under them. "Updated X ago"
      // takes the whole row width under the place (beside the icon and chevron, "zaktualizowano" did not
      // fit and was cut in two), and the tiles give their label 4 px more ("Kilometraža").
      '@container (max-width: 210px) {' +
        ' .header { flex-wrap: wrap; row-gap: 6px; }' +
        ' .plate { order: 3; flex: none; max-width: 100%; margin: 0 auto; }' +
        ' .image.with-plate .plate { align-self: center; margin-bottom: 4px; max-width: 100%; }' +
        ' .row > ha-icon, .row .chev { grid-row: 1; }' +
        ' .row .when { grid-column: 1 / -1; }' +
        ' .tile { padding-left: 8px; padding-right: 8px; }' +
      ' }' +
      '.btn.armed:hover { background: color-mix(in srgb, var(--rn-accent) 24%, transparent); }' +
      // flat: drop the grey surface behind the inner blocks for a clean, uniform card. The status
      // colours (armed, ok, err, warn) keep their background through higher specificity; neutral
      // buttons and the select fall back to an outline so they still read as tappable.
      (this._config && this._config.flat
        ? '.tile, .row, .plan, .lease, .fig, .chip { background-color: transparent; }' +
          '.fig { border: 1px solid var(--divider-color, rgba(128,128,128,0.2)); }' +
          '.btn { background: transparent; border: 1px solid var(--divider-color, rgba(128,128,128,0.25)); }' +
          'select { background-color: transparent; }'
        : '') +
    '</style>';
  }

  _onClick(ev) {
    var path = ev.composedPath();
    // Links (the Orange logo) open on their own, without the more-info dialog.
    if (path.some((n) => n.tagName === 'A')) return;
    // As in ha-carburants-france: a tap anywhere on the lease toggles it, reading the details does not.
    if (path.some((n) => n.classList?.contains('lease-more'))) return;
    if (path.some((n) => n.dataset && n.dataset.leaseToggle !== undefined)) {
      this._leaseOpen = !this._leaseIsOpen();
      this._update();
      return;
    }
    var press = path.find((n) => n.dataset?.press);
    if (press) {
      var id = press.dataset.press;
      // One tap arms the button, a second one within 3 s presses it.
      if (this._armed !== id) {
        this._armed = id;
        clearTimeout(this._armTimer);
        this._armTimer = setTimeout(() => { this._armed = null; this._update(); }, 3000);
      } else {
        this._armed = null;
        clearTimeout(this._armTimer);
        var svc = rnPressService(id, this._hass.states[id]);
        this._call(svc[0], svc[1], { entity_id: id });
      }
      this._update();
      return;
    }
    var more = path.find((n) => n.dataset?.more);
    // The click that ends a hold has already run the hold_action.
    if (this._held) { this._held = false; return; }
    if (more) this._runAction(more, 'tap');
  }

  _onChange(ev) {
    var el = ev.target;
    if (!el?.dataset?.select) return;
    this._call('select', 'select_option', { entity_id: el.dataset.select, option: el.value });
    el.blur();
  }

  // Runs a service call and shows its outcome on the control for a moment (HA shows its own error
  // toast). A failure (car offline, Renault API down…) never escapes as an unhandled rejection.
  _call(domain, service, data) {
    var id = data.entity_id;
    return Promise.resolve()
      .then(() => this._hass.callService(domain, service, data))
      .then(() => this._showResult(id, true), (err) => this._showResult(id, false, err));
  }

  _showResult(id, ok, err) {
    var msg = ok ? '' : String(err?.message || err?.code || err || '').trim();
    this._result = { id, ok, msg };
    clearTimeout(this._resultTimer);
    this._resultTimer = setTimeout(() => { this._result = null; this._update(); }, ok ? 2000 : 5000);
    this._update();
  }

  _resultFor(id) {
    var r = this._result;
    if (!r || r.id !== id) return null;
    return r.ok
      ? { cls: 'ok', icon: 'mdi:check', text: this._t('call_done') }
      : { cls: 'err', icon: 'mdi:alert-circle-outline', text: this._t('call_failed', { e: r.msg || '?' }) };
  }
}

// What a tap on an action does: press a button, run a script or scene, lock or unlock a lock,
// toggle anything else (a switch, a climate, a light…).
export function rnPressService(id, st) {
  var domain = id.split('.')[0];
  if (domain === 'button' || domain === 'input_button') return [domain, 'press'];
  if (domain === 'script' || domain === 'scene') return [domain, 'turn_on'];
  if (domain === 'automation') return [domain, 'trigger'];
  if (domain === 'lock') return ['lock', st?.state === 'locked' ? 'unlock' : 'lock'];
  return ['homeassistant', 'toggle'];
}

// On or off for the entities an action toggles (null for the ones it presses or runs).
export function rnIsOn(id, st) {
  if (!st) return null;
  var domain = id.split('.')[0];
  if (['button', 'input_button', 'script', 'scene', 'automation'].indexOf(domain) >= 0) return null;
  if (domain === 'lock') return st.state === 'unlocked' || st.state === 'open';
  if (domain === 'climate') return st.state !== 'off' && st.state !== 'unavailable';
  if (domain === 'cover') return st.state === 'open';
  return st.state === 'on';
}
