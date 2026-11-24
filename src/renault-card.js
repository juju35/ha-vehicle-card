// ── renault-card ─────────────────────────────────────────────────────────────
// The stat tiles the tiles option picks from (all of them when it is not set), with their editor label.
export var RN_TILES = [['battery_level', 'en_battery_level'], ['battery_autonomy', 'en_battery_autonomy'], ['fuel_autonomy', 'en_fuel_autonomy'],
  ['fuel', 'fuel_quantity'], ['mileage', 'en_mileage'], ['outside_temperature', 'outside_temperature'], ['tyres', 'tyres']];

// The pieces of the lease section the user can show or hide (every one shown when the option is not set), each with the
// translation key of its label: the folded figures (theoretical mileage, this month, monthly budget), the figures of the
// unfolded view (pace, projection, contract year) and the chart.
export var RN_LEASE_FIGS = [['target', 'lease_expected_lbl'], ['month', 'lease_month_lbl'], ['budget', 'lease_budget_lbl'],
  ['pace', 'lease_pace_lbl'], ['projection', 'lease_projection_lbl'], ['year', 'lease_year_lbl'], ['chart', 'lease_chart']];
