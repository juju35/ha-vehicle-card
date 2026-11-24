// One file per language; scripts/bundle.mjs inlines them back into a single object literal at build, which
// scripts/i18n-split.mjs then splits per language (English stays in the bundle).
import fr from "./fr.js";
import en from "./en.js";
import de from "./de.js";
import es from "./es.js";
import sr from "./sr.js";
import srLatn from "./sr-Latn.js";
import it from "./it.js";
import nl from "./nl.js";
import pt from "./pt.js";
import pl from "./pl.js";
import ro from "./ro.js";
import da from "./da.js";
import sv from "./sv.js";
import bg from "./bg.js";
import ru from "./ru.js";
import uk from "./uk.js";
import hu from "./hu.js";
import sk from "./sk.js";
import cs from "./cs.js";
import sl from "./sl.js";
import lv from "./lv.js";
import el from "./el.js";

export var RnI18n = {
  fr: fr.RnI18n,
  en: en.RnI18n,
  de: de.RnI18n,
  es: es.RnI18n,
  sr: sr.RnI18n,
  "sr-Latn": srLatn.RnI18n,
  it: it.RnI18n,
  nl: nl.RnI18n,
  pt: pt.RnI18n,
  pl: pl.RnI18n,
  ro: ro.RnI18n,
  da: da.RnI18n,
  sv: sv.RnI18n,
  bg: bg.RnI18n,
  ru: ru.RnI18n,
  uk: uk.RnI18n,
  hu: hu.RnI18n,
  sk: sk.RnI18n,
  cs: cs.RnI18n,
  sl: sl.RnI18n,
  lv: lv.RnI18n,
  el: el.RnI18n,
};

export var RnMapI18n = {
  fr: fr.RnMapI18n,
  en: en.RnMapI18n,
  de: de.RnMapI18n,
  es: es.RnMapI18n,
  sr: sr.RnMapI18n,
  "sr-Latn": srLatn.RnMapI18n,
  it: it.RnMapI18n,
  nl: nl.RnMapI18n,
  pt: pt.RnMapI18n,
  pl: pl.RnMapI18n,
  ro: ro.RnMapI18n,
  da: da.RnMapI18n,
  sv: sv.RnMapI18n,
  bg: bg.RnMapI18n,
  ru: ru.RnMapI18n,
  uk: uk.RnMapI18n,
  hu: hu.RnMapI18n,
  sk: sk.RnMapI18n,
  cs: cs.RnMapI18n,
  sl: sl.RnMapI18n,
  lv: lv.RnMapI18n,
  el: el.RnMapI18n,
};
