/**
 * Compact vehicle card: logo, name and model, the picture beside the battery level and range, and the
 * charging or plug state. Its detail button (top right) switches it to the full card and back; a click
 * outside the card brings the compact view back. Same options and editor as renault-card.
 */
import { pickerDefine } from "./card-picker.js";
import { rnEsc, rnPickerLang, rnT } from "./i18n-helpers.js";
import { RenaultCard, rnWatchOutside } from "./illustrated-header.js";
import { rnInDialog } from "./renault-mini-card.js";

export class RenaultMiniCard extends RenaultCard {
  static getConfigElement() {
    return document.createElement('renault-mini-card-editor');
  }

  constructor() {
    super();
    this._zoomed = false;
    this._zoomOutside = rnWatchOutside(
      (ev) => ev.composedPath().indexOf(this) === -1 && !rnInDialog(ev),
      () => { if (this._zoomed) this._setZoom(false); },
    );
  }

  setConfig(config) {
    // The host attribute behind the mini card's styles; never set in the constructor.
    this.setAttribute?.('mini', '');
    super.setConfig(config);
    if (this._config.zoom === false && this._zoomed) this._setZoom(false);
  }

  connectedCallback() {
    super.connectedCallback();
    this._zoomOutside.on();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._zoomOutside.off();
    // Left (another view, a conditional card hidden): back to the compact view.
    this._zoomed = false;
    this._sig = null;
  }

  getCardSize() { return this._zoomed ? super.getCardSize() : 3; }

  getGridOptions() { return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6, rows: 'auto' }; }

  _setZoom(zoomed) {
    this._zoomed = zoomed;
    this._sig = null;
    this._update();
  }

  _headerAction() {
    // zoom: false removes the detail button: the mini card stays compact.
    if (this._config.zoom === false) return '';
    var label = rnEsc(this._t(this._zoomed ? 'zoom_out' : 'zoom_in'));
    return `<button class="zoom" title="${label}" aria-label="${label}"><ha-icon icon="mdi:${this._zoomed ? 'arrow-collapse' : 'arrow-expand'}"></ha-icon></button>`;
  }

  _render(r) {
    if (this._zoomed || !r.deviceId) {
      super._render(r);
      return;
    }
    var ent = r.ent, id = this._identity(r);
    var tiles = [];
    if (this._tileOn('battery_level') && this._avail(ent.battery_level)) tiles.push(this._batteryTile(ent));
    // The battery range of an electric or plug-in hybrid car, else the fuel range (among the tiles option's).
    var range = ['battery_autonomy', 'fuel_autonomy'].find((role) => this._tileOn(role) && this._avail(ent[role]));
    if (range) tiles.push(this._rangeTile(ent, range, range));
    var img = id.imgSrc ? `<div class="mimg"><img src="${rnEsc(id.imgSrc)}" alt="${rnEsc(id.name)}"></div>` : '';
    var charge = this._config.show_chips !== false ? this._chargeChip(ent) : null;
    // No picture in the header: the logo, or the car icon, keeps the header's 40 px icon.
    this._setHtml(this._styles() + '<ha-card class="mini">' + this._header(id.name, id.model, null, null, id.imgSrc) +
      (img || tiles.length ? `<div class="mb${img && tiles.length ? '' : ' solo'}">${img}${tiles.length ? `<div class="mstats">${tiles.join('')}</div>` : ''}</div>` : '') +
      this._chipsHtml(charge ? [charge] : [], ent) + '</ha-card>');
  }

  _styles() {
    return super._styles().replace('</style>',
      // Only 240 px in an auto-width container (6 columns of a section), still no minimum.
      ':host([mini])::before { grid-template-columns: minmax(0, 240px); }' +
      'ha-card.mini { gap: 8px; }' +
      // The compact banner's title reaches over the scene's left quarter: no street lamp under it.
      'ha-card.mini .vc-lamp { display: none; }' +
      '.zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%; align-self: flex-start;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); --mdc-icon-size: 16px; }' +
      '.zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent); color: var(--primary-text-color); }' +
      '.zoom:focus-visible { outline: 2px solid var(--rn-accent); outline-offset: 1px; }' +
      '.mb { display: grid; grid-template-columns: minmax(0, 45%) minmax(0, 1fr); gap: 8px; align-items: center; }' +
      '.mb.solo { grid-template-columns: minmax(0, 1fr); }' +
      '.mimg { display: flex; justify-content: center; min-width: 0; }' +
      '.mimg img { max-width: 100%; max-height: 96px; object-fit: contain; }' +
      '.mstats { display: flex; flex-direction: column; gap: 6px; min-width: 0; }' +
      // A phone at 6 columns (about 156 px): the picture goes above the tiles.
      '@container (max-width: 200px) { .mb { grid-template-columns: minmax(0, 1fr); } }' +
      '</style>');
  }

  _onClick(ev) {
    if (ev.composedPath().some((n) => n.classList?.contains('zoom'))) {
      ev.stopPropagation();
      this._setZoom(!this._zoomed);
      // Keyboard use (Enter / Space: no click count) keeps the focus on the button, without scrolling the page.
      if (!ev.detail) this.shadowRoot.querySelector('.zoom')?.focus({ preventScroll: true });
      return;
    }
    super._onClick(ev);
  }
}

// vehicle-… since the cards cover every brand; renault-… (their former name) stays defined for the dashboards that use it.
if (!customElements.get('vehicle-mini-card')) {
  pickerDefine('vehicle-mini-card', class extends RenaultMiniCard {});
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'vehicle-mini-card',
    name: rnT(rnPickerLang(), 'mini_name'),
    description: rnT(rnPickerLang(), 'mini_desc'),
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-vehicle-card',
  });
}
if (!customElements.get('renault-mini-card')) pickerDefine('renault-mini-card', class extends RenaultMiniCard {});
