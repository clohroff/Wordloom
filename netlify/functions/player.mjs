// Solo progress that follows a player across devices.
// A player is a random 10-character link code; whoever holds the code holds the progress.
// Saving merges with what is stored (every found word kept, the higher hint level kept),
// so two devices saving close together never lose each other's finds.
import { getStore } from "@netlify/blobs";

const ID = /^[A-Z2-9]{10}$/;
const SPACE = /^\d{4}-\d{2}$/;   // a daily month, e.g. 2026-12; no space = the explore map
const WORD = /^[a-z]{1,40}$/;
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const clean = (state) => {
  const s = [...new Set((Array.isArray(state && state.s) ? state.s : []).map(String).filter((w) => WORD.test(w)))].slice(0, 5000);
  const h = {};
  const hs = (state && state.h) || {};
  Object.keys(hs).forEach((k) => { if (WORD.test(k)) h[k] = Math.max(0, Math.min(60, Number(hs[k]) || 0)); });
  /* daily only: d = days finished {day: {at, onDay, ms, hints}}, t = time spent on unfinished days {day: ms} */
  const d = {}, t = {};
  const num = (v, max) => Math.max(0, Math.min(max, Math.round(Number(v) || 0)));
  const ds = (state && state.d) || {}, ts = (state && state.t) || {};
  Object.keys(ds).forEach((k) => { if (/^([1-9]|[12]\d|3[01])$/.test(k) && ds[k]) d[k] = { at: num(ds[k].at, 9e15), onDay: !!ds[k].onDay, ms: num(ds[k].ms, 864e5 * 31), hints: num(ds[k].hints, 999) }; });
  Object.keys(ts).forEach((k) => { if (/^([1-9]|[12]\d|3[01])$/.test(k)) t[k] = num(ts[k], 864e5 * 31); });
  return { s, h, d, t };
};
const keyOf = (id, space) => (space ? `${id}~${space}` : id);

export default async (req) => {
  const store = getStore({ name: "wordloom-players", consistency: "strong" });
  const url = new URL(req.url);

  if (req.method === "GET") {
    const id = (url.searchParams.get("id") || "").toUpperCase();
    const space = url.searchParams.get("space") || "";
    if (!ID.test(id)) return json({ error: "Bad code" }, 400);
    if (space && !SPACE.test(space)) return json({ error: "Bad month" }, 400);
    const saved = await store.get(keyOf(id, space), { type: "json" });
    return json(clean(saved || {}));
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch (e) { return json({ error: "Bad request" }, 400); }
    const id = String(body.id || "").toUpperCase();
    const space = String(body.space || "");
    if (!ID.test(id)) return json({ error: "Bad code" }, 400);
    if (space && !SPACE.test(space)) return json({ error: "Bad month" }, 400);
    const key = keyOf(id, space);
    if (body.reset) {
      await store.setJSON(key, { s: [], h: {}, d: {}, t: {}, updated: Date.now() });
      return json({ s: [], h: {}, d: {}, t: {} });
    }
    const incoming = clean(body.state || {});
    const saved = clean((await store.get(key, { type: "json" })) || {});
    const merged = { s: [...new Set(saved.s.concat(incoming.s))], h: Object.assign({}, saved.h), d: Object.assign({}, saved.d), t: Object.assign({}, saved.t) };
    Object.keys(incoming.h).forEach((k) => { merged.h[k] = Math.max(merged.h[k] || 0, incoming.h[k]); });
    /* a day counts from the first device that finished it */
    Object.keys(incoming.d).forEach((k) => { if (!merged.d[k] || incoming.d[k].at < merged.d[k].at) merged.d[k] = incoming.d[k]; });
    Object.keys(incoming.t).forEach((k) => { merged.t[k] = Math.max(merged.t[k] || 0, incoming.t[k]); });
    await store.setJSON(key, Object.assign({ updated: Date.now() }, merged));
    return json(merged);
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config = { path: "/api/player", method: ["GET", "POST"] };
