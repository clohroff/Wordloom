// Solo progress that follows a player across devices.
// A player is a random 10-character link code; whoever holds the code holds the progress.
// Saving merges with what is stored (every found word kept, the higher hint level kept),
// so two devices saving close together never lose each other's finds.
import { getStore } from "@netlify/blobs";

const ID = /^[A-Z2-9]{10}$/;
const WORD = /^[a-z]{1,40}$/;
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const clean = (state) => {
  const s = [...new Set((Array.isArray(state && state.s) ? state.s : []).map(String).filter((w) => WORD.test(w)))].slice(0, 5000);
  const h = {};
  const hs = (state && state.h) || {};
  Object.keys(hs).forEach((k) => { if (WORD.test(k)) h[k] = Math.max(0, Math.min(60, Number(hs[k]) || 0)); });
  return { s, h };
};

export default async (req) => {
  const store = getStore({ name: "wordloom-players", consistency: "strong" });
  const url = new URL(req.url);

  if (req.method === "GET") {
    const id = (url.searchParams.get("id") || "").toUpperCase();
    if (!ID.test(id)) return json({ error: "Bad code" }, 400);
    const saved = await store.get(id, { type: "json" });
    return json(clean(saved || {}));
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch (e) { return json({ error: "Bad request" }, 400); }
    const id = String(body.id || "").toUpperCase();
    if (!ID.test(id)) return json({ error: "Bad code" }, 400);
    if (body.reset) {
      await store.setJSON(id, { s: [], h: {}, updated: Date.now() });
      return json({ s: [], h: {} });
    }
    const incoming = clean(body.state || {});
    const saved = clean((await store.get(id, { type: "json" })) || {});
    const merged = { s: [...new Set(saved.s.concat(incoming.s))], h: Object.assign({}, saved.h) };
    Object.keys(incoming.h).forEach((k) => { merged.h[k] = Math.max(merged.h[k] || 0, incoming.h[k]); });
    await store.setJSON(id, Object.assign({ updated: Date.now() }, merged));
    return json(merged);
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config = { path: "/api/player", method: ["GET", "POST"] };
