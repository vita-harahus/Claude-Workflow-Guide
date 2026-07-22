# Claude Code Workflow Guide

**v2.0 · for the team.** This document describes the full designer workflow in Claude Code: from setting up
the environment to finished pages and handoff to development.

The document is split into three parts:

| Part | For whom | Content |
|---|---|---|
| **I. For the designer** | 🧑‍🎨 designer | Step-by-step process — what to do by hand, from zero to pages. |
| **II. Rules for Claude** | 🤖 Claude | Design system that is placed in `CLAUDE.md` and applied automatically. |
| **III. Webflow export** | 🧑‍🎨 + 🤖 | Rules and sequence for handing the project over to Webflow. |

---

# Part I. For the designer — step-by-step process

Actions the designer performs on their own. Each step is a separate, complete operation.

### Step 1. Installation (one-time)

Work is done in the **Claude Code desktop app** or in the terminal. The web version works only with a
GitHub repository in the cloud — not with a local folder on your computer.

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 2. Project folder and client materials

Create a project folder on your computer and put **all incoming materials** into it: the brief, references,
logo, fonts, images, brand guidelines and — if available — a ready design system.

```bash
mkdir ~/Desktop/nero-run        # → move all client materials into the folder
```

### Step 3. Sync with Claude Code

Open the folder in the app (or in the terminal). It becomes the working directory of the session, and Claude
gets access to all the materials.

```bash
cd ~/Desktop/nero-run && claude
```

### Step 4. Design system — one of two paths

- **Load an existing one** — put the client's design-system files into the folder; Claude works from them.
- **Create from scratch** — Claude builds the design system per the rules in Part II. The first page assembled
  is the **Style Guide** (colors, type scale, buttons, links, cards) — this confirms the system is applied.

### Step 5. Local preview (localhost)

As soon as the first pages appear, a local server is started — the result is seen live in the browser, with
real images and animations. For this the designer installs **two skills**:

- **`local-preview`** — starts a local HTTP server and serves the address `http://localhost:<port>` (first
  run; works on static `.html/.css/.js`).
- **`localhost-up`** — (re)starts the server when localhost goes down, stops, or after a session restart.

### Step 6. Building pages section by section

Work is done with code, not with screenshots. Point edits touch only the requested element. Images are pulled
from real photo stocks via API (Pexels / Unsplash).

### Step 7. Components

Repeating blocks (navbar, footer, cards, CTA) are declared a **master element** once — after that any change
propagates to all instances on all pages. Details — Part II, section "Components".

### Step 8. Responsiveness

All **7 breakpoints** are checked (1920 / 1440 / 1280 / 992 / 768 / 568 / 360); 0 console errors.

### Step 9. Handoff to development

When needed, the project is handed over to Webflow — the sequence and rules are described in **Part III**.

> **Key condition.** A `CLAUDE.md` file with the Part II rules sits in the root of the folder. Claude reads it
> at the start of the session and follows the rules automatically.

---

# Part II. Rules for Claude

Claude applies these rules on its own (they are placed in `CLAUDE.md`). The designer only provides the inputs —
fonts, colors, components — and does not perform these items by hand.

## 🌐 Site language → always English

The entire site is built in **English**, **even if the request is written in Ukrainian** (or any other
language). All content that ends up in the layout — headings, body copy, buttons, labels, navigation, alt
text, meta — is written in English. The designer may talk to Claude in any language; the **output on the page**
is always English. If the designer explicitly wants another language for the site content, that is a conscious
exception and must be stated directly.

## 🛑 Guardrail: Claude pushes back, it does not execute anything blindly

Claude is not a passive executor but a **taste editor**. If the designer's request violates a rule from this
part or is a clear anti-pattern, Claude **does not do it silently**. Instead it is obligated to:

1. **Stop** — do not start the implementation.
2. **Say plainly that it shouldn't be done this way** — briefly, in one or two sentences, why it harms the design.
3. **Ask again and wait for confirmation** — "are you sure you want it exactly like this?". Proceed only after
   the designer's conscious confirmation.

Example: the request "make a site with 4 different font families" → Claude does NOT build it right away. It
replies that more than 2–3 fonts break consistency and readability, and asks whether the designer really wants
this. The same applies to any violation: too many accent colors, unreadable contrast, excessive animation,
decoration without function, deviation from the grid/breakpoints, and so on.

The goal is to keep a weak decision from landing in the layout "on autopilot". The final word is always the
designer's, but **consciously**, not by default.

## ⛔ Mandatory: no AI defaults, Awwwards level

The design system below is a **technical markup skeleton**, not a visual recipe. Visually, every project must
be **unique and creative, at the level of Awwwards work**.

