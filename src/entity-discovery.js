// ── Entity discovery ─────────────────────────────────────────────────────────
// Each role is matched by the entity registry translation_key first (those of every supported integration: the
// keys do not clash from one to the other), then the entity_id suffix (English and French slugs, and the names of
// the integrations without translation keys), then attributes.
import { rnEsc } from "./i18n-helpers.js";
import { rnLoadScript } from "./renault-map-card.js";

export function rnDc(v) { return (s) => s.attributes.device_class === v; }

// Temperature sensors of a car that are not the outside air.
export var RN_NOT_OUTSIDE = /(coolant|engine|motor|oil|battery|batterie|cabin|inside|interior|inner|indoor|habitacle|interieur|innen|kuhl|kuehl|refroidissement|liquide|water|charger|charging|hv_|inverter|brake|tyre|tire|seat|target|set_?point|consigne)/;

export var RN_ROLES = {
  mileage: { domain: 'sensor', keys: ['mileage', 'vehicle_state_odometer', 'odometer', 'odometer_km'], id: /(mileage|kilometrage|odometer|odometer_km)$/,
    test: (s) => s.attributes.device_class === 'distance' && s.attributes.state_class === 'total_increasing' },
  fuel_autonomy: { domain: 'sensor', keys: ['fuel_autonomy', 'distance_to_empty_tank', 'fuel_driving_range', 'fuel_range', 'combustion_range_km'],
    id: /(fuel_autonomy|autonomie_en_carburant|autonomie_carburant|range_liquid|fuel_range|range_gas|driving_range_gas)$/ },
  fuel_quantity: { domain: 'sensor', keys: ['fuel_quantity', 'fuel_amount', 'fuel_level_liters'], id: /(fuel_quantity|quantite_de_carburant)$/, test: rnDc('volume') },
  // The fuel level in % of the tank (no volume): Stellantis, Kia / Hyundai, Toyota, VW Group, Mercedes, Subaru
  fuel_level: { domain: 'sensor', keys: ['fuel_level', 'fuel'], id: /(fuel_level|tanklevelpercent)$/ },
  battery_level: { domain: 'sensor', keys: ['battery_level', 'charge_state_battery_level', 'charge_state_usable_battery_level', 'battery_charge_level',
    'ev_battery_level', 'ev_battery_percentage', 'battery_soc', 'battery'],
    id: /(battery_level|niveau_de_batterie|niveau_de_la_batterie|state_of_charge|ev_battery_level|hvbattery_charge)$/, test: rnDc('battery') },
  battery_autonomy: { domain: 'sensor', keys: ['battery_autonomy', 'charge_state_battery_range', 'charge_state_est_battery_range', 'distance_to_empty_battery',
    'ev_range', 'ev_driving_range', 'battery_range', 'electric_range_km', 'autonomy'],
    id: /(battery_autonomy|autonomie_de_la_batterie|autonomie_batterie|range_electric|ev_range|electric_range)$/ },
  charging_remaining_time: { domain: 'sensor', keys: ['charging_remaining_time', 'charge_state_minutes_to_full_charge', 'estimated_charging_time',
    'ev_time_to_full_charge', 'remaining_charge_time', 'ev_estimated_current_charge_duration'], id: /(charging_remaining_time|temps_de_charge_restant)$/, test: rnDc('duration') },
  // The device_class fallback skips the car's other thermometers (coolant, engine, oil, battery, cabin…):
  // a vehicle with no outside sensor shows no tile rather than the coolant's temperature (issue #99).
  outside_temperature: { domain: 'sensor', keys: ['outside_temperature', 'climate_state_outside_temp', 'outside_temp', 'exterior_temperature', 'ambient_temperature'],
    id: /(outside_temperature|temperature_exterieure|outside_temp|exterior_temperature|ambient_temperature|aussentemperatur)$/,
    test: (s) => s.attributes.device_class === 'temperature' && !RN_NOT_OUTSIDE.test(s.entity_id) },
  location_last_activity: { domain: 'sensor', keys: ['location_last_activity'], id: /(location_last_activity|derniere_activite_de_localisation)$/ },
  location: { domain: 'device_tracker', keys: ['location', 'vehicle', 'parking_location', 'position'], test: () => true },
  plugged_in: { domain: 'binary_sensor', keys: ['plugged_in', 'charge_state_conn_charge_cable', 'ev_is_plugged_in', 'battery_plugged', 'ev_battery_is_plugged_in'],
    id: /(plugged_in|branche)$/, test: rnDc('plug') },
  charging: { domain: 'binary_sensor', keys: ['charging', 'is_charging', 'battery_charging', 'ev_battery_is_charging', 'chargingactive'],
    id: /(_charging|en_charge)$/, test: rnDc('battery_charging') },
  lock_status: { domain: 'binary_sensor', keys: ['lock_status'], id: /(lock_status|verrouillage)$/, test: rnDc('lock') },
  // The integrations without a lock binary sensor have a lock entity: locked / unlocked
  lock: { domain: 'lock', keys: ['vehicle_state_locked', 'lock', 'door_locks', 'door_lock'], test: () => true },
  hvac_status: { domain: 'binary_sensor', keys: ['hvac_status', 'climate_state_is_preconditioning', 'preconditioning'], id: /(hvac_status|climatisation)$/ },
  charge_mode: { domain: 'select', keys: ['charge_mode'], id: /(charge_mode|mode_de_charge)$/ },
  // The car's connected services (VW group: SEAT, CUPRA…) and its connection (Teslemetry).
  services_expiry: { domain: 'sensor', keys: ['subscription_expiry_at'] },
  services_active: { domain: 'binary_sensor', keys: ['subscription_active'] },
  cellular: { domain: 'binary_sensor', keys: ['cellular'] },
  wifi: { domain: 'binary_sensor', keys: ['wifi'] },
};

