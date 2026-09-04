---
name: hub-design-system
description: Apply the hub house style ("Skumring" — a dusk sky of pastel glazes under tonal glass, one seed per app) — colours, typography, spacing, layout, components, node canvases and UI copy. Use when starting a new UI, or working in a project that has no design system of its own. In a project that already has one, this skill DEFERS to it and only supplies the parts it lacks — see the precedence rule first. Also use for its portable half: layout archetypes, accessibility floor, UI copy rules, and the generated-design tells to avoid.
---

# hub design system

The visual identity shared by every hub app. Its job is consistency across
projects and a look that reads as one studio's work rather than one model's
default.

## Precedence — read this before applying anything

Order, highest first:

1. **What the user asked for**, in their own words.
2. **The project's own design system**, if it has one.
3. **This skill.**

**Check for an existing system before writing a line of CSS.** It is there if
any of these are:

- a token block in the project's stylesheet (`:root { --... }`), a
  `tokens.*`/`theme.*` file, or a Tailwind theme config
- design guidance in `CLAUDE.md` / `AGENTS.md`
- a design reference file kept in the repo
- a project-specific design agent under `.claude/agents/`

If one exists, **it wins.** Do not introduce `--hub-*` tokens, do not
re-palette, do not change its radius or its typeface. A project that has
thought about its own look has usually thought about it *for that app* — a dark
instrument-panel palette for a pipeline tool beats a pale one, and that is a
better decision than consistency with a sibling app.

Adopt this identity wholesale only when the project has no system, or when the
user asks for it by name.

## What still applies when a project has its own system

The visual half does not travel. The rest does, because none of it names a
colour:

- **Layout** — the three page archetypes, one scroll container, the sticky
  budget, two densities, placement. Shapes, not colours.
- **Writing** — `references/writing.md`, all of it.
- **Accessibility floor** — visible focus, native elements over rebuilt ones,
  state readable without colour, reduced motion honoured.
- **Tells to avoid** — the table near the end of this file.
- **Behaviour** — one primary action per view, dismissible overlays, warnings
  that do not time out, motion only in answer to an action.

Express these through *that project's* tokens, never ours.

## Applying the identity

When this skill does own the look: **load `references/tokens.css` and style
from those custom properties. Never hard-code a hex.** If a value you need has
no token, that is a design decision: add the token, don't inline the value.

Three things `tokens.css` does for you, so do not redo them:

- **The sky.** `body` gets the dusk field. Do not paint another background on
  the page, and do not put a gradient on anything else.
- **The seed.** Set `data-seed` on `<html>` — `glacier` (default), `rye`,
  `dusk`, `lichen` or `rhubarb`. One per app, chosen once. It reorders the sky
  and touches nothing else.
- **Glass.** Every surface token is translucent. A surface needs
  `backdrop-filter: var(--hub-glass)` to read as glass; the component recipes
  include it.

## The argument

Danish design runs an argument with itself. Kaare Klint measured furniture
against the human body and built systems from it — proportion, modules,
restraint. Verner Panton answered with saturated orange rooms and moulded
plastic. Both are Nordic; only one is the postcard.

**Klint by default, Panton on purpose.** Rigour holds the structure; voltage is
rationed to the places where it changes what someone does.

**Skumring** — Danish for dusk — is where the Panton went. The page ground is a
Nordic dusk sky built from the glazes: cold glacier leading, lilac, rhubarb, a
warm rye horizon; at night it goes aurora-green, not violet. Everything on it is
tonal glass that takes the sky's hue. Saturation lives in the ground and quiet
lives in the surfaces, so the pastels do the work instead of sitting in a
swatch table.

## Six rules

1. **Colour lives in the sky; voltage on surfaces stays under five percent.**
   The ground carries the atmosphere. On top of it, Skagen and flare are
   current, not paint: primary buttons, one live edge, a focus ring, the single
   number that matters. If a surface feels loud, measure its coloured area —
   the sky does not count.
2. **Elevation is tone, not shadow.** Five surface levels, each a step more
   opaque. A raised thing is a higher level; a dialog is the highest. There
   are no drop shadows anywhere, and the only gradient on the page is the sky.
