# Component recipes

Every component reads semantic or component tokens only. If a value has no
token, add one rather than inlining it.

## Button

Three variants and no more. Primary is the one action on the screen that the
page exists for; there is at most one per view.

```css
.hub-btn {
  font: var(--hub-text-label);
  letter-spacing: var(--hub-tracking-label);
  padding: var(--hub-button-pad);
  border-radius: var(--hub-button-radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color var(--hub-duration-fast) var(--hub-ease),
              border-color var(--hub-duration-fast) var(--hub-ease);
}
.hub-btn--primary {
  background: var(--hub-button-primary-bg);
  color: var(--hub-button-primary-ink);
}
.hub-btn--ghost {
  background: transparent;
  color: var(--hub-button-ghost-ink);
  border-color: var(--hub-button-ghost-border);
}
.hub-btn--quiet {           /* text-only, for tertiary actions in dense UI */
  background: transparent;
  color: var(--hub-color-action);
  border-color: transparent;
  padding-inline: var(--hub-space-2);
}
.hub-btn--danger { background: var(--hub-color-danger); color: #fff; }
.hub-btn:disabled { opacity: .45; cursor: not-allowed; }
```

No icon-plus-arrow suffixes. The verb already says what happens.

## Input and field

```css
.hub-field { display: flex; flex-direction: column; gap: var(--hub-space-2); }
.hub-label { font: var(--hub-text-label); letter-spacing: var(--hub-tracking-label); }
.hub-input {
  font: var(--hub-text-body-sm);
  color: var(--hub-color-ink);
  background: var(--hub-input-bg);
  border: 1px solid var(--hub-input-border);
  border-radius: var(--hub-radius-control);
  padding: 9px var(--hub-space-3);
}
.hub-input::placeholder { color: var(--hub-input-ink-placeholder); }
.hub-input:focus-visible { border-color: var(--hub-input-border-focus); }
.hub-help { font: var(--hub-text-caption); color: var(--hub-color-ink-muted); }
.hub-field[data-invalid] .hub-input { border-color: var(--hub-color-danger); }
.hub-field[data-invalid] .hub-help { color: var(--hub-color-danger); }
```

Labels sit above their input, always visible. No placeholder-as-label. Helper
text is present from the start where a format is required, not revealed on
error.

## Select

Stay native. The browser's own picker beats any custom listbox on touch, in a
screen reader and with a keyboard — so `appearance: none` restyles the shell and
nothing replaces the element.

```css
.hub-select-shell { position: relative; display: flex; }
.hub-select {
  appearance: none;
  width: 100%;
  font: var(--hub-text-body-sm);
  background: var(--hub-input-bg);
  border: 1px solid var(--hub-input-border);
  border-radius: var(--hub-radius-control);
  padding: 9px var(--hub-space-6) 9px var(--hub-space-3);
}
/* chevron from a rotated corner: takes a token colour, needs no SVG */
.hub-select-shell::after {
  content: ""; position: absolute; right: 14px; top: 50%;
  width: 6px; height: 6px;
  border-right: 1.5px solid var(--hub-select-arrow);
  border-bottom: 1.5px solid var(--hub-select-arrow);
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}
```

A placeholder option names the choice ("Choose a region"), is `disabled`, and is
never a substitute for the label above.

## Checkbox

The input **is** the box. `appearance: none` on the real element, not a hidden
input behind a fake square, so focus and screen-reader behaviour stay native.

```css
.hub-checkbox__box {
  appearance: none;
  width: var(--hub-checkbox-size); height: var(--hub-checkbox-size);
  display: grid; place-content: center;
  background: var(--hub-checkbox-bg);
  border: 1px solid var(--hub-checkbox-border);
  border-radius: var(--hub-radius-control);
}
.hub-checkbox__box::before {
  content: ""; width: 10px; height: 10px;
  background: var(--hub-checkbox-ink);
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
}
.hub-checkbox__box:checked, .hub-checkbox__box:indeterminate {
  background: var(--hub-checkbox-bg-checked);
  border-color: var(--hub-checkbox-bg-checked);
}
.hub-checkbox__box:checked::before { transform: scale(1); }
/* a third state, not a weaker checked — so it is a bar, not a faded tick */
.hub-checkbox__box:indeterminate::before {
  clip-path: none; height: 2px; border-radius: 1px; transform: scale(1);
}
```

A checkbox labels a **choice**, so its label takes `body-sm` at 400. The
600-weight `label` step belongs on the `<legend>` above a group — a column of
600-weight options reads as a stack of headings.

`indeterminate` is a DOM property, not an attribute, so it needs a ref and an
effect. Use it on a "select all" governing a partly-selected list.

## Dialog

Native `<dialog>` opened with `showModal()`. The focus trap, Esc, the top layer
and an inert background all come from the platform — never rebuild them.