// The integrations of connected vehicles the card finds by itself (built in, then of the Marketplace). Any other
// device with a device_tracker can be picked in the editor, its values read by their names or set in `entities`.
export var RN_PLATFORMS = ['renault', 'tesla_fleet', 'teslemetry', 'tessie', 'volvo', 'skoda', 'subaru', 'nissan_leaf', 'stellantis_vehicles',
  'kia_uvo', 'mbapi2020', 'toyota', 'vag_connect', 'volkswagencarnet', 'myskoda', 'uconnect', 'polestar_api', 'fordpass'];

export var RN_TYRES = ['front_left_pressure', 'front_right_pressure', 'rear_left_pressure', 'rear_right_pressure'];
// Position of a tyre pressure sensor (index in RN_TYRES): its translation_key, else its entity_id
// suffix (English or French slug); -1 when neither tells.
export var RN_TYRE_IDS = [/front_left|avant_gauche/, /front_right|avant_droit/, /rear_left|arriere_gauche/, /rear_right|arriere_droit/];
export function rnTyrePos(reg, id) {
  var k = RN_TYRES.indexOf(reg?.translation_key);
  return k >= 0 ? k : RN_TYRE_IDS.findIndex((re) => re.test(id));
}
// Bar per unit of the pressure units Home Assistant converts to (low_tyre_pressure is in bar).
export var RN_BAR = { pa: 1e-5, hpa: 1e-3, kpa: 0.01, cbar: 0.01, mbar: 1e-3, bar: 1, psi: 0.0689476, mmhg: 0.00133322, inhg: 0.0338639, inh2o: 0.00249089 };
export function rnBar(value, unit) {
  return value * (RN_BAR[String(unit || 'bar').toLowerCase()] || 1);
}
// Minutes per unit of a duration sensor (charging_remaining_time); minutes without a unit.
export var RN_MINUTES = { s: 1 / 60, min: 1, h: 60, d: 1440 };
export var RN_KM_PER_MILE = 1.609344;
export var RN_DOORS = ['hatch_status', 'rear_left_door_status', 'rear_right_door_status', 'driver_door_status', 'passenger_door_status'];

export var RN_PLAN_ROLES = {
  start_date: /(start_date|date_de_debut)$/,
  expiry_date: /(expiry_date|date_d_expiration|date_dexpiration)$/,
  initial_data: /(initial_data|donnees_initiales)$/,
  left_data: /(left_data|donnees_restantes)$/,
  left_data_percentage: /(left_data_percentage|pourcentage)$/,
  plan_type: /(plan_type|type_de_forfait)$/,
};

