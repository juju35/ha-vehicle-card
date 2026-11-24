// ── i18n ──────────────────────────────────────────────────────────────────────
import { RnI18n } from "./i18n/tables.js";

// Language of a dictionary: the full tag when it has one (sr-Latn), else the part before the dash
// (fr-FR → fr), else English.
export function rnResolveLang(dict, lang) {
  var l = String(lang || 'en');
  if (dict[l]) return l;
  l = l.split('-')[0];
  return dict[l] ? l : 'en';
}

// Locale for Intl: Home Assistant's full locale (pt-PT, nl-BE…) when it resolves to the card's
// language, else the card's language. Home Assistant's "pt" is European Portuguese, as is the pt
// dictionary, so bare "pt" becomes pt-PT (Intl reads "pt" as Brazilian).
export function rnIntlLang(dict, lang, hass) {
  var full = String((hass?.locale?.language) || (hass?.language) || '');
  var tag = full && rnResolveLang(dict, full) === lang ? full : lang;
  return tag === 'pt' ? 'pt-PT' : tag;
}

// Language of the card picker, before any hass object: the page's (Home Assistant sets it), else the browser's.
export function rnPickerLang() {
  return rnResolveLang(RnI18n, globalThis.document?.documentElement?.lang || globalThis.navigator?.language);
}

export function rnT(lang, key) {
  var strings = RnI18n[lang] || RnI18n.en;
  return strings[key] || RnI18n.en[key] || key;
}

// key_one / key_other picked with the CLDR plural rules of `intl` ("two", "few" and "many" fall back
// to _other: the Polish, Serbian, Slavic and Latvian strings are abbreviations, the same for every
// number, and the Romanian ones put the number after a label).
export function rnPlural(lang, intl, key, n) {
  var cat = 'other';
  try { cat = new Intl.PluralRules(intl).select(n); } catch (_e) { /* unknown locale: other */ }
  var strings = RnI18n[lang] || RnI18n.en;
  var s = strings[`${key}_${cat}`] || strings[`${key}_other`] || RnI18n.en[`${key}_other`];
  return s.replace('{n}', n);
}

// "5 minutes ago", "in 2 hours"… in the given language. The formatters are cached per language
// (and per currency for rnMoneyFormat): they are rebuilt every minute by the refresh timer.
export var RN_RTF = {};
export var RN_MONEY = {};

// narrowSymbol: Romanian, Hungarian and Ukrainian would otherwise print "900 EUR" instead of "900 €".
export function rnMoneyFormat(lang, cur) {
  var key = `${lang}|${cur}`;
  return (
    RN_MONEY[key] ||
    (RN_MONEY[key] = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }))
  );
}

// Currency symbol of Home Assistant's configured currency, for the editor's per-km cost unit.
export function rnCurrencySymbol(lang, cur) {
  try {
    var part = rnMoneyFormat(lang, cur).formatToParts(0).find((x) => x.type === 'currency');
    return part ? part.value : cur;
  } catch (_e) { return cur; }
}

export function rnRelative(lang, date) {
  var diff = (date.getTime() - Date.now()) / 1000;
  var abs = Math.abs(diff);
  var rtf = RN_RTF[lang] || (RN_RTF[lang] = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }));
  if (abs < 60) return rtf.format(Math.round(diff), 'second');
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  return rtf.format(Math.round(diff / 86400), 'day');
}

export function rnEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
