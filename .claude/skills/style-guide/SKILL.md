---
name: style-guide
description: Generate a complete, self-documenting Style Guide page from a project's OWN design system. Use PROACTIVELY whenever the user asks to build/create/update a "style guide", "styleguide", "design system page", "UI kit", "pattern library", or "component reference", or says things like "винеси всі кнопки і лінки", "зроби стайл гайд", "покажи типографіку по брейкпоінтах", "збери дизайн-систему на сторінку". Produces a standalone styleguide.html documenting colours, adaptive typography, buttons, links, forms, spacing, radius and components. The output is unique to each project — it reads the project's actual tokens and never copies another brand's look.
---

# Style Guide generator

Build a single, self-documenting **Style Guide page** (`styleguide.html`) that is the source of truth for the
current project's design system. It is generated from **this project's own tokens** — never a fixed template
and never another project's appearance.

## Golden rule — individuality

The style guide reflects **only the project you are working in**. Read the real design system first; do not
carry colours, fonts, component looks, or class names from any other project or example. Two projects' style
guides must never look like siblings. If the project has no system yet, derive one from the brief/brand and
state the assumptions at the top.

## Step 1 — Gather the real tokens

Before writing anything, collect the project's actual values:

1. **Colours** — every CSS custom property / repeated colour. Group by role (accent, ink/text tiers, surfaces,
   lines, status). One colour = one role = one variable. Note each role's usage.
2. **Typography** — the font family/stack; the type scale actually used (display → caption); the weights,
   line-heights and letter-spacing; and how sizes **adapt per breakpoint** (fixed vs `clamp()`/media queries).
3. **Buttons** — every variant (primary/secondary/ghost/…) and size, plus hover/disabled states, on light AND
   dark surfaces.
4. **Links** — every purpose class (nav, section, inline, footer, CTA…) and its hover treatment.
5. **Forms** — inputs, search, focus ring.
6. **Spacing & radius** — the spacing steps and the radius scale; section padding per breakpoint if defined.
7. **Components** — recurring blocks (badges, cards, price, swatches, feature/value rows, etc.).

If the project already has pages, extract these from the CSS. If it has a design-system file, read it. Reuse
the project's real class names and variable names in the guide.

## Step 2 — Build the page

Create `styleguide.html` as a **standalone** file (inline `<style>`, no external deps) that both *documents*
and *demonstrates* each token — every specimen is the live element, not a screenshot.

Structure (adapt section list to what the project actually has):

1. Sticky top bar with in-page anchor nav + a "Style Guide" label.
2. Page title **"Style Guide"** and a one-line description.
3. **Colour** — swatch cards: chip + role name + value + usage. Group brand/accent, text tiers, surfaces/lines.
4. **Typography** — the family/stack; live specimens for each scale step (with its size/lh/ls/weight); a
   **"Adaptive sizes per breakpoint" table** (columns e.g. Mobile 360 / Tablet 768 / Laptop 1280 / Desktop
   1440+, plus the `clamp()`/rule); a weights row; a metrics line.
5. **Buttons** — all variants on a light panel and on a dark panel; sizes; states (default/hover/disabled);
   the markup rule the project follows.
6. **Links** — one row per purpose class, showing the live link + a note on its behaviour.
7. **Forms** — field + button, search, visible focus ring.
8. **Spacing & Radius** — section-padding table (per breakpoint) if defined; spacing-step bars; radius boxes.
9. **Components** — badges, price, swatches, card, feature/value row — assembled from the tokens above.

Use the project's own `:root` variables at the top of the guide so the whole page updates if a token changes.

## Step 3 — Quality bar

- Match the **project's** aesthetic and level (Awwwards-grade if that's the project's bar) — no generic
  AI-default look.
- Fully responsive; the guide itself obeys the project's breakpoints; wide tables scroll inside their own
  container so the page never scrolls horizontally.
- Accessible: WCAG-checked colour pairings, visible keyboard focus, meaningful labels.
- Keep the file self-contained and ASCII-safe (use HTML entities like `&mdash;`, `&rarr;`, `&le;` instead of
  raw non-ASCII) so it deploys cleanly anywhere.
- After creating it, offer to preview it locally (see the localhost preview skill) and/or deploy it.

## Notes

- Name the page and its `<title>` simply **"Style Guide"**.
- Do not invent brand names; use the project's real name only if it already exists in the project.
- If asked, keep the guide in sync: when a token changes in the project, update the corresponding specimen.