// Editor field shared by the vehicle and map cards: the card language (fallback: Home Assistant's).
export var RN_LANGUAGE_FIELD = {
  name: 'language',
  selector: {
    select: {
      mode: 'dropdown',
      options: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'de', label: 'Deutsch' },
        { value: 'es', label: 'Español' },
        { value: 'sr', label: 'Српски' },
        { value: 'sr-Latn', label: 'Srpski (latinica)' },
        { value: 'it', label: 'Italiano' },
        { value: 'nl', label: 'Nederlands' },
        { value: 'pt', label: 'Português (Portugal)' },
        { value: 'pl', label: 'Polski' },
        { value: 'ro', label: 'Română' },
        { value: 'da', label: 'Dansk' },
        { value: 'sv', label: 'Svenska' },
        { value: 'bg', label: 'Български' },
        { value: 'ru', label: 'Русский' },
        { value: 'uk', label: 'Українська' },
        { value: 'hu', label: 'Magyar' },
        { value: 'sk', label: 'Slovenčina' },
        { value: 'cs', label: 'Čeština' },
        { value: 'sl', label: 'Slovenščina' },
        { value: 'lv', label: 'Latviešu' },
        { value: 'el', label: 'Ελληνικά' },
      ],
    },
  },
};
export var RN_OVERRIDABLE = ['mileage', 'fuel_autonomy', 'fuel_quantity', 'fuel_level', 'battery_level', 'battery_autonomy', 'outside_temperature', 'location'];

// The device's visible entities from the registry, with or without a state.
export function rnRegistryEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return Object.values(hass.entities).filter((e) => e.device_id === deviceId && !e.hidden);
}

// The same, limited to the entities that have a state (roles are matched on states too).
export function rnDeviceEntities(hass, deviceId) {
  return rnRegistryEntities(hass, deviceId).filter((e) => hass.states[e.entity_id]);
}

// The registry entities that had no state when the roles were resolved: a role may be missing
// only because its state was not there yet (states loading, config entry reloaded).
export function rnStateless(hass, regIds) {
  return regIds.filter((id) => !hass.states[id]);
}

// False as soon as one of those entities has a state: resolve the roles again then.
export function rnStillStateless(hass, ids) {
  return ids.every((id) => !hass.states[id]);
}

