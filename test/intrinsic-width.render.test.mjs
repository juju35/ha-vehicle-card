// Rendered width of both cards in the containers Lovelace and custom layouts put them in (Chromium).
// Needs `npm run build` and the Playwright browser; skipped when the browser is missing, unless
// RENDER_TESTS=1 (CI, Screenshots workflow), where a missing browser is a failure.
// Run with: npm run build && node --test test/intrinsic-width.render.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { after, before, test } from "node:test";

const required = process.env.RENDER_TESTS === "1";
let browser;
let page;
let skip = false;

before(async () => {
  try {
    const { chromium } = await import("playwright");
    browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  } catch (e) {
    if (required) throw e;
    skip = `Chromium not available: ${String(e.message).split("\n")[0]}`;
    return;
  }
  page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  await page.setContent("<!doctype html><html><body style='margin:0;padding:16px;font-family:Arial'><div id='root'></div></body></html>");
  await page.addScriptTag({
    content: `customElements.define("ha-card", class extends HTMLElement { constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = "<style>:host{display:block;overflow:hidden}</style><slot></slot>"; } });
customElements.define("ha-icon", class extends HTMLElement { connectedCallback() { this.style.display = "inline-flex"; this.innerHTML = '<svg viewBox="0 0 24 24" style="width:24px;height:24px"><rect width="24" height="24"/></svg>'; } });`,
  });
  await page.addScriptTag({ content: readFileSync(new URL("../dist/vehicle-card.js", import.meta.url), "utf8") });
});

after(() => browser?.close());

// One or two cards in an outer container, each placed directly or inside a wrapper that keeps
// min-width: auto (a plain div, HA's hui-card, a column flex div): returns each card's width and how far
// the cards overflow the container.
const measure = (tag, kind, wrap, width) =>
  page.evaluate(
    ({ tag, kind, wrap, width }) => {
      const root = document.getElementById("root");
      root.innerHTML = "";
      const outer = document.createElement("div");
      outer.style.cssText = {
        "inline-block": "display:inline-block",
        "grid-auto": "display:grid;grid-template-columns:auto;justify-content:start",
        "grid-1fr-1fr": `display:grid;grid-template-columns:1fr 1fr;gap:8px;width:${width}px`,
        flex: `display:flex;gap:8px;width:${width}px`,
      }[kind];
      root.appendChild(outer);
      const cards = [];
      for (let i = 0; i < (width ? 2 : 1); i++) {
        const card = document.createElement(tag);
        card.setConfig(tag === "renault-card" ? { type: "custom:renault-card" } : { type: "custom:renault-map-card", title: "Renault", entities: [] });
        card.hass = { states: {}, entities: {}, devices: {}, language: "en", locale: { language: "en" }, themes: {}, config: {}, callService: async () => {}, callWS: async () => ({}) };
        let item = card;
        if (wrap !== "direct") {
          item = document.createElement(wrap === "hui-card" ? "hui-card" : "div");
          if (wrap === "column flex div") item.style.cssText = "display:flex;flex-direction:column";
          item.appendChild(card);
        }
        if (kind === "flex") item.style.flex = "1 1 0";
        outer.appendChild(item);
        cards.push(card);
      }
      return new Promise((resolve) =>
        setTimeout(() => {
          const boxes = cards.map((c) => c.shadowRoot.querySelector("ha-card").getBoundingClientRect());
          resolve({
            widths: boxes.map((b) => Math.round(b.width)),
            overflow: Math.round(Math.max(...boxes.map((b) => b.right)) - outer.getBoundingClientRect().right),
          });
        }, 100),
      );
    },
    { tag, kind, wrap, width },
  );

for (const tag of ["renault-card", "renault-map-card"]) {
  for (const wrap of ["direct", "div", "hui-card", "column flex div"]) {
    test(`${tag}, ${wrap}: 300 px in an auto-width container, its share without overflow in a 1fr grid or flex row`, async (t) => {
      if (skip) return t.skip(skip);
      for (const kind of ["inline-block", "grid-auto"]) {
        const { widths } = await measure(tag, kind, wrap);
        // About 300 px: not collapsed to its padding (26 px) or its title.
        assert.ok(widths[0] >= 280 && widths[0] <= 330, `${kind}: width ${widths[0]} px`);
      }
      for (const [kind, width] of [["grid-1fr-1fr", 320], ["grid-1fr-1fr", 360], ["grid-1fr-1fr", 500], ["flex", 320], ["flex", 500]]) {
        const { widths, overflow } = await measure(tag, kind, wrap, width);
        const share = (width - 8) / 2;
        assert.ok(overflow <= 0, `${kind} ${width} px: overflows by ${overflow} px (cards ${widths.join(" + ")} px)`);
        for (const w of widths) assert.ok(Math.abs(w - share) <= 1, `${kind} ${width} px: card ${w} px instead of ${share}`);
      }
    });
  }
}