3. **Lines mean connection.** A rule, border or edge asserts that two things
   relate. Nothing is drawn to fill space.
4. **One family, weight does the work.** Schibsted Grotesk carries everything.
   No second display face. A heading needing presence gets more weight or
   tighter tracking, never a different typeface.
5. **Radius is a role, not a habit.** 10px controls, 20px plates, 28px for
   the one tile that leads a page, pills for status only. One radius on
   everything flattens hierarchy. Radius also sets
   register: a full stadium pill reads as a consumer tag, so in an instrument
   or pipeline UI where every status is a machine state, square the status
   marker to `--hub-radius-control` instead.
6. **Semantic colour is separate.** Success, warning and danger own their
   tokens. The accent never stands in for state, and state never borrows the
   accent.

## Colour

The ground is the **sky**: five radial stops of glaze over porcelain by day
(`#F2F5F1`) and over spruce-black by night (`#0C1614`). `--hub-sky-1` leads at
top-left, `-2` right, `-3` low-right, `-4` is the horizon, `-5` a centre haze.
Never cream. Ink is spruce, a green-black rather than a tinted grey.

Surfaces are **tonal glass** — white at five opacities by day, frost at five by
night — and they need `backdrop-filter: var(--hub-glass)`:

| Level | Token | Day | Night | For |
|---|---|---|---|---|
| lowest | `--hub-color-surface-lowest` | white 22% | white 3% | nav, sunken fields |
| low | `--hub-color-surface-low` | 40% | 6% | the app bar, flat lists |
| surface | `--hub-color-surface` | 58% | 9% | plates — the default |
| high | `--hub-color-surface-high` | 78% | 14% | inputs, chips, nodes, ghost buttons |
| highest | `--hub-color-surface-highest` | 94% | spruce 92% | dialogs, toasts, overlays |

| Role | Token | Day | Night |
|---|---|---|---|
| lit edge of glass | `--hub-edge` | white 55% | white 12% |
| hairline | `--hub-color-line` | spruce 10% | frost 10% |
| ink | `--hub-color-ink` | `#132420` | `#EAF0EA` |
| action (Skagen) — fills, indicators, edges | `--hub-color-action` | `#0F6C86` | `#5FD0DC` |
| action as text — links, quiet buttons | `--hub-color-action-text` | `#0A5062` | `#A9ECF1` |
| voltage (flare) | `--hub-color-voltage` | `#E8358C` | `#FF77B9` |

**Small type takes the text step, never the fill colour.** The fill value is
tuned for buttons and bars, where 3:1 is the bar. Measured as 14px text on
glass over the densest stop of every seed's sky: by day it clears AA (4.9
floor) but not AAA; at night it **fails AA** over glacier and lichen (4.2).
`--hub-color-action-text` is deeper by day — 7.3 floor, AAA on every seed at
both plate levels — and paler by night — 5.8 floor, AAA on dusk, rhubarb and
rye. AAA at night over the two cool seeds is not reachable in-hue; it would
need near-white, which stops being Skagen. Links also keep an underline —
colour alone is not an affordance.

**Glazes** — flat ceramic fields for large surfaces, empty states and node
categories. `--hub-color-glaze-1` … `-6`:

| | glacier | lichen | dusk | rhubarb | rye | clay |
|---|---|---|---|---|---|---|
| light | `#C6DEE4` | `#D6E1C8` | `#D9D5EC` | `#F3D4DC` | `#EFE4C6` | `#E2DCD4` |
| night | `#1E4A50` | `#2E4030` | `#33304F` | `#4A2C3A` | `#3F3A22` | `#3B3630` |

Text on a glaze is always `--hub-color-ink-on-glaze`.

**Flare appears once on a screen, or not at all.** It marks the one thing that
matters most on that page. Two flares on a screen means neither is the one.

**A tonal cell** keeps a stop of the sky at `--hub-tint-alpha` over the glass
(`color-mix(in srgb, var(--hub-sky-1) var(--hub-tint-alpha), var(--hub-color-surface))`).
That is how a stat row or an empty state gets a pastel without a solid field.

