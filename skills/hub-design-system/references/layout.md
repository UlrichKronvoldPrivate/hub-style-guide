# Layout

Components were never the hard part. This is where a screen either reads as
considered or as a pile of correct parts.

**The CSS lives in `layout.css`** — import it the way you import `tokens.css`.
This file is the reasoning; excerpts below are quoted from it, not a second copy.

## Breakpoints are constants, not tokens

A media query cannot read a custom property, so these are written literally
everywhere. There are two, named for what the layout does rather than for a
device:

| Constant | Below it |
|---|---|
| **720px** — compact | One column everywhere. Sidebar nav becomes a drawer. Toolbars wrap. |
| **1100px** — wide | A side panel becomes an overlay instead of sitting beside content. |

Above 1440px content stops growing and the gutters take the rest. Nothing gets
a third column just because the space exists. Break where the content stops
fitting, never at a device name.

## Four page archetypes

Almost everything we build is one of these. Start from the right one rather
than composing a page from scratch. Classes: `.hub-page--canvas`,
`.hub-page--table`, `.hub-page--dashboard`, `.hub-page--reading`.

If a screen is genuinely none of them, say so out loud and build from the rules
rather than bending an archetype to fit. Four is not a closed set — it is what
we have needed so far.

### 1. Canvas page

The signature layout: a graph filling the viewport with an inspector beside it.

```
┌─ bar 60px ──────────────────────────────────────┐
│ Population by region              [Run] [Share] │
├───────────────────────────────┬─────────────────┤
│                               │                 │
│  canvas — pans and zooms,     │  inspector      │
│  never scrolls the page       │  320px          │
│                               │  scrolls itself │
└───────────────────────────────┴─────────────────┘
```

`height: 100dvh` with `overflow: hidden` on the page, a two-row / two-column
grid, and `overflow-y: auto` on the panel alone.

**The inspector goes on the right.** Graphs flow left to right, so a left panel
covers the upstream nodes you are tracing back from. This is the one placement
decision in the system worth arguing about, and this is the answer.

Below 1100px the panel becomes an overlay over the canvas rather than shrinking
it — a 200px-wide graph is not a graph. Two consequences, both easy to miss:

- **An overlay panel must be dismissible; a docked panel must not be.** Once the
  panel covers the canvas, a close control is the only way back to the graph.
  Give it one, and a way to reopen it from the bar.
- **`fitView` does not know the panel is there.** It fits to the full canvas
  element, so with an overlay open, part of the graph sits underneath it. Fit
  once on load with the panel closed, or pass asymmetric padding while it is
  open. Do not fit on every panel toggle — the graph jumping each time someone
  inspects a node is worse than the overlap.

Canvas chrome is already spoken for: React Flow's Controls sit bottom-left and
the MiniMap bottom-right. That is why toasts default to bottom-centre.

**An optional footer band** (`.hub-page__foot`) adds a third row for a
provenance strip, a run log or a status line. The row only exists when there is
something in it — an empty band is a stripe of nothing — and it spans the panel
too, because what it cites is the whole run, not the selected node.

**A docked inspector and a transient one are different components.** The docked
panel above is furniture: it is always there and shows whatever is selected. A
panel that opens on demand and closes again — a step detail, a record viewer —
is not that: it is an overlay at every width, it always carries a close
control, and it does not get a grid column. Do not dock a transient panel just
because there is room; a permanent empty inspector is worse than no inspector.

### 2. Table page

Dense, scanned rather than read.

```
┌─ bar ───────────────────────────────────────────┐
├─────────────────────────────────────────────────┤
│ Graphs                              [New graph] │
│ [Region ▾] [Year ▾] [ Search           ]        │
│ ┌─────────────────────────────────────────────┐ │
│ │ thead sticks under the bar                  │ │
│ │ rows…                                       │ │
└─┴─────────────────────────────────────────────┴─┘
```

`--hub-width-wide`, centred. The table header sticks at
`top: var(--hub-height-bar)`; **the page header does not also stick** — two
sticky bands stacked on each other eat a laptop screen.

### 3. Dashboard page

Summary first, then detail. `.hub-page--dashboard` shares the table page's
container; what differs is what goes in it.