// The status pill: its whole label from 245 to 500 px, right after a readable title (at most about half of the title
// row) or on its own line under the subtitle; the mini card's expand / collapse button 24 px, 5 px from the top
// right corner of the banner.
test("status pill shows its whole label next to a readable title; the zoom button sits at the banner corner", async (t) => {
  if (skip) return t.skip(skip);
  const failures = await page.evaluate(async () => {
    const frames = (n) => new Promise((r) => {
      const step = () => (n-- > 0 ? requestAnimationFrame(step) : r());
      step();
    });
    const reg = (id, key) => ({ entity_id: id, device_id: "d1", platform: "renault", translation_key: key });
    const out = [];
    const cases = [
      ["Captur", { "binary_sensor.car_charging": ["charging", "on"], "binary_sensor.car_plugged_in": ["plugged_in", "on"] }],
      ["A very long vehicle name for the family", { "binary_sensor.car_lock_status": ["lock_status", "on"] }],
      ["Espace", { "binary_sensor.car_lock_status": ["lock_status", "off"], "binary_sensor.car_hvac_status": ["hvac_status", "on"] }],
    ];
    for (const [name, ents] of cases) {
      const entities = { "sensor.car_battery_level": reg("sensor.car_battery_level", "battery_level") };
      const states = { "sensor.car_battery_level": { state: "80", attributes: { device_class: "battery" } } };
      for (const [id, [key, state]] of Object.entries(ents)) {
        entities[id] = reg(id, key);
        states[id] = { state, attributes: {} };
      }
      const hass = { entities, states, devices: { d1: { id: "d1", name, model: "Model" } }, language: "en", locale: { language: "en" }, themes: {}, config: {}, callService: async () => {}, callWS: async () => ({}) };
      for (const width of [245, 300, 400, 500]) {
        for (const [tag, zoom, illustration] of [["renault-card", false, true], ["renault-mini-card", false, true], ["renault-mini-card", true, true], ["renault-card", false, false]]) {
          const root = document.getElementById("root");
          root.innerHTML = "";
          root.style.width = `${width}px`;
          const card = document.createElement(tag);
          card.setConfig({ type: `custom:${tag}`, device_id: "d1", illustration });
          card.hass = hass;
          root.appendChild(card);
          await frames(2);
          if (zoom) card.shadowRoot.querySelector(".zoom").click();
          await frames(4);
          const r = card.shadowRoot;
          const tag2 = `${tag}${zoom ? " zoomed" : ""}${illustration ? "" : " classic"} ${width}px "${name}"`;
          const chip = r.querySelector(".bchip");
          if (!chip) {
            out.push(`${tag2}: no pill`);
            continue;
          }
          const text = chip.querySelector(".bchip-text");
          // Its whole label, or its dot alone (where it goes in every language: pill-layout.test.mjs).
          const cut = getComputedStyle(text).display !== "none" && text.scrollWidth > text.clientWidth + 0.5;
          if (cut) out.push(`${tag2}: label cut`);
          const nb = r.querySelector(".trow .name").getBoundingClientRect();
          if (nb.width < 24) out.push(`${tag2}: title ${Math.round(nb.width)}px`);
          const cb = chip.getBoundingClientRect();
          const onRow = Math.abs(cb.top + cb.height / 2 - (nb.top + nb.height / 2)) < 3;
          if (onRow && cb.left - nb.right > 10.5) out.push(`${tag2}: pill ${Math.round(cb.left - nb.right)}px after the title`);
          const banner = r.querySelector(".banner");
          if (banner) {
            const bb = banner.getBoundingClientRect();
            if (cb.right > bb.right - 4 || cb.bottom > bb.bottom - 10) out.push(`${tag2}: pill out of the banner`);
            if (tag === "renault-mini-card") {
              const zb = banner.querySelector(".zoom")?.getBoundingClientRect();
              if (!zb) out.push(`${tag2}: no zoom button`);
              else if (Math.round(zb.width) !== 24 || Math.round(zb.height) !== 24 || Math.round(zb.top - bb.top) !== 5 || Math.round(bb.right - zb.right) !== 5)
                out.push(`${tag2}: zoom ${Math.round(zb.width)}x${Math.round(zb.height)} at ${Math.round(zb.top - bb.top)}/${Math.round(bb.right - zb.right)}`);
            }
          }
        }
      }
    }
    return out;
  });
  assert.deepEqual(failures, []);
});