```css
.hub-dialog {
  padding: 0;            /* padding goes on an inner wrapper, so a click on
                            the dialog element itself is unambiguously the backdrop */
  border: 1px solid var(--hub-edge);
  border-radius: var(--hub-dialog-radius);
  background: var(--hub-dialog-bg);              /* surface-highest: the top of the tone scale */
  box-shadow: var(--hub-dialog-shadow);
  backdrop-filter: var(--hub-glass);
  width: var(--hub-dialog-width);
  max-height: calc(100vh - var(--hub-space-8));
  overflow: auto;
}
.hub-dialog::backdrop { background: var(--hub-dialog-scrim); }
```

The scrim is spruce-tinted and **never blurred** — a dimmed room, not fog, for
the same reason a glaze never carries a gradient.

Rules:

- The title names the decision *and* the thing: `Delete "Population by region"?`
  Never "Are you sure?".
- The body says what happens and what it costs, then stops.
- Actions are primary-first, matching every other action row in the system.
- A destructive dialog sets `dismissible={false}` so a stray backdrop click
  cannot answer it. Esc always works.
- Opening earns motion because it answers an action: 240ms, entrance only.
- A dialog holds a short form at most. Anything longer belongs on its own page.

## Plate

The one container. A plate is an object you could pick up.

```css
.hub-plate {
  background: var(--hub-plate-bg);                 /* tonal glass */
  border: 1px solid var(--hub-plate-border);       /* the lit edge */
  border-radius: var(--hub-plate-radius);
  box-shadow: var(--hub-plate-shadow);             /* inset edge, not a shadow */
  backdrop-filter: var(--hub-glass);
  padding: var(--hub-space-5);
}
.hub-plate--flat  { background: var(--hub-color-surface-low); box-shadow: none; } /* a level down */
.hub-plate--glaze {                                                                  /* a tonal cell */
  background: color-mix(in srgb, var(--hub-glaze, var(--hub-color-glaze-1)) var(--hub-tint-alpha), var(--hub-color-surface));
  color: var(--hub-color-ink-on-glaze);
}
.hub-plate--hero  { border-radius: var(--hub-radius-hero); }                        /* leads the page */
```

Pick one separation per object type on a screen. A page where some cards are
lifted and others are glazed, for the same kind of content, is a mistake.

## Stat row

The summary at the top of a dashboard. **One instrument, N tonal cells** — same
height, same padding, same radius, one row, each cell keeping a stop of the sky
at tint-alpha over the glass. Four identical lifted cards under four identical
shadows is the tell this system names; this is not that, because nothing
casts and the cells are the page's own colour.

```css
.hub-stats {
  display: grid;
  grid-template-columns: repeat(var(--hub-stats-count, 4), minmax(0, 1fr));
  gap: var(--hub-space-3);
}
.hub-stat {
  padding: var(--hub-space-5);
  display: flex; flex-direction: column; gap: var(--hub-space-1);
  border-radius: var(--hub-radius-plate);
  border: 1px solid var(--hub-edge);
  box-shadow: var(--hub-shadow-plate);
  backdrop-filter: var(--hub-glass);
  background: color-mix(in srgb, var(--hub-tint) var(--hub-tint-alpha), var(--hub-color-surface));
}
/* cells take the sky in order, so a seed re-tints the row with the page */
.hub-stat:nth-child(1) { --hub-tint: var(--hub-sky-1); }
.hub-stat:nth-child(2) { --hub-tint: var(--hub-sky-5); }
.hub-stat:nth-child(3) { --hub-tint: var(--hub-sky-2); }
.hub-stat:nth-child(4) { --hub-tint: var(--hub-sky-3); }
.hub-stat--hero { border-radius: var(--hub-radius-hero); }
.hub-stat--hero .hub-stat__value { font: var(--hub-text-display-1); letter-spacing: var(--hub-tracking-display-1); }
.hub-stat__label { font: var(--hub-text-body-sm); color: var(--hub-color-ink-muted); }
.hub-stat__value {
  font: var(--hub-text-display-2);
  letter-spacing: var(--hub-tracking-display-2);
  font-variant-numeric: tabular-nums;
}
.hub-stat__note { font: var(--hub-text-caption); color: var(--hub-color-ink-subtle); }

/* At most one per row, and only when that figure asks for an action. */
.hub-stat--attention .hub-stat__value { color: var(--hub-color-voltage); }

@media (max-width: 720px) {
  .hub-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

Every figure carries a note saying what it is measured against — "4 still
running", "since midnight". A number with no frame is trivia.

## Chip and status

Pills are for status only, never for buttons or filters that toggle.

```css
.hub-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font: var(--hub-text-caption); font-weight: 600;
  padding: 3px 10px; border-radius: var(--hub-chip-radius);
  background: var(--hub-chip-bg); border: 1px solid var(--hub-edge);
  color: var(--hub-color-ink-muted);
}
.hub-chip--ok    { background: var(--hub-color-success-soft); color: var(--hub-color-success); }
.hub-chip--warn  { background: var(--hub-color-warning-soft); color: var(--hub-color-warning); }
.hub-chip--fail  { background: var(--hub-color-danger-soft);  color: var(--hub-color-danger); }
```

State reads in form as well as colour — a dot, a shape, or the word itself, so
it survives a greyscale print and colour-blind vision.

## Tabs

There is no native tabs element, so the ARIA pattern gets implemented in full:
`role="tablist"` / `tab` / `tabpanel`, `aria-selected`, `aria-controls`, roving
tabindex, and arrow keys plus Home and End. Use **automatic activation** —
moving focus selects — because panels here are local and cheap to render.

The indicator is an underline sitting *on* the tablist hairline, not a pill:

```css
.hub-tablist { display: flex; gap: var(--hub-space-5);
               border-bottom: 1px solid var(--hub-color-line); }
