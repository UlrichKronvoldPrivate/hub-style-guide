# hub design system — quick reference

**This is the one file to keep in a consuming project.** Everything below is
the substance; the reasoning, the recipes and the components live in the
repository: `https://github.com/UlrichKronvoldPrivate/hub-style-guide`
(private). Nothing else from that repository needs to be copied for this file
to be useful, and nothing in it will resolve next to this file — that is
expected.

The system is called **Skumring** (Danish for dusk). The ground is a dusk sky
built from five pastel glazes; everything on it is tonal glass. Type is
Schibsted Grotesk alone, JetBrains Mono only where characters must align.

## Seeds

One line, once per app, on the root element:

```html
<html data-seed="rye">
```

`glacier` (default — omit the attribute), `rye`, `dusk`, `lichen`, `rhubarb`.
A seed reorders the sky and **nothing else** — ink, action, status and
surfaces are identical across all five. That invariance is what makes separate
apps read as one studio's work. Do not invent a sixth colour.

## Three-tier tokens

```
--hub-skagen-40   →   --hub-color-action   →   --hub-button-primary-bg
   primitive              semantic                  component
```

A component names a semantic or component token, never a primitive. That
indirection is what lets one toolbar control re-theme everything. Never
hard-code a hex; if a value has no token, add the token in the repository.

## The two rules people break first

**The action colour has two values.** Skagen, sea petrol:

| | Day | Night | For |
|---|---|---|---|
| `--hub-color-action` | `#0F6C86` | `#5FD0DC` | fills, indicators, edges, focus |
| `--hub-color-action-text` | `#0A5062` | `#A9ECF1` | links, quiet buttons — small type |

The fill value fails AA as text at night over two of the five skies; the text
step clears it everywhere. Links also keep an underline.

**No drop shadows.** Elevation is a step in surface level — `lowest`, `low`,
`surface`, `high`, `highest`, each a step more opaque. `--hub-shadow-plate`
and `--hub-shadow-overlay` are the lit top edge of glass, not a shadow. Every
surface needs `backdrop-filter: var(--hub-glass)` to read as glass.

## Four archetypes, one scroll container

`.hub-page--canvas`, `.hub-page--table`, `.hub-page--dashboard`,
`.hub-page--reading`. Start from one; if a screen is none of them, say so and
build from the rules. Decide which element owns the scroll before writing CSS —
two nested scrollbars is a bug. Sticky is spent on the app bar and a table's
`thead`, nothing else.

Breakpoints are literal constants, because a media query cannot read a custom
property: **720px** (one column, nav becomes a drawer) and **1100px** (a side
panel becomes an overlay).

## Six rules

1. **Colour lives in the sky; voltage on surfaces stays under five percent.**
2. **Elevation is tone, not shadow.**
3. **Lines mean connection.** Nothing is drawn to fill space.
4. **One family, weight does the work.** No second display face.
5. **Radius is a role, not a habit.** 10px controls, 20px plates, 28px for the
   one tile that leads a page, pills for status only.
6. **Semantic colour is separate.** Success, warning and danger own their
   tokens; the accent never stands in for state.

## Charts

Marks neutral by default; the accent goes to the one mark that carries the
point. Labels are HTML in a grid with one column per mark — never SVG text,
which a viewBox scales along with everything else. Anything past a simple bar
or line: use the `dataviz` skill.

## Writing

A control names its outcome and keeps that name through the flow: "Publish",
then "Published". Errors say what happened and what to try, never an apology.
Empty states say what will live here and offer one action. Sentence case, no
trailing arrows, no eyebrow labels in tracked capitals.

## Done-checklist

- Every colour comes from a token; no literal hex in component CSS.
- The page is one of the four archetypes — or you have said why not — with
  exactly one scroll container.
- Both themes checked: light, night, **and the un-stamped system default**.
- Coloured (Skagen + flare) area on surfaces is under a twentieth; the sky
  does not count.
- No drop shadows; anything raised is a higher surface level.
- Keyboard focus visible on every interactive element.
- Running text at most 66ch; headings balance.
- Chart labels are HTML, not SVG text.
- Nothing depends on hover alone to be discoverable.
- No tell from the list in the skill: cream ground, serif display,
  tracked-caps eyebrows, identical cards under identical shadows, numbered
  markers on non-sequences, arrows glued to buttons, gradient behind a
  headline, `#111` for black, mono for labels.