```
┌─ bar ───────────────────────────────────────────┐
│ Overview                    [New upload] [...]  │
│ ┌───────┬───────┬───────┬───────┐               │
│ │  34   │ 1.28M │  12   │   2   │  one plate,   │
│ └───────┴───────┴───────┴───────┘  hairlines    │
│ ┌─────────────────────────────────────────────┐ │
│ │ chart                                       │ │
│ └─────────────────────────────────────────────┘ │
│ ┌───────────────────────┬───────────────────┐   │
│ │ recent (1.6fr)        │ attention (1fr)   │   │
└─┴───────────────────────┴───────────────────┴───┘
```

Rules that are specific to this archetype:

- **The summary row is one plate divided by hairlines, not N cards.** Four
  identical lifted cards is the tell; one instrument with four readings is the
  answer. See the stat row recipe in `components.md`.
- **`.hub-page__split` is deliberately unequal** (1.6fr / 1fr). Two equal
  columns make the reader choose where to start, which is the choice the layout
  should have made for them.
- **One figure may take flare** — the single number that asks someone to do
  something. If no figure does, none of them takes it.
- Everything below the summary row is the same kind of object, so it gets one
  separation, not a mix of glaze, hairline and lift.

### 4. Reading page

Docs, settings, a form, an empty project. One column, generous.

`--hub-width-page` container with paragraphs and list items held at
`--hub-width-prose`. A section opens with a hairline and a heading row
(`.hub-section__head`).

The right-hand slot of that heading row holds something **true** — a count, a
timestamp, a token namespace — or it stays empty. It is not a place for a
decorative label.

## App shell

Constant across every archetype: `.hub-shell` with a sticky bar, a sidebar and
a main area. The bar is `--hub-height-bar`, and every sticky offset in the app
is measured from it — which is why it is a token rather than a number typed in
three places.

Sidebar nav, not top nav. These apps have more destinations than a top bar
holds, and a vertical list survives a name getting longer. Below 720px it
becomes a drawer (`data-open="true"`).

## Two densities, chosen by what the screen is for

| | Comfortable | Compact |
|---|---|---|
| Body text | `body` 16 | `body-sm` 14 |
| Row / cell padding | `--hub-space-4` | `--hub-space-3` |
| Gap between controls | `--hub-space-4` | `--hub-space-3` |
| Used by | Reading pages, forms, dialogs, empty states | Tables, canvases, inspectors, toolbars |

Set with `data-density="compact"`. There is no third density and no per-user
switch. If a screen feels cramped at compact, it is holding too many columns.

## Scroll

**One scroll container per page.** Decide which element owns the scroll before
writing any CSS.

- Reading and table pages: the document scrolls. Nothing inside does.
- Canvas pages: the document does not scroll at all. The inspector owns the
  only scrollbar; the canvas pans and zooms instead.
- A wide table scrolls sideways **inside its own container**, never by making
  the page scroll sideways.

Two scroll containers nested inside each other is a bug, not a layout. The one
exception is a dialog taller than the viewport.

Sticky is spent on exactly two things: the app bar, and a table's `thead`.

## Where things sit

| Thing | Where | Why |
|---|---|---|
| Page title | Left of the page header | First thing read |
| Primary action | Page header, right side, **first** in its group | Right is where actions live; primary-first matches every other action row |
| Filters and search | Directly above the thing they filter | A filter far from its results reads as global |
| Inspector / detail panel | Right | Graphs flow left to right |
| Canvas controls | Bottom-left | React Flow's default, kept |
| MiniMap | Bottom-right | React Flow's default, kept |
| Toasts | Bottom-centre | Both bottom corners are taken |
| Destructive actions | Last, and never adjacent to a primary | Distance is the cheapest safeguard |

## Vertical rhythm

- Between page sections: `--hub-space-9`
- Between groups inside a section: `--hub-space-5`
- Between a label and its control: `--hub-space-2`
- Everything through `gap` on the parent, never per-child margins — collapsed
  and doubled margins are the commonest layout bug in this system.

## Layout tells to avoid

| Tell | Instead |
|---|---|
| Everything centred down the page | Left-aligned; centre only genuinely symmetrical things |
| A `100vh` hero before any content | Size an opener to what it holds |
| Three equal cards for content that is not cards | A list, a table, or prose |
| Running text at full container width | `--hub-width-prose`, always |
| A sidebar scrolling independently for no reason | One scroll container |
| Uniform padding regardless of density | Compact for tables and canvases |
| A layout that only collapses at phone width | Break where the content stops fitting |
