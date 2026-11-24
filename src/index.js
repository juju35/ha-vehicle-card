// Entry point: the card's modules in their original order. scripts/bundle.mjs concatenates them in this order into the
// single classic script the card ships as.
import "./card-picker.js";
import "./i18n/tables.js";
import "./i18n-helpers.js";
import "./entity-discovery.js";
import "./french-licence-plate.js";
import "./lease-tracking.js";
import "./renault-card.js";
import "./illustrated-header.js";
import "./renault-card-editor.js";
import "./renault-mini-card.js";
import "./core.js";
import "./renault-map-card.js";
