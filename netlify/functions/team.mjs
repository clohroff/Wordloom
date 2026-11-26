// Team progress for Tangents.
// Every find is its own key: CODE/f/<word>/<finder name>, every hint: CODE/h/<word>/<tier>.
// Writes never touch another player's key, so simultaneous finds can't overwrite each other,
// and one prefix listing returns a whole team's state without reading any values.
import { getStore } from "@netlify/blobs";

const CODE = /^[A-Z]{4}$/;
const WORD = /^[a-z]{1,40}$/;
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const store = getStore({ name: "wordloom-teams", consistency: "strong" });
  const url = new URL(req.url);

  if (req.method === "GET") {
    const code = (url.searchParams.get("code") || "").toUpperCase();
    if (!CODE.test(code)) return json({ error: "Team codes are 4 letters" }, 400);
    const { blobs } = await store.list({ prefix: code + "/" });
    const found = {}, hints = {};
    for (const b of blobs) {
      const [, kind, word, extra] = b.key.split("/");
      if (!WORD.test(word || "")) continue;
      if (kind === "f" && !(word in found)) {
        let name = "";
        try { name = decodeURIComponent(extra || ""); } catch (e) {}
        found[word] = name;
      }
      if (kind === "h") hints[word] = Math.max(hints[word] || 0, Math.min(60, Number(extra) || 0));
    }
    return json({ found, hints });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch (e) { return json({ error: "Bad request" }, 400); }
    const code = String(body.code || "").toUpperCase();
    const word = String(body.word || "").toLowerCase();
    if (!CODE.test(code) || !WORD.test(word)) return json({ error: "Bad team code or word" }, 400);
    if (body.type === "found") {
      const name = String(body.name || "").replace(/[^\p{L}\p{N} .'-]/gu, "").trim().slice(0, 20) || "Someone";
      await store.set(`${code}/f/${word}/${encodeURIComponent(name)}`, String(Date.now()));
      return json({ ok: true });
    }
    if (body.type === "hint") {
      const tier = Math.min(60, Math.max(1, Number(body.tier) || 1));
      await store.set(`${code}/h/${word}/${tier}`, String(Date.now()));
      return json({ ok: true });
    }
    return json({ error: "Unknown type" }, 400);
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config = { path: "/api/team", method: ["GET", "POST"] };