### Seeds

One structure, one hue family per app. `data-seed` on `<html>` reorders the
sky — `glacier` (default), `rye`, `dusk`, `lichen`, `rhubarb`, named for the
glaze that leads. A seed never touches ink, action, status or surfaces, which
is what keeps five apps recognisably one studio's work without being one app.
Choose it once per app. Do not invent a sixth colour; add a seed block.

## Type

**Schibsted Grotesk** alone, drawn for a Norwegian newsroom, so it holds at 12px
in a dense table and at 96px in an opener, with properly drawn ÆØÅ.
**JetBrains Mono** only where characters must line up: code, hex values, IDs,
token names. Never set a label in mono to make it look technical.

| Step | Size / leading | Weight | Tracking | For |
|---|---|---|---|---|
| `display-1` | 61 / 1.03 | 800 | -0.035em | Page opener, one per screen |
| `display-2` | 39 / 1.10 | 700 | -0.028em | Section heads |
| `title` | 25 / 1.20 | 700 | -0.020em | Card and dialog titles |
| `subtitle` | 20 / 1.30 | 600 | -0.012em | Group headings |
| `body` | 16 / 1.55 | 400 | 0 | Running text, 66ch max |
| `body-sm` | 14 / 1.50 | 400 | 0 | Dense UI, table cells |
| `label` | 14 / 1.00 | 600 | -0.005em | Buttons, tabs, form labels |
| `caption` | 12 / 1.45 | 400 | 0 | Helper and meta text |
| `code` | 13 / 1.50 | 400 | 0 | JetBrains Mono only |

Load: `https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap`

Give headings `text-wrap: balance`. Use `font-variant-numeric: tabular-nums`
wherever digits stack in a column.

## Space and shape

Everything is a multiple of **8**. Four exists only for optical nudges inside a
control. Scale: `4 8 12 16 24 32 48 64 96` (`--hub-space-1` … `-9`).
The dot grid is engineer's paper for canvases (`.hub-paper`, and React Flow
draws its own at 24px); it is no longer on the page ground.

Radius: `--hub-radius-control` 10px, `--hub-radius-plate` 20px,
`--hub-radius-hero` 28px for the one tile that leads a page,
`--hub-radius-pill` for status only.

**Elevation is tone, not shadow.** Lift something by moving it up a surface
level, not by drawing under it. `--hub-shadow-plate` and `-overlay` now resolve
to the lit top edge of the glass (`inset 0 1px 0 var(--hub-edge)`) — keep
using them, but nothing casts.

**Not everything is a plate.** Three separations, picked by role: a tonal cell
(a stop of the sky at tint-alpha), a hairline, or a step up in surface level.
Using all three on the same screen for the same kind of object is a mistake.

## Layout

Start from one of **four page archetypes** rather than composing from scratch.
Full skeletons, with working CSS, are in `references/layout.md`. If a screen is
genuinely none of them, say so and build from the rules — do not bend an
archetype to fit.

- **Canvas** — a graph filling the viewport with a 320px inspector on the
  right. The page itself never scrolls; the inspector owns the only scrollbar.
  The panel goes right because graphs flow left to right, so a left panel
  covers the upstream nodes you are tracing back from.
- **Table** — dense and scanned. `--hub-width-wide`, a page header with the
  primary action on the right, filters directly above the rows, and a sticky
  `thead` (the page header does not also stick).
- **Dashboard** — summary first, then detail. The stat row is **one plate
  divided by hairlines, not N cards** — identical lifted cards is the tell.
  `.hub-page__split` below it is deliberately unequal, so the reader is not
  asked to choose where to start.
- **Reading** — docs, settings, forms. `--hub-width-page` container with text
  held at `--hub-width-prose`, sections opening on a hairline and a heading row.

**Breakpoints are constants, not tokens** — a media query cannot read a custom
property. There are two, named for what the layout does: **720px** (one column,
nav becomes a drawer) and **1100px** (a side panel becomes an overlay). Above
1440px content stops growing. Break where the content stops fitting, never at a
device name.

