// ── French licence plate (SVG, 520 × 110 mm proportions) ────────────────────
// Department → traditional public-domain emblem drawn in the territorial band.
// Official modern region logos are protected designs and are not reproduced;
// departments whose region has no traditional emblem show the number only.
import { rnEsc } from "./i18n-helpers.js";

export var RN_DEPT_EMBLEM = {};
(() => {
  var m = {
    bzh: ['22', '29', '35', '56'],
    occ: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
    idf: ['75', '77', '78', '91', '92', '93', '94', '95'],
    prv: ['04', '05', '06', '13', '83', '84'],
    cor: ['2A', '2B', '20'],
    bgn: ['21', '25', '39', '58', '70', '71', '89', '90'],
  };
  for (var k in m) for (var i = 0; i < m[k].length; i++) RN_DEPT_EMBLEM[m[k][i]] = k;
})();

export function rnStar(cx, cy, r) {
  var pts = [];
  for (var i = 0; i < 10; i++) {
    var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.4 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `<polygon points="${pts.join(' ')}"/>`;
}

// Gwenn-ha-du: 9 stripes, ermine canton.
export function rnBreizhFlag(x, y, w, h) {
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
  var sh = h / 9;
  for (var i = 0; i < 9; i += 2) out += `<rect x="${x}" y="${(y + i * sh).toFixed(2)}" width="${w}" height="${sh.toFixed(2)}" fill="#000"/>`;
  var cw = w * 0.42, ch = sh * 5;
  out += `<rect x="${x}" y="${y}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="#fff"/>`;
  for (var r = 0; r < 3; r++) for (var c2 = 0; c2 < 3; c2++) {
    if ((r + c2) % 2) continue;
    out += `<circle cx="${(x + cw * (c2 + 0.5) / 3).toFixed(2)}" cy="${(y + ch * (r + 0.5) / 3).toFixed(2)}" r="${(sh * 0.45).toFixed(2)}" fill="#000"/>`;
  }
  return `${out}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Croix occitane: yellow cross pattée with 12 pommels on red.
export function rnOccitanFlag(x, y, w, h) {
  var cx = x + w / 2, cy = y + h / 2, s = Math.min(w, h);
  var arm = s * 0.16, L = s * 0.4, flare = s * 0.3, r = s * 0.055;
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#c8102e"/><g transform="translate(${cx} ${cy})" fill="#ffd200">`;
  for (var i = 0; i < 4; i++) {
    out += `<g transform="rotate(${i * 90})"><path d="M ${-arm / 2} 0 L ${-flare / 2} ${-L} L ${flare / 2} ${-L} L ${arm / 2} 0 Z"/>`;
    out += `<circle cx="${-flare / 2}" cy="${-L - r * 1.4}" r="${r}"/><circle cx="0" cy="${-L - r * 1.4}" r="${r}"/><circle cx="${flare / 2}" cy="${-L - r * 1.4}" r="${r}"/></g>`;
  }
  return `${out}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Heraldic fleur-de-lys, drawn in a 10 × 12 box centred on (0, 0).
export var RN_LYS = '<path d="M0,-6 C1.4,-4 1.4,-1.6 0,0.6 C-1.4,-1.6 -1.4,-4 0,-6 Z' +
  ' M-4.6,-2.4 C-2.4,-2.6 -1.2,-1 -0.9,0.6 L-3,0.6 C-4.6,-0.2 -5.2,-1.2 -4.6,-2.4 Z' +
  ' M4.6,-2.4 C2.4,-2.6 1.2,-1 0.9,0.6 L3,0.6 C4.6,-0.2 5.2,-1.2 4.6,-2.4 Z' +
  ' M-3.4,1.4 H3.4 V2.6 H-3.4 Z M-1,3.4 C-0.4,4.6 0.4,4.6 1,3.4 L1.2,5.6 H-1.2 Z"/>';

// Île-de-France: azure, three gold fleurs-de-lys (2 + 1).
export function rnIdfFlag(x, y, w, h) {
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#003da5"/><g fill="#ffd200">`;
  var pts = [[0.27, 0.3], [0.73, 0.3], [0.5, 0.73]];
  for (var i = 0; i < 3; i++) out += `<g transform="translate(${(x + w * pts[i][0]).toFixed(2)} ${(y + h * pts[i][1]).toFixed(2)}) scale(${(h / 23).toFixed(3)})">${RN_LYS}</g>`;
  return `${out}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Provence: or, four pallets gules.
export function rnProvenceFlag(x, y, w, h) {
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd200"/>`;
  var pw = w / 9;
  for (var i = 0; i < 4; i++) out += `<rect x="${(x + pw * (2 * i + 1)).toFixed(2)}" y="${y}" width="${pw.toFixed(2)}" height="${h}" fill="#c8102e"/>`;
  return `${out}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Corsica: white, black Moor's head with white bandana.
export function rnCorsicaFlag(x, y, w, h) {
  var s = h / 32;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>` +
    `<g transform="translate(${(x + w / 2).toFixed(2)} ${(y + h / 2).toFixed(2)}) scale(${s.toFixed(3)})">` +
    '<path fill="#000" d="M0,-11 C6,-11 9,-6.5 9,-1.5 C9,3.5 7,7 5,8.5 L5,11 L-3,11 C-3,9.5 -3.4,8.4 -4.2,7.4 L-7,7.4 L-5.2,4.8 C-7.4,4.2 -8.6,2.6 -8.2,0.8 L-9.6,-0.4 L-8,-1.2 L-8.8,-3 L-7,-3.2 C-6,-8 -3.6,-11 0,-11 Z"/>' +
    '<path fill="#fff" d="M-8.6,-5.6 L8.8,-8 L9.2,-4.6 L-8.2,-2.2 Z M8,-7.6 L12,-9.8 L12.4,-6.6 L8.4,-4.4 Z"/>' +
    `</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#bbb" stroke-width="0.8"/></g>`;
}

// Burgundy (ancient): bendy of six, or and azure, within a bordure gules.
export function rnBurgundyFlag(x, y, w, h) {
  var out = `<g><clipPath id="rn-bgn"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>` +
    `<g clip-path="url(#rn-bgn)"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd200"/>`;
  var bw = (w + h) / 6;
  for (var i = 0; i < 7; i += 2) {
    var x0 = x - h + i * bw;
    out += `<path d="M${x0.toFixed(2)} ${y + h} l${h} ${-h} l${bw.toFixed(2)} 0 l${-h} ${h} Z" fill="#003da5"/>`;
  }
  return `${out}</g><rect x="${(x + 1).toFixed(2)}" y="${(y + 1).toFixed(2)}" width="${w - 2}" height="${h - 2}" fill="none" stroke="#c8102e" stroke-width="2.4"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

export function rnDeptEmblem(dept, x, y, w, h) {
  switch (RN_DEPT_EMBLEM[dept]) {
    case 'bzh': return rnBreizhFlag(x, y, w, h);
    case 'occ': return rnOccitanFlag(x, y, w, h);
    case 'idf': return rnIdfFlag(x, y, w, h);
    case 'prv': return rnProvenceFlag(x, y, w, h);
    case 'cor': return rnCorsicaFlag(x, y, w, h);
    case 'bgn': return rnBurgundyFlag(x, y, w, h);
    default: return '';
  }
}

// Regulation dimensions (arrêté du 9 février 2009, 520 × 110 mm plate, 1 unit = 1 mm):
// usable area 510 × 100 (5 mm border), blue bands 45 × 100 flush with the usable
// edges (spacing 0), characters ≈ 76 mm high with ≥ 5 mm clearance to bands/edges.
export function rnPlateSvg(plate, dept) {
  var blue = '#003da5', yellow = '#ffd200';
  // EU emblem: ring of 12 stars centred in the 45 mm euroband, "F" below.
  var stars = '';
  for (var i = 0; i < 12; i++) {
    var a = i * Math.PI / 6;
    stars += rnStar(27.5 + 13 * Math.cos(a), 31 + 13 * Math.sin(a), 3.4);
  }
  var right = '';
  if (dept) {
    var d = String(dept).toUpperCase();
    var emblem = rnDeptEmblem(d, 474, 11, 37, 26);
    right = emblem +
      '<text x="492.5" y="' + (emblem ? 90 : 72) + '" text-anchor="middle" fill="#fff" font-size="' + (emblem ? 42 : 50) + '" font-weight="700"' +
      ' font-family="\'Roboto Condensed\',\'Arial Narrow\',Arial,sans-serif" textLength="' + (d.length > 2 ? 37 : 32) + '" lengthAdjust="spacingAndGlyphs">' + rnEsc(d) + '</text>';
  }
  return '<svg class="plate" viewBox="0 0 520 110" role="img" aria-label="' + rnEsc(plate) + '" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0" y="0" width="520" height="110" rx="8" fill="#111"/>' +
    '<rect x="5" y="5" width="510" height="100" rx="4" fill="#fff"/>' +
    // Euroband: 45 × 100, flush with the usable area (left edge, 0 mm spacing).
    '<path d="M9 5 H50 V105 H9 a4 4 0 0 1 -4 -4 V9 a4 4 0 0 1 4 -4 Z" fill="' + blue + '"/>' +
    '<g fill="' + yellow + '">' + stars + '</g>' +
    '<text x="27.5" y="96" text-anchor="middle" fill="#fff" font-size="42" font-weight="700" font-family="Arial,sans-serif">F</text>' +
    // Territorial band: 45 × 100, flush with the usable area (right edge).
    '<path d="M470 5 H511 a4 4 0 0 1 4 4 V101 a4 4 0 0 1 -4 4 H470 Z" fill="' + blue + '"/>' + right +
    // Registration: ≈ 76 mm cap height, centred between the bands (50 → 470) with ≥ 5 mm clearance.
    '<text x="260" y="93" text-anchor="middle" fill="#111" font-size="107" font-weight="700"' +
    ' font-family="\'Roboto Condensed\',\'Arial Narrow\',\'DIN Condensed\',Arial,sans-serif" textLength="' + Math.min(400, Math.max(1, String(plate).length) * 57) + '" lengthAdjust="spacingAndGlyphs">' + rnEsc(plate) + '</text>' +
    '</svg>';
}

// French SIV plate "GW782EN" → "GW-782-EN"
export function rnPlate(text) {
  var m = String(text || '').replace(/[\s-]/g, '').toUpperCase().match(/^([A-Z]{2})(\d{3})([A-Z]{2})$/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

// The plate option, typed by hand for an integration that does not give it: a French SIV plate gets its dashes,
// any other registration is shown as typed (in capitals).
export function rnPlateOption(text) {
  var t = String(text == null ? '' : text).trim().toUpperCase();
  return t ? (rnPlate(t) || t) : null;
}

// extra_tiles: entity IDs, or { entity, name, icon, bar, tap_action, hold_action }.
export function rnExtraTiles(config) {
  return (Array.isArray(config.extra_tiles) ? config.extra_tiles : [])
    .map((x) => (typeof x === 'string' ? { entity: x } : x && typeof x === 'object' ? x : null))
    .filter((x) => x && typeof x.entity === 'string' && x.entity);
}

// An extra tile's icon when neither the tile, the entity nor the registry gives one.
export var RN_CLASS_ICONS = {
  speed: 'mdi:speedometer', temperature: 'mdi:thermometer', battery: 'mdi:battery', distance: 'mdi:map-marker-distance',
  pressure: 'mdi:gauge', voltage: 'mdi:flash', current: 'mdi:current-ac', power: 'mdi:flash', energy: 'mdi:lightning-bolt',
  volume: 'mdi:gas-station', volume_storage: 'mdi:gas-station', duration: 'mdi:timer-outline', timestamp: 'mdi:clock-outline',
  door: 'mdi:car-door', lock: 'mdi:lock', window: 'mdi:car-door', problem: 'mdi:alert-circle-outline', safety: 'mdi:shield-alert-outline',
  connectivity: 'mdi:wifi', moving: 'mdi:car-arrow-right', plug: 'mdi:power-plug', battery_charging: 'mdi:battery-charging',
};
export var RN_DOMAIN_ICONS = {
  alarm_control_panel: 'mdi:shield-car', lock: 'mdi:lock', device_tracker: 'mdi:map-marker', switch: 'mdi:toggle-switch-outline',
  binary_sensor: 'mdi:checkbox-blank-circle-outline', climate: 'mdi:air-conditioner', number: 'mdi:ray-vertex', select: 'mdi:format-list-bulleted',
};
export function rnEntityIcon(id, st, reg) {
  return st?.attributes.icon || reg?.icon || RN_CLASS_ICONS[st?.attributes.device_class] || RN_DOMAIN_ICONS[String(id).split('.')[0]] || 'mdi:information-outline';
}

export var RN_BUTTON_ICONS = [
  [/(horn|honk|klaxon|buzzer)/, 'mdi:bullhorn'],
  [/(flash|light|phare|hazard)/, 'mdi:car-light-high'],
  [/(engine_stop|remote_stop)/, 'mdi:engine-off'],
  [/(engine_start|remote_start)/, 'mdi:engine'],
  [/(air_conditioner|climatisation|climati[sz]ation|hvac|preheat|precondition)/, 'mdi:air-conditioner'],
  [/(stop_charge|charge_stop|arreter_la_charge)/, 'mdi:power-plug-off'],
  [/(start_charge|charge)/, 'mdi:ev-station'],
  [/unlock/, 'mdi:lock-open-variant-outline'],
  [/lock/, 'mdi:lock-outline'],
  [/(refresh|wake)/, 'mdi:refresh'],
];
