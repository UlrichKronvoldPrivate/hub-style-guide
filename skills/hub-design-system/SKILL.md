---
name: hub-design-system
description: Apply the hub house style ("Porcelain & Voltage") to any UI work — colours, typography, spacing, components, node canvases and UI copy. Use whenever writing or restyling HTML, CSS, React or Storybook for a hub app; adding or changing a component; picking colours, fonts or spacing; styling a React Flow graph; or reviewing a screen for consistency. Also use when a design looks generic or AI-generated and needs bringing onto the house style.
---

# hub design system

The visual identity shared by every hub app. Its job is consistency across
projects and a look that reads as one studio's work rather than one model's
default.

**Load `references/tokens.css` and style from those custom properties. Never
hard-code a hex.** If a value you need has no token, that is a design decision:
add the token, don't inline the value.

## The argument

Danish design runs an argument with itself. Kaare Klint measured furniture
against the human body and built systems from it — proportion, modules,
restraint. Verner Panton answered with saturated orange rooms and moulded
plastic. Both are Nordic; only one is the postcard.

**Klint by default, Panton on purpose.** Rigour holds the structure; voltage is
rationed to the places where it changes what someone does.

## Six rules

1. **Voltage stays under five percent.** Cobalt and flare are current, not
   paint. Primary buttons, one live edge, a focus ring, the single number that
   matters — that is the whole budget. If a screen feels loud, measure the
   coloured area.
2. **Glazes stay flat.** No gradient, no blur, no shadow on a pastel field. It
   is fired ceramic, not a lighting effect.
3. **Lines mean connection.** A rule, border or edge asserts that two things
   relate. Nothing is drawn to fill space.
4. **One family, weight does the work.** Schibsted Grotesk carries everything.
   No second display face. A heading needing presence gets more weight or
   tighter tracking, never a different typeface.
5. **Radius is a role, not a habit.** 4px controls, 12px plates, pills for
   status only. One radius on everything flattens hierarchy.
6. **Semantic colour is separate.** Success, warning and danger own their
   tokens. The accent never stands in for state, and state never borrows the
   accent.

## Colour

Ground is porcelain — cool and faintly green, low winter daylight through
glass. Never cream. Ink is spruce, a green-black rather than a tinted grey, so
large dark fields still carry hue.

| Role | Token | Light | Night |
|---|---|---|---|
| ground | `--hub-color-ground` | `#F7F8F5` | `#0F1917` |
| surface (plate) | `--hub-color-surface` | `#FCFDFA` | `#16221E` |
| sunken field | `--hub-color-surface-sunken` | `#E4E7DF` | `#1E2C27` |
| hairline | `--hub-color-line` | `#D6DACF` | `#2A3A34` |
| ink | `--hub-color-ink` | `#132420` | `#E9EEE8` |
| action (cobalt) | `--hub-color-action` | `#2B3FC4` | `#8494FF` |
| voltage (flare) | `--hub-color-voltage` | `#E8358C` | `#FF77B9` |

**Glazes** — flat ceramic fields for large surfaces, empty states and node
categories. `--hub-color-glaze-1` … `-6`:

| | glacier | lichen | dusk | rhubarb | rye | clay |
|---|---|---|---|---|---|---|
| light | `#C6DEE4` | `#D6E1C8` | `#D9D5EC` | `#F3D4DC` | `#EFE4C6` | `#E2DCD4` |
| night | `#24454E` | `#2E4030` | `#34304C` | `#4A2E38` | `#443C24` | `#3B3630` |

Text on a glaze is always `--hub-color-ink-on-glaze`.

**Flare appears once on a screen, or not at all.** It marks the one thing that
matters most on that page. Two flares on a screen means neither is the one.

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
The dot grid steps every 24px — three modules — so any plate lands on it.

Radius: `--hub-radius-control` 4px, `--hub-radius-plate` 12px,
`--hub-radius-pill` for status only.

**Elevation is material, not fog.** A raised plate gets a hairline plus a tight
spruce-tinted shadow (`--hub-shadow-plate`). Never a soft grey blur stamped
under every block. Glazes do not lift at all — a painted surface casts nothing.

**Not everything is a plate.** Three separations, picked by role: a flat glaze
field, a hairline border, or a lifted plate. Using all three on the same screen
for the same kind of object is a mistake.

## Layout

Start from one of **three page archetypes** rather than composing from scratch.
Full skeletons, with working CSS, are in `references/layout.md`.

- **Canvas** — a graph filling the viewport with a 320px inspector on the
  right. The page itself never scrolls; the inspector owns the only scrollbar.
  The panel goes right because graphs flow left to right, so a left panel
  covers the upstream nodes you are tracing back from.
- **Table** — dense and scanned. `--hub-width-wide`, a page header with the
  primary action on the right, filters directly above the rows, and a sticky
  `thead` (the page header does not also stick).
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

## Tells to avoid

These read as generated. If a review turns one up, it is a defect.

| Tell | Instead |
|---|---|
| Cream ground, serif display, terracotta accent | Porcelain ground, one grotesque, cobalt |
| Tracked-out capitals as an eyebrow above headings | Let the heading start the section |
| Identical rounded cards under the same grey shadow | Separate by material: glaze, hairline, or lift |
| `01 / 02 / 03` markers on non-sequential content | Number only real sequences and timelines |
| `→` glued to every button and link | The verb already says what happens |
| Purple-to-blue gradient behind the headline | Flat ground; spend the boldness on one element |
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
- The page is one of the three archetypes, with exactly one scroll container.
- Both themes checked — light, night, and the un-stamped system default.
- Coloured (cobalt + flare) area is under a twentieth of the screen.
- Keyboard focus is visible on every interactive element.
- Running text is at most 66ch; headings balance.
- Nothing depends on hover alone to be discoverable.
- No item from the tells table is present.
