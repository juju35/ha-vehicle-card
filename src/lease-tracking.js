// ── Lease (LOA) tracking ─────────────────────────────────────────────────────
// lease: { start_date: 'YYYY-MM-DD', duration: months, km_per_year, start_mileage? }
export function rnLeaseDates(lease) {
  var m = String((lease?.start_date) || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  var months = Number(lease?.duration);
  if (!m || !(months > 0) || !(Number(lease.km_per_year) > 0)) return null;
  var y = Number(m[1]), mo = Number(m[2]) - 1, d = Number(m[3]);
  return { start: new Date(y, mo, d), end: rnAddMonths(new Date(y, mo, d), months), months: months };
}

// date + n months, kept in the target month: 31 January + 1 month is the last day of February,
// not 2 or 3 March (new Date(y, m + n, d) overflows into the next month).
export function rnAddMonths(date, n) {
  var y = date.getFullYear(), mo = date.getMonth() + n;
  return new Date(y, mo, Math.min(date.getDate(), new Date(y, mo + 1, 0).getDate()));
}

export var RN_DAY = 86400000;

// Text in a state colour: the pure warning / success / error colours of the default light theme are
// 1.5 to 3.4:1 on the card. Mixed with the text colour they reach 5 to 9:1 in light and dark themes;
// bars, gauges and chart lines keep the pure colour.
export var RN_WARN = 'var(--warning-color, #ffa600)';
export var RN_OK = 'var(--success-color, #43a047)';
export var RN_ERR = 'var(--error-color, #db4437)';
export function rnInk(color) {
  return `color-mix(in srgb, ${color} 40%, var(--primary-text-color, #212121))`;
}

// Odometer at time t from the daily statistics ([day start, odometer at the end of that day]).
export function rnOdoAt(points, t) {
  var hit = null;
  (points || []).forEach((p) => { if (p[0] + RN_DAY <= t + 3600000) hit = p; });
  return hit ? hit[1] : null;
}

// Status of the lease at time `now`. points: daily mileage statistics, used for the
// recent pace (forecast: 30 or 90 days) and the contract year figures.
export function rnLeaseStatus(lease, mileage, now, points) {
  var dates = rnLeaseDates(lease);
  if (!dates || mileage == null || Number.isNaN(mileage)) return null;
  // Lease entered before the delivery: nothing to track until it starts.
  if (now < dates.start.getTime()) return null;
  var kmYear = Number(lease.km_per_year);
  var allowed = kmYear * dates.months / 12;
  var startKm = Number(lease.start_mileage) || 0;
  var driven = Math.max(0, mileage - startKm);
  var total = (dates.end - dates.start) / RN_DAY;
  var elapsed = Math.max(0, Math.min(total, (now - dates.start) / RN_DAY));
  var left = total - elapsed;
  var ended = now >= dates.end;
  var expected = total ? allowed * elapsed / total : 0;

  // Daily rate: whole contract average, or the last 30 / 90 days from the statistics.
  // Below 30 days of contract the pace says little: no projection yet.
  var rate = elapsed >= 30 ? driven / elapsed : null, recent = false;
  var days = Number(lease.forecast);
  if ((days === 30 || days === 90) && elapsed >= days && points?.length) {
    var then = rnOdoAt(points, now - days * RN_DAY);
    if (then != null && mileage >= then) { rate = (mileage - then) / days; recent = true; }
  }
  var projected = ended ? driven : (rate != null ? driven + rate * left : null);

  // Contract year: runs from the start date, the last one ends with the lease.
  var at = (months) => rnAddMonths(dates.start, months);
  var y = 0;
  while (12 * (y + 1) < dates.months && now >= at(12 * (y + 1)).getTime()) y++;
  var ys = at(12 * y), ye = at(Math.min(12 * (y + 1), dates.months));
  var year = null;
  var yStartKm = y === 0 ? startKm : rnOdoAt(points, ys.getTime());
  if (yStartKm != null) {
    var yMonths = Math.min(12 * (y + 1), dates.months) - 12 * y;
    var yDriven = Math.max(0, mileage - yStartKm);
    var yLeft = Math.max(0, (ye - now) / RN_DAY);
    year = {
      index: y + 1, start: ys, end: ye, allowed: kmYear * yMonths / 12, driven: yDriven,
      projected: rate != null && !ended ? yDriven + rate * yLeft : null,
    };
  }
  var budget = !ended && left > 0 ? (allowed - driven) / (left / 30.44) : null;
  // This calendar month: the monthly allowance (prorated if the lease starts or ends in it)
  // minus the kilometres driven since the 1st, from the statistics.
  var nowD = new Date(now);
  var mStart = new Date(nowD.getFullYear(), nowD.getMonth(), 1).getTime();
  var mEnd = new Date(nowD.getFullYear(), nowD.getMonth() + 1, 1).getTime();
  var mFrom = Math.max(mStart, dates.start.getTime()), mTo = Math.min(mEnd, dates.end.getTime());
  var month = null;
  var mKm = mFrom === dates.start.getTime() ? startKm : rnOdoAt(points, mFrom);
  if (!ended && mKm != null && mFrom < mTo) {
    var quota = kmYear / 12 * (mTo - mFrom) / (mEnd - mStart);
    month = { allowed: quota, driven: Math.max(0, mileage - mKm), left: quota - Math.max(0, mileage - mKm) };
  }

  var state = 'ok';
  if (driven > allowed) state = 'over';
  else if (projected != null && projected > allowed) state = 'warn';
  var cost = Number(lease.extra_km_cost) || 0;
  var excess = state === 'over' ? (ended ? driven : Math.max(driven, projected || 0)) - allowed : state === 'warn' ? projected - allowed : 0;
  return {
    start: dates.start, end: dates.end, months: dates.months, allowed: allowed, startKm: startKm, driven: driven, ended: ended,
    expected: expected, deviation: driven - expected, elapsedRatio: total ? elapsed / total : 0,
    rate: rate, recent: recent, pace: rate != null ? rate * 365.25 : null, projected: projected, state: state,
    budget: budget, month: month, expectedOdo: startKm + expected, year: year, excess: excess, cost: cost && excess > 0 ? excess * cost : null,
    // Cost of the kilometres already over the allowance (the projected cost is `cost`).
    costNow: cost && state === 'over' ? (driven - allowed) * cost : null,
    monthsLeft: Math.max(0, Math.round(left / 30.44)),
    daysLeft: Math.max(0, Math.ceil(left)),
  };
}

// Colour of a level (%) from a severity option, null when it sets none. Either the gauge card's form,
// { green: 50, yellow: 20, red: 0 } (each colour from that level up, in the theme's success, warning and
// error colours), or a list [{ from: 50, color: '#4caf50' }, …] for any colours. Under the lowest
// threshold, the lowest colour.
export var RN_SEVERITY = [['green', RN_OK], ['yellow', RN_WARN], ['red', RN_ERR]];
export function rnSeverityColor(sev, pct) {
  var steps = [];
  var num = (v) => (v === '' || v == null || !Number.isFinite(Number(v)) ? null : Number(v));
  if (Array.isArray(sev)) {
    sev.forEach((x) => {
      var from = num(x?.from), color = String(x?.color || '').trim();
      // A colour name, #hex, rgb()/hsl() or var(): nothing that could leave the style attribute.
      if (from != null && /^[#\w\s(),.%-]+$/.test(color)) steps.push([from, color]);
    });
  } else if (sev && typeof sev === 'object') {
    RN_SEVERITY.forEach((k) => { var from = num(sev[k[0]]); if (from != null) steps.push([from, k[1]]); });
  }
  if (!steps.length || pct == null || Number.isNaN(pct)) return null;
  steps.sort((a, b) => b[0] - a[0]);
  var hit = steps.find((x) => pct >= x[0]);
  return (hit || steps[steps.length - 1])[1];
}
