# 🧭 Inspiration References: a Living System (not a bookmark list)

This is **not a gallery for "looking at nice things."** It is a **working process**: at the start of any design, Claude
**independently** goes to the top resources below, pulls ideas for the specific brief, and builds a **layout-spec** that drives the build.
The goal — even a 2–3 word description should yield an Awwwards-level result, **not a default/templated** one.

> **Golden rule (immutable):** we take the **vector** — the level, composition, rhythm, motion idea. We **never** copy
> the brand, colors, content, or the specific UI of an example. No two projects should look alike (Guide, section 0).
>
> **⚠️ A reference is visual only. The skeleton is ALWAYS per Guide section 2:** `<section>` + `section*` → `base-container` (2.2),
> naming + max 2 classes (2.3), converter-ready markup (2.7), no custom properties / longhand (2.8), components (2.10),
> footer/copyright (2.11). The layout idea from a reference is poured into **our** skeleton — we never carry over its classes/DOM/inline styles.

---

## ⛔ MANDATORY at the start of every design (reference-first)

Before building — **always**, even if the brief is short:

1. **Take 2–3 relevant references** from the resources below (matched to the product type / mood in the brief).
   - HTML-friendly (`WebFetch` reads them well): `reactbits.dev`, `minimal.gallery`, `land-book.com`.
   - Heavy JS / galleries (better to get a **screenshot + link** from the designer, or a description): `motionsites.ai`, `cosmos.so`,
     `mobbin.com`, `sceneai.art`, `landinghero.ai`, `superdesign.dev`, `a1.gallery`.
   - Code components (real implementations, not an image): `reactbits.dev`, **21st.dev (MCP)**.
2. **Extract a layout-spec** (template below) — this is the reference point.
3. **Build to the spec**, keeping individuality (own colors/fonts/content).
4. **Check the final** against the spec: level, rhythm, signature — all present? If it came out "like any template" — redo it.

If the designer **provides their own reference** (screenshot/link/prompt) — it takes priority over the library. The library is for when
there is no reference but the work must be at top level from the first move.

---

## 📚 Sources and what each is for

| Resource | Type | What I take from it |
|---|---|---|
| [motionsites.ai](https://motionsites.ai/) | gallery of animated sites | motion ideas, cinematic feel, rhythm of section reveals |
| [sceneai.art](https://sceneai.art/landing-pages?type=free&category=hero+section) | hero / landing patterns | hero structure, first-screen composition |
| [mobbin.com](https://mobbin.com/discover/apps/web/latest) | app UI flows | navigation, states, interface patterns |
| [21st.dev](https://21st.dev/) | **MCP**, code components | ready component/animation implementations (own key — see below) |
| [superdesign.dev](https://superdesign.dev/library) | landing styles | style direction, landing composition |
| [landinghero.ai](https://www.landinghero.ai/library) | landing library | landing section structure |
| [a1.gallery](https://www.a1.gallery/) | site gallery | level vector, atmosphere |
| [land-book.com](https://land-book.com/?search) | landing gallery | layout rhythm, type hierarchy |
| [reactbits.dev](https://reactbits.dev/) | React code components | real micro-interactions / animations |
| [cosmos.so](https://www.cosmos.so/) | visual mood-board | mood direction, art direction |
| [minimal.gallery](https://minimal.gallery/) | minimalist sites | cleanliness, whitespace, typography |

---

## 🧩 Layout-spec template (extracted from a reference for the brief)

```
Brief (a few words): …
References (2–3, noting exactly what I take): …

1. Hero composition   — type (full-bleed photo / split / text-dominant / 3D), what's in focus
2. Grid               — columns/asymmetry, base-container, whitespace
3. Section rhythm     — order, density shifts, dark/light blocks
4. Type hierarchy     — display↔body contrast, weight, letter-spacing
5. Motion             — what we animate, cinematic; hover = 350ms (section 2.9)
6. Signature element  — one bold move, everything else quiet
7. What we DON'T take — the example's brand/colors/content (vector only)
```

The resulting spec → a reference point, not a layout to copy.

---

## 🔑 21st.dev — your own key (each person generates their own)

The 21st key is **personal** (tied to the owner's account and quota). **Each designer generates their own** —
do not use someone else's (a shared key eats the owner's quota and breaks on regeneration).

1. Generate a key: `21st.dev → Settings → API Key`.
2. Add the MCP (substitute **your** key for `API_KEY_21ST`):

```bash
claude mcp add --transport http 21st https://21st.dev/api/mcp --header "x-api-key: API_KEY_21ST"
```

> ⚠️ Never commit a real key to git / to this guide. Keep it locally
> (`.claude/settings.local.json`, which is in `.gitignore`).