// A state update must not make the page jump: an update of another entity changes nothing in the card, and an update
// of one of its entities patches the existing nodes (the vehicle photo, the banner picture and its animations kept),
// the card keeping its height on every frame.
test("state updates patch the cards in place: no node replaced, the photo kept, a steady height", async (t) => {
  if (skip) return t.skip(skip);
  const result = await page.evaluate(async () => {
    const frames = (n) => new Promise((r) => {
      const step = () => (n-- > 0 ? requestAnimationFrame(step) : r());
      step();
    });
    const reg = (id, key) => ({ entity_id: id, device_id: "d1", platform: "renault", translation_key: key });
    const entities = {
      "sensor.car_battery_level": reg("sensor.car_battery_level", "battery_level"),
      "sensor.car_battery_autonomy": reg("sensor.car_battery_autonomy", "battery_autonomy"),
      "sensor.car_mileage": reg("sensor.car_mileage", "mileage"),
    };
    const states = {
      "sensor.car_battery_level": { state: "80", attributes: { device_class: "battery", unit_of_measurement: "%" } },
      "sensor.car_battery_autonomy": { state: "250", attributes: { unit_of_measurement: "km" } },
      "sensor.car_mileage": { state: "12000", attributes: { unit_of_measurement: "km" } },
    };
    // A 1x1 picture: the photo node must survive the updates.
    const image = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
    const out = {};
    for (const tag of ["renault-card", "renault-mini-card"]) {
      const root = document.getElementById("root");
      root.innerHTML = "";
      root.style.width = "400px";
      const card = document.createElement(tag);
      card.setConfig({ type: `custom:${tag}`, device_id: "d1", image });
      let hass = { entities, states, devices: { d1: { id: "d1", name: "Captur", model: "Model" } }, language: "en", locale: { language: "en" }, themes: {}, config: {}, callService: async () => {}, callWS: async () => ({}) };
      card.hass = hass;
      root.appendChild(card);
      await frames(4);
      const photo = card.shadowRoot.querySelector("img");
      const heights = new Set();
      let run = true;
      const tick = () => {
        if (!run) return;
        heights.add(Math.round(card.getBoundingClientRect().height));
        requestAnimationFrame(tick);
      };
      tick();
      const counts = { unrelated: 0, removed: 0 };
      let phase = "unrelated";
      const obs = new MutationObserver((recs) => {
        for (const r of recs) {
          if (phase === "unrelated") counts.unrelated += 1;
          else if (r.type === "childList") counts.removed += [...r.removedNodes].filter((n) => n.nodeType === 1).length;
        }
      });
      obs.observe(card.shadowRoot, { subtree: true, childList: true, attributes: true, characterData: true });
      for (let i = 0; i < 5; i++) {
        hass = { ...hass, states: { ...hass.states, "sensor.other": { state: String(i), attributes: {} } } };
        card.hass = hass;
        await frames(2);
      }
      phase = "relevant";
      for (let i = 0; i < 5; i++) {
        const level = { ...hass.states["sensor.car_battery_level"], state: String(79 - i) };
        hass = { ...hass, states: { ...hass.states, "sensor.car_battery_level": level } };
        card.hass = hass;
        await frames(2);
      }
      run = false;
      obs.disconnect();
      out[tag] = { ...counts, photoKept: card.shadowRoot.querySelector("img") === photo && !!photo, heights: [...heights] };
    }
    return out;
  });
  for (const [tag, r] of Object.entries(result)) {
    assert.equal(r.unrelated, 0, `${tag}: an update of another entity changed the card`);
    assert.equal(r.removed, 0, `${tag}: a battery update replaced nodes`);
    assert.ok(r.photoKept, `${tag}: the photo was created again`);
    assert.equal(r.heights.length, 1, `${tag}: the height changed (${r.heights.join(", ")} px)`);
  }
});