export function rnFindRole(hass, list, m) {
  var inDomain = list.filter((e) => e.entity_id.split('.')[0] === m.domain);
  var hit = inDomain.find((e) => m.keys.indexOf(e.translation_key) >= 0);
  if (!hit && m.id) hit = inDomain.find((e) => m.id.test(e.entity_id));
  if (!hit && m.test) hit = inDomain.find((e) => m.test(hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

// False while the vehicle or one of its resolved entities has no state yet, or once a registry
// entity of the vehicle (or of its data plan) that had no state at resolution time has one.
export function rnResolvedReady(hass, r) {
  if (!r.deviceId) return false;
  return rnStillStateless(hass, r.stateless || []) &&
    Object.keys(r.ent).every((k) => [].concat(r.ent[k]).every((id) => !id || hass.states[id]));
}

export function rnDevicesOf(hass, platform) {
  if (!hass?.entities) return [];
  var ids = [];
  Object.values(hass.entities).forEach((e) => {
    if (e.platform === platform && e.device_id && ids.indexOf(e.device_id) < 0) ids.push(e.device_id);
  });
  return ids;
}

// From the registry only, so that the vehicle is found even while its states are missing: the first vehicle of
// the supported integrations, in their order (Renault first).
export function rnFindVehicle(hass) {
  return rnVehicles(hass)[0];
}

// Every vehicle of the supported integrations: a device with a sensor or a device_tracker.
export function rnVehicles(hass) {
  var out = [];
  RN_PLATFORMS.forEach((p) => {
    rnDevicesOf(hass, p).forEach((id) => {
      if (out.indexOf(id) < 0 && rnRegistryEntities(hass, id).some((e) => e.entity_id.indexOf('device_tracker.') === 0 || e.entity_id.indexOf('sensor.') === 0)) out.push(id);
    });
  });
  return out;
}

// The integration of a vehicle: that of its device_tracker, else of its first entity.
export function rnPlatformOf(hass, deviceId) {
  var list = rnRegistryEntities(hass, deviceId);
  var hit = list.find((e) => e.entity_id.indexOf('device_tracker.') === 0) || list[0];
  return hit ? hit.platform : null;
}

// Brand of a vehicle: its device's manufacturer, else the integration's own brand. The logos
// (Simple Icons, CC0) other than Renault's sit in vehicle-card-brands.js, loaded on first use.
export var RN_BRANDS = ['audi', 'bentley', 'bmw', 'chrysler', 'citroen', 'cupra', 'dacia', 'dsautomobiles', 'fiat', 'ford', 'hyundai', 'jeep', 'kia', 'maserati', 'mazda', 'mercedes', 'mg', 'mini', 'nissan', 'opel', 'peugeot', 'polestar', 'porsche', 'ram', 'renault', 'seat', 'skoda', 'smart', 'subaru', 'tesla', 'toyota', 'vauxhall', 'volkswagen', 'volvo'];
export var RN_BRAND_ALIASES = { ds: 'dsautomobiles', vw: 'volkswagen', vwgroup: 'volkswagen', kiamotors: 'kia', mgmotor: 'mg', teslamotors: 'tesla' };
export var RN_PLATFORM_BRAND = { renault: 'renault', tesla_fleet: 'tesla', teslemetry: 'tesla', tessie: 'tesla', volvo: 'volvo', skoda: 'skoda', myskoda: 'skoda', subaru: 'subaru', nissan_leaf: 'nissan', polestar_api: 'polestar', fordpass: 'ford', toyota: 'toyota', mbapi2020: 'mercedes' };
export var RN_PLATFORM_MAKER = { renault: 'Renault', tesla_fleet: 'Tesla', teslemetry: 'Tesla', tessie: 'Tesla', volvo: 'Volvo', skoda: 'Škoda', myskoda: 'Škoda', subaru: 'Subaru', nissan_leaf: 'Nissan', polestar_api: 'Polestar', fordpass: 'Ford', toyota: 'Toyota', mbapi2020: 'Mercedes-Benz' };

export function rnBrandKey(hass, deviceId, device) {
  var maker = String(device?.manufacturer || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (maker) {
    if (RN_BRAND_ALIASES[maker]) return RN_BRAND_ALIASES[maker];
    var hit = RN_BRANDS.find((b) => maker === b || maker.indexOf(b) === 0);
    if (hit) return hit;
  }
  return RN_PLATFORM_BRAND[rnPlatformOf(hass, deviceId)] || null;
}

// "Renault Espace VI": the maker before the model, unless the model already names it.
export function rnModelLabel(hass, deviceId, device) {
  if (!device?.model) return '';
  // Renault's API gives the model in lower case ("Espace vi"); the others give it as the maker writes it ("e-208").
  var platform = rnPlatformOf(hass, deviceId);
  var model = platform === 'renault' ? rnModel(device.model) : String(device.model).trim();
  var maker = String(device.manufacturer || RN_PLATFORM_MAKER[platform] || '').trim();
  if (!maker || model.toLowerCase().indexOf(maker.toLowerCase()) === 0) return model;
  return `${maker} ${model}`;
}

export var rnBrandsPromise = null;
export function rnLoadBrands() {
  if (!rnBrandsPromise) {
    rnBrandsPromise = rnLoadScript('vehicle-card-brands.js', () => !!window.__rnBrands).catch((err) => {
      setTimeout(() => { rnBrandsPromise = null; }, 30000);
      throw err;
    });
  }
  return rnBrandsPromise;
}

// The header logo: Renault's diamond (bundled), another brand's logo once vehicle-card-brands.js is
// there (redraw() runs when it arrives), else null for the car icon.
export function rnBrandHtml(key, redraw) {
  if (key === 'renault') return '<span class="brand" role="img" aria-label="Renault"></span>';
  if (!key || RN_BRANDS.indexOf(key) < 0) return null;
  var logo = window.__rnBrands?.[key];
  if (logo) return `<svg class="brand-svg" viewBox="0 0 24 24" role="img" aria-label="${rnEsc(logo.t)}"><path d="${rnEsc(logo.d)}"/></svg>`;
  rnLoadBrands().then(redraw, () => {});
  return null;
}

// "Espace vi" → "Espace VI"
export function rnModel(model) {
  return String(model || '').split(' ').map((w) => {
    if (/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i.test(w)) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

// The data plan device is named after the car ("RENAULT Espace"): match on the model's first word.
export function rnFindDataPlan(hass, vehicleDevice) {
  if (!vehicleDevice || !hass.devices) return undefined;
  var word = String(vehicleDevice.model || '').split(' ')[0].toLowerCase();
  if (!word) return undefined;
  return rnDevicesOf(hass, 'orange_internet_on_the_move').find((id) => {
    var d = hass.devices[id];
    if (!d) return false;
    var text = [d.model, d.name, d.name_by_user].join(' ').toLowerCase();
    return text.indexOf(word) >= 0;
  });
}

// Official MyRenault photo exposed by the renault_picture integration: a sensor on the same device
// as the renault integration, holding the picture URL. The entity walk is split out so the main
// card can resolve it once (in _resolve, cached by _resolved) and only read its state afterwards.
// The sensor comes first: the integration's image entity has an entity_picture whose access token
// changes every few minutes.
// Other integrations: an image entity of the car (the renders of vag_connect, the picture of
// uconnect; not the surround view cameras of kia_uvo), else the device tracker's entity_picture
// (stellantis_vehicles, toyota). Volvo only gives it through an action (rnVolvoPicture).
export var RN_PICTURE_SKIP = ['kia_uvo'];
export function rnPhotoEntity(hass, deviceId) {
  if (!hass?.entities || !deviceId) return null;
  var mine = Object.values(hass.entities).filter((e) => e.device_id === deviceId);
  var entries = mine.filter((e) => e.platform === 'renault_picture');
  var entry = entries.find((e) => e.entity_id.indexOf('sensor.') === 0) || entries[0];
  if (entry) return entry.entity_id;
  var images = mine.filter((e) => e.entity_id.indexOf('image.') === 0 && RN_PICTURE_SKIP.indexOf(e.platform) < 0 && !e.disabled_by);
  var image = images.find((e) => /render|picture|image|vehicle|car/.test(`${e.translation_key || ''} ${e.entity_id}`)) || images[0];
  if (image) return image.entity_id;
  var tracker = mine.find((e) => e.entity_id.indexOf('device_tracker.') === 0 && hass.states?.[e.entity_id]?.attributes.entity_picture);
  return tracker ? tracker.entity_id : null;
}

// Volvo: the volvo.get_image_url action returns the picture URLs of the car (Home Assistant 2025.9+).
// Asked once per config entry and page; done() redraws the card when the answer comes.
export var rnVolvoPictures = {};
export function rnVolvoPicture(hass, device, done) {
  var entry = device?.config_entries?.[0];
  if (!entry || !hass.callWS || !hass.services?.volvo?.get_image_url) return null;
  var hit = rnVolvoPictures[entry];
  if (hit) {
    if (hit.url !== undefined) return hit.url;
    hit.waiters.push(done);
    return null;
  }
  rnVolvoPictures[entry] = { waiters: [done] };
  hass.callWS({ type: 'call_service', domain: 'volvo', service: 'get_image_url', service_data: { entry: entry, images: ['exterior_front_left', 'exterior_side_left', 'exterior_front'] }, return_response: true })
    .then((res) => {
      var images = res?.response?.images || [];
      return images.length ? images[0].url || null : null;
    }, () => null)
    .then((url) => {
      var waiters = rnVolvoPictures[entry].waiters;
      rnVolvoPictures[entry] = { url: url };
      if (url) waiters.forEach((fn) => { fn(); });
    });
  return null;
}

// The picture URL without its rotating access token, for render signatures: a new token alone
// shows the same picture and must not redraw the card or the map markers.
export function rnPhotoKey(url) {
  return url ? String(url).replace(/([?&])token=[^&#]*&?/, '$1').replace(/[?&]$/, '') : url;
}

export function rnPhotoUrl(hass, entityId) {
  var s = entityId && hass?.states ? hass.states[entityId] : null;
  if (!s || s.state === 'unavailable' || s.state === 'unknown') return null;
  var a = s.attributes || {};
  return a.picture_large || a.entity_picture || null;
}

export function rnMyRenaultPhoto(hass, r) {
  return rnPhotoUrl(hass, rnPhotoEntity(hass, r?.deviceId));
}
