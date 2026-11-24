// ── renault-mini-card ────────────────────────────────────────────────────────
// A click in a more-info or other dialog opened from the card is not "outside" it.
export function rnInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].indexOf(n.localName) >= 0);
}