.hub-tab { padding: 0 0 var(--hub-space-3); border: 0; background: transparent;
           font: var(--hub-text-label); color: var(--hub-tab-ink); }
.hub-tab::after {
  content: ""; position: absolute; left: 0; right: 0;
  bottom: -1px;                    /* on the hairline, not above it */
  height: 2px; background: var(--hub-tab-indicator);
  transform: scaleX(0);
}
.hub-tab[aria-selected="true"] { color: var(--hub-tab-ink-selected); }
.hub-tab[aria-selected="true"]::after { transform: scaleX(1); }
```

That shape is not a style preference. Lines mean connection, so the selected
tab is drawn joined to the panel it controls. A pill would say "button", which
is the wrong thing to say.

Tab labels name the content, not the act of viewing it: "Runs", not "View runs".
Arrow keys skip disabled tabs rather than landing on them.

## Toast

A toast confirms an outcome in the same words as the action that caused it —
"Publish" produces "Published". Never "Success!", never an apology.

**Neutral and success time out after five seconds. Warning and danger stay
until dismissed.** Timing out the only account of what went wrong is how a
problem gets missed.

`role="status"` for neutral and success, `role="alert"` for warning and danger:
a confirmation waits its turn, a problem interrupts. The region renders even
when empty so a screen reader is already watching it when the first toast lands.

```css
.hub-toast {
  width: var(--hub-toast-width);
  background: var(--hub-toast-bg);
  border: 1px solid var(--hub-edge);
  backdrop-filter: var(--hub-glass);
  border-left: 2px solid var(--hub-color-line-strong);
  border-radius: var(--hub-toast-radius);
  box-shadow: var(--hub-toast-shadow);
  padding: var(--hub-space-4);
}
.hub-toast[data-tone="success"] { border-left-color: var(--hub-color-success); }
.hub-toast[data-tone="warning"] { border-left-color: var(--hub-color-warning); }
.hub-toast[data-tone="danger"]  { border-left-color: var(--hub-color-danger); }
```

The tone rides the same left edge Plate uses, so state looks identical wherever
it appears. The message itself always names the outcome, which is what carries
the meaning when colour is unavailable.

**Position defaults to bottom-centre, not bottom-right.** React Flow puts its
Controls bottom-left and its MiniMap bottom-right, so the usual corner is
already taken in most of our apps.

At most one action per toast, and only where there is genuinely something to
undo or go to.

## Table

```css
.hub-table { width: 100%; border-collapse: collapse; font: var(--hub-text-body-sm); }
.hub-table th {
  text-align: left; font: var(--hub-text-caption); font-weight: 600;
  color: var(--hub-color-ink-muted);
  padding: 12px var(--hub-space-4);
  border-bottom: 1px solid var(--hub-color-line);
  white-space: nowrap;
}
.hub-table td {
  padding: 12px var(--hub-space-4);
  border-bottom: 1px solid var(--hub-color-line);
}
.hub-table tbody tr:last-child td { border-bottom: 0; }
.hub-table .num { font-variant-numeric: tabular-nums; text-align: right; }
```

No zebra striping — the hairline already separates rows. Numeric columns are
right-aligned and tabular. Wrap wide tables in a container with
`overflow-x: auto` so the page body never scrolls sideways.

## Empty state

An empty screen is an invitation to act, not a shrug. A glaze field, one line
saying what will live here, one action.

```html
<div class="hub-plate hub-plate--glaze">
  <p class="hub-title">No graphs yet</p>
  <p>A graph connects a data source to whatever reads it. Start with a source.</p>
  <button class="hub-btn hub-btn--primary">Add a source</button>
</div>
```

No illustration, no apology, no "Oops".

## Error state

Errors explain what went wrong and how to fix it, in the interface's voice.
Never an apology, never vague.

```html
<div class="hub-plate hub-plate--flat" data-tone="danger">
  <p class="hub-label">Statbank did not respond</p>
  <p>The request timed out after 30 seconds. The table may be large — try a
     narrower region filter, or retry.</p>
  <button class="hub-btn hub-btn--ghost">Retry</button>
</div>
```

## Page shell

Moved. Shells, page archetypes, scroll ownership, density and placement all
live in `layout.md`, with working skeletons rather than a sketch.