**By default, typical AI elements are not used:**
- ❌ Eyebrow subtitle with a dot (`• LABEL`) above sections — only at the designer's direct request.
- ❌ Numbers `01/02/03` when the content is not a real sequence.
- ❌ The templated hero "big number + label + gradient".
- ❌ Stock AI palettes (cream + serif + terracotta; black background + acid accent; "newspaper" hairline
  layout) — absent a corresponding brief requirement.
- ❌ Excessive animation, symmetric same-type blocks, decoration without function.

**Instead the following principles apply:** the hero states the key point (the most characteristic thing in the
product's field); typography forms the character of the page; structural elements encode content rather than
decorate it; one expressive **signature element**, the rest of the styling restrained; conscious creative risk;
a baseline level of quality (responsiveness, visible keyboard focus, `prefers-reduced-motion` support). Before
building, a short plan is drafted (palette, fonts, layout, signature) and checked against the brief: a default
solution that would fit any similar page is reworked.

## Breakpoints

| Breakpoint | Range | Direction |
|---|---|---|
| **Base** (default) | 992–1279 | base styles, cascade ↑↓ |
| Large / XL / XXL | 1280–1439 / 1440–1919 / 1920+ | ↑ up |
| Medium / Small / Tiny | 768–991 / 568–767 / 360–567 | ↓ down |

Styles set on Base cascade both up and down. **An override is applied only where the value differs from Base.**
All points are subject to checking: **1920 / 1440 / 1280 / 992 / 768 / 568 / 360**.

## Section structure (single for all pages)

```html
<section class="section section-name">
  <div class="base-container">
    <div class="section-head">
      <!-- eyebrow — only on the designer's request, not by default -->
      <h2 class="heading-spacer-top">Section Title</h2>
      <p class="lead">Supporting description.</p>
    </div>
    <!-- section content -->
  </div>
</section>
```

- A section = `<section>` + `section` + a subclass (`section trust`). Content is placed in `base-container`.
- **`base-container`:** `max-width` is defined by the designer per project (placed in a variable, single for
  all), `margin: auto`, `width: 100%`, `padding: 0 15px`.
- **Section padding is set only via `section` / `section-top` / `section-bot`** (scale below), not on the
  section's own class.
- Dark sections: the background is set on the section class; child elements get the `on-dark` class.

**Section Padding (the section's first class):**

| Class | Base | 1280+ | 768–991 | ≤767 |
|---|---|---|---|---|
| `section` | 100px 0 | 130px 0 | 80px 0 | 60px 0 |
| `section-top` | 100px 0 0 | 130px 0 0 | 80px 0 0 | 60px 0 0 |
| `section-bot` | 0 0 100px | 0 0 130px | 0 0 80px | 0 0 60px |

## Class naming

- **lowercase-hyphen**, section prefix: `trust-head`, `approach-title`, `foot-grid`.
- **Maximum 2 classes**: structural + modifier (`btn btn-primary`, `eyebrow on-dark`).
- Modifiers without a prefix (`on-dark`, `on-light`, `high`); states — `is-*`; CMS markers — `field-*` (removed
  after binding).
- **Every element has its own class; descendant selectors are not used** (✅ `.approach-title`
  ❌ `.trust-head h2`). Inline styles are not applied.

Key utilities: `on-dark`/`on-light`, `base-container`, `heading-spacer-top` (mt 22px), `small-spacer-top`
(mt 10px), `link-reset`, `relative` (z-index stack), `high` (accent in a heading).

## Colors

**Values differ in each project** (those below are an example). What stays constant is the **system**: correct
role names (Accent, Ink, Muted, Line Light…), unification (one color — one variable), **contrast checked per
WCAG** (≥4.5:1 for body text, ≥3:1 for large headings/UI) on real combinations.

Example roles: `Accent #0162ff` · `Accent Light #eaf1ff` · `Accent Dark #0148bf` · `White #fff` ·
`Off White #FAFAF9` · `Ink #111` · `Muted rgba(17,17,17,.62)` · `Line Light rgba(17,17,17,.10)` ·
`Line Dark rgba(255,255,255,.16)`.

## Typography

**Fonts are defined by the designer per project.** Mandatory rules:
- **Maximum 2 fonts** (ideal); **3 — the ceiling, only with justification**; **4 or more — forbidden**. On a
  request for 3+ fonts Claude stops, says it harms consistency and readability, and **asks the designer whether
  they are sure** (see "🛑 Guardrail" above) — and continues only after confirmation.
- **Priority — Google Fonts.** For fonts outside Google Fonts, the web-embed license is checked first or agreed
  with the designer; self-installation is not allowed.
- Roles: **Primary — headings H1–H6, logo, decor**; **Secondary — body text, UI, navigation, footer**.
- **Buttons/links** — at the designer's discretion; by default **Secondary** is recommended (better
  readability at small sizes and in interaction).

Scales (example): body text XXS 14 → XXL 24px; weights 300–800; line-height 1em→1.55; letter-spacing
−1.5→0px.

## Spacing / Radius

Spacing is set with variables that have per-breakpoint modes; text margin is bound to the variable **Spacing
None (=0)**. Radius: XS 4 (tags) · S 6 (inputs) · M 8 (cards) · L 10 (panels) · XL 100px (pills — buttons/badges).

## Buttons, links and markup

**The set of buttons and links is defined by the designer per UI**; what stays constant is the system:
- Base `.btn` + one variant, maximum 2 classes.
- **Buttons are always built as `<a>`** (not `<button>`); icon and text as separate direct child elements; for
  toggles `e.preventDefault()` is used.
- **Links are not used without a class**: a class is assigned by purpose (`more`, `explore`, `link-reset`,
  `card-link`, `foot-link`).
- **All spacing is set via flex/grid containers** (`grid-row-gap`/`grid-column-gap` on the parent element),
  **not** on the texts, links or `<p>` themselves. A text element carries no spacing of its own.

## ⛔ Components — a single master element

If the designer defines an element as a **Component** (navbar, footer, card, button, CTA…), it is a **single
master element**, identical on all pages:
- The element is declared a master element; **all** its usage locations are registered.
- **A change in one place automatically propagates to all instances** on all pages. Manual duplication across
  pages is not used.
- Full identity (markup, classes, content, styles, states); only what is consciously exposed to a
  prop/variant may differ.
- **Before any edit to an element, check whether it is a component**; if so, changes are made to the master
  element and propagate to all instances, not pointwise on a single page.

---

# Part III. Webflow export

Applies **only when handing the project over to Webflow**. These rules ensure a correct and clean export of
markup, classes, variables and CMS.

## ⚠️ No Custom properties (the key condition for a correct export)

After handoff the **Custom properties panel must stay empty**. For this:
- **CSS is set only in longhand form** (border/padding/margin sides separately, four radii separately,
  `background-color`/`background-image` separately).
- **`grid-row-gap`/`grid-column-gap` is used; the `gap` property is not applied.**
- **Gradient/grid backgrounds** (`linear-gradient` + `background-size`) are moved to the **Site Head Code**,
  not set on a class.
- Custom properties on classes are not used.

## Animations — via attributes (handled by IX2/GSAP)

- `data-load="fade-in"` — elements above the fold (hero, navbar), appear on load.
- `data-scroll="fade-in"` — each section, appears on scroll.
- `data-scroll="fade-in-item"` — content blocks inside (cards, columns, heading wrap; grids — per-card/stagger).
  Not applied to: sections, containers, decor, "bare" headings, deep nodes.

## Handoff via the builder extension

Breakpoints (7) and Variables (colors, fonts, spacing, radius) are configured in Webflow before building
starts. Components correspond to **Symbols/Components** (navbar/footer stay as a Symbol).

CMS flow sequence: **Annotate** (`field-[slug]`) → **Build + Apply** → collection name + slug → **Scan Fields**
→ field types (Plain/Rich/Image) → **Create Schema** → **Load Items** → **Push Items** → **Bind Fields** →
**Remove Markers**.

**Not restorable via API** (done manually in Designer): binding a CMS List to a Source; mega-menu/dropdowns;
gradient backgrounds (moved to Site Head Code); real Input/Form. During handoff variables are bound: colors by
value, sizes ±1px with group separation (font-size → Typography, spacing → Spacing).

---

# Final checklist

- [ ] **⛔ Uniqueness:** Awwwards-level design, no AI defaults (eyebrow — only on request); a signature element present.
- [ ] **⛔ Components:** declared as a master element, identical on all pages, a change propagates to all instances.
- [ ] **🌐 Language:** all page content is in English.
- [ ] Render matches the layout; 0 console errors; all 7 breakpoints checked.
- [ ] Sections = `<section>` + `section*`; content in `base-container`; maximum 2 classes.
- [ ] Buttons = `<a>` with a class; text without its own margin/padding — spacing via flex/grid on wrappers.
- [ ] **(Webflow export)** Custom properties empty; CSS in longhand; `grid-*-gap` instead of `gap`; no descendant selectors.
- [ ] **(Webflow export)** Animation attributes placed; gradients/grids moved to Head Code.
- [ ] **(Webflow export)** Handoff console regenerated from the working file; the current extension package handed over.
