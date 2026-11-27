import { getStore } from "@netlify/blobs";

// Review marks for daily boards, for the tester only (TESTER_KEY).
//   GET  /api/review?key=&month=2026-12             -> { words: {"3:icing": {s, note, at}}, days: {"3": true} }
//   POST { key, month, word: "3:icing", s: "ok"|"flag"|"", note }   -> mark one word
//   POST { key, month, day: 3, approve: true|false }                 -> approve a day for players (daily.mjs reads this)
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const MONTH = /^\d{4}-\d{2}$/, WORD = /^([1-9]|[12]\d|3[01]):[a-z0-9]{1,60}$/;
const isTester = (key) => !!(key && process.env.TESTER_KEY && key === process.env.TESTER_KEY);

export default async (req) => {
  const store = getStore({ name: "tangents-review", consistency: "strong" });
  if (req.method === "GET") {
    const url = new URL(req.url), month = url.searchParams.get("month") || "";
    if (!isTester(url.searchParams.get("key") || "")) return json({ error: "Not a tester key" }, 403);
    if (!MONTH.test(month)) return json({ error: "Bad month" }, 400);
    const words = (await store.get(`${month}/words`, { type: "json" })) || {};
    const days = ((await store.get(`${month}/days`, { type: "json" })) || {}).ok || {};
    return json({ words, days });
  }
  let body = {};
  try { body = await req.json(); } catch (e) { return json({ error: "Bad request" }, 400); }
  if (!isTester(String(body.key || ""))) return json({ error: "Not a tester key" }, 403);
  const month = String(body.month || "");
  if (!MONTH.test(month)) return json({ error: "Bad month" }, 400);
  if (body.day !== undefined) {
    const d = Number(body.day);
    if (!(d >= 1 && d <= 31)) return json({ error: "Bad day" }, 400);
    const v = (await store.get(`${month}/days`, { type: "json" })) || { ok: {} };
    if (body.approve) v.ok[d] = true; else delete v.ok[d];
    await store.setJSON(`${month}/days`, v);
    return json({ days: v.ok });
  }
  const word = String(body.word || "");
  if (!WORD.test(word)) return json({ error: "Bad word" }, 400);
  const s = ["ok", "flag", ""].includes(body.s) ? body.s : "";
  const note = String(body.note || "").slice(0, 500);
  const words = (await store.get(`${month}/words`, { type: "json" })) || {};
  if (!s && !note) delete words[word]; else words[word] = { s, note, at: Date.now() };
  await store.setJSON(`${month}/words`, words);
  return json({ words });
};

export const config = { path: "/api/review", method: ["GET", "POST"] };
