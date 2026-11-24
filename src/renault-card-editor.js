// ── renault-card-editor (visual editor, built on HA's ha-form) ───────────────
// Creates the editor's ha-form once (shared by both editors).
import { pickerDefine } from "./card-picker.js";
import { rnCurrencySymbol, rnIntlLang, rnPickerLang, rnResolveLang, rnT } from "./i18n-helpers.js";
import { RN_LANGUAGE_FIELD, RN_OVERRIDABLE } from "./entity-discovery.js";
import { RN_SEVERITY } from "./lease-tracking.js";
import { RN_LEASE_FIGS, RN_TILES } from "./renault-card.js";
import { RenaultCard } from "./illustrated-header.js";
import { RnI18n } from "./i18n/tables.js";

export function rnEnsureForm(editor) {
  if (editor._form) return;
  editor._form = document.createElement('ha-form');
  editor._form.addEventListener('value-changed', (ev) => editor._valueChanged(ev));
  editor.appendChild(editor._form);
}

export var RN_EDITOR_DEFAULTS = { illustration: true, illustration_theme: 'auto', show_title: true, show_subtitle: true, show_logo: true, show_image: true, show_plate: true, show_chips: true, show_location: true, show_actions: true, show_data_plan: true, low_range: 100, expand_lease: false, show_lease_margin: true };