**One scroll container per page.** Decide which element owns the scroll before
writing any CSS. Two nested scrollbars is a bug, not a layout. Sticky is spent
on exactly two things: the app bar and a table's `thead`.

**Two densities, chosen by what the screen is for.** Comfortable (`body`,
`--hub-space-4` padding) for reading, forms and dialogs. Compact (`body-sm`,
`--hub-space-3`) for tables, canvases, inspectors and toolbars. There is no
third density. A screen that feels cramped at compact is holding too many
columns.

Layout widths are tokens: `--hub-width-prose | -page | -wide | -nav | -panel`
and `--hub-height-bar`, which every sticky offset is measured from.

## Motion

Motion answers an action: expanding, confirming, connecting. 160–240ms on
`--hub-ease`. One orchestrated moment per page is allowed — a page-load
sequence, a reveal. **Banned:** fade-and-slide-up on every section as it scrolls
into view, and hover-lift on every card. Always honour
`prefers-reduced-motion`; the token file already does globally.

## Charts

**Axis and value labels go in HTML, not in SVG `<text>`.** A `viewBox` scales
everything inside it, text included: a chart drawn on a 336-unit viewBox and
rendered 1047px wide multiplies every font-size by 3.12, so `font-size: 10px`
arrives on screen at 31px and the type scale means nothing. Put the marks in
the SVG and lay the labels over or under it in HTML, on a grid with one column
per mark. Always check one rendered label at real size.

**Marks are neutral by default.** A chart of fourteen bars in Skagen spends the
whole voltage budget on decoration. Draw them in `--hub-color-surface-sunken`
and give the accent to the one mark that carries the point — today, the
selected series, the outlier. Everything else recedes.

Semantic colour keeps its meaning in a chart: a failing series takes
`--hub-color-danger`, never the accent.

Every chart says where its numbers come from, in a caption, and explains a
visible anomaly rather than leaving the reader to invent one.

For anything past a simple bar or line — categorical palettes, sequential and
diverging scales, dense dashboards — **use the `dataviz` skill**. This section
is the floor, not a visualisation system.

## Tells to avoid

These read as generated. If a review turns one up, it is a defect.

| Tell | Instead |
|---|---|
| Cream ground, serif display, terracotta accent | A dusk sky, one grotesque, Skagen |
| Tracked-out capitals as an eyebrow above headings | Let the heading start the section |
| Identical rounded cards under the same grey shadow | Separate by tone: a surface level, a hairline, or a tonal cell. Nothing casts |
| `01 / 02 / 03` markers on non-sequential content | Number only real sequences and timelines |
| `→` glued to every button and link | The verb already says what happens |
| A gradient on a component, a hero band, or a purple-to-blue wallpaper | The sky is the only gradient, it is made of our glazes, and everything on it is flat glass |
| Meta strung together with middle dots | Give each fact its own slot |
| Near-black `#111` standing in for black | Spruce `#132420`, a dark that has hue |
| Mono for small labels to look technical | Mono only where digits must align |

## Reference files

- `references/tokens.css` — the token file itself. Copy or import; source of truth.
- `references/layout.md` — page archetypes with working skeletons, the shell, scroll and placement rules.
- `references/components.md` — recipes for button, field, select, checkbox, tabs, plate, dialog, toast, chip, table, empty and error states.
- `references/react-flow.md` — canvas rules and the full `--xy-*` variable map.
- `references/writing.md` — how UI copy is written in this system.

## Checklist before calling UI work done

- Every colour comes from a token; no literal hex in component CSS.
- The page is one of the four archetypes — or you have said why it is not —
  with exactly one scroll container.
- Any chart's labels are HTML, not SVG text. Check one rendered size.
- Both themes checked — light, night, and the un-stamped system default.
- Coloured (Skagen + flare) area on surfaces is under a twentieth; the sky
  does not count.
- No drop shadows anywhere. Anything raised is a higher surface level.
- `data-seed` is set on `<html>` — chosen once for the app, glacier if unsure.
- Keyboard focus is visible on every interactive element.
- Running text is at most 66ch; headings balance.
- Nothing depends on hover alone to be discoverable.
- No item from the tells table is present.