export class RenaultCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = this._hass?.language;
    this._hass = hass;
    if (this._form && prevLang === (hass?.language)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _lang() {
    return rnResolveLang(RnI18n, this._hass?.language);
  }

  // The options left out of the YAML at these values (the mini card's editor adds its detail button).
  _defaults() {
    return RN_EDITOR_DEFAULTS;
  }

  // The mini card's own switches (its detail button), beside the full card's.
  _ownSwitches() {
    return [];
  }

  _schema() {
    var t = (k) => rnT(this._lang(), k);
    var domains = { mileage: 'sensor', fuel_autonomy: 'sensor', fuel_quantity: 'sensor', battery_level: 'sensor',
      battery_autonomy: 'sensor', outside_temperature: 'sensor', location: 'device_tracker' };
    return [
      // Any vehicle: a device with a device_tracker (the supported integrations are found without it)
      { name: 'device_id', selector: { device: { entity: [{ domain: 'device_tracker' }] } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'image', selector: { text: {} } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'fuel_tank_capacity', selector: { number: { min: 0, max: 150, step: 1, mode: 'box', unit_of_measurement: 'L' } } },
          { name: 'low_range', selector: { number: { min: 0, max: 500, step: 10, mode: 'box', unit_of_measurement: 'km' } } },
          { name: 'low_tyre_pressure', selector: { number: { min: 0, max: 5, step: 0.1, mode: 'box', unit_of_measurement: 'bar' } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'illustration', selector: { boolean: {} } },
          { name: 'illustration_theme', selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: t(`theme_${v}`) })) } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'show_title', selector: { boolean: {} } },
          { name: 'show_subtitle', selector: { boolean: {} } },
          { name: 'show_logo', selector: { boolean: {} } },
          { name: 'show_image', selector: { boolean: {} } },
          { name: 'show_plate', selector: { boolean: {} } },
          { name: 'show_chips', selector: { boolean: {} } },
          { name: 'show_location', selector: { boolean: {} } },
          { name: 'show_actions', selector: { boolean: {} } },
          { name: 'show_data_plan', selector: { boolean: {} } },
          { name: 'expand_lease', selector: { boolean: {} } },
          { name: 'show_lease_margin', selector: { boolean: {} } },
          { name: 'flat', selector: { boolean: {} } },
          ...this._ownSwitches(),
        ],
      },
      { name: 'tiles', selector: { select: { multiple: true, mode: 'list', options: RN_TILES.map((x) => ({ value: x[0], label: t(x[1]) })) } } },
      // extra_tiles in the editor while it is a list of entity IDs; with names or icons (objects) it is YAML only.
      ...((this._config?.extra_tiles || []).every((x) => typeof x === 'string') ? [{ name: 'extra_tiles', selector: { entity: { multiple: true } } }] : []),
      { name: 'lease_figs', selector: { select: { multiple: true, mode: 'list', options: RN_LEASE_FIGS.map((x) => ({ value: x[0], label: t(x[1]) })) } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'tap_action', selector: { ui_action: { default_action: 'more-info' } } },
          { name: 'hold_action', selector: { ui_action: { default_action: 'none' } } },
        ],
      },
      ...['battery_severity', 'fuel_severity'].filter((k) => !Array.isArray(this._config?.[k])).map((k) => ({
        type: 'expandable', name: k, title: t(`ed_${k}`), flatten: false, icon: k === 'fuel_severity' ? 'mdi:gas-station' : 'mdi:battery-high',
        schema: [{ type: 'grid', name: '', schema: RN_SEVERITY.map((x) => ({ name: x[0], selector: { number: { min: 0, max: 100, step: 1, mode: 'box', unit_of_measurement: '%' } } })) }],
      })),
      { name: 'image_height', selector: { number: { min: 40, max: 400, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
      { name: 'buttons', selector: { entity: { multiple: true, domain: ['button', 'input_button', 'switch', 'input_boolean', 'script', 'scene', 'automation', 'lock', 'climate', 'light', 'fan', 'cover'] } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'plate', selector: { text: {} } },
          { name: 'plate_department', selector: { text: {} } },
        ],
      },
      { name: 'data_plan_device_id', selector: { device: { integration: 'orange_internet_on_the_move' } } },
      {
        type: 'expandable', name: 'lease', title: t('ed_lease'), flatten: false, icon: 'mdi:file-sign',
        schema: [
          { name: 'start_date', selector: { date: {} } },
          {
            type: 'grid', name: '', schema: [
              { name: 'duration', selector: { number: { min: 1, max: 120, step: 1, mode: 'box', unit_of_measurement: t('ed_duration_unit') } } },
              { name: 'km_per_year', selector: { number: { min: 0, max: 100000, step: 1000, mode: 'box', unit_of_measurement: 'km' } } },
            ],
          },
          {
            type: 'grid', name: '', schema: [
              { name: 'start_mileage', selector: { number: { min: 0, max: 1000000, step: 1, mode: 'box', unit_of_measurement: 'km' } } },
              { name: 'extra_km_cost', selector: { number: { min: 0, max: 5, step: 0.01, mode: 'box', unit_of_measurement: `${rnCurrencySymbol(rnIntlLang(RnI18n, this._lang(), this._hass), this._hass?.config?.currency || 'EUR')}/km` } } },
            ],
          },
          {
            name: 'forecast', selector: { select: { mode: 'dropdown', options: [
              { value: 'contract', label: t('forecast_contract') }, { value: '90', label: t('forecast_90') }, { value: '30', label: t('forecast_30') },
            ] } },
          },
        ],
      },
      RN_LANGUAGE_FIELD,
      {
        type: 'expandable', name: 'entities', title: t('ed_entities'), flatten: false,
        schema: RN_OVERRIDABLE.map((r) => ({ name: r, selector: { entity: r === 'outside_temperature' ? { domain: 'sensor', device_class: 'temperature' } : { domain: domains[r] } } })),
      },
    ];
  }

  _render() {
    if (!this._config || !this._hass) return;
    rnEnsureForm(this);
    var lang = this._lang();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => (RN_OVERRIDABLE.indexOf(s.name) >= 0 ? rnT(lang, `en_${s.name}`) : rnT(lang, `ed_${s.name}`));
    this._form.computeHelper = (s) => {
      var key = `ed_${s.name}_helper`;
      var txt = rnT(lang, key);
      return txt === key ? undefined : txt;
    };
    var data = Object.assign({}, this._defaults(), this._config);
    if (!Array.isArray(data.tiles)) data.tiles = RN_TILES.map((x) => x[0]);
    if (!Array.isArray(data.lease_figs)) data.lease_figs = RN_LEASE_FIGS.map((x) => x[0]);
    if (data.lease) data.lease = Object.assign({}, data.lease, { forecast: data.lease.forecast ? String(data.lease.forecast) : 'contract' });
    this._form.data = data;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach((key) => {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    var defaults = this._defaults();
    Object.keys(defaults).forEach((key) => {
      if (value[key] === defaults[key]) delete value[key];
    });
    ['battery_severity', 'fuel_severity'].forEach((k) => {
      if (!value[k] || Array.isArray(value[k])) return;
      var sv = {};
      RN_SEVERITY.forEach((x) => { var v = value[k][x[0]]; if (v !== '' && v != null) sv[x[0]] = v; });
      if (Object.keys(sv).length) value[k] = sv; else delete value[k];
    });
    // Every tile checked is the default: no tiles option (an empty list, no tile, is kept).
    if (Array.isArray(value.tiles) && RN_TILES.every((x) => value.tiles.indexOf(x[0]) >= 0)) delete value.tiles;
    if (Array.isArray(value.extra_tiles) && !value.extra_tiles.length) delete value.extra_tiles;
    // Same for the lease figures: every one checked is the default, so no lease_figs option (an empty list is kept).
    if (Array.isArray(value.lease_figs) && RN_LEASE_FIGS.every((x) => value.lease_figs.indexOf(x[0]) >= 0)) delete value.lease_figs;
    if (value.entities) {
      var e = Object.assign({}, value.entities);
      Object.keys(e).forEach((k) => { if (!e[k]) delete e[k]; });
      if (Object.keys(e).length) value.entities = e; else delete value.entities;
    }
    if (value.lease) {
      var l = Object.assign({}, value.lease);
      Object.keys(l).forEach((k) => { if (l[k] === '' || l[k] === null || l[k] === undefined) delete l[k]; });
      if (l.forecast === 'contract') delete l.forecast;
      else if (l.forecast) l.forecast = Number(l.forecast);
      if (Object.keys(l).length) value.lease = l; else delete value.lease;
    }
    if (!value.show_data_plan && value.show_data_plan !== undefined) delete value.data_plan_device_id;
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('renault-card-editor')) {
  pickerDefine('renault-card-editor', RenaultCardEditor);
}

// The mini card's editor: the full card's options (its expanded view uses them) and the detail button.
export class RenaultMiniCardEditor extends RenaultCardEditor {
  _defaults() {
    return Object.assign({}, RN_EDITOR_DEFAULTS, { zoom: true });
  }

  _ownSwitches() {
    return [{ name: 'zoom', selector: { boolean: {} } }];
  }
}

if (!customElements.get('renault-mini-card-editor')) {
  pickerDefine('renault-mini-card-editor', RenaultMiniCardEditor);
}

// vehicle-… since the cards cover every brand; renault-… (their former name) stays defined for the dashboards that use it.
if (!customElements.get('vehicle-card')) {
  pickerDefine('vehicle-card', class extends RenaultCard {});
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'vehicle-card',
    name: rnT(rnPickerLang(), 'card_name'),
    description: rnT(rnPickerLang(), 'card_desc'),
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-vehicle-card',
  });
}
if (!customElements.get('renault-card')) pickerDefine('renault-card', class extends RenaultCard {});
